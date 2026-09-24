import React, { useState, useMemo } from "react";
import { Search, AlertTriangle, FlaskConical, Landmark, Coins } from "lucide-react";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Bars, Stack, Collapse, Empty } from "./ui.jsx";
import { MINISTRY_PROBLEMS, BUCKETS, MINISTRIES } from "./workbook.js";
import { THESIS, THESIS_TRACKS, THESIS_SECTIONS } from "./thesis.js";

const BAND_TONE = (b) =>
  b.startsWith("High") ? "risk" : b.startsWith("System") ? "gazette" : "text3";

/* ================= VIEW: MINISTRY PROBLEM STATEMENTS =================== */
export function MinistryProblems() {
  const [q, setQ] = useState("");
  const [bucket, setBucket] = useState("all");
  const [band, setBand] = useState("all");

  const rows = useMemo(() => MINISTRY_PROBLEMS.filter((p) => {
    if (bucket !== "all" && p.bucket !== bucket) return false;
    if (band === "high" && p.total < 9) return false;
    if (band === "flagged" && !/FACT-CHECK FLAG/i.test(p.verify)) return false;
    if (q) {
      const hay = (p.statement + p.ministry + p.mobility + p.oemRole + p.offerings).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }), [q, bucket, band]);

  const flagged = MINISTRY_PROBLEMS.filter((p) => /FACT-CHECK FLAG/i.test(p.verify)).length;
  const high = MINISTRY_PROBLEMS.filter((p) => p.total >= 9).length;

  return (
    <div>
      <SectionHead
        kicker="From the consolidated research workbook"
        title="Ministry problem statements"
        sub="80 statements across 7 buckets and 16 ministries, carrying the workbook's own mobility impact scores and OEM relevance analysis. The workbook's evidence standard applies here unchanged — statements with a fact-check flag are research propositions, not verified facts."
      />

      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        <Panel className="px-4 py-3">
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>Statements</div>
          <Num size={24} color={C.text} weight={600}>{MINISTRY_PROBLEMS.length}</Num>
          <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>7 buckets · 16 ministries</div>
        </Panel>
        <Panel className="px-4 py-3" accent={C.risk}>
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>High mobility impact (9–12)</div>
          <Num size={24} color={C.risk} weight={600}>{high}</Num>
          <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>Energy + logistics + UX + safety</div>
        </Panel>
        <Panel className="px-4 py-3" accent={C.gazette}>
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>Carry a fact-check flag</div>
          <Num size={24} color={C.gazette} weight={600}>{flagged}</Num>
          <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>Verify before external use</div>
        </Panel>
      </div>

      <Panel className="px-4 py-3 mb-4" accent={C.risk}>
        <div className="flex items-start gap-3">
          <AlertTriangle size={14} color={C.risk} style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "88ch" }}>
            One caution about the source scoring. The workbook rates 57 of these 80 items at
            opportunity 5 of 5. A score that says yes to seventy percent of its inputs is not
            discriminating between them, so the opportunity score is shown here as supplied but is not
            used to rank anything. The mobility impact total, which does spread across three bands, is
            used instead.
          </p>
        </div>
      </Panel>

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <div className="flex items-center gap-2 px-3 py-2 rounded"
          style={{ background: C.panel, border: `1px solid ${C.rule}`, minWidth: 230 }}>
          <Search size={14} color={C.text3} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search statements"
            className="bg-transparent outline-none flex-1" style={{ color: C.text, fontSize: 13 }} />
        </div>
        <select value={bucket} onChange={(e) => setBucket(e.target.value)} className="px-2.5 py-2 rounded"
          style={{ fontSize: 11.5, background: C.panel, color: C.text, border: `1px solid ${C.rule}`, cursor: "pointer", maxWidth: 280 }}>
          <option value="all">All buckets</option>
          {BUCKETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {[["all", "All"], ["high", "High impact"], ["flagged", "Flagged"]].map(([k, l]) => (
          <button key={k} onClick={() => setBand(k)} className="px-3 py-2 rounded"
            style={{
              fontSize: 12, cursor: "pointer",
              background: band === k ? C.panel2 : "transparent",
              color: band === k ? C.text : C.text2,
              border: `1px solid ${band === k ? C.rule : C.ruleSoft}`,
            }}>{l}</button>
        ))}
        <div className="flex-1" />
        <span style={{ fontFamily: mono, fontSize: 11, color: C.text3 }}>
          {rows.length} of {MINISTRY_PROBLEMS.length}
        </span>
      </div>

      <Stack>
        {rows.map((p) => {
          const isFlag = /FACT-CHECK FLAG/i.test(p.verify);
          return (
            <Collapse key={p.id} accent={tone(BAND_TONE(p.band))}
              title={p.statement}
              subtitle={`${p.ministry} · priority ${p.priority} · ${p.bucket}`}
              right={
                <div className="flex items-center gap-3 flex-shrink-0">
                  {isFlag && <AlertTriangle size={12} color={C.gazette} />}
                  <div className="hidden sm:block">
                    <div style={{ fontSize: 9, color: C.text3, marginBottom: 2 }}>Impact</div>
                    <Num size={12} color={tone(BAND_TONE(p.band))}>{p.total}/12</Num>
                  </div>
                  <Num size={9.5} color={C.text3}>{p.id}</Num>
                </div>
              }>
              {/* impact scores */}
              <div className="flex gap-5 flex-wrap mb-4">
                {[["Energy", p.energy], ["Logistics", p.logistics], ["User experience", p.ux], ["Safety", p.safety]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 10, color: C.text3, marginBottom: 3 }}>{l}</div>
                    <div className="flex items-center gap-1.5">
                      <Bars value={v} max={3} color={tone(BAND_TONE(p.band))} label={`${l} ${v} of 3`} />
                      <Num size={11} color={C.text2}>{v}</Num>
                    </div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 10, color: C.text3, marginBottom: 3 }}>Band</div>
                  <Tag color={tone(BAND_TONE(p.band))}>{p.band}</Tag>
                </div>
              </div>

              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))" }}>
                {p.people && <Field label="Impact on people"><p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{p.people}</p></Field>}
                {p.mobility && <Field label="Mobility implication"><p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{p.mobility}</p></Field>}
                {p.context && <Field label="Viksit Bharat link"><p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{p.context}</p></Field>}
                {p.evidence && <Field label="Evidence / policy mandate"><p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{p.evidence}</p></Field>}
              </div>

              {p.oemRole && (
                <div className="mt-4">
                  <SoWhat label="OEM / Tier 1 relevance" color={C.market} dense>{p.oemRole}</SoWhat>
                </div>
              )}

              <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                {p.offerings && (
                  <Field label="Potential offerings">
                    <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{p.offerings}</p>
                  </Field>
                )}
                {p.partners && (
                  <Field label="Priority partnerships">
                    <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{p.partners}</p>
                  </Field>
                )}
                {p.barriers && (
                  <Field label="Barriers / risks">
                    <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55 }}>{p.barriers}</p>
                  </Field>
                )}
              </div>

              {p.verify && (
                <div className="mt-4 px-3 py-2.5 rounded"
                  style={{ background: C.panel2, borderLeft: `3px solid ${isFlag ? C.gazette : C.ruleSoft}` }}>
                  <div style={{ fontFamily: mono, fontSize: 9.5, color: isFlag ? C.gazette : C.text3, marginBottom: 3 }}>
                    {isFlag ? "FACT-CHECK FLAG" : "PRIMARY VERIFICATION"}
                  </div>
                  <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.5 }}>{p.verify}</p>
                </div>
              )}
            </Collapse>
          );
        })}
        {rows.length === 0 && <Empty>No statements match this filter.</Empty>}
      </Stack>
    </div>
  );
}

