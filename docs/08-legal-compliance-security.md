# Legal, compliance & security

> Part 8 of 14 of the Vawehall e-commerce scope. Full area: **Legal, compliance & security for Indian e-commerce**.
> 72 work items — 🟢 50 needed at launch · 🟡 16 in phase 2 · ⚪ 6 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Business & tax registration

- 🟢 **Business entity registration** — You need a legal business identity (sole proprietorship, LLP, or private limited) before you can get a payment gateway, GST number, or courier contracts — everything downstream depends on this.
- 🟢 **GST registration (GSTIN)** — Selling goods online to customers in other states requires GST registration regardless of how small you are — you cannot legally ship pan-India without it, and payment gateways ask for it during onboarding.
  - *Developer note:* The GSTIN must be displayed on invoices and is needed for payment-gateway KYC. Store it in site settings, not hard-coded.
- 🟢 **Current account in business name** — Payment gateways settle money only into a bank account matching your registered business name — a personal savings account will get your gateway application rejected.
- 🟡 **Udyam (MSME) registration** — Free government registration that gives you faster payment-dispute protection, easier loans, and credibility with suppliers and couriers.
- 🟡 **Shops & Establishment / local trade licenses** — Most states require this basic license for any business premises, including the room you pack orders from — cheap to get, painful if an inspector asks and you don't have it.
- 🟡 **Legal Metrology packer/manufacturer registration** — If you pack or get garments packed under your brand, the Legal Metrology department expects you to be registered as a packer/manufacturer with the state controller.
- ⚪ **Import Export Code (IEC)** — Only needed if you later ship orders outside India or import fabric/stock yourself.

## Mandatory website policy pages

- 🟢 **Terms of Service / Terms of Use page** — The legal contract between you and every shopper — covers order acceptance, pricing errors, misuse, and limits your liability. Payment gateways will not approve your account without it.
  - *Developer note:* Make policy pages CMS-editable so the owner can update without code changes. Link from footer on every page — gateways check this.
- 🟢 **Privacy Policy (DPDP-compliant)** — Legally required statement of what customer data you collect, why, who you share it with (courier, payment gateway), and how customers can get it deleted.
- 🟢 **Return, Refund & Exchange Policy** — Clothing has the highest return rates in e-commerce — a clear written policy (window in days, condition of garment, who pays return shipping, refund timeline) prevents disputes and chargebacks.
- 🟢 **Shipping & Delivery Policy** — States delivery timelines, shipping charges, COD availability, and serviceable pin codes — required by gateways and it reduces 'where is my order' complaints.
- 🟢 **Cancellation Policy** — Says when a customer can cancel (before dispatch) and how refunds work — under the e-commerce rules you cannot charge cancellation fees beyond costs you actually incurred.
- 🟢 **Contact Us page with full legal details** — Must show your registered business name, physical address, phone, and email — this is legally required for e-commerce sites in India, not just good practice.
- 🟡 **Product disclaimer (color/fit variation)** — A short note that actual garment color may vary slightly from photos protects you from 'not as shown' refund claims.
- 🟡 **Cookie/tracking notice** — If you add analytics and ad pixels (Meta, Google), a simple notice about tracking keeps you aligned with the privacy law.

## Consumer Protection (E-Commerce) Rules 2020

- 🟢 **Grievance officer appointed and displayed** — Every Indian e-commerce site must name a grievance officer with contact details on the website, acknowledge complaints within 48 hours, and resolve them within one month — this can be you, the founder.
  - *Developer note:* Dedicated 'Grievance Redressal' section in footer with name, designation, email, phone, and stated response timelines.
- 🟢 **Seller/business details displayed on site** — The rules require your legal entity name, geographic address, customer-care number, and email to be visible to shoppers — hiding behind just a brand name is non-compliant.
- 🟢 **Full price breakdown before payment** — The total charged at checkout must show all components — item price, shipping, COD fee, taxes — with no surprise charges added after order confirmation.
  - *Developer note:* Itemized order summary at checkout; the total must never change between the review screen and the payment screen.
