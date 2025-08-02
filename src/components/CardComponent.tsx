import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import "../index.css";

// Import Swiper modules
import { Pagination, Navigation, A11y } from "swiper/modules";
import { FaBullseye } from "react-icons/fa";

// --- Interfaces for Typing ---
interface ServiceCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  description: string;
}

interface ServiceCarouselProps {
  services: ServiceCardProps[];
}

// --- Reusable ServiceCard Component ---
const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  altText,
  title,
  price,
  description,
}) => {
  const navigate = useNavigate();
  
  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(`Hello I want to make enquiries about your ${title} services`);
    const whatsappUrl = `https://wa.me/+447399487915?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Function to get the appropriate route based on service title
  const getServiceRoute = (serviceTitle: string) => {
    const routeMap: { [key: string]: string } = {
      'Domestic Cleaning': '/services/domestic-cleaning',
      'Upholstery Cleaning': '/pricing-upholstery-cleaning',
      'Regular Cleaning': '/regular-cleaning',
      'Deep Cleaning': '/services-deep-cleaning',
      'End of Tenancy Cleaning': '/services/end-tenancy-cleaning',
      'Carpet Cleaning': '/services/carpet-cleaning',
      'Office Cleaning': '/services-office-cleaning',
    };
    return routeMap[serviceTitle] || null;
  };

  const serviceRoute = getServiceRoute(title);

  const handleCardClick = () => {
    if (serviceRoute) {
      navigate(serviceRoute);
    }
  };

  return (
    <div 
      className={`bg-brand-blue rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full ${serviceRoute ? 'cursor-pointer' : ''}`}
      onClick={serviceRoute ? handleCardClick : undefined}
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full rounded-br-[100px] object-cover rounded-t-lg"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop
            target.src =
              "https://placehold.co/300x200/cccccc/333333?text=Image+Error"; // Fallback image
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {price ? (
          <p className="text-brand-primary text-lg font-semibold mb-3">{price}</p>
        ) : (
          <button
            onClick={handleWhatsAppEnquiry}
            className="text-yellow-600  border text-left text-lg font-semibold mb-3 underline transition-colors duration-200"
          >
            Make Enquiry
          </button>
        )}
        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        {/* You can add a "Learn More" button or link here if desired */}
      </div>
    </div>
  );
};

// --- ServiceCarousel Component ---
export const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  services,
}) => {
  // Refs for custom navigation buttons
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="absolute z-10 -left-2 top-1/2 -translate-y-10 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute z-10 -right-2 top-1/2 -translate-y-10 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowRight className="w-6 h-6" />
      </button>
      {/* Swiper with custom navigation */}
      <Swiper
        modules={[Pagination, Navigation, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        pagination={{ clickable: true }}
        loop={false}
        className="mySwiper !pb-10"
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index} className="h-full">
            <ServiceCard {...service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
