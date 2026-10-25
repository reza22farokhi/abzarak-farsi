from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "percentage.html"
JS_PATH = ROOT / "assets" / "js" / "percentage.js"


class PercentageToolTests(unittest.TestCase):
    def test_page_exists(self):
        self.assertTrue(HTML_PATH.is_file(), "صفحه درصد وجود ندارد")

    def test_script_exists(self):
        self.assertTrue(JS_PATH.is_file(), "اسکریپت درصد وجود ندارد")

    def test_page_is_persian_rtl(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('lang="fa"', html)
        self.assertIn('dir="rtl"', html)

    def test_shared_assets_use_correct_relative_paths(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('../assets/css/styles.css', html)
        self.assertIn('../assets/js/common.js', html)
        self.assertIn('../assets/js/percentage.js', html)

    def test_required_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        for element_id in (
            "percent",
            "amount",
            "calculate-btn",
            "percent-result",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_validation_and_calculation_exist(self):
        js = JS_PATH.read_text(encoding="utf-8")
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn("Number.isFinite", js)
        self.assertIn('id="calculate-btn"', html)
        self.assertIn("percentageForm.addEventListener('submit'", js)
        self.assertIn("percent-result", js)
        self.assertIn("percent / 100 * amount", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
