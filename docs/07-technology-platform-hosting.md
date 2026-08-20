# Technology platform & hosting

> Part 7 of 14 of the Vawehall e-commerce scope. Full area: **Technology platform, architecture, hosting & performance**.
> 35 work items — 🟢 24 needed at launch · 🟡 8 in phase 2 · ⚪ 3 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Platform choice — the four realistic options compared

- 🟢 **Option 1: Shopify (recommended default for a single-brand fashion store)** — A rented, fully-managed store: hosting, security, SSL, checkout, and mobile speed are handled for you, so your developer builds the store instead of maintaining servers. Costs: plan roughly Rs 1,500-2,000/month (Basic), a good fashion theme Rs 0-20,000 one-time, apps Rs 2,000-8,000/month as you grow, plus payment gateway fees around 2% + GST per order. A freelancer/agency setup typically costs Rs 40,000-1.5 lakh and launches in 2-4 weeks. Best when you want reliability and speed-to-market and can afford the monthly fee.
  - *Developer note:* Shopify Payments is not available in India; use Razorpay/Cashfree/PayU for UPI+cards+COD flag. Confirm current India transaction-fee policy for third-party gateways on the chosen plan. Use a mobile-fast OS 2.0 theme (e.g. Dawn-based); avoid app bloat.
- 🟢 **Option 2: WooCommerce on WordPress (cheapest to run, most maintenance)** — You own everything and monthly costs are low (hosting Rs 500-3,000/month, plugins/theme Rs 10,000-30,000/year), but YOU are responsible for updates, security, backups and speed — neglected WooCommerce stores get hacked or slow down. Build cost with a decent developer: Rs 50,000-2 lakh, launch in 4-8 weeks, plus an ongoing maintenance retainer of Rs 3,000-10,000/month. Best if budget is tight AND you have a reliable developer on call.
  - *Developer note:* Managed WP hosting (Cloudways/Hostinger/Kinsta) not shared cPanel. Razorpay/Cashfree Woo plugins for UPI/COD. Must include caching (LiteSpeed/WP Rocket), Wordfence, automated offsite backups, and a staging copy.
- ⚪ **Option 3: Custom build (Next.js + Node / headless commerce)** — A from-scratch website gives total control but costs Rs 4-15 lakh+ to build, takes 3-6 months, and needs a permanent developer relationship (Rs 25,000-75,000/month) just to keep it running. For a new single-brand store this is almost always the wrong first choice — you would be paying to rebuild things Shopify gives you for Rs 2,000/month. Revisit only after you have proven sales and a specific need Shopify cannot meet.
  - *Developer note:* If ever needed: headless storefront (Next.js on Vercel) over Shopify/Medusa/commerce APIs rather than fully custom cart+checkout. Do not custom-build payments, tax, or order management.
- ⚪ **Option 4: Indian quick-store platforms (Dukaan, Fynd, Instamojo, Mojocommerce)** — Cheapest and fastest way online (Rs 5,000-30,000/year, live in days, WhatsApp-native), good as a temporary storefront or to test demand. But themes, SEO control, discount logic and data export are limited, and moving off them later is painful. Fine as a stop-gap while the real store is built; risky as the long-term home of a growing brand.
  - *Developer note:* Check data-export options (products, customers, order history) before signing up; several of these platforms make migration out difficult.
- 🟢 **Written platform decision with cost worksheet** — Before any work starts, get a one-page comparison in writing: total first-year cost, monthly running cost, and time-to-launch for the option your developer recommends — so you are choosing with your eyes open, not discovering fees later.
  - *Developer note:* Include plan fee, theme, apps/plugins, gateway fees (~2%+GST), hosting, domain, email, maintenance retainer, and one redesign buffer.
- 🟢 **Do NOT let the developer choose custom-build by default** — Some developers push custom websites because it means more billable work for them. For a first store, a custom build is slower, costlier, and buggier than Shopify or WooCommerce. If your developer insists on custom, ask them to justify it against the comparison above in writing.

## Domain, business email & foundational accounts

- 🟢 **Buy the brand domain (.com and .in) in YOUR OWN registrar account** — The domain is your brand's address on the internet — if the developer buys it under their account, they own your brand's front door. Costs only Rs 700-1,500/year each. Buy both .com and .in so nobody squats on the other one.
  - *Developer note:* GoDaddy/Namecheap/Cloudflare Registrar under the founder's email. Enable auto-renew and registrar lock. Point DNS via Cloudflare (free) for flexibility later.