- 🟢 **Genuine reviews only — no fake or paid reviews** — Posting fake reviews or reviews written as if from customers is explicitly banned; violations invite penalties and destroy trust when exposed.
  - *Developer note:* Restrict reviews to verified buyers (tie review permission to a delivered order). Follow BIS standard IS 19000:2022 on online reviews.
- 🟢 **Country of origin on every listing** — Mandatory for every product sold online in India — for your own manufacturing this is simply 'India', but the field must exist and be shown.
- 🟢 **No dark patterns in the shopping flow** — Government guidelines ban tricks like fake countdown timers, pre-ticked add-ons, sneaking items into carts, and making cancellation hard — design the checkout honestly from day one.
  - *Developer note:* No pre-checked checkboxes, no false 'only 2 left' scarcity unless stock data is real, cancellation as easy as ordering.
- 🟡 **Complaint ticket numbers and tracking** — Giving every complaint a ticket number the customer can reference makes your 48-hour/1-month obligations auditable and looks professional.
- 🟢 **Truthful product descriptions and images** — Misleading descriptions (wrong fabric composition, doctored photos) count as unfair trade practice — describe fabric, fit, and care accurately.

## DPDP Act 2023 — customer data privacy

- 🟢 **Consent notice at data collection points** — When customers sign up or check out, a plain-language notice must say what data you collect and why, and they must agree — burying it in fine print doesn't count.
  - *Developer note:* Un-ticked consent checkbox at signup linking to the privacy policy; log timestamp + what was consented to.
- 🟢 **Separate opt-in for marketing (WhatsApp/SMS/email)** — Consent to receive order updates is not consent to receive promotions — WhatsApp and SMS marketing need their own explicit opt-in, and Meta will suspend your WhatsApp Business account for messaging non-opted-in users.
  - *Developer note:* Store transactional vs marketing consent as separate flags; every marketing message needs an opt-out path.
- 🟢 **Collect only the data you need** — The law expects data minimization — for a clothing order you need name, phone, address, email; you do not need date of birth or gender unless the customer volunteers it.
- 🟢 **Data deletion / consent withdrawal mechanism** — Customers have the right to have their account and personal data erased — at launch a documented email-based process is enough, but it must actually work.
  - *Developer note:* Manual process at launch (delete on request, retain invoices as required by tax law); self-serve 'delete my account' button in phase 2. Document what is retained for legal reasons and for how long.
- 🟢 **Data correction mechanism** — Customers must be able to fix wrong data — editable profile and address book covers most of this.
- 🟢 **TRAI DLT registration for SMS/OTP** — To send OTPs or SMS in India you must register your business, sender ID, and message templates on a DLT platform — unregistered SMS simply gets blocked by telecom operators.
  - *Developer note:* Register on a DLT portal (Jio/Airtel/Vodafone) before integrating any SMS provider; templates must match exactly.
- 🟡 **Data processor awareness for third parties** — Your courier, payment gateway, and marketing tools all handle customer data on your behalf — use reputable providers with proper terms, and list them in your privacy policy.
- 🟡 **Data breach response plan** — If customer data leaks you are obligated to notify the Data Protection Board and affected users — a simple written plan (who does what, how to notify) saves panic later.
- ⚪ **No behavioral tracking/ads targeted at children** — The law prohibits tracking and targeted advertising directed at under-18s — relevant if you later sell kidswear or run broad ad campaigns.
- 🟡 **Consent records and audit trail** — If a customer disputes receiving marketing messages, you need a record showing when and how they opted in.

## Legal Metrology — product listing & label declarations

- 🟢 **MRP shown on listing and on the garment tag** — Maximum Retail Price (inclusive of all taxes) is a mandatory declaration both on the physical product package and on the online listing — selling above MRP is an offence.
  - *Developer note:* Product schema needs distinct MRP and selling-price fields; show MRP struck through with the discount.
