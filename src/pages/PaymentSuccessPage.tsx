import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getAuthHeader } from "../api/stripePayment";

const dividerStyle = {
  border: 0,
  borderTop: '1px solid #e5e7eb', // light gray
  margin: '12px 0',
};

const labelStyle = { color: '#6b7280', padding: '0 10px', fontWeight: 500, fontSize: 13 };
const valueStyle = { color: '#374151', padding: '0 10px', fontWeight: 400, fontSize: 16 };

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = (location.state as any)?.bookingId;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
      return;
    }
    axiosInstance
      .get(`/bookings/${bookingId}`, { headers: getAuthHeader() })
      .then((res) => setBooking(res.data.payload || res.data.data || res.data))
      .finally(() => setLoading(false));
  }, [bookingId, navigate]);

  if (!bookingId) return null;
  if (loading) return <div className="text-center py-20 text-gray-500">Loading booking details...</div>;

  return (
    <div style={{ maxWidth: 520, margin: "4rem auto", padding: 0 }}>
      <h1 style={{ fontSize: 38, fontWeight: 800, color: "#222", marginBottom: 8, letterSpacing: -1 }}>Payment Successful</h1>
      <div style={{ color: "#666", fontSize: 16, marginBottom: 32 }}>Your booking has been confirmed. Here are your details:</div>
      <div style={{ fontSize: 17, color: '#222', lineHeight: 1.7, marginBottom: 40, background: '#fafbfc', padding: 0 }}>
        <div style={labelStyle}>Booking ID</div>
        <div style={valueStyle}>{booking._id}</div>
        <hr style={dividerStyle} />
        <div style={labelStyle}>Status</div>
        <div style={valueStyle}>{booking.status}</div>
        <hr style={dividerStyle} />
        <div style={labelStyle}>Service</div>
        <div style={valueStyle}>{booking.serviceType}</div>
        <hr style={dividerStyle} />
        <div style={labelStyle}>Scheduled Date</div>
        <div style={valueStyle}>{new Date(booking.scheduledDate).toLocaleString()}</div>
        <hr style={dividerStyle} />
        <div style={labelStyle}>Address</div>
        <div style={valueStyle}>{booking.address}</div>
        <hr style={dividerStyle} />
        <div style={labelStyle}>Price</div>
        <div style={valueStyle}>£{booking.estimatedPrice}</div>
      </div>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#222",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          padding: "12px 36px",
          border: "none",
          borderRadius: 0,
          cursor: "pointer",
          letterSpacing: 1,
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
