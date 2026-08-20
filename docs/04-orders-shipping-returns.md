# Orders, shipping & returns

> Part 4 of 14 of the Vawehall e-commerce scope. Full area: **Orders, shipping, returns & exchanges**.
> 76 work items — 🟢 45 needed at launch · 🟡 25 in phase 2 · ⚪ 6 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Order lifecycle & statuses

- 🟢 **Standard order status flow** — Every order should move through clear stages (Placed, Confirmed, Packed, Shipped, Out for Delivery, Delivered, Cancelled, Returned) so you and the customer always know where it is.
  - *Developer note:* Model as a state machine with allowed transitions and timestamps per transition; never allow illegal jumps (e.g., Delivered to Packed).
- 🟢 **Pending-payment / payment-failed state** — UPI payments in India often fail or hang midway; you need a state that holds the order until payment confirms, and auto-cancels or retries if it never does.
  - *Developer note:* Handle payment-gateway webhooks (Razorpay/Cashfree) with reconciliation job for missed webhooks; auto-expire unpaid orders after e.g. 30 minutes and release stock.
- 🟢 **COD confirmation step** — Fake and impulsive COD orders are the biggest money-drain in Indian fashion e-commerce; confirming COD orders via OTP or WhatsApp before shipping cuts losses.
  - *Developer note:* OTP at checkout for COD, or post-order WhatsApp/IVR confirmation; unconfirmed COD orders held in a 'To Confirm' state.
- 🟢 **Customer self-cancellation window** — Letting customers cancel before the order ships avoids paying for shipping and return on an order nobody wants.
  - *Developer note:* Allow cancel until status = Shipped; trigger auto-refund for prepaid; restock inventory.
- 🟡 **Partial shipment / split orders** — If one item in an order is out of stock or ships later, you can send the rest instead of holding the whole order.
  - *Developer note:* Order splits into multiple shipments, each with its own AWB and tracking; refunds and returns must work per line item.
- 🟡 **Order edit before dispatch** — Customers often message on WhatsApp to change size or address right after ordering; editing the order beats cancelling and re-ordering.
  - *Developer note:* Admin-side edit of address/size/qty while status < Packed; recalculate totals, re-check pincode serviceability, log every change.
- 🟢 **Stock reservation on order** — Prevents selling the same last piece to two customers at once.
  - *Developer note:* Decrement/reserve inventory at payment success (prepaid) or COD confirmation; release on cancel/expiry.
- 🟢 **Order history & timeline log** — A full audit trail of who did what to an order (status changes, edits, refunds) protects you in disputes with customers and couriers.
- 🟢 **Guest order lookup** — Many mobile-first customers won't create accounts; they must still be able to find their order using phone number + OTP.

## Order management for the seller (admin panel)

- 🟢 **Orders dashboard with filters** — One screen showing new, to-pack, to-ship, in-transit, NDR, and return orders is where you'll live every day; without it you'll drown in spreadsheets.
  - *Developer note:* Filter by status, date, payment type (COD/prepaid), courier, pincode/state; search by phone, order ID, AWB.
- 🟢 **New-order alerts to owner** — You should hear about every order instantly on your phone so nothing sits unpacked.
  - *Developer note:* WhatsApp/email/push notification to admin on new order and on NDR/return events.
- 🟢 **Picklist & packing slip printing** — A printed list of what to pull from your shelf and what goes in each box prevents wrong-item shipments, which is the number-one avoidable return.
  - *Developer note:* Batch picklist grouped by SKU/size; per-order packing slip; support thermal (4x6) and A4 printers.
- 🟢 **GST-compliant invoice generation** — Every order legally needs a proper tax invoice with your GSTIN, HSN codes for garments, and correct CGST/SGST/IGST split by state.
  - *Developer note:* Apparel GST: 5% below Rs 1,000 per piece and higher slab above (verify current rates at build time); invoice number series per financial year; B2B orders need buyer GSTIN field.
- 🟢 **Bulk actions on orders** — When 40 orders come in after an Instagram post, you need to confirm, print labels, and manifest them in a few clicks, not one by one.
- 🟡 **Internal order notes & tags** — Notes like 'customer wants delivery after 25th' or 'repeat returner' keep context attached to the order instead of in your head.
- 🟢 **Manual order creation (WhatsApp/Instagram orders)** — Early on, many orders will come via DMs and WhatsApp; staff must be able to punch them into the same system so inventory and shipping stay in one place.
  - *Developer note:* Admin creates order with payment link (UPI) or COD flag; shares link via WhatsApp.
