import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react'; // Using lucide-react for icons
import { useAuthStore } from '../store/authStore'; // Assuming this is correctly imported and used elsewhere if needed

interface Links {
  name: string;
  href: string;
}

const servicesLinks: Links[] = [
  { name: 'Regular cleaning', href: '/regular-cleaning' },
  { name: 'Deep cleaning', href: '/services-deep-cleaning' },
  { name: 'Office cleaning', href: '/services-office-cleaning' },
  { name: 'End of Tenancy cleaning', href: '/services/end-tenancy-cleaning' },
  { name: 'Carpet cleaning', href: '/services/carpet-cleaning' },
  // { name: 'Upholstery cleaning', href: '/services-upholstery-cleaning' },
  { name: 'Same Day cleaning', href: '/services/same-day-cleaning' },
  { name: 'Kitchen Deep Cleaning', href: '/services/kitchen-deep-cleaning' },
  { name: 'Rug Cleaning', href: '/services/rug-cleaning' },
  { name: 'Move in cleaning', href: '/services/move-in-cleaning' },
  { name: 'Bathroom cleaning', href: '/services/bathroom-cleaning' },
  { name: 'Mattress cleaning', href: '/services/mattress-cleaning' },
  { name: 'Spring cleaning', href: '/services/spring-cleaning' },
];

