import ServicePageTemplate from "./ServicePageTemplate";
import { serviceOffice } from "../../data/faqData";
import example from '../../assets/images/Services/Office/6.avif'
import example1 from '../../assets/images/Services/Office/8.avif'
import example2 from '../../assets/images/Services/Office/5.avif'
import example3 from '../../assets/images/Services/Office/1.png'
import example4 from '../../assets/images/Services/Office/2.png'
import example5 from '../../assets/images/Services/Office/9.avif'
import example6 from '../../assets/images/Services/Office/4.avif'
import dirtyOffice from '../../assets/images/Services/Office/dirty-office.jpg'
import dirtyOffice2 from '../../assets/images/Services/Office/dirty-offfice2.jpg'
import dirtyOffice3 from '../../assets/images/Services/Office/dirty-office3.jpg'









export const officeCleaningPageData = {
  banner: { title: "Office Cleaning Services in England" },
  wowSection1: {
    heading: "Boost Productivity with a Spotless Office",
    subheading: "A Clean Workspace is a Clear Mind",
    text: "A clean office isn’t just about appearance—it’s about health, focus, and professionalism. Our office cleaning service ensures your team and clients step into a workspace that’s fresh, sanitised, and inspiring.",
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean and modern open-plan office",
    list: [
      "🧼 Desk and workstation disinfection",
      "🚽 Sparkling kitchens and washrooms",
      "🧹 Floor vacuuming, mopping, and waste disposal",
    ],
    gradientFrom: "blue-50",
    gradientTo: "green-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-green-400",
  },
  wowSection2: {
    heading: "Professional Office Cleaning That Works Around You",
    subheading: "Flexible, Reliable & Confidential",
    text: "We understand that business hours are sacred. That’s why our trained cleaners work around your schedule—mornings, evenings, or weekends—ensuring zero disruption and total cleanliness.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Professional cleaner wiping desk in office",
    list: [
      "🕓 Daily, weekly, or one-off cleaning options",
      "📈 Scalable for startups or enterprise offices",
      "🌱 Eco-friendly and safe products used throughout",
    ],
    gradientFrom: "green-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-green-700",
    highlightGradient: "from-green-400 to-blue-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What's included in office cleaning?",
      includedList: [
        { text: "Cleaning and disinfecting desks, phones, and work areas" },
        { text: "Sanitising communal areas: kitchens, meeting rooms, and reception" },
        { text: "Toilet and bathroom cleaning with attention to hygiene" },
        { text: "Dusting and wiping of shelves, skirting, and electronics" },
        { text: "Emptying bins and replacing liners" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Custom Cleaning Solutions for Every Office Type",
      columns: [
        {
          heading: "Startups & Coworking Spaces",
          text: "Flexible cleaning tailored to your fast-moving team’s needs—minimal disruption, maximum cleanliness.",
        },
        {
          heading: "Corporate Offices & HQs",
          text: "Scalable cleaning teams and high standards that reflect your brand’s professional image.",
        },
        {
          heading: "Remote or Hybrid Workplaces",
          text: "Whether it’s once a week or every day, we help you maintain a hygienic space no matter your team size.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Cleaner wiping down office desk",
      heading: "More reasons you should use our reliable service",
      text: null,
      list: [
        { text: "Because of our high standards and quality service, we have a very high client retention rate" },
        { text: "We provide dependable, quality office cleaning service with several convenient payment methods" },
        { text: "The majority of our customers come to us after a trusted referral from a previous customer" },
        { text: "Our office cleaning services are reasonably, competitively priced, and provide excellent value" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Cleaner wiping down office desk",
      heading: "Easily customised commercial cleaning service",
      text: null,
      list: [
        { text: "Office equipment cleaning" },
        { text: "Bathroom washing and sanitizing" },
        { text: "Kitchen cleaning" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Cleaner wiping down office desk",
      heading: "We also provide",
      text: null,
      list: [
        { text: "Stain removal with professional equipment" },
        { text: "Interior & exterior window cleaning" },
        { text: "Balcony cleaning" },
        { text: "Cleaning floors, vacuuming the carpets, mopping the floors, and wiping skirting boards" },

      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Impress Clients, Support Staff—Book Office Cleaning Today",
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
      title: "Before & After Office Cleaning Results",
      slides: [
        { before: example3, after: dirtyOffice },
        { before: example5, after: dirtyOffice2 },
      ],
    },
    {
      type: "faq",
      serviceOffice,
    },
  ],
};

export default function OfficeCleaningPage() {
  return <ServicePageTemplate pageData={officeCleaningPageData} faqData={serviceOffice} />;
}
