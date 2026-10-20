import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fontFamily } from "./theme";

const WORDS = ["НЕ", "СПЕШИ"];

// Opening hook: "СТОП" stamp, "НЕ СПЕШИ" and a highlighted subline, in the top band above the face.
export const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stamp = spring({ frame: frame - 2, fps, config: { damping: 9, stiffness: 180 } });
  const bar = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const sub = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${-140 * exit}px)`,
          opacity: 1 - exit,
        }}
      >
        <div
          style={{
            background: colors.danger,
            color: colors.white,
            fontWeight: 900,
            fontSize: 44,
            letterSpacing: 6,
            padding: "10px 28px",
            borderRadius: 14,
            border: `5px solid ${colors.white}`,
            transform: `rotate(${-8 + 2 * stamp}deg) scale(${interpolate(stamp, [0, 1], [2.4, 1])})`,
            opacity: Math.min(1, stamp * 2),
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
          }}
        >
          СТОП
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: 26 }}>
          {WORDS.map((w, i) => {
            const p = spring({ frame: frame - 6 - i * 5, fps, config: { damping: 14, stiffness: 160 } });
            return (
              <div key={w} style={{ overflow: "hidden", padding: "0 6px" }}>
                <div
                  style={{
                    color: colors.white,
                    fontWeight: 900,
                    fontSize: 150,
                    lineHeight: 1.05,
                    transform: `translateY(${interpolate(p, [0, 1], [170, 0])}px)`,
                    textShadow: "0 8px 28px rgba(0,0,0,0.55)",
                  }}
                >
                  {w}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ position: "relative", marginTop: 14, padding: "8px 24px" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: colors.accent,
              borderRadius: 12,
              transformOrigin: "left center",
              transform: `scaleX(${bar})`,
            }}
          />
          <div
            style={{
              position: "relative",
              color: colors.ink,
              fontWeight: 800,
              fontSize: 58,
              opacity: sub,
              transform: `translateY(${interpolate(sub, [0, 1], [20, 0])}px)`,
            }}
          >
            покупать новый ноутбук
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
