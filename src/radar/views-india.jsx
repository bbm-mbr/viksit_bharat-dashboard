import React, { useState } from "react";
import { Flag, Landmark, ArrowRight, CircleAlert, Sparkles } from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Bars, Meter, Stat, Stack, Collapse, Empty } from "./ui.jsx";
import { PILLARS, SECTORS, PRINCIPLES, PROBLEMS, HORIZONS, SIGNALS, OPPS } from "./data.js";
import { kpisForSector } from "./kpis.js";

/* Bosch fit is shown as a word plus a colour, never colour alone. */
const FIT = {
  strong: { label: "Core position", tone: "market" },
  adjacent: { label: "Adjacent", tone: "scenario" },
  none: { label: "No position", tone: "text3" },
};

const TREND_WORD = {
  worsening: "Worsening", improving: "Improving", flat: "Flat",
  "improving-slowly": "Improving slowly", emerging: "Emerging",
};

/* ====================== VIEW: PICTURE OF FUTURE ========================= */
export function PictureOfFuture({ onNav }) {
  const yearsLeft = 2047 - 2026;

  return (
    <div>
      <SectionHead
        kicker="The national agenda"
        title="Picture of Future — Viksit Bharat 2047"
        sub="What India is trying to achieve, stated before anything about us. Every other screen in this application derives from this one: signals are filed against these pillars, opportunities must trace to one of these problem statements, and anything that cannot be traced does not belong on the board."
      />

      {/* hero band */}
      <Panel className="p-5 mb-3" accent={C.nation}>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div style={{ maxWidth: "62ch" }}>
            <div className="flex items-center gap-2 mb-3">
              <Flag size={15} color={C.nation} />
              <span style={{ fontFamily: mono, fontSize: 10.5, color: C.nation, letterSpacing: "0.08em" }}>
                MISSION STATEMENT
              </span>
            </div>
            <p style={{ fontSize: 17, color: C.text, lineHeight: 1.55, fontWeight: 500 }}>
              A developed India by the centenary of independence — a $30–40 trillion economy that
              decarbonises while it grows rather than after it grows.
            </p>
            <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.65, marginTop: 12 }}>
              Two government exercises define the operating detail. The eleven-volume{" "}
              <em>Scenarios Towards Viksit Bharat and Net Zero</em> (NITI Aayog, February 2026) models
              every sector twice — Current Policy and Net Zero — to 2050 and 2070. The{" "}
              <em>DPI@2047</em> roadmap (April 2026) names eight sectoral transformations and the
              digital rails intended to unblock them. Together they are the frame every ministry, PSU
              and financier will now argue inside.
            </p>
          </div>
          <div className="flex flex-col gap-3" style={{ minWidth: 190 }}>
            <div>
              <div style={{ fontSize: 11, color: C.text3 }}>Years to 2047</div>
              <Num size={38} color={C.nation} weight={600}>{yearsLeft}</Num>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.text3 }}>Review gates</div>
              <Num size={14} color={C.text}>2030 · 2035 · 2047</Num>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.text3 }}>Terminal state</div>
              <Num size={14} color={C.text}>Net Zero 2070</Num>
            </div>
          </div>
        </div>
      </Panel>

      {/* strategic pillars */}
      <div style={{ fontSize: 13.5, color: C.text, marginBottom: 10, marginTop: 20 }}>
        Five strategic pillars
      </div>
      <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))" }}>
        {PILLARS.map((p) => (
          <Panel key={p.id} className="p-4" accent={tone(p.tone)}>
            <div className="flex items-center gap-2 mb-2">
              <Num size={10.5} color={C.text3}>{p.id}</Num>
              <Tag color={tone(p.tone)}>{p.focus.split(" · ")[0]}</Tag>
            </div>
            <div style={{ fontSize: 14.5, color: C.text, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: C.text3, marginTop: 5, fontFamily: mono }}>{p.focus}</div>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>{p.aim}</p>
            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
              <div style={{ fontSize: 10.5, color: C.text3, marginBottom: 4 }}>Where we sit against it</div>
              <p style={{ fontSize: 12, color: C.text, lineHeight: 1.55 }}>{p.bosch}</p>
            </div>
          </Panel>
        ))}
      </div>

      {/* prioritised problems */}
      <SectionHead
        kicker="Derived from the pillars"
        title="Problem statements, by priority"
        sub="Ranked by severity of the national problem and by how strongly the evidence base is currently moving — not by how much revenue sits behind them."
      />
      <Stack>
        {[...PROBLEMS].sort((a, b) => (b.severity * 2 + b.signal) - (a.severity * 2 + a.signal)).map((p) => {
          const pil = PILLARS.find((x) => x.id === p.pillar);
          const sec = SECTORS.find((x) => x.id === p.sector);
          return (
            <Collapse
              key={p.id}
              accent={tone(pil?.tone || "text3")}
              title={p.name}
              subtitle={`${sec?.name || ""} · ${p.stat}`}
              right={
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:block">
                    <div style={{ fontSize: 9.5, color: C.text3, marginBottom: 3 }}>Severity</div>
                    <Bars value={p.severity} color={C.risk} label={`Severity ${p.severity} of 5`} />
                  </div>
                  <div className="hidden sm:block">
                    <div style={{ fontSize: 9.5, color: C.text3, marginBottom: 3 }}>Signal</div>
                    <Bars value={p.signal} color={tone(pil?.tone || "text3")} label={`Signal strength ${p.signal} of 5`} />
                  </div>
                  <Tag color={C.text3}>{TREND_WORD[p.trend] || p.trend}</Tag>
                </div>
              }
            >
              <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.65, marginBottom: 12, maxWidth: "80ch" }}>
                {p.body}
              </p>
              <SoWhat color={tone(pil?.tone || "gazette")}>{p.bosch}</SoWhat>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Tag color={C.text3}>{p.id}</Tag>
                {pil && <Tag color={tone(pil.tone)}>{pil.name}</Tag>}
                <Tag color={p.src === "verified" ? C.win : C.text3}>
                  {p.src === "verified" ? "sourced" : "illustrative"}
                </Tag>
              </div>
            </Collapse>
          );
        })}
      </Stack>

      <Panel className="p-5 mt-3">
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 8 }}>How to read this screen</div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "80ch" }}>
          Severity is the scale of the national problem. Signal strength is how much verifiable
          movement there has been in the last two quarters — a severe problem with weak signal is one
          the state has not yet started on, which is early but unpredictable. A severe problem with
          strong signal is where policy is being written now, and that is where influence is cheapest.
          Neither column says anything about our revenue, deliberately.
        </p>
      </Panel>
    </div>
  );
}

