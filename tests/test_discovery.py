import subprocess
import unittest
from unittest import mock

import helix.discovery as discovery
from helix.discovery import (
    HelixDiscoveryError,
    browse_services,
    discover_first_service,
    parse_browse_line,
    parse_resolve_line,
    resolve_service,
)


class TestDiscovery(unittest.TestCase):
    def test_parse_browse_line(self):
        line = "15:45:06.044  Add        2  14 local.               _stadiumserver._tcp. p35x1"
        parsed = parse_browse_line(line)
        self.assertEqual(
            parsed,
            {
                "action": "Add",
                "domain": "local.",
                "service_type": "_stadiumserver._tcp",
                "instance": "p35x1",
            },
        )

    def test_parse_resolve_line(self):
        line = "15:45:41.397  p35x1._stadiumserver._tcp.local. can be reached at p35x1.local.:2001 (interface 14)"
        parsed = parse_resolve_line(line)
        self.assertEqual(
            parsed,
            {
                "instance": "p35x1",
                "host": "p35x1.local",
                "port": 2001,
                "interface": 14,
            },
        )

    def test_browse_services_keeps_latest_adds(self):
        lines = [
            "15:45:06.044  Add        2  14 local.               _stadiumserver._tcp. p35x1",
            "15:45:06.045  Add        2  14 local.               _stadiumserver._tcp. p35x2",
            "15:45:06.046  Rmv        2  14 local.               _stadiumserver._tcp. p35x1",
        ]
        with mock.patch("helix.discovery._run_dns_sd", return_value=(lines, None)):
            services = browse_services(timeout=0.1)
        self.assertEqual(services, [{"action": "Add", "domain": "local.", "service_type": "_stadiumserver._tcp", "instance": "p35x2"}])

    def test_resolve_service(self):
        matched = {"instance": "p35x1", "host": "p35x1.local", "port": 2001, "interface": 14}
        with mock.patch("helix.discovery._run_dns_sd", return_value=([], matched)):
            service = resolve_service("p35x1", timeout=0.1)
        self.assertEqual(service.host, "p35x1.local")
        self.assertEqual(service.port, 2001)

    def test_resolve_service_raises_when_missing(self):
        with mock.patch("helix.discovery._run_dns_sd", return_value=([], None)):
            with self.assertRaises(HelixDiscoveryError):
                resolve_service("p35x1", timeout=0.1)

    def test_discover_first_service(self):
        with mock.patch("helix.discovery.browse_services", return_value=[{"instance": "p35x1"}]), \
            mock.patch("helix.discovery.resolve_service") as resolver:
            discover_first_service(timeout=0.1)
        resolver.assert_called_once_with("p35x1", timeout=0.1, service_type="_stadiumserver._tcp")


class TestParseEdgeCases(unittest.TestCase):
    def test_parse_browse_line_non_match(self):
        self.assertIsNone(parse_browse_line("garbage line"))

    def test_parse_browse_line_wrong_service_type(self):
        line = "15:45:06  Add 2 14 local.  _otherservice._tcp. host"
        self.assertIsNone(parse_browse_line(line))

    def test_parse_resolve_line_non_match(self):
        self.assertIsNone(parse_resolve_line("nothing useful here"))


class FakePopen:
    def __init__(self, lines, already_exited=True):
        self.stdout = iter(lines)
        self._poll = 0 if already_exited else None
        self.terminated = False
        self.killed = False

    def poll(self):
        return self._poll

    def terminate(self):
        self.terminated = True
        self._poll = 0

    def wait(self, timeout=None):
        return 0

    def kill(self):
        self.killed = True
        self._poll = -9


class TestRunDnsSd(unittest.TestCase):
    def _patch(self, popen):
        return (
            mock.patch.object(discovery, "_dns_sd_path", return_value="/bin/sh"),
            mock.patch.object(discovery.os.path, "exists", return_value=True),
            mock.patch.object(discovery.subprocess, "Popen", return_value=popen),
        )

    def test_reads_all_lines_without_match(self):
        proc = FakePopen(["one\n", "two\n"])
        a, b, c = self._patch(proc)
        with a, b, c:
            lines, matched = discovery._run_dns_sd(["-B", "x"], timeout=1.0)
        self.assertEqual(lines, ["one", "two"])
        self.assertIsNone(matched)

    def test_stops_on_match(self):
        proc = FakePopen(["skip\n", "HIT\n", "after\n"])
        a, b, c = self._patch(proc)
        with a, b, c:
            lines, matched = discovery._run_dns_sd(
                ["-L", "x"], timeout=1.0,
                stop_on_match=lambda line: line if line == "HIT" else None,
            )
        self.assertEqual(matched, "HIT")
        self.assertIn("HIT", lines)
        self.assertNotIn("after", lines)

    def test_raises_when_binary_missing(self):
        with mock.patch.object(discovery, "_dns_sd_path", return_value="/no/such/dns-sd"):
            with self.assertRaises(HelixDiscoveryError):
                discovery._run_dns_sd(["-B", "x"], timeout=0.1)

    def test_raises_when_popen_filenotfound(self):
        with mock.patch.object(discovery, "_dns_sd_path", return_value="/bin/sh"), \
             mock.patch.object(discovery.os.path, "exists", return_value=True), \
             mock.patch.object(discovery.subprocess, "Popen", side_effect=FileNotFoundError):
            with self.assertRaises(HelixDiscoveryError):
                discovery._run_dns_sd(["-B", "x"], timeout=0.1)

    def test_browse_services_end_to_end(self):
        line = "15:45:06.044  Add        2  14 local.               _stadiumserver._tcp. p35x1\n"
        proc = FakePopen([line])
        a, b, c = self._patch(proc)
        with a, b, c:
            services = browse_services(timeout=1.0)
        self.assertEqual(services[0]["instance"], "p35x1")

    def test_resolve_service_end_to_end(self):
        line = (
            "15:45:41.397  p35x1._stadiumserver._tcp.local. can be reached at "
            "p35x1.local.:2001 (interface 14)\n"
        )
        proc = FakePopen([line])
        a, b, c = self._patch(proc)
        with a, b, c:
            service = resolve_service("p35x1", timeout=1.0)
        self.assertEqual(service.host, "p35x1.local")
        self.assertEqual(service.port, 2001)


class TestTerminateProcess(unittest.TestCase):
    def test_kills_when_terminate_times_out(self):
        class Stubborn:
            def __init__(self):
                self.killed = False

            def poll(self):
                return None

            def terminate(self):
                pass

            def wait(self, timeout=None):
                if not self.killed:
                    raise subprocess.TimeoutExpired(cmd="dns-sd", timeout=timeout)
                return 0

            def kill(self):
                self.killed = True

        proc = Stubborn()
        discovery._terminate_process(proc)
        self.assertTrue(proc.killed)

    def test_noop_when_already_exited(self):
        proc = FakePopen([], already_exited=True)
        discovery._terminate_process(proc)
        self.assertFalse(proc.terminated)


class TestDiscoverFirstServiceEmpty(unittest.TestCase):
    def test_raises_when_no_services(self):
        with mock.patch.object(discovery, "browse_services", return_value=[]):
            with self.assertRaises(HelixDiscoveryError):
                discover_first_service(timeout=0.1)


if __name__ == "__main__":
    unittest.main()
