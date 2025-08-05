import React, { useState } from 'react';
import { FaTimes, FaSearch, FaDownload, FaCalendarAlt, FaChevronDown, FaPoundSign } from 'react-icons/fa';
import { PDFUtils } from '../../../utils/pdfUtils';
import type { Schedule } from '../../../api/bookingSchedules';
import { bookingScheduleService } from '../../../api/bookingSchedules';
import { getStatusColor, getStatusText } from '../../../utils/scheduleUtils';
import { ConfirmationModal } from '../../../components/shared/ConfirmationModal';

interface ScheduleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  onStatusUpdate: (scheduleId: string, newStatus: "pending" | "confirmed" | "completed" | "cancelled") => Promise<void>;
  onPaymentStatusUpdate: (scheduleId: string, newPaymentStatus: "pending" | "completed" | "failed") => Promise<void>;
}

export const ScheduleDetailsModal: React.FC<ScheduleDetailsModalProps> = ({
  isOpen,
  onClose,
  schedule,
  onStatusUpdate,
  onPaymentStatusUpdate,
}) => {
  const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<"pending" | "confirmed" | "completed" | "cancelled" | null>(null);
  const [pendingPaymentStatus, setPendingPaymentStatus] = useState<"pending" | "completed" | "failed" | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !schedule || !schedule.booking) return null;

  const b = schedule.booking;
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 1) || 'U';
  };

  // Get avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gray-400', 'bg-orange-400', 'bg-blue-400', 'bg-purple-400',
      'bg-green-400', 'bg-red-400', 'bg-yellow-400', 'bg-pink-400'
    ];
    const index = name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gray-400';
  };

  const handleStatusUpdate = async (newStatus: "pending" | "confirmed" | "completed" | "cancelled") => {
    setPendingStatus(newStatus);
    setShowStatusConfirmation(true);
  };

  const handlePaymentStatusUpdate = async (newPaymentStatus: "pending" | "completed" | "failed") => {
    setPendingPaymentStatus(newPaymentStatus);
    setShowPaymentConfirmation(true);
  };

  const confirmStatusUpdate = async () => {
    if (!pendingStatus) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(schedule._id, pendingStatus);
      setShowStatusConfirmation(false);
      setPendingStatus(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmPaymentStatusUpdate = async () => {
    if (!pendingPaymentStatus) return;
    
    setIsUpdating(true);
    try {
      await onPaymentStatusUpdate(schedule._id, pendingPaymentStatus);
      setShowPaymentConfirmation(false);
      setPendingPaymentStatus(null);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusUpdateMessage = (newStatus: string) => {
    const customerName = schedule.booking.user?.name || 'the customer';
    const currentStatus = getStatusText(schedule.status);
    
    switch (newStatus) {
      case 'pending':
        return `Are you sure you want to change the schedule status from "${currentStatus}" to "Pending"? This will mark the booking as awaiting confirmation and may affect the customer's expectations.`;
      case 'confirmed':
        return `Are you sure you want to confirm this schedule? This will notify ${customerName} that their cleaning service is confirmed and ready to proceed.`;
      case 'completed':
        return `Are you sure you want to mark this schedule as completed? This means the cleaning is done and ${customerName} is happy.`;
      case 'cancelled':
        return `Are you sure you want to cancel this schedule? This will notify ${customerName} and may affect their opinion of your service.`;
      default:
        return `Are you sure you want to change the schedule status to "${newStatus}"?`;
    }
  };

  const getPaymentStatusUpdateMessage = (newPaymentStatus: string) => {
    const customerName = schedule.booking.user?.name || 'the customer';
    const currentStatus = schedule.paymentStatus ? schedule.paymentStatus.charAt(0).toUpperCase() + schedule.paymentStatus.slice(1) : 'N/A';
    
    switch (newPaymentStatus) {
      case 'pending':
        return `Are you sure you want to change the payment status from "${currentStatus}" to "Pending"? This indicates that payment is still being processed.`;
      case 'paid':
        return `Are you sure you want to mark the payment as "Paid"? This confirms that ${customerName} has successfully paid for this service.`;
      case 'failed':
        return `Are you sure you want to mark the payment as "Failed"? This indicates that ${customerName}'s payment was unsuccessful and may require follow-up.`;
      default:
        return `Are you sure you want to change the payment status to "${newPaymentStatus}"?`;
    }
  };

  const handleExportPDF = () => {
    const pdf = new PDFUtils();
    
    // Add decorative background and header
    pdf.addDecorativeBackground();
    pdf.addHeader('Schedule Details Report', `Schedule ID: ${schedule._id.slice(-8)}`);
    
    // Customer Information
    pdf.getDocument().setFontSize(16);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text('Customer Information', 20, 55);
    
    pdf.getDocument().setFontSize(12);
    pdf.getDocument().setFont('helvetica', 'normal');
    pdf.getDocument().text(`Name: ${b.user?.name || 'Unknown Customer'}`, 20, 70);
    pdf.getDocument().text(`Email: ${b.user?.email || 'No email'}`, 20, 80);
    pdf.getDocument().text(`Phone: ${b.user?.phoneNumber || 'N/A'}`, 20, 90);
    // Address with proper wrapping
    pdf.addWrappedText('Address', b.address || 'No address', 20, 100);
    
    // Schedule Information
    pdf.getDocument().setFontSize(16);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text('Schedule Information', 20, 120);
    
    pdf.getDocument().setFontSize(12);
    pdf.getDocument().setFont('helvetica', 'normal');
    pdf.getDocument().text(`Date: ${b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString() : 'N/A'}`, 20, 135);
    pdf.getDocument().text(`Time: ${schedule.time || 'No time'}`, 20, 145);
    pdf.getDocument().text(`Amount: £${(b as any)['estimatedPrice'] || (b as any)['actualPrice'] || '0.00'}`, 20, 155);
    
    // Status Information
    pdf.getDocument().setFontSize(16);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text('Status Information', 20, 175);
    
    pdf.getDocument().setFontSize(12);
    pdf.getDocument().setFont('helvetica', 'normal');
    
    // Schedule Status with color
    pdf.addStatusWithColor(schedule.status, 20, 190);
    
    // Payment Status with color
    pdf.addPaymentStatusWithColor(schedule.paymentStatus || 'N/A', 20, 205);
    
    // Service Information
    pdf.getDocument().setFontSize(16);
    pdf.getDocument().setFont('helvetica', 'bold');
    pdf.getDocument().text('Service Information', 20, 225);
    
    pdf.getDocument().setFontSize(12);
    pdf.getDocument().setFont('helvetica', 'normal');
    pdf.getDocument().text(`Service Type: ${(b as any)['serviceType'] || 'Standard Cleaning'}`, 20, 240);
    pdf.getDocument().text(`Frequency: ${b.frequency || 'Not specified'}`, 20, 250);
    pdf.getDocument().text(`Duration: ${(b as any)['estimatedDuration'] || (b as any)['actualDuration'] || 'N/A'} min`, 20, 260);
    
    // Notes
    if (b.notes) {
      pdf.getDocument().setFontSize(16);
      pdf.getDocument().setFont('helvetica', 'bold');
      pdf.getDocument().text('Notes', 20, 280);
      
      pdf.getDocument().setFontSize(12);
      pdf.getDocument().setFont('helvetica', 'normal');
      // Split notes into multiple lines if too long
      const notesLines = pdf.getDocument().splitTextToSize(b.notes, 170);
      pdf.getDocument().text(notesLines, 20, 295);
    }
    
    // Add timestamp
    pdf.addTimestamp();
    
    // Save the PDF
    pdf.save(`schedule-${schedule._id.slice(-8)}.pdf`);
  };

  return (
         <div className="fixed inset-0 z-[999999] flex -top-12  items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
       <div className="bg-white shadow-xl w-full max-w-6xl min-h-[90vh] max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Schedule Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
                     {/* Export Bar */}
           <div className="flex justify-end">
             <button 
               onClick={() => handleExportPDF()}
               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
             >
               <FaDownload className="text-sm" />
               <span>Export as PDF</span>
             </button>
           </div>
        </div>

        {/* Table Section */}
        <div className="overflow-y-auto max-h-[50vh]">
                     {/* Table Header */}
           <div className="bg-blue-600 text-white px-4 sm:px-6 py-4">
             <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 font-semibold text-xs sm:text-sm">
               <div>SCHEDULE</div>
               <div className="hidden sm:block">AMOUNT</div>
               <div className="hidden sm:block">DATE & TIME</div>
               <div className="hidden sm:block">ADDRESS</div>
                               <div>SCHEDULE STATUS</div>
             </div>
           </div>

                     {/* Table Row */}
           <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 hover:bg-gray-50">
             <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 items-center">
               {/* Schedule Column */}
               <div className="flex items-center gap-2 sm:gap-3">
                 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base ${getAvatarColor(b.user?.name || '')}`}>
                   {getInitials(b.user?.name || '')}
                 </div>
                 <div className="min-w-0 flex-1">
                   <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">{b.user?.name || 'Unknown Customer'}</div>
                   <div className="text-xs text-gray-500 truncate">#{schedule._id.slice(-8)}</div>
                 </div>
               </div>

               {/* Amount Column - Hidden on mobile */}
               <div className="hidden sm:block text-xs sm:text-sm font-semibold text-gray-900">
                 £{(b as any)['estimatedPrice'] || (b as any)['actualPrice'] || '0.00'}
               </div>

               {/* Date & Time Column - Hidden on mobile */}
               <div className="hidden sm:block">
                 <div className="text-xs sm:text-sm text-gray-900">
                   {b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString() : 'N/A'}
                 </div>
                 <div className="text-xs text-gray-500">
                   {schedule.time || 'No time'}
                 </div>
               </div>

               {/* Address Column - Hidden on mobile */}
               <div className="hidden sm:block text-xs sm:text-sm text-gray-700 truncate" title={b.address}>
                 {b.address || 'No address'}
               </div>

               {/* Status Column */}
               <div>
                 <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                   schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                   schedule.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                   schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                   'bg-red-100 text-red-800'
                 }`}>
                   {getStatusText(schedule.status)}
                 </span>
               </div>
             </div>
           </div>
        </div>

        {/* Details Section */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Frequency</div>
              <div className="font-medium text-sm">{b.frequency || 'Not specified'}</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Payment Status</div>
              <div className="font-medium text-sm flex items-center gap-2">
                {schedule.paymentStatus}
                {schedule.paidWithCash && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
                    <FaPoundSign className="text-green-600" />
                    Cash
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="font-medium text-sm">{b.user?.email || 'No email'}</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Phone</div>
              <div className="font-medium text-sm">{b.user?.phoneNumber || 'N/A'}</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Notes</div>
              <div className="font-medium text-sm">{b.notes || 'No notes'}</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Service Type</div>
              <div className="font-medium text-sm">{(b as any)['serviceType'] || 'Standard Cleaning'}</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="font-medium text-sm">{(b as any)['estimatedDuration'] || (b as any)['actualDuration'] || 'N/A'} min</div>
            </div>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 sm:col-span-2 lg:col-span-3">
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div className="font-medium text-sm">{b.address || 'No address provided'}</div>
            </div>
          </div>

                     {/* Status Update Section */}
           <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
             <h5 className="text-sm font-semibold text-gray-700 mb-4">Update Schedule Status</h5>
             <div className="space-y-3">
               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="scheduleStatus"
                   value="pending"
                   checked={schedule.status === 'pending'}
                   onChange={() => handleStatusUpdate('pending')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.status === 'pending' 
                     ? 'border-yellow-500 bg-yellow-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.status === 'pending' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.status === 'pending' ? 'text-yellow-700' : 'text-gray-700'
                 }`}>
                   Pending
                 </span>
               </label>

               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="scheduleStatus"
                   value="confirmed"
                   checked={schedule.status === 'confirmed'}
                   onChange={() => handleStatusUpdate('confirmed')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.status === 'confirmed' 
                     ? 'border-green-500 bg-green-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.status === 'confirmed' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.status === 'confirmed' ? 'text-green-700' : 'text-gray-700'
                 }`}>
                   Confirmed
                 </span>
               </label>

               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="scheduleStatus"
                   value="completed"
                   checked={schedule.status === 'completed'}
                   onChange={() => handleStatusUpdate('completed')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.status === 'completed' 
                     ? 'border-blue-500 bg-blue-500' 
                     : 'border-gray-300'
                   }`}>
                   {schedule.status === 'completed' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.status === 'completed' ? 'text-blue-700' : 'text-gray-700'
                 }`}>
                   Completed
                 </span>
               </label>

               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="scheduleStatus"
                   value="cancelled"
                   checked={schedule.status === 'cancelled'}
                   onChange={() => handleStatusUpdate('cancelled')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.status === 'cancelled' 
                     ? 'border-red-500 bg-red-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.status === 'cancelled' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.status === 'cancelled' ? 'text-red-700' : 'text-gray-700'
                 }`}>
                   Cancelled
                 </span>
               </label>
             </div>
             <p className="text-xs text-gray-500 mt-3">
               Current schedule status: <span className={`font-medium ${getStatusColor(schedule.status)}`}>{getStatusText(schedule.status)}</span>
             </p>
           </div>

           {/* Payment Status Update Section */}
           <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
             <h5 className="text-sm font-semibold text-gray-700 mb-4">Update Payment Status</h5>
             <div className="space-y-3">
               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="paymentStatus"
                   value="pending"
                   checked={schedule.paymentStatus === 'pending'}
                   onChange={() => handlePaymentStatusUpdate('pending')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.paymentStatus === 'pending' 
                     ? 'border-yellow-500 bg-yellow-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.paymentStatus === 'pending' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.paymentStatus === 'pending' ? 'text-yellow-700' : 'text-gray-700'
                 }`}>
                   Pending
                 </span>
               </label>

               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="paymentStatus"
                   value="completed"
                   checked={schedule.paymentStatus === 'completed'}
                   onChange={() => handlePaymentStatusUpdate('completed')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.paymentStatus === 'completed' 
                     ? 'border-green-500 bg-green-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.paymentStatus === 'completed' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.paymentStatus === 'completed' ? 'text-green-700' : 'text-gray-700'
                 }`}>
                   Completed
                 </span>
               </label>

               <label className="flex items-center cursor-pointer">
                 <input
                   type="radio"
                   name="paymentStatus"
                   value="failed"
                   checked={schedule.paymentStatus === 'failed'}
                   onChange={() => handlePaymentStatusUpdate('failed')}
                   className="sr-only"
                 />
                 <div className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                   schedule.paymentStatus === 'failed' 
                     ? 'border-red-500 bg-red-500' 
                     : 'border-gray-300'
                 }`}>
                   {schedule.paymentStatus === 'failed' && (
                     <div className="w-2 h-2 bg-white rounded-full"></div>
                   )}
                 </div>
                 <span className={`text-sm font-medium ${
                   schedule.paymentStatus === 'failed' ? 'text-red-700' : 'text-gray-700'
                 }`}>
                   Failed
                 </span>
               </label>
             </div>
             <p className="text-xs text-gray-500 mt-3">
               Current payment status: <span className={`font-medium ${
                 schedule.paymentStatus === 'completed' ? 'text-green-600' :
                 schedule.paymentStatus === 'pending' ? 'text-yellow-600' :
                 schedule.paymentStatus === 'failed' ? 'text-red-600' : 'text-gray-600'
               }`}>{schedule.paymentStatus ? schedule.paymentStatus.charAt(0).toUpperCase() + schedule.paymentStatus.slice(1) : 'N/A'}</span>
             </p>
           </div>
        </div>
      </div>

      {/* Status Update Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusConfirmation}
        onClose={() => {
          setShowStatusConfirmation(false);
          setPendingStatus(null);
        }}
        onConfirm={confirmStatusUpdate}
        title="Confirm Status Update"
        message={pendingStatus ? getStatusUpdateMessage(pendingStatus) : ''}
        confirmText="Update"
        cancelText="Cancel"
        type={pendingStatus === 'cancelled' ? 'danger' : 'warning'}
        isLoading={isUpdating}
      />

      {/* Payment Status Update Confirmation Modal */}
      <ConfirmationModal
        isOpen={showPaymentConfirmation}
        onClose={() => {
          setShowPaymentConfirmation(false);
          setPendingPaymentStatus(null);
        }}
        onConfirm={confirmPaymentStatusUpdate}
        title="Confirm Payment Status Update"
        message={pendingPaymentStatus ? getPaymentStatusUpdateMessage(pendingPaymentStatus) : ''}
        confirmText="Update"
        cancelText="Cancel"
        type={pendingPaymentStatus === 'failed' ? 'danger' : 'warning'}
        isLoading={isUpdating}
      />
    </div>
  );
}; 