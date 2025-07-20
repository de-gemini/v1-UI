import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "Introduction",
    content: (
      <p>
        This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. By using our platform, you agree to this policy.
      </p>
    ),
  },
  {
    heading: "Data We Collect",
    content: (
      <ul className="list-disc pl-6">
        <li>Personal information (name, email, phone number, address)</li>
        <li>Booking and payment details</li>
        <li>Usage data and cookies</li>
        <li>Feedback and communications</li>
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

const PrivacyPolicy: React.FC = () => (
  <PolicyTemplate title="Privacy Policy" sections={sections} />
);

export default PrivacyPolicy; 