import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fontFamily } from "./theme";

const WORD = "ремонт";
const TYPE_START = 14;
const FRAMES_PER_CHAR = 4;

// Closing call to action: a comment card that types "ремонт", gets sent, and a pulsing arrow toward the comments button.
export const CtaOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const typed = Math.max(0, Math.min(WORD.length, Math.floor((frame - TYPE_START) / FRAMES_PER_CHAR)));
  const typedDone = TYPE_START + WORD.length * FRAMES_PER_CHAR;
  const send = spring({ frame: frame - typedDone - 6, fps, config: { damping: 10, stiffness: 200 } });
  const heart = spring({ frame: frame - typedDone - 10, fps, config: { damping: 7, stiffness: 160 } });
  const arrowIn = spring({ frame: frame - typedDone - 14, fps, config: { damping: 200 } });
  const pulse = 1 + 0.06 * Math.sin((frame / fps) * Math.PI * 4);
  const cursorOn = Math.floor(frame / 8) % 2 === 0 || typed < WORD.length;

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 70,
          right: 70,
          transform: `translateY(${interpolate(enter, [0, 1], [-260, 0])}px) scale(${1 + 0.04 * send - 0.04 * Math.min(1, send * 2) * (1 - send)})`,
          opacity: enter,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            display: "inline-block",
            background: colors.accent,
            color: colors.ink,
            fontWeight: 900,
            fontSize: 40,
            padding: "8px 22px",
            borderRadius: 12,
            marginBottom: 18,
          }}
        >
          НАПИШИ В КОММЕНТАРИЯХ
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            background: colors.white,
            borderRadius: 34,
            padding: "26px 30px",
            boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 46,
              flexShrink: 0,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.danger})`,
            }}
          />
          <div style={{ flex: 1, color: colors.ink, fontWeight: 800, fontSize: 76 }}>
            {WORD.slice(0, typed)}
            <span style={{ opacity: cursorOn ? 1 : 0, color: colors.danger }}>|</span>
          </div>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              background: colors.success,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${interpolate(send, [0, 1], [0.6, 1])})`,
              opacity: Math.min(1, send * 2),
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path d="M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z" fill={colors.white} />
            </svg>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -10,
            top: 60,
            fontSize: 90,
            transform: `scale(${heart}) translateY(${-40 * heart}px)`,
            opacity: Math.min(1, heart * 2),
          }}
        >
          <svg width="96" height="96" viewBox="0 0 24 24">
            <path
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21Z"
              fill={colors.danger}
            />
          </svg>
        </div>
      </div>

      <svg
        width="300"
        height="760"
        viewBox="0 0 300 760"
        style={{
          position: "absolute",
          right: 40,
          top: 640,
          opacity: arrowIn,
          transform: `scale(${pulse})`,
          transformOrigin: "80% 90%",
          filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.5))",
        }}
      >
        <path
          d="M60 20 C 40 260, 260 360, 220 680"
          stroke={colors.accent}
          strokeWidth={16}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={900}
          strokeDashoffset={900 * (1 - arrowIn)}
        />
        <path
          d="M160 620 L222 700 L276 612"
          stroke={colors.accent}
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={arrowIn > 0.85 ? 1 : 0}
        />
      </svg>
    </AbsoluteFill>
  );
};
