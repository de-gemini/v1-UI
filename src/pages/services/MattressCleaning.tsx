import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';
import example from '../../assets/images/Services/Mattress/1.avif'
import example1 from '../../assets/images/Services/Mattress/2.avif'
import example2 from '../../assets/images/Services/Mattress/3.avif'
import example3 from '../../assets/images/Services/Mattress/4.avif'
import example4 from '../../assets/images/Services/Mattress/5.avif'
import example5 from '../../assets/images/Services/Mattress/6.avif'
import example6 from '../../assets/images/Services/Mattress/7.avif'






export const mattressCleaningPageData = {
  banner: { title: "Professional Mattress Cleaning in England" },
  wowSection1: {
    heading: "Sleep Healthier on a Fresh Mattress",
    subheading: "Where Clean Meets Comfort",
    text: "Your mattress collects sweat, dust mites, and allergens over time. Our deep mattress cleaning removes these hidden irritants, leaving your bed clean, fresh, and ready for restful sleep.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Freshly cleaned bed and mattress",
    list: [
      "🛏️ Steam cleaning and sanitation",
      "🌬️ Allergen and dust mite removal",
      "🧼 Odour and stain treatment",
    ],
    gradientFrom: "cyan-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-cyan-700",
    highlightGradient: "from-cyan-400 to-blue-400",
  },
  wowSection2: {
    heading: "A Deep Clean for Deep Sleep",
    subheading: "Because Clean Mattresses Matter",
    text: "Whether it's a seasonal refresh or stain removal after spills, we treat each mattress with care. Feel the difference in your sleep quality and wake up truly refreshed.",
    image: example4,
    imageAlt: "Person relaxing on a clean bed",
    list: [
      "🧽 Safe for memory foam and traditional mattresses",
      "🦠 Kills bacteria, fungi, and allergens",
      "💤 Promotes better respiratory health and sleep",
    ],
    gradientFrom: "blue-50",
    gradientTo: "purple-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-purple-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What’s included in mattress cleaning?",
      includedList: [
        { text: "Vacuuming to remove dust, hair, and debris" },
        { text: "Steam cleaning and hot water extraction" },
        { text: "Stain treatment and deodorising" },
        { text: "Anti-allergen and dust mite sanitisation" },
        { text: "Drying and optional protective spray" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for Every Type of Mattress",
      columns: [
        {
          heading: "Home mattresses",
          text: "Ideal for routine hygiene or after spills and stains—our cleaning gives your bed a new lease on life.",
        },
        {
          heading: "Guest & hotel beds",
          text: "Impress guests and maintain a spotless, allergen-free experience with regular mattress cleaning.",
        },
        {
          heading: "Children’s and baby mattresses",
          text: "Gentle but effective cleaning that removes bacteria while protecting sensitive skin.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Professional mattress cleaning equipment",
      heading: "Why Clean Your Mattress?",
      text: null,
      list: [
        { text: "Removes allergens that can disrupt sleep or cause irritation" },
        { text: "Eliminates bacteria, bed bugs, and odours" },
        { text: "Prolongs mattress lifespan and freshness" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Cleaning in action",
      heading: "What Makes Our Service Different?",
      text: null,
      list: [
        { text: "Eco-friendly, safe cleaning products" },
        { text: "Quick drying techniques" },
        { text: "No strong chemical smell left behind" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Cleaning in action",
      heading: "Our proven mattress cleaning methods",
      text: null,
      list: [
        { text: "High-powered vacuuming" },
        { text: "Special cleaning solution" },
        { text: "Absorption" },
        { text: "Rapid drying" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example3,
      imageAlt: "Cleaning in action",
      heading: "How often should you freshen up your mattress?",
      text: null,
      list: [
        { text: "It's recommended that you clean your mattress every six months to keep your sleeping space clean and healthy." },
        { text: "To encourage even wear, the mattress must be vacuumed to get rid of dust and allergens, turned or flipped, and any stains should be spot cleaned with a light detergent solution." },
        { text: "Try rotating your mattress 180 degrees if you are unable to flip it. In addition, using a mattress protector may require you to wash your mattress more often than normal." },
        { text: "Rapid drying" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Breathe Easy, Sleep Better—Book Mattress Cleaning Now",
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
      title: "Before & After Mattress Results",
      slides: [
        { before: example, after: example3 },
        { before: example4, after: example5 },
        { before: example2, after: example6 },
      ],
    },
    {
      type: "faq",
      ...originalFaq
    },
  ],
};

export default function MattressCleaningService() {
  return <ServicePageTemplate pageData={mattressCleaningPageData} />;
}