- 🟡 **Fraud/risk flags on orders** — Highlighting risky orders (high-value COD, pincode with heavy RTO history, repeat refuser) lets you decide to ship prepaid-only or call first.
  - *Developer note:* Simple rules engine at first; Shiprocket exposes COD risk scores you can reuse.
- 🟡 **Daily operations reports** — Counts of orders shipped, pending, delivered, RTO, and returns per day tell you if operations are slipping before customers complain.
- 🟡 **Staff roles & permissions** — A packer shouldn't be able to issue refunds; limited logins prevent mistakes and misuse as you hire help.

## Shipping aggregator & courier integration

- 🟢 **Shipping aggregator integration (Shiprocket / Delhivery / others)** — An aggregator gives you 10+ couriers, discounted rates, COD support, and one dashboard without signing separate courier contracts — essential for a small brand.
  - *Developer note:* Integrate one aggregator API (Shiprocket, Delhivery One, Pickrr, iThink, NimbusPost); abstract behind an internal shipping interface so you can switch later.
- 🟢 **Automatic shipment creation on order** — Orders should flow to the courier system without retyping addresses, which is slow and causes address errors.
  - *Developer note:* Push order to aggregator API on 'Ready to Ship'; store AWB, courier name, expected delivery date back on the order.
- 🟡 **Courier selection rules** — Different couriers are better for different pincodes and COD vs prepaid; smart selection cuts cost and delivery time.
  - *Developer note:* Start with aggregator's recommended courier; later add rules by zone, weight, COD, and past performance.
- 🟢 **Shipping label (AWB) printing** — Every parcel needs a barcode label the courier can scan; printing them in bulk from the admin saves hours.
  - *Developer note:* 4x6 thermal format PDF from aggregator API; bulk download.
- 🟢 **Manifest generation & pickup scheduling** — The manifest is the signed handover sheet proving which parcels the courier picked up — your only defence if a parcel goes missing before its first scan.
  - *Developer note:* Daily manifest per courier via API; schedule pickup from registered warehouse address.
