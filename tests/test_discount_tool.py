from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "discount.html"
JS_PATH = ROOT / "assets" / "js" / "discount.js"


class DiscountToolTests(unittest.TestCase):
    def test_page_exists(self):
        self.assertTrue(HTML_PATH.is_file())

    def test_script_exists(self):
        self.assertTrue(JS_PATH.is_file())

    def test_page_is_persian_rtl(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('lang="fa"', html)
        self.assertIn('dir="rtl"', html)

    def test_relative_asset_paths(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        self.assertIn('../assets/css/styles.css', html)
        self.assertIn('../assets/js/common.js', html)
        self.assertIn('../assets/js/discount.js', html)

    def test_required_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        for element_id in (
            "discount-form",
            "original-price",
            "discount-percent",
            "calculate-discount",
            "discount-result",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_validation_and_calculation_exist(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("Number.isFinite", js)
        self.assertIn("price < 0", js)
        self.assertIn("percent < 0 || percent > 100", js)
        self.assertIn("price * percent / 100", js)
        self.assertIn("price - discountAmount", js)
        self.assertIn("discountForm.addEventListener('submit'", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
