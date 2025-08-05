import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../api/axiosInstance';
import type { Schedule } from '../../../api/bookingSchedules';

interface OffSessionChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  onSuccess?: () => void; // Callback to refresh data after successful charge
}

const MAX_EXTRA_CHARGE = 200;

export const OffSessionChargeModal: React.FC<OffSessionChargeModalProps> = ({
  isOpen,
  onClose,
  schedule,
  onSuccess,
}) => {
  const [chargeAmount, setChargeAmount] = useState('');
  const [chargeReason, setChargeReason] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [isCharging, setIsCharging] = useState(false);
  const [showConfirmCharge, setShowConfirmCharge] = useState(false);

  const handleClose = () => {
    setChargeAmount('');
    setChargeReason('');
    setPaymentLink('');
    setShowConfirmCharge(false);
    onClose();
  };

  const handleCharge = () => {
    if (!chargeAmount || isNaN(Number(chargeAmount)) || Number(chargeAmount) <= 0) {
      toast.error('Enter a valid amount.');
      return;
    }
    if (Number(chargeAmount) > MAX_EXTRA_CHARGE) {
      toast.error(`Amount cannot exceed £${MAX_EXTRA_CHARGE}.`);
      return;
    }
    if (!chargeReason.trim()) {
      toast.error('Please provide a reason for the extra charge.');
      return;
    }
    setShowConfirmCharge(true);
  };

  const handleConfirmCharge = async () => {
    if (!schedule) return;

    setIsCharging(true);
    setPaymentLink('');
    setShowConfirmCharge(false);
    
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.patch(
        `/payments/extra-charge/${schedule.booking._id}`,
        {
          amount: Number(chargeAmount),
          reason: chargeReason,
          scheduleId: schedule._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const pi = res.data?.paymentIntent || res.data?.data?.paymentIntent;
      if (pi && pi.status === 'succeeded') {
        toast.success('Off-session charge succeeded!');
        onSuccess?.(); // Trigger data refresh
        handleClose();
      } else if (pi && pi.next_action && pi.next_action.type === 'use_stripe_sdk' && pi.next_action.use_stripe_sdk?.stripe_js) {
        setPaymentLink(pi.next_action.use_stripe_sdk.stripe_js);
        toast.warn('Off-session charge requires customer action. Send them the link.');
      } else if (res.data?.paymentLink) {
        setPaymentLink(res.data.paymentLink);
        toast.warn('Off-session charge failed. Send the payment link to the client.');
      } else {
        toast.error('Charge failed or requires customer action.');
      }
    } catch (err: any) {
      if (err.response?.data?.paymentLink) {
        setPaymentLink(err.response.data.paymentLink);
        toast.warn('Off-session charge failed. Send the payment link to the client.');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Charge failed.');
      }
    }
    
    setIsCharging(false);
  };

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.info('Link copied!');
  };

  if (!isOpen || !schedule) return null;

  return (
    <>
      {/* Main Charge Modal */}
      <div className="fixed inset-0 z-[999999] flex -top-12 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-2">Extra Charge</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount (£)</label>
            <input
              type="number"
              min="0.01"
              max={MAX_EXTRA_CHARGE}
              step="0.01"
              value={chargeAmount}
              onChange={e => setChargeAmount(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <div className="text-xs text-gray-500 mt-1">Maximum allowed extra charge is £{MAX_EXTRA_CHARGE}.</div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reason <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={chargeReason}
              onChange={e => setChargeReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {paymentLink && (
            <div className="mb-4 bg-yellow-50 border border-yellow-300 rounded p-3">
              <div className="mb-2 text-yellow-800 font-medium">Off-session charge failed. Copy and send this payment link to the client:</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={paymentLink}
                  readOnly
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs"
                  onFocus={e => e.target.select()}
                />
                <button
                  onClick={copyPaymentLink}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mt-4 mb-2">
            Off-session charges are subject to Stripe's strict 
            compliance and anti-fraud policies. 
            Abuse or excessive use of off-session charges would 
            result in account suspension, legal action, 
            and loss of payment processing privileges. 
            Only use this feature for legitimate, customer-authorized extra work 
            (e.g., extra minutes not due to cleaner's fault). 
            All actions are logged and would be audited by Stripe.
          </div>
          <div className="text-xs text-red-500 mb-2 p-3 bg-red-50 rounded border-red-200">
            Misuse of off-session charges can result in legal liability and permanent loss of your Stripe account.
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={isCharging}
            >
              Cancel
            </button>
            <button
              onClick={handleCharge}
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isCharging}
            >
              {isCharging ? 'Charging...' : 'Charge'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmCharge && (
        <div className="fixed inset-0 z-[999999] flex -top-12 items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Extra Charge</h2>
            <div className="mb-2 text-gray-700">
              You are about to charge <span className="font-bold">£{chargeAmount}</span> to the customer.
            </div>
            {chargeReason && (
              <div className="mb-2 text-gray-600">
                Reason: <span className="italic">{chargeReason}</span>
              </div>
            )}
            <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded p-3 mt-2 mb-2">
              <strong>Compliance Notice:</strong> Off-session charges are subject to Stripe's strict compliance and anti-fraud policies. Abuse or excessive use of off-session charges can result in account suspension, legal action, and loss of payment processing privileges. Only use this feature for legitimate, customer-authorized extra work (e.g., extra minutes not due to cleaner's fault). All actions are logged and may be audited by Stripe.
            </div>
            <div className="text-xs text-red-500 mb-2">
              Misuse of off-session charges can result in legal liability and permanent loss of your Stripe account.
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowConfirmCharge(false)}
                className="px-4 py-2 bg-gray-200 rounded"
                disabled={isCharging}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCharge}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={isCharging}
              >
                {isCharging ? 'Charging...' : 'Confirm & Charge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 