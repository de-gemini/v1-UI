

// components/ImageSlider.tsx
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import CompareSlider from './CompareSlider';

interface Slide {
  before: string;
  after: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 15,
    },
    loop: true,
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {slides.map((slide, idx) => (
        <div key={idx} className="keen-slider__slide p-2">
          <CompareSlider beforeSrc={slide.before} afterSrc={slide.after} />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