- 🟢 **Net quantity / unit count on listings** — For apparel this means declaring what the customer gets — 1 unit, or 'pack of 3' — plus size; mandatory on both package and listing.
- 🟢 **Country of origin declaration** — Required on the package and the online listing under Legal Metrology rules (in addition to the e-commerce rules requirement).
- 🟢 **Manufacturer/packer name and full address on listings** — The name and complete address of the manufacturer or packer must appear on the product page and label — a brand name alone is not enough.
  - *Developer note:* Add dedicated structured fields on the product page template: manufacturer name, address, country of origin, net quantity, MRP, customer-care contact, month/year of manufacture. Don't bury these in free-text descriptions.
- 🟢 **Consumer care contact on package and listing** — A phone number or email for complaints is a mandatory package declaration.
- 🟢 **Month and year of manufacture/packing on labels** — Required on the physical package/tag even for clothing — printers need this on your hang tags or stickers.
- 🟢 **Garment tags: size, fibre composition, wash care** — Standard apparel labelling — fibre content (e.g. 100% cotton) and care instructions on the garment protect you from 'it shrank/faded' disputes and are expected declarations for textiles.

## Payments — security & compliance

- 🟢 **RBI-licensed payment aggregator (Razorpay/Cashfree/PayU etc.)** — Using a licensed aggregator gives you UPI, cards, netbanking, and wallets in one integration, and it carries the PCI-DSS burden so you never have to be audited yourself.
  - *Developer note:* Use hosted checkout or the gateway's SDK so card data never touches your server. Card storage/tokenization per RBI rules is handled entirely by the gateway.
- 🟢 **Never store card numbers, CVV, or UPI PINs anywhere** — Storing raw card data is both an RBI violation and your single biggest liability — there is no business reason for your site to ever hold it.
  - *Developer note:* Also scrub payment parameters from application logs, analytics events, and error trackers.
- 🟢 **Payment webhook signature verification** — Order confirmations must come from the gateway's cryptographically signed callback, not from the customer's browser — otherwise someone can mark orders 'paid' without paying.
  - *Developer note:* Verify webhook HMAC signatures server-side; never trust redirect/success URLs alone; handle duplicate webhooks idempotently.
- 🟢 **Refunds to original payment method via gateway** — RBI and the e-commerce rules expect refunds back to the source (UPI refund to UPI, card to card) within your stated timeline — the gateway API does this cleanly.
- 🟡 **COD verification and abuse controls** — COD is essential in India but fake COD orders and refused deliveries burn cash — OTP-confirm COD orders, cap COD order value, and block repeat refusers.
  - *Developer note:* OTP confirmation on COD orders, COD value cap, pin-code level COD toggle, and a refused-delivery blocklist.
- 🟢 **Amount mismatch checks** — Verify that the amount the gateway says was paid matches the order total before confirming — prevents a classic price-tampering fraud.

## Website & data security

- 🟢 **HTTPS everywhere with auto-renewing certificate** — Encrypts everything customers type; browsers mark non-HTTPS checkout pages as 'Not secure', which kills trust instantly.
  - *Developer note:* Free via Let's Encrypt/Cloudflare; force-redirect HTTP to HTTPS; enable HSTS.
- 🟢 **OTP rate limiting and abuse protection** — Without limits, bots will hammer your OTP endpoint — running up your SMS bill (SMS bombing) and enabling brute-force account takeover of customer accounts.
  - *Developer note:* Limit OTP requests per phone number and per IP (e.g. 3/10min), limit verification attempts (5 then lock), expire OTPs in 5 minutes, add resend cooldown timers.
- 🟢 **Two-factor authentication on the admin panel** — The admin panel holds every customer's name, phone, and address — a stolen admin password without 2FA means a full data breach.
  - *Developer note:* TOTP-based 2FA; also don't expose the admin URL at a guessable path without protection.
- 🟢 **Regular dependency and platform updates** — Most small-store hacks exploit outdated plugins and libraries with known holes — someone must be responsible for applying updates every month, forever.
  - *Developer note:* Enable automated dependency alerts (Dependabot or equivalent); agree a monthly patch schedule in the developer contract.
- 🟢 **Automatic daily backups with tested restore** — If the server dies or is hacked, backups are the difference between a bad day and losing the business — and a backup nobody has ever restored is a hope, not a backup.
  - *Developer note:* Daily automated DB + media backups stored off-server, 30-day retention, restore drill once a quarter.
