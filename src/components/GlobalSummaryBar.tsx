import React, { useState } from 'react';
import { useCheckoutStore, useFinalTotalPrice, usePricingBreakdown } from '../store/checkoutStore';
import { formatDate } from '../utils/dateUtils';
import { PRICING_CONFIG, ServiceType } from '../pages/Checkout/ckeckoutData';
import BookingSummary from '../pages/Checkout/BookingSummary';

const GlobalSummaryBar: React.FC = () => {
  const { selectedDate, selectedType, step , hour,minute} = useCheckoutStore();
  const finalTotalPrice = useFinalTotalPrice();
  const pricingBreakdown = usePricingBreakdown();
  const [showSummary, setShowSummary] = useState(false);

  // Only show the summary bar after Step 1
  if (step <= 1) {
    return null;
  }

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
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-orange-100 shadow-md border-b border-gray-200">
        <div className=" mx-auto px-4 py-3 flex flex-col items-end">
          {selectedType === ServiceType.END_OF_TENANCY ? (
            // Simplified view for End of Tenancy
            <>
              <div className="flex flex-col items-end text-blue-900">
                <span className="font-semibold text-sm">{formatDate(selectedDate)}, {hour}:{minute < 10 ? `0${minute}` : minute}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowSummary(true)}
                  className="text-brand-primary hover:text-blue-700 font-medium"
                >
                  View Details
                </button>
                <span className="font-semibold text-brand-primary">
                  £{finalTotalPrice.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            // Full view for other service types
            <>
              <div className="flex flex-col items-end text-blue-900 ">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{formatDate(selectedDate)}, {hour}:{minute < 10 ? `0${minute}` : minute}</span>
                </div>
                <div className="flex flex-col"></div>
                {finalTotalPrice < getMinimumPrice() && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Minimum Price</span>
                    <span className="font-semibold">£{getMinimumPrice().toFixed(2)}</span>
                  </div>
                )}
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
                  onClick={() => setShowSummary(true)}
                  className="text-brand-primary hover:text-blue-700 font-medium"
                >
                  View Details
                </button>
                {pricingBreakdown && pricingBreakdown.calculatedPrice && 
                 pricingBreakdown.calculatedPrice !== pricingBreakdown.finalPrice&&<p className='text-xs text-gray-500'>Min time price</p>}
                <span className="font-semibold text-brand-primary">
                  £{finalTotalPrice.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {showSummary && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center w-screen justify-center">
          <div className="bg-white w-full h-full max-w-full max-h-full overflow-y-auto flex flex-col relative">
            <button
              className="absolute top-4 right-4 z-10 rounded-lg text-yellow-700 flex items-center justify-center shadow-lg  bg-yellow-50  p-2 text-xl"
              onClick={() => setShowSummary(false)}
              aria-label="Close summary"
            >
              close
            </button>
            <div className="flex-1 flex flex-col items-center w-full  justify-center ">
              <BookingSummary />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSummaryBar;
