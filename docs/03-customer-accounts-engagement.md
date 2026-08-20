# Customer accounts & engagement

> Part 3 of 14 of the Vawehall e-commerce scope. Full area: **Customer accounts & engagement**.
> 75 work items — 🟢 35 needed at launch · 🟡 28 in phase 2 · ⚪ 12 later.

Priorities: 🟢 **Launch** = the store shouldn't go live without it · 🟡 **Phase 2** = first 3–6 months · ⚪ **Later** = Myntra-scale, only when growth demands it.

## Signup & Login

- 🟢 **Mobile number + OTP login** — Most Indian shoppers don't remember passwords; a 6-digit SMS code on their phone is how they expect to sign in.
  - *Developer note:* Use an Indian SMS provider (MSG91, Kaleyra, 2Factor, Gupshup). Requires TRAI DLT registration of sender ID and OTP templates before go-live — start this paperwork early, it takes days/weeks.
- 🟢 **Guest checkout (no forced signup)** — Forcing account creation before buying kills sales, especially on mobile; let people buy first and create the account after.
  - *Developer note:* Capture phone + email at checkout; auto-create a 'shadow' account so the order is claimable later via OTP on the same number.
- 🟢 **Google one-tap sign-in** — One tap with the Google account already on their phone — no typing, fewer drop-offs.
  - *Developer note:* Google OAuth / One Tap. Store phone number separately since Google doesn't provide it — prompt for it before first order (needed for courier + WhatsApp).
- 🟢 **Email + password login (optional secondary)** — Some customers, especially older ones or desktop users, still prefer email login; also a fallback when SMS is delayed.
  - *Developer note:* Include email verification link, password reset flow, and sensible password rules. Keep OTP as the primary path in the UI.
- 🟡 **WhatsApp OTP as SMS fallback** — SMS delivery in India can be slow or blocked; sending the code on WhatsApp gets people in faster.
  - *Developer note:* WhatsApp Business API authentication templates (via BSPs like Interakt, Wati, AiSensy, Gupshup). Cheaper than SMS at volume.
- ⚪ **Truecaller / phone one-tap login** — Lets Android users log in with one tap without even waiting for an OTP.
  - *Developer note:* Truecaller SDK or Firebase phone auth with auto-read OTP (SMS Retriever API on Android web is limited; more useful if an app comes later).
- 🟢 **OTP abuse protection (rate limits, resend timer, captcha on abuse)** — Without limits, bots can hammer your OTP system and run up a huge SMS bill overnight — this is a real, common attack in India.
  - *Developer note:* Rate-limit per phone/IP/device, 30s resend cooldown, max attempts, invisible captcha only when abuse is detected. Alert on unusual OTP spend.
- 🟢 **Session management: stay logged in, logout, logout-all-devices** — Customers shouldn't have to log in every visit, but must be able to kick out a lost phone or shared device.
  - *Developer note:* Long-lived refresh tokens with server-side revocation list; 'log out everywhere' invalidates all sessions.
- 🟡 **Account merge / duplicate handling (same person, phone + email + Google)** — The same customer will sign up three different ways; if you don't merge them, they lose their order history and you double-count customers.
  - *Developer note:* Merge on verified phone/email match; define which profile wins. Also merge guest orders into the account on first OTP login with that number.
- 🟡 **Phone number and email change flow with re-verification** — People change SIMs often in India; they need a safe way to update their number without losing their account.
  - *Developer note:* Verify OTP on both old and new number where possible; fall back to email verification + support override for lost SIMs.

## Profile & Saved Addresses

- 🟢 **Basic profile (name, phone, email, gender, birthday - optional fields)** — Personalises the experience and lets you send a birthday offer later; keep everything beyond name/phone optional.
  - *Developer note:* Gender helps default the men/women catalogue view. Collect birthday only with a stated benefit (birthday discount) — DPDP requires purpose.
- 🟢 **Multiple saved addresses with labels (Home / Office / Other)** — Customers order to home, office, and family; retyping addresses on a phone keyboard is the #1 checkout annoyance.
  - *Developer note:* Fields tuned for India: pincode, city, state, locality/landmark, address lines, alternate phone. Auto-fill city+state from pincode via a pincode API.
- 🟢 **Default address + default payment preference** — Repeat buyers should be one tap away from checkout.
- 🟢 **Pincode serviceability check on address save** — Tells the customer immediately if you can't deliver or can't offer COD to their pincode, instead of failing after they order.
  - *Developer note:* Sync with courier aggregator serviceability API (Shiprocket/Delhivery/etc.) — includes COD-allowed flag per pincode.
