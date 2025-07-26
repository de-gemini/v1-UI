import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeBackground } from '../../pages/Dashboard';

interface Booking {
  _id: string;
  serviceType: string;
  user?: {
    name?: string;
    email?: string;
  };
  scheduledDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface BookingsListProps {
  title: string;
  bookings: Booking[];
  loading: boolean;
  viewAllLink?: string;
  emptyMessage?: string;
}

const BookingsList: React.FC<BookingsListProps> = ({
  title,
  bookings,
  loading,
  viewAllLink,
  emptyMessage = "No bookings found."
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* <DecorativeBackground/> */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-brand-primary text-sm hover:underline">
            View All
          </Link>
        )}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left py-2">Service</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-500">Loading...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-4 text-gray-500">{emptyMessage}</td></tr>
            ) : bookings.map((booking) => (
              <tr key={booking._id} className="border-b border-gray-100">
                <td className="py-3">{booking.serviceType}</td>
                <td className="py-3 text-brand-primary">{booking.user?.name || booking.user?.email || 'N/A'}</td>
                <td className="py-3">{new Date(booking.scheduledDate).toLocaleDateString()}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-4 text-gray-500">{emptyMessage}</div>
        ) : bookings.map((booking) => (
          <div key={booking._id} className="border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm">{booking.serviceType}</h3>
                <p className="text-brand-primary text-sm">{booking.user?.name || booking.user?.email || 'N/A'}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(booking.scheduledDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList; 