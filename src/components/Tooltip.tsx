import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help text-gray-400 hover:text-brand-primary transition-colors"
      >
        <InfoIcon size={16} />
      </div>
      {showTooltip && (
        <div className="absolute z-50 w-48 px-2 py-1 -mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg -left-20 top-full">
          <div className="absolute w-3 h-3 -mt-5 rotate-45 bg-gray-900 left-[5.5rem]" />
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
