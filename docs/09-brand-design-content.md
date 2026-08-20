# Brand, design & content

> Part 9 of 14 of the Vawehall e-commerce scope. Full area: **Brand, design & content production**.
> 106 work items — 🟢 71 needed at launch · 🟡 25 in phase 2 · ⚪ 10 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Logo & brand style guide

- 🟢 **Primary logo in vector format** — The logo will be printed on the website, bills, packaging and ads at many sizes — a vector file never gets blurry, unlike a WhatsApp-forwarded JPG.
  - *Developer note:* Deliver as SVG + high-res transparent PNG; developer needs it for header, favicon, email templates and invoice PDFs.
- 🟢 **Logo variants (dark background, light background, square icon-only mark)** — The same logo must look right on a white website header, a dark sale banner, and as a tiny app-style icon.
  - *Developer note:* Square mark used for favicon, PWA icon, WhatsApp Business profile photo.
- 🟢 **Brand color palette with exact color codes** — Fixes the exact shades (like a paint code) so the site, ads and packaging always match — no 'roughly this pink'.
  - *Developer note:* Provide hex codes: primary, secondary, accent (for sale/discount tags), neutrals, error/success. Check contrast for accessibility (WCAG AA).
- 🟢 **Typography choice (1 heading font + 1 body font) with valid web licenses** — Fonts set the brand's personality; using an unlicensed font can cause legal trouble, and heavy fonts slow down the site on mobile data.
  - *Developer note:* Prefer Google Fonts or licensed webfonts; limit weights for speed; consider Devanagari support if vernacular is planned later.
- 🟢 **One-page mini brand style guide (PDF)** — A single reference sheet so the designer, developer, photographer and printer all follow the same rules without asking you every time.
- 🟢 **Favicon, app icons and social profile avatars** — The tiny icon in the browser tab and on Instagram/WhatsApp profiles — small detail, but its absence makes a store look unfinished.
  - *Developer note:* Generate full favicon/manifest set (16px to 512px) for browsers and PWA.
- 🟢 **WhatsApp/social link-preview image (Open Graph image)** — In India most product links get shared on WhatsApp — this controls the picture and text that appear in that preview, which decides whether people tap.
  - *Developer note:* OG + Twitter meta tags per page; product pages should auto-use the product photo; default 1200x630 brand image for other pages.
- 🟡 **Brand voice & tone guide (how the brand 'talks')** — Decides if your brand sounds playful, premium or desi-casual — keeps website copy, Instagram captions and WhatsApp replies sounding like one person.
- 🟡 **Branded templates for email, invoice and shipping label header** — Order confirmation emails and GST invoices carry your logo into the customer's inbox and parcel — consistent branding builds recall and trust.
- 🟢 **Trademark search and application for brand name and logo** — Before spending on packaging and ads, confirm nobody else owns the name — and file so copycats can't steal it once you grow.
  - *Developer note:* Owner action via a trademark agent/CA; check class 25 (clothing) and class 35 (retail) on ipindia.gov.in.

## Design deliverables to expect before development

- 🟢 **Mobile-first Figma mockups of every key page** — 70-80% of Indian shoppers will visit on their phone, so you must see and approve exactly how the phone version looks before any code is written.
  - *Developer note:* Minimum set: homepage, category/listing, product page, cart, checkout (address + payment + COD), order success, order tracking, login/OTP, account, wishlist, search results.
- 🟢 **Desktop versions of the same pages** — Desktop brings fewer visitors but often higher-value orders; it should not look like a stretched phone screen.
- 🟢 **Clickable Figma prototype walkthrough** — Lets you 'tap through' buying a product before development starts — the cheapest moment to change your mind is now, not after coding.
- 🟢 **Designs for all the 'unhappy' states** — Empty cart, no search results, size out of stock, payment failed, page not found — customers hit these daily and a blank or broken-looking screen loses the sale.
  - *Developer note:* Also design loading skeletons and slow-network states — common on Indian mobile data.
- 🟢 **Design handoff package (specs, exported icons/images, spacing rules)** — So the developer builds exactly what was approved instead of improvising, and you are not held hostage if you change developers.
  - *Developer note:* Insist Figma file ownership/edit access is transferred to the founder's own account.
