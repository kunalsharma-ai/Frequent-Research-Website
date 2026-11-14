import { cmsGet, cmsListApply } from '../cms.jsx';
import { AEROSPACE_CASES_MODULE, AGRICULTURE_CASES_MODULE, AUTOMOTIVE_CASES_MODULE, CHEMICAL_CASES_MODULE, CONSTRUCTION_CASES_MODULE, DEFENSE_CASES_MODULE, ELECTRIC_POWER_CASES_MODULE, ELECTRONICS_CASES_MODULE, ENERGY_CASES_MODULE, FASHION_CASES_MODULE, FISHING_CASES_MODULE, FLORAL_CASES_MODULE, FOOD_CASES_MODULE, GOVERNMENT_CASES_MODULE, HORTICULTURE_CASES_MODULE, HOSPITALITY_CASES_MODULE, INDUSTRIAL_ROBOTS_CASES_MODULE, INFORMATION_SERVICES_CASES_MODULE, INTERNET_SERVICES_CASES_MODULE, IT_CASES_MODULE, MANUFACTURING_CASES_MODULE, MEAT_CASES_MODULE, MINING_CASES_MODULE, PETROLEUM_OIL_GAS_CASES_MODULE, PHARMACEUTICAL_CASES_MODULE, PULP_AND_PAPER_CASES_MODULE, RETAIL_CASES_MODULE, SEMICONDUCTOR_CASES_MODULE, SHIPBUILDING_CASES_MODULE, SOFTWARE_CASES_MODULE, STEEL_CASES_MODULE, TELECOMMUNICATIONS_CASES_MODULE, TEXTILE_CASES_MODULE, TOBACCO_CASES_MODULE, WATER_CASES_MODULE, WOOD_CASES_MODULE } from '../data/caseTrackers.jsx';
import { FRX_CASES } from '../../data/CasesExtra4.jsx';

