import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';
import example from '../../assets/images/Services/SittingRoom/3.avif'
import example1 from '../../assets/images/Services/SittingRoom/10.avif'
import example2 from '../../assets/images/Services/SittingRoom/6.avif'
import example3 from '../../assets/images/Services/Bathroom/5.avif'
import example4 from '../../assets/images/Services/Bathroom/6.avif'
import banner from '../../assets/images/Services/SittingRoom/10.avif'







export const moveInCleaningPageData = {
  banner: { title: "Move-In Cleaning Services in England" },
  wowSection1: {
    heading: "Start Fresh in Your New Home",
    subheading: "Because First Impressions Matter",
    text: "Moving into a new space? Ensure it’s spotless and sanitised before you unpack. Our professional move-in cleaning gives your home a fresh, healthy start—free from dust, grime, or the previous tenant’s mess.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Person unpacking in a clean home",
    list: [
      "🧹 Full sanitisation of all surfaces",
      "🚪 Inside cabinets, wardrobes, and drawers",
      "✨ Deep cleaning of bathrooms and kitchens",
    ],
    gradientFrom: "green-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-green-700",
    highlightGradient: "from-green-400 to-blue-400",
  },
  wowSection2: {
    heading: "Walk Into a Home That Feels Brand New",
    subheading: "Let Us Handle the Dirt",
    text: "You have enough to think about during a move—let us take care of the cleaning. We’ll deep clean your entire home so you can settle in comfortably from day one.",
    image: banner,
    imageAlt: "Clean, empty apartment ready to move into",
    list: [
      "🏡 Suitable for flats, houses, and studios",
      "🧽 Carpet, window, and appliance cleaning on request",
      "🕓 Flexible scheduling around your move date",
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
      includedTitle: "What’s included in our move-in cleaning?",
      includedList: [
        { text: "Cleaning and disinfecting all rooms, walls, and surfaces" },
        { text: "Deep bathroom and kitchen sanitisation" },
        { text: "Interior windows, doors, skirting boards, and fixtures" },
        { text: "Cupboards, wardrobes, and inside shelves" },
        { text: "Vacuuming, mopping, and rubbish removal" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Who Needs Move-In Cleaning?",
      columns: [
        {
          heading: "New Homeowners",
          text: "Moving into a home previously occupied? We’ll ensure it’s clean and hygienic for your family.",
        },
        {
          heading: "Tenants Moving into Rentals",
          text: "Make sure your new flat is clean before settling in—especially when property managers haven’t cleaned thoroughly.",
        },
        {
          heading: "Landlords Preparing for New Tenants",
          text: "Give your property a top-to-bottom clean to attract new tenants and meet hygiene standards.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Professional cleaner preparing room",
      heading: "Add-On Services Available",
      text: null,
      list: [
        { text: "Appliance cleaning (fridge, oven, microwave)" },
        { text: "Window polishing and limescale removal" },
        { text: "Steam carpet cleaning on request" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Make Your Move Easier—Book Move-In Cleaning Today",
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
      title: "Before & After Move-In Cleaning Results",
      slides: [
        { before: example1, after: example2 },
        { before: example3, after: example4 },
      ],
    },
    {
      type: "faq",
      ...originalFaq
    },
  ],
};

export default function MoveIn() {
  return <ServicePageTemplate pageData={moveInCleaningPageData} />;
}
