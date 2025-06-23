import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// These imports are crucial for Swiper to function correctly.
// If you encounter "Could not resolve" errors, please ensure you have
// installed Swiper correctly and your build system is configured to
// recognize these imports.
import "../index.css";

// Import Swiper modules
import { Pagination, Navigation, A11y } from "swiper/modules";

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
  return (
    <div className="bg-brand-blue rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover rounded-t-lg"
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
        <p className="text-brand-primary text-lg font-semibold mb-3">{price}</p>
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
  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Swiper
        modules={[Pagination, Navigation, A11y]}
        spaceBetween={24} // Spacing between slides
        slidesPerView={1} // Default for mobile
        navigation // Enable navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination dots
        loop={true} // Enable looping through slides
        className="mySwiper !pb-10" // Add padding bottom for pagination dots to avoid overlapping
        breakpoints={{
          // When window width is >= 640px (sm)
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          // When window width is >= 768px (md)
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          // When window width is >= 1024px (lg) - close to the screenshot's view
          1024: {
            slidesPerView: 3.5, // To show partial next slide, as seen in screenshot
            spaceBetween: 24,
          },
          // When window width is >= 1280px (xl)
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}>
        {services.map((service, index) => (
          <SwiperSlide key={index} className="h-full">
            {" "}
            {/* Ensure slide height adapts to content */}
            <ServiceCard {...service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
