import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STRIPE_PUBLISHABLE_KEY } from '../constants';
import { createStripePaymentIntent, createDynamicStripeSubscription } from '../api/stripePayment';
import axiosInstance from '../api/axiosInstance';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export type UnifiedPaymentMode = 'one-time' | 'subscription';

interface UnifiedStripePaymentFormProps {
  mode: UnifiedPaymentMode;
  amount: number;
  currency: string;
  frequency?: 'week' | 'month'; // for subscription
  intervalCount?: number; // for subscription
  productName?: string; // for subscription
  customerEmail: string;
  customerName: string;
  bookingId?: string; // for one-time
  subscriptionId?: string; // <-- Add this for subscription polling
  metadata?: Record<string, string>;
  subscriptionMonths?: number; // <-- Added for limited-duration subscriptions
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
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

const UnifiedPaymentForm: React.FC<UnifiedStripePaymentFormProps> = ({
  mode,
  amount,
  currency,
  frequency,
  intervalCount,
  productName,
  customerEmail,
  customerName,
  bookingId,
  subscriptionId, // still accept for one-time fallback
  metadata,
  subscriptionMonths, // <-- add this
  onSuccess,
  onError,
  onClose,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customerEmail,
    customerName,
  });
  const [agreedToPaymentPolicy, setAgreedToPaymentPolicy] = useState(false);
  // Remove unused state for subscriptions
  // const [pendingClientSecret, setPendingClientSecret] = useState<string | null>(null);
  // const [isPolling, setIsPolling] = useState(false);
  // const [pendingSubscriptionId, setPendingSubscriptionId] = useState<string | null>(null);

  // Remove polling useEffect for subscriptions
  // Keep only for one-time payments if needed

  // Remove confirmPolledPayment useEffect

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    // setPendingClientSecret(null); // Remove for subscriptions
    
    console.log('handleSubmit called, mode:', mode);
    // Log bookingId prop before building metadata
    console.log('bookingId prop:', bookingId);
    
