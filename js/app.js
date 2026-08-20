/* ==========================================================================
   VAWEHALL starter storefront — shared logic.
   Header/footer injection, cart + wishlist (localStorage), helpers.
   This is a front-end demo: there is no server. Your developer will replace
   the storage layer with a real backend (see docs/ for the full scope).
   ========================================================================== */

const BRAND = "VAWEHALL";
const CART_KEY = "vw_cart";
const WISH_KEY = "vw_wish";
const FREE_SHIP_ABOVE = 999;
const SHIP_FEE = 79;

const COUPONS = {
  WELCOME10: { kind: "pct", value: 10, min: 999, label: "10% off on orders above ₹999" },
  FREESHIP: { kind: "ship", label: "Free shipping on any order" }
};

/* ---------- tiny helpers ---------- */

function fmtINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

/* ---------- cart ---------- */

function getCart() { return readJSON(CART_KEY, []); }
function setCart(items) { writeJSON(CART_KEY, items); updateHeaderCounts(); }

function addToCart(id, size, color, qty) {
  const cart = getCart();
  const hit = cart.find(i => i.id === id && i.size === size && i.color === color);
  if (hit) { hit.qty += qty; } else { cart.push({ id: id, size: size, color: color, qty: qty }); }
  setCart(cart);
}

function cartCount() {
  return getCart().reduce((n, i) => n + i.qty, 0);
}

function cartSummary(couponCode) {
  const cart = getCart();
  let mrpTotal = 0, saleTotal = 0;
  cart.forEach(i => {
    const p = getProduct(i.id);
    if (!p) return;
    mrpTotal += p.mrp * i.qty;
    saleTotal += p.price * i.qty;
  });
  let couponOff = 0, couponMsg = "", couponOk = false;
  const code = (couponCode || "").trim().toUpperCase();
  if (code) {
    const c = COUPONS[code];
    if (!c) {
      couponMsg = "Coupon not recognised.";
    } else if (c.kind === "pct") {
      if (saleTotal >= c.min) {
        couponOff = Math.round(saleTotal * c.value / 100);
        couponOk = true;
        couponMsg = code + " applied — " + c.label + ".";
      } else {
        couponMsg = code + " needs a minimum order of " + fmtINR(c.min) + ".";
      }
    } else if (c.kind === "ship") {
      couponOk = true;
      couponMsg = code + " applied — " + c.label + ".";
    }
  }
  let shipping = saleTotal === 0 ? 0 : (saleTotal - couponOff >= FREE_SHIP_ABOVE ? 0 : SHIP_FEE);
  if (couponOk && code === "FREESHIP") shipping = 0;
  return {
    items: cart,
    mrpTotal: mrpTotal,
    baseDiscount: mrpTotal - saleTotal,
    saleTotal: saleTotal,
    couponOff: couponOff,
    couponOk: couponOk,
    couponMsg: couponMsg,
    shipping: shipping,
    total: Math.max(0, saleTotal - couponOff + shipping)
  };
}

/* ---------- wishlist ---------- */

function getWish() { return readJSON(WISH_KEY, []); }
function setWish(ids) { writeJSON(WISH_KEY, ids); updateHeaderCounts(); }

function toggleWish(id) {
  const ids = getWish();
  const at = ids.indexOf(id);
  if (at >= 0) { ids.splice(at, 1); setWish(ids); return false; }
  ids.push(id); setWish(ids); return true;
}

/* ---------- shared UI ---------- */

const ICONS = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="5" width="14" height="12" rx="1"/><path d="M15 9h4l4 4v4h-8"/><circle cx="6.5" cy="19" r="1.8"/><circle cx="17.5" cy="19" r="1.8"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2v6H7"/><path d="M7 22v-6h10"/><path d="M20 8A9 9 0 0 0 5.6 5.6L4 8"/><path d="M4 16a9 9 0 0 0 14.4 2.4L20 16"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  rupee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13l8.5 8"/><path d="M6 13h3a6 6 0 0 0 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/></svg>'
};

function renderHeader() {
  const mount = document.getElementById("app-header");
  if (!mount) return;
  let nav = document.body.getAttribute("data-nav") || "";
  const params = new URLSearchParams(location.search);
  if (nav === "shop") {
    const cat = params.get("category");
    if (cat) nav = cat.toLowerCase();
    else if (params.get("badge") === "New") nav = "new";
  }
  const act = (k) => (nav === k ? ' class="active"' : "");
  mount.innerHTML =
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<div class="announce">Free shipping above <strong>₹999</strong> · Easy 7-day returns &amp; size exchange · COD available</div>' +
    '<header class="site-header">' +
      '<div class="header-inner">' +
        '<a class="wordmark" href="index.html">VAWE<span>HALL</span></a>' +
        '<nav class="main-nav" aria-label="Categories">' +
          '<a href="shop.html?category=Men"' + act("men") + ">Men</a>" +
          '<a href="shop.html?category=Women"' + act("women") + ">Women</a>" +
          '<a href="shop.html?category=Unisex"' + act("unisex") + ">Unisex</a>" +
          '<a href="shop.html?badge=New"' + act("new") + ">New In</a>" +
        "</nav>" +
        '<div class="header-search">' +
          '<form action="shop.html" method="get" role="search">' +
            '<input type="search" name="search" placeholder="Search for kurtas, tees, dresses…" aria-label="Search products">' +
            '<button type="submit">Search</button>' +
          "</form>" +
        "</div>" +
        '<div class="header-icons">' +
          '<a class="icon-link" href="wishlist.html" aria-label="Wishlist">' + ICONS.heart +
            '<span class="icon-label">Wishlist</span><span class="count-badge" id="wish-count" hidden></span></a>' +
          '<a class="icon-link" href="cart.html" aria-label="Shopping bag">' + ICONS.bag +
            '<span class="icon-label">Bag</span><span class="count-badge" id="cart-count" hidden></span></a>' +
        "</div>" +
      "</div>" +
    "</header>";
  const searchInput = mount.querySelector('input[name="search"]');
  if (searchInput) searchInput.value = params.get("search") || "";
}

