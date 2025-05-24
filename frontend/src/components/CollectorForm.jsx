import { useState } from 'react';

const CollectorForm = () => {
  const [form, setForm] = useState({
    orderId: '',
    collectionStation: '',
    sortingTime: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/log-collector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Collector log failed');

      setMessage('✅ Collector stage logged successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error logging collector data.');
    }
  };

  return (
    <div className="page">
      <h2>Collector Form</h2>
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
          name="collectionStation"
          placeholder="Collection Station"
          value={form.collectionStation}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="sortingTime"
          value={form.sortingTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Log Collector Stage</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default CollectorForm;
