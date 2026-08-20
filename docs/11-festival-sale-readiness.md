# Festival & sale readiness

> Part 11 of 14 of the Vawehall e-commerce scope. Full area: **Festival & sale-event readiness (India sale calendar)**.
> 57 work items — 🟢 32 needed at launch · 🟡 23 in phase 2 · ⚪ 2 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## The India sale calendar — plan every event 8-10 weeks ahead

- 🟢 **12-month written sale calendar** — Diwali/festive season, wedding season, EOSS (Jan & July), Rakhi, Eid, Republic Day, Independence Day and month-start payday sales together bring 30-50% of the year's revenue, so every event needs a date on a calendar 8-10 weeks before it happens, not the week of.
  - *Developer note:* A shared Google Sheet/Notion is fine; the site just needs to support the calendar. Confirm the platform can schedule multiple future sale events at once.
- 🟢 **Per-event sale brief (one page per sale)** — For each sale you decide in advance: start/end date and time, discount depth, which products are included, banner copy, and the ad budget — so nothing is invented at midnight when the sale goes live.
- 🟢 **Diwali/festive season master plan (approx. Sept-Nov)** — This is the single biggest revenue window of the Indian fashion year; stock, banners, couriers, staff and ads for it must all be locked by early September.
  - *Developer note:* If the site launches after August, this becomes the first thing built; if launching in the new year, it can be a phase-2 rehearsal for the next festive season.
- 🟡 **End-of-Season Sale (EOSS) plan for January and July** — EOSS is how you clear leftover winter/summer stock so cash isn't stuck in old inventory; Indian shoppers actively wait for these windows.
- 🟡 **Wedding-season merchandising (Oct-Feb, Apr-May)** — Wedding buyers shop weeks ahead and spend more per order, so a dedicated 'wedding edit' collection and earlier delivery promises capture them.
  - *Developer note:* Just a curated collection page plus banner scheduling; no new tech needed.
- 🟡 **Rakhi and Eid gifting mini-events** — These are short, sharp gifting spikes where features like gift wrap, a gift note, and an invoice that hides the price make people choose you over a marketplace.
  - *Developer note:* Gift options at checkout; suppress price on the packing slip/invoice PDF for gift orders.
- 🟡 **Payday sale cadence (1st-5th of every month)** — Indian online spending spikes right after salary day, so a small recurring offer at month-start smooths revenue between big festivals.
- 🟡 **'Sale starts in' teaser page and WhatsApp/email pre-announcement** — Telling customers 3-7 days early builds a queue of buyers for day one instead of hoping they wander in.
  - *Developer note:* Countdown component + scheduled broadcast on WhatsApp Business/email; needs opt-in list from day 1.

## Stock and buying before festivals

- 🟢 **Festive buy plan with size ratios** — Running out of M and L on day two while XS piles up is the classic festive failure — order extra stock in the size ratio your actual sales show (or standard Indian ratios for a new brand), not equal quantities of every size.
  - *Developer note:* Needs size-level sales reports from the store admin so the owner can compute ratios after the first events.
- 🟢 **Manufacturer/tailor lead-time calendar** — If your production takes 4-6 weeks, festive stock must be ordered by August for Diwali — the sale calendar and the buying calendar have to be planned together.
- 🟢 **Physical stock count before every big sale** — If the website says 10 pieces but the shelf has 7, you will oversell during the rush and spend Diwali apologising on WhatsApp — count and correct stock in the system the week before.
  - *Developer note:* Bulk inventory-adjustment tool or CSV import in admin.
- 🟢 **Packaging materials stock-up (boxes, polybags, tape, invoices, thank-you cards)** — The most forgotten festive failure: brands run out of boxes and tape mid-sale and shipping stops even though product is in stock — order packaging for 2-3x normal volume before the peak.
- 🟡 **Safety stock rule on bestsellers** — Keep a small reserve of your top 5-10 styles so a single viral reel doesn't wipe them out in an hour with weeks of restock lead time.
- 🟡 **'Notify me' / waitlist on sold-out sizes** — During a sale many visitors hit sold-out sizes; capturing their number/email turns lost sales into day-one buyers of the restock.
  - *Developer note:* Back-in-stock app/plugin that can message via email and ideally WhatsApp.
- 🟡 **Festive gift packaging option at checkout** — A paid gift-wrap option earns margin and wins Rakhi/Diwali gift orders that would otherwise go to Myntra.

## Automated sale pricing, banners and countdowns

- 🟢 **Scheduled price changes that flip on/off automatically at midnight IST** — Indian sales start at 12:00 am — nobody should be manually editing 200 product prices at midnight, and prices must revert automatically when the sale ends so you don't accidentally sell at sale price for an extra week.
  - *Developer note:* Use the platform's scheduled-sale feature or an app (e.g., a bulk price editor with scheduling); verify it uses IST, not UTC, and test the auto-revert.
