import { Link } from "react-router-dom";

import React, { useState } from "react";

import {
  Plus,
  X,
  CheckSquare,
  FileText,
  Smartphone,
  User,
  PaintBucket,
  PhoneCall,
} from "lucide-react";

interface StepData {
  id: string;
  mainIcon: string; // Type for LucideIcon component
  title: string;
  description: string;
  tooltipContent?: string; // Optional content to show on click
}

export default function BecomeCleaner() {
  // State to manage which step's tooltip content is currently open
  const [openTooltipId, setOpenTooltipId] = useState<string | null>(null);

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
            <img
              src="https://www.emop.co.uk/static/images/152x90emop_logox2.png"
              alt="logo"
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-brand-secondary font-[700] text-[30px] md:text-[52px] lg:text-[82px] uppercase">
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

            <p className="font-[600] text-[16px] md:text-[20px] lg:text-[28px] text-brand-secondary max-w-[360px]">
              Part time flexible cleaning role with £15/h average monthly rate
              or full time role with £1800+/month
            </p>

            <Link to="/home/registercleaner">
              <button className="bg-[#ffcc00] w-fit md:w-fit lg:w-full p-4 transition font-[700] text-brand-secondary rounded-md hover:bg-[#f7d344] hover:shadow-xl hover:scale-95 duration-300">
                <p className="text-lg">Become a cleaner</p>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Emop */}
      <section className="bg-[#f5f9fc] min-h-screen flex flex-col items-center py-12 text-center">
        <h1 className="text-brand-secondary text-[30px] font-[800]">
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
      </section>

      <div className="font-sans antialiased bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading and Subheading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
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
                {/* Main Circular Icon Container */}
                <div
                  className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center border-4 border-purple-200 transition-colors duration-300
                            ${
                              openTooltipId === step.id
                                ? "bg-purple-100 border-purple-400"
                                : "bg-gray-100 group-hover:bg-purple-50 group-hover:border-purple-300"
                            }`}>
                  {/* Plus/X Icon on Top Right */}
                  <button
                    onClick={() => toggleTooltip(step.id)}
                    className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 text-white flex items-center justify-center z-10 shadow-md transition-all duration-200 hover:bg-purple-700"
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
                    className="text-purple-700"
                  />
                </div>

                {/* Step Title */}
                <h3 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-800">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mt-2 text-sm text-gray-600 max-w-xs">
                    {step.description}
                  </p>
                )}

                {/* Tooltip/Content that appears on click */}
                {step.tooltipContent && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-4 bg-purple-700 text-white text-sm rounded-lg shadow-lg z-20
                              transform transition-all duration-300 ease-in-out origin-top
                              ${
                                openTooltipId === step.id
                                  ? "scale-y-100 opacity-100 visible"
                                  : "scale-y-0 opacity-0 invisible"
                              }`}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-purple-700"></div>
                    {step.tooltipContent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Optional: More content to show page structure */}
        <div className="mt-20 py-12 text-center bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700">
            More sections of your app...
          </h2>
          <p className="text-gray-600 mt-4">
            This content is just to demonstrate the layout.
          </p>
        </div>
      </div>
    </main>
  );
}
