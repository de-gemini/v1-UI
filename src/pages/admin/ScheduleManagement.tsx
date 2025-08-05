import React, { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
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
  FaDownload,
} from "react-icons/fa";
import { createScheduleManagementPDF, type PDFSchedule } from '../../utils/pdfUtils';
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { MonthNavigation } from "./components/MonthNavigation";
import { ScheduleCard } from "./components/ScheduleCard";
import { OffSessionChargeModal } from "./components/OffSessionChargeModal";
import { ScheduleDetailsModal } from "./components/ScheduleDetailsModal";
import { useBookingScheduleStore } from "../../store/bookingScheduleStore";
import { Countdown } from "../../components/shared/Countdown";
import type { Schedule } from "../../api/bookingSchedules";
import { bookingScheduleService } from "../../api/bookingSchedules";
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import {
  getDaysInMonth,
  getSchedulesForDate,
  filterSchedulesByStatus,
  filterSchedulesBySearch,
  filterSchedulesByPaymentStatus,
  getStatusColor,
  getStatusText,
  calculateScheduleCount,
} from "../../utils/scheduleUtils";

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
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
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
  const [chargingSchedule, setChargingSchedule] = useState<Schedule | null>(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('paid');
  const [viewMode, setViewMode] = useState<'summary' | 'diary'>('summary'); // Default to summary view
  const [hideExpired, setHideExpired] = useState(true); // Default to hiding expired dates

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
    updateScheduleStatusAdmin,
    setError,
  } = useBookingScheduleStore();

  // Handle URL parameters for initial filter setup
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      let statusFilter = "";
      let paymentStatusFilter = 'all';
      let filterMessage = "";
      let shouldShowExpired = false; // Default to hiding expired
      
      switch (filterParam) {
        case 'all':
          statusFilter = "";
          paymentStatusFilter = 'all';
          filterMessage = "Showing all bookings";
          shouldShowExpired = true; // Show expired for "all" view
          break;
        case 'completed':
          statusFilter = "completed";
          paymentStatusFilter = 'paid';
          filterMessage = "Showing completed bookings";
          shouldShowExpired = true; // Show expired for completed view
          break;
        case 'pending':
          statusFilter = "pending";
          paymentStatusFilter = 'unpaid';
          filterMessage = "Showing pending bookings";
          shouldShowExpired = true; // Show expired for pending view
          break;
        case 'confirmed':
          statusFilter = "confirmed";
          paymentStatusFilter = 'all';
          filterMessage = "Showing confirmed bookings";
          shouldShowExpired = true; // Show expired for confirmed view
          break;
        case 'cancelled':
          statusFilter = "cancelled";
          paymentStatusFilter = 'all';
          filterMessage = "Showing cancelled bookings";
          shouldShowExpired = true; // Show expired for cancelled view
          break;
        case 'new-customers':
          // For new customers, we might want to show recent bookings
          statusFilter = "";
          paymentStatusFilter = 'all';
          filterMessage = "Showing all bookings";
          shouldShowExpired = true; // Show expired for new customers view
          break;
        case 'revenue':
          // For revenue, show paid bookings
          statusFilter = "";
          paymentStatusFilter = 'paid';
          filterMessage = "Showing paid bookings";
          shouldShowExpired = true; // Show expired for revenue view
          break;
        case 'visitors':
          // For visitors, show all bookings
          statusFilter = "";
          paymentStatusFilter = 'all';
          filterMessage = "Showing all bookings";
          shouldShowExpired = true; // Show expired for visitors view
          break;
        default:
          statusFilter = "";
          paymentStatusFilter = 'all';
          filterMessage = "Showing all bookings";
          shouldShowExpired = true; // Show expired for default view
      }
      
      setFilters(prev => ({ ...prev, status: statusFilter }));
      setPaymentStatusFilter(paymentStatusFilter);
      setHideExpired(!shouldShowExpired); // Set to false to show expired
      
      
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSchedules({
      year: filters.year,
      month: filters.month,
      page: 1,
      limit: 100,
    });
  }, [filters.year, filters.month, fetchSchedules]);

  // Reusable function to refresh schedules data
  const refreshSchedules = async () => {
    await fetchSchedules({
      year: filters.year,
      month: filters.month,
      page: 1,
      limit: 100,
    });
  };

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

  const handleScheduleStatusUpdate = async (
    scheduleId: string,
    newStatus: "pending" | "confirmed" | "completed" | "cancelled"
  ) => {
    try {
      await updateScheduleStatusAdmin(scheduleId, newStatus);
      toast.success(`Schedule status updated to ${newStatus}`);
      
      // Update the selectedSchedule with the new status
      if (selectedSchedule && selectedSchedule._id === scheduleId) {
        setSelectedSchedule({
          ...selectedSchedule,
          status: newStatus
        });
      }
      
      // Refresh the schedules data to reflect the changes
      await refreshSchedules();
      
      // Modal stays open after status update
    } catch (error) {
      toast.error("Failed to update schedule status");
    }
  };

  const handleSchedulePaymentStatusUpdate = async (
    scheduleId: string,
            newPaymentStatus: "pending" | "completed" | "failed"
  ) => {
    try {
      await bookingScheduleService.updateSchedulePaymentStatusAdmin(scheduleId, newPaymentStatus);
      toast.success(`Payment status updated to ${newPaymentStatus}`);
      
      // Update the selectedSchedule with the new payment status
      if (selectedSchedule && selectedSchedule._id === scheduleId) {
        setSelectedSchedule({
          ...selectedSchedule,
          paymentStatus: newPaymentStatus
        });
      }
      
      // Refresh the schedules data to reflect the changes
      await refreshSchedules();
      
      // Modal stays open after status update
    } catch (error) {
      toast.error("Failed to update payment status");
    }
  };

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

  const handleViewDetails = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailsModal(true);
  };

  const handleExtraCharge = (schedule: Schedule) => {
    setChargingSchedule(schedule);
  };

  const handleExportPDF = () => {
    // Get all filtered schedules for the current view
    const allFilteredSchedules: PDFSchedule[] = [];
    
    allDays.forEach((date) => {
      if (date) {
        const daySchedules = getSchedulesForDate(schedules || [], date);
        const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
        const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
        const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);
        
        // Filter out expired dates if hideExpired is true
        if (hideExpired && date < today) {
          return;
        }
        
        allFilteredSchedules.push(...filteredSchedules);
      }
    });

    if (allFilteredSchedules.length === 0) {
      toast.warning("No schedules to export");
      return;
    }

    // Use the utility function to create PDF
    createScheduleManagementPDF(
      allFilteredSchedules,
      filters,
      viewMode,
      paymentStatusFilter,
      searchTerm
    );
  };

  // Calculate schedule count for FilterBar
  const scheduleCount = calculateScheduleCount(
    allDays,
    schedules || [],
    viewMode,
    hideExpired,
    filters,
    paymentStatusFilter,
    searchTerm,
    today
  );

  return (
    <div className={`space-y-4   sm:space-y-6 ${className} relative`}>
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

      <div className="bg-white  left-0 right-0 top-0 z-10 p-4 sm:p-6 rounded-lg shadow">
        {/* Month navigation and display */}
        <MonthNavigation
          filters={filters}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          paymentStatusFilter={paymentStatusFilter}
          setPaymentStatusFilter={setPaymentStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          hideExpired={hideExpired}
          setHideExpired={setHideExpired}
          scheduleCount={scheduleCount}
          onExportPDF={handleExportPDF}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
        ) : (
          <div className="divide-y divide-gray-200">
            {(viewMode === 'summary' 
              ? allDays.filter(date => {
                  // Filter out expired dates if hideExpired is true
                  if (hideExpired && date && date < today) {
                    return false;
                  }
                  
                  const daySchedules = getSchedulesForDate(schedules || [], date);
                  const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
                  const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
                  const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);
                  return filteredSchedules.length > 0;
                })
              : hideExpired 
                ? allDays.filter(date => !date || date >= today) // Filter out expired dates in diary view too
                : allDays
            ).map((date, dayIdx) => {
              const daySchedules = getSchedulesForDate(schedules || [], date);
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
                  ...filteredSchedules.filter(s => ['completed', 'succeeded'].includes(s.paymentStatus)),
                  ...filteredSchedules.filter(s => !['completed', 'succeeded'].includes(s.paymentStatus)),
                ];
              }
              const isToday = date.toDateString() === new Date().toDateString();
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              // Check if this is the first day with schedules
              const currentDaysList = viewMode === 'summary' 
                ? allDays.filter(date => {
                    // Filter out expired dates if hideExpired is true
                    if (hideExpired && date && date < today) {
                      return false;
                    }
                    
                    const daySchedules = getSchedulesForDate(schedules || [], date);
                    const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
                    const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
                    const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);
                    return filteredSchedules.length > 0;
                  })
                : hideExpired 
                  ? allDays.filter(date => !date || date >= today)
                  : allDays;
              
              const currentDayIndex = currentDaysList.findIndex(d => d?.toDateString() === date.toDateString());
              
              const isEarliestFutureWithSchedules =
                date &&
                date >= today &&
                filteredSchedules.length > 0 &&
                currentDaysList
                  .slice(0, currentDayIndex)
                  .every(
                    (prevDate) =>
                      !prevDate ||
                      prevDate < today ||
                      filterSchedulesBySearch(
                        filterSchedulesByPaymentStatus(
                          filterSchedulesByStatus(getSchedulesForDate(schedules || [], prevDate), filters.status),
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
                    `p-4 sm:p-6 transition-all duration-200 relative ` +
                    (isToday
                      ? "bg-blue-50 border-l-4 border-blue-500 "
                      : isPast
                        ? "bg-gray-50 border-l-4 border-gray-300 "
                        : "hover:bg-gray-50 border-l-4 border-transparent ") +
                    (isEarliestFutureWithSchedules ? "ring-2 ring-brand-primary ring-opacity-50 " : "")
                  }
                >
                  {/* Past date indicator */}
                  {isPast && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500 font-medium">PAST DATE</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`text-2xl sm:text-4xl font-bold ${
                          isToday 
                            ? "text-blue-600" 
                            : isPast 
                              ? "text-gray-400 line-through" 
                              : "text-gray-800"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className={`${isPast ? "text-gray-400" : "text-gray-600"}`}>
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
                    <div className={`italic text-sm ${isPast ? "text-gray-300" : "text-gray-400"}`}>
                      {isPast ? "No bookings were scheduled" : "No bookings for this day"}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSchedules.map((schedule, idx) => {
                        // Offset the color palette for each day by 2
                        const color =
                          CARD_COLORS[(dayIdx * 2 + idx) % CARD_COLORS.length];
                        return (
                          <ScheduleCard
                            key={schedule._id}
                            schedule={schedule}
                            date={date}
                            isPast={isPast}
                            isToday={isToday}
                            color={color}
                            onViewDetails={handleViewDetails}
                            onExtraCharge={handleExtraCharge}
                            filteredSchedules={filteredSchedules}
                          />
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

      {/* Schedule Details Modal */}
      <ScheduleDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        schedule={selectedSchedule}
        onStatusUpdate={handleScheduleStatusUpdate}
        onPaymentStatusUpdate={handleSchedulePaymentStatusUpdate}
      />

      {/* Off-Session Charge Modal */}
      <OffSessionChargeModal
        isOpen={!!chargingSchedule}
        onClose={() => setChargingSchedule(null)}
        schedule={chargingSchedule}
        onSuccess={() => {
          // Refresh the schedules data after successful charge
          refreshSchedules();
        }}
      />
    </div>
  );
};

export default ScheduleManagement;
