import { useState } from 'react';

const CreateOrder = () => {
  const [form, setForm] = useState({
    orderId: '',
    qrHash: '',
    foodProviderId: '',
    foodProviderName: '',
    providerLocation: '',
    timePickedUp: '',
    collectorId: '',
    collectorName: ''
  });

  const [message, setMessage] = useState('');
  const [qrImage, setQrImage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setQrImage('');

    try {
      // Send create order request
      const res = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Create order failed');

      setMessage('✅ Order created and logged on blockchain. Generating QR...');

      // Get QR code
      const qrRes = await fetch(`http://localhost:5000/api/generate-qr/${form.orderId}`);
      const qrData = await qrRes.json();
      setQrImage(qrData.qrCodeBase64);

    } catch (err) {
      console.error(err);
      setMessage('❌ Error creating order or generating QR.');
    }
  };

  return (
    <div className="page">
      <h2>Create Order (Food Provider)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="orderId" placeholder="Order ID" value={form.orderId} onChange={handleChange} required />
        <input type="text" name="qrHash" placeholder="QR Hash (or use Order ID again)" value={form.qrHash} onChange={handleChange} required />
        <input type="text" name="foodProviderId" placeholder="Provider ID" value={form.foodProviderId} onChange={handleChange} required />
        <input type="text" name="foodProviderName" placeholder="Provider Name" value={form.foodProviderName} onChange={handleChange} required />
        <input type="text" name="providerLocation" placeholder="Kitchen Location" value={form.providerLocation} onChange={handleChange} required />
        <input type="datetime-local" name="timePickedUp" value={form.timePickedUp} onChange={handleChange} required />
        <input type="text" name="collectorId" placeholder="Collector ID" value={form.collectorId} onChange={handleChange} required />
        <input type="text" name="collectorName" placeholder="Collector Name" value={form.collectorName} onChange={handleChange} required />
        <button type="submit">Submit Order</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      {qrImage && <img src={qrImage} alt="Order QR" style={{ marginTop: '1rem', border: '2px solid #0077ff', borderRadius: '8px' }} />}
    </div>
  );
};

export default CreateOrder;
