import { useState } from 'react';

const CustomerConfirm = () => {
  const [form, setForm] = useState({
    orderId: '',
    deliveryConfirmationTime: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      orderId: form.orderId,
      customerConfirmed: confirmed ? "Yes" : "No", // ✅ string sent to blockchain
      deliveryConfirmationTime: form.deliveryConfirmationTime,
    };

    try {
      const res = await fetch('http://localhost:5000/api/log-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Confirmation logged successfully.");
      } else {
        setStatus("❌ Failed to log confirmation.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("❌ Server error.");
    }
  };

  return (
    <div className="page">
      <h2>Customer Confirmation</h2>

      <input
        type="text"
        name="orderId"
        placeholder="Order ID"
        value={form.orderId}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="deliveryConfirmationTime"
        value={form.deliveryConfirmationTime}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
        I confirm delivery
      </label>

      <button onClick={handleSubmit}>Confirm Delivery</button>

      {status && <p>{status}</p>}
    </div>
  );
};

export default CustomerConfirm;
