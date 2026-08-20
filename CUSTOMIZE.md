# Customize Your Website — Owner's Guide

Everything below you can change yourself, without a developer.

**How to edit any file:** right-click the file → Open With → **TextEdit** (or install the free [VS Code](https://code.visualstudio.com) — much better). Make the change, save, then refresh the page in your browser to see it. **Tip:** copy the whole folder somewhere safe before your first edit, so you can never break anything permanently.

**Golden rule:** only change the text between quotes `"..."` or numbers. Don't delete quotes, commas, brackets or anything that looks like code.

---

## 1. Brand name (currently "Vawehall")

| What | File | Find and change |
|------|------|-----------------|
| Name used in cart, product cards | `js/app.js` | `const BRAND = "VAWEHALL";` |
| Logo in header | `js/app.js` | `VAWE<span>HALL</span>` — the `<span>` part is the pink half of the logo |
| Logo in footer | `js/app.js` | second `VAWE<span>HALL</span>` lower in the file |
| Browser-tab titles | every `.html` file | `<title>... — Vawehall</title>` near the top |
| Copyright line | `js/app.js` | `"© 2026 " + BRAND` (year is here too) |

Fastest way: in VS Code use **Edit → Replace in Files** and replace `Vawehall` → your name, then `VAWEHALL` → YOUR NAME in capitals.

## 2. Products, prices & sizes — `js/products.js`

Each product looks like this — edit any value:

```
{ id: "P01", name: "Everyday Crew Tee", category: "Men", type: "T-Shirt",
  price: 8.99, mrp: 12.99, colors: ["Black", "White", "Olive"],
  sizes: APPAREL_SIZES, rating: 4.3, ratingCount: 412,
  fabric: "100% combed cotton, 180 GSM", badge: "Bestseller",
  description: "A clean, boxy crew-neck tee..." },
```

- **name / price / mrp / fabric / description** — change freely (price in dollars: `25.99`)
- **badge** — `"New"`, `"Bestseller"`, or `null` (no badge)
- **colors** — pick from the colour list at the top of the same file (`COLOR_HEX`); add your own colour there as `"Mint": "#a8d5c4"` (get codes from htmlcolorcodes.com)
- **To add a product** — copy an entire `{ ... },` block, paste it below, give it a new `id` like `"P25"`
- **To remove a product** — delete its whole `{ ... },` block

## 3. Offers & money settings — `js/app.js` (top of file)

| Setting | Line to find | Meaning |
|---------|--------------|---------|
| Currency | `const CURRENCY = { symbol: "$", locale: "en-US" };` | change to `"₹"` / `"en-IN"` to sell in rupees (then adjust all prices too) |
| Free shipping limit | `const FREE_SHIP_ABOVE = 50;` | orders above this ship free |
| Shipping fee | `const SHIP_FEE = 4.99;` | fee below the limit |
| Coupons | `WELCOME10: { kind: "pct", value: 10, min: 50, ...}` | `value` = % off, `min` = minimum order. Rename `WELCOME10` to any code you like, e.g. `SUMMER20` with `value: 20` |

## 4. Top announcement bar — `js/app.js`

Find: `Free shipping above <strong>₹999</strong> · Easy 7-day returns...` — change the message, e.g. "Launch offer: flat 20% off with code LAUNCH20".

## 5. Homepage text — `index.html`

- **Big headline:** `Clothes you'll live in, <em>not just like.</em>` (the `<em>` part shows in pink italics)
- **Small line above it:** `New season · Made in India`
- **Paragraph under headline:** starts `Wardrobe staples in honest fabrics...`
- **Button labels:** `Shop everything` and `New arrivals`
- **Category tiles:** find `var cats = [` — change titles and subtitles
- **Trust points at bottom:** find `var props = [` — the four promises (shipping, exchange, payments, COD)

## 6. Website colours & fonts — `css/style.css` (top of file)

```
--accent: #b93e6c;    ← the pink (buttons, prices, highlights)
--indigo: #2c3a64;    ← the dark blue (footer, search button)
--shade: #f6f3ee;     ← the cream background of product images
--gold: #c89235;      ← star ratings and Bestseller badges
```

Change any code to your brand colour (find codes at htmlcolorcodes.com). Fonts are set two lines below (`--serif` for headings, `--sans` for text).

## 7. Contact details

| What | Where |
|------|-------|
| Phone, email, business address | `contact.html` — find `+1 (XXX) XXX-XXXX` |
| Same details repeated in policies | `policies.html` — find `care@vawehall.com` and `[your registered jurisdiction` |
| Footer brand description | `js/app.js` — find `Contemporary wardrobe staples` |

## 8. Store policy text — `policies.html`

Return window (currently 7 days), dispatch time (24–48 hours), delivery days (5–10 business days), refund timelines — all plain text you can edit. **Keep the same numbers everywhere:** the same promises also appear in `faq.html`, the product-page "Shipping & returns" section (`product.html`), and the announcement bar (`js/app.js`). If you change 7-day returns to 10-day, change it in all four places.

## 9. Your brand story — `about.html`

The whole "Our story" page is placeholder text — rewrite it in your own words. Also update the FAQ answers in `faq.html` to match how you actually work.

## 10. Size chart measurements — `product.html`

Find `APPAREL_CHART` (chest/length/shoulder per size) and `WAIST_CHART` (jeans) — replace the numbers with your real garment measurements in inches.

## 11. Small extras

- **Browser-tab icon** (currently 🧵): in every `.html` file, find `font-size='90'>🧵` and swap the emoji
- **Search box hint text:** `js/app.js` — find `Search for kurtas, tees, dresses…`
- **Delivery promise on product pages:** `product.html` — find `expected in 5–10 business days`
- **Demo order number prefix** (`VW-`): `checkout.html` — find `"VW-"`

---

## What you CANNOT change from your side (needs the developer)

Real payments, real orders and emails, customer accounts/login, an admin panel to manage products without editing files, real stock counts, and real product photos replacing the drawn illustrations. All of that is specced in the `docs/` folder — it's the developer's job list.

## After making changes

If you've already uploaded to GitHub, re-upload the changed files (or run `git add -A`, `git commit -m "my edits"`, `git push`). If not, nothing else to do — your changes are live locally the moment you save and refresh.
