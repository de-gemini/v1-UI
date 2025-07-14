


import React, { useState } from 'react';

interface ContentBlockProps {
  mainTitle?: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition: 'left' | 'right'; 
  title?: string;
  paragraph?: string | string[];
  content?: string | string[];
  initialItemsToShow?: number;
  bulletIcon?: React.ReactNode;
}

const DefaultBulletIcon: React.FC = () => (
  <svg
    className="w-4 h-4 mt-1 text-brand-primary"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
  </svg>
);


const ContentBlock: React.FC<ContentBlockProps> = ({
  mainTitle,
  imageUrl,
  imageAlt,
  imagePosition,
  title,
  paragraph,
  content,
  initialItemsToShow = 0,
  bulletIcon = <DefaultBulletIcon />, // Default to your SVG bullet
}) => {
  const [showAll, setShowAll] = useState(false);

  const isList = Array.isArray(content);
  const totalItems = isList ? content.length : 0;
  const itemsToDisplay = isList && !showAll ? content.slice(0, initialItemsToShow) : content;
  const hasMore = isList && totalItems > initialItemsToShow;
  const remainingCount = totalItems - initialItemsToShow;


  const imageOrderClasses =
    imagePosition === 'right'
      ? 'order-first md:order-last'
      : 'order-first md:order-first';

  const contentOrderClasses =
    imagePosition === 'right'
      ? 'order-last md:order-first'
      : 'order-last md:order-last';

  return (
    <section className="mb-6">
      {mainTitle && (
        <h1 className="text-brand-primary mt-[4rem] ml-[1rem] md:ml-[2rem] lg:ml-[3rem] mb-[2rem] text-2xl font-extrabold">
          {mainTitle}
        </h1>
      )}

      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className={`md:w-1/2 overflow-hidden ${imageOrderClasses}`}>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Image not found.";
            }}
          />
        </div>

        
        <div className={`md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center ${contentOrderClasses}`}>
          {title && (
            <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                {title}
              </h2>
            </div>
          )}
            {paragraph && (
                <p className="text-brand-text text-base sm:text-lg mb-6 nunito-sans-text leading-relaxed">
                {Array.isArray(paragraph) ? paragraph.join(' ') : paragraph}
                </p>
            )}
    
            {/* Content Section */}
          {isList ? (
            <ul className="text-gray-700 space-y-2 mb-6 list-none p-0">
              {(itemsToDisplay as string[]).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 mr-3 text-brand-secondary">
                    {bulletIcon}
                  </span>
                  
                  {title === "We also provide" ? (
                    <p className="text-brand-primary font-extrabold text-base nunito-sans-text sm:text-lg">
                      {item}
                    </p>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-brand-text text-base sm:text-lg mb-6 nunito-sans-text leading-relaxed">
              {itemsToDisplay as string}
            </p>
          )}

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : `${remainingCount} more`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentBlock;