import React, { useState } from "react";
import { ChevronRight, ChevronDown, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { C, mono } from "./theme.js";

/* ============================ LAYOUT ATOMS ============================== */

export function Panel({ children, style, className = "", accent }) {
  return (
    <div
      className={"rounded " + className}
      style={{
        background: C.panel,
        border: `1px solid ${C.ruleSoft}`,
        ...(accent ? { borderLeft: `3px solid ${accent}` } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Tag({ children, color = C.text3, solid = false, title }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5"
      title={title}
      style={{
        fontFamily: mono, fontSize: 10.5, letterSpacing: "0.02em",
        color: solid ? C.onAccent : color,
        background: solid ? color : "transparent",
        border: `1px solid ${solid ? color : C.rule}`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function Num({ children, size = 13, color = C.text, weight = 400 }) {
  return <span style={{ fontFamily: mono, fontSize: size, color, fontWeight: weight }}>{children}</span>;
}

export function SectionHead({ title, sub, right, kicker }) {
  return (
    <div className="flex items-end justify-between mb-4 flex-wrap gap-3">
      <div>
        {kicker && (
          <div style={{ fontFamily: mono, fontSize: 10.5, color: C.text3, letterSpacing: "0.08em", marginBottom: 5 }}>
            {kicker.toUpperCase()}
          </div>
        )}
        <h2 style={{ fontSize: 20, fontWeight: 600, color: C.text, letterSpacing: "-0.01em" }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, color: C.text2, marginTop: 4, maxWidth: "72ch", lineHeight: 1.55 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* The synthesis layer the review called the most important requirement: no fact
   is allowed to sit on the page without stating what follows from it. */
export function SoWhat({ children, label = "So what", color = C.gazette, dense = false }) {
  return (
    <div
      className={dense ? "px-3 py-2 rounded" : "px-4 py-3 rounded"}
      style={{ background: C.panel2, borderLeft: `3px solid ${color}` }}
    >
      <div style={{ fontFamily: mono, fontSize: 10, color, letterSpacing: "0.08em", marginBottom: 4 }}>
        {label.toUpperCase()}
      </div>
      <p style={{ fontSize: dense ? 12 : 12.5, color: C.text, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

export function Field({ label, children, style }) {
  return (
    <div style={style}>
      <div style={{ fontSize: 11, color: C.text3, marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}

export function Callout({ children, color = C.gazette, icon: Icon, title }) {
  return (
    <div className="px-4 py-3 rounded flex items-start gap-3" style={{ background: C.panel2, borderLeft: `3px solid ${color}` }}>
      {Icon && <Icon size={15} color={color} style={{ marginTop: 2, flexShrink: 0 }} />}
      <div>
        {title && <div style={{ fontSize: 12, color, marginBottom: 3 }}>{title}</div>}
        <p style={{ fontSize: 12.5, color: C.text2, lineHeight: 1.6 }}>{children}</p>
      </div>
    </div>
  );
}

/* ============================ DATA MARKS =============================== */

/* Discrete 1–5 meter. Bars are thin and the value is always available as text
   on hover, so the encoding is never colour-alone. */
export function Bars({ value, max = 5, color = C.text2, label }) {
  return (
    <div className="flex gap-0.5 items-end" title={label || `${value} of ${max}`}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <div key={n} style={{
          width: 3.5, height: 4 + n * 2.6,
          background: n <= value ? color : C.rule,
        }} />
      ))}
    </div>
  );
}

export function Meter({ value, max = 100, color = C.market, height = 6 }) {
  return (
    <div style={{ height, background: C.ruleSoft, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height, width: `${Math.max(0, Math.min(100, (value / max) * 100))}%`, background: color, borderRadius: 2 }} />
    </div>
  );
}

/* A stat tile is the right form when there is one number and no shape to show.
   Comparison value sits underneath in muted ink rather than a second colour. */
export function Stat({ label, value, compare, note, color = C.text, size = 22 }) {
  return (
    <Panel className="px-4 py-3">
      <div style={{ fontSize: 11.5, color: C.text2, minHeight: 30, lineHeight: 1.35 }}>{label}</div>
      <div style={{ fontFamily: mono, fontSize: size, color, marginTop: 6, fontWeight: 600 }}>{value}</div>
      {compare && (
        <div style={{ fontFamily: mono, fontSize: 10.5, color: C.text3, marginTop: 4 }}>{compare}</div>
      )}
      {note && <div style={{ fontSize: 10.5, color: C.text3, marginTop: 6 }}>{note}</div>}
    </Panel>
  );
}

const TREND_ICON = { up: ArrowUp, down: ArrowDown, flat: Minus };

/* Direction is icon + word, never colour alone. */
export function Trend({ dir, good, children }) {
  const Icon = TREND_ICON[dir] || Minus;
  const color = good === undefined ? C.text2 : good ? C.win : C.risk;
  return (
    <span className="inline-flex items-center gap-1" style={{ fontSize: 11.5, color }}>
      <Icon size={11} /> {children}
    </span>
  );
}

/* ============================ DISCLOSURE =============================== */

export function Collapse({ title, subtitle, children, open: initial = false, accent = C.rule, right }) {
  const [open, setOpen] = useState(initial);
  return (
    <div style={{ background: C.panel, borderLeft: `3px solid ${accent}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center gap-3"
        style={{ cursor: "pointer", background: "transparent" }}
        aria-expanded={open}
      >
        {open ? <ChevronDown size={15} color={C.text3} style={{ flexShrink: 0 }} />
              : <ChevronRight size={15} color={C.text3} style={{ flexShrink: 0 }} />}
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, color: C.text, fontWeight: 500 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11.5, color: C.text3, marginTop: 3 }}>{subtitle}</div>}
        </div>
        {right}
      </button>
      {open && <div className="px-4 pb-4" style={{ paddingLeft: 42 }}>{children}</div>}
    </div>
  );
}

/* Rows separated by a 1px rule of the page colour showing through — the same
   2px-gap idea as bar spacers, applied to a list. */
export function Stack({ children, gap = 1 }) {
  return <div className="flex flex-col" style={{ gap, background: C.ruleSoft }}>{children}</div>;
}

export function Empty({ children }) {
  return (
    <div className="px-4 py-10 text-center" style={{ background: C.panel, color: C.text2, fontSize: 13 }}>
      {children}
    </div>
  );
}

/* Shared recharts styling so every chart in the app reads as one system. */
export const axisTick = () => ({ fill: C.text3, fontSize: 10 });
export const tooltipStyle = () => ({
  contentStyle: {
    background: C.panel2, border: `1px solid ${C.rule}`,
    borderRadius: 4, fontSize: 12, color: C.text,
  },
  labelStyle: { color: C.text, fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: C.text2 },
  cursor: { fill: C.cursorFill },
});
