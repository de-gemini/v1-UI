

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
    heading: "Bathrooms and toilets",
    content: (
      <ul className="list-disc pl-6">
        <li>Remove the cobweb and dust from the ceiling</li>
        <li>Clean bath and remove limescale</li>
        <li>Wash shower cabinet / screen from inside and out / de-scale</li>
        <li>Clean and disinfect toilet from inside and out</li>
        <li>Wash and de-scale sink / shine taps
        </li>
        <li>Wash down tiles, remove mould & wipe tiles
        </li>
        <li>Clean & polish mirrors
        </li>
        <li>Clean & polish mirrors
        </li><li>Clean & polish mirrors
        </li><li>Wipe cupboards/shelving/ surfaces and polish stainless steel
        </li>
      </ul>
    ),
  },
  {
    heading: "How We Use Data",
    content: (
      <ul className="list-disc pl-6">
        <li>To provide and improve our services</li>
        <li>To process bookings and payments</li>
        <li>To communicate with you about your account or bookings</li>
        <li>To comply with legal obligations</li>
      </ul>
    ),
  },
  {
    heading: "Cookies",
    content: (
      <p>
        We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings. For more details, see our Cookie Policy.
      </p>
    ),
  },
  {
    heading: "Data Security",
    content: (
      <p>
        We implement appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse.
      </p>
    ),
  },
  {
    heading: "Your Rights",
    content: (
      <ul className="list-disc pl-6">
        <li>Access, update, or delete your personal data</li>
        <li>Object to or restrict certain processing</li>
        <li>Withdraw consent at any time</li>
        <li>Contact us for any privacy-related concerns</li>
      </ul>
    ),
  },
  {
    heading: "Contact",
    content: (
      <p>
        If you have questions about this Privacy Policy, please contact us using the information provided on our website.
      </p>
    ),
  },
];

const Checklist: React.FC = () => (
  <PolicyTemplate title="End of tenancy cleaning checklist" sections={sections} />
);

export default Checklist; 