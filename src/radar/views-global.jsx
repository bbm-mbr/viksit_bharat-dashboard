import React, { useState } from "react";
import { Globe, TrendingUp, TrendingDown, ArrowDown, Link2, AlertTriangle } from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Bars, Stack, Empty } from "./ui.jsx";
import { FORCES, CHAINS, GEOGRAPHIES } from "./global.js";
import { KPIS } from "./kpis.js";

export function GlobalLens() {
  const [geo, setGeo] = useState("all");
  const [type, setType] = useState("all");
  const rows = FORCES.filter((f) =>
    (geo === "all" || f.geo === geo) && (type === "all" || f.type === type));

  const kpiName = (id) => KPIS.find((k) => k.id === id)?.name || id;

  return (
    <div>
      <SectionHead
        kicker="How the world looks at India"
        title="Global tailwinds & headwinds"
        sub="The rest of the board is India looking at India. This screen measures the same aspirations against external conditions India does not control — tariffs, mineral access, carbon borders and energy prices. Each force names the national indicators it reaches."
        right={
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["all", "Both"], ["tailwind", "Tailwinds"], ["headwind", "Headwinds"]].map(([k, l]) => (
              <button key={k} onClick={() => setType(k)} className="px-3.5 py-2"
                style={{
                  fontSize: 12, cursor: "pointer",
                  background: type === k ? C.panel2 : "transparent",
                  color: type === k ? C.text : C.text2,
                }}>{l}</button>
            ))}
          </div>
        }
      />

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <span style={{ fontSize: 11, color: C.text3, fontFamily: mono }}>ORIGIN</span>
        <button onClick={() => setGeo("all")} className="px-2.5 py-1.5 rounded"
          style={{
            fontSize: 11.5, cursor: "pointer",
            background: geo === "all" ? C.panel2 : "transparent",
            color: geo === "all" ? C.text : C.text3,
            border: `1px solid ${geo === "all" ? C.rule : C.ruleSoft}`,
          }}>All</button>
        {GEOGRAPHIES.map((g) => (
          <button key={g.id} onClick={() => setGeo(g.id)} className="px-2.5 py-1.5 rounded"
            style={{
              fontSize: 11.5, cursor: "pointer",
              background: geo === g.id ? C.panel2 : "transparent",
              color: geo === g.id ? C.text : C.text3,
              border: `1px solid ${geo === g.id ? tone(g.tone) : C.ruleSoft}`,
            }}>{g.name}</button>
        ))}
        <div className="flex-1" />
        <span style={{ fontFamily: mono, fontSize: 11, color: C.text3 }}>{rows.length} forces</span>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
        {rows.map((f) => {
          const g = GEOGRAPHIES.find((x) => x.id === f.geo);
          const up = f.type === "tailwind";
          const col = up ? C.win : C.risk;
          const Icon = up ? TrendingUp : TrendingDown;
          return (
            <Panel key={f.id} className="p-4" accent={col}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5" style={{ fontSize: 11, color: col }}>
                  <Icon size={12} /> {up ? "Tailwind" : "Headwind"}
                </span>
                <Tag color={tone(g?.tone || "text3")}>{g?.name}</Tag>
                <Tag color={f.src === "verified" ? C.win : C.text3}>{f.src}</Tag>
                <div className="flex-1" />
                <Num size={9.5} color={C.text3}>{f.id}</Num>
              </div>

              <div style={{ fontSize: 14.5, color: C.text, fontWeight: 600, lineHeight: 1.3 }}>{f.name}</div>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span style={{ fontSize: 11, color: C.text3 }}>{f.date}</span>
                <span style={{ fontSize: 11, color: C.text2 }}>{f.status}</span>
                <div className="flex-1" />
                <div>
                  <div style={{ fontSize: 9, color: C.text3, marginBottom: 2 }}>Magnitude</div>
                  <Bars value={f.magnitude} color={col} label={`Magnitude ${f.magnitude} of 5`} />
                </div>
              </div>

              <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, marginTop: 12 }}>{f.body}</p>

              <div className="mt-3">
                <SoWhat color={col} dense>{f.soWhat}</SoWhat>
              </div>

              {f.affects?.length > 0 && (
                <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Link2 size={10} color={C.text3} />
                    <span style={{ fontSize: 10, color: C.text3, fontFamily: mono }}>REACHES</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {f.affects.map((a) => <Tag key={a} color={C.text2} title={kpiName(a)}>{kpiName(a)}</Tag>)}
                  </div>
                </div>
              )}
            </Panel>
          );
        })}
      </div>
      {rows.length === 0 && <Empty>No forces match this filter.</Empty>}

      <Panel className="p-5 mt-3" accent={C.risk}>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={14} color={C.risk} />
          <div style={{ fontSize: 13.5, color: C.text }}>Read the pair, not the number</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          GF-01 and GF-02 are the same transaction. Tariffs on Indian goods fell from 50% to 18%, and
          the consideration included halting Russian crude purchases during a period when Brent sat
          above $100. A board reporting only the tariff line would have called February an unambiguous
          win. The next screen traces that chain to the growth target — it is the clearest argument on
          this application for why isolated indicators mislead.
        </p>
      </Panel>
    </div>
  );
}

