


import { Check, ChevronDown, MapPin, Star } from "lucide-react";
import Banner from "../components/Banner";
import ImageSlider from "../components/ImageSlider";
import { ProfessionalsCarousel } from "../components/Professional";
import { useState } from "react";
import { PriceCard } from "../components/PriceCard";
import { HowItWorksSection } from "../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../constants";
import ContentBlock from "../components/ContentBlock";
import { regularCleaningBlocks, reliableExpertsContent, caringServiceContent } from '../data/cleaningContent'; 
import WhyChooseSection from "../components/WhyChooseSection";


export default function CarpetService() {
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
      question: "Why is the estimated price for the cleaning more than what I chose?",
      answer:
        "The minimum duration of the job is 3 hours. If the cleaner finishes early, please give them another task.",
    },
    {
      id: "pay-perp-clean",
      question: "I need a quotation for end of tenancy / one off / carpet (combined) order",
      answer:
        "Please request a quote on our website simply entering your postcode. Please add all items you need to be cleaned and you will receive the quotation for the service.",
    },
    {
      id: "standard-cleaning-price",
      question: "Is there a guarantee of a refund if the job isn't done up to standard?",
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

  const navigate = useNavigate();

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
        position='top-right'
        rtl={true}
        hideProgressBar={false}
        autoClose={5000}
        draggable={true}
        icon={<Check/>}
        pauseOnHover={true}
        />
      <Banner title="Professional carpet cleaning in England" />

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
              What is included in regular cleaning in England?
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

                <p>Tidying up the rooms</p>
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
                <p>ovreieiovinj</p>

                <p>Wiping surfaces in kitchens and bathrooms</p>
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
                <p>Cleaning floors</p>
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
            <PriceCard onQuoteMeClick={handleRegularQuote} />
          </div>
        </div>
      </section>

      <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg w-full max-w-4xl mx-auto my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
          Regular cleaning service in England
        </h2>
        <p className="text-gray-700 text-base md:text-lg mb-8">
          Our standard cleaning service includes everything you need to get your
          home in order as quickly as possible. You can book additional services
          when you make your booking.
        </p>

        <div className="flex flex-col sm:flex-row w-full bg-white rounded-lg overflow-hidden shadow-md border border-purple-300 focus-within:border-purple-500 transition-colors duration-200">
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
          onClickCapture={handlePostcodeApi}
          className="bg-brand-primary hover:bg-blue-200 text-white font-semibold py-3 px-6 md:py-4 md:px-8 text-base md:text-lg transition duration-300 flex-shrink-0" onClick={handlePostcodeApi}>
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
      <div className="mt-[2rem]">
        <WhyChooseSection/>
      </div>

      <div className="p-4 max-w-5xl mx-auto mt-[4rem]">
        <h1 className="text-2xl font-bold text-brand-primary mb-4">Results</h1>
        <ImageSlider slides={sampleSlides} />
      </div>

      <section className="mt-[4rem] w-full flex flex-col items-center justify-center">
        <h1 className="text-brand-primary text-[25px] font-extrabold">Priority areas</h1>

        <div className="grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-[10px] mt-[2rem]">
          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
            Living room and bedroom
            </h1>
            <p className="text-brand-text mt-[1rem]">
            Professional dusting of surfaces (including furniture, bed frames, bookcases, etc.), wiping the mirrors, mopping, hoovering the carpet, and wiping the picture frames. If needed, you can request changing the linens and bed covers and various other additional services.
            </p>
          </div>

          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
            Kitchen
            </h1>
            <p className="text-brand-text mt-[1rem]">
            Wiping and polishing all surfaces and worktops, mopping and vacuuming the floors, cleaning equipment and appliances, washing the dishes, cleaning doors and handles. You can also request cleaning inside the fridge, the oven and the microwave, arranging things inside kitchen cabinets, etc.
            </p>
          </div>

          <div className="flex flex-col w-fit gap-[10px] border-[2px] p-4 rounded-[10px] border-gray-100">
            <h1 className="text-brand-primary text-[25px] font-bold">
            Bathroom and hallway
            </h1>
            <p className="text-brand-text mt-[1rem]">
            Polishing and sanitising the sink, the tiles, the toilet, the toilet seat, the bathtubs and/or the shower cubicle. Also, our cleaners hoover/sweep and mop the floors, polish the accessible surfaces and furniture, clean mirrors and glasses, remove fingerprints and marks from surfaces, wipe the skirting boards and the inside of the front door.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold nunito-sans-heading text-brand-primary text-center mb-12">
          What is included in De-Gemini cleaning?
        </h2>
        {regularCleaningBlocks.map((block, index) => (
          <ContentBlock
            key={index}
            mainTitle={index === 0 ? "De-Gemini Regular Cleaning in England" : undefined} 
            {...block}
          />
        ))}
      </section>

      

      

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
