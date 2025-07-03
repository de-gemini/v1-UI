import React, { useState } from 'react';
import { createStripePaymentIntent } from '../api/stripePayment';

const StripePaymentTest: React.FC = () => {
  const [bookingId, setBookingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateIntent = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await createStripePaymentIntent(bookingId);
      setResult(data.payload || data.data || data); // support for different response shapes
    } catch (err: any) {
      setError(err?.message || 'Error creating payment intent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Stripe Payment Intent Test</h2>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8 }}
      />
      <button onClick={handleCreateIntent} disabled={loading || !bookingId} style={{ width: '100%', padding: 10 }}>
        {loading ? 'Creating...' : 'Create Payment Intent'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 16 }}>
          <div><strong>Client Secret:</strong> <code>{result.clientSecret}</code></div>
          <div><strong>PaymentIntent ID:</strong> <code>{result.paymentIntentId}</code></div>
        </div>
      )}
    </div>
  );
};

export default StripePaymentTest; 