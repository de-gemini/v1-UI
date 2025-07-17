// CleaningPageTemplate.tsx
import { Check, ChevronDown, MapPin } from "lucide-react";
import { FaBroom, FaRegCalendarCheck, FaRegCreditCard, FaRegSmile } from "react-icons/fa";
import { CostCard } from "../../components/Postcode";
import { useState } from "react";
import { HowItWorksSection } from "../../components/HowItWorks";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { API_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import CommonFAQ from "../../components/commons/CommonFAQ";
import CommonPostcodeInput from "../../components/commons/CommonPostcodeInput";

interface CleaningPageTemplateProps {
  title: string;
  heroSubtitle?: string;
  regularCleaningDescription: string;
  oneOffCleaningDescription: string;
  features: string[];
  whyChoose: string[];
  extraServices: string[];
  payment: string[];
  houseCleaning: string[];
  allCleaningServices: string[];
  images: string[];
  finalCTAHeading?: string;
}

export default function CleaningPageTemplate({
  title,
  heroSubtitle,
  regularCleaningDescription,
  oneOffCleaningDescription,
  features,
  
  whyChoose,
  extraServices,
  payment,
  houseCleaning,
  allCleaningServices,
  images,
  finalCTAHeading = "Cleaning Is No Longer Your Burden",
}: CleaningPageTemplateProps) {
  const [postcode, setPostcode] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleFAQ = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const handlePostcodeApi = async () => {
    if (!postcode.trim()) {
      toast.error("Please enter a postcode.");
      return;
    }
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/postcode`, { postcode });
      if (res.data?.area) {
        toast.success(`Postcode found: ${res.data.area}`);
        navigate(`/checkout?postcode=${encodeURIComponent(postcode.trim())}`);
      } else {
        toast.error("Invalid postcode or area not found.");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "An error occurred";
      toast.error(msg);
    }
  };

  const sliceOrAll = (arr: string[], initial: number) => (showAll ? arr : arr.slice(0, initial));

  return (
    <div className="min-h-screen px-g sm:px-16 bg-white overflow-x-hidden w-full relative">
      {/* Clustered React Icons (decorative) */}
      
      {/* Hero Section (restored original layout) */}
      <section className="px-6 sm:px-16 max-w-7xl mx-auto mt-8 relative z-10 min-h-[60vh] flex items-center">
        {/* Right-side icon stack with slanted connecting lines */}
        <div className="absolute hidden right-12 sm:right-64 top-3/4 -translate-y-1/2 sm:flex flex-col items-center z-10" style={{ minWidth: '220px', height: '640px' }}>
          {/* SVG for slanted lines */}
          <svg className="absolute left-1/2 top-0 -translate-x-1/2" width="220" height="640" viewBox="0 0 220 640" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none', zIndex: 0 }}>
            {/* Line from top icon to middle icon */}
            <line x1="110" y1="32" x2="0" y2="220" stroke="#d1d5db" strokeWidth="2" />
            {/* Lower line: much longer and more bent */}
            <line x1="0" y1="220" x2="180" y2="400" stroke="#d1d5db" strokeWidth="2" />
          </svg>
          {/* Top icon */}
          <div className="relative z-10" style={{ left: '0px', top: '0px' }}>
            <div className="bg-white rounded-full shadow p-3 border border-gray-200 animate-float-slow" style={{ animationDelay: '0s' }}>
              <FaRegSmile className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          {/* Middle icon, offset to the left and further down */}
          <div className="relative z-10" style={{ left: '-110px', top: '160px' }}>
            <div className="bg-white rounded-full shadow p-3 border border-gray-200 animate-float-slow" style={{ animationDelay: '0.8s' }}>
              <FaRegCreditCard className="text-purple-500 w-8 h-8" />
            </div>
          </div>
          {/* Bottom icon, much further down and to the right */}
          <div className="relative z-10" style={{ left: '80px', top: '280px' }}>
            <div className="bg-white rounded-full shadow p-3 border border-gray-200 animate-float-slow" style={{ animationDelay: '1.6s' }}>
              <FaRegCalendarCheck className="text-green-500 w-8 h-8" />
            </div>
          </div>
        </div>
        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
          }
          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }
        `}</style>
        <div className="flex flex-col  relative z-[100] lg:flex-row items-center justify-between w-full">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold bg-white/50 text-brand-primary mb-4">{title}</h1>
            {heroSubtitle && <p className="text-lg text-gray-700 mb-6">{heroSubtitle}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center">
                  <Check className="h-5 w-5 text-brand-primary mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
               <CommonPostcodeInput/>
           
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 max-w-7xl mx-auto mt-10">
        <div className="grid md:grid-cols-2 gap-8">
          <CostCard
            title="Regular house cleaning"
            
            text={regularCleaningDescription}
            inputPlaceholder="Enter your post code"
            buttonText="QUOTE ME"
            onQuoteMeClick={handlePostcodeApi}
          />
          <CostCard
            title="One-off domestic cleaning"
            
            text={oneOffCleaningDescription}
            inputPlaceholder="Enter your post code"
            buttonText="QUOTE ME"
            onQuoteMeClick={handlePostcodeApi}
          />
        </div>
      </section>

      {/* Dynamic Sections */}
      {[
        { title: "House Cleaning Options", items: houseCleaning },
        { title: "Why Choose Us", items: whyChoose },
        { title: "Extra Services", items: extraServices },
        { title: "Payment Info", items: payment },
        { title: "What's Included", items: allCleaningServices },
      ].map((section, idx) => (
        <section key={idx} className="px-6 sm:px-16 max-w-7xl mx-auto mt-12">
          <h2 className="text-xl  text-brand-primary font-bold font-3xl mb-4">{section.title}</h2>
          <ul className="space-y-2">
            {sliceOrAll(section.items, 3).map((item, i) => (
              <li key={i} className="text-gray-700">
                <span className="font-semibold text-brand-primary mr-2">{(i + 1).toString().padStart(2, '0')}.</span> {item}
              </li>
            ))}
          </ul>
          {section.items.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-brand-primary mt-3 hover:underline">
              {showAll ? "See less" : "See more"}
            </button>
          )}
        </section>
      ))}


      
      <HowItWorksSection />

      {/* Images */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Section image ${idx + 1}`}
          className="max-w-7xl hidden mx-auto mt-10 rounded shadow-md"
          onError={(e) => (e.currentTarget.src = "https://placehold.co/800x600")}
        />
      ))}

      

      {/* Final CTA */}
      <section
        className="w-full flex flex-col items-center justify-center mt-20 py-10 bg-cover bg-center text-center"
        style={{ backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')` }}>
        <h2 className="text-2xl md:text-4xl font-bold text-brand-primary mb-6">{finalCTAHeading}</h2>
        <div className="flex bg-white p-3 rounded-xl shadow-md border max-w-md w-full">
          
          <CommonPostcodeInput/>
          
        </div>
      </section>

      {/* FAQ */}
      <CommonFAQ/>

    </div>
  );
}
