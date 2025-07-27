// v1-UI/src/pages/pricing/DeepCleaning.tsx

import CleaningPageTemplate from "./Template";
import { priceDeep } from "../../data/faqData";

export default function DeepCleaning() {
  const features = [
    "High-intensity cleaning for neglected spaces",
    "Ideal for spring cleaning or before special occasions",
    "Eco-safe, non-toxic cleaning products",
    "Trained specialist staff for deep cleans",
  ];

  const houseCleaning = [
    "Studio flat deep clean",
    "1 Bedroom deep clean",
    "2 Bedrooms deep clean",
    "3+ Bedrooms deep clean",
  ];

  const allCleaningServices = [
    "Scrubbing bathroom and kitchen tiles",
    "Deep oven and appliance cleaning",
    "Skirting boards and corners",
    "Baseboard and trim detailing",
    "Behind/under furniture cleaning",
    "Hard-to-reach areas and high-touch surfaces",
  ];

  const whyChoose = [
    "Perfect for a seasonal refresh or before moving in/out.",
    "We target bacteria, dust, and build-up in hard-to-reach areas.",
    "Highly rated by landlords and tenants alike.",
  ];

  const extraServices = [
    "Fridge/freezer defrosting",
    "Wall washing",
    "Curtain and blind cleaning",
  ];

  const payment = [
    "Upfront payment for peace of mind",
    "Flexible packages with no hidden costs",
  ];

  const images = [
    "https://www.emop.co.uk/img/deep-clean-1.jpg",
    "https://www.emop.co.uk/img/deep-clean-2.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="Deep Cleaning Services"
      heroSubtitle="Restore your home’s shine with our intensive, top-to-bottom deep cleaning."
      regularCleaningDescription="Deep cleaning is not a recurring service, but our team is ready for one-off or seasonal deep cleans."
      oneOffCleaningDescription="Our deep cleaning covers every nook and cranny—removing built-up grime, dust, and allergens for a truly refreshed home."
      features={features}
      whyChoose={whyChoose}
      extraServices={extraServices}
      payment={payment}
      houseCleaning={houseCleaning}
      allCleaningServices={allCleaningServices}
      images={images}
      faqData={priceDeep}
    />
  );
}
