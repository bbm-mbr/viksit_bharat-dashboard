/* ============================================================================
   SIX THINKING HATS — the multi-agent debate layer

   De Bono's method, used here as an agent architecture. Each hat is a separate
   agent with a declared bias and a narrow remit; the blue hat consolidates
   WITHOUT averaging. Where hats disagree and the evidence does not settle it,
   the disagreement is published as the output.

   Why this rather than one extraction pass: a single pass over policy documents
   produces a confident, uniform and frequently wrong view. Forcing a black-hat
   agent to fill the risk-of-action column before anything publishes is a
   structural fix for optimism bias, not a stylistic one.
   ========================================================================== */

export const HATS = [
  {
    id: "white", name: "White — data", tone: "text2", icon: "database",
    remit: "Facts, figures and gaps. States what is known, what is not, and the provenance of each.",
    bias: "Treats the absence of data as the absence of a phenomenon. Will under-report anything not yet measured.",
    mustAnswer: "What do we actually know, and how well sourced is it?",
  },
  {
    id: "yellow", name: "Yellow — optimism", tone: "win", icon: "sun",
    remit: "Best realistic case. Values, benefits and why this could work.",
    bias: "Systematically discounts execution risk. Its output is a ceiling, never a forecast.",
    mustAnswer: "If this goes well, what does it look like and what is it worth?",
  },
  {
    id: "black", name: "Black — caution", tone: "risk", icon: "shield",
    remit: "Risks, failure modes, why this does not work. Required to fill the risk-of-action column.",
    bias: "Deliberately negative. Its output is a required input, never a verdict.",
    mustAnswer: "What kills this, and what would we see first if it were failing?",
  },
  {
    id: "red", name: "Red — intuition", tone: "nation", icon: "heart",
    remit: "Gut read, stakeholder sentiment, political and organisational feel. Explicitly unjustified.",
    bias: "No evidence standard by construction. Valuable precisely because it surfaces what the others suppress.",
    mustAnswer: "What does this feel like to the people who have to approve or adopt it?",
  },
  {
    id: "green", name: "Green — creativity", tone: "market", icon: "sprout",
    remit: "Alternatives, reframings, the option nobody listed.",
    bias: "Generates volume without filtering. Most output is discarded; the filter is elsewhere.",
    mustAnswer: "What else could this be? What is the non-obvious framing?",
  },
  {
    id: "blue", name: "Blue — moderator", tone: "scenario", icon: "gitmerge",
    remit: "Runs the process and consolidates. Preserves unresolved disagreement rather than averaging it.",
    bias: "Last writer. Must show its working and name what remains contested.",
    mustAnswer: "What do we conclude, what stays open, and what decides it?",
  },
];

/* ---------------------------------------------------------------------------
   Worked debates. These are authored, not generated — the point is to review
   the SHAPE of a good debate before wiring live agents to it.
   --------------------------------------------------------------------------- */
