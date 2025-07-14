import React, { useState, Fragment, type FC } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  services: string[];
  mainImageUrl: string; 
  imageAlt: string;
  initialItemsToShow?: number;
  smallIconUrl?: string; 
  SmallIconComponent?: React.ElementType;
  imagePosition: 'left' | 'right';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  services,
  mainImageUrl,
  imageAlt,
  initialItemsToShow = 2,
  smallIconUrl,
  SmallIconComponent,
  imagePosition,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll
    ? services
    : services.slice(0, initialItemsToShow);

  const imageOrderClasses =
    imagePosition === 'right'
      ? 'order-first md:order-last'
      : 'order-first md:order-first';

  const contentOrderClasses =
    imagePosition === 'right'
      ? 'order-last md:order-first'
      : 'order-last md:order-last';

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-4">

      {/* Main Image Section */}
      <div className={`md:w-1/2 overflow-hidden ${imageOrderClasses}`}>
        <img
          src={mainImageUrl}
          alt={imageAlt}
          className="w-full h-[200px] sm:h-[250px] md:h-full object-cover object-center"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
            target.alt = "Fallback image: Cleaning services image not found.";
          }}
        />
      </div>

      {/* Text Content Section */}
      <div className={`md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${contentOrderClasses}`}>
        <div className="flex items-center text-brand-primary mb-6">
          {SmallIconComponent ? (
            
            <SmallIconComponent className="w-8 h-8 mr-3 text-brand-primary flex-shrink-0" />
          ) : smallIconUrl ? (
            // If smallIconUrl is provided, render an <img> tag.
            <img src={smallIconUrl} alt={`${title} icon`} className="w-8 h-8 mr-3 flex-shrink-0" />
          ) : (
            // <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gray-100 rounded"></div>
            null
          )}

          <h2 className="text-xl sm:text-2xl font-bold nunito-sans-heading">
            {title}
          </h2>
        </div>

        <p className="text-gray-700 nunito-sans-text text-base sm:text-lg mb-6">
          {description}
        </p>

        <ul className="text-gray-700 space-y-2 mb-6 list-none p-0">
          {displayedServices.map((service, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 mr-3 text-brand-primary font-semibold">
                {index + 1}.
              </span>
              {service}
            </li>
          ))}
        </ul>

        
        {services.length > initialItemsToShow && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
            {showAll ? "See less" : `${services.length - initialItemsToShow} more`}
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;