const SHOW_ALL_CASES = true,
  CASE_FILES = Object.assign({
    "./cases/aerospace.js": () => Promise.resolve(AEROSPACE_CASES_MODULE),
    "./cases/agriculture.js": () => Promise.resolve(AGRICULTURE_CASES_MODULE),
    "./cases/automotive.js": () => Promise.resolve(AUTOMOTIVE_CASES_MODULE),
    "./cases/chemical.js": () => Promise.resolve(CHEMICAL_CASES_MODULE),
    "./cases/construction.js": () => Promise.resolve(CONSTRUCTION_CASES_MODULE),
    "./cases/defense.js": () => Promise.resolve(DEFENSE_CASES_MODULE),
    "./cases/electric-power.js": () => Promise.resolve(ELECTRIC_POWER_CASES_MODULE),
    "./cases/electronics.js": () => Promise.resolve(ELECTRONICS_CASES_MODULE),
    "./cases/energy.js": () => Promise.resolve(ENERGY_CASES_MODULE),
    "./cases/fashion.js": () => Promise.resolve(FASHION_CASES_MODULE),
    "./cases/fishing.js": () => Promise.resolve(FISHING_CASES_MODULE),
    "./cases/floral.js": () => Promise.resolve(FLORAL_CASES_MODULE),
    "./cases/food.js": () => Promise.resolve(FOOD_CASES_MODULE),
    "./cases/government.js": () => Promise.resolve(GOVERNMENT_CASES_MODULE),
    "./cases/horticulture.js": () => Promise.resolve(HORTICULTURE_CASES_MODULE),
    "./cases/hospitality.js": () => Promise.resolve(HOSPITALITY_CASES_MODULE),
    "./cases/industrial-robots.js": () => Promise.resolve(INDUSTRIAL_ROBOTS_CASES_MODULE),
    "./cases/information-services.js": () => Promise.resolve(INFORMATION_SERVICES_CASES_MODULE),
    "./cases/internet-services.js": () => Promise.resolve(INTERNET_SERVICES_CASES_MODULE),
    "./cases/it.js": () => Promise.resolve(IT_CASES_MODULE),
    "./cases/manufacturing.js": () => Promise.resolve(MANUFACTURING_CASES_MODULE),
    "./cases/meat.js": () => Promise.resolve(MEAT_CASES_MODULE),
    "./cases/mining.js": () => Promise.resolve(MINING_CASES_MODULE),
    "./cases/petroleum-oil-gas.js": () => Promise.resolve(PETROLEUM_OIL_GAS_CASES_MODULE),
    "./cases/pharmaceutical.js": () => Promise.resolve(PHARMACEUTICAL_CASES_MODULE),
    "./cases/pulp-and-paper.js": () => Promise.resolve(PULP_AND_PAPER_CASES_MODULE),
    "./cases/retail.js": () => Promise.resolve(RETAIL_CASES_MODULE),
    "./cases/semiconductor.js": () => Promise.resolve(SEMICONDUCTOR_CASES_MODULE),
    "./cases/shipbuilding.js": () => Promise.resolve(SHIPBUILDING_CASES_MODULE),
    "./cases/software.js": () => Promise.resolve(SOFTWARE_CASES_MODULE),
    "./cases/steel.js": () => Promise.resolve(STEEL_CASES_MODULE),
    "./cases/telecommunications.js": () => Promise.resolve(TELECOMMUNICATIONS_CASES_MODULE),
    "./cases/textile.js": () => Promise.resolve(TEXTILE_CASES_MODULE),
    "./cases/tobacco.js": () => Promise.resolve(TOBACCO_CASES_MODULE),
    "./cases/water.js": () => Promise.resolve(WATER_CASES_MODULE),
    "./cases/wood.js": () => Promise.resolve(WOOD_CASES_MODULE),
    "./cases/advertising.js": () =>
      Promise.resolve({
        default: FRX_CASES["advertising"] || [],
      }),
    "./cases/arms.js": () =>
      Promise.resolve({
        default: FRX_CASES["arms"] || [],
      }),
    "./cases/broadcasting.js": () =>
      Promise.resolve({
        default: FRX_CASES["broadcasting"] || [],
      }),
    "./cases/creative-services.js": () =>
      Promise.resolve({
        default: FRX_CASES["creative-services"] || [],
      }),
    "./cases/cultural.js": () =>
      Promise.resolve({
        default: FRX_CASES["cultural"] || [],
      }),
    "./cases/education.js": () =>
      Promise.resolve({
        default: FRX_CASES["education"] || [],
      }),
    "./cases/entertainment.js": () =>
      Promise.resolve({
        default: FRX_CASES["entertainment"] || [],
      }),
    "./cases/film.js": () =>
      Promise.resolve({
        default: FRX_CASES["film"] || [],
      }),
    "./cases/financial-services.js": () =>
      Promise.resolve({
        default: FRX_CASES["financial-services"] || [],
      }),
    "./cases/gambling.js": () =>
      Promise.resolve({
        default: FRX_CASES["gambling"] || [],
      }),
    "./cases/healthcare.js": () =>
      Promise.resolve({
        default: FRX_CASES["healthcare"] || [],
      }),
    "./cases/insurance.js": () =>
      Promise.resolve({
        default: FRX_CASES["insurance"] || [],
      }),
    "./cases/leisure.js": () =>
      Promise.resolve({
        default: FRX_CASES["leisure"] || [],
      }),
    "./cases/mass-media.js": () =>
      Promise.resolve({
        default: FRX_CASES["mass-media"] || [],
      }),
    "./cases/music.js": () =>
      Promise.resolve({
        default: FRX_CASES["music"] || [],
      }),
    "./cases/news-media.js": () =>
      Promise.resolve({
        default: FRX_CASES["news-media"] || [],
      }),
    "./cases/professional-services.js": () =>
      Promise.resolve({
        default: FRX_CASES["professional-services"] || [],
      }),
    "./cases/publishing.js": () =>
      Promise.resolve({
        default: FRX_CASES["publishing"] || [],
      }),
    "./cases/real-estate.js": () =>
      Promise.resolve({
        default: FRX_CASES["real-estate"] || [],
      }),
    "./cases/sport.js": () =>
      Promise.resolve({
        default: FRX_CASES["sport"] || [],
      }),
    "./cases/transport.js": () =>
      Promise.resolve({
        default: FRX_CASES["transport"] || [],
      }),
    "./cases/video-games.js": () =>
      Promise.resolve({
        default: FRX_CASES["video-games"] || [],
      }),
  }),
  caseFile = (t) => `./cases/${t}.js`,
  hasCases = (t) => !!CASE_FILES[caseFile(t)];