- 🟢 **Proper password hashing and session security** — If you offer password login, passwords must be stored scrambled (hashed) so a database leak doesn't expose them, and login sessions must not be stealable.
  - *Developer note:* bcrypt/argon2 hashing; Secure + HttpOnly cookies; session invalidation on password change.
- 🟢 **Secrets kept out of code** — Payment gateway keys and SMS API keys in the source code end up leaked on GitHub — a depressingly common way small stores get robbed.
  - *Developer note:* Environment variables or a secrets manager; separate test vs live keys; rotate keys when the developer relationship ends.
- 🟡 **Basic bot/DDoS protection and WAF** — A free Cloudflare tier blocks a lot of scraping, card-testing bots, and traffic floods before they reach your server.
- 🟡 **Role-based staff access** — When you hire help, the packing person should see orders but not payment settings or customer exports — least access limits damage from mistakes or leaks.
- 🟡 **Admin action audit log** — A record of who changed prices, exported customer data, or issued refunds — essential the first time stock or money doesn't add up.
- 🟡 **Encrypt sensitive customer data at rest** — Encrypting the database/disk means a stolen backup file doesn't automatically expose every customer's details.
- ⚪ **Periodic vulnerability scan / security review** — An occasional professional check of the site for known weaknesses, worthwhile once revenue justifies it.

## Invoices & GST compliance in the order flow

- 🟢 **GST-compliant invoice generated for every order** — Every sale needs a proper tax invoice showing your GSTIN, invoice number, HSN code, and tax breakup — customers ask for it, and your GST returns are built from these.
  - *Developer note:* Auto-generate PDF invoice on order confirmation, email/WhatsApp it, and keep it downloadable from the account page. Sequential invoice numbering per financial year, no gaps or duplicates.
- 🟢 **Correct GST rate and HSN codes for apparel** — GST on garments depends on the price of the piece (lower-priced apparel is taxed at a lower slab) — the checkout must apply the right rate per item, and the rates have changed recently, so confirm current slabs with your CA.
  - *Developer note:* Store HSN code and price-dependent tax logic per product; make rates config-driven since GST Council revises them.
- 🟢 **CGST/SGST vs IGST split by shipping state** — Orders delivered within your own state split tax as CGST+SGST; orders to other states charge IGST — the invoice must show the right split automatically based on the delivery address.
  - *Developer note:* Derive place of supply from the shipping address state code; store your home state in settings.
- 🟢 **Credit notes for returns and refunds** — When you refund a returned kurta, GST law expects a credit note linked to the original invoice — otherwise you overpay tax on sales you reversed.
- 🟢 **Monthly GST return data export** — Your CA needs an order/invoice report (sales, returns, tax collected, state-wise) every month for GSTR-1 and GSTR-3B — a one-click export saves hours of spreadsheet pain.
  - *Developer note:* CSV/Excel export with invoice number, date, taxable value, tax split, HSN, buyer state; include credit notes.
- 🟡 **Record retention** — Tax records including invoices must be kept for several years even after a customer deletes their account — your data-deletion process must carve this out.
- ⚪ **E-invoicing (IRN/QR code)** — Only mandatory once annual turnover crosses the government threshold (currently Rs 5 crore) — not a day-1 concern, but the invoice system should be able to add it later.
- ⚪ **Marketplace TCS handling** — If you later also sell on Myntra/Amazon, those marketplaces deduct TCS under GST which you reclaim in returns — only relevant when you expand beyond your own site.

## Trademark & brand protection

- 🟢 **Trademark search before locking the brand name** — A public search on the IP India website (or via a trademark agent) tells you if someone already owns your name for clothing — finding out after printing 5,000 labels is expensive.
- 🟢 **File trademark application (Class 25 + Class 35)** — Class 25 covers clothing itself and Class 35 covers retail/online store services — filing early establishes your priority date even though registration takes 1-2 years.
- 🟢 **Use the TM mark now, R only after registration** — You can put TM next to your logo immediately after filing; using the R symbol before registration is actually an offence.
- 🟢 **Secure domain variants and social handles** — Grab the .in and .com of your brand plus the Instagram/WhatsApp/YouTube handles now — squatters target new brands the moment they get traction.
- 🟡 **Own the IP in your photos, designs, and site** — Get written agreements with photographers, models, and designers assigning rights to you, and use only licensed fonts, stock images, and music — an Instagram DMCA strike or font-license demand letter is a real risk.
  - *Developer note:* Include an IP-assignment clause in the developer contract too: code, design, and content belong to the business, and the owner holds all hosting/domain/registrar credentials.
