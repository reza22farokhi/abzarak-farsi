from pathlib import Path
import unittest
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
TOOLS = {
    "json": ("tools/json.html", "assets/js/json.js"),
    "base64": ("tools/base64.html", "assets/js/base64.js"),
    "url-encode": ("tools/url-encode.html", "assets/js/url-encode.js"),
    "uuid": ("tools/uuid.html", "assets/js/uuid.js"),
    "timestamp": ("tools/timestamp.html", "assets/js/timestamp.js"),
    "regex": ("tools/regex.html", "assets/js/regex.js"),
}


class DeveloperToolsTests(unittest.TestCase):
    def test_all_six_pages_are_persian_rtl_with_local_assets(self):
        for name, (page_path, script_path) in TOOLS.items():
            with self.subTest(tool=name):
                page = ROOT / page_path
                script = ROOT / script_path
                self.assertTrue(page.is_file())
                self.assertTrue(script.is_file())
                html = page.read_text(encoding="utf-8")
                self.assertIn('<html lang="fa" dir="rtl">', html)
                self.assertIn('Content-Security-Policy', html)
                self.assertIn("script-src 'self'", html)
                self.assertIn('href="../assets/css/styles.css"', html)
                self.assertIn(f'src="../{script_path}"', html)
                self.assertIn('rel="canonical"', html)
                self.assertIn('property="og:title"', html)
                self.assertIn('../index.html', html)

    def test_json_uses_native_parser_and_serializer(self):
        js = (ROOT / "assets/js/json.js").read_text(encoding="utf-8")
        self.assertIn("JSON.parse(source)", js)
        self.assertIn("JSON.stringify(value", js)
        self.assertIn("new TextEncoder()", js)

    def test_base64_supports_utf8_and_strict_decode(self):
        js = (ROOT / "assets/js/base64.js").read_text(encoding="utf-8")
        self.assertIn("new TextEncoder()", js)
        self.assertIn("new TextDecoder('utf-8', { fatal: true })", js)
        self.assertIn("btoa(binary)", js)
        self.assertIn("atob(padded)", js)

    def test_url_tool_handles_malformed_sequences(self):
        js = (ROOT / "assets/js/url-encode.js").read_text(encoding="utf-8")
        self.assertIn("encodeURIComponent", js)
        self.assertIn("decodeURIComponent", js)
        self.assertIn("catch (error)", js)

    def test_uuid_uses_secure_randomness_and_v4_bits(self):
        js = (ROOT / "assets/js/uuid.js").read_text(encoding="utf-8")
        self.assertIn("crypto.getRandomValues", js)
        self.assertIn("crypto.randomUUID", js)
        self.assertIn("0x40", js)
        self.assertIn("0x80", js)
        self.assertNotIn("Math.random", js)

    def test_timestamp_checks_range_and_timezone_label(self):
        js = (ROOT / "assets/js/timestamp.js").read_text(encoding="utf-8")
        self.assertIn("8640000000000000", js)
        self.assertIn("toISOString()", js)
        self.assertIn("new Date(value)", js)

    def test_regex_runs_in_worker_with_timeout_and_limits(self):
        js = (ROOT / "assets/js/regex.js").read_text(encoding="utf-8")
        worker = (ROOT / "assets/js/workers/regex-worker.js").read_text(encoding="utf-8")
        page = (ROOT / "tools/regex.html").read_text(encoding="utf-8")
        self.assertIn("new Worker", js)
        self.assertIn("setTimeout", js)
        self.assertIn("terminate()", js)
        self.assertIn("50000", js)
        self.assertIn("maxMatches = 200", worker)
        self.assertIn("worker-src 'self'", page)

    def test_sitemap_contains_all_new_pages_without_duplicates(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [node.text for node in tree.findall(".//s:loc", ns)]
        self.assertEqual(len(urls), len(set(urls)))
        for name in TOOLS:
            self.assertIn(f"https://reza22farokhi.github.io/abzarak-farsi/tools/{name}.html", urls)

    def test_robots_points_to_sitemap(self):
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn("User-agent: *", robots)
        self.assertIn("Sitemap: https://reza22farokhi.github.io/abzarak-farsi/sitemap.xml", robots)

    def test_generated_backups_and_python_cache_are_ignored(self):
        ignore = (ROOT / ".gitignore").read_text(encoding="utf-8")
        self.assertIn("__pycache__/", ignore)
        self.assertIn("*.backup*", ignore)


if __name__ == "__main__":
    unittest.main()
