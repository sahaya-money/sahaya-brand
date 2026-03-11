import { useId } from "react";

// ============================================================
// SahayaMark — Canonical Sahaya brand mark (React component)
// ============================================================
// Full form: Seed of Life — 7 equal-radius circles (R=20) in a
// 100×100 viewBox. Center at (50,50); six outer circles each
// offset by exactly one radius at 60-degree intervals. Clipped
// to r=46 bounding circle. Outer boundary ring at r=46.
//
// Reduced form: 4 concentric rings at radii 44/32/20/8.
// Used at xs/sm sizes — readable at 16px.
//
// Motion states:
//   compass — 22s linear rotation (LLM thinking)
//   bloom   — stroke-dashoffset cascade across 7 petals (8.4s)
//   breath  — gentle 7s rotation swing (idle / ambient)
//   none    — static
//
// Requires animations.css to be loaded (or the equivalent
// keyframe definitions) for motion states to take effect.
// ============================================================

export interface SahayaMarkProps {
  size: "xs" | "sm" | "md" | "lg";
  motion: "compass" | "bloom" | "breath" | "none";
  strokeColor?: string;
  variant?: "full" | "reduced";
  className?: string;
}

const SIZE_MAP = { xs: 16, sm: 24, md: 56, lg: 96 } as const;

const MOTION_CLASS = {
  compass: "sahaya-compass",
  bloom:   "sahaya-bloom",
  breath:  "sahaya-breath",
  none:    "",
} as const;

// --- Full form: canonical Seed of Life geometry ---
// 7 equal circles, R=20, in a 100×100 viewBox.
// Six outer centers are each at distance R from (50,50), 60° apart.
const SEED_R = 20;
const SEED_CIRCLES = [
  { cx: 50,    cy: 50    }, // center
  { cx: 70,    cy: 50    }, // right  (0°)
  { cx: 60,    cy: 32.68 }, // upper-right (60°)
  { cx: 40,    cy: 32.68 }, // upper-left  (120°)
  { cx: 30,    cy: 50    }, // left   (180°)
  { cx: 40,    cy: 67.32 }, // lower-left  (240°)
  { cx: 60,    cy: 67.32 }, // lower-right (300°)
] as const;

const CLIP_R = 46;

// --- Reduced form: 4 concentric rings ---
const REDUCED_RINGS = [44, 32, 20, 8] as const;

export function SahayaMark({
  size,
  motion,
  strokeColor = "#E07820",
  variant: variantProp,
  className = "",
}: SahayaMarkProps) {
  // xs/sm default to reduced, md/lg default to full
  const variant = variantProp ?? (size === "xs" || size === "sm" ? "reduced" : "full");
  const px = SIZE_MAP[size];
  const motionClass = MOTION_CLASS[motion];

  // Unique clipPath ID per instance (React 18 useId)
  const rawId = useId();
  const clipId = `smc-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={px}
      height={px}
      fill="none"
      className={`flex-shrink-0 ${motionClass} ${className}`.trim()}
      aria-hidden="true"
      style={{ transformOrigin: "50% 50%" }}
    >
      {variant === "full" ? (
        <>
          <defs>
            <clipPath id={clipId}>
              <circle cx="50" cy="50" r={CLIP_R} />
            </clipPath>
          </defs>
          {/* Seven interlocking circles — clipped to bounding circle.
              pathLength="1" + strokeDasharray="1" enables the bloom
              animation to use normalized offsets (0=visible, 1=hidden). */}
          <g clipPath={`url(#${clipId})`} stroke={strokeColor} strokeWidth="1.3" fill="none">
            {SEED_CIRCLES.map(({ cx, cy }, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={SEED_R}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="0"
              />
            ))}
          </g>
          {/* Outer boundary ring */}
          <circle cx="50" cy="50" r={CLIP_R} stroke={strokeColor} strokeWidth="0.8" opacity={0.28} />
          {/* Center dot — grounding point */}
          <circle cx="50" cy="50" r={2.8} fill={strokeColor} stroke="none" opacity={0.85} />
        </>
      ) : (
        // Reduced: 4 concentric rings + center dot
        <>
          <g stroke={strokeColor} strokeWidth="1.3" fill="none">
            {REDUCED_RINGS.map((r, i) => (
              <circle
                key={r}
                cx="50"
                cy="50"
                r={r}
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="0"
                opacity={0.6 + (i / (REDUCED_RINGS.length - 1)) * 0.35}
              />
            ))}
          </g>
          <circle cx="50" cy="50" r={2.5} fill={strokeColor} stroke="none" opacity={1} />
        </>
      )}
    </svg>
  );
}
