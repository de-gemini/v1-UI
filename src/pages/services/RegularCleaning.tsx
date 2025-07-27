import ServicePageTemplate from "./ServicePageTemplate";
import { serviceRegular } from "../../data/faqData";
import example from '../../assets/images/Services/Bedroom/1.jpg'
import example2 from '../../assets/images/Services/Bedroom/2.png'
import example3 from '../../assets/images/Services/Bedroom/3.avif'
import dirty2 from '../../assets/images/Services/Bedroom/dirty-bedroom.jpg'
import example4 from '../../assets/images/Services/Bedroom/3.avif'
import example5 from '../../assets/images/Services/SittingRoom/8.avif'
import dirty3 from '../../assets/images/Services/SittingRoom/dirty-sittingRoom.jpg'
import dirty from '../../assets/images/Services/Bathroom/dirty-bathroom.jpg'




export const regularCleaningPageData = {
  banner: { title: "Regular Home Cleaning Services in England" },
  wowSection1: {
    heading: "A Clean Home—Always",
    subheading: "Consistent Comfort. Effortless Cleanliness.",
    text: "Our regular cleaning service gives you peace of mind and more free time. Whether it's weekly or bi-weekly, we ensure your home is always spotless, fresh, and welcoming.",
    image: "https://images.unsplash.com/photo-1581579185169-b7b98bdf33ef?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean and tidy living room",
    list: [
      "🧼 Dusting, vacuuming, and mopping",
      "🛏️ Bedroom tidying and linen changes",
      "🚿 Bathroom & kitchen surfaces sanitised",
    ],
    gradientFrom: "purple-50",
    gradientTo: "pink-50",
    gradientVia: "white",
    textColor: "text-purple-700",
    highlightGradient: "from-purple-400 to-pink-400",
  },
  wowSection2: {
    heading: "Flexible Schedules. Trusted Cleaners.",
    subheading: "Your Routine, Our Responsibility",
    text: "Book a reliable cleaner at a frequency that suits your lifestyle. All our professionals are background-checked and trained to deliver spotless results—every single time.",
    image: "https://media.gettyimages.com/id/518333440/photo/office-cleaning-contractors.jpg?s=612x612&w=0&k=20&c=8L42nfzmz10Bge74TGq5ZR9HuW37Z-3izzHYzg-rAS8=",
    imageAlt: "Professional cleaner working in modern home",
    list: [
      "🧽 Choose from weekly, fortnightly, or monthly visits",
      "👥 Same cleaner on every visit (when possible)",
      "🌿 Eco-friendly cleaning options available",
    ],
    gradientFrom: "pink-50",
    gradientTo: "purple-50",
    gradientVia: "white",
    textColor: "text-pink-700",
    highlightGradient: "from-pink-400 to-purple-400",
  },
  sections: [
    {
      type: "quote",
      includedTitle: "What’s included in regular cleaning?",
      includedList: [
        { text: "Dusting all surfaces, furniture, and décor" },
        { text: "Vacuuming carpets and rugs; mopping hard floors" },
        { text: "Disinfecting kitchen counters, sinks, and appliances" },
        { text: "Cleaning and sanitising bathrooms and toilets" },
        { text: "Emptying bins and light tidying of rooms" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for Any Lifestyle",
      columns: [
        {
          heading: "Busy Professionals",
          text: "Come home to a clean, organised space without lifting a finger after a long day at work.",
        },
        {
          heading: "Families with Kids",
          text: "Stay on top of the mess with reliable, consistent cleaning that keeps your home safe and tidy.",
        },
        {
          heading: "Elderly or Remote Workers",
          text: "Support your routine with a little help around the house so you can focus on what matters.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Cleaner wiping surface in kitchen",
      heading: "Same Cleaner, Same High Standards",
      list: [
        { text: "We aim to assign the same professional for every visit" },
        { text: "They get to know your home and preferences over time" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Cleaner vacuuming a modern hallway",
      heading: "Custom Cleaning Tasks Available",
      list: [
        { text: "Add oven, fridge, or inside-window cleaning on request" },
        { text: "Change linens, laundry folding, or ironing—just ask" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Keep Your Home Sparkling—All Year Round",
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
      title: "Real Homes. Real Results.",
      slides: [
        { before: example4, after: dirty },
        { before: example3, after: dirty2 },
        { before: example5, after: dirty3 },
      ],
    },
    {
      type: "faq",
      serviceRegular,
    },
  ],
};

export default function RegularCleaning() {
  return <ServicePageTemplate pageData={regularCleaningPageData} faqData={serviceRegular} />;
}
