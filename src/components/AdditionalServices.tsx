

import React from 'react';
import { Check, X } from 'lucide-react';

// Data for the "What we do" list
const servicesIncluded = [
  'Windows cleaning (inside and outside where possible)',
  'Cleaning inside kitchen cabinets',
  'Cleaning bookcases',
  'Cleaning inside the fridge and the microwave',
  'Cleaning of oven & grill, disinfection',
  'Changing linens and bed covers',
  'Ironing & Laundry',
];

// Data for the "What we don't do" list
const servicesExcluded = [
  'Do not lift or move heavy objects of interior',
  'Do not clean in places with restricted access',
  'Do not remove and do not clean curtains and blinds',
  'Do not remove or clean mosquito nets',
  'Do not do professional carpet cleaning',
  'Do not work in the yard (cleaning in the garden, and so on)',
];


const AdditionalServices = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">
          Additional services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          For advanced cleaning, you can add more services when booking.
          Most extra cleaning add-ons add half an hour to the cleaning time of your booking.
        </p>
      </div>

      {/* Grid container for the two cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Card 1: What we do */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            What we do
          </h3>
          <ul className="w-full space-y-3 list-disc pl-5 text-gray-700">
            {servicesIncluded.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Card 2: What we don't do */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            What we don't do
          </h3>
          <ul className="w-full space-y-3 list-disc pl-5 text-gray-700">
            {servicesExcluded.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
            <a href='/checkout' className='text-center w-full md:w-full lg:w-[10rem] text-white bg-brand-primary p-5'>
                Book Now
            </a>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;