- ⚪ **Counterfeit and copycat monitoring** — Once the brand grows, watch marketplaces and Instagram for fakes and lookalike names; marketplace brand-registry programs help you take listings down.

## Questions to ask your developer

- Which payment aggregator will you integrate, and can you confirm card data never touches our server (hosted checkout / gateway SDK only) and that payment webhooks are signature-verified server-side?
- Will policy pages (Terms, Privacy, Returns, Shipping) be editable by me without code changes, and linked in the footer of every page as the payment gateway requires?
- Where exactly will the grievance officer details, legal business name, address, and customer-care contact be displayed, per the Consumer Protection E-Commerce Rules?
- Does the product page template have dedicated structured fields for MRP, net quantity, country of origin, and manufacturer name/address (Legal Metrology), or will I have to type them into descriptions?
- How is DPDP consent captured and recorded at signup and checkout, is marketing opt-in separate from order updates, and what is the process when a customer asks for their data to be deleted?
- Are product reviews restricted to verified buyers who actually received the item, with no way for fake reviews to be posted?
- How are GST invoices generated — automatic per order with sequential numbering, HSN codes, correct CGST/SGST/IGST split by delivery state, and credit notes on returns — and is there a monthly export my CA can use for GSTR-1/3B?
- What is the security baseline: HTTPS with HSTS, admin 2FA, OTP rate limits (per phone and per IP), password hashing method, and where are API keys stored?
- What is the backup arrangement — frequency, where backups live, retention period — and when will we do a test restore?
- Who applies security patches and dependency updates after launch, how often, and is that included in the maintenance contract?
- Can you confirm the checkout has no dark patterns — no pre-ticked add-ons, no fake urgency timers, cancellation as easy as ordering?
- If we ever part ways, do I get a full export of all customer data, order history, and code, and does the contract state that all IP, hosting, and domain credentials belong to me?

## What you (the owner) must provide

- [ ] Business registration proof and PAN (decide entity type with a CA: proprietorship vs LLP vs Pvt Ltd)
- [ ] GST registration (GSTIN) — apply before launch; developer needs it for invoice setup and gateway KYC
- [ ] Current bank account in the business name, plus KYC documents for the payment gateway application
- [ ] Registered business address, customer-care phone number, and support email to display on the site
- [ ] Grievance officer name, designation, email, and phone (can be the founder initially)
- [ ] Business decisions for policies: return/exchange window in days, who pays return shipping, refund timeline, COD availability and any COD fee, cancellation cutoff
- [ ] Lawyer-reviewed (or at minimum founder-approved) text for Terms, Privacy, Return, Shipping, and Cancellation policies — do not ship unedited templates
- [ ] Manufacturer/packer name and full address, month/year of manufacture, and consumer-care contact for garment tags and listings
- [ ] HSN codes and current GST rates for each product category — confirm with your CA, including the price-slab cutoff for apparel
- [ ] Printed garment tags/labels with MRP, size, net quantity, fibre content, wash care, and Legal Metrology declarations
- [ ] Trademark search and application via a trademark agent/lawyer (Class 25 and 35), and the final brand name/logo files
- [ ] Domain registrations (.in/.com) and social media handles, registered in the owner's own accounts, not the developer's
- [ ] TRAI DLT registration for SMS sender ID and message templates (needed before OTP/SMS works)
- [ ] WhatsApp Business account/number owned by the business
- [ ] A CA engaged for monthly GST returns, and a decision on who stores signed copies of invoices/credit notes
- [ ] An owner-controlled password manager entry for all credentials (hosting, domain, gateway, admin) with 2FA on each
