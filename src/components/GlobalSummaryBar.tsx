import React from 'react';
import { useCheckoutStore, useFinalTotalPrice, usePricingBreakdown } from '../store/checkoutStore';
import { formatDate } from '../utils/dateUtils';
import { PRICING_CONFIG, ServiceType } from '../pages/Checkout/ckeckoutData';

const GlobalSummaryBar: React.FC = () => {
  const { selectedDate, selectedType } = useCheckoutStore();
  const finalTotalPrice = useFinalTotalPrice();
  const pricingBreakdown = usePricingBreakdown();

  const getMinimumPrice = () => {
    switch(selectedType) {
      case ServiceType.END_OF_TENANCY:
        // For End of Tenancy, we don't compare with minimum price
        return 0;
      case ServiceType.REGULAR_ONE_OFF:
        return PRICING_CONFIG.minimumPrices.regularCleaning;
      case ServiceType.CARPET_UPHOLSTERY:
        return PRICING_CONFIG.minimumPrices.carpetUpholstery;
      default:
        return PRICING_CONFIG.minimumPrices.regularCleaning;
    }
  };

  const getBasePrice = () => {
    if (selectedType === ServiceType.END_OF_TENANCY) {
      return PRICING_CONFIG.minimumPrices.endOfTenancy;
    }
    return 0;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-orange-100 shadow-md border-b border-gray-200">
      <div className=" mx-auto px-4 py-3 flex flex-col items-end">
        <div className="flex flex-col items-end text-blue-900 ">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{formatDate(selectedDate)}</span>
            {/* <span className="text-xs text-gray-500">Selected Date</span> */}
          </div>
          <div className="flex flex-col">
            {/* <span className="text-sm text-gray-500">Estimated Price</span> */}
          </div>
          {selectedType === ServiceType.END_OF_TENANCY ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Base Price</span>
              <span className="font-semibold">£{PRICING_CONFIG.minimumPrices.endOfTenancy.toFixed(2)}</span>
            </div>
          ) : finalTotalPrice < getMinimumPrice() && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Minimum Price</span>
              <span className="font-semibold">£{getMinimumPrice().toFixed(2)}</span>
            </div>
          )}
          {/* Show total selections when different from final price */}
          {pricingBreakdown && pricingBreakdown.calculatedPrice && 
           pricingBreakdown.calculatedPrice !== pricingBreakdown.finalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Total Selections</span>
              <span className="font-semibold">{pricingBreakdown.calculatedPrice}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="text-brand-primary hover:text-blue-700 font-medium"
          >
            View Summary
          </button>
          <span className="font-semibold text-brand-primary">
            £{finalTotalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSummaryBar;
