import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Links {
  name: string;
  href: string;
}

// --- NEW: Data for the Locations dropdown, structured in columns as per the screenshot ---
const locationColumns: { id: number; links: Links[] }[] = [
  {
    id: 1,
    links: [
      { name: 'Alford', href: '/locations/alford' },
      { name: 'Barton-upon-Humber', href: '/locations/barton-upon-humber' },
      { name: 'Boston', href: '/locations/boston' },
      { name: 'Bourne', href: '/locations/bourne' },
      { name: 'Brigg', href: '/locations/brigg' },
      { name: 'Broughton', href: '/locations/broughton' },
    ],
  },
  {
    id: 2,
    links: [
      { name: 'Caistor', href: '/locations/caistor' },
      { name: 'Crowland', href: '/locations/crowland' },
      { name: 'Gainsborough', href: '/locations/gainsborough' },
      { name: 'Grantham', href: '/locations/grantham' },
      { name: 'Grimsby', href: '/locations/grimsby' },
      { name: 'Horncastle', href: '/locations/horncastle' },
    ],
  },
  {
    id: 3,
    links: [
      { name: 'Immingham', href: '/locations/immingham' },
      { name: 'Louth', href: '/locations/louth' },
      { name: 'Mablethorpe', href: '/locations/mablethorpe' },
      { name: 'Market Deeping', href: '/locations/market-deeping' },
      { name: 'Market Rasen', href: '/locations/market-rasen' },
      { name: 'North Hykeham', href: '/locations/north-hykeham' },
    ],
  },
  {
    id: 4,
    links: [
      { name: 'Scunthorpe', href: '/locations/scunthorpe' },
      { name: 'Skegness', href: '/locations/skegness' },
      { name: 'Sleaford', href: '/locations/sleaford' },
      { name: 'Spalding', href: '/locations/spalding' },
      { name: 'Stamford', href: '/locations/stamford' },
      { name: 'Wainfleet All Saints', href: '/locations/wainfleet-all-saints' },
    ],
  },
  {
    id: 5,
    links: [
      { name: 'Waltham', href: '/locations/waltham' },
      { name: 'Winterton', href: '/locations/winterton' },
      { name: 'Woodhall Spa', href: '/locations/woodhall-spa' },
    ],
  },
];


const servicesLinks: Links[] = [
  { name: 'Regular cleaning', href: '/regular-cleaning' },
  { name: 'Deep cleaning', href: '/services-deep-cleaning' },
  { name: 'Office cleaning', href: '/services-office-cleaning' },
  { name: 'End of Tenancy cleaning', href: '/services/end-tenancy-cleaning' },
  { name: 'Carpet cleaning', href: '/services/carpet-cleaning' },
  { name: 'Same Day cleaning', href: '/services/same-day-cleaning' },
  { name: 'Kitchen Deep Cleaning', href: '/services/kitchen-deep-cleaning' },
  { name: 'Rug Cleaning', href: '/services/rug-cleaning' },
  { name: 'Move in cleaning', href: '/services/move-in-cleaning' },
  { name: 'Bathroom cleaning', href: '/services/bathroom-cleaning' },
  { name: 'Mattress cleaning', href: '/services/mattress-cleaning' },
  { name: 'Spring cleaning', href: '/services/spring-cleaning' },
];

