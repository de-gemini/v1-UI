import ServicePageTemplate from "./ServicePageTemplate";
import { serviceRegular } from "../../data/faqData";
import example from '../../assets/images/Services/Bedroom/2.png'
import example1 from '../../assets/images/Services/Office/7.avif'
import banner from '../../assets/images/Services/SittingRoom/8.avif'
import example2 from '../../assets/images/Services/Bedroom/2.png'
import dirty2 from '../../assets/images/Services/Bedroom/dirty-bedroom.jpg'
import example4 from '../../assets/images/Services/Bedroom/3.avif'
import example5 from '../../assets/images/Services/SittingRoom/8.avif'
import dirty3 from '../../assets/images/Services/SittingRoom/dirty-sittingRoom.jpg'
import dirty from '../../assets/images/Services/Office/dirty-offfice2.jpg'


export const sameDayCleaningPageData = {
  banner: { title: "Same Day Cleaning Services in England" },
  wowSection1: {
    heading: "Need Urgent Cleaning? We’ve Got You",
    subheading: "Clean Spaces in Hours—Not Days",
    text: "Unexpected guests, last-minute events, or just an overwhelming mess? Our same day cleaning service is designed for speed and efficiency. We bring spotless results when time is tight.",
    image: "https://images.unsplash.com/photo-1617854658344-d487d9fddcc1?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Cleaner working fast in modern apartment",
    list: [
      "⚡ Rapid response and arrival",
      "🧼 Thorough cleaning in limited time",
      "🕒 Bookings available 7 days a week",
    ],
    gradientFrom: "blue-50",
    gradientTo: "gray-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-gray-400",
  },
  wowSection2: {
    heading: "Flexible, Reliable, Professional",
    subheading: "Your Emergency is Our Priority",
    text: "Our vetted cleaners are trained to handle tight deadlines without compromising on quality. Whether it’s your home or office, we’ll leave it fresh, tidy, and guest-ready in just hours.",
    image: banner,
    imageAlt: "Happy client after urgent cleaning",
    list: [
      "📍 Available across England with short notice",
      "🚪 Entry-ready spaces for real estate or viewings",
      "🏠 Home, office, or rental—we do it all",
    ],
    gradientFrom: "gray-50",
    gradientTo: "blue-50",
    gradientVia: "white",
    textColor: "text-gray-700",
    highlightGradient: "from-gray-400 to-blue-400",
  },
  sections: [
    {
      type: "quote",
      includedTitle: "What’s included in Same Day Cleaning?",
      includedList: [
        { text: "Quick vacuuming and mopping of all floors" },
        { text: "Surface wipe-downs and disinfecting" },
        { text: "Bathroom and toilet refresh" },
        { text: "Kitchen surfaces, sinks, and appliance fronts" },
        { text: "Bin emptying and general tidying" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect For Urgent Situations Like",
      columns: [
        {
          heading: "Surprise Visitors or Parties",
          text: "Don’t stress over unexpected guests. We'll have your space party-ready in hours.",
        },
        {
          heading: "End-of-Day Rental Cleanups",
          text: "Last-minute vacates? We'll make sure your flat or Airbnb is spotless for handover.",
        },
        {
          heading: "Busy Week + Zero Time",
          text: "No time for a full clean? Our team handles essentials so you can breathe easy.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Cleaner preparing room quickly",
      heading: "How Fast is Same Day?",
      list: [
        { text: "Book before noon for guaranteed same-day slots" },
        { text: "Team dispatched in as little as 2 hours" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example1,
      imageAlt: "Cleaner rushing with supplies",
      heading: "What You’ll Get",
      list: [
        { text: "Tidy, refreshed spaces with priority zones cleaned" },
        { text: "Polished surfaces and fresh scent throughout" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Book Your Same Day Clean Now",
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
      title: "Real Before & After Same-Day Jobs",
      slides: [
        { before: example1, after: dirty },
        { before: example, after: dirty2 },
      ],
    },
    {
      type: "faq",
      serviceRegular,
    },
  ],
};

export default function SameDayCleaning() {
  return <ServicePageTemplate pageData={sameDayCleaningPageData} faqData={serviceRegular} />;
}
