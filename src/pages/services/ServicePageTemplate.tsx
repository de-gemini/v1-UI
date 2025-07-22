import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Banner from "../../components/Banner";
import { ProfessionalsCarousel } from "../../components/Professional";
import { HowItWorksSection } from "../../components/HowItWorks";
import { MapPin, Star, ChevronDown } from "lucide-react";
import CommonPostcodeInput from '../../components/commons/CommonPostcodeInput';
import ImageSlider from "../../components/ImageSlider";
import { DeepPriceCard } from "../../components/DeepPriceCard";
import WhyChooseSection from "../../components/WhyChooseSection";
import { FaSprayCan, FaBroom, FaLeaf, FaEye, FaHandshake, FaClock, FaSmile, FaRecycle } from 'react-icons/fa';
import { MdOutlineLightbulb, MdOutlineStar, MdOutlineCheckCircle, MdOutlineCloud, MdOutlineSecurity, MdOutlineAccessTime } from 'react-icons/md';
// Remove local image imports for tips
import clockImg from "../../assets/images/office-cleaning.png";
import smileImg from "../../assets/images/card-5.png";
import recycleImg from "../../assets/images/card-6.jpg";
import CommonFAQ from '../../components/commons/CommonFAQ';

// Add types for SectionRenderer props and map callbacks
interface SectionRendererProps {
  section: any;
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

function SectionRenderer({ section, state, setState }: SectionRendererProps) {
  switch (section.type) {
    case "carousel":
      return (
        <></>
      );
    case "professionals":
      return (
        <></>
      );
    case "quote":
      return (
        <section className="font-sans  antialiased bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-[30px] font-[700] text-brand-primary nunito-sans-heading mb-8 md:mb-12">{section.heading}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-4">
            <div className="bg-gray-100 rounded-lg p-6 relative w-full max-w-sm mx-auto">
              <h1 className="text-brand-primary text-[30px] font-bold">{section.includedTitle}</h1>
              <ul className="mt-[3rem] flex flex-col gap-5">
                {section.includedList && section.includedList.map((item: any, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 mr-3 text-brand-primary">{item.icon ? item.icon : <svg className="w-4 h-4 mt-1" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 00-1 1v1a1 1 0 002 0V4a1 1 0 00-1-1zM9 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 7a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zM11 7a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 11a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 11a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM7 13a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1zM11 13a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM10 20a10 10 0 100-20 10 10 0 000 20zm0-2a8 8 0 100-16 8 8 0 000 16z" /></svg>}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative" >
              {section.priceCard && <DeepPriceCard {...section.priceCard} />}
            </div>
          </div>
        </section>
      );
    case "custom":
      if (section.customType === "imageSlider") {
        return (
          <div className="p-6 sm:py-10 sm:px-16 max-w-5xl mx-auto mt-[4rem]">
            <h1 className="text-2xl font-bold text-brand-primary mb-4">{section.title}</h1>
            <ImageSlider slides={section.slides} />
          </div>
        );
      }
      if (section.customType === "multiColumnGrid") {
        // Pick a set of Googley icons for demo
        const icons = [
          <MdOutlineLightbulb className="text-yellow-400 text-4xl mb-3" />, // Idea
          <MdOutlineAccessTime className="text-pink-400 text-4xl mb-3" />, // Time
          <MdOutlineCheckCircle className="text-green-400 text-4xl mb-3" />, // Check
          <MdOutlineStar className="text-blue-400 text-4xl mb-3" />, // Star
          <MdOutlineCloud className="text-cyan-400 text-4xl mb-3" />, // Cloud
          <MdOutlineSecurity className="text-purple-400 text-4xl mb-3" />, // Security
        ];
        return (
          <section className="w-full flex flex-col mt-8 items-center justify-center py-16 bg-gradient-to-b from-white via-gray-50 to-white">
            <h1 className="text-3xl  md:text-4xl font-extrabold text-brand-primary mb-10 text-center tracking-tight">
              {section.title}
            </h1>
            <div className="max-w-4xl w-full flex flex-col divide-y divide-gray-200 bg-white rounded-2xl px-4">
              {section.columns.map((col: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col items-start py-8 first:pt-0 last:pb-0"
                >
                  {icons[idx % icons.length]}
                  <h2 className="text-xl font-bold uppercase text-brand-primary mb-3">
                    {col.heading}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {col.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      }
      if (section.customType === "twoColumnImageText") {
        const [expanded, setExpanded] = React.useState(
          Array(section.list?.length || 0).fill(false)
        );

        const handleToggle = (idx: number) => {
          setExpanded((prev: boolean[]) => {
            const copy = [...prev];
            copy[idx] = !copy[idx];
            return copy;
          });
        };

        const shouldShowViewMore = (text: string) => {
          return text.split(/\s+/).length > 15;
        };

        return (
          <div className={`max-w-7xl  sm:mx-16 md:mx-16 mt-16 bg-white rounded-lg shadow-lg overflow-hidden md:flex ${section.reverse ? 'flex-row-reverse' : ''}`}>
            <div className="md:w-1/2 overflow-hidden">
              <img src={section.image} alt={section.imageAlt} className="w-full h-full object-cover object-center" onError={section.onImageError} />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {section.heading && <h2 className="text-xl uppercase sm:text-4xl text-brand-primary font-bold">{section.heading}</h2>}
              {section.text && <p className="text-brand-text mt-[1.5rem]">{section.text}</p>}
              {section.list && section.list.length > 0 && (
                <div className="mt-6 flex flex-col gap-6">
                  {section.list.map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-2">
                      {idx !== 0 && <hr className="my-2 border-gray-200" />}
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-brand-primary font-bold text-lg tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      <div className={`text-gray-700 text-base md:text-lg leading-relaxed ${!expanded[idx] && shouldShowViewMore(item.text) ? 'line-clamp-2' : ''}`}>
                        {item.text}
                      </div>
                      {shouldShowViewMore(item.text) && (
                        <button
                          className="text-brand-primary text-sm font-semibold mt-1 self-start hover:underline focus:outline-none"
                          onClick={() => handleToggle(idx)}
                        >
                          {expanded[idx] ? "View Less" : "View More"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {section.button && (
                <button className={section.button.className} onClick={section.button.onClick}>{section.button.text}</button>
              )}
            </div>
          </div>
        );
      }
      if (section.customType === "callToActionBanner") {
        return (
          <section className="w-full flex flex-col items-center justify-center mt-10" style={section.style}>
            <h1 className="font-[700]  text-[30px] md:text-[40px] uppercase lg:text-[40px] text-brand-primary">{section.heading}</h1>
            <CommonPostcodeInput />
          </section>
        );
      }
      if (section.customType === "buttonGrid") {
        return (
          <div className="w-full max-w-4xl mt-[4rem]">
            <h2 className="text-2xl sm:text-3xl ml-4 font-semibold text-gray-800 mb-6 sm:mb-8 md:mb-10 text-center sm:text-left">{section.title}</h2>
            <div className="flex flex-wrap ml-5 justify-center sm:justify-start gap-3 sm:gap-4 md:gap-5">
              {section.buttons.map((btn: any, idx: number) => (
                <a key={btn.id || idx} href={btn.link} className={btn.className} aria-label={`Learn more about ${btn.text}`}>{btn.text}</a>
              ))}
            </div>
          </div>
        );
      }
      break;
    case "faq":
      return <CommonFAQ />;
    case "whyChoose":
      return <div className="mt-[2rem]"><WhyChooseSection {...section.whyChooseProps} /></div>;
    // Add more cases for all other section types as needed
    default:
      return null;
  }
}

interface WowSectionProps {
  heading: string;
  accentText?: string; // colored span in heading
  subheading?: string;
  text: string;
  image: string;
  imageAlt?: string;
  list?: string[];
  buttonText?: string;
  buttonLink?: string;
  testimonial?: {
    rating: number;
    reviewCount: number;
    text?: string;
    starsImage?: string;
  };
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  highlightGradient?: string;
  imageMask?: string; // e.g., 'rounded-3xl', 'mask-custom', etc.
  cardTitle?: string; // for card-like sub-content in wow2
  cardText?: string;
}

function StaticWowSection1(props: WowSectionProps) {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 order-2 md:order-1 mt-8 md:mt-0">
          <h2 className="text-4xl editorial md:text-5xl font-extrabold text-brand-primary mb-4 leading-tight">
            {props.heading}
            {props.accentText && <span className="text-brand-primary">{props.accentText}</span>}
          </h2>
          {props.subheading && <div className="text-xl text-gray-700 mb-2">{props.subheading}</div>}
          <p className="text-lg md:text-xl text-gray-700 mb-6">{props.text}</p>
          {props.buttonText && props.buttonLink && (
            <a href={props.buttonLink} className="inline-block bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold mt-4 hover:bg-brand-primary/90 transition">{props.buttonText}</a>
          )}
          {props.list && (
            <ul className="space-y-3 text-base md:text-lg text-gray-800 mt-6">
              {props.list.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          )}
        </div>
        <div className="flex-1 border order-1 md:order-2 relative flex justify-center items-center w-full">
          <img
            src={props.image}
            alt={props.imageAlt || ''}
            className={`w-full  md:max-w-md  object-cover object-center`}
            style={{ aspectRatio: '4/3' }}
          />
          {props.testimonial && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl px-6 py-4 flex items-center gap-4 min-w-[220px] border border-gray-100">
              <span className="text-2xl font-bold text-gray-900">{props.testimonial.rating}/5</span>
              <span className="text-sm text-gray-500">({props.testimonial.reviewCount.toLocaleString()} reviews)</span>
              {props.testimonial.starsImage && <img src={props.testimonial.starsImage} alt="stars" className="h-6" />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StaticWowSection2(props: WowSectionProps) {
  return (
    <section className="relative py-20 bg-[#0A1A3C] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 order-2 md:order-1 mt-8 md:mt-0">
          <h2 className="text-4xl editorial md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {props.heading}
            {props.accentText && <span className="text-blue-400">{props.accentText}</span>}
          </h2>
          {props.subheading && <div className="text-xl text-blue-100 mb-2">{props.subheading}</div>}
          <p className="text-lg md:text-xl text-blue-100 mb-6">{props.text}</p>
          {props.cardTitle && (
            <div className="bg-white/10 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-white mb-2">{props.cardTitle}</h3>
              <p className="text-blue-100">{props.cardText}</p>
            </div>
          )}
          {props.list && (
            <ul className="space-y-3 text-base md:text-lg text-blue-100 mt-6">
              {props.list.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          )}
        </div>
        <div className="flex-1 order-1 md:order-2 flex justify-center items-center w-full">
          <img
            src={props.image}
            alt={props.imageAlt || ''}
            className={`w-full max-w-xs md:max-w-md ${props.imageMask || 'asym-mask'} object-cover object-center border-4 border-white/20`}
            style={{ aspectRatio: '4/3' }}
          />
        </div>
      </div>
    </section>
  );
}

interface ServicePageTemplateProps {
  pageData: any;
}

export default function ServicePageTemplate({ pageData }: ServicePageTemplateProps) {
  const [state, setState] = useState<any>({ openFAQ: null });
  // Default wow section data
  const defaultWow1 = {
    heading: "Discover the Joy of a ",
    accentText: "Spotless Home",
    subheading: undefined,
    text: "Experience hassle-free, professional cleaning tailored to your needs. Our trusted cleaners, eco-friendly products, and flexible scheduling make it easy to enjoy a sparkling home—every time.",
    image: "/src/assets/images/banner-gemini.jpg", // Use a relevant local or stock cleaning image
    imageAlt: "Professional cleaner at work",
    list: [
      "✔️ Vetted, background-checked professionals",
      "🌱 Eco-friendly & safe cleaning products",
      "📅 Easy online booking & rescheduling",
    ],
    buttonText: "Book a Cleaning",
    buttonLink: "/book",
    testimonial: {
      rating: 4.9,
      reviewCount: 2450,
      starsImage: undefined,
    },
    imageMask: 'asym-mask',
  };
  const defaultWow2 = {
    heading: "Why Choose ",
    accentText: "Gemini Cleaning?",
    subheading: undefined,
    text: "We go beyond just cleaning—we care for your home as if it were our own. Our team is dedicated to delivering exceptional results, every visit.",
    image: "/src/assets/images/cleaning-team.jpg", // Use a relevant local or stock cleaning image
    imageAlt: "Cleaning team in action",
    cardTitle: "Our Promise",
    cardText: "Satisfaction guaranteed, transparent pricing, and a commitment to your health and comfort. Discover the difference with Gemini Cleaning.",
    imageMask: 'asym-mask',
  };

  // Global cleaning philosophy tips (same as KitchenDeep)
  const cleaningTips = [
    {
      title: "Eco-Friendly First",
      description: "We use only non-toxic, biodegradable products to keep your home safe and the planet happy.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvZnJpZW5kbHl8ZW58MHx8MHx8fDA%3D", // Green, eco cleaning
      tag: "Philosophy"
    },
    {
      title: "Attention to Detail",
      description: "Our cleaners are trained to notice the little things, ensuring every corner sparkles.",
      image: "https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW5lcnxlbnwwfHwwfHx8MA%3D%3D", // Close-up cleaning
      tag: "Philosophy"
    },
    {
      title: "Trust & Safety",
      description: "All our staff are background-checked and insured, so you can relax knowing your home is in safe hands.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRydXN0fGVufDB8fDB8fHww", // Cleaning gloves and spray
      tag: "Philosophy"
    },
    {
      title: "Flexible Scheduling",
      description: "Book, reschedule, or cancel anytime—our service fits your lifestyle, not the other way around.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", // Professional cleaner
      tag: "Philosophy"
    },
    {
      title: "Customer Happiness",
      description: "We’re not happy until you are! Our satisfaction guarantee means we’ll always make it right.",
      image: "https://images.unsplash.com/photo-1688383454444-f150afc0bc9b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcHB5JTIwaW4lMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww", // Smiling woman
      tag: "Philosophy"
    },
    {
      title: "Continuous Improvement",
      description: "We invest in ongoing training and feedback to keep our standards—and your experience—exceptional.",
      image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Confident man
      tag: "Philosophy"
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {pageData.banner && <Banner title={pageData.banner.title} />}
      {/* Cleaning Tips Carousel Section */}
      <ProfessionalsCarousel tips={cleaningTips} />
      {pageData.sections && pageData.sections.map((section: any, idx: number) => (
        <React.Fragment key={idx}>
            {/* Insert the second wow section BEFORE FAQ */}
            {section.type === "faq" && <StaticWowSection2 {...(pageData.wowSection2 || defaultWow2)} />}
            <div className="px-6 md:px-16">
              <SectionRenderer section={section} state={state} setState={setState} />
            </div>
            {/* Insert the first wow section after professionals */}
            {section.type === "professionals" && <StaticWowSection1 {...(pageData.wowSection1 || defaultWow1)} />}
        </React.Fragment>
        ))}
        {/* Why choose?? */}
      <div className="mt-[3rem]">
        <WhyChooseSection/>
      </div>
    </div>
  );
} 