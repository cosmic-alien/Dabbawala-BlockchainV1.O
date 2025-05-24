const express = require('express');
const router = express.Router();
const { generateQRCode } = require('../qr');

// GET /generate-qr/:orderId
router.get('/generate-qr/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const qrImage = await generateQRCode(orderId);
    res.json({ orderId, qrCodeBase64: qrImage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;
