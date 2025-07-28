


import React from 'react';
import { useParams } from 'react-router-dom';
import ServicePageTemplate from './services/ServicePageTemplate';
import { defaultFAQ } from '../data/faqData';
import example from '../assets/images/Services/SittingRoom/3.avif'


const formatLocationName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const LocationPage = () => {

  const { locationName } = useParams<{ locationName: string }>();

  if (!locationName) {
    return <div>Location not found.</div>;
  }


  const pageTitle = formatLocationName(locationName);

  const dynamicPageData = {
    banner: {
      title: `Your Trusted Cleaners in ${pageTitle}`,
    },
    sections: [
        { type: "faq" },
    ],

    wowSection1: {
      heading: "Experience the Sparkles our cleaning brings.",
      subheading: "Where Freshness Begins",
      text: "Step into a home that feels brand new. Our deep cleaning service eliminates limescale, soap scum, and hidden germs, making your home a true sanctuary—spotless, hygienic, and relaxing.",
      image: example,
      imageAlt: "Sparkling modern home",
      list: [
        "🛁 Sanitized tubs, showers, and sinks",
        "✨ Gleaming tiles and mirrors",
        "🚽 Germ-free toilets and fixtures",
      ],
      gradientFrom: "blue-50",
      gradientTo: "teal-50",
      gradientVia: "white",
      textColor: "text-blue-700",
      highlightGradient: "from-blue-400 to-teal-400",
    },
    wowSection2: {
      heading: "Experience the Sparkles our cleaning brings.",
      subheading: "And Show Off",
      text: "Imagine a home that always feels fresh and inviting. We don’t just clean—we restore comfort and peace of mind, so you can relax, recharge and spend time with loved ones.",
      image: example,
      imageAlt: "Family enjoying clean bathroom",
      list: [
        "🧼 Perfect for families and guests",
        "🌱 Eco-friendly products for safety",
        "🕒 Fast, flexible, and always reliable",
      ],
      gradientFrom: "teal-50",
      gradientTo: "blue-50",
      gradientVia: "white",
      textColor: "text-teal-700",
      highlightGradient: "from-teal-400 to-blue-400",
    },
    
  };


  return <ServicePageTemplate pageData={dynamicPageData} faqData={defaultFAQ} />;
};

export default LocationPage;