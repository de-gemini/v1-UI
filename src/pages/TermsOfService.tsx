import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Terms of Service</h1>
        <div className="overflow-y-auto max-h-[60vh] space-y-6 text-sm sm:text-base text-neutral-700">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h2>
            <p>By using our website and services, you agree to these Terms of Service. Please read them carefully.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">2. Services</h2>
            <p>We provide cleaning services as described on our website. We reserve the right to modify or discontinue services at any time.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">3. User Responsibilities</h2>
            <p>You agree to provide accurate information and to use our services in compliance with all applicable laws.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">4. Payments</h2>
            <p>All payments are due as described at checkout. Additional charges may apply for extra services or damages.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">5. Cancellations & Refunds</h2>
            <p>See our cancellation and refund policy for details. We reserve the right to refuse refunds in certain cases.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">6. Limitation of Liability</h2>
            <p>We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid for services.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">7. Changes to Terms</h2>
            <p>We may update these Terms of Service at any time. Continued use of our services constitutes acceptance of the new terms.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-2">8. Contact</h2>
            <p>If you have questions about these terms, please contact us via the information on our website.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 