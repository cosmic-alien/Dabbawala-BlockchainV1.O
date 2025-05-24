const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-destination-sort
router.post('/log-destination-sort', async (req, res) => {
  try {
    const {
      orderId,
      destinationSorterId,
      boxesReceived,
      receivedOrderIds,
      timeToDistribute
    } = req.body;

    const tx = await contract.methods.logDestinationSortingStage(
      orderId,
      destinationSorterId,
      boxesReceived,
      receivedOrderIds,
      timeToDistribute
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Destination sorting data logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /log-destination-sort:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
