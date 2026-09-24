# Bharat 2047 Radar

Strategy intelligence prototype — national agenda to opportunity.

**Live:** https://bbm-mbr.github.io/viksit_bharat-dashboard/

## What this is

A working prototype that reads **outside-in**: the national agenda first, commercial
relevance derived from it. The navigation carries that argument — the rail runs
India → what is moving → so what, so an opportunity is never reached without
passing the national problem statement it answers to.

24 screens in seven groups. **Simple mode** (the default) shows the eight screens
that carry the whole argument; **Full** adds the reference and method screens behind
them.

| Group | Screens |
|---|---|
| Start | How to use this board |
| India | Picture of Future · Design principles · Priority sectors |
| The world | Tailwinds & headwinds · Connect the dots |
| What is moving | Signal feed · Policy intelligence · Scenarios & trajectory · Forecast validation · KPI cockpit |
| So what | Opportunity map · Capability build · Risk register · Portfolio & adjacency · Nation building · Ecosystem & deals · Move board |
| Research base | Ministry problems (80) · Thesis bank (75) |
| System | Data lake · Six-hat debate · Ask the radar · Sources & method |

## Reading it

Start on **How to use this**. It offers three reading paths — 5 minutes, 20 minutes,
or an hour — and names the single finding worth carrying out of the application if
nothing else survives.

Five rules apply everywhere:

1. Read the "so what", not the number. A panel without one is reference material.
2. Check the provenance tag: `sourced` / `briefed` / `illustrative`.
3. Leading indicators are for deciding; lagging indicators are for reporting.
4. The year strip at the top filters the whole board.
5. Where the six hats do not converge, the open question is the finding.

## Provenance — read before using anything here

Every record carries a tag:

- **sourced** — checked against a primary or major secondary source
- **briefed** — supplied from NITI Aayog and national-source material
- **illustrative** — plausible mock content, present so the structure can be
  reviewed. **Must not enter a plan without verification.**

The 80 ministry problem statements carry their own audit flags from the source
workbook; 23 are marked FACT-CHECK FLAG and are research propositions, not verified
facts. NITI scenario values for 2050 and 2070 are directional model outputs, not
official targets.

This is a prototype for structure and interaction review. It is not a validated
market view or an investment recommendation.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Deployment

Pushes to `main` build and publish to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The `base` path in
`vite.config.js` must match the repository name.

## Structure

```
src/
  Bharat2047Radar.jsx     shell: navigation, theme, horizon spine, density toggle
  radar/
    theme.js              design tokens; light and dark palettes
    ui.jsx                shared atoms, including the SoWhat component
    data.js               pillars, sectors, principles, signals, policy, scenarios
    kpis.js               81 indicators, leading/lagging, mapped to policy
    global.js             external forces and transmission chains
    datalake.js           source taxonomy, pipeline, guardrails, sustainability
    hats.js               six-hat agents, debates, scenario stances
    workbook.js           80 ministry problem statements (generated)
    thesis.js             75 research topics (generated)
    views-*.jsx           one file per group of screens
```

`workbook.js` and `thesis.js` are generated from source documents. Regenerate them
rather than hand-editing, so the audit trail holds.

## Accessibility

Both light and dark themes ship. The categorical chart palette is validated for
lightness band, chroma floor, colour-vision separation and contrast against each
theme's surface. Colour never carries meaning alone — every coded mark is paired
with a text label.
