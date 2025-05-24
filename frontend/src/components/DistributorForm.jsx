import { useState } from 'react';

const DistributorForm = () => {
  const [form, setForm] = useState({
    orderId: '',
    distributorId: '',
    deliveryCenter: '',
    distributedOrderIds: '',
    deliveryTime: '',
    receiverName: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const distributedOrderIdsArray = form.distributedOrderIds
      .split(',')
      .map(id => id.trim());

    const payload = {
      orderId: form.orderId,
      distributorId: form.distributorId,
      deliveryCenter: form.deliveryCenter,
      distributedOrderIds: distributedOrderIdsArray,
      deliveryTime: form.deliveryTime,
      receiverName: form.receiverName,
    };

    try {
      const res = await fetch('http://localhost:5000/api/log-distribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Distribution log failed');

      setMessage('✅ Distribution data logged successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error logging distribution data.');
    }
  };

  return (
    <div className="page">
      <h2>Distributor Form</h2>
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
          name="distributorId"
          placeholder="Distributor ID"
          value={form.distributorId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="deliveryCenter"
          placeholder="Delivery Center"
          value={form.deliveryCenter}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="distributedOrderIds"
          placeholder="Comma-separated Order IDs"
          value={form.distributedOrderIds}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="deliveryTime"
          value={form.deliveryTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="receiverName"
          placeholder="Receiver Name"
          value={form.receiverName}
          onChange={handleChange}
          required
        />
        <button type="submit">Log Distribution</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default DistributorForm;
