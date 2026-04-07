#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_APP="/Applications/Line6/Helix Stadium.app"
TRACE_DIR="${TRACE_DIR:-/tmp/helix-socket-trace}"
TRACE_APP_DIR="${TRACE_APP_DIR:-$TRACE_DIR/Helix Stadium Traced.app}"
TRACE_LIB="${TRACE_LIB:-$TRACE_DIR/socket_trace_interpose.dylib}"
TRACE_LOG="${TRACE_LOG:-$TRACE_DIR/helix_socket_trace.log}"
APP_BIN="$TRACE_APP_DIR/Contents/MacOS/Helix Stadium"

mkdir -p "$TRACE_DIR"

echo "Building interposer: $TRACE_LIB"
clang \
  -dynamiclib \
  -fPIC \
  -O2 \
  -Wall \
  -Wextra \
  -o "$TRACE_LIB" \
  "$ROOT_DIR/scripts/socket_trace_interpose.c"

echo "Refreshing traced app copy: $TRACE_APP_DIR"
rm -rf "$TRACE_APP_DIR"
cp -R "$SRC_APP" "$TRACE_APP_DIR"

echo "Ad-hoc signing traced app copy"
codesign --force --deep --sign - "$TRACE_APP_DIR" >/dev/null

rm -f "$TRACE_LOG"
touch "$TRACE_LOG"

echo "Launching traced app"
echo "  app:  $TRACE_APP_DIR"
echo "  log:  $TRACE_LOG"
echo "  dylib:$TRACE_LIB"

HELIX_SOCKET_TRACE_LOG="$TRACE_LOG" \
DYLD_INSERT_LIBRARIES="$TRACE_LIB" \
"$APP_BIN" >/dev/null 2>&1 &

APP_PID=$!
echo "PID=$APP_PID"
echo "Use 'tail -f \"$TRACE_LOG\"' to inspect the network trace."
