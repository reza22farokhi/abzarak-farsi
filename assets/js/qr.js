'use strict';

const qrInput = $('qr-text');
const qrResult = $('qr-result');
const qrMessage = $('qr-message');

function showQrMessage(message) {
  qrMessage.textContent = message;
  qrMessage.hidden = false;
}

function clearQrMessage() {
  qrMessage.textContent = '';
  qrMessage.hidden = true;
}

function generateQrCode() {
  const value = qrInput.value.trim();

  qrResult.replaceChildren();
  qrResult.hidden = true;
  clearQrMessage();

  if (!value) {
    showQrMessage('لطفاً ابتدا متن یا لینک را وارد کنید.');
    return;
  }

  if (value.length > 2000) {
    showQrMessage('متن واردشده بیش از حد مجاز است.');
    return;
  }

  if (typeof QRCode === 'undefined' || typeof QRCode.toCanvas !== 'function') {
    showQrMessage(
      'کتابخانه ساخت QR بارگذاری نشده است. اتصال اینترنت را بررسی و صفحه را دوباره بارگذاری کنید.'
    );
    return;
  }

  const canvas = document.createElement('canvas');

  try {
    QRCode.toCanvas(
      canvas,
      value,
      {
        width: 280,
        margin: 2,
        errorCorrectionLevel: 'M'
      },
      error => {
        if (error) {
          qrResult.replaceChildren();
          qrResult.hidden = true;
          showQrMessage('ساخت QR Code ناموفق بود. متن کوتاه‌تری را امتحان کنید.');
          return;
        }

        const download = document.createElement('a');
        download.href = canvas.toDataURL('image/png');
        download.download = 'abzarak-qr.png';
        download.textContent = 'دانلود تصویر QR Code (PNG)';
        download.className = 'tool-link';
        download.classList.add('qr-download-link');

        qrResult.replaceChildren(canvas, download);
        qrResult.hidden = false;
        showQrMessage('QR Code با موفقیت ساخته شد.');
      }
    );
  } catch {
    showQrMessage('ساخت QR Code ناموفق بود. لطفاً دوباره تلاش کنید.');
  }
}

$('generate-qr').addEventListener('click', generateQrCode);

$('copy-qr-text').addEventListener('click', async () => {
  clearQrMessage();

  const value = qrInput.value;

  if (!value.trim()) {
    showQrMessage('متنی برای کپی کردن وجود ندارد.');
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      showQrMessage('متن با موفقیت کپی شد.');
      return;
    }

    qrInput.focus();
    qrInput.select();

    const copied = document.execCommand('copy');

    if (copied) {
      showQrMessage('متن با موفقیت کپی شد.');
    } else {
      showQrMessage('کپی خودکار در دسترس نیست؛ متن را انتخاب و دستی کپی کنید.');
    }
  } catch {
    showQrMessage('کپی خودکار انجام نشد؛ متن را انتخاب و دستی کپی کنید.');
  }
});

$('clear-qr').addEventListener('click', () => {
  qrInput.value = '';
  qrResult.replaceChildren();
  qrResult.hidden = true;
  clearQrMessage();
  qrInput.focus();
});