/* ====================== VIEW: CONNECT THE DOTS ========================== */
export function ConnectDots() {
  const [sel, setSel] = useState(CHAINS[0].id);
  const chain = CHAINS.find((c) => c.id === sel);
  const col = tone(chain.tone);

  return (
    <div>
      <SectionHead
        kicker="From a number to a decision"
        title="Connect the dots"
        sub="A figure on its own persuades nobody. These are transmission chains: each step names what moves next, and the last step lands on a national target so the argument terminates somewhere decidable."
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {CHAINS.map((c) => (
          <button key={c.id} onClick={() => setSel(c.id)} className="px-3.5 py-2.5 rounded text-left"
            style={{
              fontSize: 12.5, cursor: "pointer", maxWidth: 340,
              background: sel === c.id ? C.panel2 : "transparent",
              color: sel === c.id ? C.text : C.text2,
              border: `1px solid ${sel === c.id ? tone(c.tone) : C.ruleSoft}`,
            }}>
            {c.name}
          </button>
        ))}
      </div>

      <Panel className="p-5" accent={col}>
        <div style={{ fontSize: 17, color: C.text, fontWeight: 600, lineHeight: 1.35, maxWidth: "62ch" }}>
          {chain.headline}
        </div>

        <div className="mt-5" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {chain.steps.map((s, i) => (
            <div key={s.t}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center" style={{ minWidth: 30, flexShrink: 0 }}>
                  <div className="flex items-center justify-center rounded"
                    style={{ width: 26, height: 26, background: i === chain.steps.length - 1 ? col : C.panel2, border: `1px solid ${col}` }}>
                    <Num size={11} color={i === chain.steps.length - 1 ? C.onAccent : col} weight={600}>{i + 1}</Num>
                  </div>
                </div>
                <div className="flex-1 pb-4" style={{ minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span style={{ fontFamily: mono, fontSize: 9.5, color: col, letterSpacing: "0.08em" }}>
                      {s.k.toUpperCase()}
                    </span>
                    {s.ref && <Tag color={C.text3}>{s.ref}</Tag>}
                  </div>
                  <div style={{ fontSize: 14, color: C.text, fontWeight: 500, lineHeight: 1.35 }}>{s.t}</div>
                  <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55, marginTop: 4, maxWidth: "72ch" }}>{s.d}</p>
                </div>
              </div>
              {i < chain.steps.length - 1 && (
                <div style={{ marginLeft: 12, marginTop: -12, marginBottom: 4 }}>
                  <ArrowDown size={14} color={C.text3} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2" style={{ maxWidth: "86ch" }}>
          <SoWhat color={col}>{chain.soWhat}</SoWhat>
        </div>
      </Panel>

      <Panel className="p-5 mt-3">
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 8 }}>Why this format</div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          The test of a chain is that a sceptic can attack exactly one link rather than dismiss the
          whole argument. Every step is separately checkable and separately wrong-able. That is the
          difference between an insight and an assertion — and it is also what makes the chain usable
          in a room where not everyone accepts the premise.
        </p>
      </Panel>
    </div>
  );
}
