import React, { useEffect, useState } from 'react';
import { fetchPaymentRecords } from '../../api/stripePayment';
import { DecorativeBackground } from '../Dashboard';

const PaymentRecords: React.FC = () => {
  const [payments, setPayments] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPaymentRecords(page, limit)
      .then((res) => {
        console.log('PaymentRecords API response:', res); // Debug log
        const data = res?.payload || {};
        setPayments(data.payments || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err.message || 'Failed to fetch payment records');
        setPayments([]);
      })
      .finally(() => setLoading(false));
  }, [page, limit]);

  
  return (
    <div className="p-2 sm:p-8">
      {/* <DecorativeBackground /> */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Payment Records</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full relative overflow-x-auto">
        <table className="min-w-[320px] w-full  border border-gray-200 rounded-lg text-xs sm:text-sm">
          <thead>
            <tr className="">
              <th className="px-2 sm:px-4 py-2 border-b whitespace-nowrap text-left">Date</th>
              <th className="px-2 sm:px-4 py-2 border-b whitespace-nowrap text-left">Name</th>
              <th className="px-2 sm:px-4 py-2 border-b whitespace-nowrap text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="text-center py-8">Loading...</td></tr>
            ) : payments && payments.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-8">No payment records found.</td></tr>
            ) : payments ? (
              payments.map((p) => {
                const date = p.paidAt ? new Date(p.paidAt).toISOString().slice(0, 10) : '-';
                const name = p.user?.name ? p.user.name : 'Anonymous';
                return (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-4 border-b whitespace-nowrap">{date}</td>
                    <td className="px-2 sm:px-4 py-4 border-b whitespace-nowrap">{name}</td>
                    <td className="px-2 sm:px-4 py-4 border-b whitespace-nowrap font-semibold text-green-700">£{p.amount?.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex relative z-[2] flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <span className="text-xs sm:text-sm">Page {page} of {totalPages} ({total} records)</span>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="absolute z-0 top-44 inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract geometric shapes */}
          <circle cx="100" cy="100" r="80" fill="url(#gradient1)" />
          <circle cx="1100" cy="150" r="120" fill="url(#gradient2)" />
          <circle cx="200" cy="700" r="100" fill="url(#gradient3)" />
          <circle cx="1000" cy="650" r="90" fill="url(#gradient4)" />
          
          {/* Floating elements */}
          <rect x="300" y="200" width="60" height="60" rx="30" fill="url(#gradient5)" opacity="0.6" />
          <rect x="800" y="300" width="40" height="40" rx="20" fill="url(#gradient6)" opacity="0.7" />
          <rect x="150" y="500" width="50" height="50" rx="25" fill="url(#gradient7)" opacity="0.5" />
          <rect x="900" y="450" width="70" height="70" rx="35" fill="url(#gradient8)" opacity="0.6" />
          
          {/* Decorative lines */}
          <path d="M 50 400 Q 300 350 550 400 T 1050 400" stroke="url(#gradient9)" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M 100 600 Q 400 550 700 600 T 1100 600" stroke="url(#gradient10)" strokeWidth="2" fill="none" opacity="0.3" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default PaymentRecords; 