import React, { useState, useMemo, useEffect } from "react";
import {
  Radar, Flag, Landmark, LayoutGrid, Radio, ScrollText, Layers, History,
  Gauge, Map, Wrench, ShieldAlert, Grid3x3, HeartHandshake, Network,
  ListChecks, MessageSquare, Database, X, Sun, Moon, Compass, Globe,
  Waypoints, Droplets, MessagesSquare, Building2, FlaskConical,
} from "lucide-react";

import { C, applyTheme, FONTS, sans, mono } from "./radar/theme.js";
import { Num } from "./radar/ui.jsx";
import { HORIZONS, SIGNALS, OPPS, SECTORS } from "./radar/data.js";

import { StartHere } from "./radar/views-start.jsx";
import { PictureOfFuture, DesignPrinciples, PrioritySectors } from "./radar/views-india.jsx";
import { GlobalLens, ConnectDots } from "./radar/views-global.jsx";
import {
  SignalFeed, SignalDrawer, PolicyIntel, Scenarios, ForecastLedger,
} from "./radar/views-intel.jsx";
import { KpiCockpit } from "./radar/views-kpi.jsx";
import {
  Opportunities, Capabilities, RiskRegister, PortfolioGrid, NationBuilding,
  Ecosystem, MoveBoard,
} from "./radar/views-synth.jsx";
import { DataLake } from "./radar/views-lake.jsx";
import { SixHats } from "./radar/views-hats.jsx";
import { MinistryProblems, ThesisBank } from "./radar/views-workbook.jsx";
import { AskRadar, SourcesMethod } from "./radar/views-system.jsx";

/* ============================================================================
   BHARAT 2047 RADAR — strategy intelligence prototype for Bosch Mobility India

   Reframed after the WP1 review to read outside-in: the national agenda first,
   Bosch relevance derived from it. The navigation carries that argument — the
   rail is grouped India → what is moving → so what, so an opportunity is never
   reached without passing the national problem statement it answers to.

   All content is for structure and interaction review. Records are tagged
   sourced or illustrative; illustrative records must not enter a plan without
   verification. Data as of 10 September 2026.
   ========================================================================== */

/* `simple: true` marks the eight screens that carry the whole argument on their
   own. Simple mode is the default: the review's concern was that users would be
   impressed by the board and then not use it. Nothing is deleted in Simple —
   the rest is one toggle away. */
const GROUPS = [
  {
    label: "Start", hint: "Read this first",
    views: [
      { id: "start", label: "How to use this", icon: Compass, C: StartHere, simple: true },
    ],
  },
  {
    label: "India", hint: "What the country is trying to do",
    views: [
      { id: "pof", label: "Picture of Future", icon: Flag, C: PictureOfFuture, simple: true },
      { id: "principles", label: "Design principles", icon: Landmark, C: DesignPrinciples },
      { id: "sectors", label: "Priority sectors", icon: LayoutGrid, C: PrioritySectors },
    ],
  },
  {
    label: "The world", hint: "How the world looks at India",
    views: [
      { id: "global", label: "Tailwinds & headwinds", icon: Globe, C: GlobalLens, simple: true },
      { id: "dots", label: "Connect the dots", icon: Waypoints, C: ConnectDots, simple: true },
    ],
  },
  {
    label: "What is moving", hint: "The evidence base",
    views: [
      { id: "feed", label: "Signal feed", icon: Radio, C: SignalFeed, simple: true },
      { id: "policy", label: "Policy intelligence", icon: ScrollText, C: PolicyIntel },
      { id: "scenarios", label: "Scenarios & trajectory", icon: Layers, C: Scenarios },
      { id: "forecast", label: "Forecast validation", icon: History, C: ForecastLedger },
      { id: "kpi", label: "KPI cockpit", icon: Gauge, C: KpiCockpit, simple: true },
    ],
  },
  {
    label: "So what", hint: "Synthesis and consequence",
    views: [
      { id: "opps", label: "Opportunity map", icon: Map, C: Opportunities, simple: true },
      { id: "capabilities", label: "Capability build", icon: Wrench, C: Capabilities },
      { id: "risk", label: "Risk register", icon: ShieldAlert, C: RiskRegister },
      { id: "portfolio", label: "Portfolio & adjacency", icon: Grid3x3, C: PortfolioGrid },
      { id: "nation", label: "Nation building", icon: HeartHandshake, C: NationBuilding },
      { id: "eco", label: "Ecosystem & deals", icon: Network, C: Ecosystem },
      { id: "moves", label: "Move board", icon: ListChecks, C: MoveBoard, simple: true },
    ],
  },
  {
    label: "Research base", hint: "The source corpus",
    views: [
      { id: "ministry", label: "Ministry problems", icon: Building2, C: MinistryProblems },
      { id: "thesis", label: "Thesis bank", icon: FlaskConical, C: ThesisBank },
    ],
  },
  {
    label: "System", hint: "How the board is produced",
    views: [
      { id: "lake", label: "Data lake", icon: Droplets, C: DataLake },
      { id: "hats", label: "Six-hat debate", icon: MessagesSquare, C: SixHats },
      { id: "ask", label: "Ask the radar", icon: MessageSquare, C: AskRadar },
      { id: "src", label: "Sources & method", icon: Database, C: SourcesMethod },
    ],
  },
];

