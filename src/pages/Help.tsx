

import React, {useState} from "react";
import { Instagram, Facebook, Pin } from 'lucide-react';
import { Link } from "react-router-dom";

interface CardData {
    id: string;
    imageSrc: string;
    altText: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
  }
  

export default function Help() {
    const cardsData: CardData[] = [
        {
          id: 'clients-faq',
          imageSrc: 'https://www.emop.co.uk/help/wp-content/themes/emop_faq/static/images/general/1_customers.svg', // Placeholder for Clients illustration
          altText: 'Illustration of clients',
          title: 'FAQ for Clients',
          description: "You're a client and have a trouble ordering a cleaning?",
          linkText: 'Get answers',
          linkHref: '/help/Clients', // Link to client FAQ page
        },
        {
          id: 'emopers-faq',
          imageSrc: 'https://www.emop.co.uk/help/wp-content/themes/emop_faq/static/images/general/2_cleaners.svg', // Placeholder for eMopers illustration
          altText: 'Illustration of eMopers',
          title: 'FAQ for eMopers',
          description: "You're a cleaner and want to be sure that you're following the procedure",
          linkText: 'Get answers',
          linkHref: '/help/Emoppers', 
        },
      ];
    return(
        <div className="min-h-screen bg-[#f5f9fc] overflow-x-hidden w-full">
            <nav className="bg-white p-8 flex items-center justify-center w-full">

                <div className="w-full flex items-center justify-center gap-3 md:gap-[24px] lg:gap-[5rem]">
                    <div className=" w-[4rem] md:w-[5rem] lg:w-[7rem]">
                    <a href="/" className="flex items-center">
          <h1 className='text-brand-secondary  text-[40px]'>
          De Gemini Services LTD
          </h1>
        </a>
                    </div>
                  <Link to='/home/registercleaner'>
                    <button className="border border-brand-secondary p-4 transition text-brand-secondary hover:text-white hover:bg-brand-secondary duration-300">
                        <p className="text-lg">
                            Become a cleaner
                        </p>
                    </button>
                  </Link>
                </div>

            </nav>
            <div className="font-sans antialiased bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-secondary mb-12 text-center uppercse">
        Help centre
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 justify-items-center">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center text-center max-w-sm w-full
                         transform transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Illustration Image */}
              <div className="transform transition-transform duration-300 ease-in-out hover:-translate-y-12 flex flex-col items-center justify-center">
              <div className="w-40 h-32 sm:w-48 sm:h-40 flex items-center justify-center mb-6">
                <img
                  src={card.imageSrc}
                  alt={card.altText}
                  className="max-w-full max-h-full object-contain"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200x150/e0e0e0/555555?text=Image+Error";
                    target.alt = "Fallback image: Illustration not found.";
                  }}
                />
              </div>

              {/* Card Content */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-6 flex-grow">{card.description}</p>
              </div>

              {/* Button that appears on hover */}
              <a
                href={card.linkHref}
                className="absolute bottom-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           bg-brand-secondary hover:bg-brand-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md
                           transition-all duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0
                           text-base whitespace-nowrap"
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center text-gray-700 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Need help? <a href="mailto:info@emop.co.uk" className="text-purple-700 font-semibold hover:underline">Click here to email us</a> — For urgent issues, we aim to respond within minutes. Apart from that please navigate yourself through our FAQ pages.
        </div>
      </div>

      {/* Optional: More content to show page structure */}
      
    </div>

    {/* Footer Section */}
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
          <h1 className='text-brand-secondary  text-[40px]'>
          De Gemini Services LTD
          </h1>
        </a>
            </div>

            {/* Column 2: FOR CUSTOMERS */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">FOR CUSTOMERS</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline text-gray-700">Booking T&C</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Cancellation Policy</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Cookie Policy</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Pricing</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Blog</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Sitemap</a></li>
              </ul>
            </div>

            {/* Column 3: FOR CLEANERS & WHO WE ARE */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">FOR CLEANERS</h3>
              <ul className="space-y-2 mb-8">
                <li><a href="/home/registercleaner" className="hover:underline text-gray-700">Become a cleaner</a></li>
              </ul>
              <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">WHO WE ARE</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline text-gray-700">About Us</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 4: EMOP SERVICE */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">EMOP SERVICE</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline text-gray-700">Domestic cleaning</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Regular cleaning</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Deep cleaning</a></li>
                <li><a href="#" className="hover:underline text-gray-700">Office cleaning</a></li>
              </ul>
            </div>

            {/* Column 5: SUBSCRIBE TO OUR NEWSLETTER & Social Media */}
            <div className="lg:col-span-1 flex flex-col items-center md:items-start lg:items-stretch">
              <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">SUBSCRIBE TO OUR NEWSLETTER</h3>
              <div className="w-full mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                />
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                SUBSCRIBE NOW
              </button>

              <div className="mt-8">
                <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">SOCIAL MEDIA</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                    {/* Using Pin icon as a placeholder for Pinterest, as Pinterest icon is not directly available in lucide-react */}
                    <Pin className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cleaner Locations Section (Full Width) */}
          <div className="mt-12 w-full border-t border-gray-200 pt-8 text-center">
            <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">CLEANER LOCATIONS</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="mr-2">East London</span> <span className="mr-2">North London</span> <span className="mr-2">South London</span> |{' '}
              <span className="mr-2">West London</span> | <span className="mr-2">Balham</span> <span className="mr-2">Islington</span> <span className="mr-2">Watford</span> <span className="mr-2">Bromley</span> |{' '}
              <span className="mr-2">Tooting</span> <span className="mr-2">Wimbledon</span> | <span className="mr-2">Kingston</span> |{' '}
              <span className="mr-2">Ealing</span> <span className="mr-2">Harrow</span> <span className="mr-2">Surbiton</span> |{' '}
              <span className="mr-2">Angel</span> <span className="mr-2">Croydon</span> <span className="mr-2">Clapham</span> |{' '}
              <span className="mr-2">Greenwich</span> | <span className="mr-2">Richmond</span> <span className="mr-2">Southwark</span>
            </p>
          </div>

          {/* Bottom Copyright and Address */}
          <div className="mt-8 w-full border-t border-gray-200 pt-8 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="order-2 md:order-1">www.emop.co.uk</p>
            <p className="order-1 md:order-2">Copyright © eMop 2024</p>
            <p className="order-3 md:order-3">Registered office address: Suite 5 3rd Floor, Sovereign House 1 Albert Place, London, England, N1 0BQ</p>
          </div>
        </div>
      </footer>

        </div>
    )
};
