

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Instagram,
  Facebook,
  Pin,
} from "lucide-react"; // Icons for search, dropdown, and sidebar arrow

// Define interfaces for data structures
interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategoryData {
  id: string;
  title: string;
  faqs: FAQItemData[];
}


export default function Clients() {
    
  const faqCategories: FAQCategoryData[] = [
    {
      id: "general",
      title: "General",
      faqs: [
        {
          id: "general-1",
          question: "About eMop platform",
          answer: `eMop is an online app that connects customers and professional cleaners. eMop acts as a powerful platform arranging fast and high-quality service for the customers, where safety is our priority.

Cleaners work as independent cleaning partners. They access the eMop platform via eMop mobile App where they pick up customers’ orders that have been booked via the eMop website.`,
        },
        {
          id: "general-2",
          question: "What about the eMoppers' safety?",
          answer: `Cleaners and customers’ safety at work is our priority. Before cleaning we will provide you with the customer’s details, rating and feedback from other cleaners (unless the customer is new). Therefore, you will know what to expect. After the cleaning is completed, the customer’s account is automatically charged online. This avoids you taking cash and getting involved in any potential issues associated with non-payment. You will also have the opportunity to rate your customer after each job. If you feel unsafe at a customer’s home, please exit the property immediately and contact eMop via Telegram.`,
        },
        {
          id: "general-3",
          question: "How are eMoppers matched with customers?",
          answer:
            "When a customer books a cleaning service on the eMop Platform, their order becomes available for all cleaners who are ‘online’ on their eMop App. As soon as the cleaner accepts the job they are assigned to the booking, please note this is appointed on a first come first serve basis.",
        },
        {
          id: "general-4",
          question: "How can I contact eMop?",
          answer:
            "At eMop our best way of communication is via Text or an email emopper@emop.world. Before reaching out to us, please have a look at our FAQs for eMoppers on the website or in your Mobile App. It’s possible you may find your answer without having to wait for our response.",
        },
        {
          id: "general-5",
          question: "eMoppers Service Agreement",
          answer:
            "The eMoppers Service Agreement is the contract that governs the use of the platform for independent cleaners.  When you upload your documents on the website you must agree to the terms and conditions within that agreement.",
        },
        {
          id: "general-6",
          question: "Cancellation Policy",
          answer:
            "The eMop platform is designed to be as flexible as possible. We can understand that changes may occur. However, customers should not suffer because of last-minute cancellations by eMoppers. If you cancel a job less than 24 hours before the start time, you will be subject to late cancellation fees. You can find the eMoppers Cancellation Policy in your Service Agreement on the Mobile App.",
        },
      ],
    },
    {
      id: "Booking",
      title: "Booking",
      faqs: [
        {
          id: "booking-1",
          question: "How do I make a booking?",
          answer: `Bookings can only be completed via our website www.emop.co.uk and the payment is made via our secure payment provider. The booking process is very simple and only takes a few minutes to complete. To make a booking, we ask for some personal details (your name, phone number, your address) and your payment information (we accept payment by credit or debit card only). Please be aware that we will only charge you when the cleaning has been completed. However, when you make a booking, we will block out the estimated amount on your card to be sure your payment will be processed. After the cleaning, the final cost is charged to your card details, and the difference between the estimated and factual amount will be reflected as a refund or extra charge on your account.`,
        },
        {
          id: "booking-2",
          question: "Where can I find the booking ID?",
          answer: `The Booking/Order ID is a unique number that we use to track clients orders. You will receive your Booking ID in the confirmation email after completing the booking. Please use your Booking ID when you contact the Support Desk.`,
        },
        {
          id: "booking-3",
          question: "How can I reschedule a booking?",
          answer: `TIf you need to reschedule your booking for whatever reason, you can do it in My Account – and go to the Upcoming booking section, on our website.

Please be aware that you may be required to pay a fee for late rescheduling. Please see our Cancellation policy.`,
        },
        {
          id: "booking-4",
          question: "I need to cancel a booking",
          answer:
            "If you need to cancel your booking for whatever reason, you can do it in My Account and go to the ‘Upcoming bookings’ section on our website. Please be aware that you may be required to pay a fee for late cancellation. Please see our Cancellation policy. When you cancel a job a few hours before the start time or at the last minute, our eMoppers lose their income and it disrupts their schedule. Your cancellation fees cover cleaners’ compensation.",
        },
      ],
    },
    {
        id: "cleaning",
        title: "Cleaning Service",
        faqs: [
          {
            id: "cleaning-1",
            question: "What is included in the cleaning service?",
            answer: `Here you can review what the full eMop cleaning service is.`,
          },
          {
            id: "cleaning-2",
            question: "Do cleaners bring their own cleaning products?",
            answer: `Yes, if you purchase it as an add-on. Cleaners have all the required cleaning products for all different types of surfaces. These products work well on most surface types. However, some surfaces/stains may require specialist-cleaning products. In such cases, we cannot guarantee our cleaning products will be suitable for this.`,
          },
          {
            id: "cleaning-3",
            question: "Do you clean offices?",
            answer: `eMop does provide this service. If interested, please book.`,
          },
        ],
      },
      {
        id: "payment",
        title: "  Payment",
        faqs: [
          {
            id: "payment-1",
            question: "How do I pay for the cleaning?",
            answer: `We accept debit and credit cards only. Payment is made on our website via a secure 3rd party provider. Funds will only be taken from your card once the job has been completed.
However, please note that as soon as the booking is confirmed, the estimated amount of the job is pre-autorised on your card to be sure the payment will go through after the cleaning job is completed.`,
          },
          {
            id: "payment-2",
            question: "Can I pay for cleaning by cash?",
            answer: `We accept debit and credit cards only. Cash is not accepted in order to make the process safe and transparent.`,
          },
          {
            id: "payment-3",
            question: "I would like a receipt",
            answer: `Your receipt will be provided by email as soon as the job is complete. You can also download the VAT invoice from My Account.`,
          },
        ],
      },
      {
        id: "issues",
        title: "Solving issues with cleaners",
        faqs: [
          {
            id: "issues-1",
            question: "My cleaner never arrived",
            answer: `n this case, we will try to arrange a new booking at your convenience. In addition, a compensation will be added to your account automatically for the inconvenience.`,
          },
          {
            id: "issues-2",
            question: "I am not satisfied with the cleaning service",
            answer: `We do our best to make our clients happy and keep working on improving the quality of our service. However, if you are not satisfied with how your home was cleaned, please, let us know as soon as possible and tell us what exactly went wrong. Please write to our Support Desk, and attach photos to show us exactly what was wrong. Be advised that we cannot accept complaints later than 48 hours after the cleaning took place. After the investigation of the case, we may send one of our supervisors to re-clean the missed areas for free. eMop doesn’t provide any refunds for our service, that is why we strongly recommend:

If you are at home during the cleaning, always check how the job was done at the end of the cleaning. The cleaner will clean the places that you thought were not cleaned well enough again at your request.
If you are not home at the end of cleaning it might be more difficult to prove that the job was done incorrectly. Please be sure someone can check how the cleaning was done before the cleaner leaves your home.`,
          },
          {
            id: "issues-3",
            question: "The cleaner acted unprofessionally",
            answer: `Cleaners are required to maintain a high level of professionalism at all times. If the cleaner acted unprofessionally, that can have a negative effect on our clients’ trust. We apologize for this and encourage you to contact us ASAP by email and include a detailed description of what went wrong together with pictures etc.`,
          },
        ],
      }
  ];
      // State for search input
      const [searchTerm, setSearchTerm] = useState<string>("");
      // State for active category in sidebar (for scroll-based highlighting)
      const [activeCategory, setActiveCategory] = useState<string>("general");
      // State to manage open FAQ item
      const [openFAQId, setOpenFAQId] = useState<string | null>(null);
    
      // Refs for each content section
      const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    
      // Setup Intersection Observer for scroll-based active state
      useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
          root: null, // relative to the viewport
          rootMargin: "-50% 0px -50% 0px", // When the middle of the section is in viewport
          threshold: 0, // Trigger callback as soon as the element is visible
        };
    
        const observerCallback: IntersectionObserverCallback = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              // If the element is intersecting and its midpoint is near the center of the viewport
              setActiveCategory(entry.target.id);
            }
          });
        };
    
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions
        );
    
        // Observe all relevant sections
        faqCategories.forEach((category) => {
          const sectionElement = sectionRefs.current[category.id];
          if (sectionElement) {
            observer.observe(sectionElement);
          }
        });
    
        // Clean up observer on component unmount
        return () => {
          faqCategories.forEach((category) => {
            const sectionElement = sectionRefs.current[category.id];
            if (sectionElement) {
              observer.unobserve(sectionElement);
            }
          });
          observer.disconnect();
        };
      }, [faqCategories]); // Re-run if categories change (though unlikely for static data)
    
      // Filter FAQs based on search term (if implemented)
      const filteredFaqCategories = faqCategories.map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }));
    
      const handleSearch = () => {
        // In a real application, you might trigger a search API call here
        console.log("Searching for:", searchTerm);
        // For this example, filtering is already done reactively
      };
    
      const toggleFAQ = (id: string) => {
        setOpenFAQId(openFAQId === id ? null : id);
      };
    
      const scrollToCategory = (categoryId: string) => {
        const element = sectionRefs.current[categoryId];
        if (element) {
          // Scrolls to the element, slightly offset from the top to account for fixed header
          window.scrollTo({
            top: element.offsetTop - 100, // Adjust 100px based on your header height
            behavior: "smooth",
          });
          setActiveCategory(categoryId); // Manually set active when clicked
        }
      };
      return (
        <div className="font-sans antialiased bg-gray-50 text-gray-800">
            <nav className="bg-white p-8 flex items-center justify-center w-full">


    <div className=" w-[4rem] md:w-[5rem] lg:w-[7rem]">
    <a href="/" className="flex items-center">
          <h1 className='text-brand-primary  text-[40px]'>
          De Gemini Services LTD
          </h1>
        </a>
    </div>


</nav>
          {/* Header Section */}
          <section
            className="relative bg-gradient-to-br from-purple-700 to-indigo-800 py-20 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
            style={{
              backgroundImage:
                'url("https://www.emop.co.uk/help/wp-content/themes/emop_faq/static/images/general/bg.jpg")', // Placeholder background image
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
            {/* Overlay */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 drop-shadow">
                FAQ FOR CLIENTS
              </h1>
              <div className="flex w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-xl">
                <input
                  type="text"
                  placeholder="Search FAQ for help"
                  className="flex-grow p-4 text-lg text-gray-800 focus:outline-none rounded-l-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search FAQ"
                />
                <button
                  onClick={handleSearch}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold p-4 text-lg rounded-r-lg transition duration-300"
                  aria-label="Search">
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </section>
    
          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row py-10 px-4 sm:px-6 lg:px-8">
            {/* Left Sidebar Navigation */}
            <nav className="md:w-1/4 lg:w-1/5 md:sticky md:top-24 self-start pb-8 md:pb-0">
              {" "}
              {/* Adjusted top for fixed header */}
              <ul className="bg-[#2b2969] rounded-lg shadow-md p-4 space-y-2">
                {faqCategories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => scrollToCategory(category.id)}
                      className={`w-full flex items-center p-3 rounded-md text-left transition duration-200
                                  ${
                                    activeCategory === category.id
                                      ? "bg-yellow-400 text-gray-900 font-bold"
                                      : "text-white hover:bg-brand-primary"
                                  }`}>
                      <ChevronRight
                        className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                          activeCategory === category.id
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      />
                      {category.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
    
            {/* Right Content Area: FAQs */}
            <div className="md:w-3/4 lg:w-4/5 md:pl-10 mt-8 md:mt-0">
              {filteredFaqCategories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => (sectionRefs.current[category.id] = el)}
                  className="mb-12 pt-4">
                  {" "}
                  {/* Added pt-4 for top spacing */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-0">
                    {category.faqs.length > 0 ? (
                      category.faqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="bg-[#f5f9fc] rounded-none shadow-sm border-b border-[#cae8ff] overflow-hidden hover:shadow-lg">
                          <button
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none hover:bg-gray-50 transition duration-300"
                            onClick={() => toggleFAQ(faq.id)}
                            aria-expanded={openFAQId === faq.id}
                            aria-controls={`faq-answer-${faq.id}`}>
                            <span className="text-lg font-semibold text-gray-800">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                                openFAQId === faq.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            id={`faq-answer-${faq.id}`}
                            role="region"
                            aria-labelledby={`faq-question-${faq.id}`}
                            style={{
                              maxHeight: openFAQId === faq.id ? "500px" : "0", // Adjust max-height if content is very long
                              opacity: openFAQId === faq.id ? 1 : 0,
                              transition:
                                "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                            }}
                            className="overflow-hidden p-4 pt-0 text-gray-700">
                            <p className="mt-2">{faq.answer}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">
                        No FAQs found in this category or matching your search.
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
    
          {/* footer */}
          <footer
            className="relative text-gray-800 py-12 px-4 sm:px-6 lg:px-8"
            style={{
              backgroundImage: `url('https://www.emop.co.uk/static/images/Combined_Shape.png')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}>
            <div className="max-w-7xl mx-auto flex flex-col items-center lg:items-stretch">
              {/* Top Footer Section: Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8 w-full text-center md:text-left">
                {/* Column 1: Logo (Left aligned on desktop) */}
                <div className="lg:col-span-1 flex justify-center md:justify-start">
                <a href="/" className="flex items-center">
          <h1 className='text-brand-primary  text-[40px]'>
          De Gemini Services LTD
          </h1>
        </a>
                </div>
    
                {/* Column 2: FOR CUSTOMERS */}
                <div className="lg:col-span-1">
                  <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                    FOR CUSTOMERS
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Booking T&C
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Cancellation Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Sitemap
                      </a>
                    </li>
                  </ul>
                </div>
    
                {/* Column 3: FOR CLEANERS & WHO WE ARE */}
                <div className="lg:col-span-1">
                  <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                    FOR CLEANERS
                  </h3>
                  <ul className="space-y-2 mb-8">
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Become a cleaner
                      </a>
                    </li>
                  </ul>
                  <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                    WHO WE ARE
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
    
                {/* Column 4: EMOP SERVICE */}
                <div className="lg:col-span-1">
                  <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                    EMOP SERVICE
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Domestic cleaning
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Regular cleaning
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Deep cleaning
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline text-gray-700">
                        Office cleaning
                      </a>
                    </li>
                  </ul>
                </div>
    
                {/* Column 5: SUBSCRIBE TO OUR NEWSLETTER & Social Media */}
                <div className="lg:col-span-1 flex flex-col items-center md:items-start lg:items-stretch">
                  <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                    SUBSCRIBE TO OUR NEWSLETTER
                  </h3>
                  <div className="w-full mb-4">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    />
                  </div>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                    SUBSCRIBE NOW
                  </button>
    
                  <div className="mt-8">
                    <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                      SOCIAL MEDIA
                    </h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pinterest">
                        {/* Using Pin icon as a placeholder for Pinterest, as Pinterest icon is not directly available in lucide-react */}
                        <Pin className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram">
                        <Instagram className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                      </a>
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook">
                        <Facebook className="h-7 w-7 text-gray-600 hover:text-purple-600 transition duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Cleaner Locations Section (Full Width) */}
              <div className="mt-12 w-full border-t border-gray-200 pt-8 text-center">
                <h3 className="font-bold text-base sm:text-lg mb-4 text-purple-900 uppercase">
                  CLEANER LOCATIONS
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="mr-2">East London</span>{" "}
                  <span className="mr-2">North London</span>{" "}
                  <span className="mr-2">South London</span> |{" "}
                  <span className="mr-2">West London</span> |{" "}
                  <span className="mr-2">Balham</span>{" "}
                  <span className="mr-2">Islington</span>{" "}
                  <span className="mr-2">Watford</span>{" "}
                  <span className="mr-2">Bromley</span> |{" "}
                  <span className="mr-2">Tooting</span>{" "}
                  <span className="mr-2">Wimbledon</span> |{" "}
                  <span className="mr-2">Kingston</span> |{" "}
                  <span className="mr-2">Ealing</span>{" "}
                  <span className="mr-2">Harrow</span>{" "}
                  <span className="mr-2">Surbiton</span> |{" "}
                  <span className="mr-2">Angel</span>{" "}
                  <span className="mr-2">Croydon</span>{" "}
                  <span className="mr-2">Clapham</span> |{" "}
                  <span className="mr-2">Greenwich</span> |{" "}
                  <span className="mr-2">Richmond</span>{" "}
                  <span className="mr-2">Southwark</span>
                </p>
              </div>
    
              {/* Bottom Copyright and Address */}
              <div className="mt-8 w-full border-t border-gray-200 pt-8 text-center text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <p className="order-2 md:order-1">www.emop.co.uk</p>
                <p className="order-1 md:order-2">Copyright © eMop 2024</p>
                <p className="order-3 md:order-3">
                  Registered office address: Suite 5 3rd Floor, Sovereign House 1
                  Albert Place, London, England, N1 0BQ
                </p>
              </div>
            </div>
          </footer>
        </div>
      );
};
