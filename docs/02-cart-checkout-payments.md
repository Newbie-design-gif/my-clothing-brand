# Cart, checkout & payments

> Part 2 of 14 of the Vawehall e-commerce scope. Full area: **Cart, checkout & payments**.
> 81 work items — 🟢 51 needed at launch · 🟡 21 in phase 2 · ⚪ 9 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Shopping cart behavior

- 🟢 **Add to cart with size & colour selection** — Customers must pick a size before adding, so you never get orders you cannot fulfil.
  - *Developer note:* Block add-to-cart until a size is chosen; show size chart link right there.
- 🟢 **Edit quantity and remove items in cart** — Shoppers change their mind constantly; if editing the cart is clumsy they simply leave.
  - *Developer note:* Plus/minus steppers, instant total recalculation without page reload.
- 🟢 **Mini-cart icon with live item count** — A small cart icon on every page reassures the shopper their item was added and gives one-tap access to checkout.
- 🟢 **Cart that survives closing the browser** — Most Indian shoppers browse on mobile in short bursts; if the cart empties when they return, the sale is lost.
  - *Developer note:* Persist cart in local storage for guests and server-side for logged-in users; merge guest cart into account on login.
- 🟢 **Live stock and price re-check in cart and at payment** — Prevents the embarrassing case where a customer pays for something that sold out while it sat in their cart.
  - *Developer note:* Re-validate stock and price at checkout start and again just before payment capture; reserve stock briefly during payment.
- 🟢 **Clear price breakup in cart** — Customers trust you more when they see MRP, discount, delivery fee, and 'You save Rs X' before paying — hidden charges at the last step kill orders.
  - *Developer note:* MRP, item discount, coupon discount, shipping, COD fee (if any), grand total; all prices tax-inclusive.
- 🟢 **Out-of-stock and price-change alerts inside the cart** — If an item in the cart went out of stock or changed price, the shopper should see it flagged, not discover a silent failure at payment.
- 🟡 **Free-shipping progress nudge** — 'Add Rs 200 more for free delivery' is a proven way to raise average order value.
- 🟡 **Save for later / move to wishlist from cart** — Lets hesitant shoppers park items instead of deleting them, so you can win them back later.
- 🟡 **Maximum quantity per item limit** — Stops resellers or mistakes like someone ordering 50 of one T-shirt, which usually ends in a bulk COD refusal.
  - *Developer note:* Configurable per-product and per-order cap in admin.
- 🟡 **Buy Now button (skip cart)** — Single-item impulse buyers convert better when they can jump straight to checkout.
- 🟡 **Cart abandonment reminders on WhatsApp/email** — Most carts are abandoned; a friendly reminder an hour later recovers a meaningful chunk of sales.
  - *Developer note:* Needs WhatsApp opt-in at cart/checkout; use WhatsApp Business API provider (Interakt/Wati/Gupshup) with approved templates.
- ⚪ **Gift wrap and gift message option** — Nice extra revenue during festive season, but not needed on day one.

## Coupons, discounts & offers

- 🟢 **Coupon code box with clear success/failure messages** — Shoppers who have a code will not buy without applying it, and a vague 'invalid coupon' error makes them abandon — say exactly why it failed.
  - *Developer note:* Specific errors: expired, minimum order not met, already used, first-order only.
- 🟢 **Coupon rules you can set yourself** — You should be able to create offers like 'FLAT200 above Rs 999, first order only, valid till Sunday' from the admin panel without calling the developer.
  - *Developer note:* Rules: min order value, flat vs percentage, max discount cap, expiry date, total usage limit, per-customer limit, first-order-only, product/category restrictions.
- 🟢 **One-coupon-at-a-time stacking rule** — Prevents customers combining offers in ways that make you sell at a loss.
- 🟢 **Discount clearly shown in the price breakup** — Seeing the saving applied line-by-line confirms the coupon worked and builds trust.
- 🟢 **Free or discounted shipping rules** — Delivery charges are the number-one surprise that kills Indian checkouts, so you need full control over when shipping is free.
  - *Developer note:* Threshold-based free shipping, flat fee below threshold, separate COD fee — all editable in admin.
- 🟡 **Show available coupons at checkout / auto-apply best offer** — Shoppers leave your site to google coupon codes and often never come back; showing offers in-page keeps them on the page.
- 🟡 **Coupon abuse protection** — Stops one person using a 'first order' coupon ten times with ten phone numbers.
  - *Developer note:* Tie usage limits to phone number and device, not just email; watch same-address repeat use.