- 🟡 **Reusable component library / design system in Figma** — Buttons, cards and forms defined once and reused — makes future pages faster and cheaper to add and keeps the site consistent.
- 🟡 **Banner and creative templates (homepage hero, sale strip, Instagram post sizes)** — You will run festive sales (Diwali, EOSS) constantly — templates let you produce new banners in hours without a designer each time.
  - *Developer note:* Provide editable templates (Figma/Canva) at exact pixel sizes the site's banner slots use.
- 🟡 **Email template designs (order confirmation, shipping update, abandoned cart)** — These are the most-opened messages your brand will ever send; they should look designed, not like plain system text.
- ⚪ **Dark mode design** — A nice-to-have polish many premium apps offer; adds cost and testing effort, so defer it.
- ⚪ **Native mobile app design** — Myntra-scale brands have apps; at your stage a fast mobile website (PWA) does the same job without app-store costs.

## Product photography

- 🟢 **Standard shot list per product (front, back, side, fabric close-up, detail)** — Online shoppers can't touch the garment — 4-6 consistent photos per product answer the questions their hands would have asked, and fewer surprises means fewer returns.
- 🟢 **On-model shots with consistent models and poses** — Seeing clothes on a real body is what convinces fashion shoppers to buy; consistency across products makes the catalog look like one brand, not a reseller.
- 🟢 **'Model wears size M, height 5'10"' note captured for every model shot** — This one line is how Indian shoppers judge fit on Myntra — collect it during the shoot or you will never reconstruct it later.
  - *Developer note:* Store as a product field so it renders near the size selector, not buried in the description.
- 🟢 **Flat lay or ghost-mannequin shots** — Shows the garment's true shape and color without a model — useful as the second image and cheaper to produce for large catalogs.
- 🟢 **Consistent background, lighting and crop across the entire catalog** — A grid of mismatched backgrounds instantly signals 'small-time seller'; Myntra/Ajio grids look trustworthy because every tile matches.
  - *Developer note:* Pick one standard (e.g. light grey seamless, 3:4 crop) and document it so future shoots match.
- 🟢 **Image technical spec: 3:4 portrait ratio, minimum ~1600x2133px, sRGB** — One fixed size means photos never appear stretched or cropped oddly on the site, and they are big enough for pinch-zoom on fabric texture.
  - *Developer note:* Developer should auto-generate WebP/AVIF and multiple sizes for fast loading; keep originals archived.
- 🟢 **File naming convention tied to SKU (e.g. KURTA-BLU-M_01.jpg)** — With 50+ products and 5 photos each, 'IMG_2047.jpg' becomes chaos — SKU-based names let anyone match photos to products in seconds and enable bulk upload.
- 🟢 **Retouching with strict color accuracy** — 'Colour was different from photo' is a top return reason in Indian fashion e-commerce; over-edited photos cost you return shipping both ways on COD orders.
- 🟢 **Model release forms and image usage rights in writing** — You need written permission to use models' faces in ads forever; missing paperwork can force you to reshoot the whole catalog.
- 🟡 **Alt text (one-line description) for every product image** — Helps Google understand and rank your product photos and helps visually impaired shoppers; cheap to add at upload time, painful to backfill.
- 🟡 **Short product videos (10-20s, model turning/walking)** — Video shows fall and movement of fabric better than any photo and can be reused as Instagram Reels — Myntra now shows video on most listings.
  - *Developer note:* Vertical 9:16 for Reels plus 3:4 for the product page gallery; keep files compressed for mobile data.
- 🟡 **Lifestyle/campaign photography for banners and social** — Catalog shots sell products; campaign shots sell the brand's vibe — needed once you invest in ads and a lookbook.
- ⚪ **360-degree spin photography** — Impressive but expensive per product; big marketplaces use it, a small brand's money is better spent on more products shot well.

## Size charts & fit content

- 🟢 **Size chart per garment type, in inches AND centimetres** — One generic chart for the whole store is the #1 cause of size-related returns; a kurta, a t-shirt and a pair of joggers size completely differently.
  - *Developer note:* Store charts as structured data (not screenshots) so they are readable on small screens and editable by the owner; attach chart to category or product.
- 🟢 **Measure actual garments from each production batch for the chart** — Charts copied from the internet don't match your tailor's output — measure your real pieces so the chart tells the truth.
- 🟢 **'How to measure yourself' guide with simple diagrams** — Most customers don't know where 'chest' or 'inseam' is measured; a 30-second diagram converts hesitant shoppers and cuts wrong-size orders.
- 🟢 **Clearly state whether chart shows body measurements or garment measurements** — A 40" garment chest fits a 38" body — mixing these two up is a silent returns machine that most small brands never diagnose.
- 🟢 **Fit descriptor on every product (slim / regular / relaxed / oversized)** — An oversized tee bought expecting regular fit comes straight back; one word on the product page prevents it.
  - *Developer note:* Make it a filterable attribute, not free text.
