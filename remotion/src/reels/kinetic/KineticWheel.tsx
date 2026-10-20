import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { colors, fontFamily } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Full-screen analogy scene: a line-art car draws itself, the front tire goes flat, then "колесо ≠ новая машина".
export const KineticWheel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = interpolate(frame, [0, 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const draw = interpolate(frame, [4, 30], [1, 0], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const flat = spring({ frame: frame - 26, fps, config: { damping: 8, stiffness: 160 } });
  const word1 = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  const cross = interpolate(frame, [56, 64], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const fix = spring({ frame: frame - 62, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ fontFamily, clipPath: `inset(${100 * exit}% 0 0 0)` }}>
      <AbsoluteFill style={{ background: colors.ink, clipPath: `circle(${150 * enter}% at 50% 40%)` }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="rgba(255,255,255,0.08)" />
            </pattern>
          </defs>
          <rect width="1080" height="1920" fill="url(#dots)" />
          <g transform="translate(140 520)" fill="none" stroke={colors.white} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 260 L40 180 Q60 120 160 110 L280 40 Q330 10 420 10 L560 10 Q640 10 700 80 L760 140 Q800 150 800 200 L800 260" strokeDasharray="1600" strokeDashoffset={1600 * draw} />
            <path d="M330 30 L330 130 M560 20 L600 130 L180 130" strokeDasharray="700" strokeDashoffset={700 * draw} />
            <line x1="40" y1="260" x2="800" y2="260" strokeDasharray="800" strokeDashoffset={800 * draw} />
            <g transform="translate(200 270)">
              <ellipse cx="0" cy={8 * flat} rx={70 + 22 * flat} ry={70 - 26 * flat} stroke={colors.danger} />
              <circle cx="0" cy={8 * flat} r="22" stroke={colors.danger} />
            </g>
            <g transform="translate(640 270)">
              <circle cx="0" cy="0" r="70" />
              <circle cx="0" cy="0" r="22" />
            </g>
          </g>
          <g opacity={flat} transform="translate(340 930)">
            <path d="M0 0 l26 -60 l26 60 z" fill={colors.danger} />
            <rect x="22" y="-40" width="8" height="24" fill={colors.white} />
            <circle cx="26" cy="-8" r="5" fill={colors.white} />
          </g>
        </svg>

        <div style={{ position: "absolute", top: 1010, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: colors.white, opacity: word1, transform: `translateY(${interpolate(word1, [0, 1], [50, 0])}px)` }}>
            СПУСТИЛО КОЛЕСО?
          </div>
          <div>
          <div style={{ position: "relative", display: "inline-block", marginTop: 26, fontSize: 82, fontWeight: 800, color: "rgba(255,255,255,0.6)", opacity: word1 }}>
            новая машина
            <div style={{ position: "absolute", left: -10, right: -10, top: "52%", height: 12, background: colors.danger, borderRadius: 6, transformOrigin: "left", transform: `scaleX(${cross})` }} />
          </div>
          </div>
          <div>
          <div style={{ marginTop: 26, display: "inline-flex", fontSize: 82, fontWeight: 900, background: colors.accent, color: colors.ink, padding: "8px 30px", borderRadius: 16, transform: `scale(${fix})` }}>
            просто ремонт
          </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
