

import React, { useState, useRef, useEffect } from 'react';

interface FAQItemProps {
  question: string;
  answer: string | JSX.Element;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, answer]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-2">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="font-semibold text-gray-800 text-xs">{question}</span>
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${contentHeight}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out text-gray-600 mt-2"
      >
        <div className="pb-2 text-xs"><p>{answer}</p></div>
      </div>
    </div>
  );
};