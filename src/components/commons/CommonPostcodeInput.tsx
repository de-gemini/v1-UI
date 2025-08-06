import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import { API_BASE_URL } from '../../constants';
import ErrorHandler from '../../utils/errorHandler';

const CommonPostcodeInput: React.FC = () => {
  const [postcode, setPostcode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleQuoteMeClick = async () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
      if (res.data?.area) {
        toast.success(`Postcode found: ${res.data.area}`);
        navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
      } else {
        toast.error('Sorry, your postcode is not within our coverage');
      }
    } catch (err: any) {
      const sanitizedMessage = ErrorHandler.getErrorMessage(err, 'CommonPostcodeInput');
      toast.error(sanitizedMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-blue-300 w-full">
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
        className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-brand-primary/90 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center min-w-[140px]"
        onClick={handleQuoteMeClick}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-brand-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </span>
        ) : (
          'GET STARTED'
        )}
      </button>
    </div>
  );
};

export default CommonPostcodeInput; 