import { title } from 'framer-motion/client';
import { Check, MapPin } from 'lucide-react';
import React from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import mainBanner from '../assets/images/main-banner-removebg-preview.png';
import CommonPostcodeInput from './commons/CommonPostcodeInput';

interface BannerProps {
    title: string;
}

const Banner: React.FC<BannerProps> = (
    { title }
) => {
    const navigate = useNavigate();

    const features = [
        "24/7 service",
        "Cashback up to £150",
        "Eco-friendly",
        "Pay as You Go",
      ];

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#f3f4f6] to-[#e0e7ef] overflow-hidden px-4 md:px-8">
      {/* Decorative Gradient Circle */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-brand-primary/0 rounded-full blur-2xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-yellow-200/30 to-white/0 rounded-full blur-2xl z-0"></div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 py-10 md:py-16">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center bg-white/90 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary leading-tight mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
            Book trusted, eco-friendly cleaning for your home or office. Flexible scheduling, transparent pricing, and a satisfaction guarantee.
          </p>
          {/* Features List */}
          <div className="flex flex-wrap gap-3 mb-8">
            {features.map((feature, index) => (
              <span key={index} className="inline-flex items-center bg-gray-100 text-brand-primary font-semibold px-4 py-2 rounded-full text-sm shadow-sm">
                <Check className="h-5 w-5 mr-2 text-brand-primary" />
                {feature}
              </span>
            ))}
          </div>
          {/* Postcode Input and Button */}
          
            <CommonPostcodeInput />
          
        </div>
        {/* Right: Decorative Image */}
        <div className="w-full -mb-12 md:w-1/2 flex items-center justify-center">
          <img
            src={mainBanner}
            alt="Gemini Cleaning Hero"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-contain drop-shadow-xl"
            style={{
              minHeight: 220,
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;