# Admin panel & inventory

> Part 5 of 14 of the Vawehall e-commerce scope. Full area: **Admin panel, catalog & inventory operations**.
> 112 work items — 🟢 57 needed at launch · 🟡 44 in phase 2 · ⚪ 11 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Product catalog management

- 🟢 **Product create/edit screen** — One place to add a product with its name, description, fabric, care instructions, photos and price — this is the heart of the store.
  - *Developer note:* Fields: title, description (rich text), fabric/material, care, fit, country of origin (required under Legal Metrology rules for e-commerce), MRP, selling price, HSN code, GST rate, weight & dimensions (needed for courier rates).
- 🟢 **Size and colour variants** — A 'Blue Kurta' in S, M, L, XL is really 4 separate items to track — each size-colour combination needs its own stock count and price.
  - *Developer note:* Model as parent product + variant matrix (size x colour). Each variant gets its own SKU, stock, and optionally price. Allow disabling individual combinations that don't exist.
- 🟢 **Unique SKU code per variant** — A short code like BLKUR-BLU-M lets you and your packers identify the exact item on labels, stock counts and courier slips without confusion.
  - *Developer note:* Auto-generate from a pattern but allow manual override; enforce uniqueness.
- 🟢 **Size chart per product or category** — Wrong size is the number one reason clothes get returned in India — a clear measurement chart saves you real money on return shipping.
  - *Developer note:* Reusable size-chart templates (e.g. 'Men Tshirts') assignable to products; show in cm and inches.
- 🟢 **Multiple images per colour, with drag-to-reorder and zoom** — Customers buy clothes with their eyes — front, back, close-up of fabric, and a model shot per colour, in the order you choose.
  - *Developer note:* Link image sets to colour variants so the photo switches when the shopper picks a colour.
- 🟢 **Automatic image compression and resizing** — Most of your buyers will be on phones with average networks — heavy photos make the site slow and slow sites lose sales.
  - *Developer note:* Generate WebP/AVIF renditions and thumbnails on upload; serve via CDN; lazy-load.
- 🟢 **Bulk product upload via CSV/Excel** — Typing 100 products one by one takes days — a spreadsheet upload loads your whole catalog in one go and is how you'll add each new collection.
  - *Developer note:* Provide a downloadable template; validate rows and show a clear error report (row number + problem) instead of failing silently; support update-by-SKU as well as create.
- 🟡 **Bulk image upload matched by SKU/filename** — Uploading 400 photos one at a time is painful — naming files by SKU and dropping them in one folder should attach them automatically.
- 🟢 **Product status: draft, published, archived** — You can prepare next season's products quietly, publish them on launch day, and retire old ones without deleting their history.
- 🟢 **Duplicate product button** — Most new styles are 90% the same as an existing one — copy, change the photos and name, done in 2 minutes.
- 🟡 **Product attributes and tags for filters** — Tags like sleeve length, occasion, fit and fabric power the 'filter by' options shoppers expect from Myntra-style browsing.
  - *Developer note:* Structured attributes (not free text) so storefront filters stay clean.
- 🟡 **SEO fields per product** — A custom page title, description and clean web address help your products show up when people search on Google.
  - *Developer note:* Meta title/description, editable URL slug with automatic redirect from old slugs.
- 🟡 **Related products / 'style it with' picks** — Hand-picking a matching bottom-wear for each top nudges customers to buy two items instead of one.
- 🟡 **Customer review moderation queue** — Once reviews are enabled on the site, you need a place to approve genuine ones and remove spam or abusive ones before they appear.
- ⚪ **Product videos** — Short clips of fabric movement and fit sell clothes better than photos, but they are heavy to host — fine to add later.
- ⚪ **Barcode generation and label printing** — Printed barcodes on each item make packing and stock counting fast and error-free once volumes grow.

## Inventory tracking

- 🟢 **Live stock count per size-colour variant** — You must know exactly how many Medium Blue pieces are left — selling something you don't have means a cancelled order and an angry customer.
- 🟢 **Automatic stock deduction on order, restore on cancellation** — Stock should go down the moment someone orders and come back if they cancel — no manual maths, no overselling.
- 🟢 **Oversell protection for the last piece** — If two people tap 'buy' on the last Medium at the same time, only one order should go through — the other should see 'sold out', not get a cancellation later.
  - *Developer note:* Atomic stock decrement at order placement (DB-level constraint or row lock), not at page load.
