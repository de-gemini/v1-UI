import { Link } from "react-router-dom";

import React, { useState } from "react";
import placeHolder from "../assets/images/Screenshot (427).png";
import { MultiStepForm } from "../components/MultiStep";
import { Plus, X, Check, MapPin, Phone, User, Upload, Flag } from "lucide-react";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

interface StepData {
  id: string;
  mainIcon: string; // Type for LucideIcon component
  title: string;
  description: string;
  tooltipContent?: string; // Optional content to show on click
}

interface SafetyFeature {
  title: string;
  description: string;
}

interface FormData {
  postcode: string;
  phone: string;
  personalData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  documentsUploaded: boolean;
}

interface Step {
  id: number;
  name: string;
  icon: React.ElementType;
}

export default function BecomeCleaner() {
  // State to manage which step's tooltip content is currently open
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"before" | "after">("before");

  const beforeCleaningFeatures: SafetyFeature[] = [
    {
      title: "No anonymous customers",
      description:
        "All customers must create an account and provide their name, email address, and phone number before they can request a cleaner. That is why, when you accept the job you will know who made the request and so will we. Moreover, customers will have rating and feedback from other cleaners (provided that they are not completely new to our service).",
    },
    {
      title: "24/7 support",
      description:
        "Our support team is always ready to respond to any questions you may have about your cleaning experience",
    },
    
  ];

  // Content for the 'AFTER CLEANING' tab (based on your screenshot)
  const afterCleaningFeatures: SafetyFeature[] = [
    {
      title: "Payment",
      description:
        "Customer’s account is automatically charged for any fares. You will avoid using cash and any potential issues associated with non-payment.",
    },
    {
      title: "Cleaners feedback",
      description:
        "You rate your customer after each job. We review those ratings on a regular basis to ensure that everyone you worked for is as respectful as you are. Customers reported to violate our terms of service may be prevented from using eMop.",
    },
    {
      title: "24/7 support",
      description:
        "Our support team is always ready to respond to any questions you may have about your cleaning experience",
    },
  ];

  // Determine which features to display based on the active tab
  const displayedFeatures =
    activeTab === "before" ? beforeCleaningFeatures : afterCleaningFeatures;

  const steps: StepData[] = [
    {
      id: "step1",
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-1.jpg",
      title: "Sign up on the web site",
      description: "", // Description below title, if any
      tooltipContent:
        "Create your account easily through our online registration form. Provide your basic details to get started.",
    },
    {
      id: "step2",
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-2.jpg",
      title: "Upload required documents",
      description: "",
      tooltipContent:
        "Submit necessary documents such as ID, proof of address, and any relevant certifications for verification.",
    },
    {
      id: "step3",
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-3.jpg",
      title: "Download eMopper App on your smartphone",
      description:
        "You will be able to activate it when you are authorized on the eMop platform",
      tooltipContent:
        "Get the eMopper app from your app store. It's essential for managing your bookings and communicating with customers.",
    },
    {
      id: "step4",
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-4.png",
      title: "Complete your profile",
      description: "",
      tooltipContent:
        "Fill in your professional profile with your experience, preferences, and a friendly profile picture to attract more bookings.",
    },
    {
      id: "step5",
      // Changed mainIcon from MopBucket to Bucket, as MopBucket is not a direct export from lucide-react
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-5.png",
      title: "Attend onboarding session",
      description: "",
      tooltipContent:
        "Participate in our online or in-person onboarding session to learn about eMop standards, platform usage, and best practices.",
    },
    {
      id: "step6",
      mainIcon: "https://www.emop.co.uk/img/cooperate-icon-6.png",
      title: "Start receiving jobs",
      description: "",
      tooltipContent:
        "Once authorized, you can start receiving job offers through the app. Accept jobs that fit your schedule and start earning!",
    },
    {
      id: "step7",
      mainIcon: "https://www.emop.co.uk/img/finish.png",
      title: "Start receiving jobs",
      description: "",
      tooltipContent:
        "Once authorized, you can start receiving job offers through the app. Accept jobs that fit your schedule and start earning!",
    },
  ];

  const toggleTooltip = (id: string) => {
    setOpenTooltipId(openTooltipId === id ? null : id);
  };

  const requirements = [
    "Be 18+ years old",
    "Be legally allowed to work in the UK",
    "Have a smartphone",
    {
      text: "Provide us with copy of your:",
      subItems: ["Photo", "ID", "NI", "Proof of the address"],
    },
  ];

  const formSteps: Step[] = [
    { id: 1, name: 'Postal code', icon: MapPin },
    { id: 2, name: 'Phone', icon: Phone },
    { id: 3, name: 'Provide personal data', icon: User },
    { id: 4, name: 'Upload your documents', icon: Upload },
    { id: 5, name: 'Finish', icon: Flag },
  ];

  const handleFormSubmission = (data: FormData) => {
    
    console.log('Final form submitted:', data);
    alert('Form submission successful! Check console for data.');
  };

  const handleStepChange = (currentStep: number, totalSteps: number) => {
    
    console.log(`User moved to step ${currentStep} of ${totalSteps}`);
  };
  return (
    <main className="w-full min-h-screen">
      {/* banner part */}

      <section
        className="w-full px-4 min-h-screen flex items-center justify-start relative"
        style={{
          background: `#f4f8fc url('https://www.emop.co.uk/img/header-bg.jpg') 50% no-repeat`,
        }}>
        {/* text content */}
        <div className="flex flex-col gap-[1.2rem] px-4">
          <div className="w-[4rem] md:w-[6rem] lg:w-[10rem]">
          <a href="/" className="flex items-center">
          <h1 className='text-brand-primary text-[20px] md:text-[20px] lg:text-[40px]'>
          De Gemini Services LTD
          </h1>
        </a>
          </div>
          <div className="flex flex-col">
            <h1 className="text-brand-primary font-[700] text-[30px] md:text-[52px] lg:text-[82px] uppercase">
              Become a <br />{" "}
              <span
                style={{
                  backgroundImage: `url('https://www.emop.co.uk/img/intro-title-bg.png')`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  transform: "translate(-22px, -30px)",
                }}>
                cleaner
              </span>
            </h1>

            <p className="font-[600] text-[16px] md:text-[20px] lg:text-[28px] text-brand-primary max-w-[360px]">
              Part time flexible cleaning role with £15/h average monthly rate
              or full time role with £1800+/month
            </p>

            <Link to="/home/registercleaner">
              <button className="bg-[#ffcc00] w-fit md:w-fit lg:w-full p-4 transition font-[700] text-brand-primary rounded-md hover:bg-[#f7d344] hover:shadow-xl hover:scale-95 duration-300">
                <p className="text-lg">Become a cleaner</p>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Emop */}
      <section className="bg-[#f5f9fc] min-h-screen flex flex-col items-center py-12 text-center">
        <h1 className="text-brand-primary text-[30px] font-[800]">
          What is eMop?
        </h1>
        <p className="mb-6 max-w-[1000px]">
          eMop is a service aggregator that connects households and cleaners,
          whom we call eMoppers. eMop acts as a powerful platform arranging fast
          and high-quality service for the clients
        </p>

        <p className="max-w-[1000px]">
          Our platform facilitates and provides part-time and full-time work for
          people in the cleaning industry through live training for eMoppers to
          guarantee the highest level of quality. We ensure safety for both:
          eMoppers and customers, and solve issues that can arise between them
        </p>

        {/* icons */}
        <div className="w-full mt-[2rem]">
          <img src={placeHolder} alt="placeholder" />
        </div>
      </section>

      <div className="font-sans antialiased bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading and Subheading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary mb-4">
            TO GET YOU STARTED
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12">
            To work with eMop you need to
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative group flex flex-col items-center p-4 rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
                {/* Step Title */}
                <h3 className="mb-2 text-sm font-thin text-brand-primary">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mb-2 text-sm font-thin text-brand-primary">
                    {step.description}
                  </p>
                )}
                {/* Main Circular Icon Container */}
                <div
                  className={`relative w-40 h-40 bg-[#f2f3f5] hover:bg-[#fcdb00] sm:w-48 sm:h-48 rounded-full flex items-center justify-center transition-colors duration-300
                            ${
                              openTooltipId === step.id
                                ? "bg-brand-primary"
                                : "bg-gray-100 group-hover:bg-purple-50 group-hover:border-purple-300"
                            }`}>
                  {/* Plus/X Icon on Top Right */}
                  <button
                    onClick={() => toggleTooltip(step.id)}
                    className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-secondary text-white flex items-center justify-center z-10 shadow-md transition-all duration-200 hover:bg-purple-700"
                    aria-label={
                      openTooltipId === step.id ? "Close info" : "Open info"
                    }>
                    {openTooltipId === step.id ? (
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>

                  {/* Main Step Icon */}
                  <img
                    src={step.mainIcon}
                    alt="iocn"
                    className="text-brand-primary"
                  />
                </div>

                {/* Tooltip/Content that appears on click */}
                {step.tooltipContent && (
                  <div
                    className={`absolute bottom-[90%] left-1/2 -translate-x-1/2 mt-4 w-64 p-4 bg-brand-secondary text-white text-sm rounded-lg shadow-lg z-20
                              transform transition-all duration-300 ease-in-out origin-top
                              ${
                                openTooltipId === step.id
                                  ? "scale-y-100 opacity-100 visible"
                                  : "scale-y-0 opacity-0 invisible"
                              }`}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-b-brand-secondary"></div>
                    {step.tooltipContent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="font-sans antialiased min-h-screen py-16">
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex">
            {/* Left Section: Image */}
            <div className="md:w-1/2 overflow-hidden bg-yellow-100 flex items-center justify-center p-4">
              <img
                src="https://www.emop.co.uk/img/requirements-img.jpg" // Placeholder for your image
                alt="Two cleaners smiling"
                className="w-full h-full object-cover object-center rounded-lg"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/800x600/e0e0e0/555555?text=Image+Not+Found";
                  target.alt = "Fallback image: Cleaners image not found.";
                }}
              />
            </div>

            {/* Right Section: Text Content */}
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-yellow-50">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-primary mb-4">
                REQUIREMENTS
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 mb-8">
                To work with eMop you need to
              </p>

              <ul className="text-gray-700 space-y-3">
                {requirements.map((item, index) => (
                  <li key={index}>
                    {typeof item === "string" ? (
                      <div className="flex items-start">
                        <Check className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-base sm:text-lg">{item}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-start mb-2">
                          <Check className="w-5 h-5 text-brand-primary mr-3 flex-shrink-0 mt-1" />
                          <span className="text-base sm:text-lg">
                            {item.text}
                          </span>
                        </div>
                        <ul className="ml-8 space-y-2">
                          {" "}
                          {/* Indent sub-items */}
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="flex items-center">
                              <span className="text-gray-500 mr-2">-</span>{" "}
                              {/* Dash for sub-bullet */}
                              <span className="text-base sm:text-lg">
                                {subItem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional: More content to show page structure */}
          
          <div className="max-w-7xl mx-auto text-center mt-[3rem]">
            <h1 className="text-[22px] md:text-[28px] lg:text-[32px] font-[400] text-brand-primary mb-6">
              YOUR SAFETY AT WORK IS OUR PRIORITY
            </h1>

            {/* Tab Buttons */}
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setActiveTab("before")}
                className={`px-8 py-3 rounded-l-full border-2 border- font-semibold text-lg transition-all duration-300
                        ${
                          activeTab === "before"
                            ? "bg-brand-primary text-white shadow-md"
                            : "bg-transparent text-brand-text hover:bg-purple-50"
                        }`}>
                BEFORE CLEANING
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-8 py-3 rounded-r-full border-2 border-gray-400 font-semibold text-lg transition-all duration-300
                        ${
                          activeTab === "after"
                            ? "bg-brand-primary text-white shadow-md"
                            : "bg-transparent text-brand-text hover:bg-purple-50"
                        }`}>
                AFTER CLEANING
              </button>
            </div>
          </div>
        </div>
        {/* Content Display Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-8">
          {displayedFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-start text-center h-full">
              <h3 className="text-[28px] font-[400] text-brand-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="w-full bg-[#f5f9fc]">
      <div className="relative z-[40] top-10 w-full shadow-[2rem] font-sans antialiased bg-[#f5f9fc]">
      <MultiStepForm
        steps={formSteps}
        onSubmit={handleFormSubmission}
        onStepChange={handleStepChange} // This prop is optional
      />
    </div>
      {/* Any other content for your JoinPage */}
      <footer className="bg-brand-secondary w-full text-white pt-[12rem] min-h-screen">
        <ul className="w-full underline flex flex-col gap-[1rem] md:flex-col lg:flex-row items-center justify-center">
          <li className="text-gray-400 text-[14px] transition duration-300 hover:text-[rgb(216,196,21)]">Terms&Conditions</li>
          <li className="text-gray-400 text-[14px] transition duration-300 hover:text-[rgb(216,196,21)]"> Booking T&C</li>
          <li className="text-gray-400 text-[14px] transition duration-300 hover:text-[rgb(216,196,21)]">Privacy Policy</li>
          <li className="text-gray-400 text-[14px] transition duration-300 hover:text-[rgb(216,196,21)]">Cookie Policy</li>
          <li className="text-gray-400 text-[14px] transition duration-300 hover:text-[rgb(216,196,21)]">Cancellation Policy</li>
          <li className="flex items-center justify-center">
            <FaFacebookSquare className="text-[24px] text-gray-400 mr-2 transition duration-300 hover:text-[rgb(216,196,21)]" />
            <FaInstagramSquare className="text-[24px] text-gray-400 transition duration-300 hover:text-[rgb(216,196,21)]" />
          </li>
        </ul>
      </footer>
      </section>
    </main>
  );
}
