#!/usr/bin/env bash
# Desktop/andm-ui の main から Gallery を 0.0.0.0:4180 で起動する。
#
# 使い方:
#   ./scripts/serve-gallery-local.sh           # フォアグラウンド（ターミナルを閉じると止まる）
#   ./scripts/serve-gallery-local.sh --daemon  # バックグラウンド（ログアウト以外は生き残る）
#
# URL: http://127.0.0.1:4180/gallery/
#
# 注意: macOS の LaunchAgents から Desktop 配下を読むと権限待ちで固まることがあるため、
# 永続化は --daemon（ダブルフォーク）を使う。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DAEMON=0
if [[ "${1:-}" == "--daemon" ]]; then
  DAEMON=1
fi

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

LOG_DIR="${HOME}/Library/Logs/andm-ui-gallery"
mkdir -p "$LOG_DIR"
NODE_BIN="$(command -v node)"

if [[ "$DAEMON" -eq 1 ]]; then
  echo "Gallery をデーモン起動します → http://127.0.0.1:4180/gallery/"
  echo "ログ: $LOG_DIR/stdout.log"
  python3 - "$NODE_BIN" "$ROOT/scripts/gallery.mjs" "$ROOT" "$LOG_DIR" <<'PY'
import os, sys, time
node, script, root, log_dir = sys.argv[1:5]
out = os.path.join(log_dir, "stdout.log")
err = os.path.join(log_dir, "stderr.log")
pidfile = os.path.join(log_dir, "gallery.pid")
if os.fork() > 0:
    time.sleep(0.4)
    sys.exit(0)
os.setsid()
if os.fork() > 0:
    sys.exit(0)
os.chdir(root)
os.umask(0)
si = open(os.devnull, "rb")
so = open(out, "ab", buffering=0)
se = open(err, "ab", buffering=0)
os.dup2(si.fileno(), 0)
os.dup2(so.fileno(), 1)
os.dup2(se.fileno(), 2)
with open(pidfile, "w") as f:
    f.write(str(os.getpid()))
os.execv(node, [node, script])
PY
  sleep 1
  if lsof -nP -iTCP:4180 -sTCP:LISTEN >/dev/null 2>&1; then
    echo "OK: $(lsof -nP -iTCP:4180 -sTCP:LISTEN | awk 'NR==2{print}')"
    curl -sS -o /dev/null -w "HTTP %{http_code} http://127.0.0.1:4180/gallery/\n" http://127.0.0.1:4180/gallery/
  else
    echo "起動に失敗しました。$LOG_DIR/stderr.log を確認してください。" >&2
    exit 1
  fi
  exit 0
fi

echo "Gallery 起動（フォアグラウンド）: http://127.0.0.1:4180/gallery/"
exec npm run gallery
