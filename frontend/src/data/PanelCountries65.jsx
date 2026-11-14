/*
 * Country panel pages + panel book PDFs (build 65, update 3). Prefix PC5_ / pc5.
 *   PC5_META     one record per panel country: flag colours (official flag shades, used for the page grade and the
 *                PDF palette), capital, currency (code, symbol, name) and languages. Plain facts only.
 *   pc5Cat()     sorts a panel-book table into a category from its title (titles differ between country workbooks)
 *   PC5_CAT      category -> label, icon, chapter and how it is drawn
 *   pc5Flags()   HD flag artwork (public/data/flags-hd.json, flag-icons 7.6.0, MIT), loaded once and cached
 *   PC5_HC_SEG   the three healthcare segments; their country books load from public/data/panel-books/hc/<seg>/<slug>.json
 *                when the data is supplied (same format as the consumer books)
 */
import * as ee from 'react';

const PC5_META = {
  AE: { c: ["#00732F", "#EF3340", "#1A1A1A"], cap: "Abu Dhabi", cur: ["AED", "د.إ", "UAE dirham"], lang: "Arabic" },
  AR: { c: ["#74ACDF", "#F6B40E", "#3D7DB8"], cap: "Buenos Aires", cur: ["ARS", "$", "Argentine peso"], lang: "Spanish" },
  AT: { c: ["#C8102E", "#8A0B20", "#E8E8E8"], cap: "Vienna", cur: ["EUR", "€", "Euro"], lang: "German" },
  AU: { c: ["#012169", "#E4002B", "#4A6CC8"], cap: "Canberra", cur: ["AUD", "A$", "Australian dollar"], lang: "English" },
  BE: { c: ["#1A1A1A", "#FDDA24", "#EF3340"], cap: "Brussels", cur: ["EUR", "€", "Euro"], lang: "Dutch, French, German" },
  BG: { c: ["#00966E", "#D62612", "#E8E8E8"], cap: "Sofia", cur: ["EUR", "€", "Euro"], lang: "Bulgarian", note: "Bulgaria adopted the euro on 1 January 2026; income bands in this book are in lev (BGN)." },
  BR: { c: ["#009C3B", "#FFDF00", "#002776"], cap: "Brasília", cur: ["BRL", "R$", "Brazilian real"], lang: "Portuguese" },
  CA: { c: ["#D80621", "#8E0415", "#F2F2F2"], cap: "Ottawa", cur: ["CAD", "C$", "Canadian dollar"], lang: "English, French" },
  CH: { c: ["#DA291C", "#8F1A12", "#F2F2F2"], cap: "Bern", cur: ["CHF", "Fr.", "Swiss franc"], lang: "German, French, Italian, Romansh" },
  CL: { c: ["#D52B1E", "#0039A6", "#F2F2F2"], cap: "Santiago", cur: ["CLP", "$", "Chilean peso"], lang: "Spanish" },
  CN: { c: ["#EE1C25", "#FFDE00", "#A3121A"], cap: "Beijing", cur: ["CNY", "¥", "Renminbi (yuan)"], lang: "Mandarin Chinese" },
  CO: { c: ["#FCD116", "#003893", "#CE1126"], cap: "Bogotá", cur: ["COP", "$", "Colombian peso"], lang: "Spanish" },
  CR: { c: ["#002B7F", "#CE1126", "#F2F2F2"], cap: "San José", cur: ["CRC", "₡", "Costa Rican colón"], lang: "Spanish" },
  CZ: { c: ["#11457E", "#D7141A", "#F2F2F2"], cap: "Prague", cur: ["CZK", "Kč", "Czech koruna"], lang: "Czech" },
  DE: { c: ["#1A1A1A", "#DD0000", "#FFCE00"], cap: "Berlin", cur: ["EUR", "€", "Euro"], lang: "German" },
  DK: { c: ["#C8102E", "#7E0A1D", "#F2F2F2"], cap: "Copenhagen", cur: ["DKK", "kr", "Danish krone"], lang: "Danish" },
  DZ: { c: ["#006233", "#D21034", "#F2F2F2"], cap: "Algiers", cur: ["DZD", "DA", "Algerian dinar"], lang: "Arabic, Tamazight" },
  EG: { c: ["#CE1126", "#1A1A1A", "#C09300"], cap: "Cairo", cur: ["EGP", "E£", "Egyptian pound"], lang: "Arabic" },
  ES: { c: ["#AA151B", "#F1BF00", "#7A0F13"], cap: "Madrid", cur: ["EUR", "€", "Euro"], lang: "Spanish" },
  FR: { c: ["#002395", "#ED2939", "#F2F2F2"], cap: "Paris", cur: ["EUR", "€", "Euro"], lang: "French" },
  GB: { c: ["#012169", "#C8102E", "#F2F2F2"], cap: "London", cur: ["GBP", "£", "Pound sterling"], lang: "English" },
  HK: { c: ["#DE2910", "#8F1A0A", "#F2F2F2"], cap: null, cur: ["HKD", "HK$", "Hong Kong dollar"], lang: "Chinese (Cantonese), English" },
  ID: { c: ["#CE1126", "#8A0B19", "#F2F2F2"], cap: "Jakarta", cur: ["IDR", "Rp", "Indonesian rupiah"], lang: "Indonesian" },
  IE: { c: ["#169B62", "#FF883E", "#F2F2F2"], cap: "Dublin", cur: ["EUR", "€", "Euro"], lang: "English, Irish" },
  IL: { c: ["#0038B8", "#002A8A", "#F2F2F2"], cap: null, cur: ["ILS", "₪", "Israeli new shekel"], lang: "Hebrew" },
  IN: { c: ["#FF9933", "#138808", "#000080"], cap: "New Delhi", cur: ["INR", "₹", "Indian rupee"], lang: "Hindi, English" },
  IR: { c: ["#239F40", "#DA0000", "#F2F2F2"], cap: "Tehran", cur: ["IRR", "﷼", "Iranian rial"], lang: "Persian" },
  IT: { c: ["#009246", "#CE2B37", "#F2F2F2"], cap: "Rome", cur: ["EUR", "€", "Euro"], lang: "Italian" },
  JP: { c: ["#BC002D", "#7A001D", "#F2F2F2"], cap: "Tokyo", cur: ["JPY", "¥", "Japanese yen"], lang: "Japanese" },
  KE: { c: ["#1A1A1A", "#BB0000", "#006600"], cap: "Nairobi", cur: ["KES", "KSh", "Kenyan shilling"], lang: "English, Swahili" },
  KH: { c: ["#032EA1", "#E00025", "#F2F2F2"], cap: "Phnom Penh", cur: ["KHR", "៛", "Cambodian riel"], lang: "Khmer" },
  KR: { c: ["#CD2E3A", "#0047A0", "#1A1A1A"], cap: "Seoul", cur: ["KRW", "₩", "South Korean won"], lang: "Korean" },
  KW: { c: ["#007A3D", "#CE1126", "#1A1A1A"], cap: "Kuwait City", cur: ["KWD", "KD", "Kuwaiti dinar"], lang: "Arabic" },
  MX: { c: ["#006847", "#CE1126", "#F2F2F2"], cap: "Mexico City", cur: ["MXN", "$", "Mexican peso"], lang: "Spanish" },
  MY: { c: ["#010066", "#CC0001", "#FFCC00"], cap: "Kuala Lumpur", cur: ["MYR", "RM", "Malaysian ringgit"], lang: "Malay" },
  NG: { c: ["#008751", "#005A36", "#F2F2F2"], cap: "Abuja", cur: ["NGN", "₦", "Nigerian naira"], lang: "English" },
  NL: { c: ["#AE1C28", "#21468B", "#F2F2F2"], cap: "Amsterdam", cur: ["EUR", "€", "Euro"], lang: "Dutch" },
  NO: { c: ["#BA0C2F", "#00205B", "#F2F2F2"], cap: "Oslo", cur: ["NOK", "kr", "Norwegian krone"], lang: "Norwegian" },
  NZ: { c: ["#012169", "#C8102E", "#F2F2F2"], cap: "Wellington", cur: ["NZD", "NZ$", "New Zealand dollar"], lang: "English, Māori" },
  PE: { c: ["#D91023", "#8E0A17", "#F2F2F2"], cap: "Lima", cur: ["PEN", "S/", "Peruvian sol"], lang: "Spanish" },
  PH: { c: ["#0038A8", "#CE1126", "#FCD116"], cap: "Manila", cur: ["PHP", "₱", "Philippine peso"], lang: "Filipino, English" },
  PL: { c: ["#DC143C", "#8E0D27", "#F2F2F2"], cap: "Warsaw", cur: ["PLN", "zł", "Polish złoty"], lang: "Polish" },
  PT: { c: ["#006600", "#FF0000", "#FFCC00"], cap: "Lisbon", cur: ["EUR", "€", "Euro"], lang: "Portuguese" },
  QA: { c: ["#8A1538", "#5C0E25", "#F2F2F2"], cap: "Doha", cur: ["QAR", "QR", "Qatari riyal"], lang: "Arabic" },
  RO: { c: ["#002B7F", "#FCD116", "#CE1126"], cap: "Bucharest", cur: ["RON", "lei", "Romanian leu"], lang: "Romanian" },
  RU: { c: ["#0039A6", "#D52B1E", "#F2F2F2"], cap: "Moscow", cur: ["RUB", "₽", "Russian ruble"], lang: "Russian" },
  SA: { c: ["#006C35", "#004A24", "#F2F2F2"], cap: "Riyadh", cur: ["SAR", "﷼", "Saudi riyal"], lang: "Arabic" },
  SE: { c: ["#006AA7", "#FECC00", "#004B78"], cap: "Stockholm", cur: ["SEK", "kr", "Swedish krona"], lang: "Swedish" },
  SG: { c: ["#EF3340", "#9E1F28", "#F2F2F2"], cap: "Singapore (city-state)", cur: ["SGD", "S$", "Singapore dollar"], lang: "English, Malay, Mandarin, Tamil" },
  TH: { c: ["#A51931", "#2D2A4A", "#F2F2F2"], cap: "Bangkok", cur: ["THB", "฿", "Thai baht"], lang: "Thai" },
  TR: { c: ["#E30A17", "#A50812", "#F2F2F2"], cap: "Ankara", cur: ["TRY", "₺", "Turkish lira"], lang: "Turkish" },
  TW: { c: ["#FE0000", "#000095", "#F2F2F2"], cap: "Taipei", cur: ["TWD", "NT$", "New Taiwan dollar"], lang: "Mandarin Chinese" },
  UA: { c: ["#0057B7", "#FFD700", "#003E85"], cap: "Kyiv", cur: ["UAH", "₴", "Ukrainian hryvnia"], lang: "Ukrainian" },
  US: { c: ["#B22234", "#3C3B6E", "#F2F2F2"], cap: "Washington, D.C.", cur: ["USD", "$", "US dollar"], lang: "English" },
  VN: { c: ["#DA251D", "#FFCD00", "#9A1A14"], cap: "Hanoi", cur: ["VND", "₫", "Vietnamese đồng"], lang: "Vietnamese" },
  ZA: { c: ["#007749", "#FFB81C", "#001489", "#E03C31"], cap: "Pretoria (executive)", cur: ["ZAR", "R", "South African rand"], lang: "12 official languages" },
};
const pc5Meta = (iso) => PC5_META[iso] || { c: ["#2F6BFF", "#6D4AFF", "#F2F2F2"], cap: null, cur: null, lang: "" };

