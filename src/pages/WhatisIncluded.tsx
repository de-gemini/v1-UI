import React, { useState } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { PiToiletLight, PiCookingPotLight, PiBedLight, PiStairsLight } from 'react-icons/pi';

import bathroomBg from '../assets/images/Services/Bathroom/1.jpg';
import kitchenBg from '../assets/images/Services/Kitchen/5.avif';
import bedroomBg from '../assets/images/Services/SittingRoom/4.avif';
import hallsBg from '../assets/images/Services/Office/8.avif';
import officeBg from '../assets/images/Services/Office/6.avif';

type HomeCategories = "Bathroom" | "Kitchen" | "Bedroom" | "Halls";

type ContentType = {
  home: Record<HomeCategories, string[]>;
  office: string[];
};

const content: ContentType = {
  home: {
    Bathroom: [
      "Washing and sanitizing the toilet, the sink and the bidet",
      "Cleaning and washing the shower and the tub",
      "Wiping down mirrors, glass fixtures and lighting appliance",
      "Dusting all accessible surfaces",
      "Wiping down walls, doors, door handles and switches",
      "Vacuuming and washing the floor and skirting boards",
      "Taking out rubbish"
    ],
    Kitchen: [
      "Dusting all accessible surfaces",
      "Wiping mirrors and glass fixtures",
      "Wiping appliances",
      "Folding clothes and arranging things",
      "Wiping doors, door handles, and switches",
      "Cleaning lighting appliances, and chandeliers",
      "Vacuum cleaning of the carpets and washing the floor and skirting boards",
      "Taking out rubbish"
    ],
    Bedroom: [
      "Making beds and arranging linen",
      "Dusting all furniture and decor",
      "Vacuuming carpets and mopping floors",
      "Cleaning windows and ledges",
      "Wiping down doors and light switches",
      "Organizing scattered items",
      "Disposing trash and replacing bin liners"
    ],
    Halls: [
      "Sweeping and mopping hallway floors",
      "Cleaning handrails and banisters",
      "Polishing doorknobs and handles",
      "Dusting all decorative items",
      "Vacuuming rugs and carpets",
      "Removing cobwebs from corners",
      "Emptying trash bins"
    ]
  },
  office: [
    "Vacuuming carpets and floors",
    "Wiping down desks and workspaces",
    "Emptying bins and replacing liners",
    "Disinfecting shared equipment (phones, keyboards)",
    "Cleaning glass doors and partitions",
    "Dusting shelves and surfaces",
    "Mopping common areas"
  ]
};

const categories: { key: HomeCategories; label: string; icon: JSX.Element }[] = [
  { key: "Bedroom", label: "Bedroom, living, dining, office rooms", icon: <PiBedLight size={28} /> },
  { key: "Bathroom", label: "Bathroom", icon: <PiToiletLight size={28} /> },
  { key: "Kitchen", label: "Kitchen", icon: <PiCookingPotLight size={28} /> },
  { key: "Halls", label: "Halls, stairs", icon: <PiStairsLight size={28} /> }
];

const backgroundMap: Record<HomeCategories, string> = {
  Bathroom: bathroomBg,
  Kitchen: kitchenBg,
  Bedroom: bedroomBg,
  Halls: hallsBg
};

export default function WhatisIncluded() {
  const [activeTab, setActiveTab] = useState<"home" | "office">("home");
  const [homeCategory, setHomeCategory] = useState<HomeCategories>("Bathroom");

  const getHomeContent = () => content.home[homeCategory];
  const currentBg = activeTab === 'home' ? backgroundMap[homeCategory] : officeBg;

  return (
    <div
      className="min-h-screen bg-cover bg-center text-[#333]"
      style={{ backgroundImage: `url(${currentBg})` }}
    >
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">What is included in eMop cleaning?</h2>
        <div className="flex justify-center gap-6 mt-4 text-sm font-medium">
          <button
            className={`${
              activeTab === "home" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            } pb-1`}
            onClick={() => setActiveTab("home")}
          >
            Home Cleaning
          </button>
          <button
            className={`${
              activeTab === "office" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            } pb-1`}
            onClick={() => setActiveTab("office")}
          >
            Office Cleaning
          </button>
        </div>
      </div>

      {activeTab === "home" && (
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-4 gap-4 text-center mb-6">
            {categories.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setHomeCategory(key)}
                className={`flex flex-col items-center py-4 border rounded ${
                  homeCategory === key ? "bg-blue-100 border-blue-600" : "bg-white"
                }`}
              >
                <span>{icon}</span>
                <span className="text-xs mt-2">{label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white/90 p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
            {getHomeContent().map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <FaCheckCircle className="text-purple-600 mt-1" />
                <span>{item}</span>
              </div>
            ))}
            <div className="col-span-full border-t border-gray-300 pt-4">
              <p className="text-sm text-gray-600">
                Our standard cleaning service includes everything you need to get your home in order as
                quickly as possible. You can book additional services when you make your booking.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "office" && (
        <div className="max-w-3xl mx-auto bg-white/90 p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.office.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <FaCheckCircle className="text-purple-600 mt-1" />
              <span>{item}</span>
            </div>
          ))}
          <div className="col-span-full border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-600">
              Our office cleaning ensures a tidy and hygienic workspace. Additional services are available
              on request.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