const ALL_VIEWS = GROUPS.flatMap((g) => g.views);

/* ---- the horizon spine: one time model, present on every screen -------- */
function HorizonSpine({ active, setActive, counts }) {
  return (
    <div className="w-full px-5 py-2.5" style={{ background: C.ink, borderBottom: `1px solid ${C.rule}` }}>
      <div className="flex items-stretch" style={{ gap: 0 }}>
        {HORIZONS.map((h, i) => {
          const on = active === h.id;
          const n = counts[h.id] || 0;
          return (
            <button key={h.id} onClick={() => setActive(on ? null : h.id)}
              className="flex-1 text-left relative px-3 py-2"
              aria-pressed={on}
              title={h.span}
              style={{
                background: on ? C.panel2 : "transparent",
                borderLeft: i === 0 ? `1px solid ${C.rule}` : "none",
                borderRight: `1px solid ${C.rule}`,
                borderTop: `2px solid ${on ? C.gazette : "transparent"}`,
                cursor: "pointer",
                minWidth: 0,
              }}>
              <div className="flex items-baseline justify-between gap-2">
                <Num size={15} color={on ? C.text : C.text2}>{h.year}</Num>
                {n > 0 && (
                  <span style={{ fontFamily: mono, fontSize: 10, color: on ? C.gazette : C.text3 }}>{n}</span>
                )}
              </div>
              <div style={{ fontSize: 11.5, color: on ? C.text2 : C.text3, marginTop: 2, lineHeight: 1.25 }}>
                {h.label}
              </div>
              <div style={{ fontSize: 10.5, color: C.text3, marginTop: 1, fontStyle: "italic" }}>{h.note}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("start");
  const [horizon, setHorizon] = useState(null);
  const [sector, setSector] = useState(null);
  const [open, setOpen] = useState(null);
  const [density, setDensity] = useState(() => localStorage.getItem("b2047-density") || "simple");
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("b2047-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  /* Rewrite the live token object before any child renders, so the whole tree
     paints from one palette in a single pass. */
  applyTheme(theme);

  useEffect(() => {
    localStorage.setItem("b2047-theme", theme);
    document.body.style.background = C.ink;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const counts = useMemo(() => {
    const c = {};
    SIGNALS.forEach((s) => { c[s.horizon] = (c[s.horizon] || 0) + 1; });
    OPPS.forEach((o) => { c[o.horizon] = (c[o.horizon] || 0) + 1; });
    return c;
  }, []);

  useEffect(() => { localStorage.setItem("b2047-density", density); }, [density]);

  /* In Simple mode the rail shows only the eight load-bearing screens. If the
     current view is not one of them, keep showing it rather than teleporting
     the user somewhere they did not ask to be. */
  const groups = useMemo(() => GROUPS
    .map((g) => ({ ...g, views: g.views.filter((v) => density === "full" || v.simple || v.id === view) }))
    .filter((g) => g.views.length > 0), [density, view]);

  const Current = ALL_VIEWS.find((v) => v.id === view).C;
  const activeSector = SECTORS.find((s) => s.id === sector);
  const hiddenCount = ALL_VIEWS.length - ALL_VIEWS.filter((v) => v.simple).length;

  const openSector = (id) => { setSector(id); setView("feed"); };

  return (
    <div style={{ background: C.ink, minHeight: "100vh", fontFamily: sans, color: C.text }}>
      <style>{FONTS}</style>

      {/* masthead */}
      <div className="flex items-center justify-between px-5 py-3 flex-wrap gap-3"
        style={{ borderBottom: `1px solid ${C.rule}` }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded"
            style={{ width: 30, height: 30, background: C.gazette }}>
            <Radar size={17} color={C.onAccent} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Bharat 2047 Radar</div>
            <div style={{ fontSize: 11, color: C.text3 }}>
              National agenda to opportunity · Bosch Mobility India
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {activeSector && (
            <button onClick={() => setSector(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded"
              style={{ border: `1px solid ${C.market}`, color: C.market, fontSize: 11.5, cursor: "pointer", background: "transparent" }}>
              {activeSector.name} <X size={11} />
            </button>
          )}
          {horizon && (
            <button onClick={() => setHorizon(null)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded"
              style={{ border: `1px solid ${C.gazette}`, color: C.gazette, fontSize: 11.5, cursor: "pointer", background: "transparent" }}>
              {HORIZONS.find((h) => h.id === horizon)?.year} filter <X size={11} />
            </button>
          )}
          <span style={{ fontFamily: mono, fontSize: 11.5, color: C.text2 }}>as of 21 Sep 2026</span>
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["simple", "Simple"], ["full", "Full"]].map(([k, l]) => {
              const on = density === k;
              return (
                <button key={k} onClick={() => setDensity(k)} aria-pressed={on}
                  title={k === "simple" ? "Eight screens that carry the whole argument" : `All ${ALL_VIEWS.length} screens`}
                  className="px-2.5 py-1.5"
                  style={{
                    fontSize: 11.5, cursor: "pointer",
                    background: on ? C.panel2 : "transparent",
                    color: on ? C.text : C.text3,
                    fontWeight: on ? 500 : 400,
                  }}>
                  {l}
                </button>
              );
            })}
          </div>
          <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.rule}` }}>
            {[["light", "Light", Sun], ["dark", "Dark", Moon]].map(([k, l, Icon]) => {
              const on = theme === k;
              return (
                <button key={k} onClick={() => setTheme(k)} title={`${l} theme`} aria-pressed={on}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5"
                  style={{
                    fontSize: 11.5, cursor: "pointer",
                    background: on ? C.panel2 : "transparent",
                    color: on ? C.text : C.text3,
                    fontWeight: on ? 500 : 400,
                  }}>
                  <Icon size={13} color={on ? C.gazette : C.text3} />
                  {l}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <HorizonSpine active={horizon} setActive={setHorizon} counts={counts} />

      <div className="flex" style={{ alignItems: "stretch" }}>
        {/* rail — grouped so the navigation carries the outside-in argument */}
        <nav className="py-3 px-2 flex flex-col gap-0.5"
          style={{ width: 218, borderRight: `1px solid ${C.rule}`, flexShrink: 0, minHeight: "calc(100vh - 132px)" }}>
          {groups.map((g, gi) => (
            <div key={g.label} style={{ marginTop: gi === 0 ? 0 : 14 }}>
              <div className="px-3 pb-1.5" title={g.hint}>
                <span style={{ fontFamily: mono, fontSize: 9.5, color: C.text3, letterSpacing: "0.1em" }}>
                  {g.label.toUpperCase()}
                </span>
              </div>
              {g.views.map((v) => {
                const Icon = v.icon;
                const on = view === v.id;
                return (
                  <button key={v.id} onClick={() => setView(v.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded text-left w-full"
                    style={{
                      background: on ? C.panel2 : "transparent",
                      color: on ? C.text : C.text2, fontSize: 12.5, cursor: "pointer",
                      borderLeft: `2px solid ${on ? C.gazette : "transparent"}`,
                    }}>
                    <Icon size={14} color={on ? C.gazette : C.text3} style={{ flexShrink: 0 }} />
                    {v.label}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="mt-auto px-3 pt-4" style={{ borderTop: `1px solid ${C.ruleSoft}`, marginTop: 24 }}>
            {density === "simple" && (
              <button onClick={() => setDensity("full")}
                className="text-left w-full mb-3"
                style={{ fontSize: 11, color: C.gazette, cursor: "pointer", background: "transparent", lineHeight: 1.45 }}>
                + {hiddenCount} more screens in Full mode
              </button>
            )}
            <p style={{ fontSize: 10.5, color: C.text3, lineHeight: 1.55 }}>
              Prototype. Records are tagged sourced, briefed or illustrative — illustrative content is
              for structure review only.
            </p>
          </div>
        </nav>

        {/* stage */}
        <main className="flex-1 p-5" style={{ minWidth: 0 }}>
          <Current
            horizon={horizon}
            sector={sector}
            onOpen={setOpen}
            onOpenSector={openSector}
            onNav={setView}
          />
        </main>
      </div>

      <SignalDrawer s={open} onClose={() => setOpen(null)} />
    </div>
  );
}
