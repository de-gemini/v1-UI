import React, { useEffect, useState, useRef } from "react";
import {
  FaEye,
  FaCheck,
  FaCheckDouble,
  FaCheckCircle,
  FaTimes,
  FaClock,
  FaFilter,
  FaHourglassHalf,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStickyNote,
  FaPoundSign,
} from "react-icons/fa";
import { Header } from "./components/Header";
import { useBookingScheduleStore } from "../../store/bookingScheduleStore";
import { Countdown } from "../../components/shared/Countdown";
import type { Schedule } from "../../api/bookingSchedules";
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

interface ScheduleManagementProps {
  className?: string;
}

// Static palette of 20 visually distinct pastel colors
const CARD_COLORS = [
  { bg: "#f3fafe", border: "#38bdf8" }, // lighter blue
  { bg: "#fdf4fa", border: "#ec4899" }, // lighter pink
  { bg: "#f8fafc", border: "#64748b" }, // lighter neutral
  { bg: "#f8f4fc", border: "#a21caf" }, // lighter purple
  { bg: "#f3fcf6", border: "#22c55e" }, // lighter green
  { bg: "#fff6f6", border: "#ef4444" }, // lighter red
  { bg: "#fff8ed", border: "#f59e42" }, // lighter orange
  { bg: "#f7f4fd", border: "#7c3aed" }, // lighter indigo
  { bg: "#f3f6ff", border: "#6366f1" }, // lighter blue2
  { bg: "#f4fdf7", border: "#16a34a" }, // lighter green2
  { bg: "#f8fafc", border: "#334155" }, // lighter neutral2
  { bg: "#fffaf7", border: "#ea580c" }, // lighter orange2
  { bg: "#f7f8fa", border: "#6b7280" }, // lighter gray
  { bg: "#fbfcfd", border: "#0ea5e9" }, // lighter sky
  { bg: "#fff7f8", border: "#be123c" }, // lighter rose
  { bg: "#fdf7fb", border: "#db2777" }, // lighter fuchsia
  { bg: "#f4fdfa", border: "#14b8a6" }, // lighter teal
  { bg: "#fffdea", border: "#ca8a04" }, // lighter amber
  { bg: "#fafafa", border: "#525252" }, // lighter neutral3
];

// Utility: Hash a string to a number (simple hash)
function hashStringToNumber(str: string, max: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
}

