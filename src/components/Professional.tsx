import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, A11y } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0z" />
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

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const { imageSrc, name, rating, description } = professional;
  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 100;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-top"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://placehold.co/400x250/ccc/333?text=Professional';
            target.alt = `Image for ${name} not found`;
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <StarRating rating={rating} />
        <p className="text-gray-700 text-sm mt-3 mb-2 flex-grow leading-relaxed">
          {description.length > textLimit && !isExpanded
            ? `${description.substring(0, textLimit)}...`
            : description}
        </p>
        {description.length > textLimit && (
          <button
            onClick={toggleReadMore}
            className="text-brand-primary font-semibold text-sm self-start hover:underline focus:outline-none mt-auto"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
};

export const ProfessionalsCarousel: React.FC<ProfessionalsCarouselProps> = ({ professionals }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // This useEffect is mostly a fallback/re-initializer if Swiper's internal mechanisms
    // somehow miss the refs on first render. onBeforeInit is the primary way.
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto relative overflow-hidden"> {/* Added overflow-hidden */}
        {/* Swiper Navigation Buttons */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          // Adjusted left position to be slightly outside the content area for alignment with screenshot
          // Consider matching your general page padding here
          className="absolute z-20 left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 flex items-center justify-center hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <button
          ref={nextRef}
          aria-label="Next slide"
          // Adjusted right position to be slightly outside the content area for alignment with screenshot
          // Consider matching your general page padding here
          className="absolute z-20 right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 flex items-center justify-center hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        >
          <ArrowRight className="w-7 h-7" />
        </button>

        <Swiper
          modules={[Pagination, Navigation, A11y]}
          spaceBetween={24}
          slidesPerView={1.1}
          centeredSlides={false} // Ensure this is false so slides start from the left
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          loop={false}
          className="mySwiper !pb-12"
          // Use slidesOffsetBefore and slidesOffsetAfter to control starting/ending space
          // These values should typically match your desired side padding.
          slidesOffsetBefore={16} // Equivalent to px-4 (16px) for smallest screens
          slidesOffsetAfter={16}  // Equivalent to px-4 (16px) for smallest screens
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              const { navigation } = swiper.params;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            640: { // sm
              slidesPerView: 2.2,
              spaceBetween: 24,
              slidesOffsetBefore: 24, // Equivalent to sm:px-6 (24px)
              slidesOffsetAfter: 24,
            },
            768: { // md
              slidesPerView: 3.2,
              spaceBetween: 24,
              slidesOffsetBefore: 32, // Equivalent to lg:px-8 (32px)
              slidesOffsetAfter: 32,
            },
            1024: { // lg
              slidesPerView: 3.8,
              spaceBetween: 32,
              slidesOffsetBefore: 32, // Equivalent to lg:px-8 (32px)
              slidesOffsetAfter: 32,
            },
            1280: { // xl
              slidesPerView: 4.2,
              spaceBetween: 32,
              slidesOffsetBefore: 32, // Maintain consistent offset for xl
              slidesOffsetAfter: 32,
            },
          }}
        >
          {professionals.map((professional) => (
            <SwiperSlide key={professional.id} className="!h-auto">
              <ProfessionalCard professional={professional} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

