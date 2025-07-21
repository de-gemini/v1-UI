
import React, { useState, type ReactNode } from 'react';

interface DropdownHeaderProps {
    title: string;
    dropdownName: string;
    children: ReactNode; 
  }
  
  export const DropdownHeader: React.FC<DropdownHeaderProps> = ({ title, dropdownName, children }) => {
      
      const [openDropdown, setOpenDropdown] = useState(null);
      
        const toggleDropdown = (dropdownName: any) => {
          setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
        };
      return(
    <div className="relative">
      <h3
        className="font-bold text-lg mb-4 text-brand-primary cursor-pointer flex justify-between items-center lg:mb-4"
        onClick={() => toggleDropdown(dropdownName)}
      >
        {title}
        <svg
          className={`w-5 h-5 text-brand-primary transition-transform duration-300 transform ${
            openDropdown === dropdownName ? 'rotate-180' : ''
          } lg:hidden`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === dropdownName ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 lg:max-h-screen lg:opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
    )
}
  ;