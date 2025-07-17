

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  readMoreLink: string;
}

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
  showDivider?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false, showDivider = false }) => {
  return (
    <>
      {showDivider && <hr className="w-full border-t border-gray-200 mb-6" />}
      <div
        className={`
          bg-white overflow-hidden flex flex-col
          ${isFeatured ? '' : ''}
        `}
        style={{ minHeight: isFeatured ? 420 : 340 }}
      >
        {post.imageUrl && (
          <div className="w-full h-56 overflow-hidden bg-gray-200">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://placehold.co/400x250/ccc/333?text=Image+Error';
              }}
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs font-semibold uppercase text-brand-primary mb-2 tracking-wider">
            {post.date} &bull; {post.category}
          </p>
          <h3 className={`font-bold mb-2 ${isFeatured ? 'text-2xl text-brand-secondary' : 'text-lg text-brand-primary'}`}>
            {post.title}
          </h3>
          <p className={`mb-4 text-gray-700 ${isFeatured ? 'text-base' : 'text-sm'}`}> 
            {post.excerpt}
          </p>
          <a
            href={post.readMoreLink}
            className="mt-auto inline-flex items-center text-brand-secondary font-semibold hover:underline"
          >
            READ ARTICLE <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
};