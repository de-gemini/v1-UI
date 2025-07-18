import React from 'react';
import { Check, MapPin } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import CommonPostcodeInput from './commons/CommonPostcodeInput';

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
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
  };

  return (
    <div className="relative w-full  mx-auto bg-white  p-8 flex flex-col items-center transition-all duration-300 ">
      {/* Cashback Badge */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-900 text-xs font-bold px-5 py-2 rounded-full shadow-lg border border-yellow-200 tracking-wide z-10">
        {cashbackText}
      </div>

      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800 mt-8 mb-2">
        Prices for deep cleaning in England
      </h2>
      <p className="text-brand-primary text-3xl font-bold mb-8 text-center">
        from £19/h
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
              <td className="py-3 px-2 text-brand-primary font-bold text-right rounded-r-lg">£19/h</td>
            </tr>
            <tr className="bg-white">
              <td className="py-3 px-2 text-gray-800 font-medium">Peak</td>
              <td className="py-3 px-2 text-gray-500">High demand</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">£20/h</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-2 text-gray-800 font-medium">Night</td>
              <td className="py-3 px-2 text-gray-500">Any day (9 pm - 8 am)</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">£29/h</td>
            </tr>
            <tr className="bg-white">
              <td className="py-3 px-2 text-gray-800 font-medium">End of tenancy</td>
              <td className="py-3 px-2 text-gray-500">Applicable Tariff + End of Tenancy Charge</td>
              <td className="py-3 px-2 text-brand-primary font-bold text-right">£39/h</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Postcode Input */}
      
        <CommonPostcodeInput />
      

    </div>
  );
};