import { Link } from 'react-router-dom';
import React from 'react';

// --- Data and Helper Functions ---
const slugify = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

const locations = [
  "Alford", "Barton-upon-Humber", "Boston", "Bourne", "Brigg",
  "Broughton", "Caistor", "Crowland", "Gainsborough", "Grantham",
  "Louth", "Mablethorpe", "Market Deeping", "Market Rasen",
  "North Hykeham", "Scunthorpe", "Skegness", "Sleaford", "Spalding",
  "Stamford", "Wainfleet All Saints", "Waltham", "Winterton", "Woodhall Spa"
];

// --- Component Definition ---
interface LocationLinksProps {
  variant?: 'list' | 'inline'; // Prop to control the style
}

const LocationLinks = ({ variant = 'list' }: LocationLinksProps) => {

  // Style 1: Vertical List
  if (variant === 'list') {
    return (
      <ul className="space-y-2 pb-4 lg:pb-0">
        {locations.map(location => (
          <li key={location}>
            <Link
              to={`/locations/${slugify(location)}`}
              className="hover:underline"
            >
              {location}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  // Style 2: Inline Paragraph
  if (variant === 'inline') {
    return (
      <p className="text-gray-700 text-sm leading-relaxed">
        {locations.map((location, index) => (
          // Use React.Fragment to avoid adding extra divs
          <React.Fragment key={location}>
            <Link
              to={`/locations/${slugify(location)}`}
              className="hover:underline"
            >
              {location}
            </Link>
            {/* Add a separator after each link except the last one */}
            {index < locations.length - 1 && (
              <span className="mx-2 text-gray-400">|</span>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  }

  return null; // Should not be reached
};

export default LocationLinks;