/* ==================== VIEW: GOVERNMENT DESIGN PRINCIPLES ================ */
export function DesignPrinciples() {
  return (
    <div>
      <SectionHead
        kicker="How decisions get made"
        title="Government design principles"
        sub="Recurring patterns visible across UPI, ONDC, AgriStack and the Unified Energy Interface. These are not our observations about good design — they are the criteria proposals are actually judged against, which makes them worth designing to rather than merely noting."
      />

      <Stack>
        {PRINCIPLES.map((d, i) => (
          <div key={d.id} className="px-5 py-4" style={{ background: C.panel }}>
            <div className="flex items-start gap-4 flex-wrap">
              <Num size={22} color={C.text3} weight={600}>{String(i + 1).padStart(2, "0")}</Num>
              <div className="flex-1" style={{ minWidth: 280 }}>
                <div style={{ fontSize: 15, color: C.text, fontWeight: 600 }}>{d.name}</div>
                <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.65, marginTop: 6, maxWidth: "78ch" }}>
                  {d.statement}
                </p>
                <div className="flex items-start gap-2 mt-3">
                  <Landmark size={12} color={C.text3} style={{ marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: C.text3, lineHeight: 1.55, maxWidth: "78ch" }}>
                    {d.evidence}
                  </p>
                </div>
                <div className="mt-3" style={{ maxWidth: "78ch" }}>
                  <SoWhat label="What this asks of us" color={C.gazette} dense>{d.test}</SoWhat>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Stack>

      <Panel className="p-5 mt-3" accent={C.scenario}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} color={C.scenario} />
          <div style={{ fontSize: 13.5, color: C.text }}>The one principle to track above the others</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "82ch" }}>
          Evolvability. The state has now re-used the same protocol family four times — payments
          became commerce (ONDC), commerce became mobility, and mobility became electrons (the
          Unified Energy Interface). Each re-use was predictable from the previous one roughly a year
          before it was announced. Watching which rail is being extended next is the earliest and
          cheapest market signal available anywhere in this application, and it costs nothing but
          attention.
        </p>
      </Panel>
    </div>
  );
}

