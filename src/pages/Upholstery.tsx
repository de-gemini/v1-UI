import { Check, ChevronDown, MapPin } from "lucide-react";
import { CostCard } from "../components/Postcode";
import { useState } from "react";
import { HowItWorksSection } from "../components/HowItWorks";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function CarpetCleaning() {
  const [postcode, setPostcode] = useState<string>("");
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const allCleaningServices = [
    "We frequently ignore our upholstery until we spill something or see a significant stain. Your upholstery should be cleaned for more than just spills and stains. Over time, the dust and filth on your sofa and chairs may accumulate.",
    "Many individuals consider their sofa to be an essential component of their house. In addition to using it as seats, individuals might also use it as a location to store things or to unwind. If your sofa needs cleaning, you might be wondering how to approach the task.",
    "In order to restore the appearance of a soiled or unclean sofa, more effort will be needed. During a deep cleaning, all dirt, stains, and damage will most likely be removed from the sofa along with it. If you're only seeking to clean your sofa, attempt to locate less expensive choices first because this may frequently be pretty pricey.",
    "There is no need to pay for professional cleaning services if your furniture is in good shape. In reality, a lot of people perform this task on their own every few months or years because it is manageable and doesn't require a lot of effort or resources.",
    "However, if your furniture begins to show indications of deterioration, it's crucial to get it inspected by a professional sofa cleaning expert so that any necessary upholstery treatment may be completed before it sustains further harm.",
  ];

  const HouseCleaning = [
    "A two-seater fabric sofa may be cleaned with steam for, on average, £35",
    "A three-seater fabric sofa may be cleaned with steam for an average of £45",
    "An L-shaped four seater sofa will be cleaned with steam for an average of £55",
  ];

  const whyChoose = [
    {
      title:
        "Regardless of whether you require a one-time clean or regular cleaning services, eMop professional cleaners will go above and beyond your expectations.",
      description:
        "We've cleaned a lot of sofas over the years, and we don't consider any job to be too big or small. In all of our activities, at eMop, we place a high priority on quality, using only the best cleaning products and disinfection techniques.",
    },
    {
      title:
        "Your house is safe with us since we are completely covered by insurance, including fidelity guarantee, public and products liability, and employer's responsibility. You don't need to be home to allow our staff in to clean because we are an insured company. If you are looking to get the best upholstery cleaning services, eMop is the agency to call.",
      description: "-",
    },
    {
      title:
        "Due to the Pay As You Go billing model we use, the upholstery cleaning rates only be charged for the actual time upholstery cleaners spend on your property. You will pay less if the cleaning service is finished sooner than anticipated.",
      description:
        "If the cleaning work went longer than expected, it will attract an extra sofa cleaning cost, but never more than an additional hour.",
    },
  ];

  const extraServices = [
    {
      title: "The size of the carpet",
      description:
        "The cost is directly impacted by the amount of time and materials needed to clean a bigger carpet area. Compared to cleaning an entire home or a business, washing a tiny rug or a single room's carpet will be less expensive.",
    },
    {
      title: "Carpet material and condition",
      description:
        "Various cleaning methods and solutions are required for various carpet materials. Delicate or severely stained carpets would require specialised cleaning methods, which could raise the final cost. Older or seriously damaged carpets may require further care and cost more money.",
    },
    {
      title: "The cleaning method required",
      description:
        "Numerous carpet cleaning methods exist, including steam cleaning, dry cleaning, bonnet cleaning, hot water extraction method, and others. Each approach has a different price tag, with steam cleaning often costing more because it is so thorough and efficient.",
    },
  ];

  const carpetStain = [
    {
      title: "The kinds of stains and odors",
      description:
        "Strong cleaning products or multiple treatments may be required to get rid of difficult stains and lingering odours, which will raise the cost of the project.",
    },
    {
      title: "Accessibility",
      description:
        "Hiring professional carpet cleaners may require more money if the carpet is difficult to access or calls for unusual arrangements, such as moving furniture, due to the added work and time required.",
    },
    {
      title: "The location of your property",
      description:
        "Your location is important since some carpet or upholstery cleaning firms may charge more to travel to farther-flung places. The typical day fee in England is about £140, but businesses in the nearby districts only charge about £100 per day. If you live in England, you should prepare to spend extra.",
    },
    {
      title: "The location of your property",
      description:
        "Your location is important since some carpet or upholstery cleaning firms may charge more to travel to farther-flung places. The typical day fee in England is about £140, but businesses in the nearby districts only charge about £100 per day. If you live in England, you should prepare to spend extra.",
    },
  ];

  const payment = [
    "The majority of sofa cleaning costs are calculated per item. Your sofa cleaning prices can be significantly reduced if there is only one item that needs to be cleaned",
    "The entire cost of washing your sofa will depend on its size, with 2-seater sofas naturally being less expensive to clean than 4-seaters or L-shaped sofas.",
    "A professional cleaner may charge more if your sofa contains delicate or specialty materials since they may need specialised cleaning solutions or tools to finish the task and especially to guarantee stain protection.",
  ];

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine how many items to show initially
  const initialItemsToShow = 1; // As observed in the screenshot for the visible portion
  const displayedServices = showAll
    ? allCleaningServices
    : allCleaningServices.slice(0, initialItemsToShow);
  const initialItemsForHall = 1;
  const displayedServicesForHall = showAll
    ? HouseCleaning
    : HouseCleaning.slice(0, initialItemsForHall);
  const initialItemsFordisplayWhyChoose = 1;
  const displayWhyChoose = showAll
    ? whyChoose
    : whyChoose.slice(0, initialItemsFordisplayWhyChoose);
  const initialItemsForExtraServices = 2;
  const displayExtraServices = showAll
    ? extraServices
    : extraServices.slice(0, initialItemsForExtraServices);
  const initialItemsForPayment = 2;
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
      question: "How Often Should You Hire Upholstery Cleaning Services?",
      answer:
        "Usage and household conditions determine how frequently you should use upholstery cleaning services. For routine maintenance, it is often advised every 12 to 24 months. Areas with high traffic may require more frequent cleaning, whereas those with little traffic can go longer. To avoid damage and maintain hygiene, stains and odours must receive rapid care.",
    },
    {
      id: "house-cost",
      question: "Is it worth cleaning a sofa?",
      answer:
        "It is worthwhile to clean a sofa, yes. Its lifespan is increased by routine cleaning in addition to maintaining its attractiveness. It makes the living space healthier by removing dirt, allergies, and odours. Additionally, paying a professional cleaner can be less expensive than prematurely replacing a sofa due to negligence.",
    },
    {
      id: "pay-perp-clean",
      question: "Can a fabric sofa be cleaned?",
      answer:
        "Fabric sofas can be cleaned, yes. Fabric couches can benefit from the efficient removal of grime, stains, and odours by professional upholstery cleaning services. Additionally, DIY techniques like vacuuming and spot cleaning can help keep them looking good. Your fabric sofa's lifespan can be increased and its appearance preserved with routine washing.",
    },
    {
      id: "standard-cleaning-price",
      question: "How long does it take to wash a sofa?",
      answer:
        "Size, fabric type, and cleaning technique all influence how long it takes to wash a sofa. Typically, professional upholstery cleaning requires 1-2 hours per sofa. DIY cleaning could take longer because drying time adds to the process. Multiple washing sessions and more time may be needed to remove difficult stains or really dirty sofas.",
    },
    {
      id: "vaccum-cleaning",
      question: "How do you clean an expensive fabric sofa?",
      answer:
        "When washing an expensive fabric sofa, remove trash with a hoover, test a spot with a mild cleaning solution and then use delicate cleaning techniques. Blot spills instead of rubbing them, and let the area entirely air dry. Consider hiring a professional upholstery cleaner for fragile fabrics.",
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
      {/* Hero Section Container */}
      <section className="flex items-center justify-center w-full mt-[2rem] px-4 max-w-7xl mx-auto">
        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
              Sofa Cleaning Cost in
              <br />
              London
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
              <button 
              onClick={handlePostcodeApi}
              className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
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
          How much does professional sofa cleaning cost in England?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="Upholstery cleaning"
              price="from £48"
              text="A sofa cleaning service comprises maintaining and cleaning couches and sofas to get rid of stains, odours, and other impurities. The life of your furniture can be renewed and extended, and it frequently involves vacuuming, spot removal, and upholstery cleaning. Prices for sofa cleaning with eMop begin at £48/h in England."
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handlePostcodeApi}
            />
          </div>
        </div>
      </section>

      <h1 className="text-brand-primary ml-[1rem] md:ml-[2rem] lg:ml-[3rem] text-xl">
        What are the average upholstery cleaning prices?
      </h1>

      <div className="max-w-7xl mx-auto mt-4 bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/upholstery/2.jpg"
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
            <p>
              Sofa cleaning prices can range from £35 to over £100 depending on
              the size of the sofa. Also, the estimate you get from professional
              sofa cleaners will frequently be based on the kind of material
              your sofa is composed of.
            </p>
          </div>

          <h2 className="mb-6 nunito-sans-text font-bold text-lg">
            Fabric sofa cleaning prices
          </h2>
          <ul className="text-gray-700 space-y-2 mb-6">
            {displayedServicesForHall.map((service, index) => (
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

          <div className="flex flex-col gap-4">
            <p>
              TCleaning fabric couches is frequently a challenge. Simple stains
              on durable materials can be removed affordably by steam washing.
              Depending on the size of the sofa, the average cost to steam clean
              a sofa will be between £35 and £55 per sofa. If the fabric is
              delicate, a dry clean might be your only option for removing
              stains. The upholstery cleaning prices for dry cleaning methods
              might be ranging from £60 to £100.
            </p>
            <h2 className="font-bold nunito-sans-title">
              Leather sofa cleaning prices
            </h2>
            <p>
              Leather sofas often cost less to clean than other types of couches
              because the cleaning process requires significantly less manpower.
              Cleaning a two-seater leather couch will often cost £40, whilst a
              three-seater will typically cost £50.
            </p>
          </div>

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
              Factors affecting sofa cleaning costs
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayPayment.map((service, index) => (
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
          {payment.length > initialItemsForPayment && (
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
            src="https://www.emop.co.uk/static/redesign/images/services/upholstery/3.jpg"
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
            src="https://www.emop.co.uk/static/redesign/images/services/upholstery/4.jpg"
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
            <h2>Why Is It Important For My Sofa?</h2>
          </div>

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
                <div className="flex flex-col gap-2">
                  <p className="text-brand-primary font-extrabold text-base nunito-sans-text sm:text-lg mb-6">
                    {service}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* See more/See less button */}
          {allCleaningServices.length > initialItemsToShow && (
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
            <h2 className="text-xl sm:text-2xl font-bold">Why choose eMop?</h2>
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

        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/upholstery/5.jpg"
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-blue-800 max-w-md w-full">
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
