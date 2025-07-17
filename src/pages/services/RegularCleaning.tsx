import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';

export const regularCleaningPageData = {
  banner: { title: "Regular Home Cleaning Services in England" },
  wowSection1: {
    heading: "A Clean Home—Always",
    subheading: "Consistent Comfort. Effortless Cleanliness.",
    text: "Our regular cleaning service gives you peace of mind and more free time. Whether it's weekly or bi-weekly, we ensure your home is always spotless, fresh, and welcoming.",
    image: "https://images.unsplash.com/photo-1581579185169-b7b98bdf33ef?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean and tidy living room",
    list: [
      "🧼 Dusting, vacuuming, and mopping",
      "🛏️ Bedroom tidying and linen changes",
      "🚿 Bathroom & kitchen surfaces sanitised",
    ],
    gradientFrom: "purple-50",
    gradientTo: "pink-50",
    gradientVia: "white",
    textColor: "text-purple-700",
    highlightGradient: "from-purple-400 to-pink-400",
  },
  wowSection2: {
    heading: "Flexible Schedules. Trusted Cleaners.",
    subheading: "Your Routine, Our Responsibility",
    text: "Book a reliable cleaner at a frequency that suits your lifestyle. All our professionals are background-checked and trained to deliver spotless results—every single time.",
    image: "https://images.unsplash.com/photo-1616627454970-766f7b9f96b9?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Professional cleaner working in modern home",
    list: [
      "🧽 Choose from weekly, fortnightly, or monthly visits",
      "👥 Same cleaner on every visit (when possible)",
      "🌿 Eco-friendly cleaning options available",
    ],
    gradientFrom: "pink-50",
    gradientTo: "purple-50",
    gradientVia: "white",
    textColor: "text-pink-700",
    highlightGradient: "from-pink-400 to-purple-400",
  },
  sections: [
    {
      type: "quote",
      includedTitle: "What’s included in regular cleaning?",
      includedList: [
        { text: "Dusting all surfaces, furniture, and décor" },
        { text: "Vacuuming carpets and rugs; mopping hard floors" },
        { text: "Disinfecting kitchen counters, sinks, and appliances" },
        { text: "Cleaning and sanitising bathrooms and toilets" },
        { text: "Emptying bins and light tidying of rooms" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for Any Lifestyle",
      columns: [
        {
          heading: "Busy Professionals",
          text: "Come home to a clean, organised space without lifting a finger after a long day at work.",
        },
        {
          heading: "Families with Kids",
          text: "Stay on top of the mess with reliable, consistent cleaning that keeps your home safe and tidy.",
        },
        {
          heading: "Elderly or Remote Workers",
          text: "Support your routine with a little help around the house so you can focus on what matters.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/2.jpg",
      imageAlt: "Cleaner wiping surface in kitchen",
      heading: "Same Cleaner, Same High Standards",
      list: [
        { text: "We aim to assign the same professional for every visit" },
        { text: "They get to know your home and preferences over time" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg",
      imageAlt: "Cleaner vacuuming a modern hallway",
      heading: "Custom Cleaning Tasks Available",
      list: [
        { text: "Add oven, fridge, or inside-window cleaning on request" },
        { text: "Change linens, laundry folding, or ironing—just ask" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Keep Your Home Sparkling—All Year Round",
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
      title: "Real Homes. Real Results.",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/2-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/2-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/5-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/5-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/1-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq,
    },
  ],
};

export default function RegularCleaning() {
  return <ServicePageTemplate pageData={regularCleaningPageData} />;
}
