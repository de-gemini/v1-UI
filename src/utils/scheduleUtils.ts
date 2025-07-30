import type { Schedule } from '../api/bookingSchedules';

export const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month - 1, day));
  }
  return days;
};

export const getSchedulesForDate = (schedules: Schedule[], date: Date) => {
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

export const filterSchedulesByStatus = (schedules: Schedule[], status: string) => {
  if (!status) return schedules;
  return schedules.filter((schedule) => schedule.status === status);
};

export const filterSchedulesBySearch = (schedules: Schedule[], searchTerm: string) => {
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

export const filterSchedulesByPaymentStatus = (schedules: Schedule[], filter: string) => {
  if (filter === 'all') return schedules;
  if (filter === 'paid') return schedules.filter(s => ['completed', 'succeeded'].includes(s.paymentStatus));
  if (filter === 'unpaid') return schedules.filter(s => !['completed', 'succeeded'].includes(s.paymentStatus));
  return schedules;
};

export const getStatusColor = (status: string) => {
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

export const getStatusText = (status: string) => {
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

export const calculateScheduleCount = (
  allDays: Date[],
  schedules: Schedule[],
  viewMode: 'summary' | 'diary',
  hideExpired: boolean,
  filters: { status: string },
  paymentStatusFilter: string,
  searchTerm: string,
  today: Date
) => {
  const filteredDays = viewMode === 'summary' 
    ? allDays.filter(date => {
        // Filter out expired dates if hideExpired is true
        if (hideExpired && date && date < today) {
          return false;
        }
        
        const daySchedules = getSchedulesForDate(schedules, date);
        const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
        const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
        const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);
        return filteredSchedules.length > 0;
      })
    : hideExpired 
      ? allDays.filter(date => !date || date >= today)
      : allDays;

  return filteredDays.reduce((acc, date) => {
    const daySchedules = getSchedulesForDate(schedules, date);
    const filteredByStatus = filterSchedulesByStatus(daySchedules, filters.status);
    const filteredByPaymentStatus = filterSchedulesByPaymentStatus(filteredByStatus, paymentStatusFilter);
    const filteredSchedules = filterSchedulesBySearch(filteredByPaymentStatus, searchTerm);
    return acc + filteredSchedules.length;
  }, 0);
}; 