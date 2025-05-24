const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-collector
router.post('/log-collector', async (req, res) => {
  try {
    const { orderId, collectionStation, sortingTime } = req.body;

    const tx = await contract.methods.logCollectorStage(
      orderId,
      collectionStation,
      sortingTime
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Collector data logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /log-collector:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
