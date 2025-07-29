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
import card1 from '../assets/images/Services/Kitchen/4.avif'
import card2 from '../assets/images/Services/Office/4.avif'
import card3 from '../assets/images/Services/Kitchen/4.avif'
import card4 from '../assets/images/Services/Bathroom/6.avif';
import card5 from '../assets/images/Services/SittingRoom/4.avif';
import card6 from '../assets/images/Services/SittingRoom/7.avif';
import home from '../assets/images/main-removebg.png'
import office from '../assets/images/office-cleaning.png'
import 'react-toastify/dist/ReactToastify.css';
import CommonPostcodeInput from '../components/commons/CommonPostcodeInput';
import HomeHeroSection from '../components/HomeHeroSection';
import CommonFAQ from "../components/commons/CommonFAQ";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

import dirtyKitchen from '../assets/images/Services/Kitchen/dirty-kitchen.jpg'
import dirtBathroom from '../assets/images/Services/Bathroom/dirty-bathroom.jpg'
import dirtySittingroom from '../assets/images/Services/SittingRoom/dirty-sittingRoom.jpg'
import { defaultFAQ } from "../data/faqData";

import before1 from '../assets/images/before.jpeg'
import before2 from '../assets/images/before2.jpeg'
import before3 from '../assets/images/before3.jpg'
import before4 from '../assets/images/before4.jpg'
import before5 from '../assets/images/before5.jpg'
import before6 from '../assets/images/before3.jpeg'
import before7 from '../assets/images/before7.jpg'
import before8 from '../assets/images/before8.jpg'
import before9 from '../assets/images/before9.jpg'

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
        "The price of hiring a home professional in the UK will range between £19 to £25 per hour. De-Gemini offers competitive prices while maintaining high quality standards. When you hire through De-Gemini, we guarantee that all our employees are highly trained and vetted for your safety and peace of mind. The average hourly rate for a general service in De-Gemini is £22 per hour. This covers tasks such as tidying, dusting, vacuuming, wiping down surfaces and carpets, and cleaning toilets. However, it's always best to check with the cleaners beforehand to see what is included in their package.",
    },
    {
      id: "hire-per-week",
      question: "How much is it to hire someone per week in the UK?",
      answer:
        "A weekly cleanse for a home costs in the range of £76 to £100 for a four-hour service. You can check the average cost for a four-hour session done by a cleaner from De-Gemini here, though it varies depending on your location and property size. Many cleaners, whether they work for a prominent company or are self-employed, extend discounts to those who avail of their service regularly.",
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
      review: "I booked a deep cleaning for the kitchen with De-gemini and was really impressed. The cleaner arrived on time, worked efficiently, and did an amazing job. Highly recommended!",
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
      icon: "https://www.emop.co.uk/img/linens-icon.png",
      title: "Mattress cleaning", 
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
      title: "Bedroom, Living Room, Dining Room, and Office Cleaning",
      description: "Our cleaning services in England include:",
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
      title: "Office Cleaning",
      description: "Keeping your office clean promotes a healthier and more productive environment. Our office cleaning services include:",
      services: [
        "Dusting and wiping desks and office equipment.",
        "Vacuuming carpets or mopping hard floors.",
        "Emptying trash bins.",
        "Cleaning and sanitizing common areas (breakrooms, restrooms).",
        "Wiping down accessible surfaces.",
        "Cleaning glass partitions and windows.",
      ],
      mainImageUrl: "https://media.gettyimages.com/id/518333440/photo/office-cleaning-contractors.jpg?s=612x612&w=0&k=20&c=8L42nfzmz10Bge74TGq5ZR9HuW37Z-3izzHYzg-rAS8=",
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
      title: "Domestic Cleaning",
      price: "from £19/h",
      description:
        "Experience a sparkling clean home with our tailored domestic cleaning services. Whether it’s a one-time tidy or scheduled upkeep, we adapt to your lifestyle and home needs.",
    },
    {
      imageSrc: slide2,
      altText: "Upholstery Cleaning",
      title: "Upholstery Cleaning",
      price: "from £19/h",
      description:
        "Revive your sofas, armchairs, and other upholstered items with our advanced stain and odor removal treatment. Ideal for homes with kids or pets.",
    },
    {
      imageSrc: slide3,
      altText: "Regular Cleaning",
      title: "Regular Cleaning",
      price: "from £19/h",
      description:
        "Our recurring cleaning plans ensure your home stays fresh week after week. We follow your preferred routine with a reliable, friendly cleaner.",
    },
    {
      imageSrc: "https://media.gettyimages.com/id/1417035212/photo/soaking-and-washing-furniture.jpg?s=612x612&w=0&k=20&c=9yTjWw7rPP2DP6fdqmEpxHImWIZEi79RB1UZtp0Qmco=",
      altText: "Deep Cleaning",
      title: "Deep Cleaning",
      price: "from £19/h",
      description:
        "Get your home ready for the season with our deep cleaning service. Perfect for decluttering and removing dust build-up in hard-to-reach places.",
    },
    {
      imageSrc: slide5,
      altText: "End of Tenancy Cleaning",
      title: "End of Tenancy Cleaning",
      price: "from £19/h",
      description:
        "Secure your deposit with our detailed move-out cleaning. Our team follows a landlord-approved checklist to ensure your place is spotless and inspection-ready.",
    },
    {
      imageSrc:"https://media.gettyimages.com/id/2158719646/photo/janitors-cleaning-the-floor-in-school-hallway.jpg?s=612x612&w=0&k=20&c=-XG-hNji6xZzsjrvEqHpwWN7V76iqrpfRx1bET1UMdM=",
      altText: "Commercial Cleaning",
      title: "Commercial Cleaning",
      price: "from £19/h",
      description:
        "Maintain a pristine and productive business environment with our commercial cleaning services. We tailor our solutions for offices, retail spaces, and more—ensuring a spotless, hygienic workplace that leaves a lasting impression on clients and staff.",
    },
    {
      imageSrc: "https://media.gettyimages.com/id/1659313537/photo/young-woman-vacuuming-her-apartment.jpg?s=612x612&w=0&k=20&c=yvp7xobRlLrR6kqzwXNccQrqC2RT7EQbut0VSb6oXG8=",
      altText: "Carpet cleaning",
      title: "Carpet Cleaning",
      price: "from £19/h",
      description:
        "Post-renovation mess? We’ll handle it. Our after-builders cleaning service clears dust, paint, and debris so your property looks brand new again.",
    },
    {
      imageSrc: office,
      altText: "Office Cleaning",
      title: "Office Cleaning",
      price: "from £19/h",
      description:
        "Keep your workspace professional and hygienic. From desks to restrooms, we offer flexible cleaning plans for offices of all sizes across England.",
    },
    {
      imageSrc: "https://media.gettyimages.com/id/2172863431/photo/classroom-cleaning-crew.jpg?s=612x612&w=0&k=20&c=wIdNK92jKA9d6wBJ_nRczPLV7nGdR4mzykX12aqiedo=",
      altText: "School Cleaning",
      title: "School Cleaning",
      price: "",
      description:
        "Ensure a safe and healthy environment for students and staff. Our trusted school cleaning services cover classrooms, restrooms, and common areas—tailored to your schedule.",
    },
    {
      imageSrc: "https://media.gettyimages.com/id/1226174497/photo/owner-in-the-bookstore-during-covid.jpg?s=612x612&w=0&k=20&c=bt5lBzhNYv9AxOMHOGj8-t6v0qN3fd8RMNGOkZXy0o4=",
      altText: "Retail Cleaning",
      title: "Retail Cleaning",
      price: "",
      description:
        "Make a lasting impression on customers with spotless retail spaces. From shop floors to fitting rooms, our flexible cleaning solutions keep your store looking its best.",
    }
    
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
      <div className="px-6 sm:px-16">
        <HomeHeroSection features={features} error={error} home={home} />
        {/* Carousel section */}
        <section
          className="w-full"
          style={{
            backgroundImage: `url('https://www.emop.co.uk/img/wave.png')`,
          }}>
          <div className="font-sans antialiased bg-blue-50/50 ">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary text-center py-10">
              Our Featured Services
            </h2>
            <ServiceCarousel services={serviceData} />
            <div className=""></div> {/* Spacer for demonstration */}
          </div>
        </section>

      {/* Post code section */}
      <section className="font-sans antialiased py-4 max-w-7xl mx-auto">
        <h1 className="text-[30px] font-[700] text-brand-primary nunito-sans-heading mb-8 md:mb-12">
          How much does a house cleaner cost in England?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="Regular house cleaning"
              price="from £19/h"
              
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handlePostcodeApi}
            />
          </div>

          <CostCard
            title="One-off domestic cleaning"
            price="from £19/h"
            
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
      


      {/* Before/After Slider Section */}
      {/* Single Image Slider Section */}
      <section className="w-full mt-[2rem]">
        <BeforeAfterSlider
          title="See the Difference"
          subtitle="We make your space look absolutely sparkling"
          mode="single"
          slides={[
            {
              image: before7,
              title: 'Kitchen Deep Clean',
              description: 'Spotless kitchen after our deep cleaning service.'
            },
            {
              image: before2,
              title: 'Bathroom Transformation',
              description: 'A sparkling bathroom, every time.'
            },
            {
              image: before3,
              title: 'Living Room Refresh',
              description: 'Enjoy a fresh, clean living space.'
            },
            {
              image: before4,
              title: 'Bedroom Makeover',
              description: 'Transform your bedroom into a peaceful sanctuary.'
            },
            {
              image: before5,
              title: 'Office Space Clean',
              description: 'Professional cleaning for your workspace.'
            },
            {
              image: before6,
              title: 'Carpet Deep Clean',
              description: 'Revitalize your carpets with our deep cleaning service.'
            },
            {
              image: before1,
              title: 'Upholstery Refresh',
              description: 'Restore your furniture to its original beauty.'
            },
            {
              image: before8,
              title: 'Window Cleaning',
              description: 'Crystal clear windows for a brighter home.'
            },
            {
              image: before9,
              title: 'Complete Home Transformation',
              description: 'Comprehensive cleaning for your entire home.'
            },
            {
              image: "https://i.pinimg.com/736x/a1/68/d8/a168d8b06f7d88b31c2124f3390fab9f.jpg",
              title: 'Regular Cleaning',
              description: 'Professional regular cleaning service for your home.'
            },
            {
              image: "https://i.pinimg.com/736x/aa/ef/92/aaef9211e04e9fec7d3c8c28cb5e266a.jpg",
              title: 'Bathroom & Regular Cleaning',
              description: 'Comprehensive bathroom and regular cleaning services.'
            },
            {
              image: "https://i.pinimg.com/1200x/aa/96/c9/aa96c98dcaf60759f9a5225df5623d3b.jpg",
              title: 'Upholstery Cleaning',
              description: 'Professional upholstery cleaning and restoration.'
            },
            {
              image: "https://i.pinimg.com/736x/fd/d4/e3/fdd4e3d051ef314197546dcb990f9aee.jpg",
              title: 'Mattress Cleaning',
              description: 'Deep mattress cleaning for a healthier sleep environment.'
            },
           
            {
              image: "https://i.pinimg.com/1200x/aa/96/c9/aa96c98dcaf60759f9a5225df5623d3b.jpg",
              title: 'Move-in Cleaning',
              description: 'Complete move-in cleaning service for new homes.'
            },
            {
              image: "https://i.pinimg.com/736x/1e/14/d8/1e14d80935abe7f8aea12b15aac1c6fd.jpg",
              title: 'Deep Cleaning Service',
              description: 'Comprehensive deep cleaning for your entire property.'
            },
          
            {
              image: "https://i.pinimg.com/1200x/cd/9e/20/cd9e205f09a742b3ee3557d736a23ea1.jpg",
              title: 'End of Tenancy Cleaning',
              description: 'Thorough end of tenancy cleaning service.'
            },
            
            {
              image: "https://i.pinimg.com/736x/e4/4c/b6/e44cb67893a39f0f4e96bce3da288964.jpg",
              title: 'Carpet Deep Clean',
              description: 'Deep carpet cleaning and restoration service.'
            },
            {
              image: "https://i.pinimg.com/1200x/de/3d/01/de3d01912195340eeae49add36873415.jpg",
              title: 'Spring Cleaning',
              description: 'Comprehensive spring cleaning service.'
            },
            {
              image: "https://i.pinimg.com/736x/21/27/41/2127410c52c44267c14667ea833ade84.jpg",
              title: 'Same Day Cleaning',
              description: 'Fast and efficient same day cleaning service.'
            },
          ]}
        />
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
              
                <CommonPostcodeInput />
              
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

      <section className="py-16 ">
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

      
        <CommonFAQ faqData={defaultFAQ} />

        </div>
      
    </div>
  );
};

export default Home;
