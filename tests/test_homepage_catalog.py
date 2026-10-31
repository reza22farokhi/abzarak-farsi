from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
HOMEPAGE = ROOT / "index.html"


class HomepageCatalogTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = HOMEPAGE.read_text(encoding="utf-8")

    def test_homepage_exists_and_is_persian_rtl(self):
        self.assertTrue(HOMEPAGE.is_file())
        self.assertIn('<html lang="fa" dir="rtl">', self.html)

    def test_shared_stylesheet_is_linked(self):
        self.assertIn('href="assets/css/styles.css"', self.html)

    def test_all_tool_pages_are_linked(self):
        expected = [
            "tools/percentage.html", "tools/discount.html", "tools/profit.html",
            "tools/text-counter.html", "tools/persian-cleaner.html",
            "tools/password.html", "tools/qr.html", "tools/seo-audit.html",
            "tools/json.html", "tools/base64.html", "tools/url-encode.html",
            "tools/uuid.html", "tools/timestamp.html", "tools/regex.html",
        ]
        for relative_path in expected:
            with self.subTest(path=relative_path):
                self.assertTrue((ROOT / relative_path).is_file())
                self.assertIn(f'href="{relative_path}"', self.html)

    def test_search_and_category_filters_exist(self):
        self.assertIn('id="tool-search"', self.html)
        self.assertIn('id="tool-count"', self.html)
        self.assertIn('data-filter="developer"', self.html)
        self.assertIn('aria-pressed="false"', self.html)
        catalog_js = (ROOT / "assets/js/catalog.js").read_text(encoding="utf-8")
        self.assertIn("addEventListener('input', updateToolSearch)", catalog_js)
        self.assertIn("updateToolSearch();", catalog_js)

    def test_empty_search_state_exists(self):
        self.assertIn('id="empty-state"', self.html)

    def test_all_cards_have_search_terms_and_categories(self):
        self.assertEqual(self.html.count('class="tool-card"'), 14)
        self.assertEqual(self.html.count("data-search="), 14)
        self.assertEqual(self.html.count('data-category="developer"'), 6)

    def test_accessibility_and_mobile_viewport(self):
        self.assertIn('name="viewport"', self.html)
        self.assertIn('aria-live="polite"', self.html)
        self.assertIn('class="skip-link"', self.html)


if __name__ == "__main__":
    unittest.main()