- 🟡 **Batch-to-batch size consistency checks with the manufacturer** — If your M changes between batches, your size chart and your reviews both become lies; add measurement QC to your production checklist.
- ⚪ **Size recommendation tool ('Find my size' quiz)** — Asks height/weight/fit preference and suggests a size — nice conversion booster once you have return data to tune it, overkill on day 1.

## Product copywriting & catalog data

- 🟢 **Fixed title format for every product** — A consistent pattern like 'Brand — Men Olive Cotton Oversized T-shirt' reads professionally, helps Google, and helps customers scan lists — decide the format once, apply everywhere.
- 🟢 **Description template: fabric, fit, occasion, styling tip, 3-5 bullet highlights** — A fill-in-the-blanks template means every product gets complete, scannable info even when you write 50 descriptions in one sitting.
- 🟢 **Fabric composition and GSM/weight for every product** — '100% cotton, 220 GSM' is the online substitute for touching the fabric — serious buyers look for it and its absence reads as hiding something.
- 🟢 **Wash & care instructions per product** — Prevents 'kurta shrank after wash' complaints and refund fights — and matches what customers expect from Myntra listings.
- 🟢 **Legal Metrology declarations: MRP, net quantity, country of origin, manufacturer/packer name & address, customer care contact** — Indian law requires these on every e-commerce product listing — missing them risks fines, and most small brands don't know this rule exists.
  - *Developer note:* Add dedicated fields in the product admin so these render on every product page automatically; also required on the garment's physical MRP tag.
- 🟢 **HSN code and GST rate assigned to every product** — Apparel GST depends on price point — correct codes mean correct invoices and no pain at tax-filing time.
  - *Developer note:* Confirm current GST slabs for apparel with the founder's CA; store HSN per product for invoice generation.
- 🟢 **Structured attributes on every product: colour, sizes, sleeve, neckline, pattern, occasion, fabric** — These power the filters shoppers use ('blue', 'full sleeve', 'festive') — if entered as free text instead of tick-boxes, filters will never work.
  - *Developer note:* Define the attribute list before catalog entry begins; changing taxonomy after 100 products is painful.
- 🟢 **Product master spreadsheet as the single source of truth** — One sheet with SKU, name, price, MRP, sizes, stock, fabric, HSN — this is what the developer bulk-imports, what your accountant reads, and what prevents website-vs-reality mismatches.
  - *Developer note:* Agree the column format with the developer so it maps to the store's CSV import.
- 🟡 **SEO-friendly copy: search keywords worked into titles/descriptions, unique text per product** — How people searching 'oversized tshirt men india' find you for free instead of via paid ads; copy-pasted descriptions get ignored by Google.
  - *Developer note:* Also set meta titles/descriptions per page; avoid duplicating manufacturer boilerplate.
- 🟡 **Search synonym tags (tee/t-shirt/tshirt, kurti/kurta)** — Customers spell things many ways; tags make sure the site's own search still finds the product.
- ⚪ **Hindi/vernacular product content** — Expands reach into Bharat's next shoppers, but only worth the translation upkeep once English catalog and sales are stable.

## Brand pages & site content

- 🟢 **About Us / brand story page with founder photo** — For an unknown brand, 'who is behind this?' is the trust question — a real face, a real city and a genuine story convert skeptics better than discounts.
- 🟢 **Contact page with phone, WhatsApp, email and physical address** — Indian shoppers check for a working phone/WhatsApp number before paying online to an unknown site; an address signals you're a real business.
  - *Developer note:* WhatsApp click-to-chat link (wa.me) with a pre-filled message; keep the number a WhatsApp Business number.
- 🟢 **Return, exchange & refund policy page in plain language** — Shoppers read this before their first order from a new brand; vague policies kill conversions and clear ones prevent disputes.
  - *Developer note:* Summarise key points ('7-day easy exchange') on product pages too, not just a buried footer link.
