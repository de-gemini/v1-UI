import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useBookingScheduleStore } from "../../store/bookingScheduleStore";
import { Header } from "./components/Header";

interface BookingCalendarProps {
  className?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  className = "",
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const { calendarMonth, loading, error, fetchCalendarMonth, setError } =
    useBookingScheduleStore();

  useEffect(() => {
    fetchCalendarMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
  }, [currentDate, fetchCalendarMonth]);

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month - 1, i));
    }

    // Do NOT add trailing days from the next month
    return days;
  };

  const getSchedulesForDate = (date: Date) => {
    if (!calendarMonth) return [];

    const dateString = date.toISOString().split("T")[0];
    const dayData = calendarMonth.days.find((day) => day.date === dateString);

    return dayData ? dayData.schedules : [];
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

  const handleDateClick = (date: Date) => {
    const schedules = getSchedulesForDate(date);
    if (schedules.length > 0) {
      setSelectedSchedule({ date, schedules });
      setShowScheduleModal(true);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const days = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <Header
        head="Booking Calendar"
        subtitle="View all bookings in a monthly calendar format"
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

      {/* Calendar Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="p-3 min-h-[120px] bg-gray-50 rounded-lg"
                  />
                );
              }

              const schedules = getSchedulesForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              return (
                <div
                  key={date.toISOString()}
                  className={`p-2 min-h-[120px] border rounded-lg transition-colors ${
                    isToday
                      ? "bg-blue-50 border-blue-200"
                      : isPast
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  } ${schedules.length > 0 ? "cursor-pointer" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  {/* Date number */}
                  <div
                    className={`text-sm font-medium mb-2 ${
                      isToday ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {date.getDate()}
                  </div>

                  {/* Bookings */}
                  <div className="space-y-1">
                    {schedules.slice(0, 3).map((schedule, idx) => (
                      <div
                        key={schedule._id}
                        className={`p-1 rounded text-xs ${
                          schedule.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : schedule.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : schedule.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                        title={`${schedule.time} - ${
                          schedule.customerName
                        } (${getStatusText(schedule.status)})`}
                      >
                        <div className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          <span className="font-medium">{schedule.time}</span>
                        </div>
                        <div className="truncate">{schedule.customerName}</div>
                      </div>
                    ))}

                    {schedules.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{schedules.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Schedule Details Modal */}
      {showScheduleModal && selectedSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Schedules for{" "}
                  {selectedSchedule.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {selectedSchedule.schedules.map((schedule: any) => (
                  <div
                    key={schedule._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-brand-primary" />
                        <span className="font-medium">{schedule.time}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            schedule.status
                          )} text-white`}
                        >
                          {getStatusText(schedule.status)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <p className="font-medium">{schedule.customerName}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {schedule.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