/* ====================== VIEW: NATIONAL PRIORITY SECTORS ================= */
export function PrioritySectors({ onOpenSector }) {
  const [fit, setFit] = useState("all");
  const rows = SECTORS.filter((s) => fit === "all" || s.boschFit === fit);

  const counts = (id) => ({
    signals: SIGNALS.filter((s) => s.sector === id).length,
    opps: OPPS.filter((o) => o.sector === id).length,
  });

  return (
    <div>
      <SectionHead
        kicker="Where the state is spending attention"
        title="National priority sectors"
        sub="The eight sectoral transformations named in the DPI@2047 roadmap. Two of them carry no Bosch position at all and are shown anyway — a sector list containing only sectors we already serve is a sales plan, not a national view, and it hides where the state is actually spending."
        right={
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["all", "All"], ["strong", "Core"], ["adjacent", "Adjacent"], ["none", "No position"]].map(([k, l]) => (
              <button key={k} onClick={() => setFit(k)} className="px-3 py-2"
                style={{
                  fontSize: 12, cursor: "pointer",
                  background: fit === k ? C.panel2 : "transparent",
                  color: fit === k ? C.text : C.text2,
                }}>
                {l}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
        {rows.map((s) => {
          const f = FIT[s.boschFit];
          const c = counts(s.id);
          const pil = PILLARS.find((x) => x.id === s.pillar);
          return (
            <Panel key={s.id} className="p-4" accent={tone(f.tone)}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div style={{ minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Num size={10.5} color={C.text3}>{s.id}</Num>
                    <Tag color={tone(f.tone)}>{f.label}</Tag>
                    {pil && <Tag color={tone(pil.tone)}>{pil.name.split(" ")[0]}</Tag>}
                  </div>
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 600, lineHeight: 1.3 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.text3, marginTop: 3 }}>{s.ministry}</div>
                </div>
              </div>

              <Field label="The bottleneck" style={{ marginTop: 12 }}>
                <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{s.problem}</p>
              </Field>

              <Field label="Intended state by 2047" style={{ marginTop: 12 }}>
                <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{s.outcome2047}</p>
              </Field>

              <div className="flex gap-4 mt-3 flex-wrap">
                <div>
                  <div style={{ fontSize: 10.5, color: C.text3 }}>Digital rail</div>
                  <div style={{ fontSize: 11.5, color: C.text, fontFamily: mono, marginTop: 2 }}>{s.rail}</div>
                </div>
              </div>

              {s.metric !== "—" && (
                <div className="mt-3 px-3 py-2 rounded" style={{ background: C.panel2 }}>
                  <Num size={13} color={tone(f.tone)}>{s.metric}</Num>
                  {s.metricAsOf && (
                    <span style={{ fontSize: 10.5, color: C.text3, marginLeft: 8 }}>as of {s.metricAsOf}</span>
                  )}
                  <div style={{ fontSize: 11, color: C.text3, marginTop: 3 }}>{s.metric2}</div>
                </div>
              )}

              {/* how this sector is measured */}
              {kpisForSector(s.id).length > 0 && (
                <div className="mt-3">
                  <div style={{ fontSize: 11, color: C.text3, marginBottom: 6 }}>
                    Measured by
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {kpisForSector(s.id).slice(0, 4).map((k) => (
                      <div key={k.id} className="flex items-baseline justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5" style={{ minWidth: 0 }}>
                          <span style={{
                            width: 5, height: 5, borderRadius: 1, flexShrink: 0,
                            background: k.type === "leading" ? C.scenario : C.text3,
                            display: "inline-block",
                          }} />
                          <span style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.35 }}>{k.name}</span>
                        </span>
                        <Num size={10.5} color={C.text3}>{k.now} → {k.target}</Num>
                      </div>
                    ))}
                    {kpisForSector(s.id).length > 4 && (
                      <span style={{ fontSize: 10.5, color: C.text3 }}>
                        +{kpisForSector(s.id).length - 4} more in the KPI cockpit
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3">
                <SoWhat color={tone(f.tone)} dense>{s.soWhat}</SoWhat>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-3 flex-wrap" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
                <span style={{ fontSize: 11, color: C.text3 }}>
                  <Num size={11} color={C.text2}>{c.signals}</Num> signals
                </span>
                <span style={{ fontSize: 11, color: C.text3 }}>
                  <Num size={11} color={C.text2}>{c.opps}</Num> opportunities
                </span>
                <span style={{ fontSize: 11, color: C.text3 }}>
                  <Num size={11} color={C.text2}>{kpisForSector(s.id).length}</Num> KPIs
                </span>
                {onOpenSector && (
                  <button
                    onClick={() => onOpenSector(s.id)}
                    className="ml-auto inline-flex items-center gap-1"
                    style={{ fontSize: 11.5, color: tone(f.tone), cursor: "pointer", background: "transparent" }}
                  >
                    Filter the board <ArrowRight size={11} />
                  </button>
                )}
              </div>
            </Panel>
          );
        })}
      </div>
      {rows.length === 0 && <Empty>No sectors match this filter.</Empty>}

      <Panel className="p-5 mt-3" accent={C.risk}>
        <div className="flex items-center gap-2 mb-3">
          <CircleAlert size={14} color={C.risk} />
          <div style={{ fontSize: 13.5, color: C.text }}>The uncomfortable column</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "82ch" }}>
          Health and benefit delivery carry no Bosch position and are unlikely to acquire one. They
          are retained because they are where the state has repeatedly learned its most transferable
          lessons — identity plus a payment rail beats a scheme-specific application form — and those
          lessons keep arriving in our sectors eighteen months later. Deleting the rows we cannot
          monetise would remove exactly the early warning the board exists to provide.
        </p>
      </Panel>
    </div>
  );
}