- 🟢 **Shipping policy page (charges, COD availability, delivery times, serviceable pincodes)** — Answers 'kitne din mein aayega?' and 'COD hai kya?' before the customer has to ask you on WhatsApp.
- 🟢 **Privacy policy and terms & conditions** — Legally required, expected by payment gateways during onboarding, and required under India's data protection rules.
  - *Developer note:* Payment gateway (Razorpay etc.) approval typically requires these pages plus contact and refund pages to exist.
- 🟢 **FAQ page (sizing, COD, returns, delivery, order tracking, washing)** — Deflects the 10 questions you'd otherwise answer on WhatsApp fifty times a day.
- 🟢 **Homepage launch content: hero banner, category tiles, new-arrivals strip, brand-story strip** — The homepage is your shop window — its images and words must exist before launch day, and it's the content founders most often leave for 'later'.
- 🟢 **Announcement bar content ('Free shipping above Rs 999', 'COD available')** — The thin strip at the very top is prime real estate for the offer or reassurance that gets people to keep browsing.
- 🟡 **Lookbook / collection editorial pages** — Lets you present a festive or seasonal collection as a story, the way big brands do — great for Instagram traffic.
- 🟡 **Blog / style guide articles** — Long-term free Google traffic ('how to style a kurta with sneakers') — worthwhile only after the catalog and operations are humming.
- ⚪ **Press / media page and store locator** — Relevant once you have press coverage or offline retail presence.

## UI patterns fashion shoppers expect (Myntra/Ajio conventions)

- 🟢 **Sticky 'Add to Bag / Buy Now' bar on mobile product pages** — Shoppers scroll deep into photos and reviews — the buy button must stay under their thumb the whole time, exactly like Myntra.
- 🟢 **Swipeable photo gallery with pinch-zoom on product pages** — Swiping through photos and zooming into fabric is how mobile shoppers 'inspect' the garment; if zoom is broken, trust drops.
- 🟢 **Size selector showing all sizes, with out-of-stock ones greyed out (not hidden)** — Seeing 'M sold out' creates urgency and explains availability; hiding sizes just confuses people into thinking the product only comes in XL.
  - *Developer note:* Add 'notify me' capture on sold-out sizes in phase 2.
- 🟢 **Product cards with wishlist heart, price + MRP strikethrough + % off** — This exact card format is what Indian shoppers have been trained on by Myntra/Ajio — matching it makes your store instantly familiar.
- 🟢 **Filters (size, colour, price, discount, fit) and sort (newest, price, popularity)** — Even a 40-product catalog needs 'show me M-size under Rs 999' — filters are how fashion shoppers actually browse.
  - *Developer note:* Filters depend entirely on the structured attributes captured in the catalog spreadsheet.
- 🟢 **Pincode checker with estimated delivery date on the product page** — 'Deliver to 110016 — by Sat, 24 Aug' is a standard Indian e-commerce expectation and quietly answers the #1 pre-purchase question.
  - *Developer note:* Courier aggregators (Shiprocket etc.) expose serviceability + EDD APIs; also show COD availability per pincode.
- 🟢 **Persistent cart and one-tap wishlist (works before login)** — Mobile shoppers browse in bursts across days; losing their cart because they didn't 'sign up' loses the sale.
- 🟡 **Recently viewed and 'similar products' rows** — Fashion buying is comparison shopping — these rows keep people circling your catalog instead of going back to Google.
- 🟡 **Search with autosuggest and typo tolerance** — Suggesting 'kurta' as they type 'kur' — and forgiving 'tshrit' — keeps impatient mobile users from bouncing.
- 🟡 **Badges: NEW, BESTSELLER, ONLY 2 LEFT, sale countdown** — Familiar nudges from every fashion app that lift conversions — but they need honest data behind them, so wire them up after launch.
- 🟡 **Coupon/offer display on product page and a coupon box that actually works in cart** — Indian shoppers hunt for a code before paying; showing offers upfront beats them leaving to search a coupon site and never returning.
- ⚪ **Shop-the-look and outfit bundling** — 'Buy the whole outfit' raises order value — a Myntra-scale merchandising feature for later.
- ⚪ **PWA app-like experience (add to home screen, offline shell)** — Gives repeat customers an 'app' without app-store costs, once repeat traffic justifies it.

## Trust elements