/* ======================= VIEW: THESIS BANK ============================== */
export function ThesisBank() {
  const [q, setQ] = useState("");
  const [section, setSection] = useState("all");

  const rows = useMemo(() => THESIS.filter((t) => {
    if (section !== "all" && t.section !== section) return false;
    if (q) {
      const hay = (t.title + t.tension + t.goal + t.track).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }), [q, section]);

  const grouped = THESIS_TRACKS
    .map((tr) => ({ track: tr, items: rows.filter((r) => r.track === tr) }))
    .filter((g) => g.items.length > 0);

  const withGoal = THESIS.filter((t) => t.goal).length;

  return (
    <div>
      <SectionHead
        kicker="Research and innovation pipeline"
        title="Thesis bank"
        sub="75 doctoral-level problem statements, each written as a tension — two things that cannot both be true as currently planned — with a monetisable platform thesis attached. The tension structure is the useful part: a tension is a market, and these state the business model rather than only the research question."
      />

      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        <Panel className="px-4 py-3">
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>Problem statements</div>
          <Num size={24} color={C.text} weight={600}>{THESIS.length}</Num>
          <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>3 sections · 14 tracks</div>
        </Panel>
        <Panel className="px-4 py-3" accent={C.market}>
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>With a monetisation thesis</div>
          <Num size={24} color={C.market} weight={600}>{withGoal}</Num>
          <div style={{ fontSize: 10.5, color: C.text3, marginTop: 4 }}>Platform and revenue model stated</div>
        </Panel>
        <Panel className="px-4 py-3" accent={C.scenario}>
          <div style={{ fontSize: 11.5, color: C.text2, minHeight: 28 }}>Route into the board</div>
          <div style={{ fontSize: 12.5, color: C.text, marginTop: 8, lineHeight: 1.45 }}>
            Search fields · innovation campaigns · university partnerships
          </div>
        </Panel>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <div className="flex items-center gap-2 px-3 py-2 rounded"
          style={{ background: C.panel, border: `1px solid ${C.rule}`, minWidth: 230 }}>
          <Search size={14} color={C.text3} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics"
            className="bg-transparent outline-none flex-1" style={{ color: C.text, fontSize: 13 }} />
        </div>
        <button onClick={() => setSection("all")} className="px-3 py-2 rounded"
          style={{
            fontSize: 12, cursor: "pointer",
            background: section === "all" ? C.panel2 : "transparent",
            color: section === "all" ? C.text : C.text2,
            border: `1px solid ${section === "all" ? C.rule : C.ruleSoft}`,
          }}>All</button>
        {THESIS_SECTIONS.map((s, i) => (
          <button key={s} onClick={() => setSection(s)} className="px-3 py-2 rounded"
            style={{
              fontSize: 12, cursor: "pointer", maxWidth: 260,
              background: section === s ? C.panel2 : "transparent",
              color: section === s ? C.text : C.text2,
              border: `1px solid ${section === s ? C.rule : C.ruleSoft}`,
            }}>{i + 1}. {s.split(" ").slice(0, 3).join(" ")}…</button>
        ))}
        <div className="flex-1" />
        <span style={{ fontFamily: mono, fontSize: 11, color: C.text3 }}>{rows.length} of {THESIS.length}</span>
      </div>

      {grouped.length === 0 && <Empty>No topics match this filter.</Empty>}

      {grouped.map((g) => (
        <div key={g.track} style={{ marginBottom: 22 }}>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical size={13} color={C.scenario} />
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{g.track}</div>
            <Num size={11} color={C.text3}>{g.items.length}</Num>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))" }}>
            {g.items.map((t) => (
              <Panel key={t.id} className="p-4" accent={t.goal ? C.market : C.ruleSoft}>
                <div className="flex items-center gap-2 mb-2">
                  <Num size={9.5} color={C.text3}>{t.id}</Num>
                  {t.goal && <Tag color={C.market}>monetisable</Tag>}
                </div>
                <div style={{ fontSize: 13.5, color: C.text, fontWeight: 600, lineHeight: 1.35 }}>{t.title}</div>
                {t.tension && (
                  <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55, marginTop: 8 }}>{t.tension}</p>
                )}
                {t.goal && (
                  <div className="mt-3 px-3 py-2.5 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.market}` }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Coins size={10} color={C.market} />
                      <span style={{ fontFamily: mono, fontSize: 9.5, color: C.market }}>PLATFORM THESIS</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.55 }}>{t.goal}</p>
                  </div>
                )}
              </Panel>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
