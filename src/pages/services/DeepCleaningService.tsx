import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';

export const deepCleaningPageData = {
  banner: { title: "Deep Cleaning Services in England" },
  wowSection1: {
    heading: "Go Beyond the Surface with Deep Cleaning",
    subheading: "A Spotless Space from Top to Bottom",
    text: "Our deep cleaning service covers every hidden corner and forgotten surface. Whether it's spring cleaning, pre-event prep, or a serious home reset, we make your space feel brand new.",
    image: "https://images.unsplash.com/photo-1618213832384-6f5c7473e7f9?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean and tidy living space",
    list: [
      "🧹 Thorough cleaning of all rooms and high-touch areas",
      "🧼 Deep sanitisation of kitchens and bathrooms",
      "🕵️‍♀️ Attention to detail in every corner, nook, and surface",
    ],
    gradientFrom: "red-50",
    gradientTo: "yellow-50",
    gradientVia: "white",
    textColor: "text-red-700",
    highlightGradient: "from-red-400 to-yellow-400",
  },
  wowSection2: {
    heading: "Fresh Start for Your Entire Home",
    subheading: "Feel the Difference of True Cleanliness",
    text: "We don’t just tidy up—we remove built-up grime, allergens, and dirt you didn’t even know were there. Ideal for occasional resets, moving, or post-renovation recovery.",
    image: "https://images.unsplash.com/photo-1597091294206-5c7222c8d1c5?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean house interior",
    list: [
      "🏡 Suitable for houses, flats, and apartments",
      "🌱 Eco-friendly products and equipment",
      "📅 Book when you need it—weekly, monthly or once in a while",
    ],
    gradientFrom: "orange-50",
    gradientTo: "pink-50",
    gradientVia: "white",
    textColor: "text-orange-700",
    highlightGradient: "from-orange-400 to-pink-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What is included in deep cleaning?",
      includedList: [
        { text: "Cleaning and disinfecting all surfaces and furniture" },
        { text: "Detailed attention to skirting boards, door frames, and vents" },
        { text: "Deep cleaning of bathrooms and kitchens" },
        { text: "Vacuuming, mopping, and carpet cleaning upon request" },
        { text: "Interior window cleaning and dusting of blinds" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for Any Deep Clean Scenario",
      columns: [
        {
          heading: "Spring or seasonal cleaning",
          text: "Start the new season fresh by clearing out the old grime and welcoming in cleanliness and clarity.",
        },
        {
          heading: "Before and after events",
          text: "Hosting or recovering from a big event? We’ll get your home spotless and guest-ready or back to normal.",
        },
        {
          heading: "Moving in or out",
          text: "Make your move stress-free with a sparkling clean property—great for new tenants or home buyers.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/1.jpg",
      imageAlt: "Cleaner wiping window sill",
      heading: "Where We Focus During a Deep Clean",
      text: null,
      list: [
        { text: "Under furniture, behind appliances, and other hard-to-reach areas" },
        { text: "Top-down dusting: ceilings, light fixtures, walls, and floors" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/2.jpg",
      imageAlt: "Cleaner sanitising kitchen",
      heading: "Kitchen & Bathroom Attention",
      text: null,
      list: [
        { text: "Disinfecting sinks, toilets, tubs, and worktops" },
        { text: "Scrubbing tiles, taps, grout, and appliances" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg",
      imageAlt: "Cleaner dusting high shelf",
      heading: "Tailored Deep Cleaning Options",
      text: "Get exactly what your home needs.",
      list: [
        { text: "Add-ons like oven, fridge, carpet, or upholstery cleaning" },
        { text: "Choose specific rooms or whole-home coverage" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/4.jpg",
      imageAlt: "Professional cleaning team",
      heading: "We Clean Homes and Offices",
      text: null,
      list: [
        { text: "Residential flats and houses" },
        { text: "Office spaces, shared buildings, and rental properties" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Book Your Deep Clean with Confidence",
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
      title: "Before & After Deep Clean Results",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/7-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/7-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/8-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/8-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/9-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/9-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq
    },
  ],
};

export default function DeepCleaningService() {
  return <ServicePageTemplate pageData={deepCleaningPageData} />;
}
