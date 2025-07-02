import React from 'react';
import { Check, MapPin } from 'lucide-react'; 
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface CostCardProps {
  title: string;
  price: string;
  text: string;
  inputPlaceholder: string;
  buttonText: string;
  onQuoteMeClick?: (postcode: string) => void; 
}


export const CostCard: React.FC<CostCardProps> = ({
  title,
  price,
  text,
  inputPlaceholder,
  buttonText,
  onQuoteMeClick,
}) => {
  const [postcode, setPostcode] = React.useState<string>('');
  const navigate = useNavigate();

  const handleQuoteClick = async () => {
    if (onQuoteMeClick) {
      onQuoteMeClick(postcode);
      return;
    }
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
    try {
      const res = await axiosInstance.post('https://v1-api-6rdd.onrender.com/postcode', { postcode });
      toast.success(`Success: ${JSON.stringify(res.data)}`);
      navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-500 hover:border hover:border-brand-secondary transition-all duration-75">
      <ToastContainer
        position='top-right'
        rtl={true}
        hideProgressBar={false}
        autoClose={5000}
        draggable={true}
        icon={<Check/>}
        pauseOnHover={true}
        />
      <h3 className="text-2xl font-bold text-brand-primary mb-2 text-center">{title}</h3>
      <p className="text-brand-primary text-xl font-semibold mb-6 text-center">{price}</p>
      <p className="text-brand-primary text-xl font-semibold mb-6 mt-1 text-center">{text}</p>


      {/* Postcode Input */}
      <div className="flex items-center w-full max-w-xs bg-white border border-purple-300 rounded-lg p-3 mb-6">
        <MapPin className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          aria-label={inputPlaceholder}
        />
      </div>

      
      <button
        onClick={handleQuoteClick}
        className="w-full max-w-xs bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
      >
        {buttonText}
      </button>
    </div>
  );
};