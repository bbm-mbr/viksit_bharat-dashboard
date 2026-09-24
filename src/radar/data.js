/* ============================================================================
   BHARAT 2047 RADAR — data layer

   Framing rule, from the WP1 review: this reads outside-in. The national agenda
   comes first, Bosch relevance is derived from it and is always the last field
   in a record, never the first. Anything that cannot be traced to a national
   problem statement or a published document does not belong on the board.

   Provenance is marked per record:
     src: "verified"  — checked against a primary or major secondary source
     src: "illustrative" — plausible mock content for structure review only
   Data as of 10 September 2026.
   ========================================================================== */

/* ---------- the time spine: every record plots onto one of these --------- */
export const HORIZONS = [
  { id: "H0", year: "2026", label: "In force", note: "Act now", span: "Decided / notified" },
  { id: "H1", year: "2028", label: "Scheme terminal dates", note: "Build now", span: "PM E-DRIVE, CAFE-III start" },
  { id: "H2", year: "2030", label: "Committed policy", note: "Position now", span: "First NITI review gate" },
  { id: "H3", year: "2035", label: "Acceleration", note: "Shape now", span: "DPI 3.0, ZEV targets" },
  { id: "H4", year: "2047", label: "Viksit Bharat", note: "Optionality", span: "$30–40 tn economy" },
  { id: "H5", year: "2070", label: "Net Zero", note: "Terminal state", span: "Modelled end state" },
];

/* ---------- Viksit Bharat strategic pillars ----------------------------- */
/* The five themes the national vision exercise is organised around. Every
   signal, opportunity and risk in this app carries a pillar id. */
export const PILLARS = [
  {
    id: "V1", name: "Empowered Indians", tone: "nation",
    focus: "Yuva · Garib · Mahilayen · Annadata",
    aim: "Universal access to education, health, skills and dignified work; poverty eliminated as a category.",
    bosch: "Skilling, technician certification, vocational network. Mostly non-monetary — the licence to operate.",
  },
  {
    id: "V2", name: "Thriving & sustainable economy", tone: "market",
    focus: "$30–40 tn GDP · manufacturing depth · energy transition",
    aim: "A high-income economy that decarbonises while it grows, rather than after it grows.",
    bosch: "The core. Powertrain, electrification, industrial technology and the supplier tier beneath them.",
  },
  {
    id: "V3", name: "Innovation, science & technology", tone: "scenario",
    focus: "Semiconductors · AI · deep tech · R&D intensity",
    aim: "Move from assembly to design ownership; raise R&D spend and domestic IP generation.",
    bosch: "Engineering centres, BGSW, semiconductor competence, university and startup partnerships.",
  },
  {
    id: "V4", name: "Good governance & security", tone: "gazette",
    focus: "DPI · regulatory quality · energy and mineral security",
    aim: "Population-scale digital rails, predictable regulation, reduced import dependence in critical inputs.",
    bosch: "Standards seats, compliance depth, critical-mineral and cell supply security.",
  },
  {
    id: "V5", name: "India in the world", tone: "win",
    focus: "Export competitiveness · global value chains",
    aim: "India as a resilient node in global supply chains, not only a domestic market.",
    bosch: "India as an export and engineering base for the group, not only a country organisation.",
  },
];

/* ---------- national priority sectors ----------------------------------- */
/* The DPI@2047 roadmap (NITI Aayog, 28 Apr 2026) names eight sectoral
   transformations under DPI 2.0. This is the government's own list of where it
   intends to remove structural bottlenecks — so it is the right spine for an
   outside-in view, including the sectors where Bosch has no position today. */
export const SECTORS = [
  {
    id: "S1", name: "Agriculture & farmer livelihood", ministry: "Ministry of Agriculture",
    problem: "Smallholder productivity and price realisation; fragmented land records defeat every service that needs to know who farms what.",
    outcome2047: "Data-driven advisory, verified crop data and fair value chains reaching every holding.",
    rail: "AgriStack · Farmer Registry · Digital Crop Survey",
    metric: "10.31 cr Farmer IDs created", metricAsOf: "3 Aug 2026",
    metric2: "648 districts, 31.3 cr plots surveyed (Rabi 25-26)",
    boschFit: "adjacent", pillar: "V1", src: "verified",
    soWhat: "A verified farmer + plot registry is what makes per-acre machinery service billable and insurable for the first time. That is a precondition for equipment-as-a-service, not an agriculture play.",
  },
  {
    id: "S2", name: "MSME competitiveness & market access", ministry: "Ministry of MSME",
    problem: "Sub-scale suppliers cannot access markets, credit or quality certification, which caps the depth of every manufacturing value chain above them.",
    outcome2047: "Formalised, financeable, quality-certified supplier base plugged into open commerce networks.",
    rail: "Udyam · ONDC · TReDS · ZED · RAMP",
    metric: "7.83 cr Udyam registrations", metricAsOf: "28 Feb 2026",
    metric2: "up from 0.79 cr in FY22",
    boschFit: "strong", pillar: "V2", src: "verified",
    soWhat: "This is our own tier-2 and tier-3 base being formalised and subsidised by the state. PLI value-addition thresholds are only reachable through it.",
  },
  {
    id: "S3", name: "Education & skilling", ministry: "Ministry of Education · MSDE",
    problem: "Learning outcomes and employability gaps; reskilling of fossil-dependent districts as the energy mix shifts.",
    outcome2047: "Learner-centric education in local languages; a workforce that can be redeployed rather than stranded.",
    rail: "Skill Council for Green Jobs · NCVET",
    metric: "150+ districts fossil-supply dependent", metricAsOf: "NITI Vol. 11",
    metric2: "≈1/3 of population in those districts",
    boschFit: "adjacent", pillar: "V1", src: "verified",
    soWhat: "Certification authority is worth more than training revenue. Whoever writes the EV and battery technician standard sets the shape of the aftermarket for two decades.",
  },
  {
    id: "S4", name: "Health", ministry: "Ministry of Health & Family Welfare",
    problem: "Access and cost of care; thin diagnostic infrastructure outside metros.",
    outcome2047: "Universal health coverage with portable records and distributed diagnostics.",
    rail: "ABDM · Health Claims Exchange",
    metric: "—", metricAsOf: "",
    metric2: "Outside current Bosch India portfolio",
    boschFit: "none", pillar: "V1", src: "verified",
    soWhat: "Deliberately shown with no Bosch fit. A sector list that only contains sectors we already serve is a sales plan, not a national view — and it hides where the state is actually spending.",
  },
  {
    id: "S5", name: "Credit & economic participation", ministry: "Ministry of Finance · RBI",
    problem: "Thin-file borrowers and asset classes lenders cannot underwrite — including electric vehicles with unknown residual value.",
    outcome2047: "Cash-flow based lending at population scale; new asset classes made financeable.",
    rail: "Account Aggregator · OCEN · ULI · TReDS",
    metric: "TReDS settlement mandated for CPSE purchases", metricAsOf: "Budget 2026-27",
    metric2: "GeM–TReDS integration announced",
    boschFit: "adjacent", pillar: "V2", src: "verified",
    soWhat: "EV adoption is gated by financing, and financing is gated by residual-value uncertainty. Battery state-of-health data is a credit primitive before it is an engineering one.",
  },
  {
    id: "S6", name: "Energy & decentralised power", ministry: "Ministry of Power · MNRE",
    problem: "Peak demand growth, grid flexibility, and a charging build-out that is approved but not installed.",
    outcome2047: "Non-fossil generation at 80–85% of the mix by 2070; electricity from 21% to ~60% of final energy.",
    rail: "India Energy Stack · Unified Energy Interface",
    metric: "UEI Alliance: 30 members", metricAsOf: "latest disclosed",
    metric2: "≈13,000 charging sessions/day, ≈60 MWh/day",
    boschFit: "strong", pillar: "V2", src: "verified",
    soWhat: "UEI is UPI's evolvability pattern applied to electrons. The settlement layer will be commoditised; the metering-grade telemetry that makes settlement trustworthy will not.",
  },
  {
    id: "S7", name: "Market access & open commerce", ministry: "DPIIT",
    problem: "Discovery and fulfilment costs shut small sellers and service providers out of organised demand.",
    outcome2047: "Open networks for commerce, mobility and logistics with interoperable participants.",
    rail: "ONDC · Beckn protocol family",
    metric: "Protocol family extended to mobility and energy", metricAsOf: "2026",
    metric2: "Same rails now carry UEI",
    boschFit: "adjacent", pillar: "V4", src: "verified",
    soWhat: "The pattern to watch is not ONDC itself. It is that the state keeps re-using one protocol family for each new sector — so the next network is predictable before it is announced.",
  },
  {
    id: "S8", name: "Benefit delivery & social protection", ministry: "Multiple",
    problem: "Leakage and exclusion in transfers; identifying who is eligible for what.",
    outcome2047: "Direct, verifiable delivery of entitlements at population scale.",
    rail: "Aadhaar · DBT · e-KYC",
    metric: "—", metricAsOf: "",
    metric2: "Outside current Bosch India portfolio",
    boschFit: "none", pillar: "V1", src: "verified",
    soWhat: "Relevant only as precedent: it is where the state learned that identity plus a payment rail beats a scheme-specific application form. That lesson is now being applied to energy and commerce.",
  },
];

/* ---------- government design principles -------------------------------- */
/* Recurring decision patterns visible across UPI, ONDC, AgriStack and UEI.
   These are how proposals get judged — worth designing to, not just observing. */
