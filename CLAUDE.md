# Video workspace

Two video frameworks live side by side and are combined through rendered clips.

- `remotion/` — Remotion (React) project. Skills: `remotion-*`.
- `hyperframes/` — HyperFrames (HTML + GSAP) project. Skills: `hyperframes*` and the workflow skills.
- `.claude/skills/` also carries the superpowers skills.

## Setup

In a fresh session run `scripts/session-setup.sh` before rendering: it installs Remotion
dependencies and the HyperFrames render browser.

## How they combine

HyperFrames is the final timeline. Remotion renders pieces that suit React well
(data-driven scenes, reusable components, captions) into `hyperframes/assets/`,
and `hyperframes/index.html` places them as `<video>` clips next to its own
HTML/GSAP scenes.

1. `cd remotion && npm run render:hf` — renders the Remotion clip into `hyperframes/assets/remotion-intro.mp4`.
2. `cd hyperframes && npm run check && npm run render` — validates and renders the final MP4 into `hyperframes/renders/`.

Add more Remotion clips the same way: one `npx remotion render <Composition> ../hyperframes/assets/<name>.mp4`
per clip, then one `<video>` with `id`, `data-start`, `data-duration` and `data-track-index` in `index.html`.
For overlays with transparency, render from Remotion with `--codec=prores --prores-profile=4444` or as WebM (VP9) with an alpha channel.

## Cloud session notes

- `cdn.jsdelivr.net` may be blocked by the environment's network policy, so HyperFrames compositions load GSAP from `hyperframes/vendor/gsap.min.js`, not the CDN. Keep new compositions on the local copy.
- Remotion cannot download its browser here; `remotion/remotion.config.ts` uses the preinstalled headless shell when it exists.
- Remotion is free for individuals and teams of up to 3; larger companies need a license (remotion.pro/license).

## Research (Last30Days + Firecrawl)

- `last30days` skill lives in `.claude/skills/last30days`. Sources used here: Reddit, Hacker News, Polymarket, GitHub, YouTube (yt-dlp from `scripts/session-setup.sh`).
- X/Twitter is deliberately off: no browser cookies, no X API keys. Run research with `--no-browser-cookies` and don't offer X setup.
- Firecrawl comes from the user's claude.ai connector (`https://mcp.firecrawl.dev/v2/mcp-oauth`), not from a local MCP config.
- These need the environment's network access set to Full (or the source hosts allowed).
