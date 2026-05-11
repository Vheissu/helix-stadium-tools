import unittest

from helix.matrix_mixer import apply_matrix_mixer_event, parse_matrix_mixer_state


class TestMatrixMixer(unittest.TestCase):
    def test_parse_matrix_mixer_property_value(self):
        decoded_property = {
            "key_": "server.mixer.state",
            "type": "v",
            "val_": {
                "aout": 2,
                "lyrs": [
                    {
                        "chns": [
                            {"chnl": 2, "vol": -12.5, "pan": 0.25, "mute": 0, "solo": 1},
                            {"chnl": 1, "vol": 0.000337966, "pan": 0, "mute": 1, "solo": 0},
                        ],
                    },
                    {"chns": []},
                    {"chns": []},
                ],
            },
        }

        state = parse_matrix_mixer_state(decoded_property)

        self.assertEqual(state["attached_layer"], 2)
        self.assertEqual([layer["label"] for layer in state["layers"]], ['1/4"', "XLR", "Phones"])
        self.assertEqual([channel["id"] for channel in state["layers"][0]["channels"]], [1, 2])
        self.assertEqual(state["layers"][0]["channels"][0]["label"], "Path 1A")
        self.assertAlmostEqual(state["layers"][0]["channels"][1]["volume_db"], -12.5)
        self.assertTrue(state["layers"][0]["channels"][0]["mute"])
        self.assertTrue(state["layers"][0]["channels"][1]["solo"])

    def test_apply_matrix_mixer_events(self):
        state = parse_matrix_mixer_state({"lyrs": [{"chns": [{"chnl": 1, "vol": 0, "pan": 0}]}]})

        state = apply_matrix_mixer_event(state, "/syncMixAttachedOut", [10, 20, 3])
        state = apply_matrix_mixer_event(state, "/syncMixChannelVolume", [10, 21, 3, 18, -24.0])
        state = apply_matrix_mixer_event(state, "/syncMixChannelPan", [10, 22, 3, 18, -0.65])
        state = apply_matrix_mixer_event(state, "/syncMixChannelMute", [10, 23, 3, 18, 1])
        state = apply_matrix_mixer_event(state, "/syncMixChannelSolo", [10, 24, 3, 18, 0])

        self.assertEqual(state["attached_layer"], 3)
        phones = next(layer for layer in state["layers"] if layer["id"] == 3)
        bluetooth = next(channel for channel in phones["channels"] if channel["id"] == 18)
        self.assertEqual(bluetooth["label"], "Bluetooth")
        self.assertEqual(bluetooth["volume_db"], -24.0)
        self.assertEqual(bluetooth["pan"], -0.65)
        self.assertTrue(bluetooth["mute"])
        self.assertFalse(bluetooth["solo"])

    def test_parse_live_grouped_matrix_property_shape(self):
        state = parse_matrix_mixer_state(
            {
                "val_": {
                    "atto": 1,
                    "lyrs": [
                        {
                            "out_": {"dst_": 1, "name": '1/4"'},
                            "home": {
                                "chan": [
                                    {"src_": 1, "name": "Path 1A", "vol_": 0.0, "pan_": 0.0},
                                ],
                                "mix_": {
                                    "src_": 5,
                                    "name": "Paths",
                                    "vol_": -15.519854545593262,
                                    "pan_": 0.0,
                                    "mute": False,
                                    "solo": False,
                                },
                            },
                            "song": {"chan": [], "mix_": {"src_": 14, "name": "Song", "vol_": 0.0}},
                            "clik": {"src_": 15, "name": "Click", "vol_": 0.0},
                            "cntn": {"src_": 16, "name": "Count", "vol_": 0.0},
                            "usbn": {"src_": 17, "name": "USB 1/2", "vol_": 0.0},
                            "bt__": {"src_": 18, "name": "Bluetooth", "vol_": 0.0},
                            "auxn": {"src_": 19, "name": "AUX In", "vol_": 0.0},
                            "nxus": [{"src_": 20, "name": "Nexus 1", "vol_": 0.0}],
                        }
                    ],
                }
            }
        )

        self.assertEqual(state["attached_layer"], 1)
        self.assertEqual(state["layers"][0]["label"], '1/4"')
        paths = next(channel for channel in state["layers"][0]["channels"] if channel["id"] == 5)
        self.assertEqual(paths["label"], "Paths")
        self.assertEqual(paths["pan"], 0.0)
        self.assertAlmostEqual(paths["volume_db"], -15.519854545593262)

    def test_ignores_unrelated_event(self):
        state = {"attached_layer": 1, "layers": []}
        self.assertIs(apply_matrix_mixer_event(state, "/heartbeat", []), state)


if __name__ == "__main__":
    unittest.main()
