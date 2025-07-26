import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  additionalText?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, additionalText }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {label && (
        <span className="font-semibold">
          {label}
          {additionalText && <span className="text-brand-primary ml-1">{additionalText}</span>}
        </span>
      )}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChange(false)}
          className={`px-4 py-1 rounded-md border font-bold ${
            !checked 
              ? 'bg-brand-primary text-white border-brand-primary' 
              : 'bg-white border-brand-primary text-brand-primary'
          }`}
        >
          No
        </button>
        <button 
          onClick={() => onChange(true)}
          className={`px-4 py-1 rounded-md border font-bold ${
            checked 
              ? 'bg-brand-primary text-white border-brand-primary' 
              : 'bg-white border-brand-primary text-brand-primary'
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Toggle;
