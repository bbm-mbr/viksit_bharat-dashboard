/* ============================================================================
   DATA LAKE — the layer beneath the dashboard

   Strategy agreed in review: data lake first. Build and validate the lake,
   prove the quality, then revisit dashboard structure. Garbage data must not
   enter the system, because a dashboard cannot be more trustworthy than the
   corpus under it.

   Source taxonomy follows the whiteboard: summits and conferences, IP, new
   industries and startups from government, white papers, news scoops, ministry
   key messages, government facilities, search fields, and the enablers
   government is working on.
   ========================================================================== */

/* ---------- what flows into the lake ------------------------------------ */
export const SOURCE_CLASSES = [
  {
    id: "SC-01", name: "Statutory instruments", tone: "gazette", priority: 1,
    what: "Gazette notifications, Cabinet decisions, scheme guidelines, amendments.",
    web: ["egazette.gov.in", "pib.gov.in", "cabsec.gov.in", "Ministry scheme portals"],
    cadence: "Daily crawl", format: "PDF, HTML", volume: "≈40–80 items/day",
    extraction: "Layout-preserving PDF parse; amendment resolved to parent instrument at SEGMENT granularity.",
    quality: "High — primary source, but amendments are the failure point.",
    risk: "Segment-level detail is routinely lost. The PM E-DRIVE two-wheeler error entered exactly here.",
  },
  {
    id: "SC-02", name: "Ministry key messages", tone: "gazette", priority: 1,
    what: "Calls for alliance, calls for technology, calls for solutions, calls for people. The explicit invitations a ministry issues.",
    web: ["Ministry press releases", "Secretary speeches", "Consultation papers", "Expression-of-interest notices"],
    cadence: "Daily", format: "HTML, PDF, video transcript", volume: "≈10–20/day",
    extraction: "Classify by call type; extract the ask, the deadline and the named counterparty.",
    quality: "High signal, low volume.",
    risk: "Easy to miss because it is rarely a formal instrument — it is a speech or a footnote.",
    highlight: "The single highest-yield class on this list. A call for alliance is a ministry publicly stating what it cannot do alone.",
  },
  {
    id: "SC-03", name: "Policy and planning publications", tone: "scenario", priority: 1,
    what: "NITI volumes, DPI roadmaps, Economic Survey, Budget documents, state policies.",
    web: ["niti.gov.in", "indiabudget.gov.in", "State industrial and EV policy portals"],
    cadence: "Event-driven", format: "PDF, XLSX", volume: "Bursty — 11 volumes at once",
    extraction: "Table and scenario extraction; every figure tagged with its scenario and horizon.",
    quality: "High, but scenario outputs are routinely misread as targets.",
    risk: "2050 and 2070 scenario values are directional model outputs, not official targets. The workbook flags this explicitly.",
  },
  {
    id: "SC-04", name: "Summits and conferences", tone: "nation", priority: 2,
    what: "Agendas, speaker lists, session titles, white papers issued at the event.",
    web: ["Event agendas", "Industry body calendars (SIAM, ACMA, CII, FICCI)", "Ministry event portals"],
    cadence: "Weekly scan", format: "HTML, PDF, agenda listings",
    volume: "≈5–15 relevant events/month",
    extraction: "Extract WHY the event exists, WHICH technologies are named, and HOW it is framed — then score significance as thought leadership.",
    quality: "Medium — marketing noise around a real signal.",
    risk: "Most events are noise. The filter is whether a ministry or regulator is convening, not attending.",
    highlight: "A conference agenda is a forward-looking document. It states what the convenor intends to be talking about in six months.",
  },
  {
    id: "SC-05", name: "IP and standards filings", tone: "scenario", priority: 2,
    what: "Patent filings, standards committee memberships and drafts, test procedures.",
    web: ["ipindia.gov.in", "BIS standards portal", "AIS / CMVR-TSC drafts", "WIPO Patentscope"],
    cadence: "Weekly", format: "Structured records, PDF",
    volume: "High volume, low relevance density",
    extraction: "Filter to focal search fields; flag filings by named competitors and by domestic entrants.",
    quality: "High reliability, long lag.",
    risk: "Patents lag intent by 18–30 months. Useful for confirming a trend, useless for catching one early.",
  },
  {
    id: "SC-06", name: "New industries and startups from government", tone: "market", priority: 2,
    what: "Scheme beneficiary lists, incubator cohorts, PLI awardees, cleared recycler lists.",
    web: ["Startup India", "ISM approvals", "PLI beneficiary notifications", "CMRIS cleared lists"],
    cadence: "Event-driven", format: "PDF lists, HTML tables",
    volume: "≈2–8 lists/month",
    extraction: "Resolve entity names to MCA identifiers; cross-reference against other scheme lists.",
    quality: "High — these are vetted, capitalised counterparties.",
    risk: "An award is not capacity. PLI-ACC awarded 40 GWh and built 1.4 GWh.",
    highlight: "Cross-referencing lists is where the value is — Attero and Lohum appear on both the magnet bidder list and the cleared recycler list.",
  },
  {
    id: "SC-07", name: "Government facilities and enablers", tone: "win", priority: 2,
    what: "Testbeds, shared labs, common facility centres, corridors, land banks, subsidy instruments.",
    web: ["MSE-CDP portal", "NIDHI / TIDE incubators", "State single-window portals", "Testbed announcements"],
    cadence: "Monthly", format: "HTML, PDF",
    volume: "≈10–20/month",
    extraction: "Map facility type to capability gap on our own capability board.",
    quality: "Medium — announcements outpace availability.",
    risk: "Announced facilities frequently do not open. Verify operational status before assuming access.",
  },
  {
    id: "SC-08", name: "News, scoops and early information", tone: "risk", priority: 3,
    what: "Trade press, wire services, sectoral newsletters, early reporting ahead of formal notification.",
    web: ["Wire services", "Trade press feeds", "Sectoral newsletters", "Financial dailies"],
    cadence: "Continuous", format: "HTML, RSS",
    volume: "≈300–600 items/day pre-filter",
    extraction: "Deduplicate; classify as rumour / reported / confirmed; never promote to a forecast without a primary source.",
    quality: "LOW. Fastest and least reliable class in the lake.",
    risk: "The known failure mode. Trade press reported a blanket PM E-DRIVE extension; the actual amendment applied to some segments and not two-wheelers.",
    highlight: "Valuable for lead time, dangerous for truth. Must be quarantined from any record that feeds a forecast until a primary source confirms it.",
  },
  {
    id: "SC-09", name: "Search fields and focal areas", tone: "market", priority: 1,
    what: "Our own strategic search fields — the lens that decides what is relevant at all.",
    web: ["Internal: Search Field Intelligence", "Divisional roadmaps", "Order book and pipeline"],
    cadence: "Quarterly review", format: "Internal structured",
    volume: "Small, high leverage",
    extraction: "Used as the relevance filter over every other class, not as a source in its own right.",
    quality: "Authoritative but self-referential.",
    risk: "The filter that defines relevance also defines blindness. Anything outside the current search fields is invisible by construction — which is why the unrecognised-policy column exists as a deliberate counterweight.",
  },
  {
    id: "SC-10", name: "Market and corporate disclosure", tone: "market", priority: 2,
    what: "MCA filings, SEBI disclosures, funding rounds, capacity announcements, Vahan registrations.",
    web: ["mca.gov.in", "SEBI filings", "Vahan dashboard", "Funding trackers"],
    cadence: "Weekly", format: "Structured, XBRL, HTML",
    volume: "High",
    extraction: "Entity resolution against the ecosystem watchlist; capacity claims tagged as announced vs commissioned.",
    quality: "High for filings, medium for funding data.",
    risk: "Announced capacity is not capacity. Maintain the distinction in the schema, not in a footnote.",
  },
];

