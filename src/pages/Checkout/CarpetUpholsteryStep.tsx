import React from 'react';
import {
  CARPET_MATERIAL_TYPES,
  CARPET_ROOMS,
  CARPET_RUGS,
  UPHOLSTERY_MATERIAL_TYPES,
  UPHOLSTERY_ITEMS,
  CARPET_ADDONS
} from './ckeckoutData';

const formatPrice = (price: number) => `£${price}`;

const CarpetUpholsteryStep: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = React.useState(CARPET_MATERIAL_TYPES[0].key);
  const [selectedRooms, setSelectedRooms] = React.useState<{ [roomKey: string]: number }>({});
  const [selectedRugs, setSelectedRugs] = React.useState<{ [rugKey: string]: number }>({});
  const [selectedUpholsteryMaterial, setSelectedUpholsteryMaterial] = React.useState(UPHOLSTERY_MATERIAL_TYPES[0].key);
  const [selectedUpholstery, setSelectedUpholstery] = React.useState<{ [itemKey: string]: number }>({});
  const [addons, setAddons] = React.useState<{ [addonKey: string]: boolean }>({});

  // Handlers
  const handleRoomChange = (roomKey: string, delta: number) => {
    setSelectedRooms(prev => ({ ...prev, [roomKey]: Math.max(0, (prev[roomKey] || 0) + delta) }));
  };
  const handleRugChange = (rugKey: string, delta: number) => {
    setSelectedRugs(prev => ({ ...prev, [rugKey]: Math.max(0, (prev[rugKey] || 0) + delta) }));
  };
  const handleUpholsteryChange = (itemKey: string, delta: number) => {
    setSelectedUpholstery(prev => ({ ...prev, [itemKey]: Math.max(0, (prev[itemKey] || 0) + delta) }));
  };
  const handleAddonToggle = (addonKey: string) => {
    setAddons(prev => ({ ...prev, [addonKey]: !prev[addonKey] }));
  };

  // Summary (simple for now)
  const summaryItems = [
    ...Object.entries(selectedRooms).filter(([_, v]) => v > 0).map(([k, v]) => {
      const room = CARPET_ROOMS.find(r => r.key === k);
      return room ? `${room.label}: ${v}` : `${k}: ${v}`;
    }),
    ...Object.entries(selectedRugs).filter(([_, v]) => v > 0).map(([k, v]) => {
      const rug = CARPET_RUGS.find(r => r.key === k);
      return rug ? `${rug.label}: ${v}` : `${k}: ${v}`;
    }),
    ...Object.entries(selectedUpholstery).filter(([_, v]) => v > 0).map(([k, v]) => {
      const item = UPHOLSTERY_ITEMS.find(i => i.key === k);
      return item ? `${item.label}: ${v}` : `${k}: ${v}`;
    }),
    ...Object.entries(addons).filter(([_, v]) => v).map(([k]) => {
      const addon = CARPET_ADDONS.find(a => a.key === k);
      return addon ? addon.label : k;
    })
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* Main form */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
        {/* Material Type Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">1</div>
            <h2 className="text-xl font-semibold text-gray-800">What fibers are your carpets/rugs made off?</h2>
          </div>
          <div className="flex gap-4 mb-6">
            {CARPET_MATERIAL_TYPES.map(type => (
              <button
                key={type.key}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 ${selectedMaterial === type.key ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'} font-medium`}
                onClick={() => setSelectedMaterial(type.key)}
              >
                {type.label}
                <span className="ml-1 text-xs text-gray-400 cursor-pointer" title={type.info}>ℹ️</span>
              </button>
            ))}
          </div>
        </div>
        {/* Carpeted Rooms Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">2</div>
            <h3 className="text-lg font-semibold text-gray-800">Please choose number of rooms with carpets</h3>
          </div>
          <div className="flex flex-col gap-4">
            {CARPET_ROOMS.map(room => (
              <div key={room.key} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={room.icon} alt={room.label} className="w-8 h-8" />
                  <span className="font-medium">{room.label}</span>
                  <span className="ml-2 text-xs text-gray-500 font-semibold">{formatPrice(room.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleRoomChange(room.key, -1)}>-</button>
                  <span className="w-8 text-center text-lg">{selectedRooms[room.key] || 0}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleRoomChange(room.key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Rugs Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">3</div>
            <h3 className="text-lg font-semibold text-gray-800">Please choose number and size of rugs</h3>
          </div>
          <div className="flex flex-col gap-4">
            {CARPET_RUGS.map(rug => (
              <div key={rug.key} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={rug.icon} alt={rug.label} className="w-8 h-8" />
                  <span className="font-medium">{rug.label}</span>
                  <span className="ml-2 text-xs text-gray-500 font-semibold">{formatPrice(rug.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleRugChange(rug.key, -1)}>-</button>
                  <span className="w-8 text-center text-lg">{selectedRugs[rug.key] || 0}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleRugChange(rug.key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Upholstery Material Type Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">4</div>
            <h3 className="text-lg font-semibold text-gray-800">What material is your upholstery?</h3>
          </div>
          <div className="flex gap-4 mb-6">
            {UPHOLSTERY_MATERIAL_TYPES.map(type => (
              <button
                key={type.key}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 ${selectedUpholsteryMaterial === type.key ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'} font-medium`}
                onClick={() => setSelectedUpholsteryMaterial(type.key)}
              >
                {type.label}
                <span className="ml-1 text-xs text-gray-400 cursor-pointer" title={type.info}>ℹ️</span>
              </button>
            ))}
          </div>
        </div>
        {/* Upholstery Items Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">5</div>
            <h3 className="text-lg font-semibold text-gray-800">Please choose upholstery items</h3>
          </div>
          <div className="flex flex-col gap-4">
            {UPHOLSTERY_ITEMS.map(item => (
              <div key={item.key} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.label} className="w-8 h-8" />
                  <span className="font-medium">{item.label}</span>
                  <span className="ml-2 text-xs text-gray-500 font-semibold">{formatPrice(item.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleUpholsteryChange(item.key, -1)}>-</button>
                  <span className="w-8 text-center text-lg">{selectedUpholstery[item.key] || 0}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-purple-100" onClick={() => handleUpholsteryChange(item.key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add-ons Section */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">6</div>
            <h3 className="text-lg font-semibold text-gray-800">Additional Options</h3>
          </div>
          <div className="flex flex-col gap-4">
            {CARPET_ADDONS.map(addon => (
              <label key={addon.key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!addons[addon.key]}
                  onChange={() => handleAddonToggle(addon.key)}
                  className="accent-brand-primary w-5 h-5"
                />
                <span className="font-medium text-gray-700">{addon.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Summary and Next Button */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-900 text-sm font-medium">
            <h4 className="font-semibold mb-2">Summary</h4>
            {summaryItems.length === 0 ? (
              <span>No items selected yet.</span>
            ) : (
              <ul className="list-disc pl-6">
                {summaryItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end">
            <button className="bg-brand-primary text-white px-6 py-2 rounded font-semibold hover:bg-blue-900 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpetUpholsteryStep;
