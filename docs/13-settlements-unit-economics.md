# Settlements & unit economics

> Part 13 of 14 of the Vawehall e-commerce scope. Full area: **Payment settlements, reconciliation & per-order unit economics**.
> 42 work items — 🟢 30 needed at launch · 🟡 9 in phase 2 · ⚪ 3 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Payment gateway settlement reconciliation (UPI / cards / netbanking)

- 🟢 **Store gateway payment ID on every order** — Every online payment gets an ID from the gateway (like Razorpay or Cashfree); saving it against the order is the only way to later prove which bank credit belongs to which order.
  - *Developer note:* Persist gateway payment_id, order_id, method (UPI/card/netbanking/wallet), amount, capture timestamp. Also store the settlement UTR once known.
- 🟢 **Settlement cycle tracking (T+2/T+3)** — The gateway does not pay you instantly — money for Monday's orders lands in your bank 2-3 working days later, in one lump sum, so you need to know what amount to expect and when.
  - *Developer note:* Record expected settlement date per payment. Razorpay/Cashfree expose settlement objects via API/report download that group payments into a settlement batch with a UTR number.
- 🟢 **Gateway fee and GST-on-fee captured per transaction** — The gateway keeps roughly 2% plus 18% GST on that fee before paying you — on a Rs 799 order you receive about Rs 780, and if you don't record this you will never know your real income per order.
  - *Developer note:* Fees differ by method (UPI often cheaper or free, cards higher, EMI highest). Pull fee + tax fields from the gateway settlement report rather than estimating.
- 🟢 **Monthly bank-credit matching** — Once a month, tick off every credit in the bank statement against the gateway's settlement report and your orders — this is how you catch money that simply never arrived.
  - *Developer note:* Match on UTR number (appears in both bank statement and gateway settlement report). A CSV export of settlements with their member orders is enough at launch; full auto-matching is phase2.
- 🟢 **Unsettled-payments exception report** — A simple list of 'orders where the customer paid but the money hasn't reached the bank after X days' — this list should normally be empty, and anything on it needs a call to the gateway.
- 🟢 **Payment-success-but-no-order handling** — On flaky mobile networks a customer's money sometimes gets debited but the website fails to create the order — you must find these and either confirm the order or refund, or you get angry WhatsApp messages and bad reviews.
  - *Developer note:* Handle gateway webhooks idempotently; run a daily job comparing captured payments against orders. This is the most common day-1 payment bug in Indian D2C.
- 🟡 **Automated daily settlement sync** — Instead of monthly manual ticking, the system pulls settlement data from the gateway every day and flags mismatches on its own.
  - *Developer note:* Razorpay Settlements API / Cashfree settlement webhooks. Reconciliation SaaS (e.g. Recon by gateways, or tools like Nimbus/Cointab) exists but is overkill until volume grows.
- ⚪ **Multi-gateway reconciliation** — Bigger stores run two gateways for backup and better rates; matching then has to work across both.

## COD remittance reconciliation (shipping aggregator)

- 🟢 **COD amount recorded per shipment at dispatch** — For every COD parcel, the exact amount the courier must collect has to be stored, because that is the number you will later chase the courier for.
- 🟢 **Weekly COD remittance matching** — Couriers collect your cash and pay it back in weekly batches (usually 7-8 days after delivery, 2-3 payouts a week) minus deductions — each payout must be matched line-by-line to delivered orders or missing money goes unnoticed forever.
  - *Developer note:* Shiprocket/Delhivery/iThink give a COD remittance CSV per payout (order ID, AWB, amount, deductions). Import it and mark each order 'COD received'. Manual CSV upload is fine at launch.
- 🟢 **Missed / short remittance alert list** — A standing list of 'COD orders delivered more than 10 days ago where the cash still hasn't come' — this is real money the courier is sitting on, and nobody refunds it unless you ask.
- 🟢 **Remittance deduction visibility** — Aggregators quietly subtract shipping charges, COD fees (typically Rs 30-50 or ~2% per order) and old dues from your COD payout — you need to see what was subtracted, not just the net amount.
- 🟢 **Collected-amount mismatch report** — Occasionally the courier collects the wrong amount at the door (discounted amount confusion, partial acceptance); flag any order where collected differs from invoiced.
- 🟡 **Early-COD cost decision** — Aggregators offer to pay your COD money faster for an extra fee — a cash-flow help, but it is another silent cut into margin that should be a conscious choice, not a default.
- 🟡 **Automated remittance import via aggregator API** — Payout files get pulled and matched automatically instead of someone uploading CSVs every week.

## Refunds & chargebacks

- 🟢 **Single refund ledger** — One place that lists every refund ever made — which order, why, how much, how it was paid back, and its current status — so refunds are never scattered across gateway dashboards, bank transfers and memory.
  - *Developer note:* Fields: order ID, reason code (return/RTO/cancellation/goodwill), mode (gateway reversal vs manual UPI/bank transfer), amount, initiated date, credited date, initiated by whom.
