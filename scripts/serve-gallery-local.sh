#!/usr/bin/env bash
# Desktop/andm-ui の main から Gallery を 4180 で起動する。
# 使い方: ./scripts/serve-gallery-local.sh
# URL: http://127.0.0.1:4180/gallery/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$branch" != "main" ]]; then
  echo "エラー: main ブランチで実行してください（現在: $branch）" >&2
  echo "  cd \"$ROOT\" && git checkout main && git pull --ff-only" >&2
  exit 1
fi

git fetch origin main
git pull --ff-only origin main

if pids="$(lsof -tiTCP:4180 -sTCP:LISTEN 2>/dev/null || true)" && [[ -n "$pids" ]]; then
  echo "既存の 4180 プロセスを停止します: $pids"
  # shellcheck disable=SC2086
  kill $pids 2>/dev/null || true
  sleep 0.5
fi

echo "Gallery 起動: http://127.0.0.1:4180/gallery/"
exec npm run gallery
