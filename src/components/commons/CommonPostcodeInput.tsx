import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { API_BASE_URL } from '../../constants';

const CommonPostcodeInput: React.FC = () => {
  const [postcode, setPostcode] = React.useState('');
  const navigate = useNavigate();

  const handleQuoteMeClick = async () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-purple-300 max-w-md w-full">
      <div className="flex items-center flex-grow p-2">
        <MapPin className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Enter your post code here"
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
          value={postcode}
          onChange={e => setPostcode(e.target.value)}
          aria-label="Enter your postcode"
        />
      </div>
      <button
        className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        onClick={handleQuoteMeClick}
      >
        GET STARTED
      </button>
    </div>
  );
};

export default CommonPostcodeInput; 