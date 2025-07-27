import ServicePageTemplate from "./ServicePageTemplate";
import { serviceEnd } from "../../data/faqData";
import example from '../../assets/images/Services/Bedroom/8.avif'
import dirty3 from '../../assets/images/Services/Bedroom/dirty-bedroom2.jpg'
import example1 from '../../assets/images/Services/Kitchen/4.avif'
import example2 from '../../assets/images/Services/SittingRoom/5.avif'
import example3 from '../../assets/images/Services/SittingRoom/10.avif'
import example4 from '../../assets/images/Services/SittingRoom/7.avif'
import example5 from '../../assets/images/Services/SittingRoom/5.avif'
import dirty from '../../assets/images/Services/SittingRoom/dirty-sittingRoom.jpg'
import dirty2 from '../../assets/images/Services/Kitchen/dirty-kitchen2.jpg'
import banner from '../../assets/images/Services/Upholstery/3.avif'


export const endOfTenancyPageData = {
  banner: { title: "End of Tenancy Cleaning Services in England" },
  wowSection1: {
    heading: "Move Out With Peace of Mind",
    subheading: "Get Your Full Deposit Back",
    text: "Our end of tenancy cleaning is designed to satisfy even the strictest landlords and agents. We leave the property spotless, helping you secure your deposit and exit with zero hassle.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean empty flat interior",
    list: [
      "🔑 Full top-to-bottom clean for landlords and tenants",
      "🧼 Includes kitchen, bathroom, living spaces and appliances",
      "📋 Checklist-compliant with agency expectations",
    ],
    gradientFrom: "blue-50",
    gradientTo: "indigo-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-indigo-400",
  },
  wowSection2: {
    heading: "Leave the Place Better Than You Found It",
    subheading: "Ready for Inspection",
    text: "Our professional cleaners handle every detail, from limescale and stains to carpets and cupboards. Whether you're a tenant or a landlord preparing for new occupants, we’ve got it covered.",
    image: banner,
    imageAlt: "Cleaner preparing apartment",
    list: [
      "🏠 Ideal for tenants, landlords, estate agents, and property managers",
      "🧽 Thorough cleaning of appliances and fittings",
      "📅 Book even on short notice with flexible scheduling",
    ],
    gradientFrom: "purple-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-purple-700",
    highlightGradient: "from-purple-400 to-blue-400",
  },
  sections: [
    {
      type: "quote",
      heading: "",
      includedTitle: "What's included in end of tenancy cleaning?",
      includedList: [
        { text: "Deep cleaning of every room and surface" },
        { text: "Inside & outside cleaning of appliances: oven, fridge, microwave, etc." },
        { text: "Descaling of bathroom fixtures, tiles, and showers" },
        { text: "Interior window cleaning and dusting of skirting boards, frames, and sills" },
        { text: "Vacuuming and mopping of all floors" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for All Tenancy Situations",
      columns: [
        {
          heading: "Tenants moving out",
          text: "Ensure you leave the property spotless and avoid deductions from your security deposit.",
        },
        {
          heading: "Landlords between tenants",
          text: "Welcome new occupants with a sparkling clean property and ensure your standards are met.",
        },
        {
          heading: "Letting agents or property managers",
          text: "Impress potential renters with a professionally cleaned, move-in-ready space.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Cleaning bathroom fixtures",
      heading: "We Clean What Others Miss",
      text: null,
      list: [
        { text: "Behind appliances, inside cupboards, and under furniture" },
        { text: "Marks on walls, doors, and light switches" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Cleaner scrubbing oven",
      heading: "Specialised Kitchen & Bathroom Focus",
      text: null,
      list: [
        { text: "Degreasing hobs, ovens, and extractor fans" },
        { text: "Disinfecting sinks, taps, toilets, bathtubs, and tiles" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Cleaner polishing windows",
      heading: "Optional Add-ons Available",
      text: "Tailor the clean to your specific needs.",
      list: [
        { text: "Professional carpet or upholstery cleaning" },
        { text: "Window exterior cleaning (where accessible)" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Make Your Move Stress-Free",
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
      title: "Before & After End of Tenancy Cleans",
      slides: [
        { before: example4, after: dirty },
        { before: example1, after: dirty2 },
        { before: example, after: dirty3 },
      ],
    },
    {
      type: "faq",
      serviceEnd
    },
  ],
};

export default function EndTenancyService() {
  return <ServicePageTemplate pageData={endOfTenancyPageData} faqData={serviceEnd} />;
}