- 🟡 **Stock reserved while payment is in progress** — A shopper paying by UPI takes a minute or two to complete payment — hold their item briefly so it isn't sold from under them, then release it if they don't pay.
  - *Developer note:* Reservation with TTL (e.g. 10-15 min) for pending-payment orders; release on payment failure/timeout.
- 🟢 **Manual stock adjustment with a reason** — Real life happens — damaged pieces, a sale made from your shop counter, a counting mistake — you need to correct stock and record why.
  - *Developer note:* Reasons: damaged, offline sale, count correction, sample given, return restock. Every adjustment logged with user and timestamp.
- 🟢 **Low-stock alerts with per-product threshold** — Get a WhatsApp or email when your bestseller drops below, say, 5 pieces — so you reorder from the tailor before it sells out.
  - *Developer note:* Threshold at variant level; daily digest + instant alert options; WhatsApp via a BSP API or email fallback.
- 🟢 **Out-of-stock display control** — You choose whether a sold-out item shows 'Sold Out' (builds desire, allows notify-me) or disappears from the store entirely.
- 🟡 **'Notify me when back in stock' list** — Collect phone numbers/emails of people who wanted a sold-out size — free demand data and easy sales when you restock.
  - *Developer note:* Auto-message waitlist on restock (WhatsApp/SMS/email with consent).
- 🟡 **Stock movement history per SKU** — When a count looks wrong, you can see every in/out for that item and find where it went wrong.
- 🟡 **Stocktake / physical count reconciliation mode** — Every month or two you'll physically count stock — a screen to enter counted numbers and see differences against the system saves hours.
- ⚪ **Multi-location stock (shop + warehouse)** — If you later ship from more than one place, the system needs to know which location has the piece.
- ⚪ **Sync with offline/POS billing** — If you also sell from a physical counter, both channels should eat from the same stock pool so you never double-sell.

## Pricing & sale scheduling

- 🟢 **MRP plus selling price with automatic discount badge** — Showing 'Rs 1,499 Rs 999 (33% off)' is standard in Indian fashion — enter both prices and the strike-through and percentage appear automatically.
  - *Developer note:* Validate selling price never exceeds MRP (illegal in India). Compare-at price at variant level.
- 🟢 **All prices GST-inclusive** — Indian shoppers expect the price on the tag to be the final price — no surprise tax added at checkout.
  - *Developer note:* Store tax-inclusive price; back-calculate GST for invoices.
- 🟡 **Per-variant pricing** — Plus sizes often cost more to make — you may want XXL priced Rs 100 higher than S-XL.
- 🟡 **Scheduled sales with auto start and end** — Set your Diwali sale to start Friday midnight and end Sunday night — prices change and revert automatically, no staying up at 12 am editing products.
  - *Developer note:* Sale price + start/end datetime (IST) per product or per collection; countdown-friendly.
- 🟡 **Bulk price update via CSV or by collection** — For end-of-season sale you'll want '20% off everything in Winter collection' in one action, not 80 individual edits.
- 🟡 **Price change history** — See what an item sold at last month — useful for planning sales and for answering customer disputes.

## Discounts & coupon engine

- 🟢 **Coupon codes: percentage off, flat amount off, minimum cart value** — The basics — 'FLAT200 on orders above Rs 999' — that every Indian shopper looks for before paying.
- 🟢 **Usage limits: total uses and per-customer uses** — Stops one coupon leaking to a deals Telegram group and being used 5,000 times, or one customer using it on every order.
  - *Developer note:* Per-customer limit needs identity: enforce by logged-in account and/or verified phone number, not just email.
- 🟢 **First-order-only coupon** — 'WELCOME10 for new customers' is the standard way to convert first-time visitors — the system must check it's truly their first order.
  - *Developer note:* Check against phone number and email history to limit abuse via fresh emails.
- 🟢 **Coupon start/expiry dates and on/off switch** — Festival coupons should die on their own after the festival — expired codes must politely say so at checkout.
- 🟢 **Free shipping above a cart value** — 'Free shipping above Rs 999' is the single most effective nudge to make customers add one more item.
- 🟢 **One-coupon-at-a-time stacking rule** — Prevents customers combining three offers and buying your kurta for Rs 50 — the system enforces which offers can combine (usually none).
- 🟡 **Prepaid discount / COD handling fee** — A small extra discount for paying by UPI (or a small COD fee) pushes customers away from COD — fewer refused deliveries, faster money in your bank.
  - *Developer note:* Payment-method-conditional pricing at checkout; RBI/gateway rules on surcharging — prefer prepaid discount framing.
