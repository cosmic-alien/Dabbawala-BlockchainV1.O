import { useState } from 'react';

const TransportForm = () => {
  const [form, setForm] = useState({
    orderId: '',
    transporterId: '',
    trainNumber: '',
    timeReachedDestination: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/log-transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Transport log failed');

      setMessage('✅ Transporter data logged successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error logging transporter data.');
    }
  };

  return (
    <div className="page">
      <h2>Transporter Form</h2>
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
          name="transporterId"
          placeholder="Transporter ID"
          value={form.transporterId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="trainNumber"
          placeholder="Train Number"
          value={form.trainNumber}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="timeReachedDestination"
          value={form.timeReachedDestination}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default TransportForm;
