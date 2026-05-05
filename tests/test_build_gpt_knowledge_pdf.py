import unittest

from scripts.build_gpt_knowledge_pdf import ascii_safe, wrap_markdown_text


class TestBuildGptKnowledgePdf(unittest.TestCase):
    def test_ascii_safe_normalizes_common_punctuation(self):
        text = "Tone - with smart quotes \"quoted\" and apostrophe it's fine"
        normalized = ascii_safe("Tone \u2013 with smart quotes \u201cquoted\u201d and apostrophe it\u2019s fine")
        self.assertEqual(normalized, text)

    def test_wrap_markdown_text_wraps_long_lines(self):
        lines = wrap_markdown_text("- " + ("verylongword " * 20))
        self.assertGreater(len(lines), 1)
        self.assertTrue(all(isinstance(line, str) for line in lines))


if __name__ == "__main__":
    unittest.main()
