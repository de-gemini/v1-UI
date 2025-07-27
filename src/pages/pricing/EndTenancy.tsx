// v1-UI/src/pages/pricing/TenancyCleaning.tsx

import CleaningPageTemplate from "./Template";
import { priceEnd } from "../../data/faqData";

export default function TenancyCleaning() {
  const features = [
    "Inventory-safe cleaning for rental properties",
    "100% deposit back guarantee",
    "Landlord and agency approved",
    "Same-day availability for urgent moves",
  ];

  const houseCleaning = [
    "Studio end of tenancy clean",
    "1 Bedroom end of tenancy clean",
    "2 Bedrooms end of tenancy clean",
    "3+ Bedrooms end of tenancy clean",
  ];

  const allCleaningServices = [
    "Professional carpet vacuuming",
    "Interior appliance cleaning",
    "Window and glass wiping",
    "Bathroom descaling",
    "Limescale and mould removal",
    "Full kitchen sanitization",
    "Dusting throughout",
    "Inside cupboards and drawers",
  ];

  const whyChoose = [
    "Specialised cleaning for rental properties to meet tenancy agreement standards.",
    "Our cleaning checklist matches agency and landlord expectations.",
    "Trusted by letting agencies across England.",
  ];

  const extraServices = [
    "Steam carpet cleaning",
    "Mattress cleaning",
    "External window washing",
  ];

  const payment = [
    "One-time secure online payment",
    "Booking confirmation by email & SMS",
  ];

  const images = [
    "https://www.emop.co.uk/img/tenancy-cleaning-1.jpg",
    "https://www.emop.co.uk/img/tenancy-cleaning-2.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="End of Tenancy Cleaning"
      heroSubtitle="Secure your deposit and impress your landlord with our thorough end of tenancy cleaning."
      regularCleaningDescription="End of tenancy cleaning is a one-time, comprehensive service to prepare your property for inspection."
      oneOffCleaningDescription="Our team follows agency-approved checklists to ensure every area is cleaned to the highest standard for a smooth handover."
      features={features}
      whyChoose={whyChoose}
      extraServices={extraServices}
      payment={payment}
      houseCleaning={houseCleaning}
      allCleaningServices={allCleaningServices}
      images={images}
      faqData={priceEnd}
    />
  );
}
