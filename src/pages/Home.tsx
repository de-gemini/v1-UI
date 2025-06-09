// import { Link } from 'react-router-dom';

import { Check, MapPin, Star } from "lucide-react";
import { ServiceCarousel } from "../components/CardComponent";
import { CostCard } from "../components/Postcode";

const Home = () => {
  const features = [
    "24/7 service",
    "Cashback up to £150",
    "Eco-friendly",
    "Pay as You Go",
  ];

  const handleRegularQuote = (code: string) => {
    console.log(`Regular Cleaning Quote for: ${code}`);
  };

  const handleOneOffQuote = (code: string) => {
    console.log(`One-off Cleaning Quote for: ${code}`);
  };

  const serviceData = [
    {
      imageSrc: "https://www.emop.co.uk/img/domestic-service.jpg",
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, eMop provides comprehensive deep cleaning in London and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/upholstery.png",
      altText: "Upholstery cleaning",
      title: "Upholstery cleaning",
      price: "from £19/h",
      description:
        "The upholstery service from eMop eliminates visible surface dirt, such as dust and grime. Our team in London will use specialised stain-removal chemicals to get rid of any discolouring on your furniture. The solution offered by eMop includes the elimination of offensive odours, which can be a major issue if you have pets in your house.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/regular.png",
      altText: "Regular cleaning",
      title: "Regular cleaning",
      price: "from £19/h",
      description:
        "In addition to providing you with thorough one off cleaning for your home at a time and day that suits you, our regular house cleaning service sends a professional to your home each week to give you peace of mind and guarantee that your preferred routine is clearly established.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/benefits.jpg",
      altText: "Deep cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        " For an extra-through clean of your home, eMop provides complete deep cleaning in London and its surroundings. When you enter into a service agreement, our team can significantly reduce your workload.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/carpet.png",
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, eMop provides comprehensive deep cleaning in London and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/ofice.png",
      altText: "Office cleaning",
      title: "Office cleaning",
      price: "from £19/h",
      description:
        "You may rely on our company to keep your London office spotless. The frequency and duration of our visits are totally up to you, even if you need us multiple days a week.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/tenancy.png",
      altText: "End of tenancy cleaning service",
      title: "End of tenancy cleaning service",
      price: "from £19/h",
      description:
        "If you’re preparing to leave your leased home, you can benefit from our practical end-of-tenancy packages. We typically send two professionals to your home to do this job, and they are properly outfitted and educated to adhere to a specific protocol that satisfies the requirements of landlords.",
    },
  ];
  return (
    <div className="min-h-screen bg-background-gray overflow-x-hidden w-full">
      {/* Hero Section Container */}
      <section className="flex items-center justify-center w-full px-4 max-w-7xl mx-auto">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-0 bg-no-repeat"
          style={{
            backgroundImage: `url('https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People')`,
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(106, 0, 141, 0.2)",
          }}></div>

        <img
          src="https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People+Fallback"
          alt="Cleaning Service Staff"
          className="absolute inset-0 z-0 object-cover w-full h-full hidden opacity-0" // Hidden, only for error handling
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            target.style.opacity = "1"; // Show fallback image
            target.style.background =
              "linear-gradient(to bottom right, #e0b1cb, #b8c4ea)"; // Background if image fails
            target.src = ""; // Clear src to prevent infinite loops
            target.alt =
              "Fallback: Image of cleaning service staff could not load.";
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-900 leading-tight mb-8 drop-shadow-sm">
              Best Cleaning
              <br />
              Services In London
            </h1>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-purple-800">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl font-medium">
                    {feature}
                  </span>
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

      {/* Carousel section */}
      <section
        className="w-full"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/img/wave.png')`,
        }}>
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-900 mb-4">
              Trusted service
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 flex items-center">
              See our{" "}
              <span className="font-bold text-purple-800 ml-2">1,268</span>{" "}
              reviews on
              <span className="inline-flex items-center ml-3 text-green-600 font-bold">
                <Star className="h-6 w-6 fill-current text-green-500 mr-1" />{" "}
                {/* Filled star icon */}
                Trustpilot
              </span>
            </p>
          </div>
        </div>

        <div className="font-sans antialiased bg-gray-50 min-h-screen">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-900 text-center py-10">
            Our Featured Services
          </h2>
          <ServiceCarousel services={serviceData} />
          <div className="h-48"></div> {/* Spacer for demonstration */}
        </div>
      </section>

      {/* Post code section */}
      <section className="font-sans antialiased bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-8 md:mb-12">
          How much does a house cleaner cost in London
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8">
          <CostCard
            title="Regular house cleaning"
            price="from £17/h"
            inputPlaceholder="Enter your full post code here"
            buttonText="QUOTE ME"
            onQuoteMeClick={handleRegularQuote}
          />

          <CostCard
            title="One-off domestic cleaning"
            price="from £19/h"
            inputPlaceholder="Enter your full post code here"
            buttonText="QUOTE ME"
            onQuoteMeClick={handleOneOffQuote}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
