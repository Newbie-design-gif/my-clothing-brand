# Marketing, SEO & analytics

> Part 6 of 14 of the Vawehall e-commerce scope. Full area: **Marketing, SEO & Analytics**.
> 70 work items — 🟢 31 needed at launch · 🟡 25 in phase 2 · ⚪ 14 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## SEO Fundamentals (getting found on Google)

- 🟢 **Clean, readable URLs** — Web addresses like yourbrand.in/kurtas/blue-cotton-kurta are easier for Google and customers to understand than pages full of random numbers and symbols.
  - *Developer note:* Slug-based URLs for products, categories, and pages; lowercase, hyphen-separated; no query-string product IDs as the canonical URL. Set up 301 redirects if a product URL ever changes.
- 🟢 **Unique page titles and meta descriptions** — This is the text Google shows in search results — every product and category page needs its own, or Google treats your pages as duplicates.
  - *Developer note:* Auto-generate from product name + brand + category with an editable override field in the admin panel. Enforce sensible length limits (~60 chars title, ~155 chars description).
- 🟢 **Product structured data (rich snippets)** — Invisible code that tells Google the price, availability and rating of each product, so your listings can show price and stars directly in search results.
  - *Developer note:* JSON-LD schema.org/Product with price in INR, availability, brand, GTIN/SKU, and AggregateRating once reviews exist. Also add Organization, BreadcrumbList, and WebSite (sitelinks searchbox) schema. Validate with Google's Rich Results Test.
- 🟢 **XML sitemap (auto-updating)** — A machine-readable map of every page on your site, so Google discovers new products the day you add them.
  - *Developer note:* Auto-regenerate on product publish/unpublish; separate sitemaps for products, categories, blog; submit in Search Console; reference in robots.txt.
- 🟢 **robots.txt and index controls** — Tells Google which pages to skip (like cart and checkout) so it spends its attention on your product pages.
  - *Developer note:* Noindex cart, checkout, account, internal search results, and filtered/sorted URL variants; canonical tags on product pages to avoid duplicate-content issues from size/colour URL parameters.
- 🟢 **Fast, mobile-first pages (Core Web Vitals)** — Most Indian shoppers are on phones with average networks — slow pages lose both customers and Google ranking.
  - *Developer note:* Target good Core Web Vitals on mid-range Android over 4G: compressed WebP/AVIF images with lazy loading, responsive image sizes, CDN, minimal JS. Load marketing pixels via a tag manager after page render so they don't slow the page.
- 🟢 **Google Search Console setup** — Google's free dashboard that shows which searches bring people to your site and warns you when something breaks.
  - *Developer note:* Verify domain property (DNS verification), submit sitemaps, monitor Core Web Vitals and indexing reports. Give the owner access with their own Google account.
- 🟢 **Custom 404 page and redirect management** — When a product is sold out forever or a link is wrong, customers should land on a helpful page suggesting other products, not a dead end.
  - *Developer note:* 404 page with search + popular categories; admin ability to create 301 redirects for discontinued products (redirect to category page).
- 🟡 **Out-of-stock page handling** — Sold-out product pages should stay live with a 'notify me' button instead of vanishing — deleting them throws away Google ranking you've earned.
  - *Developer note:* Keep URL live with availability schema = OutOfStock, show related products, back-in-stock email/WhatsApp signup. Only 301 to category if permanently discontinued.
- 🟡 **Category page SEO text blocks** — A short editable paragraph on each category page (e.g. 'Cotton Kurtas for Women') helps those pages rank for the searches customers actually type.
  - *Developer note:* CMS-editable rich-text field per category, rendered below or above the product grid.
- ⚪ **Hreflang / multi-language SEO** — If you later add Hindi or other language versions of the site, Google needs tags to show the right language to the right person.
  - *Developer note:* Only relevant if/when regional-language storefronts are built.

## Google Shopping & Merchant Center

- 🟢 **Google Merchant Center account + product feed** — This puts your products in the 'Shopping' tab on Google with photos and prices — free listings first, paid ads later.
  - *Developer note:* Auto-generated feed (XML or Content API) with title, description, image link, price in INR incl. GST, availability, GTIN or identifier_exists=false, apparel attributes (size, colour, gender, age group). Sync stock at least daily, ideally on change.
