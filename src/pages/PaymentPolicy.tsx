import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "Introduction",
    content: (
      <p>
        This Payment and Cashback Policy outlines the terms and conditions regarding payments for services provided through our platform and our cashback rewards program. By booking or using our services, you agree to this policy.
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
    heading: "Loyalty Program & Cashback Policy",
    content: (
      <div>
        <p className="mb-4">
          Our loyalty program rewards customers for their continued business with cashback benefits. Cashback is determined based on your loyalty level, which is calculated according to the following criteria:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-brand-primary mb-2">Loyalty Levels</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bronze Level:</strong> New customers (0-2 bookings)</li>
              <li><strong>Silver Level:</strong> 3-5 bookings completed</li>
              <li><strong>Gold Level:</strong> 6-10 bookings completed</li>
              <li><strong>Platinum Level:</strong> 11+ bookings completed</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-brand-primary mb-2">Cashback Rates</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bronze:</strong> 2% cashback on eligible bookings</li>
              <li><strong>Silver:</strong> 3% cashback on eligible bookings</li>
              <li><strong>Gold:</strong> 5% cashback on eligible bookings</li>
              <li><strong>Platinum:</strong> 7% cashback on eligible bookings</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    heading: "Cashback Eligibility & Terms",
    content: (
      <div>
        <p className="mb-4">
          Cashback rewards are subject to the following terms and conditions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cashback is calculated on the final booking amount after any discounts or promotions</li>
          <li>Cashback is only available on completed bookings with no disputes or refunds</li>
          <li>Cashback rewards are credited to your account within 7-14 business days after service completion</li>
          <li>Cashback can be used as credit towards future bookings or withdrawn to your original payment method</li>
          <li>Minimum cashback withdrawal amount is £5.00</li>
          <li>Cashback rewards expire 12 months from the date they are earned</li>
          <li>We reserve the right to modify cashback rates and terms with 30 days notice</li>
        </ul>
      </div>
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
        For questions about this Payment and Cashback Policy, please contact us using the information provided on our website.
      </p>
    ),
  },
];

const PaymentPolicy: React.FC = () => (
  <PolicyTemplate title="Payment and Cashback Policy" sections={sections} />
);

export default PaymentPolicy; 