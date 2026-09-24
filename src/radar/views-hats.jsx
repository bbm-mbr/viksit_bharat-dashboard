import React, { useState } from "react";
import {
  Database, Sun, Shield, Heart, Sprout, GitMerge, MessagesSquare, CircleHelp,
} from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Stack } from "./ui.jsx";
import { HATS, DEBATES, STANCES } from "./hats.js";

const ICONS = { database: Database, sun: Sun, shield: Shield, heart: Heart, sprout: Sprout, gitmerge: GitMerge };

export function SixHats() {
  const [sel, setSel] = useState(DEBATES[0].id);
  const debate = DEBATES.find((d) => d.id === sel);
  const hatOf = (id) => HATS.find((h) => h.id === id);

  return (
    <div>
      <SectionHead
        kicker="Structured disagreement"
        title="Six-hat debate"
        sub="De Bono's method used as an agent architecture. Each hat has a narrow remit and a declared bias; the blue hat consolidates without averaging. Where the hats disagree and the evidence does not settle it, the disagreement is the output."
      />

      {/* the hats */}
      <div className="grid gap-2 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))" }}>
        {HATS.map((h) => {
          const Icon = ICONS[h.icon] || CircleHelp;
          return (
            <Panel key={h.id} className="p-3.5" accent={tone(h.tone)}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} color={tone(h.tone)} />
                <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{h.name}</span>
              </div>
              <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.5 }}>{h.remit}</p>
              <div className="mt-2.5 pt-2.5" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
                <div style={{ fontFamily: mono, fontSize: 9, color: C.text3, marginBottom: 3 }}>DECLARED BIAS</div>
                <p style={{ fontSize: 11, color: C.text3, lineHeight: 1.45 }}>{h.bias}</p>
              </div>
            </Panel>
          );
        })}
      </div>

      {/* debate selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {DEBATES.map((d) => (
          <button key={d.id} onClick={() => setSel(d.id)} className="px-3.5 py-2.5 rounded text-left"
            style={{
              fontSize: 12.5, cursor: "pointer", maxWidth: 400,
              background: sel === d.id ? C.panel2 : "transparent",
              color: sel === d.id ? C.text : C.text2,
              border: `1px solid ${sel === d.id ? C.scenario : C.ruleSoft}`,
            }}>
            {d.topic}
          </button>
        ))}
      </div>

      <Panel className="p-5" accent={C.scenario}>
        <div className="flex items-center gap-2 mb-2">
          <MessagesSquare size={14} color={C.scenario} />
          <Num size={10.5} color={C.text3}>{debate.id}</Num>
          {debate.ref && <Tag color={C.text3}>{debate.ref}</Tag>}
        </div>
        <h3 style={{ fontSize: 18, color: C.text, fontWeight: 600, lineHeight: 1.3, maxWidth: "56ch" }}>
          {debate.topic}
        </h3>
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, marginTop: 8, maxWidth: "84ch" }}>
          {debate.context}
        </p>

        <div className="mt-5" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {debate.rounds.map((r) => {
            const h = hatOf(r.hat);
            const Icon = ICONS[h.icon] || CircleHelp;
            const col = tone(h.tone);
            return (
              <div key={r.hat} className="flex gap-3">
                <div className="flex items-center justify-center rounded flex-shrink-0"
                  style={{ width: 28, height: 28, background: C.panel2, border: `1px solid ${col}` }}>
                  <Icon size={14} color={col} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: col, letterSpacing: "0.06em", marginBottom: 4 }}>
                    {h.name.toUpperCase()}
                  </div>
                  <p style={{ fontSize: 13, color: r.hat === "blue" ? C.text : C.text2, lineHeight: 1.65, maxWidth: "84ch" }}>
                    {r.says}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}>
            <div className="px-4 py-3 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.win}` }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.win, marginBottom: 4 }}>VERDICT</div>
              <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6 }}>{debate.verdict}</p>
            </div>
            <div className="px-4 py-3 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.risk}` }}>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.risk, marginBottom: 4 }}>LEFT OPEN</div>
              <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{debate.open}</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* stances */}
      <SectionHead
        kicker="Three readings of the same evidence"
        title="Optimistic, policy-driven, pessimistic"
        sub="The board's default is the policy-driven case, because that is what the documents describe. It is not the only defensible reading, and saying so explicitly is cheaper than discovering it later."
      />
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {STANCES.map((s) => (
          <Panel key={s.id} className="p-4" accent={tone(s.tone)}>
            <div className="flex items-center gap-2 mb-2">
              <Tag color={tone(s.tone)} solid>{s.name}</Tag>
            </div>
            <p style={{ fontSize: 12.5, color: C.text, lineHeight: 1.6, marginTop: 8 }}>{s.premise}</p>
            <Field label="Assumes" style={{ marginTop: 14 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {s.assumes.map((a) => (
                  <div key={a} className="flex items-start gap-2">
                    <span style={{ width: 4, height: 4, borderRadius: 1, background: tone(s.tone), marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.45 }}>{a}</span>
                  </div>
                ))}
              </div>
            </Field>
            <Field label="Implies" style={{ marginTop: 14 }}>
              <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.55 }}>{s.implies}</p>
            </Field>
            <div className="mt-3">
              <SoWhat label="What would confirm it" color={tone(s.tone)} dense>{s.watch}</SoWhat>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
