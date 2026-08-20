# Daily operations & soft launch

> Part 14 of 14 of the Vawehall e-commerce scope. Full area: **Day-to-day operations runbook, staffing & soft launch**.
> 60 work items — 🟢 45 needed at launch · 🟡 13 in phase 2 · ⚪ 2 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## The written daily runbook (SOP)

- 🟢 **Order cutoff time and dispatch promise** — Pick a firm rule like 'orders placed by 2pm ship the same day, later orders ship next day' and publish it on the site — customers forgive slow delivery but not silence about it.
  - *Developer note:* Store the cutoff as a setting and show a live countdown on product/cart pages ('Order in 1h 20m to ship today'). Auto-skip Sundays and a configurable holiday list.
- 🟢 **Morning opening checklist** — A fixed 15-minute routine every morning: review overnight orders, failed payments, unconfirmed COD orders, yesterday's undelivered parcels, and confirm today's courier pickup is booked.
- 🟢 **COD confirmation step before shipping** — WhatsApp or call every Cash-on-Delivery order before packing it — unconfirmed COD orders are the biggest source of refused parcels that come back at your cost (RTO).
  - *Developer note:* Auto-send a WhatsApp confirmation message with a confirm/cancel link on COD orders; hold COD orders in a 'pending confirmation' status until confirmed.
- 🟢 **Mark orders shipped the same day with tracking** — The moment a parcel is handed to the courier, update the order with the tracking number so the customer gets a tracking link automatically — this alone prevents most 'where is my order' messages.
  - *Developer note:* Aggregator integration (Shiprocket/Delhivery/iThink) should push the AWB back to the order and trigger WhatsApp/SMS/email with the tracking link.
- 🟢 **Daily NDR (failed-delivery) follow-up** — Check the courier panel every day for parcels marked 'customer unavailable / wrong address / refused' and call that customer the same day — couriers only reattempt 2-3 times before returning the parcel, so a missed day is a lost sale.
  - *Developer note:* Surface the aggregator's NDR list in the admin dashboard or at least link to it; some aggregators can auto-WhatsApp the customer on NDR.
- 🟢 **End-of-day closing checklist** — Before closing: verify every packed order was actually picked up (get proof of pickup), rebook any missed pickup for tomorrow, note items that went out of stock, and clear the WhatsApp inbox.
- 🟢 **Printed SOP binder / shared document** — Write all of the above down in one simple document kept at the packing table and on Google Docs — the test is whether a family member could run the store for a day using only the document.
- 🟢 **Holiday and no-pickup calendar** — Couriers do not pick up on Sundays and many festivals; know these dates in advance and adjust the shipping promise shown on the site so you never promise same-day dispatch on a day nobody will come.
  - *Developer note:* A simple editable holiday list that pauses the 'ships today' banner.

## Pick, pack & dispatch routine

- 🟢 **Packing station and supplies checklist** — A fixed table with poly mailers/boxes, tape, scissors, thank-you cards, printed invoices, and labels — plus a written reorder point (e.g., reorder mailers when 50 remain) so you never stop shipping because you ran out of bags.
- 🟢 **Standard pick-pack steps with quality check** — A short written sequence for every order: pull the exact SKU and size, inspect for stains/loose threads, fold, pack, insert the invoice, seal, stick the label — a checklist prevents the wrong-size mistakes that create returns.
  - *Developer note:* Printable packing slips showing SKU, size, colour and quantity; barcode scanning to verify the right item is a good phase-2 upgrade.
- 🟢 **GST invoice inside every parcel** — Every shipment must carry a proper GST invoice (your GSTIN, HSN code, tax breakup) — couriers can hold parcels without one and customers expect it.
  - *Developer note:* Invoice must switch between CGST+SGST (same state) and IGST (inter-state) based on delivery address; garments under Rs 1,000 and over Rs 1,000 attract different GST rates.
- 🟢 **Weigh and measure every parcel before booking** — Courier aggregators auto-deduct money later if the courier claims your parcel weighed more than declared — keep a small weighing scale, record the weight, and you can dispute these charges instead of silently losing margin.
  - *Developer note:* Store actual weight and dimensions per order; keep standard weight presets per product to speed this up.
- 🟢 **Packing photo/video for COD and high-value orders** — A 10-second phone video of the item going into the parcel is your only defence against 'empty box' or 'wrong item' claims from customers and couriers — takes seconds, saves thousands.
- 🟢 **Manifest and pickup handover proof** — When the pickup rider comes, get the manifest signed or scanned — if a parcel vanishes between your door and the courier hub, this paper is what makes the claim yours to win.
- 🟢 **Missed-pickup fallback plan** — Pickups get missed; know in advance the nearest courier drop-off point and a second courier option so a missed pickup costs you hours, not a broken same-day promise.
- 🟡 **Thermal label printer and bulk printing** — Printing all labels and invoices in one batch each morning instead of one by one saves 30+ minutes a day once volume grows.
  - *Developer note:* Bulk print packing slips + labels in 4x6 thermal format from the orders screen.

