const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /create-order
router.post('/create-order', async (req, res) => {
  try {
    const {
      orderId,
      qrHash,
      foodProviderId,
      foodProviderName,
      providerLocation,
      timePickedUp,
      collectorId,
      collectorName
    } = req.body;

    const tx = await contract.methods.createOrder(
      orderId,
      qrHash,
      foodProviderId,
      foodProviderName,
      providerLocation,
      timePickedUp,
      collectorId,
      collectorName
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Order created and logged to blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /create-order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
