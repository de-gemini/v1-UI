import React from 'react';
import { useCheckoutStore, useEstimatedPrice, useCarpetCleaningPrice } from '../store/checkoutStore';
import { PRICING_CONFIG } from '../pages/Checkout/ckeckoutData';
import { ServiceType } from '../pages/Checkout/ckeckoutData';

const FixedSummaryBar: React.FC = () => {
  const { selectedDate, selectedType } = useCheckoutStore();
  const estimatedPrice = useEstimatedPrice();
  const carpetPrice = useCarpetCleaningPrice();

  const getMinimumPrice = () => {
    switch(selectedType) {
      case ServiceType.REGULAR_ONE_OFF:
        return PRICING_CONFIG.minimumPrices.regularCleaning;
      case ServiceType.END_OF_TENANCY:
        return PRICING_CONFIG.minimumPrices.endOfTenancy;
      case ServiceType.CARPET_UPHOLSTERY:
        return PRICING_CONFIG.minimumPrices.carpetUpholstery;
      default:
        return PRICING_CONFIG.minimumPrices.regularCleaning;
    }
  };

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;
  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalPrice = selectedType === ServiceType.CARPET_UPHOLSTERY 
    ? carpetPrice / 100  // Convert from pence to pounds
    : estimatedPrice + (selectedType === ServiceType.CARPET_UPHOLSTERY ? carpetPrice / 100 : 0);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Selected Date</span>
            <span className="font-semibold">{formatDate(selectedDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Minimum Price</span>
            <span className="font-semibold">{formatPrice(getMinimumPrice())}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Total Price</span>
            <span className="font-bold text-brand-primary">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Add any additional actions or information here */}
        </div>
      </div>
    </div>
  );
};

export default FixedSummaryBar;
