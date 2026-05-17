import unittest

from scripts.generate_helix_gpt_knowledge import (
    build_minimal_upload_documents,
    build_upload_documents,
    classify_group,
    format_param_line,
    render_knowledge_document,
    render_project_instructions_document,
)


class TestGenerateHelixGptKnowledge(unittest.TestCase):
    def test_classify_group_routes_models_to_expected_docs(self):
        self.assertEqual(
            classify_group("HD2_AmpFoo", {"category": "amp"}, {"class": "Guitar"}),
            "guitar-amps-and-preamps",
        )
        self.assertEqual(
            classify_group("HD2_DelayFoo", {"category": "delay"}, {"class": None}),
            "effects-delay",
        )
        self.assertEqual(
            classify_group("HD2_IR", {"category": "ir"}, {"class": "IR"}),
            "ir-cabs",
        )

    def test_format_param_line_includes_discrete_values_and_defaults(self):
        line = format_param_line(
            {
                "id": 7,
                "key": "Bright",
                "name": "Bright",
                "type": "b",
                "min": False,
                "max": True,
                "def": True,
                "display_min": False,
                "display_max": True,
                "display_def": True,
                "unit": "unitless",
                "options": ["Off", "On"],
                "description": "Turns the bright switch on or off.",
            }
        )

        self.assertIn("valid values `Off`, `On`", line)
        self.assertIn("default `On`", line)
        self.assertIn("Raw range `Off` to `On`", line)

    def test_render_knowledge_document_renders_model_metadata_and_parameters(self):
        document = render_knowledge_document(
            "Effects: delay",
            "Delay effect blocks extracted from the app bundle.",
            [
                {
                    "key": "HD2_DelaySimple",
                    "id": 123,
                    "name": "Simple Delay",
                    "type": "Delay",
                    "category": "delay",
                    "class": None,
                    "usage": 3.2,
                    "is_agoura": False,
                    "based_on": "Line 6 Original",
                    "params": [
                        {
                            "id": 1,
                            "key": "Time",
                            "name": "Time",
                            "type": "f",
                            "min": 0,
                            "max": 1,
                            "def": 0.25,
                            "display_min": 0,
                            "display_max": 1000,
                            "display_def": 250,
                            "unit": "ms",
                            "options": None,
                            "description": "Sets the delay time.",
                        }
                    ],
                }
            ],
            "2026-04-20T00:00:00+00:00",
        )

        self.assertIn("# Effects: delay", document)
        self.assertIn("## Simple Delay", document)
        self.assertIn("- Model key: `HD2_DelaySimple`", document)
        self.assertIn("- DSP usage estimate: 3.2", document)
        self.assertNotIn("- DSP usage:", document)
        self.assertIn("display range `0` to `1000` ms; default `250`", document)

    def test_build_upload_documents_keeps_expected_upload_count(self):
        groups = {
            "guitar-amps-and-preamps": [
                {
                    "key": f"HD2_Amp{i}",
                    "id": i,
                    "name": f"Model {i:03d}",
                    "type": "Amp",
                    "category": "amp",
                    "class": "Guitar",
                    "usage": 1.0,
                    "is_agoura": False,
                    "based_on": None,
                    "params": [],
                }
                for i in range(1, 10)
            ],
            "bass-amps-and-preamps": [],
            "guitar-cabs": [],
            "bass-cabs": [],
            "ir-cabs": [],
            "effects-distortion": [],
            "effects-dynamics": [],
            "effects-eq": [],
            "effects-filter": [],
            "effects-fxloop": [],
            "effects-looper": [],
            "effects-volume": [],
            "effects-delay": [],
            "effects-reverb": [],
            "effects-modulation": [],
            "effects-pitch": [],
            "effects-synth": [],
            "effects-wah": [],
        }

        documents = build_upload_documents(groups, "2026-04-20T00:00:00+00:00")

        self.assertLessEqual(len(documents), 8)
        guitar_docs = [doc for doc in documents if doc["filename"].startswith("guitar-amps-and-preamps-")]
        self.assertEqual(len(guitar_docs), 3)

    def test_build_minimal_upload_documents_produces_small_fallback_set(self):
        groups = {
            "guitar-amps-and-preamps": [
                {
                    "key": f"HD2_Amp{i}",
                    "id": i,
                    "name": f"Model {i:03d}",
                    "type": "Amp",
                    "category": "amp",
                    "class": "Guitar",
                    "usage": 1.0,
                    "is_agoura": False,
                    "based_on": None,
                    "params": [],
                }
                for i in range(1, 6)
            ],
            "bass-amps-and-preamps": [],
            "guitar-cabs": [],
            "bass-cabs": [],
            "ir-cabs": [],
            "effects-distortion": [],
            "effects-dynamics": [],
            "effects-eq": [],
            "effects-filter": [],
            "effects-fxloop": [],
            "effects-looper": [],
            "effects-volume": [],
            "effects-delay": [],
            "effects-reverb": [],
            "effects-modulation": [],
            "effects-pitch": [],
            "effects-synth": [],
            "effects-wah": [],
        }

        documents = build_minimal_upload_documents(groups, "2026-04-20T00:00:00+00:00")

        self.assertLessEqual(len(documents), 4)
        amp_docs = [doc for doc in documents if doc["filename"].startswith("amps-and-preamps-")]
        self.assertEqual(len(amp_docs), 2)

    def test_render_project_instructions_mentions_project_context(self):
        document = render_project_instructions_document("2026-04-20T00:00:00+00:00")

        self.assertIn("# Helix Stadium Project Instructions", document)
        self.assertIn("prior chats in this same project", document)
        self.assertIn("I can't verify that from this project's Helix Stadium files.", document)


if __name__ == "__main__":
    unittest.main()