- 🟡 **Saved size profile (my sizes per category)** — Clothing-specific: remembering that the customer wears M in tees and 32 in jeans reduces returns, your biggest cost.
- 🟡 **Communication preferences page (WhatsApp / SMS / email toggles)** — Lets customers choose how you contact them; keeps you legal and stops unsubscribes from anger.
  - *Developer note:* Separate toggles for order updates (always on) vs promotions (opt-in). Honour TRAI DND for promotional SMS; WhatsApp marketing needs explicit opt-in per Meta policy.

## Order History, Tracking & Reorder

- 🟢 **Order list + order detail pages with live status** — 'Where is my order?' is 70% of all support queries; a clear status page answers it before they message you.
  - *Developer note:* Statuses: placed → confirmed → packed → shipped → out for delivery → delivered / cancelled / RTO. Pull tracking events from courier aggregator webhook, show courier name + AWB + tracking link.
- 🟢 **Guest order tracking (order ID + phone OTP, no login)** — Guests must be able to track without creating an account, or they'll flood your WhatsApp.
- 🟢 **Self-serve cancellation (before dispatch)** — Letting customers cancel a wrong-size order themselves saves you a support ticket and a wasted shipment.
  - *Developer note:* Block cancellation after manifest/pickup; auto-refund to source for prepaid, nothing to refund for COD.
- 🟢 **Self-serve return / exchange request from order page** — Clothing has 20-30% return rates; if returns aren't self-serve, your team will drown in WhatsApp messages.
  - *Developer note:* Reason codes (size, quality, wrong item), photo upload for damage claims, exchange-for-size flow, reverse-pickup booking via courier aggregator. COD refunds need bank/UPI details capture — never over chat.
- 🟢 **GST invoice download (PDF) per order** — Customers and the tax department both expect a proper invoice; office buyers specifically ask for GST invoices.
  - *Developer note:* Invoice with GSTIN, HSN codes, CGST/SGST/IGST split by shipping state. Optional buyer-GSTIN field for B2B-ish orders.
- 🟡 **One-tap reorder / 'buy again'** — Basics like tees and innerwear get repurchased; make it one tap from past orders.
  - *Developer note:* Handle out-of-stock and price-changed items gracefully when refilling the cart.
- 🟡 **Delivery feedback prompt after delivery** — A quick 'did it arrive okay?' catches problems early and feeds your review pipeline.
  - *Developer note:* Trigger via WhatsApp 24-48h after delivered webhook.

## Ratings & Reviews

- 🟢 **Star ratings + written reviews on products** — Nobody buys clothes online without reading reviews; even 5 reviews per product lifts conversion noticeably.
  - *Developer note:* Verified-purchase badge (only buyers of that item can review). Show rating distribution, average, and count on product page + listing.
- 🟢 **Photo (and video) reviews** — For clothing, a customer photo of the fit is worth more than your studio shots — Myntra shoppers expect this.
  - *Developer note:* Client-side image compression before upload; store on S3/Cloudinary; strip EXIF/GPS data for privacy; cap file size and count.
- 🟡 **Fit feedback in reviews (size bought, usual size, 'runs small/true/large')** — Cuts returns: shoppers pick the right size when reviews say 'take one size up'. Aggregate it into a fit meter on the product page.
- 🟢 **Post-delivery review request via WhatsApp/email** — Customers rarely review on their own; a nudge 3-7 days after delivery is where most reviews actually come from.
  - *Developer note:* Deep link straight to the review form for that order's items, pre-authenticated where safe.
- 🟡 **Review incentives (small coupon/points for photo reviews)** — A tiny reward multiplies photo reviews, which are your best marketing asset early on.
  - *Developer note:* Disclose incentivised reviews. Anti-gaming: one reward per order item, only verified purchases.
- ⚪ **'Helpful' votes and sorting (most helpful, newest, with photos)** — Surfaces the useful reviews once you have many.
- 🟡 **Seller/brand replies to reviews** — A polite public reply to a bad review shows every future shopper that you care.

## Review & Content Moderation

- 🟢 **Moderation queue (approve/reject before or shortly after publish)** — Stops abusive language, competitor spam, and inappropriate photos from appearing on your product pages.
  - *Developer note:* Simplest launch version: reviews go live immediately but appear in an admin queue with one-click hide; or hold-for-approval if volume is tiny.
- 🟡 **Automatic profanity / spam / PII filter** — Auto-blocks phone numbers, links, and abuse so a human only reviews the borderline cases.
  - *Developer note:* Regex for phones/URLs + a moderation API or LLM pass for Hindi/Hinglish abuse, which simple English word lists miss.
