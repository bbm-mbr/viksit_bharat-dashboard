import React, { useState, useMemo } from "react";
import { ArrowRight, Zap, Gauge, Link2, Target } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { C, mono, tone } from "./theme.js";
import { Panel, Tag, Num, SectionHead, SoWhat, Field, Stack, Empty } from "./ui.jsx";
import { KPIS, KPI_THEMES, policyIndex } from "./kpis.js";
import { SECTORS } from "./data.js";

/* A single-series trajectory sparkline. No legend — the card title names it. */
function Spark({ path, color }) {
  if (!path || path.length < 2) return null;
  const data = path.map((p) => ({ year: p.y, v: p.v }));
  return (
    <div style={{ marginTop: 10 }}>
      <ResponsiveContainer width="100%" height={46}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip
            contentStyle={{ background: C.panel2, border: `1px solid ${C.rule}`, borderRadius: 4, fontSize: 11, color: C.text }}
            labelStyle={{ color: C.text, fontWeight: 600 }}
            itemStyle={{ color: C.text2 }}
            formatter={(v) => [v, "value"]}
          />
          <Line dataKey="v" stroke={color} strokeWidth={2} dot={{ r: 2.5, strokeWidth: 0 }} activeDot={{ r: 4.5 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between" style={{ fontFamily: mono, fontSize: 9.5, color: C.text3, marginTop: 2 }}>
        <span>{path[0].y}</span><span>{path[path.length - 1].y}</span>
      </div>
    </div>
  );
}

export function KpiCockpit({ sector }) {
  const [type, setType] = useState("all");
  const [theme, setTheme] = useState("all");
  const [sec, setSec] = useState(sector || "all");

  const rows = useMemo(() => KPIS.filter((k) => {
    if (type !== "all" && k.type !== type) return false;
    if (theme !== "all" && k.theme !== theme) return false;
    if (sec !== "all" && k.sector !== sec) return false;
    return true;
  }), [type, theme, sec]);

  const grouped = KPI_THEMES
    .map((t) => ({ ...t, items: rows.filter((k) => k.theme === t.id) }))
    .filter((t) => t.items.length > 0);

  const nLead = KPIS.filter((k) => k.type === "leading").length;
  const instruments = policyIndex().slice(0, 10);

  return (
    <div>
      <SectionHead
        kicker="Indicators, and what moves them"
        title="KPI cockpit"
        sub="The Viksit Bharat 2047 and Net Zero 2070 indicator set, filed by theme and sector. Every indicator carries the policy instruments that drive it, because an indicator with no instrument attached is a number nobody owns."
        right={
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["all", `All ${KPIS.length}`], ["leading", `Leading ${nLead}`], ["lagging", `Lagging ${KPIS.length - nLead}`]].map(([k, l]) => (
              <button key={k} onClick={() => setType(k)} className="px-3.5 py-2"
                style={{
                  fontSize: 12, cursor: "pointer",
                  background: type === k ? C.panel2 : "transparent",
                  color: type === k ? C.text : C.text2,
                }}>
                {l}
              </button>
            ))}
          </div>
        }
      />

      {/* the distinction that matters */}
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        <Panel className="p-4" accent={C.scenario}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} color={C.scenario} />
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>Leading — inputs we can still influence</div>
          </div>
          <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>
            Investment rate, GERD, R&D talent, AI skilling, EPR target-setting, DPI transformation
            cycles, charger conversion and ATS build-out. These are inputs: their movement today
            changes the outcomes below years later. This is the column worth arguing about, because
            it is the only one where being early is still possible.
          </p>
        </Panel>
        <Panel className="p-4" accent={C.ruleSoft}>
          <div className="flex items-center gap-2 mb-2">
            <Gauge size={14} color={C.text3} />
            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>Lagging — outcomes already determined</div>
          </div>
          <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>
            GDP, per capita income, grid emission factor, capacity build-out, emissions reduction.
            These confirm whether the transition is happening. They are essential for reporting and
            almost useless for deciding, because by the time they move the decision that moved them
            was taken years earlier.
          </p>
        </Panel>
      </div>

      {/* filters */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <span style={{ fontSize: 11, color: C.text3, fontFamily: mono }}>THEME</span>
        <button onClick={() => setTheme("all")} className="px-2.5 py-1.5 rounded"
          style={{
            fontSize: 11.5, cursor: "pointer",
            background: theme === "all" ? C.panel2 : "transparent",
            color: theme === "all" ? C.text : C.text3,
            border: `1px solid ${theme === "all" ? C.rule : C.ruleSoft}`,
          }}>All</button>
        {KPI_THEMES.map((t) => (
          <button key={t.id} onClick={() => setTheme(t.id)} className="px-2.5 py-1.5 rounded"
            style={{
              fontSize: 11.5, cursor: "pointer",
              background: theme === t.id ? C.panel2 : "transparent",
              color: theme === t.id ? C.text : C.text3,
              border: `1px solid ${theme === t.id ? tone(t.tone) : C.ruleSoft}`,
            }}>
            {t.name.split(" ")[0]}
          </button>
        ))}
        <div className="flex-1" />
        <select value={sec} onChange={(e) => setSec(e.target.value)}
          className="px-2.5 py-1.5 rounded"
          style={{ fontSize: 11.5, background: C.panel, color: C.text, border: `1px solid ${C.rule}`, cursor: "pointer" }}>
          <option value="all">All sectors</option>
          <option value="XS">Cross-sector</option>
          {SECTORS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.text3 }}>{rows.length} shown</span>
      </div>

      {grouped.length === 0 && <Empty>No indicators match this filter.</Empty>}

      {grouped.map((t) => (
        <div key={t.id} style={{ marginBottom: 24 }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ width: 8, height: 8, borderRadius: 2, background: tone(t.tone), display: "inline-block" }} />
            <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{t.name}</div>
            <Num size={11} color={C.text3}>{t.items.length}</Num>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(292px, 1fr))" }}>
            {t.items.map((k) => {
              const s = SECTORS.find((x) => x.id === k.sector);
              const lead = k.type === "leading";
              return (
                <Panel key={k.id} className="p-4" accent={lead ? C.scenario : C.ruleSoft}>
                  <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                    <Tag color={lead ? C.scenario : C.text3}>{lead ? "Leading" : "Lagging"}</Tag>
                    {k.scenario && <Tag color={C.market}>{k.scenario}</Tag>}
                    <Tag color={k.src === "verified" ? C.win : k.src === "briefed" ? C.nation : C.text3}>
                      {k.src}
                    </Tag>
                    <div className="flex-1" />
                    <Num size={9.5} color={C.text3}>{k.id}</Num>
                  </div>

                  <div style={{ fontSize: 13, color: C.text, fontWeight: 500, lineHeight: 1.35, minHeight: 36 }}>
                    {k.name}
                  </div>

                  <div className="flex items-end gap-2 mt-3 flex-wrap">
                    <div>
                      <div style={{ fontSize: 10, color: C.text3 }}>Now · {k.nowYear}</div>
                      <div style={{ fontFamily: mono, fontSize: 15, color: C.text2, marginTop: 2 }}>{k.now}</div>
                    </div>
                    <ArrowRight size={13} color={C.text3} style={{ marginBottom: 5 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: C.text3 }}>Target · {k.targetYear}</div>
                      <div style={{ fontFamily: mono, fontSize: 15, color: tone(t.tone), marginTop: 2, fontWeight: 600, lineHeight: 1.25 }}>
                        {k.target}
                      </div>
                    </div>
                  </div>

                  <Spark path={k.path} color={tone(t.tone)} />

                  {k.why && (
                    <div className="mt-3 px-3 py-2 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.scenario}` }}>
                      <div style={{ fontFamily: mono, fontSize: 9.5, color: C.scenario, marginBottom: 3 }}>WHY IT LEADS</div>
                      <p style={{ fontSize: 11.5, color: C.text2, lineHeight: 1.5 }}>{k.why}</p>
                    </div>
                  )}

                  {k.bosch && (
                    <div className="mt-2.5">
                      <SoWhat color={tone(t.tone)} dense>{k.bosch}</SoWhat>
                    </div>
                  )}

                  <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Link2 size={10} color={C.text3} />
                      <span style={{ fontSize: 10, color: C.text3, fontFamily: mono }}>DRIVEN BY</span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {(k.policy || []).map((p) => <Tag key={p} color={C.text2}>{p}</Tag>)}
                    </div>
                    {s && <div style={{ fontSize: 10.5, color: C.text3, marginTop: 8 }}>{s.name}</div>}
                    {k.sector === "XS" && <div style={{ fontSize: 10.5, color: C.text3, marginTop: 8 }}>Cross-sector</div>}
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
      ))}

      {/* policy leverage */}
      <SectionHead
        kicker="Reading the index backwards"
        title="Policy leverage"
        sub="Which instruments move the most indicators. An instrument near the top of this list is a high-leverage place to have a seat — and several of them are being drafted now."
      />
      <Stack>
        {instruments.map((p) => (
          <div key={p.name} className="px-4 py-3.5 flex items-start gap-4 flex-wrap"
            style={{ background: C.panel, borderLeft: `3px solid ${p.items.length >= 3 ? C.gazette : C.ruleSoft}` }}>
            <div style={{ minWidth: 40 }}>
              <Num size={20} color={p.items.length >= 3 ? C.gazette : C.text3} weight={600}>{p.items.length}</Num>
            </div>
            <div className="flex-1" style={{ minWidth: 220 }}>
              <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{p.name}</div>
              <div className="flex gap-1 flex-wrap mt-2">
                {p.items.map((k) => (
                  <Tag key={k.id} color={k.type === "leading" ? C.scenario : C.text3} title={k.name}>{k.id}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Stack>

      <Panel className="p-5 mt-3" accent={C.risk}>
        <div className="flex items-center gap-2 mb-3">
          <Target size={14} color={C.risk} />
          <div style={{ fontSize: 13.5, color: C.text }}>What this framework is for</div>
        </div>
        <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.7, maxWidth: "84ch" }}>
          Two uses, and they are different. Reported to a board, the lagging set demonstrates that
          the national transition is real and sizes the market. Used to decide, only the leading set
          is actionable — and of the eight leading indicators here, the one that has not moved at all
          is chargers approved but not installed, sitting at 6,562 against an ideal value of zero.
          Every other leading indicator is trending the right way. That single flat line is where the
          board should spend its attention this quarter.
        </p>
      </Panel>
    </div>
  );
}
