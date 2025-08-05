/**
 * Payment Status Utilities for Frontend
 * 
 * This file provides unified payment status handling for the frontend application.
 * It ensures consistent payment status display, filtering, and validation.
 */

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded',
}

export class PaymentStatusHelper {
  /**
   * Check if a payment status indicates a successful payment
   */
  static isSuccessful(status: string): boolean {
    return status === PaymentStatus.COMPLETED;
  }

  /**
   * Check if a payment status indicates a failed payment
   */
  static isFailed(status: string): boolean {
    return [PaymentStatus.FAILED, PaymentStatus.CANCELLED].includes(status as PaymentStatus);
  }

  /**
   * Check if a payment status indicates a pending payment
   */
  static isPending(status: string): boolean {
    return status === PaymentStatus.PENDING;
  }

  /**
   * Get the display text for a payment status
   */
  static getDisplayText(status: string): string {
    const statusMap: Record<string, string> = {
      [PaymentStatus.PENDING]: 'Pending',
      [PaymentStatus.COMPLETED]: 'Completed',
      [PaymentStatus.FAILED]: 'Failed',
      [PaymentStatus.CANCELLED]: 'Cancelled',
      [PaymentStatus.REFUNDED]: 'Refunded',
      [PaymentStatus.PARTIALLY_REFUNDED]: 'Partially Refunded',
    };
    return statusMap[status] || 'Unknown';
  }

  /**
   * Get the CSS class for styling payment status
   */
  static getStatusClass(status: string): string {
    const classMap: Record<string, string> = {
      [PaymentStatus.PENDING]: 'text-yellow-600 bg-yellow-100',
      [PaymentStatus.COMPLETED]: 'text-green-600 bg-green-100',
      [PaymentStatus.FAILED]: 'text-red-600 bg-red-100',
      [PaymentStatus.CANCELLED]: 'text-gray-600 bg-gray-100',
      [PaymentStatus.REFUNDED]: 'text-blue-600 bg-blue-100',
      [PaymentStatus.PARTIALLY_REFUNDED]: 'text-orange-600 bg-orange-100',
    };
    return classMap[status] || 'text-gray-600 bg-gray-100';
  }

