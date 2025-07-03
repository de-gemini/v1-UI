import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StripeCardPayment from '../components/StripeCardPayment';
import axiosInstance from '../api/axiosInstance';
import { getAuthHeader } from '../api/stripePayment';
import { API_BASE_URL } from '../constants';
import { FaCalendarAlt, FaMapMarkerAlt, FaPoundSign, FaClipboardList } from 'react-icons/fa';

const dividerStyle = {
  border: 0,
  borderTop: '1px solid #e5e7eb', // light gray
  margin: '12px 0',
};

const labelStyle = { color: '#6b7280', fontWeight: 500, fontSize: 15 };
const valueStyle = { color: '#374151', fontWeight: 400, fontSize: 16 };

const PaymentSummary = ({ booking }: { booking: any }) => (
  <div style={{ marginBottom: 32, background: '#fafbfc', padding: 10 }}>
    <h2 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 4, letterSpacing: -1 }}>Booking Summary</h2>
    <div style={{ color: '#666', fontSize: 15, marginBottom: 18 }}>Please review your booking details before payment.</div>
    <div style={{ fontSize: 16, color: '#222', lineHeight: 1.7 }}>
      <div style={labelStyle}>Service</div>
      <div style={valueStyle}>{booking.serviceType || 'N/A'}</div>
      <hr style={dividerStyle} />
      <div style={labelStyle}>Date</div>
      <div style={valueStyle}>{booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleString() : 'N/A'}</div>
      <hr style={dividerStyle} />
      <div style={labelStyle}>Address</div>
      <div style={valueStyle}>{booking.address || 'N/A'}</div>
      <hr style={dividerStyle} />
      <div style={labelStyle}>Price</div>
      <div style={valueStyle}>£{booking.estimatedPrice ?? 'N/A'}</div>
    </div>
  </div>
);

const StripeCardPaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientSecret = (location.state as any)?.clientSecret;
  const bookingId = (location.state as any)?.bookingId;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) {
      setError('No bookingId provided');
      navigate('/');
      return;
    }
    axiosInstance.get(`/bookings/${bookingId}`, { headers: getAuthHeader() })
      .then(res => {
        const data = res.data.payload || res.data.data || res.data;
        setBooking(data);
        if (!data || !data.serviceType || !data.scheduledDate || !data.address || data.estimatedPrice == null) {
          setError('Booking details are incomplete or missing.');
        }
      })
      .catch(err => {
        setError('Failed to fetch booking details.');
      })
      .finally(() => setLoading(false));
  }, [bookingId, navigate]);

  if (!clientSecret || !bookingId) {
    return (
      <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20 }}>
        <h2>Missing payment information</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, color: 'red' }}>
        <h2>Error</h2>
        <div>{error}</div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20 }}>
      {loading ? (
        <div>Loading booking details...</div>
      ) : (
        booking && <PaymentSummary booking={booking} />
      )}
      <StripeCardPayment clientSecret={clientSecret} bookingId={bookingId} />
    </div>
  );
};

export default StripeCardPaymentPage; 