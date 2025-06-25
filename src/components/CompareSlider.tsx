
// components/CompareSlider.tsx
import React, { useRef, useState } from 'react';

interface CompareSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}

const CompareSlider: React.FC<CompareSliderProps> = ({ beforeSrc, afterSrc, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const newPos = ((e.clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.max(0, Math.min(newPos, 100)));
  };

  return (
    <div
      className="relative overflow-hidden rounded-md shadow-lg cursor-ew-resize h-64"
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onMouseDown={handleDrag}
      ref={containerRef}
    >
      <img src={beforeSrc} alt={alt} className="w-full h-full object-cover absolute top-0 left-0" />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img src={afterSrc} alt={alt} className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none"
      >
        <div className="bg-white text-black text-xs px-2 py-1 rounded-full shadow-md absolute top-2 left-2">
          BEFORE
        </div>
        <div className="bg-white text-black text-xs px-2 py-1 rounded-full shadow-md absolute top-2 right-2">
          AFTER
        </div>
        <div className="w-8 h-8 bg-white border border-gray-400 rounded-full flex items-center justify-center shadow-md">
          <div className="w-1 h-6 bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default CompareSlider;
