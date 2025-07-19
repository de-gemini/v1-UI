import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getAuthHeader } from "../api/stripePayment";
import { FaCheckCircle, FaHome, FaListAlt, FaIdBadge, FaUserCheck, FaCalendarAlt, FaMapMarkerAlt, FaPoundSign, FaInfoCircle, FaPrint, FaDownload } from 'react-icons/fa';

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
  const { bookingId, subscriptionId, customerId, type } = (location.state as any) || {};
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId && !subscriptionId) {
      navigate("/");
      return;
    }

    if (type === 'subscription') {
      // For subscriptions, we don't need to fetch additional data
      setLoading(false);
    } else if (bookingId) {
      // For bookings, fetch booking details
      axiosInstance
        .get(`/bookings/${bookingId}`, { headers: getAuthHeader() })
        .then((res) => setBooking(res.data.payload || res.data.data || res.data))
        .finally(() => setLoading(false));
    }
  }, [bookingId, subscriptionId, type, navigate]);

  if (!bookingId && !subscriptionId) return null;
  if (loading) return <div className="text-center py-20 text-gray-500">Loading details...</div>;

  const brandPrimary = '#3B82F6'; // Tailwind blue-500 or your brand color

  if (type === 'subscription') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
          <div className="flex flex-col items-center mb-6">
            <FaCheckCircle size={48} className="text-blue-500 mb-2" />
            <h1 className="text-2xl font-bold mb-1" style={{ color: brandPrimary }}>Payment Receipt</h1>
            <span className="text-blue-600 font-semibold">Paid</span>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
            <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Subscription ID</div>
            <div className="text-gray-800 font-medium text-right">{subscriptionId}</div>
            <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Customer ID</div>
            <div className="text-gray-800 font-medium text-right">{customerId}</div>
            <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Status</div>
            <div className="text-blue-600 font-medium text-right">Active</div>
            <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Next Payment</div>
            <div className="text-gray-800 text-right">Will be charged automatically</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center mb-6">
            <span className="text-gray-600 font-medium">Total Paid</span>
            <span className="text-blue-700 font-bold text-lg">Subscription</span>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
            >
              <FaPrint /> Print
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-2 rounded transition-colors"
              style={{ borderColor: brandPrimary, color: brandPrimary }}
            >
              <FaHome /> Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <FaCheckCircle size={48} className="text-blue-500 mb-2" />
          <h1 className="text-2xl font-bold mb-1" style={{ color: brandPrimary }}>Payment Receipt</h1>
          <span className="text-blue-600 font-semibold">Paid</span>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Booking ID</div>
          <div className="text-gray-800 font-medium text-right">{booking._id}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Status</div>
          <div className="text-blue-600 font-medium text-right">{booking.status}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Service</div>
          <div className="text-gray-800 text-right">{booking.serviceType}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Scheduled Date</div>
          <div className="text-gray-800 text-right">{new Date(booking.scheduledDate).toLocaleString()}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Address</div>
          <div className="text-gray-800 text-right">{booking.address}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center mb-6">
          <span className="text-gray-600 font-medium">Total Paid</span>
          <span className="text-blue-700 font-bold text-lg">£{booking.estimatedPrice}</span>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            <FaPrint /> Print
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-5 py-2 rounded transition-colors"
            style={{ borderColor: brandPrimary, color: brandPrimary }}
          >
            <FaHome /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
