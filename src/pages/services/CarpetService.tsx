import ServicePageTemplate from "./ServicePageTemplate";
import { originalFaq } from '../../components/commons/CommonFAQ';
import example from '../../assets/images/Services/Carpet/1.avif'
import example1 from '../../assets/images/Services/Carpet/2.avif'
import example2 from '../../assets/images/Services/Carpet/3.avif'
import example3 from '../../assets/images/Services/Carpet/4.avif'
import example4 from '../../assets/images/Services/Carpet/5.avif'
import banner from '../../assets/images/Services/Carpet/6.avif'





export const carpetCleaningPageData = {
  banner: { title: "Carpet Cleaning Services in England" },
  wowSection1: {
    heading: "Revive Your Carpets with Deep Cleaning",
    subheading: "Step into Freshness, Every Time",
    text: "Our professional carpet cleaning removes embedded dirt, allergens, and stains—restoring softness, colour, and freshness to your floors. Breathe new life into your space with every step.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Vacuum cleaning a beige carpet",
    list: [
      "🧼 Deep steam extraction & stain removal",
      "🪶 Safe for children, pets, and delicate fibers",
      "🌬️ Eliminates odours and allergens",
    ],
    gradientFrom: "purple-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-purple-700",
    highlightGradient: "from-purple-400 to-blue-400",
  },
  wowSection2: {
    heading: "Comfort That Feels Like New",
    subheading: "Because Clean Carpets Matter",
    text: "Whether you're preparing for guests or just want to refresh your home, our expert carpet cleaning gives your flooring that just-installed feel, without the replacement cost.",
    image: banner,
    imageAlt: "Living room with clean carpet",
    list: [
      "🛋️ Ideal for living rooms, bedrooms, and hallways",
      "💧 Quick-drying, no residue left behind",
      "📅 Book at your convenience, including weekends",
    ],
    gradientFrom: "blue-50",
    gradientTo: "indigo-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-indigo-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What is included in carpet cleaning?",
      includedList: [
        { text: "Pre-inspection and fabric assessment" },
        { text: "Vacuuming to remove surface dust and debris" },
        { text: "Spot and stain treatment using eco-safe solutions" },
        { text: "Deep steam or hot water extraction" },
        { text: "Optional deodorising and fibre protection" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Carpet Cleaning for Every Scenario",
      columns: [
        {
          heading: "End of tenancy carpet refresh",
          text: "Ensure your rental looks spotless and meets landlord standards with a thorough carpet clean before moving out.",
        },
        {
          heading: "Post-party or spill recovery",
          text: "From wine spills to pet accidents, we target and eliminate tough stains and unpleasant odours.",
        },
        {
          heading: "Routine maintenance",
          text: "Extend your carpet’s lifespan and appearance with regular deep cleaning suited for families and busy spaces.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Technician cleaning carpet",
      heading: "Why Carpet Deep Cleaning Matters",
      text: null,
      list: [
        { text: "Dust, mites, and allergens live deep in carpet fibres—professional cleaning removes them effectively." },
        { text: "Keeps your home healthier, especially for asthma and allergy sufferers." },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Cleaning with vacuum",
      heading: "What Areas Do We Clean?",
      text: null,
      list: [
        { text: "Wall-to-wall carpeting in bedrooms, lounges, and hallways" },
        { text: "Rugs, stair carpets, and landing areas" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Stain removal in progress",
      heading: "Stain & Odour Treatments",
      text: "Every stain tells a story—we help erase it.",
      list: [
        { text: "Red wine, pet urine, ink, and food stains" },
        { text: "Enzyme-based odour neutralisation" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example3,
      imageAlt: "After-clean soft carpet",
      heading: "Add-On Services Available",
      text: null,
      list: [
        { text: "Scotchgard™ fibre protection" },
        { text: "Mattress, curtain, and upholstery cleaning" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example4,
      imageAlt: "Office space carpet cleaning",
      heading: "We Clean Office Carpets Too",
      text: null,
      list: [
        { text: "Conference rooms, receptions, and commercial hallways" },
        { text: "Low-disruption bookings including evenings and weekends" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Refresh Your Carpets with Just One Click",
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
      title: "Before & After Carpet Cleaning",
      slides: [
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/4-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/4-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/5-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/5-1.jpg" },
        { before: "https://www.emop.co.uk/static/redesign/images/comparison/6-2.jpg", after: "https://www.emop.co.uk/static/redesign/images/comparison/6-1.jpg" },
      ],
    },
    {
      type: "faq",
      ...originalFaq
    },
  ],
};

export default function CarpetService() {
  return <ServicePageTemplate pageData={carpetCleaningPageData} />;
}