- 🟢 **Free product listings on Google** — Once the feed exists, Google shows your products in Shopping results for free — easy visibility with no ad spend.
  - *Developer note:* Enable free listings in Merchant Center; requires accurate shipping and returns info configured for India.
- 🟢 **Merchant Center policy compliance pages** — Google rejects stores without clear contact, shipping, and returns pages — these must exist before the feed is approved.
  - *Developer note:* Visible contact info, shipping policy with delivery timelines, return/refund policy, and secure checkout (HTTPS). Common cause of Merchant Center suspension for new Indian stores.
- 🟡 **Google Ads conversion tracking (for Shopping/Performance Max ads)** — When you start paid Google ads, this tells Google which ad clicks turned into orders so your money isn't wasted.
  - *Developer note:* Google Ads conversion tag + enhanced conversions (hashed email/phone), linked to GA4 and Merchant Center. Track purchase value and transaction ID to avoid double counting.
- ⚪ **Local inventory / offline store feed** — If you also have a physical shop, Google can show 'available nearby' — only worth doing at scale.

## Analytics & Conversion Tracking

- 🟢 **Google Analytics 4 with e-commerce events** — Your free dashboard showing how many people visit, what they view, where they drop off, and what they buy.
  - *Developer note:* Full GA4 e-commerce event set: view_item, view_item_list, add_to_cart, begin_checkout, add_shipping_info, add_payment_info, purchase (with items array, value, currency=INR, transaction_id). Fire purchase server-side or on a reliable thank-you page — COD orders must count too.
- 🟢 **Google Tag Manager** — A control panel for all tracking codes, so future pixels can be added without paying a developer each time.
  - *Developer note:* GTM container with a dataLayer spec covering all e-commerce events; document the dataLayer for future agencies. Consider server-side GTM later for ad-blocker resilience.
- 🟢 **Checkout funnel & drop-off reports** — Shows exactly at which step people abandon (cart, address, payment) so you know what to fix first.
  - *Developer note:* GA4 funnel exploration on checkout events; also track payment-method chosen (UPI vs COD vs card) as an event parameter — COD-heavy funnels behave very differently.
- 🟡 **Marketing dashboard for the owner** — One simple weekly view — visitors, orders, revenue, top products, top traffic sources — instead of digging through GA4.
  - *Developer note:* Looker Studio dashboard connected to GA4 + payment/order data, or the analytics built into the e-commerce platform.
- 🟡 **Cookie consent management** — A banner asking permission before tracking, needed under India's DPDP Act and for EU visitors if you ever ship abroad.
  - *Developer note:* Lightweight CMP integrated with GTM consent mode; don't let it block page render.
- 🟡 **Heatmaps & session recording** — Watch anonymised replays of how real shoppers use your site to spot confusing pages.
  - *Developer note:* Microsoft Clarity is free and works well; mask personal data fields.
- 🟡 **Server-side tracking / conversion APIs** — Ad blockers and iPhone privacy settings hide many sales from Facebook and Google — server-side tracking sends the data reliably so ads stay effective.
  - *Developer note:* Meta Conversions API + GA4 Measurement Protocol from the backend on order confirmation, deduplicated with browser events via event_id. Especially important for COD orders confirmed later.
- ⚪ **Cohort / LTV and RTO analytics** — Shows whether customers come back and buy again, and which marketing channels bring customers who actually accept their COD parcels (returns-to-origin are a big hidden cost in India).
  - *Developer note:* Join marketing source (UTM) with order outcome data (delivered vs RTO) — very valuable for deciding where to spend ad money.

## Meta (Facebook/Instagram) & Instagram Shopping

- 🟢 **Meta Pixel with e-commerce events** — Instagram is where Indian fashion shoppers live — the pixel lets you show ads to people who visited your site and measure which ads sell.
  - *Developer note:* ViewContent, AddToCart, InitiateCheckout, Purchase events with content_ids matching the catalog feed, value and currency=INR. Install via GTM; pair with Conversions API (see analytics section).
- 🟢 **Meta catalog feed + Instagram Shopping tags** — Lets you tag products directly in Instagram posts and reels so followers tap and buy — often the #1 sales channel for small Indian fashion brands.
  - *Developer note:* Product feed to Meta Commerce Manager (same source data as Google feed), synced daily; requires Business Manager, verified domain, Instagram Business account, and a commerce-policy-compliant site.
