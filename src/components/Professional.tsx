import React, { useState, useRef, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Import Swiper modules
import { Pagination, Navigation, A11y } from 'swiper/modules';



interface Professional {
  id: number;
  imageSrc: string;
  name: string;
  rating: number; 
  description: string;
}

interface ProfessionalCardProps {
  professional: Professional;
}

interface ProfessionalsCarouselProps {
  professionals: Professional[];
}

// --- Helper Component for Star Rating ---
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-brand-primary">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0z" /> {/* Path for a half star */}
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 20 20">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  );
};

// --- ProfessionalCard Component (Reusable for each professional) ---
const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const { imageSrc, name, rating, description } = professional;
  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 100; // Characters after which "See more" appears

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Professional Image */}
      <div className="w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-top" // object-top to focus on head/shoulders
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop
            target.src = 'https://placehold.co/400x250/ccc/333?text=Professional'; // Fallback image
            target.alt = `Image for ${name} not found`;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <StarRating rating={rating} />
        <p className="text-gray-700 text-sm mt-3 mb-2 flex-grow">
          {description.length > textLimit && !isExpanded
            ? `${description.substring(0, textLimit)}...`
            : description}
        </p>
        {description.length > textLimit && (
          <button
            onClick={toggleReadMore}
            className="text-brand-primary font-semibold text-sm self-start hover:underline focus:outline-none"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
};

// --- ProfessionalsCarousel Component (Integrates Swiper) ---
export const ProfessionalsCarousel: React.FC<ProfessionalsCarouselProps> = ({ professionals }) => {
  // Refs for custom navigation buttons
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // No need for swiperInstance state or useEffect for navigation setup with this approach

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">

        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="swiper-button-prev absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          ref={nextRef}
          aria-label="Next slide"
          className="swiper-button-next absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
        
        <Swiper
          modules={[Pagination, Navigation, A11y]}
          spaceBetween={24} // Spacing between slides
          slidesPerView={1.2} // Default for mobile to show partial next slide
          // Pass the refs directly to the navigation object.
          // Swiper will look for these elements on initialization.
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }} // Enable clickable pagination dots
          loop={false} // Set to true if you want infinite loop
          className="mySwiper !pb-10" // Add padding bottom for pagination dots to avoid overlapping
          // Use onBeforeInit to ensure navigation elements are available when Swiper initializes
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              const { navigation } = swiper.params;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            // When window width is >= 640px (sm)
            640: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            // When window width is >= 768px (md)
            768: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            // When window width is >= 1024px (lg) - close to the screenshot's view
            1024: {
              slidesPerView: 3.8, // To show partial next slide, as seen in screenshot
              spaceBetween: 24,
            },
            // When window width is >= 1280px (xl)
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {professionals.map((professional) => (
            <SwiperSlide key={professional.id} className="!h-auto"> {/* Ensure slide height adapts to content */}
              <ProfessionalCard professional={professional} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};