- 🟢 **Scheduled homepage banners and announcement strip** — The sale banner, top strip ('Flat 40% off — ends tonight') and menu links should appear and disappear on schedule with the prices, so the site never advertises a sale that isn't running.
  - *Developer note:* CMS sections with publish/unpublish datetimes; keep banner image sizes mobile-first since most traffic is phones.
- 🟢 **Correct MRP + sale price display (strike-through)** — Indian law requires showing MRP, and shoppers only trust a discount when they can see the original price crossed out next to the sale price.
  - *Developer note:* Legal Metrology: MRP must be displayed; 'compare at price' field on every product.
- 🟢 **Coupon engine with limits** — Coupons need rules — one use per customer, expiry date, minimum order value, specific products only — or a code leaked to a coupon site drains your margin overnight.
- 🟡 **Auto-built 'Sale' collection page** — A page that automatically shows everything currently discounted saves manual curation and is where most sale traffic should land.
  - *Developer note:* Auto-collection rule: 'compare-at price is set' or a 'sale' tag applied by the bulk-pricing tool.
- 🟡 **Countdown timers ('Sale ends in 04:32:10')** — A visible countdown creates urgency and measurably lifts festive conversion, especially in the last hours.
- 🟢 **Post-sale price audit** — After every sale, a quick report should confirm all prices, banners and coupons actually reverted — leftover sale prices are silent margin leaks.
  - *Developer note:* Simple export/report of products where price < compare-at price after end date.
- ⚪ **Flash-sale / limited-drop tooling (hourly deals, purchase queue, per-customer caps)** — Myntra-style hour-by-hour flash deals and hyped limited drops need special tooling; a small brand doesn't need this until volumes are large.
  - *Developer note:* Requires inventory reservation, queue/waiting room, and rate limiting — significant build; defer.

## Site performance under a traffic spike

- 🟢 **Hosting that survives a 10x spike (managed platform or autoscaling)** — One viral Instagram reel or a festive ad can multiply traffic ten times within an hour, and a crashed site during Diwali week is revenue you never get back.
  - *Developer note:* A hosted platform (Shopify/BigCommerce class) absorbs this by default; a custom/self-hosted stack needs autoscaling, caching and a CDN designed in from day 1 — ask which the developer is proposing.
- 🟢 **CDN and compressed, mobile-sized images** — Most festive traffic is on phones on patchy 4G — heavy images are the #1 reason Indian fashion sites feel slow, and slow pages lose impatient sale shoppers.
  - *Developer note:* WebP/AVIF, responsive srcsets, lazy loading; CDN like Cloudflare in front of everything.
- 🟢 **Uptime and payment monitoring with phone alerts** — During a sale you need to know within minutes — not from angry WhatsApp messages — that the site is down or UPI payments are failing.
  - *Developer note:* UptimeRobot/BetterStack-class monitor on homepage + checkout; watch payment-gateway success-rate dashboard (UPI success rates dip under load).
- 🟡 **Load test before the first big sale** — A rehearsal that simulates thousands of simultaneous visitors finds the breaking point in a quiet week instead of on Dhanteras night.
  - *Developer note:* k6/Locust script hitting home, collection, product and checkout pages; mandatory if self-hosted, optional sanity check on a managed platform.
- 🟢 **Oversell protection on the last piece** — When two shoppers buy the last M kurta at the same second, the system must sell it once — overselling during festivals creates the worst cancellations of the year.
  - *Developer note:* Inventory decrement at checkout with proper locking; decide policy for payment-pending stock holds.
- 🟡 **Graceful sold-out and error pages** — If something does break or sell out, the customer should see a friendly page with a WhatsApp link and similar products, not a blank error screen.
- 🟢 **Change freeze during sale windows** — No code updates, app installs or theme edits during a live sale — most self-inflicted outages happen when someone 'quickly fixes' something mid-event.
  - *Developer note:* Process rule; agree it with the developer in writing as part of each sale's runbook.
- ⚪ **Waiting-room / queue page for extreme spikes** — At Myntra scale, a queue page ('you are in line') protects checkout during mega-events — overkill for a small brand today.

## Surge staffing and operations rehearsal

- 🟢 **Packing surge plan** — A sale weekend can mean 5-10x the parcels — line up family/temporary helpers, print pick-lists, and set up an assembly-line packing station before the event, not during it.
  - *Developer note:* Admin must support bulk label printing and picking lists sorted by product/size.
- 🟢 **WhatsApp support surge setup** — 'Where is my order?' messages explode during sales — auto-replies with expected response time, saved quick replies for the top 10 questions, and extended support hours keep customers calm.
  - *Developer note:* WhatsApp Business app quick replies at minimum; WhatsApp Business API with templates once volume grows.
