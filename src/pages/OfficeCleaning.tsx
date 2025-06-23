import { Check, ChevronDown, MapPin } from "lucide-react";
import { CostCard } from "../components/Postcode";
import { useState } from "react";
import { HowItWorksSection } from "../components/HowItWorks";

export default function OfficeCleaning() {
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
    "Next day: £19/h",
    "Same day: £29/h",
    "Peak: £20/h",
    "Night: £29/h",
    "End of tenancy: £39",
  ];

  const whyChoose = [
    "The primary responsibility of an office cleaner is to perform general cleaning tasks close to the office. Frequently, you will mention to the person or business what cleaning duties you want the office cleaners to carry out.",
    "These chores include sweeping, dusting, vacuuming, mopping, emptying trash cans, and more. If you have a bathroom and kitchen area, the toilets will be cleaned and bleached, and the floors will be mopped. The kitchen will be wiped down and the stove will be cleaned.",
    "Along with offering a general clean, a deep clean will emphasise improving the level of hygiene. The cleaners will get rid of stubborn stains and/or grime, and enhance the general hygienic conditions in your office.",
    "ORegular office cleanings can be done in accordance with your needs; depending on the size of the workplace and the number of staff you recruit, you might need a cleaner to come in every day, every two days, or every three days.",
    "Cleaners generally operate outside of regular business hours, such as early in the morning or late in the afternoon, to reduce disruption to daily office operations. However, the cleaning contract ought to mention the hours.",
    "To be clear, everything listed below is included in our office cleaning service. This includes dusting every piece of furniture, washing every glass surface, vacuuming and mopping the floors, removing the trash, and doing tests for ATP and hygiene.",
  ];

    const extraServices = [
      {
        title: "Size of the office",
        description: "The size of the office has the most noticeable effect on cleaning expenses. Larger spaces necessitate more time, manpower, and cleaning materials, which inevitably drives up the overall cost. Larger offices incur higher costs because cleaning fees are often calculated based on square footage.",
      },
      {
        title: "Frequency of cleaning",
        description: "How frequently cleaning services are employed has the biggest impact on costs. Cleaning an office on a daily basis will be more expensive than doing so once or twice a week. The cleaning schedule can be modified in accordance with the requirements and cost constraints of the office.",
      },
      {
        title: "Type of cleaning",
        description: "Cleaning requirements differ depending on the type of workplace. As an illustration, a creative agency with an open floor design could require more frequent cleaning than a law firm with private offices.",
      },
      {
        title: "Specialized equipment and correct cleaning products",
        description: "It may be necessary to use specialised cleaning tools and solutions on specific office supplies and surfaces, which will raise the overall cost. For instance, expensive furniture or fragile gadgets may require extra cleaning care.",
      },
    ];

    const DifferentCleaning = [
      {
        title: "Location of the office",
        description: "Location has a significant impact on office cleaning costs per hour, just like it does for other services. Office cleaning costs in London and other major UK cities can range from £17 to £20, including a one-time cleaning fee. A difference in labour costs, transportation costs, and cost of living depending on where the office space is located can affect cleaning prices.",
      },
      {
        title: "Quality of service",
        description: "Although reputable cleaning companies may charge more, their services are of higher quality and are more dependable. A reputable cleaning business can help you achieve greater outcomes and a cleaner workplace.",
      },
      {
        title: "Extra services",
        description: "Do you desire a thorough cleaning of your office? What floor are you on exactly? Typical services include carpet cleaning, tidying work surfaces, disinfecting touchpoints, emptying trash cans, and cleaning surfaces, metalwork, and furniture to remove visible grime and dust. A difference in labour costs, transportation costs, and cost of living depending on where the office space is located can affect cleaning prices.",
      },
    ];

  const payment = [
    "This service means that payment on our website is handled by a safe third-party supplier. Once the job is finished, your card won't be charged until then. It's quite practical to pay as you go for cleaning solutions.",
    "Without committing to a lengthy contract, you can utilise it to clean your property or place of business. You make the necessary payments, and the cleaners then arrive and take care of everything.",
    "For customers who may want a flexible and non-committing cleaning solution, this may be a fantastic choice."
  ];

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine how many items to show initially
  const initialItemsToShow = 6; // As observed in the screenshot for the visible portion
  const displayedServices = showAll
    ? allCleaningServices
    : allCleaningServices.slice(0, initialItemsToShow);
  const initialItemsForHall = 0;
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
  const initialItemsForDifferentCleaning = 2;
  const displayDifferentCleaning = showAll
    ? DifferentCleaning
    : DifferentCleaning.slice(0, initialItemsForDifferentCleaning);
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
      question: "How do I get good cleaners in London?",
      answer:
        "House cleaners charge from £19/h for one-off cleanings and from £19/h for regular cleanings in London.",
    },
    {
      id: "house-cost",
      question: "How much does it cost to hire a house cleaner in London?",
      answer:
        "The cost of hiring a house cleaner in London depends on factors such as the type of service,location, experience and additional tasks. For basic cleaning you can expect to pay £16-£20 per hour or £16-£80 per visit for a flat or house. Prices are higher for one-off deep cleanings.",
    },
    {
      id: "pay-perp-clean",
      question: "How much money should you get for cleaning the whole house?",
      answer:
        "For a full house cleaning in London, a reasonable rate is £100-£200 for an average sized house requiring standard cleaning services. Larger homes, additional services such as laundry or windows, and poor condition requiring extensive cleaning can significantly increase the expected rate.",
    },
    {
      id: "standard-cleaning-price",
      question: "What’s included in standard cleaning at this price?",
      answer:
        "Standard cleaning services include vacuuming, mopping floors, cleaning bathrooms and kitchens, dusting surfaces and taking out the rubbish. For an average home, this would include a general cleaning of all rooms, plus basic tasks such as cleaning interior windows and loading/unloading dishwashers.",
    },
  ];

  return (
    <div className="min-h-screen bg-whiteoverflow-x-hidden w-full">
      {/* Hero Section Container */}
      <section className="flex items-center justify-center w-full mt-[2rem] px-4 max-w-7xl mx-auto">
        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
              Office cleaning prices
              <br />
              in London
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
                />
              </div>
              <button className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
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
        What is the price of office cleaning?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="Office cleaning"
              price="from £19"
              text="Professional cleaning and maintenance services for workplaces and other business settings are part of our office cleaning service. Vacuuming, dusting, sanitising toilets, and maintaining a neat space for staff and customers are among the duties carried out by eMop cleaners."
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handleRegularQuote}
            />
          </div>
        </div>
      </section>

      <h1 className="text-brand-primary ml-[1rem] md:ml-[2rem] lg:ml-[3rem] text-xl">
      Types of office cleaning and their costs
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
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            
          </div>

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
          Vacuuming and mopping the floors, washing the windows, cleaning the bathrooms (cleaning the sink, wiping the mirrors, cleaning the toilet and bath), organising the workstations and cleaning the pantry are all regular cleaning duties.
          </p>

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
          A routine cleaning package also takes care of difficult-to-reach areas including workstations, chairs, light switches, remote controls, panels, screens, doors, floors, stairs, walls, and other furniture in a busy office.