export const PRINCIPLES = [
  {
    id: "D1", name: "Problem first, technology second",
    statement: "The stated societal problem is fixed first; the technology is selected afterwards as an enabler and is treated as replaceable.",
    evidence: "Every DPI@2047 sectoral transformation is written as a bottleneck to remove, not a system to build.",
    test: "Can we state the national problem our proposal solves without naming a Bosch product? If not, it will not survive a ministry review.",
  },
  {
    id: "D2", name: "Citizen-centric — minimise behaviour change",
    statement: "Adoption is designed around what people already do. The winning design asks the citizen to change as little as possible.",
    evidence: "UPI succeeded by riding an existing habit — a phone number and a bank account — rather than teaching a new one.",
    test: "How much behaviour change does our solution assume from a driver, a fleet operator or a technician? Every unit of change is adoption risk we are choosing to carry.",
  },
  {
    id: "D3", name: "Shared capability & interoperability",
    statement: "Preference for common, reusable infrastructure with open participation over vertically integrated single-vendor solutions.",
    evidence: "ONDC, UPI and UEI are all unbundled networks: discovery, fulfilment and settlement are separable and multi-vendor.",
    test: "Are we proposing a platform we own, or a layer inside a network someone else convenes? The second is smaller but far more likely to be adopted.",
  },
  {
    id: "D4", name: "Value proposition at population scale",
    statement: "Initiatives are weighted by the share of citizens they touch. Scale is a qualifying criterion, not an ambition.",
    evidence: "DPI 2.0 is explicitly framed around livelihood-led growth across a broad base rather than premium segments.",
    test: "Does this reach a majority of the relevant population, or the top decile? Premium-first roadmaps read as misaligned in this frame.",
  },
  {
    id: "D5", name: "Diversity & inclusivity by construction",
    statement: "Solutions must work across languages, literacy levels, device tiers and geographies from day one.",
    evidence: "Local-language, learner-centric delivery is written into the education transformation rather than deferred to a later phase.",
    test: "Does our product degrade gracefully on a low-cost device, a weak network and a non-English interface?",
  },
  {
    id: "D6", name: "Evolvability into adjacent domains",
    statement: "Capabilities are built so they can be extended to problems not yet named, and they routinely are.",
    evidence: "The Beckn/UPI pattern moved from payments to commerce (ONDC) to mobility, and then to electrons as the Unified Energy Interface.",
    test: "This is the highest-value pattern to track. Watch which rail is being re-used next — that is the earliest possible read on the next market.",
  },
  {
    id: "D7", name: "Security & privacy by design",
    statement: "Consent, data minimisation and auditability are architectural commitments made at the start, not compliance added later.",
    evidence: "Account Aggregator's consent architecture; DPDP obligations now flowing into every sectoral registry.",
    test: "Can we evidence consent and data lineage for vehicle, battery and telematics data? This becomes a bid qualifier, not a differentiator.",
  },
];

/* ---------- prioritised national problem statements --------------------- */
export const PROBLEMS = [
  {
    id: "PR-01", name: "Petroleum import dependence", sector: "S6", pillar: "V4",
    severity: 5, signal: 5, trend: "worsening",
    stat: "≈86% of transport energy is petroleum today",
    body: "Transport is the single largest driver of crude import exposure. Both NITI scenarios reduce it, but the Current Policy case still leaves petroleum at 46% of transport energy in 2070 against 21% in the Net Zero case.",
    bosch: "This is the demand-shaper under CAFE-III, biofuel blending and every electrification programme we sell into. It is the root cause behind roughly half our order book's regulatory drivers.",
    src: "verified",
  },
  {
    id: "PR-02", name: "Critical mineral concentration risk", sector: "S6", pillar: "V4",
    severity: 5, signal: 5, trend: "improving-slowly",
    stat: "60–81% of permanent magnet requirement sourced from one country, FY23–FY25",
    body: "Rare earth magnets, cells and their precursors are concentrated in a single supply geography. The ₹7,280 cr REPM scheme targets 6,000 MTPA across five beneficiaries with a two-year gestation.",
    bosch: "Direct input risk for traction motors. Re-shoring fixes availability on a two-year clock but does nothing about price — which is why a reduced-REE motor line is a hedge, not a fallback.",
    src: "verified",
  },
  {
    id: "PR-03", name: "Charging infrastructure that is approved but not built", sector: "S6", pillar: "V2",
    severity: 4, signal: 5, trend: "worsening",
    stat: "6,562 chargers approved under PM E-DRIVE, none installed as of early Aug 2026",
    body: "Against 9,583 public stations installed under the earlier FAME-II scheme, PM E-DRIVE's charger line has approvals but no installations. The binding constraints are land, DISCOM connection and commissioning capacity — not subsidy.",
    bosch: "The clearest evidence in the whole dataset that money is not the bottleneck. Whatever is blocking commissioning is a services market with no incumbent.",
    src: "verified",
  },
  {
    id: "PR-04", name: "Cell manufacturing behind the deployment curve", sector: "S6", pillar: "V4",
    severity: 4, signal: 4, trend: "worsening",
    stat: "≈1.4 GWh built against 40 GWh awarded under PLI-ACC",
    body: "No beneficiary has claimed incentive to date. PLI-Auto's incentive period ends in FY2026-27, leaving a successor-scheme drafting window open during FY27.",
    bosch: "Plan pack, BMS and thermal on imported cells for longer than the policy calendar implies. The drafting window is where influence is cheapest.",
    src: "illustrative",
  },
  {
    id: "PR-05", name: "Smallholder productivity and price realisation", sector: "S1", pillar: "V1",
    severity: 5, signal: 4, trend: "improving",
    stat: "10.31 cr Farmer IDs created; 19 states signed MoUs",
    body: "Fragmented holdings and unverifiable land records have historically defeated advisory, credit and insurance at the plot level. AgriStack is closing that gap faster than most observers expected.",
    bosch: "Not an agriculture play. A verified plot registry is the missing precondition for billing farm machinery by the acre — which is a hydraulics and sensing business.",
    src: "verified",
  },
  {
    id: "PR-06", name: "Employment generation at scale", sector: "S3", pillar: "V1",
    severity: 5, signal: 3, trend: "flat",
    stat: "150+ districts depend on fossil supply chains",
    body: "The transition threatens concentrated regional employment while creating dispersed new demand. NITI Vol. 11 routes reskilling through the Skill Council for Green Jobs.",
    bosch: "Where our vocational network converts into standing with state governments. Low revenue, high access — and access is what determines who gets consulted on the next policy draft.",
    src: "verified",
  },
  {
    id: "PR-07", name: "Automotive-grade silicon has no domestic qualification base", sector: "S7", pillar: "V3",
    severity: 3, signal: 4, trend: "emerging",
    stat: "12 approved ISM projects; 9 are packaging and test",
    body: "India is building assembly, test and packaging capacity quickly — Micron Sanand, Kaynes, Bhiwadi — with Tata-PSMC's Dholera fab targeting first silicon late 2026. Automotive-grade qualification and reliability engineering is a different competence from packaging.",
    bosch: "A largely unclaimed layer. We hold automotive semiconductor qualification competence globally and the capacity landing here will need it locally.",
    src: "verified",
  },
  {
    id: "PR-08", name: "Urban mobility and modal share", sector: "S7", pillar: "V2",
    severity: 4, signal: 3, trend: "flat",
    stat: "Public + shared road share 47% today; 60% in the Net Zero case by 2070",
    body: "Vehicle ownership rises from a low base while the scenarios simultaneously require public and shared modes to gain share. Both happen at once, which is a fleet story rather than a retail one.",
    bosch: "Fleet duty cycles, uptime guarantees and depot infrastructure — a different customer and a different contract shape from selling components to an OEM.",
    src: "verified",
  },
];