- 🟢 **Professional business email on your domain (e.g. hello@yourbrand.com)** — Customers, couriers and payment gateways trust orders@yourbrand.com far more than a Gmail address, and payment gateway KYC often expects it. Zoho Mail is roughly Rs 60/user/month (even free for a few users); Google Workspace is roughly Rs 160-270/user/month.
  - *Developer note:* Set up SPF, DKIM, DMARC records on day 1 so order-confirmation emails do not land in spam. Separate addresses: orders@, support@, returns@.
- 🟢 **Master account list under the founder's email** — Every core account — domain, store platform, payment gateway, email, Google/Meta accounts — must be created with your email and phone number, with the developer added as a staff member. Founders who skip this get held hostage when a developer relationship sours.
  - *Developer note:* Shopify: owner = founder, dev = collaborator/staff. Use a shared password manager (Bitwarden/1Password) instead of WhatsApp-ing passwords.
- 🟢 **Two-factor authentication (2FA) on all master accounts** — One stolen password can wipe out your store, domain, or payment account. Turning on 2FA takes minutes and blocks most account takeovers.
  - *Developer note:* Authenticator app, not SMS-only where possible. Store recovery codes offline.
- 🟢 **Reserve brand handles: Instagram, WhatsApp Business, Google Business Profile** — These are free and Indian shoppers will search for you on Instagram and message you on WhatsApp before they ever open your website. Grab the names now even if you fill them later.

## Hosting, CDN & SSL

- 🟢 **Hosting: included with Shopify/Dukaan; must be chosen carefully for WooCommerce** — On Shopify, hosting is part of the monthly fee and you never think about it. On WooCommerce, cheap Rs 99/month shared hosting will make your store slow and crash during a sale — budget Rs 700-3,000/month for managed hosting with an Indian or Singapore data centre.
  - *Developer note:* For Woo: Cloudways (Mumbai region), Hostinger Business, or Kinsta. PHP 8.x, object caching (Redis), server-level page cache.
- 🟢 **CDN (content delivery network) so the site is fast across all of India** — A CDN stores copies of your images near the customer, so a shopper in Guwahati loads the site as fast as one in Mumbai. Shopify includes one automatically; on WooCommerce, Cloudflare's free plan does the job.
  - *Developer note:* Cloudflare free tier: CDN + DDoS protection + DNS. Cache static assets aggressively; bypass cache for cart/checkout.
- 🟢 **SSL certificate (the padlock / https)** — Without the padlock, browsers show 'Not Secure', customers will not enter card details, and Google ranks you lower. It should cost you nothing — Shopify includes it, and Let's Encrypt/Cloudflare give it free elsewhere. If anyone tries to charge you Rs 5,000/year for SSL, refuse.
  - *Developer note:* Force https on all pages, redirect http and www/non-www to one canonical URL. HSTS after launch is stable.
- 🟡 **DDoS and bot protection** — During sales, bots and attack traffic can crash a self-hosted store. Shopify absorbs this for you; on WooCommerce, Cloudflare provides a basic shield free.
  - *Developer note:* Cloudflare WAF rules, rate-limit login and checkout endpoints, block card-testing bots on the payment page.

## Speed, images & mobile performance (most of your traffic will be phones on 4G)

- 🟢 **Image optimization pipeline for product photos** — Clothing sites live and die by photos, and raw photos from a camera are 5-10 MB each — enough to make your site unusably slow on mobile data. Every photo must be automatically compressed and resized before it reaches customers. Shopify does this automatically; WooCommerce needs a plugin.
  - *Developer note:* Serve WebP/AVIF with responsive srcset sizes; lazy-load below-the-fold images; fixed aspect ratio (e.g. 3:4) for all product shots to prevent layout jumping. Woo: ShortPixel/Imagify + Cloudflare Polish or an image CDN.
- 🟢 **Photo standards document for your team** — Decide once: all product photos are shot/cropped to the same shape (e.g. portrait 3:4), white or consistent background, minimum resolution. Consistency makes the site look premium and keeps pages fast.
- 🟢 **Mobile performance budget: product page loads in under 3 seconds on a mid-range Android over 4G** — In India 70-85% of your shoppers will be on phones, many on patchy networks. Every extra second of loading measurably loses sales. Make this number a written requirement for your developer, not a hope.
  - *Developer note:* Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 on a Moto/Redmi-class device, throttled 4G. Page weight < 1.5-2 MB. Test with PageSpeed Insights + WebPageTest (Mumbai node).
- 🟢 **App/plugin diet — a rule that every new app must justify its speed cost** — The most common way fast stores become slow is installing 20 apps for reviews, popups, timers and chat, each adding its own code. Agree that apps are added sparingly and removed when unused.
  - *Developer note:* Re-run PageSpeed after each app install; remove leftover script tags when uninstalling Shopify apps (many leave code behind).
