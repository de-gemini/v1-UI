import React from 'react';
import {
  CARPET_MATERIAL_TYPES,
  CARPET_ROOMS,
  CARPET_RUGS,
  UPHOLSTERY_MATERIAL_TYPES,
  UPHOLSTERY_ITEMS,
  CARPET_ADDONS
} from './ckeckoutData';
import BookingSummary from './BookingSummary';
import { useCheckoutStore, useCarpetCleaningState } from '../../store/checkoutStore';

interface CarpetUpholsteryStepProps {
  isEndOfTenancy?: boolean;
}
import Tooltip from '../../components/Tooltip';

const CarpetUpholsteryStep: React.FC<CarpetUpholsteryStepProps> = ({ isEndOfTenancy = false }) => {
  const carpetCleaning = useCarpetCleaningState();
  const { set } = useCheckoutStore();

  const formatPrice = (price: number) => `£${price}`;

  // Handlers
  const handleMaterialChange = (key: string) => {
    set({ carpetCleaning: { ...carpetCleaning, selectedMaterial: key } });
  };

  const handleUpholsteryMaterialToggle = (key: string) => {
    const isCurrentlySelected = carpetCleaning.selectedUpholsteryMaterials[key];
    
    // If we're deselecting, reset all quantities for items of this material type
    const newUpholsteryQuantities = isCurrentlySelected
      ? Object.fromEntries(
          Object.entries(carpetCleaning.selectedUpholstery).map(([itemKey, value]) => [itemKey, 0])
        )
      : carpetCleaning.selectedUpholstery;

    set({
      carpetCleaning: {
        ...carpetCleaning,
        selectedUpholsteryMaterials: {
          ...carpetCleaning.selectedUpholsteryMaterials,
          [key]: !isCurrentlySelected 
        },
        selectedUpholstery: newUpholsteryQuantities,
      }
    });
  };

  const handleRoomChange = (roomKey: string, delta: number) => {
    const newCount = Math.max(0, (carpetCleaning.selectedRooms[roomKey] || 0) + delta);
    set({ carpetCleaning: { ...carpetCleaning, selectedRooms: { ...carpetCleaning.selectedRooms, [roomKey]: newCount } } });
  };
  
  const handleRugChange = (rugKey: string, delta: number) => {
    const newCount = Math.max(0, (carpetCleaning.selectedRugs[rugKey] || 0) + delta);
    set({ carpetCleaning: { ...carpetCleaning, selectedRugs: { ...carpetCleaning.selectedRugs, [rugKey]: newCount } } });
  };
  
  const handleUpholsteryChange = (itemKey: string, delta: number) => {
    const newCount = Math.max(0, (carpetCleaning.selectedUpholstery[itemKey] || 0) + delta);
    set({ carpetCleaning: { ...carpetCleaning, selectedUpholstery: { ...carpetCleaning.selectedUpholstery, [itemKey]: newCount } } });
  };
  
  const handleAddonToggle = (addonKey: string) => {
    set({ carpetCleaning: { ...carpetCleaning, addons: { ...carpetCleaning.addons, [addonKey]: !carpetCleaning.addons[addonKey] } } });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* Main form */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
        {/* Material Type Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">1</div>
            <h2 className="text-xl font-semibold text-gray-800">What fibers are your carpets/rugs made off?</h2>
          </div>
          <div className="flex gap-4 mb-6">
            {CARPET_MATERIAL_TYPES.map(type => (
              <button
                key={type.key}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 ${carpetCleaning.selectedMaterial === type.key ? 'border-brand-primary bg-blue-50' : 'border-gray-200 bg-white'} font-medium`}
                onClick={() => handleMaterialChange(type.key)}
              >
                {type.label}
                <span className="ml-1"><Tooltip text={type.info} /></span>
              </button>
            ))}
          </div>
        </div>
        {/* Carpeted Rooms Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">2</div>
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
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleRoomChange(room.key, -1)}>-</button>
                  <span className="w-8 text-center text-lg font-bold text-brand-primary">{carpetCleaning.selectedRooms[room.key] || 0}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleRoomChange(room.key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Rugs Selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">3</div>
            <h3 className="text-lg font-semibold text-gray-800">Please choose number and size of rugs</h3>
          </div>
          <div className="flex flex-col gap-4">
            {CARPET_RUGS.map(rug => (
              <div key={rug.key} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* <img src={rug.icon} alt={rug.label} className="w-8 h-8" /> */}
                  <span className="font-medium">{rug.label}</span>
                  <span className="ml-2 text-xs text-gray-500 font-semibold">{formatPrice(rug.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleRugChange(rug.key, -1)}>-</button>
                  <span className="w-8 text-center text-lg font-bold text-brand-primary">{carpetCleaning.selectedRugs[rug.key] || 0}</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleRugChange(rug.key, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Upholstery Material Type Selection with Items */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">4</div>
            <h3 className="text-lg font-semibold text-gray-800">Select upholstery items by material type</h3>
          </div>
          <div className="flex flex-col gap-6">
            {UPHOLSTERY_MATERIAL_TYPES.map(type => (
              <div key={type.key} className="bg-white rounded-lg border-2 overflow-hidden">
                {/* Material Type Header */}
                <div
                  className={`w-full flex items-center gap-2 px-4 py-3 ${
                    carpetCleaning.selectedUpholsteryMaterials[type.key]
                    ? 'bg-blue-50 border-brand-primary' 
                    : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={carpetCleaning.selectedUpholsteryMaterials[type.key]}
                      onChange={() => handleUpholsteryMaterialToggle(type.key)}
                      className="w-5 h-5 accent-brand-primary"
                    />
                    <span className="font-medium">{type.label}</span>
                  </label>
                  <span className="ml-1"><Tooltip text={type.info} /></span>
                </div>
                
                {/* Items for this material type */}
                {carpetCleaning.selectedUpholsteryMaterials[type.key] && (
                  <div className="p-4 flex flex-col gap-4 bg-white">
                    {UPHOLSTERY_ITEMS.map(item => (
                      <div key={item.key} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          {/* <img src={item.icon} alt={item.label} className="w-8 h-8" /> */}
                          <span className="font-medium">{item.label}</span>
                          <span className="ml-2 text-xs text-gray-500 font-semibold">{formatPrice(item.price)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleUpholsteryChange(item.key, -1)}>-</button>
                          <span className="w-8 text-center text-lg font-bold text-brand-primary">{carpetCleaning.selectedUpholstery[item.key] || 0}</span>
                          <button className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold flex items-center justify-center hover:bg-blue-50 hover:text-brand-primary" onClick={() => handleUpholsteryChange(item.key, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Add-ons Section */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">6</div>
            <h3 className="text-lg font-semibold text-gray-800">Additional Options</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CARPET_ADDONS.map(addon => (
              <div key={addon.key} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{addon.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={`px-4 py-1 rounded-md border font-bold ${!carpetCleaning.addons[addon.key] ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`}
                    onClick={() => handleAddonToggle(addon.key)}
                  >
                    No
                  </button>
                  <button
                    className={`px-4 py-1 rounded-md border font-bold ${carpetCleaning.addons[addon.key] ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`}
                    onClick={() => handleAddonToggle(addon.key)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Summary and Next Button */}
        <div className="mt-8 flex flex-col gap-4">
          {!isEndOfTenancy && (
            <>
              <BookingSummary />
              <div className="flex justify-end">
                <button 
                  className="bg-brand-primary text-white px-6 py-2 rounded font-semibold hover:bg-blue-900 transition"
                  onClick={() => set({ step: 3 })}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarpetUpholsteryStep;