- 🟢 **Self-serve order tracking** — Every customer who can check their own parcel status on the site or via an automatic WhatsApp update is one less support message during the rush.
  - *Developer note:* Courier-aggregator tracking page + automated shipped/out-for-delivery notifications (WhatsApp/SMS).
- 🟢 **Sale-day dry run** — A full rehearsal — place a test order at the sale price, pack it, generate the label, trigger the tracking message — catches broken pieces before real customers do.
- 🟢 **Diwali-day staffing and holiday plan** — Your team (and couriers) also celebrate Diwali — decide in advance which days you pack, which days you pause, and say so on the website.
- 🟡 **Daily sale war-room dashboard** — During an event you need one screen showing orders, revenue, top sellers, sizes running out and payment failures, so you can react the same day (e.g., push a slow style, pull a sold-out banner).
  - *Developer note:* Platform analytics may suffice; otherwise a simple dashboard fed by order webhooks.

## Courier cutoffs and festive delivery promises

- 🟢 **Owner-editable delivery-promise message** — Couriers get overloaded before Diwali and 3-day delivery becomes 8-day — the delivery estimate shown on product and checkout pages must be changeable by you in minutes, without calling the developer.
  - *Developer note:* Make the shipping ETA a CMS text setting, not hard-coded in the theme.
- 🟢 **'Order by [date] for Diwali delivery' cutoff banner** — Publishing the last safe order date protects you from furious 'my outfit didn't arrive for the festival' complaints and actually accelerates orders before the cutoff.
- 🟢 **Advance volume booking with courier partners** — Telling your courier/aggregator your expected festive volumes and confirming pickup slots in advance is often the difference between daily pickups and parcels sitting for three days.
- 🟡 **Multi-courier backup via an aggregator** — When one courier chokes in festive season, you need to switch shipments to another without changing your website — aggregators (Shiprocket/Delhivery-class setups) make this a dropdown, not a project.
  - *Developer note:* Courier-aggregator integration with per-pincode courier selection rules.
- 🟡 **COD controls during sales** — Fake and impulsive COD orders spike during festive sales and each refused parcel costs you two-way shipping — cap COD above a certain order value, or verify big COD orders on WhatsApp before shipping.
  - *Developer note:* Rules engine: COD off above threshold X or for repeat-RTO pincodes; optional COD-confirmation WhatsApp flow; small prepaid discount to nudge UPI.
- 🟡 **Pincode serviceability kept current** — Couriers suspend some pincodes during festive overload — the checkout should refuse or warn on those pincodes instead of taking orders you can't deliver.
  - *Developer note:* Pull serviceability from the aggregator API rather than a static list.
- 🟡 **Proactive delay messages** — One automatic WhatsApp/SMS saying 'festive rush — your order is 2 days delayed, here's tracking' prevents ten angry messages and bad reviews.

## Margin guardrails — never sell below cost

- 🟢 **Cost price recorded on every product** — You cannot protect margin the system doesn't know — each SKU needs its landed cost (fabric, stitching, packaging, inbound shipping) stored in the store admin.
  - *Developer note:* 'Cost per item' field; keep it out of any customer-facing API/feed.
- 🟢 **Floor-price rule per product** — A hard rule — never sell below cost plus a minimum margin — should block the dangerous combination of a deep sale price plus a coupon on top.
  - *Developer note:* If the platform can't enforce it automatically, provide a pre-sale report flagging any SKU where sale price minus max coupon < cost + margin.
- 🟢 **Coupon stacking prevention** — One coupon per order, and no coupons on already-discounted items unless you explicitly choose — stacking is how festive sales quietly go loss-making.
- 🟢 **True-margin discount checklist** — Before finalising a festive discount, subtract everything: GST payable, payment-gateway fees, free-shipping cost, packaging, expected returns cost and ad spend — 40% off often means selling at a loss once these are counted.
  - *Developer note:* A simple spreadsheet template is enough; GST is charged on the discounted selling price shown on the invoice.
- 🟡 **Free-shipping threshold tuned per sale** — Set the free-shipping bar just above your average order value during sales so discounts push customers to add one more item instead of eating your shipping margin.
- 🟡 **Post-event profit review** — Within a week of every sale, compare revenue against product cost, discounts, shipping, returns and ads — so the next event's discount depth is based on real numbers, not vibes.

## The returns wave — 1-2 weeks after every big sale

- 🟢 **Sale-items return policy decided and displayed before the sale** — Decide upfront whether deep-discount items are exchange-only or final-sale, and show it on the product page and checkout — announcing it after complaints start is too late.
  - *Developer note:* Per-product or per-collection policy flag surfaced on PDP, cart and order confirmation.