/* ---------- the pipeline, with the guardrail at each stage --------------- */
export const PIPELINE = [
  {
    n: 1, stage: "Crawl", tone: "gazette",
    what: "Scheduled crawlers and RSS against the source register. Nothing enters by hand.",
    guardrail: "A source not in the register does not enter the lake. Adding a source is a reviewed change, not an ad-hoc paste.",
    automation: "Fully automated · daily to weekly by class",
  },
  {
    n: 2, stage: "Land raw", tone: "gazette",
    what: "Immutable raw store. Original document retained with retrieval timestamp and URL.",
    guardrail: "Raw is never edited. Every downstream record can be traced to the exact bytes it came from.",
    automation: "Fully automated",
  },
  {
    n: 3, stage: "Parse & classify", tone: "scenario",
    what: "Layout-preserving extraction. Classify instrument type, issuing body, sector, lifecycle stage.",
    guardrail: "Lifecycle stage is mandatory: draft / consultation / notified / in force / lapsed. A record without a stage cannot progress.",
    automation: "Automated with confidence scoring",
  },
  {
    n: 4, stage: "Resolve & link", tone: "scenario",
    what: "Amendments resolved to parent instruments at segment granularity. Entities resolved to identifiers.",
    guardrail: "THE critical gate. An amendment that changes some segments and not others must be stored per segment. This is where the e-2W error was born.",
    automation: "Automated, human review on amendments",
  },
  {
    n: 5, stage: "Verify provenance", tone: "risk",
    what: "Tag every record verified / briefed / illustrative. News-class records quarantined until a primary source confirms.",
    guardrail: "No illustrative or news-only record may feed a KPI, a forecast or an opportunity. It can appear on the feed, clearly marked.",
    automation: "Rules-based, with a custodian queue",
  },
  {
    n: 6, stage: "Score & route", tone: "market",
    what: "Impact against the order book, confidence, horizon, pillar, sector, national problem.",
    guardrail: "A record that cannot be traced to a national problem statement does not become an opportunity. It stays a signal.",
    automation: "Automated scoring, reviewed monthly",
  },
  {
    n: 7, stage: "Debate", tone: "nation",
    what: "Six-hat agents argue the finding. Black hat must fill the risk-of-action column before anything advances.",
    guardrail: "No opportunity publishes without a stated risk of acting AND a stated risk of not acting. Silence in either column blocks it.",
    automation: "Agent orchestration, blue hat consolidates",
  },
  {
    n: 8, stage: "Publish", tone: "win",
    what: "Surface to the dashboard with a 'so what', an owner and a provenance tag.",
    guardrail: "Every published item carries a named owner. An insight nobody owns is not published — it is a note.",
    automation: "Automated, monthly refresh cycle",
  },
];

