import React, { useEffect, useState } from 'react';
import { fetchPaymentRecords } from '../../api/stripePayment';

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
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Payment Records</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[320px] w-full bg-white border border-gray-200 rounded-lg text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50">
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
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{date}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap">{name}</td>
                    <td className="px-2 sm:px-4 py-2 border-b whitespace-nowrap font-semibold text-green-700">£{p.amount?.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
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
    </div>
  );
};

export default PaymentRecords; 