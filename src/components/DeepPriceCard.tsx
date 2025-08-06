import React from 'react';
import { Check, MapPin } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import CommonPostcodeInput from './commons/CommonPostcodeInput';
import { PRICING_CONFIG, calculatePrice, Frequency } from '../pages/Checkout/ckeckoutData';
import ErrorHandler from '../utils/errorHandler';

// You might consider making these props if you have different variations
interface PriceCardProps {
  cashbackText?: string; // Optional prop for the cashback badge text
  inputPlaceholder?: string;
  buttonText?: string;
  onQuoteMeClick?: (postcode: string) => void;
}

export const DeepPriceCard: React.FC<PriceCardProps> = ({
  cashbackText = 'Cashback up to £150', // Default value for the badge
  inputPlaceholder = 'Enter your full post code here',
  buttonText = 'QUOTE ME',
  onQuoteMeClick,
}) => {
  const [postcode, setPostcode] = React.useState<string>('');
  const navigate = useNavigate();

  // Calculate prices using the centralized pricing system
  const getNextDayPrice = () => {
    return calculatePrice.getHourlyRateDisplay(Frequency.ONE_OFF);
  };

  const getPeakPrice = () => {
    // Peak pricing is typically base rate + small premium
    return `£${(PRICING_CONFIG.baseHourlyRate + 2).toFixed(2)}/h`;
  };

  const getNightPrice = () => {
    // Night pricing is typically base rate + premium
    return `£${(PRICING_CONFIG.baseHourlyRate + 11).toFixed(2)}/h`;
  };

  const getEndOfTenancyPrice = () => {
    // End of tenancy includes the additional service cost
    const basePrice = PRICING_CONFIG.baseHourlyRate;
    const additionalCost = PRICING_CONFIG.additionalServices.endOfTenancy;
    return `£${(basePrice + additionalCost).toFixed(2)}/h`;
  };

  const handleQuoteClick = async () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
  
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
  
      // Optional: log or inspect the API response
      console.log(res.data);
  
      // Check if the API returned a valid area
      if (res.data?.area) {
        toast.success(`Postcode found: ${res.data.area}`);
        navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
      } else {
        toast.error('Invalid postcode or area not found.');
      }

    } catch (err: any) {
      const sanitizedMessage = ErrorHandler.getErrorMessage(err, 'DeepPriceCard');
      toast.error(sanitizedMessage);
    }
  };

  return (
    <div className="relative w-full  mx-auto bg-white  p-8 flex flex-col items-center transition-all duration-300 ">
      {/* Cashback Badge */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-lg border border-yellow-200 tracking-wide z-10">
        {cashbackText}
      </div>

      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mt-8 mb-2">
        Prices for our cleaning services
      </h2>
      <p className="text-brand-primary text-3xl font-bold mb-8 text-center">
        in England.
      </p>

      {/* Price List Table */}
      <div className="w-full mb-8">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-gray-600 text-sm font-semibold pb-2">Type</th>
              <th className="text-gray-600 text-sm font-semibold pb-2">Details</th>
              <th className="text-gray-600 text-sm font-semibold pb-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 rounded-lg">
              <td className="py-3 px-2 text-gray-800 font-medium rounded-l-lg">Next day</td>
              <td className="py-3 px-2 text-gray-500">Any day from tomorrow (8 am - 9 pm)</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right rounded-r-lg">{getNextDayPrice()}</td>
            </tr>
            <tr className="bg-white">
              <td className="py-3 px-2 text-gray-800 font-medium">Peak</td>
              <td className="py-3 px-2 text-gray-500">High demand</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">{getPeakPrice()}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-2 text-gray-800 font-medium">Night</td>
              <td className="py-3 px-2 text-gray-500">Any day (9 pm - 8 am)</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">{getNightPrice()}</td>
            </tr>
            <tr className="bg-white">
              <td className="py-3 px-2 text-gray-800 font-medium">End of tenancy</td>
              <td className="py-3 px-2 text-gray-500">Applicable Tariff + End of Tenancy Charge</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">{getEndOfTenancyPrice()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Postcode Input */}
      
        <CommonPostcodeInput />
      

    </div>
  );
};