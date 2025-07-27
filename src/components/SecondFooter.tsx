

import { Instagram, Facebook, Pin } from 'lucide-react';
import { AiFillTikTok } from 'react-icons/ai';
import { Link } from "react-router-dom";
import LocationLinks from './LocationLinks';
export default function SecondFooter () {
    const myYear = new Date().getFullYear()

return(
<footer className="relative text-gray-800 py-12 px-4 sm:px-6 lg:px-8"
style={{
    backgroundImage: `url('https://www.emop.co.uk/static/images/Combined_Shape.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}}
>
    <div className="max-w-7xl mx-auto flex flex-col items-center lg:items-stretch">
      {/* Top Footer Section: Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 w-full text-center md:text-left">

        {/* Column 1: Logo (Left aligned on desktop) */}
        <div className="lg:col-span-1 flex justify-center md:justify-start">
        <a href="/" className="flex items-center">
      <h1 className='text-brand-primary  text-[40px]'>
      De Gemini Services LTD
      </h1>
    </a>
        </div>

        {/* Column 2: FOR CUSTOMERS */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">FOR CUSTOMERS</h3>
          <ul className="space-y-2">
            <li><a href="/booking-policy" className="hover:underline text-gray-700">Booking T&C</a></li>
            <li><a href="/cancellation-policy" className="hover:underline text-gray-700">Cancellation Policy</a></li>
            <li><a href="/terms-and-conditions" className="hover:underline text-gray-700">Terms & Conditions</a></li>
            <li><a href="/what-cleaning" className="hover:underline text-gray-700">What's included</a></li>
            <li><a href="/privacy-policy" className="hover:underline text-gray-700">Privacy Policy</a></li>
            <li><a href="/cookie-policy" className="hover:underline text-gray-700">Cookie Policy</a></li>
            <li><a href="/pricing-house-cleaning" className="hover:underline text-gray-700">Pricing</a></li>
            <li><a href="/blog" className="hover:underline text-gray-700">Blog</a></li>
          </ul>
        </div>

        {/* Column 3: FOR CLEANERS & WHO WE ARE */}
        <div className="lg:col-span-1">
          
          <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">WHO WE ARE</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline text-gray-700">About Us</a></li>
            <li><a href="/contact" className="hover:underline text-gray-700">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: EMOP SERVICE */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">Degemini SERVICE</h3>
          <ul className="space-y-2">
            <li><a href="/services/end-tenancy-cleaning" className="hover:underline text-gray-700">Domestic cleaning</a></li>
            <li><a href="/regular-cleaning" className="hover:underline text-gray-700">Regular cleaning</a></li>
            <li><a href="/services-office-cleaning" className="hover:underline text-gray-700">Office cleaning</a></li>
          </ul>
        </div>

        {/* Column 5: SUBSCRIBE TO OUR NEWSLETTER & Social Media */}
        <div className="lg:col-span-1 flex flex-col items-center md:items-start lg:items-stretch">
          <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">SUBSCRIBE TO OUR NEWSLETTER</h3>
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <button className="w-full bg-brand-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
            SUBSCRIBE NOW
          </button>

          <div className="mt-8">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">SOCIAL MEDIA</h3>
            <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.instagram.com/de_gemini_services?igsh=dGFqbmFrZTMxcGI1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
 <Instagram className="h-7 w-7 text-brand-primary hover:text-blue-500 transition duration-300" />
  </a>
  <a href="https://www.facebook.com/share/1Axqo294Wx/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
 <Facebook className="h-7 w-7 text-brand-primary hover:text-blue-500 transition duration-300" />
  </a>
  <a href="https://www.tiktok.com/@de.gemini.services?_t=ZS-8xiqay0oCet&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
 <AiFillTikTok className="h-7 w-7 text-brand-primary hover:text-blue-500 transition duration-300" />
  </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaner Locations Section (Full Width) */}
      <div className="mt-12 w-full border-t border-gray-200 pt-8 text-center">
        <h3 className="font-bold text-base sm:text-lg mb-4 text-brand-primary uppercase">CLEANER LOCATIONS</h3>
        <LocationLinks variant='inline'/>
      </div>

      {/* Bottom Copyright and Address */}
      <div className="mt-8 w-full border-t border-gray-200 pt-8 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        <p className="order-2 md:order-1"></p>
      <p className="order-1 md:order-2">Copyright © Degemini {myYear}</p>
        {/* <p className="order-3 md:order-3">Registered office address: Suite 5 3rd Floor, Sovereign House 1 Albert Place, London, England, N1 0BQ</p> */}
      </div>
    </div>
  </footer>
    
)
}