/* ---------- signal feed -------------------------------------------------- */
export const SIGNALS = [
  {
    id: "SG-2026-0912", date: "2026-08-13", horizon: "H0", kind: "gazette",
    source: "Ministry of Heavy Industries", org: "MHI",
    pillar: "V4", sector: "S6", problem: "PR-02", src: "verified",
    title: "20 bids received for sintered rare-earth permanent magnet capacity",
    body:
      "Bids under the ₹7,280 cr scheme approved by Cabinet in Nov 2025 — ₹6,450 cr sales-linked incentive plus ₹750 cr capital subsidy, building 6,000 MTPA of integrated REPM capacity across five beneficiaries (max 1,200 MTPA each), 7-year tenure with a 2-year gestation. Bidders include L&T, Coal India, Attero Recycling, Lohum, Neo Performance Materials (Singapore), Proterial India and 20 Microns.",
    status: "Bidding closed — award pending",
    units: ["Electrified Mobility", "Two-Wheeler & Powersports", "Bosch Rexroth"],
    soWhat:
      "The bidder list is the actionable part, not the scheme. It mixes recyclers (Attero, Lohum) with industrial conglomerates (L&T, Coal India) and one experienced foreign magnet maker. Those are three different risk profiles for an offtake counterparty, and the recyclers are the ones whose feedstock we could actually supply.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0877", date: "2026-08-04", horizon: "H0", kind: "risk",
    source: "Lok Sabha reply · Ministry of Heavy Industries", org: "MHI",
    pillar: "V2", sector: "S6", problem: "PR-03", src: "verified",
    title: "6,562 chargers approved under PM E-DRIVE, none installed",
    body:
      "Parliamentary reply, early August 2026. Against 6,562 approved public charging points under PM E-DRIVE, zero were installed at the time of reply. The earlier FAME-II scheme had 9,583 public stations installed as of 1 Jul 2026. Charging infrastructure support continues to 31 Mar 2028.",
    status: "In force — execution failure visible",
    units: ["Energy & Building Technology", "Electrified Mobility"],
    soWhat:
      "Subsidy is not the binding constraint and has not been for some time. Land acquisition, DISCOM connection approval and commissioning manpower are. That is a project-execution services market with public money already committed to it and no obvious incumbent — the single most under-priced signal on this board.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0741", date: "2026-07-16", horizon: "H1", kind: "gazette",
    source: "Ministry of Power / Bureau of Energy Efficiency", org: "MoP · BEE",
    pillar: "V2", sector: "S6", problem: "PR-01", src: "verified",
    title: "Draft CAFE-III notification issued for FY2027-28 to FY2031-32",
    body:
      "Fleet-average targets tighten from 3.996 l/100km (94.76 gCO₂/km) in FY28 to 3.3273 l/100km (78.90 gCO₂/km) by FY32, with a proposed 91.7 g/km target on the WLTP cycle. Introduces super-credits — BEV multiplier 4, hydrogen fuel-cell 5, with hybrid incentives reduced against the current regime — plus pooling across up to three manufacturers and credit buyout at ₹2,500 per credit in FY28 rising ₹500 a year to ₹4,500 by FY32. Unused credits lapse at the end of a compliance block. Consultation closed 6 Aug 2026; final notification awaited.",
    status: "Draft — consultation closed, final awaited",
    units: ["Powertrain Solutions", "Electrified Mobility", "Cross-Domain Computing"],
    soWhat:
      "The buyout price converts efficiency from a specification argument into a commercial one: every gram we remove from a customer's fleet has a defensible rupee value between ₹2,500 and ₹4,500. Two second-order effects matter more than the targets. Credits lapsing at block end forces spend into specific years. And the fuel-cell multiplier of 5 against BEV's 4 is the state quietly pricing hydrogen optionality for someone.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0698", date: "2026-04-28", horizon: "H3", kind: "scenario",
    source: "NITI Aayog · Frontier Tech Hub", org: "NITI",
    pillar: "V4", sector: "S7", problem: null, src: "verified",
    title: "DPI@2047 roadmap launched — eight sectoral transformations, two phases",
    body:
      "Developed by the NITI Frontier Tech Hub with EkStep Foundation and Deloitte. DPI 2.0 (2025–2035) targets livelihood-led growth by removing structural bottlenecks across MSMEs, agriculture, education and health, with credit, decentralised energy and benefit delivery as systemic enablers. DPI 3.0 (2035–2047) targets grassroots innovation and local high-value growth toward a $30 tn economy. Four execution imperatives: district-led demand aggregation, scaling technology entrepreneurship, leveraging AI, and cross-sector data unlocks.",
    status: "Published — planning baseline",
    units: ["Strategy", "Software & Digital", "All divisions"],
    soWhat:
      "This is the government's own list of where it will remove bottlenecks over the next decade, and 'decentralised energy' is on it as a systemic enabler. District-led demand aggregation is the mechanism to watch: it means procurement moves to district scale, which changes who our customer is for depot charging and fleet electrification.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0655", date: "2026-08-04", horizon: "H0", kind: "gazette",
    source: "Ministry of Heavy Industries", org: "MHI",
    pillar: "V2", sector: "S6", problem: "PR-01", src: "verified",
    title: "PM E-DRIVE: e-2W demand subsidy closed 31 Jul 2026; other segments run to 2028",
    body:
      "The demand subsidy for electric two-wheelers closed on 31 July 2026 as originally scheduled. Electric three-wheelers, e-trucks, e-buses, e-ambulances and public charging infrastructure continue to receive support until 31 March 2028. Scheme has supported 26.54 lakh EVs with ₹2,322 cr released of a ₹10,900 cr outlay as of 22 Jul 2026, including 55 e-trucks and 14,000 e-buses allocated — Bengaluru 4,500 and Delhi 2,800.",
    status: "In force — supersedes earlier extension reporting",
    flag: "This corrects an earlier entry on this board which recorded the e-2W terminal date as moved to 31 Mar 2028. Trade-press reports of a blanket two-year extension conflated the segments that were extended with the two-wheeler line, which was not.",
    units: ["Two-Wheeler & Powersports", "Electrified Mobility", "Aftermarket"],
    soWhat:
      "The e-2W volume plan must be re-run on the sunset case, not the extended case — this reverses the direction of an earlier assumption. The e-truck number is the louder signal: 55 units supported against a dedicated line item means heavy-duty electrification is not subsidy-constrained, it is duty-cycle and charging constrained.",
    confidence: "High", impact: 4,
  },
  {
    id: "SG-2026-0203", date: "2026-02-10", horizon: "H4", kind: "scenario",
    source: "NITI Aayog", org: "NITI",
    pillar: "V2", sector: "S6", problem: null, src: "verified",
    title: "Eleven-volume study: Scenarios Towards Viksit Bharat and Net Zero",
    body:
      "India's first government-led, multi-sectoral integrated modelling exercise. Second set of four reports released 10 Feb 2026. Covers roadmap, macroeconomics, financing, power, transport, industry, buildings, agriculture, waste, critical minerals and social implications. Every volume is structured as Current Policy Scenario versus Net Zero Scenario, to 2050 and 2070. Power: electricity rises from 21% of final energy in 2025 to as much as 60% by 2070, non-fossil generation from 23% to 80–85%. Transport: electricity, biofuels and hydrogen meet nearly 90% of transport energy by 2070. Industry: steel and cement demand rises 4–6×.",
    status: "Published — reference baseline",
    units: ["Strategy", "All divisions"],
    soWhat:
      "Every ministry, PSU and financier will now cite this. Our 2047 plan should be expressed in the same two-scenario vocabulary so that when we go to MoRTH, MHI or a state government we are arguing inside their model rather than against it. Arguing against the model is a losing position regardless of whether we are right.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0588", date: "2026-05-15", horizon: "H0", kind: "market",
    source: "India Semiconductor Mission", org: "ISM · MeitY",
    pillar: "V3", sector: "S7", problem: "PR-07", src: "verified",
    title: "Semiconductor capacity lands — 12 approved projects, ₹1.64 lakh cr",
    body:
      "One fabrication unit, two compound semiconductor fabs and nine packaging and test facilities approved. Micron's Sanand ATMP inaugurated 28 Feb 2026 and in commercial production; Kaynes Semicon OSAT at Sanand 31 Mar 2026 (₹3,300 cr); an ATMP/OSAT unit at Bhiwadi 15 May 2026 under SPECS. Tata Electronics with PSMC targets first silicon at Dholera by late 2026 at 50,000 wafers per month for automotive, computing, communications and AI. ₹5,000 cr disbursed to date.",
    status: "Ramping",
    units: ["Cross-Domain Computing", "Corporate Sourcing", "Software & Digital"],
    soWhat:
      "Nine of twelve projects are packaging and test. India is acquiring assembly capacity far faster than automotive-grade qualification competence, and those are different disciplines. The Dholera fab explicitly names automotive as a target segment while having no domestic AEC-Q qualification ecosystem around it. That gap is ours to fill and nobody has claimed it.",
    confidence: "High", impact: 4,
  },
  {
    id: "SG-2026-0512", date: "2026-04-29", horizon: "H0", kind: "market",
    source: "Ministry of Mines", org: "MoM",
    pillar: "V4", sector: "S6", problem: "PR-02", src: "illustrative",
    title: "58 firms cleared under the ₹1,500 cr critical mineral recycling incentive",
    body:
      "20 entities cleared 30 Mar 2026 and a further 38 on 29 Apr 2026 under CMRIS, notified October 2025 with a six-year tenure to FY2030-31. Target: 270 kt of annual recycling capacity yielding roughly 40 kt of critical minerals a year from li-ion scrap, e-waste and end-of-life vehicles. Incentives are restricted to advanced chemical recyclers.",
    status: "Beneficiaries notified",
    units: ["Aftermarket", "Electrified Mobility", "Corporate Sustainability"],
    soWhat:
      "A cleared, capitalised recycler list is a pre-screened partner set. Two of them — Attero and Lohum — also bid for magnet capacity, which means the same counterparties sit on both ends of the loop. Our reverse-logistics reach through the workshop network is the scarce asset on our side of that table.",
    confidence: "Medium", impact: 4,
  },
  {
    id: "SG-2026-0470", date: "2026-04-10", horizon: "H1", kind: "market",
    source: "UEI Alliance · Ministry of Power", org: "MoP",
    pillar: "V2", sector: "S6", problem: "PR-03", src: "verified",
    title: "Unified Energy Interface endorsed — Beckn rails extended to electrons",
    body:
      "UEI is an open, Beckn-based protocol for interoperable EV charging: any app can discover, book and pay for a session on any participating network without bilateral roaming agreements. Formed by an alliance of energy companies, since expanded to around 30 members, facilitating roughly 13,000 sessions and 60 MWh per day. Pilots in Kochi and Delhi. Endorsed by the Ministry of Power.",
    status: "Pilot to scale",
    units: ["Energy & Building Technology", "Software & Digital"],
    soWhat:
      "This is design principle D6 — evolvability — executing in public: the payments rail became commerce, then mobility, now electrons. The app layer will commoditise exactly as it did in payments. What did not commoditise in UPI was the trust and settlement substrate. The equivalent here is metering-grade, tamper-evident telemetry inside the charger.",
    confidence: "Medium", impact: 4,
  },
  {
    id: "SG-2026-0339", date: "2026-03-23", horizon: "H0", kind: "market",
    source: "Company disclosure", org: "Bosch Ltd",
    pillar: "V2", sector: "S6", problem: "PR-02", src: "illustrative",
    title: "Bosch Limited and Tata AutoComp form 50:50 e-powertrain joint venture",
    body:
      "Pune-headquartered JV covering engineering, manufacturing, sales and after-sales of eAxle systems and electric traction motors, with scope to expand into further product segments. Operations targeted from mid-2026, subject to regulatory clearance.",
    status: "Operational ramp",
    units: ["Electrified Mobility"],
    soWhat:
      "The declared position in the largest single line item of the transport transition. It is also the vehicle through which magnet security, motor localisation depth and PLI value-addition thresholds have to be solved together rather than separately.",
    confidence: "High", impact: 5,
  },
  {
    id: "SG-2026-0301", date: "2026-08-25", horizon: "H0", kind: "scenario",
    source: "Ministry of Agriculture", org: "MoA · DA&FW",
    pillar: "V1", sector: "S1", problem: "PR-05", src: "verified",
    title: "AgriStack passes 10.31 crore Farmer IDs; land records digitisation accelerates",
    body:
      "More than 10.31 crore Farmer IDs created as of 3 Aug 2026 against a plan of 11 crore over three years. Digital Crop Survey covered 648 districts and over 31.3 crore plots in Rabi 2025-26. 19 states have signed MoUs with the Ministry of Agriculture. The Digital Agriculture Mission was approved in Sep 2024 with a ₹2,817 cr outlay.",
    status: "Ahead of plan",
    units: ["Bosch Rexroth", "Power Solutions", "Software & Digital"],
    soWhat:
      "Verified identity plus a geo-referenced plot is the precondition for billing anything by the acre. Custom hiring of farm machinery has failed repeatedly in India on trust and measurement, not on demand. Those are exactly the two things this registry fixes, and we hold the hydraulics and sensing content.",
    confidence: "Medium", impact: 3,
  },
  {
    id: "SG-2026-0288", date: "2026-02-28", horizon: "H0", kind: "market",
    source: "Ministry of MSME · Budget documents", org: "MoMSME",
    pillar: "V2", sector: "S2", problem: null, src: "verified",
    title: "Udyam registrations reach 7.83 crore; TReDS mandated for CPSE purchases",
    body:
      "Registrations on the Udyam portal and Udyam Assist Platform reached 7.83 crore as of 28 Feb 2026, up from 0.79 crore in FY22. Budget 2026-27 announced mandatory TReDS settlement for CPSE purchases, CGTMSE-backed invoice discounting, GeM–TReDS integration and securitisation of TReDS receivables. ZED certification carries an 80/60/50% subsidy for micro/small/medium enterprises.",
    status: "In force",
    units: ["Corporate Sourcing", "Powertrain Solutions"],
    soWhat:
      "A formalised, credit-visible supplier base is the precondition for PLI's 50% domestic value-addition threshold. Lifting our tier-2 suppliers into ZED and TReDS is not supplier development spending — it is how our own incentive eligibility gets constructed, and it is 50–80% subsidised.",
    confidence: "High", impact: 4,
  },
];

