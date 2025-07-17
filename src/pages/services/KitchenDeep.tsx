import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';

export const kitchenDeepPageData = {
  banner: { title: "Kitchen Deep Cleaning Services in England" },
  wowSection1: {
    heading: "Unleash the Power of a Pristine Kitchen",
    subheading: "Where Culinary Magic Begins",
    text: "Step into a kitchen that inspires creativity and joy. Our deep cleaning service transforms every corner, making your kitchen the true heart of your home—spotless, safe, and ready for your next masterpiece.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Sparkling modern kitchen",
    list: [
      "🍳 Sanitised countertops and cooking surfaces",
      "✨ Sparkling appliances inside and out",
      "🧽 Grease, grime, and food stains? Gone!",
    ],
    gradientFrom: "green-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-green-700",
    highlightGradient: "from-green-400 to-blue-400",
  },
  wowSection2: {
    heading: "A Kitchen You’ll Love to Show Off—",
    subheading: "And Cook In",
    text: "Imagine hosting friends and family in a kitchen that radiates freshness and order. We don’t just clean—we restore the space that brings people together around food and warmth.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Family enjoying clean kitchen",
    list: [
      "👨‍👩‍👧‍👦 Perfect for home chefs and busy households",
      "🌿 Eco-friendly products for kitchen-safe cleaning",
      "🕒 Flexible bookings at your convenience",
    ],
    gradientFrom: "yellow-50",
    gradientTo: "green-50",
    gradientVia: "white",
    textColor: "text-yellow-700",
    highlightGradient: "from-yellow-400 to-green-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What is included in kitchen deep cleaning?",
      includedList: [
        { text: "Wiping and disinfecting all worktops and cabinets (inside & out)" },
        { text: "Degreasing hobs, extractor fans, splashbacks, and tiles" },
        { text: "Cleaning appliances like ovens, fridges, and microwaves upon request" },
        { text: "Scrubbing sinks, taps, and removing food residues" },
        { text: "Vacuuming and mopping kitchen floors; taking out rubbish" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "One-off kitchen deep cleaning for all occasions",
      columns: [
        {
          heading: "Seasonal kitchen refresh",
          text: "Tackle the build-up of grease, dust, and crumbs after months of use. A deep seasonal clean helps maintain hygiene and comfort in your kitchen year-round.",
        },
        {
          heading: "Moving in or out of your home",
          text: "Before settling in or handing over the keys, we deep-clean every kitchen surface so you can start or finish with a spotless, food-safe space.",
        },
        {
          heading: "After parties or heavy cooking periods",
          text: "Post-celebration? We'll take care of stubborn stains, burnt-on residue, and the aftermath of big meals so your kitchen feels brand new again.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/1.jpg",
      imageAlt: "Cleaning services in living room",
      heading: "First Impressions Start in the Kitchen",
      text: null,
      list: [
        { text: "A sparkling kitchen gives your home a clean, inviting feel from the moment guests step in." },
        { text: "From sinks to stovetops, we ensure every kitchen detail is guest-ready and family-approved." },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/2.jpg",
      imageAlt: "Cleaning services in living room",
      heading: "Focus Areas in Every Kitchen Clean",
      text: null,
      list: [
        { text: "Hobs, oven doors, and extractor fans polished to perfection" },
        { text: "Tiles and splashbacks scrubbed and sanitised" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg",
      imageAlt: "Cleaning services in living room",
      heading: "Customised Kitchen Cleaning Service",
      text: "Tailored to your appliances and layout.",
      list: [
        { text: "Fridge, microwave, and oven cleaning to remove grime and build-up" },
        { text: "Cupboards, drawers, and surfaces wiped and disinfected" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg",
      imageAlt: "Cleaning services in living room",
      heading: "Add-On Services Available",
      text: null,
      list: [
        { text: "Limescale and stain removal from taps and sinks" },
        { text: "Window and floor polishing for a complete finish" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg",
      imageAlt: "Cleaning services in living room",
      heading: "Office Kitchen? We Clean Those Too",
      text: null,
      list: [
        { text: "Dishwashing, appliance sanitising, and food surface cleaning" },
        { text: "Safe, eco-conscious products used in all shared spaces" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Cleaning the Kitchen Has Never Been This Easy",
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
      title: "Before & After Kitchen Results",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/1-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/2-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/2-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/3-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/3-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq
    },
  ],
};

export default function KitchenDeep() {
  return <ServicePageTemplate pageData={kitchenDeepPageData} />;
}
