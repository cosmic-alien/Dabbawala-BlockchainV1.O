const express = require('express');
const router = express.Router();
const { contract, account } = require('../contract');

// POST /log-residential-sort
router.post('/log-residential-sort', async (req, res) => {
  try {
    const {
      orderId,
      residentialSorterId,
      residentialSortStation,
      sortedBoxCount,
      timeBoardedTrain
    } = req.body;

    const tx = await contract.methods.logResidentialSortingStage(
      orderId,
      residentialSorterId,
      residentialSortStation,
      sortedBoxCount,
      timeBoardedTrain
    ).send({ from: account.address, gas: 3000000 });

    res.json({
      success: true,
      message: 'Residential sorter data logged on blockchain.',
      txHash: tx.transactionHash
    });
  } catch (error) {
    console.error('Error in /log-residential-sort:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