/* ---------- policy intelligence: three states --------------------------- */
export const POLICY = {
  existing: [
    { name: "PM E-DRIVE", body: "MHI", status: "In force to 31 Mar 2028 (e-2W subsidy closed 31 Jul 2026)", value: "₹10,900 cr", exposure: "high", note: "₹2,322 cr released; 26.54 lakh EVs supported" },
    { name: "PLI-Auto", body: "MHI", status: "Incentive period ends FY2026-27", value: "₹25,938 cr", exposure: "high", note: "13–18% on BEV/FCEV; 50% domestic value addition required" },
    { name: "PLI-ACC battery cells", body: "MHI", status: "Execution gap", value: "₹18,100 cr", exposure: "high", note: "40 GWh awarded, ≈1.4 GWh built, no incentive claimed" },
    { name: "REPM magnet scheme", body: "MHI", status: "Bids opened, award pending", value: "₹7,280 cr", exposure: "high", note: "6,000 MTPA across five beneficiaries" },
    { name: "India Semiconductor Mission", body: "MeitY", status: "12 projects approved, ramping", value: "₹1.64 lakh cr", exposure: "medium", note: "₹5,000 cr disbursed; 9 of 12 are OSAT/ATMP" },
    { name: "Digital Agriculture Mission", body: "MoA", status: "Ahead of plan", value: "₹2,817 cr", exposure: "low", note: "10.31 cr Farmer IDs; 19 state MoUs" },
    { name: "ZED / RAMP (MSME)", body: "MoMSME", status: "In force", value: "80/60/50% subsidy", exposure: "medium", note: "Applies to our own tier-2 base" },
  ],
  emerging: [
    { name: "CAFE-III", body: "MoP · BEE", status: "Draft issued 16 Jul 2026, consultation closed 6 Aug", when: "Applies FY2027-28", exposure: "high", note: "Final notification awaited — the single largest demand-shaper to 2032" },
    { name: "PLI-Auto successor", body: "MHI", status: "Not yet drafted", when: "Drafting window FY27", exposure: "high", note: "Predicted, not announced. The window to influence is before it is written" },
    { name: "MIDC → WLTP migration", body: "MoP · MoRTH", status: "Phased in CAFE-III draft", when: "2027 onward", exposure: "high", note: "Re-homologation and re-calibration across the portfolio" },
    { name: "India Energy Stack / UEI", body: "MoP · REC", status: "Strategy document v0.4, pilots live", when: "2026–28", exposure: "medium", note: "Standards seats still open" },
    { name: "State ELV and scrappage policies", body: "State governments", status: "Rolling", when: "Continuous", exposure: "medium", note: "28 states and 8 UTs on independent cycles" },
    { name: "DPDP rules for vehicle and telematics data", body: "MeitY", status: "Phasing in", when: "2026–27", exposure: "medium", note: "Becomes a bid qualifier for connected services" },
  ],
  /* Requirement from the review: track where we are NOT present but could be. */
  unrecognised: [
    { name: "Automotive-grade semiconductor qualification standards", body: "ISM · BIS", why: "Nine of twelve approved ISM projects are packaging and test. No domestic AEC-Q qualification ecosystem exists around them, and standards are being written now.", gap: "No Bosch seat identified", value: "Standards authority in a capacity build-out we will later buy from" },
    { name: "UEI settlement and metering integrity", body: "UEI Alliance · MoP", why: "Interoperable energy transactions need tamper-evident, metering-grade measurement. The alliance is convened around apps and networks, not measurement.", gap: "Not a member of the alliance", value: "The layer that did not commoditise when payments did" },
    { name: "Battery residual-value and state-of-health standards", body: "RBI · IRDAI · MHI", why: "EV financing is gated by residual-value uncertainty. Credit is a named DPI priority sector, and no accepted SoH standard exists for underwriting.", gap: "Engineering data exists, no regulatory engagement", value: "Turns a diagnostic capability into a credit primitive" },
    { name: "District-led procurement aggregation", body: "NITI · state governments", why: "DPI@2047 names district-led demand aggregation as an execution imperative. Depot charging and fleet electrification will be tendered at district scale.", gap: "Our go-to-market is OEM and national, not district", value: "Changes who the customer is before competitors notice" },
    { name: "IP democratisation and public research licensing", body: "DST · CSIR", why: "Public-lab IP licensing terms for critical mineral processing and materials are being set with little private input.", gap: "No structured engagement", value: "Access to processing IP without owning the asset" },
  ],
};

/* ---------- regulatory calendar ----------------------------------------- */
export const CALENDAR = [
  { when: "FY2026-27", what: "PLI-Auto incentive period ends", why: "₹25,938 cr scheme sunsets; successor drafting window opens", risk: "high", horizon: "H0" },
  { when: "Late 2026", what: "Dholera fab targets first silicon", why: "50,000 wafers/month, automotive named as a target segment", risk: "med", horizon: "H0" },
  { when: "1 Apr 2027", what: "CAFE-III applies to M1 fleet", why: "94.76 gCO₂/km tightening to 78.90 by FY32", risk: "high", horizon: "H1" },
  { when: "2027 onward", what: "MIDC to WLTP migration", why: "Re-homologation and re-calibration across the portfolio", risk: "high", horizon: "H1" },
  { when: "31 Mar 2028", what: "PM E-DRIVE terminal date", why: "e-3W, e-buses, e-trucks and charging support ends", risk: "med", horizon: "H1" },
  { when: "2030", what: "First NITI milestone review", why: "Study specifies review gates at 2030, 2035 and 2047", risk: "med", horizon: "H2" },
  { when: "FY2030-31", what: "Critical mineral recycling incentive ends", why: "270 kt capacity target; partner economics change after", risk: "med", horizon: "H2" },
  { when: "2035", what: "DPI 3.0 begins; ZEV acceleration targets", why: "Roadmap shifts from bottleneck removal to local high-value growth", risk: "high", horizon: "H3" },
  { when: "Rolling", what: "State EV and ELV policies", why: "28 states and 8 UTs on independent cycles", risk: "med", horizon: "H0" },
];

/* ---------- scenario data (NITI CPS vs NZS) ------------------------------ */
export const TRANSPORT_FUEL = [
  { name: "Petroleum", cur: 86, cps50: 61, cps70: 46, nzs50: 49, nzs70: 21 },
  { name: "Electricity", cur: 2, cps50: 14, cps70: 24, nzs50: 19, nzs70: 45 },
  { name: "Biofuels", cur: 4, cps50: 7, cps70: 8, nzs50: 13, nzs70: 20 },
  { name: "Gas / CBG", cur: 8, cps50: 18, cps70: 22, nzs50: 17, nzs70: 10 },
  { name: "H₂ derivatives", cur: 0, cps50: 0, cps70: 0, nzs50: 1, nzs70: 4 },
];

export const ENERGY_DEMAND = [
  { year: "2026", cps: 137, nzs: 137 },
  { year: "2050", cps: 335, nzs: 250 },
  { year: "2070", cps: 307, nzs: 192 },
];

export const POWER_CAP = [
  { year: "2024", cps: 523, nzs: 523 },
  { year: "2050", cps: 2650, nzs: 3815 },
  { year: "2070", cps: 4700, nzs: 7075 },
];

export const BESS = [
  { year: "2026", cps: 0.5, nzs: 0.5 },
  { year: "2050", cps: 470, nzs: 1025 },
  { year: "2070", cps: 1350, nzs: 2750 },
];

export const MINERAL_DRIVERS = [
  { name: "EV batteries", share: 55, tone: "market" },
  { name: "Solar PV", share: 31, tone: "gazette" },
  { name: "Grid storage", share: 5, tone: "scenario" },
  { name: "Wind, motors, electrolysers", share: 9, tone: "nation" },
];

export const HEADLINE = [
  { k: "Transport energy, 2070", cps: "307 Mtoe", nzs: "192 Mtoe", note: "Vol. 3, Table E.1" },
  { k: "Petroleum share of transport, 2070", cps: "46%", nzs: "21%", note: "86% today" },
  { k: "Electricity share of final energy, 2070", cps: "~40%", nzs: "~60%", note: "21% in 2025" },
  { k: "Non-fossil generation, 2070", cps: "~60%", nzs: "80–85%", note: "23% today" },
  { k: "Cars per 1,000 people, 2070", cps: "250", nzs: "200", note: "32 today" },
  { k: "Public + shared road share, 2070", cps: "50%", nzs: "60%", note: "47% today" },
  { k: "Freight moved by rail, 2070", cps: "25%", nzs: "30%", note: "22% today" },
  { k: "Transport investment, 2026–70", cps: "$3.44 tn", nzs: "$4.3 tn", note: "Vol. 3 / Vol. 9" },
  { k: "Electricity demand, 2070", cps: "9,718 TWh", nzs: "12,997 TWh", note: "1,541 TWh in FY24" },
  { k: "Battery storage, 2070", cps: "1,300–1,400 GW", nzs: "2,500–3,000 GW", note: "<0.5 GW today" },
  { k: "Cumulative critical minerals", cps: "~112 Mt", nzs: "~169 Mt", note: "Vol. 10, +51%" },
  { k: "Power-sector investment to 2070", cps: "$8.79 tn", nzs: "$14.23 tn", note: "Vol. 7" },
];

