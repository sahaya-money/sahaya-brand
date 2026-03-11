# @sahaya/brand

Canonical Sahaya brand assets — single source of truth for all Sahaya surfaces (website, Kaasu app, future products).

## Contents

| File | Purpose |
|------|---------|
| `tokens.css` | CSS custom properties (`--sahaya-*`) for all brand colors and fonts |
| `tokens.json` | Same values as JSON — for Tailwind config and JS consumption |
| `fonts.css` | Canonical Google Fonts import (Playfair Display, DM Mono, DM Sans, Noto Sans scripts) |
| `animations.css` | Keyframe animations and utility classes for all mark motion states |
| `assets/sahaya-mark.svg` | Canonical static Seed of Life SVG mark |
| `react/SahayaMark.tsx` | React 18 component with all motion states |

## Brand Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--sahaya-indigo` | `#13102B` | Background (dark mode), text (light mode) |
| `--sahaya-khadi` | `#F4EDD8` | Foreground (dark mode), background (light mode) |
| `--sahaya-saffron` | `#E07820` | Primary accent, interactive elements |
| `--sahaya-smoke` | `#6B6050` | Muted text, secondary labels |
| `--sahaya-copper` | `#8B5A34` | Tertiary accent |
| `--sahaya-vermillion` | `#C13527` | Destructive / recording states |
| `--sahaya-line` | `rgba(224, 120, 32, 0.18)` | Borders and dividers |

## Mark Geometry

Seed of Life — 7 equal circles (R=20) in a 100×100 viewBox:
- Center: (50, 50)
- Six outer centers at distance R=20 from center, 60° apart
- Clipped to r=46 bounding circle
- Outer boundary ring: r=46, strokeWidth=0.8, opacity=0.28
- Center dot: r=2.8, opacity=0.85

## Usage

### Static sites (CDN)

```html
<!-- Tokens -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sahaya-money/sahaya-brand@main/tokens.css">
<!-- Fonts -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sahaya-money/sahaya-brand@main/fonts.css">
<!-- Animations -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sahaya-money/sahaya-brand@main/animations.css">

<!-- SVG mark inline or as img -->
<img src="https://cdn.jsdelivr.net/gh/sahaya-money/sahaya-brand@main/assets/sahaya-mark.svg" width="56" height="56" alt="Sahaya">
```

### React app (local path or npm)

```tsx
// In tailwind.config.js — source colors from tokens.json
const tokens = require("./path/to/sahaya-brand/tokens.json");
// extend.colors.sahaya.saffron = tokens.color.saffron  etc.

// Import CSS in main entry
import "@sahaya/brand/tokens.css";
import "@sahaya/brand/animations.css";

// Use the React component
import { SahayaMark } from "@sahaya/brand/react/SahayaMark";

<SahayaMark size="md" motion="compass" />
<SahayaMark size="sm" motion="bloom" strokeColor="var(--sahaya-saffron)" />
```

## Motion States

| Class | Animation | Use case |
|-------|-----------|----------|
| `.sahaya-compass` | 22s linear rotation | LLM thinking / processing |
| `.sahaya-bloom` | 8.4s stroke-dashoffset cascade across 7 petals | Threshold moments / speaking |
| `.sahaya-breath` | 7s rotation swing (0° → 12° → -5° → 0°) | Idle / ambient |
| _(none)_ | Static | Decorative / loading placeholder |

## Current Consumers

| Product | Integration method |
|---------|-------------------|
| `kaasu` (React app) | Local copy — `ui/src/components/SahayaMark.tsx` mirrors `react/SahayaMark.tsx`; `ui/src/index.css` mirrors `animations.css`; `ui/tailwind.config.js` mirrors `tokens.json` |
| `sahaya-website` | Inline in `dev/index.html` and `dev/style.css` |

To update consumers after a brand change, sync the relevant files from this package.