async function loadCases(t) {
  const e = CASE_FILES[caseFile(t)];
  /* build 78: case studies changed, hidden or added in Admin › Case studies (cases[industry]) */
  const cms = cmsGet("cases", {}) || {};
  if (!e && !(cms[t] && cms[t].add && cms[t].add.length)) return [];
  return true
    ? cmsListApply(cms[t], e ? (await e()).default || [] : [], "slug")
        .map((n) => {
          var s;
          return {
            ...n,
            markets: (s = n.markets) != null && s.length ? n.markets : ["IN"],
          };
        })
        .filter((n) => SHOW_ALL_CASES)
    : [];
}
const CASE_COUNTRIES = {
    US: {
      name: "United States",
      iso: "US",
      region: "Americas",
    },
    CA: {
      name: "Canada",
      iso: "CA",
      region: "Americas",
    },
    UK: {
      name: "United Kingdom",
      iso: "GB",
      region: "Europe",
    },
    FR: {
      name: "France",
      iso: "FR",
      region: "Europe",
    },
    DE: {
      name: "Germany",
      iso: "DE",
      region: "Europe",
    },
    IT: {
      name: "Italy",
      iso: "IT",
      region: "Europe",
    },
    ES: {
      name: "Spain",
      iso: "ES",
      region: "Europe",
    },
    CH: {
      name: "Switzerland",
      iso: "CH",
      region: "Europe",
    },
    IN: {
      name: "India",
      iso: "IN",
      region: "India",
    },
    AU: {
      name: "Australia",
      iso: "AU",
      region: "Asia-Pacific",
    },
    NZ: {
      name: "New Zealand",
      iso: "NZ",
      region: "Asia-Pacific",
    },
    JP: {
      name: "Japan",
      iso: "JP",
      region: "Asia-Pacific",
    },
    TW: {
      name: "Taiwan",
      iso: "TW",
      region: "Asia-Pacific",
    },
    HK: {
      name: "Hong Kong",
      iso: "HK",
      region: "Asia-Pacific",
    },
    MY: {
      name: "Malaysia",
      iso: "MY",
      region: "Asia-Pacific",
    },
    ID: {
      name: "Indonesia",
      iso: "ID",
      region: "Asia-Pacific",
    },
    AE: {
      name: "United Arab Emirates",
      iso: "AE",
      region: "MENA",
    },
    SA: {
      name: "Saudi Arabia",
      iso: "SA",
      region: "MENA",
    },
    QA: {
      name: "Qatar",
      iso: "QA",
      region: "MENA",
    },
    EG: {
      name: "Egypt",
      iso: "EG",
      region: "MENA",
    },
    MA: {
      name: "Morocco",
      iso: "MA",
      region: "MENA",
    },
    ZA: {
      name: "South Africa",
      iso: "ZA",
      region: "Africa",
    },
  },
  countryName = (t) => {
    var e;
    return ((e = CASE_COUNTRIES[t]) == null ? undefined : e.name) || t;
  };

// build 78: the case studies the site ships with, for Admin › Case studies
const loadBuiltinCases = async (t) => { const e = CASE_FILES[caseFile(t)]; return e ? (await e()).default || [] : []; };
export { countryName, hasCases, loadBuiltinCases, loadCases };
