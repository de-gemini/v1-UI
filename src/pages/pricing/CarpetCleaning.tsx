// v1-UI/src/pages/pricing/CarpetCleaning.tsx

import CleaningPageTemplate from "./Template";
import { priceCarpet } from "../../data/faqData";

export default function CarpetCleaning() {
  const features = [
    "Hot water extraction for deep cleaning",
    "Dry & steam cleaning options",
    "Stain treatment included",
    "Child- & pet-safe cleaning products",
  ];

  const houseCleaning = [
    "Single room carpet cleaning",
    "Two rooms carpet cleaning",
    "Three or more rooms carpet cleaning",
    "Staircase carpet cleaning",
  ];

  const allCleaningServices = [
    "Vacuuming",
    "Stain pre-treatment",
    "Steam or dry cleaning (based on fabric)",
    "Deodorizing",
    "Pet hair & allergen removal",
  ];

  const whyChoose = [
    "We use advanced steam extraction machines to remove dirt and allergens.",
    "Perfect for homes with pets or allergies.",
    "Quick-dry options available.",
  ];

  const extraServices = [
    "Scotchgard protection",
    "Mattress cleaning",
    "Rug cleaning",
  ];

  const payment = [
    "Simple per-room pricing",
    "Discounts for combined services",
  ];

  const images = [
    "https://www.emop.co.uk/img/carpet-clean-1.jpg",
    "https://www.emop.co.uk/img/carpet-clean-2.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="Professional Carpet Cleaning"
      heroSubtitle="Bring your carpets back to life with our expert stain removal and deep cleaning."
      regularCleaningDescription="Carpet cleaning is typically a one-off service, but we’re happy to schedule regular maintenance for high-traffic areas."
      oneOffCleaningDescription="Our carpet cleaning removes stains, odors, and allergens—leaving your floors fresh, soft, and safe for the whole family."
      features={features}
      whyChoose={whyChoose}
      extraServices={extraServices}
      payment={payment}
      houseCleaning={houseCleaning}
      allCleaningServices={allCleaningServices}
      images={images}
      faqData={priceCarpet}
    />
  );
}
