import { Check, ChevronDown, MapPin } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../constants";
import CommonPostcodeInput from '../components/commons/CommonPostcodeInput';

export default function Reclean() {

    const [openItemId, setOpenItemId] = useState<string | null>(null);
    
    const [postcode, setPostcode] = useState<string>("");
    const navigate = useNavigate();
    
    const handleQuoteMeClick = async () => {
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
    
    const handleRegularQuote = (code: string) => {
        console.log(`Regular Cleaning Quote for: ${code}`);
      };
    interface FAQItemData {
        id: string;
        question: string;
        answer: string;
      }
    
      const faqData: FAQItemData[] = [
        {
          id: "packages",
          question: "What is included in De-Gemini cleaning service?",
          answer:
            `You can review what is included in the cleaning here`,
        },
        {
          id: "booking-reclean",
          question: "How to book a reclean?",
          answer:
            "Please email us at support@de-gemini.world or get in touch via live chat feature on our website within 48 hours of the cleaning being completed with a full description of the issues together with any supporting evidence. Our support team will review your email and get in touch with you ASAP.",
        },
        {
          id: "hire-per-week",
          question: "What is De-Gemini complaint procedure?",
          answer:
            "Please read more about De-Gemini complaints procedure here",
        },
      ];

      const toggleFAQ = (id: string) => {
        setOpenItemId(openItemId === id ? null : id);
      };

    return(
        <div className="w-full min-h-screen">
            {/* Hero Section Container */}
            <section className="flex items-center bg-[#f7f7ff] justify-center w-full">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-0 bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.emop.co.uk/static/images/reclean-wave.png')`,
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-primary leading-tight mb-8 drop-shadow-sm">
            Unhappy with your clean? Reclean Guarantee
            </h1>

            {/* Features List */}
            <p className="text-brand-primary text-[16px] font-[700] mb-5">We care about the quality of our services and offer the Reclean Guarantee to our customers. Compensation can be provided in the form of a reclean, credit to your account, complimentary future clean or free additional addons.</p>

            {/* Postcode Input and Button */}
            
            <button className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-brand-primary hover:bg-yellow-300 text-brand-secondary nunito-sans-heading py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                Learn more
              </button>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://www.emop.co.uk/static/images/reclean-employer.png"
              alt=""
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mt-[3rem]">
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

        {/* another section */}
        <div className="max-w-4xl mx-auto bg-[#f7f7ff] mt-[4rem] px-5 py-10 rounded-lg">
            <h1 className="text-brand-primary text-[30px] font-[700] mb-6">Book cleaning service</h1>
            <p className="text-[rgb(47,60,72)] text-[16px] font-[400] mb-6">Our standard cleaning service includes everything you need to get your home in order as quickly as possible. You can book additional services when you make your booking.</p>

            {/* Postcode Input and Button */}
            <CommonPostcodeInput />
            


        </div>

        {/* Optional: More content to show page structure */}
        <section className="w-full flex flex-col items-center justify-center mt-[4rem] md:mt-[7rem] lg:mt-[10rem] mb-[5rem]"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        >
          <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[40px] text-brand-secondary">
          Cleaning Is No Longer <br />
          Your Burden
          </h1>

          
                <CommonPostcodeInput />
           

          

        </section>

        </div>
    )
};
