#!/bin/bash
# Prepares the video toolchain in a fresh Claude Code cloud session.
set -euo pipefail

cd "$(dirname "$0")/.."
(cd remotion && npm install --no-audit --no-fund)
npx -y hyperframes@0.8.175 browser ensure

# Last30Days: YouTube search/transcripts. X is intentionally not configured.
python3 -m pip install --user --quiet --upgrade yt-dlp