    if (mode === 'subscription') {
      try {

        

        // Always include bookingId in metadata if available
        const fullMetadata = {
          ...(metadata || {}),
          ...(bookingId ? { bookingId } : {}),
        };
        console.log('Metadata being sent to backend:', fullMetadata);
        // debugger; // Pause for debugging
        // 1. Call backend to create subscription
        const response = await createDynamicStripeSubscription({
          // paymentMethodId is not needed for hosted invoice
          amount: amount, // pass as pounds
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          currency,
          interval: frequency || 'week',
          intervalCount: intervalCount || 1,
          productName: productName || 'Cleaning Service',
          subscriptionMonths, // <-- add this line
          metadata: fullMetadata,
        });
        const payload = response.payload || response.data?.payload || response.data;
        // Log the API response payload
        console.log('API response payload:', payload);
        const { hostedInvoiceUrl } = payload;
        if (hostedInvoiceUrl) {
          // Delay redirect for 5 seconds to allow debugging
          setTimeout(() => {
            window.location.href = hostedInvoiceUrl;
          }, 5000);
          return;
        } else {
          setError('Could not get Stripe payment page. Please try again.');
          setProcessing(false);
          return;
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
        setError(errorMessage);
        setProcessing(false);
        return;
      }
    }

    // One-time payment flow (in-app card UI)
    if (!stripe || !elements) {
      setProcessing(false);
      setError('Stripe not initialized');
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      setError('Card element not found');
      return;
    }
    try {
      // 1. Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.customerName,
          email: formData.customerEmail,
        },
      });
      if (paymentMethodError) {
        setError(paymentMethodError.message || 'Payment method creation failed');
        setProcessing(false);
        return;
      }
      if (!paymentMethod) {
        setError('Payment method creation failed');
        setProcessing(false);
        return;
      }
      // 2. Create one-time payment intent
      if (!bookingId) {
        setError('Booking ID is required for one-time payment');
        setProcessing(false);
        return;
      }
      const paymentIntent = await createStripePaymentIntent(bookingId);
      const clientSecret =
        paymentIntent?.payload?.clientSecret ||
        paymentIntent?.data?.clientSecret ||
        paymentIntent?.clientSecret;
      if (clientSecret) {
        const { error: confirmError, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.customerName,
              email: formData.customerEmail,
            },
          },
          setup_future_usage: 'off_session',
        });
        if (confirmError) {
          setError(confirmError.message || 'Payment confirmation failed');
          setProcessing(false);
          return;
        }
        // Save payment info for off-session
        if (confirmedIntent && bookingId) {
          // No need to send payment method to backend; webhook will handle it
          const stripeCustomerId = confirmedIntent.customer;
          const stripePaymentMethodId = confirmedIntent.payment_method;
          console.log('[Save Payment Method] bookingId:', bookingId);
          console.log('[Save Payment Method] stripeCustomerId:', stripeCustomerId);
          console.log('[Save Payment Method] stripePaymentMethodId:', stripePaymentMethodId);
          if (!stripeCustomerId) {
            console.warn('Stripe customer ID missing from payment intent:', confirmedIntent);
          }
          if (!stripePaymentMethodId) {
            console.warn('Stripe payment method ID missing from payment intent:', confirmedIntent);
          }
          // No axiosInstance.post here
        }
        toast.success('Payment successful!');
        if (onSuccess) onSuccess(paymentIntent);
        setTimeout(() => {
          navigate('/payment-success', {
            state: {
              bookingId,
              type: 'one-time',
            },
          });
        }, 1500);
      } else {
        setError('Payment intent creation failed');
        if (onError) onError('Payment intent creation failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Payment failed';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      toast.error(errorMessage);
    }
    setProcessing(false);
  };

  // Remove polling useEffect for subscriptions
  // Keep only for one-time payments if needed

  // Helper to check if running on localhost
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {isLocalhost && (
          <button
            type="button"
            className="mb-4 px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm"
            onClick={() => {
              navigator.clipboard.writeText('4242 4242 4242 4242');
              toast.info('Test card copied to clipboard!');
            }}
          >
            Copy Stripe Test Card (4242 4242 4242 4242)
          </button>
        )}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'subscription' ? 'Subscription Payment' : 'One-time Payment'}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-800">Amount:</span>
            <span className="text-sm font-bold text-blue-600">£{amount.toFixed(2)}</span>
          </div>
          {mode === 'subscription' && frequency && (
            <div className="mt-2 text-xs text-blue-600">
              This will be charged every {intervalCount || 1} {frequency}(s) until cancelled.
            </div>
          )}
        </div>
        {(processing) && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-bounce text-blue-600 text-2xl mb-2">• • •</div>
            <div className="text-blue-700 text-sm font-medium">Securely preparing your payment… hang tight!</div>
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}
        {/* Only show card input for one-time payments */}
        {mode === 'one-time' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                disabled={processing}
              />
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
                disabled={processing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Details
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-md p-3 shadow-sm">
                <CardElement options={{ style: cardStyle }} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree-payment-policy"
                checked={agreedToPaymentPolicy}
                onChange={e => setAgreedToPaymentPolicy(e.target.checked)}
                required
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={processing}
              />
              <label htmlFor="agree-payment-policy" className="text-xs sm:text-sm text-gray-700 select-none">
                I agree to the <a href="/payment-policy" target="_blank" rel="noopener noreferrer" className="underline text-brand-primary hover:text-blue-700">Payment Policy</a>
              </label>
            </div>
            <button
              type="submit"
              disabled={!stripe || processing || !agreedToPaymentPolicy}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Processing Payment...' : 'Pay Now'}
            </button>
            <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-md p-3">
              <strong>Test card:</strong> 4242 4242 4242 4242 (any future date, any CVC)
            </div>
          </form>
        )}
        {/* For subscriptions, just show a button to trigger handleSubmit */}
        {mode === 'subscription' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                disabled={processing}
              />
            </div>
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
                disabled={processing}
              />
            </div>
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Redirecting to Stripe...' : 'Proceed to Secure Payment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const UnifiedStripePaymentForm: React.FC<UnifiedStripePaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <UnifiedPaymentForm {...props} />
    </Elements>
  );
};

export default UnifiedStripePaymentForm; 