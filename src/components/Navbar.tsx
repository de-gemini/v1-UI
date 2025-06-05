
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react'; 

interface ServiceLink {
  name: string;
  href: string;
}

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState<boolean>(false);

  // Ref for the dropdown to detect clicks outside
  const dropdownRef = useRef<HTMLLIElement>(null); // Type for an HTML list item element
  // Ref for the mobile menu to detect clicks outside (if needed, but full screen makes it less common)
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Type for an HTML div element

  // Close mobile menu on resize if it becomes a desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) { // md breakpoint
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false); // Also close dropdown if menu closes
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside of it on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { // Type for MouseEvent
      if (window.innerWidth >= 768 && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // When opening/closing mobile menu, also ensure services dropdown is closed
    if (isServicesDropdownOpen) {
      setIsServicesDropdownOpen(false);
    }
  };

  const toggleServicesDropdown = () => {
    // Only toggle on click for mobile, on desktop it's hover
    if (window.innerWidth < 768) { // md breakpoint
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
    }
  };

  const servicesLinks: ServiceLink[] = [ // Explicitly type the array
    { name: 'Regular cleaning', href: '#' },
    { name: 'Deep cleaning', href: '#' },
    { name: 'Office cleaning', href: '#' },
    { name: 'End of Tenancy cleaning', href: '#' },
    { name: 'Carpet cleaning', href: '#' },
    { name: 'Upholstery cleaning', href: '#' },
    { name: 'Same Day cleaning', href: '#' },
    { name: 'Kitchen Deep Cleaning', href: '#' },
    { name: 'Rug Cleaning', href: '#' },
    { name: 'Move in cleaning', href: '#' },
    { name: 'Bathroom cleaning', href: '#' },
    { name: 'Mattress cleaning', href: '#' },
    { name: 'Spring cleaning', href: '#' },
  ];
  
  return (
    <header className="top-0 left-0 w-full bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center">
            {/* Placeholder for eMop logo */}
            <img src="https://www.emop.co.uk/static/images/152x90emop_logox2.png" alt="eMop Logo" className="w-[5rem] rounded-md" />
          </a>

          {/* Hamburger/Close Button for Mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2 transition-transform duration-300 ease-in-out z-50"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Locations</a></li>

            {/* Our Services Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => window.innerWidth >= 768 && setIsServicesDropdownOpen(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setIsServicesDropdownOpen(false)}
              ref={dropdownRef} // Attach ref for click outside
            >
              <a
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { // Type for React MouseEvent
                  e.preventDefault(); // Prevent default link behavior
                  toggleServicesDropdown(); // Handle click for mobile
                }}
                className={`flex text-brand-secondary text-[16px] font-[900] items-center border-b-2 border-purple-700 pb-1 transition duration-300 ease-in-out ${isServicesDropdownOpen ? 'text-brand-secondary text-[700]' : 'hover:text-brand-secondary'}`}
              >
                Our Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
              </a>
              {/* Dropdown Menu Content */}
              <div
                className={`absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 min-w-[1000px] grid grid-cols-2 gap-x-6 gap-y-2 transition-all duration-300 ease-in-out
                  ${isServicesDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
                  md:group-hover:opacity-100 md:group-hover:visible md:group-hover:translate-y-0`}
              >
                {servicesLinks.map((link, index) => (
                  <a key={index} href={link.href} className="block text-gray-700 hover:text-purple-700 whitespace-nowrap p-1 rounded-md transition duration-200">
                    {link.name}
                  </a>
                ))}
              </div>
            </li>

            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Pricing</a></li>
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Gifts</a></li>
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Blog</a></li>
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Help</a></li>
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Reclean guarantee</a></li>
            <li><a href="#" className="text-brand-secondary text-[16px] font-[900] hover:text-purple-700 transition duration-300 ease-in-out">Become a cleaner</a></li>
            <li>
              <a href="#" className="px-5 py-2 border border-purple-700 text-purple-700 rounded-md hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
                Sign In
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out md:hidden z-40
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <ul className="flex flex-col items-start pt-20 px-6 space-y-4">
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Locations</a></li>

            {/* Mobile Our Services Dropdown */}
            <li className="w-full">
              <a
                onClick={toggleServicesDropdown}
                className="flex items-center justify-between text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200 cursor-pointer"
              >
                Our Services
                <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </a>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesDropdownOpen ? 'max-h-screen' : 'max-h-0'}`}
              >
                <ul className="pl-4 pt-2 pb-4 space-y-2 bg-gray-50 rounded-md mt-2">
                  {servicesLinks.map((link, index) => (
                    <li key={index}>
                      <a onClick={toggleMobileMenu} href={link.href} className="block text-gray-700 text-base py-1 hover:bg-gray-100 w-full rounded-md transition duration-200">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Pricing</a></li>
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Gifts</a></li>
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Blog</a></li>
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Help</a></li>
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Reclean guarantee</a></li>
            <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Become a cleaner</a></li>
            <li className="w-full pt-4">
              <a onClick={toggleMobileMenu} href="#" className="block w-full text-center px-5 py-3 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out text-lg">
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </header>
  );
};

export default Navbar; 