const pricingLinks: Links[] = [
  { name: 'House cleaning', href: '/pricing-house-cleaning' },
  { name: 'Office cleaning', href: '/pricing-office-cleaning' },
  { name: 'Deep cleaning', href: '/pricing-deep-cleaning' },
  { name: 'End of Tenancy cleaning', href: '/pricing-tenancy-cleaning' },
  { name: 'Carpet cleaning', href: '/priicing-carpet-cleaning' },
  { name: 'Upholstery cleaning', href: '/pricing-upholstery-cleaning' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState<boolean>(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState<boolean>(false);
  // --- NEW: State for the Locations dropdown ---
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState<boolean>(false);

  const servicesDropdownRef = useRef<HTMLLIElement>(null);
  const pricingDropdownRef = useRef<HTMLLIElement>(null);
  // --- NEW: Ref for the Locations dropdown ---
  const locationsDropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        if (isMobileMenuOpen) { setIsMobileMenuOpen(false); }
        if (isServicesDropdownOpen) { setIsServicesDropdownOpen(false); }
        if (isPricingDropdownOpen) { setIsPricingDropdownOpen(false); }
        // --- NEW: Close locations dropdown on resize ---
        if (isLocationsDropdownOpen) { setIsLocationsDropdownOpen(false); }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, isServicesDropdownOpen, isPricingDropdownOpen, isLocationsDropdownOpen]); // --- NEW: Added dependency

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
          setIsServicesDropdownOpen(false);
        }
        if (pricingDropdownRef.current && !pricingDropdownRef.current.contains(event.target as Node)) {
          setIsPricingDropdownOpen(false);
        }
        // --- NEW: Handle click outside for Locations dropdown on desktop ---
        if (locationsDropdownRef.current && !locationsDropdownRef.current.contains(event.target as Node)) {
          setIsLocationsDropdownOpen(false);
        }
      }

      if (!isDesktop && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
        setIsPricingDropdownOpen(false);
        // --- NEW: Close locations dropdown with mobile menu ---
        setIsLocationsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isServicesDropdownOpen, isPricingDropdownOpen, isMobileMenuOpen, isLocationsDropdownOpen]); // --- NEW: Added dependency

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsServicesDropdownOpen(false);
    setIsPricingDropdownOpen(false);
    // --- NEW: Close locations dropdown with mobile menu toggle ---
    setIsLocationsDropdownOpen(false);
  };
  
  // --- NEW: Handler for Locations dropdown click ---
  const handleLocationsDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024 || !isLocationsDropdownOpen) {
        e.preventDefault();
        setIsLocationsDropdownOpen(!isLocationsDropdownOpen);
        // Close other dropdowns
        if (isServicesDropdownOpen) setIsServicesDropdownOpen(false);
        if (isPricingDropdownOpen) setIsPricingDropdownOpen(false);
    }
  };

  const handleServicesDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024 || !isServicesDropdownOpen) {
      e.preventDefault();
      setIsServicesDropdownOpen(!isServicesDropdownOpen);
      if (isPricingDropdownOpen) setIsPricingDropdownOpen(false);
      // --- NEW: Close locations dropdown when services is clicked ---
      if (isLocationsDropdownOpen) setIsLocationsDropdownOpen(false);
    }
  };

  const handlePricingDropdownClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024 || !isPricingDropdownOpen) {
      e.preventDefault();
      setIsPricingDropdownOpen(!isPricingDropdownOpen);
      if (isServicesDropdownOpen) setIsServicesDropdownOpen(false);
      // --- NEW: Close locations dropdown when pricing is clicked ---
      if (isLocationsDropdownOpen) setIsLocationsDropdownOpen(false);
    }
  };

  const handleSignInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      // User is logged in, redirect to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, redirect to login page
      navigate('/login');
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
            @keyframes draw-erase-underline { 0% { stroke-dashoffset: 80; } 3.33% { stroke-dashoffset: 0; } 93.33% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 80; } }
            .logo-underline-animate { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw-erase-underline 15s linear infinite; }
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
        <ul className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            
          {/* --- NEW: Locations Dropdown for Desktop --- */}
          <li
            className="relative group"
            onMouseEnter={() => setIsLocationsDropdownOpen(true)}
            onMouseLeave={() => setIsLocationsDropdownOpen(false)}
            ref={locationsDropdownRef}
          >
            <a
              href="#"
              onClick={handleLocationsDropdownClick}
              className={`flex text-black text-[16px] font-semibold items-center transition duration-300 ease-in-out ${isLocationsDropdownOpen ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'hover:text-brand-secondary'}`}
            >
              Locations
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isLocationsDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
            {/* Dropdown Menu Content (Desktop) */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-4 bg-white shadow-lg rounded-lg p-6
                transition-all duration-300 ease-in-out opacity-0 invisible translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              style={{ width: 'max-content' }}
            >
              <div className="grid grid-cols-5 gap-x-8 gap-y-2">
                {locationColumns.map((column) => (
                  <div key={column.id} className="flex flex-col space-y-2">
                    {column.links.map((link, index) => (
                      <a key={index} href={link.href} className="block text-gray-700 hover:text-brand-primary whitespace-nowrap p-1 rounded-md transition duration-200">
                        {link.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                  
              </div>
            </div>
          </li>
            
          {/* Our Services Dropdown for Desktop */}
          <li
            className="relative group"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
            ref={servicesDropdownRef}
          >
            <a
              href="#"
              onClick={handleServicesDropdownClick}
              className={`flex text-black text-[16px] font-semibold items-center transition duration-300 ease-in-out ${isServicesDropdownOpen ? 'text-brand-primary border-b-2 border-brand-primary pb-1' : 'hover:text-brand-secondary'}`}
            >
              Our Services
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
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

          {/* Pricing Dropdown for Desktop */}
          {/* (Code for Pricing is unchanged) */}
          <li
            className="relative group"
            onMouseEnter={() => setIsPricingDropdownOpen(true)}
            onMouseLeave={() => setIsPricingDropdownOpen(false)}
            ref={pricingDropdownRef}
          >
            <a
              href="#"
              onClick={handlePricingDropdownClick}
              className={`flex text-black text-[16px] font-semibold items-center transition duration-300 ease-in-out ${isPricingDropdownOpen ? 'border-b-2 border-brand-primary pb-1 text-brand-primary' : 'hover:text-brand-text'}`}
            >
              Pricing
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${isPricingDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`} />
            </a>
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
          <li><a href="/reclean-guarantee" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Reclean Guarantee</a></li>
          <li><a href="/help" className="text-gray-700 text-[16px] font-semibold hover:text-brand-primary transition duration-300 ease-in-out">Help</a></li>
          <li>
            <a 
              href="#" 
              onClick={handleSignInClick}
              className="px-5 py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out cursor-pointer"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out lg:hidden z-40
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-start pt-20 px-6 space-y-4 h-full overflow-y-auto">
          
          {/* --- NEW: Mobile Locations Dropdown --- */}
          <li className="w-full">
            <a
              onClick={handleLocationsDropdownClick}
              className="flex items-center justify-between text-gray-800 text-lg py-2 hover:bg-gray-100 w-full rounded-md transition duration-200 cursor-pointer"
            >
              Locations
              <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-300 ${isLocationsDropdownOpen ? 'rotate-180' : ''}`} />
            </a>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isLocationsDropdownOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
              <ul className="pl-4 pt-2 pb-4 space-y-2 bg-gray-50 rounded-md mt-2">
                {locationColumns.flatMap(col => col.links).map((link, index) => (
                  <li key={index}>
                    <a onClick={toggleMobileMenu} href={link.href} className="block text-gray-700 text-base py-1 hover:bg-gray-100 w-full rounded-md transition duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
                 <li>
                    {/* <a onClick={toggleMobileMenu} href="/locations/london" className="block text-green-600 font-semibold text-base py-1 hover:bg-gray-100 w-full rounded-md transition duration-200">
                      See more locations in London
                    </a> */}
                 </li>
              </ul>
            </div>
          </li>
          
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

          {/* Mobile Pricing Dropdown */}
          <li className="w-full">
            <a
              onClick={handlePricingDropdownClick}
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
          <li className="w-full pt-4">
            <a 
              onClick={(e) => {
                toggleMobileMenu();
                handleSignInClick(e);
              }} 
              href="#" 
              className="block w-full text-center px-5 py-3 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition duration-300 ease-in-out text-lg cursor-pointer"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;