import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaClock,
  FaFilter,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Header } from "./components/Header";
import { useBookingScheduleStore } from "../../store/bookingScheduleStore";
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

  const {
    schedules,
    loading,
    error,
    pagination,
    fetchSchedules,
    updateScheduleStatus,
    setError,
  } = useBookingScheduleStore();

  console.log(schedules);

  useEffect(() => {
    fetchSchedules({
      year: filters.year,
      month: filters.month,
      status: (filters.status as any) || undefined,
      page: 1,
      limit: 100,
    });
  }, [filters, fetchSchedules]);

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
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
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

    const dateString = date.toISOString().split("T")[0];
    console.log(`Looking for schedules on ${dateString}`);
    console.log(`Available schedules:`, schedules);

    return schedules.filter((schedule) => {
      if (schedule.booking && schedule.startDate) {
        const scheduleDate = new Date(schedule.startDate);
        const scheduleDateString = scheduleDate.toISOString().split("T")[0];
        console.log(
          `Schedule date: ${scheduleDateString}, matches: ${
            scheduleDateString === dateString
          }`
        );
        return scheduleDateString === dateString;
      }
      if (schedule.date) {
        const scheduleDate = new Date(schedule.date);
        const scheduleDateString = scheduleDate.toISOString().split("T")[0];
        console.log(
          `Schedule date (fallback): ${scheduleDateString}, matches: ${
            scheduleDateString === dateString
          }`
        );
        return scheduleDateString === dateString;
      }
      return false;
    });
  };

  const filterSchedulesBySearch = (schedules: any[]) => {
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

  return (
    <div className={`space-y-6 ${className}`}>
      <Header
        head="Schedule Management"
        subtitle="View and manage all booking schedules in monthly diary format"
      />

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[filters.month - 1]} {filters.year}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status Filter
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Total Schedules: {schedules?.length || 0}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {allDays.map((date) => {
              const daySchedules = getSchedulesForDate(date);
              const filteredSchedules = filterSchedulesBySearch(daySchedules);
              const isToday = date.toDateString() === new Date().toDateString();
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              return (
                <div
                  key={date.toISOString()}
                  className={`p-6 ${
                    isToday
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : isPast
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold ${
                          isToday ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {date.getDate()}
                      </div>
                      <div className="text-gray-600">
                        <div className="font-medium">
                          {daysOfWeek[date.getDay()]}
                        </div>
                        <div className="text-sm">
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    {filteredSchedules.length > 0 && (
                      <div className="text-sm text-gray-500">
                        {filteredSchedules.length} booking
                        {filteredSchedules.length !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>

                  {filteredSchedules.length === 0 ? (
                    <div className="text-gray-400 italic">
                      No bookings for this day
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSchedules.map((schedule) => (
                        <div
                          key={schedule._id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <FaClock className="text-brand-primary" />
                                  <span className="font-medium text-lg">
                                    {schedule.time}
                                  </span>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    schedule.status
                                  )} text-white`}
                                >
                                  {getStatusText(schedule.status)}
                                </span>
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FaUser className="text-gray-400" />
                                  <span className="font-medium text-gray-900">
                                    {schedule.booking?.user?.name ||
                                      "Unknown Customer"}
                                  </span>
                                </div>

                                <div className="flex items-start gap-2">
                                  <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                                  <span className="text-gray-600 text-sm">
                                    {schedule.booking?.address ||
                                      "No address provided"}
                                  </span>
                                </div>

                                <div className="text-sm text-gray-500">
                                  Frequency:{" "}
                                  {schedule.booking?.frequency ||
                                    "Not specified"}
                                  {schedule.booking?.notes && (
                                    <div className="mt-1">
                                      Notes: {schedule.booking.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => {
                                  setSelectedSchedule(schedule);
                                  setShowDetailsModal(true);
                                }}
                                className="text-brand-primary hover:text-brand-secondary p-2"
                                title="View Details"
                              >
                                <FaEye size={16} />
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
                                    className="text-green-600 hover:text-green-800 p-2"
                                    title="Confirm"
                                  >
                                    <FaCheck size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleStatusUpdate(
                                        schedule._id,
                                        "cancelled"
                                      )
                                    }
                                    className="text-red-600 hover:text-red-800 p-2"
                                    title="Cancel"
                                  >
                                    <FaTimes size={16} />
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
                                  className="text-blue-600 hover:text-blue-800 p-2"
                                  title="Mark as Completed"
                                >
                                  <FaCheck size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showDetailsModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Schedule Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Customer Information
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedSchedule.booking.user.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedSchedule.booking.user.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedSchedule.booking.user.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Booking Details</h4>
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(
                        selectedSchedule.booking.scheduledDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {selectedSchedule.time}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {selectedSchedule.booking.address}
                    </p>
                    <p>
                      <span className="font-medium">Frequency:</span>{" "}
                      {selectedSchedule.booking.frequency}
                    </p>
                    <p>
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
                  <h4 className="font-medium text-gray-900">
                    Additional Information
                  </h4>
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Express Studio:</span>{" "}
                      {selectedSchedule.booking.expressStudio ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="font-medium">
                        Eco-friendly Products:
                      </span>{" "}
                      {selectedSchedule.booking.ecofriendlyProduct
                        ? "Yes"
                        : "No"}
                    </p>
                    <p>
                      <span className="font-medium">Errand Hours:</span>{" "}
                      {selectedSchedule.booking.errandHours}
                    </p>
                    <p>
                      <span className="font-medium">Has Pets:</span>{" "}
                      {selectedSchedule.booking.havePets ? "Yes" : "No"}
                    </p>
                    {selectedSchedule.booking.notes && (
                      <p>
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