- 🟢 **Domain verification & Business Manager setup** — One-time paperwork Meta requires before shopping tags and reliable ads work — forgetting it blocks everything else.
  - *Developer note:* Meta Business Manager, domain verification via meta-tag or DNS, Instagram professional account linked to the Facebook page. Owner must be an admin, not just the agency.
- 🟡 **Dynamic retargeting ads (catalog ads)** — Automatically shows people the exact products they looked at but didn't buy — usually the highest-return ad type for fashion.
  - *Developer note:* Requires pixel + catalog with matching content_ids; broken ID matching is the most common failure, test it.
- 🟡 **UGC / reels-friendly product pages** — Pages should load instantly from Instagram's in-app browser, where most of your ad traffic will arrive.
  - *Developer note:* Test in Instagram/Facebook in-app browsers specifically; they are stricter and slower than Chrome.

## WhatsApp Marketing (WhatsApp-first customers)

- 🟢 **WhatsApp chat button on every page** — Indian customers trust brands they can message — a floating WhatsApp button answering 'is this cotton?' converts hesitant browsers into buyers.
  - *Developer note:* wa.me deep link with pre-filled message including page/product context; use the business number, not a personal one.
- 🟢 **WhatsApp Business API account setup** — The official, scalable WhatsApp — needed for automated order updates and marketing messages without risking a number ban.
  - *Developer note:* Via a BSP like Interakt, Wati, AiSensy, Gupshup, or Zoko; needs Meta Business verification and a dedicated number. Order-notification transactional templates first.
- 🟢 **Transactional WhatsApp messages (order, shipping, delivery, COD confirmation)** — Order-placed, shipped, out-for-delivery messages on WhatsApp reduce 'where is my order' calls, and COD-confirmation messages cut fake orders significantly.
  - *Developer note:* Pre-approved utility templates triggered by order/shipment webhooks; COD confirmation with confirm/cancel buttons is a proven RTO reducer in India.
- 🟡 **Abandoned-cart recovery on WhatsApp** — A friendly 'you left this in your cart' WhatsApp message recovers far more sales in India than email does.
  - *Developer note:* Marketing template with product image + cart link, sent 1-24h after abandonment; requires opt-in checkbox at checkout and easy opt-out. Watch Meta's per-user marketing message limits.
- 🟡 **WhatsApp broadcast campaigns (new drops, sales)** — Announce new collections to customers who opted in — open rates are far higher than email.
  - *Developer note:* Opt-in list management, segmentation (past buyers vs browsers), template approval workflow, and frequency caps to protect the number's quality rating.
- ⚪ **WhatsApp click-to-chat ads and commerce catalog** — Ads on Instagram that open a WhatsApp chat, plus a browsable product catalog inside WhatsApp itself.
  - *Developer note:* CTWA ads with conversation tracking; WhatsApp catalog sync from the same product feed.

## Email Marketing

- 🟢 **Email capture (newsletter signup + checkout opt-in)** — Building your own customer list from day 1 means you're not renting your audience from Instagram forever.
  - *Developer note:* Footer signup, optional exit-intent/first-visit popup with a discount code, and marketing opt-in checkbox at checkout. Sync to the chosen email tool automatically.
- 🟢 **Transactional emails (order confirmation, shipping, refund)** — Customers expect an instant confirmation email with their order details and GST invoice — it's also your proof of what they ordered.
  - *Developer note:* Dedicated transactional sender (SES/Postmark/SendGrid or platform built-in); attach or link GST-compliant invoice; separate from marketing sending reputation.
- 🟢 **Email authentication (SPF, DKIM, DMARC)** — Invisible settings that stop your emails landing in spam — without them Gmail increasingly rejects bulk mail outright.
  - *Developer note:* SPF, DKIM, and DMARC records on the sending domain; use a subdomain (mail.brand.in) for marketing sends. Gmail/Yahoo bulk-sender rules now require one-click unsubscribe.
- 🟡 **Email marketing tool setup (Klaviyo / Mailchimp / WebEngage)** — The tool that stores your list, sends campaigns, and runs automations; picking one early avoids painful migration later.
  - *Developer note:* Klaviyo has the deepest e-commerce integration; Mailchimp is cheaper to start; WebEngage/MoEngage bundle email+SMS+WhatsApp+push which suits India well. Needs full e-commerce event sync (viewed product, added to cart, purchased).
