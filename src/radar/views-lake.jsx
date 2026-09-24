import React, { useState } from "react";
import {
  Database, Globe2, Filter, RefreshCw, Share2, CheckCircle2, XCircle,
  AlertTriangle, ArrowRight, Zap,
} from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Stack, Collapse, Empty } from "./ui.jsx";
import { SOURCE_CLASSES, PIPELINE, GUARDRAILS, SUSTAINABILITY, INITIATIVES } from "./datalake.js";

export function DataLake() {
  const [tab, setTab] = useState("sources");
  const TABS = [
    ["sources", "Web sources", SOURCE_CLASSES.length, Globe2],
    ["pipeline", "Pipeline", PIPELINE.length, ArrowRight],
    ["guardrails", "Guardrails", GUARDRAILS.admit.length + GUARDRAILS.reject.length, Filter],
    ["run", "Keeping it alive", SUSTAINABILITY.length, RefreshCw],
    ["flow", "Where it goes", INITIATIVES.length, Share2],
  ];

  return (
    <div>
      <SectionHead
        kicker="Data lake first"
        title="The layer beneath the dashboard"
        sub="Agreed in review: build and validate the lake, prove the quality, then revisit dashboard structure. A dashboard cannot be more trustworthy than the corpus under it, so this screen is about what enters — and what is refused."
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map(([k, l, n, Icon]) => (
          <button key={k} onClick={() => setTab(k)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded"
            style={{
              fontSize: 12.5, cursor: "pointer",
              background: tab === k ? C.panel2 : "transparent",
              color: tab === k ? C.text : C.text2,
              border: `1px solid ${tab === k ? C.rule : C.ruleSoft}`,
            }}>
            <Icon size={14} color={tab === k ? C.gazette : C.text3} />
            {l} <Num size={11} color={C.text3}>{n}</Num>
          </button>
        ))}
      </div>

      {/* ---------------- web sources ---------------- */}
      {tab === "sources" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.scenario}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
              Ten classes, ordered by signal quality rather than volume. Priority 1 classes are crawled
              daily and may feed forecasts. Priority 3 — news — is the fastest and least reliable, and
              is quarantined from anything that touches a number.
            </p>
          </Panel>
          <Stack>
            {SOURCE_CLASSES.map((s) => (
              <Collapse key={s.id} accent={tone(s.tone)}
                title={s.name}
                subtitle={`${s.cadence} · ${s.volume} · priority ${s.priority}`}
                right={
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {s.highlight && <Zap size={12} color={C.gazette} />}
                    <Tag color={s.priority === 1 ? C.win : s.priority === 3 ? C.risk : C.text3}>
                      P{s.priority}
                    </Tag>
                  </div>
                }>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 12, maxWidth: "82ch" }}>
                  {s.what}
                </p>
                <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
                  <Field label="Web endpoints">
                    <div className="flex gap-1 flex-wrap">
                      {s.web.map((w) => <Tag key={w} color={C.text2}>{w}</Tag>)}
                    </div>
                  </Field>
                  <Field label="Format">
                    <span style={{ fontSize: 12.5, color: C.text2 }}>{s.format}</span>
                  </Field>
                </div>
                <Field label="Extraction">
                  <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55, maxWidth: "82ch" }}>{s.extraction}</p>
                </Field>
                <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                  <div className="px-3 py-2.5 rounded" style={{ background: C.panel2 }}>
                    <div style={{ fontSize: 10, color: C.text3, fontFamily: mono, marginBottom: 3 }}>QUALITY</div>
                    <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>{s.quality}</p>
                  </div>
                  <div className="px-3 py-2.5 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.risk}` }}>
                    <div style={{ fontSize: 10, color: C.risk, fontFamily: mono, marginBottom: 3 }}>FAILURE MODE</div>
                    <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>{s.risk}</p>
                  </div>
                </div>
                {s.highlight && (
                  <div className="mt-3" style={{ maxWidth: "82ch" }}>
                    <SoWhat label="Why this class matters" color={tone(s.tone)} dense>{s.highlight}</SoWhat>
                  </div>
                )}
              </Collapse>
            ))}
          </Stack>
        </>
      )}

      {/* ---------------- pipeline ---------------- */}
      {tab === "pipeline" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.gazette}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
              Eight stages, each with one guardrail that can block progression. The guardrails are the
              point — a pipeline without them is a funnel that concentrates whatever entered it.
            </p>
          </Panel>
          <Stack>
            {PIPELINE.map((p) => (
              <div key={p.n} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${tone(p.tone)}` }}>
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="flex items-center justify-center rounded flex-shrink-0"
                    style={{ width: 28, height: 28, background: C.panel2, border: `1px solid ${tone(p.tone)}` }}>
                    <Num size={12} color={tone(p.tone)} weight={600}>{p.n}</Num>
                  </div>
                  <div className="flex-1" style={{ minWidth: 260 }}>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span style={{ fontSize: 14.5, color: C.text, fontWeight: 600 }}>{p.stage}</span>
                      <Tag color={C.text3}>{p.automation}</Tag>
                    </div>
                    <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "80ch" }}>{p.what}</p>
                    <div className="mt-3" style={{ maxWidth: "80ch" }}>
                      <SoWhat label="Guardrail" color={p.n === 4 || p.n === 5 ? C.risk : tone(p.tone)} dense>
                        {p.guardrail}
                      </SoWhat>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
        </>
      )}

      {/* ---------------- guardrails ---------------- */}
      {tab === "guardrails" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.risk}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
              The review asked what gets included, what gets filtered, and which logic drives
              opportunity generation. This is that logic, written down so it can be argued with rather
              than applied silently.
            </p>
          </Panel>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))" }}>
            <Panel className="p-4" accent={C.win}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={15} color={C.win} />
                <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>Admitted — all must hold</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {GUARDRAILS.admit.map((g, i) => (
                  <div key={g.rule}>
                    <div className="flex items-baseline gap-2">
                      <Num size={10.5} color={C.win}>{String(i + 1).padStart(2, "0")}</Num>
                      <span style={{ fontSize: 13, color: C.text, fontWeight: 500, lineHeight: 1.35 }}>{g.rule}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: C.text3, lineHeight: 1.5, marginTop: 4, paddingLeft: 22 }}>{g.why}</p>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel className="p-4" accent={C.risk}>
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={15} color={C.risk} />
                <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>Refused — any one blocks</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {GUARDRAILS.reject.map((g, i) => (
                  <div key={g.rule}>
                    <div className="flex items-baseline gap-2">
                      <Num size={10.5} color={C.risk}>{String(i + 1).padStart(2, "0")}</Num>
                      <span style={{ fontSize: 13, color: C.text, fontWeight: 500, lineHeight: 1.35 }}>{g.rule}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: C.text3, lineHeight: 1.5, marginTop: 4, paddingLeft: 22 }}>{g.why}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </>
      )}

      {/* ---------------- sustainability ---------------- */}
      {tab === "run" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.risk}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
              The board may be used for years while the team that built it rotates away. Everything
              here is about removing manual effort from the critical path — no jugaad.
            </p>
          </Panel>
          <Stack>
            {SUSTAINABILITY.map((s) => (
              <div key={s.id} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${tone(s.tone)}` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500, minWidth: 200 }}>{s.name}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ fontFamily: mono, fontSize: 11.5, color: C.text3 }}>{s.now}</span>
                    <ArrowRight size={12} color={C.text3} />
                    <span style={{ fontFamily: mono, fontSize: 11.5, color: tone(s.tone) }}>{s.target}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "82ch" }}>{s.detail}</p>
                <div className="mt-3 flex items-start gap-2">
                  <AlertTriangle size={12} color={C.risk} style={{ marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: C.text3, lineHeight: 1.5, maxWidth: "80ch" }}>{s.risk}</p>
                </div>
              </div>
            ))}
          </Stack>
        </>
      )}

      {/* ---------------- initiatives ---------------- */}
      {tab === "flow" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.market}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
              This board is not standalone. It consumes from and feeds into other assets — and the
              arrows run both ways, which is what makes it an intelligence layer rather than a report.
            </p>
          </Panel>
          <Stack>
            {INITIATIVES.map((i) => (
              <div key={i.id} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${tone(i.tone)}` }}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span style={{ fontSize: 14.5, color: C.text, fontWeight: 600 }}>{i.name}</span>
                  <Tag color={i.direction === "both" ? C.market : C.text3}>
                    {i.direction === "both" ? "two-way" : "outbound"}
                  </Tag>
                  <Tag color={i.status.startsWith("Live") ? C.win : C.text3}>{i.status}</Tag>
                </div>
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
                  <Field label="This board gives">
                    <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>{i.gives}</p>
                  </Field>
                  <Field label="This board gets">
                    <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>{i.gets}</p>
                  </Field>
                </div>
              </div>
            ))}
          </Stack>
        </>
      )}
    </div>
  );
}
