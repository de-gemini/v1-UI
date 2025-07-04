// import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Check, MapPin, Star } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ServiceCarousel } from "../components/CardComponent";
import { CostCard } from "../components/Postcode";
import { HowItWorksSection } from "../components/HowItWorks";
import { Sofa } from "lucide-react";
import placeHolder from "../assets/images/Screenshot (409).png";
import { ProfessionalsCarousel } from "../components/Professional";
import { RatingCarousel } from "../components/ratingCard";
import axiosInstance from '../api/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const features = [
    "24/7 service",
    "Cashback up to £150",
    "Eco-friendly",
    "Pay as You Go",
  ];

  const navigate = useNavigate();

  interface FAQItemData {
    id: string;
    question: string;
    answer: string;
  }

  const faqData: FAQItemData[] = [
    {
      id: "how-get-cleaners",
      question: "How do I get good cleaners in England?",
      answer:
        "First, ask for recommendations from friends or family living in the city. They can help you identify good options. Second, check online directories and review sites to see what others have said about different cleaners in England. That can give you a good idea of who to contact and who to avoid. Finally, you can also contact a trusted company like eMop and choose from our top-rated professionals.",
    },
    {
      id: "uk-cleaners-cost",
      question: "How much do UK cleaners cost?",
      answer:
        "The price of hiring a home professional in the UK will range between £8 to £20 per hour. eMop offers great prices, and that's why it's economical for you to go with us. When you hire through eMop, we guarantee that all our employees are highly trained and vetted for your safety and peace of mind. The average hourly rate for a general service in eMop is £17 per hour. This covers tasks such as tidying, dusting, vacuuming, wiping down surfaces and carpets, and cleaning toilets. However, it's always best to check with the cleaners beforehand to see what is included in their package.",
    },
    {
      id: "hire-per-week",
      question: "How much is it to hire someone per week in the UK?",
      answer:
        "A weekly cleanse for a home costs in the range of £48 to £92 for a four-hour service. You can check the average cost for a four-hour session done by a cleaner from eMop here, though it varies depending on your location and property size. Many cleaners, whether they work for a prominent company or are self-employed, extend discounts to those who avail of their service regularly.",
    },
    {
      id: "What can a cleaner do in three hours?",
      question: "What can a cleaner do in three hours?",
      answer:
        "Here are some things that can be accomplished in three hours: sanitising countertops; making the bathroom, including bathtubs, shower heads, and toilets, spotless; dusting the skirting boards and vacuuming/mopping the floor; doing the laundry; wiping down the sink and countertops, and washing the dishes;",
    },
    {
      id: "Should I clean before a cleaner comes?",
      question: "Should I clean before a cleaner comes?",
      answer:
        "It is not necessary to clean before a cleaner arrives. eMop cleaners are used to working in homes that are not perfectly clean, and they will be able to adjust their approach accordingly.",
    },
  ];

  const ratings = [
    {
      name: "Ritchter Belmont",
      date: "13th of June, 2025",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXCgM-XZ5mAU0bxL8SErlHjjgIA6HyaHgwXz5KsmvnTjfMOnuQ=s120-c-rp-mo-br100",
      review: "I booked a deep cleaning for the kitchen with Emop and was really impressed. The cleaner arrived on time, worked efficiently, and did an amazing job. Highly recommended!",
      rating: 5,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 4,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 4,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 4,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 4,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 5,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 3,
    },
    {
      name: "Fatima Jones",
      date: "26th of April, 2025",
      avatar: "https://example.com/avatar1.jpg",
      review: "Cheap one-off cleans which is why I use them, 2 out of 3 have been great but the other 1 turned up an hour late and then couldn't figure out how to use my key safe. For what you pay, it's excellent, and I did get some money off for that incident. Job #397083 was completed to a good standard by Lydia.",
      rating: 5,
    },
  ];

  const handleRegularQuote = (code: string) => {
    console.log(`Regular Cleaning Quote for: ${code}`);
  };

  const [postcode, setPostcode] = useState<string>("");
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(false);
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleQuoteMeClick = () => {
    console.log(
      `Getting quote for additional services with postcode: ${postcode}`
    );
  };

  const additionalServices = [
    {
      icon: "https://www.emop.co.uk/img/windows-icon.png", // Using Building for "Windows cleaning" as a general building feature
      title: "Windows cleaning",
      // Placeholder for specific icon rendering based on screenshot style
    },
    {
      icon: "https://www.emop.co.uk/img/fridge-icon.png",
      title: "Cleaning inside the fridge and the microwave",
    },
    {
      icon: "https://www.emop.co.uk/img/kitchen-cabinet-icon.png", // Corrected to KitchenCabinet
      title: "Cleaning inside kitchen cabinets",
    },
    {
      icon: "https://www.emop.co.uk/img/bookcases-icon.png", // Corrected to BookText
      title: "Cleaning bookcases",
    },
    // Add more services if needed to match a full grid or if you have more.
    // For now, I'm replicating what's clearly visible in the screenshot's grid.
    {
      icon: "https://www.emop.co.uk/img/linens-icon.png", // Assuming this last icon represents something like "Mattress cleaning" or similar, based on common cleaning services
      title: "Mattress cleaning", // Example title, adjust if you know the actual service
    },
  ];

  const allCleaningServices = [
    "Dusting all accessible surfaces",
    "Cleaning lighting appliances, and chandeliers",
    "Wiping appliances",
    "Wiping mirrors and glass fixtures",
    "Folding clothes and arranging things",
    "Wiping doors, door handles, and switches",
    "Vacuuming the carpets and washing the floor and skirting boards",
    "Taking out rubbish",
    "Cleaning kitchen surfaces (additional service)",
    "Cleaning bathrooms (additional service)",
    "Wiping baseboards and window sills",
    "Emptying trash bins and replacing liners",
  ];

  const Halls = [
    "Dusting all accessible surfaces",
    "Cleaning mirrors and glass surfaces and the front door (inside)",
    "Vacuuming and mopping the floor and the skirting boards",
    "Arranging things",
    "Taking out rubbish",
  ];

  const kitchen = [
    "Getting all accessible surfaces free from dust and grease (sinks, taps, surfaces, stoves, and kitchen equipment)",
    "Making the front, upper and bottom kitchen facades spotless",
    "Vacuuming and washing the floor and skirting boards",
    "Wiping doors, door handles, and switches",
    "Doing the washing-up",
    "Taking out rubbish",
  ];

  const bathroom = [
    "Washing and sanitizing the toilet, the sink and the bidet",
    "Washing the shower and the tub",
    "Wiping down mirrors, glass fixtures and lighting appliance",
    "Dusting all accessible surfaces",
    "Wiping down walls, doors, door handles and switches",
    "Vacuuming and washing the floor and skirting boards",
    "Taking out rubbish",
  ];

  const office = [
    "Dusting of desks and computer equipment",
    "Vacuuming carpets, mopping the floor, and removing dirt from skirting boards",
    "Wiping mirrors and glass fixtures",
    "Washing and sanitising the toilet and shower",
    "Toilet and shower washing and sanitizing",
    "Kitchen sanitation: washing all used crockery and equipment, as well as wiping and sanitising all the external surfaces",
    "Taking out rubbish and replacing with new bin liners",
  ];

  const dummyProfessionals = [
    {
      id: 1,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-1.jpg",
      name: "Mariya",
      rating: 5,
      description:
        "Cleaning for me is not just a task. I really love it and it makes me happy. I love when customers are happy with the results, and I am always looking for ways to improve my service. My goal is to leave every home sparkling clean and my clients smiling!",
    },
    {
      id: 2,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-2.jpg",
      name: "Ruslan",
      rating: 4.8,
      description:
        "People call me the big clean machine. When cleaning, I try to be quick, functional and clean to a high standard. I pay attention to every detail and ensure that no corner is left untouched. Efficiency and thoroughness are my top priorities.",
    },
    {
      id: 3,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-3.jpg",
      name: "Sumae",
      rating: 5,
      description:
        "The flexibility of working with eMop has still allowed me to still keep to my lifestyle. I pickup jobs when needed and work around my schedule. I love the freedom this job gives me, and I always strive to deliver excellent results to my clients.",
    },
    {
      id: 4,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-4.jpg",
      name: "Veronika",
      rating: 4.9,
      description:
        "Hello from Veronika, I am really glad to have found eMop, working with my colleagues have really improved my cleaning skills and made me a better professional. I enjoy the team spirit and continuous learning opportunities.",
    },
    {
      id: 5,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-5.jpg",
      name: "Gerilee",
      rating: 4.7,
      description: `My name's Gerilee, I've been working in the cleaning industry for about 3 years. Cleaning is my passion and I thoroughly enjoy it. I love making people's homes/offices into a spotless sanctuary!`,
    },
    {
      id: 5,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-6.jpg",
      name: "Alberto",
      rating: 4.7,
      description:
        "As an aspiring actor, eMop allows me to work flexibly and around my film schedules. The pay is really great and the training is excellent.",
    },
    {
      id: 5,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-7.jpg",
      name: "Silvie",
      rating: 4.7,
      description:
        "Hi, my name is Silvie and I have more than 5 years experience as a cleaner. Let me help you to make your home spotless. 😊",
    },
  ];

  const allFeatures = [
    "If you require, you can get our team to change your bed linen and perform additional tasks to ensure a clean home.",
    "Our cleaners are fully vetted and insured, ensuring peace of mind for every booking.",
    "We use eco-friendly cleaning products upon request to protect your home and the environment.",
    "Flexible booking options are available, allowing you to schedule cleaning at your convenience.",
    "Dedicated customer support is always ready to assist you with any queries or concerns.",
    "We guarantee satisfaction with every clean; if you're not happy, we'll re-clean!",
  ];

  const initialFeaturesToShow = 1;
  const displayedFeatures = showAllFeatures
    ? allFeatures
    : allFeatures.slice(0, initialFeaturesToShow);

  const toggleFeaturesVisibility = () => {
    setShowAllFeatures(!showAllFeatures);
  };

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine how many items to show initially
  const initialItemsToShow = 6; // As observed in the screenshot for the visible portion
  const displayedServices = showAll
    ? allCleaningServices
    : allCleaningServices.slice(0, initialItemsToShow);
  const initialItemsForHall = 2;
  const displayedServicesForHall = showAll
    ? Halls
    : Halls.slice(0, initialItemsForHall);
  const initialItemsForKitchen = 2;
  const displayedServicesForKitchen = showAll
    ? kitchen
    : kitchen.slice(0, initialItemsForKitchen);
  const initialItemsForBathroom = 2;
  const displayedServicesForBathroom = showAll
    ? bathroom
    : bathroom.slice(0, initialItemsForBathroom);
  const initialItemsForOffice = 2;
  const displayedServicesForOffice = showAll
    ? office
    : office.slice(0, initialItemsForOffice);

  const handleOneOffQuote = (code: string) => {
    console.log(`One-off Cleaning Quote for: ${code}`);
  };

  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const serviceData = [
    {
      imageSrc: "https://www.emop.co.uk/img/domestic-service.jpg",
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, eMop provides comprehensive deep cleaning in England and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/upholstery.png",
      altText: "Upholstery cleaning",
      title: "Upholstery cleaning",
      price: "from £19/h",
      description:
        "The upholstery service from eMop eliminates visible surface dirt, such as dust and grime. Our team in England will use specialised stain-removal chemicals to get rid of any discolouring on your furniture. The solution offered by eMop includes the elimination of offensive odours, which can be a major issue if you have pets in your house.",
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
        " For an extra-through clean of your home, eMop provides complete deep cleaning in England and its surroundings. When you enter into a service agreement, our team can significantly reduce your workload.",
    },
    {
      imageSrc: "https://www.emop.co.uk/img/carpet.png",
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, eMop provides comprehensive deep cleaning in England and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
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
        "If you're preparing to leave your leased home, you can benefit from our practical end-of-tenancy packages. We typically send two professionals to your home to do this job, and they are properly outfitted and educated to adhere to a specific protocol that satisfies the requirements of landlords.",
    },
  ];

  // Postcode API handler
  const handlePostcodeApi = async () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
    try {
      const res = await axiosInstance.post('https://v1-api-6rdd.onrender.com/postcode', { postcode });
      toast.success(`Success: ${JSON.stringify(res.data)}`);
      navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-background-gray overflow-x-hidden w-full">
      {/* Hero Section Container */}
      <ToastContainer
        position='top-right'
        rtl={true}
        hideProgressBar={false}
        autoClose={5000}
        draggable={true}
        icon={<Check/>}
        pauseOnHover={true}
        />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl nunito-sans-title text-brand-text leading-tight mb-8 drop-shadow-sm">
              Best Cleaning
              <br />
              Services In England
            </h1>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-purple-800">
                  <Check className="h-6 w-6 text-brand-primary mr-3 flex-shrink-0" />
                  <span className="text-lg sm:text-xl nunito-sans-text text-brand-text">
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
                  value={postcode}
                  onChange={e => setPostcode(e.target.value)}
                />
              </div>
              <button
                className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                onClick={handlePostcodeApi}
              >
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
            <h2 className="text-3xl sm:text-4xl font-extrabold nunito-sans-heading text-brand-primary mb-4">
              Trusted service
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 flex items-center">
              See our{" "}
              <span className="font-bold text-brand-primary ml-2">1,268</span>{" "}
              reviews on
              <span className="inline-flex items-center ml-3 text-brand-primary nunito-sans-heading">
                <Star className="h-6 w-6 fill-current text-brand-primary  mr-1" />{" "}
                {/* Filled star icon */}
                Trustpilot
              </span>
            </p>
          </div>
        </div>

        <div className="font-sans antialiased bg-gray-50 min-h-screen">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary text-center py-10">
            Our Featured Services
          </h2>
          <ServiceCarousel services={serviceData} />
          <div className="h-48"></div> {/* Spacer for demonstration */}
        </div>
      </section>

      {/* Post code section */}
      <section className="font-sans antialiased bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[30px] font-[700] text-brand-primary nunito-sans-heading mb-8 md:mb-12">
          How much does a house cleaner cost in England
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="Regular house cleaning"
              price="from £17/h"
              text="-"
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handleRegularQuote}
            />
          </div>

          <CostCard
            title="One-off domestic cleaning"
            price="from £19/h"
            text="-"
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

      <h1 className="text-center text-brand-primary nunito-sans-heading text-[32px] font-[800] mb-5">
        What is included in De gemini cleaning?
      </h1>
      {/* Service list section */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary mb-6">
            <Sofa className="w-8 h-8 mr-3 text-brand-primary" />
            <h2 className="text-xl sm:text-2xl font-bold nunito-sans-heading">
              Bedroom, living, dining, office rooms
            </h2>
          </div>

          <p className="text-gray-700 nunito-sans-text text-base sm:text-lg mb-6">
            Our cleaning London services include:
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
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
              className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
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
              target.src =
                "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
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
              target.src =
                "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <img src="https://www.emop.co.uk/img/bedroom-icon.svg" alt="" />
            <h2 className="text-xl sm:text-2xl font-bold">Halls and stairs</h2>
          </div>

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
            Our cleaning London services include:
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForHall.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
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
              className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg mt-4 shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary mb-6">
            <img
              src="https://www.emop.co.uk/img/kitchen-icon.svg"
              className="w-8 h-8 mr-3"
            />
            <h2 className="text-xl sm:text-2xl font-bold nunito-sans-heading">Kitchen</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6">
            As you know, the kitchen is one of the most difficult rooms to clean
            in a London house. So, here are all the tasks we perform in the
            kitchen.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForKitchen.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
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
              className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
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
              target.src =
                "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
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
              target.src =
                "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary mb-6">
            <img src="https://www.emop.co.uk/img/bathroom-icon.svg" alt="" />
            <h2 className="text-xl sm:text-2xl font-bold">Bathroom</h2>
          </div>

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
            Bathrooms require regular and meticulous servicing to maintain a
            sanitary space. So, our cleaners come with all the necessary
            equipment to clean yours perfectly.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForBathroom.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
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
              className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg mt-4 shadow-lg overflow-hidden md:flex">
        {/* Left Section: Text Content */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary mb-6">
            <img
              src="https://www.emop.co.uk/img/kitchen-icon.svg"
              className="w-8 h-8 mr-3"
            />
            <h2 className="text-xl sm:text-2xl font-bold nunito-sans-heading">Kitchen</h2>
          </div>

          <p className="text-gray-700 text-base sm:text-lg mb-6 nunito-sans-text">
            As you know, the kitchen is one of the most difficult rooms to clean
            in a London house. So, here are all the tasks we perform in the
            kitchen.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForOffice.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {service}
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {office.length > initialItemsForOffice && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
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
              target.src =
                "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
              target.alt = "Fallback image: Cleaning services image not found.";
            }}
          />
        </div>
      </div>

      {/* google section */}
      <section className="w=full mt-[2rem]">
        <div className="flex items-center justify-center gap-[6px]">
          <img
            src="https://www.emop.co.uk/static/images/google-icon.png"
            alt="google"
            className="w-[3rem]"
          />
          <h1 className="text-brand-secondary text-[30px] font-[700]">
            Google score 4.1
          </h1>
        </div>
        <div className="mt-[2rem]">
        <RatingCarousel ratings={ratings} />
        </div>
      </section>

      {/* Professionals */}
      <section className="w-full px-4">
        <h1 className="text-start ml-[3rem] text-brand-primary nunito-sans-heading text-[30px] font-[700]">
          Meet our Professionals
        </h1>
        <ProfessionalsCarousel professionals={dummyProfessionals} />
      </section>

      {/* Why choose?? */}
      <section className="w-full flex flex-col items-center justify-center">
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[5px] px-3 w-full md:w-full lg:max-w-4xl">
          {/* each card */}
          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best1.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-primary nunito-sans-heading text-[24px]">
              24/7 Availability
            </h1>
            <p className="text-center nunito-sans-text">
              Pick a date and time that suits you. You can even book for same
              day cleaning, 4 hours in advance
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best3.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-primary nunito-sans-heading text-[24px]">
            Bespoke Service
            </h1>
            <p className="text-center nunito-sans-text">
            You can choose which rooms you wish us to clean and book only the services you need.
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best2.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-primary nunito-sans-heading text-[24px]">
            Pay as You Go
            </h1>
            <p className="text-center nunito-sans-text">
            We charge clients only for the actual time a cleaner spends at your property.
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/last_minute.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-primary nunito-sans-heading text-[24px]">
            Last minute cleaning
            </h1>
            <p className="text-center nunito-sans-text">
            Need urgent cleaning? You can make a booking 4 hours in advance.
            </p>
          </div>
        </div>
      </section>

      {/* additional */}
      <section
        className="w-full"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/img/domestic-background.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="font-sans antialiased bg-purple-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Section: Text and Input */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold nunito-sans-heading text-brand-primary mb-6">
                Additional domestic cleaning services
              </h1>
              <p className="text-gray-700 text-base sm:text-lg mb-8 nunito-sans-text leading-relaxed">
                For advanced cleaning, you can add more services when booking.
                Most extra cleaning add-ons add half an hour to the cleaning
                time of your booking.
              </p>

              {/* Postcode Input and Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-purple-300 max-w-md w-full">
                <div className="flex items-center flex-grow p-2">
                  <MapPin className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter your post code here"
                    className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    aria-label="Enter your postcode"
                  />
                </div>
                <button
                  onClick={handlePostcodeApi}
                  className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                  QUOTE ME
                </button>
              </div>
            </div>

            {/* Right Section: Service Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 p-4">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center mb-3 shadow-md border border-gray-200">
                    {/* Inner abstract circles (similar to screenshot) */}
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-200 opacity-60"></div>
                    <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-purple-300 opacity-80"></div>
                    {/* The actual icon */}
                    <img
                      src={service.icon}
                      alt="image"
                      className="w-12 h-12 sm:w-16 sm:h-16 text-brand-secondary relative z-10"
                    />
                  </div>
                  <p className="text-gray-700 font-semibold text-sm nunito-sans-heading sm:text-base">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* More content to show page  */}

          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden md:flex mb-6">
            {/* Left Section: Text Content */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/img/professional-first.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-gray-700 text-base sm:text-lg mb-6 nunito-sans-text leading-relaxed">
                eMop is a professional cleaning company that operates in England
                and other UK cities. We offer a wide range of cleaning services
                London, including regular, one-off deep clean, and
                end-of-tenancy solutions. eMop is convenient because it provides
                a flexible house cleaning service tailored to each customer's
                needs. Our professional cleaners are hand-picked and tested,
                then thoroughly trained to offer the best possible service. Our
                domestic cleaners are familiar with treating all types of
                surfaces, including delicate fabrics. Our professionals will
                meticulously remove any rubbish, dust, grime, or stains that may
                be present.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden md:flex mb-6">
            {/* Left Section: Text Content */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold nunito-sans-heading text-brand-primary mb-6">
                Reliable Experts in England
              </h1>

              <p className="text-gray-700 text-base sm:text-lg mb-6 nunito-sans-text leading-relaxed">
                If you're looking for reliable house cleaning services in
                London, eMop is an excellent option. We offer our customers a
                wide range of house cleaning solutions, and we're always looking
                for new ways to improve them. That is why eMop is a reliable
                platform for hiring expert cleaners.
              </p>

              <ul className="text-gray-700 space-y-2 mb-4">
                {displayedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mr-3 nunito-sans-text text-brand-secondary">
                      {/* Purple square-like bullet, using a simple SVG or a div */}
                      <svg
                        className="w-3 h-3 mt-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <rect
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          rx="4"
                          ry="4"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* "3 more" / "See less" button */}
              {allFeatures.length > initialFeaturesToShow && (
                <button
                  onClick={toggleFeaturesVisibility}
                  className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
                  {showAllFeatures
                    ? "See less"
                    : `${allFeatures.length - initialFeaturesToShow} more`}
                </button>
              )}
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/static/redesign/images/services/regular/2.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden md:flex mb-6">
            {/* Left Section: Text Content */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h1 className="text-[20px] font-[700] text-brand-primary nunito-sans-heading mb-3">
                A Cleaning Service that Cares for Your Home
              </h1>
              <p className="text-gray-700 text-base sm:text-lg nunito-sans-text mb-6 leading-relaxed">
                Every house service is unique, which is why our employees are
                encouraged to take a personalised approach. Besides, different
                clients require different service packages, and fully satisfying
                your needs is our top priority. The ability to modify the
                standard set of tasks is a major benefit of using eMop's
                professional cleaning services in England. When the plan is
                tailored to your needs, you are paying precisely for the package
                you need. However, there are certain things our professionals
                can't do. For example, we don't lift or move heavy objects, do
                ironing, or clean the back garden. If you want to discuss
                add-ons in detail, we are always happy to answer your questions
                about one off deep cleaning.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden md:flex mb-6">
            {/* Left Section: Text Content */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <h1 className="text-[20px] sm:text-[20px] lg:text-[40px] font-[700] text-brand-primary nunito-sans-heading mb-6">
                Appreciate the Benefits of Domestic Cleaners
              </h1>

              <p className="text-gray-700 text-base sm:text-lg mb-6 nunito-sans-text leading-relaxed">
                If you're looking for reliable house cleaning services in
                London, eMop is an excellent option. We offer our customers a
                wide range of house cleaning solutions, and we're always looking
                for new ways to improve them. That is why eMop is a reliable
                platform for hiring expert cleaners.
              </p>

              <ul className="text-gray-700 space-y-2 mb-4">
                {displayedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mr-3 text-brand-secondary">
                      {/* Purple square-like bullet, using a simple SVG or a div */}
                      <svg
                        className="w-3 h-3 mt-1.5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <rect
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          rx="4"
                          ry="4"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* "3 more" / "See less" button */}
              {allFeatures.length > initialFeaturesToShow && (
                <button
                  onClick={toggleFeaturesVisibility}
                  className="text-brand-secondary font-semibold text-left self-start hover:underline focus:outline-none">
                  {showAllFeatures
                    ? "See less"
                    : `${allFeatures.length - initialFeaturesToShow} more`}
                </button>
              )}
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden md:flex mb-6">
            {/* Left Section: Text Content */}
            <div className="md:w-1/2 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src="https://www.emop.co.uk/static/redesign/images/services/regular/6.jpg"
                alt="Cleaned bedroom"
                className="w-full h-full object-cover object-center rounded-lg md:rounded-l-none"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaned room image not found.";
                }}
              />
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6 leading-relaxed">
                Working people need to take care of multiple tasks every single
                day. As a result, cleaning becomes a lower priority, and this
                can lead to a dirty and/or disorganised home. To avoid that,
                hire someone to do the hard work. This will have a positive
                effect on your mental and physical well-being. eMop provides
                excellent cleaning services, which will make you wonder why you
                didn't do it sooner. It is quick, convenient, and affordable.
                You will be surprised by how much a spotless living space can
                improve the quality of your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="font-sans antialiased bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold nunito-sans-heading text-brand-primary mb-10 text-center">
            Frequently asked questions
          </h1>

          <div className="space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-[#f7f7ff] rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full flex gap-[10px] items-center p-5 sm:p-6 text-left focus:outline-none bg-[#f7f7ff] hover:bg-gray-200 transition duration-300"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={openItemId === item.id}
                  aria-controls={`faq-content-${item.id}`}>
                    <div className="p-4 bg-white shadow-xl rounded-[50%]">
                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                      openItemId === item.id ? "rotate-180" : ""
                    }`}
                  />
                    </div>
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.question}
                  </span>
                </button>
                <div
                  id={`faq-content-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  style={{
                    maxHeight: openItemId === item.id ? "500px" : "0", // Increased max-height for longer content
                    opacity: openItemId === item.id ? 1 : 0,
                    transition:
                      "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                  }}
                  className="overflow-hidden p-5 sm:p-6 pt-0 text-gray-700" // Added pt-0 to prevent double padding top
                >
                  <p className="mt-4">{item.answer}</p>{" "}
                  {/* Added mt-4 for spacing */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: More content to show page structure */}
        <section className="w-full flex flex-col items-center justify-center mt-10"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        >
          <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[40px] text-brand-primary">
          Cleaning Is No Longer <br />
          Your Burden
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-purple-300 max-w-md w-full">
                <div className="flex items-center flex-grow p-2">
                  <MapPin className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter your post code here"
                    className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    aria-label="Enter your postcode"
                  />
                </div>
                <button
                  onClick={handlePostcodeApi}
                  className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                  QUOTE ME
                </button>
              </div>

          

        </section>
      </div>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Home;
