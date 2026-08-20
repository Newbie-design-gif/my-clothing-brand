/* ==========================================================================
   VAWEHALL starter catalog — sample data + SVG garment art.
   Replace PRODUCTS with your real catalog; swap svgFor() art for real
   product photos when they're ready (see README).
   ========================================================================== */

const COLOR_HEX = {
  "Black": "#2f2f36",
  "White": "#f2f0ea",
  "Indigo": "#33436e",
  "Rani Pink": "#b93e6c",
  "Olive": "#6b7048",
  "Rust": "#b0563b",
  "Sand": "#d9c9a8",
  "Teal": "#2f6f6a",
  "Maroon": "#7a2f3c",
  "Grey": "#9a9aa2",
  "Sky": "#a8c3d9",
  "Mustard": "#d1a23c",
  "Denim Blue": "#4a6288",
  "Washed Black": "#3c3c44"
};

/* Darken a hex color by pct (0-100) for strokes/details. */
function shadeHex(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = 1 - pct / 100;
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

/* Stylized garment illustration per product type. Returns an <svg> string. */
function svgFor(type, colorName) {
  const fill = COLOR_HEX[colorName] || "#9a9aa2";
  const line = shadeHex(fill, 28);
  const soft = "rgba(0,0,0,0.14)";
  const open = (label) =>
    '<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">';
  const close = "</svg>";
  const S = 'stroke="' + line + '" stroke-width="3" stroke-linejoin="round"';

  switch (type) {
    case "T-Shirt":
    case "Co-ord Top":
      return open(colorName + " " + type) +
        '<path d="M63,42 L88,30 Q100,42 112,30 L137,42 L168,80 L140,98 L140,212 L60,212 L60,98 L32,80 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M88,30 Q100,42 112,30" fill="none" ' + S + '/>' +
        '<line x1="66" y1="200" x2="134" y2="200" stroke="' + soft + '" stroke-width="2"/>' +
        close;

    case "Shirt":
      return open(colorName + " shirt") +
        '<path d="M63,44 L88,32 L100,42 L112,32 L137,44 L162,86 L156,172 L136,167 L138,214 L62,214 L64,167 L44,172 L38,86 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M88,32 L100,42 L112,32 L107,25 L100,31 L93,25 Z" fill="' + line + '"/>' +
        '<line x1="100" y1="44" x2="100" y2="212" stroke="' + soft + '" stroke-width="2.5"/>' +
        '<circle cx="100" cy="70" r="2.4" fill="' + line + '"/><circle cx="100" cy="100" r="2.4" fill="' + line + '"/>' +
        '<circle cx="100" cy="130" r="2.4" fill="' + line + '"/><circle cx="100" cy="160" r="2.4" fill="' + line + '"/>' +
        close;

    case "Hoodie":
      return open(colorName + " hoodie") +
        '<path d="M60,48 L80,36 Q100,52 120,36 L140,48 L164,90 L158,174 L138,169 L140,214 L60,214 L62,169 L42,174 L36,90 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M74,42 Q100,12 126,42 Q113,32 100,32 Q87,32 74,42 Z" fill="' + shadeHex(fill, 14) + '" ' + S + '/>' +
        '<rect x="74" y="150" width="52" height="36" rx="7" fill="' + shadeHex(fill, 10) + '" stroke="' + soft + '" stroke-width="2"/>' +
        '<line x1="92" y1="54" x2="90" y2="84" stroke="' + line + '" stroke-width="3" stroke-linecap="round"/>' +
        '<line x1="108" y1="54" x2="110" y2="84" stroke="' + line + '" stroke-width="3" stroke-linecap="round"/>' +
        close;

    case "Kurta":
      return open(colorName + " kurta") +
        '<path d="M64,40 L88,30 L100,40 L112,30 L136,40 L160,78 L136,94 L136,228 L64,228 L64,94 L40,78 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M88,30 Q100,26 112,30" fill="none" ' + S + '/>' +
        '<rect x="94" y="40" width="12" height="66" rx="3" fill="none" stroke="' + soft + '" stroke-width="2.5"/>' +
        '<line x1="64" y1="196" x2="64" y2="228" stroke="' + line + '" stroke-width="4"/>' +
        '<line x1="136" y1="196" x2="136" y2="228" stroke="' + line + '" stroke-width="4"/>' +
        close;

    case "Dress":
      return open(colorName + " dress") +
        '<path d="M70,38 L92,28 Q100,36 108,28 L130,38 L142,70 L124,92 L150,208 Q100,234 50,208 L76,92 L58,70 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M92,28 Q100,36 108,28" fill="none" ' + S + '/>' +
        '<line x1="78" y1="92" x2="122" y2="92" stroke="' + soft + '" stroke-width="2.5"/>' +
        close;

    case "Jeans":
    case "Joggers":
      return open(colorName + " " + type) +
        '<rect x="60" y="34" width="80" height="16" rx="3" fill="' + shadeHex(fill, 12) + '" ' + S + '/>' +
        '<path d="M60,50 L140,50 L150,218 L112,218 L102,112 L98,112 L88,218 L50,218 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M66,56 Q80,72 92,58" fill="none" stroke="' + soft + '" stroke-width="2.5"/>' +
        '<path d="M134,56 Q120,72 108,58" fill="none" stroke="' + soft + '" stroke-width="2.5"/>' +
        '<line x1="100" y1="50" x2="100" y2="76" stroke="' + soft + '" stroke-width="2.5"/>' +
        close;

    case "Jacket":
      return open(colorName + " jacket") +
        '<path d="M60,46 L84,34 L100,48 L116,34 L140,46 L166,90 L158,176 L138,170 L140,214 L62,214 L62,170 L42,176 L34,90 Z" fill="' + fill + '" ' + S + '/>' +
        '<path d="M84,34 L100,48 L92,120 L84,60 Z" fill="' + shadeHex(fill, 16) + '" ' + S + '/>' +
        '<path d="M116,34 L100,48 L108,120 L116,60 Z" fill="' + shadeHex(fill, 16) + '" ' + S + '/>' +
        '<line x1="100" y1="48" x2="100" y2="212" stroke="' + line + '" stroke-width="3"/>' +
        close;

    default:
      return open(colorName + " garment") +
        '<rect x="52" y="40" width="96" height="170" rx="10" fill="' + fill + '" ' + S + '/>' +
        close;
  }
}

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const WAIST_SIZES = ["28", "30", "32", "34", "36"];

const PRODUCTS = [
  { id: "P01", name: "Everyday Crew Tee", category: "Men", type: "T-Shirt", price: 8.99, mrp: 12.99, colors: ["Black", "White", "Olive"], sizes: APPAREL_SIZES, rating: 4.3, ratingCount: 412, fabric: "100% combed cotton, 180 GSM", badge: "Bestseller",
    description: "A clean, boxy crew-neck tee cut for daily wear. Pre-shrunk, bio-washed fabric that keeps its shape and colour after repeated washes." },
  { id: "P02", name: "Heritage Oxford Shirt", category: "Men", type: "Shirt", price: 17.99, mrp: 25.99, colors: ["Sky", "White", "Indigo"], sizes: APPAREL_SIZES, rating: 4.5, ratingCount: 238, fabric: "Oxford cotton, button-down collar", badge: "New",
    description: "The workhorse shirt — structured oxford weave with a button-down collar, single chest pocket and a curved hem you can wear tucked or untucked." },
  { id: "P03", name: "Midnight Zip Hoodie", category: "Unisex", type: "Hoodie", price: 21.99, mrp: 29.99, colors: ["Black", "Grey", "Maroon"], sizes: APPAREL_SIZES, rating: 4.6, ratingCount: 521, fabric: "Cotton-poly fleece, 320 GSM", badge: "Bestseller",
    description: "Heavyweight brushed-fleece hoodie with a lined hood, kangaroo pocket and ribbed cuffs. Warm without the bulk." },
  { id: "P04", name: "Festive Chikankari Kurta", category: "Men", type: "Kurta", price: 22.99, mrp: 33.99, colors: ["White", "Sand", "Teal"], sizes: APPAREL_SIZES, rating: 4.4, ratingCount: 189, fabric: "Cotton with chikankari-inspired embroidery", badge: "New",
    description: "A straight-cut festive kurta with fine tonal embroidery on the placket, mandarin collar and side slits for ease of movement." },
  { id: "P05", name: "Wrap Midi Dress", category: "Women", type: "Dress", price: 25.99, mrp: 39.99, colors: ["Rani Pink", "Black", "Teal"], sizes: APPAREL_SIZES, rating: 4.5, ratingCount: 304, fabric: "Viscose crepe, fluid drape", badge: "Bestseller",
    description: "A true-wrap midi with a flattering V-neck, tie waist and a skirt that moves. Office-to-evening in one change of footwear." },
  { id: "P06", name: "High-Rise Slim Jeans", category: "Women", type: "Jeans", price: 23.99, mrp: 34.99, colors: ["Denim Blue", "Washed Black"], sizes: WAIST_SIZES, rating: 4.2, ratingCount: 457, fabric: "Stretch denim, 2% elastane", badge: null,
    description: "High-rise, slim through the leg, with just enough stretch to keep its shape from morning chai to last train home." },
  { id: "P07", name: "Studio Oversized Tee", category: "Unisex", type: "T-Shirt", price: 10.99, mrp: 15.99, colors: ["Sand", "Black", "Rust"], sizes: APPAREL_SIZES, rating: 4.4, ratingCount: 368, fabric: "Heavy cotton, 240 GSM, drop shoulder", badge: null,
    description: "Oversized fit with a dropped shoulder and a heavyweight hand-feel. The tee that looks styled with zero effort." },
  { id: "P08", name: "Anokhi Printed Kurta", category: "Women", type: "Kurta", price: 18.99, mrp: 28.99, colors: ["Mustard", "Rani Pink", "Indigo"], sizes: APPAREL_SIZES, rating: 4.6, ratingCount: 275, fabric: "Hand-block printed cotton cambric", badge: "New",
    description: "A breezy A-line kurta in hand-block inspired prints — three-quarter sleeves, deep side pockets, and colours that hold." },
  { id: "P09", name: "Trail Utility Jacket", category: "Men", type: "Jacket", price: 34.99, mrp: 49.99, colors: ["Olive", "Black", "Sand"], sizes: APPAREL_SIZES, rating: 4.3, ratingCount: 142, fabric: "Cotton twill, water-repellent finish", badge: null,
    description: "Four-pocket utility jacket in brushed twill with a light water-repellent coating. Layers clean over tees and knits." },
  { id: "P10", name: "Weekend Relaxed Joggers", category: "Unisex", type: "Joggers", price: 15.99, mrp: 22.99, colors: ["Grey", "Black", "Olive"], sizes: APPAREL_SIZES, rating: 4.1, ratingCount: 396, fabric: "French terry, tapered fit", badge: null,
    description: "Tapered joggers in mid-weight french terry with zip pockets and ribbed cuffs. Made for lazy Sundays and long flights." },
  { id: "P11", name: "Ivory Ceremony Kurta", category: "Men", type: "Kurta", price: 29.99, mrp: 42.99, colors: ["White", "Sand"], sizes: APPAREL_SIZES, rating: 4.7, ratingCount: 96, fabric: "Silk-cotton blend, subtle sheen", badge: "New",
    description: "An occasion-ready kurta in a silk-cotton blend with a soft lustre — pairs with churidar or straight-cut trousers." },
  { id: "P12", name: "City Slim Shirt", category: "Men", type: "Shirt", price: 15.99, mrp: 22.99, colors: ["Black", "White", "Teal"], sizes: APPAREL_SIZES, rating: 4.2, ratingCount: 314, fabric: "Stretch poplin, wrinkle-resistant", badge: null,
    description: "Slim-fit poplin shirt that shrugs off wrinkles — cut close through the body with a semi-cutaway collar." },
  { id: "P13", name: "Bloom A-Line Dress", category: "Women", type: "Dress", price: 22.99, mrp: 33.99, colors: ["Sky", "Mustard", "Rani Pink"], sizes: APPAREL_SIZES, rating: 4.4, ratingCount: 221, fabric: "Cotton dobby, floral print", badge: null,
    description: "Knee-length A-line dress in breathable cotton dobby with side pockets (yes, real pockets) and a keyhole back." },
  { id: "P14", name: "Raw Hem Straight Jeans", category: "Men", type: "Jeans", price: 25.99, mrp: 37.99, colors: ["Denim Blue", "Washed Black"], sizes: WAIST_SIZES, rating: 4.3, ratingCount: 287, fabric: "12.5 oz rigid denim", badge: "Bestseller",
    description: "Straight-fit jeans in rigid denim that breaks in beautifully — raw hem, clean topstitching, zero distressing." },
  { id: "P15", name: "Cloud Fleece Hoodie", category: "Women", type: "Hoodie", price: 19.99, mrp: 28.99, colors: ["Rani Pink", "Sand", "Grey"], sizes: APPAREL_SIZES, rating: 4.5, ratingCount: 342, fabric: "Brushed loopknit, relaxed fit", badge: null,
    description: "A cloud-soft relaxed hoodie with a slightly cropped body and roomy sleeves. The one you'll fight your sister for." },
  { id: "P16", name: "Court Graphic Tee", category: "Unisex", type: "T-Shirt", price: 9.99, mrp: 13.99, colors: ["White", "Black", "Sky"], sizes: APPAREL_SIZES, rating: 4.0, ratingCount: 259, fabric: "Combed cotton, screen-printed art", badge: null,
    description: "Original artwork, screen-printed by hand in small batches. Regular fit, ribbed collar that won't sag." },
  { id: "P17", name: "Indigo Overshirt", category: "Unisex", type: "Jacket", price: 23.99, mrp: 34.99, colors: ["Indigo", "Rust", "Black"], sizes: APPAREL_SIZES, rating: 4.4, ratingCount: 118, fabric: "Cotton flannel, shacket weight", badge: "New",
    description: "Part shirt, part jacket — a flannel overshirt with snap buttons and two chest pockets. Your third layer for ten months of the year." },
  { id: "P18", name: "Meadow Tiered Dress", category: "Women", type: "Dress", price: 27.99, mrp: 40.99, colors: ["White", "Olive", "Sky"], sizes: APPAREL_SIZES, rating: 4.6, ratingCount: 164, fabric: "Cotton mul, lined", badge: null,
    description: "A tiered maxi in feather-light cotton mul, fully lined, with adjustable straps and a smocked back panel." },
  { id: "P19", name: "Everyday Polo", category: "Men", type: "T-Shirt", price: 11.99, mrp: 17.99, colors: ["Teal", "White", "Maroon"], sizes: APPAREL_SIZES, rating: 4.2, ratingCount: 203, fabric: "Piqué cotton, two-button placket", badge: null,
    description: "A neat piqué polo with a structured collar that stays put. Smart enough for work, easy enough for weekends." },
  { id: "P20", name: "Sangria Anarkali Kurta", category: "Women", type: "Kurta", price: 32.99, mrp: 47.99, colors: ["Maroon", "Rani Pink", "Mustard"], sizes: APPAREL_SIZES, rating: 4.7, ratingCount: 132, fabric: "Rayon with gota detailing", badge: "Bestseller",
    description: "A flowy anarkali-style kurta with delicate gota work at the yoke — festive without trying too hard." },
  { id: "P21", name: "Coastal Linen Shirt", category: "Unisex", type: "Shirt", price: 19.99, mrp: 29.99, colors: ["White", "Sand", "Sky"], sizes: APPAREL_SIZES, rating: 4.5, ratingCount: 176, fabric: "100% linen, garment-washed", badge: null,
    description: "Garment-washed linen with a relaxed collar and coconut-shell buttons. Wrinkles are the point." },
  { id: "P22", name: "Monsoon Windcheater", category: "Unisex", type: "Jacket", price: 18.99, mrp: 27.99, colors: ["Black", "Teal", "Mustard"], sizes: APPAREL_SIZES, rating: 4.1, ratingCount: 208, fabric: "Ripstop nylon, packable", badge: null,
    description: "A featherweight windcheater that packs into its own pocket. Sealed seams shrug off drizzle on the daily commute." },
  { id: "P23", name: "Serene Lounge Co-ord", category: "Women", type: "Co-ord Top", price: 24.99, mrp: 35.99, colors: ["Sand", "Grey", "Rani Pink"], sizes: APPAREL_SIZES, rating: 4.3, ratingCount: 97, fabric: "Modal-cotton knit set", badge: "New",
    description: "A matching two-piece in buttery modal knit — relaxed tee and wide-leg pants. Video-call ready, nap compatible." },
  { id: "P24", name: "Deco Mandarin Shirt", category: "Men", type: "Shirt", price: 16.99, mrp: 23.99, colors: ["Rust", "Black", "Indigo"], sizes: APPAREL_SIZES, rating: 4.4, ratingCount: 151, fabric: "Cotton slub, mandarin collar", badge: null,
    description: "A textured slub-cotton shirt with a mandarin collar and hidden placket — quietly sharp for dinners and dates." }
];

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function discountPct(p) {
  return Math.round(((p.mrp - p.price) / p.mrp) * 100);
}
