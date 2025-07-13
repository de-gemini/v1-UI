import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/isTokenValid";
import { useAuthStore } from "../store/authStore";

export function PendingBookingModal() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const checkPending = () => {
      const token = localStorage.getItem("token");
      const pending = localStorage.getItem("pendingBooking");
      const handled = localStorage.getItem("pendingBookingHandled");
      if (isTokenValid(token) && pending && handled !== "true") {
        setShow(true);
      }
    };
    checkPending();
    const interval = setInterval(checkPending, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleCompleteBooking = () => {
    setShow(false);
    localStorage.setItem("pendingBookingHandled", "true");
    navigate("/checkout");
  };

  const handleDismissBooking = () => {
    setShow(false);
    setShowConfirm(true);
  };

  const handleConfirmNo = () => {
    localStorage.removeItem("pendingBooking");
    localStorage.removeItem("pendingBookingHandled");
    setShowConfirm(false);
  };

  const handleCancelNo = () => {
    setShowConfirm(false);
  };

  if (!show && !showConfirm) return null;

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Pending Booking</h2>
            <p className="mb-4">You have a pending booking. Would you like to complete it?</p>
            <div className="flex justify-end gap-2">
              <button onClick={handleDismissBooking} className="px-4 py-2 bg-gray-200 rounded">No</button>
              <button onClick={handleCompleteBooking} className="px-4 py-2 bg-blue-600 text-white rounded">Yes</button>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Are you really sure?</h2>
            <p className="mb-4">This will clear your booking detail.</p>
            <div className="flex justify-end gap-2">
              <button onClick={handleCancelNo} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleConfirmNo} className="px-4 py-2 bg-red-600 text-white rounded">Yes, clear it</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 