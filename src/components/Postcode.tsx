import React from 'react';
import { MapPin } from 'lucide-react'; 


interface CostCardProps {
  title: string;
  price: string;
  text: string;
  inputPlaceholder: string;
  buttonText: string;
  onQuoteMeClick?: (postcode: string) => void; 
}


export const CostCard: React.FC<CostCardProps> = ({
  title,
  price,
  text,
  inputPlaceholder,
  buttonText,
  onQuoteMeClick,
}) => {
  const [postcode, setPostcode] = React.useState<string>('');

  const handleQuoteClick = () => {
    if (onQuoteMeClick) {
      onQuoteMeClick(postcode);
    }
    // You can add more logic here, e.g., validation, API call
    console.log(`Getting quote for ${title} with postcode: ${postcode}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-500 hover:border hover:border-brand-secondary transition-all duration-75">
      <h3 className="text-2xl font-bold text-brand-primary mb-2 text-center">{title}</h3>
      <p className="text-brand-primary text-xl font-semibold mb-6 text-center">{price}</p>
      <p className="text-brand-primary text-xl font-semibold mb-6 mt-1 text-center">{text}</p>


      {/* Postcode Input */}
      <div className="flex items-center w-full max-w-xs bg-white border border-purple-300 rounded-lg p-3 mb-6">
        <MapPin className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          aria-label={inputPlaceholder}
        />
      </div>

      
      <button
        onClick={handleQuoteClick}
        className="w-full max-w-xs bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
      >
        {buttonText}
      </button>
    </div>
  );
};