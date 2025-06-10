import React from 'react';
import { Instagram, Facebook, Phone } from 'lucide-react'; // Importing icons for social media and phone

export const Footer: React.FC = () => {
  return (
    <footer className="relative text-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 text-sm">

        {/* Column 1: Cleaner Locations */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">CLEANER LOCATIONS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Edinburgh Birmingham</a></li>
            <li><a href="#" className="hover:underline">Manchester St Albans</a></li>
            <li><a href="#" className="hover:underline">Glasgow Leeds Bradford</a></li>
            <li><a href="#" className="hover:underline">Liverpool Central London</a></li>
            <li><a href="#" className="hover:underline">North London South London</a></li>
            <li><a href="#" className="hover:underline">West London East London</a></li>
            <li><a href="#" className="hover:underline">Watford Greenwich</a></li>
            <li><a href="#" className="hover:underline">Croydon</a></li>
            <li><a href="#" className="hover:underline">Kensington & Chelsea</a></li>
            <li><a href="#" className="hover:underline">Bromley Islington</a></li>
            <li><a href="#" className="hover:underline">Wimbledon Barking</a></li>
            <li><a href="#" className="hover:underline">Kingston Fulham Richmond</a></li>
            <li><a href="#" className="hover:underline">Clapham Romford Ealing</a></li>
            <li><a href="#" className="hover:underline">Walthamstow Battersea</a></li>
            <li><a href="#" className="hover:underline">Canary Wharf</a></li>
          </ul>
        </div>

        {/* Column 2: For Customers */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">FOR CUSTOMERS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">What's included</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Booking Policy</a></li>
            <li><a href="#" className="hover:underline">Cancellation Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Cookies Policy</a></li>
            <li><a href="#" className="hover:underline">Reclean Guarantee</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
          </ul>
          {/* Sub-section: For Cleaners */}
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">FOR CLEANERS</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Become an eMopper</a></li>
          </ul>
        </div>

        {/* Column 3: eMop Service */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">EMOP SERVICE</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Regular cleaning</a></li>
            <li><a href="#" className="hover:underline">Deep cleaning</a></li>
            <li><a href="#" className="hover:underline">Office cleaning</a></li>
            <li><a href="#" className="hover:underline">End of Tenancy cleaning</a></li>
            <li><a href="#" className="hover:underline">Carpet cleaning</a></li>
            <li><a href="#" className="hover:underline">Upholstery cleaning</a></li>
            <li><a href="#" className="hover:underline">Same Day cleaning</a></li>
            <li><a href="#" className="hover:underline">Kitchen Deep Cleaning</a></li>
            <li><a href="#" className="hover:underline">Rug Cleaning</a></li>
            <li><a href="#" className="hover:underline">Move in cleaning</a></li>
            <li><a href="#" className="hover:underline">Bathroom cleaning</a></li>
            <li><a href="#" className="hover:underline">Mattress cleaning</a></li>
            <li><a href="#" className="hover:underline">Spring cleaning</a></li>
          </ul>
          {/* Sub-section: Who We Are */}
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">WHO WE ARE</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Contact us</a></li>
          </ul>
        </div>

        {/* Column 4 (combined from screenshot): Logo, App Downloads, Social Media */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start lg:items-end text-center md:text-left lg:text-right">
          {/* Logo */}
          <img src="https://www.emop.co.uk/static/images/152x90emop_logox2.png" alt="eMop Logo" className="w-24 mb-4" />
          
          <p className="font-bold text-lg mb-4 text-brand-secondary">CLEANING AVAILABLE 24/7</p>

          {/* App Store Badges */}
          <div className="flex flex-col space-y-3 mb-6">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" className="h-10 md:h-12 w-auto" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-10 md:h-12 w-auto" />
            </a>
          </div>

          {/* Social Media */}
          <h3 className="font-bold text-lg mb-4 text-brand-secondary">SOCIAL MEDIA</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-7 w-7 text-brand-secondary hover:text-white transition duration-300" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-7 w-7 text-brand-secondary hover:text-white transition duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Call Button */}
      <a 
        href="tel:+1234567890" // Replace with actual phone number
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 z-50"
        aria-label="Call us"
      >
        <Phone className="h-7 w-7" />
      </a>
    </footer>
  );
};