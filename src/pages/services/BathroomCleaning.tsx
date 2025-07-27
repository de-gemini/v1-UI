import ServicePageTemplate from "./ServicePageTemplate";
import example from '../../assets/images/Services/Bathroom/4.avif'
import example1 from '../../assets/images/Services/Bathroom/5.avif'
import example2 from '../../assets/images/Services/Bathroom/6.avif'
import example3 from '../../assets/images/Services/Bathroom/7.avif'
import example4 from '../../assets/images/Services/Bathroom/8.avif'
import example5 from '../../assets/images/Services/Bathroom/9.avif'
import dirty from '../../assets/images/Services/Bathroom/dirty-bathroom.jpg'
import dirty2 from '../../assets/images/Services/Bathroom/dirty-bathroom2.jpg'


export const bathroomDeepPageData = {
  banner: { title: "Bathroom Deep Cleaning Services in England" },
  wowSection1: {
    heading: "Experience the Sparkle of a Pristine Bathroom",
    subheading: "Where Freshness Begins",
    text: "Step into a bathroom that feels brand new. Our deep cleaning service eliminates limescale, soap scum, and hidden germs, making your bathroom a true sanctuary—spotless, hygienic, and relaxing.",
    image: example5,
    imageAlt: "Sparkling modern bathroom",
    list: [
      "🛁 Sanitized tubs, showers, and sinks",
      "✨ Gleaming tiles and mirrors",
      "🚽 Germ-free toilets and fixtures",
    ],
    gradientFrom: "blue-50",
    gradientTo: "teal-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-teal-400",
  },
  wowSection2: {
    heading: "A Bathroom You’ll Love to Use—",
    subheading: "And Show Off",
    text: "Imagine a bathroom that always feels fresh and inviting. We don’t just clean—we restore comfort and peace of mind, so you can relax and recharge.",
    image: example4,
    imageAlt: "Family enjoying clean bathroom",
    list: [
      "🧼 Perfect for families and guests",
      "🌱 Eco-friendly products for safety",
      "🕒 Fast, flexible, and always reliable",
    ],
    gradientFrom: "teal-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-teal-700",
    highlightGradient: "from-teal-400 to-blue-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What is included in a bathroom deep clean?",
      includedList: [
        { text: "Descaling and scrubbing of bathtubs, showers, and sinks" },
        { text: "Cleaning and disinfecting toilets, bidets, and urinals" },
        { text: "Wiping and polishing mirrors, glass, and chrome fixtures" },
        { text: "Scrubbing tiles and grout to remove mold and mildew" },
        { text: "Cleaning cabinets, shelves, and towel racks" },
        { text: "Mopping and disinfecting bathroom floors" },
        { text: "Emptying bins and replacing liners" },
      ],
      priceCard: {
        // Add bathroom-specific pricing info here if available
      },
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "One-off Bathroom Deep Cleaning for Every Occasion",
      columns: [
        {
          heading: "Seasonal Bathroom Refresh",
          text: "Over time, bathrooms collect limescale, soap scum, and hidden bacteria. Our deep cleaning is perfect for a seasonal reset—removing buildup and leaving your bathroom sparkling and hygienic.",
        },
        {
          heading: "Moving In or Out?",
          text: "Start fresh in your new home or leave your old bathroom spotless for the next residents. We scrub every surface, fixture, and corner so you can enjoy peace of mind and a truly clean bathroom.",
        },
        {
          heading: "After Parties & Guests",
          text: "Hosting guests or a big event? Let us handle the aftermath! We’ll tackle mess, stains, and germs, restoring your bathroom to its best so you can relax and enjoy your home.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Sparkling bathroom ready for guests",
      heading: "First Impressions for Your Bathroom",
      text: null,
      list: [
        { text: "A spotless bathroom makes every guest feel welcome and shows you care about your home’s comfort and hygiene." },
        { text: "We ensure your bathroom is always ready for family, guests, and daily routines—clean, organized, and inviting." },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Deep cleaning bathroom tiles and fixtures",
      heading: "Priority Areas for Bathroom Cleaning",
      text: null,
      list: [
        { text: "We focus on high-touch areas like taps, handles, and switches to eliminate germs and grime." },
        { text: "Our team pays special attention to tiles, grout, and behind fixtures—where dirt and bacteria love to hide." },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Customised bathroom cleaning",
      heading: "Customised Bathroom Cleaning Service",
      text: "We tailor our cleaning to your bathroom’s unique needs.",
      list: [
        { text: "Limescale removal from taps, showerheads, and tiles." },
        { text: "Cabinet and shelf cleaning to remove dust, spills, and hidden dirt." },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example3,
      imageAlt: "Extra bathroom cleaning services",
      heading: "We Also Provide Extra Bathroom Services",
      text: null,
      list: [
        { text: "Mold and mildew removal using safe, effective products." },
        { text: "Window and floor cleaning to keep your bathroom bright and welcoming." },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Let Us Handle the Bathroom Mess",
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
      title: "Bathroom Cleaning Results",
      slides: [
        { before: example, after: dirty },
        { before: example2, after: dirty2 },
      ],
    },
    {
      type: "faq",
      title: "Bathroom Deep Cleaning FAQs",
      subtitle: "Find answers to the most common questions about our bathroom cleaning services.",
      items: [
        {
          id: 1,
          question: "Do you remove limescale and mold?",
          answer: "Yes! Our bathroom deep cleaning includes thorough removal of limescale, mold, and mildew from all surfaces.",
        },
        {
          id: 2,
          question: "Are your cleaning products safe for children and pets?",
          answer: "Absolutely. We use only non-toxic, eco-friendly products in all bathroom areas.",
        },
        {
          id: 3,
          question: "Can I book a one-off bathroom clean before or after guests?",
          answer: "Yes, our one-off bathroom deep cleaning is perfect for pre- or post-guest cleanups. We’ll handle the mess so you can enjoy your home.",
        },
        {
          id: 4,
          question: "Do I need to provide any equipment or products?",
          answer: "No, our cleaners arrive fully equipped with everything needed for a professional bathroom deep clean.",
        },
        {
          id: 5,
          question: "How long does a bathroom deep clean take?",
          answer: "Most bathrooms take 1-2 hours depending on size and condition. We’ll give you a time estimate when you book.",
        },
      ],
    }
  ],
};

export default function BathroomCleaning() {
  return <ServicePageTemplate pageData={bathroomDeepPageData} />;
}