- 🟢 **Payment method logos at footer and checkout (UPI, Razorpay/gateway, Visa/Mastercard, COD)** — Familiar logos are the fastest visual signal that paying here is safe — especially the UPI and COD marks Indian shoppers scan for.
- 🟢 **'COD Available' badge shown on product pages, not just checkout** — For first-time buyers from an unknown brand, COD is the trust bridge — advertise it early in the journey, since many won't reach checkout to discover it.
- 🟢 **Reassurance strip on product page: easy returns, secure payments, quality promise** — Three small icons under the buy button answer the three fears (wrong size, fraud, bad quality) at the exact moment of decision.
- 🟢 **Registered business name, address and GSTIN in the footer** — Anonymous websites feel like scams; visible legal identity is cheap credibility and helps with payment gateway approval.
- 🟢 **Floating WhatsApp chat button** — Indian customers trust brands they can talk to — a WhatsApp button converts doubters ('is this size right for me?') into buyers.
  - *Developer note:* Use WhatsApp Business; route to a number that is actually answered during stated hours.
- 🟢 **HTTPS everywhere with no 'not secure' warnings** — One browser security warning at checkout and the customer is gone forever.
  - *Developer note:* SSL on all pages including www/non-www redirects; no mixed-content warnings from http image links.
- 🟡 **Customer ratings & reviews with photo uploads** — Photo reviews from real Indian customers are the single strongest trust signal for an unknown fashion brand — start collecting from order #1.
  - *Developer note:* Automate post-delivery review requests via WhatsApp/email; moderate before publishing.
- 🟡 **Instagram feed embed / follower count / press mentions** — Social proof that other people already follow and buy from you.
- 🟡 **Order tracking page customers can check themselves** — 'Where is my order?' is the top anxiety with a new brand — self-serve tracking replaces panic WhatsApp messages.
  - *Developer note:* Courier aggregator webhooks can power a branded tracking page.
- ⚪ **Third-party trust certifications and 'verified brand' style seals** — Marginal gains once reviews and social proof exist; skip until scale.

## Packaging & unboxing branding

- 🟢 **Sturdy, tamper-evident shipping packaging that meets courier norms** — A torn or shabby parcel undoes everything the website promised; tamper evidence also protects you in COD and 'item missing' disputes.
- 🟢 **Garment tags and labels: brand hang tag, size label, MRP tag with legally required details** — The MRP tag with manufacturer details, net quantity and country of origin is legally required on the physical garment — and a nice hang tag makes the product feel premium.
- 🟢 **GST invoice printed and included in every parcel** — Expected by customers, required for B2B buyers, and it doubles as proof of purchase for exchanges.
  - *Developer note:* Invoice generation with GSTIN, HSN and tax breakup should come from the order system, not typed manually.
- 🟢 **Thank-you card with WhatsApp and Instagram QR codes** — A Rs 3 printed card that converts a one-time buyer into a follower and repeat customer — the cheapest marketing you will ever do.
- 🟢 **Easy-returns instruction insert** — Telling customers exactly how to exchange sizes reduces angry calls and makes them more confident to buy again.
- 🟡 **Branded printed mailers, tissue paper and stickers** — The Instagram-worthy unboxing moment — worth the print cost once order volumes justify a minimum print run.
- 🟡 **Next-order discount coupon insert** — A code in the box ('WELCOME10 on your next order') is a proven repeat-purchase trigger.
- 🟡 **Packaging photography/video for the website and ads** — Showing the unboxing on the site sets expectations and signals care.
- ⚪ **Eco-friendly packaging with a sustainability story** — A brand differentiator customers increasingly care about — adopt when you can source it at sane cost.

## Content checklist to complete BEFORE development starts

