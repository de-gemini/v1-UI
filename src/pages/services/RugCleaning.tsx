import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';

export const rugCleaningPageData = {
  banner: { title: "Expert Rug Cleaning Services in England" },
  wowSection1: {
    heading: "Breathe New Life Into Your Rugs",
    subheading: "Revive Colours. Remove Allergens.",
    text: "Rugs add warmth and style to your home—but they also trap dust, allergens, and odours. Our rug cleaning service gently lifts dirt and grime, restoring softness and vibrancy to every fibre.",
    image: "https://images.unsplash.com/photo-1600566753049-89e7c9f23d42?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Cleaner restoring patterned rug",
    list: [
      "🌀 Deep fibre agitation to remove embedded dirt",
      "🌿 Safe for delicate weaves and natural fibres",
      "🧼 Odour and stain removal treatments available",
    ],
    gradientFrom: "red-50",
    gradientTo: "yellow-50",
    gradientVia: "white",
    textColor: "text-red-700",
    highlightGradient: "from-red-400 to-yellow-400",
  },
  wowSection2: {
    heading: "Extend the Life of Your Rugs",
    subheading: "Clean. Soft. Long-Lasting.",
    text: "Routine rug cleaning not only enhances the look and feel of your home, but also protects your health. Our professional care helps prevent premature wear, fibre damage, and dust mite build-up.",
    image: "https://images.unsplash.com/photo-1616587895178-5a872c5e45d2?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Modern clean rug in living room",
    list: [
      "🧽 Tailored techniques for wool, silk, and synthetic blends",
      "🚿 Steam or dry cleaning methods depending on rug type",
      "🚛 On-site or pickup/drop-off options available",
    ],
    gradientFrom: "yellow-50",
    gradientTo: "red-50",
    gradientVia: "white",
    textColor: "text-yellow-700",
    highlightGradient: "from-yellow-400 to-red-400",
  },
  sections: [
    {
      type: "quote",
      includedTitle: "What’s included in rug cleaning?",
      includedList: [
        { text: "Pre-inspection to determine material and best treatment" },
        { text: "Vacuuming to remove surface dirt and loose debris" },
        { text: "Spot treatment for visible stains" },
        { text: "Hot water extraction or dry cleaning (based on rug type)" },
        { text: "Optional deodorising and fibre protection" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Ideal for All Rug Types",
      columns: [
        {
          heading: "Area Rugs & Runners",
          text: "Restore freshness and remove traffic marks from hallway runners and area rugs.",
        },
        {
          heading: "Oriental & Handwoven Rugs",
          text: "Handled with care and cleaned using low-moisture or dry techniques to preserve value.",
        },
        {
          heading: "Shaggy & High-Pile Rugs",
          text: "Deep clean even the thickest pile to remove trapped allergens and revitalise fluffiness.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg",
      imageAlt: "Specialist rug technician cleaning by hand",
      heading: "Handled With Specialist Knowledge",
      list: [
        { text: "Technicians trained in rug fibre identification and care" },
        { text: "No shrinkage, colour bleeding, or fibre damage" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg",
      imageAlt: "Rug being dried after wash",
      heading: "Fast Drying & Fresh Results",
      list: [
        { text: "Rugs dried with airflow systems to prevent mildew" },
        { text: "Deodorising treatments leave a lasting fresh scent" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Book Your Rug Cleaning Today",
      style: {
        backgroundImage: "url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
    },
    {
      type: "custom",
      customType: "imageSlider",
      title: "Before & After Rug Transformations",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/4-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/4-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/6-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/6-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/7-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/7-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq,
    },
  ],
};

export default function RugCleaning() {
  return <ServicePageTemplate pageData={rugCleaningPageData} />;
}
