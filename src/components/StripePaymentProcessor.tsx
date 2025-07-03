import React, { useState, useCallback } from 'react';
import { createStripePaymentIntent } from '../api/stripePayment';

interface StripePaymentProcessorProps {
  bookingId: string;
  onSuccess?: (result: { clientSecret: string; paymentIntentId: string }) => void;
  onError?: (error: string) => void;
  children?: (startPayment: () => void, loading: boolean, result: any, error: string) => React.ReactNode;
}

const StripePaymentProcessor: React.FC<StripePaymentProcessorProps> = ({
  bookingId,
  onSuccess,
  onError,
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const startPayment = useCallback(async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await createStripePaymentIntent(bookingId);
      const payload = data.payload || data.data || data;
      setResult(payload);
      onSuccess?.(payload);
    } catch (err: any) {
      const msg = err?.message || 'Error creating payment intent';
      setError(msg);
      onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, [bookingId, onSuccess, onError]);

  // If children is a function, render it with the payment handler and state
  if (typeof children === 'function') {
    return <>{children(startPayment, loading, result, error)}</>;
  }

  // Otherwise, render nothing (or you can provide a default UI)
  return null;
};

export default StripePaymentProcessor; 