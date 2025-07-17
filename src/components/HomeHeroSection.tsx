import React, { useRef, useEffect } from 'react';
import CommonPostcodeInput from './commons/CommonPostcodeInput';
import { Check, Star, Clock, Shield, Award, CreditCard, Zap, Sparkles, Leaf, Users } from 'lucide-react';
import CountryFlag from 'react-country-flag';
import gsap from 'gsap';

interface HomeHeroSectionProps {
  features: string[];
  error: string;
  home: string;
}

// Utility to split text into spans for animation
const AnimatedLetters: React.FC<{ text: string; className?: string; letterClass?: string; letterRefs?: Array<HTMLSpanElement | null> }> = ({ text, className = '', letterClass = '', letterRefs }) => {
  let letterIndex = 0;
  return (
    <span className={className}>
      {text.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} style={{ whiteSpace: 'nowrap', display: 'inline-block', marginRight: '0.4em' }}>
          {word.split('').map((char, charIdx) => {
            const currentIndex = letterIndex;
            letterIndex++;
            return (
              <span
                key={currentIndex}
                ref={el => {
                  if (letterRefs) letterRefs[currentIndex] = el;
                }}
                className={letterClass}
                style={{ display: 'inline-block' }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ features, error, home }) => {
  const headingRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const featureRefs = useRef<Array<HTMLDivElement | null>>([]);
  const flagRef = useRef<HTMLSpanElement | null>(null);
  const divDropRef = useRef<HTMLDivElement | null>(null);
  // Remove emoji refs

  // Ensure featureRefs has a ref for each feature line
  if (featureRefs.current.length !== features.length) {
    featureRefs.current = features.map(() => null);
  }

  useEffect(() => {
    // Animate flag drop-in
    if (flagRef.current) {
      gsap.fromTo(
        flagRef.current,
        { y: -100, opacity: 0, x: 260, rotate: -70 },
        {
          y: 340,
          opacity: 1,
          duration: 1,
          rotate: -60,
          ease: 'bounce.out',
          delay: 1,
          onComplete: () => {
            gsap.to(flagRef.current, {
              rotate: 10,
              duration: 0.7,
              ease: 'power2.out',
              onComplete:()=>{
                gsap.to(flagRef.current, {
                    rotate:0
                })
              }
            });
          }
        }
      );
    }
    // Animate div drop-in
    if (divDropRef.current) {
      gsap.fromTo(
        divDropRef.current,
        { y: -100, opacity: 0, x: 260, rotate: -70 },
        {
          y: 360,
          opacity: 1,
          duration: 1,
          rotate: 17,
          ease: 'bounce.out',
          delay: 1.6,
          onComplete: () => {
            gsap.to(divDropRef.current, {
              rotate: 0,
              duration: 0.7,
              ease: 'power2.out'
            });
          }
        }
      );
    }
    // Remove all emoji animations
    // Animate heading letters
    if (headingRefs.current.length) {
      gsap.fromTo(
        headingRefs.current,
        { y: 10, opacity: 0, rotate: 3 },
        { y: 0, opacity: 1, rotate: 0, duration: 0.4, stagger: 0.009, ease: 'ease-out' }
      );
    }
    // Animate features line by line
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { y: 30, opacity: 0, rotate: 2 },
          { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 + (index * 0.2) }
        );
      }
    });



    // Scroll event listener for flag and div movement
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 500; // Adjust this value to control how much scroll is needed
      const progress = Math.min(scrollY / maxScroll, 1);
      
      // Move flag and div to the top as scroll progresses
      if (flagRef.current) {
        gsap.to(flagRef.current, {
          y: 340 - (progress * 200), // Move from 340 to 140 (less pronounced)
          opacity: 1 - (progress * 3), // Fade from 1 to 0 more quickly
          scale: 1 - (progress * 0.5), // Scale from 1 to 0.5
          duration: 0.1,
          ease: 'none'
        });
      }
      
      if (divDropRef.current) {
        gsap.to(divDropRef.current, {
          y: 360 - (progress * 100), // Move from 360 to 160 (less pronounced)
          opacity: 1 - (progress * 8), // Fade from 1 to 0 more quickly
          scale: 1 - (progress * 0.5), // Scale from 1 to 0.5
          duration: 0.1,
          ease: 'none'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [features]);


const items = [
  { icon: <Sparkles className="inline w-5 h-5 mr-2" />, text: "Professional House Cleaning Services" },
  { icon: <Shield className="inline w-5 h-5 mr-2" />, text: "Deep Cleaning & End of Tenancy" },
  { icon: <Leaf className="inline w-5 h-5 mr-2" />, text: "Eco-Friendly Cleaning Products" },
  { icon: <Clock className="inline w-5 h-5 mr-2" />, text: "24/7 Customer Support Available" },
  { icon: <Users className="inline w-5 h-5 mr-2" />, text: "Trusted by Thousands of Customers" },
  { icon: <Award className="inline w-5 h-5 mr-2" />, text: "5-Star Rated Cleaning Service" },
  { icon: <CreditCard className="inline w-5 h-5 mr-2" />, text: "Get Cashback up to £150" },
  { icon: <Zap className="inline w-5 h-5 mr-2" />, text: "Same Day Booking Available" },
];


  return (
    <section className="flex items-center justify-center max-w-7xl mx-auto relative ">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 bg-no-repeat"
        style={{
          backgroundImage: `url('https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People')`,
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(106, 0, 141, 0.2)",
        }}></div>

      <img
        src="https://placehold.co/1920x1080/e0b1cb/ffffff?text=Cleaning+People+Fallback"
        alt="Cleaning Service Staff"
        className="absolute inset-0 z-0 object-cover w-full h-full hidden opacity-0"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement;
          target.style.opacity = "1";
          target.style.background =
            "linear-gradient(to bottom right, #e0b1cb, #b8c4ea)";
          target.src = "";
          target.alt =
            "Fallback: Image of cleaning service staff could not load.";
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 text-left w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          {/* Animated Row: Flag and Div only */}
          <div className="flex items-center gap-2 mb-4 relative" style={{ minHeight: '2rem' }}>
            <span ref={flagRef} className="inline-block relative z-10">
              <CountryFlag countryCode="GB" svg style={{ width: '3rem', height: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: '0.25rem' }} title="United Kingdom" />
            </span>
            <div
              ref={divDropRef}
              className="inline-block bg-gray-700 rounded-full absolute z-0"
              style={{
                width: '3rem',
                height: '.6rem',
                background: '',
                borderRadius: '',
                left: 0,
                top: 0
              }}
            />
            {/* Removed emojis */}
          </div>
          {/* Heading */}
          <h1 className="text-4xl mt-4 sm:text-5xl lg:text-6xl nunito-sans-title text-brand-primary leading-tight mb-8 drop-shadow-sm">
            <AnimatedLetters
              text={"Clean Fast, Clean Right In England."}
              letterRefs={headingRefs.current}
            />
          </h1>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={el => featureRefs.current[index] = el}
                className="flex items-center text-brand-primary"
              >
                <Check className="h-6 w-6 text-brand-primary mr-3 flex-shrink-0" />
                <span className="text-lg sm:text-xl nunito-sans-text text-brand-text">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Postcode Input and Button */}
          <CommonPostcodeInput />
          <p className="text-red-500 text-lg">{error}</p>
        </div>

        <div className="w-full mb-1 lg:w-1/2 flex justify-center">
          <img
            src={home}
            alt=""
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
      {/* Curvy white overlay at the bottom */}
      <div className="absolute left-0 right-0 bottom-0 w-full pointer-events-none z-20">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[80px]" preserveAspectRatio="none">
          <path d="M0,100 C360,100 1080,0 1440,100 L1440,100 L0,100 Z" fill="#f7f7f7" />
        </svg>
      </div>

      {/* Infinite Marquee Section */}
    <div className="absolute w-screen  bottom-0 left-0 right-0 z-[10000] bg-blue-600 backdrop-blur-sm py-2 overflow-hidd transform -rotate-2">
      <div className="marquee">
        <div className="marquee__group">
          {items.concat(items).map((item, i) => (
            <span key={i} className="marquee__item">
              {item.icon}
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee__group {
          display: flex;
          width: fit-content;
          animation: scroll-left 60s linear infinite;
        }

        .marquee__item {
          flex-shrink: 0;
          margin-right: 3rem;
          text-transform: ;
          color: white;
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee__item {
            font-size: 1.25rem;
            margin-right: 1.5rem;
          }
        }
      `}</style>
    </div>
    </section>
  );
};

export default HomeHeroSection; 