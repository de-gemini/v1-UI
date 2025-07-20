import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "Introduction",
    content: (
      <p>
        This Payment Policy outlines the terms and conditions regarding payments for services provided through our platform. By booking or using our services, you agree to this policy.
      </p>
    ),
  },
  {
    heading: "Payment Methods",
    content: (
      <p>
        We accept various payment methods including credit/debit cards and other options as displayed at checkout. All payments are processed securely via our payment provider.
      </p>
    ),
  },
  {
    heading: "Off-Session Charges",
    content: (
      <p>
        In certain cases, additional charges may be applied after your initial booking ("off-session charges"), such as for extra services, damages, or overtime. <strong>Most commonly, extra charges are for extra minutes worked that are not due to the fault of the cleaner</strong>—for example, if the property requires more cleaning than booked, or if the customer requests additional work. You will be notified of any such charges and the reason for them. By using our service, you authorize us to process these charges as described in our Terms of Service.
      </p>
    ),
  },
  {
    heading: "Refunds",
    content: (
      <p>
        Refunds are handled in accordance with our refund policy. If you believe you are entitled to a refund, please contact us promptly. We reserve the right to refuse refunds in certain cases as outlined in our Terms of Service.
      </p>
    ),
  },
  {
    heading: "Disputes",
    content: (
      <p>
        If you wish to dispute a payment or charge, please contact our support team within 7 days of the transaction. We will investigate and respond as quickly as possible.
      </p>
    ),
  },
  {
    heading: "Contact",
    content: (
      <p>
        For questions about this Payment Policy, please contact us using the information provided on our website.
      </p>
    ),
  },
];

const PaymentPolicy: React.FC = () => (
  <PolicyTemplate title="Payment Policy" sections={sections} />
);

export default PaymentPolicy; 