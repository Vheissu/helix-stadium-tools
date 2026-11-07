#!/bin/sh
set -eu
module_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
core_dir="$module_dir/android/src/main/cpp"
test_binary=$(mktemp /tmp/helyon-usb-stack.XXXXXX)
trap 'rm -f "$test_binary"' EXIT
cc -DUSB_STACK_EXTERNAL_CLOCK -std=gnu11 -O1 -g -fsanitize=address,undefined -I"$core_dir" -I"$core_dir/vendor/lwip/src/include" \
  "$core_dir"/vendor/lwip/src/core/*.c "$core_dir"/vendor/lwip/src/core/ipv6/*.c \
  "$core_dir/vendor/lwip/src/netif/ethernet.c" "$core_dir/usb_stack.c" "$module_dir/tests/stack_integration.c" -o "$test_binary"
"$test_binary"
DROP_SYN=1 "$test_binary"
SOLICITED_RA=1 "$test_binary"
SLOW_RA=1 DROP_INITIAL_RS=1 "$test_binary"
NO_RA=1 EXPECT_ERROR="USB network did not become ready" "$test_binary"
NO_TCP=1 EXPECT_ERROR="did not accept the connection" "$test_binary"
