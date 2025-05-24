const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-distribution
router.post('/log-distribution', async (req, res) => {
  try {
    const {
      orderId,
      distributorId,
      deliveryCenter,
      distributedOrderIds,
      deliveryTime,
      receiverName
    } = req.body;

    const tx = await contract.methods.logDistributionStage(
      orderId,
      distributorId,
      deliveryCenter,
      distributedOrderIds,
      deliveryTime,
      receiverName
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Distribution data logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /log-distribution:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
