import ServicePageTemplate from "./ServicePageTemplate";
import { serviceUpholstery } from "../../data/faqData";
import example from '../../assets/images/Services/Upholstery/1.avif'
import example2 from '../../assets/images/Services/Upholstery/2.avif'
import example3 from '../../assets/images/Services/Upholstery/3.avif'
import example4 from '../../assets/images/Services/Upholstery/4.avif'
import example5 from '../../assets/images/Services/Upholstery/5.avif'
import upholsteryImage from '../../assets/images/Services/Upholstery/upholstery-service.jpg'

export const upholsteryCleaningPageData = {
  banner: { title: "Professional Upholstery Cleaning Services in England" },
  wowSection1: {
    heading: "Restore Your Furniture to Its Former Glory",
    subheading: "Expert Upholstery Care. Gentle & Effective.",
    text: "Our professional upholstery cleaning service brings new life to your sofas, chairs, and soft furnishings. Using advanced techniques and fabric-safe solutions, we remove deep-seated dirt, stains, and allergens while preserving the beauty of your furniture.",
    image: "https://images.unsplash.com/photo-1581579185169-b7b98bdf33ef?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Professional upholstery cleaning",
    list: [
      "🧼 Deep fabric cleaning and stain removal",
      "🛋️ Sofa, chair, and cushion restoration",
      "🌿 Eco-friendly cleaning solutions",
    ],
    gradientFrom: "purple-50",
    gradientTo: "pink-50",
    gradientVia: "white",
    textColor: "text-purple-700",
    highlightGradient: "from-purple-400 to-pink-400",
  },
  wowSection2: {
    heading: "Fabric-Safe Methods. Proven Results.",
    subheading: "Your Furniture Deserves the Best Care",
    text: "Every fabric type requires specific care. Our trained professionals assess your upholstery and choose the most appropriate cleaning method to ensure optimal results without damaging your valuable furniture.",
    image: "https://media.gettyimages.com/id/518333440/photo/office-cleaning-contractors.jpg?s=612x612&w=0&k=20&c=8L42nfzmz10Bge74TGq5ZR9HuW37Z-3izzHYzg-rAS8=",
    imageAlt: "Professional upholstery cleaner at work",
    list: [
      "🧪 Fabric testing before cleaning",
      "👥 Experienced upholstery specialists",
      "⚡ Quick drying times for convenience",
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
      includedTitle: "What's included in upholstery cleaning?",
      includedList: [
        { text: "Fabric assessment and pre-treatment" },
        { text: "Deep cleaning with appropriate methods" },
        { text: "Stain and spot treatment" },
        { text: "Odor removal and deodorization" },
        { text: "Fabric protection application" },
      ],
      priceCard: {},
    },
    {
      type: "custom",
      customType: "multiColumnGrid",
      title: "Perfect for All Furniture Types",
      columns: [
        {
          heading: "Sofas & Couches",
          text: "Restore your living room centerpiece with deep cleaning that removes years of accumulated dirt and stains.",
        },
        {
          heading: "Dining Chairs",
          text: "Keep your dining area spotless with professional cleaning that handles food stains and spills effectively.",
        },
        {
          heading: "Office Furniture",
          text: "Maintain a professional appearance with regular upholstery cleaning for your office chairs and seating.",
        },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example,
      imageAlt: "Professional upholstery cleaning process",
      heading: "Advanced Cleaning Technology",
      list: [
        { text: "We use state-of-the-art equipment for optimal results" },
        { text: "Fabric-safe solutions that won't damage your furniture" },
      ],
    },
    {
      type: "custom",
      customType: "twoColumnImageText",
      image: example2,
      imageAlt: "Clean and restored upholstery",
      heading: "Stain Removal Expertise",
      list: [
        { text: "Specialized treatments for various stain types" },
        { text: "Color-safe cleaning that preserves fabric integrity" },
      ],
    },
    {
      type: "custom",
      customType: "callToActionBanner",
      heading: "Give Your Furniture the Care It Deserves",
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
      title: "Before & After Results",
      slides: [
        { before: "https://i.pinimg.com/1200x/aa/96/c9/aa96c98dcaf60759f9a5225df5623d3b.jpg" },
        { before: example3 },
        { before: example4 },
        { before: example5 },
      ],
    },
    {
      type: "faq",
      serviceUpholstery,
    },
  ],
};

export default function UpholsteryCleaning() {
  return <ServicePageTemplate pageData={upholsteryCleaningPageData} faqData={serviceUpholstery} />;
}