import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripePaymentProcessor from '../components/StripePaymentProcessor';

const StripeTestPage: React.FC = () => {
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

  const handleSuccess = (result: { clientSecret: string }) => {
    // Pass both clientSecret and bookingId in state
    navigate('/stripe-card-payment', { state: { clientSecret: result.clientSecret, bookingId } });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Test Stripe Payment Processor</h2>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8 }}
      />
      <StripePaymentProcessor
        bookingId={bookingId}
        onSuccess={handleSuccess}
        onError={error => {
          // Optionally handle error globally
        }}
      >
        {(startPayment, loading) => (
          <button onClick={startPayment} disabled={loading || !bookingId} style={{ width: '100%', padding: 10 }}>
            {loading ? 'Processing...' : 'Start Stripe Payment'}
          </button>
        )}
      </StripePaymentProcessor>
    </div>
  );
};

export default StripeTestPage; 