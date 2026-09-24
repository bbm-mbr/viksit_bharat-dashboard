/* ============================================================================
   KPI FRAMEWORK — Viksit Bharat 2047 and Net Zero 2070

   Two things this file is built to do that a flat metric list cannot:

   1. Separate leading from lagging honestly. A lagging indicator measures an
      outcome that has already happened. A leading indicator is an INPUT whose
      movement today changes the outcome later. Investment rate, GERD, R&D
      talent, AI skilling, EPR target-setting and DPI iteration cycles are
      inputs — they belong in a different column from GDP or grid emission
      factor, and mixing them is how dashboards end up congratulating
      themselves on lagging numbers they can no longer influence.

   2. Connect every indicator to the policy instrument that moves it. An
      indicator with no policy attached is a number nobody owns.

   Provenance:
     briefed      — supplied in the WP1 review from NITI / national sources
     verified     — independently checked in this session
     illustrative — mock content for structure review only
   ========================================================================== */

export const KPI_THEMES = [
  { id: "ECO", name: "Economic growth & prosperity", tone: "market" },
  { id: "HUM", name: "Human capital & social development", tone: "nation" },
  { id: "INN", name: "Innovation & research", tone: "scenario" },
  { id: "INF", name: "Infrastructure & connectivity", tone: "gazette" },
  { id: "ENR", name: "Energy transition", tone: "win" },
  { id: "EMI", name: "Emissions reduction", tone: "risk" },
  { id: "CIR", name: "Circular economy & resource efficiency", tone: "market" },
  { id: "RES", name: "Resource use & critical minerals", tone: "gazette" },
  { id: "COB", name: "Co-benefits of the transition", tone: "scenario" },
];

