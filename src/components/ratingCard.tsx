import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Pagination, Navigation, A11y } from 'swiper/modules';
import '../index.css';

interface Rating {
  name: string;
  date: string;
  avatar?: string; // optional, fallback to initials if not provided
  review: string;
  rating: number;
}

interface RatingCarouselProps {
  ratings: Rating[];
}

const MAX_REVIEW_LENGTH = 120;

const RatingCard: React.FC<{ rating: Rating }> = ({ rating }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = rating.review.length > MAX_REVIEW_LENGTH;
  const displayText = expanded || !isLong ? rating.review : rating.review.slice(0, MAX_REVIEW_LENGTH) + '...';

  return (
    <div className="bg-purple-50 rounded-xl shadow-md p-6 flex flex-col h-full relative">
      {/* Rating */}
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 text-lg font-bold mr-1">{'★'.repeat(rating.rating)}</span>
        <span className="text-gray-500 text-sm font-semibold">{rating.rating}</span>
      </div>
      {/* Review */}
      <p className="text-gray-800 text-base mb-3 flex-grow">
        {displayText}
        {isLong && (
          <button
            className="ml-2 text-brand-primary font-semibold hover:underline focus:outline-none"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        )}
      </p>
      {/* User Info */}
      <div className="flex items-center mt-4">
        {rating.avatar ? (
          <img src={rating.avatar} alt={rating.name} className="w-10 h-10 rounded-full object-cover mr-3" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-white mr-3">
            {rating.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900 text-sm">{rating.name}</div>
          <div className="text-xs text-gray-500">{rating.date}</div>
        </div>
      </div>
    </div>
  );
};

export const RatingCarousel: React.FC<RatingCarouselProps> = ({ ratings }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowRight className="w-6 h-6" />
      </button>
      <Swiper
        modules={[Pagination, Navigation, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        pagination={{ clickable: true }}
        loop={true}
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
        {ratings.map((rating, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <RatingCard rating={rating} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
