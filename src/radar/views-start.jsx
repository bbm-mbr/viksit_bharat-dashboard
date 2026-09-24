import React from "react";
import { Clock, ArrowRight, Compass, Eye, Layers3 } from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat } from "./ui.jsx";

/* Reading paths. The review's concern was that users would be impressed and
   then not use the board. The fix is to say plainly what to look at first. */
const PATHS = [
  {
    id: "five", mins: "5 minutes", tone: "gazette", label: "I have a meeting in ten minutes",
    steps: [
      { v: "global", t: "Global tailwinds & headwinds", why: "The two or three external forces currently moving India's position." },
      { v: "dots", t: "Connect the dots", why: "One chain, six steps, ending on a national target. This is the slide." },
      { v: "kpi", t: "KPI cockpit → Leading", why: "Ten indicators. The one flat line is the story." },
    ],
    outcome: "You can state what changed externally, trace it to a national target, and name the one indicator that has not moved.",
  },
  {
    id: "twenty", mins: "20 minutes", tone: "market", label: "I am preparing a point of view",
    steps: [
      { v: "pof", t: "Picture of Future", why: "What India is trying to do, before anything about us." },
      { v: "sectors", t: "Priority sectors", why: "The eight bottlenecks the state intends to remove, and where we have no position." },
      { v: "feed", t: "Signal feed", why: "What actually happened, filtered to the sector you care about." },
      { v: "opps", t: "Opportunity map", why: "What follows, with the obvious candidates visibly screened out." },
    ],
    outcome: "You can argue a position inside the government's own frame rather than against it.",
  },
  {
    id: "deep", mins: "An hour or more", tone: "scenario", label: "I am challenging the analysis",
    steps: [
      { v: "forecast", t: "Forecast validation", why: "Start where we were wrong. It is the fastest read on how much to trust the rest." },
      { v: "hats", t: "Six-hat debate", why: "The argument against each position, including the ones we recommend." },
      { v: "risk", t: "Risk register", why: "Risk of acting and risk of inaction, side by side." },
      { v: "lake", t: "Data lake", why: "What enters the corpus, what is refused, and which guardrail caught the last error." },
      { v: "ministry", t: "Ministry problems", why: "80 statements with their own audit flags. 36 carry a fact-check flag." },
    ],
    outcome: "You can locate the weakest link in any claim on this board and attack it specifically.",
  },
];

const RULES = [
  { n: "01", t: "Read the 'so what', not the number", d: "Every fact on this board carries a consequence line. If a panel has no 'so what', it is reference material and can be skipped." },
  { n: "02", t: "Check the provenance tag", d: "sourced / briefed / illustrative. Illustrative records exist for structure review and must not enter a plan." },
  { n: "03", t: "Leading beats lagging for decisions", d: "Lagging indicators size the market for a board. Only the leading set is still actionable." },
  { n: "04", t: "Use the horizon spine to narrow", d: "The year strip at the top filters the whole board. Most questions are about one horizon, not all six." },
  { n: "05", t: "Disagreement is a finding", d: "Where the six hats do not converge, the open question is published. Those are the highest-value items on the board." },
];

export function StartHere({ onNav }) {
  return (
    <div>
      <SectionHead
        kicker="Start here"
        title="How to use this board"
        sub="There is a lot on it. That is deliberate for a corpus and wrong for a first visit — so this screen tells you what to look at, in what order, for the time you actually have."
      />

      {/* the one thing */}
      <Panel className="p-5 mb-4" accent={C.risk}>
        <div className="flex items-center gap-2 mb-3">
          <Eye size={15} color={C.risk} />
          <span style={{ fontFamily: mono, fontSize: 10.5, color: C.risk, letterSpacing: "0.08em" }}>
            IF YOU READ ONE THING
          </span>
        </div>
        <p style={{ fontSize: 17, color: C.text, lineHeight: 1.5, fontWeight: 500, maxWidth: "64ch" }}>
          6,562 public chargers have been approved under PM E-DRIVE and none have been installed.
        </p>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, marginTop: 12, maxWidth: "80ch" }}>
          Every other charging indicator on this board measures intent — money committed, targets set.
          This one measures conversion, and it reads zero against a scheme that expires in March 2028.
          It says the binding constraint stopped being subsidy some time ago. That single number is the
          basis for the highest-conviction opportunity here, and it is the one thing worth carrying out
          of this application if nothing else survives.
        </p>
        {onNav && (
          <button onClick={() => onNav("kpi")}
            className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-2 rounded"
            style={{ background: C.risk, color: C.onAccent, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
            See it in the cockpit <ArrowRight size={12} />
          </button>
        )}
      </Panel>

      {/* reading paths */}
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))" }}>
        {PATHS.map((p) => (
          <Panel key={p.id} className="p-4" accent={tone(p.tone)}>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={13} color={tone(p.tone)} />
              <Num size={13} color={tone(p.tone)} weight={600}>{p.mins}</Num>
            </div>
            <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500, marginBottom: 14 }}>{p.label}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.steps.map((s, i) => (
                <div key={s.v}>
                  <button
                    onClick={() => onNav && onNav(s.v)}
                    className="text-left w-full flex items-start gap-2.5"
                    style={{ cursor: onNav ? "pointer" : "default", background: "transparent" }}>
                    <Num size={10.5} color={C.text3}>{i + 1}</Num>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, color: tone(p.tone), fontWeight: 500, lineHeight: 1.3 }}>{s.t}</div>
                      <div style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.45, marginTop: 2 }}>{s.why}</div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
              <div style={{ fontSize: 10, color: C.text3, fontFamily: mono, marginBottom: 4 }}>YOU LEAVE ABLE TO</div>
              <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.5 }}>{p.outcome}</p>
            </div>
          </Panel>
        ))}
      </div>

      {/* five rules */}
      <Panel className="p-5 mb-3">
        <div className="flex items-center gap-2 mb-4">
          <Compass size={15} color={C.gazette} />
          <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>Five rules for reading anything here</div>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>
          {RULES.map((r) => (
            <div key={r.n} className="flex items-start gap-3">
              <Num size={16} color={C.text3} weight={600}>{r.n}</Num>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: C.text, fontWeight: 500, lineHeight: 1.35 }}>{r.t}</div>
                <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.5, marginTop: 3 }}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="p-4" accent={C.scenario}>
        <div className="flex items-start gap-3">
          <Layers3 size={15} color={C.scenario} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 4 }}>
              Simple and Full modes
            </div>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.65, maxWidth: "84ch" }}>
              The toggle in the header switches the navigation between <strong>Simple</strong> — eight
              screens covering the whole argument — and <strong>Full</strong>, which adds the reference
              and method screens behind them. Simple is the default on purpose. Nothing is removed in
              Simple mode; the depth is still there when a question needs it.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
