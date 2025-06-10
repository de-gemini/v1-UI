import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react'; // Using lucide-react for icons

// Define a type for the service links
interface ServiceLink {
  name: string;
  href: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState<boolean>(false);

  // Ref for the dropdown to detect clicks outside on desktop
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close mobile menu on resize if it becomes a desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        // Always ensure mobile dropdown state is off when desktop view
        if (isServicesDropdownOpen) {
          setIsServicesDropdownOpen(false);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, isServicesDropdownOpen]); // Depend on both states

  // Close services dropdown when clicking outside of it on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply this on desktop where dropdown is hover-based
      if (window.innerWidth >= 768 && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false); // Ensure state is false if clicked outside
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

  const handleServicesDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only toggle on click for mobile screens
    if (window.innerWidth < 768) {
      e.preventDefault(); // Prevent default link behavior on mobile
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
    }
    // On desktop, clicks on this link don't directly open/close the dropdown state,
    // as it's primarily hover-driven.
  };

  const servicesLinks: ServiceLink[] = [
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
    <header className="relative w-full bg-white shadow-md z-50"> {/* Added z-50 to ensure navbar is on top */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center">
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
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Locations</a></li>

          {/* Our Services Dropdown for Desktop */}
          <li
            className="relative group"
            onMouseEnter={() => setIsServicesDropdownOpen(true)} // Always set state on hover for desktop
            onMouseLeave={() => setIsServicesDropdownOpen(false)} // Always set state on leave for desktop
            ref={dropdownRef} // Attach ref for click outside
          >
            <a
              href="#"
              onClick={handleServicesDropdownClick} // Conditional click handling
              className={`flex text-purple-700 text-[16px] font-semibold items-center border-b-2 border-purple-700 pb-1 transition duration-300 ease-in-out ${isServicesDropdownOpen ? 'text-purple-700' : 'hover:text-purple-700'}`}
            >
              Our Services
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
            {/* Dropdown Menu Content (Desktop) */}
            <div
              // Removed isServicesDropdownOpen from desktop visibility logic, relying on group-hover and onMouseEnter/Leave
              className={`absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 min-w-[400px] grid grid-cols-2 gap-x-6 gap-y-2
                transition-all duration-300 ease-in-out opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
            >
              {servicesLinks.map((link, index) => (
                <a key={index} href={link.href} className="block text-gray-700 hover:text-purple-700 whitespace-nowrap p-1 rounded-md transition duration-200">
                  {link.name}
                </a>
              ))}
            </div>
          </li>

          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Pricing</a></li>
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Gifts</a></li>
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Blog</a></li>
          <li><a href="/help" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Help</a></li>
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Reclean guarantee</a></li>
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-purple-700 transition duration-300 ease-in-out">Become a cleaner</a></li>
          <li>
            <a href="#" className="px-5 py-2 border border-purple-700 text-purple-700 rounded-md hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
              Sign In
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out md:hidden z-40
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-start pt-20 px-6 space-y-4 h-full overflow-y-auto"> {/* Added h-full and overflow-y-auto for full-screen scroll */}
          <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Locations</a></li>

          {/* Mobile Our Services Dropdown */}
          <li className="w-full">
            <a
              onClick={handleServicesDropdownClick} // Mobile click handler
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
          <li><a onClick={toggleMobileMenu} href="/help" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Help</a></li>
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
