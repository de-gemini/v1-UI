import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "About De-gemini",
    content: (
      <div className="flex flex-col gap-2">
        <p>
        At De Gemini Services, we provide professional cleaning solutions for both residential and commercial spaces across England. Whether it’s a home, office, retail unit, or workspace, we deliver spotless results with precision, reliability, and discretion.
        </p>

        <p>
        We understand that every space has its own standards. That’s why our team is made up of thoroughly vetted, DBS-checked professionals who are trained not just to clean, but to care for the spaces we’re trusted with.
        </p>

        <p>
        What sets us apart? We focus on consistent quality, flexible scheduling, and transparent communication. No rushed jobs. No shortcuts. Just honest, high-standard service every time.
        </p>
        <p>
        Whether you need a one-off deep clean, regular upkeep, or tailored services for your property or business, De Gemini Services is ready to handle it with professionalism you can count on.
        </p>

        <h1 className="m-2 font-bold text-xl text-brand-primary">
        At De-gemini we live by a number of principles:
        </h1>
        <ul className="flex flex-col gap-2 text-xs list-disc">
            <li>Fair trade, which is why you pay for the completed job and cleaners receive a fair payment for their work.</li>
            <li>
            Saving the environment is vital to us all, which is why, at De-gemini, we only use eco-friendly cleaning products as part of our standard service. This means it’s not only safe for you, your loved ones and pets, but safe for our cleaners as well, who work regularly with these products.
            </li>
        </ul>
      </div>
    ),
  },
  {
    heading: "Our Team",
    content: (
      <ul className="flex flex-col gap-4 pl-6">
        <li className="text-xs">We are a multi-national team and our headquarters is in England.</li>
        <li className="text-xs">We speak not only English, but also other languages including, French, Chinese, and Russian.</li>
        <li className="text-xs">Our team is located around the world and consists of people from different professional and cultural backgrounds. This diversity helps us to think creatively and keep improving our services.</li>
        <li className="text-xs">To comply with legal obligations</li>
      </ul>
    ),
  },
  
];

const About: React.FC = () => (
    <>
    <PolicyTemplate title="About Us" sections={sections} />
    
    <div className="w-full flex items-center justify-center mt-6">
    <button>
        <a href="https://de-gemini.netlify.app" className="text-white bg-brand-primary hover:bg-blue-600 focus:ring-4 focus:ring-brand-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Quote me
        </a>
    </button>
    </div>
    </>
);

export default About;
