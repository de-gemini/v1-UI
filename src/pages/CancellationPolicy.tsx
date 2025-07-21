import React from "react";
import PolicyTable from "../components/PolicyTable";

const CancellationPolicy: React.FC = () => (
  <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm">
          
          {/* Page Header */}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">
              Cancellation Policy
            </h1>
          </header>

          
          <main className="mt-6 text-gray-600 leading-relaxed space-y-4">
            <p>
              Time is valuable for both clients and De-gemini. That is why we have introduced a <strong className="font-semibold text-gray-700">Cancellation Policy</strong> for both clients and De-gemini, which also covers rescheduling. By accepting our terms and conditions you accept the conditions set out in this cancellation policy.
            </p>
            <p>
              If a client cancels a job less than 12 hours before the start time or at the last minute, our De-gemini lose their income and it messes with their schedule. Clients' cancellation fees cover De-gemini' time and the eMop platform's costs.
            </p>
          </main>

          
          <PolicyTable />

          
          <footer className="mt-8 text-sm text-gray-500 space-y-2">
            <p>
              * Fee applied only if an eMopper reported the case to eMop and provided a print screen with unanswered calls to the client and pictures of the door of the client's property.
            </p>
            <p className="font-medium">
              Updated 27.09.2024
            </p>
          </footer>

        </div>
      </div>
    </div>
);
export default CancellationPolicy; 