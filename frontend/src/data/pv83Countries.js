/*
 * Build 83: the panel countries for the page-video studio (components/site/PageVideo83.jsx).
 * One row per country: ISO code, name, page slug, region, its flag colours (used as the design's palette), the pattern
 * that gives the design its local look (data/pv83Looks.js PV83_MOTIFS), a greeting in a local language, three cities
 * for the moving "city ticker" and the music scale of the animated video.
 * Which panels each country has comes from public/data/panel-books/index.json (b2c, b2b, hcp/caregivers/patients).
 * Prefix PV83_ / pv83.
 */
const C = (iso, name, slug, region, flag, motif, hello, cities, scale) => ({ iso, name, slug, region, flag, motif, hello, cities, scale });

const PV83_COUNTRIES = [
  C("AE", "United Arab Emirates", "united-arab-emirates", "Middle East & Africa", ["#00732F", "#FFFFFF", "#000000", "#FF0000"], "girih", "Marhaba", ["Dubai", "Abu Dhabi", "Sharjah"], "hijaz"),
  C("AR", "Argentina", "argentina", "South America", ["#74ACDF", "#FFFFFF", "#F6B40E"], "andean", "Hola", ["Buenos Aires", "Córdoba", "Rosario"], "minor"),
  C("AT", "Austria", "austria", "Europe", ["#ED2939", "#FFFFFF", "#ED2939"], "bauhaus", "Servus", ["Vienna", "Graz", "Salzburg"], "major"),
  C("AU", "Australia", "australia", "Asia-Pacific", ["#012169", "#FFFFFF", "#E4002B"], "dots", "G'day", ["Sydney", "Melbourne", "Brisbane"], "major"),
  C("BE", "Belgium", "belgium", "Europe", ["#000000", "#FDDA24", "#EF3340"], "nouveau", "Bonjour · Hallo", ["Brussels", "Antwerp", "Ghent"], "major"),
  C("BG", "Bulgaria", "bulgaria", "Europe", ["#FFFFFF", "#00966E", "#D62612"], "folk", "Zdravei", ["Sofia", "Plovdiv", "Varna"], "minor"),
  C("BR", "Brazil", "brazil", "South America", ["#009C3B", "#FFDF00", "#002776"], "carnival", "Olá", ["São Paulo", "Rio de Janeiro", "Brasília"], "lydian"),
  C("CA", "Canada", "canada", "North America", ["#FF0000", "#FFFFFF", "#FF0000"], "maple", "Hello · Bonjour", ["Toronto", "Vancouver", "Montréal"], "major"),
  C("CH", "Switzerland", "switzerland", "Europe", ["#DA291C", "#FFFFFF", "#DA291C"], "swiss", "Grüezi", ["Zürich", "Geneva", "Basel"], "major"),
  C("CL", "Chile", "chile", "South America", ["#0039A6", "#FFFFFF", "#D52B1E"], "andean", "Hola", ["Santiago", "Valparaíso", "Concepción"], "minor"),
  C("CN", "China", "china", "Asia-Pacific", ["#DE2910", "#FFDE00", "#DE2910"], "lattice", "Nǐ hǎo", ["Shanghai", "Beijing", "Shenzhen"], "penta"),
  C("CO", "Colombia", "colombia", "South America", ["#FCD116", "#003893", "#CE1126"], "papel", "Hola", ["Bogotá", "Medellín", "Cali"], "lydian"),
  C("CR", "Costa Rica", "costa-rica", "North America", ["#002B7F", "#FFFFFF", "#CE1126"], "papel", "¡Pura vida!", ["San José", "Alajuela", "Cartago"], "major"),
  C("CZ", "Czech Republic", "czech-republic", "Europe", ["#FFFFFF", "#D7141A", "#11457E"], "folk", "Ahoj", ["Prague", "Brno", "Ostrava"], "minor"),
  C("DE", "Germany", "germany", "Europe", ["#000000", "#DD0000", "#FFCE00"], "bauhaus", "Hallo", ["Berlin", "Munich", "Hamburg"], "major"),
  C("DK", "Denmark", "denmark", "Europe", ["#C8102E", "#FFFFFF", "#C8102E"], "aurora", "Hej", ["Copenhagen", "Aarhus", "Odense"], "major"),
  C("DZ", "Algeria", "algeria", "Middle East & Africa", ["#006233", "#FFFFFF", "#D21034"], "girih", "Salam", ["Algiers", "Oran", "Constantine"], "hijaz"),
  C("EG", "Egypt", "egypt", "Middle East & Africa", ["#CE1126", "#FFFFFF", "#000000", "#C09300"], "papyrus", "Ahlan", ["Cairo", "Alexandria", "Giza"], "hijaz"),
  C("ES", "Spain", "spain", "Europe", ["#AA151B", "#F1BF00", "#AA151B"], "azulejo", "¡Hola!", ["Madrid", "Barcelona", "Valencia"], "phryg"),
  C("FR", "France", "france", "Europe", ["#002654", "#FFFFFF", "#ED2939"], "nouveau", "Bonjour", ["Paris", "Lyon", "Marseille"], "major"),
  C("GB", "United Kingdom", "united-kingdom", "Europe", ["#012169", "#FFFFFF", "#C8102E"], "tartan", "Hello", ["London", "Manchester", "Edinburgh"], "major"),
  C("HK", "Hong Kong", "hong-kong", "Asia-Pacific", ["#DE2910", "#FFFFFF", "#DE2910"], "lattice", "Néih hóu", ["Kowloon", "Central", "Sha Tin"], "penta"),
  C("ID", "Indonesia", "indonesia", "Asia-Pacific", ["#FF0000", "#FFFFFF", "#FF0000"], "batik", "Halo", ["Jakarta", "Surabaya", "Bandung"], "pelog"),
  C("IE", "Ireland", "ireland", "Europe", ["#169B62", "#FFFFFF", "#FF883E"], "tartan", "Dia duit", ["Dublin", "Cork", "Galway"], "dorian"),
  C("IL", "Israel", "israel", "Middle East & Africa", ["#0038B8", "#FFFFFF", "#0038B8"], "hexgrid", "Shalom", ["Tel Aviv", "Jerusalem", "Haifa"], "hijaz"),
  C("IN", "India", "india", "Asia-Pacific", ["#FF9933", "#FFFFFF", "#138808", "#000080"], "mandala", "Namaste", ["Mumbai", "Delhi", "Bengaluru"], "raga"),
  C("IR", "Iran", "iran", "Middle East & Africa", ["#239F40", "#FFFFFF", "#DA0000"], "girih", "Salaam", ["Tehran", "Isfahan", "Shiraz"], "hijaz"),
  C("IT", "Italy", "italy", "Europe", ["#009246", "#FFFFFF", "#CE2B37"], "mosaic", "Ciao", ["Rome", "Milan", "Naples"], "major"),
  C("JP", "Japan", "japan", "Asia-Pacific", ["#FFFFFF", "#BC002D", "#FFFFFF"], "seigaiha", "Konnichiwa", ["Tokyo", "Osaka", "Kyoto"], "insen"),
  C("KE", "Kenya", "kenya", "Middle East & Africa", ["#000000", "#BB0000", "#006600"], "kente", "Jambo", ["Nairobi", "Mombasa", "Kisumu"], "penta"),
  C("KH", "Cambodia", "cambodia", "Asia-Pacific", ["#032EA1", "#E00025", "#032EA1"], "temple", "Suosdei", ["Phnom Penh", "Siem Reap", "Battambang"], "penta"),
  C("KR", "South Korea", "south-korea", "Asia-Pacific", ["#FFFFFF", "#CD2E3A", "#0047A0", "#000000"], "dancheong", "Annyeong", ["Seoul", "Busan", "Incheon"], "penta"),
  C("KW", "Kuwait", "kuwait", "Middle East & Africa", ["#007A3D", "#FFFFFF", "#CE1126", "#000000"], "girih", "Marhaba", ["Kuwait City", "Hawalli", "Salmiya"], "hijaz"),
  C("MX", "Mexico", "mexico", "North America", ["#006847", "#FFFFFF", "#CE1126"], "papel", "¡Hola!", ["Mexico City", "Guadalajara", "Monterrey"], "lydian"),
  C("MY", "Malaysia", "malaysia", "Asia-Pacific", ["#010066", "#CC0001", "#FFCC00"], "batik", "Selamat datang", ["Kuala Lumpur", "Penang", "Johor Bahru"], "pelog"),
  C("NG", "Nigeria", "nigeria", "Middle East & Africa", ["#008751", "#FFFFFF", "#008751"], "kente", "Bawo", ["Lagos", "Abuja", "Kano"], "penta"),
  C("NL", "Netherlands", "netherlands", "Europe", ["#AE1C28", "#FFFFFF", "#21468B"], "bauhaus", "Hallo", ["Amsterdam", "Rotterdam", "Utrecht"], "major"),
  C("NO", "Norway", "norway", "Europe", ["#BA0C2F", "#FFFFFF", "#00205B"], "aurora", "Hei", ["Oslo", "Bergen", "Trondheim"], "dorian"),
  C("NZ", "New Zealand", "new-zealand", "Asia-Pacific", ["#00247D", "#FFFFFF", "#CC142B"], "koru", "Kia ora", ["Auckland", "Wellington", "Christchurch"], "major"),
  C("PE", "Peru", "peru", "South America", ["#D91023", "#FFFFFF", "#D91023"], "andean", "Hola", ["Lima", "Cusco", "Arequipa"], "penta"),
  C("PH", "Philippines", "philippines", "Asia-Pacific", ["#0038A8", "#CE1126", "#FCD116"], "batik", "Mabuhay", ["Manila", "Cebu", "Davao"], "major"),
  C("PL", "Poland", "poland", "Europe", ["#FFFFFF", "#DC143C", "#FFFFFF"], "folk", "Cześć", ["Warsaw", "Kraków", "Wrocław"], "minor"),
  C("PT", "Portugal", "portugal", "Europe", ["#006600", "#FF0000", "#FFCC00"], "azulejo", "Olá", ["Lisbon", "Porto", "Braga"], "phryg"),
  C("QA", "Qatar", "qatar", "Middle East & Africa", ["#8A1538", "#FFFFFF", "#8A1538"], "girih", "Marhaba", ["Doha", "Al Rayyan", "Al Wakrah"], "hijaz"),
  C("RO", "Romania", "romania", "Europe", ["#002B7F", "#FCD116", "#CE1126"], "folk", "Bună", ["Bucharest", "Cluj-Napoca", "Timișoara"], "minor"),
  C("RU", "Russia", "russia", "Europe", ["#FFFFFF", "#0039A6", "#D52B1E"], "folk", "Privet", ["Moscow", "Saint Petersburg", "Kazan"], "minor"),
  C("SA", "Saudi Arabia", "saudi-arabia", "Middle East & Africa", ["#006C35", "#FFFFFF", "#006C35"], "girih", "Ahlan", ["Riyadh", "Jeddah", "Dammam"], "hijaz"),
  C("SE", "Sweden", "sweden", "Europe", ["#006AA7", "#FECC00", "#006AA7"], "aurora", "Hej", ["Stockholm", "Gothenburg", "Malmö"], "dorian"),
  C("SG", "Singapore", "singapore", "Asia-Pacific", ["#EF3340", "#FFFFFF", "#EF3340"], "hexgrid", "Hello · Selamat", ["Marina Bay", "Orchard", "Jurong"], "penta"),
  C("TH", "Thailand", "thailand", "Asia-Pacific", ["#A51931", "#F4F5F8", "#2D2A4A"], "temple", "Sawasdee", ["Bangkok", "Chiang Mai", "Phuket"], "penta"),
  C("TR", "Turkey", "turkey", "Middle East & Africa", ["#E30A17", "#FFFFFF", "#E30A17"], "iznik", "Merhaba", ["Istanbul", "Ankara", "Izmir"], "hijaz"),
  C("TW", "Taiwan", "taiwan", "Asia-Pacific", ["#FE0000", "#000095", "#FFFFFF"], "lattice", "Nǐ hǎo", ["Taipei", "Kaohsiung", "Taichung"], "penta"),
  C("UA", "Ukraine", "ukraine", "Europe", ["#0057B7", "#FFD700", "#0057B7"], "folk", "Pryvit", ["Kyiv", "Lviv", "Odesa"], "minor"),
  C("US", "United States", "united-states", "North America", ["#B22234", "#FFFFFF", "#3C3B6E"], "stars", "Hello", ["New York", "Los Angeles", "Chicago"], "major"),
  C("VN", "Vietnam", "vietnam", "Asia-Pacific", ["#DA251D", "#FFFF00", "#DA251D"], "temple", "Xin chào", ["Ho Chi Minh City", "Hanoi", "Da Nang"], "penta"),
  C("ZA", "South Africa", "south-africa", "Middle East & Africa", ["#007A4D", "#FFB612", "#DE3831", "#002395"], "kente", "Sawubona", ["Johannesburg", "Cape Town", "Durban"], "major"),
];