  /**
   * Get the Tailwind CSS classes for payment status badges
   */
  static getStatusBadgeClasses(status: string): string {
    const classMap: Record<string, string> = {
      [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      [PaymentStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-200',
      [PaymentStatus.FAILED]: 'bg-red-100 text-red-800 border-red-200',
      [PaymentStatus.CANCELLED]: 'bg-gray-100 text-gray-800 border-gray-200',
      [PaymentStatus.REFUNDED]: 'bg-blue-100 text-blue-800 border-blue-200',
      [PaymentStatus.PARTIALLY_REFUNDED]: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return `px-2 py-1 text-xs font-medium rounded-full border ${classMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`;
  }

  /**
   * Validate if a status is a valid payment status
   */
  static isValid(status: string): boolean {
    return Object.values(PaymentStatus).includes(status as PaymentStatus);
  }

  /**
   * Convert legacy status values to unified status
   */
  static normalizeStatus(status: string): PaymentStatus {
    const statusLower = status.toLowerCase();
    
    // Map legacy status values to unified status
    const statusMap: Record<string, PaymentStatus> = {
      'succeeded': PaymentStatus.COMPLETED,
      'paid': PaymentStatus.COMPLETED,
      'success': PaymentStatus.COMPLETED,
      'complete': PaymentStatus.COMPLETED,
      'failed': PaymentStatus.FAILED,
      'failure': PaymentStatus.FAILED,
      'error': PaymentStatus.FAILED,
      'pending': PaymentStatus.PENDING,
      'cancelled': PaymentStatus.CANCELLED,
      'canceled': PaymentStatus.CANCELLED,
      'refunded': PaymentStatus.REFUNDED,
      'partially_refunded': PaymentStatus.PARTIALLY_REFUNDED,
    };

    return statusMap[statusLower] || PaymentStatus.PENDING;
  }

  /**
   * Filter schedules by payment status
   */
  static filterSchedulesByPaymentStatus(schedules: any[], filter: string): any[] {
    if (filter === 'all') return schedules;
    if (filter === 'paid') return schedules.filter(s => PaymentStatusHelper.isSuccessful(s.paymentStatus));
    if (filter === 'unpaid') return schedules.filter(s => !PaymentStatusHelper.isSuccessful(s.paymentStatus));
    if (filter === 'pending') return schedules.filter(s => PaymentStatusHelper.isPending(s.paymentStatus));
    if (filter === 'failed') return schedules.filter(s => PaymentStatusHelper.isFailed(s.paymentStatus));
    return schedules;
  }

  /**
   * Get payment status summary for a list of schedules
   */
  static getPaymentSummary(schedules: any[]): {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    overallStatus: PaymentStatus;
  } {
    const summary = {
      total: schedules.length,
      completed: schedules.filter(s => PaymentStatusHelper.isSuccessful(s.paymentStatus)).length,
      pending: schedules.filter(s => PaymentStatusHelper.isPending(s.paymentStatus)).length,
      failed: schedules.filter(s => PaymentStatusHelper.isFailed(s.paymentStatus)).length,
      overallStatus: PaymentStatus.PENDING
    };

    // Determine overall status
    if (summary.completed === summary.total && summary.total > 0) {
      summary.overallStatus = PaymentStatus.COMPLETED;
    } else if (summary.failed > 0) {
      summary.overallStatus = PaymentStatus.FAILED;
    }

    return summary;
  }

  /**
   * Get payment status icon
   */
  static getStatusIcon(status: string): string {
    const iconMap: Record<string, string> = {
      [PaymentStatus.PENDING]: '⏳',
      [PaymentStatus.COMPLETED]: '✅',
      [PaymentStatus.FAILED]: '❌',
      [PaymentStatus.CANCELLED]: '🚫',
      [PaymentStatus.REFUNDED]: '↩️',
      [PaymentStatus.PARTIALLY_REFUNDED]: '↩️',
    };
    return iconMap[status] || '❓';
  }

  /**
   * Get payment status color for charts/graphs
   */
  static getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      [PaymentStatus.PENDING]: '#f59e0b',
      [PaymentStatus.COMPLETED]: '#10b981',
      [PaymentStatus.FAILED]: '#ef4444',
      [PaymentStatus.CANCELLED]: '#6b7280',
      [PaymentStatus.REFUNDED]: '#3b82f6',
      [PaymentStatus.PARTIALLY_REFUNDED]: '#f97316',
    };
    return colorMap[status] || '#6b7280';
  }
}

/**
 * Payment Status Component Props
 */
export interface PaymentStatusBadgeProps {
  status: string;
  showIcon?: boolean;
  className?: string;
}

/**
 * Payment Status Badge Component
 */
export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ 
  status, 
  showIcon = false, 
  className = '' 
}) => {
  const normalizedStatus = PaymentStatusHelper.normalizeStatus(status);
  const displayText = PaymentStatusHelper.getDisplayText(normalizedStatus);
  const badgeClasses = PaymentStatusHelper.getStatusBadgeClasses(normalizedStatus);
  const icon = showIcon ? PaymentStatusHelper.getStatusIcon(normalizedStatus) : '';

  return (
    <span className={`${badgeClasses} ${className}`}>
      {showIcon && <span className="mr-1">{icon}</span>}
      {displayText}
    </span>
  );
};

/**
 * Payment Status Filter Options
 */
export const PAYMENT_STATUS_FILTERS = [
  { value: 'all', label: 'All Payments' },
  { value: 'paid', label: 'Paid' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
] as const;

export type PaymentStatusFilter = typeof PAYMENT_STATUS_FILTERS[number]['value']; 