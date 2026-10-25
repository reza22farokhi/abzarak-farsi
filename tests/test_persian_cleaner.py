from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "persian-cleaner.html"
JS_PATH = ROOT / "assets" / "js" / "persian-cleaner.js"


class PersianCleanerTests(unittest.TestCase):
    def test_page_exists(self):
        self.assertTrue(HTML_PATH.is_file())

    def test_script_exists(self):
        self.assertTrue(JS_PATH.is_file())

    def test_page_is_persian_rtl(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('lang="fa"', html)
        self.assertIn('dir="rtl"', html)

    def test_shared_asset_paths(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('../assets/css/styles.css', html)
        self.assertIn('../assets/js/common.js', html)
        self.assertIn('../assets/js/persian-cleaner.js', html)

    def test_required_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")

        for element_id in (
            "original-text",
            "cleaned-text",
            "clean-text",
            "clear-text",
            "copy-result",
            "cleaner-message",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_persian_normalization_exists(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn(".replace(/ي/g, 'ی')", js)
        self.assertIn(".replace(/ك/g, 'ک')", js)
        self.assertIn("normalizePersianText", js)

    def test_whitespace_and_punctuation_cleanup_exists(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn(".trim()", js)
        self.assertIn(".replace(/\\n{3,}/gu, '\\n\\n')", js)
        self.assertIn("([،؛:!?؟,.]){2,}", js)

    def test_clear_and_copy_handlers_exist(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("$('clear-text').addEventListener('click'", js)
        self.assertIn("$('copy-result').addEventListener('click'", js)
        self.assertIn("navigator.clipboard.writeText(cleanedText.value)", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
