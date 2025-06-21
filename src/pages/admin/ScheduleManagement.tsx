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
} from "react-icons/fa";
import { Header } from "./components/Header";
import { useBookingScheduleStore } from "../../store/bookingScheduleStore";
import { Countdown } from "../../components/shared/Countdown";
// import { Schedule } from "../../api/bookingSchedules";

export interface Schedule {
  _id: string;
  booking: {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: string;
      address: string;
    };
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    frequency: "onetime" | "weekly" | "fortnight" | "monthly";
    monthDuration: number;
    endOftenancy: boolean;
    expressStudio: boolean;
    ecofriendlyProduct: boolean;
    errandHours: number;
    havePets: boolean;
    whereToPickKey: string;
    notes: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    estimatedPrice: number;
    estimatedDuration: number;
    paymentStatus: string;
  };
  frequency: string;
  startDate: string;
  dayOfWeek: number;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

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
    if (schedules && schedules.length > 0 && !loading) {
      // Wait a bit for the DOM to render
      setTimeout(() => {
        if (firstScheduleRef.current) {
          firstScheduleRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
  }, [schedules, loading]);

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

  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month - 1, day));
    }

    return days;
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

  const allDays = getDaysInMonth(filters.year, filters.month);

  // Calculate the total number of visible schedules after filtering/search
  const totalVisibleSchedules = allDays.reduce((acc, date) => {
    const daySchedules = getSchedulesForDate(date);
    const filteredByStatus = filterSchedulesByStatus(
      daySchedules,
      filters.status
    );
    const filteredSchedules = filterSchedulesBySearch(
      filteredByStatus,
      searchTerm
    );
    return acc + filteredSchedules.length;
  }, 0);

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
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
            {monthNames[filters.month - 1]} {filters.year}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="">
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

          <div>
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

          <div className="flex items-end sm:justify-end">
            <div className="relative -ml-2 flex flex-col items-start justify-start">
              <p className="text-[12rem] font-bold m-0 p-0 text-red-400 ">
                {totalVisibleSchedules}
                <span className="text-neutral-200"></span>
              </p>
              <p className="text-[2rem] ml-4 absolute bottom-8 font-bold text-gray-300">
                {totalVisibleSchedules > 1 ? "schedules." : "schedule"}
              </p>
            </div>
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
              const filteredSchedules = filterSchedulesBySearch(
                filteredByStatus,
                searchTerm
              );
              const isToday = date.toDateString() === new Date().toDateString();
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              // Check if this is the first day with schedules
              const isFirstDayWithSchedules =
                filteredSchedules.length > 0 &&
                allDays
                  .slice(0, dayIdx)
                  .every(
                    (prevDate) =>
                      filterSchedulesBySearch(
                        getSchedulesForDate(prevDate),
                        searchTerm
                      ).length === 0
                  );

              return (
                <div
                  key={date.toISOString()}
                  ref={isFirstDayWithSchedules ? firstScheduleRef : null}
                  className={`p-4 sm:p-6 ${
                    isToday
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : isPast
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  } ${
                    isFirstDayWithSchedules
                      ? "ring-2 ring-brand-primary ring-opacity-50"
                      : ""
                  } transition-colors`}
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
                        {isFirstDayWithSchedules && (
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
                                  <div className="flex text-purple-400 items-center gap-2">
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
                                  className="text-xs font-medium bg-neutral-200 text-neutral-600 rounded-full px-5 py-2 transition-colors hover:bg-neutral-300 focus:outline-none"
                                  title="View Details"
                                >
                                  View
                                </button>

                                {schedule.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          schedule._id,
                                          "confirmed"
                                        )
                                      }
                                      className="text-xs font-medium bg-neutral-200 text-neutral-600 rounded-full px-5 py-2 transition-colors hover:bg-neutral-300 focus:outline-none"
                                      title="Confirm"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          schedule._id,
                                          "cancelled"
                                        )
                                      }
                                      className="text-xs font-medium bg-neutral-200 text-neutral-600 rounded-full px-5 py-2 transition-colors hover:bg-neutral-300 focus:outline-none"
                                      title="Cancel"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}

                                {schedule.status === "confirmed" && (
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        schedule._id,
                                        "completed"
                                      )
                                    }
                                    className="text-xs font-medium bg-neutral-200 text-neutral-600 rounded-full px-5 py-2 transition-colors hover:bg-neutral-300 focus:outline-none"
                                    title="Mark as Completed"
                                  >
                                    Complete
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

      {showDetailsModal && selectedSchedule && (
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
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Customer Information
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Name:</span>{" "}
                      {selectedSchedule.booking.user.name}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Email:</span>{" "}
                      {selectedSchedule.booking.user.email}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedSchedule.booking.user.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Booking Details
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(
                        selectedSchedule.booking.scheduledDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Time:</span>{" "}
                      {selectedSchedule.time}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Address:</span>{" "}
                      {selectedSchedule.booking.address}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Frequency:</span>{" "}
                      {selectedSchedule.booking.frequency}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedSchedule.status
                        )} text-white`}
                      >
                        {getStatusText(selectedSchedule.status)}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Additional Information
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Express Studio:</span>{" "}
                      {selectedSchedule.booking.expressStudio ? "Yes" : "No"}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">
                        Eco-friendly Products:
                      </span>{" "}
                      {selectedSchedule.booking.ecofriendlyProduct
                        ? "Yes"
                        : "No"}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Errand Hours:</span>{" "}
                      {selectedSchedule.booking.errandHours}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Has Pets:</span>{" "}
                      {selectedSchedule.booking.havePets ? "Yes" : "No"}
                    </p>
                    {selectedSchedule.booking.notes && (
                      <p className="text-sm sm:text-base">
                        <span className="font-medium">Notes:</span>{" "}
                        {selectedSchedule.booking.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
