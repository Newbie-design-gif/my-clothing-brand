# Storefront & shopping experience

> Part 1 of 14 of the Vawehall e-commerce scope. Full area: **Customer-facing storefront & shopping experience**.
> 105 work items — 🟢 54 needed at launch · 🟡 36 in phase 2 · ⚪ 15 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Homepage

- 🟢 **Hero banner (1-3 slides)** — The first thing customers see; shows your current collection or offer and sets the brand mood.
  - *Developer note:* Owner-editable banners with mobile-specific image crops; avoid heavy auto-playing carousels.
- 🟢 **Announcement bar** — A thin strip at the top for 'COD available', 'Free shipping above Rs 999' or sale news — customers decide to buy faster when they see this upfront.
  - *Developer note:* Editable text + link from admin, no code change needed.
- 🟢 **Featured collections grid** — Big tappable tiles (Men / Women / New In / Sale) so mobile shoppers reach products in one tap.
- 🟢 **New arrivals strip** — Shows fresh stock so repeat visitors always see something new.
  - *Developer note:* Auto-populate from newest published products.
- 🟢 **Trust badge strip** — Icons for COD, easy returns, secure UPI/card payment, GST invoice — first-time online buyers in India need these reassurances before trusting a new brand.
- 🟢 **Brand story section** — A short 'who we are' with a photo; new brands convert better when the founder story is visible.
- 🟢 **Footer with policies and contact** — Links to returns, shipping, privacy, terms, contact and social handles; buyers scroll here to check if the store is legitimate.
  - *Developer note:* Return/refund, shipping, privacy, T&C pages are also required by payment gateways (Razorpay etc.) for approval.
- 🟡 **Bestsellers section** — Social proof — people buy what others are buying.
  - *Developer note:* Auto from sales data, with manual override for merchandising.
- 🟡 **Email/WhatsApp signup capture** — Collects contacts (e.g. 10% off first order) so you can market to visitors who don't buy today.
  - *Developer note:* Delay popup, don't block first paint; store consent flag.
- 🟡 **Instagram / customer photo (UGC) section** — Real people wearing your clothes builds trust more than studio shots.
  - *Developer note:* Don't use live Instagram embeds — they slow the page; use cached images.
- 🟡 **Campaign/sale landing pages** — Dedicated pages for Diwali sale, wedding edit etc. that ads and WhatsApp broadcasts can link to.
- ⚪ **Personalized homepage** — Homepage rearranges itself based on what each shopper browses — Myntra-style, only worth it at scale.

## Navigation & menus

- 🟢 **Category taxonomy (menu structure)** — The agreed tree of categories (e.g. Men > Shirts, Women > Kurtas) — everything else (menus, filters, URLs) hangs off this, so decide it before building.
- 🟢 **Mobile hamburger menu** — Most Indian traffic is on phones; the menu must open fast and show all categories with big tap targets.
- 🟢 **Sticky header with search, wishlist, cart icons** — Wherever customers scroll, they can always search or reach their cart in one tap.
  - *Developer note:* Cart icon shows live item count.
- 🟢 **Quick links: New In / Bestsellers / Sale** — These are the most-clicked links on any fashion store; put them at the top of the menu.
- 🟢 **Breadcrumbs** — The small 'Home > Women > Kurtas' trail so shoppers can step back a level; also helps Google understand the site.
- 🟢 **Custom 404 page** — When a link is dead, show 'page not found' with search and popular categories instead of a scary error, so the shopper isn't lost.
- 🟡 **App-like bottom navigation bar on mobile** — Fixed bar (Home / Categories / Wishlist / Cart) at the thumb's reach, like Myntra's app.
- 🟡 **Desktop mega menu with images** — Rich dropdown showing subcategories and a promo image; nice polish once the catalogue grows.
- ⚪ **Multi-store / language switcher** — Hindi or regional-language storefronts for wider reach.

## Category & collection listing pages

- 🟢 **Product grid cards (image, name, price, discount %)** — The core browsing screen; strikethrough MRP with '40% off' badge is the pattern Indian shoppers expect from Myntra/Ajio.
  - *Developer note:* 2-column grid on mobile; show 'inclusive of all taxes' context near prices site-wide.
