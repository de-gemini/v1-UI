


import React from 'react';
import WhyChooseCard from './WhyChooseCard'; 
import whychoose1 from '../assets/images/whychoose1-removebg-preview.png'
import whychoose2 from '../assets/images/whychoose2-removebg-preview.png'



const whyChooseData = [
  {
    imageSrc: whychoose2,
    title: "24/7 Availability",
    description: "Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance.",
  },
  {
    imageSrc: whychoose1,
    title: "Bespoke Service",
    description: "You can choose which rooms you wish us to clean and book only the services you need.",
  },
  {
    imageSrc: "https://www.emop.co.uk/static/images/best2.svg",
    title: "Pay as You Go",
    description: "We charge clients only for the actual time a cleaner spends at your property.",
  },
  {
    imageSrc: "https://www.emop.co.uk/static/images/last_minute.svg",
    title: "Last minute cleaning",
    description: "Need urgent cleaning? You can make a booking 4 hours in advance.",
  },
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
      <h2 className="text-center text-brand-primary nunito-sans-heading text-[32px] font-[800] mb-12">
        Why choose De Gemini cleaning service in England?
      </h2>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
        {whyChooseData.map((card, index) => (
          <WhyChooseCard
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;