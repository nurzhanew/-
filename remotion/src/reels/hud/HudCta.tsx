import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../theme";
import { hud } from "./theme";

const WORD = "ремонт";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Closing terminal prompt: types "ремонт", shows a sent confirmation and an arrow to the comments button.
export const HudCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = spring({ frame, fps, config: { damping: 16, stiffness: 160 } });
  const typed = Math.max(0, Math.min(WORD.length, Math.floor((frame - 12) / 4)));
  const doneAt = 12 + WORD.length * 4;
  const sent = spring({ frame: frame - doneAt - 6, fps, config: { damping: 12 } });
  const arrow = interpolate(frame, [doneAt + 10, doneAt + 26], [0, 1], clamp);
  const blink = Math.floor(frame / 6) % 2 === 0;
  const pulse = 1 + 0.05 * Math.sin((frame / fps) * Math.PI * 4);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 180, left: 60, right: 60, background: hud.bg, border: `3px solid ${hud.line}`, borderRadius: 18, overflow: "hidden", transform: `scaleY(${open})`, transformOrigin: "top", boxShadow: `0 0 40px ${hud.line}55` }}>
        <div style={{ display: "flex", gap: 10, padding: "12px 18px", borderBottom: `2px solid ${hud.line}55` }}>
          {[hud.err, hud.warn, hud.ok].map((c) => (
            <div key={c} style={{ width: 20, height: 20, borderRadius: 10, background: c }} />
          ))}
          <div style={{ marginLeft: 14, fontFamily: hud.mono, fontSize: 28, color: hud.line }}>comments.sh</div>
        </div>
        <div style={{ padding: "22px 30px", fontFamily }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: hud.text }}>Напиши в комментариях:</div>
          <div style={{ fontFamily: hud.mono, fontSize: 92, fontWeight: 700, color: hud.ok, marginTop: 8 }}>
            {"> "}
            {WORD.slice(0, typed)}
            <span style={{ opacity: blink || typed < WORD.length ? 1 : 0 }}>▌</span>
          </div>
          <div style={{ fontFamily: hud.mono, fontSize: 34, color: hud.ok, opacity: sent, marginTop: 6 }}>✓ отправлено — разберём твою технику</div>
        </div>
      </div>

      <svg width="260" height="700" viewBox="0 0 260 700" style={{ position: "absolute", right: 40, top: 700, transform: `scale(${pulse})`, transformOrigin: "70% 95%", filter: `drop-shadow(0 0 14px ${hud.line})` }}>
        <path d="M60 10 C 30 250, 230 330, 190 640" stroke={hud.line} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray="12 18" strokeDashoffset={-frame * 2} opacity={arrow} />
        <path d="M130 590 L190 660 L240 585" stroke={hud.line} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={arrow > 0.9 ? 1 : 0} />
      </svg>
    </AbsoluteFill>
  );
};
