import React, { useState } from "react";
import {
  ArrowUpRight, ArrowRight, Dot, ShieldAlert, Wrench, HeartHandshake,
  Ban, Network, Boxes,
} from "lucide-react";
import { C, mono, tone } from "./theme.js";
import {
  Panel, Tag, Num, SectionHead, SoWhat, Field, Bars, Stack, Empty, Collapse,
} from "./ui.jsx";
import {
  OPPS, SCREENED_OUT, CAPABILITY_GROUPS, RISKS, DIVISIONS, VECTORS, EXPOSURE,
  ADJACENCIES, NATION_BUILDING, ECO, MOVES, HORIZONS, SECTORS, PILLARS, PROBLEMS,
} from "./data.js";

const STANCE_KEY = {
  "White space": "market",
  "Adjacent": "scenario",
  "Extend the core": "gazette",
  "Defend and deepen": "text2",
  "New business model": "nation",
  "Licence to operate": "text3",
};
const stanceColor = (s) => C[STANCE_KEY[s]] || C.text3;

/* ======================= VIEW: OPPORTUNITY MAP ========================== */
export function Opportunities({ horizon, sector }) {
  const rows = OPPS.filter((o) => (!horizon || o.horizon === horizon) && (!sector || o.sector === sector));
  const [sel, setSel] = useState(OPPS[0]);
  const active = rows.find((o) => o.id === sel.id) ? sel : rows[0];

  return (
    <div>
      <SectionHead
        kicker="Where the agenda creates room"
        title="Opportunity map"
        sub="Every space traces to a national problem statement or a live notification. The review rejected the obvious candidates, so each entry here has to clear one test: would a competent competitor reading only the news already have this on their list? If yes, it is in the screened-out panel at the bottom instead."
      />

      <div className="grid gap-3" style={{ gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)" }}>
        <Stack>
          {rows.map((o) => {
            const sec = SECTORS.find((s) => s.id === o.sector);
            return (
              <button key={o.id} onClick={() => setSel(o)} className="text-left px-4 py-3"
                style={{
                  background: active?.id === o.id ? C.panel2 : C.panel, cursor: "pointer",
                  borderLeft: `3px solid ${active?.id === o.id ? stanceColor(o.stance) : "transparent"}`,
                }}>
                <div className="flex items-start justify-between gap-3">
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500, lineHeight: 1.35 }}>{o.name}</div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Tag color={stanceColor(o.stance)}>{o.stance}</Tag>
                      <Num size={10.5} color={C.text3}>{HORIZONS.find((h) => h.id === o.horizon)?.year}</Num>
                      {sec && <span style={{ fontSize: 11, color: C.text3 }}>{sec.name.split(" ")[0]}</span>}
                    </div>
                  </div>
                  <div className="flex gap-3 items-end pt-1 flex-shrink-0">
                    <div>
                      <div style={{ fontSize: 9, color: C.text3, marginBottom: 3 }}>Conv</div>
                      <Bars value={o.conviction} color={stanceColor(o.stance)} label={`Conviction ${o.conviction} of 5`} />
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.text3, marginBottom: 3 }}>Effort</div>
                      <Bars value={o.effort} color={C.text3} label={`Effort ${o.effort} of 5`} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          {rows.length === 0 && <Empty>No spaces sit on this filter. Clear the selection on the spine.</Empty>}
        </Stack>

        {active && (
          <Panel className="p-5" style={{ alignSelf: "start", position: "sticky", top: 16 }}>
            <Tag color={stanceColor(active.stance)} solid>{active.stance}</Tag>
            <h3 style={{ fontSize: 19, fontWeight: 600, color: C.text, marginTop: 12, lineHeight: 1.3 }}>{active.name}</h3>

            <div className="flex gap-5 mt-4 mb-5 flex-wrap">
              <Field label="Horizon"><Num size={14}>{HORIZONS.find((h) => h.id === active.horizon)?.year}</Num></Field>
              <Field label="Conviction"><Num size={14} color={stanceColor(active.stance)}>{active.conviction}/5</Num></Field>
              <Field label="Build effort"><Num size={14}>{active.effort}/5</Num></Field>
              <Field label="Owner"><span style={{ fontSize: 12.5, color: C.text }}>{active.unit}</span></Field>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="What the evidence says">
                <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{active.driver}</p>
              </Field>

              <div>
                <div style={{ fontSize: 11, color: C.text3, marginBottom: 5 }}>The thesis</div>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>{active.thesis}</p>
              </div>

              <Field label="The move">
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>{active.move}</p>
              </Field>

              <SoWhat label="Why it matters to us" color={stanceColor(active.stance)} dense>
                {active.boschWhy}
              </SoWhat>

              <Field label="Capabilities this requires">
                <div className="flex gap-1.5 flex-wrap">
                  {active.capabilities.map((c) => <Tag key={c} color={C.text2}>{c}</Tag>)}
                </div>
              </Field>

              <div className="px-3 py-2.5 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.risk}` }}>
                <div style={{ fontSize: 10.5, color: C.risk, marginBottom: 3, fontFamily: mono }}>RISK OF ACTING</div>
                <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{active.risk}</p>
              </div>

              <Field label="Window">
                <span style={{ fontSize: 12.5, color: stanceColor(active.stance) }}>{active.window}</span>
              </Field>
            </div>
          </Panel>
        )}
      </div>

      {/* screened out — keeping the filter visible */}
      <Panel className="p-5 mt-3" accent={C.text3}>
        <div className="flex items-center gap-2 mb-3">
          <Ban size={14} color={C.text3} />
          <div style={{ fontSize: 13.5, color: C.text }}>Screened out as too obvious</div>
        </div>
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, marginBottom: 14, maxWidth: "84ch" }}>
          Retained deliberately. A board that only shows what survived the filter cannot be audited on
          whether the filter is any good — and these were rejected in review, so the reasoning belongs
          on the screen rather than in the minutes.
        </p>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {SCREENED_OUT.map((s) => (
            <div key={s.name} className="px-3 py-3 rounded" style={{ background: C.panel2 }}>
              <div style={{ fontSize: 12.5, color: C.text2, textDecoration: "line-through", marginBottom: 5 }}>{s.name}</div>
              <p style={{ fontSize: 11.5, color: C.text3, lineHeight: 1.55 }}>{s.why}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ==================== VIEW: CAPABILITY DEVELOPMENT ====================== */
export function Capabilities() {
  /* Which opportunities demand each capability — the reverse index is the
     useful direction, because it shows what one hire or one lab unlocks. */
  const demand = {};
  OPPS.forEach((o) => o.capabilities.forEach((c) => {
    (demand[c] = demand[c] || []).push(o);
  }));

  return (
    <div>
      <SectionHead
        kicker="What we would have to become"
        title="Capability development"
        sub="Read in reverse: for each capability, which opportunities it unlocks. A capability demanded by three separate opportunities is a different investment case from one demanded by a single bet, and the count is the argument."
      />

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {CAPABILITY_GROUPS.map((g) => (
          <Panel key={g.id} className="p-4" accent={tone(g.tone)}>
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={14} color={tone(g.tone)} />
              <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{g.name}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {g.items.map((it) => {
                const uses = demand[it] || [];
                return (
                  <div key={it}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span style={{ fontSize: 12.5, color: C.text, lineHeight: 1.4 }}>{it}</span>
                      <Num size={11} color={uses.length > 1 ? tone(g.tone) : C.text3}>
                        {uses.length || "—"}
                      </Num>
                    </div>
                    {uses.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-1.5">
                        {uses.map((u) => <Tag key={u.id} color={C.text3} title={u.name}>{u.id}</Tag>)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="p-5 mt-3" accent={C.gazette}>
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 8 }}>The pattern worth noticing</div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          The commercial and institutional column is the thinnest capability we hold and the one most
          frequently demanded — standards seats, public-sector contracting, regulatory engagement with
          financial regulators, subsidy navigation. None of it is technology. Several of the highest
          conviction opportunities on this board are gated on capabilities that a component engineering
          organisation does not naturally build, and that is a more likely failure mode than any of the
          technical risks listed.
        </p>
      </Panel>
    </div>
  );
}

/* ========================= VIEW: RISK REGISTER ========================== */
export function RiskRegister() {
  const [axis, setAxis] = useState("all");
  const rows = RISKS.filter((r) => axis === "all" || r.axis === axis);

  const cell = (known, ax) => RISKS.filter((r) => r.known === known && r.axis === ax);

  return (
    <div>
      <SectionHead
        kicker="What could go wrong, both ways"
        title="Risk register"
        sub="Two axes. Known versus unknown, and the risk of acting versus the risk of not acting. Most registers only carry the risk of acting, which quietly biases every decision toward doing nothing."
        right={
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["all", "All"], ["action", "Risk of acting"], ["inaction", "Risk of inaction"]].map(([k, l]) => (
              <button key={k} onClick={() => setAxis(k)} className="px-3.5 py-2"
                style={{
                  fontSize: 12, cursor: "pointer",
                  background: axis === k ? C.panel2 : "transparent",
                  color: axis === k ? C.text : C.text2,
                }}>
                {l}
              </button>
            ))}
          </div>
        }
      />

      {/* 2x2 summary */}
      <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
        {[["known", "action", "Known · risk of acting"],
          ["known", "inaction", "Known · risk of inaction"],
          ["unknown", "action", "Unknown · risk of acting"],
          ["unknown", "inaction", "Unknown · risk of inaction"]].map(([k, a, label]) => {
          const items = cell(k, a);
          return (
            <Panel key={label} className="px-4 py-3" accent={a === "inaction" ? C.risk : C.gazette}>
              <div style={{ fontSize: 11.5, color: C.text2, minHeight: 30 }}>{label}</div>
              <Num size={24} color={C.text} weight={600}>{items.length}</Num>
              <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>
                {items.length ? items.map((i) => i.id).join(" · ") : "none logged"}
              </div>
            </Panel>
          );
        })}
      </div>

      <Stack>
        {[...rows].sort((a, b) => (b.severity * b.likelihood) - (a.severity * a.likelihood)).map((r) => {
          const linked = OPPS.find((o) => o.id === r.link);
          return (
            <Collapse key={r.id} accent={r.axis === "inaction" ? C.risk : C.gazette}
              title={r.name}
              subtitle={`${r.known === "known" ? "Known" : "Unknown"} · risk of ${r.axis === "action" ? "acting" : "inaction"}${linked ? ` · linked to ${linked.id}` : ""}`}
              right={
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:block">
                    <div style={{ fontSize: 9.5, color: C.text3, marginBottom: 3 }}>Severity</div>
                    <Bars value={r.severity} color={C.risk} label={`Severity ${r.severity} of 5`} />
                  </div>
                  <div className="hidden sm:block">
                    <div style={{ fontSize: 9.5, color: C.text3, marginBottom: 3 }}>Likelihood</div>
                    <Bars value={r.likelihood} color={C.text3} label={`Likelihood ${r.likelihood} of 5`} />
                  </div>
                  <Num size={10.5} color={C.text3}>{r.id}</Num>
                </div>
              }>
              <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.65, marginBottom: 12, maxWidth: "82ch" }}>
                {r.body}
              </p>
              <div style={{ maxWidth: "82ch" }}>
                <SoWhat label="Mitigation" color={C.win} dense>{r.mitigation}</SoWhat>
              </div>
            </Collapse>
          );
        })}
      </Stack>

      <Panel className="p-5 mt-3" accent={C.risk}>
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert size={14} color={C.risk} />
          <div style={{ fontSize: 13.5, color: C.text }}>The risk nobody logs</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          R4 — a services P&L rejected by a component-shaped organisation — is the highest-likelihood
          entry on this board and the only one that is entirely within our own control. Three of the
          strongest opportunities here are services or data businesses with working-capital and margin
          profiles unlike anything in the current portfolio. The usual failure mode for this kind of
          plan is not that a competitor wins. It is that the second review cycle asks why the margin
          looks wrong.
        </p>
      </Panel>
    </div>
  );
}

/* ================ VIEW: PORTFOLIO EXPOSURE & ADJACENCY ================== */
export function PortfolioGrid() {
  const cell = (v) => {
    if (v === 2) return { bg: C.market, o: 1 };
    if (v === 1) return { bg: C.market, o: 0.45 };
    if (v === 0) return { bg: C.rule, o: 0.5 };
    if (v === -1) return { bg: C.risk, o: 0.45 };
    return { bg: C.risk, o: 1 };
  };

  return (
    <div>
      <SectionHead
        kicker="Where we are exposed"
        title="Portfolio exposure & adjacency"
        sub="Each division against each policy vector. Negative is structural exposure that needs a hedge; positive is a pull we are positioned to serve. The neutral squares are the ones worth arguing about — they are usually a decision nobody has made."
      />

      <Panel className="p-5" style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 2, width: "100%", minWidth: 880 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0 12px 12px 0", fontSize: 11.5, color: C.text3, fontWeight: 400 }}>Division</th>
              {VECTORS.map((v) => (
                <th key={v} style={{ padding: "0 4px 12px", fontSize: 11, color: C.text2, fontWeight: 400, lineHeight: 1.25, verticalAlign: "bottom" }}>
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIVISIONS.map((d, i) => (
              <tr key={d}>
                <td style={{ padding: "0 12px 0 0", fontSize: 12.5, color: C.text, whiteSpace: "nowrap" }}>{d}</td>
                {EXPOSURE[i].map((v, j) => {
                  const s = cell(v);
                  return (
                    <td key={j} style={{ padding: 0 }}>
                      <div title={`${d} × ${VECTORS[j]}: ${v > 0 ? `+${v}` : v}`}
                        style={{ height: 30, borderRadius: 3, background: s.bg, opacity: s.o, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: mono, fontSize: 10.5, color: Math.abs(v) === 2 ? C.onAccent : C.text2 }}>
                          {v > 0 ? `+${v}` : v}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-5 mt-5 pt-4 flex-wrap" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
          <span style={{ fontSize: 11.5, color: C.text3 }}>Reading the grid</span>
          {[["-2", "structural exposure", C.risk, 1], ["-1", "watch", C.risk, 0.45],
            ["0", "neutral", C.rule, 0.5], ["+1", "tailwind", C.market, 0.45],
            ["+2", "core growth", C.market, 1]].map(([n, l, c, o]) => (
            <span key={n} className="inline-flex items-center gap-2" style={{ fontSize: 11.5, color: C.text2 }}>
              <span style={{ width: 14, height: 14, borderRadius: 3, background: c, opacity: o, display: "inline-block" }} />
              {n} {l}
            </span>
          ))}
        </div>
      </Panel>

      {/* adjacency discovery */}
      <SectionHead title="Adjacency discovery" kicker="One step from what we already do"
        sub="Each row is a capability we hold, a place it could travel to, and the specific bridge that makes the move possible. Distance 1 means the same competence with a different certification; distance 2 means a new customer type as well." />
      <Stack>
        {ADJACENCIES.map((a) => {
          const sec = SECTORS.find((s) => s.id === a.sector);
          return (
            <div key={a.from + a.to} className="px-4 py-4" style={{ background: C.panel, borderLeft: `3px solid ${a.distance === 1 ? C.market : C.scenario}` }}>
              <div className="flex items-center gap-3 flex-wrap mb-3">
                <span style={{ fontSize: 13, color: C.text2 }}>{a.from}</span>
                <ArrowRight size={14} color={a.distance === 1 ? C.market : C.scenario} />
                <span style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{a.to}</span>
                <Tag color={a.distance === 1 ? C.market : C.scenario}>distance {a.distance}</Tag>
                {sec && <Tag color={C.text3}>{sec.name.split(" ")[0]}</Tag>}
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                <Field label="The bridge">
                  <span style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.5 }}>{a.bridge}</span>
                </Field>
                <Field label="What is pulling">
                  <span style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.5 }}>{a.pull}</span>
                </Field>
              </div>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

/* ====================== VIEW: NATION BUILDING LENS ====================== */
const NB_TONE = { Monetary: "market", "Non-monetary": "nation", Mixed: "scenario" };

export function NationBuilding() {
  return (
    <div>
      <SectionHead
        kicker="Contribution beyond product sales"
        title="Nation building lens"
        sub="Skilling, education, university partnerships, startups, MSME development and R&D ecosystems. Some of these return revenue, some return standing, and some return both. All three are tracked, because a plan that only counts revenue will systematically drop the things that buy us a seat at the table."
      />

      <Stack>
        {NATION_BUILDING.map((n) => {
          const pil = PILLARS.find((p) => p.id === n.pillar);
          const linked = OPPS.find((o) => o.id === n.link);
          return (
            <div key={n.id} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${tone(NB_TONE[n.type])}` }}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div style={{ minWidth: 260, flex: 1 }}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Tag color={tone(NB_TONE[n.type])}>{n.type}</Tag>
                    {pil && <Tag color={tone(pil.tone)}>{pil.name.split(" ")[0]}</Tag>}
                    {linked && <Tag color={C.text3} title={linked.name}>{linked.id}</Tag>}
                  </div>
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500 }}>{n.name}</div>
                </div>
                <div style={{ minWidth: 150 }}>
                  <Field label="Scale">
                    <Num size={13} color={C.text}>{n.scale}</Num>
                  </Field>
                </div>
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                <Field label="What we contribute">
                  <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{n.contribution}</p>
                </Field>
                <Field label="What comes back">
                  <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{n.returns}</p>
                </Field>
              </div>
            </div>
          );
        })}
      </Stack>

      <Panel className="p-5 mt-3" accent={C.nation}>
        <div className="flex items-center gap-2 mb-3">
          <HeartHandshake size={14} color={C.nation} />
          <div style={{ fontSize: 13.5, color: C.text }}>Why the non-monetary rows are the point</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          Certification authority, standards seats and public research partnerships generate little
          direct revenue and will lose every portfolio review scored on financial return alone. They
          are also the mechanism by which we find out what is being drafted before it is published,
          and by which our constraints get written into rules rather than imposed on us. The correct
          test for these rows is not payback period — it is whether we would be in the room without
          them.
        </p>
      </Panel>
    </div>
  );
}

/* ======================== VIEW: ECOSYSTEM RADAR ========================= */
export function Ecosystem() {
  const playTone = {
    "Acquire": "risk", "Acquire or invest": "risk", "Offtake + JV": "market",
    "Anchor offtake": "market", "Supply agreement": "scenario", "Component supply": "scenario",
    "Component supply + services": "scenario", "Partner": "scenario", "Develop": "gazette",
    "Co-develop": "gazette", "Join + standards seat": "nation", "Qualification services": "nation",
  };
  return (
    <div>
      <SectionHead
        kicker="Who else is already moving"
        title="Ecosystem & deal radar"
        sub="Segments rather than named companies at this stage — the production system would resolve each row to a live, scored watchlist from filings and funding data. The relationship column is the actual output: not who exists, but what we should be to them."
      />

      <Panel className="px-4 py-3 mb-3" accent={C.gazette}>
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "86ch" }}>
          Screening hypotheses, not diligence. Nothing here has been validated for financial, legal or
          competition considerations, and no row constitutes a recommendation to transact.
        </p>
      </Panel>

      <Stack>
        <div className="grid px-4 py-2.5" style={{ background: C.panel, gridTemplateColumns: "1.8fr 0.9fr 1fr 1.2fr 1.8fr" }}>
          {["Segment", "Type", "Maturity", "Relationship", "Why us"].map((h) => (
            <div key={h} style={{ fontSize: 11, color: C.text3 }}>{h}</div>
          ))}
        </div>
        {ECO.map((e) => (
          <div key={e.name} className="grid px-4 py-3.5 items-center" style={{ background: C.panel, gridTemplateColumns: "1.8fr 0.9fr 1fr 1.2fr 1.8fr" }}>
            <div>
              <div style={{ fontSize: 13, color: C.text }}>{e.name}</div>
              <div style={{ fontSize: 11, color: C.text3, marginTop: 3, lineHeight: 1.4 }}>{e.note}</div>
            </div>
            <div style={{ fontSize: 12, color: C.text2 }}>{e.type}</div>
            <div style={{ fontSize: 12, color: C.text2 }}>{e.stage}</div>
            <div><Tag color={tone(playTone[e.play] || "text2")}>{e.play}</Tag></div>
            <div style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>{e.fit}</div>
          </div>
        ))}
      </Stack>

      <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <Panel className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Network size={14} color={C.market} />
            <div style={{ fontSize: 13, color: C.text }}>The counterparty appearing twice</div>
          </div>
          <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.65 }}>
            Attero and Lohum bid for rare-earth magnet capacity and are also cleared as advanced
            chemical recyclers. That puts the same two firms on both ends of the materials loop —
            feedstock in, magnets out. For an offtake conversation this is the most interesting
            structure on the board, because our reverse-logistics reach is the input they cannot
            easily buy.
          </p>
        </Panel>
        <Panel className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Boxes size={14} color={C.scenario} />
            <div style={{ fontSize: 13, color: C.text }}>What the radar should watch weekly</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {["REPM award announcements and who wins allocation",
              "New entrants in reduced-REE motor design and their patent filings",
              "Refining and separation capacity announcements",
              "Charge point operator consolidation and commissioning rates",
              "UEI Alliance membership changes and standards drafts",
              "Automotive qualification partnerships around Dholera and OSATs",
              "Standards committee memberships we are absent from"].map((x) => (
              <div key={x} className="flex items-start gap-2.5">
                <Dot size={16} color={C.market} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.45 }}>{x}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* =========================== VIEW: MOVE BOARD =========================== */
export function MoveBoard() {
  const stageTone = { Explore: "text3", Shape: "scenario", Pilot: "gazette", Scale: "market" };
  return (
    <div>
      <SectionHead
        kicker="What we do about it"
        title="Move board"
        sub="Each card traces back to a signal, an opportunity or a risk, so that when the underlying evidence changes we know which commitments move with it — including backwards."
      />
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {MOVES.map((col) => (
          <div key={col.stage}>
            <div className="flex items-center justify-between px-3 py-2.5 rounded-t"
              style={{ background: C.panel2, borderTop: `2px solid ${tone(stageTone[col.stage])}` }}>
              <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{col.stage}</span>
              <Num size={11} color={C.text3}>{col.items.length}</Num>
            </div>
            <Stack>
              {col.items.map((it) => (
                <div key={it.t} className="px-3 py-3.5" style={{ background: C.panel }}>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.4 }}>{it.t}</div>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <Num size={10.5} color={C.text3}>{HORIZONS.find((h) => h.id === it.h)?.year}</Num>
                    <span style={{ fontSize: 10.5, color: C.text3 }}>·</span>
                    <span style={{ fontSize: 11, color: C.text2 }}>{it.owner}</span>
                  </div>
                  <div className="mt-2.5 pt-2.5 flex items-center gap-1.5" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
                    <ArrowUpRight size={11} color={C.text3} />
                    <Num size={10} color={C.text3}>{it.link}</Num>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        ))}
      </div>
      <Panel className="p-5 mt-3">
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 8 }}>How a card is meant to move</div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "82ch" }}>
          A card advances only when the evidence behind it changes — a draft becomes a notification, a
          bid is awarded, a state publishes a tender. That keeps the board tied to what has actually
          happened rather than to the meeting cadence, and it makes the reverse case just as visible:
          if the policy reverses, the card moves back and the spend stops. The PM E-DRIVE two-wheeler
          correction is the worked example — one parliamentary reply moved an assumption backwards.
        </p>
      </Panel>
    </div>
  );
}