/* colour helpers (hex) */
const pc5Rgb = (h) => {
  const n = parseInt(String(h).replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const pc5Hex = (r) => "#" + r.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
const pc5Mix = (a, b, t) => pc5Hex(pc5Rgb(a).map((x, i) => x + (pc5Rgb(b)[i] - x) * t));
const pc5Lum = (h) => {
  const [r, g, b] = pc5Rgb(h).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const pc5Chroma = (h) => {
  const r = pc5Rgb(h);
  return Math.max(...r) - Math.min(...r);
};
/* the page palette: two strong flag colours (white/grey and near-black are not used as accents), a deep shade for
   dark grounds, readable text tints for dark and light grounds */
function pc5Pal(iso) {
  const m = pc5Meta(iso);
  const strong = m.c.filter((x) => pc5Chroma(x) > 60);
  const a = strong[0] || "#2F6BFF";
  const b = strong[1] || pc5Mix(a, "#0B1437", 0.45);
  const c = strong[2] || pc5Mix(b, "#FFFFFF", 0.35);
  const deep = pc5Mix(a, "#070B1E", 0.78);
  const tint = (x) => (pc5Lum(x) < 0.32 ? pc5Mix(x, "#FFFFFF", 0.55) : pc5Mix(x, "#FFFFFF", 0.15));
  const ink = (x) => {
    let y = x;
    for (let i = 0; i < 6 && pc5Lum(y) > 0.12; i++) y = pc5Mix(y, "#0B1437", 0.25);
    return y;
  };
  return { a, b, c, deep, ta: tint(a), tb: tint(b), ia: ink(a), ib: ink(b), all: m.c };
}

/* ── table categories ────────────────────────────────────────────────────────────── */
const PC5_CAT = {
  gender: { t: "Gender", ic: "gender", ch: "who" },
  age: { t: "Age", ic: "cake", ch: "who" },
  marital: { t: "Marital status", ic: "rings", ch: "who" },
  education: { t: "Education", ic: "grad", ch: "who" },
  lifestage: { t: "Life stage", ic: "path", ch: "who" },
  occupation: { t: "Occupation", ic: "brief", ch: "money" },
  pincome: { t: "Personal income", ic: "wallet", ch: "money" },
  hincome: { t: "Household income", ic: "coins", ch: "money" },
  bank: { t: "Banking & financial services", ic: "card", ch: "money" },
  home: { t: "Home category", ic: "home", ch: "home" },
  house: { t: "House ownership", ic: "key", ch: "home" },
  parents: { t: "Parents of children", ic: "stroller", ch: "home" },
  family: { t: "Parenting, family & household", ic: "family", ch: "home" },
  region: { t: "Where they live", ic: "pin", ch: "where" },
  ethnicity: { t: "Ethnicity & background", ic: "people", ch: "where" },
  auto: { t: "Automotive", ic: "car", ch: "use" },
  tech: { t: "Technology", ic: "phone", ch: "use" },
  travel: { t: "Travel", ic: "plane", ch: "use" },
  lifestyle: { t: "Lifestyle", ic: "sun", ch: "use" },
  media: { t: "Media & entertainment", ic: "play", ch: "use" },
  shopping: { t: "Shopping behaviour", ic: "bag", ch: "aud" },
  sports: { t: "Sports & fitness", ic: "ball", ch: "aud" },
  gaming: { t: "Gaming & digital entertainment", ic: "game", ch: "aud" },
  beauty: { t: "Beauty, fashion & personal care", ic: "lips", ch: "aud" },
  pet: { t: "Pets & pet care", ic: "paw", ch: "aud" },
  food: { t: "Food & beverages", ic: "cup", ch: "aud" },
  health: { t: "Health & wellness", ic: "pulse", ch: "aud" },
  csize: { t: "Company size", ic: "factory", ch: "biz" },
  revenue: { t: "Company revenue", ic: "coins", ch: "biz" },
  industry: { t: "Industry distribution", ic: "pie", ch: "sec" },
  dept: { t: "Department distribution", ic: "org", ch: "sec" },
  role: { t: "Job titles", ic: "badge", ch: "sec" },
  other: { t: "Profile", ic: "spark", ch: "aud" },
};
function pc5Cat(title, b2b) {
  const s = String(title || "").toLowerCase();
  const T = (re) => re.test(s);
  if (T(/^gender|\bgender\b/)) return "gender";
  if (b2b) {
    if (T(/company size|employees/)) return "csize";
    if (T(/revenue|turnover/)) return "revenue";
    if (T(/industry (distribution|profile)|industry$|defen[cs]e industry/)) return "industry";
    if (T(/department/)) return "dept";
    if (T(/state|region|province|governorate|municipal|district|territor|counties/)) return "region";
    return "role";
  }
  if (T(/parents of children/)) return "parents";
  if (T(/tobacco|nicotine|alcohol/)) return "lifestyle";
  if (T(/dwelling/)) return "house";
  if (T(/luxury|premium/)) return "shopping";
  if (T(/electronics/)) return "tech";
  if (T(/content creator|influenc/)) return "media";
  if (T(/restaurant|delivery/)) return "food";
  if (T(/household services|maintenance/)) return "family";
  if (T(/household income/)) return "hincome";
  if (T(/personal income|income/)) return "pincome";
  if (T(/^age\b|\bage\b/)) return "age";
  if (T(/marri|marital/)) return "marital";
  if (T(/education/)) return "education";
  if (T(/life ?stage/)) return "lifestage";
  if (T(/occupation/)) return "occupation";
  if (T(/home category/)) return "home";
  if (T(/house ownership/)) return "house";
  if (T(/parents of children/)) return "parents";
  if (T(/ethnic|nationality|ancestry|population background/)) return "ethnicity";
  if (T(/state|region|province|governorate|municipal|district|territor|counties/)) return "region";
  if (T(/automotive/)) return "auto";
  if (T(/^technology/)) return "tech";
  if (T(/banking|financial/)) return "bank";
  if (T(/^travel/)) return "travel";
  if (T(/^lifestyle/)) return "lifestyle";
  if (T(/^media/)) return "media";
  if (T(/pet/)) return "pet";
  if (T(/gaming|digital entertainment/)) return "gaming";
  if (T(/beauty|fashion|style|self-care/)) return "beauty";
  if (T(/food|beverage/)) return "food";
  if (T(/health|wellness|disabilit/)) return "health";
  if (T(/sport|fitness|active/)) return "sports";
  if (T(/shop/)) return "shopping";
  if (T(/parent|family|household/)) return "family";
  return "other";
}
/* strip "<Country> – " from a table title */
const pc5Title = (t, name) => String(t || "").replace(new RegExp("^" + String(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*[–-]\\s*"), "");
/* do the rows add up to about 100% (a single-choice split, safe to draw as a donut)? */
const pc5Whole = (rows) => {
  const s = rows.reduce((a, r) => a + (r[1] || 0), 0);
  return s >= 96 && s <= 104;
};
const pc5Pct = (v) => (Math.round(v * 10) / 10).toLocaleString("en-US") + "%";
/* update 8: number of panelists for a row ([label, percent, panelists, band]); rows from older books have no count */
const pc5N = (r) => (r && typeof r[2] === "number" ? <small className="pc5-n">{pc5Num(r[2])}</small> : null);
const pc5Num = (n) => (n || 0).toLocaleString("en-US");

/* ── icons (24 grid, stroke) used by the page and drawn into the PDF with Path2D ────── */
const PC5_P = {
  gender: "M9 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM9 14v6M6.5 17.5h5M15 4h5v5M20 4l-5.2 5.2M17 13a4 4 0 1 1-3.4-3.95",
  cake: "M4 20h16M5 20v-7h14v7M5 16c2 1.5 4-1.5 7 0s5-1.5 7 0M12 13v-3M12 7a1.2 1.2 0 0 0 1-1.8L12 3l-1 2.2A1.2 1.2 0 0 0 12 7z",
  rings: "M9 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM15 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10 4h4l-2 3z",
  grad: "M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5M21 9v6",
  path: "M5 20c0-6 6-4 6-10 0-3 3-6 8-6M5 20h0M19 4v0M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  brief: "M3 8h18v11H3zM8 8V5h8v3M3 13h18M11 12h2v2h-2z",
  wallet: "M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4zM4 7V6a2 2 0 0 1 2-2h10M15 13h5v3h-5z",
  coins: "M8 8c3.3 0 6-1.1 6-2.5S11.3 3 8 3 2 4.1 2 5.5 4.7 8 8 8zM2 5.5v4C2 10.9 4.7 12 8 12s6-1.1 6-2.5v-4M10 14.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5M10 14.5V18.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4M16 12c3.3 0 6 1.1 6 2.5",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  home: "M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6",
  key: "M8 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 12h10M18 12v3M21 12v2",
  stroller: "M4 5h3l2 8h9a5 5 0 0 0-5-5V5M9 13l-2 4M18 13l1 4M8 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  family: "M7 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM3 21v-6a4 4 0 0 1 8 0M13 21v-6a4 4 0 0 1 8 0M9.5 21v-2a2.5 2.5 0 0 1 5 0v2",
  pin: "M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2M16 4a3.5 3.5 0 0 1 0 7M22 21v-2a5 5 0 0 0-3.5-4.8",
  car: "M4 16v-4l2-5h12l2 5v4M3 16h18v3h-3v-1H6v1H3zM7 13h0M17 13h0M6.5 12h11",
  phone: "M7 2h10v20H7zM11 18h2",
  plane: "M2 13l20-8-6 15-4-6-6 2 1-4 9-5",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  play: "M3 5h18v14H3zM10 9v6l5-3z",
  bag: "M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2",
  ball: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 7l4 3-1.5 5h-5L8 10zM12 2v5M22 11l-6-1M18 20l-3.5-5M6 20l3.5-5M2 11l6-1",
  game: "M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 15h-4l-1 .6A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4zM7 10v4M5 12h4M16 11h0M18 13h0",
  lips: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z",
  paw: "M12 20c-3 0-6-1.5-6-4s3-5 6-5 6 2.5 6 5-3 4-6 4zM6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  cup: "M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10h1.5a2.5 2.5 0 0 1 0 5H16M8 2v3M12 2v3",
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  factory: "M2 21V10l6 3V9l6 3V5h4v16zM2 21h20M7 17h2M12 17h2M17 17h2",
  pie: "M12 3a9 9 0 1 0 9 9h-9zM15 2.5A9 9 0 0 1 21.5 9H15z",
  org: "M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4",
  badge: "M4 6h16v14H4zM9 3h6v3H9zM12 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8 18c.8-1.6 2.2-2.4 4-2.4s3.2.8 4 2.4",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9S14.5 18.4 12 21c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z",
  landmark: "M3 21h18M4 10h16M12 3l9 5H3zM6 10v8M10 10v8M14 10v8M18 10v8",
  lang: "M4 5h9M8.5 3v2M6 5c0 4 2.5 7 6 8M11 5c-.5 3.5-3 6.5-7 8M13 21l4-10 4 10M14.5 17h5",
  down: "M12 4v12M7 11l5 5 5-5M5 20h14",
  user: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-4.5",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  tractor: "M3 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM16 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM9 17h7M5 14V7h6l2 6h6v5M7 7V4",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.4V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 0 1 0 4h-.1",
  stack: "M4 6h16M4 12h16M4 18h16M7 3v18",
  check: "M5 12.5l4.5 4.5L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  x: "M6 6l12 12M18 6L6 18",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  stetho: "M6 3v6a5 5 0 0 0 10 0V3M6 3h2M14 3h2M11 14v2a5 5 0 0 0 10 0v-2M21 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  heart: "M12 20s-8-4.6-8-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8 2.8C20 15.4 12 20 12 20z",
  bed: "M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6M7 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  chip: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4",
  pill: "M4.5 13.5l9-9a4.24 4.24 0 0 1 6 6l-9 9a4.24 4.24 0 0 1-6-6zM9 9l6 6",
  cell: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM15.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM10 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  hand: "M3 14h3l4 2h4a1.5 1.5 0 0 1 0 3H9M6 14v6H3M14 19l5-2.5a1.6 1.6 0 0 1 2 2.3L15 22H8M12 11s-4-2.4-4-5a2 2 0 0 1 4-.8A2 2 0 0 1 16 6c0 2.6-4 5-4 5z",
  idcard: "M3 5h18v14H3zM7 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5.5 16c.6-1.6 1.8-2.5 3.5-2.5s2.9.9 3.5 2.5M14 9h5M14 13h4",
};
function PC5_I({ n, s = 22, sw = 1.8, className = "" }) {
  return (
    <svg className={"pc5-i " + className} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={PC5_P[n] || PC5_P.spark} />
    </svg>
  );
}
/* B2B sector group icons */
const pc5SecIc = (t) => (/agri/i.test(t) ? "tractor" : /manufact/i.test(t) ? "factory" : /govern|defen/i.test(t) ? "landmark" : /servic/i.test(t) ? "cog" : "layers");

/* ── HD flags ─────────────────────────────────────────────────────────────────────── */
let pc5FlagP = null;
const pc5Flags = () =>
  pc5FlagP ||
  (pc5FlagP = fetch("/data/flags-hd.json")
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({})));
const pc5FlagUrl = (svg) => (svg ? "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg) : "");
function pc5UseFlags() {
  const [f, setF] = ee.useState(null);
  ee.useEffect(() => {
    let on = true;
    pc5Flags().then((d) => on && setF(d));
    return () => {
      on = false;
    };
  }, []);
  return f;
}
function PC5_Flag({ iso, flags, className = "", alt }) {
  const src = flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "";
  return src ? <img className={"pc5-flag " + className} src={src} alt={alt || ""} width="160" height="120" decoding="async" /> : <span className={"pc5-flag pc5-flag--wait " + className} aria-hidden="true" />;
}

/* ── panel kinds and healthcare segments ───────────────────────────────────────────── */
const PC5_KINDS = {
  b2c: { sec: "consumer-panel-books", t: "Consumer panel", who: "consumers", whoOne: "consumer", book: "consumer panel book", icon: "people" },
  b2b: { sec: "business-panel-books", t: "Business professional panel", who: "professionals", whoOne: "professional", book: "business professional panel book", icon: "brief" },
  hc: { sec: "healthcare-panel-books", t: "Healthcare panel", who: "members", whoOne: "member", book: "healthcare panel book", icon: "pulse" },
};
const PC5_HC_SEG = [
  { k: "hcp", t: "Healthcare professionals", who: "professionals", ic: "stetho", d: "Doctors, surgeons, nurses, pharmacists, allied, admin, health IT and AI professionals.", cover: ["Age, gender & region", "Income bands", "Occupation & facility type", "Qualification & expertise", "Job titles & specialisations", "AI departments & roles"] },
  { k: "caregivers", t: "Caregivers", who: "caregivers", ic: "heart", d: "Family, home and professional caregivers sharing the day-to-day reality of care.", cover: ["Age, gender & region", "Income bands", "Who they care for", "Care recipient conditions", "Devices & care products", "Professional caregiver roles"] },
  { k: "patients", t: "Patients", who: "patients", ic: "bed", d: "People living with health conditions, profiled with consent.", cover: ["Age, gender & region", "Income bands", "Diagnosed conditions", "Treatment & access", "Devices & insurance", "Lifestyle & health behaviours"] },
];
/* healthcare table titles arrive as "A. Occupation Profile — Canada Healthcare Professionals", "SURGEONS — JOB LEVEL ..." or
   "Department: Clinical AI"; keep the readable part, in sentence case when the workbook shouts */
const pc5Sent = (s) => (/[a-z]/.test(s) ? s : s.toLowerCase().replace(/^./, (c) => c.toUpperCase()).replace(/\b(it|ai|nlp|llms?|ict|icu|ent|ob\/gyn)\b/gi, (m) => m.toUpperCase()));
function pc5HcTitle(t) {
  let s = String(t || "")
    .replace(/^[A-Z]\.\s+/, "")
    .replace(/^Department:\s*/i, "")
    .replace(/^Conditions\s*[–-]\s*/i, "");
  const p = s.split(/\s+—\s+/);
  if (p.length > 1) s = /healthcare professionals$/i.test(p[0]) ? p.slice(1).join(" — ") : p[0];
  return pc5Sent(s.trim());
}
/* every workbook carries this methodology note; the pages and PDFs repeat it */
const PC5_MODEL_NOTE = "Profile distributions are modelled estimates for planning and feasibility, built from public demographic and market patterns. They are not a count of individual panel members; feasibility for your exact audience is confirmed for each project.";
const pc5HcBook = (seg, slug) =>
  fetch(`/data/panel-books/hc/${seg}/${slug}.json`)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);

export { PC5_CAT, PC5_Flag, PC5_HC_SEG, PC5_I, PC5_KINDS, PC5_MODEL_NOTE, PC5_P, pc5Cat, pc5FlagUrl, pc5Flags, pc5HcBook, pc5HcTitle, pc5Hex, pc5Meta, pc5Mix, pc5N, pc5Num, pc5Pal, pc5Pct, pc5Rgb, pc5SecIc, pc5Title, pc5UseFlags, pc5Whole };
