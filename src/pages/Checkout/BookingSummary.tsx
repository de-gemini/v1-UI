import React from 'react';
import { 
  roomTypes, 
  addOns as addOnsList, 
  frequencyOptions, 
  PRICING_CONFIG,
  CARPET_ROOMS,
  CARPET_RUGS,
  UPHOLSTERY_ITEMS,
  CARPET_ADDONS
} from './ckeckoutData';
import { useCheckoutStore, useEstimatedHours, useEstimatedPrice, usePricingBreakdown, useCarpetCleaningPrice, useCarpetCleaningState, useFinalTotalPrice } from '../../store/checkoutStore';

const BookingSummary: React.FC = () => {
  // Get all data from store hooks
  const {
    selectedFrequency,
    selectedDate,
    hour,
    minute,
    roomCounts,
    selectedAddOns,
    ecoFriendly,
    hooverMop,
    disinfection,
    outdoorCleaning,
    laundry,
    errandHours,
    havePets,
    keyPickup,
    dirtLevel,
    endOfTenancy,
    expressStudio,
    checkJob,
    selectedDuration,
    set,
  } = useCheckoutStore();

  const pricingBreakdown = usePricingBreakdown();
  const carpetCleaning = useCarpetCleaningState();
  const finalTotalPrice = useFinalTotalPrice();

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-gray-100  p-6 sm:p-8 md:p-10 mt-4 flex flex-col gap-6 border w-full border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-2xl text-brand-primary tracking-tight">Booking Summary</span>
        <span className="text-2xl text-gray-300">&#8964;</span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Tariff</span>
          <span className="font-bold text-brand-primary">{selectedFrequency !== null ? frequencyOptions[selectedFrequency].label : '-'}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span>Date</span>
          <span>{selectedDate.toLocaleDateString()} {pad(hour)}:{pad(minute)}</span>
        </div>
        {(selectedFrequency === 0 || selectedFrequency === 1 || selectedFrequency === 2) && selectedDuration && (
          <div className="flex justify-between items-center text-lg">
            <span>Duration</span>
            <span>{selectedDuration} month{selectedDuration === '1' ? '' : 's'}</span>
          </div>
        )}
        {/* Rooms grid */}
        <div>
          <span className="block font-semibold text-lg mb-1">Rooms</span>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(roomCounts).map(([type, count]) => {
              if (count > 0) {
                const room = roomTypes.find(r => r.type === type);
                return (
                  <div key={type} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                    <img src={room?.icon} alt={room?.label} className="w-7 h-7" />
                    <span className="font-medium text-gray-700">{room?.label} <span className="text-xs text-gray-400">({room?.estimatedTime} min each)</span></span>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                        onClick={() => set({ roomCounts: { ...roomCounts, [type]: Math.max(0, count - 1) } })}
                      >-</button>
                      <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{count}</span>
                      <button
                        className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                        onClick={() => set({ roomCounts: { ...roomCounts, [type]: count + 1 } })}
                      >+</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            {Object.values(roomCounts).every(count => count === 0) && <span className="text-gray-400">No rooms selected</span>}
          </div>
        </div>
        {/* Add-ons grid */}
        {endOfTenancy && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-semibold text-blue-800 mb-2">End of Tenancy includes:</div>
                <div className="grid grid-cols-1 gap-1 text-xs text-blue-700">
                  <div>• Bedroom - 1 room</div>
                  <div>• Living Room - 1 room</div>
                  <div>• Kitchen - 1 room</div>
                  <div>• Bathroom - 1 room</div>
                  <div>• Toilet - 1 room</div>
                  <div>• Hoover and Mop - included</div>
                  <div>• End of Tenancy Service - £39</div>
                </div>
              </div>
            )}
        <div>
          <span className="block font-semibold text-lg mb-1">Add-ons</span>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(selectedAddOns).filter(([key, value]) => key !== 'outdoor' && (value as number) > 0).map(([key, value]) => {
              const addon = addOnsList.find(a => a.key === key);
              return (
                <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                  {addon?.icon && <img src={addon.icon} alt={addon.label} className="w-7 h-7" />}
                  <span className="font-medium text-gray-700">{addon?.label} {addon?.estimatedTime && addon?.estimatedTime > 0 && <span className="text-xs text-gray-400">({addon.estimatedTime} min each)</span>}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                      onClick={() => set({ selectedAddOns: { ...selectedAddOns, [key]: Math.max(0, (value as number) - 1) } })}
                    >-</button>
                    <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{value as number}</span>
                    <button
                      className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                      onClick={() => set({ selectedAddOns: { ...selectedAddOns, [key]: (value as number) + 1 } })}
                    >+</button>
                  </div>
                </div>
              );
            })}
            {Object.entries(selectedAddOns).filter(([key, value]) => key !== 'outdoor' && (value as number) > 0).length === 0 && <span className="text-gray-400">No add-ons selected</span>}
          </div>
        </div>
        {/* Selected options */}
        <div>
          <span className="block font-semibold text-lg mb-1">Selected Options</span>
          <div className="flex flex-wrap gap-2">
            {ecoFriendly && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Eco-friendly (£{PRICING_CONFIG.additionalServices.ecoFriendly})
                <button
                  className="w-4 h-4 rounded-full bg-green-200 text-green-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ ecoFriendly: false })}
                  title="Remove eco-friendly"
                >×</button>
              </span>
            )}
            {hooverMop && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Hoover & Mop (£{PRICING_CONFIG.additionalServices.hooverMop})
                <button
                  className="w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ hooverMop: false })}
                  title="Remove hoover & mop"
                >×</button>
              </span>
            )}
            {disinfection && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Disinfection (£{PRICING_CONFIG.additionalServices.disinfection})
                <button
                  className="w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ disinfection: false })}
                  title="Remove disinfection"
                >×</button>
              </span>
            )}
            
            {endOfTenancy && (
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                End of Tenancy
                {/* <button
                  className="w-4 h-4 rounded-full bg-yellow-200 text-yellow-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ endOfTenancy: false })}
                  title="Remove end of tenancy"
                >×</button> */}
              </span>
            )}
            
            {expressStudio && (
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Express Studio (£{PRICING_CONFIG.additionalServices.expressStudio})
                <button
                  className="w-4 h-4 rounded-full bg-pink-200 text-pink-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ expressStudio: false })}
                  title="Remove express studio"
                >×</button>
              </span>
            )}
            {checkJob && (
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Check Job (£{PRICING_CONFIG.additionalServices.checkJob})
                <button
                  className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ checkJob: false })}
                  title="Remove check job"
                >×</button>
              </span>
            )}
            {havePets && (
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Have Pets (£{PRICING_CONFIG.additionalServices.havePets})
                <button
                  className="w-4 h-4 rounded-full bg-orange-200 text-orange-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ havePets: false })}
                  title="Remove have pets"
                >×</button>
              </span>
            )}
            {keyPickup && (
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Key Pickup (£{PRICING_CONFIG.additionalServices.keyPickup})
                <button
                  className="w-4 h-4 rounded-full bg-gray-300 text-gray-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ keyPickup: false })}
                  title="Remove key pickup"
                >×</button>
              </span>
            )}
            {outdoorCleaning && (
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Outdoor Cleaning (£{PRICING_CONFIG.additionalServices.outdoorCleaning})
                <button
                  className="w-4 h-4 rounded-full bg-teal-200 text-teal-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ outdoorCleaning: false })}
                  title="Remove outdoor cleaning"
                >×</button>
              </span>
            )}
            {laundry && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                Laundry (£{PRICING_CONFIG.additionalServices.laundry})
                <button
                  className="w-4 h-4 rounded-full bg-blue-200 text-blue-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                  onClick={() => set({ laundry: false })}
                  title="Remove laundry"
                >×</button>
              </span>
            )}
            {!ecoFriendly && !hooverMop && !disinfection && !endOfTenancy && !expressStudio && !checkJob && !havePets && !keyPickup && !outdoorCleaning && !laundry && (
              <span className="text-gray-400">No special options selected</span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-lg mt-2">
          <span>Errands</span>
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
              onClick={() => set({ errandHours: Math.max(0, errandHours - 1) })}
            >-</button>
            <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{errandHours}h</span>
            <button
              className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
              onClick={() => set({ errandHours: errandHours + 1 })}
            >+</button>
          </div>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span>Level of dirt</span><span>{dirtLevel.charAt(0).toUpperCase() + dirtLevel.slice(1)}</span>
        </div>
        {/* Financial summary */}
        <div className="mt-6 border-t pt-4">
          <div className="font-bold text-lg mb-2 text-brand-primary">Financial Summary</div>
          <div className="flex justify-between text-md mb-1"><span>Base Price</span><span>{pricingBreakdown?.basePrice || 'N/A'}</span></div>
          <div className="flex justify-between text-md mb-1"><span>Add-ons & Services</span><span>{pricingBreakdown?.["Additional Services"]?.["Total Additional"] || 'N/A'}</span></div>
          <div className="flex justify-between text-md mb-1"><span>Dirt Level Multiplier</span><span>{pricingBreakdown?.["Dirt Level"]?.["Multiplier"] || 'N/A'}</span></div>
          
          {/* Carpet & Upholstery Section */}
          {pricingBreakdown?.["Carpet & Upholstery"] && (
            <>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="mb-2 font-semibold">Carpet & Upholstery Services</div>
              
              {/* Carpeted Rooms */}
              {pricingBreakdown["Carpet & Upholstery"]["Selected Rooms"].length > 0 && (
                <div>
                  <div className="font-medium mb-2">Carpeted Rooms:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(carpetCleaning.selectedRooms).map(([roomKey, count]) => {
                      if (count > 0) {
                        const room = CARPET_ROOMS.find(r => r.key === roomKey);
                        if (room) {
                          return (
                            <div key={roomKey} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                              <img src={room.icon} alt={room.label} className="w-7 h-7" />
                              <span className="font-medium text-gray-700">{room.label}</span>
                              <div className="ml-auto flex items-center gap-2">
                                <button
                                  className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                                  onClick={() => set({ carpetCleaning: { ...carpetCleaning, selectedRooms: { ...carpetCleaning.selectedRooms, [roomKey]: Math.max(0, count - 1) } } })}
                                >-</button>
                                <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{count}</span>
                                <button
                                  className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                                  onClick={() => set({ carpetCleaning: { ...carpetCleaning, selectedRooms: { ...carpetCleaning.selectedRooms, [roomKey]: count + 1 } } })}
                                >+</button>
                              </div>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Rugs */}
              {pricingBreakdown["Carpet & Upholstery"]["Selected Rugs"].length > 0 && (
                <div className="mt-4">
                  <div className="font-medium mb-2">Rugs:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(carpetCleaning.selectedRugs).map(([rugKey, count]) => {
                      if (count > 0) {
                        const rug = CARPET_RUGS.find(r => r.key === rugKey);
                        if (rug) {
                          return (
                            <div key={rugKey} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                              {/* <img src={rug.icon} alt={rug.label} className="w-7 h-7" /> */}
                              <span className="font-medium text-gray-700">{rug.label}</span>
                              <div className="ml-auto flex items-center gap-2">
                                <button
                                  className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                                  onClick={() => set({ carpetCleaning: { ...carpetCleaning, selectedRugs: { ...carpetCleaning.selectedRugs, [rugKey]: Math.max(0, count - 1) } } })}
                                >-</button>
                                <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{count}</span>
                                <button
                                  className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                                  onClick={() => set({ carpetCleaning: { ...carpetCleaning, selectedRugs: { ...carpetCleaning.selectedRugs, [rugKey]: count + 1 } } })}
                                >+</button>
                              </div>
                            </div>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Upholstery Items */}
              {pricingBreakdown["Carpet & Upholstery"]["Selected Upholstery"].length > 0 && (
                <div className="mt-4">
                  <div className="font-medium mb-2">Upholstery Items:</div>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(carpetCleaning.selectedUpholstery).map(([materialType, items]) => 
                      Object.entries(items).map(([itemKey, count]) => {
                        if (count > 0) {
                          const item = UPHOLSTERY_ITEMS.find(i => i.key === itemKey);
                          if (item) {
                            return (
                              <div key={`${materialType}-${itemKey}`} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
                                <span className="font-medium text-gray-700">{item.label} ({materialType})</span>
                                <div className="ml-auto flex items-center gap-2">
                                  <button
                                    className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-red-100 hover:text-red-600"
                                    onClick={() => set({ 
                                      carpetCleaning: { 
                                        ...carpetCleaning, 
                                        selectedUpholstery: { 
                                          ...carpetCleaning.selectedUpholstery, 
                                          [materialType]: { 
                                            ...carpetCleaning.selectedUpholstery[materialType], 
                                            [itemKey]: Math.max(0, count - 1) 
                                          } 
                                        } 
                                      } 
                                    })}
                                  >-</button>
                                  <span className="font-bold text-brand-primary text-lg min-w-[20px] text-center">{count}</span>
                                  <button
                                    className="w-6 h-6 rounded-full bg-gray-200 text-sm font-bold flex items-center justify-center hover:bg-green-100 hover:text-green-600"
                                    onClick={() => set({ 
                                      carpetCleaning: { 
                                        ...carpetCleaning, 
                                        selectedUpholstery: { 
                                          ...carpetCleaning.selectedUpholstery, 
                                          [materialType]: { 
                                            ...carpetCleaning.selectedUpholstery[materialType], 
                                            [itemKey]: count + 1 
                                          } 
                                        } 
                                      } 
                                    })}
                                  >+</button>
                                </div>
                              </div>
                            );
                          }
                        }
                        return null;
                      })
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm mb-1">
                <div className="font-medium">Materials:</div>
                <div>Carpet: {pricingBreakdown["Carpet & Upholstery"]["Material Types"].carpet}</div>
                <div>Upholstery: {pricingBreakdown["Carpet & Upholstery"]["Material Types"].upholstery}</div>
              </div>

              {/* Carpet Add-ons */}
              {pricingBreakdown["Carpet & Upholstery"]["Add-ons"].length > 0 && (
                <div className="mt-4">
                  <div className="font-medium mb-2">Add-ons:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(carpetCleaning.addons).map(([addonKey, enabled]) => {
                      if (enabled) {
                        const addon = CARPET_ADDONS.find(a => a.key === addonKey);
                        if (addon) {
                          return (
                            <span key={addonKey} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                              {addon.label}
                              <button
                                className="w-4 h-4 rounded-full bg-purple-200 text-purple-700 text-xs font-bold hover:bg-red-200 hover:text-red-700"
                                onClick={() => set({ carpetCleaning: { ...carpetCleaning, addons: { ...carpetCleaning.addons, [addonKey]: false } } })}
                                title={`Remove ${addon.label.toLowerCase()}`}
                              >×</button>
                            </span>
                          );
                        }
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-between text-md mt-2">
                <span>Carpet & Upholstery Total</span>
                <span>{pricingBreakdown["TOTAL"]["Carpet & Upholstery"] || 'N/A'}</span>
              </div>
            </>
          )}

          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between text-md mb-1">
            <span>Calculated Price</span>
            <span>{pricingBreakdown?.calculatedPrice || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-md mb-1">
            <span>Minimum Service Price</span>
            <span>{pricingBreakdown?.minimumPrice || 'N/A'}</span>
          </div>
          {pricingBreakdown?.breakdown?.isMinimumPriceApplied && (
            <div className="text-sm text-gray-500 mb-2">
              Minimum price has been applied as calculated total was lower
            </div>
          )}
          <div className="flex justify-between text-lg font-bold mt-2">
            <span>Final Total</span>
            <span>£{finalTotalPrice ? finalTotalPrice.toFixed(2) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary; 