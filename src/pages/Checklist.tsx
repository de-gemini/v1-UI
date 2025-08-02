

import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "",
    content: (
      <p>
        De-gemini professional end of tenancy cleaners follow strict company procedures and checklists to ensure you receive the highest level of service. De-gemini cleaning list includes the areas/rooms our expert team cleans while at your property. Our end of tenancy cleaning checklist is as follows:
      </p>
    ),
  },
  {
    heading: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
        </svg>
        BEDROOMS
      </div>
    ),
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Clean wardrobes, drawers, bedside tables (inside and out)</li>
        <li>Vacuum under the bed and behind furniture</li>
        <li>Clean curtain rails/blinds (dust or wipe as appropriate)</li>
        <li>Clean any stains on walls or marks on switches</li>
      </ul>
    ),
  },
  {
    heading: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
        LIVING ROOM & COMMON AREAS
      </div>
    ),
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Clean sofas (vacuum or wipe leather/fabric)</li>
        <li>Clean TV stands, shelves, coffee tables</li>
        <li>Remove marks from walls if possible</li>
        <li>Dust all electronics and fixtures</li>
      </ul>
    ),
  },
  {
    heading: (
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        KITCHEN
      </div>
    ),
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Deep clean racks, trays, and glass</li>
        <li>Clean hob, extractor fan, and filters</li>
        <li>Clean microwave, fridge/freezer (inside and out), and defrost if needed</li>
        <li>Clean dishwasher, washing machine (including seals and trays)</li>
        <li>Clean sink, taps, and remove limescale</li>
        <li>Clean all kitchen tiles and worktops</li>
        <li>Clean cupboards (inside and out)</li>
        <li>Empty and clean bins</li>
        <li>Mop floor thoroughly</li>
      </ul>
    ),
  },
  {
    heading: "Bathrooms and toilets",
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Remove the cobweb and dust from the ceiling</li>
        <li>Clean bath and remove limescale</li>
        <li>Wash shower cabinet / screen from inside and out / de-scale</li>
        <li>Clean and disinfect toilet from inside and out</li>
        <li>Wash and de-scale sink / shine taps</li>
        <li>Wash down tiles, remove mould & wipe tiles</li>
        <li>Clean & polish mirrors</li>
        <li>Wipe cupboards/shelving/ surfaces and polish stainless steel</li>
      </ul>
    ),
  },
];

const Checklist: React.FC = () => (
  <PolicyTemplate title="End of tenancy cleaning checklist" sections={sections} />
);

export default Checklist; 