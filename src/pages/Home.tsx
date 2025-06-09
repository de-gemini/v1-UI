// import { Link } from 'react-router-dom';
import React, {useState} from "react";
import { Check, MapPin, Star } from "lucide-react";
import { ServiceCarousel } from "../components/CardComponent";
import { CostCard } from "../components/Postcode";
import { HowItWorksSection } from "../components/HowItWorks";
import { Sofa } from 'lucide-react';
import placeHolder from '../assets/images/Screenshot (409).png';
import { ProfessionalsCarousel } from "../components/Professional";

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

  const allCleaningServices = [
    'Dusting all accessible surfaces',
    'Cleaning lighting appliances, and chandeliers',
    'Wiping appliances',
    'Wiping mirrors and glass fixtures',
    'Folding clothes and arranging things',
    'Wiping doors, door handles, and switches',
    'Vacuuming the carpets and washing the floor and skirting boards',
    'Taking out rubbish',
    'Cleaning kitchen surfaces (additional service)',
    'Cleaning bathrooms (additional service)',
    'Wiping baseboards and window sills',
    'Emptying trash bins and replacing liners',
  ];

  const Halls = [
    'Dusting all accessible surfaces',
    'Cleaning mirrors and glass surfaces and the front door (inside)',
    'Vacuuming and mopping the floor and the skirting boards',
    'Arranging things',
    'Taking out rubbish',
  ];

  const kitchen = [
    'Getting all accessible surfaces free from dust and grease (sinks, taps, surfaces, stoves, and kitchen equipment)',
    'Making the front, upper and bottom kitchen facades spotless',
    'Vacuuming and washing the floor and skirting boards',
    'Wiping doors, door handles, and switches',
    'Doing the washing-up',
    'Taking out rubbish',
  ]

  const bathroom = [
    'Washing and sanitizing the toilet, the sink and the bidet',
    'Washing the shower and the tub',
    'Wiping down mirrors, glass fixtures and lighting appliance',
    'Dusting all accessible surfaces',
    'Wiping down walls, doors, door handles and switches',
    'Vacuuming and washing the floor and skirting boards',
    'Taking out rubbish'
  ]

  const office = [
    'Dusting of desks and computer equipment',
    'Vacuuming carpets, mopping the floor, and removing dirt from skirting boards',
    'Wiping mirrors and glass fixtures',
    'Washing and sanitising the toilet and shower',
    'Toilet and shower washing and sanitizing',
    'Kitchen sanitation: washing all used crockery and equipment, as well as wiping and sanitising all the external surfaces',
    'Taking out rubbish and replacing with new bin liners'
  ];

  const dummyProfessionals: Professional[] = [
    {
      id: 1,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-1.jpg',
      name: 'Mariya',
      rating: 5,
      description: 'Cleaning for me is not just a task. I really love it and it makes me happy. I love when customers are happy with the results, and I am always looking for ways to improve my service. My goal is to leave every home sparkling clean and my clients smiling!',
    },
    {
      id: 2,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-2.jpg',
      name: 'Ruslan',
      rating: 4.8,
      description: 'People call me the big clean machine. When cleaning, I try to be quick, functional and clean to a high standard. I pay attention to every detail and ensure that no corner is left untouched. Efficiency and thoroughness are my top priorities.',
    },
    {
      id: 3,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-3.jpg',
      name: 'Sumae',
      rating: 5,
      description: 'The flexibility of working with eMop has still allowed me to still keep to my lifestyle. I pickup jobs when needed and work around my schedule. I love the freedom this job gives me, and I always strive to deliver excellent results to my clients.',
    },
    {
      id: 4,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-4.jpg',
      name: 'Veronika',
      rating: 4.9,
      description: 'Hello from Veronika, I am really glad to have found eMop, working with my colleagues have really improved my cleaning skills and made me a better professional. I enjoy the team spirit and continuous learning opportunities.',
    },
    {
      id: 5,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-5.jpg',
      name: 'Gerilee',
      rating: 4.7,
      description: `My name's Gerilee, I've been working in the cleaning industry for about 3 years. Cleaning is my passion and I thoroughly enjoy it. I love making people's homes/offices into a spotless sanctuary!`,
    },
    {
      id: 5,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-6.jpg',
      name: 'Alberto',
      rating: 4.7,
      description: 'As an aspiring actor, eMop allows me to work flexibly and around my film schedules. The pay is really great and the training is excellent.',
    },
    {
      id: 5,
      imageSrc: 'https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-7.jpg',
      name: 'Silvie',
      rating: 4.7,
      description: 'Hi, my name is Silvie and I have more than 5 years experience as a cleaner. Let me help you to make your home spotless. 😊',
    },
  ];

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine how many items to show initially
  const initialItemsToShow = 6; // As observed in the screenshot for the visible portion
  const displayedServices = showAll ? allCleaningServices : allCleaningServices.slice(0, initialItemsToShow);
  const initialItemsForHall = 2;
  const displayedServicesForHall = showAll ? Halls : Halls.slice(0, initialItemsForHall);
  const initialItemsForKitchen = 2;
  const displayedServicesForKitchen = showAll ? kitchen : kitchen.slice(0, initialItemsForKitchen);
  const initialItemsForBathroom = 2;
  const displayedServicesForBathroom = showAll ? bathroom : bathroom.slice(0, initialItemsForBathroom);
  const initialItemsForOffice = 2;
  const displayedServicesForOffice = showAll ? office : office.slice(0, initialItemsForOffice);

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
      <section className="font-sans antialiased bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[30px] font-[700] text-gray-800 mb-8 md:mb-12">
          How much does a house cleaner cost in London
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">

          <div className="relative">
          <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
          Cashback up to £150
        </div>
          <CostCard
            title="Regular house cleaning"
            price="from £17/h"
            inputPlaceholder="Enter your full post code here"
            buttonText="QUOTE ME"
            onQuoteMeClick={handleRegularQuote}
          />
          </div>

          <CostCard
            title="One-off domestic cleaning"
            price="from £19/h"
            inputPlaceholder="Enter your full post code here"
            buttonText="QUOTE ME"
            onQuoteMeClick={handleOneOffQuote}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="w-full mb-4">
        <HowItWorksSection />
      </section>

      <h1 className="text-center text-brand-secondary text-[32px] font-[800] mb-5">
      What is included in eMop cleaning?
      </h1>
      {/* Service list section */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-purple-800 mb-6">
            <Sofa className="w-8 h-8 mr-3 text-purple-600" />
            <h2 className="text-xl sm:text-2xl font-bold">Bedroom, living, dining, office rooms</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Our cleaning London services include:
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-purple-600">
                  <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {allCleaningServices.length > initialItemsToShow && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-600 font-semibold text-left self-start hover:underline focus:outline-none"
            >
              {showAll ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/bedroom.png"
            alt="Cleaning services in living room"
            className="w-full h-full object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/halls.png"
            alt="Cleaning services in living room"
            className="w-full h-full object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-purple-800 mb-6">
            <img src="https://www.emop.co.uk/img/bedroom-icon.svg" alt="" />
            <h2 className="text-xl sm:text-2xl font-bold">Halls and stairs</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Our cleaning London services include:
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForHall.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-purple-600">
                  <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {allCleaningServices.length > initialItemsToShow && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-600 font-semibold text-left self-start hover:underline focus:outline-none"
            >
              {showAll ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg mt-4 shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-purple-800 mb-6">
            <img src="https://www.emop.co.uk/img/kitchen-icon.svg" className="w-8 h-8 mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold">Kitchen</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
          As you know, the kitchen is one of the most difficult rooms to clean in a London house. So, here are all the tasks we perform in the kitchen.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForKitchen.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-purple-600">
                  <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {kitchen.length > initialItemsForKitchen && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-600 font-semibold text-left self-start hover:underline focus:outline-none"
            >
              {showAll ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/kitchen.png"
            alt="Cleaning services in living room"
            className="w-full h-[85%] object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>
      </div>


      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/bathroom.png"
            alt="Cleaning services in living room"
            className="w-full h-[85%] object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-purple-800 mb-6">
            <img src="https://www.emop.co.uk/img/bathroom-icon.svg" alt="" />
            <h2 className="text-xl sm:text-2xl font-bold">Bathroom</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
          Bathrooms require regular and meticulous servicing to maintain a sanitary space. So, our cleaners come with all the necessary equipment to clean yours perfectly.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForBathroom.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-purple-600">
                  <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {bathroom.length > initialItemsForBathroom && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-600 font-semibold text-left self-start hover:underline focus:outline-none"
            >
              {showAll ? 'See less' : 'See more'}
            </button>
          )}
        </div>
      </div>


      <div className="max-w-7xl mx-auto bg-white rounded-lg mt-4 shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-purple-800 mb-6">
            <img src="https://www.emop.co.uk/img/kitchen-icon.svg" className="w-8 h-8 mr-3" />
            <h2 className="text-xl sm:text-2xl font-bold">Kitchen</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
          As you know, the kitchen is one of the most difficult rooms to clean in a London house. So, here are all the tasks we perform in the kitchen.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForOffice.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-purple-600">
                  <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {office.length > initialItemsForOffice&& (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-purple-600 font-semibold text-left self-start hover:underline focus:outline-none"
            >
              {showAll ? 'See less' : 'See more'}
            </button>
          )}
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/office.png"
            alt="Cleaning services in living room"
            className="w-full h-[85%] object-cover object-center"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>
      </div>



      {/* google section */}
            <section className="w=full mt-[2rem]">
              <div className="flex items-center justify-center gap-[6px]">
                <img src="https://www.emop.co.uk/static/images/google-icon.png" alt="google" className="w-[3rem]" />
                <h1 className="text-brand-secondary text-[30px] font-[700]">
                Google score 4.1
                </h1>
              </div>
              <div className="mt-[2rem]">
                <img src={placeHolder} alt="banner" />
              </div>
            </section>

            {/* Professionals */}
            <section className="w-full px-4">
              <h1 className="text-start ml-[3rem] text-brand-secondary text-[30px] font-[700]">Meet our Professionals</h1>
              <ProfessionalsCarousel
              professionals={dummyProfessionals}
              />
            </section>

            {/* Why choose?? */}
            <section className="w-full flex flex-col items-center justify-center">
              {/* cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[5px]">
                {/* each card */}
                <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
                  <div className="">
                  <img src="https://www.emop.co.uk/static/images/best1.svg" className="w-full" alt="image" />
                  </div>

                  <h1 className="text-brand-secondary text-[24px]">24/7 Availability</h1>
                <p className="text-center">
                Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance
                </p>
                </div>

                <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
                  <div className="">
                  <img src="https://www.emop.co.uk/static/images/best3.svg" className="w-full" alt="image" />
                  </div>

                  <h1 className="text-brand-secondary text-[24px]">24/7 Availability</h1>
                <p className="text-center">
                Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance
                </p>
                </div>

                <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
                  <div className="">
                  <img src="https://www.emop.co.uk/static/images/best2.svg" className="w-full" alt="image" />
                  </div>

                  <h1 className="text-brand-secondary text-[24px]">24/7 Availability</h1>
                <p className="text-center">
                Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance
                </p>
                </div>

                <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
                  <div className="">
                  <img src="https://www.emop.co.uk/static/images/last_minute.svg" className="w-full" alt="image" />
                  </div>

                  <h1 className="text-brand-secondary text-[24px]">24/7 Availability</h1>
                <p className="text-center">
                Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance
                </p>
                </div>

              </div>
            </section>


    </div>
  );
};

export default Home;