/* ---------- trajectory: indicators across the full time spine ----------- */
/* Requirement: the future outlook is not static. Each indicator is projected
   across every horizon under both scenarios. */
export const TRAJECTORY = [
  {
    id: "T1", name: "Electricity share of transport energy", unit: "%",
    series: [
      { year: "2026", cps: 2, nzs: 2 }, { year: "2028", cps: 3, nzs: 4 },
      { year: "2030", cps: 5, nzs: 7 }, { year: "2035", cps: 8, nzs: 13 },
      { year: "2047", cps: 13, nzs: 18 }, { year: "2070", cps: 24, nzs: 45 },
    ],
    soWhat: "The two scenarios barely separate before 2035. Divergence is a late-cycle phenomenon, which means positioning decisions made now are bets on the 2035+ shape, not the 2030 one.",
  },
  {
    id: "T2", name: "Cars per 1,000 people", unit: "vehicles",
    series: [
      { year: "2026", cps: 34, nzs: 34 }, { year: "2028", cps: 41, nzs: 40 },
      { year: "2030", cps: 52, nzs: 49 }, { year: "2035", cps: 84, nzs: 76 },
      { year: "2047", cps: 152, nzs: 130 }, { year: "2070", cps: 250, nzs: 200 },
    ],
    soWhat: "Even the Net Zero case is a six-fold increase in car ownership. Decarbonisation here is not degrowth — the fleet grows in every scenario and the argument is only about what is under the bonnet.",
  },
  {
    id: "T3", name: "Public + shared share of road passenger travel", unit: "%",
    series: [
      { year: "2026", cps: 47, nzs: 47 }, { year: "2028", cps: 47, nzs: 48 },
      { year: "2030", cps: 48, nzs: 50 }, { year: "2035", cps: 48, nzs: 53 },
      { year: "2047", cps: 49, nzs: 57 }, { year: "2070", cps: 50, nzs: 60 },
    ],
    soWhat: "The Net Zero case needs modal share to move against the ownership trend above. That only happens through fleets, and fleets buy uptime contracts rather than components.",
  },
  {
    id: "T4", name: "Battery storage capacity", unit: "GW",
    series: [
      { year: "2026", cps: 1, nzs: 1 }, { year: "2028", cps: 8, nzs: 14 },
      { year: "2030", cps: 26, nzs: 48 }, { year: "2035", cps: 95, nzs: 190 },
      { year: "2047", cps: 340, nzs: 700 }, { year: "2070", cps: 1350, nzs: 2750 },
    ],
    soWhat: "The steepest curve in the dataset, and the one furthest from its target today. Entry through power conversion and thermal rather than cells avoids the failure mode PLI-ACC is currently demonstrating.",
  },
  {
    id: "T5", name: "Public charging points installed", unit: "thousands",
    series: [
      { year: "2026", cps: 53, nzs: 53 }, { year: "2028", cps: 88, nzs: 120 },
      { year: "2030", cps: 140, nzs: 230 }, { year: "2035", cps: 310, nzs: 620 },
      { year: "2047", cps: 900, nzs: 1900 }, { year: "2070", cps: 2100, nzs: 4200 },
    ],
    soWhat: "Projections assume commissioning capacity that visibly does not exist — 6,562 approved chargers currently sit at zero installed. Whoever solves commissioning captures a decade of this curve.",
  },
];

/* ---------- forecast validation ledger ---------------------------------- */
/* Requirement: store what was predicted before, what is predicted now, and
   what changed. This is the learning loop that keeps the model honest. */
export const FORECAST_LEDGER = [
  {
    id: "F1", indicator: "PM E-DRIVE e-2W subsidy end date",
    lastYear: "31 Jul 2026 (as scheduled)",
    current: "31 Jul 2026 — closed as scheduled",
    next: "No successor announced for e-2W demand support",
    shift: "reverted", confidence: "High",
    why: "This board briefly recorded a move to 31 Mar 2028 on the strength of trade-press reports of a two-year extension. The extension applied to e-3W, e-trucks, e-buses and charging — not to two-wheelers. Corrected 10 Sep 2026 against the parliamentary reply.",
    lesson: "Segment-level detail was lost in secondary reporting. Scheme amendments must be read at segment granularity before they touch a volume forecast.",
  },
  {
    id: "F2", indicator: "Public charging points installed, 2028",
    lastYear: "≈150,000",
    current: "≈88,000 (current policy)",
    next: "Downgrade likely if commissioning does not start",
    shift: "down", confidence: "Medium",
    why: "6,562 PM E-DRIVE chargers approved with zero installed forced a reassessment of commissioning throughput, not of demand or funding.",
    lesson: "We were forecasting the funding curve and calling it the deployment curve. They are different curves and they have diverged.",
  },
  {
    id: "F3", indicator: "Cell capacity operational under PLI-ACC",
    lastYear: "≈15 GWh by 2026",
    current: "≈1.4 GWh built",
    next: "10–15 GWh by 2028, low confidence",
    shift: "down", confidence: "Low",
    why: "Awarded capacity has not converted. No beneficiary has claimed incentive to date.",
    lesson: "Award announcements were treated as capacity. Only commissioned lines should enter a supply assumption.",
  },
  {
    id: "F4", indicator: "CAFE-III FY32 fleet target",
    lastYear: "~80 gCO₂/km expected",
    current: "78.90 gCO₂/km (draft)",
    next: "Final notification may soften on WLTP transition",
    shift: "stable", confidence: "High",
    why: "Draft landed close to the anticipated stringency. The flexibilities — pooling, super-credits, buyout — were the surprise, not the target.",
    lesson: "We forecast the number correctly and missed the mechanism. The mechanism is where the commercial opportunity turned out to be.",
  },
  {
    id: "F5", indicator: "Farmer IDs issued under AgriStack",
    lastYear: "≈6 cr by mid-2026",
    current: "10.31 cr as of Aug 2026",
    next: "11 cr target likely met early",
    shift: "up", confidence: "Medium",
    why: "State MoU signings and the Digital Crop Survey moved faster than assumed. 19 states now participating.",
    lesson: "We systematically under-forecast DPI rollouts and over-forecast physical infrastructure. Worth correcting for as a standing bias.",
  },
];

/* ---------- KPI cockpit -------------------------------------------------- */
export const KPIS = [
  { id: "K1", name: "Public charging points installed", type: "lagging", value: "52,718", delta: "+3.1% QoQ", dir: "up", good: true, sector: "S6", note: "16,561 fast chargers", src: "illustrative" },
  { id: "K2", name: "PM E-DRIVE chargers approved but not installed", type: "leading", value: "6,562", delta: "no change", dir: "flat", good: false, sector: "S6", note: "Commissioning bottleneck indicator", src: "verified" },
  { id: "K3", name: "UEI daily charging sessions", type: "leading", value: "≈13,000", delta: "growing", dir: "up", good: true, sector: "S6", note: "≈60 MWh/day across ~30 alliance members", src: "verified" },
  { id: "K4", name: "Cell capacity commissioned vs awarded", type: "lagging", value: "1.4 / 40 GWh", delta: "3.5%", dir: "flat", good: false, sector: "S6", note: "No incentive claimed to date", src: "illustrative" },
  { id: "K5", name: "Udyam MSME registrations", type: "leading", value: "7.83 cr", delta: "+9.9× since FY22", dir: "up", good: true, sector: "S2", note: "Supplier formalisation depth", src: "verified" },
  { id: "K6", name: "Farmer IDs issued", type: "leading", value: "10.31 cr", delta: "ahead of plan", dir: "up", good: true, sector: "S1", note: "Against an 11 cr three-year target", src: "verified" },
  { id: "K7", name: "ISM projects approved", type: "lagging", value: "12", delta: "₹1.64 lakh cr", dir: "up", good: true, sector: "S7", note: "9 of 12 are packaging and test", src: "verified" },
  { id: "K8", name: "e-trucks supported under PM E-DRIVE", type: "lagging", value: "55", delta: "against a dedicated line", dir: "flat", good: false, sector: "S6", note: "Heavy-duty electrification stalled", src: "verified" },
  { id: "K9", name: "Fossil-dependent districts", type: "lagging", value: "150+", delta: "≈1/3 of population", dir: "flat", good: false, sector: "S3", note: "Transition exposure concentration", src: "verified" },
  { id: "K10", name: "Petroleum share of transport energy", type: "lagging", value: "≈86%", delta: "→46% or 21% by 2070", dir: "down", good: true, sector: "S6", note: "Scenario-dependent", src: "verified" },
];

/* ---------- opportunity map --------------------------------------------- */
/* Review feedback was explicit: obvious opportunities were rejected. Each entry
   here must clear a test — would a competent competitor reading only the news
   already have this on their list? If yes, it belongs in SCREENED_OUT. */
