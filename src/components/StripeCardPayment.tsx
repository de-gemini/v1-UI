import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const testKey = 'pk_test_51RTqcG2M2NssQa7jZWQnswH0Uj42bkyqpMU9dRvPc0x069k1ggQox10Qp0xQPmAhk8sb7xUFlpcivc9k9dMJGpbz00n2hfHr1n';
const liveKey = 'pk_live_51RTqbk2M4WBVH3k2qWtWUBjBoCCDUffofAXePbga1zGVbEqEv7vPG1kXsDxuu8Axz74uWQPtvcGxmqERMYo1qMfw008X7RW3AT';

const stripePromise = loadStripe(
  typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? liveKey
    : testKey
);

interface StripeCardPaymentProps {
  clientSecret: string;
  bookingId?: string;
}

const cardStyle = {
  base: {
    fontSize: '16px',
    color: '#222',
    backgroundColor: '#f9f9fb',
    fontFamily: 'Inter, Arial, sans-serif',
    '::placeholder': {
      color: '#b0b3b9',
    },
    padding: '14px 16px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: 'none',
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};

const StripeCardForm: React.FC<StripeCardPaymentProps> = ({ clientSecret, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    setSuccess(false);
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      setError('Card element not found');
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Test User' },
      },
    });
    if (result.error) {
      setError(result.error.message || 'Payment failed');
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setTimeout(() => {
        if (bookingId) {
          navigate('/payment-success', { state: { bookingId } });
        }
      }, 1500);
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
      <div style={{
        background: '#f9f9fb',
        borderRadius: 8,
        border: '1px solid #e0e2e7',
        padding: 8,
        marginBottom: 16,
        boxShadow: '0 2px 8px rgba(60,60,100,0.04)'
      }}>
        <CardElement options={{ style: cardStyle }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        style={{
          marginTop: 8,
          width: '100%',
          padding: '12px 0',
          background: '#635bff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 16,
          cursor: processing ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(60,60,100,0.04)'
        }}
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div style={{ color: '#fa755a', marginTop: 12 }}>{error}</div>}
      {success && <div style={{ color: '#2ecc40', marginTop: 12 }}>Payment successful!</div>}
      <div style={{ marginTop: 24, fontSize: 14, color: '#888' }}>
        <strong>Test card:</strong> 4242 4242 4242 4242 (any future date, any CVC)
      </div>
    </form>
  );
};

const StripeCardPayment: React.FC<StripeCardPaymentProps> = ({ clientSecret, bookingId }) => {
  if (!clientSecret) return null;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeCardForm clientSecret={clientSecret} bookingId={bookingId} />
    </Elements>
  );
};

export default StripeCardPayment; 