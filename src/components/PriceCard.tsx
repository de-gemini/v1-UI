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

export const PriceCard: React.FC<PriceCardProps> = ({
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
    <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-sm mx-auto">
      {/* Cashback Badge */}
      <div className="absolute -top-4 left-6 bg-yellow-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md">
        {cashbackText}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
        Prices for regular cleaning in England
      </h2>
      <p className="text-brand-primary text-2xl md:text-3xl font-bold mb-8">
        from £17/h
      </p>

      {/* Price List Items */}
      <div className="space-y-4 mb-8">
        {/* Weekly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-700 text-lg">Weekly</span>
          <span className="text-brand-primary font-semibold text-lg">£17/h</span>
        </div>

        {/* Fortnightly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-700 text-lg">Fortnightly</span>
          <span className="text-brand-primary font-semibold text-lg">£18/h</span>
        </div>

        {/* Monthly - no bottom border on last item */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Monthly</span>
          <span className="text-brand-primary font-semibold text-lg">£19/h</span>
        </div>
      </div>

      {/* Postcode Input */}
      
        <CommonPostcodeInput />
      
    </div>
  );
};