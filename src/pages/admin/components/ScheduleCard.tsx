import React from 'react';
import {
  FaEye,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStickyNote,
  FaPoundSign,
  FaHourglassHalf,
  FaTimes,
} from 'react-icons/fa';
import { Countdown } from '../../../components/shared/Countdown';
import type { Schedule } from '../../../api/bookingSchedules';
import { getStatusColor, getStatusText } from '../../../utils/scheduleUtils';

interface ScheduleCardProps {
  schedule: Schedule;
  date: Date;
  isPast: boolean;
  isToday: boolean;
  color: { bg: string; border: string };
  onViewDetails: (schedule: Schedule) => void;
  onExtraCharge: (schedule: Schedule) => void;
  filteredSchedules: Schedule[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  date,
  isPast,
  isToday,
  color,
  onViewDetails,
  onExtraCharge,
  filteredSchedules,
}) => {
  // Debug: Log schedule data to see what's available
  console.log('🔍 [DEBUG] ScheduleCard - schedule:', {
    id: schedule._id,
    booking: schedule.booking,
    user: schedule.booking?.user,
    userName: schedule.booking?.user?.name,
    userEmail: schedule.booking?.user?.email
  });
  const formatTime = (time: string) => {
    // Convert "HH:mm" to 12-hour format with AM/PM
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return FaHourglassHalf;
      case 'confirmed':
        return FaCheckCircle;
      case 'completed':
        return FaCheckCircle;
      case 'cancelled':
        return FaTimes;
      default:
        return FaClock;
    }
  };

  const getCountdownTarget = () => {
    // Use the first schedule's date and time for countdown
    const sched = filteredSchedules[0];
    // Combine date (YYYY-MM-DD) and time (HH:mm) into ISO string
    const d = new Date(date);
    const [h, m] = sched.time.split(":");
    d.setHours(Number(h), Number(m), 0, 0);
    return d;
  };

  return (
    <div
      className={`p-5 transition-all duration-200 rounded-lg ${
        isPast 
          ? "opacity-75 hover:opacity-90" 
          : "hover:shadow-md"
      }`}
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
              <FaClock className="text-sm sm:text-base" />
              <span className={`font-medium text-base sm:text-lg ${isPast ? "line-through" : ""}`}>
                {formatTime(schedule.time)}
              </span>
              <Countdown
                className="text-neutral-400"
                target={getCountdownTarget()}
              />
            </div>
            <span className={`flex items-center gap-1 text-xs font-medium w-fit ${getStatusColor(schedule.status)}`}>
              {React.createElement(getStatusIcon(schedule.status), {
                className: "text-sm",
                title: getStatusText(schedule.status)
              })}
              <span className={isPast ? "line-through" : ""}>
                {getStatusText(schedule.status)}
              </span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex text-blue-400 items-center gap-2">
              <FaUser className="text-sm" />
              <span className={`font-medium text-sm sm:text-base ${isPast ? "line-through" : ""}`}>
                {schedule.booking?.user?.name || schedule.booking?.user?.email || "Unknown Customer"}
              </span>
            </div>

            <div className="flex items-start text-pink-400 gap-2">
              <FaMapMarkerAlt className="mt-0.5 text-sm flex-shrink-0" />
              <span className={`text-xs sm:text-sm ${isPast ? "line-through" : ""}`}>
                {schedule.booking?.address || "No address provided"}
              </span>
            </div>

            <div className="flex items-center text-green-600 gap-2">
              <FaPoundSign className="text-sm flex-shrink-0" />
              <span className={`font-medium text-sm sm:text-base ${isPast ? "line-through" : ""}`}>
                £{schedule.booking?.estimatedPrice?.toFixed(2) || 'N/A'}
              </span>
            </div>

            <div className="flex items-center text-gray-600 gap-2">
              <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0" />
              </svg>
              <span className={`text-xs font-mono ${isPast ? "line-through" : ""}`}>
                ID: {schedule._id}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <div className="flex items-center gap-1 bg-neutral-100 rounded px-2 py-1 text-xs text-neutral-700">
                <FaCalendarAlt className="text-neutral-400 text-sm" />
                <span className={`font-medium ${isPast ? "line-through" : ""}`}>
                  {schedule.booking?.frequency
                    ? schedule.booking.frequency
                        .charAt(0)
                        .toUpperCase() +
                      schedule.booking.frequency.slice(1)
                    : "Not specified"}
                </span>
              </div>
              {/* Cash Payment Badge */}
              {schedule.paidWithCash && (
                <div className="flex items-center gap-1 bg-green-100 rounded px-2 py-1 text-xs text-green-700 border border-green-200">
                  <FaPoundSign className="text-green-600 text-sm" />
                  <span className="font-medium">Cash</span>
                </div>
              )}
            </div>
            {schedule.booking?.notes && (
              <div className="flex items-center gap-1 text-xs text-neutral-700 mt-1 py-2 px-2">
                <FaStickyNote className="text-neutral-400 text-sm" />
                <span className={`italic ${isPast ? "line-through" : ""}`}>
                  {schedule.booking.notes}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end sm:flex-col sm:space-y-2 sm:space-x-0 space-x-2">
          <button
            onClick={() => onViewDetails(schedule)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none shadow transition"
            title="View Details"
          >
            <FaEye className="text-lg" />
          </button>
          {schedule.booking?.stripeCustomerId && schedule.booking?.stripePaymentMethodId && (
            <button
              onClick={() => onExtraCharge(schedule)}
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
}; 