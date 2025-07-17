import React from 'react';
import { FileText, DollarSign, SmartphoneNfc } from 'lucide-react';

// Define interfaces for props
interface FeatureCardProps {
  icon: React.ReactNode; // Now a ReactNode for icon component
  iconBgColor: string; // Tailwind class for icon background color
  title: string;
  points: string[];
}

// Reusable FeatureCard Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBgColor, title, points }) => {
  return (
    <div className={`flex flex-col items-center text-center h-full border-0 border-r last:border-r-0 border-gray-300 px-6 py-4`}> {/* Remove shadow, rounded, add border */}
      {/* Icon/Illustration Container */}
      <div className={`relative w-16 h-16 flex items-center justify-center mb-6 ${iconBgColor} rounded-full`}>
        {icon}
      </div>
      {/* Title */}
      <h3 className="text-2xl font-bold nunito-sans-heading text-brand-primary mb-4">{title}</h3>
      {/* Points List */}
      <ul className="text-left w-full text-gray-700 space-y-2 flex-grow">
        {points.map((point, index) => (
          <li key={index} className="flex items-start text-base">
            <span className="flex-shrink-0 mr-2 text-brand-primary font-bold text-xl leading-none">&bull;</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main How It Works Section Component
export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="mx-auto">
        <h1 className='text-center text-4xl text-brand-primary font-black py-12'>Ready for a <span className='editorial'>Spotless </span>  Start?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-gray-300">
          {/* Card 1: Submit your booking online */}
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-purple-600" />}
            iconBgColor="bg-purple-100"
            title="Submit your booking online"
            points={[
              'Enter postcode',
              'Choose a type of cleaning',
              'Select a cleaning schedule',
              'Choose rooms to get an estimated price',
              'Select additional cleaning services if you need them',
              'Indicate the level of dirt in your property',
            ]}
          />
          {/* Card 2: Pay as You Go */}
          <FeatureCard
            icon={<DollarSign className="w-8 h-8 text-green-600" />}
            iconBgColor="bg-green-100"
            title="Pay as You Go"
            points={[
              'The estimated amount of your booking will be held in your bank account',
              'You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked',
            ]}
          />
          {/* Card 3: Manage your booking online */}
          <FeatureCard
            icon={<SmartphoneNfc className="w-8 h-8 text-blue-600" />}
            iconBgColor="bg-blue-100"
            title="Manage your booking online"
            points={[
              'When you submit your cleaning request, your booking becomes available to all cleaners in the system',
              'When you make an appointment with a cleaner, we email you or send a text message through the app',
              'You can use MyAccount on our website or the De-Gemini App to keep track of your booking',
            ]}
          />
        </div>
      </div>
    </section>
  );
};