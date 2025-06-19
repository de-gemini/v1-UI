

import React from 'react';
import { ArrowRight } from 'lucide-react'; // Using ArrowRight for "Read Article" link

// --- Interfaces for Typing ---
interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl?: string; // Optional image for the card
  readMoreLink: string;
}

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean; // To apply different styling for the featured card
}

// --- Reusable BlogCard Component ---
export const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
  return (
    <div className={`
      bg-tansparent overflow-hidden flex flex-col
      ${isFeatured ? 'lg:flex-row h-auto lg:h-[400px]' : 'h-full'}
      transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg
    `}>
      {post.imageUrl && (
        <div className={`
          ${isFeatured ? 'lg:w-1/2 w-full h-64 lg:h-full' : 'w-full h-48'}
          overflow-hidden bg-gray-100 transition duration-200 hover:scale-[1.1]
        `}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'https://placehold.co/400x250/ccc/333?text=Image+Error';
            }}
          />
        </div>
      )}
      <div className={`p-5 flex flex-col bg-brand-primary border border-l-brand-primary border-r-brand-primary ${isFeatured ? 'lg:w-1/2' : 'flex-grow'}`}>
        <p className="text-white nunito-sans-text text-xs font-semibold uppercase mb-2">
          {post.date} &bull; {post.category}
        </p>
        <h3 className={`font-bold text-brand-secondary mb-3 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'}`}>
          {post.title}
        </h3>
        <p className={`text-white nunito-sans-text ${isFeatured ? 'text-base lg:text-lg' : 'text-sm'} leading-relaxed flex-grow`}>
          {post.excerpt}
        </p>
        <a href={post.readMoreLink} className="mt-4 text-white nunito-sans-text font-semibold flex items-center hover:underline">
          READ ARTICLE <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};