- 🟡 **Quarterly speed check-up** — Sites slow down gradually as content and apps accumulate. A 30-minute speed audit every quarter catches the rot early.
  - *Developer note:* Track Core Web Vitals in Google Search Console; keep a before/after log.

## Staging, backups, monitoring & error tracking (the unglamorous safety net)

- 🟢 **Staging environment — a private copy of the site for testing changes** — Changes should never be tested on the live store where customers are shopping. A staging copy lets the developer break things safely, then push the working version live.
  - *Developer note:* Shopify: duplicate theme + preview, or a development store for big changes. Woo: host-provided staging (Cloudways/Kinsta one-click) — never edit live PHP.
- 🟢 **Automated backups you can actually restore** — A bad plugin update, a hack, or one wrong click can destroy your product catalog and order history. Backups must be automatic, stored outside the main server, and tested once by actually restoring one. Note: Shopify does NOT back up your theme customisations, products and content for you — that surprises many store owners.
  - *Developer note:* Shopify: Rewind or similar backup app (~Rs 500-2,500/month), plus periodic CSV exports of products/customers/orders. Woo: daily offsite backups (host snapshots + UpdraftPlus to Google Drive/S3), 30-day retention. Do a restore drill before launch.
- 🟢 **Uptime monitoring with instant alerts** — You should learn your site is down from an alert on your phone, not from an angry customer on WhatsApp. Free tools check the site every minute and message you when it breaks.
  - *Developer note:* UptimeRobot/BetterStack free tier; monitor homepage AND a product page AND checkout availability; alerts to founder and developer.
- 🟡 **Error tracking on the website code** — Some bugs only hit certain phones — for example, checkout silently failing on one Android browser. Error tracking records these crashes automatically so the developer can fix problems you would never have discovered yourself.
  - *Developer note:* Sentry free tier (JS errors); for Woo also enable server error logs and 404 monitoring. Alert on checkout-path errors specifically.
- 🟢 **Order-flow smoke test after every change** — A simple ritual: after any update, someone places a Rs 1 test order on a real phone — browse, add to cart, pay via UPI, get the confirmation. Most 'the site is broken' disasters are caught by this five-minute habit.
  - *Developer note:* Use gateway test mode where possible; keep a written checklist (home, category, product, cart, coupon, UPI, COD, confirmation email/WhatsApp).
- 🟢 **Maintenance and update schedule (critical for WooCommerce)** — WordPress and its plugins release security fixes constantly; unpatched stores get hacked. Agree in writing who applies updates, how often, and that updates are tested on staging first. On Shopify this burden mostly disappears.
  - *Developer note:* Woo: weekly plugin/core updates via staging, monthly security scan. Pin an annual review of unused plugins/apps.

## Ownership, vendor lock-in & the scalability path

- 🟢 **Written ownership agreement: accounts, code, and content belong to you** — Get one paragraph in the developer contract stating that all accounts, custom code, designs, and content are your property, and that on exit they hand over all access within 7 days. This single paragraph prevents the most common founder horror story.
  - *Developer note:* Custom theme code in a Git repository owned by the founder's GitHub account, dev added as collaborator.
- 🟢 **Understand each platform's lock-in before choosing** — Shopify lets you export products, customers and orders as spreadsheets, but your theme and app setup do not transfer — switching platforms later means rebuilding the design. WooCommerce is fully yours but chains you to maintenance. Dukaan-type platforms can be hardest to leave. Lock-in is acceptable; unknown lock-in is not.
  - *Developer note:* Schedule a monthly automated export of products/customers/orders CSV to the founder's Google Drive as cheap migration insurance.
- 🟡 **Scalability path mapped in advance** — Know the growth story so you never panic-rebuild: Shopify Basic handles your first crores of annual sales; upgrade plans as volume grows; consider headless/custom only if you reach large scale with special needs. WooCommerce scales by upgrading hosting. You should not need to change platforms for years.
  - *Developer note:* Woo scaling order: better server > Redis object cache > read-replica DB > offload media to CDN. Revisit architecture only past ~500-1,000 orders/day.
- 🟡 **Sale-day load readiness** — Your biggest traffic will come in spikes — a festival sale or an influencer post. Shopify absorbs spikes automatically; a WooCommerce store must be load-tested before your first big sale so it does not crash at the worst possible moment.
  - *Developer note:* k6/Loader.io test at 5-10x normal traffic on staging; pre-warm cache; static landing page fallback.
