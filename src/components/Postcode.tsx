import React from 'react';
import { Check, MapPin, Briefcase } from 'lucide-react'; 
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import CommonPostcodeInput from './commons/CommonPostcodeInput';
import ErrorHandler from '../utils/errorHandler';


interface CostCardProps {
  title?: string;
  price?: string;
  text?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  onQuoteMeClick?: (postcode: string) => void; 
}


export const CostCard: React.FC<CostCardProps> = ({
  title = 'Cleaning Service',
  price = 'from £17.99/h',
  text = 'Get a fast, free quote for your cleaning needs. Enter your postcode to see prices and availability.',
  inputPlaceholder = 'Enter your post code',
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
      console.log(res.data);
      if (res.data?.area) {
        toast.success(`Postcode found: ${res.data.area}`);
        navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
      } else {
        toast.error('Invalid postcode or area not found.');
      }
    } catch (err: any) {
      const sanitizedMessage = ErrorHandler.getErrorMessage(err, 'PostcodeComponent');
      toast.error(sanitizedMessage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 relative w-full  mx-auto">
      {/* Subtle SVG background with slow animation */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none animate-slowspin" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="180" stroke="#A5B4FC" strokeWidth="2" fill="none" />
        <rect x="60" y="60" width="280" height="280" rx="40" stroke="#A5B4FC" strokeWidth="1.5" fill="none" />
        {/* Additional inner cubes for complexity */}
        </svg>
      <style>{`
        @keyframes slowspin { to { transform: rotate(360deg); } }
        .animate-slowspin { animation: slowspin 24s linear infinite; }
      `}</style>
      {/* Corporate Icon */}
      <div className="z-10 flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 mt-2">
        <Briefcase className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="z-10 text-2xl font-bold text-brand-primary mb-2 text-center tracking-tight">{title}</h3>
      <p className="z-10 bg-white/50 text-blue-700 text-xl font-semibold mb-4 text-center">{price}</p>
      <p className="z-10 text-gray-700 bg-white/70 text-base mb-6 mt-1 text-center leading-relaxed">{text}</p>
      
        <CommonPostcodeInput />
      
    </div>
  );
}