// import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { Check, MapPin, Star } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ServiceCarousel } from "../components/CardComponent";
import { CostCard } from "../components/Postcode";
import { HowItWorksSection } from "../components/HowItWorks";
import { Sofa } from "lucide-react";
import { ProfessionalsCarousel } from "../components/Professional";
import { RatingCarousel } from "../components/ratingCard";
import axiosInstance from '../api/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import ServiceCard from "../components/ServiceCard";
import CallToActionSection from "../components/CallToAction";
import WhyChooseSection from "../components/WhyChooseSection";
import ContentBlock from "../components/ContentBlock";
import { regularCleaningBlocks, reliableExpertsContent, caringServiceContent } from '../data/cleaningContent';
import slide1 from '../assets/images/slide-1.png'
import slide2 from '../assets/images/slide-2.png'
import slide3 from '../assets/images/slide-3.png'
import slide4 from '../assets/images/slide-4.png'
import slide5 from '../assets/images/slide-5.png'
import slide6 from '../assets/images/card-7.png'
import card1 from '../assets/images/card-1.jpg'
import card2 from '../assets/images/card-2.jpg'
import card3 from '../assets/images/card-3.jpg'
import card4 from '../assets/images/card-4.jpg';
import card5 from '../assets/images/card-5.png';
import home from '../assets/images/main-banner-removebg-preview.png'
import office from '../assets/images/office-cleaning.png'
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
        "First, ask for recommendations from friends or family living in the city. They can help you identify good options. Second, check online directories and review sites to see what others have said about different cleaners in England. That can give you a good idea of who to contact and who to avoid. Finally, you can also contact a trusted company like De-Gemini and choose from our top-rated professionals.",
    },
    {
      id: "uk-cleaners-cost",
      question: "How much do UK cleaners cost?",
      answer:
        "The price of hiring a home professional in the UK will range between £8 to £20 per hour. De-Gemini offers great prices, and that's why it's economical for you to go with us. When you hire through De-Gemini, we guarantee that all our employees are highly trained and vetted for your safety and peace of mind. The average hourly rate for a general service in De-Gemini is £17 per hour. This covers tasks such as tidying, dusting, vacuuming, wiping down surfaces and carpets, and cleaning toilets. However, it's always best to check with the cleaners beforehand to see what is included in their package.",
    },
    {
      id: "hire-per-week",
      question: "How much is it to hire someone per week in the UK?",
      answer:
        "A weekly cleanse for a home costs in the range of £48 to £92 for a four-hour service. You can check the average cost for a four-hour session done by a cleaner from De-Gemini here, though it varies depending on your location and property size. Many cleaners, whether they work for a prominent company or are self-employed, extend discounts to those who avail of their service regularly.",
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
        "It is not necessary to clean before a cleaner arrives. De-Gemini cleaners are used to working in homes that are not perfectly clean, and they will be able to adjust their approach accordingly.",
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

  const [postcode, setPostcode] = useState<string>("");
  const [openItemId, setOpenItemId] = useState<string | null>(null);

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

  const cleaningServicesData: Array<{
    title: string;
    description: string;
    services: string[];
    mainImageUrl: string;
    imageAlt: string;
    smallIconUrl?: string;
    initialItemsToShow?: number;
    imagePosition: 'left' | 'right';
    SmallIconComponent?: React.ElementType;
  }> = [
    {
      title: "Bedroom, living, dining, office rooms",
      description: "Our cleaning England services include:",
      services: [
        "Dusting and wiping of all accessible surfaces.",
        "Vacuuming carpets and mopping hard floors.",
        "Cleaning mirrors and glass surfaces.",
        "Emptying trash bins and replacing liners.",
        "Making beds and tidying up living areas.",
        "Cleaning light fixtures and ceiling fans.",
        "Wiping down doors and door frames.",
        "Sanitizing high-touch areas (light switches, doorknobs).",
      ],
      mainImageUrl: card5,
      imageAlt: "Cleaned living room and bedroom",
      smallIconUrl: '',
      initialItemsToShow: 2,
      imagePosition: 'right' as 'right',
    },
    {
      title: "Halls and stairs",
      description: "Our cleaning England services include:",
      services: [
        "Dusting all accessible surfaces.",
        "Vacuuming and mopping stairs and landings.",
        "Cleaning mirrors and glass surfaces and the front door (inside).",
        "Wiping down railings and banisters.",
        "Removing cobwebs.",
      ],
      mainImageUrl: card2,
      imageAlt: "Cleaned hall and stairs",
      smallIconUrl: '',
      initialItemsToShow: 2,
      imagePosition: 'left' as 'left', // Explicitly type as 'left'
    },
    {
      title: "Kitchen",
      description: "As you know, the kitchen is one of the most difficult rooms to clean in a England house. So, here are all the tasks we perform in the kitchen.",
      services: [
        "Cleaning and sanitizing countertops.",
        "Wiping down appliance exteriors (microwave, oven, fridge).",
        "Cleaning sink and taps.",
        "Wiping down cabinet exteriors.",
        "Mopping floors.",
        "Emptying trash bins.",
        "Cleaning inside microwave.",
        "Wiping down backsplash.",
      ],
      mainImageUrl: card3,
      imageAlt: "Cleaned kitchen",
      smallIconUrl: '',
      initialItemsToShow: 2,
      imagePosition: 'right' as 'right',
    },
    {
      title: "Bathroom",
      description: "Bathrooms require regular and meticulous servicing to maintain a sanitary space. So, our cleaners come with all the necessary equipment to clean yours perfectly.",
      services: [
        "Cleaning and disinfecting toilet, shower, and sink.",
        "Wiping down mirrors and fixtures.",
        "Mopping floors.",
        "Cleaning grout lines.",
        "Wiping down cabinet exteriors.",
        "Emptying trash bins.",
        "Replenishing toilet paper and hand soap (if provided).",
      ],
      mainImageUrl: card4,
      imageAlt: "Cleaned bathroom",
      smallIconUrl: '',
      initialItemsToShow: 2,
      imagePosition: 'left' as 'left',
    },
    {
      title: "Office",
      description: "Keeping your office clean promotes a healthier and more productive environment. Our office cleaning services include:",
      services: [
        "Dusting and wiping desks and office equipment.",
        "Vacuuming carpets or mopping hard floors.",
        "Emptying trash bins.",
        "Cleaning and sanitizing common areas (breakrooms, restrooms).",
        "Wiping down accessible surfaces.",
        "Cleaning glass partitions and windows.",
      ],
      mainImageUrl: card1,
      imageAlt: "Cleaned office space",
      smallIconUrl: '',
      initialItemsToShow: 2,
      imagePosition: 'right' as 'right',
    },
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
        "The flexibility of working with De-Gemini has still allowed me to still keep to my lifestyle. I pickup jobs when needed and work around my schedule. I love the freedom this job gives me, and I always strive to deliver excellent results to my clients.",
    },
    {
      id: 4,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-4.jpg",
      name: "Veronika",
      rating: 4.9,
      description:
        "Hello from Veronika, I am really glad to have found De-Gemini, working with my colleagues have really improved my cleaning skills and made me a better professional. I enjoy the team spirit and continuous learning opportunities.",
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
      id: 6,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-6.jpg",
      name: "Alberto",
      rating: 4.7,
      description:
        "As an aspiring actor, De-Gemini allows me to work flexibly and around my film schedules. The pay is really great and the training is excellent.",
    },
    {
      id: 7,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-7.jpg",
      name: "Silvie",
      rating: 4.7,
      description:
        "Hi, my name is Silvie and I have more than 5 years experience as a cleaner. Let me help you to make your home spotless. 😊",
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const serviceData = [
    {
      imageSrc: slide1,
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, De-Gemini provides comprehensive deep cleaning in England and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
    },
    {
      imageSrc: slide2,
      altText: "Upholstery cleaning",
      title: "Upholstery cleaning",
      price: "from £19/h",
      description:
        "The upholstery service from De-Gemini eliminates visible surface dirt, such as dust and grime. Our team in England will use specialised stain-removal chemicals to get rid of any discolouring on your furniture. The solution offered by De-Gemini includes the elimination of offensive odours, which can be a major issue if you have pets in your house.",
    },
    {
      imageSrc: slide3,
      altText: "Regular cleaning",
      title: "Regular cleaning",
      price: "from £19/h",
      description:
        "In addition to providing you with thorough one off cleaning for your home at a time and day that suits you, our regular house cleaning service sends a professional to your home each week to give you peace of mind and guarantee that your preferred routine is clearly established.",
    },
    {
      imageSrc: slide4,
      altText: "Deep cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        " For an extra-through clean of your home, De-Gemini provides complete deep cleaning in England and its surroundings. When you enter into a service agreement, our team can significantly reduce your workload.",
    },
    {
      imageSrc: slide6,
      altText: "Domestic Cleaning",
      title: "Deep cleaning",
      price: "from £19/h",
      description:
        "For an extra deep clean of your home, De-Gemini provides comprehensive deep cleaning in England and the surrounding areas. While a one-off service agreement will significantly reduce the clutter in your home, you may also want to use our regular services if you have a busy lifestyle.",
    },
    {
      imageSrc: office,
      altText: "Office cleaning",
      title: "Office cleaning",
      price: "from £19/h",
      description:
        "You may rely on our company to keep your England office spotless. The frequency and duration of our visits are totally up to you, even if you need us multiple days a week.",
    },
    {
      imageSrc: slide5,
      altText: "End of tenancy cleaning service",
      title: "End of tenancy cleaning service",
      price: "from £19/h",
      description:
        "If you're preparing to leave your leased home, you can benefit from our practical end-of-tenancy packages. We typically send two professionals to your home to do this job, and they are properly outfitted and educated to adhere to a specific protocol that satisfies the requirements of landlords.",
    },
  ];

  const [error, setError] = useState('')

  // Postcode API handler
  const handlePostcodeApi = async () => {
    setError('')
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
    setError('Please enter a postcode.')
      return;
    }
  
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
  
      
      console.log(res.data);
  
       // Check if the API returned a valid area
    if (res.data?.area) {
      toast.success(`Postcode found: ${res.data.area}`);
      navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
    } else {
      toast.error('Invalid postcode or area not found.');
    }

  } catch (err: any) {
    const msg = err?.response?.data?.message || err.message || 'An error occurred';
    toast.error(msg);
    setError(msg)
  }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
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
        <div className="px-4 sm:px-6 lg:px-8">
      <section className="flex items-center justify-center max-w-7xl mx-auto relative overflow-hidden">
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
            <h1 className="text-4xl mt-4 sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
              Best Cleaning
              <br />
              Services In England
            </h1>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-brand-primary">
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
              <p className="text-red-500 text-lg">{error}</p>
          </div>

          <div className="w-full mb-1 lg:w-1/2 flex justify-center">
            <img
              src={home}
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
        {/* Curvy white overlay at the bottom */}
        <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none z-20">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[80px]" preserveAspectRatio="none">
            <path d="M0,100 C360,100 1080,0 1440,100 L1440,100 L0,100 Z" fill="#f7f7f7" />
          </svg>
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
            <p className="text-sm md:text-xl text-gray-700 flex items-center">
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
      <section className="font-sans antialiased py-4 max-w-7xl mx-auto">
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
              onQuoteMeClick={handlePostcodeApi}
            />
          </div>

          <CostCard
            title="One-off domestic cleaning"
            price="from £19/h"
            text="-"
            inputPlaceholder="Enter your full post code here"
            buttonText="QUOTE ME"
            onQuoteMeClick={handlePostcodeApi}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto mb-4">
        <HowItWorksSection />
      </section>

      <h1 className="text-center text-brand-primary nunito-sans-heading text-[32px] font-[800] mb-5">
        What is included in De gemini cleaning?
      </h1>

      <section className="py-10">
      
      {cleaningServicesData.map((cardData, index) => (
        <ServiceCard
          key={index}
          title={cardData.title}
          description={cardData.description}
          services={cardData.services}
          mainImageUrl={cardData.mainImageUrl}
          imageAlt={cardData.imageAlt}
          initialItemsToShow={cardData.initialItemsToShow}
          imagePosition={cardData.imagePosition}
        />
      ))}
    </section>
      
      {/* google section */}
      <section className="w=full mt-[2rem]">
        <div className="flex items-center justify-center gap-[6px]">
          <img
            src="https://www.emop.co.uk/static/images/google-icon.png"
            alt="google"
            className="w-[3rem]"
          />
          <h1 className="text-brand-primary text-[30px] font-[700]">
            Google score 4.1
          </h1>
        </div>
        <div className="mt-[2rem]">
        <RatingCarousel ratings={ratings} />
        </div>
      </section>

      {/* Professionals */}
      {/* <section className="max-w-7xl mx-auto py-10">
  <h1 className="text-start sm:pl-6 lg:pl-8 text-brand-primary nunito-sans-heading text-[30px] font-[700] mb-3">
    Meet Our Professionals
  </h1>
  <ProfessionalsCarousel professionals={dummyProfessionals} />
</section> */}

      {/* Why choose?? */}
      <div className="mt-[3rem]">
        <WhyChooseSection/>
      </div>

      {/* additional */}
      <section
        className="max-w-7xl mx-auto"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/img/domestic-background.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="font-sans antialiased min-h-screen py-16">
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-blue-900 max-w-md w-full">
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
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold nunito-sans-heading text-brand-primary text-center mb-12">
        Expert Cleaning Services in England
        </h2> */}
        {regularCleaningBlocks.map((block, index) => (
          <ContentBlock
            key={index}
            mainTitle={index === 0 ? "Expert Cleaning Services in EngLand" : undefined} 
            {...block}
          />
        ))}
      </section>

      {/* FAQ */}
      <div className="font-sans antialiased min-h-screen py-16 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
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
        <div className="mt-[3rem]">
        <CallToActionSection/>
        </div>
      </div>
        </div>
      
    </div>
  );
};

export default Home;