/* which panels each country has (from public/data/panel-books/index.json) */
const PV83_PANEL_HAS = {
  b2c: "AE AR AT AU BE BG BR CA CH CL CN CO CR CZ DE DK DZ EG ES FR GB HK ID IE IL IN IR IT JP KE KH KR KW MX MY NG NL NO NZ PE PH PL PT QA RO RU SA SE SG TH TW UA US VN ZA".split(" "),
  b2b: "AE AR AT AU BE BG BR CA CH CL CN CO CR CZ DE DK DZ EG ES FR GB HK ID IE IL IN IR IT JP KE KH KR KW MX MY NG NL NO NZ PE PH PL PT QA RO RU SA SE SG TH TW UA US VN ZA".split(" "),
  hc: "AE AR AT BE BR CA CH CN CO DE DK EG ES FR GB ID IE IN IT JP KR MX MY NG NL NO PH PL PT RO RU SA SE SG TR US VN ZA".split(" "),
};
/* the three panel kinds: download section, label, who, icons and the frame they use */
const PV83_PANELS = {
  b2c: { sec: "consumer-panel-books", label: "Consumer panel", who: "consumers", verb: "Reach real", em: "consumers", icons: ["ShoppingBag", "Smartphone", "Heart", "Store"], cta: "Request a quote" },
  b2b: { sec: "business-panel-books", label: "Business panel", who: "business professionals", verb: "Reach decision", em: "makers", icons: ["Briefcase", "Building2", "Handshake", "ChartLine"], cta: "Request a quote" },
  hc: { sec: "healthcare-panel-books", label: "Healthcare panel", who: "healthcare professionals, caregivers and patients", verb: "Hear every voice", em: "in care", icons: ["Stethoscope", "HeartPulse", "Pill", "Hospital"], cta: "Request a quote" },
};
const PV83_BY_ISO = Object.fromEntries(PV83_COUNTRIES.map((c) => [c.iso, c]));
const PV83_BY_SLUG = Object.fromEntries(PV83_COUNTRIES.map((c) => [c.slug, c]));

export { PV83_BY_ISO, PV83_BY_SLUG, PV83_COUNTRIES, PV83_PANELS, PV83_PANEL_HAS };
