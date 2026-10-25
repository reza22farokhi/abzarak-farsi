from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "tools" / "password.html"
JS_PATH = ROOT / "assets" / "js" / "password.js"


class PasswordToolTests(unittest.TestCase):
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
        self.assertIn('../assets/js/password.js', html)

    def test_controls_exist(self):
        html = HTML_PATH.read_text(encoding="utf-8")
        for element_id in (
            "password-length", "length-value",
            "include-uppercase", "include-lowercase",
            "include-digits", "include-symbols",
            "exclude-ambiguous", "generate-password",
            "password-output", "copy-password",
            "clear-password", "strength-result",
            "password-message",
        ):
            self.assertIn(f'id="{element_id}"', html)

    def test_cryptographic_randomness(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("crypto.getRandomValues(values)", js)
        self.assertIn("value >= limit", js)
        self.assertNotIn("Math.random", js)

    def test_validation_and_ambiguous_characters(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("length < 8 || length > 64", js)
        self.assertIn("NO_CHARACTER_TYPES", js)
        self.assertIn("replace(/[O0Il1]/g, '')", js)

    def test_shuffle_strength_copy_and_clear(self):
        js = JS_PATH.read_text(encoding="utf-8")
        self.assertIn("function shuffleSecurely", js)
        self.assertIn("function estimateStrength", js)
        self.assertIn(
            "navigator.clipboard.writeText(passwordOutput.value)", js
        )
        self.assertIn(
            "$('clear-password').addEventListener('click'", js
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
