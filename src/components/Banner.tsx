import { title } from 'framer-motion/client';
import { Check, MapPin } from 'lucide-react';
import React from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

interface BannerProps {
    title: string;
}

const Banner: React.FC<BannerProps> = (
    { title }
) => {
    const [postcode, setPostcode] = React.useState('');
    const navigate = useNavigate();

    const features = [
        "24/7 service",
        "Cashback up to £150",
        "Eco-friendly",
        "Pay as You Go",
      ];

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
    <div
      className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-start justify-center bg-cover bg-center bg-no-repeat overflow-hidden p-4 md:p-8"
      style={{
        backgroundImage: 'url("https://www.emop.co.uk/static/redesign/images/borough-desktop.jpg")',
      }}
    >
      <ToastContainer
        position='top-right'
        rtl={true}
        hideProgressBar={false}
        autoClose={5000}
        draggable={true}
        icon={<Check/>}
        pauseOnHover={true}
        />
      {/* Overlay to darken image slightly and provide a purple tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#e2e1e8] to-[#e2e1e8] opacity-70"></div>

      {/* Content Container */}
      <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-wide">
              {title}
            </h1>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-purple-800">
                  <Check className="h-6 w-6 text-brand-primary mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl nunito-sans-text text-brand-text">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Postcode Input and Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
              <div className="flex items-center flex-grow p-2">
                <MapPin className="h-6 w-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Enter your post code here"
                  className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
                  aria-label="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
              <button className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5" onClick={handleQuoteClick}>
                QUOTE ME
              </button>
            </div>
          </div>

        </div>

      
    </div>
  );
};

export default Banner;