export const OPPS = [
  {
    id: "OP-01", name: "Charger commissioning and grid-connection services",
    stance: "White space", horizon: "H0", conviction: 5, effort: 3,
    unit: "Energy & Building Technology", pillar: "V2", sector: "S6", problem: "PR-03",
    driver: "6,562 chargers approved under PM E-DRIVE with zero installed, against 9,583 installed under the earlier FAME-II scheme. Support runs to 31 Mar 2028.",
    thesis: "The binding constraint on India's charging build-out is not capital and has not been for two years. It is land, DISCOM connection approval, commissioning manpower and O&M — a project-execution problem sitting behind committed public money.",
    move: "Package site survey, DISCOM liaison, commissioning and uptime O&M as a single contracted service to CPOs and state transport undertakings. Sell throughput, not hardware.",
    boschWhy: "We already hold the power electronics, the service network and the industrial project discipline. This monetises the network before the hardware volume arrives.",
    capabilities: ["Utility interconnection engineering", "Distributed field service ops", "Energy management software", "Public-sector contracting"],
    risk: "Services margin profile differs from component business; requires a P&L that tolerates it.",
    window: "Now — funding is committed and expires 2028",
  },
  {
    id: "OP-02", name: "Automotive-grade qualification for domestic semiconductors",
    stance: "White space", horizon: "H1", conviction: 4, effort: 4,
    unit: "Cross-Domain Computing · Corporate", pillar: "V3", sector: "S7", problem: "PR-07",
    driver: "Nine of twelve approved ISM projects are packaging and test. Tata–PSMC's Dholera fab names automotive as a target segment and targets first silicon late 2026.",
    thesis: "India is acquiring silicon capacity far faster than the automotive qualification competence that capacity needs to sell into vehicles. AEC-Q qualification, reliability engineering and failure analysis are a separate discipline from packaging, and no domestic ecosystem provides them.",
    move: "Establish qualification and reliability engineering as a service to domestic fabs and OSATs, and take the standards seat while the standards are unwritten.",
    boschWhy: "Automotive semiconductor qualification is a competence we hold globally and one of the few where we would be the most credible party in the country on day one.",
    capabilities: ["AEC-Q100/Q104 test engineering", "Failure analysis labs", "Standards committee participation", "Fab and OSAT partnership management"],
    risk: "Long qualification cycles; revenue lags capability build by years.",
    window: "24 months, before the first automotive silicon ships",
  },
  {
    id: "OP-03", name: "Metering-grade telemetry as the UEI trust layer",
    stance: "White space", horizon: "H1", conviction: 4, effort: 3,
    unit: "Energy & Building Technology · BGSW", pillar: "V2", sector: "S6", problem: "PR-03",
    driver: "UEI is Beckn-based and endorsed by the Ministry of Power; ~30 alliance members, ≈13,000 sessions and 60 MWh a day.",
    thesis: "Interoperable settlement between untrusting parties requires measurement nobody can dispute. In UPI, the apps commoditised and the trust substrate did not. The equivalent here is tamper-evident, metering-grade measurement inside the charger — and the alliance is convened around apps, not metrology.",
    move: "Build legally-defensible metering and telemetry into charging hardware, then take a seat on the UEI standards body to make it the reference implementation.",
    boschWhy: "Sensing and measurement integrity is the oldest competence in the company. This is that competence pointed at a rail the state has already endorsed.",
    capabilities: ["Legal metrology certification", "Secure element / attestation", "Protocol standards engagement", "Edge telemetry"],
    risk: "Standards capture is slow and may be won by an incumbent metering vendor.",
    window: "Standard is unwritten — first mover writes it",
  },
  {
    id: "OP-04", name: "Battery state-of-health as a credit primitive",
    stance: "New business model", horizon: "H1", conviction: 4, effort: 3,
    unit: "Software & Digital · Mobility Services", pillar: "V2", sector: "S5", problem: null,
    driver: "Credit is a named DPI 2.0 priority sector. EV adoption is gated by financing; financing is gated by residual-value uncertainty with no accepted SoH standard.",
    thesis: "This is deliberately not a battery passport, which is a compliance artefact everyone has already listed. The unclaimed position is upstream of compliance: an SoH measure that a lender or insurer will underwrite against. That converts a diagnostic output into a financial instrument input.",
    move: "Work with lenders, IRDAI and fleet operators to define an underwritable SoH standard, then supply the measurement. Revenue attaches to loan origination volume, not to vehicles.",
    boschWhy: "We hold the diagnostic data and the workshop network that verifies it. The counterparty is a bank, which is a customer we do not currently have.",
    capabilities: ["Financial-grade data assurance", "Actuarial partnership", "Regulatory engagement with RBI/IRDAI", "Fleet data pipelines"],
    risk: "Requires selling to financial institutions — a motion we have no muscle for.",
    window: "Before a lender consortium sets its own standard",
  },
  {
    id: "OP-05", name: "Reduced-REE and magnet-free traction motors",
    stance: "Defend and deepen", horizon: "H1", conviction: 5, effort: 4,
    unit: "Electrified Mobility", pillar: "V4", sector: "S6", problem: "PR-02",
    driver: "NITI Vol. 10 flags Nd-Pr-Dy-Tb concentration as the binding constraint on EV motors and wind. The ₹7,280 cr REPM scheme fixes domestic supply but not price.",
    thesis: "Re-shoring magnet capacity solves availability on a two-year clock and leaves price exposure fully intact — arguably worse, since five domestic beneficiaries with allocated capacity have limited incentive to compete on price.",
    move: "Bring a ferrite-assisted synchronous reluctance or wound-rotor line into the Tata AutoComp JV roadmap as the hedge product rather than the fallback.",
    boschWhy: "Motor design depth is ours. This turns magnet price from a constraint we absorb into a lever we choose to pull.",
    capabilities: ["Reluctance machine design", "Advanced control algorithms", "NVH engineering for non-PM machines", "Alternative-materials sourcing"],
    risk: "Torque density penalty may be unacceptable to OEM customers in premium segments.",
    window: "24–36 months, before magnet allocation contracts lock",
  },
  {
    id: "OP-06", name: "Farm machinery billed by the acre on AgriStack rails",
    stance: "Adjacent", horizon: "H2", conviction: 3, effort: 4,
    unit: "Bosch Rexroth · Power Solutions", pillar: "V1", sector: "S1", problem: "PR-05",
    driver: "10.31 cr Farmer IDs and 31.3 cr plots surveyed across 648 districts. 19 states signed on.",
    thesis: "Custom hiring of farm machinery has failed repeatedly in India on trust and measurement, not on demand. A verified farmer identity plus a geo-referenced plot fixes exactly those two failures — which makes per-acre billing enforceable for the first time.",
    move: "Hydraulic and sensing content designed for service-model economics — metered by area worked — sold to custom hiring centres and FPOs rather than to farmers.",
    boschWhy: "We hold the hydraulics position already. The registry is what converts it from a capital sale into recurring revenue.",
    capabilities: ["Area-metering sensing", "Rural service network", "FPO channel development", "AgriStack API integration"],
    risk: "Rural credit and collection risk; a channel we do not currently operate.",
    window: "Pilot 2027–28, follows state AgriStack rollout",
  },
  {
    id: "OP-07", name: "Selling grams: CAFE-III compliance as a priced service",
    stance: "Extend the core", horizon: "H0", conviction: 5, effort: 2,
    unit: "Powertrain Solutions", pillar: "V2", sector: "S6", problem: "PR-01",
    driver: "Buyout priced at ₹2,500 per gCO₂/km in FY28 rising to ₹4,500 by FY32. Pooling permitted across up to three manufacturers. Unused credits lapse at block end.",
    thesis: "The regulation puts an explicit, published rupee price on a gram of CO₂. That converts every efficiency technology from a specification argument into an arithmetic one, and the lapse rule forces customers to spend inside specific years rather than whenever convenient.",
    move: "Reprice the entire efficiency portfolio — thermal, friction, 48V, calibration services — in ₹/gram terms against each customer's fleet position and compliance block.",
    boschWhy: "No new capability required. This is a commercial reframing of content we already sell, using the customer's own compliance arithmetic.",
    capabilities: ["Fleet CO₂ modelling per customer", "Commercial reframing of the catalogue", "Pooling-scenario advisory"],
    risk: "Requires customer fleet data we may not be given.",
    window: "Now — before the final notification lands",
  },
  {
    id: "OP-08", name: "Shared production-telemetry layer for the tier-2 supplier base",
    stance: "White space", horizon: "H1", conviction: 3, effort: 3,
    unit: "Corporate Sourcing · BGSW", pillar: "V2", sector: "S2", problem: null,
    driver: "7.83 cr Udyam registrations; ZED certification subsidised at 80/60/50%; PLI-Auto requires 50% domestic value addition.",
    thesis: "Lifting suppliers to ZED and PLI-qualifying depth is usually framed as supplier development cost. Framed correctly it is a data play: a shared quality and OEE telemetry layer across our tier-2 base both creates the compliance evidence and generates a production dataset nobody else in the country holds.",
    move: "Deploy a light telemetry and quality layer across tier-2 suppliers, funded substantially by existing ZED and RAMP subsidy rather than by our own budget.",
    boschWhy: "We are the anchor customer, so adoption is not a sales problem. The resulting dataset is the input to any future industrial-AI offer.",
    capabilities: ["Industrial IoT at low cost point", "Supplier change management", "Subsidy scheme navigation", "Data governance and consent"],
    risk: "Supplier data-sharing resistance; DPDP obligations on industrial data.",
    window: "Now — subsidy is live",
  },
  {
    id: "OP-09", name: "Heavy-duty hydrogen for captive corridors",
    stance: "Adjacent", horizon: "H3", conviction: 3, effort: 5,
    unit: "Powertrain Solutions", pillar: "V2", sector: "S6", problem: "PR-01",
    driver: "H₂-based ammonia and e-methanol reach 4% of transport energy by 2070 in the Net Zero case. CAFE-III assigns fuel-cell vehicles a super-credit multiplier of 5 against BEV's 4.",
    thesis: "The multiplier asymmetry is the tell. A regulator does not price fuel-cell credit above battery credit by accident — it is buying optionality for segments where batteries will not work. Mining, port and cement corridors have captive duty cycles and single-point refuelling, which removes the infrastructure objection.",
    move: "H₂ injection and fuel-cell competence positioned at captive corridor operators, not at general road freight.",
    boschWhy: "Injection and fuel-cell stack competence exists in the group. India offers captive corridors as a test bed with a regulator already signalling support.",
    capabilities: ["H₂ injection systems", "Fuel-cell stack integration", "Corridor operator partnerships", "Safety certification for H₂"],
    risk: "Highest effort on the board; may not clear a hurdle rate before 2032.",
    window: "Pilot 2027–29, scale post-2032",
  },
  {
    id: "OP-10", name: "Technician certification authority for EV and battery service",
    stance: "Licence to operate", horizon: "H0", conviction: 3, effort: 2,
    unit: "Corporate · Training", pillar: "V1", sector: "S3", problem: "PR-06",
    driver: "150+ districts depend on fossil supply chains, sustaining roughly a third of the population. NITI Vol. 11 routes reskilling through the Skill Council for Green Jobs.",
    thesis: "Training revenue is small and always will be. Certification authority is not: whoever defines the competence standard for EV and battery technicians shapes aftermarket access for two decades and earns a seat at every state-level transition conversation.",
    move: "Convert the vocational network into the certifying body, in partnership with the Skill Council for Green Jobs rather than in competition with it.",
    boschWhy: "Modest revenue, outsized standing with state governments — and standing is what determines who gets consulted before a policy is drafted.",
    capabilities: ["Curriculum and assessment design", "NCVET accreditation process", "State government relations", "Trainer-of-trainers scale-up"],
    risk: "Non-monetary return; hard to defend in a portfolio review on financial metrics alone.",
    window: "Now",
  },
];

