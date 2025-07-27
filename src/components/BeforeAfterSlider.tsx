import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import CompareSlider from './CompareSlider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BeforeAfterSlide {
  before: string;
  after: string;
  title?: string;
  description?: string;
  alt?: string;
}

export interface SingleImageSlide {
  image: string;
  title?: string;
  description?: string;
  alt?: string;
}

export interface BeforeAfterSliderProps {
  slides: BeforeAfterSlide[] | SingleImageSlide[];
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  mode?: 'compare' | 'single';
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  slides,
  title,
  subtitle,
  showNavigation = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = '',
  mode = 'compare',
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    loop: true,
    mode: 'free-snap',
    slides: { perView: 1, spacing: 15 },
  });

  // Auto-play functionality
  React.useEffect(() => {
    if (!autoPlay || !instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, instanceRef]);

  return (
    <div className={`w-full  max-w-4xl mx-auto ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      <div className="relative">
        {showNavigation && loaded && instanceRef.current && (
          <>
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 flex items-center justify-center"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, idx) => (
            <div key={idx} className="keen-slider__slide p-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  {mode === 'compare' ? (
                    <CompareSlider 
                      beforeSrc={(slide as BeforeAfterSlide).before} 
                      afterSrc={(slide as BeforeAfterSlide).after} 
                      alt={slide.alt} 
                    />
                  ) : (
                    <img 
                      src={(slide as SingleImageSlide).image} 
                      alt={slide.alt || slide.title || `Slide ${idx + 1}`} 
                      className="w-full h-64 object-cover"
                    />
                  )}
                  {(slide.title || slide.description) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      {slide.title && (
                        <h3 className="text-white hidden font-semibold text-lg mb-1">{slide.title}</h3>
                      )}
                      {slide.description && (
                        <p className="text-white/90 hidden text-sm">{slide.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showDots && loaded && instanceRef.current && (
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === idx
                    ? 'bg-brand-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
        <div className="text-center mt-4 text-sm text-gray-500">
          {currentSlide + 1} of {slides.length}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider; 