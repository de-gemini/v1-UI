import React from 'react';
import { Check, MapPin } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

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
    <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-sm mx-auto">
      {/* Cashback Badge */}
      <ToastContainer
        position='top-right'
        rtl={true}
        hideProgressBar={false}
        autoClose={5000}
        draggable={true}
        icon={<Check/>}
        pauseOnHover={true}
        />
      <div className="absolute -top-4 left-6 bg-yellow-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md">
        {cashbackText}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
      Prices for deep cleaning in England
      </h2>
      <p className="text-brand-primary text-2xl md:text-3xl font-bold mb-8">
        from £19/h
      </p>

      {/* Price List Items */}
      <div className="space-y-4 mb-8">
        {/* Weekly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-gray-700 text-lg">Next day</span>
          <p className="font-semibold text-lg"><span>Any day from tomorrow (8 am - 9 pm)</span>
<span className='text-brand-primary'>£19/h</span></p>
        </div>

        {/* Fortnightly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-700 text-lg">Peak</span>
          <p className="font-semibold text-lg"><span>High demand</span>
<span className='text-brand-primary'>£20/h</span></p>
        </div>

        {/* Monthly - no bottom border on last item */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Night
</span>
<p className="font-semibold text-lg"><span>Any day (9 pm - 8 am)</span>
<span className='text-brand-primary'>£29/h</span></p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">End of tenancy
</span>
<p className="font-semibold text-lg"><span>Applicable Tariff + End of Tenancy Charge</span>
<span className='text-brand-primary'>£39/h</span></p>
        </div>
      </div>

      {/* Postcode Input */}
      <div className="flex items-center w-full bg-white border border-brand-primary rounded-lg p-3 mb-6 focus-within:border-brand-primary transition-colors duration-200">
        <MapPin className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-base"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          aria-label={inputPlaceholder}
        />
      </div>

      {/* Quote Me Button */}
      <button
        onClick={handleQuoteClick}
        className="w-full bg-brand-primary hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};