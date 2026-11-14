import * as ee from 'react';
import { GPX, GP_B, GP_T, GVP, gpB, gpBs, gpC, gpF, gpN } from '../data/government.jsx';
import { RC_useInView } from '../shared/Reveal.jsx';
import { GX_Page } from './GXPage.jsx';

import { GOV_SERVICES, GOV_STATS } from '../data/govFacts.jsx';
function GovernmentPage() {
  return <GX_Page />;
}
function GP_Bars({ rows, T, hi = [], unit = "count", max, sort, suffix = "%" }) {
  const [ref, v] = RC_useInView(0.25);
  const list = sort ? [...rows].sort((a, b) => b[1] - a[1]) : rows;
  const top = max || Math.max(...list.map((r) => r[1]));
  return (
    <ul ref={ref} className={"gp-bars" + (v ? " is-in" : "")}>
      {list.map(([lab, p], i) => (
        <li
          key={lab}
          className={hi.includes(lab) ? "is-hi" : ""}
          style={{
            "--w": (p / top) * 100 + "%",
            "--i": i,
          }}
        >
          <span className="gp-bars__l">{lab}</span>
          <span className="gp-bars__t">
            <i />
          </span>
          <span className="gp-bars__v">
            <b>
              {p}
              {suffix}
            </b>
            {unit === "count" && T ? <small>{gpN(p, T)}</small> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
function GP_Cols({ rows, T, hi = [] }) {
  const [ref, v] = RC_useInView(0.25);
  const top = Math.max(...rows.map((r) => r[1]));
  return (
    <div ref={ref} className={"gp-cols" + (v ? " is-in" : "")} role="list">
      {rows.map(([lab, p], i) => (
        <div
          key={lab}
          role="listitem"
          className={"gp-cols__c" + (hi.includes(lab) ? " is-hi" : "")}
          style={{
            "--h": (p / top) * 100 + "%",
            "--i": i,
          }}
        >
          <b>{p}%</b>
          <span className="gp-cols__bar">
            <i />
          </span>
          <span className="gp-cols__l">{lab}</span>
          {T && <small>{gpN(p, T)}</small>}
        </div>
      ))}
    </div>
  );
}
const GP_AREAS = [
  {
    t: "Government Surveys",
    ic: "flag",
    tiles: [
      ["17", "States & UTs with field teams", "149 districts"],
      [gpN(100), "Citizen panel members", "B2C \xB7 profiled"],
      [gpF(GP_B), "B2B & public-sector panel", "Profiled professionals"],
      ["36", "States & UTs with panel members", "Online reach"],
    ],
    ins: [
      "Field teams cover 17 states & UTs and 149 districts; online panel members sit in all 36 states and union territories.",
      `Together the citizen and B2B panels hold ${gpF(GP_T + GP_B)} profiled members.`,
    ],
  },
  {
    t: "Opinion Polls",
    ic: "pie",
    tiles: [
      [gpN(GPX.adult), "Voting-age members (18+)", GPX.adult + "% of citizen panel"],
      [gpN(GPX.men), "Men", GPX.men + "%"],
      [gpN(GPX.women), "Women", GPX.women + "%"],
      [gpN(GPX.y1829), "Aged 18\u201329", GPX.y1829 + "%"],
      [gpN(GPX.a50), "Aged 50+", GPX.a50 + "%"],
    ],
    ins: [
      `Only ${GPX.teen}% of members are under 18, so adult-only polls keep ${GPX.adult}% of the panel.`,
      "Age, gender, education and region are profiled in advance, so quotas and weights are set before fieldwork starts.",
    ],
  },
  {
    t: "Citizen Research",
    ic: "users",
    tiles: [
      [gpN(GPX.rent), "Rent their home", GPX.rent + "%"],
      [gpN(GPX.own), "Own their home", GPX.own + "%"],
      [gpN(GPX.fam), "Live with family", GPX.fam + "%"],
      [gpN(GPX.single), "Unmarried / single", GPX.single + "%"],
      [gpN(GPX.married), "Married", GPX.married + "%"],
    ],
    ins: [
      `Renters (${GPX.rent}%) outnumber home owners (${GPX.own}%) by more than two to one \u2014 useful for housing and civic-service research.`,
      `${GPX.apart}% of members are divorced, widowed or separated (${gpN(GPX.apart)}).`,
    ],
  },
  {
    t: "Household Surveys",
    ic: "grid",
    tiles: [
      [gpN(GPX.hh5), "Households under \u20B95 lakh a year", GPX.hh5 + "%"],
      [gpN(GPX.hhMid), "Households \u20B95\u201315 lakh", GPX.hhMid + "%"],
      [gpN(GPX.hh20), "Households \u20B920 lakh+", GPX.hh20 + "%"],
      [
        gpN(gpC("family", "Family household decision makers")),
        "Household decision makers",
        gpC("family", "Family household decision makers") + "%",
      ],
      [
        gpN(gpC("family", "Household budget managers")),
        "Household budget managers",
        gpC("family", "Household budget managers") + "%",
      ],
    ],
    ins: [
      `Nearly half of member households (${GPX.hhMid}%) earn \u20B95\u201315 lakh a year \u2014 the panel's core income band.`,
      `One in four (${GPX.hh5}%) earns under \u20B95 lakh, giving depth among lower-income households.`,
    ],
  },
  {
    t: "Public Health",
    ic: "shield",
    tiles: [
      [
        gpN(gpC("health", "People with disabilities")),
        "People with disabilities",
        gpC("health", "People with disabilities") + "%",
      ],
      [
        gpN(gpC("health", "Patients with chronic conditions")),
        "Patients with chronic conditions",
        gpC("health", "Patients with chronic conditions") + "%",
      ],
      [
        gpN(gpC("health", "Caregivers & family caregivers")),
        "Caregivers",
        gpC("health", "Caregivers & family caregivers") + "%",
      ],
      [
        gpN(gpC("health", "Senior healthcare consumers")),
        "Senior healthcare consumers",
        gpC("health", "Senior healthcare consumers") + "%",
      ],
      [
        gpN(gpC("health", "Telehealth & digital health users")),
        "Telehealth users",
        gpC("health", "Telehealth & digital health users") + "%",
      ],
    ],
    ins: [
      `Caregivers (${gpC("health", "Caregivers & family caregivers")}%) and chronic patients (${gpC("health", "Patients with chronic conditions")}%) are both profiled, so studies hear both sides of care.`,
      `Among health & social-welfare officials, public health officers and health programme managers are ${gpB("health", "Public Health Officer")}% each.`,
    ],
  },
  {
    t: "Education",
    ic: "award",
    tiles: [
      [gpN(GPX.student), "Students", GPX.student + "%"],
      [
        gpN(gpC("family", "Parents of school-age children (6\u201312)")),
        "Parents of 6\u201312-year-olds",
        gpC("family", "Parents of school-age children (6\u201312)") + "%",
      ],
      [
        gpN(gpC("family", "Parents of teenagers (13\u201317)")),
        "Parents of teenagers",
        gpC("family", "Parents of teenagers (13\u201317)") + "%",
      ],
      [gpN(GPX.stuHome), "Live in student housing", GPX.stuHome + "%"],
      [
        gpBs("edu", ["Education Officer", "School Inspector"]) + "%",
        "Education officers & school inspectors",
        "of education officials",
      ],
    ],
    ins: [
      `Parents of school-age children (${gpC("family", "Parents of school-age children (6\u201312)")}%) and of teenagers (${gpC("family", "Parents of teenagers (13\u201317)")}%) are profiled separately, so primary and secondary education can be studied apart.`,
      `${GPX.teen}% of members are 13\u201317; they take part only with a parent's consent.`,
    ],
  },
  {
    t: "Agriculture",
    ic: "compass",
    tiles: [
      [
        gpB("agrigov", "Agriculture Extension Officer") + "%",
        "Agriculture extension officers",
        "of agri government officials",
      ],
      [
        gpBs("agrigov", ["Agricultural Officer", "District Agriculture Officer", "State Agriculture Officer"]) + "%",
        "Agricultural, district & state officers",
        "of agri government officials",
      ],
      [
        gpBs("coop", ["Cooperative President", "Cooperative Director", "Farmers Association President"]) + "%",
        "Cooperative & farmer-body heads",
        "of cooperative profiles",
      ],
      [gpB("agri", "Rural Development Officer") + "%", "Rural development officers", "of agri & rural officials"],
    ],
    ins: [
      "Extension officers are the largest group of agriculture government officials \u2014 the staff who work most directly with farmers.",
      `Cooperative managers alone are ${gpB("coop", "Cooperative Manager")}% of cooperative profiles. Shares are within each B2B role group.`,
    ],
  },
  {
    t: "Employment",
    ic: "trend",
    tiles: [
      [gpN(GPX.working), "Working members", GPX.working + "%"],
      [gpN(GPX.informal), "Part-time, self-employed or seasonal", GPX.informal + "%"],
      [gpN(GPX.unemp), "Unemployed", GPX.unemp + "%"],
      [gpN(GPX.student), "Students", GPX.student + "%"],
      [gpN(GPX.sme, GP_B), "B2B members in firms under 100 staff", GPX.sme + "% of B2B"],
    ],
    ins: [
      `Part-time, self-employed and seasonal workers (${GPX.informal}%) outnumber full-time employees (${GPX.fulltime}%) by almost two to one.`,
      `${GPX.sme}% of the B2B panel works in firms with fewer than 100 employees \u2014 the MSME segment.`,
    ],
  },
  {
    t: "Consumer Research",
    ic: "tag",
    tiles: [
      [gpN(gpC("fin", "Online banking users")), "Online banking users", gpC("fin", "Online banking users") + "%"],
      [gpN(gpC("fin", "Personal loan holders")), "Personal loan holders", gpC("fin", "Personal loan holders") + "%"],
      [
        gpN(gpC("fin", "Insurance policy holders")),
        "Insurance policy holders",
        gpC("fin", "Insurance policy holders") + "%",
      ],
      [gpN(gpC("fin", "Digital wallet users")), "Digital wallet users", gpC("fin", "Digital wallet users") + "%"],
      [gpN(gpC("fin", "Home loan holders")), "Home loan holders", gpC("fin", "Home loan holders") + "%"],
    ],
    ins: [
      `Online banking (${gpC("fin", "Online banking users")}%) is three times digital-wallet use (${gpC("fin", "Digital wallet users")}%) in the panel.`,
      `Personal-loan holders (${gpC("fin", "Personal loan holders")}%) far outnumber home-loan holders (${gpC("fin", "Home loan holders")}%).`,
    ],
  },
  {
    t: "Rural Research",
    ic: "map",
    tiles: [
      ["17", "States & UTs with field teams", "149 districts"],
      [
        gpBs("civil", ["Sub-Divisional Magistrate", "Tehsildar", "Naib Tehsildar", "Block Development Officer"]) + "%",
        "Tehsil & block officials",
        "of civil-service profiles",
      ],
      [gpB("agri", "Rural Development Officer") + "%", "Rural development officers", "of agri & rural officials"],
      [gpN(GPX.seasonal), "Occasional or seasonal workers", GPX.seasonal + "%"],
    ],
    ins: [
      "Over a quarter of civil-service profiles work at tehsil and block level, where schemes reach villages.",
      "Village-level interviews use local-language field teams across 149 districts in 17 states & UTs.",
    ],
  },
  {
    t: "Urban Research",
    ic: "layers",
    tiles: [
      [gpBs("leaders", ["Mayor", "Deputy Mayor"]) + "%", "Mayors & deputy mayors", "of government-leadership profiles"],
      [gpB("legis", "Councillor") + "%", "Councillors", "of elected representatives"],
      [
        gpN(gpC("mobility", "Fleet vehicle drivers")),
        "Fleet vehicle drivers",
        gpC("mobility", "Fleet vehicle drivers") + "%",
      ],
      [gpN(gpC("mobility", "Electric vehicle owners")), "EV owners", gpC("mobility", "Electric vehicle owners") + "%"],
    ],
    ins: [
      `Councillors are the largest group of elected representatives (${gpB("legis", "Councillor")}%) \u2014 the ward-level voice on civic services.`,
      `${gpN(gpC("mobility", "Fleet vehicle drivers"))} fleet drivers and ${gpN(gpC("mobility", "Commercial vehicle owners"))} commercial-vehicle owners support transport and road-safety research.`,
    ],
  },
  {
    t: "Policy Research",
    ic: "scale",
    tiles: [
      [
        gpBs("policy", ["Policy Analyst", "Strategic Planning Officer", "Research Officer"]) + "%",
        "Analysts, planners & research officers",
        "of policy & planning profiles",
      ],
      [
        gpBs("civil", [
          "Cabinet Secretary",
          "Chief Secretary",
          "Principal Secretary",
          "Additional Chief Secretary",
          "Secretary",
          "Additional Secretary",
          "Joint Secretary",
          "Deputy Secretary",
          "Under Secretary",
          "Assistant Secretary",
        ]) + "%",
        "Secretariat ranks",
        "of civil-service profiles",
      ],
      [gpN(GPX.grad), "Graduates and above", GPX.grad + "%"],
      [gpN(GPX.pg), "Master's, professional or doctoral", GPX.pg + "%"],
    ],
    ins: [
      "Policy analysts, strategic planning officers and research officers make up 60% of policy & planning profiles.",
      `${GPX.pg}% of citizen members hold a master's, professional or doctoral degree \u2014 useful for expert-informed consultations.`,
    ],
  },
  {
    t: "Beneficiary Studies",
    ic: "check",
    tiles: [
      [gpN(GPX.hh5), "Households under \u20B95 lakh", GPX.hh5 + "%"],
      [gpN(GPX.widow), "Widowed or separated", GPX.widow + "%"],
      [gpN(GPX.a65), "Aged 65+", GPX.a65 + "%"],
      [
        gpN(gpC("health", "People with disabilities")),
        "People with disabilities",
        gpC("health", "People with disabilities") + "%",
      ],
      [
        gpN(gpC("family", "Expecting parents") + gpC("family", "New parents")),
        "Expecting & new parents",
        gpC("family", "Expecting parents") + gpC("family", "New parents") + "%",
      ],
    ],
    ins: [
      "Each group is profiled in advance, so beneficiaries can be invited directly instead of being screened out of a general sample.",
      `Social welfare officers (${gpB("health", "Social Welfare Officer")}%) and child development officers (${gpB("health", "Child Development Officer")}%) give the implementers' view.`,
    ],
  },
];
const GP_ROLE_GROUPS = [
  {
    fam: "Government & administration",
    items: [
      {
        k: "civil",
        t: "Civil services",
        ic: "flag",
        grouped: [
          [
            "Tehsil & block (SDM, Tehsildar, Naib Tehsildar, BDO)",
            gpBs("civil", ["Sub-Divisional Magistrate", "Tehsildar", "Naib Tehsildar", "Block Development Officer"]),
          ],
          [
            "Secretariat (Cabinet Secretary to Assistant Secretary)",
            gpBs("civil", [
              "Cabinet Secretary",
              "Chief Secretary",
              "Principal Secretary",
              "Additional Chief Secretary",
              "Secretary",
              "Additional Secretary",
              "Joint Secretary",
              "Deputy Secretary",
              "Under Secretary",
              "Assistant Secretary",
            ]),
          ],
          [
            "Directorates (DG to Assistant Director)",
            gpBs("civil", [
              "Director General",
              "Additional Director General",
              "Director",
              "Deputy Director",
              "Assistant Director",
            ]),
          ],
          [
            "Commissionerates",
            gpBs("civil", ["Commissioner", "Additional Commissioner", "Deputy Commissioner", "Assistant Commissioner"]),
          ],
          [
            "Administrative & public administration officers",
            gpBs("civil", ["Administrative Officer", "Public Administration Officer"]),
          ],
          [
            "Urban local bodies (Municipal Commissioner, EO)",
            gpBs("civil", ["Municipal Commissioner", "Executive Officer"]),
          ],
          ["District heads (Collector, DM)", gpBs("civil", ["District Collector", "District Magistrate"])],
        ],
        ins: "Tehsil and block officials are the largest tier (26%) \u2014 the level where schemes meet citizens.",
      },
      {
        k: "legis",
        t: "Elected representatives",
        ic: "users",
        ins: "Councillors (40%) and MLAs (35%) make up three-quarters of legislator profiles.",
      },
      {
        k: "finrev",
        t: "Finance & revenue",
        ic: "tag",
        ins: "Tax officers \u2014 income tax, GST, customs and excise \u2014 are 48% of finance & revenue profiles.",
      },
      {
        k: "proc",
        t: "Procurement",
        ic: "box",
        ins: "Procurement, purchasing and tender officers are 60% \u2014 the people who run public tenders.",
      },
      {
        k: "policy",
        t: "Policy & planning",
        ic: "scale",
        ins: "Policy analysts, planning officers and research officers are 20% each.",
      },
      {
        k: "legal",
        t: "Legal & regulatory",
        ic: "shield",
        ins: "Compliance (15%) and regulatory affairs officers (12%) lead this group.",
      },
      {
        k: "hr",
        t: "Human resources",
        ic: "user",
        ins: "HR officers (30%) are the largest role; recruitment officers add 20%.",
      },
      {
        k: "citizen",
        t: "Citizen services & PR",
        ic: "msg",
        ins: "PROs and information officers are 40%; grievance officers 10%.",
      },
    ],
  },
  {
    fam: "Sector departments",
    items: [
      {
        k: "it",
        t: "IT & digital",
        ic: "cpu",
        ins: "Cybersecurity and data protection officers together are 22% of government IT profiles.",
      },
      {
        k: "infra",
        t: "Engineering & infrastructure",
        ic: "layers",
        ins: "Assistant engineers are the largest group (20%), followed by project engineers and public works officers (15% each).",
      },
      {
        k: "health",
        t: "Health & social welfare",
        ic: "shield",
        ins: "Social welfare and child development officers are 45% of health & welfare profiles.",
      },
      {
        k: "edu",
        t: "Education",
        ic: "award",
        ins: "Education officers and school inspectors are 45%; academic administrators 30%.",
      },
      {
        k: "agri",
        t: "Agriculture & rural development",
        ic: "compass",
        ins: "Rural development officers (25%) lead, ahead of agriculture officers (20%).",
      },
      {
        k: "agrigov",
        t: "Agriculture administration",
        ic: "flag",
        ins: "Agriculture extension officers are a quarter of this group (25%).",
      },
      {
        k: "coop",
        t: "Cooperatives & farmer bodies",
        ic: "users",
        ins: "Cooperative managers (25%) are the largest role; presidents, directors and association heads add 35%.",
      },
      {
        k: "env",
        t: "Environment & natural resources",
        ic: "globe",
        ins: "Forest officers lead (25%), followed by environmental officers (20%).",
      },
      {
        k: "transport",
        t: "Transport & utilities",
        ic: "rocket",
        ins: "Railway (30%) and transport officers (25%) are 55% of this group.",
      },
    ],
  },
  {
    fam: "Defence & public sector",
    items: [
      {
        k: "army",
        t: "Army",
        ic: "shield",
        grouped: [
          ["Officers", 47],
          ["Junior Commissioned Officers", 15],
          ["Other ranks", 38],
        ],
        ins: "Officers are 47% of Army profiles; sepoys are the single largest rank (16%).",
      },
      {
        k: "navy",
        t: "Navy",
        ic: "compass",
        grouped: [
          ["Officers", 48],
          ["Sailors (Seaman to Master Chief PO)", 52],
        ],
        ins: "Sailors are 52% of Navy profiles; seamen are the largest single rank (12%).",
      },
      {
        k: "air",
        t: "Air Force",
        ic: "rocket",
        grouped: [
          ["Officers (incl. pilots & specialists)", 47],
          ["Airmen (Aircraftman to Master Warrant Officer)", 53],
        ],
        ins: "Airmen are 53% of Air Force profiles; fighter, helicopter and transport pilots add 9%.",
      },
      {
        k: "defadmin",
        t: "Defence administration",
        ic: "cpu",
        ins: "Logistics managers, project managers and military engineers are 15% each.",
      },
      {
        k: "para",
        t: "Paramilitary & homeland security",
        ic: "flag",
        ins: "Border security officers are the largest group (12%), with assistant commandants at 11%.",
      },
      {
        k: "psu",
        t: "Public sector undertakings",
        ic: "grid",
        grouped: [
          ["Top leadership (Chairman to Executive Director)", 15],
          ["Senior management (Director to AGM)", 22],
          ["Middle management (Senior Manager to Assistant Manager)", 26],
          ["Team leads, supervisors, executives & officers", 29],
          ["Specialists, analysts & consultants", 8],
        ],
        ins: "Senior and middle management together are 48% of PSU profiles.",
      },
    ],
  },
];
const GP_ROLE_LIST = GP_ROLE_GROUPS.flatMap((g) =>
  g.items.map((x) => ({
    ...x,
    fam: g.fam,
  })),
);
const gpShare = (id) => {
  if (id === "jk") return GVP.states.filter((s2) => s2[0] === "jk" || s2[0] === "la").reduce((a, s2) => a + s2[2], 0);
  if (id === "dd") id = "dn";
  const s = GVP.states.find((x) => x[0] === id);
  return s ? s[2] : 0;
};
const gpRegOf = (id) => {
  const x = id === "dd" ? "dn" : id;
  return Object.keys(GVP.reg).find((r) => GVP.reg[r].includes(x));
};
const gpStName = (id) => {
  if (id === "jk") return "Jammu & Kashmir and Ladakh";
  if (id === "dd" || id === "dn") return "Dadra & Nagar Haveli and Daman & Diu";
  const s = GVP.states.find((x) => x[0] === id);
  return s ? s[1] : id;
};
const GVP_CASES = {
  "Citizen Satisfaction Study": [
    `${gpN(GPX.adult)} adult citizens (18+)`,
    `Members span every adult age band, from 18\u201329 (${GPX.y1829}%) to 65+ (${GPX.a65}%), so satisfaction can be compared by life stage.`,
  ],
  "Government Scheme Evaluation": [
    `${gpN(GPX.hh5)} members in households under \u20B95 lakh a year`,
    `${GPX.hh75}% of member households earn under \u20B97.5 lakh (${gpN(GPX.hh75)}), giving depth among likely beneficiaries.`,
  ],
  "Healthcare Access Study": [
    `${gpN(gpC("health", "People with disabilities"))} people with disabilities \xB7 ${gpN(gpC("health", "Patients with chronic conditions"))} with chronic conditions`,
    `${gpN(gpC("health", "Caregivers & family caregivers"))} caregivers and ${gpN(gpC("health", "Senior healthcare consumers"))} senior healthcare consumers add the household view of access.`,
  ],
  "Education Research": [
    `${gpN(GPX.student)} students \xB7 ${gpN(gpC("family", "Parents of school-age children (6\u201312)"))} parents of 6\u201312-year-olds`,
    `Parents of teenagers (${gpN(gpC("family", "Parents of teenagers (13\u201317)"))}) cover secondary education; under-18s take part only with parental consent.`,
  ],
  "Agriculture & Farmer Study": [
    "Agriculture, extension and cooperative officials in our B2B panel",
    `Extension officers are the largest agri-government role (${gpB("agrigov", "Agriculture Extension Officer")}%); cooperative and farmer-body heads are ${gpBs("coop", ["Cooperative President", "Cooperative Director", "Farmers Association President"])}% of cooperative profiles.`,
  ],
  "Employment Research": [
    `${gpN(GPX.working)} working members \xB7 ${gpN(GPX.unemp)} unemployed`,
    `${GPX.informal}% work part-time, self-employed or seasonally (${gpN(GPX.informal)}) \u2014 the informal workforce.`,
  ],
  "Public Opinion Poll": [
    `${gpN(GPX.adult)} voting-age members`,
    `Gender (${GPX.men}:${GPX.women}), age, education and region are all profiled, so quotas and weights are set before fieldwork.`,
  ],
  "Digital Government Services Study": [
    `${gpN(gpC("fin", "Online banking users"))} online-banking users`,
    `Online banking (${gpC("fin", "Online banking users")}%) and digital wallets (${gpC("fin", "Digital wallet users")}%) are profiled, so digital and less-digital citizens can be sampled separately.`,
  ],
};

export { GOV_SERVICES, GOV_STATS, GP_Bars, GP_Cols, GovernmentPage, gpRegOf, gpShare, gpStName };
