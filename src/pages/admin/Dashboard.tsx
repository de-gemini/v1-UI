import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCalendar,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaPoundSign,
  FaEye,
  FaStar,
  FaCrown,
  FaUserTie,
  FaUserGraduate,
  FaUserFriends,
  FaSprayCan,
  FaBroom,
  FaHandSparkles,
  FaHome,
  FaBuilding,
  FaArrowRight,
} from 'react-icons/fa';
import { Header } from './components/Header.tsx';
import BookingsList from '../../components/admin/BookingsList';
import { ScheduleDetailsModal } from './components/ScheduleDetailsModal';
import { bookingScheduleService } from '../../api/bookingSchedules';
import { toast } from 'react-toastify';
import {
  fetchTotalBookings,
  fetchCompletedBookings,
  fetchPendingBookings,
  fetchTotalRevenue,
  fetchNewCustomers,
  fetchPendingConfirmationBookings,
  fetchRecentBookings,
  fetchUpcomingBookings,
  fetchTopCustomers,
  fetchTopServices,
  fetchDailyVisitors,
} from '../../api/statistics';
import { fetchVisitorStats } from '../../api/visitors';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    newCustomers: 0,
    pendingConfirmationBookings: [],
    recentBookings: [],
    upcomingBookings: [],
    topCustomers: [],
    topServices: [],
  });
  const [visitorStats, setVisitorStats] = useState({ today: 0, yesterday: 0, last7: 0, last30: 0 });
  const [chartData, setChartData] = useState<Array<{day: string, visits: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [
        totalBookingsRes,
        completedBookingsRes,
        pendingBookingsRes,
        totalRevenueRes,
        newCustomersRes,
        pendingConfirmationBookingsRes,
        recentBookingsRes,
        upcomingBookingsRes,
        topCustomersRes,
        topServicesRes,
        dailyVisitorsRes,
      ] = await Promise.all([
        fetchTotalBookings(),
        fetchCompletedBookings(),
        fetchPendingBookings(),
        fetchTotalRevenue(),
        fetchNewCustomers(),
        fetchPendingConfirmationBookings(5),
        fetchRecentBookings(5),
        fetchUpcomingBookings(5),
        fetchTopCustomers(3),
        fetchTopServices(3),
        fetchDailyVisitors(),
      ]);
      setStats({
        totalBookings: totalBookingsRes.data.total,
        completedBookings: completedBookingsRes.data.total,
        pendingBookings: pendingBookingsRes.data.total,
        totalRevenue: totalRevenueRes.data.total,
        newCustomers: newCustomersRes.data.total,
        pendingConfirmationBookings: pendingConfirmationBookingsRes.data,
        recentBookings: recentBookingsRes.data,
        upcomingBookings: upcomingBookingsRes.data,
        topCustomers: topCustomersRes.data.customers,
        topServices: topServicesRes.data.services,
      });
      setChartData(dailyVisitorsRes.data.data);
      const visitorStatsRes = await fetchVisitorStats();
      setVisitorStats(visitorStatsRes.data);
    } catch (e) {
      // Optionally handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Trigger bar chart animations after data loads
  useEffect(() => {
    if (!loading && chartData.length > 0) {
      const timer = setTimeout(() => {
        chartData.forEach((_, index) => {
          const element = document.querySelector(`[data-bar-index="${index}"]`) as HTMLElement;
          if (element) {
            element.style.height = '100%';
          }
        });
      }, 100); // Small delay to ensure DOM is ready

      return () => clearTimeout(timer);
    }
  }, [loading, chartData]);

  const handleCardClick = (filterType: string) => {
    if (filterType === 'revenue') {
      // Navigate to payments page for revenue card
      navigate('/admin/payments');
    } else if (filterType === 'new-customers') {
      // Navigate to payments page with unique customers filter
      navigate('/admin/payments?filter=unique-customers');
    } else if (filterType === 'visitors') {
      // Scroll to the chart section without smooth behavior to prevent zoom issues
      chartRef.current?.scrollIntoView({ 
        block: 'start' 
      });
    } else {
      // Navigate to bookings page with filter for other cards
      navigate(`/admin/bookings?filter=${filterType}`);
    }
  };

  const handleBookingClick = async (booking: any) => {
    try {
      console.log('🔍 [DEBUG] handleBookingClick called with booking:', booking);
      
      // The booking._id is actually a schedule ID from the statistics service
      const schedule = await bookingScheduleService.getSchedule(booking._id);
      console.log('🔍 [DEBUG] Fetched schedule:', schedule);
      
      setSelectedSchedule(schedule.payload); // Use schedule.payload as that's the actual schedule data
      setShowDetailsModal(true);
    } catch (error) {
      console.error('Failed to fetch schedule details:', error);
      toast.error('Failed to load schedule details');
    }
  };

  const handleScheduleStatusUpdate = async (scheduleId: string, newStatus: "pending" | "confirmed" | "completed" | "cancelled") => {
    try {
      await bookingScheduleService.updateScheduleStatusAdmin(scheduleId, newStatus);
      toast.success(`Schedule status updated to ${newStatus}`);
      
      // Refresh the dashboard data
      loadStats();
      
      // Update the selectedSchedule with the new status
      if (selectedSchedule && selectedSchedule._id === scheduleId) {
        setSelectedSchedule({
          ...selectedSchedule,
          status: newStatus
        });
      }
    } catch (error) {
      toast.error("Failed to update schedule status");
    }
  };

  const handleSchedulePaymentStatusUpdate = async (scheduleId: string, newPaymentStatus: "pending" | "completed" | "failed") => {
    try {
      await bookingScheduleService.updateSchedulePaymentStatusAdmin(scheduleId, newPaymentStatus);
      toast.success(`Payment status updated to ${newPaymentStatus}`);
      
      // Refresh the dashboard data
      loadStats();
      
      // Update the selectedSchedule with the new payment status
      if (selectedSchedule && selectedSchedule._id === scheduleId) {
        setSelectedSchedule({
          ...selectedSchedule,
          paymentStatus: newPaymentStatus
        });
      }
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

  // Mock data for the chart - replace with real data when available
  const maxVisits = chartData.length > 0 ? Math.max(...chartData.map(d => d.visits)) : 1;

  // Array of gradient colors for the bars
  const barColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600', 
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
  ];

  return (
    <div className="space-y-6">
      <Header head="Welcome back Kelly" subtitle="Welcome to your admin dashboard" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
          onClick={() => handleCardClick('all')}
        >
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaCalendar className="text-xl text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : stats.totalBookings}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-200 group"
          onClick={() => handleCardClick('new-customers')}
        >
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaUsers className="text-xl text-green-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">New Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : stats.newCustomers}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-green-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all duration-200 group"
          onClick={() => handleCardClick('completed')}
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaCheckCircle className="text-xl text-emerald-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : stats.completedBookings}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-emerald-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-amber-200 transition-all duration-200 group"
          onClick={() => handleCardClick('pending')}
        >
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaClock className="text-xl text-amber-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : stats.pendingBookings}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-amber-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-purple-200 transition-all duration-200 group"
          onClick={() => handleCardClick('revenue')}
        >
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaPoundSign className="text-xl text-purple-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : `£${Math.round(stats.totalRevenue).toLocaleString()}`}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-purple-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        
        <div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative min-h-[140px] cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
          onClick={() => handleCardClick('visitors')}
        >
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center absolute top-2 right-2">
            <FaEye className="text-xl text-indigo-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mt-6">Visitors Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : visitorStats.today}</p>
            </div>
            <FaArrowRight className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      </div>

      {/* Summary Chart */}
      <div ref={chartRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Daily Visitors - Last 7 Days</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">Last 7 days</button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-center gap-4">
          {loading ? (
            // Loading skeleton with animated bars
            Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-10 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg" 
                     style={{ 
                       height: `${Math.random() * 150 + 50}px`,
                       animation: 'loadingBar 2s ease-in-out infinite'
                     }}>
                </div>
                <span className="text-xs text-gray-400 mt-2 font-medium">--</span>
                <span className="text-xs text-gray-300">--</span>
              </div>
            ))
          ) : (
            chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="sm:w-10 w-5 bg-gray-100 rounded-t-lg relative overflow-hidden" 
                     style={{ height: `${(data.visits / maxVisits) * 200}px` }}>
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t ${barColors[index]} rounded-t-lg`}
                    style={{
                      height: '0%',
                      transition: `height 0.8s ease-out ${index * 0.1}s`
                    }}
                    data-bar-index={index}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2 font-medium" 
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.8}s forwards`,
                        opacity: 0
                      }}>
                  {data.day}
                </span>
                <span className="text-xs text-gray-400"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.8}s forwards`,
                        opacity: 0
                      }}>
                  {data.visits}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lower Section: Pending Confirmation, Recent Bookings, Upcoming Bookings, Top Services, Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Confirmation Bookings - URGENT */}
        <div className="lg:col-span-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Action Required</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p><strong>Conditions:</strong> Customer has paid but booking is not yet confirmed by admin</p>
                  <p><strong>Recommended Action:</strong> Review and confirm these bookings to proceed with service</p>
                </div>
              </div>
            </div>
          </div>
          <BookingsList
            title="⚠️ Pending Confirmation"
            bookings={stats.pendingConfirmationBookings}
            loading={loading}
            viewAllLink="/admin/bookings"
            emptyMessage="No bookings pending confirmation."
            onBookingClick={handleBookingClick}
          />
        </div>
        
        {/* Recent Paid Bookings */}
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Recent Activity</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p><strong>Conditions:</strong> All bookings that have been paid for recently</p>
                  <p><strong>Purpose:</strong> Monitor recent payment activity and booking trends</p>
                </div>
              </div>
            </div>
          </div>
          <BookingsList
            title="Recently Paid"
            bookings={stats.recentBookings}
            loading={loading}
            viewAllLink="/admin/bookings"
            emptyMessage="No recently paid bookings found."
            onBookingClick={handleBookingClick}
          />
        </div>
        
        {/* Upcoming Confirmed Bookings */}
        <div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Ready to Go</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p><strong>Conditions:</strong> Paid and confirmed bookings with future dates</p>
                  <p><strong>Purpose:</strong> Track upcoming confirmed services for scheduling</p>
                </div>
              </div>
            </div>
          </div>
          <BookingsList
            title="Upcoming Confirmed"
            bookings={stats.upcomingBookings}
            loading={loading}
            viewAllLink="/admin/bookings"
            emptyMessage="No upcoming confirmed bookings found."
            onBookingClick={handleBookingClick}
          />
        </div>
        
        {/* Side Widgets */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Top Services */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h2>
            <ul className="space-y-4">
              {loading ? (
                <li className="text-gray-500">Loading...</li>
              ) : stats.topServices.length === 0 ? (
                <li className="text-gray-500">No data</li>
              ) : stats.topServices.map((s: any, index: number) => {
                const serviceIcons = [FaSprayCan, FaBroom, FaHandSparkles, FaHome, FaBuilding];
                const serviceColors = [
                  'bg-blue-50 text-blue-600',
                  'bg-green-50 text-green-600', 
                  'bg-purple-50 text-purple-600',
                  'bg-orange-50 text-orange-600',
                  'bg-pink-50 text-pink-600'
                ];
                const IconComponent = serviceIcons[index % serviceIcons.length];
                const colorClass = serviceColors[index % serviceColors.length];
                
                return (
                  <li key={s._id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${colorClass.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`text-lg ${colorClass.split(' ')[1]}`} />
                    </div>
                    <span className="flex-1 text-gray-700 font-medium">{s._id}</span>
                    <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{s.count} Bookings</span>
                </li>
                );
              })}
            </ul>
          </div>
          
          {/* Top Customers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Customers</h2>
            <ul className="space-y-4">
              {loading ? (
                <li className="text-gray-500">Loading...</li>
              ) : stats.topCustomers.length === 0 ? (
                <li className="text-gray-500">No data</li>
              ) : stats.topCustomers.map((c: any, index: number) => {
                const customerColors = [
                  'bg-yellow-50 text-yellow-600',
                  'bg-purple-50 text-purple-600',
                  'bg-blue-50 text-blue-600',
                  'bg-green-50 text-green-600',
                  'bg-pink-50 text-pink-600'
                ];
                const colorClass = customerColors[index % customerColors.length];
                
                return (
                  <li key={c._id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${colorClass.split(' ')[0]} rounded-lg flex items-center justify-center`}>
                      <FaUserFriends className={`text-lg ${colorClass.split(' ')[1]}`} />
                    </div>
                    <span className="flex-1 text-gray-700 font-medium">{c.name || c.email || c._id}</span>
                    <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{c.bookings} Bookings</span>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Schedule Details Modal */}
      <ScheduleDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          console.log('🔍 [DEBUG] Modal closing');
          setShowDetailsModal(false);
          setSelectedSchedule(null);
        }}
        schedule={selectedSchedule}
        onStatusUpdate={handleScheduleStatusUpdate}
        onPaymentStatusUpdate={handleSchedulePaymentStatusUpdate}
      />
    </div>
  );
};

export default AdminDashboard; 