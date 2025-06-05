// import { Link } from 'react-router-dom';

import { Check, MapPin } from "lucide-react";

const Home = () => {
  const features = [
    '24/7 service',
    'Cashback up to £150',
    'Eco-friendly',
    'Pay as You Go',
  ];
  return (
    <div className="min-h-screen bg-background-gray overflow-x-hidden w-full">
      {/* Hero Section Container */}
      <section className="flex items-center justify-center w-full px-4 max-w-7xl mx-auto">
        {/* Background Image/Overlay for people - Using a div with background image for responsiveness */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-0 bg-no-repeat"
          style={{
            backgroundImage: `url('https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People')`, // Placeholder for background image of people
            // Using a darker overlay on the image to make text more readable
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(106, 0, 141, 0.2)', // A slight purple overlay
          }}
        ></div>
        {/* Fallback for image load error */}
        <img
          src="https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People+Fallback"
          alt="Cleaning Service Staff"
          className="absolute inset-0 z-0 object-cover w-full h-full hidden opacity-0" // Hidden, only for error handling
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = '1'; // Show fallback image
            target.style.background = 'linear-gradient(to bottom right, #e0b1cb, #b8c4ea)'; // Background if image fails
            target.src = ''; // Clear src to prevent infinite loops
            target.alt = 'Fallback: Image of cleaning service staff could not load.';
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-900 leading-tight mb-8 drop-shadow-sm">
              Best Cleaning<br />Services In London
            </h1>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-purple-800">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Postcode Input and Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
              <div className="flex items-center flex-grow p-2">
                <MapPin className="h-6 w-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Enter your post code here"
                  className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
                  aria-label="Enter your postcode"
                />
              </div>
              <button className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                QUOTE ME
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="https://www.emop.co.uk/img/cleaning-employer.png" 
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 