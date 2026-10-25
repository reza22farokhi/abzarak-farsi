from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "profit.html"
JS_PATH = ROOT / "assets" / "js" / "profit.js"


class ProfitToolTests(unittest.TestCase):
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
        self.assertIn('../assets/js/profit.js', html)

    def test_required_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")

        for element_id in (
            "profit-form",
            "sales-amount",
            "total-cost",
            "calculate-profit",
            "profit-result",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_profit_loss_and_margin_logic_exist(self):
        js = JS_PATH.read_text(encoding="utf-8")

        self.assertIn("Number.isFinite", js)
        self.assertIn("sales < 0 || cost < 0", js)
        self.assertIn("const profit = sales - cost", js)
        self.assertIn("profit > 0", js)
        self.assertIn("profit < 0", js)
        self.assertIn("profit / sales * 100", js)
        self.assertIn("sales > 0", js)
        self.assertIn("profitForm.addEventListener('submit'", js)

    def test_zero_sales_is_handled(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("مبلغ فروش صفر است", js)


if __name__ == "__main__":
    unittest.main(verbosity=2)
