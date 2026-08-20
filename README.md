# Vawehall — Online Clothing Store (Starter Project)

A clothing brand made in India, selling to customers in the **USA** — all prices in US dollars; a real payment gateway (Stripe/PayPal) gets integrated by the developer at the end.

This repository contains everything needed to kick off a Myntra-style online store for a clothing brand:

1. **A working starter website** (this folder) — a front-end demo storefront you can open in any browser: homepage, shop with filters and search, product pages with size charts, wishlist, cart, coupons, and a demo checkout. No installation needed.
2. **The complete developer scope** (`docs/` folder) — the full list of features, integrations, legal requirements and project plan to hand to your developer to build the real store.

> The brand is currently named **Vawehall** as a placeholder. To rename it, search-and-replace `Vawehall`, `VAWEHALL` and `VAWE<span>HALL</span>` across the project (mainly `js/app.js` and the `<title>` tags in each HTML file).

---

## How to view the website

**Easiest:** double-click `index.html` — it opens in your browser. Everything works offline.

**Better (behaves exactly like a real website):** if you have Python installed, run this in the project folder and open http://localhost:8000

```bash
python3 -m http.server 8000
```

### Demo notes

- The cart and wishlist are saved in your browser (localStorage) — they survive page reloads.
- Working demo coupon codes: `WELCOME10` (10% off above $50) and `FREESHIP`.
- Checkout is a **demo** — no payments happen, no data leaves your browser. Never enter real card details.
- Product images are drawn placeholder illustrations — replace them with real photography (see `docs/`).

---

## How to upload this to GitHub

### Option A — no tools needed (web upload)

1. Create a free account at https://github.com and click **New repository**.
2. Name it (e.g. `vawehall-store`), keep it **Private** for now, and click **Create repository**.
3. On the repository page, click **uploading an existing file**.
4. Drag **all files and folders** from this project folder into the upload area and click **Commit changes**.

### Option B — using git (already set up in this folder)

A git repository is already initialized here with an initial commit. After creating an empty repository on GitHub, run these two commands (replace the URL with the one GitHub shows you):

```bash
git remote add origin https://github.com/YOUR-USERNAME/vawehall-store.git
```

```bash
git push -u origin main
```

### Put the demo live for free (GitHub Pages)

1. In your GitHub repository, go to **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. In a minute your demo store is live at `https://YOUR-USERNAME.github.io/vawehall-store/` — a link you can send to your developer, partners or friends.

---

## Project structure

```
├── index.html        Homepage (hero, categories, new arrivals, bestsellers)
├── shop.html         Product listing — filters, sorting, search results
├── product.html      Product detail — gallery, sizes, size chart, pincode check
├── cart.html         Shopping bag with quantities and coupons
├── checkout.html     Demo checkout (address + payment methods, no real payment)
├── wishlist.html     Saved products
├── about.html        Brand story (placeholder copy)
├── contact.html      Contact details + demo form
├── faq.html          Customer FAQ
├── policies.html     Shipping / returns / privacy / terms (starter drafts)
├── css/style.css     All styling (colors, fonts, layout)
├── js/products.js    Sample catalog — edit this to change products/prices
└── js/app.js         Cart, wishlist, header/footer logic
```

## What this starter is — and isn't

This is a **front-end demo**: it shows the customer experience so your developer knows exactly what to build, and gives you something real to look at and share. It has **no backend** — no real accounts, payments, inventory or order emails. The `docs/` folder is the authoritative list of everything the production store needs (payment gateway, shipping integration, admin panel, GST invoicing, legal pages, and more).

**Suggested next steps**

1. Read `docs/README.md` (start there) and the scope documents.
2. Share this repository with your developer.
3. Decide the platform route (Shopify vs WooCommerce vs custom — compared in the docs) with them.
4. Start collecting the content only you can provide: product photos, size charts, brand story, GST registration.
