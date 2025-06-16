import React, { useState } from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";

export default function Blog() {
  const [postcode, setPostcode] = useState<string>("");

  const handleQuoteMeClick = () => {
    console.log(
      `Getting quote for additional services with postcode: ${postcode}`
    );
  };

  interface BlogPost {
    id: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    imageUrl?: string; // Optional image for the card
    readMoreLink: string;
  }

  const blogCategories = [
    "CLEANING CHECKLISTS",
    "CLEANING TIPS",
    "DECLUTTERING",
    "ECO LIVING",
    "EMOP STORIES",
  ];
  const [activeCategory, setActiveCategory] = useState<string>(""); // State for active category

  const featuredPost: BlogPost = {
    id: "featured-1",
    date: "14 OCTOBER",
    category: "EMOP STORIES",
    title: "An Update on eMop's Growth Throughout the UK",
    excerpt:
      "We are excited to announce eMop's latest achievement - our growth throughout the UK. We have not just been pleasing clients in London - where we began - but in recent years, throughout the UK.",
    imageUrl:
      "https://www.emop.co.uk/blog/wp-content/uploads/2023/10/pexels-karolina-grabowska-4239031.jpg", // Example featured image
    readMoreLink: "#",
  };

  const allBlogPosts: BlogPost[] = [
    {
      id: "blog-1",
      date: "14 OCTOBER",
      category: "EMOP STORIES",
      title: "An Update on eMop's Growth Throughout the UK",
      excerpt:
        "We are excited to announce eMop's latest achievement - our growth throughout the UK. We have not just been pleasing clients in London - where we began - but in recent years, throughout the UK.",
      imageUrl:
        "https://www.emop.co.uk/blog/wp-content/uploads/2023/10/pexels-karolina-grabowska-4239031.jpg", // Small card image
      readMoreLink: "#",
    },
    {
      id: "blog-2",
      date: "21 APRIL",
      category: "EMOP STORIES",
      title: "Reclean Is Guaranteed With eMop",
      excerpt:
        "Although we are confident in the quality of our cleaning services, we understand that there may be instances where things don't go as planned.",
      imageUrl:
        "https://www.emop.co.uk/blog/wp-content/uploads/2023/04/housekeeping-2977056_1280.jpg", // Small card image
      readMoreLink: "#",
    },
    {
      id: "blog-3",
      date: "01 MARCH",
      category: "CLEANING TIPS",
      title: "Top 5 Tips for a Sparkling Kitchen",
      excerpt:
        "Discover expert tips and tricks to keep your kitchen spotless and hygienic, making your cleaning routine more efficient and effective.",
      readMoreLink: "#",
    },
    {
      id: "blog-4",
      date: "10 FEBRUARY",
      category: "DECLUTTERING",
      title: "Organizing Your Home: A Simple Guide",
      excerpt:
        "Learn easy strategies to declutter and organize your living spaces, creating a more peaceful and functional home environment.",
      imageUrl:
        "https://www.emop.co.uk/blog/wp-content/uploads/2023/04/jess-bailey-94Ld_MtIUf0-unsplash2-1.jpg", // Small card image
      readMoreLink: "#",
    },
    {
      id: "blog-5",
      date: "05 JANUARY",
      category: "ECO LIVING",
      title: "Eco-Friendly Cleaning Products You Must Try",
      excerpt:
        "Explore sustainable and non-toxic cleaning alternatives that are good for your home, your health, and the planet.",
      readMoreLink: "#",
    },
    // Add more blog posts as needed to fill the grid
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory
    ? allBlogPosts.filter((post) => post.category === activeCategory)
    : allBlogPosts;

  return (
    <div className="font-sans antialiased bg-gray-100 text-gray-800 min-h-screen">
      {/* Featured Blog Post Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* header */}
        <div className="bg-transparent flex items-center justify-between">
        <h2 className="text-4xl font-extrabold text-purple-900 mb-2">
            <img src="https://www.emop.co.uk/static/images/152x90emop_logox2.png" alt="eMop Logo" className="w-24 mb-4 inline" /> <span className="font-extralight text-brand-primary tracking-[1rem]">BLOG</span>
            </h2>
            <button
            className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
            BOOK NOW
          </button>
        </div>
        <BlogCard post={featuredPost} isFeatured={true} />
      </section>

      {/* Categories Filter */}
      <section className="bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-md">
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
              } // Toggle active category
              className={`
                  px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap
                  transition duration-300 ease-in-out
                  ${
                    activeCategory === category
                      ? "bg-purple-700 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}>
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* eMop Blog Welcome Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl font-extrabold text-purple-900 mb-2">
            <img src="https://www.emop.co.uk/static/images/152x90emop_logox2.png" alt="eMop Logo" className="w-24 mb-4 inline" /> <span className="font-extralight text-brand-primary tracking-[1rem]">BLOG</span>
            </h2>
            <p className="text-gray-600 text-lg">
            Welcome to the blog from eMop - the best cleaning company in London
            </p>
          </div>
          {/* Optional: Add image/element from screenshot here if desired */}
          {/* <img src="path/to/some/image.png" alt="Blog Illustration" className="w-48 h-auto" /> */}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Optional: Footer or other sections below */}
      <section
        className="w-full flex flex-col items-center justify-center mt-10 mb-[4rem]"
        style={{
          backgroundImage: `url('https://www.emop.co.uk/static/images/bot_cta_bg_new.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
        <h1 className="font-[700] text-[30px] md:text-[40px] lg:text-[40px] text-brand-secondary">
          Cleaning Is No Longer <br />
          Your Burden
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-2 pr-2 sm:p-3 sm:pr-3 rounded-xl shadow-lg border border-purple-300 max-w-md w-full">
          <div className="flex items-center flex-grow p-2">
            <MapPin className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter your post code here"
              className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none text-base sm:text-lg bg-transparent"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              aria-label="Enter your postcode"
            />
          </div>
          <button
            onClick={handleQuoteMeClick}
            className="mt-4 sm:mt-0 ml-0 sm:ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
            QUOTE ME
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
