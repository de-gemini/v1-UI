import React from 'react';

// Define interfaces for props
interface FeatureCardProps {
  icon: string; // LucideIcon type for dynamic icons
  iconBgColor: string; // Tailwind class for icon background color
  title: string;
  points: string[];
}

// Reusable FeatureCard Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBgColor, title, points }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-full">
      {/* Icon/Illustration Container */}
      <div className={`relative w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 overflow-hidden ${iconBgColor}`}>
        {/* Abstract circle patterns as seen in the image - adjust colors as needed */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-purple-300 opacity-50 animate-pulse"></div>
        <div className="absolute w-20 h-20 rounded-full border-2 opacity-75"></div>
        {/* The actual icon */}
        <img src={icon} className="w-10 h-10 relative z-10" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-purple-900 mb-4">{title}</h3>

      {/* Points List */}
      <ul className="text-left w-full text-gray-700 space-y-2 flex-grow">
        {points.map((point, index) => (
          <li key={index} className="flex items-start text-base">
            <span className="flex-shrink-0 mr-2 text-purple-600 font-bold text-xl leading-none">&bull;</span> {/* Custom bullet */}
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
    <section className="bg-gradient-to-b from-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading (if you want one above the cards, not explicit in this screenshot) */}
        {/* <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">How it Works</h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Submit your booking online */}
          <FeatureCard
            icon='https://www.emop.co.uk/static/redesign/images/how_it_works_1.svg'
            iconBgColor="bg-purple-100" // Light purple background for the icon circle
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
            icon='https://www.emop.co.uk/static/redesign/images/how_it_works_2.svg' // Changed to DollarSign
            iconBgColor="bg-green-100" // Light green background for the icon circle
            title="Pay as You Go"
            points={[
              'The estimated amount of your booking will be held in your bank account',
              'You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked',
            ]}
          />

          {/* Card 3: Manage your booking online */}
          <FeatureCard
            icon='https://www.emop.co.uk/static/redesign/images/how_it_works_3.svg' // Or SmartphoneNfc
            iconBgColor="bg-blue-100" // Light blue background for the icon circle
            title="Manage your booking online"
            points={[
              'When you submit your cleaning request, your booking becomes available to all cleaners in the system',
              'When you make an appointment with a cleaner, we email you or send a text message through the app',
              'You can use MyAccount on our website or the eMop App to keep track of your booking',
            ]}
          />
        </div>
      </div>
    </section>
  );
};