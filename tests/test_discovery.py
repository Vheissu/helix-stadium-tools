import unittest
from unittest import mock

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


if __name__ == "__main__":
    unittest.main()
