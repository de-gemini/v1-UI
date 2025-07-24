

import React from 'react';


type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  reviewText: string;
  avatarUrl?: string | null;
  hasPlusIcon?: boolean;
  avatarBgColor: string;     
};


const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Amara Johnson',
    date: '3rd of August, 2025',
    rating: 5,
    reviewText: 'The team at DeGemini Services did an incredible job! My apartment looks spotless. Very professional and efficient. Job #502189 Highly recommend!',
    avatarUrl: null,
    hasPlusIcon: true,
    avatarBgColor: 'bg-teal-500',
  },
  {
    id: 2,
    name: 'Kate Morgan',
    date: '2nd of August, 2025',
    rating: 4,
    reviewText: 'Booked an end of tenancy clean—absolutely amazed at the results. The flat was left sparkling. Job #50204',
    avatarUrl: null,
    avatarBgColor: 'bg-purple-600',
  },
  {
    id: 3,
    name: 'Liam Okafor',
    date: '31st of July, 2025',
    rating: 4,
    reviewText: 'Booked a deep clean and I’m honestly impressed. The cleaner was punctual, polite, and detail-oriented. Job #501872',
    avatarUrl: null,
    avatarBgColor: 'bg-blue-600',
  },
  {
    id: 4,
    name: 'Emily Rhodes',
    date: '10th of July, 2025',
    rating: 4,
    reviewText: 'This was my first time using DeGemini and it definitely won’t be the last. Friendly team and professional service. Job #5016329',
    avatarUrl: null, 
    avatarBgColor: 'bg-pink-600',
  },{
    id: 5,
    name: 'Zainab Bello',
    date: '28th of July, 2025',
    rating: 5,
    reviewText: 'Wow! DeGemini transformed my home. Every room looks fresh and tidy. So grateful. Job #501752',
    avatarUrl: null,
    avatarBgColor: 'bg-gray-400',
  },{
    id: 6,
    name: 'James Carter',
    date: '25th of July, 2025',
    rating: 4,
    reviewText: 'Fantastic job from start to finish. Booking was simple, and the cleaner went above and beyond. Job #501560',
    avatarUrl: null,
    avatarBgColor: 'bg-yellow-600',
  },
  {
    id: 7,
    name: 'Chika Eze',
    date: '22nd of July, 2025',
    rating: 4,
    reviewText: 'I’ve never seen my kitchen this clean. Thank you, DeGemini, for your attention to detail. Job #501621',
    avatarUrl: null,
    avatarBgColor: 'bg-purple-600',
  },
  {
    id: 8,
    name: 'Charlotte Evans',
    date: '18th of July, 2025',
    rating: 4,
    reviewText: 'Booked a spring clean and my home feels brand new. So worth it. Job #500980',
    avatarUrl: null,
    avatarBgColor: 'bg-purple-600',
  },
];


const Avatar = ({ review }: { review: Review }) => (
  <div className="relative flex-shrink-0">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-semibold ${review.avatarBgColor}`}>
      {review.avatarUrl ? (
        <img src={review.avatarUrl} alt={review.name} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span>{review.name.charAt(0).toUpperCase()}</span>
      )}
    </div>
    {review.hasPlusIcon && (
      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-white text-sm font-bold">+</span>
      </div>
    )}
  </div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);


const CustomerReviews = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center font-sans p-4 space-y-4">
        <div className='m-[2rem] flex flex-col items-center justify-center gap-[1rem]'>
            <h1 className='text-3xl text-brand-primary font-bold'>What Our Customers Say</h1>
        <img src='https://www.emop.co.uk/static/images/text-quotes-.svg' alt='quote'/>

        <p className='text-sm'>The cleaner did such a great job, thank you!! Job #402061,, definitely going with De-gemini again!</p>
        </div>
      {reviewsData.map((review) => (
        <div key={review.id} className="p-6 w-full md:max-w-5xl lg:max-w-5xl bg-white border border-gray-200 rounded-lg">
          <div className="flex items-start justify-between">
            {/* Left side: Avatar, Name, Rating */}
            <div className="flex items-center space-x-4">
              <Avatar review={review} />
              <div>
                <p className="text-gray-800 font-semibold">{review.name}</p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            {/* Right side: Date */}
            <p className="text-sm text-gray-500 flex-shrink-0">{review.date}</p>
          </div>
          {/* Review Text */}
          <p className="mt-4 text-gray-600">
            {review.reviewText}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;