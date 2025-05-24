import { useState } from 'react';

const OrderTracker = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    setOrder(null);
    setError('');
  
    try {
      const res = await fetch(`http://localhost:5000/api/get-order/${orderId}`);
      const data = await res.json();
  
      console.log("📦 Fetched Order Data:", data); // 🔍 Add this
  
      if (!data.success) throw new Error(data.error || 'Fetch failed');
      console.log("🧠 Full Customer Object:", data.order.customer);
      setOrder(data.order);
    } catch (err) {
      setError('❌ Order not found or could not be fetched.');
      console.error(err);
    }
  };
  

  return (
    <div className="page">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchOrder}>Track</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {order && (
        <div className="order-summary">
          <h3>Order Details</h3>
          <ul>
            <li><strong>Order ID:</strong> {order.orderId}</li>

            {order.provider && (
              <>
                <li><strong>Provider:</strong> {order.provider.foodProviderName} (ID: {order.provider.foodProviderId})</li>
                <li><strong>Picked Up At:</strong> {order.provider.timePickedUp}</li>
              </>
            )}

            {order.collector && (
              <li><strong>Collector:</strong> {order.collector.collectorName} (ID: {order.collector.collectorId})</li>
            )}

            {order.residentialSorter && (
              <>
                <li><strong>Residential Sorter:</strong> {order.residentialSorter.residentialSorterId} - {order.residentialSorter.sortStation}</li>
                <li><strong>Boarded Train:</strong> {order.residentialSorter.timeBoardedTrain}</li>
              </>
            )}

            {order.transporter && (
              <>
                <li><strong>Transporter:</strong> {order.transporter.transporterId} - Train: {order.transporter.trainNumber}</li>
                <li><strong>Reached Destination:</strong> {order.transporter.timeReachedDestination}</li>
              </>
            )}

            {order.destinationSorter && (
              <li><strong>Destination Sorter:</strong> {order.destinationSorter.destinationSorterId} - Boxes: {order.destinationSorter.boxesReceived}</li>
            )}

            {order.distribution && (
              <>
                <li><strong>Distribution Center:</strong> {order.distribution.deliveryCenter} by {order.distribution.distributorId}</li>
                <li><strong>Delivered To:</strong> {order.distribution.receiverName}</li>
              </>
            )}

            {order.customer && (
              <>
                <li>
                  <strong>Customer Confirmed:</strong>{' '}
                  {order.customer.customerConfirmed === "Yes" ? '✅ Yes' : '❌ No'}
                </li>
                <li><strong>Final Confirmation Time:</strong> {order.customer.deliveryConfirmationTime}</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;