- 🟡 **Image moderation for photo reviews** — One inappropriate photo on a product page damages the brand badly.
  - *Developer note:* Automated NSFW check (e.g., AWS Rekognition / Google Vision SafeSearch) + human spot check.
- 🟡 **Report-abuse button on reviews and Q&A** — Lets customers flag bad content you missed; also expected under Indian IT (intermediary) rules for user-generated content.
- ⚪ **Moderation policy + audit trail (who hid what, when, why)** — Protects you if a customer complains their review was deleted; deleting only genuine-but-negative reviews destroys trust.

## Product Q&A

- 🟡 **Ask-a-question on product pages with brand answers** — Shoppers ask 'is this pure cotton?' or 'does it shrink?' — public answers convert the next 100 people with the same doubt.
  - *Developer note:* Notify admin on new question (email/WhatsApp); notify the asker when answered. Same moderation pipeline as reviews.
- ⚪ **'X people found this helpful' and search within Q&A** — Keeps the best answers on top as Q&A grows.
- ⚪ **Route unanswered questions to WhatsApp support** — If nobody answers in 24h, the question should land in your support inbox instead of dying silently.

## Notifications (Transactional)

- 🟢 **Order lifecycle notifications on WhatsApp (confirm, shipped with tracking, out-for-delivery, delivered)** — Indian customers live on WhatsApp; these messages are read within minutes and slash 'where is my order' queries.
  - *Developer note:* WhatsApp Business API via a BSP (Interakt, Wati, AiSensy, Zoko, Gupshup). Utility templates need Meta pre-approval — submit early. Fire from order/courier webhooks.
- 🟢 **Order lifecycle emails (confirmation with invoice, shipped, delivered, refund processed)** — Email is the paper trail customers search later for the invoice or tracking number.
  - *Developer note:* Transactional email service (SES, SendGrid, Postmark) with SPF/DKIM/DMARC set up so mails don't land in spam.
- 🟢 **SMS fallback for critical events (order confirm, OTP, delivery)** — Reaches the minority of customers not on WhatsApp; also the fallback when WhatsApp delivery fails.
  - *Developer note:* DLT-registered templates mandatory. Send SMS only when WhatsApp message isn't delivered, to save cost.
- 🟢 **COD confirmation message before shipping (confirm/cancel buttons)** — Fake and impulsive COD orders cause costly return-to-origin shipments; a one-tap WhatsApp confirmation filters them out.
  - *Developer note:* WhatsApp interactive buttons; auto-hold unconfirmed COD orders above a value threshold.
