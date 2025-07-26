import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaShoePrints, FaBoxOpen, FaTshirt } from 'react-icons/fa';
import { Header } from './components/Header.tsx';
import BookingsList from '../../components/admin/BookingsList';
import {
  fetchTotalBookings,
  fetchCompletedBookings,
  fetchPendingBookings,
  fetchTotalRevenue,
  fetchNewCustomers,
  fetchRecentBookings,
  fetchUpcomingBookings,
  fetchTopCustomers,
  fetchTopServices,
} from '../../api/statistics';
import { fetchVisitorStats } from '../../api/visitors';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    newCustomers: 0,
    recentBookings: [],
    upcomingBookings: [],
    topCustomers: [],
    topServices: [],
  });
  const [visitorStats, setVisitorStats] = useState({ today: 0, yesterday: 0, last7: 0, last30: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [
          totalBookingsRes,
          completedBookingsRes,
          pendingBookingsRes,
          totalRevenueRes,
          newCustomersRes,
          recentBookingsRes,
          upcomingBookingsRes,
          topCustomersRes,
          topServicesRes,
        ] = await Promise.all([
          fetchTotalBookings(),
          fetchCompletedBookings(),
          fetchPendingBookings(),
          fetchTotalRevenue(),
          fetchNewCustomers(),
          fetchRecentBookings(5),
          fetchUpcomingBookings(5),
          fetchTopCustomers(3),
          fetchTopServices(3),
        ]);
        setStats({
          totalBookings: totalBookingsRes.data.total,
          completedBookings: completedBookingsRes.data.total,
          pendingBookings: pendingBookingsRes.data.total,
          totalRevenue: totalRevenueRes.data.total,
          newCustomers: newCustomersRes.data.total,
          recentBookings: recentBookingsRes.data.bookings,
          upcomingBookings: upcomingBookingsRes.data.bookings,
          topCustomers: topCustomersRes.data.customers,
          topServices: topServicesRes.data.services,
        });
        const visitorStatsRes = await fetchVisitorStats();
        setVisitorStats(visitorStatsRes.data);
      } catch (e) {
        // Optionally handle error
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <Header head="Welcome back Kelly" subtitle="Welcome to your admin dashboard" />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
        <div className="bg-orange-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Total Bookings</span>
          <span className="text-2xl font-bold">{loading ? '...' : stats.totalBookings}</span>
        </div>
        <div className="bg-green-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">New Customers (This Month)</span>
          <span className="text-2xl font-bold">{loading ? '...' : stats.newCustomers}</span>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Completed Bookings</span>
          <span className="text-2xl font-bold">{loading ? '...' : stats.completedBookings}</span>
        </div>
        <div className="bg-cyan-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Pending/Upcoming Bookings</span>
          <span className="text-2xl font-bold">{loading ? '...' : stats.pendingBookings}</span>
        </div>
        <div className="bg-red-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Total Revenue</span>
          <span className="text-2xl font-bold">{loading ? '...' : `£${stats.totalRevenue.toLocaleString()}`}</span>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl shadow flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Visitors Today</span>
          <span className="text-2xl font-bold">{loading ? '...' : visitorStats.today}</span>
          <span className="text-xs text-gray-400 mt-1 hidden sm:block">Yesterday: {visitorStats.yesterday} | Last 7d: {visitorStats.last7} | Last 30d: {visitorStats.last30}</span>
          <span className="text-xs text-gray-400 mt-1 sm:hidden">7d: {visitorStats.last7}</span>
        </div>
      </div>

      {/* Summary Chart Placeholder */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-background-200 rounded text-sm">Last 7 days</button>
          </div>
        </div>
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-background-300 rounded-lg">
          [Chart Placeholder]
        </div>
      </div>

      {/* Lower Section: Recent Bookings, Upcoming Bookings, Top Services, Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-4">
        {/* Recent Bookings */}
        <BookingsList
          title="Recent Bookings"
          bookings={stats.recentBookings}
          loading={loading}
          viewAllLink="/admin/bookings"
          emptyMessage="No recent bookings found."
        />
        
        {/* Upcoming Bookings */}
        <BookingsList
          title="Upcoming Bookings"
          bookings={stats.upcomingBookings}
          loading={loading}
          viewAllLink="/admin/bookings"
          emptyMessage="No upcoming bookings found."
        />
        {/* Side Widgets */}
        <div className="flex flex-col gap-4 lg:gap-6 lg:col-span-2 xl:col-span-2">
          {/* Top Services */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Top Services</h2>
            <ul className="space-y-3">
              {loading ? (
                <li>Loading...</li>
              ) : stats.topServices.length === 0 ? (
                <li>No data</li>
              ) : stats.topServices.map((s: any) => (
                <li key={s._id} className="flex items-center gap-3">
                  <FaBoxOpen className="text-xl text-blue-400 flex-shrink-0" />
                  <span className="flex-1 min-w-0 truncate">{s._id}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{s.count} Bookings</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Top Customers */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Top Customers</h2>
            <ul className="space-y-3">
              {loading ? (
                <li>Loading...</li>
              ) : stats.topCustomers.length === 0 ? (
                <li>No data</li>
              ) : stats.topCustomers.map((c: any) => (
                <li key={c._id} className="flex items-center gap-3">
                  <FaShoePrints className="text-xl text-blue-500 flex-shrink-0" />
                  <span className="flex-1 min-w-0 truncate">{c.name || c.email || c._id}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{c.bookings} Bookings</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 