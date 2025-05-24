import { useState } from 'react';

const DestinationSorterForm = () => {
  const [form, setForm] = useState({
    orderId: '',
    destinationSorterId: '',
    boxesReceived: '',
    receivedOrderIds: '',
    timeToDistribute: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Convert receivedOrderIds to array
    const receivedOrderIdsArray = form.receivedOrderIds
      .split(',')
      .map((id) => id.trim());

    const payload = {
      orderId: form.orderId,
      destinationSorterId: form.destinationSorterId,
      boxesReceived: parseInt(form.boxesReceived),
      receivedOrderIds: receivedOrderIdsArray,
      timeToDistribute: form.timeToDistribute,
    };

    try {
      const res = await fetch('http://localhost:5000/api/log-destination-sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Destination sort log failed');

      setMessage('✅ Destination sorter data logged successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error logging destination sorter data.');
    }
  };

  return (
    <div className="page">
      <h2>Destination Sorter Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destinationSorterId"
          placeholder="Destination Sorter ID"
          value={form.destinationSorterId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="boxesReceived"
          placeholder="Boxes Received"
          value={form.boxesReceived}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="receivedOrderIds"
          placeholder="Comma-separated Order IDs (e.g., ORDER123, ORDER456)"
          value={form.receivedOrderIds}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="timeToDistribute"
          value={form.timeToDistribute}
          onChange={handleChange}
          required
        />
        <button type="submit">Log Destination Sort</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default DestinationSorterForm;
