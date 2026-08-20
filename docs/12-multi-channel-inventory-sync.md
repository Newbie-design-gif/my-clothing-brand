# Multi-channel inventory sync

> Part 12 of 14 of the Vawehall e-commerce scope. Full area: **Inventory sync with offline & other sales channels (single stock pool)**.
> 34 work items — 🟢 17 needed at launch · 🟡 10 in phase 2 · ⚪ 7 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## One stock pool: a single source of truth

- 🟢 **Master SKU list at size level** — Every style + colour + size combination gets one code (e.g. KRT-BLU-M) used on the tag, the bill and the website, so everyone is talking about the same piece.
  - *Developer note:* Model variants (size/colour) as separate SKUs, not one 'kurta' record. This SKU code must be stable — marketplaces and POS tools will key off it later.
- 🟢 **One shared stock number per SKU** — There is exactly one count of how many Blue-M kurtas exist, and every sale — website, counter, exhibition, Instagram DM — subtracts from that same number. This is the single most important item in this whole area.
  - *Developer note:* One inventory table in the database as the source of truth; every channel is a reader/writer of it, never a copy.
- 🟢 **Website shows live stock and auto-hides sold-out sizes** — The moment a size hits zero, customers see 'Sold out' instead of being allowed to order it — no manual hiding needed.
  - *Developer note:* Grey out the size chip rather than removing it; keep the product page live for SEO and 'notify me'.
- 🟢 **Overselling guard at checkout** — If two customers grab the last piece at the same moment, only one order goes through; the site can never sell below zero stock.
  - *Developer note:* Deduct/lock stock at order placement (including COD, since no payment confirms it), with a release timer for abandoned prepaid payments. Use DB-level atomic decrement, not read-then-write.
- 🟢 **Last-piece buffer (holdback) per SKU** — A setting like 'show sold out online when only 1 is left' — the last piece stays safe for the shop counter, so the same kurta is never sold twice on the same day.
  - *Developer note:* Per-SKU configurable buffer, default set globally (e.g. 1). This is the cheap insurance against week-one double-sells.
- 🟢 **Stock change log (who, what, when, why)** — Every stock change is recorded, so when the count looks wrong you can trace whether it was a sale, a return, a typo or a missing piece — instead of arguing about it.
  - *Developer note:* Simple append-only ledger: SKU, +/- qty, reason code, user, timestamp, channel. Exposed as a filterable list in admin.

## Dead-simple day-1 workflow for offline sales

- 🟢 **Daily counter-sale entry screen (or wired Google Sheet)** — A screen so simple the shop person can use it on a phone: pick the SKU, enter quantity sold at the counter today, done — the website count updates. If a proper screen is too much for day 1, the developer wires a shared Google Sheet into the stock pool instead.
  - *Developer note:* Mobile-first admin page or Google Sheets API sync on a 15-min poll. Sheet option is acceptable at launch but plan to retire it — sheets drift.
- 🟢 **Instant-update rule for last pieces** — End-of-day entry is fine for deep stock, but if only 1-2 pieces of a size remain, the counter sale must be entered immediately — that is the exact piece an online customer buys an hour later.
  - *Developer note:* Flag low-stock SKUs visually in the entry screen ('LAST PIECE — update now'). This is a process rule the tool should reinforce, not just documentation.
- 🟢 **Manual order entry for Instagram DM / WhatsApp sales** — Orders taken over DMs are real orders — a button in admin creates the order, deducts stock, and records the customer's name and payment, so DM sales stop being invisible.
  - *Developer note:* Create as a normal order with channel = 'DM/WhatsApp' so it appears in sales reports and GST invoicing, not as a bare stock adjustment.
- 🟢 **New stock inward entry** — When the tailor or factory delivers fresh pieces, there is a simple 'add stock' screen — otherwise new stock sits invisible and the website says sold out while shelves are full.
  - *Developer note:* Same adjustment ledger, reason = 'inward'. Support entering a whole size run (S/M/L/XL quantities) in one go.
- 🟢 **Damage / shrinkage / gift adjustments with reason codes** — Pieces get stained, gifted to influencers, or go missing. A quick 'remove with reason' entry keeps the count honest instead of mysteriously wrong.
  - *Developer note:* Dropdown reasons: damaged, sample/influencer, personal use, theft/unknown, correction. Feeds the same log.
- 🟢 **Bulk stock upload/download via CSV or Excel** — Lets you set opening stock in one shot before launch, and re-set counts after a physical counting day, without typing 200 rows one by one.
  - *Developer note:* Export current stock, edit, re-import with a diff preview before applying.
- 🟢 **Low-stock alerts on WhatsApp or email** — You get a ping when a bestseller size drops to the reorder point, so you can tell the tailor before it sells out — instead of finding out from a disappointed customer.
  - *Developer note:* Per-SKU threshold with a sane default. Email is fine day 1; WhatsApp via Business API (or a daily digest message) is the India-native upgrade.

## Returns, exchanges and courier RTOs back into stock

