/* ============================================================================
   GLOBAL LENS — how the world looks at India

   The board was India looking at India. Management asked for the other
   direction: India's aspirations measured against global realities.

   Two object types:
     FORCES — external tailwinds and headwinds, each with a geography
     CHAINS — transmission paths showing how a force reaches a national target

   CHAINS are the "connect the dots" artefact. A number on its own persuades
   nobody; the path from crude price to GDP target is what makes it arguable.
   Data as of 21 September 2026.
   ========================================================================== */

export const GEOGRAPHIES = [
  { id: "US", name: "United States", tone: "scenario" },
  { id: "CN", name: "China", tone: "risk" },
  { id: "EU", name: "European Union", tone: "gazette" },
  { id: "GULF", name: "Gulf & energy markets", tone: "market" },
  { id: "GLOB", name: "Global trade & capital", tone: "nation" },
];

export const FORCES = [
  {
    id: "GF-01", name: "US tariffs cut from 50% to 18%", type: "tailwind",
    geo: "US", magnitude: 5, confidence: "High", date: "Feb 2026", src: "verified",
    status: "In force — interim agreement stage",
    body:
      "A bilateral deal announced 2 February 2026 removed the additional 25% punitive duty and cut the reciprocal tariff from 25% to 18%, taking the effective rate on most Indian goods from 50% to 18% — a 64% reduction in tariff burden. Pharmaceuticals, semiconductors, energy and critical minerals are exempted. Previously the 50% rate affected over 55% of India's $87 bn of exports to the US.",
    affects: ["E01", "E03", "E08"],
    soWhat:
      "This removes the single largest external threat to the export-led half of the 2047 GDP path. But read the consideration side before treating it as pure upside — see GF-02, which is the price India agreed to pay for it.",
  },
  {
    id: "GF-02", name: "Commitment to halt Russian crude purchases", type: "headwind",
    geo: "US", magnitude: 4, confidence: "High", date: "Feb 2026", src: "verified",
    status: "Commitment under the trade deal",
    body:
      "In exchange for tariff relief India agreed to move toward zero tariffs on US goods, halt Russian crude oil purchases and shift sourcing to the US, adopt stronger Buy American provisions, and commit to future purchases of US energy and technology.",
    affects: ["B01", "E01"],
    soWhat:
      "The tariff win was paid for in energy costs. Discounted Russian barrels were holding the import bill down; replacing them at market price during a $100+ crude episode transfers the cost from exporters to the energy account. The two forces are one transaction and must be read together — this is the clearest example on the board of why a single indicator misleads.",
  },
  {
    id: "GF-03", name: "Crude above $100 for a sustained period", type: "headwind",
    geo: "GULF", magnitude: 5, confidence: "High", date: "Sep 2026", src: "verified",
    status: "Live — elevated",
    body:
      "Brent traded around $102/bbl on 21 September 2026, holding above $100 for more than eighteen days amid West Asia tensions. India's crude import bill rose 48% to $74.8 bn for April–August 2026 despite import volume being roughly flat at 100.7 Mt. India imports over 85% of its crude; each $1/bbl adds roughly $2 bn to the annual bill. Forecasts diverge sharply — SBI Research projected Brent averaging $55 in Q1 2026, S&P Global expects $80–100 through 2027.",
    affects: ["B01", "E02", "E03"],
    soWhat:
      "The forecast divergence is itself the finding: a $50 spread between credible houses means no capital allocation should be underwritten on a single crude assumption. Note also that volume was flat while cost rose 48% — this is a price shock, not a demand story, and efficiency content is the only lever that responds inside a year.",
  },
  {
    id: "GF-04", name: "China lifts curbs on rare earths and fertilisers to India", type: "tailwind",
    geo: "CN", magnitude: 4, confidence: "Medium", date: "2025–26", src: "verified",
    status: "Shipments resumed",
    body:
      "China began shipping fertilisers, rare earth magnets and tunnel boring machines to India again, three categories restricted since 2024 amid border tensions. The curbs had hit electronics, automotive and infrastructure. China supplies roughly 30% of India's fertilisers.",
    affects: ["N09", "R01"],
    soWhat:
      "Relief, not resolution. The curbs were lifted by the same discretion that imposed them, which means the exposure is unchanged — only its expression. Treat this as a reprieve that buys time for the REPM scheme to land, not as a reason to slow the magnet-free motor hedge.",
  },
  {
    id: "GF-05", name: "Structural concentration of mineral processing in China", type: "headwind",
    geo: "CN", magnitude: 5, confidence: "High", date: "Standing", src: "verified",
    status: "Structural",
    body:
      "China holds roughly 85% of global rare earth refining capacity and over 90% of processed graphite production. Since April 2025 it has progressively restricted exports of twelve rare earth elements including dysprosium, terbium and samarium. The IEA has warned full implementation could put around $6.5 tn of manufacturing outside China at risk. Redesign timelines differ sharply by segment: e-2W motors can be redesigned in 2–3 months, passenger vehicles and buses need 6–12 months.",
    affects: ["R01", "N09"],
    soWhat:
      "The redesign-time asymmetry is the actionable detail nobody prices. A supply interruption is survivable in two-wheelers and existential in passenger cars and buses on the same shock. That difference, not the average exposure, is what should drive where the magnet-free hedge is engineered first.",
  },
  {
    id: "GF-06", name: "EU CBAM definitive phase begins", type: "headwind",
    geo: "EU", magnitude: 4, confidence: "High", date: "1 Jan 2026", src: "verified",
    status: "In force",
    body:
      "After three years of reporting-only obligations, CBAM entered its definitive phase on 1 January 2026. Every shipment of Indian steel and aluminium entering the EU now attracts a carbon cost. GTRI estimates exporters may need to cut prices 15–22% to absorb it. Indian steel exports to the EU are already down more than a third; aluminium down double digits. Importers above 50 t/year must hold authorised CBAM declarant status.",
    affects: ["E05", "C02", "C03"],
    soWhat:
      "A carbon price applied at someone else's border, on our input materials. It makes the embodied carbon of Indian steel and aluminium a commercial variable for anything we export to Europe — and it rewards exactly the scrap-utilisation targets in the circular economy set, which until now had no commercial driver attached.",
  },
  {
    id: "GF-07", name: "Global capital seeking a China alternative", type: "tailwind",
    geo: "GLOB", magnitude: 4, confidence: "Medium", date: "Standing", src: "illustrative",
    status: "Structural",
    body:
      "Supply-chain diversification strategies continue to direct manufacturing investment toward India, visible in semiconductor, electronics and component commitments. The exemption of semiconductors and critical minerals from US tariffs reinforces the direction.",
    affects: ["E04", "E05", "I04"],
    soWhat:
      "This is the tailwind behind the 34% investment rate target. It is also conditional on India clearing execution bottlenecks — the charger conversion failure and the PLI-ACC gap are exactly the evidence an investment committee elsewhere would cite against.",
  },
  {
    id: "GF-08", name: "Technology-standard divergence between blocs", type: "headwind",
    geo: "GLOB", magnitude: 3, confidence: "Medium", date: "Standing", src: "illustrative",
    status: "Emerging",
    body:
      "Charging connectors, battery passports, data localisation and AI governance are diverging between US, EU and Chinese regimes. India is building its own stack — UEI, AgriStack, DPDP — on open protocols that match none of them exactly.",
    affects: ["N09", "E10"],
    soWhat:
      "Divergence is a cost for a global supplier and an opportunity for one already inside the Indian stack. If India's rails stay distinct, compliance becomes a local competence with a moat — which argues for the UEI standards seat rather than against it.",
  },
];