- 🟡 **Documentation and handover pack** — A simple document listing every account, what it is for, what it costs, and how routine tasks are done (add product, change banner, run discount) means you are never dependent on one person's memory — including your developer's.

## Future mobile app path (PWA vs native)

- 🟢 **Day 1: a fast mobile website, not an app** — New customers will not install an app from a brand they just discovered — they arrive from Instagram/WhatsApp links and buy in the browser. Money spent on an app at launch is money taken from photos and marketing where it matters more.
- 🟡 **PWA (Progressive Web App) — your site made installable** — A PWA lets customers 'Add to Home Screen' so your store gets an icon and loads app-fast, at a fraction of the cost of a real app (often Rs 0-50,000 of work, or built into good themes). This is the sensible first step towards 'having an app'.
  - *Developer note:* Web app manifest + service worker for asset caching; do not cache cart/checkout. Push notifications via web push where supported.
- ⚪ **Native Android/iOS app — only after a proven repeat-customer base** — A real app costs Rs 3-10 lakh+ via app-builder platforms or custom work, plus ongoing updates, and only pays off when thousands of customers buy from you repeatedly and want push-notification offers. Park this decision for year 2+.
  - *Developer note:* If on Shopify: app builders (Vajro/Tapcart/Appbrew, subscription Rs 10,000-50,000/month) are far cheaper than custom Flutter/React Native. Android first for India.
- 🟡 **WhatsApp as the 'app substitute' for India** — For Indian customers, order updates, abandoned-cart nudges and support on WhatsApp deliver most of what a brand app promises, without asking anyone to install anything. Invest here before investing in an app.
  - *Developer note:* WhatsApp Business API via Interakt/Wati/Zoko (~Rs 1,000-5,000/month + per-message fees); official API only, not unofficial bridges that risk number bans.

## Questions to ask your developer

- Which platform do you recommend for us and why — and can you show me the total first-year cost and monthly running cost for your recommendation versus one alternative, in writing?
- Will every account (domain, store, hosting, payment gateway, email) be created under MY email and ownership, with you added as staff? Can we set this up together on a call?
- If we stop working together next year, exactly what do I keep and what breaks? How long would a handover take?
- How fast will a product page load on a Rs 10,000 Android phone on 4G? Will you commit to an under-3-second target and show me the test results before launch?
- How are product photos optimized — is it automatic, or does someone have to compress each image by hand?
- Where are backups stored, how often are they taken, and can we do one practice restore before launch so we know it actually works?
- Is there a staging copy of the site for testing changes, or will changes be made directly on the live store?
- How will I find out if the site goes down or checkout breaks at 2 a.m. — what alerts are set up and who receives them?
- Which UPI/COD-capable payment gateway are you integrating (Razorpay/Cashfree/PayU), and what are the per-order fees including GST?
- If we choose WooCommerce: who applies the weekly security updates, what does that retainer cost, and what happens if a plugin update breaks the site?
- If we choose Shopify: which paid apps do you plan to install, what does each cost monthly, and what does each do to page speed?
- If we ever migrate platforms, exactly which data comes with us (products, customers, order history, reviews) and in what format?
- Will the site work as a PWA (installable on the home screen) now or later, and what would that add to the cost?
- Is any custom code kept in a Git repository I own, so I have a copy independent of you?

## What you (the owner) must provide

- [ ] Budget: a realistic one-time build budget and a monthly running-cost ceiling (platform + apps + hosting + maintenance) — the platform choice depends on this
- [ ] The platform decision itself, after reviewing the written comparison — do not delegate this choice entirely to the developer
- [ ] 2-3 preferred domain name options (check .com and .in availability) and your own credit/debit card to buy them under your account
- [ ] A personal email address and phone number to be the master owner of every account (domain, store, gateway, email, analytics)
- [ ] GST number, business PAN, bank account details and address proof — needed for payment gateway KYC and platform billing
- [ ] Your own card on file for all subscriptions (Shopify/hosting/apps) so services never lapse because a developer's card failed
- [ ] Logo and brand assets in original files (vector/PNG), brand colors and fonts
- [ ] Product photos meeting the agreed standard (consistent crop, background and resolution), or budget for a photoshoot
- [ ] Expected catalog size (number of styles, sizes, colors) and any launch-sale traffic expectations, so hosting/plan sizing is right
- [ ] A decision on the password manager and who on your side holds master access
- [ ] 15-30 minutes after every site change to place a test order on your own phone — this is the founder's job, not optional
- [ ] The signed ownership/handover clause in the developer agreement