- 🟢 **Out-of-stock and 'only few left' badges** — Stops customers from tapping into products they can't buy, and nudges them to hurry on low stock.
- 🟢 **Image lazy-loading with pagination or 'load more'** — Loads pictures only as you scroll so the page stays fast on cheap phones and slow networks.
- 🟢 **Collection banner + short description** — A heading and 2-3 lines on each category page sets context and helps the page rank on Google.
- 🟢 **Empty-state design** — If a filter combination or category has nothing, show 'nothing here yet' with suggestions instead of a blank screen.
- 🟢 **Wishlist heart on product cards** — Save-for-later without opening each product; fashion shoppers browse in save mode first.
- 🟡 **Second image on hover/swipe** — Shows the back or on-model view without opening the product — helps quick browsing.
- 🟡 **Color swatches on cards** — Shoppers see a style comes in 3 colors without opening it three times.
- 🟡 **Quick add-to-cart with size picker from the grid** — Buy directly from the listing, one less step — meaningful once traffic grows.
- 🟡 **Manual merchandising (pin/reorder products)** — You control which products appear first in each collection — put heroes on top, slow movers below.
- ⚪ **Video thumbnails in the grid** — Short clips of fabric movement in the listing itself — premium touch.

## Filters & sorting

- 🟢 **Size filter (stock-aware)** — The #1 fashion filter — someone who wears XL should be able to hide everything not available in XL.
  - *Developer note:* Filter must respect per-variant stock, not just whether the size exists on the product.
- 🟢 **Color and price-range filters** — Basic narrowing every clothing shopper expects.
- 🟢 **Mobile filter drawer + sort sheet** — Filters open as a bottom sheet or slide-in panel that's easy to use one-handed, like Myntra.
- 🟢 **Applied-filter chips with 'clear all'** — Shoppers see what filters are on and remove one with a tap — otherwise they get confused why results look thin.
- 🟢 **Sorting: newest, price low-to-high, price high-to-low** — Minimum sort options shoppers reach for.
- 🟡 **Fabric, occasion, fit, sleeve, pattern filters** — 'Cotton', 'wedding wear', 'slim fit' — powerful for discovery but only works if every product is tagged consistently.
  - *Developer note:* Model these as structured product attributes from day 1 (even before exposing filters) so products don't need re-entry later.
- 🟡 **Discount filter (30% and above etc.)** — Deal hunters filter by discount during sales.
- 🟡 **Result counts next to each filter value** — 'Red (12)' tells shoppers whether a filter is worth tapping.
- 🟡 **Hide out-of-stock toggle** — Lets shoppers browse only what they can actually buy.
- 🟡 **Sort by popularity / bestselling** — Needs enough sales data to be meaningful.
- ⚪ **SEO-friendly filter URLs** — Pages like /women/kurtas/cotton can rank on Google as their own landing pages.
  - *Developer note:* Canonical tags needed so filter combinations don't create duplicate-content issues.

## Search

- 🟢 **Keyword search across names, categories, tags** — Shoppers who search buy 2-3x more often than browsers; even a small store needs working search on day 1.
- 🟢 **Search results page with the same grid, filters and sorting** — Results should feel like a normal category page, not a bare list.
- 🟢 **No-results page with suggestions** — 'No results for kurtaa — did you mean kurta? Meanwhile, check bestsellers' keeps the shopper on the site.
- 🟡 **Autocomplete with product thumbnails** — Suggestions with pictures appear as the customer types — much faster on a phone keyboard.
  - *Developer note:* Platform-native search is fine at launch; Algolia/Klevu/Searchanise class tools when catalogue and traffic grow.
- 🟡 **Typo tolerance and synonyms (incl. Hinglish)** — Indian shoppers type 'tshirt', 't-shirt', 'kurti', 'kurtha', 'shrug' — search should still find the product.
  - *Developer note:* Maintain an editable synonym list; log misses to feed it.
- 🟡 **Search analytics (top searches, zero-result searches)** — Tells you what customers want that you don't stock — free product-planning data.
- ⚪ **Trending/popular searches shown on tap** — Gives idle searchers a starting point.
- ⚪ **Voice and image search, vernacular search** — Myntra-scale features; skip until much later.