Deep cleaning these areas typically requires specialised tools and/or techniques, which lengthens the process and increases the cost.
          </p>

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">
          eMop’s average office cleaning cost is £17/h. The frequencies are listed below:
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
            <h2 className="text-xl sm:text-2xl font-bold">What's included in office cleaning?</h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayWhyChoose.map((service, index) => (
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
            src="https://www.emop.co.uk/static/redesign/images/services/office/1.jpg"
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

      {/* Different */}

      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">
        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/static/redesign/images/services/office/5.jpg"
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
            What factors affect office cleaning costs?
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
      </div>


      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">

        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayDifferentCleaning.map((service, index) => (
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
          {DifferentCleaning.length > initialItemsForDifferentCleaning && (
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
            src="https://www.emop.co.uk/static/redesign/images/services/office/6.jpg"
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

        {/*Left Section: Image */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center text-brand-primary nunito-sans-heading mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">
            Are materials included in the price?
            </h2>
          </div>

          Please be aware that cleaners only have the cleaning materials needed to properly clean general-purpose surfaces, so if you'd like, you can add it on. While most characters respond favourably to these items, others may require particular cleaning agents that we do not offer.
Due to this, we are unable to guarantee the efficacy of our standard cleaning products. When placing a booking with your domestic cleaner, be sure to specify if you need anything like a hoover, vacuum cleaner, or a mop. For this equipment, you will be charged more.
        </div>


        {/*Right Section: Text Content */}
        <div className="md:w-1/2 overflow-hidden">
          <img
            src="https://www.emop.co.uk/img/borough-4.jpg"
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
            src="https://www.emop.co.uk/img/borough-5.jpg"
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
            Try our pay as you go service
            </h2>
          </div>

          <ul className="text-gray-700 space-y-2 mb-6">
            {displayPayment.map((payment, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 mr-3 text-brand-secondary">
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
                {payment}
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
                  className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                  QUOTE ME
                </button>
              </div>

          

        </section>

    </div>
  );
}