- 🟢 **Refund status notifications** — 'Where is my refund?' is the angriest support query; proactive updates (initiated → processed → expect in 5-7 days) defuse it.
- 🟡 **NDR / failed-delivery alerts to customer ('courier couldn't reach you, confirm address')** — Rescues shipments that would otherwise bounce back to you at your cost.
  - *Developer note:* Trigger from courier NDR webhook; capture customer response and push back to courier.
- 🟡 **Back-in-stock and price-drop alerts (from wishlist / notify-me button)** — Recovers sales you lost to stock-outs — customers literally ask to be told when their size returns.
  - *Developer note:* 'Notify me' per size/variant. WhatsApp/ email; needs marketing opt-in.
- 🟡 **Abandoned cart reminder (WhatsApp/email)** — A polite nudge 2-24 hours after someone leaves items in cart recovers 5-15% of lost orders.
  - *Developer note:* Requires marketing opt-in for WhatsApp (Meta policy) — collect consent at signup/checkout. Max 1-2 reminders, easy opt-out.
- 🟡 **Notification preference centre + unsubscribe links** — One-tap opt-out keeps you compliant and keeps customers from blocking your number, which hurts your WhatsApp quality rating.
  - *Developer note:* Meta downgrades/blocks WhatsApp senders with high block rates — honour STOP instantly.
- ⚪ **Web push notifications** — Free re-engagement channel for repeat visitors; useful only after real traffic exists.

## Wishlist & Saved Items

- 🟢 **Wishlist (heart icon on products), synced to account across devices** — Shoppers browse on mobile at night and buy on payday; the wishlist is where those future sales are stored.
  - *Developer note:* Allow wishlisting while logged out (local storage), then merge into the account on login so nothing is lost.
- 🟡 **Wishlist with size/variant selection and stock + price shown** — Saving the exact size they want makes the later purchase one tap, and powers back-in-stock alerts.
- 🟡 **Move to cart / move to wishlist from cart ('save for later')** — Keeps the cart clean without losing the customer's intent to buy later.
- ⚪ **Shareable wishlist link** — People share wishlists with family before festivals and birthdays — free word-of-mouth.
- ⚪ **Multiple named wishlists / collections** — Myntra-scale nicety for heavy browsers.

## Loyalty Points & Referrals

- 🟢 **First-order incentive for account creation (e.g., 10% off on signup with WhatsApp opt-in)** — Gives visitors a concrete reason to hand over their number and opt in to messages — this fuels every future campaign.
  - *Developer note:* Single-use coupon per verified phone number to prevent farming.
- 🟡 **Loyalty points programme (earn on orders, redeem as discount)** — Turns one-time buyers into repeat buyers — cheaper than ads for your second sale.
  - *Developer note:* Decisions needed: earn rate, redemption cap per order, expiry, exclusions on discounted items. Points should reverse automatically on returns/refunds — commonly forgotten.
- 🟡 **Referral programme (give ₹X, get ₹X)** — Your happiest customers become your sales team; referrals convert far better than cold traffic.
  - *Developer note:* Unique referral links/codes; reward only after referred order is delivered and past return window. Fraud checks: same device/address/phone patterns, self-referral blocking.
- 🟡 **Points/rewards wallet visible in account with history** — If customers can't see their balance and how they earned it, the programme motivates nobody.
- ⚪ **Loyalty tiers (silver/gold: early access, free shipping)** — Myntra Insider-style tiers; only worth it with thousands of repeat customers.
- ⚪ **Birthday / anniversary rewards** — Cheap delight moment that drives a guaranteed annual visit.

## Customer Support Channels

- 🟢 **WhatsApp support (click-to-chat button on every page + order pages)** — Indian customers will WhatsApp you no matter what; make it official with a business number instead of your personal one.
  - *Developer note:* WhatsApp Business number with a shared team inbox (Interakt/Wati/Zoko) so multiple staff can reply and chats survive employee exits. Pre-filled message with order ID from order pages.
- 🟢 **Contact page: phone number, support email, business address, support hours** — Legally expected under Indian e-commerce/consumer-protection rules, and its absence makes shoppers distrust a new brand.
  - *Developer note:* Consumer Protection (E-Commerce) Rules require grievance officer name + contact and complaint acknowledgement within 48h, resolution within 1 month — put this on the site.
- 🟢 **FAQ / help centre (sizing, shipping times, returns, COD, refunds, care instructions)** — Answers the same 20 questions automatically, 24x7, and cuts your support load in half.
  - *Developer note:* Structure by topic; link contextually (returns FAQ from order page, size guide from product page). Add FAQ schema markup for Google.
- 🟢 **Contact form with order-ID field and auto-acknowledgement** — Catches customers who don't use WhatsApp and creates a written record of complaints.
  - *Developer note:* Spam protection (honeypot/turnstile); auto-reply with expected response time.
- 🟡 **Ticketing/CRM for support (statuses, assignment, history per customer)** — Once queries cross ~20/day, WhatsApp scroll-back stops working; you need to know what was promised to whom.
  - *Developer note:* Freshdesk/Zoho Desk (India-friendly pricing) or the WhatsApp inbox tool's built-in CRM; log channel, order ID, resolution.
- 🟡 **Website chat widget with automated answers for common queries** — Instantly answers 'where is my order' and size questions on-site without a human.
  - *Developer note:* Bot flows: order status lookup by phone/order ID, returns initiation, FAQ answers; human handoff to WhatsApp during business hours.
- 🟡 **Support SLAs + canned replies + escalation path** — Consistent, fast replies are what customers actually mean by 'good service'.
- ⚪ **Call-back request option** — Older customers and high-value COD confirmations sometimes need a real phone call.

## Privacy, Consent & Account Deletion (DPDP Act)

- 🟢 **Privacy policy + terms + consent notice at signup** — India's DPDP Act 2023 requires you to tell people what data you collect and why, in plain language, before they consent.
  - *Developer note:* Consent must be specific and separate for marketing vs order processing — no pre-ticked boxes. Log consent with timestamp. DPDP rules also expect notice availability in English or any Eighth Schedule language.
- 🟢 **Self-serve account deletion ('Delete my account' in settings)** — Required under DPDP and Google/Apple policies (if an app comes later); customers must be able to erase their data without begging support.
  - *Developer note:* OTP-confirmed deletion with 7-30 day grace/cool-off before permanent erase. Erase profile, addresses, wishlist; anonymise reviews or delete per policy.
- 🟢 **Legal data-retention carve-out on deletion** — You must keep invoices and order/tax records for years under GST law even after an account is deleted — deletion can't nuke your accounting.
  - *Developer note:* On delete: retain order/invoice/payment records (detach from profile, keep minimal identifiers required by law); document retention periods.
- 🟡 **Data correction and data-access request handling** — DPDP gives customers the right to see and correct their data; most of it is covered by editable profile + a documented process for the rest.
  - *Developer note:* A simple internal SOP + email route is enough at small scale; self-serve data export can wait.
- 🟢 **Grievance officer / grievance redressal published on site** — Both DPDP and the e-commerce consumer rules require a named contact for complaints with response timelines.
- 🟢 **Data minimisation and access hygiene** — Store only what you need (no card numbers ever — the payment gateway holds those), so a leak or a legal notice hurts less.
  - *Developer note:* Payment data stays with the RBI-compliant gateway (Razorpay/PayU/Cashfree tokenisation). Encrypt PII at rest, restrict admin access, audit-log admin views of customer data.
- 🟡 **Cookie/tracking consent banner** — You'll run Meta/Google ads with tracking pixels; a consent banner with opt-out is becoming baseline practice under DPDP.
- ⚪ **Breach response plan** — DPDP requires notifying the Data Protection Board and affected users if data leaks; deciding the steps now beats panicking later.

## Questions to ask your developer

- Which SMS/OTP provider will you use, and will you handle the TRAI DLT registration (sender ID + templates) for us, or do we do the paperwork? What is the OTP cost per message and what abuse protection is built in?
- Which WhatsApp Business API provider (BSP) do you recommend, what does it cost per conversation, and who submits the message templates to Meta for approval? How long before launch must we start that?
- Will login work with mobile OTP as primary and Google/email as secondary, and how do you merge duplicate accounts and guest orders into one customer record?
- How will order tracking status get onto the website — which courier aggregator (Shiprocket, Delhivery, etc.) are you integrating, and are status updates pushed automatically (webhooks) or manually?
- Are returns and exchanges fully self-serve from the order page, including reverse pickup booking and capturing UPI/bank details for COD refunds?
- Are we building on a platform (Shopify/WooCommerce) where reviews, wishlist, and loyalty come from ready-made apps, or custom-building them? What is the cost and lock-in either way?
- How does review moderation work day-to-day — where do I approve/hide reviews and photos, and is there any automatic filter for abusive Hindi/Hinglish text and inappropriate images?
- What exactly happens when a customer deletes their account — what is erased, what is retained for GST/tax records, and is the flow self-serve with OTP confirmation?
- Where are consent records (marketing opt-ins, WhatsApp opt-ins) stored, and can we prove when a customer opted in if we're ever challenged?
- What analytics will I get on accounts and engagement — repeat purchase rate, review counts, notification delivery/open rates, support query volume?
- If we add a mobile app or sell on marketplaces later, will accounts, wishlists, and loyalty points carry over, or is this architecture locked to the website?
- What is the monthly running cost of all these third-party services combined (SMS, WhatsApp BSP, email, chat/support tool, review app) at, say, 500 and 5,000 orders/month?

## What you (the owner) must provide

- [ ] A dedicated business mobile number for WhatsApp Business API (it cannot be your personal WhatsApp number; migrating it is painful later)
- [ ] Meta Business Manager account, verified with business documents (GST certificate helps) — needed for WhatsApp API approval
- [ ] Google Cloud account for Google sign-in setup (or authorise the developer to create one in the business's name)
- [ ] Business proof for DLT registration: GST number, PAN, company/proprietorship documents, letterhead — for SMS sender ID approval
- [ ] Decisions on policies: return/exchange window (e.g., 7 days), who pays return shipping, COD availability and any COD fee, refund method and timeline
- [ ] Written content: FAQ answers, size guide with actual garment measurements, fabric/care instructions, shipping & returns policy, privacy policy and terms (have a lawyer or a good template review them for DPDP compliance)
- [ ] Grievance officer: a named person, email, and phone number to publish on the site (can be the founder initially)
- [ ] Support hours and who on your team answers WhatsApp/email, plus tone guidelines and canned replies for the top 10 queries
- [ ] Loyalty/referral economics: signup discount amount, points earn/burn rates, referral reward amounts, expiry rules — the developer builds rules, you must own the numbers
- [ ] Notification copy in your brand voice (order confirmed, shipped, delivered, refund, review request) — ideally in English + Hindi/Hinglish variants
- [ ] A support email address on your domain (e.g., care@yourbrand.com) and access to the business email account
- [ ] Decision on review policy: publish-then-moderate or approve-first, whether to offer review incentives, and how you'll respond to negative reviews
- [ ] Budget approval for recurring tools: WhatsApp BSP subscription, SMS credits, email service, support/chat tool, and (if on Shopify) app subscriptions
