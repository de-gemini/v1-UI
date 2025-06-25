

import React from 'react';

interface PriorityAreaCardProps {
  title: string;
  description: string;
}

const PriorityAreaCard: React.FC<PriorityAreaCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-purple-400 transition-colors duration-200 h-full">
      <h3 className="text-xl font-bold text-purple-800 mb-3">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed">{description}</p>
    </div>
  );
};

interface PriorityAreasProps {
  sectionTitle?: string;
  areas?: { title: string; description: string }[];
}

export const PriorityAreas: React.FC<PriorityAreasProps> = ({
  sectionTitle = "Priority areas",
  areas = [
    {
      title: "Living room and bedroom",
      description:
        "Professional dusting of surfaces (including furniture, bed frames, bookcases, etc.), wiping the mirrors, mopping, hoovering the carpet, and wiping the picture frames. If needed, you can request changing the linens and bed covers and various other additional services.",
    },
    {
      title: "Kitchen",
      description:
        "Wiping and polishing all surfaces and worktops, mopping and vacuuming the floors, cleaning equipment and appliances, washing the dishes, cleaning doors and handles. You can also request cleaning inside the fridge, the oven and the microwave, arranging things inside kitchen cabinets, etc.",
    },
    {
      title: "Bathroom and hallway",
      description:
        "Polishing and sanitising the sink, the tiles, the toilet, the toilet seat, the bathtubs and/or the shower cubicle. Also, our cleaners hoover/sweep and mop the floors, polish the accessible surfaces and furniture, clean mirrors and glasses, remove fingerprints and marks from surfaces, wipe the skirting boards and the inside of the front door.",
    },
  ],
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 md:mb-12 text-center md:text-left">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <PriorityAreaCard key={index} title={area.title} description={area.description} />
          ))}
        </div>
      </div>
    </section>
  );
};