- 🟡 **Welcome series automation** — An automatic 2-3 email sequence introducing the brand and offering a first-order coupon to every new subscriber.
  - *Developer note:* Triggered flow in the email tool; include the signup coupon code and best-sellers.
- 🟡 **Abandoned-cart email flow** — Automatically emails people who left items in their cart — one of the highest-return automations in e-commerce.
  - *Developer note:* 2-3 email sequence (1h, 24h, 72h) with cart contents and one-click return-to-cart link; coordinate with the WhatsApp flow so customers aren't hit on both channels simultaneously.
- 🟡 **Post-purchase & win-back flows** — Automatic 'how was your order?' review requests and 'we miss you' offers to customers who haven't bought in 90 days.
  - *Developer note:* Review request timed after expected delivery date (use courier delivered webhook, not ship date); win-back segment based on last-order date.
- 🟡 **Back-in-stock and price-drop alerts** — Lets customers ask to be notified when their size returns — captures demand you'd otherwise lose.
  - *Developer note:* Per-variant (size/colour) subscription; deliver via email and WhatsApp.
- ⚪ **Advanced segmentation & predictive sending** — Different emails for VIPs, discount-hunters, and one-time buyers — worth it once the list is in the tens of thousands.

## SMS Marketing (India DLT rules)

- 🟢 **DLT registration (TRAI requirement)** — Indian law requires every business sending SMS to register itself, its sender ID, and every message template on a government-mandated DLT platform — without it your SMS simply won't deliver.
  - *Developer note:* Register the business entity on a DLT platform (Jio TrueConnect, Airtel, Vodafone Idea, etc.) with GST/PAN documents, register a 6-char sender ID (header) and each SMS template with variable placeholders. Takes days to weeks — start early. SMS gateways (MSG91, Kaleyra, Gupshup, 2Factor) require DLT entity + template IDs on every send.
- 🟢 **Transactional SMS (OTP, order & delivery updates)** — SMS still reaches customers whose WhatsApp is full or off — order and delivery texts are expected in India.
  - *Developer note:* Transactional/service-implicit DLT category; templates for OTP login, order confirmed, shipped with tracking link, out for delivery, delivered.
- 🟡 **Promotional SMS campaigns** — Sale announcements by SMS — cheap and high-reach, but legally must respect DND (do-not-disturb) rules.
  - *Developer note:* Promotional or service-explicit DLT category with consent records; promotional SMS is blocked to DND numbers and restricted to 9am-9pm. Consent template registration now required under TRAI's stricter rules.
- ⚪ **SMS in automation flows (abandoned cart, back-in-stock)** — SMS as a backup channel in the same automations as email and WhatsApp.
  - *Developer note:* Only after WhatsApp+email flows are proven; every variation needs its own DLT template approval.

## Coupons, UTM & Campaign Tracking

- 🟢 **Coupon/discount code engine** — Percentage-off, flat-off, free-shipping and first-order codes are the basic currency of Indian e-commerce marketing.
  - *Developer note:* Rules: min order value, usage limits (total and per-customer), expiry, product/category restrictions, new-customer-only, stackability rules, auto-apply via URL parameter (site.in/?coupon=WELCOME10).
- 🟢 **UTM tracking discipline** — Little tags on links (utm_source, utm_campaign) that tell you which Instagram post, WhatsApp blast, or influencer actually drove each sale.
  - *Developer note:* Ensure UTMs survive redirects and are captured into GA4; store first-touch and last-touch UTMs on the order record itself so the owner can see revenue per campaign without GA4 skills. Give the owner a UTM builder cheat-sheet.
- 🟢 **Coupon usage reporting** — See how many orders and how much revenue each code drove, and how much discount it cost you.
  - *Developer note:* Admin report: code, uses, revenue, discount given; exportable CSV.
- 🟡 **Unique per-influencer / per-channel codes** — Give each influencer or channel its own code so you know exactly who earned their fee.
  - *Developer note:* Bulk code generation; tie each code to a campaign/partner label in reporting.
