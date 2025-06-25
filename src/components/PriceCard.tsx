

import React from 'react';
import { MapPin } from 'lucide-react';

// You might consider making these props if you have different variations
interface PriceCardProps {
  cashbackText?: string; // Optional prop for the cashback badge text
  inputPlaceholder?: string;
  buttonText?: string;
  onQuoteMeClick?: (postcode: string) => void;
}

export const PriceCard: React.FC<PriceCardProps> = ({
  cashbackText = 'Cashback up to £150', // Default value for the badge
  inputPlaceholder = 'Enter your full post code here',
  buttonText = 'QUOTE ME',
  onQuoteMeClick,
}) => {
  const [postcode, setPostcode] = React.useState<string>('');

  const handleQuoteClick = () => {
    if (onQuoteMeClick) {
      onQuoteMeClick(postcode);
    }
    console.log(`Getting quote for postcode: ${postcode}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-sm mx-auto">
      {/* Cashback Badge */}
      <div className="absolute -top-4 left-6 bg-yellow-300 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-md">
        {cashbackText}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-2">
        Prices for regular cleaning in London
      </h2>
      <p className="text-purple-700 text-2xl md:text-3xl font-bold mb-8">
        from £17/h
      </p>

      {/* Price List Items */}
      <div className="space-y-4 mb-8">
        {/* Weekly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-700 text-lg">Weekly</span>
          <span className="text-purple-700 font-semibold text-lg">£17/h</span>
        </div>

        {/* Fortnightly */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <span className="text-gray-700 text-lg">Fortnightly</span>
          <span className="text-purple-700 font-semibold text-lg">£18/h</span>
        </div>

        {/* Monthly - no bottom border on last item */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 text-lg">Monthly</span>
          <span className="text-purple-700 font-semibold text-lg">£19/h</span>
        </div>
      </div>

      {/* Postcode Input */}
      <div className="flex items-center w-full bg-white border border-purple-400 rounded-lg p-3 mb-6 focus-within:border-purple-600 transition-colors duration-200">
        <MapPin className="h-5 w-5 text-purple-700 mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-base"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          aria-label={inputPlaceholder}
        />
      </div>

      {/* Quote Me Button */}
      <button
        onClick={handleQuoteClick}
        className="w-full bg-brand-primary hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};