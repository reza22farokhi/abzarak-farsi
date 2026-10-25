from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "text-counter.html"
JS_PATH = ROOT / "assets" / "js" / "text-counter.js"


class TextCounterTests(unittest.TestCase):
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
        self.assertIn('../assets/js/text-counter.js', html)

    def test_required_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")

        for element_id in (
            "counter-text",
            "clear-text",
            "copy-text",
            "counter-message",
            "word-count",
            "char-count",
            "char-no-space-count",
            "line-count",
            "paragraph-count",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_counting_logic_exists(self):
        js = JS_PATH.read_text(encoding="utf-8")

        self.assertIn("updateTextStats", js)
        self.assertIn("split(/\\s+/u)", js)
        self.assertIn("Array.from(text).length", js)
        self.assertIn("text.replace(/\\s/gu, '')", js)
        self.assertIn("text.split(/\\r\\n|\\r|\\n/u)", js)
        self.assertIn("counterText.addEventListener('input'", js)

    def test_clear_and_copy_handlers_exist(self):
        js = JS_PATH.read_text(encoding="utf-8")

        self.assertIn("$('clear-text').addEventListener('click'", js)
        self.assertIn("$('copy-text').addEventListener('click'", js)
        self.assertIn("navigator.clipboard.writeText(text)", js)

    def test_empty_text_is_handled(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("text.trim() === ''", js)
        self.assertIn("text === '' ? 0", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
