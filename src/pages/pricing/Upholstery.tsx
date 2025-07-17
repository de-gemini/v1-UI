// v1-UI/src/pages/pricing/UpholsteryCleaning.tsx

import CleaningPageTemplate from "./Template";

export default function UpholsteryCleaning() {
  const features = [
    "Fabric-safe cleaning methods",
    "Stain & odor removal",
    "Leather or textile care",
    "Quick drying time for convenience",
  ];

  const houseCleaning = [
    "Armchair cleaning",
    "2-Seater sofa cleaning",
    "3-Seater sofa cleaning",
    "Dining chair cleaning",
  ];

  const allCleaningServices = [
    "Vacuuming and lint removal",
    "Spot and stain treatment",
    "Steam or dry clean based on material",
    "Fabric deodorization",
    "Leather conditioning (if applicable)",
  ];

  const whyChoose = [
    "Extend the life of your sofas and chairs with professional cleaning.",
    "We test your fabric before choosing the safest method.",
    "Same-day bookings available.",
  ];

  const extraServices = [
    "Mattress cleaning",
    "Curtain & drape steaming",
  ];

  const payment = [
    "Per-item pricing for transparency",
    "Custom packages for full-room furniture",
  ];

  const images = [
    "https://www.emop.co.uk/img/upholstery-clean-1.jpg",
    "https://www.emop.co.uk/img/upholstery-clean-2.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="Upholstery Cleaning Services"
      heroSubtitle="Refresh your sofas, chairs, and soft furnishings with our gentle, effective upholstery cleaning."
      regularCleaningDescription="Upholstery cleaning is a one-off service, perfect for removing stains, odors, and allergens from your favorite furniture."
      oneOffCleaningDescription="We use fabric-safe methods to deep clean and restore your upholstery, making it look and feel like new."
      features={features}
      whyChoose={whyChoose}
      extraServices={extraServices}
      payment={payment}
      houseCleaning={houseCleaning}
      allCleaningServices={allCleaningServices}
      images={images}
    />
  );
}