/* Shown deliberately: the review rejected these as too obvious. Keeping the
   rejection visible is how the board demonstrates its own filter. */
export const SCREENED_OUT = [
  { name: "Battery passport / traceability", why: "Named in policy documents and on every competitor's roadmap. Compliance artefact with commodity economics. The defensible version is OP-04, which sits upstream in underwriting." },
  { name: "Flex-fuel and ethanol calibration", why: "Well understood, already contested, and the volume case depends on blending mandates we do not influence." },
  { name: "CBG engine management", why: "Same reasoning as flex-fuel. Real but not differentiating, and it does not create a new customer." },
  { name: "Generic grid-scale BESS cells", why: "PLI-ACC has demonstrated what happens to entrants without cell-manufacturing depth: 40 GWh awarded, 1.4 GWh built. Entry belongs at power conversion and thermal instead." },
];

/* ---------- capability development -------------------------------------- */
export const CAPABILITY_GROUPS = [
  { id: "CG1", name: "Systems & domain", tone: "market", items: ["Reluctance machine design", "H₂ injection systems", "Utility interconnection engineering", "Legal metrology certification", "AEC-Q test engineering"] },
  { id: "CG2", name: "Digital & cloud", tone: "scenario", items: ["Edge telemetry at low cost point", "Fleet data pipelines", "Industrial IoT platform", "AgriStack / ONDC API integration", "Data governance and consent under DPDP"] },
  { id: "CG3", name: "AI & analytics", tone: "nation", items: ["State-of-health estimation models", "Fleet CO₂ scenario modelling", "Predictive maintenance for depot assets", "Multi-source policy extraction"] },
  { id: "CG4", name: "Commercial & institutional", tone: "gazette", items: ["Public-sector and district contracting", "Standards committee participation", "Regulatory engagement with RBI/IRDAI", "Subsidy scheme navigation", "FPO and rural channel development"] },
];

/* ---------- risk register ------------------------------------------------ */
/* Two axes from the review: known vs unknown, and risk of action vs inaction. */
export const RISKS = [
  { id: "R1", name: "Magnet price exposure survives re-shoring", known: "known", axis: "inaction", severity: 5, likelihood: 4, pillar: "V4", link: "OP-05",
    body: "Five domestic beneficiaries with allocated capacity and a 7-year incentive tenure have limited incentive to compete on price. Availability improves; cost does not.",
    mitigation: "Reduced-REE motor line as a hedge, plus anchor offtake with a recycler-backed bidder rather than a pure miner." },
  { id: "R2", name: "Charging build-out never commissions", known: "known", axis: "inaction", severity: 4, likelihood: 4, pillar: "V2", link: "OP-01",
    body: "6,562 approved chargers with zero installed. If commissioning throughput does not change, every EV volume forecast that assumes charging availability is wrong.",
    mitigation: "Treat commissioning as the product (OP-01) rather than waiting for the hardware market to arrive." },
  { id: "R3", name: "CAFE-III final notification softens materially", known: "known", axis: "action", severity: 4, likelihood: 2, pillar: "V2", link: "OP-07",
    body: "Consultation closed 6 Aug 2026. Industry pressure on the WLTP transition could delay or dilute the trajectory, undercutting an efficiency portfolio repriced against the draft.",
    mitigation: "Price the offer against the compliance mechanism, which survives dilution, rather than against a specific gram target." },
  { id: "R4", name: "Services P&L rejected by a component-shaped organisation", known: "known", axis: "action", severity: 4, likelihood: 4, pillar: "V2", link: "OP-01",
    body: "Three of the strongest opportunities on this board are services or data businesses with margin and working-capital profiles unlike our component business. The usual failure is internal, not competitive.",
    mitigation: "Ring-fence P&L and hurdle rates before committing, not after the first review cycle questions them." },
  { id: "R5", name: "Successor to PLI-Auto drafted without us in the room", known: "known", axis: "inaction", severity: 4, likelihood: 3, pillar: "V4", link: null,
    body: "PLI-Auto ends FY2026-27. The successor will be drafted during FY27. Value-addition definitions set in that draft determine our incentive eligibility for the following decade.",
    mitigation: "Structured engagement during the drafting window, which is the cheapest influence available anywhere on this board." },
  { id: "R6", name: "Standards capture by an incumbent in UEI metering", known: "known", axis: "inaction", severity: 3, likelihood: 3, pillar: "V4", link: "OP-03",
    body: "We are not a member of the UEI Alliance. A metering vendor that is could define the measurement reference before we engage.",
    mitigation: "Join the alliance now; membership cost is trivial relative to the option value." },
  { id: "R7", name: "A domestic entrant solves magnet-free motors first", known: "unknown", axis: "inaction", severity: 4, likelihood: 2, pillar: "V3", link: "OP-05",
    body: "Screening has not established who else is working on reluctance or wound-rotor machines in India. Absence of evidence here is genuinely absence of search, not absence of competitors.",
    mitigation: "Explicit screening sweep on motor IP and patent filings before the JV roadmap locks." },
  { id: "R8", name: "DPDP obligations make fleet and telematics data unusable", known: "unknown", axis: "action", severity: 3, likelihood: 3, pillar: "V4", link: "OP-04",
    body: "Consent and lineage requirements are still phasing in. Several data-attached opportunities assume access to vehicle and fleet data on terms not yet settled.",
    mitigation: "Design for consent and data minimisation now; retrofitting it later has repeatedly proved more expensive." },
  { id: "R9", name: "Scenario divergence arrives later than the investment case needs", known: "unknown", axis: "action", severity: 3, likelihood: 3, pillar: "V2", link: null,
    body: "Both scenarios track closely to 2035. Capability built for the Net Zero shape may sit idle for a decade if the Current Policy path holds.",
    mitigation: "Prefer moves that pay in both scenarios — OP-01, OP-07 and OP-08 all do; OP-09 does not." },
];

/* ---------- portfolio exposure ------------------------------------------ */
export const DIVISIONS = [
  "Powertrain Solutions", "Electrified Mobility", "Chassis & Safety",
  "Cross-Domain Computing", "Two-Wheeler & Powersports", "Aftermarket",
  "Bosch Rexroth", "Energy & Building Tech", "Software (BGSW)",
];
export const VECTORS = [
  "CAFE-III / WLTP", "ZEV mandates", "Critical minerals", "Charging & grid",
  "Biofuels & CBG", "Hydrogen", "Circularity & ELV", "DPI rails", "Modal shift to rail",
];
// -2 structural exposure .. +2 core growth
export const EXPOSURE = [
  [-2, -1,  0,  0,  2,  0,  0,  0, -1],
  [ 1,  2, -2,  2, -1,  1,  1,  1, -1],
  [ 0,  1,  0,  0,  0,  0,  1,  0,  0],
  [ 1,  2,  0,  2,  0,  1,  1,  2,  1],
  [-1,  2, -1,  1,  1,  0,  0,  1,  0],
  [ 0, -1,  0,  1,  1,  0,  2,  1,  0],
  [ 0,  1, -1,  1,  0,  2,  1,  1,  1],
  [ 0,  1,  0,  2,  0,  1,  0,  2,  0],
  [ 1,  1,  0,  2,  0,  0,  2,  2,  1],
];

/* ---------- adjacency discovery ------------------------------------------ */
export const ADJACENCIES = [
  { from: "Power electronics (traction inverters)", to: "Grid-tied storage PCS", bridge: "Same switching topology, different duty cycle and certification", pull: "Battery storage 1 GW → 2,750 GW by 2070", distance: 1, sector: "S6" },
  { from: "Diagnostics and workshop network", to: "Residual-value underwriting data", bridge: "Measurement already collected, sold to a financial counterparty instead", pull: "Credit named a DPI 2.0 priority sector", distance: 2, sector: "S5" },
  { from: "Hydraulics for off-highway", to: "Per-acre farm service economics", bridge: "AgriStack registry makes area-metered billing enforceable", pull: "10.31 cr Farmer IDs", distance: 2, sector: "S1" },
  { from: "Sensor metrology", to: "Legal-metrology energy measurement", bridge: "Certification burden, not a technology gap", pull: "UEI settlement needs undisputed measurement", distance: 1, sector: "S6" },
  { from: "Automotive semiconductor qualification", to: "Domestic fab and OSAT services", bridge: "Capability transfer to a new customer type", pull: "12 ISM projects, 9 packaging and test", distance: 1, sector: "S7" },
  { from: "Vocational training network", to: "National certification authority", bridge: "Accreditation via NCVET and Skill Council for Green Jobs", pull: "150+ districts requiring reskilling", distance: 2, sector: "S3" },
  { from: "Tier-2 supplier development", to: "Industrial production dataset", bridge: "Telemetry funded by ZED/RAMP subsidy", pull: "7.83 cr formalised MSMEs", distance: 2, sector: "S2" },
];

/* ---------- nation building lens ---------------------------------------- */
/* Requirement: nation building is broader than product sales. Monetary and
   non-monetary contributions are both tracked, and both are legitimate. */
export const NATION_BUILDING = [
  { id: "N1", name: "EV and battery technician certification", type: "Non-monetary", pillar: "V1", sector: "S3",
    contribution: "Define the national competence standard through the Skill Council for Green Jobs.",
    returns: "Standing with state governments; aftermarket access shaped for two decades.", scale: "150+ districts", link: "OP-10" },
  { id: "N2", name: "Tier-2 MSME capability lift", type: "Mixed", pillar: "V2", sector: "S2",
    contribution: "Lift suppliers to ZED and PLI-qualifying depth using existing subsidy rather than our budget.",
    returns: "Our own PLI eligibility; a production dataset nobody else holds.", scale: "7.83 cr formalised MSMEs", link: "OP-08" },
  { id: "N3", name: "University research partnerships in materials", type: "Non-monetary", pillar: "V3", sector: "S3",
    contribution: "Co-funded work on reduced-REE magnets and mineral processing with public labs.",
    returns: "Access to processing IP without owning the asset; a hiring pipeline.", scale: "CSIR / IIT network", link: "OP-05" },
  { id: "N4", name: "Startup engagement in e-drive and motor IP", type: "Monetary", pillar: "V3", sector: "S7",
    contribution: "Invest in or acquire domestic motor-control and inverter capability.",
    returns: "Speed, and denial of the same capability to competitors.", scale: "Series B–D stage", link: "OP-05" },
  { id: "N5", name: "Depot charging for state transport undertakings", type: "Mixed", pillar: "V2", sector: "S6",
    contribution: "Commission and operate depot charging for public bus fleets.",
    returns: "Revenue plus the reference case that wins the next district tender.", scale: "14,000 e-buses allocated", link: "OP-01" },
  { id: "N6", name: "Standards participation across UEI, BIS and AIS", type: "Non-monetary", pillar: "V4", sector: "S6",
    contribution: "Take seats on the committees writing measurement and interoperability standards.",
    returns: "Rules shaped before they constrain us; earliest possible signal on direction.", scale: "Multiple bodies", link: "OP-03" },
];

