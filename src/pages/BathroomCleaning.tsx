









import { ChevronDown, MapPin, Star } from "lucide-react";
import Banner from "../components/Banner";
import ImageSlider from "../components/ImageSlider";
import { ProfessionalsCarousel } from "../components/Professional";
import { useState } from "react";
import { HowItWorksSection } from "../components/HowItWorks";
import { DeepPriceCard } from "../components/DeepPriceCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../constants";
import { toast, ToastContainer } from "react-toastify";

export default function BathroomCleaning() {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  interface ServiceItem {
    id: string;
    name: string;
    link: string;
  }

  const services: ServiceItem[] = [
    { id: "1", name: "Regular cleaning", link: "/regular-cleaning" },
    { id: "2", name: "Deep cleaning", link: "/services/deep-cleaning" },
    { id: "3", name: "Office cleaning", link: "/services-office-cleaning" },
    {
      id: "4",
      name: "End of Tenancy cleaning",
      link: "/services/end-of-tenancy-cleaning",
    },
    { id: "5", name: "Carpet cleaning", link: "/services/carpet-cleaning" },
    {
      id: "6",
      name: "Upholstery cleaning",
      link: "/services/upholstery-cleaning",
    },
    { id: "7", name: "Same Day cleaning", link: "/services/same-day-cleaning" },
    {
      id: "8",
      name: "Kitchen Deep Cleaning",
      link: "/services/kitchen-deep-cleaning",
    },
    { id: "9", name: "Rug Cleaning", link: "/services/rug-cleaning" },
    { id: "10", name: "Move in cleaning", link: "/services/move-in-cleaning" },
    {
      id: "11",
      name: "Bathroom cleaning",
      link: "/services/bathroom-cleaning",
    },
    {
      id: "12",
      name: "Mattress cleaning",
      link: "/services/mattress-cleaning",
    },
    { id: "13", name: "Spring cleaning", link: "/services/spring-cleaning" },
  ];

  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };
  interface FAQItemData {
    id: string;
    question: string;
    answer: string;
  }

  const faqData: FAQItemData[] = [
    {
      id: "charge-per-hour",
      question: "Do cleaners provide equipment / products?",
      answer:
        "If you do not have your own equipment/ products, please request a cleaner to the equipmentor products. You will be charged additionally for an order with the equipment/products.",
    },
    {
      id: "house-cost",
      question:
        "Why is the estimated price for the cleaning more than what I chose?",
      answer:
        "The minimum duration of the job is 3 hours. If the cleaner finishes early, please give them another task.",
    },
    {
      id: "pay-perp-clean",
      question:
        "I need a quotation for end of tenancy / one off / carpet (combined) order",
      answer:
        "Please request a quote on our website simply entering your postcode. Please add all items you need to be cleaned and you will receive the quotation for the service.",
    },
    {
      id: "standard-cleaning-price",
      question:
        "Is there a guarantee of a refund if the job isn't done up to standard?",
      answer:
        "According to De-Gemini policy we do not provide any refunds. However, in case of any complaint, we will investigate the case, review the evidence and get back to you with a proposed solution in accordance with De-Gemini policy. The full description of the complaint followed by picture evidence will be requested.",
    },
    {
      id: "get-confirmation",
      question: "When will I get confirmation for my booking?",
      answer:
        "As soon as you make a booking it becomes available to all cleaners in the De-Gemini platform. The time of the booking confirmation depends on the availability of the cleaners in the area and the type of the cleaning you request. De-Gemini team will contact you if there is no availability for the chosen time and offer you the closest available time of the cleaning.",
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

  const HouseCleaning = [
    "When customers enter your office, their first impressions matter. If the office space is clean, tidy and generally pleasant to be in, it sets your relationship with the customer on the right path. Our office cleaning service in England is here to help you present your business in the best",
    "possible light. An uncluttered, spotless work environment sends an important message to your customers as well as your employees. De-Gemini is dedicated to achieving and maintaining the highest standards when it comes to commercial cleaning services. Our crew of skilled office cleaners in England is composed of enthusiastic, committed experts. Our professional office cleaners have access to the training and education necessary to provide cleaning services that go above and beyond clients' expectations thanks to our staff training programs.",
  ];

  const whyChoose = [
    "Because of our high standards and quality service, we have a very high client retention rate.",
    "We provide dependable, quality office cleaning service with several convenient payment methods",
    "The majority of our customers come to us after a trusted referral from a previous customer.",
    "Our office cleaning services are reasonably, competitively priced, and provide excellent value",
    "We provide expert commercial cleaning services",
  ];

  const extraServices = [
    "Office equipment cleaning",
    "Bathroom washing and sanitizing",
    "Kitchen cleaning",
  ];

  const DifferentCleaning = [
    "Washing dishes",
    "Wiping down appliances",
    "Cleaning kitchen surfaces with the proper ecologically friendly products and techniques",
  ];

  const choosing = [
    "Stain removal with professional equipment",
    "Interior & exterior window cleaning",
    "Balcony cleaning",
    "Cleaning floors, vacuuming the carpets, mopping the floors, and wiping skirting boards",
  ];

  const payment = [
    "All of our office cleaning personnel are certified and covered by insurance",
    "To guarantee a high-quality clean, we provide all the cleaning materials and machinery",
    "We clean both inside and outside, any time you want",
    "We clean the microwave, oven, and refrigerator in the office",
    "We offer our office cleaning services at affordable prices",
  ];

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine how many items to show initially
  const initialItemsToShow = 6; // As observed in the screenshot for the visible portion
  const displayedServices = showAll
    ? allCleaningServices
    : allCleaningServices.slice(0, initialItemsToShow);
  const initialItemsForHall = 1;
  const displayedServicesForHall = showAll
    ? HouseCleaning
    : HouseCleaning.slice(0, initialItemsForHall);
  const initialItemsFordisplayWhyChoose = 2;
  const displayWhyChoose = showAll
    ? whyChoose
    : whyChoose.slice(0, initialItemsFordisplayWhyChoose);
  const initialItemsForExtraServices = 3;
  const displayExtraServices = showAll
    ? extraServices
    : extraServices.slice(0, initialItemsForExtraServices);
  const initialItemsForPayment = 2;
  const displayPayment = showAll
    ? payment
    : payment.slice(0, initialItemsForPayment);
  const initialItemsForDifferentCleaning = 3;
  const displayDifferentCleaning = showAll
    ? DifferentCleaning
    : DifferentCleaning.slice(0, initialItemsForDifferentCleaning);
  const initialItemsForChoosing = 2;
  const displayChoosing = showAll
    ? choosing
    : choosing.slice(0, initialItemsForChoosing);
  const sampleSlides = [
    {
      before:
        "https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg",
      after: "https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg",
    },
    {
      before:
        "https://www.emop.co.uk/static/redesign/images/comparison/2-2.jpg",
      after: "https://www.emop.co.uk/static/redesign/images/comparison/2-1.jpg",
    },
    {
      before:
        "https://www.emop.co.uk/static/redesign/images/comparison/3-2.jpg",
      after: "https://www.emop.co.uk/static/redesign/images/comparison/3-1.jpg",
    },
  ];

  const handleRegularQuote = (code: string) => {
    console.log(`Regular Cleaning Quote for: ${code}`);
  };

  const [postcode, setPostcode] = useState<string>("");

  const handleOneOffQuote = (code: string) => {
    console.log(`One-off Cleaning Quote for: ${code}`);
  };

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
      id: 5,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-6.jpg",
      name: "Alberto",
      rating: 4.7,
      description:
        "As an aspiring actor, De-Gemini allows me to work flexibly and around my film schedules. The pay is really great and the training is excellent.",
    },
    {
      id: 6,
      imageSrc:
        "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-7.jpg",
      name: "Silvie",
      rating: 4.7,
      description:
        "Hi, my name is Silvie and I have more than 5 years experience as a cleaner. Let me help you to make your home spotless. 😊",
    },
  ];

  const navigate = useNavigate()

  const handlePostcodeApi = async () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode.');
      return;
    }
  
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
  
      // Optional: log or inspect the API response
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
  }
  };
  
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      <ToastContainer
      position="top-right"
      rtl={true}
      autoClose={5000}
      draggable={true}
      pauseOnHover={true}
      />
      <Banner title="End of Tenancy Cleaning in England" />

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
      </section>

      {/* Professionals */}
      <section className="w-full px-4 mt-[3rem]">
        <h1 className="text-start ml-[3rem] text-brand-primary nunito-sans-heading text-[30px] font-[700]">
          Meet our Professionals
        </h1>
        <ProfessionalsCarousel professionals={dummyProfessionals} />
      </section>

      {/* Post code section */}
      <section className="font-sans antialiased bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[30px] font-[700] text-brand-primary nunito-sans-heading mb-8 md:mb-12">
          How much does a house cleaner cost in England
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="bg-gray-100 rounded-lg shadow-xl p-6 relative w-full max-w-sm mx-auto">
            <h1 className="text-brand-primary text-[30px] font-bold">
              What is included in deep cleaning in England?
            </h1>

            <ul className="mt-[3rem] flex flex-col gap-5">
              <li className="flex gap-3">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>

                <p>Dust all furniture including bottoms and sides</p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>

                <p>
                  Clean all glass surfaces including cleaning and disinfect
                  bathrooms
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                <p>
                  Cleaning appliances if requested and hoover or mop all floors
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>

                <p>Taking out the rubbish</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <DeepPriceCard onQuoteMeClick={handleRegularQuote} />
          </div>
        </div>
      </section>

      <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg w-full max-w-4xl mx-auto my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
          One-off deep cleaning service in England
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-8">
          Our standard cleaning service includes everything you need to get your
          home in order as quickly as possible. You can book additional services
          when you make your booking.
        </p>

        <div className="flex flex-col sm:flex-row w-full bg-white rounded-lg overflow-hidden shadow-md border border-purple-300 focus-within:border-brand-primary transition-colors duration-200">
          <div className="flex-grow p-3 md:p-4 flex items-center">
            <MapPin className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter your postcode here"
              className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-base md:text-lg"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              aria-label=""
            />
          </div>
          <button 
          onClick={handlePostcodeApi}
          className="bg-brand-primary hover:bg-blue-200 text-white font-semibold py-3 px-6 md:py-4 md:px-8 text-base md:text-lg transition duration-300 flex-shrink-0">
            Quote me
          </button>
        </div>
      </div>

      {/* How it works */}
      <section className="w-full mb-4">
        <h1 className="font-bold text-start ml-2 text-brand-primary text-[20px]">
          How De-Gemini cleaning service works
        </h1>

        <HowItWorksSection />
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

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
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

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
              Bespoke Service
            </h1>
            <p className="text-center nunito-sans-text">
              You can choose which rooms you wish us to clean and book only the
              services you need.
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

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
              Pay as You Go
            </h1>
            <p className="text-center nunito-sans-text">
              We charge clients only for the actual time a cleaner spends at
              your property.
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

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
              Last minute cleaning
            </h1>
            <p className="text-center nunito-sans-text">
              Need urgent cleaning? You can make a booking 4 hours in advance.
            </p>
          </div>
        </div>
      </section>

      <div className="p-4 max-w-5xl mx-auto mt-[4rem]">
        <h1 className="text-2xl font-bold text-brand-primary mb-4">Results</h1>
        <ImageSlider slides={sampleSlides} />
      </div>

      <section className="mt-[4rem] w-full flex flex-col items-center justify-center">
        <h1 className="text-brand-primary text-[25px] font-extrabold">
          One-off deep cleaning for all occasions
        </h1>

        <div className="grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-[10px] mt-[2rem]">
          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
              Annual one-time spring or autumn clean-ups
            </h1>
            <p className="text-brand-text mt-[1rem]">
              To remove the accumulated filth, dust, and allergens that have
              accumulated over time and ensure a fresh and clean living
              environment, one-time deep cleaning is required during the spring
              or autumn seasons.
            </p>
          </div>

          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
              When moving in or out of a rental property
            </h1>
            <p className="text-brand-text mt-[1rem]">
              Prior to moving into a new rental property, a one-time deep
              cleaning is necessary to sterilise the area, get rid of any
              lingering odors or stains, and guarantee a fresh start. To leave
              the house in good shape when leaving, a thorough cleaning is
              necessary.
            </p>
          </div>

          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
              Before and after an event or party
            </h1>
            <p className="text-brand-text mt-[1rem]">
              A one-time deep cleaning is essential before holding an event or
              party to make the space hospitable and hygienic for attendees.
              Deep cleaning is required after the event to get rid of any
              spills, stains, and general mess, and bring the area back to its
              pre-event cleanliness.
            </p>
          </div>
        </div>
      </section>

      <h1 className="text-brand-primary mt-[4rem] ml-[1rem] md:ml-[2rem] lg:ml-[3rem] mb-[2rem] text-2xl font-extrabold">
        Deep Cleaning Services with De-Gemini in England
      </h1>

      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/regular/1.jpg"
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

        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6"></div>

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
          {HouseCleaning.length > initialItemsForHall && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              As part of our regular cleaning packages, priority areas for our
              cleaners include
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayWhyChoose.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
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
          {whyChoose.length > initialItemsFordisplayWhyChoose && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>

        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/regular/2.jpg"
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

      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg"
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

        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Easily customised commercial cleaning service
            </h2>
          </div>

          <p className="text-brand-text mt-[1.5rem]">
            There are occasions when you don't require a specific service as
            part of your office cleaning, or you wish to include something
            extra. You might wish to adjust the cleaning schedule based on the
            kind of office you have or your demands at a particular moment. We
            provide a long list of commercial services in addition to the
            typical office cleaning packages, including:
          </p>

          <ul className="text-gray-700 space-y-2 mb-6 mt-3">
            {displayExtraServices.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
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
          {extraServices.length > initialItemsForExtraServices && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">We also provide</h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayChoosing.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-brand-primary font-extrabold text-base nunito-sans-text sm:text-lg mb-6">
                    {service}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {choosing.length > initialItemsForChoosing && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>

        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg"
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

      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg"
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

        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Cleaning service for office kitchen includes
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayDifferentCleaning.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-primary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-brand-primary font-extrabold text-base nunito-sans-text sm:text-lg mb-6">
                    {service}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {DifferentCleaning.length > initialItemsForDifferentCleaning && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

      <section className="w-full flex flex-col items-center justify-center mt-[3rem]">
        <div className="bg-[#f7f7ff] p-4 w-full">
          <h1 className="text-3xl text-brand-primary font-bold">
            Let the results amaze you!
          </h1>

          <p className="mt-[1rem]">
            Our cutting-edge cleaning techniques eliminate the need for
            chemicals that are bad for the environment and our people, while
            leaving your business clean and safe. Our level of service is
            extraordinary, and we are also kind to people and the environment.
            We take great pride in our tight working relationships with our
            clients. Don't pass up the chance to have expert cleaners handle
            your office's cleaning needs.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mt-[2rem] md:mt-[3rem] lg:mt-[5rem]">
        <h1 className="text-lg sm:text-xl lg:text-xl font-extrabold nunito-sans-heading text-brand-primary mb-10 text-start">
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

      <div className="w-full max-w-4xl mt-[4rem]">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl ml-4 font-semibold text-gray-800 mb-6 sm:mb-8 md:mb-10 text-center sm:text-left">
          Other services we provide
        </h2>

        {/* Services Grid */}
        <div className="flex flex-wrap ml-5 justify-center sm:justify-start gap-3 sm:gap-4 md:gap-5">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="
                inline-block
                px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
                text-sm sm:text-base font-medium
                text-brand-primary
                bg-purple-50
                rounded-full
                border border-purple-200
                hover:bg-purple-100 hover:border-purple-300
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50
                transition duration-300 ease-in-out
                shadow-sm hover:shadow-md
              "
              aria-label={`Learn more about ${service.name}`}>
              {service.name}
            </a>
          ))}
        </div>
      </div>

      {/* Optional: More content to show page structure */}
      <section
        className="w-full flex flex-col items-center justify-center mt-10"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
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
          <button onClick={handlePostcodeApi} className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
            QUOTE ME
          </button>
        </div>
      </section>
    </div>
  );
}
