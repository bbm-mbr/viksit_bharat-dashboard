/* ============================================================================
   Design tokens. Two palettes on identical token names.

   `C` is a single live object: switching theme rewrites its properties, and
   because every component reads `C.x` during render, one re-render repaints the
   whole app. The one rule this imposes: no module-level constant may capture a
   `C` value — store a token NAME and resolve at render time instead.
   ========================================================================== */

export const THEMES = {
  dark: {
    ink: "#0D1520",
    panel: "#141E2B",
    panel2: "#1B2836",
    panel3: "#22303F",
    rule: "#253444",
    ruleSoft: "#1D2A38",
    text: "#E6EDF4",
    text2: "#93A6B8",
    text3: "#5F7185",
    // Signal coding — colour carries category, never decoration.
    // Snapped to OKLCH L 0.615 at the original hue angles; passes the
    // lightness-band, chroma-floor, CVD and contrast checks against #141E2B.
    gazette: "#B27700",    // statutory / gazette / notification
    scenario: "#5F7AEA",   // model, scenario, projection
    market: "#059A85",     // market, ecosystem, deal
    risk: "#D85056",       // risk, sunset, exposure
    win: "#4F9E52",        // in force / secured
    nation: "#AB5FC8",     // national agenda / non-monetary
    onAccent: "#FFFFFF",
    scrim: "rgba(6,10,16,0.7)",
    cursorFill: "rgba(255,255,255,0.04)",
  },
  light: {
    ink: "#F1F4F7",
    panel: "#FFFFFF",
    panel2: "#E8EDF3",
    panel3: "#DCE4EC",
    rule: "#C4D0DC",
    ruleSoft: "#DDE4EC",
    text: "#111C28",
    text2: "#4A5D71",
    text3: "#78899C",
    // Same hue angles snapped to OKLCH L 0.545, validated against #FFFFFF.
    gazette: "#966504",
    scenario: "#4C64D2",
    market: "#008371",
    risk: "#BF3942",
    win: "#3E7F41",
    nation: "#9549B1",
    onAccent: "#FFFFFF",
    scrim: "rgba(17,28,40,0.42)",
    cursorFill: "rgba(17,28,40,0.05)",
  },
};

export const C = { ...THEMES.dark };

export const applyTheme = (name) => Object.assign(C, THEMES[name]);

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;
export const sans = "'Archivo', 'Helvetica Neue', Arial, sans-serif";
export const mono = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

/* Resolve a token name to its current value. Use this anywhere a colour has to
   survive a theme switch but is stored in data. */
export const tone = (key) => C[key] || C.text3;