/* sector ids match SECTORS in data.js; "XS" = cross-sector */
export const KPIS = [
  /* ---------------------- economic growth & prosperity ------------------ */
  {
    id: "E01", name: "GDP", theme: "ECO", sector: "XS", type: "lagging",
    now: "$4.18 tn", nowYear: "2025", target: "$30 tn", targetYear: "2047",
    path: [{ y: "2025", v: 4.18 }, { y: "2030", v: 7.3 }, { y: "2035", v: 11.5 }, { y: "2047", v: 30 }],
    unit: "USD tn", policy: ["Viksit Bharat 2047 vision"], src: "briefed",
    bosch: "The denominator for every market-size argument we will make to 2047. A 7× economy with a 6× vehicle parc is the frame, not a stretch case.",
  },
  {
    id: "E02", name: "Per capita income", theme: "ECO", sector: "XS", type: "lagging",
    now: "≈$2,900", nowYear: "2025", target: "$18,000", targetYear: "2047",
    unit: "USD", policy: ["Viksit Bharat 2047 vision"], src: "briefed",
    bosch: "Crosses the threshold where private vehicle ownership, discretionary service spend and financed purchases all inflect. The single most consequential number for aftermarket economics.",
  },
  {
    id: "E03", name: "Real GDP growth rate", theme: "ECO", sector: "XS", type: "lagging",
    now: "≈6.5%", nowYear: "2025", target: "7–8% sustained", targetYear: "2047",
    unit: "% p.a.", policy: ["Viksit Bharat 2047 vision"], src: "briefed",
  },
  {
    id: "E04", name: "Investment rate", theme: "ECO", sector: "S5", type: "leading",
    now: "≈31%", nowYear: "2025", target: "≈34% of GDP", targetYear: "2047",
    unit: "% of GDP", policy: ["Union Budget capex", "PLI schemes", "National Infrastructure Pipeline"], src: "briefed",
    why: "Investment made today is the capital stock that produces output later. Movement here precedes GDP movement by years.",
    bosch: "The leading indicator for our industrial technology and Rexroth order book. A sustained 34% investment rate is capital goods demand before it is GDP.",
  },
  {
    id: "E05", name: "Manufacturing share of GDP", theme: "ECO", sector: "S2", type: "lagging",
    now: "≈17%", nowYear: "2025", target: "≈25%", targetYear: "2047",
    unit: "% of GDP", policy: ["PLI schemes", "Make in India", "National Manufacturing Mission"], src: "briefed",
    bosch: "Directly sets the size of the domestic supplier tier we buy from and sell into.",
  },
  {
    id: "E06", name: "MSME formalisation", theme: "ECO", sector: "S2", type: "lagging",
    now: "7.83 cr Udyam registrations", nowYear: "Feb 2026", target: "Full formalisation", targetYear: "2047",
    unit: "enterprises", policy: ["Udyam", "RAMP", "ZED", "TReDS"], src: "verified",
    bosch: "Our own tier-2 and tier-3 base becoming visible, financeable and certifiable — the precondition for PLI value-addition depth.",
  },
  {
    id: "E07", name: "Startup ecosystem", theme: "ECO", sector: "S7", type: "lagging",
    now: "≈1.6 lakh recognised", nowYear: "2026", target: "1 mn startups", targetYear: "2035",
    unit: "startups", policy: ["Startup India", "Fund of Funds"], src: "briefed",
    bosch: "The acquisition and partnership funnel. Screen specifically for motor control, inverter and e-drive software IP.",
  },
  {
    id: "E08", name: "Technology services revenue", theme: "ECO", sector: "S7", type: "lagging",
    now: "≈$280 bn", nowYear: "2025", target: "$750–850 bn", targetYear: "2035",
    unit: "USD bn", policy: ["National Deep Tech Startup Policy"], src: "briefed",
    bosch: "BGSW operates inside this number. It is also the talent market we compete in for every software capability on the capability board.",
  },
  {
    id: "E09", name: "Technology services share of GDP", theme: "ECO", sector: "S7", type: "lagging",
    now: "7–8%", nowYear: "2025", target: "Sustain 7–8%", targetYear: "2035",
    unit: "% of GDP", policy: ["National Deep Tech Startup Policy"], src: "briefed",
  },
  {
    id: "E10", name: "DPI contribution to GDP", theme: "ECO", sector: "S7", type: "lagging",
    now: "≈1%", nowYear: "2026", target: "4%", targetYear: "2030",
    unit: "% of GDP", policy: ["DPI@2047 roadmap"], src: "briefed",
    bosch: "A four-fold rise in four years is the fastest-compounding line in the economic set. It is also the clearest evidence that rails, not products, are where the state creates value.",
  },
  {
    id: "E11", name: "Urban centres' GDP contribution", theme: "ECO", sector: "XS", type: "lagging",
    now: "≈65%", nowYear: "2026", target: "Rising with urbanisation", targetYear: "2047",
    unit: "% of GDP", policy: ["AMRUT", "Smart Cities Mission"], src: "briefed",
  },

  /* ---------------------- human capital & social ------------------------ */
  {
    id: "H01", name: "Urban population share", theme: "HUM", sector: "XS", type: "lagging",
    now: "37%", nowYear: "2023", target: "51%", targetYear: "2047",
    path: [{ y: "2023", v: 37 }, { y: "2030", v: 41 }, { y: "2035", v: 44 }, { y: "2047", v: 51 }, { y: "2070", v: 65 }],
    unit: "% of population", policy: ["AMRUT", "Smart Cities Mission"], src: "briefed",
    bosch: "Urbanisation is the demand driver behind two-wheelers, public transport, last-mile logistics and building technology simultaneously. One number, four business cases.",
  },
  {
    id: "H02", name: "Female labour force participation", theme: "HUM", sector: "S3", type: "lagging",
    now: "≈42%", nowYear: "2025", target: "≈70%", targetYear: "2047",
    unit: "%", policy: ["Skill India", "Nari Shakti initiatives"], src: "briefed",
    bosch: "A workforce composition target that our own plants and the supplier base will be measured against, including in public tenders.",
  },
  {
    id: "H03", name: "Higher education gross enrolment ratio", theme: "HUM", sector: "S3", type: "lagging",
    now: "≈28%", nowYear: "2025", target: "50%", targetYear: "2035",
    unit: "% GER", policy: ["NEP 2020"], src: "briefed",
    bosch: "The engineering talent pipeline. Our capability board assumes we can hire competences we do not hold today — this is whether that assumption holds.",
  },
  {
    id: "H04", name: "International student enrolment", theme: "HUM", sector: "S3", type: "lagging",
    now: "≈0.5 lakh", nowYear: "2025", target: "1.5 lakh by 2030 · 3.59 lakh by 2035 · 7.89 lakh", targetYear: "2047",
    unit: "students", policy: ["NEP 2020", "Study in India"], src: "briefed",
  },
  {
    id: "H05", name: "Human Capital Index", theme: "HUM", sector: "S3", type: "lagging",
    now: "Below benchmark", nowYear: "2025", target: "Converge with global benchmarks", targetYear: "2047",
    unit: "index", policy: ["NEP 2020", "Skill India"], src: "briefed",
  },
  {
    id: "H06", name: "Foundational learning outcomes", theme: "HUM", sector: "S3", type: "lagging",
    now: "Below target", nowYear: "2025", target: "Class V students reading Class II text", targetYear: "2030",
    unit: "% proficient", policy: ["NIPUN Bharat", "NEP 2020"], src: "briefed",
  },
  {
    id: "H07", name: "Digital and financial literacy", theme: "HUM", sector: "S3", type: "lagging",
    now: "Expanding", nowYear: "2026", target: "Universal", targetYear: "2047",
    unit: "coverage", policy: ["Digital India", "NEP 2020"], src: "briefed",
  },
  {
    id: "H08", name: "Healthcare benchmarks (life expectancy, IMR, U5MR)", theme: "HUM", sector: "S4", type: "lagging",
    now: "Below OECD", nowYear: "2025", target: "Converge with OECD levels", targetYear: "2047",
    unit: "multiple", policy: ["Ayushman Bharat", "ABDM"], src: "briefed",
  },
  {
    id: "H09", name: "Out-of-pocket health expenditure", theme: "HUM", sector: "S4", type: "lagging",
    now: "≈40%", nowYear: "2025", target: "Below 20%", targetYear: "2047",
    unit: "% of health spend", policy: ["Ayushman Bharat", "PM-JAY"], src: "briefed",
  },
  {
    id: "H10", name: "Universal health coverage", theme: "HUM", sector: "S4", type: "lagging",
    now: "Partial", nowYear: "2026", target: "Achieved", targetYear: "2030",
    unit: "coverage", policy: ["Ayushman Bharat", "PM-JAY"], src: "briefed",
  },
  {
    id: "H11", name: "Household access to piped water", theme: "HUM", sector: "S4", type: "lagging",
    now: "Expanding", nowYear: "2026", target: "90% by 2029 · universal", targetYear: "2036",
    unit: "% households", policy: ["Jal Jeevan Mission"], src: "briefed",
  },

  {
    id: "E12", name: "Account Aggregator consent volume", theme: "ECO", sector: "S5", type: "leading",
    now: "Scaling", nowYear: "2026", target: "Population scale", targetYear: "2035",
    unit: "consents", policy: ["Account Aggregator framework", "OCEN", "Unified Lending Interface"], src: "briefed",
    why: "Consent volume is the input to cash-flow based lending. It moves before loan disbursement, and before any new asset class becomes financeable.",
    bosch: "The rail that makes OP-04 possible. Battery state-of-health can only become a credit primitive if there is already a consent-based channel to carry it to a lender.",
  },
  {
    id: "E13", name: "MSME credit gap", theme: "ECO", sector: "S5", type: "lagging",
    now: "Substantial", nowYear: "2026", target: "Materially closed", targetYear: "2047",
    unit: "₹ lakh cr", policy: ["CGTMSE", "TReDS", "Unified Lending Interface", "RAMP"], src: "briefed",
    bosch: "Our tier-2 suppliers' working capital constraint is the reason they cannot invest in the quality depth PLI requires of us.",
  },
  {
    id: "E14", name: "EV retail financing penetration", theme: "ECO", sector: "S5", type: "leading",
    now: "Below ICE parity", nowYear: "2026", target: "Parity with ICE", targetYear: "2035",
    unit: "% of sales financed", policy: ["PM E-DRIVE", "Priority sector lending norms"], src: "illustrative",
    why: "Financing availability gates adoption ahead of vehicle price parity. It moves before EV sales do.",
    bosch: "The transmission mechanism between residual-value uncertainty and actual EV volume. It is the number OP-04 is ultimately trying to move.",
  },
  {
    id: "E15", name: "DBT transfer leakage", theme: "ECO", sector: "S8", type: "lagging",
    now: "Materially reduced", nowYear: "2026", target: "Near zero", targetYear: "2047",
    unit: "% leakage", policy: ["Aadhaar", "DBT Mission", "e-KYC"], src: "briefed",
    bosch: "No direct relevance, and retained for that reason. It is the precedent that taught the state identity plus a payment rail beats a scheme-specific form — the pattern now arriving in energy and commerce.",
  },
  {
    id: "E16", name: "Benefit delivery coverage", theme: "ECO", sector: "S8", type: "lagging",
    now: "Broad", nowYear: "2026", target: "Universal and verifiable", targetYear: "2047",
    unit: "% of entitled", policy: ["DBT Mission", "Aadhaar", "PDS reform"], src: "briefed",
  },

  /* ---------------------- innovation & research ------------------------- */
  {
    id: "I01", name: "Gross expenditure on R&D (GERD)", theme: "INN", sector: "S3", type: "leading",
    now: "0.65%", nowYear: "2025", target: "≥2% of GDP", targetYear: "2030",
    path: [{ y: "2025", v: 0.65 }, { y: "2028", v: 1.2 }, { y: "2030", v: 2.0 }, { y: "2035", v: 2.4 }],
    unit: "% of GDP", policy: ["Anusandhan National Research Foundation", "RDI scheme"], src: "briefed",
    why: "R&D spend is an input. It produces IP, publications and commercialisable designs years later — so it moves before every innovation outcome below it.",
    bosch: "A tripling of national R&D intensity changes who we compete with for engineers and who we can credibly co-develop with. It is also the pool our university partnerships draw against.",
  },
  {
    id: "I02", name: "R&D talent — postdoctoral fellowships", theme: "INN", sector: "S3", type: "leading",
    now: "Baseline", nowYear: "2025", target: "+20% annually", targetYear: "ongoing",
    unit: "% growth p.a.", policy: ["ANRF", "PMRF"], src: "briefed",
    why: "Directly builds future research capacity. The stock of trained researchers is the constraint on every downstream innovation target.",
    bosch: "The hiring pipeline for the materials and power-electronics competences the capability board says we lack.",
  },
  {
    id: "I03", name: "AI skilling — Unified AI Skilling Engine", theme: "INN", sector: "S3", type: "leading",
    now: "Being operationalised", nowYear: "2026", target: "Operational at scale", targetYear: "2030",
    unit: "programme", policy: ["India AI Mission", "India AI Talent Mission"], src: "briefed",
    why: "An investment in human capital ahead of demand. Skilling capacity built now determines what the economy can absorb later.",
    bosch: "Relevant twice: as a talent source for BGSW, and as the template for the technician certification play in OP-10.",
  },
  {
    id: "I04", name: "Breakthrough IPs — semiconductor", theme: "INN", sector: "S7", type: "lagging",
    now: "Early", nowYear: "2026", target: ">100 breakthrough IPs", targetYear: "2035",
    unit: "IPs", policy: ["India Semiconductor Mission", "DLI scheme"], src: "briefed",
    bosch: "Watch which IPs are automotive-grade. The qualification gap in OP-02 is the layer between these designs and a vehicle.",
  },
  {
    id: "I05", name: "R&D commercialisation — market-ready designs", theme: "INN", sector: "S7", type: "lagging",
    now: "Early", nowYear: "2026", target: "100 designs annually", targetYear: "2035",
    unit: "designs p.a.", policy: ["DLI scheme", "ISM"], src: "briefed",
    bosch: "Named areas include power analog IC design, power system architecture and thermal engineering — three competences we hold and could licence into.",
  },
  {
    id: "I06", name: "Scientific publications growth", theme: "INN", sector: "S3", type: "lagging",
    now: "+7.6%", nowYear: "2024", target: "Sustained growth", targetYear: "2047",
    unit: "% growth", policy: ["ANRF"], src: "briefed",
  },
  {
    id: "I07", name: "Global innovation index standing", theme: "INN", sector: "S7", type: "lagging",
    now: "Overperformer", nowYear: "2026", target: "Top-tier performance", targetYear: "2047",
    unit: "rank", policy: ["Startup India", "ANRF"], src: "briefed",
  },
  {
    id: "I08", name: "Innovation clusters in global top 100", theme: "INN", sector: "S7", type: "lagging",
    now: "4 (Bengaluru, Delhi, Mumbai, Chennai)", nowYear: "2026", target: "Expanded", targetYear: "2047",
    unit: "clusters", policy: ["Startup India"], src: "briefed",
    bosch: "Our engineering footprint already sits in two of the four. The district-led aggregation imperative in DPI@2047 suggests the next ones will be deliberately created elsewhere.",
  },
  {
    id: "I09", name: "DPI iterative transformation cycles", theme: "INN", sector: "S7", type: "leading",
    now: "MSME and Agriculture first", nowYear: "2026", target: "2-year cycles with lighthouse pilots", targetYear: "2035",
    unit: "cycle", policy: ["DPI@2047 roadmap"], src: "briefed",
    why: "A declared cadence for where the state will act next. The cycle plan is published before the sectoral outcomes arrive, which makes it the earliest structured signal available.",
    bosch: "MSME and Agriculture are named as the first two cycles — and both appear on our opportunity board (OP-08, OP-06). The cadence tells us when, not just whether.",
  },

  /* ---------------------- infrastructure -------------------------------- */
  {
    id: "F01", name: "National highway network", theme: "INF", sector: "XS", type: "lagging",
    now: "+60% (2014–2023)", nowYear: "2023", target: "Continued expansion", targetYear: "2047",
    unit: "km", policy: ["Bharatmala", "PM Gati Shakti"], src: "briefed",
  },
  {
    id: "F02", name: "Railway electrification", theme: "INF", sector: "XS", type: "lagging",
    now: "97% of broad gauge", nowYear: "2026", target: "Complete", targetYear: "2030",
    unit: "% electrified", policy: ["Mission 100% Electrification"], src: "briefed",
    bosch: "Relevant as the modal-shift enabler. Freight moving to rail is the one vector on which almost every division reads neutral or negative.",
  },
  {
    id: "F03", name: "Metro rail network", theme: "INF", sector: "XS", type: "lagging",
    now: "≈1,000 km", nowYear: "2025", target: "≈5,000 km", targetYear: "2047",
    path: [{ y: "2025", v: 1000 }, { y: "2030", v: 1800 }, { y: "2035", v: 2700 }, { y: "2047", v: 5000 }],
    unit: "km", policy: ["Metro Rail Policy 2017"], src: "briefed", scenario: "NZS",
    bosch: "A five-fold metro build-out is the physical form of the modal-share target. It competes with the vehicle parc for the same urban trips.",
  },
  {
    id: "F04", name: "Port capacity — Paradip", theme: "INF", sector: "XS", type: "lagging",
    now: "Current", nowYear: "2026", target: "350 MTPA by 2030 · 500+ MTPA", targetYear: "2047",
    unit: "MTPA", policy: ["Sagarmala", "Maritime Amrit Kaal Vision 2047"], src: "briefed",
  },
  {
    id: "F05", name: "Waterways cargo handling", theme: "INF", sector: "XS", type: "lagging",
    now: "Baseline", nowYear: "2026", target: "4× increase", targetYear: "2047",
    unit: "MT", policy: ["Jal Marg Vikas", "Sagarmala"], src: "briefed",
  },
  {
    id: "F06", name: "Broadband subscribers", theme: "INF", sector: "S7", type: "lagging",
    now: ">900 mn", nowYear: "2026", target: "Universal", targetYear: "2047",
    unit: "subscribers", policy: ["BharatNet", "Digital India"], src: "briefed",
    bosch: "The connectivity floor every connected-vehicle and telemetry business case assumes. It has already been cleared.",
  },
  {
    id: "F07", name: "Public charging points installed", theme: "INF", sector: "S6", type: "lagging",
    now: "52,718", nowYear: "Jul 2026", target: "Scaling with fleet", targetYear: "2047",
    unit: "stations", policy: ["PM E-DRIVE", "FAME-II"], src: "illustrative",
    bosch: "16,561 of these are fast chargers. Read alongside F08 — the approved-but-not-installed number is the one that matters.",
  },
  {
    id: "F08", name: "Chargers approved but not installed", theme: "INF", sector: "S6", type: "leading",
    now: "6,562", nowYear: "Aug 2026", target: "Zero", targetYear: "immediate",
    unit: "chargers", policy: ["PM E-DRIVE"], src: "verified",
    why: "A conversion-rate indicator. It measures whether committed money is becoming physical assets — and it currently reads zero conversion.",
    bosch: "The single most actionable number on this board. It is the entire basis for OP-01, and its ideal value is zero.",
  },
  {
    id: "F09", name: "Authorised Testing Stations", theme: "INF", sector: "S6", type: "leading",
    now: "Partial coverage", nowYear: "2026", target: "1 ATS per district", targetYear: "2030",
    unit: "stations", policy: ["Vehicle Scrappage Policy", "CMVR"], src: "briefed",
    why: "Testing infrastructure has to exist before mandatory fitness testing can drive scrappage volumes. The build-out precedes the ELV flow.",
    bosch: "Scrappage volume is the feedstock for the circularity opportunities and for remanufacturing. No ATS, no flow.",
  },

  /* ---------------------- energy transition ----------------------------- */
  {
    id: "N01", name: "Non-fossil electricity capacity", theme: "ENR", sector: "S6", type: "lagging",
    now: "50% — ahead of schedule", nowYear: "Jul 2025", target: "80–85% of generation", targetYear: "2070",
    unit: "% of capacity", policy: ["NDC commitments", "NSM", "Wind schemes"], src: "briefed", scenario: "NZS",
    bosch: "Reached ahead of schedule, which is the rare case of physical infrastructure beating its forecast. Worth noting against our standing bias in the other direction.",
  },
  {
    id: "N02", name: "Renewable share of generation", theme: "ENR", sector: "S6", type: "lagging",
    now: "≈24%", nowYear: "2025", target: "63%", targetYear: "2070",
    unit: "% of generation", policy: ["NDC commitments"], src: "briefed", scenario: "NZS",
  },
  {
    id: "N03", name: "Solar PV capacity", theme: "ENR", sector: "S6", type: "lagging",
    now: "110 GW", nowYear: "2024-25", target: "4,900–5,650 GW", targetYear: "2070",
    path: [{ y: "2025", v: 110 }, { y: "2030", v: 320 }, { y: "2035", v: 640 }, { y: "2047", v: 1900 }, { y: "2070", v: 5275 }],
    unit: "GW", policy: ["National Solar Mission", "PM Surya Ghar", "ALMM"], src: "briefed", scenario: "NZS",
    bosch: "Solar PV is 31% of cumulative critical mineral demand — second only to EV batteries. It competes with us for the same materials.",
  },
  {
    id: "N04", name: "Wind energy capacity", theme: "ENR", sector: "S6", type: "lagging",
    now: "54 GW", nowYear: "2024-25", target: "1,050–1,300 GW", targetYear: "2070",
    unit: "GW", policy: ["National Wind-Solar Hybrid Policy"], src: "briefed", scenario: "NZS",
    bosch: "Wind generators are a direct competitor for Nd-Pr-Dy-Tb magnet supply. Our magnet exposure is not only automotive.",
  },
  {
    id: "N05", name: "Nuclear capacity", theme: "ENR", sector: "S6", type: "lagging",
    now: "≈8 GW", nowYear: "2025", target: "100 GW by 2047 · 295–320 GW", targetYear: "2070",
    unit: "GW", policy: ["Nuclear Energy Mission", "SMR programme"], src: "briefed", scenario: "NZS",
  },
  {
    id: "N06", name: "Electricity share of final energy demand", theme: "ENR", sector: "S6", type: "lagging",
    now: "21%", nowYear: "2025", target: "60%", targetYear: "2070",
    path: [{ y: "2025", v: 21 }, { y: "2030", v: 26 }, { y: "2035", v: 31 }, { y: "2047", v: 42 }, { y: "2070", v: 60 }],
    unit: "%", policy: ["NITI Net Zero Scenario"], src: "verified", scenario: "NZS",
    bosch: "The master variable. Almost every opportunity on this board is a bet on some part of this curve.",
  },
  {
    id: "N07", name: "Per capita electricity consumption", theme: "ENR", sector: "S6", type: "lagging",
    now: "1,400 kWh", nowYear: "2025", target: "10,000 kWh", targetYear: "2070",
    unit: "kWh", policy: ["NITI Net Zero Scenario"], src: "briefed", scenario: "NZS",
  },
  {
    id: "N08", name: "Primary energy intensity to GDP", theme: "ENR", sector: "S6", type: "lagging",
    now: "0.22 MJ/INR", nowYear: "2025", target: "0.04–0.05 MJ/INR", targetYear: "2070",
    unit: "MJ/INR", policy: ["PAT scheme", "Energy Conservation Act"], src: "briefed", scenario: "NZS",
  },
  {
    id: "N09", name: "EV penetration", theme: "ENR", sector: "S6", type: "lagging",
    now: "Early", nowYear: "2026", target: "80% by 2047 · 100% ZEV sales ≈2055", targetYear: "2047",
    unit: "% of sales", policy: ["PM E-DRIVE", "CAFE-III", "State EV policies"], src: "briefed",
    bosch: "The number the eAxle JV is underwritten against. Note it is a 2047 target, not a 2035 one — the transition is slower than the discourse.",
  },
  {
    id: "N10", name: "Ethanol blending", theme: "ENR", sector: "S6", type: "lagging",
    now: "E20 achieved", nowYear: "Mid 2025", target: "Sustained, higher blends under review", targetYear: "2030",
    unit: "% blend", policy: ["Ethanol Blended Petrol Programme"], src: "briefed",
  },
  {
    id: "N11", name: "SAF blending for international flights", theme: "ENR", sector: "S6", type: "lagging",
    now: "Pre-mandate", nowYear: "2026", target: "1% by 2027 · 2% by 2028 · 10%", targetYear: "2035",
    unit: "% blend", policy: ["National Biofuel Policy", "SAF roadmap"], src: "briefed",
  },
  {
    id: "N12", name: "Green hydrogen production", theme: "ENR", sector: "S6", type: "lagging",
    now: "Pilot scale", nowYear: "2026", target: "5 Mt annually", targetYear: "2030",
    unit: "Mt p.a.", policy: ["National Green Hydrogen Mission"], src: "briefed",
    bosch: "A 5 Mt target by 2030 against pilot-scale production today. Treat as the optimistic bound when scoping OP-09.",
  },

  /* ---------------------- emissions ------------------------------------- */
  {
    id: "M01", name: "GHG emissions intensity", theme: "EMI", sector: "XS", type: "lagging",
    now: "36% reduction achieved", nowYear: "2020", target: "45% reduction vs 2005", targetYear: "2030",
    unit: "% vs 2005", policy: ["NDC commitments"], src: "briefed",
  },
  {
    id: "M02", name: "Grid emission factor", theme: "EMI", sector: "S6", type: "lagging",
    now: "0.72 kgCO₂/kWh", nowYear: "2025", target: "0–0.23 kgCO₂/kWh", targetYear: "2070",
    path: [{ y: "2025", v: 0.72 }, { y: "2030", v: 0.58 }, { y: "2035", v: 0.45 }, { y: "2047", v: 0.24 }, { y: "2070", v: 0.02 }],
    unit: "kgCO₂/kWh", policy: ["NITI Net Zero Scenario"], src: "verified", scenario: "NZS",
    bosch: "Determines when an EV is actually cleaner than an efficient ICE in India. Until this falls, the CAFE-III efficiency argument (OP-07) stays commercially alive.",
  },
  {
    id: "M03", name: "Waste sector emissions", theme: "EMI", sector: "XS", type: "lagging",
    now: "75.64 MtCO₂e", nowYear: "2020", target: "10.9 MtCO₂e (95.9% below CPS)", targetYear: "2070",
    unit: "MtCO₂e", policy: ["SBM 2.0", "Waste to Energy"], src: "briefed", scenario: "NZS",
  },
  {
    id: "M04", name: "Rice methane emissions", theme: "EMI", sector: "S1", type: "lagging",
    now: "Baseline", nowYear: "2026", target: "62% reduction", targetYear: "2070",
    unit: "% reduction", policy: ["Digital Agriculture Mission", "Climate-resilient agriculture"], src: "briefed", scenario: "NZS",
    bosch: "Alternate wetting and drying needs plot-level verification to be credited. AgriStack is what makes that measurable — the same rail behind OP-06.",
  },
  {
    id: "M05", name: "Soil N₂O emissions", theme: "EMI", sector: "S1", type: "lagging",
    now: "Baseline", nowYear: "2026", target: "20% reduction", targetYear: "2070",
    unit: "% reduction", policy: ["Soil Health Card", "Nano-fertiliser push"], src: "briefed", scenario: "NZS",
  },
  {
    id: "M06", name: "Livestock emissions", theme: "EMI", sector: "S1", type: "lagging",
    now: "Baseline", nowYear: "2026", target: "8% reduction", targetYear: "2070",
    unit: "% reduction", policy: ["National Livestock Mission"], src: "briefed", scenario: "NZS",
  },
  {
    id: "M07", name: "Residual emissions requiring carbon capture", theme: "EMI", sector: "XS", type: "lagging",
    now: "n/a", nowYear: "2026", target: "1.3 GtCO₂e addressed by CCUS", targetYear: "2070",
    unit: "GtCO₂e", policy: ["CCUS policy framework"], src: "briefed", scenario: "NZS",
  },

  /* ---------------------- circular economy ------------------------------ */
  {
    id: "C01", name: "EPR targets — steel recovery from ELVs", theme: "CIR", sector: "S6", type: "leading",
    now: "8% (2025–2030)", nowYear: "2026", target: "18% by 2035–2040", targetYear: "2040",
    unit: "% recovery", policy: ["ELV EPR rules", "Vehicle Scrappage Policy"], src: "briefed",
    why: "Setting an EPR target is a policy input that forces the recycling market into existence ahead of the measured recycling rate.",
    bosch: "Our workshop network is the collection layer that an EPR obligation makes valuable to somebody else. That is a negotiating position.",
  },
  {
    id: "C02", name: "Steel scrap utilisation", theme: "CIR", sector: "XS", type: "lagging",
    now: "20%", nowYear: "2025", target: "40%", targetYear: "2070",
    unit: "% of input", policy: ["Steel Scrap Recycling Policy"], src: "briefed",
  },
  {
    id: "C03", name: "Aluminium scrap utilisation", theme: "CIR", sector: "XS", type: "lagging",
    now: "30%", nowYear: "2025", target: "40%", targetYear: "2070",
    unit: "% of input", policy: ["Metal recycling policy"], src: "briefed",
  },
  {
    id: "C04", name: "Cement clinker ratio", theme: "CIR", sector: "XS", type: "lagging",
    now: "0.67", nowYear: "2024", target: "0.55", targetYear: "2070",
    unit: "ratio", policy: ["PAT scheme"], src: "briefed", scenario: "NZS",
  },
  {
    id: "C05", name: "Cobalt recovery from e-waste recycling", theme: "CIR", sector: "S6", type: "lagging",
    now: "30% potential", nowYear: "2030", target: "≈100%", targetYear: "2040",
    unit: "% recovery", policy: ["CMRIS", "E-waste Management Rules"], src: "briefed",
    bosch: "The circularity route to battery materials. The 58 cleared recyclers under CMRIS are the counterparties who will capture it.",
  },
  {
    id: "C06", name: "Solid waste collection and segregation", theme: "CIR", sector: "XS", type: "lagging",
    now: "Partial", nowYear: "2026", target: "100% collection · 85% processing", targetYear: "2070",
    unit: "%", policy: ["SBM 2.0"], src: "briefed", scenario: "NZS",
  },
  {
    id: "C07", name: "Per-capita waste generation cap", theme: "CIR", sector: "XS", type: "lagging",
    now: "Rising", nowYear: "2026", target: "Capped at 0.622 kg/day", targetYear: "post-2047",
    unit: "kg/day", policy: ["SBM 2.0"], src: "briefed", scenario: "NZS",
  },
  {
    id: "C08", name: "Domestic wastewater — sewer coverage", theme: "CIR", sector: "XS", type: "lagging",
    now: "Partial", nowYear: "2026", target: "85% coverage · 100% treatment post-2040", targetYear: "2070",
    unit: "% coverage", policy: ["AMRUT", "NMCG"], src: "briefed", scenario: "NZS",
  },
  {
    id: "C09", name: "Methane recovery from anaerobic systems", theme: "CIR", sector: "XS", type: "lagging",
    now: "Partial", nowYear: "2026", target: "100%", targetYear: "2050",
    unit: "% recovery", policy: ["SATAT", "CBG blending obligation"], src: "briefed", scenario: "NZS",
  },

  /* ---------------------- resources & minerals -------------------------- */
  {
    id: "R01", name: "Critical energy transition mineral demand", theme: "RES", sector: "S6", type: "lagging",
    now: "Early", nowYear: "2026", target: "≈169 Mt cumulative", targetYear: "2070",
    unit: "Mt cumulative", policy: ["National Critical Mineral Mission", "CMRIS"], src: "verified", scenario: "NZS",
    bosch: "Copper exceeds 20 Mt and graphite 14 Mt by 2050 alone. India is ≈9% of global demand — large in absolute terms, too small to set price.",
  },
  {
    id: "R02", name: "Land requirement — power sector", theme: "RES", sector: "S6", type: "lagging",
    now: "0.68 Mha", nowYear: "2030", target: "5.92 Mha (≈11% of wasteland capacity)", targetYear: "2070",
    unit: "Mha", policy: ["NITI Net Zero Scenario"], src: "briefed", scenario: "NZS",
  },
  {
    id: "R03", name: "Water consumption — power sector", theme: "RES", sector: "S6", type: "lagging",
    now: "Baseline", nowYear: "2030", target: "1.7× by 2050, then declining", targetYear: "2070",
    unit: "index", policy: ["NITI Net Zero Scenario"], src: "briefed", scenario: "NZS",
  },

  /* ---------------------- co-benefits ----------------------------------- */
  {
    id: "B01", name: "Fossil fuel import bill", theme: "COB", sector: "S6", type: "lagging",
    now: "4% of GDP", nowYear: "2025", target: "0.2% of GDP", targetYear: "2070",
    path: [{ y: "2025", v: 4.0 }, { y: "2030", v: 3.5 }, { y: "2035", v: 2.9 }, { y: "2047", v: 1.6 }, { y: "2070", v: 0.2 }],
    unit: "% of GDP", policy: ["NITI Net Zero Scenario", "Energy security programmes"], src: "briefed", scenario: "NZS",
    bosch: "The sovereignty argument behind every efficiency and electrification policy we sell into. When a minister explains CAFE-III, this is the number being defended.",
  },
  {
    id: "B02", name: "Fossil fuel revenue to government", theme: "COB", sector: "XS", type: "lagging",
    now: "2.3% of GDP", nowYear: "2025", target: "0.2% of GDP", targetYear: "2070",
    unit: "% of GDP", policy: ["NITI Net Zero Scenario"], src: "briefed", scenario: "NZS",
    bosch: "The uncomfortable counterpart to B01. Fuel taxation funds states, and replacing that revenue is an unresolved problem — a plausible source of future road-use or EV levies.",
  },
  {
    id: "B03", name: "Total import savings", theme: "COB", sector: "XS", type: "lagging",
    now: "Baseline", nowYear: "2026", target: "0.5% of GDP", targetYear: "2070",
    unit: "% of GDP", policy: ["NITI Net Zero Scenario"], src: "briefed", scenario: "NZS",
  },
  {
    id: "B04", name: "Energy sector employment", theme: "COB", sector: "S3", type: "lagging",
    now: "6 mn", nowYear: "2022", target: "7 mn by 2050 · 4.5 mn by 2070", targetYear: "2070",
    unit: "jobs", policy: ["Skill Council for Green Jobs"], src: "briefed", scenario: "NZS",
    bosch: "Employment peaks mid-century then falls. The reskilling window is finite and closes around 2050 — which dates the certification opportunity in OP-10.",
  },
  {
    id: "B05", name: "Air quality index", theme: "COB", sector: "S4", type: "lagging",
    now: "Above target", nowYear: "2026", target: "<80 by 2029 · <50 by 2036 · <20", targetYear: "2047",
    unit: "AQI", policy: ["NCAP", "State clean air plans"], src: "briefed",
    bosch: "The politically fastest-moving driver of urban vehicle restrictions. AQI targets produce city-level bans well ahead of national ZEV mandates.",
  },
];

/* Leading indicators are inputs; this is the list the review called out. */
export const LEADING = KPIS.filter((k) => k.type === "leading");
export const LAGGING = KPIS.filter((k) => k.type === "lagging");

/* Reverse index: which indicators does each policy instrument move? An
   instrument moving many indicators is a high-leverage place to be present. */
export function policyIndex() {
  const idx = {};
  KPIS.forEach((k) => (k.policy || []).forEach((p) => {
    (idx[p] = idx[p] || []).push(k);
  }));
  return Object.entries(idx)
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => b.items.length - a.items.length);
}

export const kpisForSector = (sid) => KPIS.filter((k) => k.sector === sid);
