import { useState } from 'react';

const ResidentialSorterForm = () => {
  const [form, setForm] = useState({
    orderId: '',
    residentialSorterId: '',
    residentialSortStation: '',
    sortedBoxCount: '',
    timeBoardedTrain: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/log-residential-sort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Residential sort failed');

      setMessage('✅ Residential sorter data logged successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error logging residential sorter data.');
    }
  };

  return (
    <div className="page">
      <h2>Residential Sorter Form</h2>
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
          name="residentialSorterId"
          placeholder="Sorter ID"
          value={form.residentialSorterId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="residentialSortStation"
          placeholder="Station Name"
          value={form.residentialSortStation}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="sortedBoxCount"
          placeholder="Box Count"
          value={form.sortedBoxCount}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="timeBoardedTrain"
          value={form.timeBoardedTrain}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default ResidentialSorterForm;
