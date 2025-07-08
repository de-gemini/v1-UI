


import { Check, ChevronDown, MapPin } from "lucide-react";
import { CostCard } from "../components/Postcode";
import { useState } from "react";
import { HowItWorksSection } from "../components/HowItWorks";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function CarpetCleaning() {
  const [postcode, setPostcode] = useState<string>("");
  const [openItemId, setOpenItemId] = useState<string | null>
  (null);


  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };


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
    "For eMop, the average professional carpet cleaning cost may start from £48 per hour. However, between £60 to £160 is the typical price range in the UK for booking a carpet cleaner. In addition, we describe the carpet cleaning prices in the UK's minimum, maximum, and median ranges.",
    "The size of the room, the state of the carpet, and the location all affect the typical carpet cleaning cost in the UK. Basic services cost between £30 and £50 for each room. It could cost more to use specialised cleaning methods like steam cleaning or spot treatment.",
    "To obtain the best offers in a highly competitive industry, comparing quotations from different providers is crucial. Prices can differ between regions.",
  ];

  const whyChoose = [
    {
        title: "Clear prices",
        description: "make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Any other local cleaning company may hide their carpet cleaning prices, but with eMop, you know the price of the professional carpet cleaning services at the moment of booking.",
      },
      {
        title: "Insured and accredited cleaners",
        description: "A thorough background check is carried out on our carpet cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK.",
      },
      {
        title: "-",
        description: "They are trained and have become professional carpet cleaners over time and can fit into any professional cleaning company. You can be sure to get professional carpet cleaning services when you choose eMop. If you also need end of tenancy cleaning services, eMop cleaners can help too.",
      },
  ];

  const extraServices = [
    {
      title: "The size of the carpet",
      description: "The cost is directly impacted by the amount of time and materials needed to clean a bigger carpet area. Compared to cleaning an entire home or a business, washing a tiny rug or a single room's carpet will be less expensive.",
    },
    {
      title: "Carpet material and condition",
      description: "Various cleaning methods and solutions are required for various carpet materials. Delicate or severely stained carpets would require specialised cleaning methods, which could raise the final cost. Older or seriously damaged carpets may require further care and cost more money.",
    },
    {
      title: "The cleaning method required",
      description: "Numerous carpet cleaning methods exist, including steam cleaning, dry cleaning, bonnet cleaning, hot water extraction method, and others. Each approach has a different price tag, with steam cleaning often costing more because it is so thorough and efficient.",
    },
  ];

  const carpetStain = [
    {
      title: "The kinds of stains and odors",
      description: "Strong cleaning products or multiple treatments may be required to get rid of difficult stains and lingering odours, which will raise the cost of the project.",
    },
    {
      title: "Accessibility",
      description: "Hiring professional carpet cleaners may require more money if the carpet is difficult to access or calls for unusual arrangements, such as moving furniture, due to the added work and time required.",
    },
    {
      title: "The location of your property",
      description: "Your location is important since some carpet or upholstery cleaning firms may charge more to travel to farther-flung places. The typical day fee in England is about £140, but businesses in the nearby districts only charge about £100 per day. If you live in England, you should prepare to spend extra.",
    },
    {
        title: "The location of your property",
        description: "Your location is important since some carpet or upholstery cleaning firms may charge more to travel to farther-flung places. The typical day fee in England is about £140, but businesses in the nearby districts only charge about £100 per day. If you live in England, you should prepare to spend extra.",
      },
  ];

  const payment = [
    "Here is a step-by-step breakdown of the procedure to better explain what professional carpet cleaning entails. The experts typically start by determining the carpet's pH level because this information helps them choose the appropriate chemicals to employ to avoid harming the delicate fabrics.",
    "If they're utilising a hot water extraction technique, the cleaners will next pre-treat and remove any stains. If they're cleaning a dry carpet, they'll often use a low-moisture cleaning powder.",
    "When the substance has had a chance to soak into the carpet, they will turn on their carpet cleaning machinery, which may include a rotating carpet cleaner or a dust and grime remover, to disperse the product throughout the carpet and give it a complete cleaning.",
    "After pouring a solution of shampoo and water into the carpet fibres while utilising the hot water extraction technique, the operator will hoover the dirt out of the carpet.",
    "The last step entails vacuuming up any loose debris and making sure all stains, especially tough ones, have been thoroughly removed."
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
  const initialItemsForExtraServices = 2;
  const displayExtraServices = showAll
    ? extraServices
    : extraServices.slice(0, initialItemsForExtraServices);
  const initialItemsForPayment = 3;
  const displayPayment = showAll
    ? payment
    : payment.slice(0, initialItemsForPayment);

    const initialItemsForCarpetStain = 3;
  const displayCarpetStain = showAll
    ? carpetStain
    : carpetStain.slice(0, initialItemsForCarpetStain);
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

  interface FAQItemData {
    id: string;
    question: string;
    answer: string;
  }

  const faqData: FAQItemData[] = [
    {
      id: "charge-per-hour",
      question: "Does a room have to be empty to clean the carpet?",
      answer:
        "No, the carpet does not need to be cleaned in an empty room. Even with furniture or other objects present, it is still possible to clean the carpet. Before cleaning, however, moving any obstructions like furniture may be more practical in order to provide comprehensive cleaning.",
    },
    {
      id: "house-cost",
      question: "Can heavily soiled carpet be cleaned?",
      answer:
        "Yes, it is possible to clean severely stained carpets. The beauty and cleanliness of the carpet can be restored by using professional carpet cleaning services and strong cleaning tools to remove stubborn stains and grime.",
    },
    {
      id: "pay-perp-clean",
      question: "How often should a property be deep cleaned?",
      answer:
        "The number of occupants, size, and desired level of cleanliness of a property are only a few of the factors that influence how frequently thorough cleanings should be carried out. Deep cleaning should typically be performed at least once or twice a year, though in some cases, especially in areas with high activity, it can be necessary to do so more frequently.",
    },
    {
      id: "standard-cleaning-price",
      question: "How often should I clean my carpets?",
      answer:
        "It definitely relies on a number of variables, including the age and condition of the carpet, as well as whether or not you have children or animals who like to make a mess. However, unless there are family members who have allergies, asthma, or other illnesses that affect their ability to breathe, once a year is usually sufficient.",
    },
    {
        id: "vaccum-cleaning",
        question: "Should I vacuum after carpet cleaning?",
        answer:
          "Vacuuming is advised following carpet cleaning, yes. In order to keep your carpet looking new and preserving its longevity, vacuuming helps to remove any leftover dirt, debris, or loose fibres that may have been loosened during the cleaning procedure.",
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
    <div className="min-h-screen bg-background-gray overflow-x-hidden w-full">
      <ToastContainer
      position="top-right"
      rtl={true}
      autoClose={5000}
      draggable={true}
      pauseOnHover={true}
      />
      {/* Hero Section Container */}
      <section className="flex items-center justify-center w-full mt-[2rem] px-4 max-w-7xl mx-auto">
        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
            Carpet Cleaning
              <br />
              prices in England
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
                />
              </div>
              <button onClick={handlePostcodeApi} className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                QUOTE ME
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center"></div>
        </div>
      </section>

      {/* Post code section */}
      <section className="font-sans antialiased mt-[3rem] mb-[3rem] bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-[30px] font-[700] text-brand-primary nunito-sans-heading mb-8 md:mb-12">
        How Much Are Carpet Cleaning Prices in England?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="Carpet cleaning"
              price="from £48"
              text="Through a variety of cleaning techniques, filth, stains, and allergens are removed from carpets to enhance their appearance, hygienic quality, and durability. They include vacuuming the carpet, scrubbing dirt and stains out of it, and using a carpet washer to wash the carpet. in England, carpet cleaning prices start at £48 per hour."
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handlePostcodeApi}
            />
          </div>

        </div>
      </section>

      <h1 className="text-brand-primary ml-[1rem] md:ml-[2rem] lg:ml-[3rem] text-xl">
        How much does a cleaner cost?
      </h1>

      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/professional-first.jpg"
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
          <div className="flex items-center text-brand-secondary nunito-sans-heading mb-6">
            
          </div>

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
            Which Factors Form Carpet Cleaning Prices?
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayExtraServices.map((service, index) => (
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
                  {service.title}
                </p>

                <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
                  {service.description}
                </p>

                </div>
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

        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/carpet/9.jpg"
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
            src="https://www.emop.co.uk/static/redesign/images/services/carpet/8.jpg"
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
            
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayCarpetStain.map((service, index) => (
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
                  {service.title}
                </p>

                <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
                  {service.description}
                </p>

                </div>
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {carpetStain.length > initialItemsForCarpetStain && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary font-semibold text-left self-start hover:underline focus:outline-none">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </div>
      </div>

     


      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        
          {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/carpet/3.jpg"
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
            What's Involved in Cleaning Carpets?
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayWhyChoose.map((payment, index) => (
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
                  {payment.title}
                </p>

                <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
                  {payment.description}
                </p>

                </div>
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

        
      </div>


      

      <section className="w-full mb-4">
        <HowItWorksSection />
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
  );
}