/* ---------- ecosystem and deal radar ------------------------------------ */
export const ECO = [
  { name: "Magnet and rare-earth processors", type: "Segment", stage: "Pre-revenue", play: "Anchor offtake", fit: "Traction motor input security", note: "20 REPM bidders incl. L&T, Coal India, Neo Performance, Proterial", sector: "S6" },
  { name: "Advanced chemical recyclers", type: "Segment", stage: "Early revenue", play: "Offtake + JV", fit: "Core-return logistics via workshop network", note: "Attero and Lohum bid for magnet capacity too — both ends of the loop", sector: "S6" },
  { name: "Charge point operators", type: "Segment", stage: "Consolidating", play: "Component supply + services", fit: "Power conversion, commissioning, O&M", note: "6,562 approved chargers awaiting installation", sector: "S6" },
  { name: "OSAT and packaging entrants", type: "Segment", stage: "Scaling", play: "Qualification services", fit: "AEC-Q qualification and reliability", note: "Micron Sanand, Kaynes, Bhiwadi live; Dholera fab late 2026", sector: "S7" },
  { name: "UEI Alliance members", type: "Consortium", stage: "Pilot to scale", play: "Join + standards seat", fit: "Metering integrity layer", note: "≈30 members, ≈13,000 sessions/day", sector: "S6" },
  { name: "EV powertrain component start-ups", type: "Segment", stage: "Series B–D", play: "Acquire or invest", fit: "Motor control, inverters, e-drive software", note: "Screen specifically for magnet-free motor IP", sector: "S6" },
  { name: "Agri custom-hiring platforms", type: "Segment", stage: "Fragmented", play: "Partner", fit: "Channel for per-acre machinery service", note: "AgriStack integration is the qualifying test", sector: "S1" },
  { name: "Account Aggregator / lending infrastructure", type: "Segment", stage: "Scaling", play: "Partner", fit: "SoH data into underwriting", note: "New counterparty type for us", sector: "S5" },
  { name: "Tier-2 machining and stamping MSMEs", type: "Supplier tier", stage: "Established", play: "Develop", fit: "PLI value-addition depth", note: "ZED subsidy 80/60/50%; RAMP and MSE-CDP eligible", sector: "S2" },
  { name: "Public research and PSU labs", type: "Institution", stage: "n/a", play: "Co-develop", fit: "Materials, processing, recycling R&D", note: "IP licensing terms currently set with little private input", sector: "S3" },
];

/* ---------- move board --------------------------------------------------- */
export const MOVES = [
  { stage: "Explore", items: [
    { t: "Magnet-free motor architecture and competitor IP sweep", h: "H1", link: "OP-05", owner: "Electrified Mobility" },
    { t: "Per-acre farm service economics on AgriStack", h: "H2", link: "OP-06", owner: "Rexroth" },
    { t: "H₂ captive-corridor pilot scoping", h: "H3", link: "OP-09", owner: "Powertrain" },
  ]},
  { stage: "Shape", items: [
    { t: "Join UEI Alliance and bid for a metering standards seat", h: "H0", link: "OP-03", owner: "Energy & Building" },
    { t: "PLI-Auto successor drafting engagement", h: "H0", link: "R5", owner: "Strategy · Govt Affairs" },
    { t: "SoH underwriting standard with two lenders", h: "H1", link: "OP-04", owner: "BGSW" },
    { t: "AEC-Q qualification proposition to Dholera and OSATs", h: "H1", link: "OP-02", owner: "Cross-Domain Computing" },
  ]},
  { stage: "Pilot", items: [
    { t: "Charger commissioning contract with one STU", h: "H0", link: "OP-01", owner: "Energy & Building" },
    { t: "Tier-2 telemetry layer, 20 suppliers on ZED subsidy", h: "H0", link: "OP-08", owner: "Sourcing" },
    { t: "Technician certification pilot with SCGJ", h: "H0", link: "OP-10", owner: "Training" },
  ]},
  { stage: "Scale", items: [
    { t: "CAFE-III ₹/gram repricing across the efficiency catalogue", h: "H0", link: "OP-07", owner: "Powertrain" },
    { t: "eAxle and traction motor JV ramp", h: "H0", link: "SG-2026-0339", owner: "Electrified Mobility" },
  ]},
];

/* ---------- collective intelligence architecture ------------------------ */
export const AGENTS = [
  { name: "Statutory watcher", role: "Crawls e-Gazette, PIB, ministry portals and parliamentary Q&A. Resolves amendments to parent instruments so a scheme reads as one thread.", bias: "Over-weights what is written; blind to what is merely intended.", tone: "gazette" },
  { name: "Scenario modeller", role: "Holds the NITI two-scenario frame and projects every indicator across the full time spine.", bias: "Anchors to published models; will under-read discontinuities.", tone: "scenario" },
  { name: "Market scout", role: "Funding rounds, MCA filings, capacity announcements, patents and standards memberships.", bias: "Over-weights the announced; capacity announcements are not capacity.", tone: "market" },
  { name: "Contrarian", role: "Argues the opposite case for every opportunity and forces the risk-of-action column to be filled.", bias: "Deliberately negative. Its output is a required input, not a verdict.", tone: "risk" },
  { name: "Portfolio analyst", role: "Maps every finding onto divisional exposure and existing capability.", bias: "Sees the portfolio we have, not the one we could build.", tone: "nation" },
  { name: "Synthesiser", role: "Reconciles the others into a single 'so what', preserving disagreement where it is unresolved rather than averaging it away.", bias: "Last writer; must show its working.", tone: "win" },
];

export const SOURCES = [
  { g: "Statutory", items: ["e-Gazette (egazette.gov.in)", "PIB releases and Cabinet decisions", "Lok Sabha / Rajya Sabha Q&A", "Ministry consultation portals"] },
  { g: "Policy and planning", items: ["NITI Aayog volumes and division reports", "DPI@2047 roadmap", "Economic Survey and Union Budget", "State EV, ELV and industrial policies"] },
  { g: "Sector regulators", items: ["MoRTH / CMVR-TSC and AIS standards", "MHI scheme portals (PM E-DRIVE, PLI)", "BEE and Ministry of Power", "Ministry of Mines, GSI, NCMM", "MeitY and India Semiconductor Mission"] },
  { g: "Market and ecosystem", items: ["SIAM, ACMA, Vahan registrations", "MCA filings and SEBI disclosures", "Funding and M&A trackers", "Patent and standards committee filings"] },
  { g: "Internal", items: ["Divisional order book and pipeline", "Customer roadmap intelligence", "Plant capacity and localisation depth", "Supplier ZED and value-addition status"] },
];

/* ---------- conversational layer (scripted demo) ------------------------- */
export const CHAT = [
  { q: "What is the single most under-priced signal on this board?",
    a: "6,562 chargers approved under PM E-DRIVE with zero installed. Every other charging signal is about money; this one says money stopped being the constraint. The binding constraints are land, DISCOM connection and commissioning manpower — a services market with committed public funding and no incumbent. That is OP-01, and it is the only opportunity here that pays in both NITI scenarios and needs no new technology.",
    refs: ["SG-2026-0877", "PR-03", "OP-01"] },
  { q: "What did we get wrong recently?",
    a: "Two things. We recorded the PM E-DRIVE e-2W subsidy as extended to 31 Mar 2028; it actually closed on 31 Jul 2026 as originally scheduled — trade press conflated the segments that were extended with the two-wheeler line. And we forecast ≈150,000 chargers installed by 2028 against ≈88,000 now, because we were forecasting the funding curve and calling it the deployment curve. The standing bias the ledger shows: we under-forecast DPI rollouts and over-forecast physical infrastructure.",
    refs: ["F1", "F2", "F5"] },
  { q: "Why is CAFE-III more than an emissions rule?",
    a: "Because it publishes a price for a gram. Buyout runs from ₹2,500 per gCO₂/km in FY28 to ₹4,500 by FY32, so every efficiency technology can be quoted in the customer's own compliance arithmetic rather than argued on specification. Two second-order effects matter more than the targets: unused credits lapse at block end, which forces spend into specific years, and fuel-cell vehicles carry a super-credit multiplier of 5 against BEV's 4 — the regulator pricing hydrogen optionality.",
    refs: ["SG-2026-0741", "OP-07", "OP-09"] },
  { q: "Where are we not present but should be?",
    a: "Four places. Automotive-grade semiconductor qualification standards, where nine of twelve ISM projects are packaging and test and no AEC-Q ecosystem exists. UEI metering integrity, where we are not an alliance member. Battery state-of-health for underwriting, where we hold the data but have no regulatory engagement with RBI or IRDAI. And district-led procurement, which DPI@2047 names as an execution imperative while our go-to-market remains OEM and national.",
    refs: ["OP-02", "OP-03", "OP-04"] },
  { q: "What does India actually want by 2047, in one line?",
    a: "A $30–40 trillion economy that decarbonises while it grows rather than after it grows — reached by removing structural bottlenecks in eight sectors through shared digital rails, with energy and mineral security treated as sovereignty rather than as cost. Note what that implies: growth is not in question in either NITI scenario. Car ownership rises roughly six-fold even in the Net Zero case. The argument is about what is under the bonnet, not about how many.",
    refs: ["SG-2026-0698", "SG-2026-0203", "T2"] },
];
