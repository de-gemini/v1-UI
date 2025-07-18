import React, { useState } from "react";
import { Search, ArrowRight, MapPin, Check } from "lucide-react";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../constants";
import CommonPostcodeInput from '../components/commons/CommonPostcodeInput';
import Navbar from "../components/Navbar";

export default function Blog() {
  const navigate = useNavigate();

  interface BlogPost {
    id: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    imageUrl?: string;
    readMoreLink: string;
  }

  const blogCategories = [
    "CLEANING TRENDS",
    "PET CARE",
    "HEALTH & HYGIENE",
    "FAMILY LIFE",
    "SEASONAL CLEANING",
    "TECH & TOOLS",
    "GREEN LIVING",
    "ORGANISATION",
    "LIFESTYLE",
    "DIY"
  ];
  const [activeCategory, setActiveCategory] = useState<string>("");

  const featuredPost: BlogPost = {
    id: "featured-1",
    date: "20 JUNE",
    category: "PET CARE",
    title: "Dog Owners: Keeping Your Home Clean with Pets",
    excerpt:
      "Dogs bring joy and companionship, but also fur and muddy paws! Discover practical tips for maintaining a spotless home with your canine friend.",
    imageUrl:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    readMoreLink: "#",
  };

  const allBlogPosts: BlogPost[] = [
    {
      id: "blog-eco-1",
      date: "15 JUNE",
      category: "ECO LIVING",
      title: "Eco-Friendly Cleaning Products for a Greener Home",
      excerpt:
        "Switch to sustainable cleaning with these eco-friendly products that are safe for your family and the planet.",
      imageUrl:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
      readMoreLink: "#",
    },
    {
      id: "blog-cleaner-1",
      date: "10 JUNE",
      category: "CLEANER STORIES",
      title: "A Day in the Life of a Professional Cleaner",
      excerpt:
        "Ever wondered what it’s like to be a professional cleaner? Step into the shoes of a Gemini Cleaning team member for a day.",
      imageUrl:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      readMoreLink: "#",
    },
    {
      id: "blog-schedule-1",
      date: "05 JUNE",
      category: "SCHEDULING",
      title: "How to Schedule Your Cleaning for Maximum Efficiency",
      excerpt:
        "Learn how to create a cleaning schedule that fits your lifestyle and keeps your home sparkling all week long.",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", // human portrait
      readMoreLink: "#",
    },
    {
      id: "blog-tips-1",
      date: "01 JUNE",
      category: "CLEANING TIPS",
      title: "Quick Cleaning Hacks for Busy People",
      excerpt:
        "Short on time? Try these quick and effective cleaning hacks to keep your home tidy with minimal effort.",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80", // human portrait
      readMoreLink: "#",
    },
    {
      id: "blog-family-1",
      date: "28 MAY",
      category: "FAMILY LIFE",
      title: "Getting Kids Involved in Cleaning: Fun & Easy Tips",
      excerpt:
        "Turn chores into games and teach your children valuable life skills with these creative cleaning activities.",
      imageUrl:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      readMoreLink: "#",
    },
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory
    ? allBlogPosts.filter((post) => post.category === activeCategory)
    : allBlogPosts;

  return (
    <div className="font-sans antialiased bg-gray-100 text-gray-800 min-h-screen">
      <Navbar/>

      {/* Bold Welcome/Hero Section */}
      <section className="relative px-6 sm:px-16 py-12 bg-brand-primary text-white flex flex-col md:flex-row items-center justify-between overflow-hidden">
        {/* SVG Background - Oval Shapes */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center -top-12 -right-32">
          <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto" style={{ opacity: 0.10 }}>
            <ellipse cx="400" cy="200" rx="350" ry="150" fill="#fff" />
          </svg>
        </div>
        {/* Smaller Oval */}
        <div className="absolute top-10 left-10 z-0 pointer-events-none">
          <svg width="300" height="120" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.07 }}>
            <ellipse cx="150" cy="60" rx="120" ry="45" fill="#fff" />
          </svg>
        </div>
        <div className="z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to the <span className="text-brand-secondary">De Gemini Blog</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Tips, stories, and inspiration from the UK's leading cleaning service.
          </p>
          <a
            href="#blog-posts"
            className="inline-block bg-brand-secondary text-brand-primary font-bold px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-brand-primary transition"
          >
            Explore Articles
          </a>
        </div>
        <div className="hidden md:block absolute right-0 bottom-0 w-1/3 max-w-xs opacity-80 pointer-events-none" style={{ zIndex: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="De Gemini Blog Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white py-6 px-6 sm:px-16 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-start gap-3">
          <div className="relative flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50 text-gray-600">
            <Search className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-sm"
            />
          </div>
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(activeCategory === category ? "" : category)
              }
              className={`
                px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap
                transition duration-300 ease-in-out
                ${
                  activeCategory === category
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section id="blog-posts" className="py-12 px-6 sm:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <BlogCard post={featuredPost} isFeatured={true} />
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.id} post={post} showDivider={idx !== 0} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="w-full flex flex-col items-center justify-center mt-10 mb-[4rem] px-6 sm:px-16"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[40px] text-brand-primary">
          Cleaning Is No Longer <br />
          Your Burden
        </h1>
        <CommonPostcodeInput />
      </section>

      <Footer />
    </div>
  );
}