## WhatsApp & customer support routine

- 🟢 **Published support hours and response-time promise** — State it on the site and WhatsApp profile, e.g., 'We reply within 2 hours, 10am-7pm Mon-Sat' — a promise you keep beats 24/7 support you can't deliver.
- 🟢 **WhatsApp Business on a dedicated business number** — Use a separate SIM/number registered as the business, not the founder's personal number — so it can be handed to a helper, shown on the website, and survives a lost personal phone.
  - *Developer note:* Free WhatsApp Business app is enough at launch; WhatsApp Business API (via BSPs like Interakt/Wati/AiSensy) only when multiple agents or automation is needed.
- 🟢 **Quick replies for the top 10 questions** — Pre-saved answers for size chart, delivery time, COD availability, return policy, order status, and payment issues — most Indian shoppers will ask on WhatsApp before and after buying, and canned replies keep answers fast and consistent.
- 🟢 **Greeting and away messages** — An instant auto-reply ('Got your message, we reply within 2 hours between 10am-7pm') buys you breathing room and stops customers from feeling ignored at midnight.
- 🟢 **Support log of promises made** — Every promise ('we'll refund you', 'replacement ships Monday') gets written into the order's notes immediately — an unrecorded promise is a future angry customer.
  - *Developer note:* Order notes/timeline field in admin is enough; avoid promises living only in WhatsApp chat history.
- 🟡 **Self-serve order tracking page** — A 'track your order' page where customers enter their phone/order number cuts the single biggest category of WhatsApp messages.
  - *Developer note:* Aggregators provide brandable tracking pages; link them from order messages.
- 🟡 **Escalation rules for the support person** — Write down what a helper can decide alone (resend tracking, answer sizing) and what needs the founder (refunds above Rs X, angry customers, legal threats) — so support doesn't stall when the founder is busy.
- ⚪ **Shared team inbox on WhatsApp API** — When two or more people answer chats, a shared inbox with assignment and history prevents double replies and dropped conversations.

## Staffing, roles & backup coverage

- 🟢 **Who-does-what list (even for a team of one)** — Write the daily jobs as roles — order confirmer, packer, dispatcher, support, money reconciler — even if one person does all five today; it makes handing over any one job possible later.
- 🟢 **All accounts on business email, not personal** — Store admin, courier aggregator, payment gateway, WhatsApp and domain must be registered to a business email and number — otherwise a lost phone or one unavailable person locks the entire store.
- 🟡 **Named and trained backup person** — One specific family member or helper who has actually packed orders and answered WhatsApp for a full day — the founder falling sick or attending an exhibition is a certainty, not a risk.
- 🟡 **Staff logins with limited permissions** — The backup person gets their own login that can process orders and answer chats but cannot see finances or change settings — safer than sharing the founder's password.
  - *Developer note:* Role-based admin accounts; use a password manager for the remaining shared credentials (courier panel, WhatsApp).
- 🟡 **Travel/exhibition protocol** — A pre-written plan for planned absences: either hand over to the backup, pre-pack known orders, or switch the site banner to 'orders ship from <date>' before leaving — decided in advance, not from a train.
- 🟡 **Sick-day skeleton routine** — A written 30-minute minimum that keeps the store alive on a bad day: confirm CODs, send one honest delay message to pending orders, reschedule pickup, set WhatsApp away message.
- ⚪ **Hiring trigger for a part-time packer** — Decide in advance the number (e.g., 20 orders/day sustained for 2 weeks) at which you hire packing help — waiting until you're drowning means quality drops exactly when the brand is growing.

## Vacation / pause mode

- 🟢 **One-click store pause** — A single switch that puts a clear banner on the site and either stops checkout or shows 'orders placed now ship from <date>' — so illness, festivals or a family event never turn into silently broken promises.
  - *Developer note:* Theme setting or small app; cheapest fallback is a site-wide announcement bar plus setting expected dispatch date. Avoid marking everything out-of-stock (hurts SEO and looks dead).
- 🟡 **Accept-but-delay option** — Prefer taking orders with an honest 'ships from 28 Aug' notice over closing entirely — you keep the revenue and customers who agreed to wait rarely complain.
- 🟡 **Pause the marketing with the store** — When paused, also pause ads and scheduled posts — paying to acquire orders you cannot ship is burning money twice.
- 🟢 **Auto-replies everywhere during pause** — WhatsApp away message and email auto-reply both state the reopening date and that existing orders/queries will be handled on return — silence during a pause is what creates chargebacks and bad reviews.

## Lost, damaged & disputed shipments (claims process)

- 🟢 **Written claims SOP with deadlines** — One page that says exactly what to do when a parcel is lost or arrives damaged: most aggregators accept lost-parcel claims only within roughly 15-30 days and damage claims within 24-48 hours of delivery — miss the window and the money is simply gone.
  - *Developer note:* Deadlines and evidence requirements differ per aggregator (Shiprocket, Delhivery Direct, iThink etc.) — pull the exact terms from the chosen one and put them in the SOP.
- 🟢 **Evidence kit collected at packing time** — Claims are won with proof gathered before anything goes wrong: packing photo/video, recorded weight, invoice copy, AWB number, signed pickup manifest — trying to assemble this after a loss usually fails.
- 🟢 **Know the compensation cap per shipment** — Aggregators cap payouts on uninsured parcels (commonly a few thousand rupees or a multiple of freight) — know your cap so you're never shipping a Rs 8,000 lehenga with Rs 2,000 of protection without deciding to.
- 🟢 **Transit insurance rule for high-value parcels** — Decide a simple threshold (e.g., insure every parcel above Rs 3,000) — insurance is a small percentage of value ticked at booking time, and the rule removes the need to think about it per order.
- 🟢 **Customer-first policy during claims** — Refund or replace the customer on your own timeline and chase the courier claim separately — making a customer wait 30 days for a courier's decision loses them forever.
- 🟢 **Returned-parcel (RTO) inspection routine** — Open every returned parcel on camera the day it arrives, check the item is yours and intact, then restock or write it off — RTO parcels are where missing and swapped items hide.
  - *Developer note:* Order status for 'RTO received - inspected' and a restock action that puts inventory back.
- 🟡 **Claims tracker sheet** — A simple list of every claim: AWB, date filed, deadline, status, amount recovered — without it, filed claims quietly expire and small losses add up.

## Soft launch: the dress rehearsal

- 🟢 **10-20 real orders from friends and family before going public** — Real orders, real money, real couriers — this is the only way to discover the checkout bug, the invoice error, or the pickup that never comes while the audience is forgiving.
  - *Developer note:* Hide the store behind a password or unlisted link while keeping payments live; plan how test orders will be refunded.
- 🟢 **Spread testers across pincodes** — Include a metro, a tier-2/3 city, and at least one remote pincode — this reveals which areas your courier actually serves, real delivery times, and COD availability gaps before a stranger finds them.
- 🟢 **Cover every payment method** — At least one order each via UPI, COD, credit/debit card and netbanking, plus one deliberately failed/abandoned payment — you need to see what both the customer and the owner see in each case.
  - *Developer note:* Verify payment webhooks mark orders paid correctly, and that a failed payment doesn't create a ghost order or double-charge.
- 🟢 **Verify the paper trail on every test order** — Check each invoice for correct GSTIN, HSN code, tax split (CGST+SGST within state, IGST outside), prices and address — invoice mistakes found now cost minutes; found by the tax department, much more.
- 🟢 **Test one return and refund end-to-end** — Have one tester actually return an item: reverse pickup booking, quality check on receipt, and the refund landing back — including a COD refund, which needs collecting the customer's UPI/bank details.
- 🟢 **Test a cancellation and an address change** — One tester cancels after paying, another asks to change the address after ordering — both happen weekly in real life and you need to know the buttons to press.
  - *Developer note:* Confirm the admin can edit the shipping address before dispatch without cancelling and re-creating the order.
- 🟢 **Follow the money to the bank** — Confirm gateway settlements and the COD remittance from the courier actually arrive in the bank account and match the orders — the first reconciliation should happen with 15 orders, not 500.
- 🟢 **Budget-Android mobile test** — Have a tester order on a cheap Android phone on 4G — most of your real traffic will look like this, and slow pages or a broken UPI redirect show up here first.
- 🟢 **Tester feedback form and fix list** — Ask every tester about sizing accuracy, packaging condition, delivery days and checkout friction; fix the list before announcing publicly.
- 🟢 **Go/no-go checklist for public launch** — A short written gate: all soft-launch orders delivered, all issues fixed, refunds tested, pickup reliable for a week — announce publicly only when every box is ticked.

## Weekly & monthly routines (the unglamorous glue)

- 🟢 **Weekly COD remittance reconciliation** — Match the courier's COD payout line-by-line against delivered COD orders every week — courier remittance cycles are 7-15 days and missing money only surfaces if someone looks.
  - *Developer note:* Export of COD orders with delivered date + AWB makes this a 15-minute job against the aggregator's remittance report.
- 🟢 **Weekly weight-discrepancy dispute check** — Open the aggregator's discrepancy panel weekly and dispute wrong weight charges with your recorded weights and photos — disputes usually close within about 7 days, after which the deduction is final.
- 🟢 **Weekly quick stock count of fast movers** — Physically count your top-selling sizes weekly and fix the website count — overselling a size that doesn't exist creates the worst kind of cancellation.
- 🟢 **Weekly packaging supplies check** — Count mailers, tape and invoice paper against the reorder points every week — stock-outs of packaging stop shipping just as surely as stock-outs of clothes.
- 🟢 **Monthly GST data handoff to the accountant** — Export the month's sales report in time for GSTR-1 and GSTR-3B filing dates — a fixed calendar reminder, not a scramble on the deadline.
  - *Developer note:* One-click monthly sales export with taxable value, tax collected, and B2C/B2B split keeps the accountant happy.
- 🟡 **Weekly data export/backup** — Download orders, customers and inventory to a spreadsheet weekly and keep it in cloud storage — your safety net if the platform account is ever locked or an app misbehaves.
- 🟡 **Monthly operations metrics review** — Once a month look at RTO rate, average delivery days per courier, claim recovery, and WhatsApp response time — this is how you decide to switch couriers or change the COD policy with facts instead of feelings.
- 🟡 **Gateway settlement reconciliation** — Weekly check that payment-gateway settlements (minus fees) match online orders — gateway holds and failed settlements are rare but devastating when unnoticed.

## Questions to ask your developer

- Can the site display our dispatch cutoff ('order by 2pm, ships today') with a live countdown, and automatically skip Sundays and a holiday list we control?
- Is there a one-click vacation/pause mode, and what exactly does it do — hide buy buttons, show a banner, or change the estimated dispatch date? Can we take orders with a delayed-shipping notice instead of closing?
- Can we create staff logins with limited permissions (process orders, answer queries) that cannot access finances, settings, or customer exports?
- When we mark an order shipped, does the customer automatically get the tracking link on WhatsApp/SMS/email, and does courier tracking status sync back to the order?
- Which courier aggregator are you integrating (Shiprocket, Delhivery, iThink, etc.), and where will we see NDR (failed delivery) alerts, weight-discrepancy charges, and file loss/damage claims?
- Can COD orders sit in a 'pending confirmation' state until we verify them on WhatsApp, and can a confirmation message with a confirm/cancel link be sent automatically?
- Can we bulk-print packing slips, GST invoices and shipping labels each morning, and does the invoice correctly switch between CGST+SGST and IGST based on the delivery state?
- For the soft launch, can we hide the store behind a password or unlisted link while keeping real payments live, and what is the exact process to refund a test order (UPI, card, and COD)?
- Can the admin edit a shipping address or items on an order before dispatch without cancelling it, and can we export orders/customers/inventory to Excel ourselves anytime?
- Is transit insurance a per-shipment tickbox in the courier integration, and can we set a rule to auto-insure parcels above a value we choose?

## What you (the owner) must provide

- [ ] Decisions to publish on the site: order cutoff time, dispatch promise, support hours, and the response-time promise (e.g., 'replies within 2 hours, 10am-7pm Mon-Sat').
- [ ] A dedicated business phone number/SIM for WhatsApp Business (not the founder's personal number) and a business email that owns all accounts (store, courier, gateway, domain).
- [ ] The written SOP document itself — morning checklist, packing steps, claims steps, end-of-day close — the developer builds the software, not the routines.
- [ ] Names: who does each daily job today, and the designated backup person for packing and support (plus one full training day for them).
- [ ] Pickup address, preferred pickup time window, nearest courier drop-off point, and a second-courier fallback plan.
- [ ] Packing setup purchased: mailers/boxes, tape, thank-you cards, a weighing scale, and (soon) a thermal label printer, with written reorder points.
- [ ] GST details for invoices: GSTIN, correct HSN codes for garments, registered business address, and the accountant who will file GSTR-1/3B.
- [ ] The transit-insurance threshold decision (e.g., insure all parcels above Rs 3,000) and the customer-refund policy during courier claims.
- [ ] A list of 15-20 friends/family across metro, tier-2/3 and one remote pincode, assigned payment methods (UPI, COD, card, netbanking), plus a refund budget for soft-launch test orders.
- [ ] Bank account where COD remittances and gateway settlements land, with online access for weekly reconciliation.
- [ ] A holiday and travel calendar for the next 3 months so pause-mode dates and no-pickup days are planned, not improvised.
