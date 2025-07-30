import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface MonthNavigationProps {
  filters: {
    status: string;
    year: number;
    month: number;
  };
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

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

export const MonthNavigation: React.FC<MonthNavigationProps> = ({
  filters,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        onClick={onPreviousMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Previous Month"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 text-center">
        {monthNames[filters.month - 1]} {filters.year}
      </h2>
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Next Month"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
}; 