import type { Booking } from '../../api/bookingSchedules';
// Utility to robustly restore selectedFrequency from bookingData
export function restoreSelectedFrequency(bookingData: Partial<Booking> & { selectedFrequency?: string | number }) {
  let restoredFrequency = null;
  if (typeof bookingData.selectedFrequency === 'number' && bookingData.selectedFrequency >= 0 && bookingData.selectedFrequency <= 3) {
    restoredFrequency = bookingData.selectedFrequency;
  } else if (typeof bookingData.selectedFrequency === 'string') {
    const idx = ["weekly", "fortnight", "monthly", "onetime"].indexOf(bookingData.selectedFrequency);
    restoredFrequency = idx !== -1 ? idx : null;
  } else if (typeof bookingData.frequency === 'string') {
    const idx = ["weekly", "fortnight", "monthly", "onetime"].indexOf(bookingData.frequency);
    restoredFrequency = idx !== -1 ? idx : null;
  }
  return restoredFrequency;
}

