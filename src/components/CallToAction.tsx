
import {MapPin }from 'lucide-react';
import React, { useState, useEffect } from 'react';
import backgroundBig from '../assets/images/bot_cta_bg_new.png';
import backgroundSmall from '../assets/images/bot_cta_small.png';
import { callPostcodeApi } from '../utils/postCodeAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
    const [postcode, setPostcode] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
  
   
    const updateBackgroundImage = () => {
      if (window.innerWidth < 768) {
        setBackgroundImage(backgroundSmall);
      } else {
        setBackgroundImage(backgroundBig);
      }
    };
  
    useEffect(() => {
      
      updateBackgroundImage();
      window.addEventListener('resize', updateBackgroundImage);
      return () => window.removeEventListener('resize', updateBackgroundImage);
    }, []);
  
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
  
    const handlePostcodeSubmission = async () => {
      setError('');
      await callPostcodeApi(
        postcode,
        (area) => {
          toast.success(`Postcode found: ${area}`);
          navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
        },
        (message) => {
          toast.error(message);
          setError(message);
        }
      );
    };
  
    return (
      <section
        className="w-full flex flex-col items-center justify-center py-10 px-4 text-center md:py-16 lg:py-20 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[40px] text-brand-primary leading-tight mb-8">
            Cleaning Is No Longer <br className="hidden md:block"/>
            Your Burden
          </h1>
  
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-purple-300 max-w-md w-full">
            <div className="flex items-center flex-grow p-2">
              <MapPin className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter your post code here"
                className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                aria-label="Enter your postcode"
              />
            </div>
            <button
              onClick={handlePostcodeSubmission}
              className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              QUOTE ME
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default CallToActionSection;