## Product detail page (PDP)

- 🟢 **Image gallery: 4-6 shots per product (front, back, close-up, on-model)** — Photos are the product online — the single biggest driver of both sales and fewer returns.
  - *Developer note:* Swipeable gallery with thumbnails; consistent aspect ratio across catalogue.
- 🟢 **Pinch-to-zoom on mobile, hover zoom on desktop** — Buyers zoom into fabric texture and stitching before trusting a new brand.
- 🟢 **Size selector with sold-out sizes visibly disabled** — Prevents the worst experience: adding a size to cart and finding out later it's unavailable.
- 🟢 **Size chart per product type (cm and inches)** — Wrong size is the #1 reason for returns in Indian fashion — a real chart with garment measurements directly cuts return costs.
  - *Developer note:* Chart mapped by product type/category, editable by owner, opens as overlay without leaving the page.
- 🟢 **Price display: selling price, struck-through MRP, discount %, 'inclusive of all taxes'** — The standard Indian pattern, and MRP/tax-inclusive display keeps you on the right side of pricing rules.
- 🟢 **Description with fabric, fit, wash care, and legal declarations** — Country of origin, manufacturer/packer name & address, net quantity and customer-care contact are legally required on e-commerce listings in India (Legal Metrology rules).
  - *Developer note:* Make these structured fields, not free text, so they render consistently on every PDP.
- 🟢 **Pincode check: delivery date estimate + COD availability** — 'Enter pincode — delivery by 26 Aug, COD available' is the moment Indian shoppers commit; without it many abandon.
  - *Developer note:* Use courier aggregator serviceability API (Shiprocket/Delhivery/iThink); cache responses; remember the shopper's pincode.
- 🟢 **Stock status ('In stock' / 'Only 2 left')** — Sets expectations and adds gentle urgency.
- 🟢 **Add to Cart + Buy Now, with sticky bar on mobile** — The buy button must stay on screen while the shopper scrolls a long PDP on a phone.
- 🟢 **Trust icons near the buy button (COD, 7-day exchange, secure payment)** — Repeating reassurance exactly where the buying decision happens.
- 🟢 **Return/exchange policy snippet on the PDP** — Shoppers check the return rule before buying from an unknown brand; one line with a link beats making them hunt.
- 🟢 **WhatsApp share + 'ask us on WhatsApp' button** — Indian shoppers share products with family for approval and ask sizing questions on WhatsApp before buying.
  - *Developer note:* Click-to-chat wa.me link with product URL pre-filled is enough at launch; Business API later.