/* ---------- opportunity guardrails: what gets in, what gets filtered ----- */
export const GUARDRAILS = {
  admit: [
    { rule: "Traces to a national problem statement", why: "Anything that cannot be tied to a published problem is a product idea wearing a policy costume." },
    { rule: "Backed by a primary or major secondary source", why: "News-class evidence alone is lead time, not truth." },
    { rule: "Names the capability we would have to build", why: "An opportunity without a capability gap stated is a slogan." },
    { rule: "Carries both risk of acting and risk of inaction", why: "Registers that only carry risk of acting bias every decision toward doing nothing." },
    { rule: "Has a stated window", why: "Forces the question of whether being late is survivable." },
    { rule: "Survives the obviousness test", why: "If a competent competitor reading only the news would already have it, it is table stakes, not a thesis." },
  ],
  reject: [
    { rule: "Derived only from trade press", why: "The PM E-DRIVE two-wheeler error came from exactly this path." },
    { rule: "Restates a scheme without a consequence", why: "A scheme summary is a signal. It is not an opportunity." },
    { rule: "Requires a capability with no acquisition path", why: "Ambition without a build or buy route is a wish." },
    { rule: "Depends on a single scenario", why: "Both NITI scenarios track closely to 2035. A thesis that only pays under Net Zero is a bet, and should be labelled one." },
    { rule: "Scores high on an undiscriminating metric", why: "The source workbook scores 57 of 80 items at opportunity 5 of 5. A score that rarely says no is not a filter." },
    { rule: "No named owner willing to take it", why: "Unowned opportunities accumulate and make the board unreadable." },
  ],
};

