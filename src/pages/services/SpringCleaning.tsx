import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';

export const springCleaningPageData = {
  banner: { title: "Spring Cleaning Services in England" },
  wowSection1: {
    heading: "Refresh Your Home This Spring",
    subheading: "Out with the Old, In with the Clean",
    text: "Give your home the deep refresh it deserves after a long winter. Our spring cleaning service clears out dust, dirt, and clutter to help your space bloom again—clean, energised, and full of life.",
    image: "https://images.unsplash.com/photo-1586792483453-d9b4c672b159?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Bright, clean home interior in spring",
    list: [
      "🌸 Deep dusting and decluttering",
      "🧼 Baseboards, light fixtures, and behind furniture",
      "🌿 A fresh start for the sunny season",
    ],
    gradientFrom: "green-50",
    gradientTo: "pink-50",
    gradientVia: "white",
    textColor: "text-pink-700",
    highlightGradient: "from-pink-400 to-green-400",
  },
  wowSection2: {
    heading: "Thorough, Seasonal, Stress-Free",
    subheading: "Spring Cleaning Made Simple",
    text: "Our spring cleaning goes beyond routine tidying. We target the forgotten corners, the overlooked shelves, and the buildup that winter left behind—so you can enjoy a home that feels brand new.",
    image: "https://images.unsplash.com/photo-1616627982300-82d8cfd75e26?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Cleaner dusting spring flowers on table",
    list: [
      "🧹 Behind and under furniture",
      "🪟 Window sills, door frames, and vents",
      "🧺 Decluttering help and seasonal organisation",
    ],
    gradientFrom: "pink-50",
    gradientTo: "green-50",
    gradientVia: "white",
    textColor: "text-green-700",
    highlightGradient: "from-green-400 to-pink-400",
  },
  sections: [
    {
      type: "quote",
      includedTitle: "What’s included in Spring Cleaning?",
      includedList: [
        { text: "Detailed cleaning of all living areas" },
        { text: "Dusting of blinds, picture frames, and surfaces" },
        { text: "Deep cleaning behind/under furniture and appliances" },
        { text: "Floor scrubbing or vacuuming and mopping" },
        { text: "Tidying, organising, and clutter removal" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Why Choose Our Spring Cleaning?",
      columns: [
        {
          heading: "Refresh Your Energy",
          text: "A clean space boosts your mood and productivity. Start the season with clarity and comfort.",
        },
        {
          heading: "Target Winter Buildup",
          text: "We clean areas that have been closed off or ignored during colder months—dust, debris, and allergens.",
        },
        {
          heading: "Stress-Free Process",
          text: "We bring supplies, plan the clean, and handle it all while you focus on enjoying spring.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/3.jpg",
      imageAlt: "Spring cleaning in living room",
      heading: "Spring Cleaning = Healthier Living",
      list: [
        { text: "Reduces allergens like dust, mold, and pet dander" },
        { text: "Improves indoor air quality" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: "https://www.emop.co.uk/static/redesign/images/services/regular/5.jpg",
      imageAlt: "Organised and clean kitchen",
      heading: "Add-On Options",
      list: [
        { text: "Cupboard and drawer organisation" },
        { text: "Fridge, oven, or appliance cleaning" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Let Spring Cleaning Be Your Reset",
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
      title: "Spring Cleaning: Before & After",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/4-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/4-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/6-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/6-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/2-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/2-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq,
    },
  ],
};

export default function SpringCleaning() {
  return <ServicePageTemplate pageData={springCleaningPageData} />;
}