- 🟡 **Sitewide sale & flash-sale tooling** — Schedule a sale to start and end automatically (e.g. Diwali sale at midnight) with strikethrough pricing, instead of editing prices by hand.
  - *Developer note:* Scheduled price rules with original-price display (comply with fair pricing norms — genuine MRP strikethroughs only); countdown timers; cache invalidation when the sale flips.
- ⚪ **Multi-touch attribution reporting** — Understand the full journey (saw Instagram ad → clicked WhatsApp → bought from email) instead of crediting only the last click.

## Referral & Influencer Tracking

- 🟡 **Influencer tracking links + codes** — Every influencer gets a trackable link and code so payment can be based on actual sales, not promised reach.
  - *Developer note:* UTM-tagged short links plus personal coupon codes; a simple report per influencer: clicks, orders, revenue. Affiliate platforms (GoAffPro, UpPromote, Refersion) can do this off the shelf.
- 🟡 **Customer referral program (refer-a-friend)** — Existing customers share a link; their friend gets a discount and they get store credit — cheap word-of-mouth growth.
  - *Developer note:* Unique referral links per customer, reward on the friend's first delivered order (not placed — guards against COD fake orders), store-credit ledger, fraud checks (self-referral, same device/address).
- ⚪ **Affiliate/commission payout management** — Once dozens of influencers are on commission, you need automated statements of who is owed what.
  - *Developer note:* Consider TDS implications on commission payouts in India; accountant should advise.

## Content, Blog & Landing Pages

- 🟢 **Basic CMS pages (About, Size Guide, FAQ, policies)** — Trust pages customers check before buying from an unknown brand — About Us, Size Guide, Shipping, Returns, Contact — editable by you without a developer.
  - *Developer note:* CMS-editable pages; size guide as a reusable component embeddable on product pages (huge for reducing fashion returns).
- 🟡 **Blog / lookbook section** — Styling guides and collection stories ('5 ways to style a co-ord set') bring free Google traffic and give Instagram content a home.
  - *Developer note:* Blog with categories/tags, Article schema, shoppable product embeds inside posts, author pages.
- 🟡 **Campaign landing page builder** — Quickly spin up a dedicated page for a festive sale or new collection to send ad traffic to, without developer help each time.
  - *Developer note:* Reusable sections (hero, product grid, testimonial, countdown) in the CMS; ensure these pages inherit tracking automatically.
- 🟡 **SEO content plan for category keywords** — A running list of what your customers search ('office wear kurtis', 'oversized t-shirts men') to guide which pages and posts to create.
  - *Developer note:* Owner/agency task more than a dev task; developer just needs to make pages easy to create.

## Social Proof & Trust Widgets

- 🟢 **Product reviews with photos** — Indian shoppers rely heavily on reviews with real customer photos before trusting a new brand — this is your biggest conversion lever.
  - *Developer note:* Star ratings + text + photo upload, moderation queue, verified-buyer badge, Review schema for Google stars. Native build or apps like Judge.me/Loox/Okendo. Automate review requests post-delivery via WhatsApp/email.
- 🟢 **Trust badges & policy strip** — Small icons — COD available, easy returns, secure UPI payments, free shipping over X — shown near the buy button calm first-time-buyer nerves.
  - *Developer note:* Static component on product page and checkout; content editable by owner.
- 🟡 **Instagram feed / UGC gallery on site** — Showing real customers wearing your clothes on the homepage builds credibility fast.
  - *Developer note:* Shoppable UGC gallery with rights-management workflow (ask permission before reusing customer photos); avoid heavy third-party embeds that slow the page.
- ⚪ **Live sales/social-proof popups** — 'Riya from Pune just bought this' popups — can nudge sales but also feel spammy; test carefully.
  - *Developer note:* Only with real data, never fabricated — fake proof is a legal and trust risk.

## Later-Stage / Myntra-Scale Items

- ⚪ **Web push notifications** — Browser notifications for sale alerts to visitors who never gave an email or number.
  - *Developer note:* Via PWA service worker; tools like PushEngage/WebEngage.
- ⚪ **App-install smart banners** — When a mobile app exists, banners on the mobile site nudge loyal customers to install it.
  - *Developer note:* Only relevant once an app exists; use deferred deep links (Branch/AppsFlyer) so the app opens on the same product.