/* ---------- sustainability: no jugaad ----------------------------------- */
export const SUSTAINABILITY = [
  {
    id: "SU-1", name: "Scheduled crawling", tone: "gazette",
    now: "Manual collection", target: "Automated crawlers per source class",
    detail: "Daily for statutory and ministry messages, weekly for IP and market, continuous for news with quarantine.",
    risk: "Source sites change structure without notice. Needs a failure alert, not a silent gap.",
  },
  {
    id: "SU-2", name: "Monthly refresh cycle", tone: "scenario",
    now: "Ad hoc updates", target: "Fixed monthly publication with a changelog",
    detail: "Scoring reviewed monthly; forecast ledger updated quarterly; source register reviewed twice a year.",
    risk: "A cadence nobody owns decays into ad hoc within two quarters.",
  },
  {
    id: "SU-3", name: "Named custodian", tone: "risk",
    now: "Project team", target: "Named role with a documented handover pack",
    detail: "The board may be used for years while team members rotate. Custody must be a role, not a person.",
    risk: "The highest-likelihood failure mode for this whole initiative, and the one least discussed.",
  },
  {
    id: "SU-4", name: "Quality gates in code", tone: "market",
    now: "Reviewer judgement", target: "Automated provenance and completeness checks",
    detail: "Records failing provenance or missing a lifecycle stage are blocked at ingestion rather than caught in review.",
    risk: "Gates enforced by discipline erode. Gates enforced by code do not.",
  },
  {
    id: "SU-5", name: "Changelog and forecast ledger", tone: "win",
    now: "Current view only", target: "Every revision retained with its reason",
    detail: "What we predicted, what we predict now, what moved. Already live on the Forecast Validation screen.",
    risk: "None — this is the cheapest credibility mechanism available and it is already built.",
  },
];

/* ---------- where the output goes --------------------------------------- */
export const INITIATIVES = [
  {
    id: "IN-1", name: "Search Field Intelligence", tone: "market",
    direction: "both",
    gives: "Focal areas that define what is relevant — the filter over every source class.",
    gets: "Emerging fields the current search fields do not yet cover, surfaced from unrecognised policy areas.",
    status: "Live — same team",
  },
  {
    id: "IN-2", name: "Mobility Intelligence Platform", tone: "scenario",
    direction: "out",
    gives: "Policy and scenario context behind market movements.",
    gets: "Market and competitor data to resolve ecosystem segments into named entities.",
    status: "Integration to be designed",
  },
  {
    id: "IN-3", name: "MBR dashboards", tone: "gazette",
    direction: "out",
    gives: "The 'so what' layer and the external-force context behind divisional performance.",
    gets: "Order book and pipeline reality to calibrate impact scoring.",
    status: "Planned",
  },
  {
    id: "IN-4", name: "Policy intelligence activities", tone: "nation",
    direction: "both",
    gives: "Structured, scored policy corpus with provenance.",
    gets: "Government affairs engagement, consultation responses, standards seats.",
    status: "Live — informal",
  },
  {
    id: "IN-5", name: "Strategic search fields & innovation campaigns", tone: "win",
    direction: "out",
    gives: "Unknown problems pushed into search fields and innovation campaigns.",
    gets: "Validation of whether a derived thesis survives technical scrutiny.",
    status: "Defined in WP1 scope",
  },
];