const pricingLinks: Links[] = [
  { name: 'House cleaning', href: '/prcing-house-cleaning' },
  { name: 'Office cleaning', href: '/prcing-office-cleaning' },
  { name: 'Deep cleaning', href: '/prcing-deep-cleaning' },
  { name: 'End of Tenancy cleaning', href: '/prcing-tenancy-cleaning' },
  { name: 'Carpet cleaning', href: '/prcing-carpet-cleaning' },
  { name: 'Upholstery cleaning', href: '/prcing-upholstery-cleaning' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState<boolean>(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState<boolean>(false);

  // *** CRITICAL CHANGE: Separate refs for each dropdown ***
  const servicesDropdownRef = useRef<HTMLLIElement>(null);
  const pricingDropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for the main mobile menu container

  // Effect to close mobile menu and dropdowns on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Use lg breakpoint for desktop nav
        if (isMobileMenuOpen) { setIsMobileMenuOpen(false); }
        if (isServicesDropdownOpen) { setIsServicesDropdownOpen(false); }
        if (isPricingDropdownOpen) { setIsPricingDropdownOpen(false); }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, isServicesDropdownOpen, isPricingDropdownOpen]); // Dependencies are crucial here

  // Effect to handle clicks outside dropdowns and the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check for desktop mode (lg: flex in your desktop nav)
      const isDesktop = window.innerWidth >= 1024;

      // Logic for desktop dropdowns (hover handles most, but click-outside for safety)
      if (isDesktop) {
        if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
          setIsServicesDropdownOpen(false);
        }
        if (pricingDropdownRef.current && !pricingDropdownRef.current.contains(event.target as Node)) {
          setIsPricingDropdownOpen(false);
        }
      }

      // Logic for mobile menu (closes if click outside the mobile menu itself, including its dropdowns)
      if (!isDesktop && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Also close any open sub-dropdowns if the main mobile menu is closed by outside click
        setIsServicesDropdownOpen(false);
        setIsPricingDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen, isPricingDropdownOpen, isMobileMenuOpen]); // *** CRITICAL CHANGE: Add dependencies ***

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // When opening/closing mobile menu, also ensure any sub-dropdowns are closed
    if (isServicesDropdownOpen) {
      setIsServicesDropdownOpen(false);
    }
    if (isPricingDropdownOpen) {
      setIsPricingDropdownOpen(false);
    }
  };

  // Handle click for "Our Services" dropdown (mobile and desktop)
  const handleServicesDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only prevent default and toggle on small screens or when the dropdown is closed on desktop
    if (window.innerWidth < 1024 || !isServicesDropdownOpen) { // Use 1024 (lg) for mobile breakpoint
      e.preventDefault();
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
      if (isPricingDropdownOpen) { // Close other dropdown
        setIsPricingDropdownOpen(false);
      }
    }
  };

  // Handle click for "Pricing" dropdown (mobile and desktop) - NOW IDENTICAL TO SERVICES
  const handlePricingDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024 || !isPricingDropdownOpen) { // Use 1024 (lg) for mobile breakpoint
      e.preventDefault();
      setIsPricingDropdownOpen(!isPricingDropdownOpen);
      if (isServicesDropdownOpen) { // Close other dropdown
        setIsServicesDropdownOpen(false);
      }
    }
  };

  return (
    <header className="relative w-full bg-white shadow-md z-50 py-4 px-6 sm:px-16">
      <nav className="max-w-7xl mx-auto flex items-center justify-between ">
        {/* Logo */}
        <a href="/" className="flex flex-col items-start relative group">
          <h1 className='text font-bold text-blue-400 text-[20px]'>
            De<span className="font-semibold text-brand-primary">Gemini</span>
          </h1>
          {/* Creative SVG Underline with Animation */}
          <svg
            className="absolute left-0 right-0 -bottom-0 w-full h-2 group-hover:opacity-100 opacity-80 transition"
            viewBox="0 0 80 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ minWidth: '60px', maxWidth: '120px' }}
          >
            <path
              className="logo-underline-animate"
              d="M2 6C18 2 62 2 78 6"
              stroke="#0e57c5"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <style>{`
            @keyframes draw-erase-underline {
              0% {
                stroke-dashoffset: 80;
              }
              3.33% {
                stroke-dashoffset: 0;
              }
              93.33% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: 80;
              }
            }
            .logo-underline-animate {
              stroke-dasharray: 80;
              stroke-dashoffset: 80;
              animation: draw-erase-underline 15s linear infinite;
            }
          `}</style>
        </a>

        {/* Hamburger/Close Button for Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="block lg:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-md p-2 transition-transform duration-300 ease-in-out z-50"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>

        {/* Desktop Navigation Links */}
        {/* Changed md:hidden to lg:flex based on your mobile menu breakpoint */}
        <ul className="hidden lg:flex items-center space-x-6 lg:space-x-8">
          <li><a href="#" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Locations</a></li>

          {/* Our Services Dropdown for Desktop */}
          <li
            className="relative group"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
            ref={servicesDropdownRef} // *** CRITICAL CHANGE: Use specific ref ***
          >
            <a
              href="#"
              onClick={handleServicesDropdownClick}
              className={`flex text-black text-[16px] font-semibold items-center transition duration-300 ease-in-out ${isServicesDropdownOpen ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'hover:text-brand-secondary'}`}
            >
              Our Services
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
            {/* Dropdown Menu Content (Desktop) */}
            <div
              className={`absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 min-w-[400px] grid grid-cols-2 gap-x-6 gap-y-2
                transition-all duration-300 ease-in-out opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
            >
              {servicesLinks.map((link, index) => (
                <a key={index} href={link.href} className="block text-gray-700 hover:text-brand-primary whitespace-nowrap p-1 rounded-md transition duration-200">
                  {link.name}
                </a>
              ))}
            </div>
          </li>

          {/* Our Pricing Dropdown for Desktop */}
          <li
            className="relative group"
            onMouseEnter={() => setIsPricingDropdownOpen(true)}
            onMouseLeave={() => setIsPricingDropdownOpen(false)}
            ref={pricingDropdownRef} // *** CRITICAL CHANGE: Use specific ref ***
          >
            <a
              href="#"
              onClick={handlePricingDropdownClick}
              className={`flex text-black text-[16px] font-semibold items-center transition duration-300 ease-in-out ${isPricingDropdownOpen ? 'border-b-2 border-brand-primary pb-1 text-brand-primary' : 'hover:text-brand-text'}`}
            >
              Pricing
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isPricingDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
            {/* Dropdown Menu Content (Desktop) */}
            <div
              className={`absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 min-w-[400px] grid grid-cols-2 gap-x-6 gap-y-2
                transition-all duration-300 ease-in-out opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
            >
              {pricingLinks.map((link, index) => (
                <a key={index} href={link.href} className="block text-gray-700 hover:text-brand-primary whitespace-nowrap p-1 rounded-md transition duration-200">
                  {link.name}
                </a>
              ))}
            </div>
          </li>
          <li><a href="/giftVoucher" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Gifts</a></li>
          <li><a href="/blog" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Blog</a></li>
          <li><a href="/help" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Help</a></li>
          {/*
          <li><a href="/reclean-guarantee" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Reclean guarantee</a></li>
          <li><a href="/home/registercleaner" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Become a cleaner</a></li>
          */}
          <li>
            <a href="/login" className="px-5 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out">
              Sign In
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef} // *** CRITICAL CHANGE: Apply ref here for mobile menu click outside ***
        className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out lg:hidden z-40
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-start pt-20 px-6 space-y-4 h-full overflow-y-auto">
          <li><a onClick={toggleMobileMenu} href="#" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Locations</a></li>

          {/* Mobile Our Services Dropdown */}
          <li className="w-full">
            <a
              onClick={handleServicesDropdownClick}
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

          {/* *** CRITICAL CHANGE: Mobile Pricing Dropdown Added Here *** */}
          <li className="w-full">
            <a
              onClick={handlePricingDropdownClick} // Mobile click handler
              className="flex items-center justify-between text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200 cursor-pointer"
            >
              Pricing
              <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-300 ${isPricingDropdownOpen ? 'rotate-180' : ''}`} />
            </a>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isPricingDropdownOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
              <ul className="pl-4 pt-2 pb-4 space-y-2 bg-gray-50 rounded-md mt-2">
                {pricingLinks.map((link, index) => (
                  <li key={index}>
                    <a onClick={toggleMobileMenu} href={link.href} className="block text-gray-700 text-base py-1 hover:bg-gray-100 w-full rounded-md transition duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li><a onClick={toggleMobileMenu} href="/giftVoucher" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Gifts</a></li>
          <li><a onClick={toggleMobileMenu} href="/blog" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Blog</a></li>
          <li><a onClick={toggleMobileMenu} href="/help" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Help</a></li>
          {/*
          <li><a onClick={toggleMobileMenu} href="/reclean-guarantee" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Reclean guarantee</a></li>
          <li><a onClick={toggleMobileMenu} href="/home/registercleaner" className="block text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200">Become a cleaner</a></li>
          */}
          <li className="w-full pt-4">
            <a onClick={toggleMobileMenu} href="#" className="block w-full text-center px-5 py-3 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out text-lg">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;