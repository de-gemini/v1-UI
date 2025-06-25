
import { MapPin, Star } from "lucide-react"
import Banner from "../components/Banner"
import ImageSlider from "../components/ImageSlider";
import { ProfessionalsCarousel } from "../components/Professional";
import { useState } from "react";
import { PriceCard } from "../components/PriceCard";
import { HowItWorksSection } from "../components/HowItWorks";



export default function RegularCleaning() {

    const sampleSlides = [
        {
          before: 'https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg',
          after: 'https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg',
        },
        {
          before: 'https://www.emop.co.uk/static/redesign/images/comparison/2-2.jpg',
          after: 'https://www.emop.co.uk/static/redesign/images/comparison/2-1.jpg',
        },
        {
            before: 'https://www.emop.co.uk/static/redesign/images/comparison/3-2.jpg',
            after: 'https://www.emop.co.uk/static/redesign/images/comparison/3-1.jpg',
          },
    ]      


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
            "The flexibility of working with eMop has still allowed me to still keep to my lifestyle. I pickup jobs when needed and work around my schedule. I love the freedom this job gives me, and I always strive to deliver excellent results to my clients.",
        },
        {
          id: 4,
          imageSrc:
            "https://www.emop.co.uk/static/redesign/images/services/cleaners/cleaner-4.jpg",
          name: "Veronika",
          rating: 4.9,
          description:
            "Hello from Veronika, I am really glad to have found eMop, working with my colleagues have really improved my cleaning skills and made me a better professional. I enjoy the team spirit and continuous learning opportunities.",
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
            "As an aspiring actor, eMop allows me to work flexibly and around my film schedules. The pay is really great and the training is excellent.",
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
    return(
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
        <Banner
        title="Regular Cleaners in London"
        />


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
          How much does a house cleaner cost in London
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
       <div className="bg-gray-100 rounded-lg shadow-xl p-6 relative w-full max-w-sm mx-auto">
            <h1 className="text-brand-primary text-[30px] font-bold">
            What is included in regular cleaning in London?
            </h1>

            <ul className="mt-[3rem] flex flex-col gap-5">
                <li className="flex gap-3">
                <span className="bg-brand-primary p-[5px] rounded-[50%]"></span>

                    <p>Tidying up the rooms</p>
                </li>

                <li className="flex gap-3">
                <span className="bg-brand-primary p-[5px] rounded-[50%]"></span>

                    <p>Wiping surfaces in kitchens and bathrooms</p>
                </li>

                <li className="flex gap-3">
                    <span className="bg-brand-primary p-[5px] rounded-[50%]"></span>
                    <p>Cleaning floors</p>
                </li>

                <li className="flex gap-3">
                <span className="bg-brand-primary p-[5px] rounded-[50%]"></span>

                    <p>Taking out the rubbish</p>
                </li>
            </ul>
       </div>
          <div className="relative">
            <PriceCard
              onQuoteMeClick={handleRegularQuote}
            />
          </div>

          
        </div>
      </section>

      <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg w-full max-w-4xl mx-auto my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4">
      Regular cleaning service in London
      </h2>
      <p className="text-gray-700 text-base md:text-lg mb-8">
      Our standard cleaning service includes everything you need to get your home in order as quickly as possible. You can book additional services when you make your booking.
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
          
          className="bg-brand-primary hover:bg-blue-200 text-white font-semibold py-3 px-6 md:py-4 md:px-8 text-base md:text-lg transition duration-300 flex-shrink-0"
        >
          Quote me
        </button>
      </div>
    </div>

    {/* How it works */}
    <section className="w-full mb-4">
    <h1 className="font-bold text-start ml-2 text-brand-primary text-[20px]">How eMop cleaning service works</h1>

        <HowItWorksSection />
      </section>

      {/* Why choose?? */}
      <section className="w-full flex flex-col items-center justify-center">
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[5px] px-3 w-full md:w-full lg:max-w-4xl">
          {/* each card */}
          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best1.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
              24/7 Availability
            </h1>
            <p className="text-center nunito-sans-text">
              Pick a date and time that suits you. You can even book for same
              day cleaning, 4 hours in advance
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best3.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
            Bespoke Service
            </h1>
            <p className="text-center nunito-sans-text">
            You can choose which rooms you wish us to clean and book only the services you need.
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/best2.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
            Pay as You Go
            </h1>
            <p className="text-center nunito-sans-text">
            We charge clients only for the actual time a cleaner spends at your property.
            </p>
          </div>

          <div className="border-[3px] border-gray-300 flex flex-col items-center justify-center py-4 rounded-lg gap-[4px]">
            <div className="">
              <img
                src="https://www.emop.co.uk/static/images/last_minute.svg"
                className="w-full"
                alt="image"
              />
            </div>

            <h1 className="text-brand-secondary nunito-sans-heading text-[24px]">
            Last minute cleaning
            </h1>
            <p className="text-center nunito-sans-text">
            Need urgent cleaning? You can make a booking 4 hours in advance.
            </p>
          </div>
        </div>
      </section>

      <div className="p-4 max-w-5xl mx-auto mt-[4rem]">
      <h1 className="text-2xl font-bold text-brand-primary mb-4">Results</h1>
      <ImageSlider slides={sampleSlides} />
    </div>

    </div>

    )
};