- 🟢 **Online return restock after a quality check** — A returned kurta goes back on sale only after someone checks it is unworn and undamaged — a one-tap 'restock' or 'write off' choice, so damaged returns do not get resold.
  - *Developer note:* Returns land in a 'pending QC' bucket, not directly into sellable stock.
- 🟢 **COD RTO (courier return-to-origin) restock workflow** — In India a chunk of COD parcels come back undelivered. Those pieces must re-enter sellable stock quickly, or they sit in a corner while the website says sold out.
  - *Developer note:* RTO is high-volume in Indian COD; treat it as a first-class flow tied to courier status (Shiprocket/Delhivery webhooks), same pending-QC bucket.
- 🟡 **Counter returns and exchanges adjust stock** — When a shop customer exchanges an M for an L, both sizes' counts change — handled properly once the store billing/POS is connected; until then it is two manual adjustments.
  - *Developer note:* At launch this is the manual adjustment screen with reasons 'counter return' / 'counter exchange'; the POS automates it.

## Exhibitions, pop-ups and boutique consignment

- 🟢 **Reserve stock for an exhibition** — Before packing for an exhibition or pop-up, you mark those pieces as 'reserved' — they disappear from the website so the same piece is not sold online while it sits on your exhibition rack.
  - *Developer note:* Simplest version: a bulk adjustment tagged 'exhibition hold' that removes from sellable stock and can be reversed as a batch.
- 🟡 **Post-exhibition reconciliation** — After the event, you enter what sold and return the rest to the pool — a guided 'sold X, bringing back Y' screen so nothing falls through the cracks.
  - *Developer note:* Compare reserved qty vs returned qty; the difference must be booked as sold or lost, never silently dropped.
- 🟡 **Consignment stock tracked per boutique** — Pieces sitting at a partner boutique are your stock but not sellable online — the system knows 10 pieces are 'at Boutique X' so counts stay honest and you know what to collect payment for.
  - *Developer note:* Lightweight multi-location: locations = own store, warehouse, each boutique, exhibition. Only 'own' locations feed the website.
- 🟡 **Boutique sales reporting and settlement** — When the boutique reports monthly sales, you deduct those pieces from their location and know exactly what they owe you.
  - *Developer note:* Manual entry against the boutique location is enough; a settlement report (sold qty x agreed price) helps collections.

## Physical store POS / billing (phase 2)

- 🟡 **Basic POS billing linked to the same stock pool** — The shop counter gets a simple billing app; every bill automatically deducts from the same stock the website sells from — the end of daily manual entry.
  - *Developer note:* If the site is on Shopify, Shopify POS is the zero-integration path. Otherwise evaluate India-friendly POS (Zoho, Vyapar, GoFrugal, QueueBuster) with an API the developer can sync.
- 🟡 **Barcode tags and a scanner at the counter** — Scanning the tag instead of typing the code makes counter billing fast and kills the most common source of stock errors — the wrong SKU being deducted.
  - *Developer note:* Print barcodes from the master SKU list (Code128 of the SKU code); a Rs 2-3k USB/Bluetooth scanner is enough.
- 🟡 **GST-compliant invoices at the counter** — Counter bills carry your GSTIN, HSN codes and tax breakup just like online invoices, so your accountant sees one clean picture at filing time.
  - *Developer note:* Apparel GST slabs differ by price point (currently 5% vs higher slab above the threshold) — POS must handle per-item rates. Keep separate invoice series for store vs online if the accountant prefers.
- 🟡 **End-of-day sales and stock reconciliation report** — One evening report: what sold online, what sold at the counter, what stock stands where — so surprises surface the same day, not at month end.
  - *Developer note:* Include a mismatch flag when POS-deducted stock and website stock disagree.

## Marketplaces and multichannel (the Myntra ambition)

- ⚪ **Marketplace listings: Myntra, Ajio, Amazon, Flipkart, Nykaa Fashion** — Selling where the traffic already is — each marketplace needs your catalogue, images to their specs, and onboarding as a registered seller.
  - *Developer note:* Each has its own seller portal, image/catalogue rules and commission structure; Myntra/Ajio onboarding for small brands can take months — start paperwork early.
- ⚪ **Multichannel inventory tool (Unicommerce / EasyEcom class)** — Once you sell on 2-3 marketplaces plus your own site, hand-syncing stock is impossible — one tool holds the master stock and pushes updates to every channel within minutes.
  - *Developer note:* Unicommerce, EasyEcom, Vinculum, Browntape are the usual India options. Design today's SKU codes and stock API so they can plug in without renaming the whole catalogue.
- ⚪ **Channel-wise stock allocation and per-channel buffers** — Rules like 'give Myntra at most 40% of stock, always keep 2 pieces for our own site' — so one channel cannot drain everything and cause cancellations elsewhere.
  - *Developer note:* Marketplace sync always lags a little; per-channel safety buffers absorb that lag. Marketplaces penalize seller-fault cancellations heavily.
