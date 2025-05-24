const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-customer
// POST /log-customer
router.post('/log-customer', async (req, res) => {
  try {
    const { orderId, customerConfirmed, deliveryConfirmationTime } = req.body;

    // ✅ Log the received payload for debugging
    console.log("📦 Incoming customer data:", {
      orderId,
      customerConfirmed,
      deliveryConfirmationTime
    });

    // ✅ Ensure required fields are not missing
    if (!orderId || !deliveryConfirmationTime || customerConfirmed === undefined) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const tx = await contract.methods.logCustomerConfirmationStage(
      orderId,
      customerConfirmed,
      deliveryConfirmationTime
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Customer confirmation logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('❌ Error in /log-customer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
