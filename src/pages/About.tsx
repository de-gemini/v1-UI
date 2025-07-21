import React from "react";
import PolicyTemplate from "./PolicyTemplate";

const sections = [
  {
    heading: "About De-gemini",
    content: (
      <div className="flex flex-col gap-2">
        <p>
          De-gemini is a powerful England based online platform that connects
          customers and cleaners.
        </p>

        <p>
          We ensure the quality of services, peace of mind and safety for both
          customers and cleaners alike.
        </p>

        <p>
          We make our cleaning service affordable for everyone by letting you
          choose according to your exact needs with a “pay as you go” model.
        </p>
        <p>
          The quick, simple and secure booking process allows you to have a
          high-quality bespoke cleaning service, 24/7.
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
    heading: "Our Story",
    content: (
      <ul className="pl-6 flex flex-col gap-4">
        <li className="text-xs">De-gemini’s co-founder, Julia Ponomareva, always loved to do the cleaning. Julia believes that if there is chaos in your mind, the best way to put your thoughts in order is to do the cleaning. She thought to launch a cleaning service one day.</li>
        <li className="text-xs">In 2017, these ideas led to the creation of the De-gemini platform when Julia shared her student experience with Denis Gromov, who now leads the company’s IT operations. The two combined their backgrounds and enthusiasm to create De-gemini.</li>
        <li className="text-xs">They believe everyone can make an impact that can change other people’s lives. By creating a fair, bespoke and eco-friendly service, they changed how cleaning services are delivered to you.</li>
        <li className="text-xs">De-gemini’s simple and secure booking process allows you to have a high-quality bespoke cleaning service, 24/7.</li>
      </ul>
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
        <a href="https://www.de-gemini.com" className="text-white bg-brand-primary hover:bg-blue-600 focus:ring-4 focus:ring-brand-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Go to De-gemini
        </a>
    </button>
    </div>
    </>
);

export default About;