- 🟡 **Automatic cart offers (no code needed)** — Offers like 'extra 5% off on 2+ items' apply on their own — customers who don't know any code still get the deal you intended.
- 🟡 **Buy X get Y and bundle offers** — 'Buy 2 tees get 1 free' and combo pricing move slow stock and raise the average bill.
- 🟡 **Coupons limited to specific products, categories or collections** — Discount old stock without touching your new-arrival margins; also exclude already-discounted items from coupons.
- 🟡 **Bulk-generated unique one-time codes** — Give an influencer or a WhatsApp broadcast list codes that work exactly once each — trackable and impossible to mass-share.
  - *Developer note:* Generate N random codes under one campaign; per-code single use; campaign-level reporting.
- 🟡 **Coupon performance view** — See how many orders and how much discount each code produced — know which offers actually make money.
- ⚪ **Referral program (give Rs 100, get Rs 100)** — Turns happy customers into your marketing team — powerful, but only worth building once you have repeat customers.
- ⚪ **Loyalty points / store credit wallet** — Points and store credit bring customers back and make refunds cheaper (credit instead of cash), but it's a full system — not for day 1.

## Categories & collections

- 🟢 **Category tree with sub-categories** — Men > T-shirts > Oversized — the menu structure customers browse; you control names, order and nesting.
- 🟢 **One product in multiple categories** — A festive kurta belongs in both 'Kurtas' and 'Festive Wear' — it should appear in both without creating it twice.
- 🟢 **Manual collections (curated lists)** — Hand-picked groups like 'New Arrivals', 'Diwali Edit' or 'Under Rs 999' are how you merchandise the store like a shop window.
- 🟡 **Control product order within a category/collection** — Put bestsellers and fresh styles at the top — the first two rows on mobile get most of the attention.
  - *Developer note:* Drag-and-drop manual ordering plus automatic options (newest, bestselling, price).
- 🟡 **Rule-based automatic collections** — 'Everything tagged cotton under Rs 799' fills itself as you add products — less manual curation as the catalog grows.
- 🟡 **Category banner image and description text** — A banner and a couple of lines on each category page make the store feel branded and help Google understand the page.
- 🟡 **Auto-hide empty or fully sold-out categories** — A customer tapping into an empty category is a dead end — the menu should quietly hide it until it has products again.

## Homepage & content management (CMS)

- 🟢 **Homepage banner manager** — You'll change the main banners every campaign — upload image, set the link, set the order, without calling the developer.
  - *Developer note:* Separate mobile and desktop image sizes (traffic will be 80%+ mobile); enforce dimensions/weight limits on upload.
- 🟢 **Announcement bar** — The thin strip on top — 'Free shipping above Rs 999' or 'Diwali sale live' — editable in seconds, huge visibility.
- 🟢 **Featured collections and product rows on homepage** — Choose which collections show on the homepage and in what order — your storefront window changes with the season.
- 🟢 **Editable policy and info pages** — About Us, Contact (with address and phone), Privacy Policy, Terms, Shipping Policy, Return/Refund Policy — payment gateways in India will not approve your account without these pages live.
  - *Developer note:* Simple rich-text page editor; Razorpay/Cashfree/PayU KYC review checks for these pages plus a visible support contact.
- 🟡 **Banner and content scheduling** — Prepare the sale banner in advance and have it appear at midnight and vanish when the sale ends — automatically.
- 🟡 **Preview before publish** — See exactly how the homepage will look on a phone before customers do — catches embarrassing mistakes.
- ⚪ **Blog / lookbook section** — Styling articles and season lookbooks help Google rankings and brand-building — valuable, but not needed to start selling.
- ⚪ **Instagram feed section on homepage** — Your Instagram is probably your strongest asset today — showing the live feed builds trust, but it needs API upkeep.

## Order processing dashboard

- 🟢 **Orders list with search and status filters** — Your daily work screen — see today's orders, filter 'ready to pack', search by phone number when a customer messages on WhatsApp.
  - *Developer note:* Search by order no., phone, name, pincode, SKU. Phone number search is the most-used in practice — WhatsApp-first customers rarely know their order number.
- 🟢 **Order detail view** — Everything about one order in one place: items with size/colour, address, payment mode (UPI/card/COD), amounts, courier tracking, and a timeline of what happened.
- 🟢 **Order status workflow** — New → Confirmed → Packed → Shipped → Delivered (plus Cancelled, Returned) — one shared truth of where every order stands, with each change recorded.
  - *Developer note:* Status changes trigger customer notifications (WhatsApp/SMS/email) — coordinate with the notifications area.