- ⚪ **Bank and payment-method offers (e.g. 10% off with a card)** — These co-funded offers boost sales but require gateway/bank tie-ups you will not have at launch.
- ⚪ **Gift cards and store credit** — Store credit is a cheaper way to settle refunds and drives repeat purchases, but is a whole mini-system of its own.
- ⚪ **Referral codes (refer a friend)** — Word-of-mouth growth tool for later, once you have a base of happy customers.

## Checkout flow: guest vs login

- 🟢 **Guest checkout with just a phone number** — Forcing account creation before buying loses a big share of first-time Indian shoppers; a phone number is all you truly need.
- 🟢 **Login/signup via mobile OTP (no passwords)** — Indian customers are used to OTP login; nobody remembers passwords for a new store.
  - *Developer note:* OTP via SMS with WhatsApp OTP as cheaper fallback; rate-limit OTP requests to control SMS cost and abuse. SMS needs TRAI DLT-registered templates.
- 🟢 **Short mobile-first checkout (max 2-3 steps)** — Almost all your traffic will be on phones; every extra screen or field loses buyers.
  - *Developer note:* Single page or clear stepper: contact -> address -> payment. Numeric keyboards for phone/pincode fields. Must stay usable on cheap Android phones and 3G/4G.
- 🟢 **Order review before paying** — A final screen showing items, address, and total prevents wrong-address and wrong-size orders that turn into costly returns.
- 🟢 **WhatsApp updates opt-in checkbox at checkout** — Your customers live on WhatsApp; collecting consent here lets you legally send order updates and offers there.
  - *Developer note:* Store consent timestamp; required for WhatsApp Business API templates.
- 🟡 **Auto-create account after a guest order** — Turns one-time guest buyers into logged-in repeat customers without them filling any extra form.
  - *Developer note:* Account keyed to phone number; next OTP login shows their past orders.

## Address & pincode serviceability

- 🟢 **Address form with pincode-based auto-fill** — Typing the pincode should auto-fill city and state — less typing means fewer mistakes and fewer failed deliveries.
  - *Developer note:* Use an Indian pincode database or courier-aggregator API; validate 6-digit pincode and 10-digit mobile.
- 🟢 **Pincode serviceability check before payment** — Tells the customer upfront whether you deliver to their area (and whether COD works there), instead of cancelling their order later.
  - *Developer note:* Query the courier aggregator (Shiprocket/Delhivery/etc.) serviceability API; separate flags for prepaid and COD serviceability. Also useful as a pincode checker on the product page.
- 🟢 **Estimated delivery date shown by pincode** — 'Delivery by 26 Aug' answers the customer's biggest question and reduces 'where is my order' messages later.
  - *Developer note:* Courier aggregators return estimated days per pincode; add your packing time on top.
- 🟢 **Landmark and address-line fields sized for Indian addresses** — Indian addresses are long and landmark-driven; a cramped form causes delivery failures, which cost you money on COD orders.
  - *Developer note:* Fields: name, mobile, alternate mobile (optional), address line, landmark, pincode, city, state.
- 🟢 **Saved addresses for logged-in customers** — Repeat buyers should never retype their address — pick, pay, done.
  - *Developer note:* Multiple addresses with a default; edit and delete.
- 🟡 **Address labels (Home/Office) and delivery instructions** — Helps couriers deliver on the first attempt, which matters a lot for COD success rates.
- ⚪ **Location/maps-based address autocomplete** — Nice convenience, but Google Maps API costs money and pincode auto-fill covers most of the benefit.

## Payment gateway & online payment methods

- 🟢 **Indian payment gateway integration (Razorpay / Cashfree / PayU)** — One gateway account gives you UPI, cards, netbanking and wallets in a single integration, with money settled to your bank account.
  - *Developer note:* Razorpay is the common default for small brands; compare MDR fees and settlement speed. Owner must complete KYC on the gateway themselves. Use the gateway's hosted/standard checkout at launch — it handles PCI compliance and 3D Secure.
- 🟢 **UPI as the front-and-centre payment option** — UPI is how most of India pays online now; it must be the first option, not buried in a list.
  - *Developer note:* On mobile, use UPI intent flow (taps open GPay/PhonePe/Paytm directly); on desktop show QR code. Handle the 5-10 minute 'payment pending' window UPI can have.
