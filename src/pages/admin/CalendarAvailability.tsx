import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCheckCircle, FaTimesCircle,FaChevronLeft,FaChevronRight } from 'react-icons/fa';
import { Header } from './components/Header';
import { useCalendarStore } from '../../store/calendarStore';

const today = new Date();

const CalendarAvailability = () => {
  const [date, setDate] = useState<Date>(today);
  const {
    monthAvailability,
    loading,
    error,
    updatingDay,
    fetchAvailability,
    toggleAvailability,
    setError,
  } = useCalendarStore();

  useEffect(() => {
    fetchAvailability(date.getFullYear(), date.getMonth() + 1);
    // eslint-disable-next-line
  }, [date]);

  const isDayAvailable = (day: number) => {
    const days = Array.isArray(monthAvailability) ? monthAvailability : [];
    const found = days.find(d => d.day === day);
    return found ? found.available : true;
  };

  const handleDayClick = async (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const now = new Date();
    if (value < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return;

    const currentlyAvailable = isDayAvailable(day);
    await toggleAvailability(year, month, day, !currentlyAvailable);
  };

  const tileContent = ({ date: tileDate, view }: any) => {
    if (view !== 'month') return null;
    const day = tileDate.getDate();
    const available = isDayAvailable(day);
    console.log({available,tileDate,view})
    const isFuture = tileDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!isFuture) return null;
    return available
  };

  const tileClassName = ({ date: tileDate, view }: any) => {
    if (view !== 'month') return '';
    const day = tileDate.getDate();
    const available = isDayAvailable(day);
    const isFuture = tileDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!isFuture) return '';
    return available ? 'calendar-day-available' : 'calendar-day-unavailable';
  };

  return (
    <div className="flex items-center justify-center mt-12 flex-col">
      <Header
        head="Manage Calendar Availability"
        subtitle="Toggle days as available or unavailable for bookings"
      />
      <div className="my-8 ">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {loading ? (
          <div>Loading calendar...</div>
        ) : (
          <Calendar
          prevLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
          prev2Label={null} // Hide double arrows if you want
          next2Label={null}
            value={date}
            onActiveStartDateChange={({ activeStartDate }) => setDate(activeStartDate!)}
            onClickDay={handleDayClick}
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        )}
        {updatingDay && <div className="mt-2 text-blue-600">Updating day {updatingDay}...</div>}
      </div>
    </div>
  );
};

export default CalendarAvailability; 