/* ---------------------------------------------------------------------------
   CHAINS — connect the dots. Each step names what moves, and the last step
   lands on a national target so the argument terminates somewhere decidable.
   --------------------------------------------------------------------------- */
export const CHAINS = [
  {
    id: "CH-01", name: "How a US trade win raises India's fuel bill",
    headline: "Tariff relief was paid for in energy costs — the two cannot be read separately.",
    tone: "risk",
    steps: [
      { k: "Trigger", t: "US–India deal, Feb 2026", d: "Punitive 25% duty removed; reciprocal cut 25% → 18%. Effective rate on most goods falls 50% → 18%.", ref: "GF-01" },
      { k: "Consideration", t: "India commits to halt Russian crude", d: "Sourcing shifts toward US barrels; discount on Russian crude is given up.", ref: "GF-02" },
      { k: "Market", t: "Brent holds above $100", d: "≈$102/bbl in Sept 2026, 18+ days above $100 on West Asia tension.", ref: "GF-03" },
      { k: "Transmission", t: "Import bill +48% to $74.8 bn", d: "April–August 2026, on flat volume of 100.7 Mt. Each $1/bbl ≈ $2 bn a year.", ref: "GF-03" },
      { k: "Macro", t: "Fuel, freight and food prices rise", d: "Transport cost feeds goods inflation; pressure on the repo rate and on household consumption." },
      { k: "Target", t: "Pressure on the 7–8% growth path", d: "Consumption and investment both squeezed — the two components the $30 tn GDP target depends on.", ref: "E03" },
    ],
    soWhat:
      "This is the chain to show a sceptic. The export win and the energy hit are the same transaction, and a dashboard reporting only the tariff number would have called February an unambiguous success. For us the practical consequence is narrower and more useful: efficiency content is the only lever in the portfolio that responds inside a single year to a crude shock, which is precisely what the CAFE-III ₹/gram reframing monetises.",
  },
  {
    id: "CH-02", name: "How Chinese processing concentration reaches an Indian bus fleet",
    headline: "The same shock is survivable in two-wheelers and existential in buses.",
    tone: "gazette",
    steps: [
      { k: "Structure", t: "China holds ~85% of rare earth refining", d: "Over 90% of processed graphite. Twelve elements under progressive export control since April 2025.", ref: "GF-05" },
      { k: "Event", t: "Curbs imposed, then lifted for India", d: "Restricted 2024, resumed 2025–26 — by discretion, not by treaty.", ref: "GF-04" },
      { k: "Asymmetry", t: "Redesign time differs 4× by segment", d: "e-2W motors: 2–3 months. Passenger vehicles and buses: 6–12 months.", ref: "GF-05" },
      { k: "Domestic response", t: "REPM scheme, 2-year gestation", d: "₹7,280 cr, 6,000 MTPA across five beneficiaries. Fixes availability, not price.", ref: "PR-02" },
      { k: "Exposure", t: "14,000 e-buses allocated under PM E-DRIVE", d: "The segment with the longest redesign time is the one with the largest committed public order." },
      { k: "Target", t: "80% EV penetration by 2047", d: "Achievable only if the motor supply chain survives a discretionary interruption it has already experienced once.", ref: "N09" },
    ],
    soWhat:
      "Average exposure is the wrong measure. Engineer the magnet-free hedge where redesign time is longest — buses and passenger vehicles — not where volume is highest. That inverts the usual prioritisation and is the kind of conclusion only a chain view produces.",
  },
  {
    id: "CH-03", name: "How a European carbon price rewards Indian scrap",
    headline: "CBAM gives the circular economy targets a commercial driver they never had.",
    tone: "market",
    steps: [
      { k: "Trigger", t: "CBAM definitive phase, 1 Jan 2026", d: "Carbon cost now attaches to Indian steel and aluminium entering the EU.", ref: "GF-06" },
      { k: "Price effect", t: "15–22% price cut needed to absorb", d: "GTRI estimate. Steel exports to the EU already down over a third.", ref: "GF-06" },
      { k: "Mechanism", t: "Embodied carbon becomes a line item", d: "Scrap-fed production carries materially lower embodied carbon than ore-fed." },
      { k: "Domestic lever", t: "Steel scrap utilisation 20% → 40%", d: "A 2070 target that until now had no commercial driver behind it.", ref: "C02" },
      { k: "Flow", t: "ELV scrappage is the feedstock", d: "EPR steel-recovery targets rise 8% → 18%; one ATS per district is the enabling infrastructure.", ref: "C01" },
      { k: "Position", t: "Collection is the scarce asset", d: "Our workshop and reverse-logistics network is the layer the recyclers cannot easily build." },
    ],
    soWhat:
      "A European regulation just made an Indian circularity target bankable. This is the cleanest illustration of why the global lens belongs on this board: the driver for a domestic opportunity appeared at someone else's border, and no amount of watching Indian policy would have surfaced it.",
  },
];

export const tailwinds = () => FORCES.filter((f) => f.type === "tailwind");
export const headwinds = () => FORCES.filter((f) => f.type === "headwind");
