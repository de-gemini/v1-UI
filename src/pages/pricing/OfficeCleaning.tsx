// v1-UI/src/pages/pricing/OfficeCleaning.tsx

import CleaningPageTemplate from "./Template";

export default function OfficeCleaning() {
  const features = [
    "After-hours availability for minimal disruption",
    "Professional-grade cleaning supplies",
    "Scheduled or one-off cleans for flexibility",
    "Fully insured and vetted staff",
  ];

  const houseCleaning = [
    "Daily office cleaning",
    "Weekly office cleaning",
    "Bi-weekly office cleaning",
    "One-off office deep clean",
  ];

  const allCleaningServices = [
    "Vacuuming and mopping floors",
    "Emptying bins and replacing liners",
    "Cleaning desks and workstations",
    "Sanitising shared surfaces",
    "Disinfecting restrooms",
    "Cleaning kitchens and break areas",
    "Dusting windowsills and baseboards",
    "Cleaning internal glass and mirrors",
  ];

  const whyChoose = [
    "Flexible scheduling to suit your business hours.",
    "Experienced cleaners with commercial-grade tools.",
    "We help you maintain a professional and hygienic work environment.",
    "Tailored office cleaning packages for your needs.",
  ];

  const extraServices = [
    "Keyboard and screen disinfection",
    "Window cleaning (internal/external)",
    "Carpet and upholstery cleaning",
    "Deep restroom sanitization",
  ];

  const payment = [
    "Flexible invoicing for businesses",
    "No long-term contracts required",
    "Pay only for services used",
  ];

  const images = [
    "https://www.emop.co.uk/img/commercial-cleaning-1.jpg",
    "https://www.emop.co.uk/img/commercial-cleaning-2.jpg",
  ];

  return (
    <CleaningPageTemplate
      title="Office Cleaning Services"
      heroSubtitle="Keep your workplace spotless, safe, and productive with our professional office cleaning."
      regularCleaningDescription="Our scheduled office cleaning ensures your business environment is always clean, hygienic, and ready for success."
      oneOffCleaningDescription="Book a one-off office clean for post-event, move-in, or a deep refresh—perfect for maintaining a professional image."
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