- 🟢 **Debit/credit cards with RBI-compliant tokenization** — Card payments must follow RBI rules — your site should never see or store actual card numbers; the gateway handles all of it.
  - *Developer note:* Gateway-hosted card fields + network tokenization; 3D Secure/OTP is mandatory in India and handled by the gateway.
- 🟢 **Netbanking** — Still used by a chunk of customers, and it comes free with the gateway integration.
- 🟡 **Wallets (Paytm, PhonePe wallet, Amazon Pay, Mobikwik)** — A small but real slice of shoppers prefer wallets; easy to switch on once the gateway is live.
- ⚪ **Pay-later and EMI options (Simpl, LazyPay, card EMI)** — Matters more for expensive items; for typical clothing order values it adds little at first.
- 🟢 **Payment confirmation via server webhooks, not just browser redirect** — If the customer's app or browser crashes right after paying, your site must still record the payment — otherwise you get 'money deducted, no order' complaints.
  - *Developer note:* Treat the gateway webhook as the source of truth; verify webhook signatures; reconcile 'pending' payments with a scheduled status check.
- 🟡 **Settlement reconciliation view** — Lets you match what the gateway deposited in your bank against orders, so missing money is caught early.
  - *Developer note:* Gateway dashboards cover the basics; export order-vs-settlement report monthly for the accountant.
- ⚪ **International cards for overseas customers** — Only relevant if you plan to sell outside India; needs separate gateway approval and shipping setup.

## Cash on Delivery (COD)

- 🟢 **COD as a payment option** — A large share of first-time Indian online shoppers only trust COD — launching without it means losing them.
- 🟢 **COD availability by pincode** — Couriers do not offer COD everywhere; show 'COD not available for this pincode' instead of taking orders you cannot ship.
  - *Developer note:* Comes from the courier aggregator's serviceability API.
- 🟢 **COD order value limits (minimum and maximum)** — Very small COD orders lose money on courier fees, and very large ones are refusal risks — you set both limits.
  - *Developer note:* Configurable in admin, e.g. COD only between Rs 300 and Rs 3000.
- 🟢 **COD order verification before shipping** — Fake and prank COD orders are the single biggest hidden cost for new Indian brands — verify the order is real before you spend money shipping it.
  - *Developer note:* OTP confirmation at order placement, or an automated WhatsApp 'confirm your order' message with a confirm button; hold unconfirmed COD orders.
- 🟡 **Optional COD handling fee** — A small Rs 30-50 COD fee offsets courier COD charges and nudges customers toward prepaid.
  - *Developer note:* Toggle + amount configurable in admin; show it clearly in the price breakup.
- 🟡 **Convert-to-prepaid nudge on COD orders** — Offering a small discount to pay online after placing a COD order cuts refusals and gets you money upfront.
  - *Developer note:* Send a payment link via WhatsApp/SMS post-order; gateways offer payment-link APIs.
- 🟡 **COD risk rules (block repeat refusers, risky pincodes)** — Once you have data, automatically disabling COD for customers or areas with a history of refused deliveries saves real money.
  - *Developer note:* Track RTO (return-to-origin) per phone/pincode; simple blocklist first, scoring tools (e.g. gateway/aggregator RTO-prediction) later.

## GST, pricing & invoicing

- 🟢 **GST-compliant invoice generated automatically for every order** — Every sale legally needs a proper tax invoice with your GSTIN, HSN codes, and tax breakup — doing this by hand does not scale.
  - *Developer note:* Invoice PDF with: seller name/address/GSTIN, invoice number, date, HSN code per item, taxable value, GST rate and amount, place of supply. Confirm exact format with the owner's CA.
- 🟢 **Correct GST rates for apparel, kept configurable** — Clothing GST depends on the price of the item and rates change with government notifications, so rates must be editable, not hard-coded.
  - *Developer note:* Historically 5% below a per-piece price threshold and higher above it — verify current slab with the CA and store rate rules in config.
- 🟢 **CGST/SGST vs IGST split by customer state** — Tax on an invoice splits differently for sales within your state versus other states — getting this wrong creates GST-filing headaches.
  - *Developer note:* Derive from ship-to state vs seller's registered state.
- 🟢 **All prices shown tax-inclusive (MRP style)** — Indian shoppers expect the displayed price to be the final price; adding tax at checkout feels like cheating.
  - *Developer note:* Store base price + tax internally for reporting, display inclusive price everywhere.
