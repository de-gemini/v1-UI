
import React from 'react';

interface WhyChooseCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full">
      
      <div className="w-24 h-24 mb-4 flex items-center justify-center">
        <img
          src={imageSrc}
          className="max-w-full max-h-full object-contain"
          alt={title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevents infinite loop
            target.src = 'https://placehold.co/96x96/e0e0e0/555555?text=Icon'; // Fallback image
            target.alt = `Icon for ${title} not found`;
          }}
        />
      </div>

      {/* Title */}
      <h3 className="text-brand-primary nunito-sans-heading text-xl font-bold mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 nunito-sans-text text-base leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseCard;
