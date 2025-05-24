const QRCode = require('qrcode');

async function generateQRCode(orderId) {
  try {
    const qrData = `order:${orderId}`;
    const qrImage = await QRCode.toDataURL(qrData); // base64 image
    return qrImage;
  } catch (err) {
    console.error('QR generation error:', err);
    throw err;
  }
}

module.exports = { generateQRCode };