- 🟢 **Color/style variant switcher** — If a kurta comes in 3 colors, switching should be one tap with images updating.
- 🟢 **Breadcrumbs on PDP** — One tap back to 'Women > Kurtas' to keep browsing.
- 🟡 **Model size reference ('Model is 5'7", wearing size S')** — The fastest real-world sizing cue shoppers use.
- 🟡 **Product video (10-20s fabric/drape clip)** — Shows how fabric falls and moves — photos can't; strong for ethnic wear and dresses.
  - *Developer note:* Compressed, muted autoplay inside the gallery, never a heavy external embed.
- 🟡 **Ratings & reviews with customer photos** — The strongest trust signal once you have real customers; photo reviews reduce returns too.
  - *Developer note:* Post-delivery review request via WhatsApp/email; moderation queue for abuse.
- 🟡 **'Notify me' for out-of-stock sizes** — Captures demand you'd otherwise lose and tells you what to restock.
  - *Developer note:* WhatsApp/email alert on restock.
- 🟡 **Offers block (coupon codes, bank/UPI offers)** — Shows applicable discounts on the PDP itself so shoppers don't leave to hunt for codes.
- 🟡 **'Complete the look' / related products** — Shows matching items below the product — the cheapest way to raise order value.
- 🟡 **Product schema markup** — Lets Google show price, stock and stars directly in search results.
- 🟡 **Style code / SKU displayed** — Makes support conversations ('which product?') unambiguous.
- ⚪ **Fit-finder quiz / size recommendation** — 'Answer 3 questions, we suggest your size' — Myntra-style, needs data.
- ⚪ **EMI / pay-later messaging** — Relevant only if average order value grows well above Rs 2-3k.
- ⚪ **Customer Q&A on PDP** — Public questions and answers; needs volume to be useful.

## Wishlist, recently viewed & recommendations

- 🟢 **Basic wishlist (works without login)** — Fashion shoppers shortlist first, buy later — the wishlist is where return visits come from.
  - *Developer note:* Store guest wishlist in localStorage; merge into account on login.
- 🟡 **Wishlist page with move-to-cart** — One tap from saved item to cart, with size selection prompt.
- 🟡 **Recently viewed strip** — Shoppers on phones lose their place; this brings back the products they were considering.
- 🟡 **Rule-based recommendations ('You may also like')** — Same-category/same-tag suggestions on PDP and cart — simple and effective at small scale.
- 🟡 **Cart-page cross-sell** — 'Add matching dupatta' at cart raises average order value.
- ⚪ **Price-drop and back-in-stock alerts on wishlisted items** — Automatically pulls savers back when the reason to buy appears.
- ⚪ **ML-personalized recommendations** — Behaviour-based 'picked for you' — needs traffic volume Myntra has and you don't yet.

## Lookbooks & content

- 🟡 **Lookbook / gallery page per collection** — Editorial photos that sell the vibe, not just the product — sets a brand apart from marketplace sellers.
- 🟡 **Shoppable lookbook images (tap a look, see the products)** — Turns inspiration directly into carts.
- ⚪ **Styling / blog content** — '5 ways to style X' articles bring free Google traffic over time.

## Mobile-first & WhatsApp behavior

- 🟢 **Mobile-first responsive design** — 70-80%+ of your traffic will be on phones — design for the phone first, desktop second.
  - *Developer note:* No hover-only interactions; min ~44px tap targets; test iPhone SE-size up to large Android.
- 🟢 **Floating WhatsApp chat button** — Your customers' default support channel; a wa.me click-to-chat button on every page costs nothing and converts doubters.
- 🟢 **Testing on low-end Android over 4G** — Your real customer's device is a Rs 10-15k Android on patchy network, not the developer's MacBook — acceptance testing must happen there.
- 🟢 **Native share (Web Share API)** — The phone's own share sheet so products fly into WhatsApp groups easily.
- 🟢 **Thumb-zone layout (key actions in bottom half of screen)** — Buy/filter/cart actions reachable one-handed.
- ⚪ **PWA / add-to-homescreen** — App-like icon and near-app experience without building an actual app.

## Page speed & performance

- 🟢 **Automatic image compression, WebP/AVIF, responsive sizes** — Photos are 80% of a fashion site's weight; this alone decides whether the site feels fast or broken on Jio/Airtel networks.
  - *Developer note:* CDN-served images, srcset per breakpoint, lazy-load below the fold, fixed dimensions to avoid layout jumps.
- 🟢 **Speed budget: LCP under ~2.5s on a mid-range Android over 4G** — Every extra second of load visibly loses sales; agree on a number now or it will silently degrade.
  - *Developer note:* Measure with Lighthouse mobile preset + real-device checks, not desktop scores.
- 🟢 **Third-party script discipline** — Every chat widget, pixel, and popup app added later slows the store; there must be a rule about what gets added.
- 🟡 **Skeleton loaders / perceived-speed polish** — Grey placeholder blocks while content loads feel faster than spinners or blank screens.
- 🟡 **Ongoing performance monitoring** — Alerts when the site slows down after new apps/banners are added, before customers feel it.
  - *Developer note:* Core Web Vitals in Google Search Console at minimum.
- ⚪ **Sale-day load readiness** — Handles the traffic spike when an ad or influencer post takes off.
  - *Developer note:* Mostly a non-issue on hosted platforms like Shopify; matters if self-hosted WooCommerce.

## Accessibility & baseline quality

- 🟢 **Alt text on all product images** — Helps visually impaired shoppers and helps Google image search find your products.
- 🟢 **Readable text: contrast and minimum font sizes** — Light-grey-on-white prices are unreadable in sunlight on a phone screen — where your customers actually shop.
  - *Developer note:* WCAG AA contrast (4.5:1 body text) as the bar.
- 🟢 **Labeled form fields with clear error messages** — 'Enter a valid 6-digit pincode' beats a red border with no explanation — bad forms lose completed carts.
- 🟢 **No essential info trapped inside images** — Offer terms and size charts as real text, not just a JPEG, so they're searchable, translatable and readable by screen readers.
- 🟡 **Keyboard navigation and visible focus states** — The site remains usable without a mouse or touch — a basic quality bar.
- 🟡 **Screen-reader landmarks and ARIA on menus/galleries/filters** — Proper labels so assistive technology can operate interactive parts of the store.
- ⚪ **Respect reduced-motion settings** — Animations switch off for users whose phones request it.

## Questions to ask your developer

- Which platform are you recommending (Shopify, WooCommerce, headless, etc.) and why — specifically for India: UPI via Razorpay/PhonePe/Cashfree, COD workflows, and GST-compliant invoicing?
- How will the pincode delivery-estimate and COD-availability check on the product page work — which courier aggregator API (Shiprocket, Delhivery, iThink) and what happens when the API is down?
- Will product attributes (fabric, occasion, fit, color) be structured fields from day 1 so filters and search can be added later without re-entering the whole catalogue?
- What search solution is included at launch, what does typo-tolerance/autocomplete cost later, and will you log zero-result searches so we can see what customers want?
- What is our page-speed budget, and will you demo the site to me on a mid-range Android phone over 4G before launch — not just on your laptop?
- Which parts can I edit myself without calling you (banners, announcement bar, menus, size charts, homepage sections, offer text), and which need developer time?
- How do size charts work — one chart per category that I can edit, or hardcoded per product?
- Does the wishlist work for guests without login, and does it merge into their account when they sign up?
- How is the WhatsApp integration done at launch — a simple click-to-chat button, or the WhatsApp Business API — and what's the upgrade path?
- Where do I enter the legally required listing details (country of origin, manufacturer/packer, net quantity, MRP, customer-care contact) and do they show automatically on every product page?
- What analytics will be set up on day 1 (GA4 or similar) to show me searches, filter usage, drop-off points and best-selling categories?
- What image specs do you need from my photographer (dimensions, aspect ratio, format, max file size), and does the platform compress them automatically?
- Is there a staging/preview site where I can check changes before customers see them?
- What is the URL structure for categories and products, and will it survive future redesigns without breaking Google rankings and WhatsApp links already shared?
- If we start with a cheap theme now, what breaks when we want mega menus, quick-add, and recommendations in 6 months — are we building on something extensible?

## What you (the owner) must provide

- [ ] Final category/menu structure (the exact tree, e.g. Men > Shirts / T-shirts; Women > Kurtas / Dresses) — agreed before development starts
- [ ] Product photography: 4-6 consistent shots per product (front, back, fabric close-up, on-model), same background and aspect ratio across the catalogue; short fabric/drape videos if possible
- [ ] Complete product data sheet: names, descriptions, MRP and selling price, SKUs, colors, sizes per product, fabric, wash care, fit, and occasion tags
- [ ] Actual garment measurements for size charts, per product type, in cm and inches; model height and size worn for each shoot
- [ ] Legal Metrology details for every product: country of origin, manufacturer/packer name and address, net quantity, and a customer-care phone/email
- [ ] GSTIN and confirmation that displayed prices are tax-inclusive (and HSN codes for the catalogue, for invoicing)
- [ ] Brand assets: logo files, brand colors, fonts, and the brand story copy for the homepage
- [ ] Written policies: return/exchange window and conditions, shipping charges and timelines, COD rules (limits, any COD fee), cancellation policy, privacy policy, terms
- [ ] Dedicated WhatsApp business number (not a personal number) for the chat button and order queries
- [ ] Launch offer decisions: first-order discount, free-shipping threshold, coupon codes and their wording
- [ ] Homepage merchandising choices: which collections/products to feature at launch and the hero banner creatives (with mobile crops)
- [ ] Domain name purchased and access credentials shared securely with the developer
- [ ] Social media handles, and rights/permissions for any influencer or customer photos used on the site
- [ ] A decision on who maintains content after launch (you, staff, or paid developer hours) — banners, new products, size charts, offers