function renderFooter() {
  const mount = document.getElementById("app-footer");
  if (!mount) return;
  mount.innerHTML =
    '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div class="footer-brand">' +
          '<span class="wordmark">VAWE<span>HALL</span></span>' +
          "<p>Contemporary Indian wardrobe staples — made responsibly, priced honestly, delivered anywhere in India.</p>" +
        "</div>" +
        '<div class="footer-col"><h5>Shop</h5><ul>' +
          '<li><a href="shop.html?category=Men">Men</a></li>' +
          '<li><a href="shop.html?category=Women">Women</a></li>' +
          '<li><a href="shop.html?category=Unisex">Unisex</a></li>' +
          '<li><a href="shop.html?badge=New">New arrivals</a></li>' +
        "</ul></div>" +
        '<div class="footer-col"><h5>Help</h5><ul>' +
          '<li><a href="faq.html">FAQ</a></li>' +
          '<li><a href="policies.html#shipping">Shipping</a></li>' +
          '<li><a href="policies.html#returns">Returns &amp; exchange</a></li>' +
          '<li><a href="contact.html">Contact us</a></li>' +
        "</ul></div>" +
        '<div class="footer-col"><h5>Company</h5><ul>' +
          '<li><a href="about.html">Our story</a></li>' +
          '<li><a href="policies.html#privacy">Privacy policy</a></li>' +
          '<li><a href="policies.html#terms">Terms of service</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-base">' +
        "<span>© 2026 " + BRAND + " · Starter demo storefront</span>" +
        "<span>UPI · Cards · Net banking · COD</span>" +
      "</div>" +
    "</footer>";
}

function updateHeaderCounts() {
  const w = document.getElementById("wish-count");
  const c = document.getElementById("cart-count");
  const wn = getWish().length;
  const cn = cartCount();
  if (w) {
    w.textContent = wn;
    w.hidden = wn === 0;
    w.closest("a").setAttribute("aria-label", "Wishlist" + (wn ? ", " + wn + " items" : ""));
  }
  if (c) {
    c.textContent = cn;
    c.hidden = cn === 0;
    c.closest("a").setAttribute("aria-label", "Shopping bag" + (cn ? ", " + cn + " items" : ""));
  }
}

/* ---------- product cards ---------- */

function ratingChip(p) {
  return '<span class="rating-chip"><span class="star">★</span>' + p.rating.toFixed(1) +
    '<span class="rcount">(' + p.ratingCount + ")</span></span>";
}

function cardFlag(p) {
  if (!p.badge) return "";
  const cls = p.badge === "Bestseller" ? "flag-bestseller" : "";
  return '<span class="card-flag ' + cls + '">' + p.badge + "</span>";
}

function renderCard(p) {
  const wished = getWish().indexOf(p.id) >= 0;
  return (
    '<article class="product-card" data-id="' + p.id + '">' +
      '<button class="wish-btn' + (wished ? " active" : "") + '" data-wish="' + p.id + '" aria-label="Toggle wishlist for ' + p.name + '" aria-pressed="' + wished + '">' +
        (wished ? ICONS.heartFill : ICONS.heart) +
      "</button>" +
      '<a class="card-link" href="product.html?id=' + p.id + '">' +
        '<div class="card-media">' + cardFlag(p) + svgFor(p.type, p.colors[0]) + "</div>" +
        '<div class="card-body">' +
          '<span class="card-brand">' + BRAND + "</span>" +
          '<span class="card-name">' + p.name + "</span>" +
          '<span class="card-fabric">' + p.fabric + "</span>" +
          ratingChip(p) +
          '<div class="price-row">' +
            '<span class="price">' + fmtINR(p.price) + "</span>" +
            '<span class="mrp">' + fmtINR(p.mrp) + "</span>" +
            '<span class="off">(' + discountPct(p) + "% off)</span>" +
          "</div>" +
        "</div>" +
      "</a>" +
    "</article>"
  );
}

/* Wishlist toggle via event delegation (works for all grids). */
document.addEventListener("click", function (ev) {
  const btn = ev.target.closest("[data-wish]");
  if (!btn) return;
  ev.preventDefault();
  const id = btn.getAttribute("data-wish");
  const on = toggleWish(id);
  btn.classList.toggle("active", on);
  btn.setAttribute("aria-pressed", String(on));
  btn.innerHTML = on ? ICONS.heartFill : ICONS.heart;
  const p = getProduct(id);
  showToast(on ? "Added to wishlist ♡ " + (p ? p.name : "") : "Removed from wishlist");
  if (typeof window.onWishChange === "function") window.onWishChange(id, on);
});

/* ---------- toast ---------- */

let toastTimer = null;
function ensureToast() {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  return el;
}
function showToast(msg) {
  const el = ensureToast();
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
}

/* ---------- boot ---------- */

document.addEventListener("DOMContentLoaded", function () {
  renderHeader();
  renderFooter();
  updateHeaderCounts();
  ensureToast();
  const main = document.querySelector("main");
  if (main && !main.id) { main.id = "main"; main.setAttribute("tabindex", "-1"); }
});
