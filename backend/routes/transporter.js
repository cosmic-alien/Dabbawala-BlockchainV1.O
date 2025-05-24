const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-transport
router.post('/log-transport', async (req, res) => {
  try {
    const {
      orderId,
      transporterId,
      trainNumber,
      timeReachedDestination
    } = req.body;

    const tx = await contract.methods.logTransportStage(
      orderId,
      transporterId,
      trainNumber,
      timeReachedDestination
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Transporter data logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /log-transport:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