- 🟢 **Invoice download from order page and email** — Customers and your accountant will ask for invoices; self-serve download avoids support messages.
- 🟢 **Sequential, financial-year-based invoice numbering** — GST rules expect a consistent invoice number series; random order IDs are not enough.
  - *Developer note:* e.g. VW/2026-27/00001; never reuse or skip-proof the sequence; credit notes for refunds/returns in their own series.
- 🟡 **GST/sales report export for the accountant** — A monthly export of sales, tax collected, and refunds makes GST filing painless instead of a spreadsheet nightmare.
  - *Developer note:* CSV/Excel export by date range; include credit notes.
- ⚪ **Buyer GSTIN field for business purchases** — Occasionally a boutique or company buys in bulk and needs your invoice with their GSTIN to claim credit.

## Order confirmation & customer communication

- 🟢 **Order success page with order number and summary** — The customer needs instant, unambiguous proof the order went through, or they will place it again (duplicate orders) or panic.
  - *Developer note:* Show order ID, items, amount, payment method, delivery estimate; handle browser refresh without double-ordering.
- 🟢 **WhatsApp order confirmation** — Your customers check WhatsApp before email; a confirmation there is the one they will actually see and save.
  - *Developer note:* WhatsApp Business API via Interakt/Wati/Gupshup/AiSensy; templates need Meta approval, so start that process early.
- 🟢 **SMS order confirmation** — Reliable fallback that reaches every phone, including customers not on WhatsApp.
  - *Developer note:* Requires TRAI DLT registration of sender ID and templates — takes days, start early.
- 🟢 **Email confirmation with invoice attached** — Email is the paper trail customers search later for the invoice and order details.
  - *Developer note:* Use a transactional email service (not personal Gmail) so mails do not land in spam; set up SPF/DKIM.
- 🟢 **New-order alert to the owner** — You should know within seconds when an order lands, so packing starts fast — speed is your edge over big marketplaces.
  - *Developer note:* WhatsApp/email/push to owner plus an admin orders list.
- 🟢 **Order history and status in the customer's account** — Self-serve order status cuts down 'what happened to my order' messages.

## Failed payments, retries & refunds

- 🟢 **Graceful payment-failure screen with one-tap retry** — Payment failures are routine in India (OTP timeouts, UPI glitches); an easy retry rescues the sale instead of losing it.
  - *Developer note:* Keep the cart and address intact; let the customer retry with a different method (failed card -> UPI).
- 🟢 **Correct handling of 'payment pending' states** — UPI payments can stay in limbo for several minutes — the site must wait for the real result instead of wrongly telling the customer it failed.
  - *Developer note:* Show a 'confirming your payment' state; resolve via webhook/status-poll; never create duplicate orders for one payment.
- 🟢 **Auto-refund when money is deducted but the order fails** — 'Amount debited but no order' is the fastest way to lose a customer's trust forever — the refund must be automatic, with a message telling them it is on its way.
  - *Developer note:* Detect orphan payments via webhook reconciliation and trigger gateway refund API; notify customer on WhatsApp/SMS.
- 🟢 **Refunds to the original payment method** — RBI expects refunds to go back where the money came from, and customers trust refund-to-source most.
  - *Developer note:* One-click refund from admin via gateway API; show expected timeline (UPI 1-3 days, cards 5-7 days) in the refund message.
- 🟢 **COD refund payout via UPI or bank transfer** — COD returns have no 'source' to refund to, so you need a clean way to collect the customer's UPI ID and pay them back.
  - *Developer note:* Gateway payout links (e.g. Razorpay refund/payout links) let the customer enter their own UPI/bank details — you never handle them manually.
- 🟡 **Refund status visible to customer with reference number** — Half of all support messages after a return are 'where is my refund' — a status page with the bank reference (ARN/UTR) answers it.
- 🟡 **Abandoned-payment recovery messages** — Someone who reached payment and dropped off is your hottest lead; a WhatsApp nudge with a payment link recovers many of them.
- 🟡 **Partial refunds** — Needed when a customer returns one item out of three, or you compensate for a small defect without a full return.
  - *Developer note:* Must also generate a matching credit note for GST.

## Fraud & payment security basics

- 🟢 **HTTPS everywhere and zero card-data storage** — Basic hygiene: all pages encrypted, and card numbers never touch your server — the gateway keeps you out of that risk entirely.
  - *Developer note:* Gateway-hosted payment fields keep you out of PCI-DSS scope; verify all webhook signatures; keep API keys out of front-end code.