- 🟢 **Instant new-order alert to owner** — A WhatsApp or app notification the moment an order lands — you'll want to feel every sale in the early days, and pack same-day.
- 🟢 **COD confirmation step before shipping** — COD customers who never answer or refuse the parcel cost you two-way shipping — a quick WhatsApp/IVR confirmation before dispatch cuts these losses sharply.
  - *Developer note:* Flag COD orders as 'pending confirmation'; confirm via WhatsApp template message or call; auto-cancel unconfirmed after N days. Consider RTO-risk scoring later.
- 🟢 **GST invoice, packing slip and shipping label printing** — Every parcel needs a tax invoice and label; printing all three from the order page (single or in bulk) is what makes packing 30 orders a day possible.
  - *Developer note:* Sequential GST-compliant invoice numbering (no gaps, financial-year prefix), GSTIN, HSN, CGST/SGST or IGST split, signature block. Thermal-printer-friendly label format.
- 🟢 **Courier integration (aggregator)** — Push the order to the courier with one click, get the tracking number back automatically, and let the customer track — no copy-pasting addresses into courier websites.
  - *Developer note:* Integrate a courier aggregator (Shiprocket, Delhivery Direct, iThink, Nimbuspost) rather than one courier: gives pincode serviceability check, COD support, rate comparison, and NDR management via one API. Auto-sync tracking status back to the order.
- 🟢 **Pincode serviceability and COD-availability check** — Don't accept a COD order to a pincode where no courier delivers COD — check at checkout, not after packing.
  - *Developer note:* Usually an aggregator API call; cache results.
- 🟢 **Edit shipping address before dispatch** — Customers regularly message 'bhaiya, wrong flat number' on WhatsApp — you must be able to fix the address until the parcel leaves.
- 🟢 **Cancel order and start refund** — Cancellations happen daily — one action should cancel, restock the items, and trigger the refund to the original payment method.
  - *Developer note:* Refund via payment gateway API for prepaid; COD cancellations have no refund. Record refund reference number on the order.
- 🟢 **Internal order notes** — 'Customer wants delivery after 25th', 'gift — no invoice inside' — notes your packer can see but the customer cannot.
- 🟡 **Return and exchange processing** — For clothing, size exchanges are constant — approve the request, book reverse pickup with the courier, receive and inspect the item, then refund or ship the new size, with stock updated correctly at each step.
  - *Developer note:* Day 1 this can be handled manually over WhatsApp with a basic 'mark returned + restock' action (build that at launch); the structured workflow with reverse-pickup API and QC step is phase 2.
- 🟡 **Manual order creation with payment link** — Many sales will start as Instagram DMs and WhatsApp chats — create the order yourself and send a UPI payment link, so these sales enter the same system as website orders.
  - *Developer note:* Razorpay/Cashfree payment links API; order marked paid on webhook.
- 🟡 **Bulk actions and courier manifest** — Select 25 packed orders, print all labels, and generate the pickup manifest the courier boy signs — the daily dispatch ritual in one screen.
- 🟡 **NDR (failed delivery) follow-up queue** — When the courier says 'customer not reachable', acting within hours (call/WhatsApp the customer, re-attempt) is the difference between a delivery and a costly return-to-origin.
- 🟡 **COD remittance reconciliation** — The courier collects your cash and pays it back in weekly lumps — a screen matching their payouts against your COD orders catches missing money.
- 🟡 **Abandoned cart list** — See who filled a cart and left, and recover them with a WhatsApp nudge or coupon — one of the cheapest sources of extra revenue.
  - *Developer note:* Needs phone/email captured before payment step; respect messaging consent.
- 🟡 **Fraud and RTO-risk flags** — Repeat COD-refusers and risky pincodes get flagged automatically so you can ask for prepayment or decline COD for them.
- ⚪ **Partial shipment / split orders** — Ship what's ready now and the rest later under one order — only matters at bigger scale or multi-location stock.

## Staff accounts, roles & permissions

- 🟢 **Owner account with two-factor login** — The admin panel controls your money and prices — an OTP on login protects it if your password ever leaks.
  - *Developer note:* TOTP or OTP via SMS/email; enforce strong passwords; session timeout.
