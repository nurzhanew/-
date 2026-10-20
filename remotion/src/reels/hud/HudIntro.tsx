import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { fontFamily } from "../theme";
import { hud } from "./theme";

const LINES = ["> ACADEMY.SERVICE boot", "> scan: laptop ........ ", "> scan: printer ....... ", "> verdict:"];
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Boot-sequence terminal followed by a warning dialog: "НЕ СПЕШИ покупать новый ноутбук".
export const HudIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const exit = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], clamp);
  const term = interpolate(frame, [0, 6], [0, 1], clamp);
  const dialog = spring({ frame: frame - 26, fps, config: { damping: 11, stiffness: 200 } });
  const blink = Math.floor(frame / 5) % 2 === 0;

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div style={{ position: "absolute", top: 180, left: 60, right: 60, background: hud.bg, border: `3px solid ${hud.line}`, borderRadius: 18, padding: "26px 32px", fontFamily: hud.mono, fontSize: 40, color: hud.line, opacity: term, transform: `scaleY(${term})`, transformOrigin: "top", boxShadow: `0 0 40px ${hud.line}55` }}>
        {LINES.map((l, i) => {
          const start = 3 + i * 6;
          const chars = Math.max(0, Math.min(l.length, Math.floor((frame - start) * 4)));
          const status = i === 1 || i === 2 ? (frame > start + 8 ? "OK" : "") : "";
          return (
            <div key={l} style={{ whiteSpace: "pre", lineHeight: 1.5 }}>
              {l.slice(0, chars)}
              <span style={{ color: hud.ok }}>{status}</span>
              {i === LINES.length - 1 && frame > start + 6 ? <span style={{ color: hud.warn }}> REPAIR, NOT REPLACE{blink ? "_" : " "}</span> : null}
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 900, left: 90, right: 90, background: "#0E141B", border: `4px solid ${hud.err}`, borderRadius: 22, overflow: "hidden", transform: `scale(${interpolate(dialog, [0, 1], [0.4, 1])})`, opacity: Math.min(1, dialog * 2), boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 50px ${hud.err}66`, fontFamily }}>
        <div style={{ background: hud.err, color: "#fff", fontWeight: 900, fontSize: 36, padding: "10px 24px", letterSpacing: 2 }}>⚠ ВНИМАНИЕ</div>
        <div style={{ padding: "26px 30px", color: hud.text }}>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 1 }}>НЕ СПЕШИ</div>
          <div style={{ fontSize: 50, fontWeight: 800, marginTop: 12, color: hud.warn }}>покупать новый ноутбук</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
