# Developer Scope — Vawehall Online Clothing Store

This folder is the complete requirements document for building a Myntra-style online store for a single clothing brand in India. Hand this whole folder to your developer — it is the answer to "what exactly do you want built?"

## How to read these documents

- Every work item is tagged: 🟢 **Launch** (the store shouldn't go live without it), 🟡 **Phase 2** (add in the first 3–6 months), ⚪ **Later** (Myntra-scale features — ignore until growth demands them).
- Each document ends with **questions to ask your developer** (use them in meetings/interviews) and a checklist of **what you must provide** — content and decisions no developer can do for you.
- Start with document 10 (project plan, budget & hiring) if you haven't picked a developer yet, and document 7 (technology platform) before anyone writes code.

## The 14 areas

| # | Document | Items | 🟢 Launch |
|---|----------|-------|-----------|
| 01 | [Storefront & shopping experience](01-storefront-shopping-experience.md) | 105 | 54 |
| 02 | [Cart, checkout & payments](02-cart-checkout-payments.md) | 81 | 51 |
| 03 | [Customer accounts & engagement](03-customer-accounts-engagement.md) | 75 | 35 |
| 04 | [Orders, shipping & returns](04-orders-shipping-returns.md) | 76 | 45 |
| 05 | [Admin panel & inventory](05-admin-panel-inventory.md) | 112 | 57 |
| 06 | [Marketing, SEO & analytics](06-marketing-seo-analytics.md) | 70 | 31 |
| 07 | [Technology platform & hosting](07-technology-platform-hosting.md) | 35 | 24 |
| 08 | [Legal, compliance & security](08-legal-compliance-security.md) | 72 | 50 |
| 09 | [Brand, design & content](09-brand-design-content.md) | 106 | 71 |
| 10 | [Project plan, budget & hiring](10-project-plan-budget-hiring.md) | 103 | 95 |
| 11 | [Festival & sale readiness](11-festival-sale-readiness.md) | 57 | 32 |
| 12 | [Multi-channel inventory sync](12-multi-channel-inventory-sync.md) | 34 | 17 |
| 13 | [Settlements & unit economics](13-settlements-unit-economics.md) | 42 | 30 |
| 14 | [Daily operations & soft launch](14-daily-operations-soft-launch.md) | 60 | 45 |
| | **Total** | **1028** | **637** |

## Expert caveats — read these first

These came out of a cross-check of the whole scope; each one changes a decision you'd otherwise get wrong:

- Fit-related return costs are under-connected: 'Size charts & fit content' and 'Returns & exchanges' sit in different sections, but fit issues drive the majority of fashion returns in India (25-40% return rates are normal). The document should explicitly require: capturing a return REASON on every return, reviewing reasons monthly to fix size charts and product photos, and an exchange-first policy (offer size exchange before refund) — each fit return costs two-way shipping and often exceeds the item's margin. Tag: launch.
- GST correction: the GST rate on garments depends on the selling price per item (after the Sept 2025 rate changes, roughly 5% up to Rs 2,500 and 18% above — verify current slabs with a CA). This means the invoicing engine cannot use one flat tax rate, and a discount can move an item across the slab boundary. The 'Tax (GST) settings' item should explicitly require price-dependent, per-line-item tax computation.
- Sequencing caveat: payment gateway approval (Razorpay/Cashfree/PayU) requires live policy pages and business KYC and can take 1-3 weeks; SMS DLT registration and WhatsApp Business API verification also take weeks. These must start in parallel with development, not after the site is 'done' — otherwise launch slips with a finished website that cannot take payments or send messages.
- COD realism: for an unknown new brand, COD is often 40-60% of orders and drives most RTO losses. COD order verification (WhatsApp/IVR/OTP confirmation before dispatch), partial-prepayment or prepaid-discount nudges, and COD caps by pincode/order value should be tagged 'launch', not treated as later optimizations.
- Platform caveat: the 'four realistic options' comparison should carry an explicit recommendation — for a non-technical first-time founder, a fully custom-coded store at launch is almost always a mistake (cost, maintenance, ownership risk). A hosted platform (Shopify or similar) for launch, with custom development tagged 'later', is the defensible default; a developer pushing custom-from-scratch belongs on the red-flags list.
- DPDP caveat: the DPDP Rules were notified in 2025 with phased compliance timelines. Get consent notices, a privacy policy, data-deletion requests and breach basics right at launch, but the founder should not be sold an expensive 'full DPDP compliance program' on day one — obligations phase in.
- Timeline caveat: in practice, first-store launches slip because of the FOUNDER's deliverables (photography, size charts, product copy, policy content), not the developer's code. The 'content checklist BEFORE development' section is right, but the project-management section should make content readiness a formal milestone gating the development timeline.

## The starter website in this repository

The HTML/CSS/JS files one level up are a **working front-end demo** of the customer experience (browse → product → cart → checkout). Use it to show your developer the look, flows and features you expect. It is not the production store — it has no backend, payments or admin panel; this folder describes all of that.