- ⚪ **Loyalty points program** — Points on every purchase redeemable as discounts, to keep repeat customers away from marketplaces.
  - *Developer note:* Points ledger, expiry rules, integration with coupons and referrals.
- ⚪ **Marketplace channel feeds (Myntra, Ajio, Nykaa Fashion, Amazon)** — If you later sell on marketplaces too, product data and stock should flow from one place instead of being retyped.
  - *Developer note:* Central catalog as source of truth; marketplace integrators (Unicommerce, EasyEcom) handle feed + inventory sync.
- ⚪ **A/B testing framework** — Scientifically test two versions of a page or offer to see which sells more — worth it only with meaningful traffic.
  - *Developer note:* Needs roughly 1,000+ orders/month before results are statistically meaningful.

## Questions to ask your developer

- Which platform are you building on (Shopify, WooCommerce, custom, headless), and which of these marketing features come built-in versus needing apps or custom code — with monthly app costs listed?
- Will all tracking (GA4, Meta Pixel, Conversions API) fire correctly for COD orders, which are confirmed after checkout — and how will cancelled/RTO orders be removed from revenue reporting?
- Will you implement everything through Google Tag Manager with a documented dataLayer, so future agencies can add pixels without code changes?
- How will the product feed for Google Merchant Center and Meta Catalog be generated and kept in sync with stock and prices — real-time, hourly, or daily?
- What are the page-speed targets on a mid-range Android over 4G, and how will you keep marketing scripts from slowing the site down?
- Which WhatsApp Business API provider (BSP) do you recommend, what does it cost per message, and who owns the account — us or you?
- Who handles DLT registration for SMS (entity, header, templates) — you, the SMS gateway, or us — and what documents do you need from us?
- How will UTM parameters and coupon codes be stored on each order so we can see revenue per campaign and per influencer inside the admin panel?
- Which email tool are you integrating (Klaviyo/Mailchimp/WebEngage), and will it receive full e-commerce events (viewed product, added to cart, purchased) automatically?
- How are abandoned-cart triggers coordinated across WhatsApp, email, and SMS so a customer isn't messaged three times for the same cart?
- Will out-of-stock and discontinued products keep their pages with a notify-me option, or 301-redirect — and can we manage redirects ourselves?
- Can we edit page titles, meta descriptions, category SEO text, CMS pages, and coupons ourselves without a developer?
- How will review requests be triggered by the courier's actual 'delivered' event rather than the ship date?
- What consent capture and unsubscribe mechanisms are built in for email, SMS (DND/DLT), and WhatsApp, and where are consent records stored for compliance?
- If we start on a low-cost tool now (e.g. Mailchimp), how painful is migrating lists, flows, and event history to Klaviyo/WebEngage later?

## What you (the owner) must provide

- [ ] Google account (business Gmail or Workspace) to own Search Console, GA4, Merchant Center, and Google Ads — created in your name, never the agency's
- [ ] Meta Business Manager account with you as admin, a Facebook Page, and an Instagram professional account for the brand
- [ ] GST certificate, PAN, and business address proof — needed for DLT (SMS) registration, Merchant Center verification, and WhatsApp Business verification
- [ ] A dedicated phone number for WhatsApp Business API (cannot be your personal WhatsApp number) and a support phone number/email for the website
- [ ] Domain ownership and DNS access (for email authentication records, domain verification for Google and Meta)
- [ ] Brand assets: logo files, brand colours, product photos (flat + model shots), size charts per garment type
- [ ] Written shipping, returns/exchange, and refund policies (delivery timelines, who pays return courier, refund method for COD orders)
- [ ] Decisions on launch offers: first-order discount amount, free-shipping threshold, COD availability and any COD fee
- [ ] Product content: names, descriptions, fabric/care details, prices including GST — written or approved by you
- [ ] Choice of email/SMS/WhatsApp tool budget tier (e.g. free Mailchimp vs paid Klaviyo/WebEngage) and monthly marketing budget for ads
- [ ] List of influencers/partners for the first campaigns, and agreement on their commission or fee structure
- [ ] A person (you or staff) who will answer WhatsApp chats daily and moderate product reviews
- [ ] Approval of every SMS and WhatsApp template text before DLT/Meta submission (changing them later requires re-approval)
- [ ] Content commitment: who writes blog posts and shoots lookbook/UGC content, and how often
