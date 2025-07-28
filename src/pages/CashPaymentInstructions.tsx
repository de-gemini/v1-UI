import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { getAuthHeader } from "../api/stripePayment";
import {
  FaMoneyBillWave, FaHome, FaPrint, FaCalendarAlt,
  FaMapMarkerAlt, FaPoundSign, FaInfoCircle, FaCheckCircle
} from 'react-icons/fa';

const DetailRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: any }) => (
  <>
    <div className="flex items-center gap-2 text-gray-500"><Icon className="text-blue-400" />{label}</div>
    <div className="text-gray-800 font-medium text-right">{value}</div>
  </>
);

const InstructionStep = ({ step, children }: { step: number, children: React.ReactNode }) => (
  <div className=" items-start gap-3">
    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center mt-4 mb-2 justify-center text-xs font-bold">{step}</div>
    <div>{children}</div>
  </div>
);

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
          <DetailRow icon={FaCheckCircle} label="Booking ID" value={booking._id} />
          <DetailRow icon={FaCheckCircle} label="Status" value={<span className="text-green-600">Confirmed</span>} />
          <DetailRow icon={FaCheckCircle} label="Service" value={booking.serviceType} />
          <DetailRow icon={FaCalendarAlt} label="Scheduled Date" value={new Date(booking.scheduledDate).toLocaleString()} />
          <DetailRow icon={FaMapMarkerAlt} label="Address" value={booking.address} />
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
            <InstructionStep step={1}>
              <strong>Prepare the exact amount:</strong> Please have £{booking.estimatedPrice} ready in cash when the cleaner arrives.
            </InstructionStep>
            <InstructionStep step={2}>
              <strong>Payment timing:</strong> Payment is required <u><strong>before</strong></u> the cleaning service begins.
            </InstructionStep>
            <InstructionStep step={3}>
              <strong>Inspect the work:</strong> Please inspect the cleaning work once completed and let us know if anything is missed.
            </InstructionStep>
            <InstructionStep step={4}>
              <strong>Receipt:</strong> The cleaner will provide you with a receipt after receiving payment.
            </InstructionStep>
            <InstructionStep step={5}>
              <strong>Extra time charges:</strong> If the cleaner has to spend more time due to any delays caused by the client (e.g. waiting, access issues), additional charges may apply.
            </InstructionStep>
            <InstructionStep step={6}>
              <strong>Contact us:</strong> If you have any issues with the service or payment, please contact our customer support immediately.
            </InstructionStep>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Your booking is confirmed and the cleaner will arrive at the scheduled time</li>
            <li>• Please ensure someone is available to let the cleaner in and make payment</li>
            <li>• If you need to cancel or reschedule, please contact us at least 24 hours in advance</li>
            <li>• Payment must be made <strong>before</strong> service begins</li>
            <li>• If cleaner spends more time due to client delay, extra charges may apply</li>
          </ul>
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
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
