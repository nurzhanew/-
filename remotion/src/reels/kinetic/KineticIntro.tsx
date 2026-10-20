import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { colors, fontFamily } from "../theme";

const SHARDS = 5;

// Full-screen yellow title card that slams "НЕ / СПЕШИ" and then splits into diagonal shards to reveal the footage.
export const KineticIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const outStart = durationInFrames - 16;

  const ne = spring({ frame: frame - 1, fps, config: { damping: 12, stiffness: 220 } });
  const speshi = spring({ frame: frame - 6, fps, config: { damping: 12, stiffness: 200 } });
  const sub = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const shake = frame >= 6 && frame < 12 ? Math.sin(frame * 3.1) * 10 : 0;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <AbsoluteFill style={{ background: colors.accent, opacity: frame < outStart ? 1 : 0 }} />
      {Array.from({ length: SHARDS }).map((_, i) => {
        const out = interpolate(frame, [outStart + i * 2, outStart + i * 2 + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.in(Easing.cubic),
        });
        const h = 1920 / SHARDS;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -200,
              right: -200,
              top: i * h - 40,
              height: h + 80,
              background: i % 2 === 0 ? colors.accent : "#FFC800",
              transform: `skewY(-12deg) translateX(${(i % 2 === 0 ? -1 : 1) * 1500 * out}px)`,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(frame, [outStart, outStart + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateX(${shake}px)`,
        }}
      >
        <div style={{ fontSize: 300, fontWeight: 900, color: colors.ink, lineHeight: 0.9, transform: `scale(${interpolate(ne, [0, 1], [3, 1])})`, opacity: Math.min(1, ne * 3) }}>
          НЕ
        </div>
        <div style={{ fontSize: 205, fontWeight: 900, color: colors.ink, lineHeight: 0.95, letterSpacing: -4, transform: `scale(${interpolate(speshi, [0, 1], [3, 1])})`, opacity: Math.min(1, speshi * 3) }}>
          СПЕШИ
        </div>
        <div style={{ marginTop: 40, background: colors.ink, color: colors.accent, fontSize: 60, fontWeight: 800, padding: "14px 34px", borderRadius: 14, transform: `translateY(${interpolate(sub, [0, 1], [60, 0])}px)`, opacity: sub }}>
          покупать новый ноутбук
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
