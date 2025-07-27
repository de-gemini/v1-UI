// v1-UI/src/pages/pricing/HouseCleaning.tsx

import CleaningPageTemplate from "./Template";
import {priceHome} from '../../data/faqData'

export default function HouseCleaning() {
  const features = [
    "24/7 availability",
    "Up to £150 cashback",
    "Eco-friendly cleaning products",
    "Flexible Pay-as-You-Go plans",
  ];

  const houseCleaning = [
    "Weekly cleaning for ongoing freshness",
    "Bi-weekly cleaning for busy households",
    "Monthly cleaning for maintenance",
    "One-off cleaning for special occasions or deep cleans",
  ];

  const allCleaningServices = [
    "Dusting all accessible surfaces",
    "Cleaning lighting fixtures and chandeliers",
    "Wiping down appliances and surfaces",
    "Polishing mirrors and glass fixtures",
    "Folding clothes and organizing rooms",
    "Wiping doors, handles, and light switches",
    "Vacuuming carpets and mopping floors, including skirting boards",
    "Emptying and replacing rubbish bin liners",
    "Kitchen cleaning (available as an add-on)",
    "Bathroom cleaning (available as an add-on)",
    "Wiping baseboards and window sills",
    "Loading/unloading dishwashers and general tidying",
  ];

  const whyChoose = [
    "We’re a fully insured cleaning agency — including fidelity guarantees, general liability, and employer’s liability — so you can trust us whether you're home or away.",
    "All our cleaners are full-time staff with job security, paid time off, sick leave, and pension contributions. They earn fair hourly wages and share in the proceeds from every job.",
    "Kitchen cleaning includes polishing surfaces, cleaning appliances, mopping floors, and sanitizing handles. Optional add-ons include fridge, oven, and cabinet interior cleaning.",
    "Our service is among the most competitive in the UK.",
    "Most of our customers recommend us, a testament to the quality and satisfaction we deliver.",
    "We conduct regular quality assurance checks to maintain high service standards.",
    "Same-day bookings available — perfect for last-minute needs.",
    "Flexible scheduling options are available every day of the week.",
    "Transparent process: no hidden fees or surprises.",
  ];

  const extraServices = [
    "Premium add-ons including deep cleaning, carpet and upholstery cleaning, window washing, ironing, bed-making, oven/fridge/microwave cleaning, and more.",
    "Additional services are available for a flat hourly rate depending on the task.",
    "If you're looking for a trusted and affordable cleaning company that also provides specialized services, De-Gemini is your go-to provider.",
    "Window cleaning is one of our most popular services — and our expert team ensures it’s done to perfection.",
  ];

  const payment = [
    "All online payments are handled by a secure third-party provider. Your card is only charged once your cleaning is completed.",
    "You are not required to sign long-term contracts — simply pay for the sessions you need.",
    "Ideal for both residential and commercial clients seeking a flexible, commitment-free cleaning service.",
  ];


  const images = [
    "https://www.emop.co.uk/img/professional-first.jpg",
    "https://www.emop.co.uk/img/borough-2.jpg",
    "https://www.emop.co.uk/img/borough-3.jpg",
    "https://www.emop.co.uk/img/borough-4.jpg",
    "https://www.emop.co.uk/img/borough-5.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="House Cleaning Prices in England"
      heroSubtitle="Enjoy a sparkling home with our trusted, flexible, and eco-friendly house cleaning services."
      regularCleaningDescription="Our regular house cleaning keeps your living spaces fresh, tidy, and healthy. Perfect for busy families, professionals, or anyone who wants a consistently clean home."
      oneOffCleaningDescription="Book a one-off house clean for special occasions, post-renovation, or a deep seasonal refresh. Our team will leave every corner spotless."
      features={features}
      whyChoose={whyChoose}
      extraServices={extraServices}
      payment={payment}
      houseCleaning={houseCleaning}
      allCleaningServices={allCleaningServices}
      images={images}
      faqData={priceHome}
      finalCTAHeading="Cleaning Is No Longer Your Burden"
    />
  );
}
