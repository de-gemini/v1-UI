
import {MapPin }from 'lucide-react';
import React, { useState, useEffect } from 'react';
import backgroundBig from '../assets/images/bot_cta_bg_new.png';
import backgroundSmall from '../assets/images/bot_cta_small.png';
import { callPostcodeApi } from '../utils/postCodeAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CommonPostcodeInput from './commons/CommonPostcodeInput';

const CallToActionSection = () => {
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
  
    const navigate = useNavigate();
  
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
  
          
            <CommonPostcodeInput />
          
        </div>
      </section>
    );
  };
  
  export default CallToActionSection;