- ⚪ **Central order routing and one pick queue** — Orders from every channel land in one packing list, so the team picks and ships from a single queue instead of juggling five seller panels.
  - *Developer note:* Usually comes bundled with the multichannel tool; integrates with Shiprocket/Delhivery/etc. for labels.
- ⚪ **Marketplace returns and RTOs flow back into the pool** — Marketplace returns are heavy in fashion; each returned piece must come back into the single stock pool after QC, or stock quietly evaporates.
  - *Developer note:* Reconcile marketplace return claims vs physically received pieces — mismatches are a known leak and claimable from some marketplaces.

## Store pickup and ship-from-store

- ⚪ **Store pickup option at checkout** — Local customers order online and collect from the shop — saves courier cost and brings footfall, but it needs a 'set aside for pickup' state so the piece is not sold twice while it waits.
  - *Developer note:* Needs reserved-for-pickup status, pickup-ready notification (WhatsApp), and an uncollected-order timeout that releases stock.
- ⚪ **Ship online orders from store stock** — When the warehouse is out but the shop shelf has the piece, the order ships from the store instead of being cancelled — turns store stock into online stock.
  - *Developer note:* Requires reliable per-location stock accuracy and courier pickup from the store address; only attempt after POS and multi-location tracking are stable.

## Stock hygiene and reports

- 🟢 **Weekly physical count and reconciliation routine** — Once a week, count fast-moving styles and fix the numbers — small errors caught weekly never become the big festive-season disaster.
  - *Developer note:* At launch this is a printed count sheet plus the CSV re-import; a proper cycle-count screen with variance report is a phase-2 upgrade.
- 🟡 **Bestseller, dead-stock and ageing reports** — Shows which styles fly and which have sat unsold for 90 days across all channels combined — that is what tells you what to restitch and what to discount.
  - *Developer note:* Report across channels (web + counter + DM), by style and by size — size-level gaps ('M always sells out first') drive production planning.
- 🟡 **Pre-sale stock accuracy audit** — Before a big festive or sale event, a full count and correction — high-traffic days magnify every stale number into cancellations and angry messages.

## Questions to ask your developer

- Where exactly does stock get deducted — at order placement or payment? What happens for COD orders and for prepaid orders where payment is abandoned midway (is stock held, and for how long)?
- If I sell a piece at the shop counter at 2 pm, what are the exact steps I take to remove it from the website, how long do they take on a phone, and how quickly does the site reflect it?
- What stops two online customers from both buying the last piece at the same instant? Show me this working before launch.
- Can I set a per-item buffer so the website shows sold out while 1 piece still physically remains for the counter?
- Will there be a log of every stock change (who changed it, when, why) that I can open and read myself?
- How do online returns and COD RTO parcels get back into sellable stock — is there a quality-check step, and who presses the button?
- Which platform are you building on, and does it have a POS we can adopt later (like Shopify POS) so the store billing does not need a custom build?
- When we list on Myntra/Amazon/Flipkart later, can our SKU codes and stock data plug into a tool like Unicommerce or EasyEcom without renaming the whole catalogue? What are you doing now to keep that door open?
- Can Instagram-DM and WhatsApp orders be entered as real orders (with a GST invoice and stock deduction), not just as stock edits?
- If we start with a Google Sheet for daily counter sales, what happens when the sheet and the website disagree — which one wins, and how do we notice?
- How do I mark stock as reserved for an exhibition and bring the unsold pieces back afterwards in one step?
- What is my fallback when the internet or the admin panel is down and a counter sale happens — what do I write down, and how do I enter it later?

## What you (the owner) must provide

- [ ] A complete SKU list: every style, colour and size combination with one agreed code — the same code must go on physical tags, bills and the website.
- [ ] An accurate opening stock count (a real physical count, size by size) done just before launch — the whole system starts from this number.
- [ ] A list of every place you currently sell: shop counter, exhibitions/pop-ups, boutique consignment, Instagram DMs — with rough monthly pieces sold in each, so the developer designs for reality.
- [ ] A named person responsible for entering counter sales daily (and immediately for last pieces), and a decision on the entry deadline (e.g. before 8 pm every day).
- [ ] Your buffer decision: how many pieces of each item to hold back from the website for walk-in customers (recommended: at least the last 1 piece).
- [ ] The list of consignment boutiques, what stock each currently holds, and how often they report sales.
- [ ] Your exhibition/pop-up calendar for the next 6 months, so stock reservation can be planned rather than improvised.
- [ ] Your GSTIN, HSN codes for your garments, and your accountant's preference on invoice series for store vs online vs DM sales.
- [ ] A decision and budget for barcoding (label printer approx Rs 8-15k, scanner Rs 2-3k) and for a POS subscription in phase 2.
- [ ] Reorder thresholds per style/size (at what count should the low-stock alert fire) and your tailor/factory restock lead time.
- [ ] The WhatsApp number and email where stock alerts and end-of-day reports should arrive.
- [ ] A commitment to the weekly counting routine — the system stays truthful only if someone physically counts and corrects it.