- 🟢 **Separate login per staff member with simple roles** — Your packer should see orders to pack — not change prices, see revenue, or issue refunds. And never share one password between people.
  - *Developer note:* Two roles at launch are enough: Admin (owner) and Operations (orders + stock, no pricing/refunds/reports/settings).
- 🟢 **Instant staff deactivation** — When someone leaves, one click removes their access immediately — including any logged-in sessions on their phone.
- 🟡 **Fine-grained permissions** — As the team grows: marketing person edits banners and coupons but not orders; accountant sees reports but edits nothing.
- 🟡 **Sensitive actions restricted to owner** — Refunds, price changes, coupon creation and data exports are where fraud and mistakes happen — lock them to you (or require your approval).
- 🟡 **Per-staff activity trail** — See what each person did today — accountability without standing over anyone's shoulder.

## Reports

- 🟢 **Sales dashboard (today / week / month)** — Orders, revenue, average order value and comparison with last period — the numbers you'll check with your morning chai.
  - *Developer note:* Make it fast and mobile-friendly; the owner will check it on a phone.
- 🟢 **Best sellers by product, size and colour** — Knowing that M and L in black sell 3x faster tells you exactly what to produce more of — this is your production planning tool.
- 🟢 **Stock report** — Current stock per variant, total stock value, out-of-stock list and slow movers — what to reorder and what to put on sale.
- 🟢 **Order export with GST breakup** — A CSV of all orders with taxable value, CGST/SGST/IGST and HSN codes — this is what your accountant needs every month for GST filing.
  - *Developer note:* Columns aligned to GSTR-1 needs: invoice no./date, place of supply (state code), HSN summary, tax splits, credit notes for refunds.
- 🟡 **Returns and RTO rate report** — In fashion e-commerce, returns and refused COD parcels quietly eat profit — track the rate by product, size and pincode to find and fix the causes.
- 🟡 **Payment mode split (COD vs UPI vs card)** — Shows how COD-heavy you are — the number that decides whether to push prepaid discounts harder.
- 🟡 **Coupon and campaign performance report** — Revenue and discount cost per code — tells you which offers earn and which just burn margin.
- 🟡 **Traffic and conversion basics** — Visitors, add-to-carts and purchases (via Google Analytics) — shows where in the funnel you're losing people.
  - *Developer note:* GA4 + Meta Pixel events wired from day 1 even if the report view comes later — historical data can't be backfilled.
- ⚪ **Repeat-customer and cohort report** — What fraction of customers come back and how much they spend over time — the real health metric of a brand.
- ⚪ **Size-curve sell-through report** — Compares the size ratio you produced vs the ratio that actually sold — sharpens every future production run.

## Tax (GST) settings

- 🟢 **GSTIN and business details on all invoices** — Your GST number, legal name and address must appear on every invoice — it's the law once you're GST-registered.
- 🟢 **HSN code and GST rate per product** — Every clothing item needs its HSN code and correct GST rate on the invoice — your CA will tell you the codes, the system must store and print them.
  - *Developer note:* Apparel GST rate depends on price slab and rates change with government notifications — make the rate a configurable rule (price-band based), never hardcoded.
- 🟢 **Automatic CGST/SGST vs IGST split by delivery state** — An order shipped within your own state is taxed as CGST+SGST; to another state it's IGST — the invoice must split this correctly on its own.
  - *Developer note:* Derive place of supply from shipping address state; store home state in settings; include state codes on invoice.
- 🟢 **GST back-calculation from inclusive prices** — You set Rs 999 as the final price; the system works out how much of that is tax for the invoice — you never do this maths by hand.
- 🟡 **Credit notes for refunds and returns** — When you refund an order, GST rules want a credit note against the original invoice — the system should create it automatically so filings stay clean.
- 🟡 **GST treatment of shipping charges** — The delivery fee you charge customers is also taxable — the system should apply the right rate so your accountant doesn't find surprises.
  - *Developer note:* Shipping as composite supply typically follows the goods' rate; confirm treatment with the owner's CA and make it configurable.

## Audit & admin basics

- 🟢 **Admin panel fully usable on a phone** — You will run this business from your phone — checking orders at the market, editing a price from home. If the admin only works on a laptop, it will fail you daily.
- 🟢 **Automatic daily backups with tested restore** — If the server dies or someone deletes products by mistake, yesterday's copy of everything brings the business back. Ask the developer to actually demonstrate a restore once.
- 🟢 **Order timeline / status history** — Every order shows who changed what and when — 'packed by Ramesh at 4:12 pm' — which settles most internal confusion instantly.
- 🟡 **Audit log of sensitive actions** — A permanent record of price changes, stock adjustments, refunds, coupon creation and staff changes — with who and when. This is what protects you from silent leaks.
  - *Developer note:* Append-only log; filter by user/action/date; retain at least a year.
