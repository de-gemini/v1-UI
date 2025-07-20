import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "Introduction",
    content: (
      <p>
        This Cancellation Policy explains how cancellations are handled for bookings made through our platform. By booking with us, you agree to this policy.
      </p>
    ),
  },
  {
    heading: "Cancellation by Customer",
    content: (
      <p>
        Customers may cancel their booking up to a specified time before the scheduled service. Cancellations made after this period may incur a fee or be non-refundable.
      </p>
    ),
  },
  {
    heading: "Cancellation by Company",
    content: (
      <p>
        We reserve the right to cancel bookings in certain circumstances, such as unavailability of cleaners or safety concerns. Customers will be notified as soon as possible.
      </p>
    ),
  },
  {
    heading: "Refunds",
    content: (
      <p>
        Refunds for cancellations are processed according to our refund policy. Please refer to our Payment Policy for more details.
      </p>
    ),
  },
  {
    heading: "How to Cancel",
    content: (
      <p>
        To cancel a booking, please contact our support team. We will assist you with the cancellation process.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    content: (
      <p>
        We may update this Cancellation Policy from time to time. Please review it regularly for any changes.
      </p>
    ),
  },
  {
    heading: "Contact",
    content: (
      <p>
        If you have questions about this Cancellation Policy, please contact us using the information provided on our website.
      </p>
    ),
  },
];

const CancellationPolicy: React.FC = () => (
  <PolicyTemplate title="Cancellation Policy" sections={sections} />
);

export default CancellationPolicy; 