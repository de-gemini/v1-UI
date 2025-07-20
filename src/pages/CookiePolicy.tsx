import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "Introduction",
    content: (
      <p>
        This Cookie Policy explains how we use cookies and similar technologies on our website. By using our site, you consent to our use of cookies as described in this policy.
      </p>
    ),
  },
  {
    heading: "What Are Cookies",
    content: (
      <p>
        Cookies are small text files stored on your device by your web browser. They help websites remember your preferences and improve your experience.
      </p>
    ),
  },
  {
    heading: "How We Use Cookies",
    content: (
      <ul className="list-disc pl-6">
        <li>To remember your preferences and settings</li>
        <li>To analyze site traffic and usage</li>
        <li>To enable essential site features</li>
        <li>To assist in marketing and advertising</li>
      </ul>
    ),
  },
  {
    heading: "Managing Cookies",
    content: (
      <p>
        You can control and delete cookies through your browser settings. Disabling cookies may affect your experience on our site.
      </p>
    ),
  },
  {
    heading: "Third-Party Cookies",
    content: (
      <p>
        Some cookies may be set by third-party services we use, such as analytics or advertising providers. We do not control these cookies.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time. Please review it regularly for any changes.
      </p>
    ),
  },
  {
    heading: "Contact",
    content: (
      <p>
        If you have questions about this Cookie Policy, please contact us using the information provided on our website.
      </p>
    ),
  },
];

const CookiePolicy: React.FC = () => (
  <PolicyTemplate title="Cookie Policy" sections={sections} />
);

export default CookiePolicy; 