- 🟢 **Confirmation and undo on dangerous actions** — Deleting a product or cancelling 20 orders should ask 'are you sure?' — and prefer archive over permanent delete so mistakes are recoverable.
- 🟢 **Full data export belongs to you** — Products, customers, orders — exportable as spreadsheets anytime. It's your business data and also your escape route if you ever change developer or platform.
- 🟡 **Error alerts and uptime monitoring** — You should hear about the website being down from an automatic alert — not from a customer's angry WhatsApp.
- 🟡 **Staging/test copy of the store** — New features get tried on a test copy first, so an experiment never breaks the live store during a sale weekend.

## Questions to ask your developer

- Are you proposing a custom build or a platform like Shopify/WooCommerce/Dukaan under the hood? What do I gain for the extra cost and time of custom, and who fixes things at 11 pm during a sale?
- What will this cost me monthly to run after launch — hosting, payment gateway percentage, courier aggregator fees, WhatsApp/SMS API charges — as a single number at, say, 300 orders/month?
- Which payment gateway (Razorpay, Cashfree, PayU) will you integrate, does it cover UPI + cards + netbanking + COD marking, and how many days until money settles in my bank?
- Which courier aggregator will you integrate (Shiprocket, Delhivery, Nimbuspost, iThink), and how do COD collections come back to me and get matched against orders?
- Can I do everything important — see orders, change a price, edit a banner, adjust stock — comfortably from my phone?
- What exactly happens when two customers buy the last piece at the same moment, and when a customer abandons a UPI payment halfway?
- How does the bulk CSV upload handle my mistakes — will it show me exactly which rows failed and why, and can I re-upload just the fixes?
- Are invoice numbers sequential and GST-compliant, does the system split CGST/SGST vs IGST by delivery state automatically, and will refunds generate credit notes?
- Can staff roles block my packer from seeing revenue, changing prices, or issuing refunds? Is every sensitive action logged with who did it?
- GST rates on apparel change with government notifications — can I update rates and price-slab rules myself from settings, without paying you for a code change?
- How are backups done, how quickly can you restore the store if it breaks, and can you show me one successful restore before launch?
- Who owns the domain, hosting accounts, source code and data? If we part ways, what exactly do I walk away with?
- Will the site and admin hold up during a festival-sale traffic spike, and what is your support arrangement after launch — what counts as a bug (free) vs a new feature (paid)?

## What you (the owner) must provide

- [ ] GSTIN, legal business name, registered address, PAN, and current-account details for payment gateway and courier COD settlements
- [ ] Payment gateway KYC documents (business proof, bank proof, ID) — approval can take days, start early
- [ ] HSN codes and applicable GST rates for your garment types — confirm with your CA, including the price-slab rule for apparel
- [ ] Complete product data: names, descriptions, fabric/care details, MRP and selling prices, weights and packed dimensions (couriers charge by weight/size)
- [ ] A SKU naming convention decision (e.g. STYLE-COLOUR-SIZE) to use consistently from day 1
- [ ] Accurate opening stock count for every size-colour combination — count physically before launch
- [ ] Measured size charts (chest, length, waist etc. in cm/inches) for each product type — from actual garment measurements, not guesses
- [ ] Product photography: minimum 3-4 images per colour on consistent backgrounds, mobile-friendly; plus logo files and brand colours/fonts
- [ ] Homepage banner creatives in both mobile and desktop sizes for launch
- [ ] Written policies: return/exchange window and rules (refund vs exchange, who pays return shipping), shipping timelines, privacy policy, terms — gateways will not approve without these pages
- [ ] Business decisions: free-shipping threshold, COD availability and any COD fee or prepaid discount, order cancellation window
- [ ] Launch offer decisions: first-order coupon code and value, any launch-week discounts
- [ ] Courier aggregator account (e.g. Shiprocket) with pickup address registered, and a WhatsApp Business number for the brand
- [ ] Invoice preferences: invoice number prefix, terms/footer text, and whether to include a signature image
- [ ] List of staff who need admin access and what each person should be allowed to do
- [ ] A support contact (phone/WhatsApp/email) and its manning hours to publish on the site — required by gateways and expected by customers
