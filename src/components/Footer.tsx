import React from 'react';
import { Instagram, Facebook, Phone, MessageCircle } from 'lucide-react';
import { DropdownHeader } from './DropdownHeader';
import { AiFillTikTok } from "react-icons/ai";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../api/visitors';
import LocationLinks from './LocationLinks';

export const Footer: React.FC = () => {
 const location = useLocation();
 useEffect(() => {
 trackVisitor(location.pathname);
 }, [location]);
 return (
 <footer className="relative bg-transparent text-gray-600 py-12 px-6 sm:px-16 overflow-hidden">
 <div className="w- top-0 absolute ">
  <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 sm:h-32 md:h-40 lg:h-48" style={{ opacity: 0.08 }}>
  <path fill="#42337E" d="M0,256L60,229.3C120,203,240,149,360,154.7C480,160,600,224,720,229.3C840,235,960,181,1080,176C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
 </svg>
 </div>
 {/* Subtle SVG Background only behind headline */}
 <div className='mb-12'>
 <h1 className="  text-brand-primary  font-extrabold text-3xl sm:text-6xl lg:text-7xl  mb-6">
  Clean, <span className='editorial'>Fresh, </span> Gemini.
 </h1>
 <p className="text-brand-primary text-xl sm:text-xl font-bold tracking-wide mb-2">Your Instant Cleaning Service In England.</p>
 </div>

 <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-12 text-base relative z-10">
        <div className="lg:col-span-1 hidden lg:block">
          <h3 className="font-bold text-lg mb-4 text-brand-primary">CLEANER LOCATIONS</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <LocationLinks variant='list'/>
          </div>
        </div>


{/* Locations (Mobile - Dropdown) */}
<div className="lg:col-span-1 lg:hidden">
<DropdownHeader title="CLEANER LOCATIONS" dropdownName="cleanerLocations">
<LocationLinks variant='list'/>
</DropdownHeader>
</div>

{/* For Customers */}
<div className="lg:col-span-1">
<DropdownHeader title="FOR CUSTOMERS" dropdownName="forCustomers">
  <ul className="space-y-2 pb-4 lg:pb-0">
 <li><a href="/pricing-house-cleaning" className="hover:underline">Pricing</a></li>
 <li><a href="/blog" className="hover:underline">Blog</a></li>
 <li><a href="/booking-policy" className="hover:underline">Booking Policy</a></li>
 <li><a href="/what-cleaning" className="hover:underline">What's included</a></li>
 <li><a href="/cancellation-policy" className="hover:underline">Cancellation Policy</a></li>
 <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
 <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
 <li><a href="/cookie-policy" className="hover:underline">Cookies Policy</a></li>
 <li><a href="/reclean-guarantee" className="hover:underline">Reclaean Guarante</a></li>
  </ul>
</DropdownHeader>
</div>

{/* De-gemini Service */}
<div className="lg:col-span-1">
<DropdownHeader title="De-gemini SERVICE" dropdownName="De-geminiService">
  <ul className="space-y-2 pb-4 lg:pb-0">
 <li><a href="/regular-cleaning" className="hover:underline">Regular cleaning</a></li>
 <li><a href="/services-office-cleaning" className="hover:underline">Office cleaning</a></li>
 <li><a href="/services/end-tenancy-cleaning" className="hover:underline">End of Tenancy cleaning</a></li>
 <li><a href="/services/carpet-cleaning" className="hover:underline">Carpet cleaning</a></li>
 {/* <li><a href="/services--cleaning" className="hover:underline">Upholstery cleaning</a></li> */}
 <li><a href="/services/same-day-cleaning" className="hover:underline">Same Day cleaning</a></li>
 <li><a href="/services/kitchen-deep-cleaning" className="hover:underline">Kitchen Deep Cleaning</a></li>
 <li><a href="/services/rug-cleaning" className="hover:underline">Rug Cleaning</a></li>
 <li><a href="/services/move-in-cleaning" className="hover:underline">Move in cleaning</a></li>
 <li><a href="/services/bathroom-cleaning" className="hover:underline">Bathroom cleaning</a></li>
 <li><a href="/services/mattress-cleaning" className="hover:underline">Mattress cleaning</a></li>
 <li><a href="/services/spring-cleaning" className="hover:underline">Spring cleaning</a></li>
  </ul>
</DropdownHeader>
</div>

{/* Who We Are */}
 <div className="lg:col-span-1">
 <DropdownHeader title="WHO WE ARE" dropdownName="whoWeAre">
  <ul className="space-y-2 pb-4 lg:pb-0">
 <li><a href="/about" target='_blank' className="hover:underline">About us</a></li>
 <li><a href="/contact" className="hover:underline">Contact us</a></li>
<li><a href="/reviews" className="hover:underline">Reviews</a></li>
  </ul>
</DropdownHeader>
</div>

{/* Social Media - Modern, Centered on Mobile */}
<div className="lg:col-span-1 flex flex-col items-center lg:items-end justify-end mt-8 lg:mt-0">
<h3 className="font-bold text-lg mb-2 text-brand-primary tracking-wide">SOCIAL MEDIA</h3>
<div className="flex space-x-4 mb-2">
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
      <div className="max-w-7xl mx-auto mt-8 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center relative z-10">
        <div className="flex gap-3 mb-2 sm:mb-0 flex-col md:flex-row lg:flex-row">
          <span><a href='https://degeminiservices.co.uk'>https://degeminiservices.co.uk</a></span>
          <span>Copyright © De-gemini 2025</span>
          <a href='mailto:Support@Degeminiservices.co.uk'>
          <span>Support@Degeminiservices.co.uk</span>
          </a>
          <a href="tel:+447399487915">
          <span>Phone: 07399 487 915</span>
          </a>
        </div>
        <div className="text-center sm:text-right">
          {/* Registered office address:<br/>
          Suite 5 3rd Floor, Sovereign House, 1 Albert<br/>
          Place, London, England, N31QB */}
        </div>
      </div>

 {/* Floating WhatsApp Button */}
 <a 
   href="https://wa.me/+447399487915?text=Hello%2C%20I%20am%20chatting%20from%20your%20website"
   target="_blank"
   rel="noopener noreferrer"
   className="fixed bottom-24 right-6 md:bottom-28 md:right-10 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 z-50"
   aria-label="WhatsApp us"
 >
   <MessageCircle className="h-7 w-7" />
 </a>

 {/* Floating Call Button */}
 <a 
 href="tel:07867388142"
 className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-brand-primary hover:bg-brand-primary text-brand-secondary rounded-full p-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-110 z-50"
 aria-label="Call us"
 >
 <Phone className="h-7 w-7" />
 </a>
 </footer>
 );
};