import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "tools" / "qr.html"
JS_PATH = ROOT / "assets" / "js" / "qr.js"


class QrToolTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = HTML_PATH.read_text(encoding="utf-8")
        cls.js = JS_PATH.read_text(encoding="utf-8")

    def test_page_is_persian_and_rtl(self):
        self.assertIn('<html lang="fa" dir="rtl">', self.html)

    def test_shared_styles_and_scripts_are_linked(self):
        self.assertIn('../assets/css/styles.css', self.html)
        self.assertIn('../assets/js/common.js', self.html)
        self.assertIn('../assets/js/qr.js', self.html)

    def test_qr_library_is_loaded_locally(self):
        self.assertIn(
            '<script src="../assets/js/vendor/qrcode.min.js" defer></script>',
            self.html,
        )

        library_path = ROOT / "assets" / "js" / "vendor" / "qrcode.min.js"
        self.assertTrue(library_path.is_file())
        self.assertGreater(library_path.stat().st_size, 10000)

        library = library_path.read_text(encoding="utf-8")
        self.assertIn("toCanvas", library)
        self.assertNotIn("require(", library)

    def test_input_and_length_limit_exist(self):
        self.assertIn('id="qr-text"', self.html)
        self.assertIn('maxlength="2000"', self.html)
        self.assertIn("value.length > 2000", self.js)

    def test_generation_checks_empty_input_and_library(self):
        self.assertIn("if (!value)", self.js)
        self.assertIn("typeof QRCode === 'undefined'", self.js)
        self.assertIn("QRCode.toCanvas", self.js)

    def test_png_download_is_configured(self):
        self.assertIn("image/png", self.js)
        self.assertIn("abzarak-qr.png", self.js)
        self.assertIn("download.download", self.js)

    def test_copy_and_clear_controls_exist(self):
        self.assertIn('id="copy-qr-text"', self.html)
        self.assertIn('id="clear-qr"', self.html)
        self.assertIn("navigator.clipboard.writeText(value)", self.js)
        self.assertIn("qrInput.value = ''", self.js)

    def test_accessible_status_and_home_navigation_exist(self):
        self.assertIn('aria-live="polite"', self.html)
        self.assertIn('href="../index.html"', self.html)
        self.assertIn("showQrMessage", self.js)


if __name__ == "__main__":
    unittest.main()
