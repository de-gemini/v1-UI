import React, { useEffect, useState, useMemo } from 'react';
import axiosInstance from '../../api/axiosInstance';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

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

type FilterType = 'upcoming' | 'history';

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('upcoming');

  useEffect(() => {
    axiosInstance.get('/bookings', { headers: getAuthHeader() })
      .then(res => setBookings(res.data.payload || res.data.data || res.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter bookings based on date
  const filteredBookings = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.scheduledDate || booking.booking?.scheduledDate || '');
      const bookingDateOnly = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), bookingDate.getDate());
      
      if (activeFilter === 'upcoming') {
        return bookingDateOnly >= today;
      } else {
        return bookingDateOnly < today;
      }
    }).sort((a, b) => {
      const dateA = new Date(a.scheduledDate || a.booking?.scheduledDate || '');
      const dateB = new Date(b.scheduledDate || b.booking?.scheduledDate || '');
      return activeFilter === 'upcoming' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }, [bookings, activeFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          <p className="text-sm text-gray-500">Manage your cleaning appointments</p>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
            activeFilter === 'upcoming'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upcoming
          <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
            {bookings.filter(b => {
              const bookingDate = new Date(b.scheduledDate || b.booking?.scheduledDate || '');
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return bookingDate >= today;
            }).length}
          </span>
        </button>
        <button
          onClick={() => setActiveFilter('history')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
            activeFilter === 'history'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
          <span className="ml-2 bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
            {bookings.filter(b => {
              const bookingDate = new Date(b.scheduledDate || b.booking?.scheduledDate || '');
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return bookingDate < today;
            }).length}
          </span>
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-gray-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading your bookings...
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">You haven't made any bookings yet. Start by exploring our services!</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeFilter === 'upcoming' ? 'upcoming' : 'past'} bookings
          </h3>
          <p className="text-gray-500">
            {activeFilter === 'upcoming' 
              ? "You don't have any upcoming bookings. Book a cleaning service to get started!"
              : "You don't have any past bookings yet."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b, idx) => {
            const bookingDate = new Date(b.scheduledDate || b.booking?.scheduledDate || '');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = bookingDate < today;
            
            return (
              <div
                key={b._id}
                className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  isPast 
                    ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 opacity-75' 
                    : idx % 2 === 0 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100' 
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isPast 
                          ? 'bg-gradient-to-r from-gray-400 to-gray-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex items-center">
                        <h3 className={`font-semibold text-lg ${
                          isPast ? 'text-gray-600 line-through' : 'text-gray-900'
                        }`}>
                          {b.serviceType || b.booking?.serviceType}
                        </h3>
                        {isPast && (
                          <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-11 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {bookingDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {b.address || b.booking?.address}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      b.paymentStatus === 'succeeded' || b.paymentStatus === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : b.paymentStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        b.paymentStatus === 'succeeded' || b.paymentStatus === 'completed'
                          ? 'bg-green-400'
                          : b.paymentStatus === 'pending'
                          ? 'bg-yellow-400'
                          : 'bg-gray-400'
                      }`}></span>
                      {b.paymentStatus ? b.paymentStatus.charAt(0).toUpperCase() + b.paymentStatus.slice(1) : 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings; 