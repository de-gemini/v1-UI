import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface ServiceLink {
  name: string;
  href: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsServicesDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth >= 768 &&
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsServicesDropdownOpen(false);
  };

  const handleServicesDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsServicesDropdownOpen((prev) => !prev);
    }
  };

  const servicesLinks: ServiceLink[] = [
    { name: "Regular cleaning", href: "#" },
    { name: "Deep cleaning", href: "#" },
    { name: "Office cleaning", href: "#" },
    { name: "End of Tenancy cleaning", href: "#" },
    { name: "Carpet cleaning", href: "#" },
    { name: "Upholstery cleaning", href: "#" },
    { name: "Same Day cleaning", href: "#" },
    { name: "Kitchen Deep Cleaning", href: "#" },
    { name: "Rug Cleaning", href: "#" },
    { name: "Move in cleaning", href: "#" },
    { name: "Bathroom cleaning", href: "#" },
    { name: "Mattress cleaning", href: "#" },
    { name: "Spring cleaning", href: "#" },
  ];

  return (
    <header className="w-full bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <a href="#" className="flex items-center">
          <img
            src="https://www.emop.co.uk/static/images/152x90emop_logox2.png"
            alt="eMop Logo"
            className="w-20 sm:w-24 md:w-[5rem] rounded-md max-w-full h-auto"
          />
        </a>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md p-2 z-50"
          aria-label="Toggle navigation">
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 rotate-90" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Locations
            </a>
          </li>

          <li
            className="relative group"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
            ref={dropdownRef}>
            <a
              href="#"
              onClick={handleServicesDropdownClick}
              className="flex items-center text-purple-700 font-semibold border-b-2 border-purple-700 pb-1">
              Our Services
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  isServicesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            <div
              className={`absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 min-w-[400px] grid grid-cols-2 gap-4
              transition-all duration-300 ${
                isServicesDropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-2"
              }`}>
              {servicesLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-purple-700 p-1 rounded-md">
                  {link.name}
                </a>
              ))}
            </div>
          </li>

          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Gifts
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Blog
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Help
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Reclean guarantee
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-semibold hover:text-purple-700">
              Become a cleaner
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-5 py-2 border border-purple-700 text-purple-700 rounded-md hover:bg-purple-700 hover:text-white">
              Sign In
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 md:hidden z-40
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <ul className="flex flex-col items-start pt-20 px-6 space-y-4 h-full overflow-y-auto">
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Locations
            </a>
          </li>

          <li className="w-full">
            <a
              onClick={handleServicesDropdownClick}
              className="flex justify-between items-center text-lg text-gray-800 py-2 w-full hover:bg-gray-100 cursor-pointer">
              Our Services
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isServicesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </a>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isServicesDropdownOpen ? "max-h-screen" : "max-h-0"
              }`}>
              <ul className="pl-4 pt-2 pb-4 space-y-2 bg-gray-50 rounded-md mt-2">
                {servicesLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      onClick={toggleMobileMenu}
                      href={link.href}
                      className="block text-base text-gray-700 py-1 hover:bg-gray-100 w-full">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Pricing
            </a>
          </li>
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Gifts
            </a>
          </li>
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Blog
            </a>
          </li>
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Help
            </a>
          </li>
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Reclean guarantee
            </a>
          </li>
          <li>
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="text-lg text-gray-800 py-2 w-full hover:bg-gray-100">
              Become a cleaner
            </a>
          </li>
          <li className="w-full pt-4">
            <a
              onClick={toggleMobileMenu}
              href="#"
              className="block w-full text-center px-5 py-3 border border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white text-lg">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
