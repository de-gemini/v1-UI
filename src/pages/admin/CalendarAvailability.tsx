import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCalendarStore } from "../../store/calendarStore";
import { Header } from "./components/Header";
import { DecorativeBackground } from "../Dashboard";

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
    // Fetch availability for the visible month
    fetchAvailability(date.getFullYear(), date.getMonth() + 1);
    // eslint-disable-next-line
  }, [date]);

  // Checks if a specific tileDate is available
  const isDayAvailable = (tileDate: Date) => {
    const selectedMonth = date.getMonth(); // 0-indexed
    const selectedYear = date.getFullYear();

    const tileMonth = tileDate.getMonth();
    const tileYear = tileDate.getFullYear();
    const tileDay = tileDate.getDate();

    // Only affect days in the currently displayed month
    if (tileMonth !== selectedMonth || tileYear !== selectedYear) {
      return true; // Don't style trailing/leading days
    }

    const found = monthAvailability.find((d) => d.day === tileDay);
    return found ? found.available : true;
  };

  const handleDayClick = async (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const now = new Date();
    if (value < new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      return;

    const currentlyAvailable = isDayAvailable(value);

    console.debug("Toggling day", {
      year,
      month,
      day,
      currentlyAvailable,
      togglingTo: !currentlyAvailable,
    });

    await toggleAvailability(year, month, day, !currentlyAvailable);
  };

  const tileClassName = ({ date: tileDate, view }: any) => {
    if (view !== "month") return "";

    const available = isDayAvailable(tileDate);
    const isFuture =
      tileDate >=
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!isFuture) return "";
    return available ? "calendar-day-available" : "calendar-day-unavailable";
  };

  const tileContent = ({ date: tileDate, view }: any) => {
    if (view !== "month") return null;

    const available = isDayAvailable(tileDate);
    const isFuture =
      tileDate >=
      new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!isFuture) return null;

    // Optional visual cue (dot, icon, etc.)
    return (
      <div className="absolute bottom-1 left-1 right-1 text-center text-[10px] text-gray-400">
        {available ? "✔" : "✖"}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center mt-12 flex-col relative">
      <DecorativeBackground />
      <Header
        head="Manage Calendar Availability"
        subtitle="Toggle days as available or unavailable for bookings"
      />
      <div className="my-8 relative z-10">
        {error && <div className="mb-4 text-red-600">{error}</div>}

        {loading ? (
          <div>Loading calendar...</div>
        ) : (
          <Calendar
            prevLabel={<FaChevronLeft />}
            nextLabel={<FaChevronRight />}
            prev2Label={null}
            next2Label={null}
            value={date}
            onActiveStartDateChange={({ activeStartDate }) =>
              setDate(activeStartDate!)
            }
            onClickDay={handleDayClick}
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        )}

        {updatingDay && (
          <div className="mt-2 text-blue-600">
            Updating day {updatingDay}...
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarAvailability;
