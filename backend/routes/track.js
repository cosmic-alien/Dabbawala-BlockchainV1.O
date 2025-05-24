const express = require('express');
const router = express.Router();
const { contract } = require('../contract');

// GET /get-order/:orderId
router.get('/get-order/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contract.methods.getOrder(id).call();

    const order = {
      orderId: result[0],
      qrHash: result[1],
      provider: {
        foodProviderId: result[2].foodProviderId,
        foodProviderName: result[2].foodProviderName,
        providerLocation: result[2].providerLocation,
        timePickedUp: result[2].timePickedUp
      },
      collector: {
        collectorId: result[3].collectorId,
        collectorName: result[3].collectorName,
        collectionStation: result[3].collectionStation,
        sortingTime: result[3].sortingTime
      },
      residentialSorter: {
        residentialSorterId: result[4].residentialSorterId,
        sortStation: result[4].sortStation,
        timeBoardedTrain: result[4].timeBoardedTrain
      },
      transporter: {
        transporterId: result[5].transporterId,
        trainNumber: result[5].trainNumber,
        timeReachedDestination: result[5].timeReachedDestination
      },
      destinationSorter: {
        destinationSorterId: result[6].destinationSorterId,
        boxesReceived: result[6].boxesReceived,
        receivedOrderIds: result[6].receivedOrderIds,
        timeToDistribute: result[6].timeToDistribute
      },
      distribution: {
        distributorId: result[7].distributorId,
        deliveryCenter: result[7].deliveryCenter,
        distributedOrderIds: result[7].distributedOrderIds,
        deliveryTime: result[7].deliveryTime,
        receiverName: result[7].receiverName
      },
      customer: {
        customerConfirmed: result[8].customerConfirmed,
        deliveryConfirmationTime: result[8].deliveryConfirmationTime
      }
    };

    res.json({ success: true, order });

  } catch (err) {
    console.error("🔥 Error in /get-order:", err);
    res.status(500).json({ success: false, error: 'Failed to fetch order details' });
  }
});


module.exports = router;