- 🟢 **Pincode serviceability check at checkout** — Telling the customer upfront 'we deliver to your pincode in 4-6 days' (or that COD isn't available there) prevents orders you can't fulfil.
  - *Developer note:* Aggregator serviceability API with caching; check separately for COD-serviceable and prepaid-serviceable; show estimated delivery date on product page too.
- 🟢 **Weight & dimension setup per product** — Couriers bill by volumetric weight; wrong weights lead to surprise 'weight discrepancy' charges that quietly eat margins.
  - *Developer note:* Store dead weight + LxBxH per SKU; monitor aggregator weight-dispute panel; keep photos/weighing records for disputes.
- ⚪ **Shipment insurance for high-value orders** — Lost or damaged parcels above a value threshold should be insured so one lost premium jacket doesn't wipe out a day's profit.
- ⚪ **Multi-warehouse / pickup location support** — If you later ship from home plus a small warehouse or a tailor's unit, the system should pick the right pickup address per order.
- ⚪ **Hyperlocal/same-city delivery option** — Same-day delivery in your own city via Dunzo/Porter/Borzo delights local customers and builds word of mouth.

## Shipping charges & delivery promise

- 🟢 **Free shipping above threshold** — 'Free shipping above Rs 999' is the single most effective nudge to increase order value in India.
  - *Developer note:* Configurable threshold; show 'Add Rs X more for free shipping' progress bar in cart.
- 🟢 **Flat/tiered shipping fee below threshold** — A simple flat fee (e.g., Rs 79) below the free limit keeps checkout understandable and covers part of your courier cost.
- 🟢 **COD handling fee** — COD costs you extra (courier COD charge + higher RTO risk); a small COD fee (Rs 30-50) offsets it and nudges people to prepay.
  - *Developer note:* Configurable; also support the inverse — a prepaid discount (e.g., 5% off on UPI) which often converts better than a COD fee.
- 🟢 **COD availability rules** — You should be able to switch COD off for specific pincodes, high cart values, or sale items where losses hurt most.
  - *Developer note:* Rules: max COD order value, blocked pincodes, prepaid-only products, block customers with prior refusals.
- 🟡 **Estimated delivery date display** — Customers who see a realistic date complain less and refuse fewer COD parcels.
  - *Developer note:* Derive from aggregator EDD API per pincode; show on product page and checkout.
- 🟡 **Dispatch SLA promise** — Publicly promising 'ships within 24/48 hours' and tracking it internally keeps operations honest.

## COD money handling

- 🟢 **COD remittance tracking & reconciliation** — Couriers collect your cash and pay it back in weekly cycles; without reconciliation you will not notice missing money — this is where small sellers silently lose thousands.
  - *Developer note:* Import/ingest aggregator COD remittance reports via API; match every remitted order against delivered COD orders; dashboard for 'delivered but not yet remitted' with ageing.
- 🟡 **COD remittance cycle visibility** — Knowing that roughly Rs X of your cash is stuck with couriers on any day is essential for buying fabric and paying suppliers.
  - *Developer note:* Typical remittance is 2x-3x weekly with 7-10 day lag; consider early-COD paid options and reflect their fees.
- 🟡 **Deduction & dispute log** — Weight disputes, COD charges, and RTO fees get deducted from your remittance; a log ensures every deduction is checked, not just accepted.

## Tracking & customer notifications

- 🟢 **Branded order tracking page** — A tracking page on your own site (not a courier's confusing page) reduces 'where is my order' messages, which will otherwise flood your WhatsApp.
  - *Developer note:* Pull tracking events from aggregator webhook/polling; link from all notifications; works for guest orders via phone+OTP.
- 🟢 **WhatsApp order notifications** — Indian customers live on WhatsApp; confirmations, shipping updates, and delivery alerts there get read, unlike email.
  - *Developer note:* WhatsApp Business API via BSP (Interakt/Wati/Zoko/Gupshup or aggregator's built-in 'engage' add-ons); pre-approved templates for: order placed, COD confirm, shipped with tracking link, out for delivery, delivered, NDR, refund done.
- 🟢 **SMS fallback notifications** — Some customers aren't reachable on WhatsApp; SMS ensures the tracking link still reaches them.
  - *Developer note:* DLT registration of sender ID and templates is mandatory in India — start this paperwork early, it takes days.
- 🟢 **Email notifications with invoice** — Email is the record-keeping channel: order confirmation with GST invoice attached looks professional and helps customers who need bills.
- 🟡 **Delay & exception alerts** — Proactively telling a customer 'your parcel is delayed by 2 days' prevents the angry call and the COD refusal.
  - *Developer note:* Trigger when courier EDD slips or shipment has no scan movement for 48h.
- 🟡 **Delivery confirmation nudge** — A 'Did you receive your order? Reply if any issue' message catches problems early and opens the door for a review request.

## NDR (non-delivery) handling

- 🟢 **NDR dashboard & alerts** — When a courier says 'customer not available / address wrong / refused', you have roughly 24-72 hours to act before the parcel is sent back at your cost — you must see these cases immediately.
  - *Developer note:* Consume NDR webhooks from aggregator; show reason code, attempt count, and action buttons (reattempt, update address/phone, mark RTO).
- 🟡 **Automated customer outreach on NDR** — Most 'customer not available' cases resolve if the customer gets a WhatsApp saying 'delivery failed, tap to reschedule or confirm address' — automation saves the sale without you calling everyone.
  - *Developer note:* WhatsApp/SMS/IVR flow feeding the customer's response back to the courier via aggregator NDR action API.
- 🟡 **Fake-delivery-attempt dispute flow** — Couriers sometimes mark 'customer refused' without attempting delivery; a one-click way to dispute keeps them honest.
- ⚪ **NDR reason analytics** — Knowing whether NDRs are mostly bad addresses, unreachable phones, or refusals tells you which fix (address validation, COD confirmation) to invest in.

## Returns & exchanges (critical for fashion)

- 🟢 **Self-service return/exchange portal** — Fashion sees 20-30% returns, mostly size issues; customers must be able to raise a return or exchange themselves from the order page instead of messaging you.
  - *Developer note:* Per-line-item request with reason codes (size too small/large, quality, wrong item, not as pictured, changed mind) and photo upload for damage claims.
- 🟢 **Size exchange as first option** — An easy 'exchange for another size' keeps the sale and the customer; the portal should push exchange before refund.
  - *Developer note:* Check replacement size stock in real time and reserve it; forward shipment of new size can go out on reverse-pickup confirmation rather than after QC, as a configurable trust setting.
- 🟢 **Configurable return window & eligibility rules** — You need control: e.g., 7-day returns, no returns on innerwear or final-sale items, exchange-only on discounted items.
  - *Developer note:* Per-product and per-category flags; window counted from delivery date from courier data.
- 🟢 **Return request approval queue** — You may want to approve requests manually at first — e.g., to offer a partial refund instead, or reject clear misuse — before a pickup is booked.
  - *Developer note:* Auto-approve rules can come later; keep manual override always.
- 🟢 **Reverse pickup booking** — Customers won't go to a courier office; the courier must collect the return from their doorstep automatically once approved.
  - *Developer note:* Aggregator reverse-shipment API; note reverse serviceability differs from forward — handle pincodes where reverse pickup isn't available (customer self-ship with courier-cost reimbursement).
- 🟢 **Return status tracking & notifications** — Customers get anxious about returns even more than deliveries — 'pickup done', 'received at warehouse', 'refund issued' updates stop the daily WhatsApp pings.
- 🟢 **Quality check (QC) on returned items** — You must inspect returns before refunding — used, damaged, or swapped items (a real scam: customers return a different cheap garment) should be refused.
  - *Developer note:* QC checklist per return: tags intact, unworn, correct item vs SKU photos; many couriers offer doorstep QC with photos at pickup for a small fee — strongly consider it as it blocks the fraud at source.
- 🟡 **QC fail handling** — When a return fails inspection, you need a defined path: photos as evidence, refund rejection message, and shipping the item back to the customer.
- 🟢 **Restock or write-off decision on returns** — Passed returns should go straight back into sellable inventory; damaged ones into a write-off/seconds pile — otherwise stock counts drift from reality.
- 🟡 **Return shipping fee policy** — Deciding who pays for return shipping (free for size issues, fee for 'changed mind') balances customer-friendliness against costs, and the system must apply it automatically.
- ⚪ **Serial returner controls** — A small set of customers returns almost everything; flagging them and restricting them to prepaid or exchange-only protects you.
- 🟡 **Store credit option** — Offering instant store credit (maybe +5% bonus) instead of a refund keeps money in your business and often makes customers happier because it's immediate.
  - *Developer note:* Store-credit wallet or single-use coupon codes; must be redeemable at checkout alongside other payments.

## Refunds

- 🟢 **Refunds to original payment method** — Prepaid refunds should go back to the same UPI/card automatically through the payment gateway, with no manual bank transfers.
  - *Developer note:* Gateway refund API; support partial refunds per line item; handle refund-webhook failures with a reconciliation report.
- 🟢 **COD refund via UPI collection** — COD customers paid cash, so you need their UPI ID or bank details to refund — the return portal should collect and validate this upfront, not over WhatsApp later.
  - *Developer note:* Collect UPI ID with a validation ping (Re 1 or name-match API); payout via gateway payouts (RazorpayX/Cashfree Payouts) to keep an audit trail.
- 🟢 **Published refund timeline & status** — Stating 'refund within 5-7 days of QC pass' and showing refund status on the order page kills the most common support question.
- 🟢 **Refund on cancellation & failed payment** — Money captured for cancelled orders or double-paid UPI attempts must auto-refund fast — this is a major trust moment for a new brand.
- 🟡 **Refund register / report** — A monthly list of all refunds with reasons is needed for accounting and to spot patterns like one product driving refunds.
  - *Developer note:* Also needed for GST: credit notes must be issued against original invoices for returns.

## RTO (return-to-origin) cost control

- 🟢 **RTO tracking & receiving flow** — RTO parcels (undelivered orders coming back) pile up in a corner if untracked; each must be received, opened, checked, and restocked so the inventory and the loss are recorded.
  - *Developer note:* RTO status from courier webhooks; a 'receive RTO' screen that restocks items and records the shipping loss per order.
- 🟡 **RTO rate monitoring** — RTO on COD orders can run 15-30% and each one costs you two-way shipping; tracking the rate by pincode, product, and courier tells you where to act.
- 🟡 **Prepaid conversion tactics** — The cheapest RTO is the one that becomes a prepaid order: partial COD advance, prepaid discounts, and 'pay on WhatsApp link after order' features directly cut RTO.
  - *Developer note:* Gateway features like Razorpay Magic Checkout / partial payment for COD; measure conversion impact.
- 🟢 **Address quality validation at checkout** — Bad addresses cause both NDR and RTO; small checks (pincode auto-fills city/state, minimum address length, phone number format) prevent them cheaply.
- 🟡 **COD blocklist** — Customers who refused parcels before should quietly stop seeing the COD option.

## Packaging & dispatch

- 🟢 **Packaging spec & materials list** — Standard poly mailers/boxes in 2-3 sizes with the right courier-safe sealing protect garments in transit and keep volumetric weight (your shipping bill) predictable.
  - *Developer note:* Not software, but the site/admin should store per-SKU packaging type so weights sent to couriers are accurate.
- 🟢 **Mandatory in-parcel documents** — Each parcel needs the invoice (or invoice QR) and ideally a return-instructions card; missing invoices cause problems in transit checks.
  - *Developer note:* For inter-state B2B or where applicable, e-way bill rules can apply above value thresholds — confirm with the CA; most B2C courier shipments are covered by courier processes but keep invoices accurate.
- 🟡 **Packing verification step** — Scanning or ticking off each item against the packing slip before sealing prevents wrong-size shipments — the most common self-inflicted return.
  - *Developer note:* Barcode scan of SKU label vs order lines; even a checkbox flow helps at small scale.
- 🟡 **Packing video/photo for high-value or dispute-prone orders** — A 10-second video of the sealed parcel is your evidence against 'empty box' and 'wrong item received' claims.
- 🟡 **Branded unboxing touches** — A thank-you card, tissue wrap, and a small discount code for the next order turn a delivery into marketing — cheap and memorable for a new brand.
- ⚪ **Tamper-evident packaging for COD** — Tamper-evident bags reduce pilferage claims and courier disputes on COD parcels.

## Questions to ask your developer

- Which shipping aggregator will we integrate first (Shiprocket, Delhivery One, iThink, NimbusPost), and will the integration be behind an abstraction so we can switch or add a second one without rebuilding?
- How will courier tracking updates reach our system — webhooks, polling, or both — and what happens to order statuses if the aggregator's webhooks fail for a day?
- How exactly is the COD flow protected: OTP or WhatsApp confirmation before shipping, COD fee/limits, pincode-level COD blocking, and a blocklist for repeat refusers?
- Show me the NDR workflow end to end: how fast do I see a failed delivery, what actions can I take from the admin, and can the customer respond via WhatsApp to trigger a reattempt?
- How does the size-exchange flow work — does the replacement ship after reverse pickup is done or after QC, and how is the replacement size reserved in inventory?
- How are refunds executed for prepaid vs COD orders, what's the automation level, and how do we collect and validate a COD customer's UPI details safely?
- How will COD remittance reconciliation work — can the system automatically match courier remittance files against delivered orders and flag missing money?
- Are invoices fully GST-compliant (GSTIN, HSN codes for apparel, CGST/SGST/IGST by state, credit notes on returns), and has this been checked against current GST rates for garments?
- What exactly is sent to the courier as weight and dimensions per order, and where do I see and contest weight-discrepancy charges?
- Which WhatsApp Business API provider are we using, what will monthly message costs look like at ~500 orders, and who registers the SMS DLT templates?
- If we start on Shopify/WooCommerce instead of custom code, which of these features come from apps/plugins vs custom work, and what are the recurring app costs?
- What happens when a return pincode has no reverse-pickup service — is there a customer self-ship flow with reimbursement?
- Can order statuses, return reasons, shipping rules (free-shipping threshold, COD fee), and return windows be changed by me from the admin without a developer?
- What reports will I get on day 1: daily shipped/delivered/RTO counts, pending NDRs, refunds issued, COD outstanding with couriers?

## What you (the owner) must provide

- [ ] GST registration (GSTIN), business PAN, and current-account bank details — needed for payment gateway, aggregator KYC, and invoicing
- [ ] Signed-up accounts: shipping aggregator (Shiprocket/Delhivery etc.), payment gateway (Razorpay/Cashfree), WhatsApp Business API provider — with KYC completed
- [ ] Registered pickup/warehouse address(es) and pickup timing for courier collection
- [ ] Accurate weight and packed dimensions for every product/SKU (weigh and measure them packed, not loose)
- [ ] HSN codes and GST rates for your garment categories — confirm with your CA, including the price-slab rule for apparel
- [ ] Your policies in writing: return window (e.g., 7 days), non-returnable items (innerwear, sale items), who pays return shipping, refund timeline, exchange rules
- [ ] Shipping pricing decisions: free-shipping threshold, flat fee below it, COD fee or prepaid discount, maximum COD order value
- [ ] Packaging materials purchased and specced (2-3 mailer/box sizes, tape, thank-you cards, return-instruction card content)
- [ ] Text/tone for all customer messages: order confirmation, shipped, out-for-delivery, NDR, return approved, refund done — in the language(s) your customers use
- [ ] SMS DLT registration (entity + templates) via your SMS provider — start early, it involves paperwork and waiting
- [ ] A decision on doorstep QC for returns (small per-pickup fee vs fraud protection) and your QC checklist for returned garments
- [ ] Customer support hours and the WhatsApp number that will handle order queries, plus who on your team answers it
- [ ] Terms & conditions and return/refund policy pages reviewed by you (and ideally a CA/lawyer) before launch — couriers and payment gateways require them
- [ ] A working budget for shipping losses: expected RTO percentage and per-parcel two-way cost, so pricing includes it
