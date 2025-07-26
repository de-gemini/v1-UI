

import React, {useState} from "react";
import { Instagram, Facebook, Pin } from 'lucide-react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SecondFooter from "../components/SecondFooter";

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
          imageSrc: 'https://www.emop.co.uk/help/wp-content/themes/emop_faq/static/images/general/2_cleaners.svg', // Placeholder for De-Geminiers illustration
          altText: 'Illustration of Degemini',
          title: 'FAQ for Degemini',
          description: "You're a cleaner and want to be sure that you're following the procedure",
          linkText: 'Get answers',
          linkHref: '/help/Emoppers', 
        },
      ];
    return(
        <div className="min-h-screen bg-[#f5f9fc] overflow-x-hidden w-full">
            <Navbar/>
            <div className="font-sans antialiased bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary mb-12 text-center uppercse">
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
                           bg-brand-primary hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md
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
          Need help? <a href="mailto:Support@Degeminiservices.co.uk" className="text-brand-primary font-semibold hover:underline">Click here to email us</a> — For urgent issues, we aim to respond within minutes. Apart from that please navigate yourself through our FAQ pages.
        </div>
      </div>

      {/* Optional: More content to show page structure */}
    </div>
      <SecondFooter/>

    

        </div>
    )
};
