import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { FaqData } from '../../data/faqData';


interface CommonFAQProps {
  faqData: FaqData;
}

const CommonFAQ: React.FC<CommonFAQProps> = ({faqData }) => {
  const [openFAQ, setOpenFAQ] = React.useState<string | number | null>(null);
  const { title, subtitle, items } = faqData;

  return (
    <div className="relative bg-white max-w-3xl mx-auto mt-12 mb-20">
      {/* Grid line background */}
      <div className="absolute hidden inset-0 pointer-events-none" style={{zIndex: 0}}>
        <svg width="100%" height="100%" style={{display: 'block'}}>
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {title && (
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary py-8 text-center tracking-tight">
          Got Questions? We <span className='editorial'>have</span>  answers
        </h2>
      )}
      <p className="text-gray-500 text-base md:text-lg mb-10 text-center max-w-2xl mx-auto">
        {subtitle}
      </p>
      <div className="" style={{position: 'relative', zIndex: 1}}>
        {items.map((item, idx) => {
          const isOpen = openFAQ === item.id;
          return (
            <div
              key={item.id || idx}
              className="bg-white/50 rounded-2xl transition-all duration-200 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none group"
                onClick={() => setOpenFAQ(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${item.id}`}
              >
                <span className="  md:text-xl font-semibold text-gray-400 group-hover:text-brand-primary transition-colors">
                  {item.question}
                </span>
                <span className="ml-4 flex items-center justify-center rounded-full border border-gray-200 bg-white w-8 h-8 transition-all duration-200">
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-brand-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-brand-primary" />
                  )}
                </span>
              </button>
              <div
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                style={{
                  maxHeight: isOpen ? 500 : 0,
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}
                className="overflow-hidden px-6 pb-5 text-gray-700 bg-white"
              >
                <p className="mt-2 text-base md:text-lg leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommonFAQ; 