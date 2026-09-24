import React, { useState, useMemo } from "react";
import {
  Search, X, AlertTriangle, ExternalLink, ChevronRight, TrendingUp, TrendingDown,
  Minus, RotateCcw, ScrollText, Lightbulb, EyeOff,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { C, mono, tone } from "./theme.js";
import {
  Panel, Tag, Num, SectionHead, SoWhat, Field, Bars, Stat, Stack, Empty, Collapse,
  axisTick, tooltipStyle,
} from "./ui.jsx";
import {
  SIGNALS, HORIZONS, PILLARS, SECTORS, POLICY, CALENDAR, TRANSPORT_FUEL,
  ENERGY_DEMAND, POWER_CAP, BESS, MINERAL_DRIVERS, HEADLINE, TRAJECTORY,
  FORECAST_LEDGER,
} from "./data.js";

const kindColor = (k) => C[{ gazette: "gazette", scenario: "scenario", market: "market", risk: "risk" }[k]] || C.text3;
const kindLabel = (k) => ({ gazette: "Statutory", scenario: "Model", market: "Market", risk: "Risk" }[k] || k);

/* ============================ VIEW: SIGNAL FEED ========================= */
export function SignalFeed({ horizon, sector, onOpen }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");

  const rows = useMemo(() => SIGNALS.filter((s) => {
    if (horizon && s.horizon !== horizon) return false;
    if (sector && s.sector !== sector) return false;
    if (kind !== "all" && s.kind !== kind) return false;
    if (q && !(s.title + s.body + s.source + s.soWhat).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, kind, horizon, sector]);

  return (
    <div>
      <SectionHead
        kicker="What has actually happened"
        title="Signal feed"
        sub="Gazettes, notifications, Cabinet decisions, consultation drafts, parliamentary replies and NITI publications. Every signal carries the pillar and sector it moves, so nothing sits on the board as an isolated news item."
      />
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <div className="flex items-center gap-2 px-3 py-2 rounded"
          style={{ background: C.panel, border: `1px solid ${C.rule}`, minWidth: 240 }}>
          <Search size={14} color={C.text3} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search signals"
            className="bg-transparent outline-none flex-1" style={{ color: C.text, fontSize: 13 }} />
        </div>
        {["all", "gazette", "scenario", "market", "risk"].map((k) => (
          <button key={k} onClick={() => setKind(k)} className="px-3 py-2 rounded"
            style={{
              fontSize: 12,
              background: kind === k ? C.panel2 : "transparent",
              color: kind === k ? C.text : C.text2,
              border: `1px solid ${kind === k ? C.rule : C.ruleSoft}`,
              cursor: "pointer",
            }}>
            {k === "all" ? "All" : kindLabel(k)}
          </button>
        ))}
        <div className="flex-1" />
        <span style={{ fontFamily: mono, fontSize: 11, color: C.text3 }}>
          {rows.length} of {SIGNALS.length}
        </span>
      </div>

      <Stack>
        {rows.map((s) => {
          const pil = PILLARS.find((p) => p.id === s.pillar);
          const sec = SECTORS.find((x) => x.id === s.sector);
          return (
            <button key={s.id} onClick={() => onOpen(s)} className="text-left px-4 py-4 w-full"
              style={{ background: C.panel, cursor: "pointer", borderLeft: `3px solid ${kindColor(s.kind)}` }}>
              <div className="flex items-start gap-4 flex-wrap">
                <div style={{ minWidth: 92 }}>
                  <Num size={12} color={C.text2}>{s.date}</Num>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.text3, marginTop: 3 }}>{s.id}</div>
                </div>
                <div className="flex-1" style={{ minWidth: 260 }}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Tag color={kindColor(s.kind)}>{kindLabel(s.kind)}</Tag>
                    <span style={{ fontSize: 11.5, color: C.text2 }}>{s.org}</span>
                    {pil && <Tag color={tone(pil.tone)}>{pil.name.split(" ")[0]}</Tag>}
                    {sec && <Tag color={C.text3}>{sec.name.split(" ")[0]}</Tag>}
                    {s.flag && (
                      <span className="inline-flex items-center gap-1" style={{ fontSize: 11, color: C.risk }}>
                        <AlertTriangle size={11} /> corrects earlier entry
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500, lineHeight: 1.4 }}>{s.title}</div>
                  <div style={{ fontSize: 12.5, color: C.text2, marginTop: 5, maxWidth: "80ch" }}>{s.status}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div style={{ fontSize: 9.5, color: C.text3, marginBottom: 3 }}>Impact</div>
                    <Bars value={s.impact} color={kindColor(s.kind)} label={`Impact ${s.impact} of 5`} />
                  </div>
                  <ChevronRight size={16} color={C.text3} />
                </div>
              </div>
            </button>
          );
        })}
        {rows.length === 0 && <Empty>Nothing matches this filter. Clear the horizon or sector selection above.</Empty>}
      </Stack>
    </div>
  );
}

export function SignalDrawer({ s, onClose }) {
  if (!s) return null;
  const pil = PILLARS.find((p) => p.id === s.pillar);
  const sec = SECTORS.find((x) => x.id === s.sector);
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: C.scrim }} onClick={onClose}>
      <div className="h-full overflow-y-auto"
        style={{ width: "min(580px, 100%)", background: C.panel, borderLeft: `1px solid ${C.rule}` }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-5" style={{ borderBottom: `1px solid ${C.ruleSoft}` }}>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Tag color={kindColor(s.kind)} solid>{kindLabel(s.kind)}</Tag>
              <Num size={11} color={C.text3}>{s.id}</Num>
              <Tag color={s.src === "verified" ? C.win : C.text3}>
                {s.src === "verified" ? "sourced" : "illustrative"}
              </Tag>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: C.text, lineHeight: 1.3, maxWidth: "38ch" }}>
              {s.title}
            </h3>
            <div style={{ fontSize: 12, color: C.text2, marginTop: 6 }}>
              {s.source} · <span style={{ fontFamily: mono }}>{s.date}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ cursor: "pointer" }} aria-label="Close"><X size={18} color={C.text2} /></button>
        </div>

        <div className="px-6 py-5" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Field label="What was published">
            <p style={{ fontSize: 13.5, color: C.text, lineHeight: 1.65 }}>{s.body}</p>
          </Field>

          {s.flag && (
            <div className="px-4 py-3 rounded" style={{ background: C.panel2, borderLeft: `3px solid ${C.risk}` }}>
              <div className="flex items-center gap-2 mb-1">
                <RotateCcw size={13} color={C.risk} />
                <span style={{ fontSize: 12, color: C.risk }}>Correction to an earlier entry</span>
              </div>
              <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{s.flag}</p>
            </div>
          )}

          <SoWhat color={kindColor(s.kind)}>{s.soWhat}</SoWhat>

          <div className="flex gap-8 flex-wrap">
            <Field label="National pillar">
              <span style={{ fontSize: 13, color: C.text }}>{pil?.name || "—"}</span>
            </Field>
            <Field label="Priority sector">
              <span style={{ fontSize: 13, color: C.text }}>{sec?.name || "—"}</span>
            </Field>
            <Field label="Horizon">
              <Num size={14}>{HORIZONS.find((h) => h.id === s.horizon)?.year}</Num>
            </Field>
            <Field label="Confidence">
              <Num size={14}>{s.confidence}</Num>
            </Field>
          </div>

          <Field label="Divisions touched">
            <div className="flex gap-1.5 flex-wrap" style={{ maxWidth: 460 }}>
              {s.units.map((u) => <Tag key={u} color={C.text2}>{u}</Tag>)}
            </div>
          </Field>

          <div className="flex gap-2 pt-4 flex-wrap" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
            <button className="px-4 py-2 rounded" style={{ background: C.gazette, color: C.onAccent, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              Open a move
            </button>
            <button className="px-4 py-2 rounded" style={{ border: `1px solid ${C.rule}`, color: C.text2, fontSize: 12.5, cursor: "pointer" }}>
              Assign owner
            </button>
            <button className="px-4 py-2 rounded inline-flex items-center gap-1.5" style={{ border: `1px solid ${C.rule}`, color: C.text2, fontSize: 12.5, cursor: "pointer" }}>
              Source <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= VIEW: POLICY INTELLIGENCE ==================== */
const EXPOSURE_WORD = { high: "High exposure", medium: "Medium", low: "Low" };
const EXPOSURE_TONE = { high: "risk", medium: "gazette", low: "text3" };

export function PolicyIntel() {
  const [tab, setTab] = useState("existing");
  const TABS = [
    ["existing", "In force", POLICY.existing.length, ScrollText],
    ["emerging", "Emerging", POLICY.emerging.length, Lightbulb],
    ["unrecognised", "Where we are absent", POLICY.unrecognised.length, EyeOff],
  ];

  return (
    <div>
      <SectionHead
        kicker="The rules, and the rules being written"
        title="Policy intelligence"
        sub="Three states, not one. What is in force, what is being drafted, and — the column the review specifically asked for — the areas where we are not present today but could be, while the terms are still open."
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map(([k, l, n, Icon]) => (
          <button key={k} onClick={() => setTab(k)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded"
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

      {tab === "existing" && (
        <Stack>
          {POLICY.existing.map((p) => (
            <div key={p.name} className="px-4 py-3.5 flex items-start gap-4 flex-wrap"
              style={{ background: C.panel, borderLeft: `3px solid ${tone(EXPOSURE_TONE[p.exposure])}` }}>
              <div className="flex-1" style={{ minWidth: 260 }}>
                <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: C.text3, marginTop: 3 }}>{p.body}</div>
                <div style={{ fontSize: 12.5, color: C.text2, marginTop: 6 }}>{p.note}</div>
              </div>
              <div style={{ minWidth: 150 }}>
                <div style={{ fontSize: 10.5, color: C.text3 }}>Status</div>
                <div style={{ fontSize: 12, color: C.text, marginTop: 2 }}>{p.status}</div>
              </div>
              <div style={{ minWidth: 110 }}>
                <div style={{ fontSize: 10.5, color: C.text3 }}>Outlay</div>
                <Num size={13} color={C.text}>{p.value}</Num>
              </div>
              <Tag color={tone(EXPOSURE_TONE[p.exposure])}>{EXPOSURE_WORD[p.exposure]}</Tag>
            </div>
          ))}
        </Stack>
      )}

      {tab === "emerging" && (
        <Stack>
          {POLICY.emerging.map((p) => (
            <div key={p.name} className="px-4 py-3.5 flex items-start gap-4 flex-wrap"
              style={{ background: C.panel, borderLeft: `3px solid ${tone(EXPOSURE_TONE[p.exposure])}` }}>
              <div className="flex-1" style={{ minWidth: 260 }}>
                <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: C.text3, marginTop: 3 }}>{p.body}</div>
                <div style={{ fontSize: 12.5, color: C.text2, marginTop: 6 }}>{p.note}</div>
              </div>
              <div style={{ minWidth: 190 }}>
                <div style={{ fontSize: 10.5, color: C.text3 }}>Status</div>
                <div style={{ fontSize: 12, color: C.text, marginTop: 2 }}>{p.status}</div>
              </div>
              <div style={{ minWidth: 130 }}>
                <div style={{ fontSize: 10.5, color: C.text3 }}>Bites</div>
                <Num size={12} color={C.text}>{p.when}</Num>
              </div>
              <Tag color={tone(EXPOSURE_TONE[p.exposure])}>{EXPOSURE_WORD[p.exposure]}</Tag>
            </div>
          ))}
        </Stack>
      )}

      {tab === "unrecognised" && (
        <>
          <Panel className="px-4 py-3 mb-3" accent={C.nation}>
            <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "84ch" }}>
              Each row below is a place where terms are being set that will later constrain us, and
              where we currently have no seat. None of them require a product decision — they require
              showing up. That is what makes this the cheapest column on the board.
            </p>
          </Panel>
          <Stack>
            {POLICY.unrecognised.map((p) => (
              <div key={p.name} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${C.nation}` }}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: C.text3, marginTop: 3 }}>{p.body}</div>
                    <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, marginTop: 8, maxWidth: "76ch" }}>
                      {p.why}
                    </p>
                  </div>
                  <div style={{ minWidth: 200 }}>
                    <Field label="Our position today">
                      <span style={{ fontSize: 12.5, color: C.risk }}>{p.gap}</span>
                    </Field>
                    <Field label="What a seat is worth" style={{ marginTop: 10 }}>
                      <span style={{ fontSize: 12, color: C.text2, lineHeight: 1.5 }}>{p.value}</span>
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </Stack>
        </>
      )}

      <SectionHead title="Regulatory calendar" sub="Dated obligations and scheme sunsets, ordered by when they bite. A scheme ending is as consequential as a scheme starting — and the drafting window for its successor opens roughly a year earlier."
        right={null} />
      <Stack>
        {CALENDAR.map((c) => (
          <div key={c.what} className="px-4 py-3.5 flex items-start gap-5 flex-wrap"
            style={{ background: C.panel, borderLeft: `3px solid ${c.risk === "high" ? C.risk : C.gazette}` }}>
            <div style={{ minWidth: 118 }}><Num size={13} color={C.text}>{c.when}</Num></div>
            <div className="flex-1" style={{ minWidth: 240 }}>
              <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{c.what}</div>
              <div style={{ fontSize: 12.5, color: C.text2, marginTop: 4 }}>{c.why}</div>
            </div>
            <Tag color={c.risk === "high" ? C.risk : C.gazette}>{c.risk === "high" ? "material" : "monitor"}</Tag>
          </div>
        ))}
      </Stack>
    </div>
  );
}

/* ====================== VIEW: SCENARIOS & TRAJECTORY ==================== */
export function Scenarios() {
  const [sc, setSc] = useState("nzs");
  const [traj, setTraj] = useState(TRAJECTORY[0].id);
  const isN = sc === "nzs";
  const accent = isN ? C.market : C.gazette;
  const t = TRAJECTORY.find((x) => x.id === traj);

  const fuel = TRANSPORT_FUEL.map((f) => ({
    name: f.name, today: f.cur,
    y2050: isN ? f.nzs50 : f.cps50,
    y2070: isN ? f.nzs70 : f.cps70,
  }));

  return (
    <div>
      <SectionHead
        kicker="Two futures, modelled twice"
        title="Scenario explorer & trajectory"
        sub="The NITI volumes model every sector under a Current Policy Scenario and a Net Zero Scenario. Expressing our own plan in the same vocabulary means arguing inside the government's model rather than against it."
        right={
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["cps", "Current policy"], ["nzs", "Net zero"]].map(([k, l]) => (
              <button key={k} onClick={() => setSc(k)} className="px-4 py-2"
                style={{
                  fontSize: 12.5, cursor: "pointer",
                  background: sc === k ? (k === "nzs" ? C.market : C.gazette) : "transparent",
                  color: sc === k ? C.onAccent : C.text2, fontWeight: sc === k ? 600 : 400,
                }}>
                {l}
              </button>
            ))}
          </div>
        }
      />

      {/* trajectory across the full time spine */}
      <Panel className="p-4 mb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div>
            <div style={{ fontSize: 13.5, color: C.text }}>Trajectory across the time spine</div>
            <div style={{ fontSize: 11.5, color: C.text3, marginTop: 2 }}>
              {t.name} — {t.unit}. Both scenarios shown; the gap between them is the strategic question.
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {TRAJECTORY.map((x) => (
              <button key={x.id} onClick={() => setTraj(x.id)} className="px-2.5 py-1.5 rounded"
                style={{
                  fontSize: 11.5, cursor: "pointer",
                  background: traj === x.id ? C.panel2 : "transparent",
                  color: traj === x.id ? C.text : C.text3,
                  border: `1px solid ${traj === x.id ? C.rule : C.ruleSoft}`,
                }}>
                {x.name.length > 28 ? x.name.slice(0, 26) + "…" : x.name}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={t.series} margin={{ top: 8, right: 24, left: -14, bottom: 0 }}>
            <CartesianGrid stroke={C.ruleSoft} vertical={false} />
            <XAxis dataKey="year" tick={{ fill: C.text3, fontSize: 11 }} axisLine={{ stroke: C.rule }} tickLine={false} />
            <YAxis tick={axisTick()} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle()} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line dataKey="cps" name="Current policy" stroke={C.gazette} strokeWidth={2} dot={{ r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            <Line dataKey="nzs" name="Net zero" stroke={C.market} strokeWidth={2} dot={{ r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3">
          <SoWhat color={C.scenario} dense>{t.soWhat}</SoWhat>
        </div>
      </Panel>

      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))" }}>
        {HEADLINE.map((h) => (
          <Stat key={h.k} label={h.k} value={isN ? h.nzs : h.cps}
            compare={`other case ${isN ? h.cps : h.nzs}`} note={h.note} color={accent} size={21} />
        ))}
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}>
        <Panel className="p-4">
          <div style={{ fontSize: 13.5, color: C.text, marginBottom: 2 }}>Transport fuel mix</div>
          <div style={{ fontSize: 11.5, color: C.text3, marginBottom: 14 }}>Share of transport energy, %</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={fuel} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barGap={2}>
              <CartesianGrid stroke={C.ruleSoft} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: C.text3, fontSize: 10 }} axisLine={{ stroke: C.rule }} tickLine={false} interval={0} angle={-18} textAnchor="end" height={54} />
              <YAxis tick={axisTick()} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle()} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="today" name="Today" fill={C.text3} radius={[3, 3, 0, 0]} />
              <Bar dataKey="y2050" name="2050" fill={accent} fillOpacity={0.5} radius={[3, 3, 0, 0]} />
              <Bar dataKey="y2070" name="2070" fill={accent} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel className="p-4">
          <div style={{ fontSize: 13.5, color: C.text, marginBottom: 2 }}>Transport energy demand</div>
          <div style={{ fontSize: 11.5, color: C.text3, marginBottom: 14 }}>Mtoe — demand peaks then falls under both cases</div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={ENERGY_DEMAND} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
              <CartesianGrid stroke={C.ruleSoft} vertical={false} />
              <XAxis dataKey="year" tick={{ fill: C.text3, fontSize: 11 }} axisLine={{ stroke: C.rule }} tickLine={false} />
              <YAxis tick={axisTick()} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle()} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line dataKey="cps" name="Current policy" stroke={C.gazette} strokeWidth={2} dot={{ r: 3.5, strokeWidth: 0 }} />
              <Line dataKey="nzs" name="Net zero" stroke={C.market} strokeWidth={2} dot={{ r: 3.5, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel className="p-4">
          <div style={{ fontSize: 13.5, color: C.text, marginBottom: 2 }}>Installed power capacity</div>
          <div style={{ fontSize: 11.5, color: C.text3, marginBottom: 14 }}>GW including captive — range midpoints</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={POWER_CAP} margin={{ top: 4, right: 8, left: -12, bottom: 0 }} barGap={2}>
              <CartesianGrid stroke={C.ruleSoft} vertical={false} />
              <XAxis dataKey="year" tick={{ fill: C.text3, fontSize: 11 }} axisLine={{ stroke: C.rule }} tickLine={false} />
              <YAxis tick={axisTick()} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle()} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="cps" name="Current policy" fill={C.gazette} radius={[3, 3, 0, 0]} />
              <Bar dataKey="nzs" name="Net zero" fill={C.market} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel className="p-4">
          <div style={{ fontSize: 13.5, color: C.text, marginBottom: 2 }}>What drives critical mineral demand</div>
          <div style={{ fontSize: 11.5, color: C.text3, marginBottom: 14 }}>
            Share of cumulative demand by technology. Over two-thirds of the total arrives after 2050.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 6 }}>
            {MINERAL_DRIVERS.map((m) => (
              <div key={m.name}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span style={{ fontSize: 12.5, color: C.text }}>{m.name}</span>
                  <Num size={13} color={C.text2}>{m.share}%</Num>
                </div>
                <div style={{ height: 6, background: C.ruleSoft, borderRadius: 2 }}>
                  <div style={{ height: 6, width: `${m.share}%`, background: tone(m.tone), borderRadius: 2 }} />
                </div>
              </div>
            ))}
            <div className="pt-3 mt-1" style={{ borderTop: `1px solid ${C.ruleSoft}` }}>
              <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.6 }}>
                Copper requirement exceeds 20 Mt and graphite 14 Mt by 2050. India accounts for roughly
                9% of global demand in 2050 — large in absolute terms, too small to set price.
              </p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel className="p-4 mt-3">
        <div style={{ fontSize: 13.5, color: C.text, marginBottom: 10 }}>Battery storage build-out</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={BESS} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }} barGap={2}>
            <CartesianGrid stroke={C.ruleSoft} horizontal={false} />
            <XAxis type="number" tick={axisTick()} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="year" tick={{ fill: C.text2, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle()} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="cps" name="Current policy (GW)" fill={C.gazette} radius={[0, 3, 3, 0]} />
            <Bar dataKey="nzs" name="Net zero (GW)" fill={C.market} radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
  );
}

/* ==================== VIEW: FORECAST VALIDATION LEDGER ================== */
const SHIFT = {
  up: { icon: TrendingUp, label: "Revised up", tone: "win" },
  down: { icon: TrendingDown, label: "Revised down", tone: "risk" },
  stable: { icon: Minus, label: "Held", tone: "text2" },
  reverted: { icon: RotateCcw, label: "Reversed", tone: "gazette" },
};

export function ForecastLedger() {
  return (
    <div>
      <SectionHead
        kicker="The learning loop"
        title="Forecast validation"
        sub="What we predicted last year, what we predict now, and what changed in between. A dashboard that only shows the current view hides its own error rate — and the error rate is where the method actually improves."
      />

      <Panel className="px-4 py-3 mb-3" accent={C.scenario}>
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "86ch" }}>
          Standing bias visible in this ledger: we systematically under-forecast digital public
          infrastructure rollouts and over-forecast physical infrastructure. Three of the five entries
          below are instances of it. Until that is corrected for, every physical-asset projection on
          this board should be read as an upper bound.
        </p>
      </Panel>

      <Stack>
        {FORECAST_LEDGER.map((f) => {
          const sh = SHIFT[f.shift];
          const Icon = sh.icon;
          return (
            <div key={f.id} className="px-5 py-4" style={{ background: C.panel, borderLeft: `3px solid ${tone(sh.tone)}` }}>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <div>
                  <div style={{ fontSize: 14.5, color: C.text, fontWeight: 500 }}>{f.indicator}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Num size={10.5} color={C.text3}>{f.id}</Num>
                    <span className="inline-flex items-center gap-1" style={{ fontSize: 11.5, color: tone(sh.tone) }}>
                      <Icon size={11} /> {sh.label}
                    </span>
                    <Tag color={C.text3}>confidence {f.confidence}</Tag>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {[["Predicted last year", f.lastYear, C.text3],
                  ["Current view", f.current, C.text],
                  ["Next", f.next, C.text2]].map(([l, v, col], i) => (
                  <div key={l} className="px-3 py-2.5 rounded" style={{ background: C.panel2 }}>
                    <div style={{ fontSize: 10.5, color: C.text3, marginBottom: 4 }}>{l}</div>
                    <div style={{ fontSize: 12.5, color: col, fontFamily: mono, lineHeight: 1.4 }}>{v}</div>
                  </div>
                ))}
              </div>

              <Field label="What moved">
                <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6, maxWidth: "84ch" }}>{f.why}</p>
              </Field>
              <div className="mt-3" style={{ maxWidth: "84ch" }}>
                <SoWhat label="Lesson for the model" color={tone(sh.tone)} dense>{f.lesson}</SoWhat>
              </div>
            </div>
          );
        })}
      </Stack>
    </div>
  );
}