- 🟢 **Rate limiting on OTP, login, and coupon endpoints** — Without limits, bots can drain your SMS budget overnight or brute-force coupon codes.
  - *Developer note:* Per-phone and per-IP limits with cooldowns; alert on spikes.
- 🟢 **Duplicate-order and double-charge protection** — Impatient customers double-tap the pay button; you should never charge twice or ship twice for one intent.
  - *Developer note:* Idempotency keys on order creation and payment capture; disable the pay button after first tap.
- 🟡 **Manual review flag for unusual orders** — A simple 'hold and check' for odd orders (very high value, 10 pieces of one size, mismatched city/pincode) catches most fraud at your scale.
  - *Developer note:* Admin queue with hold/approve/cancel; configurable triggers.
- 🟡 **Phone/address blocklist tool** — Lets you block known prank COD customers and abusers in two clicks.
- 🟡 **Basic audit trail of payment and refund actions** — When money questions come up months later, you need a record of who refunded what, when, and why.
- ⚪ **Automated fraud scoring** — Machine-learning risk scores are Myntra-scale tooling; your gateway's built-in checks plus manual review are enough for years.

## Questions to ask your developer

- Which payment gateway do you recommend (Razorpay/Cashfree/PayU) and what are the exact fees per payment method (UPI, cards, netbanking) and settlement time to my bank account? Who absorbs the fee in pricing?
- If a customer pays but their app or browser crashes before returning to the site, how does the order still get confirmed? (Answer should involve gateway webhooks as the source of truth, not the browser redirect.)
- How will pincode serviceability, COD availability, and delivery-date estimates be fetched — which courier aggregator (Shiprocket/Delhivery/etc.) and what happens on the site if that API is down?
- How are COD orders verified before we spend money shipping them, and can I set COD min/max limits, COD fee, and blocked pincodes myself from the admin panel?
- Walk me through a refund end to end: how do I trigger it, how does money reach the customer for prepaid vs COD orders, how long does it take, and what message does the customer get?
- Is the invoice fully GST-compliant (GSTIN, HSN, CGST/SGST vs IGST split, sequential numbering, credit notes for returns), and can tax rates be changed in config when the government changes them?
- What exactly happens if an item sells out between add-to-cart and payment — and can two customers ever both pay for the last piece?
- Which providers will you use for WhatsApp Business API, SMS (with TRAI DLT registration), and transactional email — and what are their monthly costs at, say, 500 orders a month?
- What can I change myself without you: coupons, shipping fees, COD rules, GST rates, blocklist? Show me the admin screens for each.
- How have you tested checkout on a cheap Android phone on a slow 4G connection, and what is the page-load time of the cart and payment pages on such a device?
- Confirm that our servers never see or store card numbers, that webhook signatures are verified, and that OTP/coupon endpoints are rate-limited — how is each done?
- If the payment gateway itself has an outage, what does the customer see, and can COD keep working as a fallback?

## What you (the owner) must provide

- [ ] GSTIN, legal entity name, registered address, and PAN — needed for invoices and payment gateway KYC
- [ ] A current (business) bank account for gateway settlements
- [ ] Payment gateway account: you must sign up and complete KYC yourself on Razorpay/Cashfree/PayU (the developer integrates it, but the account and its credentials are yours)
- [ ] HSN codes and applicable GST rates for your products — get these confirmed by your CA/accountant
- [ ] Invoice format sign-off from your CA (number series, credit-note format for returns)
- [ ] COD policy decisions: allow COD or not, minimum/maximum order value, COD fee amount, whether to require order confirmation via OTP/WhatsApp
- [ ] Shipping fee rules: flat rate, free-shipping threshold, any extra charge for remote pincodes
- [ ] Launch offers and coupon strategy: codes, discount amounts, budgets, expiry dates, first-order-only rules
- [ ] Refund policy decisions: return window, who pays return shipping, refund to source vs store credit
- [ ] A dedicated business phone number for WhatsApp Business API (it cannot simultaneously be your personal WhatsApp number)
- [ ] TRAI DLT registration for SMS sender ID and message templates (your business must register — start early, it takes days)
- [ ] Support contact details (phone, email, WhatsApp) to print on invoices and order confirmations
- [ ] Courier aggregator account (e.g. Shiprocket) — sign up in your name so serviceability, COD remittance, and shipping billing are under your control
- [ ] Decision on maximum quantity per item per order and any order-value cap for manual review
