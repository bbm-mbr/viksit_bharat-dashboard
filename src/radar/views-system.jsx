import React, { useState } from "react";
import {
  MessageSquare, Send, CircleDot, ArrowRight, Bot, GitMerge, Database,
} from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Stack, Empty } from "./ui.jsx";
import { CHAT, AGENTS, SOURCES, SIGNALS, OPPS, PROBLEMS, FORECAST_LEDGER, TRAJECTORY } from "./data.js";

/* ========================== VIEW: ASK THE RADAR ========================= */
/* Scripted, not generative. The production version would retrieve from the
   knowledge base behind this board; the demo answers a fixed question set so
   the shape of a good answer is reviewable. */
export function AskRadar() {
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState("");

  const ask = (q) => {
    const hit = CHAT.find((c) => c.q === q)
      || CHAT.find((c) => q.length > 3 && c.q.toLowerCase().includes(q.toLowerCase().slice(0, 12)));
    setThread((t) => [...t, {
      q,
      a: hit ? hit.a : "Not in the scripted demo set. In production this routes to the retrieval layer over the signal, policy and scenario corpus and answers with citations. Try one of the suggested questions to see the intended answer shape.",
      refs: hit ? hit.refs : [],
    }]);
    setDraft("");
  };

  const refLabel = (id) => {
    const s = SIGNALS.find((x) => x.id === id); if (s) return s.title;
    const o = OPPS.find((x) => x.id === id); if (o) return o.name;
    const p = PROBLEMS.find((x) => x.id === id); if (p) return p.name;
    const f = FORECAST_LEDGER.find((x) => x.id === id); if (f) return f.indicator;
    const t = TRAJECTORY.find((x) => x.id === id); if (t) return t.name;
    return id;
  };

  return (
    <div>
      <SectionHead
        kicker="Natural language over the corpus"
        title="Ask the radar"
        sub="Every answer cites the records it drew from, so a claim can be checked rather than trusted. The demo below answers a fixed question set — the point is to review the shape of an answer, not to test the retrieval."
      />

      <div className="grid gap-3" style={{ gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)" }}>
        <Panel className="p-0" style={{ display: "flex", flexDirection: "column", minHeight: 460 }}>
          <div className="flex-1 p-5" style={{ display: "flex", flexDirection: "column", gap: 18, overflowY: "auto" }}>
            {thread.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ minHeight: 300 }}>
                <MessageSquare size={26} color={C.text3} />
                <p style={{ fontSize: 13, color: C.text2, marginTop: 12, maxWidth: "44ch", lineHeight: 1.6 }}>
                  Ask a question about the national agenda, a policy, a scenario or an opportunity.
                  Pick one from the panel on the right to see the intended answer shape.
                </p>
              </div>
            )}
            {thread.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="self-end px-4 py-2.5 rounded" style={{ background: C.panel2, maxWidth: "80%" }}>
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{m.q}</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center rounded flex-shrink-0"
                    style={{ width: 26, height: 26, background: C.gazette }}>
                    <Bot size={14} color={C.onAccent} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{m.a}</p>
                    {m.refs.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap mt-3">
                        {m.refs.map((r) => (
                          <Tag key={r} color={C.text3} title={refLabel(r)}>{r}</Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 flex gap-2" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) ask(draft.trim()); }}
              placeholder="Ask about a policy, scenario or opportunity"
              className="flex-1 px-3 py-2.5 rounded bg-transparent outline-none"
              style={{ color: C.text, fontSize: 13, border: `1px solid ${C.rule}` }}
            />
            <button onClick={() => draft.trim() && ask(draft.trim())}
              className="px-4 py-2.5 rounded inline-flex items-center gap-2"
              style={{ background: C.gazette, color: C.onAccent, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              Ask <Send size={13} />
            </button>
          </div>
        </Panel>

        <Panel className="p-4" style={{ alignSelf: "start" }}>
          <div style={{ fontSize: 13, color: C.text, marginBottom: 4 }}>Suggested questions</div>
          <div style={{ fontSize: 11.5, color: C.text3, marginBottom: 14 }}>
            These have scripted answers in the demo set.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CHAT.map((c) => (
              <button key={c.q} onClick={() => ask(c.q)}
                className="text-left px-3 py-2.5 rounded"
                style={{ background: C.panel2, cursor: "pointer", border: `1px solid ${C.ruleSoft}` }}>
                <span style={{ fontSize: 12.5, color: C.text, lineHeight: 1.45 }}>{c.q}</span>
              </button>
            ))}
          </div>
          {thread.length > 0 && (
            <button onClick={() => setThread([])} className="mt-4 px-3 py-2 rounded w-full"
              style={{ border: `1px solid ${C.rule}`, color: C.text2, fontSize: 12, cursor: "pointer", background: "transparent" }}>
              Clear thread
            </button>
          )}
        </Panel>
      </div>
    </div>
  );
}

/* ==================== VIEW: SOURCES & COLLECTIVE INTELLIGENCE =========== */
export function SourcesMethod() {
  return (
    <div>
      <SectionHead
        kicker="How a document becomes a decision"
        title="Sources & method"
        sub="What the platform ingests, how the pipeline turns a raw document into a scored signal, and the multi-agent structure intended to keep a single viewpoint from dominating the synthesis."
      />

      {/* collective intelligence */}
      <Panel className="p-5 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <GitMerge size={15} color={C.scenario} />
          <div style={{ fontSize: 13.5, color: C.text }}>Collective intelligence architecture</div>
        </div>
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.65, marginBottom: 16, maxWidth: "86ch" }}>
          A single extraction pass over policy documents produces a confident, uniform and frequently
          wrong view. The intended design runs several agents with deliberately different biases,
          makes them argue, and preserves the disagreement where it is unresolved rather than
          averaging it into a consensus that nobody actually holds. Each agent's bias is declared,
          because an undeclared bias is indistinguishable from an assumption.
        </p>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>
          {AGENTS.map((a) => (
            <div key={a.name} className="px-4 py-3.5 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${tone(a.tone)}` }}>
              <div className="flex items-center gap-2 mb-2">
                <CircleDot size={11} color={tone(a.tone)} />
                <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{a.name}</span>
              </div>
              <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{a.role}</p>
              <div className="mt-2.5 pt-2.5" style={{ borderTop: `1px solid ${C.rule}` }}>
                <div style={{ fontSize: 10, color: C.text3, fontFamily: mono, marginBottom: 3 }}>DECLARED BIAS</div>
                <p style={{ fontSize: 11.5, color: C.text3, lineHeight: 1.5 }}>{a.bias}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* pipeline */}
      <Panel className="p-5 mb-3">
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 16 }}>From document to decision</div>
        <div className="flex items-stretch flex-wrap" style={{ gap: 0 }}>
          {[
            ["Ingest", "Crawlers and RSS on gazette, ministry and regulator endpoints. PDFs parsed with layout retained."],
            ["Classify", "Instrument type, issuing body, sector, lifecycle stage — draft, consultation, notified, in force, lapsed."],
            ["Link", "Resolve amendments to parents at segment granularity, so a scheme's history reads as one thread rather than ten alerts."],
            ["Score", "Impact against the order book, confidence in the source, horizon placement, pillar and sector."],
            ["Debate", "Agents argue the finding. The contrarian is required to fill the risk-of-action column."],
            ["Route", "To the division that owns the consequence, with a proposed move and a 'so what' attached."],
          ].map(([t, d], i, a) => (
            <div key={t} className="flex-1 px-4 py-3" style={{ minWidth: 168, borderLeft: i === 0 ? "none" : `1px solid ${C.ruleSoft}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontFamily: mono, fontSize: 11, color: C.gazette }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: C.text }}>{t}</span>
                {i < a.length - 1 && <ArrowRight size={12} color={C.text3} style={{ marginLeft: "auto" }} />}
              </div>
              <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4" style={{ maxWidth: "86ch" }}>
          <SoWhat label="Where the last version failed" color={C.risk} dense>
            The PM E-DRIVE two-wheeler error entered through step three. Trade press reported a
            blanket two-year extension; the amendment actually applied to some segments and not
            others. Amendment resolution has to run at segment granularity or the pipeline will keep
            producing confident, wrong forecasts from correct source documents.
          </SoWhat>
        </div>
      </Panel>

      {/* sources */}
      <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        {SOURCES.map((s) => (
          <Panel key={s.g} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={13} color={C.text3} />
              <div style={{ fontSize: 13, color: C.text }}>{s.g}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {s.items.map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <CircleDot size={10} color={C.text3} style={{ marginTop: 3.5, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: C.text2, lineHeight: 1.45 }}>{i}</span>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="p-5" accent={C.risk}>
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 8 }}>Provenance and its limits</div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          Records on this board are tagged <em>sourced</em> or <em>illustrative</em>. Sourced records
          were checked against a primary or major secondary source. Illustrative records are plausible
          mock content retained so the structure can be reviewed, and they must not be carried into a
          plan without verification. That distinction is shown on the record rather than kept in a
          footnote, because in the last cycle an unverified number reached a forecast.
        </p>
      </Panel>
    </div>
  );
}
