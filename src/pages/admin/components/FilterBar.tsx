import React from 'react';
import { FaSearch, FaDownload } from 'react-icons/fa';

interface FilterBarProps {
  filters: {
    status: string;
    year: number;
    month: number;
  };
  setFilters: (filters: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  paymentStatusFilter: string;
  setPaymentStatusFilter: (filter: string) => void;
  viewMode: 'summary' | 'diary';
  setViewMode: (mode: 'summary' | 'diary') => void;
  hideExpired: boolean;
  setHideExpired: (hide: boolean) => void;
  scheduleCount: number;
  onExportPDF?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  paymentStatusFilter,
  setPaymentStatusFilter,
  viewMode,
  setViewMode,
  hideExpired,
  setHideExpired,
  scheduleCount,
  onExportPDF,
}) => {
  return (
    <>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center mb-4 gap-4 flex-wrap">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setViewMode('summary')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'summary'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setViewMode('diary')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'diary'
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Diary
          </button>
        </div>
        
        {/* Hide/Show Expired Toggle */}
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setHideExpired(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              hideExpired
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Hide Expired
          </button>
          <button
            onClick={() => setHideExpired(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !hideExpired
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Show Expired
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4 sm:mb-6 flex-wrap">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
          <div className="flex-1 min-w-[180px]">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              Status Filter
              {filters.status && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
                </span>
              )}
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
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              Payment Status
              {paymentStatusFilter !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {paymentStatusFilter.charAt(0).toUpperCase() + paymentStatusFilter.slice(1)}
                </span>
              )}
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
            {scheduleCount}
          </span>
          <span className="text-base sm:text-lg font-bold text-gray-400 mt-1">
            {scheduleCount > 1 ? "schedules." : "schedule"}
          </span>
          
          {/* Export Button */}
          {onExportPDF && scheduleCount > 0 && (
            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium mt-4"
            >
              <FaDownload className="text-sm" />
              <span>Export as PDF</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}; 