import ServicePageTemplate from "./ServicePageTemplate";
import { serviceRegular } from "../../data/faqData";
import example from '../../assets/images/Services/Bedroom/1.jpg'
import example2 from '../../assets/images/Services/Bedroom/2.png'
import example3 from '../../assets/images/Services/Bedroom/3.avif'
import example4 from '../../assets/images/Services/Bedroom/3.avif'
import example5 from '../../assets/images/Services/SittingRoom/8.avif'

export const domesticCleaningPageData = {
  banner: { title: "Domestic Cleaning Services in England" },
  wowSection1: {
    heading: "Professional Domestic Cleaning",
    subheading: "Your Home, Our Expertise.",
    text: "Experience the difference with our comprehensive domestic cleaning services. From daily maintenance to deep cleaning, we bring professional standards to every corner of your home.",
    image: "https://images.unsplash.com/photo-1581579185169-b7b98bdf33ef?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Clean and tidy living room",
    list: [
      "🏠 Complete home cleaning and maintenance",
      "🧹 Professional equipment and eco-friendly products",
      "👨‍👩‍👧‍👦 Family-friendly cleaning solutions",
    ],
    gradientFrom: "blue-50",
    gradientTo: "green-50",
    gradientVia: "white",
    textColor: "text-blue-700",
    highlightGradient: "from-blue-400 to-green-400",
  },
  wowSection2: {
    heading: "Tailored to Your Home",
    subheading: "Every Home is Unique",
    text: "Our domestic cleaning service adapts to your specific needs and home layout. Whether you have pets, children, or specific requirements, we customize our approach for the best results.",
    image: "https://media.gettyimages.com/id/518333440/photo/office-cleaning-contractors.jpg?s=612x612&w=0&k=20&c=8L42nfzmz10Bge74TGq5ZR9HuW37Z-3izzHYzg-rAS8=",
    imageAlt: "Professional cleaner working in modern home",
    list: [
      "🎯 Customized cleaning plans for your home",
      "🐾 Pet-friendly cleaning products available",
      "🌱 Eco-friendly and hypoallergenic options",
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
      includedTitle: "What's included in domestic cleaning?",
      includedList: [
        { text: "Complete dusting of all surfaces and furniture" },
        { text: "Vacuuming and mopping of all floor types" },
        { text: "Kitchen deep cleaning including appliances" },
        { text: "Bathroom sanitization and fixture cleaning" },
        { text: "Bedroom organization and linen care" },
        { text: "Living areas decluttering and tidying" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for Every Home",
      columns: [
        {
          heading: "Family Homes",
          text: "Keep your family safe with thorough cleaning that removes allergens, dust, and germs from every surface.",
        },
        {
          heading: "Pet Owners",
          text: "Special attention to pet hair, odors, and messes with pet-safe cleaning products and techniques.",
        },
        {
          heading: "Busy Households",
          text: "Maintain a clean, organized home without the stress of finding time for deep cleaning tasks.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Cleaner wiping surface in kitchen",
      heading: "Professional Standards, Personal Touch",
      list: [
        { text: "Trained professionals who understand domestic cleaning needs" },
        { text: "Attention to detail that makes your home feel truly clean" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Cleaner vacuuming a modern hallway",
      heading: "Additional Services Available",
      list: [
        { text: "Oven cleaning, fridge cleaning, and window washing" },
        { text: "Laundry services, ironing, and linen changing" },
        { text: "Carpet cleaning and upholstery care" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Transform Your Home with Professional Domestic Cleaning",
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
      title: "Before and After: Real Domestic Cleaning Results",
      slides: [
        { before: "https://i.pinimg.com/736x/a1/68/d8/a168d8b06f7d88b31c2124f3390fab9f.jpg" },
        { before: "https://i.pinimg.com/736x/aa/ef/92/aaef9211e04e9fec7d3c8c28cb5e266a.jpg" },
      ],
    },
    {
      type: "faq",
      serviceRegular,
    },
  ],
};

export default function DomesticCleaning() {
  return <ServicePageTemplate pageData={domesticCleaningPageData} faqData={serviceRegular} />;
} 