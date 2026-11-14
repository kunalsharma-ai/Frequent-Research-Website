import * as ee from 'react';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { isPlaceholder } from '../chat/knowledge.jsx';
import { useJsonLd } from '../home/HeroParts.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { usePageMeta } from '../SiteApp.jsx';

const GOV_CASE_STUDY = {
  title: "Executing Large-Scale Government & Public Opinion Research: From Sample Design to Decision-Ready Insights",
  description:
    "How a large public opinion and citizen research programme is designed, fielded, validated and reported, step by step.",
  snapshot: [
    ["Client", "Confidential Public-Sector Organization"],
    ["Industry", "Government / Public Sector"],
    ["Research type", "Large-scale public opinion & citizen research"],
    ["Geography", "[Verified geography: XX states / XX districts]"],
    ["Target audience", "[Verified population]"],
    ["Sample", "[XX,XXX respondents]"],
    ["Methodology", "Online / CATI / CAPI / F2F / Mixed mode"],
    ["Duration", "[XX days of fieldwork]"],
    ["Languages", "[XX languages]"],
    ["Completion rate", "[XX%]"],
    ["Quality validation", "[XX%]"],
    ["Deliverables", "Data + dashboard + analysis + reporting"],
  ],
  sections: [
    {
      h: "Executive summary",
      p: [
        "Public organisations increasingly need evidence that reflects the whole population they serve, not just the people who are easiest to reach. This case study describes how Frequent Research approaches a large-scale public opinion and citizen research programme: a study covering [XX states / XX districts], urban and rural areas, multiple languages and several respondent groups.",
        "The client, a confidential public-sector organisation, needed to understand awareness of a set of public services, how citizens rated their experience, and which issues mattered most in different regions. The study combined telephone, face-to-face and online interviewing, with a single questionnaire adapted for each mode, a stratified sample and a layered quality-control system. The final outputs were a cleaned and weighted dataset of [XX,XXX] interviews, an interactive dashboard and a report organised around decisions rather than questions.",
        "The sections below explain each stage, from the first briefing to the final presentation, and the choices that protect quality at scale.",
      ],
    },
    {
      h: "The research challenge",
      p: [
        "The brief combined four requirements that rarely sit comfortably together: national breadth, local depth, a short timeline and results that would stand up to public scrutiny. The client wanted to compare regions fairly, report on specific groups such as rural women, older citizens and first-time service users, and complete fieldwork within [XX days].",
        "The populations also differed sharply. Urban professionals were reachable by phone and online but busy; rural households often had limited connectivity and preferred to speak in their own language; some groups were small and spread thinly across districts. A single method would have produced a biased picture, so the design had to balance coverage, cost and timing without compromising representativeness.",
      ],
    },
    {
      h: "Why government research requires specialised methodology",
      p: [
        "Commercial research usually asks, “What do our customers think?” Public research asks, “What does the population think?”, and the population includes people who are hard to contact, wary of strangers, or rarely asked their opinion. Findings may inform public spending, service design or policy debate, so the methodology must be transparent and defensible.",
        "That changes the priorities. Sampling and coverage come first, before speed. Questions must be neutral and understandable to people with different levels of literacy. Every assumption, from how quotas were set to how the data was weighted, must be documented so others can understand the limits of the results. Respondent privacy and consent are not formalities; they are part of the study’s credibility.",
      ],
    },
    {
      h: "Understanding the target population",
      p: [
        "The first workstream was a population profile. Using the latest available official statistics for the study area (cited by source and year in the technical annex), the team mapped the adult population by region, urban or rural residence, age, gender and other relevant variables.",
        "This profile served three purposes. It shaped the sample design, it set the quotas that field teams would work to, and it provided the targets for weighting at the end. It also highlighted where small sub-groups would need boosting to allow meaningful analysis, for example [specific sub-group], which made up a small share of the population but was a priority for the client.",
      ],
    },
    {
      h: "Sample design",
      p: [
        "The study used a stratified, multi-stage design. Strata were defined by region and urban or rural residence. Within each stratum, districts were selected with probability proportional to population, then towns, wards or villages, and finally households or individuals.",
        "Telephone and online components used quota samples aligned to the same strata, so results could be combined. Boost samples were added for priority groups and down-weighted at analysis stage to restore population proportions. The total sample of [XX,XXX] was set to deliver a margin of error of around [±X%] nationally and acceptable precision for each region, a calculation shared with the client before fieldwork started.",
        "Sample design is always a trade-off. A larger sample in every district would have given more local detail but would have stretched the timeline and budget. Instead, the team agreed with the client which comparisons truly mattered for decisions, set minimum sample sizes for those, and accepted wider margins elsewhere. That conversation, held before any interview took place, is one of the most valuable parts of the project: it turns a general request for “as much data as possible” into a design built around the questions that need answering.",
      ],
    },
    {
      h: "Geographic coverage",
      p: [
        "Fieldwork covered [XX states / union territories], [XX districts] and [XX cities, towns and villages]. Locations were mapped before deployment so that travel, local permissions and interviewer allocation could be planned together.",
        "Each region had a field coordinator responsible for interviewer teams, daily progress and local issues such as weather, festivals or access restrictions. Where a sampled location became inaccessible, replacement followed pre-agreed rules, choosing the next location from the same stratum, so substitutions did not quietly change the sample.",
      ],
    },
    {
      h: "Questionnaire design",
      p: [
        "The questionnaire was built around the client’s decisions, not a list of topics. Each question was linked to an objective, and questions that did not support a decision were removed. This kept the interview to around [XX minutes], which matters for data quality: long interviews tire respondents and interviewers alike.",
        "Where the client needed comparability with earlier surveys, key questions were kept identical to previous wording, even where the team might otherwise have suggested improvements. Consistency over time is often more valuable than a marginally better question, and any unavoidable changes were documented so trends could be interpreted correctly.",
        "Wording was tested for neutrality, avoiding leading phrases, loaded terms and double-barrelled questions. Scales were kept consistent across sections. A short pilot of [XX interviews] in different regions tested understanding, timing and routing before the main fieldwork began, and several questions were simplified as a result.",
        "The same questionnaire had to work in three modes. Face-to-face interviews could use show cards; telephone interviews could not, so long lists were split into shorter questions; online respondents read the questions themselves, so instructions were shortened and grids limited. Each version was reviewed side by side to make sure the underlying question, and therefore the data, stayed the same. Sensitive questions were placed later in the interview, after rapport had been built, and respondents were always offered a “prefer not to say” option.",
      ],
    },
    {
      h: "Multilingual research",
      p: [
        "The questionnaire was translated into [XX languages] by professional translators and independently back-translated to catch shifts in meaning. Where a concept had no direct equivalent, the team agreed local phrasing with native speakers and recorded the decision.",
        "Interviewers were trained in the language they would use in the field, with practice interviews and a glossary of key terms. Online and CATI scripts allowed respondents to switch language, and data was always stored against the same underlying codes, so results could be compared across languages.",
      ],
    },
    {
      h: "Respondent recruitment",
      p: [
        "Recruitment differed by mode. Face-to-face respondents were selected through household listing and a random selection method within each sampled area. Telephone respondents were contacted from [verified sample source], with screening to confirm eligibility and location. Online respondents came from Frequent Research’s own consumer and business panels, profiled in advance.",
        "Every respondent was told who was conducting the research, how their information would be used and that they could stop or skip questions at any time. Incentives, where offered, were modest and consistent, to avoid attracting only people motivated by rewards.",
      ],
    },
    {
      h: "Fieldwork management",
      p: [
        "Fieldwork ran for [XX days] with [XX field interviewers], [XX CATI interviewers] and [XX supervisors]. A central project team tracked progress daily against quotas by region, mode and demographic group, using a live dashboard.",
        "Daily calls with regional coordinators covered completes, quality flags and upcoming risks. When a quota fell behind, effort was moved early, by adding interviewers, extending calling hours or opening an additional mode, rather than discovering gaps at the end. The client received short progress updates at an agreed frequency.",
        "Interviewer training was a project in itself. Every interviewer attended a briefing covering the purpose of the study, the questionnaire, the sampling and selection rules, consent, safety and the quality checks their work would face. Mock interviews were observed and scored, and only interviewers who met the standard were deployed. Training materials and a field manual stayed with teams throughout, so the same rules applied on day thirty as on day one.",
      ],
    },
    {
      h: "Rural research",
      p: [
        "Rural fieldwork required particular care. Interviewers were recruited locally where possible, so they spoke the local language and understood community norms. Field teams followed community-entry protocols, informing local representatives where appropriate, and scheduled visits around agricultural work and market days.",
        "Questionnaires used simple language and show cards with clear visuals for scales. CAPI devices worked offline and synchronised when connectivity returned, so data was not lost in low-network areas.",
      ],
    },
    {
      h: "Urban research",
      p: [
        "Urban respondents were often easier to locate but harder to engage. The design combined door-to-door interviews in sampled wards with telephone and online components to reach working people outside normal visiting hours.",
        "Gated housing, security restrictions and high refusal rates in some neighbourhoods were tracked separately, so the team could see whether non-response was concentrated in particular groups and adjust effort or weighting accordingly.",
      ],
    },
    {
      h: "Hard-to-reach respondents",
      p: [
        "Some priority groups, such as [specific groups], were small, dispersed or less likely to take part. For these, the study used boosted samples, targeted screening, longer fieldwork windows and, where suitable, recruitment through community organisations, with the same consent and quality standards as the main sample.",
        "Feasibility for these groups was assessed honestly at the proposal stage. Where a group could not be reached at the desired size within the timeline, the team said so and suggested alternatives, such as qualitative interviews to add depth where numbers would be limited.",
      ],
    },
    {
      h: "Data quality & validation",
      p: [
        "Quality control was layered across the project rather than left to the end. At recruitment, screening and verification confirmed eligibility. During fieldwork, supervisors monitored interviews and the system flagged unusual patterns. After fieldwork, the data team applied documented cleaning rules.",
        "The result was that [XX%] of completed interviews passed all validation checks, with rejected interviews replaced within the same quota cell during fieldwork.",
        "Quality outcomes were reported openly. The technical annex showed how many interviews were attempted, completed, flagged, back-checked and rejected, and for what reasons. Publishing these numbers can feel uncomfortable, because no large study is perfect, but it is exactly what gives readers confidence in the results that remain. It also gives the client a clear record should the findings ever be questioned.",
      ],
    },
    {
      h: "Fraud prevention",
      p: [
        "Large studies attract risk, from interviewers shortcutting procedures to online respondents attempting to participate more than once. Controls included duplicate detection on contact details and devices, GPS and time-stamp review for CAPI, speeding and straight-lining checks, and back-checks on a random share of interviews by an independent team.",
        "Any interviewer whose work showed repeated anomalies was stopped from further interviewing, and all of their interviews were reviewed. This rule was communicated to field teams at training, which itself acted as a deterrent.",
      ],
    },
    {
      h: "Interview monitoring",
      p: [
        "Supervisors accompanied or observed a share of face-to-face interviews in the first days of fieldwork, when problems are most likely. For CATI, supervisors listened to live calls and reviewed recordings where consent allowed.",
        "Monitoring results were fed back to interviewers the same day, with refresher training where needed. This early correction is far cheaper than discovering a systematic error after hundreds of interviews.",
      ],
    },
    {
      h: "Data cleaning",
      p: [
        "Cleaning followed a written specification agreed before fieldwork: how to treat incomplete interviews, inconsistent answers, “don’t know” responses and outliers. Open-ended answers were coded into a frame developed from an initial sample of responses and refined as coding progressed.",
        "Every change to the raw data was logged, so the path from raw responses to the final dataset could be traced. The client received both the cleaned data and the cleaning log.",
      ],
    },
    {
      h: "Statistical weighting",
      p: [
        "Because boosted groups and mixed modes deliberately changed the composition of the sample, the data was weighted to the population profile prepared at the start. Weights corrected for region, urban or rural residence, age and gender, and for differences between modes.",
        "Weights were trimmed to avoid any single respondent carrying excessive influence, and the effective sample size after weighting was reported alongside results, so readers could judge precision honestly.",
        "The weighting scheme was tested before results were finalised. The team compared weighted and unweighted results on key measures, checked that no region or group shifted implausibly, and reviewed the distribution of weights. Where a large adjustment was needed for a particular group, that was noted in the report, because a heavy weight is a sign that the group was under-represented in the achieved sample and results for it should be read with care.",
      ],
    },
    {
      h: "Cross-tabulation",
      p: [
        "Tables were produced for every question by region, residence, age, gender and other agreed variables, with significance testing to show which differences were statistically meaningful. Small bases were flagged rather than hidden.",
        "The tables served analysts; the report served decision-makers. Keeping the two separate meant the report could focus on what mattered without losing detail for those who needed it.",
      ],
    },
    {
      h: "Sentiment analysis",
      p: [
        "Open-ended questions asked citizens to describe their experience in their own words. Responses were coded by theme and by sentiment: positive, negative or mixed, with a sample checked by a second coder for consistency.",
        "The themes added explanation to the numbers: not just how many people were dissatisfied with a service, but why, and what they suggested should change.",
      ],
    },
    {
      h: "Geographic analysis",
      p: [
        "Results were mapped by region and, where sample sizes allowed, by district clusters. Geographic analysis showed where awareness or satisfaction was notably higher or lower than the average, helping the client focus attention.",
        "Maps were always shown with sample sizes and confidence intervals, so that apparent differences between small areas were not over-interpreted.",
      ],
    },
    {
      h: "Demographic analysis",
      p: [
        "The analysis compared results by age, gender, education, income band and other characteristics agreed with the client. It also looked at combinations, such as rural women or urban young adults, where the sample allowed.",
        "These comparisons often produce the most useful findings, because averages hide differences. A service rated well overall may be working poorly for a specific group.",
      ],
    },
    {
      h: "Reporting",
      p: [
        "The report opened with a two-page summary of key findings and implications, followed by sections organised around the client’s objectives. Each finding stated the evidence, the size of the effect and its limitations.",
        "A technical annex documented sampling, fieldwork, response rates, quality-control outcomes, weighting and the questionnaire. This transparency is what allows public research to be trusted and re-used.",
        "Findings were presented in a workshop with the client team rather than simply sent as a document. This allowed the researchers to explain nuances, answer questions about method and discuss implications directly with the people who would act on them. Several follow-up analyses requested in that session were delivered within the following week.",
      ],
    },
    {
      h: "Visualisation & dashboards",
      p: [
        "An interactive dashboard let the client filter results by region, group and question, compare segments and download charts. It was built on the weighted dataset and showed bases and significance alongside every chart.",
        "The dashboard was handed over with a short training session, so the client team could answer their own follow-up questions after the project closed.",
      ],
    },
    {
      h: "Research challenges",
      p: [
        "Several challenges are typical of programmes like this one: uneven connectivity in rural areas, refusals in some urban neighbourhoods, seasonal disruption, low-incidence sub-groups, translation nuances and the pressure of a fixed deadline.",
        "Each creates a temptation to cut corners, for example by quietly relaxing quotas, accepting borderline interviews or substituting locations without rules. Resisting those temptations is what separates defensible public research from simply collecting responses.",
      ],
    },
    {
      h: "How Frequent Research addresses them",
      p: [
        "Our approach rests on planning, visibility and documentation. Risks are identified at proposal stage with mitigations agreed in advance. Live dashboards make progress and quality visible daily. Field teams, CATI operations and the data team work to the same quality rules, and every decision that affects the data is written down.",
        "We combine our own consumer, business and healthcare panels with field and telephone operations, so the method can follow the population rather than the other way round.",
      ],
    },
    {
      h: "Results & impact",
      p: [
        "[Verified outcome: describe what the client did with the findings, for example how results informed service improvements, communication or programme design. Include only outcomes the client has confirmed and approved for publication.]",
        "The study delivered [XX,XXX] validated interviews across [XX states], a weighted dataset, an interactive dashboard and a decision-focused report within [XX weeks] of the project start.",
      ],
    },
    {
      h: "Lessons learned",
      p: [
        "Three lessons stand out from programmes of this kind. First, time spent on sample design and the pilot is never wasted; most fieldwork problems trace back to decisions made, or not made, before fieldwork began. Second, quality control works best when it is continuous and visible, not a final filter. Third, honest feasibility builds trust: telling a client early that a group is hard to reach leads to better designs than promising the impossible.",
      ],
    },
    {
      h: "Why research partners need scale and quality",
      p: [
        "Scale without quality produces large datasets that cannot be trusted. Quality without scale produces careful studies that cannot answer national questions. Public-sector research needs both: the operational capacity to reach thousands of people across regions and languages, and the discipline to make every one of those interviews count.",
        "That combination is what organisations should look for in a research partner, and it is what Frequent Research builds into every government and opinion research programme.",
      ],
    },
    {
      h: "Conclusion",
      p: [
        "Large-scale government and public opinion research is ultimately about listening to people fairly and reporting what they say accurately. The methods described here, careful sampling, neutral questionnaires, multilingual fieldwork, layered quality control, transparent weighting and decision-focused reporting, are how that is done at scale.",
        "If you are planning a citizen survey, opinion poll, scheme evaluation or socioeconomic study, we would be glad to discuss your objectives, population, geography and timeline, and recommend an approach that fits.",
      ],
    },
  ],
};
const govCaseSlug = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
function GovernmentCaseStudyPage() {
  usePageMeta("Case Study: Large-Scale Government & Public Opinion Research", GOV_CASE_STUDY.description);
  useJsonLd("case", {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: GOV_CASE_STUDY.title,
    description: GOV_CASE_STUDY.description,
    author: {
      "@type": "Organization",
      name: "Frequent Research",
    },
    publisher: {
      "@type": "Organization",
      name: "Frequent Research",
    },
  });
  return (
    <>
      {l.jsx(PageHero, {
        title: GOV_CASE_STUDY.title,
        intro: GOV_CASE_STUDY.description,
        crumbs: [
          {
            label: "Government & Opinion Research",
            to: "/government-opinion-research",
          },
          {
            label: "Case study",
          },
        ],
      })}
      <section className="section">
        <div className="container cs-layout">
          <aside className="cs-side">
            <div className="snapshot">
              <h2>Project snapshot</h2>
              <dl>
                {GOV_CASE_STUDY.snapshot.map(([t, e]) => (
                  <div key={t}>
                    <dt>{t}</dt>
                    <dd className={isPlaceholder(e) ? "ph" : ""}>{e}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <nav className="toc" aria-label="Contents">
              <h2>Contents</h2>
              <ol>
                {GOV_CASE_STUDY.sections.map((t) => (
                  <li key={t.h}>
                    <a href={`#${govCaseSlug(t.h)}`}>{t.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="article">
            {GOV_CASE_STUDY.sections.map((t, e) => (
              <section id={govCaseSlug(t.h)} key={t.h}>
                <h2>
                  <span>{String(e + 1).padStart(2, "0")}</span>
                  {t.h}
                </h2>
                {t.p.map((a, n) => (
                  <p key={n}>{a}</p>
                ))}
              </section>
            ))}
            <div className="article__cta">
              <Link className="btn btn--primary btn--lg" to="/government-opinion-research#brief">
                Discuss your project
              </Link>
              <Link className="btn btn--ghost btn--lg" to="/government-opinion-research">
                Back to Government & Opinion Research
              </Link>
            </div>
          </article>
        </div>
      </section>
      {l.jsx(CtaSection, {
        title: "Start your research project",
        primary: {
          to: "/government-opinion-research#brief",
          label: "Request a Research Proposal",
        },
      })}
    </>
  );
}

export { GovernmentCaseStudyPage };
