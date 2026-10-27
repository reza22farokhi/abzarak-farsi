from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]


class SeoAuditTests(unittest.TestCase):
    def test_seo_page_exists_and_is_persian_rtl(self):
        html = (ROOT / "tools/seo-audit.html").read_text(encoding="utf-8")
        self.assertIn('<html lang="fa" dir="rtl">', html)
        self.assertIn('id="seo-html"', html)
        self.assertIn('id="seo-analyze"', html)
        self.assertIn('id="seo-results"', html)

    def test_page_uses_local_assets_and_restrictive_csp(self):
        html = (ROOT / "tools/seo-audit.html").read_text(encoding="utf-8")
        self.assertIn('../assets/css/styles.css', html)
        self.assertIn('../assets/js/seo-audit.js', html)
        self.assertIn("object-src 'none'", html)
        self.assertNotIn('script-src \'self\' \'unsafe-inline\'', html)

    def test_analyzer_checks_important_metadata(self):
        js = (ROOT / "assets/js/seo-audit.js").read_text(encoding="utf-8")
        for term in (
            'querySelector(\'title\')',
            'description',
            'querySelectorAll(\'h1\')',
            'canonical',
            'og:title',
            'og:description',
            'querySelectorAll(\'img\')',
            'querySelectorAll(\'a\')',
            'name="viewport"',
        ):
            with self.subTest(term=term):
                self.assertIn(term, js)

    def test_report_uses_text_content_not_html_injection(self):
        js = (ROOT / "assets/js/seo-audit.js").read_text(encoding="utf-8")
        self.assertIn('heading.textContent', js)
        self.assertIn('detail.textContent', js)
        self.assertNotIn('seoReport.innerHTML', js)
        self.assertNotIn('heading.innerHTML', js)
        self.assertNotIn('detail.innerHTML', js)

    def test_score_display_exists_in_html(self):
        html = (ROOT / "tools/seo-audit.html").read_text(encoding="utf-8")
        self.assertIn('id="seo-score"', html)
        self.assertIn('id="seo-score-label"', html)
        self.assertIn("امتیاز رسمی گوگل", html)

    def test_score_uses_expected_criteria_and_weights(self):
        js = (ROOT / "assets/js/seo-audit.js").read_text(encoding="utf-8")
        for term in (
            "let score = 0",
            "title.length >= 15 && title.length <= 60 ? 15 : 8",
            "description.length >= 50 && description.length <= 170 ? 15 : 8",
            "h1Elements.length === 1 ? 10",
            "score += lang ? 5 : 0",
            "score += dir ? 5 : 0",
            "score += doc.querySelector('meta[name=\"viewport\"]') ? 10 : 0",
            "score += ogTitle ? 5 : 0",
            "score += ogDescription ? 5 : 0",
            "score.toLocaleString('fa-IR')",
        ):
            with self.subTest(term=term):
                self.assertIn(term, js)

    def test_homepage_links_to_seo_tool(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('href="tools/seo-audit.html"', html)
        self.assertIn('data-search="سئو seo audit', html)


    def test_analyzer_parses_source_in_inert_template(self):
        js = (ROOT / "assets/js/seo-audit.js").read_text(encoding="utf-8")
        self.assertIn("document.createElement('template')", js)
        self.assertIn("template.innerHTML = source", js)
        self.assertIn("const doc = template.content", js)
        self.assertNotIn("DOMParser", js)
        self.assertIn("seoHtmlAttribute(source, 'lang')", js)
        self.assertIn("seoHtmlAttribute(source, 'dir')", js)


if __name__ == "__main__":
    unittest.main()