- 🟢 **Returns capacity plan** — Expect roughly 15-30% of festive fashion orders to come back 1-2 weeks after the event — plan the people, table space and courier reverse-pickup slots for that fortnight in advance.
- 🟢 **Refund timeline promise and status updates** — Most post-sale anger is about refund silence — publish a clear timeline (e.g., refund within 5-7 days of pickup) and send automatic updates at pickup, receipt and refund.
  - *Developer note:* Return-management flow with status webhooks feeding WhatsApp/SMS notifications; COD refunds need a UPI-collection step since there is no card to reverse.
- 🟡 **Exchange-first flow** — Offering a size exchange or store credit before a refund keeps a large share of return revenue in the business.
  - *Developer note:* Return portal with exchange/credit options; credit as discount code or wallet.
- 🟡 **Quality-check and fast restock of returned items** — Returned stock inspected and put back on the website within days can be sold in the same festive window instead of missing the season entirely.
- 🟡 **Return-abuse flags** — Wear-and-return spikes around festivals and weddings — track customers with repeated returns and check tags/condition before refunding.
  - *Developer note:* Per-customer return-rate report; photo evidence step in the return request.
- 🟡 **Post-festive clearance plan for leftovers and returns** — Whatever festive stock and resellable returns remain should have a pre-planned exit — a post-Diwali clearance or the January EOSS — so cash isn't frozen in last season's designs.

## Questions to ask your developer

- Can sale prices, banners and coupons be scheduled to switch on and off automatically at midnight IST — and revert on their own when the sale ends — without anyone editing the site at 12am? Please demo this before the first sale.
- What happens if two customers buy the last piece of a size at the same moment — does the system guarantee it sells only once?
- How much simultaneous traffic can this site handle, and can we run a load test simulating a 10x spike (viral reel scenario) before the first festive sale? If it's a managed platform, which plan limits apply?
- Can I myself change the delivery-promise text and the 'order by X for Diwali delivery' banner from the admin in under 5 minutes, without your help?
- Can the system enforce a floor price per product so that no combination of sale price plus coupon ever sells below my cost — and if not, can you give me a pre-sale report that flags risky items?
- Can coupons be limited to one per order, one per customer, with expiry dates, and be switched off instantly mid-sale if a code leaks?
- Is there a way to preview/test the entire sale (prices, banners, a real test checkout with UPI and COD) the day before it goes live?
- Who is on call on sale nights, what monitoring will alert us within minutes if the site or UPI payments fail, and do we agree to a no-changes freeze during live sales?
- Can we cap or disable COD above a certain order value or for specific pincodes during sale events, and offer a small prepaid/UPI discount instead?
- How quickly can a sold-out product, wrong price, or stale banner be pulled from the site mid-sale, and who has admin access to do it at midnight?
- Does the returns flow support exchange-only or final-sale flags on specific sale products, and automatic refund-status messages on WhatsApp/SMS?
- After each sale, can you give me a report showing any products whose prices or banners failed to revert, plus size-level sales so I can plan the next event's stock ratios?

## What you (the owner) must provide

- [ ] A 12-month sale calendar (Diwali/festive, wedding season, EOSS Jan & July, Rakhi, Eid, Republic Day, Independence Day, payday offers) with dates and planned discount depth, locked 8-10 weeks before each event.
- [ ] Landed cost price for every SKU (fabric + stitching + packaging + inbound shipping, with GST treatment) so floor prices and margin checks are possible.
- [ ] The festive stock buy plan: quantities, size ratios, and manufacturer/tailor lead times — ordered early enough to arrive before the event.
- [ ] Courier partner commitments: festive cutoff dates, pickup slots, expected-volume notification, and a backup courier/aggregator account.
- [ ] Banner creatives and sale copy for each event (mobile-first sizes, English/Hindi as appropriate), delivered at least a week before go-live.
- [ ] The sale returns policy decision (full returns vs exchange-only vs final sale on deep discounts) and refund timeline, written in plain language for the site.
- [ ] A staffing roster for sale weeks: extra packers, WhatsApp support cover, extended hours, and which Diwali days the business pauses.
- [ ] Packaging material orders (boxes, polybags, tape, invoices, gift wrap) sized for 2-3x normal volume, placed before the peak.
- [ ] Decisions on gifting features for Rakhi/Diwali: gift wrap price, gift note, and whether invoices hide prices on gift orders.
- [ ] Ad budget and profit target per event, plus WhatsApp/email subscriber opt-in collected from day 1 so sales can be pre-announced.
- [ ] A physical stock count completed and synced to the website in the week before every major sale.
- [ ] GST registration details and confirmation with the accountant on invoicing discounted prices during sales.
