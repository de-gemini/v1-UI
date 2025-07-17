import React, { useRef } from "react";
import type { ReactNode } from "react";
import card7 from "../assets/images/card-7.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from 'lucide-react';
// import "swiper/css";
// import "swiper/css/navigation";

// New CleaningTip type for the carousel
interface CleaningTip {
  title: string;
  description: string;
  image: string; // Required image URL
  tag?: string;
  link?: string;
  color?: string;
}

interface ProfessionalsCarouselProps {
  tips: CleaningTip[];
}

// Deeper color palette for icon, lighter for background
const COLOR_PALETTE = [
  { icon: '#34D399', bg: '#D1FAE5' }, // emerald-400, emerald-100
  { icon: '#6366F1', bg: '#E0E7FF' }, // indigo-500, indigo-100
  { icon: '#F59E42', bg: '#FEF3C7' }, // orange-400, orange-100
  { icon: '#3B82F6', bg: '#DBEAFE' }, // blue-500, blue-100
  { icon: '#F43F5E', bg: '#FFE4E6' }, // rose-500, rose-100
  { icon: '#10B981', bg: '#D1FAE5' }, // green-500, green-100
  { icon: '#A21CAF', bg: '#EDE9FE' }, // purple-800, purple-100
];

function getColor(idx: number) {
  return COLOR_PALETTE[idx % COLOR_PALETTE.length];
}

export const ProfessionalsCarousel: React.FC<ProfessionalsCarouselProps> = ({ tips }) => {
  // Always show at least 6 cards for design consistency
  let displayTips: CleaningTip[] = tips.length >= 6 ? tips : [
    ...tips,
    ...Array.from({ length: 6 - tips.length }, (_, i) => ({
      title: "Coming Soon",
      description: "More of our cleaning philosophy will be revealed soon!",
      image: card7, // Placeholder image
      tag: "Philosophy",
      color: getColor(tips.length + i).icon,
      link: undefined, // Ensure 'link' is always present
    })),
  ];

  // Swiper navigation refs
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="w-full px-6 sm:px-16 pt-8 relative">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-6">Our Cleaning Philosophy</h2>
      {/* Navigation Arrows */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 flex items-center justify-center hover:bg-brand-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowRight className="w-6 h-6" />
      </button>
      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        className="!pb-10 mx-auto justify-center"
        centeredSlides={true}
        centeredSlidesBounds={true}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
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
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
            centeredSlides: false,
          },
        }}
      >
        {displayTips.map((tip, idx) => {
          const { icon: iconColor, bg: bgColor } = getColor(idx);
          return (
            <SwiperSlide key={idx} className="h-full flex justify-center">
              <div
                className="min-h-[350px] shadow-sm w-full bg-white rounded-2xl flex-shrink-0 flex flex-col items-start p-0 relative border border-gray-200 overflow-hidden"
              >
                {/* Large top image, rounded top corners only */}
                <div className="w-full relative">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover object-center rounded-t-2xl"
                  />
                  {/* Overlay mask */}
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-12 z-10"
                    viewBox="0 0 100 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ pointerEvents: 'none' }}
                  >
                    <path d="M0,24 Q100,0 100,24 Z" fill="white" />
                  </svg>
                </div>
                <div className="flex flex-col items-start p-6 pt-4 w-full z-10">
                  {tip.tag && (
                    <span
                      className="absolute opacity-0 top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full z-10"
                      style={{ background: iconColor, color: '#fff' }}
                    >
                      {tip.tag}
                    </span>
                  )}
                  <h3 className="text-3xl font-bold my-6 text-brand-primary  z-10">{tip.title}</h3>
                  <p className="text-gray-700 mb-4 text-sm z-10">{tip.description}</p>
                  {tip.link && (
                    <a
                      href={tip.link}
                      className="mt-auto text-brand-primary font-semibold hover:underline text-sm z-10"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