- 🟢 **Double-refund prevention** — The classic leak: support refunds via bank transfer, then someone also clicks refund in the gateway — the system must block a second refund on an order that already has one, and require an approved return/cancellation behind every refund.
  - *Developer note:* Enforce at the database level (unique constraint per order per reason), not just in the UI. Prefer gateway-API refunds over manual transfers so status is trackable.
- 🟢 **COD refund payout flow** — COD customers paid in cash, so refunds go out by UPI or bank transfer — you need to collect and verify their UPI ID safely (a fraudster's favourite trick is giving a different account).
  - *Developer note:* Collect UPI ID via a form/WhatsApp linked to the order; consider gateway payout APIs (RazorpayX/Cashfree Payouts) later instead of manual transfers.
- 🟢 **Refund status tracking until money reaches customer** — Gateway refunds take 5-7 working days to show in the customer's account, and 'where is my refund?' is the #1 support question — the ledger should show pending vs credited so you can answer on WhatsApp instantly.
- 🟡 **Chargeback / dispute log with evidence pack** — A cardholder can dispute a charge months later; if you don't reply to the gateway with delivery proof within the deadline you automatically lose the money plus a penalty, so every dispute needs a tracked deadline and a saved proof bundle (invoice, tracking, delivery confirmation).
  - *Developer note:* Low volume for a new brand, but wire up gateway dispute webhooks/emails and keep POD (proof of delivery) retrievable per order from day 1 — the evidence is created at launch even if the workflow comes later.
- 🟡 **Store-credit / coupon refunds tracked as liability** — If you refund as store credit, that is money you still owe customers — track issued vs redeemed so the accountant and your P&L see it.

## Courier billing & weight-discrepancy control

- 🟢 **Record packed weight, dimensions and photo per shipment** — Couriers re-weigh your parcels in their hub and bill you the difference if their number is higher — your only defence is your own weight, box dimensions and a photo of the parcel on the scale, captured before handover.
  - *Developer note:* A field on the shipment record plus photo upload is enough. Volumetric weight (LxBxH/5000) often exceeds actual weight for clothing in big boxes — store both.
- 🟢 **Weekly weight-discrepancy dispute routine** — Aggregators publish weight-discrepancy charges in the panel and give a short window (often about 7 days) to dispute with proof — miss the window and the charge sticks; this is a notorious silent margin leak worth 2-5% of shipping spend.
  - *Developer note:* At minimum: a weekly reminder plus a screen listing discrepancy claims against the recorded weight/photo. Auto-flagging claims that exceed recorded weight is phase2.
- 🟢 **Courier invoice vs quoted-rate check** — Check that what the courier billed per order matches the rate card you were promised (zone, weight slab, COD fee) — billing errors happen and nobody corrects them unless you catch them.
- 🟢 **RTO charge tracking per order** — When a COD parcel is refused, you pay forward AND return shipping and get no revenue — every RTO's full cost must be logged against the order so you see how much refusals really cost.
  - *Developer note:* RTO reverse charge is often equal to or higher than the forward rate. Tag RTO orders distinctly from customer returns.
- 🟢 **Standardised box sizes to control volumetric weight** — Two or three fixed box/polybag sizes whose billable weight you know in advance makes discrepancies rare and shipping cost predictable.
- 🟡 **Automatic discrepancy alerts and dispute tracking** — The system pulls discrepancy claims via API, compares against recorded weights, and reminds you before the dispute window closes.

## Order-level P&L (unit economics)

- 🟢 **Cost price and packaging cost per SKU** — The system must know what each product costs you to make and pack, otherwise no profit calculation is possible anywhere — this is the foundation of everything in this section.
  - *Developer note:* Editable fields per SKU in admin: COGS, packaging cost. Keep a history so old orders keep their old cost.
- 🟢 **Per-order cost sheet (contribution margin)** — For each order: selling price minus product cost, packaging, discount, forward shipping, gateway/COD fee — a Rs 799 COD order with Rs 350 product cost, Rs 90 shipping, Rs 45 COD fee, Rs 30 packaging and a 10% discount earns about Rs 200 before ads and returns, and you should be able to see that number per order.
  - *Developer note:* A computed view or even a well-built spreadsheet export at launch; live in-admin calculation is phase2.
- 🟢 **Returns and RTO cost baked into the math** — If 20% of COD orders come back, each return costs you double shipping plus repacking — spread across all orders this can quietly erase the entire margin, so the monthly P&L must include it, not ignore it.
- 🟢 **Blended marketing cost per order** — Total monthly ad spend divided by orders — if you spend Rs 30,000 on Instagram ads for 150 orders, that is Rs 200 of every order gone to marketing, and it belongs in the per-order math.
  - *Developer note:* Manual monthly entry of ad spend is fine at launch; per-channel/per-campaign attribution is phase2.
- 🟢 **Pricing guardrails from the numbers** — Use the cost sheet to set a minimum order value, the free-shipping threshold, COD fee or prepaid discount, and maximum discount — decided from data in month one, not discovered in month six.
- 🟡 **Automated P&L dashboard** — A screen in the admin that shows profit per order, per product, prepaid vs COD, and month-on-month trend — so loss-making SKUs and discount codes are spotted in days, not quarters.
  - *Developer note:* Pull actuals (real settlement fees, real courier bills, real RTO charges) rather than estimates once reconciliation data is flowing.
- 🟡 **Negative-margin alerts** — An automatic warning when an order, coupon code or SKU is selling below cost — catches mistakes like a stacked discount before hundreds of orders go out.
- ⚪ **Repeat-purchase / LTV view** — Once volume grows, some customers are worth acquiring at a first-order loss because they come back — needs cohort tracking, meaningful only with scale.

## Monthly accounting export (GST / Tally)

- 🟢 **GST-compliant sequential invoice numbering** — Every sale needs a tax invoice with an unbroken serial number series per financial year — gaps and duplicates cause problems in GST filing.
  - *Developer note:* Also sequential credit-note numbering for refunds/returns, referencing the original invoice.
- 🟢 **Monthly sales register export** — One clean file per month for the accountant: invoice number, date, customer state, item, HSN code, taxable value, GST rate, CGST/SGST or IGST amount — this is the raw material for GSTR-1 and GSTR-3B filing.
  - *Developer note:* CGST+SGST for same-state orders, IGST for other states (place of supply = delivery address). Apparel HSN chapters 61/62; GST slab depends on garment price — have the CA confirm current slabs and encode rate-by-price logic.
- 🟢 **Credit notes for refunds and returns in the export** — When you refund or accept a return, the tax already reported must be reversed via a credit note — if the export misses these, you overpay GST every month.
- 🟢 **Tally-importable format** — Most Indian accountants work in Tally; if the export imports cleanly (or is at least a clean CSV in their template), filing takes hours instead of days and costs you less in accountant fees.
  - *Developer note:* Ask the accountant for their preferred format first — often a specific CSV/Excel layout beats building Tally XML integration.
- 🟢 **Fee invoices collected for input tax credit** — The GST that the gateway and courier charge on their fees is claimable back — but only if you download their monthly GST invoices and hand them to the accountant; skipping this is throwing away 18% of every fee.
- 🟡 **Month-end reconciliation summary** — A one-page monthly summary — total sales, refunds, gateway settlements received, COD remittances received, amounts still pending — that you and the accountant sign off before filing.
- ⚪ **Marketplace TCS reconciliation** — If you later also sell on Myntra/Amazon, they deduct TCS under GST which must be matched and claimed — only relevant once marketplaces enter the picture.

## Questions to ask your developer

- Will every order store the gateway payment ID, exact fee charged, and settlement UTR, so we can match each bank credit back to its orders at month-end?
- How do COD remittance files from the shipping aggregator get into the system — API sync or CSV upload — and will each payout line be matched to its order automatically?
- Where in the admin can I see, at any moment, the list of delivered COD orders whose cash has not been remitted yet, and prepaid payments not yet settled to the bank?
- How exactly does the system prevent two refunds being issued on the same order, including the case where one is a manual bank transfer and one is a gateway refund?
- What happens when a customer's money is debited but the order fails to get created — is there a webhook + daily reconciliation job that catches these automatically?
- Can I record packed weight, dimensions and a parcel photo per shipment, and will the system surface courier weight-discrepancy claims while they are still within the dispute window?
- Can I enter cost price and packaging cost per SKU, and where will I see per-order and per-SKU profit once shipping, fees, discounts and RTO costs are included?
- What does the monthly accountant export contain — is it GSTR-1 ready with HSN codes, CGST/SGST/IGST split by delivery state, credit notes for refunds, and importable into Tally?
- Are invoice numbers and credit-note numbers strictly sequential per financial year with no gaps, even when orders are cancelled?
- Which parts of reconciliation are manual spreadsheets at launch versus built into the admin, and what is the monthly time cost on me until phase 2 automation lands?

## What you (the owner) must provide

- [ ] Cost price (COGS) and packaging cost for every SKU, and a commitment to keep them updated when supplier prices change
- [ ] Payment gateway account (e.g. Razorpay/Cashfree) with dashboard access shared, plus its signed rate card (fee per payment method)
- [ ] Shipping aggregator account with its rate card: zone rates, weight slabs, COD fee, RTO charges, and the COD remittance cycle terms
- [ ] Business bank account statements (or view access) each month for settlement matching
- [ ] GSTIN, HSN codes for each product (confirmed with the CA), and the invoice number series format you want
- [ ] Your accountant/CA's contact and their preferred export format (Tally version or CSV template) — agree on it before the developer builds the export
- [ ] A decision on refund mode for COD orders (UPI transfer vs store credit) and who on your team is authorised to approve refunds
- [ ] Monthly marketing spend figures per channel (Meta, Google, influencers) entered or shared by a fixed date each month
- [ ] A weighing scale and phone at the packing table, and a person assigned to the weekly routines: COD remittance check, weight-discrepancy disputes, and month-end bank matching
- [ ] Business decisions once the first cost sheets exist: minimum order value, free-shipping threshold, COD handling fee or prepaid discount, and maximum allowed discount
