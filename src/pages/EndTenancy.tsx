import { Check, ChevronDown, MapPin } from "lucide-react";
import { CostCard } from "../components/Postcode";
import { useState } from "react";
import { HowItWorksSection } from "../components/HowItWorks";
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EndTenancy() {
  const [postcode, setPostcode] = useState<string>("");
  const [openItemId, setOpenItemId] = useState<string | null>
  (null);
  const navigate = useNavigate();

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
    "There are a number of variables that can affect the cost of end of tenancy cleaning. First and foremost, the size of the property is important. Larger properties cost more, since cleaning them takes more time, labor, and resources.",
    "Second, the property's condition is quite important. In comparison to a property that needs a thorough deep cleaning to get it back to its original cleanliness, cleaning a well-maintained property may be easier and less expensive.",
    "The number of rooms and other areas that need to be cleaned, such as the number of bathrooms, kitchens, and living spaces, is another consideration. The price might also be affected by the existence of particular objects that need special maintenance, like professional carpet or upholstery cleaning.",
    "OA price rise may also result from the addition of extra services like oven cleaning, fridge, ironing, microwave, bed making, outdoor cleaning, laundry, kitchen, bookcase and window cleaning.",
    "eMop may charge more if you need urgent or same-day cleaning services because we may need to add more workers or adjust their timetable.",
    "Last but not least, end of tenancy cleaning prices may differ depending on where the property is located. A professional cleaning service agency should be consulted to provide exact tenancy cleaning quotes based on these variables.",
  ];

    const extraServices = [
      {
        title: "Clear prices",
        description: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Most cleaning companies may hide their service costs, but for eMop, you know the price of the professional cleaning services at the moment of booking.",
      },
      {
        title: "Pay-as-you-go approach",
        description: "Your bank account will be put on hold to cover the projected cost of your reservation. You will only be charged for the time a tenancy cleaner actually worked after the cleaning session is over. You only pay for the actual time they spent cleaning your home.",
      },
      {
        title: "Insured and accredited cleaners",
        description: "A thorough background check is carried out on our end of tenancy cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK. They are trained and have become professional cleaners over time and can fit into any professional cleaning company. You can be sure to get professional end of tenancy cleaning services when you choose eMop. If you need office cleaning also, eMop cleaners can help also.",
      },
    ];

    const DifferentCleaning = [
      {
        title: "Location of the office",
        description: "Location has a significant impact on office cleaning costs per hour, just like it does for other services. Office cleaning costs in England and other major UK cities can range from £17 to £20, including a one-time cleaning fee. A difference in labour costs, transportation costs, and cost of living depending on where the office space is located can affect cleaning prices.",
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

    const choosing = [
      {
        title: "Clear prices",
        description: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Any other local cleaning company may hide their office cleaning costs, but with eMop, you know the price of the professional cleaning services at the moment of booking.",
      },
      {
        title: "Pay-as-you-go approach",
        description: "The estimated amount of your reservation will be deducted from your bank account. After the cleaning session is finished, you will only be billed for the time the office cleaner(s) actually worked. Only the time that was actually spent cleaning your workplace is charged.",
      },
      {
        title: "Insured and accredited cleaners",
        description: "A thorough background check is carried out on our commercial cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK. They are trained and have become professional cleaners over time and can fit into any professional cleaning company. You can be sure to get professional office cleaning services when you choose eMop. If you also need domestic cleaning services, eMop cleaners can help.",
      },
    ];

  const payment = [
    "Depending on the expert service you pick and what services they offer, the specifics of an end of tenancy clean will vary. Normally, your home will receive a deep clean, including dusting and cleaning any cabinets, cupboards, and drawers by a professional cleaner to remove any stains.",
    "The sinks, bathtubs, and showers will be scrubbed clean, as well as any en suite bathrooms, and the tiles will be cleaned to get rid of any mold. In-depth limescale removal cleaning will be performed on the shower head.",
    "Deep cleaning of all surfaces, including the floors, walls, skirting boards and ceilings, is typically part of the procedure. Ovens, refrigerators, washing machines, and other kitchen appliances all receive thorough interior and exterior cleaning.",
    "The fixtures, tiles, and grout in bathrooms and kitchens go through a thorough cleaning and disinfection process. In addition to completely vacuuming or steam cleaning the carpets and furniture, windows, frames, and sills are cleaned. All areas are dusted, and cobwebs are also removed.",
    "Hiring an end of tenancy cleaning team normally guarantees that the home is left in immaculate shape for the subsequent tenants and may encompass other particular activities as needed."
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
  const initialItemsForPayment = 1;
  const displayPayment = showAll
    ? payment
    : payment.slice(0, initialItemsForPayment);
  const initialItemsForDifferentCleaning = 2;
  const displayDifferentCleaning = showAll
    ? DifferentCleaning
    : DifferentCleaning.slice(0, initialItemsForDifferentCleaning);
  const initialItemsForChoosing = 2;
  const displayChoosing = showAll
    ? choosing
    : choosing.slice(0, initialItemsForChoosing);
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
      question: "Do I need to pay a deposit?",
      answer:
        "Payment according to end of tenancy cleaning prices is made on our website via a secure 3rd-party provider. Funds will only be taken from your card once the job has been completed. However, please note that as soon as the booking is confirmed, the estimated amount of the job is pre-authorised on your card to be sure the payment will go through after the cleaning job is completed.",
    },
    {
      id: "house-cost",
      question: "Can you provide an accurate estimate for my clean?",
      answer:
        "This is possible when you provide us with the necessary information about your property. Information like the size of your property, the general state of the apartment or property, additional services you require, and the number of cleaners you need, etc. will help us give you an accurate estimate for your cleaning need.",
    },
    {
      id: "pay-perp-clean",
      question: "Are there any supplementary costs?",
      answer:
        "If you place an order that includes equipment, there will be an extra fee. When placing an order, please ask the cleaner to include all the cleaning materials if you don't have your own equipment. Extra costs may be added for additional services like window, oven, fridge, bookcase, carpet cleaning, etc.",
    },
    {
      id: "standard-cleaning-price",
      question: "Do you charge VAT?",
      answer:
        "Prices may include VAT unless it is clearly stated otherwise in the estimated cost.",
    },
  ];

  const handleQuoteMeClick = async () => {
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
    <div className="min-h-screen bg-whiteoverflow-x-hidden w-full">
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
      <section className="flex items-center justify-center w-full mt-[2rem] px-4 max-w-7xl mx-auto">
        {/* Content Container */}
        <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
              End of tenancy cleaning
              <br />
              prices
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
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
              <button
                onClick={handleQuoteMeClick}
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
        End of tenancy professional cleaning cost
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
          <div className="relative">
            <div className="absolute z-50 top-1 inline-block bg-yellow-400 text-yellow-900 text-sm sm:text-base font-semibold px-4 py-2 rounded-md shadow-md mb-8 ml-0 sm:ml-4 -mt-4 transform -rotate-1">
              Cashback up to £150
            </div>
            <CostCard
              title="End of Tenancy cleaning"
              price="from £19"
              text="An end of tenancy cleaning service is a professional cleaning and maintenance task carried out at the conclusion of a rental contract. In order to get the place ready for new renters, it attempts to bring it back to its pre-damage state while maintaining cleanliness and fixing any issues in the entire property."
              inputPlaceholder="Enter your full post code here"
              buttonText="QUOTE ME"
              onQuoteMeClick={handleRegularQuote}
            />
          </div>
        </div>
      </section>

      <h1 className="text-brand-primary ml-[1rem] md:ml-[2rem] lg:ml-[3rem] text-xl">
      Average price for end of tenancy cleaning
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
          eMop's average office cleaning cost is £17/h. The frequencies are listed below:
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

          <p className="text-gray-700 text-base nunito-sans-text sm:text-lg mb-6">End of tenancy cleaning prices for a one-bedroom apartment normally costs between £100 and £200 in the UK. The price might range from £150 to £300 or more for bigger homes like two- or three-bedroom apartments. Based on the number of bedrooms, bathrooms, and total square footage, the price might vary dramatically and be very competitive.</p>


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
            <h2 className="text-xl sm:text-2xl font-bold">What Determines the Price of End of Tenancy Cleaning?</h2>
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
            src="https://www.emop.co.uk/img/borough-2.jpg"
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
            src="https://www.emop.co.uk/img/borough-3.jpg"
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
            <h2 className="text-xl sm:text-2xl font-bold">What does an end of tenancy cleaning price include?</h2>
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
                {service}
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


      <div className="max-w-7xl mx-auto mt-[2.5rem] md:mt-[4rem] lg:mt-[5rem] bg-white rounded-lg shadow-lg overflow-hidden md:flex">

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