// Deterministic pastel color based on schedule id
function getPastelColorFromId(id: string) {
  const hue = hashStringToNumber(id, 360);
  const bg = `hsl(${hue}, 100%, 98%)`;
  const border = `hsl(${hue}, 80%, 60%)`;
  return { bg, border };
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({
  className = "",
}) => {
  // Utility and date helpers at the very top
  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month - 1, day));
    }
    return days;
  };
  const [filters, setFilters] = useState({
    status: "" as string,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const firstScheduleRef = useRef<HTMLDivElement>(null);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState('');
  const [chargeReason, setChargeReason] = useState('');
  const [chargingSchedule, setChargingSchedule] = useState<any>(null);
  const [paymentLink, setPaymentLink] = useState('');
  const [isCharging, setIsCharging] = useState(false);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('paid');
  const [showConfirmCharge, setShowConfirmCharge] = useState(false);
  const MAX_EXTRA_CHARGE = 200;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const allDays = getDaysInMonth(filters.year, filters.month);

  const {
    schedules,
    loading,
    error,
    pagination,
    fetchSchedules,
    updateScheduleStatus,
    setError,
  } = useBookingScheduleStore();

  useEffect(() => {
    fetchSchedules({
      year: filters.year,
      month: filters.month,
      page: 1,
      limit: 100,
    });
  }, [filters.year, filters.month, fetchSchedules]);

  // Auto-scroll to first schedule when schedules are loaded
  useEffect(() => {
    if (!schedules || loading) return;

    // Find the first day with visible schedules that is today or in the future
    let found = false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let dayIdx = 0; dayIdx < allDays.length; dayIdx++) {
      const date = allDays[dayIdx];
      if (!date || date < today) continue; // skip past days

      const daySchedules = getSchedulesForDate(date);
      const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
      const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
      const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);

      if (filteredSchedules.length > 0 && !found) {
      setTimeout(() => {
        if (firstScheduleRef.current) {
            console.log('Scrolling to earliest visible schedule (today or future)');
          firstScheduleRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          } else {
            console.log('No firstScheduleRef found (today or future)');
        }
      }, 500);
        found = true;
        break;
    }
    }
  }, [schedules, loading, paymentStatusFilter, filters.status, searchTerm, allDays]);

  const handleStatusUpdate = async (
    scheduleId: string,
    newStatus: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    try {
      await updateScheduleStatus(scheduleId, newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "green-500";
      case "completed":
        return "blue-500";
      case "cancelled":
        return "red-500";
      case "pending":
        return "yellow-300";
      default:
        return "gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const getSchedulesForDate = (date: Date) => {
    if (!schedules) return [];

    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.startDate);
      const isSame =
        scheduleDate.getFullYear() === date.getFullYear() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getDate() === date.getDate();
      return isSame;
    });
  };

  // --- Filtering helpers ---
  const filterSchedulesByStatus = (schedules: any[], status: string) => {
    if (!status) return schedules;
    return schedules.filter((schedule) => schedule.booking?.status === status);
  };

  const filterSchedulesBySearch = (schedules: any[], searchTerm: string) => {
    if (!searchTerm) return schedules;
    return schedules.filter(
      (schedule) =>
        schedule.booking.user.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        schedule.booking.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  const filterSchedulesByPaymentStatus = (schedules: any[], filter: string) => {
    if (filter === 'all') return schedules;
    if (filter === 'paid') return schedules.filter(s => ['completed', 'succeeded'].includes(s.booking?.paymentStatus));
    if (filter === 'unpaid') return schedules.filter(s => !['completed', 'succeeded'].includes(s.booking?.paymentStatus));
    return schedules;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handlePreviousMonth = () => {
    setFilters((prev) => {
      const newMonth = prev.month === 1 ? 12 : prev.month - 1;
      const newYear = prev.month === 1 ? prev.year - 1 : prev.year;
      return { ...prev, month: newMonth, year: newYear };
    });
  };

  const handleNextMonth = () => {
    setFilters((prev) => {
      const newMonth = prev.month === 12 ? 1 : prev.month + 1;
      const newYear = prev.month === 12 ? prev.year + 1 : prev.year;
      return { ...prev, month: newMonth, year: newYear };
    });
  };

  return (
    <div className={`space-y-4   sm:space-y-6 ${className}`}>
      <div className="py-16">
        <Header
          head="Schedule Management"
          subtitle="View and manage all booking schedules in monthly diary format"
        />
      </div>

      {error && (
        <div className="p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        {/* Month navigation and display */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous Month"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
            {monthNames[filters.month - 1]} {filters.year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next Month"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-6 flex-wrap">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Filter
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatusFilter}
                onChange={e => setPaymentStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="flex-1 min-w-[220px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-auto mt-4 sm:mt-0">
            <span className="font-bold text-red-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
              {allDays.reduce((acc, date) => {
                const daySchedules = getSchedulesForDate(date);
                const filteredByStatus = filterSchedulesByStatus(
                  daySchedules,
                  filters.status
                );
                const filteredByPaymentStatus = filterSchedulesByPaymentStatus(
                  filteredByStatus,
                  paymentStatusFilter
                );
                const filteredSchedules = filterSchedulesBySearch(
                  filteredByPaymentStatus,
                  searchTerm
                );
                return acc + filteredSchedules.length;
              }, 0)}
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-400 mt-1">
              {allDays.reduce((acc, date) => {
                const daySchedules = getSchedulesForDate(date);
                const filteredByStatus = filterSchedulesByStatus(
                  daySchedules,
                  filters.status
                );
                const filteredByPaymentStatus = filterSchedulesByPaymentStatus(
                  filteredByStatus,
                  paymentStatusFilter
                );
                const filteredSchedules = filterSchedulesBySearch(
                  filteredByPaymentStatus,
                  searchTerm
                );
                return acc + filteredSchedules.length;
              }, 0) > 1 ? "schedules." : "schedule"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-32 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allDays.map((date, dayIdx) => {
              const daySchedules = getSchedulesForDate(date);
              // Apply status filter first, then search filter
              const filteredByStatus = filterSchedulesByStatus(
                daySchedules,
                filters.status
              );
              const filteredByPaymentStatus = filterSchedulesByPaymentStatus(
                filteredByStatus,
                paymentStatusFilter
              );
              let filteredSchedules = filterSchedulesBySearch(
                filteredByPaymentStatus,
                searchTerm
              );
              // Sort paid first by default
              if (paymentStatusFilter === 'all') {
                filteredSchedules = [
                  ...filteredSchedules.filter(s => ['completed', 'succeeded'].includes(s.booking?.paymentStatus)),
                  ...filteredSchedules.filter(s => !['completed', 'succeeded'].includes(s.booking?.paymentStatus)),
                ];
              }
              const isToday = date.toDateString() === new Date().toDateString();
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              // Check if this is the first day with schedules
              const isEarliestFutureWithSchedules =
                date &&
                date >= today &&
                filteredSchedules.length > 0 &&
                allDays
                  .slice(0, dayIdx)
                  .every(
                    (prevDate) =>
                      !prevDate ||
                      prevDate < today ||
                      filterSchedulesBySearch(
                        filterSchedulesByPaymentStatus(
                          filterSchedulesByStatus(getSchedulesForDate(prevDate), filters.status),
                          paymentStatusFilter
                        ),
                        searchTerm
                      ).length === 0
                  );

              return (
                <div
                  key={date.toISOString()}
                  ref={isEarliestFutureWithSchedules ? firstScheduleRef : null}
                  className={
                    `p-4 sm:p-6 transition-colors ` +
                    (isToday
                      ? "bg-blue-50 border-l-4 border-blue-500 "
                      : isPast
                        ? "bg-gray-100 opacity-60 "
                        : "hover:bg-gray-50 ") +
                    (isEarliestFutureWithSchedules ? "ring-2 ring-brand-primary ring-opacity-50 " : "")
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`text-2xl sm:text-4xl font-bold ${
                          isToday ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="text-gray-600">
                        <div className="font-medium text-sm sm:text-base">
                          {daysOfWeek[date.getDay()]}
                        </div>
                        <div className="text-xs sm:text-sm">
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    {filteredSchedules.length > 0 && (
                      <div className="text-xs sm:text-sm text-gray-500">
                        {filteredSchedules.length} booking
                        {filteredSchedules.length !== 1 ? "s" : ""}
                        {isEarliestFutureWithSchedules && (
                          <span className="ml-2 text-brand-primary font-medium">
                            ← First schedule
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {filteredSchedules.length === 0 ? (
                    <div className="text-gray-400 italic text-sm">
                      No bookings for this day
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSchedules.map((schedule, idx) => {
                        // Offset the color palette for each day by 2
                        const color =
                          CARD_COLORS[(dayIdx * 2 + idx) % CARD_COLORS.length];
                        return (
                          <div
                            key={schedule._id}
                            className="p-5 hover:shadow-md transition-shadow rounded-lg"
                            style={{
                              background: color.bg,
                              borderLeft: `6px solid ${color.border}`,
                              borderTop: "1px solid #e5e7eb",
                              borderBottom: "1px solid #e5e7eb",
                              borderRight: "1px solid #e5e7eb",
                            }}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                  <div className="flex text-brand-primary items-center gap-2">
                                    <FaClock className=" text-sm sm:text-base" />
                                    <span className="font-medium text-base sm:text-lg">
                                      {(() => {
                                        // Convert "HH:mm" to 12-hour format with AM/PM
                                        const [hourStr, minuteStr] =
                                          schedule.time.split(":");
                                        let hour = parseInt(hourStr, 10);
                                        const minute = parseInt(minuteStr, 10);
                                        const ampm = hour >= 12 ? "PM" : "AM";
                                        hour = hour % 12 || 12;
                                        return `${hour}:${minute
                                          .toString()
                                          .padStart(2, "0")}${ampm}`;
                                      })()}
                                    </span>
                                    <Countdown
                                      className="text-neutral-400"
                                      target={(() => {
                                        // Use the first schedule's date and time for countdown
                                        const sched = filteredSchedules[0];
                                        // Combine date (YYYY-MM-DD) and time (HH:mm) into ISO string
                                        const d = new Date(date);
                                        const [h, m] = sched.time.split(":");
                                        d.setHours(Number(h), Number(m), 0, 0);
                                        return d;
                                      })()}
                                    />
                                  </div>
                                  <span
                                    className={`flex items-center gap-1 text-xs font-medium w-fit text-green-400
                                  `}
                                  >
                                    <FaCheckCircle
                                      className={`
                                        text-${getStatusColor(schedule.status)}
                                      `}
                                      title={getStatusText(schedule.status)}
                                    />
                                    <span>
                                      {getStatusText(schedule.status)}
                                    </span>
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex text-blue-400 items-center gap-2">
                                    <FaUser className=" text-sm" />
                                    <span className="font-medium  text-sm sm:text-base">
                                      {schedule.booking?.user?.name ||
                                        "Unknown Customer"}
                                    </span>
                                  </div>

                                  <div className="flex items-start text-pink-400 pb-3 gap-2">
                                    <FaMapMarkerAlt className=" mt-0.5 text-sm flex-shrink-0" />
                                    <span className=" text-xs sm:text-sm">
                                      {schedule.booking?.address ||
                                        "No address provided"}
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="flex items-center gap-1 bg-neutral-100 rounded px-2 py-1 text-xs text-neutral-700">
                                      <FaCalendarAlt className="text-neutral-400 text-sm" />
                                      <span className="font-medium">
                                        {schedule.booking?.frequency
                                          ? schedule.booking.frequency
                                              .charAt(0)
                                              .toUpperCase() +
                                            schedule.booking.frequency.slice(1)
                                          : "Not specified"}
                                      </span>
                                    </div>
                                  </div>
                                  {schedule.booking?.notes && (
                                    <div className="flex items-center gap-1 text-xs text-neutral-700 mt-1 py-2 px-2">
                                      <FaStickyNote className="text-neutral-400 text-sm" />
                                      <span className="italic">
                                        {schedule.booking.notes}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex justify-end sm:flex-col sm:space-y-2 sm:space-x-0 space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedSchedule(schedule);
                                    setShowDetailsModal(true);
                                  }}
                                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none shadow transition"
                                  title="View Details"
                                >
                                  <FaEye className="text-lg" />
                                </button>
                                {schedule.booking?.stripeCustomerId && schedule.booking?.stripePaymentMethodId && (
                                  <button
                                    onClick={() => {
                                      setChargingSchedule(schedule);
                                      setShowChargeModal(true);
                                      setChargeAmount('');
                                      setChargeReason('');
                                      setPaymentLink('');
                                    }}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-400 text-white hover:bg-yellow-500 focus:outline-none shadow transition"
                                    title="Extra Charge"
                                  >
                                    <FaPoundSign className="text-lg" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showDetailsModal && selectedSchedule && selectedSchedule.booking && (
        (() => {
          const b = selectedSchedule.booking;
          const details = [
            ["Name", b.user?.name],
            ["Email", b.user?.email],
            ["Phone", b.user?.phoneNumber],
            ["Service Type", (b as any)['serviceType']],
            ["Date", b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString() : ''],
            ["Scheduled Day of Week", (b as any)['scheduledDayOfWeek']],
            ["Scheduled Day of Month", (b as any)['scheduledDayOfMonth']],
            ["Time", selectedSchedule.time || (b as any)['scheduledTime']],
            ["DateTime", (b as any)['scheduledDateTime'] ? new Date((b as any)['scheduledDateTime']).toLocaleString() : ''],
            ["Address", b.address],
            ["Status",
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSchedule.status)} text-white`}
              >
                {getStatusText(selectedSchedule.status)}
              </span>
            ],
            ["Notes", b.notes],
            ["Estimated Price", (b as any)['estimatedPrice']],
            ["Estimated Duration (min)", (b as any)['estimatedDuration']],
            ["Payment Intent ID", (b as any)['paymentIntentId']],
            ["Stripe Customer ID", (b as any)['stripeCustomerId']],
            ["Payment Status", (b as any)['paymentStatus']],
            ["Actual Duration (min)", (b as any)['actualDuration']],
            ["Actual Price", (b as any)['actualPrice']],
            ["Completed At", (b as any)['completedAt'] ? new Date((b as any)['completedAt']).toLocaleString() : ''],
            ["Frequency", b.frequency],
            ["End of Tenancy", (b as any)['endOftenancy'] ? "Yes" : "No"],
            ["Express Studio", (b as any)['expressStudio'] ? "Yes" : "No"],
            ["Eco-friendly Products", (b as any)['ecofriendlyProduct'] ? "Yes" : "No"],
            ["Errand Hours", (b as any)['errandHours']],
            ["Has Pets", (b as any)['havePets'] ? "Yes" : "No"],
            ["Where to Pick Key", (b as any)['whereToPickKey']],
            ["Subscription Months", (b as any)['subscriptionMonths']],
            ["Schedules Count", (b as any)['schedulesCount']],
            ["Is Subscription", (b as any)['isSubscription'] ? "Yes" : "No"],
            ["Subscription ID", (b as any)['subscriptionId']],
            ["Stripe Payment Method ID", (b as any)['stripePaymentMethodId']],
            ["Server Price", (b as any)['serverPrice']],
            ["Client Price", (b as any)['clientPrice']],
          ];
          return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Schedule Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="space-y-4">
                    <div className="divide-y divide-gray-200 rounded-lg overflow-hidden border border-gray-100">
                      {details.filter(([label, value]) => value !== undefined && value !== null && value !== "").map(([label, value], idx) => {
                        // Add mismatch flag for Client Price
                        if (label === "Client Price") {
                          const serverPrice = (b as any)['serverPrice'];
                          const clientPrice = (b as any)['clientPrice'];
                          const mismatch = serverPrice !== undefined && clientPrice !== undefined && serverPrice !== clientPrice;
                          return (
                            <div key={label as string} className={`flex items-start px-4 py-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                              <div className="w-48 min-w-[120px] font-medium text-gray-700 text-xs sm:text-sm pt-0.5">{label}:</div>
                              <div className="flex-1 text-neutral-600 text-xs sm:text-sm break-all flex items-center gap-2">
                                {value}
                                {mismatch && (
                                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] cursor-help" title="Client price and server price do not match. This may indicate a calculation or sync issue.">
                                    Mismatch?
                      </span>
                                )}
                  </div>
                </div>
                          );
                        }
                        return (
                          <div key={label as string} className={`flex items-start px-4 py-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <div className="w-48 min-w-[120px] font-medium text-gray-700 text-xs sm:text-sm pt-0.5">{label}:</div>
                            <div className="flex-1 text-neutral-600 text-xs sm:text-sm break-all">{value}</div>
                          </div>
                        );
                      })}
                      {/* Rooms section */}
                      <div className="px-4 py-3 bg-white">
                        <div className="font-medium text-gray-700 text-sm sm:text-base mb-2">Rooms:</div>
                        {/* @ts-ignore */}
                        {Array.isArray((b as any)['rooms']) && (b as any)['rooms'].length > 0 ? (
                          <table className="min-w-full text-xs sm:text-sm border border-gray-200 rounded">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-2 py-1 border-b text-left">Type</th>
                                <th className="px-2 py-1 border-b text-left">Quantity</th>
                                <th className="px-2 py-1 border-b text-left">Estimated Time (min)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* @ts-ignore */}
                              {(b as any)['rooms'].map((room, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                  <td className="px-2 py-1 border-b">{room.type}</td>
                                  <td className="px-2 py-1 border-b">{room.quantity}</td>
                                  <td className="px-2 py-1 border-b">{room.estimatedTime}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="text-gray-500 italic">No rooms specified.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          );
        })()
      )}

      {/* Extra Charge Modal */}
      {showChargeModal && chargingSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">Extra Charge</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount (£)</label>
              <input
                type="number"
                min="0.01"
                max={MAX_EXTRA_CHARGE}
                step="0.01"
                value={chargeAmount}
                onChange={e => setChargeAmount(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="text-xs text-gray-500 mt-1">Maximum allowed extra charge is £{MAX_EXTRA_CHARGE}.</div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Reason <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={chargeReason}
                onChange={e => setChargeReason(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            {paymentLink && (
              <div className="mb-4 bg-yellow-50 border border-yellow-300 rounded p-3">
                <div className="mb-2 text-yellow-800 font-medium">Off-session charge failed. Copy and send this payment link to the client:</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={paymentLink}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                    onFocus={e => e.target.select()}
                  />
                  <button
                    onClick={() => {navigator.clipboard.writeText(paymentLink); toast.info('Link copied!')}}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >Copy</button>
                </div>
              </div>
            )}
            <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mt-4 mb-2">
               Off-session charges are subject to Stripe's strict 
               compliance and anti-fraud policies. 
               Abuse or excessive use of off-session charges would 
               result in account suspension, legal action, 
               and loss of payment processing privileges. 
               Only use this feature for legitimate, customer-authorized extra work 
               (e.g., extra minutes not due to cleaner's fault). 
               All actions are logged and would be audited by Stripe.
               
            </div>
            <div className="text-xs text-red-500 mb-2 p-3 bg-red-50 rounded border-red-200">Misuse of off-session charges can result in legal liability and permanent loss of your Stripe account.</div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowChargeModal(false); setChargingSchedule(null); setPaymentLink(''); }}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={isCharging}
              >Cancel</button>
              <button
                onClick={() => {
                  if (!chargeAmount || isNaN(Number(chargeAmount)) || Number(chargeAmount) <= 0) {
                    toast.error('Enter a valid amount.');
                    return;
                  }
                  if (Number(chargeAmount) > MAX_EXTRA_CHARGE) {
                    toast.error(`Amount cannot exceed £${MAX_EXTRA_CHARGE}.`);
                    return;
                  }
                  if (!chargeReason.trim()) {
                    toast.error('Please provide a reason for the extra charge.');
                    return;
                  }
                  setShowConfirmCharge(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={isCharging}
              >
                {isCharging ? 'Charging...' : 'Charge'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Modal for Extra Charge */}
      {showConfirmCharge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Extra Charge</h2>
            <div className="mb-2 text-gray-700">You are about to charge <span className="font-bold">£{chargeAmount}</span> to the customer.</div>
            {chargeReason && <div className="mb-2 text-gray-600">Reason: <span className="italic">{chargeReason}</span></div>}
            <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mt-2 mb-2">
              <strong>Compliance Notice:</strong> Off-session charges are subject to Stripe's strict compliance and anti-fraud policies. Abuse or excessive use of off-session charges can result in account suspension, legal action, and loss of payment processing privileges. Only use this feature for legitimate, customer-authorized extra work (e.g., extra minutes not due to cleaner's fault). All actions are logged and may be audited by Stripe.
            </div>
            <div className="text-xs text-red-500 mb-2">Misuse of off-session charges can result in legal liability and permanent loss of your Stripe account.</div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowConfirmCharge(false)}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={isCharging}
              >Cancel</button>
              <button
                onClick={async () => {
                  setIsCharging(true);
                  setPaymentLink('');
                  setShowConfirmCharge(false);
                  try {
                    const token = localStorage.getItem('token');
                    const res = await axiosInstance.patch(
                      `/payments/extra-charge/${chargingSchedule.booking._id}`,
                      {
                        amount: Number(chargeAmount),
                        reason: chargeReason,
                        scheduleId: chargingSchedule._id,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    const pi = res.data?.paymentIntent || res.data?.data?.paymentIntent;
                    if (pi && pi.status === 'succeeded') {
                      toast.success('Off-session charge succeeded!');
                      setShowChargeModal(false);
                      setChargingSchedule(null);
                    } else if (pi && pi.next_action && pi.next_action.type === 'use_stripe_sdk' && pi.next_action.use_stripe_sdk?.stripe_js) {
                      setPaymentLink(pi.next_action.use_stripe_sdk.stripe_js);
                      toast.warn('Off-session charge requires customer action. Send them the link.');
                    } else if (res.data?.paymentLink) {
                      setPaymentLink(res.data.paymentLink);
                      toast.warn('Off-session charge failed. Send the payment link to the client.');
                    } else {
                      toast.error('Charge failed or requires customer action.');
                    }
                  } catch (err: any) {
                    if (err.response?.data?.paymentLink) {
                      setPaymentLink(err.response.data.paymentLink);
                      toast.warn('Off-session charge failed. Send the payment link to the client.');
                    } else {
                      toast.error(err.response?.data?.message || err.message || 'Charge failed.');
                    }
                  }
                  setIsCharging(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={isCharging}
              >
                {isCharging ? 'Charging...' : 'Confirm & Charge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
