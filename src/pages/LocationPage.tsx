


// src/pages/LocationPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ServicePageTemplate from './services/ServicePageTemplate';


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
        { type: "quote", heading: "Get an Instant Quote", /* ...other props */ },
        { type: "faq" },
    ],

    wowSection1: { /* ...your default wow data... */ },
    wowSection2: { /* ...your default wow data... */ },
  };


  return <ServicePageTemplate pageData={dynamicPageData} />;
};

export default LocationPage;