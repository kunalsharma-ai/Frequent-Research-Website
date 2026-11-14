import * as ee from 'react';
import { RG_FLAGS } from '../data/maps.jsx';

const RG_REGIONS = [
  {
    k: "apac",
    t: "APAC",
    full: "Asia-Pacific",
    c: "#6EE0CE",
    list: [
      ["au", "Australia"],
      ["in", "India"],
      ["nz", "New Zealand"],
      ["sg", "Singapore"],
      ["cn", "China"],
      ["tw", "Taiwan"],
      ["jp", "Japan"],
      ["hk", "Hong Kong"],
      ["my", "Malaysia"],
      ["kr", "South Korea"],
      ["id", "Indonesia"],
      ["vn", "Vietnam"],
      ["kh", "Cambodia"],
      ["ph", "Philippines"],
      ["th", "Thailand"],
    ],
  },
  {
    k: "europe",
    t: "Europe",
    full: "Europe",
    c: "#A8B6FF",
    list: [
      ["at", "Austria"],
      ["ch", "Switzerland"],
      ["de", "Germany"],
      ["bg", "Bulgaria"],
      ["gb", "United Kingdom"],
      ["fr", "France"],
      ["it", "Italy"],
      ["ie", "Ireland"],
      ["no", "Norway"],
      ["es", "Spain"],
      ["dk", "Denmark"],
      ["pl", "Poland"],
      ["nl", "Netherlands"],
      ["se", "Sweden"],
      ["ru", "Russia"],
      ["be", "Belgium"],
      ["ro", "Romania"],
      ["cz", "Czech Republic"],
      ["pt", "Portugal"],
      ["ua", "Ukraine"],
    ],
  },
  {
    k: "mena",
    t: "MENA & Africa",
    full: "Middle East, North Africa & Africa",
    c: "#F0D98F",
    sub: {
      MENA: ["dz", "eg", "ir", "il", "kw", "qa", "sa", "ae"],
      Africa: ["ng", "za", "ke"],
    },
    list: [
      ["dz", "Algeria"],
      ["eg", "Egypt"],
      ["ir", "Iran"],
      ["il", "Israel"],
      ["kw", "Kuwait"],
      ["qa", "Qatar"],
      ["sa", "Saudi Arabia"],
      ["ae", "United Arab Emirates"],
      ["ng", "Nigeria"],
      ["za", "South Africa"],
      ["ke", "Kenya"],
    ],
  },
  {
    k: "na",
    t: "North America",
    full: "North America",
    c: "#5B8CFF",
    list: [
      ["us", "United States"],
      ["ca", "Canada"],
      ["mx", "Mexico"],
      ["cr", "Costa Rica"],
    ],
  },
  {
    k: "sa",
    t: "South America",
    full: "South America",
    c: "#2FC4A8",
    list: [
      ["br", "Brazil"],
      ["co", "Colombia"],
      ["ar", "Argentina"],
      ["pe", "Peru"],
      ["cl", "Chile"],
    ],
  },
];
const RG_TOTAL = RG_REGIONS.reduce((n, r) => n + r.list.length, 0);
const RG_NAME = Object.fromEntries(
  RG_REGIONS.flatMap((r) =>
    r.list.map(([c, n]) => [
      c,
      {
        n,
        r,
      },
    ]),
  ),
);
function RG_Flag({ c, size = "md" }) {
  return (
    <img
      className={"rg-flag rg-flag--" + size}
      src={RG_FLAGS[c]}
      alt=""
      width="40"
      height="30"
      loading="lazy"
      decoding="async"
    />
  );
}

export { RG_Flag, RG_REGIONS, RG_TOTAL };