export const DEBATES = [
  {
    id: "DB-01",
    topic: "Should we enter charger commissioning as a service?",
    ref: "OP-01",
    context:
      "6,562 chargers approved under PM E-DRIVE with none installed, against 9,583 installed under the earlier FAME-II scheme. Support runs to 31 March 2028.",
    rounds: [
      { hat: "white", says: "Approved 6,562, installed zero, confirmed in a parliamentary reply in August 2026. FAME-II installed 9,583, so the capability exists in the market. What we do NOT have: the reason for the gap. Land, DISCOM connection and commissioning manpower are the stated hypotheses, not measured causes. Provenance on the cause is weak." },
      { hat: "yellow", says: "Committed public money, a named terminal date, no incumbent, and a customer set — CPOs and state transport undertakings — that already has budget approved. We hold power electronics, field service and industrial project discipline. Recurring O&M revenue attaches after commissioning, and it is the reference case that wins the next district tender." },
      { hat: "black", says: "Three objections. First, we are inferring the bottleneck rather than measuring it — if the real cause is land acquisition, none of our capabilities apply. Second, this is a services P&L with working-capital and margin characteristics the organisation has repeatedly rejected. Third, the window closes in March 2028; if the scheme lapses before commissioning scales, we hold a capability with no funded demand." },
      { hat: "red", says: "It feels like the right problem and the wrong organisation. Everyone who sees the zero reacts to it — that instinct is sound. But a division that sells components will find a reason to say no at the second review, and the people proposing it know that. There is also quiet discomfort about being seen to profit from a public execution failure." },
      { hat: "green", says: "Three reframings. Do not sell commissioning — sell a guaranteed energised connection, priced per site, taking the DISCOM risk ourselves. Or go one layer up and sell the diagnostic first: a paid study of why the 6,562 are stuck, which produces the measurement the white hat says we lack and positions us for the remedy. Or pair it with OP-03 so every commissioned charger carries our metering, making the services margin a route to a standards position rather than an end in itself." },
      { hat: "blue", says: "Convergent on the signal, divergent on the entry. White and black agree the causal diagnosis is unproven, and that is the binding constraint — not appetite. Green's second reframing resolves it cheaply: a paid diagnostic is small, fast, produces the missing measurement and is reversible. Red's organisational objection is real and is logged as R4; it is not a reason to stop, it is a reason to ring-fence the P&L before starting rather than after. UNRESOLVED: whether the 2028 terminal date is a floor or a ceiling on the opportunity — that depends on a successor scheme nobody has drafted yet." },
    ],
    verdict: "Proceed to a paid diagnostic, not to a services build. Decide the full entry when the causal data exists.",
    open: "Does PM E-DRIVE charging support have a successor after March 2028? Unknown, and it changes the size of the prize by an order of magnitude.",
  },
  {
    id: "DB-02",
    topic: "Is the 80% EV penetration target by 2047 a plan or an aspiration?",
    ref: "N09",
    context:
      "80% EV penetration by 2047, 100% ZEV sales around 2055. Meanwhile the e-2W demand subsidy closed in July 2026, 55 e-trucks were supported, and charger conversion is at zero.",
    rounds: [
      { hat: "white", says: "The target is stated in vision documents, not in a notified instrument. NITI's own scenarios put electricity at 24% of transport energy by 2070 under current policy and 45% under net zero — neither of which is consistent with 80% of the fleet being electric by 2047 unless heavy segments stay liquid-fuelled. The two numbers come from different exercises and have not been reconciled." },
      { hat: "yellow", says: "Direction is unambiguous and has survived a subsidy withdrawal. Two-wheelers reached scale without needing the subsidy to continue, which is the strongest possible evidence of genuine demand. Cost curves, state policies and CAFE-III super-credits all push the same way." },
      { hat: "black", says: "Charger conversion is zero. Cell capacity is 1.4 GWh against 40 GWh awarded. Fifty-five e-trucks. The magnet supply chain was interrupted by a foreign ministry's discretion within the last eighteen months. Every physical precondition for 80% is behind schedule, and our own forecast ledger says we systematically over-forecast physical infrastructure." },
      { hat: "red", says: "Nobody in the room actually believes 80%, and nobody will say so in a document that goes to a ministry. That gap between private and public estimate is itself a risk — plans get built on a number people are privately discounting, which means the discount is never made explicit or costed." },
      { hat: "green", says: "Stop treating it as one number. Penetration by segment is the only useful form: two- and three-wheelers plausibly exceed 80%, buses follow public procurement and could, trucks almost certainly do not. A blended target hides that entirely. Alternatively, treat 80% as a procurement signal rather than a forecast — it tells us what the state will buy, which is the actionable content regardless of whether the fleet gets there." },
      { hat: "blue", says: "White and black converge: the target is not reconciled with NITI's own energy scenarios, and the physical preconditions are behind. Yellow's point stands on two-wheelers specifically and nowhere else. Green's segment decomposition is the resolution — adopt it and the contradiction dissolves, because the aggregate was never meaningful. Red's observation is the one to act on: state the segment split publicly so the private discount becomes an explicit, costed assumption. CONCLUSION: treat 80% as a procurement signal, plan by segment, and do not let a blended number enter a volume forecast." },
    ],
    verdict: "Aspiration in aggregate, plan at segment level. Two-wheelers credible, trucks not, buses procurement-dependent.",
    open: "Nobody has reconciled the 80% fleet target with NITI's 24–45% transport-energy electricity range. Worth asking directly.",
  },
];

/* Optimistic / pessimistic framing applied to the scenario set — the review
   asked for these alongside the policy-driven aspiration case. */
export const STANCES = [
  {
    id: "opt", name: "Optimistic", tone: "win",
    premise: "Execution improves, global conditions stay benign, India clears its bottlenecks roughly on schedule.",
    assumes: ["Charger commissioning unblocks within 18 months", "Cell capacity converts to 15+ GWh by 2028", "Tariff relief holds and crude normalises below $80", "REPM award lands on schedule with price competition"],
    implies: "Net Zero scenario trajectories are broadly achievable. Aggressive positioning in electrification pays.",
    watch: "First real test is charger conversion moving off zero. Nothing else validates this stance as directly.",
  },
  {
    id: "policy", name: "Policy-driven", tone: "scenario",
    premise: "The stated plan proceeds as written. This is the case the documents describe and the default on most of this board.",
    assumes: ["NITI scenarios hold as published", "Schemes run to their terminal dates and are succeeded", "Targets are met approximately on time"],
    implies: "The trajectory screens are read at face value; both scenarios remain live to 2035.",
    watch: "The forecast ledger exists to detect when this stance quietly stops being true.",
  },
  {
    id: "pess", name: "Pessimistic", tone: "risk",
    premise: "Execution gaps persist, external shocks recur, and physical infrastructure continues to lag the funding curve.",
    assumes: ["Charger conversion stays near zero through 2028", "Cell localisation remains sub-5 GWh", "Crude stays above $95 and mineral access is interrupted again", "PLI-Auto lapses without a successor"],
    implies: "Current Policy trajectories are the ceiling, not the midpoint. Efficiency and liquid-fuel content stay commercially alive far longer than the discourse assumes.",
    watch: "This stance is currently better supported by the evidence than the optimistic one — three of its four assumptions are already observed.",
  },
];
