import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../api/axiosInstance';

// Add a Booking type for the dashboard list
interface Booking {
  _id: string;
  serviceType?: string;
  scheduledDate?: string;
  address?: string;
  paymentStatus?: string;
  booking?: {
    serviceType?: string;
    scheduledDate?: string;
    address?: string;
    paymentStatus?: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/bookings')
      .then(res => setBookings(res.data.payload || res.data.data || res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto py-6 px-2 sm:px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Bookings</h2>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No bookings found.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {bookings.map((b, idx) => (
              <li
                key={b._id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-4 py-4 ${
                  idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div>
                  <div className="font-semibold text-brand-primary">{b.serviceType || b.booking?.serviceType}</div>
                  <div className="text-xs text-gray-500">{new Date((b.scheduledDate || b.booking?.scheduledDate) ?? '').toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">{b.address || b.booking?.address}</div>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    b.paymentStatus === 'succeeded' || b.paymentStatus === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : b.paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {b.paymentStatus ? b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1) : 'Unknown'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 