import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getAuthHeader } from "../api/stripePayment";
import { FaMoneyBillWave, FaHome, FaPrint, FaCalendarAlt, FaMapMarkerAlt, FaPoundSign, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const CashPaymentInstructions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = (location.state as any) || {};
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
      return;
    }

    // Fetch booking details
    axiosInstance
      .get(`/bookings/${bookingId}`, { headers: getAuthHeader() })
      .then((res) => setBooking(res.data.payload || res.data.data || res.data))
      .finally(() => setLoading(false));
  }, [bookingId, navigate]);

  if (!bookingId) return null;
  if (loading) return <div className="text-center py-20 text-gray-500">Loading details...</div>;

  const brandPrimary = '#3B82F6';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <FaMoneyBillWave size={48} className="text-green-500 mb-2" />
          <h1 className="text-2xl font-bold mb-1" style={{ color: brandPrimary }}>Cash Payment Instructions</h1>
          <span className="text-green-600 font-semibold">Booking Confirmed</span>
        </div>
        
        <hr className="my-4" />
        
        {/* Booking Details */}
        <div className="grid grid-cols-2 gap-y-3 text-sm mb-6">
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Booking ID</div>
          <div className="text-gray-800 font-medium text-right">{booking._id}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Status</div>
          <div className="text-green-600 font-medium text-right">Confirmed</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCheckCircle className="text-blue-400" />Service</div>
          <div className="text-gray-800 text-right">{booking.serviceType}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaCalendarAlt className="text-blue-400" />Scheduled Date</div>
          <div className="text-gray-800 text-right">{new Date(booking.scheduledDate).toLocaleString()}</div>
          <div className="flex items-center gap-2 text-gray-500"><FaMapMarkerAlt className="text-blue-400" />Address</div>
          <div className="text-gray-800 text-right">{booking.address}</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center mb-6">
          <span className="text-gray-600 font-medium">Amount to Pay</span>
          <span className="text-green-700 font-bold text-lg">£{booking.estimatedPrice}</span>
        </div>

        {/* Cash Payment Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-blue-600" />
            Cash Payment Instructions
          </h3>
          
          <div className="space-y-4 text-sm text-blue-700">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</div>
              <div>
                <strong>Prepare the exact amount:</strong> Please have £{booking.estimatedPrice} ready in cash when the cleaner arrives.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</div>
              <div>
                <strong>Payment timing:</strong> Payment is due when the cleaning service is completed, not before.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</div>
              <div>
                <strong>Inspect the work:</strong> Please inspect the cleaning work before making payment to ensure you're satisfied.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">4</div>
              <div>
                <strong>Receipt:</strong> The cleaner will provide you with a receipt after payment is received.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">5</div>
              <div>
                <strong>Contact us:</strong> If you have any issues with the service or payment, please contact our customer support immediately.
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Your booking is confirmed and the cleaner will arrive at the scheduled time</li>
            <li>• Please ensure someone is available to let the cleaner in and make payment</li>
            <li>• If you need to cancel or reschedule, please contact us at least 24 hours in advance</li>
            <li>• The cleaner will not start work until payment is received</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            <FaPrint /> Print Instructions
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition-colors"
          >
            <FaCheckCircle /> View My Bookings
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

export default CashPaymentInstructions; 