- 🟢 **Domain name bought and social handles reserved (Instagram, WhatsApp Business, YouTube)** — The brand name must be available everywhere before you print it on tags and packaging — check this first, change costs multiply later.
- 🟢 **Business email on your own domain (orders@yourbrand.in)** — Order emails from a Gmail address look like phishing; a domain email is also needed for payment gateway and courier signups.
- 🟢 **Complete logo pack, colors and fonts handed to the developer** — Missing brand files are the #1 reason projects stall in week one.
- 🟢 **Product master spreadsheet finalised (SKUs, names, prices, MRP, sizes, stock, fabric, HSN)** — The developer can build an empty shop fast — filling it is your job, and it always takes longer than expected. Start now.
- 🟢 **All launch products photographed, retouched and named per convention** — Photography is usually the slowest item on the critical path — shoot while the site is being built, not after.
- 🟢 **Size charts measured and written per garment type** — Cannot be invented by the developer; only you and your manufacturer have the real numbers.
- 🟢 **All page copy drafted: About Us, policies, FAQ, homepage text, announcement bar** — Developers fill missing text with 'Lorem ipsum' and it has a way of going live; real words must come from you.
- 🟢 **Policy decisions made in writing: return window, exchange-only vs refund, COD yes/no and limits, shipping charges and free-shipping threshold** — These business decisions shape checkout design and policy pages — deciding late forces rework.
- 🟢 **Business documents ready: GSTIN, PAN, current account, registered address, customer-care number** — Payment gateway and courier onboarding both demand these and can take days — start the applications in parallel with development.
- 🟢 **Launch banner creatives and first-month offer plan** — A beautiful empty homepage on launch day helps no one; the launch offer and banners should be ready when the site is.
- 🟡 **Google Business Profile and basic social presence with a few posts** — Customers who hear about you will Google the brand before buying — an empty internet presence undermines the website's trust work.
- 🟡 **Content calendar for festive seasons (EOSS, Raksha Bandhan, Diwali, wedding season)** — Indian fashion sells on the festive calendar — planning creatives a month ahead beats scrambling every festival.

## Questions to ask your developer

- Will I get Figma mockups for both mobile and desktop to approve BEFORE coding starts, and how many revision rounds are included in the price?
- Do you have a designer on your team, or do I need to hire one separately? Who owns the Figma files and all design assets when the project ends?
- Are you building on a platform/theme (Shopify, WooCommerce, custom)? If a theme, show me a live example and tell me exactly what can and cannot be changed to match my brand guide.
- What exact image sizes, ratio and format should I deliver photos in, and will the site automatically compress and resize them (WebP/AVIF) so pages load fast on mobile data?
- How do I add or edit products, photos, prices, size charts and homepage banners myself after launch, without paying you each time? Can you demo the admin panel?
- Can product data be bulk-uploaded from my spreadsheet? Please give me the exact column template before I start catalog entry.
- Will product attributes (size, colour, fit, occasion) power real filters, and can I add a new attribute later without breaking things?
- Where will trust elements appear — payment logos, COD badge, returns promise, reviews? Is the review system built-in or a paid plugin, and can reviews include customer photos?
- How will the pincode delivery-date checker and COD-availability check work — which courier aggregator API are you integrating?
- How is the WhatsApp chat button implemented, and can I change the number or connect a WhatsApp Business API tool later?
- Will you design and build all error/empty states (empty cart, no results, payment failed, out of stock), or only the happy path?
- Will the product pages support video and additional media later without a redesign?
- Will the site pass Google's Core Web Vitals on a mid-range Android phone with my image-heavy catalog? Can we test this before launch?
- Who writes the microcopy — button labels, error messages, form hints? If it's me, give me the full list of strings needed.
- Will legally required product declarations (MRP, net quantity, country of origin, manufacturer details) have dedicated fields that display automatically on every product page?
- Will GST invoices with HSN codes and tax breakup be generated automatically per order, and can I download them for my CA?

## What you (the owner) must provide

- [ ] Final logo files in vector format plus variants, exact brand color codes, and chosen fonts with proof of license
- [ ] One-page brand style guide and (later) a voice/tone note for how the brand should sound
- [ ] Product master spreadsheet: SKU, title, description, price, MRP, sizes, colours, stock, fabric composition, GSM, care instructions, HSN code, fit type, occasion tags
- [ ] Edited product photos (4-6 per product) in the agreed ratio, named by SKU convention, plus 'model wears size / height' notes
- [ ] Size chart measurements per garment type, measured from actual production garments, with garment-vs-body clarification
- [ ] All written content: About Us with founder photo, FAQ answers, homepage headlines, announcement-bar text
- [ ] Policy decisions and drafted policy text: return/exchange window, refund vs exchange-only, COD rules, shipping charges, free-shipping threshold, delivery timelines
- [ ] Legal and business details: registered business name, GSTIN, PAN, registered address, customer-care phone/WhatsApp/email, current account for payment gateway
- [ ] Domain name purchase and reserved social handles; business email on the domain
- [ ] Model release forms and photographer usage-rights agreements
- [ ] Trademark search/application status for brand name and logo
- [ ] Packaging content: thank-you card text, WhatsApp/Instagram QR targets, returns-insert wording, first coupon codes
- [ ] Launch marketing assets: hero banner images, launch offer details, first month's festive/sale calendar
