import React, { useEffect, useState, useMemo } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { FaCalendarAlt, FaMapMarkerAlt, FaPoundSign, FaDownload, FaTimes, FaUndo } from 'react-icons/fa';
import { createBookingsPDF, type PDFBooking } from '../../utils/pdfUtils';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

// Updated interface to match Schedule data structure
interface Schedule {
  _id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startDate: string;
  time: string;
  frequency: string;
  paymentStatus: string; // Payment status from Schedule document
  booking: {
    _id: string;
    serviceType: string;
    address: string;
    estimatedPrice: number;
    estimatedDuration: number;
    user: {
      _id: string;
      name: string;
      email: string;
    };
  };
}

type FilterType = 'upcoming' | 'history';

const Bookings = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('upcoming');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get('/bookings/client-schedules/all', { headers: getAuthHeader() })
      .then(res => setSchedules(res.data.payload || res.data.data || res.data || []))
      .catch(() => setSchedules([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter schedules based on date
  const filteredSchedules = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.startDate);
      const scheduleDateOnly = new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate());
      
      if (activeFilter === 'upcoming') {
        return scheduleDateOnly >= today;
      } else {
        return scheduleDateOnly < today;
      }
    }).sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return activeFilter === 'upcoming' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }, [schedules, activeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = async (text: string, bookingId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(bookingId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleExportPDF = () => {
    // Convert schedules to PDFBooking format
    const pdfBookings: PDFBooking[] = filteredSchedules.map(schedule => ({
      _id: schedule._id,
      user: schedule.booking.user,
      scheduledDate: schedule.startDate,
      status: schedule.status,
      address: schedule.booking.address,
      estimatedPrice: schedule.booking.estimatedPrice,
      estimatedDuration: schedule.booking.estimatedDuration,
      paymentStatus: schedule.paymentStatus,
    }));

    // Use the utility function to create PDF
    createBookingsPDF(pdfBookings, activeFilter);
  };

  const handleCancelBooking = (bookingId: string) => {
    const message = `Hello, I want to cancel my booking of ID ${bookingId}`;
    const whatsappUrl = `https://wa.me/+447399487915?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRefundBooking = (bookingId: string) => {
    const message = `Hello, I want a refund for my booking of ID ${bookingId}`;
    const whatsappUrl = `https://wa.me/+447399487915?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Cleaning Appointments</h2>
            <p className="text-sm text-gray-500">Manage your cleaning sessions</p>
          </div>
        </div>
        
        {/* Export Button */}
        {filteredSchedules.length > 0 && (
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <FaDownload className="text-sm" />
            <span>Export as PDF</span>
          </button>
        )}
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
            {schedules.filter(s => {
              const scheduleDate = new Date(s.startDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return scheduleDate >= today;
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
            {schedules.filter(s => {
              const scheduleDate = new Date(s.startDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return scheduleDate < today;
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
            Loading your appointments...
          </div>
        </div>
      ) : schedules.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500">You haven't made any bookings yet. Start by exploring our services!</p>
        </div>
      ) : filteredSchedules.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeFilter === 'upcoming' ? 'upcoming' : 'past'} appointments
          </h3>
          <p className="text-gray-500">
            {activeFilter === 'upcoming' 
              ? "You don't have any upcoming appointments. Book a cleaning service to get started!"
              : "You don't have any past appointments yet."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchedules.map((schedule, idx) => {
            const scheduleDate = new Date(schedule.startDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = scheduleDate < today;
            
            return (
  <div
    key={schedule._id}
    className={`p-6 rounded-2xl border shadow-sm transition-all duration-200 ${
      isPast
        ? 'bg-gray-50 border-gray-200 opacity-70'
        : 'bg-white border-gray-100'
    } hover:shadow-md`}
  >
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
      {/* Left Section */}
      <div className="flex-1 space-y-4">
        {/* Header: Icon + Service Type + Status */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isPast ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h3
              className={`text-lg font-semibold ${
                isPast ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}
            >
              {schedule.booking.serviceType}
            </h3>
            
          </div>
        </div>

        {/* Booking ID */}
        <div className="flex  items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0" />
            </svg>
            <span className="text-xs text-gray-500">Booking ID</span>
            <span className="text-sm font-mono text-gray-800">{schedule.booking._id}</span>
          </div>
          <button
            onClick={() => copyToClipboard(schedule.booking._id, schedule.booking._id)}
            title="Copy Booking ID"
            className="p-1.5 rounded hover:bg-gray-200 transition"
          >
            {copiedId === schedule.booking._id ? (
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Booking Details */}
        <div className="grid gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-gray-400 w-4 h-4" />
            <span>{scheduleDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {schedule.time}</span>
          </div>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-gray-400 w-4 h-4 mt-0.5" />
            <span>{schedule.booking.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPoundSign className="text-gray-400 w-4 h-4" />
            <span>£{schedule.booking.estimatedPrice}</span>
          </div>
        </div>

        {/* Action Buttons - Only show for upcoming paid bookings */}
        {isPast  && (
        // {!isPast && (schedule.paymentStatus === 'succeeded' || schedule.paymentStatus === 'completed') && (
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={() => handleCancelBooking(schedule.booking._id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              title="Cancel this booking"
            >
              <FaTimes className="w-4 h-4" />
              Cancel Booking
            </button>
            <button
              onClick={() => handleRefundBooking(schedule.booking._id)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
              title="Request refund for this booking"
            >
              <FaUndo className="w-4 h-4" />
              Request Refund
            </button>
          </div>
        )}
      </div>
      <div className="flex  items-start lg:items-end gap-4">
      {/* Right Section - Payment Status */}
      <div className="flex flex-col items-start lg:items-end gap-2">
        <p className="text-sm font-medium text-gray-500">Payment Status</p>
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${
            schedule.paymentStatus === 'succeeded' || schedule.paymentStatus === 'completed'
              ? 'bg-green-100 text-green-800'
              : schedule.paymentStatus === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <span
            className={`w-2 h-2 mr-2 rounded-full ${
              schedule.paymentStatus === 'succeeded' || schedule.paymentStatus === 'completed'
                ? 'bg-green-500'
                : schedule.paymentStatus === 'pending'
                ? 'bg-yellow-500'
                : 'bg-gray-400'
            }`}
          ></span>
          {schedule.paymentStatus
            ? schedule.paymentStatus.charAt(0).toUpperCase() + schedule.paymentStatus.slice(1)
            : 'Unknown'}
        </span>
      </div>
      <div>
      <p className='text-gray-500 text-sm font-medium'>Booking status</p>
      <span className={`mt-2 my-8 inline-block text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(schedule.status)}`}>
              {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
      </span>
    </div>
    </div>
    </div>
    <p className='text-gray-500 text-[10px]'>*All terms and conditions apply</p>
  </div>

)

          })}
        </div>
      )}
    </div>
  );
};

export default Bookings; 