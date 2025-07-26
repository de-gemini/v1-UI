import React, { useLayoutEffect } from 'react';
import BookingSummary from './BookingSummary';
import type { Dispatch, SetStateAction } from 'react';
import {FAQSection2} from '../../data/questions'
import Toggle from '../../components/ui/Toggle';

import {
  roomTypes,
  addOns,
  frequencyOptions,
  calculatePrice,
  PRICING_CONFIG,
  DirtLevel,
  ServiceType
} from './ckeckoutData';
import { useCheckoutStore, useEstimatedHours, useEstimatedMinutes, useEstimatedPrice, usePricingBreakdown } from '../../store/checkoutStore';
import { toast } from 'react-toastify';
import CarpetUpholsteryStep from './CarpetUpholsteryStep';

const formatPrice = (price: number) => `£${price}/h`;

const StepTwo: React.FC = () => {
  // Zustand store hooks
  const selectedFrequency = useCheckoutStore(state => state.selectedFrequency);
  const roomCounts = useCheckoutStore(state => state.roomCounts);
  const selectedAddOns = useCheckoutStore(state => state.selectedAddOns);
  const ecoFriendly = useCheckoutStore(state => state.ecoFriendly);
  const hooverMop = useCheckoutStore(state => state.hooverMop);
  const disinfection = useCheckoutStore(state => state.disinfection);
  const outdoorCleaning = useCheckoutStore(state => state.outdoorCleaning);
  const laundry = useCheckoutStore(state => state.laundry);
  const errandHours = useCheckoutStore(state => state.errandHours);
  const havePets = useCheckoutStore(state => state.havePets);
  const keyPickup = useCheckoutStore(state => state.keyPickup);
  const dirtLevel = useCheckoutStore(state => state.dirtLevel);
  const endOfTenancy = useCheckoutStore(state => state.endOfTenancy);
  const expressStudio = useCheckoutStore(state => state.expressStudio);
  const checkJob = useCheckoutStore(state => state.checkJob);
  const endOfTenancyCarpet = useCheckoutStore(state => state.endOfTenancyCarpet);
  const set = useCheckoutStore(state => state.set);

  // Use reactive selector hooks for derived state
  const estimatedHours = useEstimatedHours();
  const estimatedPrice = useEstimatedPrice();
  const pricingBreakdown = usePricingBreakdown();

  // Debug: log estimatedPrice whenever it changes
  React.useEffect(() => {
    console.log('💰 StepTwo Pricing Breakdown:', pricingBreakdown);
  }, [pricingBreakdown]);

  // Set endOfTenancy to true by default since we're in the end of tenancy flow
  React.useEffect(() => {
    set({ endOfTenancy: true });
  }, [set]);

  // Ensure roomCounts is always the correct length
  React.useEffect(() => {
    if (Object.keys(roomCounts).length !== roomTypes.length) {
      set({ roomCounts: roomTypes.reduce((acc, room) => ({ ...acc, [room.type]: 0 }), {}) });
    }
  }, [roomCounts, set]);

  // Local scroll to top implementation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate estimated time
  const hourlyRate = calculatePrice.getHourlyRateDisplay(selectedFrequency ?? 3);

  const handleNextStep = () => {
    // Only include add-ons with value > 0
    const totalRooms = Object.values(roomCounts).reduce((sum, count) => sum + count, 0);
    if (totalRooms === 0) {
      toast.error('Please select at least one room.');
      return;
    }
    console.log('Moving to Step 3 with current selections:', {
      roomCounts,
      selectedAddOns,
      ecoFriendly,
      hooverMop,
      disinfection,
      outdoorCleaning,
      laundry,
      errandHours,
      checkJob,
      havePets,
      keyPickup,
      endOfTenancy,
      expressStudio,
      dirtLevel,
      estimatedHours,
      estimatedPrice
    });
    
    // Navigate to step 3
    set({ step: 3 });
  };

  const selectedType = useCheckoutStore(state => state.selectedType);

  if (selectedType === ServiceType.CARPET_UPHOLSTERY) {
    return <CarpetUpholsteryStep />;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* Main form */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
        {/* Room selection */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">2</div>
            <h2 className="text-xl font-semibold text-gray-800">Please choose the rooms to clean to get an estimated price</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8">
            {roomTypes.map((room) => (
              <div key={room.type} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm justify-between">
                <div className="flex items-center gap-3">
                  <img src={room.icon} alt="icons" />
                  <div>
                    <span className="font-bold text-brand-primary block">{room.label}</span>
                    <span className="text-xs text-gray-500">≈{room.estimatedTime}min</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                    onClick={() => {
                      const updated = { ...roomCounts, [room.type]: Math.max(0, (roomCounts[room.type] || 0) - 1) };
                      set({ roomCounts: updated });
                      console.log('after decrement:', updated);
                    }}
                  >-</button>
                  <span className="w-8 text-center text-lg">{roomCounts[room.type] || 0}</span>
                  <button
                    className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                    onClick={() => {
                      const updated = { ...roomCounts, [room.type]: (roomCounts[room.type] || 0) + 1 };
                      set({ roomCounts: updated });
                      console.log('after increment:', updated);
                    }}
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons/Additional services */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Let us know if you need any additional services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8">
            {addOns.map((addon) => (
              <div key={addon.key} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm justify-between">
                <div className="flex items-center gap-3">
                  <img src={addon.icon} alt="icons" className="w-10 h-10" />
                  <div>
                    <span className="font-bold text-brand-primary block">{addon.label}</span>
                    {addon.estimatedTime > 0 && <span className="text-xs text-gray-500">≈{addon.estimatedTime}min</span>}
                    {addon.price && <span className="text-xs text-brand-primary ml-2">(Additional {formatPrice(addon.price)})</span>}
                    {addon.key === 'laundry' && <span className="text-xs text-brand-primary ml-2">(Additional £{PRICING_CONFIG.additionalServices.laundry})</span>}
                    {addon.key === 'outdoor' && <span className="text-xs text-brand-primary ml-2">(Additional £{PRICING_CONFIG.additionalServices.outdoorCleaning})</span>}
                  </div>
                </div>
                <Toggle
                  checked={addon.key === 'outdoor' ? outdoorCleaning : addon.key === 'laundry' ? laundry : selectedAddOns[addon.key] === 1}
                  onChange={(checked) => {
                    if (addon.key === 'outdoor') {
                      set({ outdoorCleaning: checked });
                    } else if (addon.key === 'laundry') {
                      set({ laundry: checked });
                    } else {
                      set({ selectedAddOns: { ...selectedAddOns, [addon.key]: checked ? 1 : 0 } });
                    }
                  }}
                />
              </div>
            ))}
          </div>
          {/* Additional options */}
          
          {/* Eco-friendly */}
          <Toggle
            checked={ecoFriendly}
            onChange={(checked) => set({ ecoFriendly: checked })}
            label="Do you need Eco-friendly cleaning products?"
            additionalText={`( Additional £${PRICING_CONFIG.additionalServices.ecoFriendly} )`}
          />

          {/* Check job */}
          <Toggle
            checked={checkJob}
            onChange={(checked) => set({ checkJob: checked })}
            label="Would you like us to check your job after?"
            additionalText="(Additional £10)"
          />

          {/* Have Pets */}
          <Toggle
            checked={havePets}
            onChange={(checked) => set({ havePets: checked })}
            label="Do you have pets?"
            additionalText="(Additional £10)"
          />

          {/* Key Pickup */}
          <Toggle
            checked={keyPickup}
            onChange={(checked) => set({ keyPickup: checked })}
            label="Do you need key pickup?"
            additionalText="(Additional £5)"
          />

          {/* Carpet cleaning option for End of Tenancy */}
          <div className="flex flex-col gap-4">
            <Toggle
              checked={endOfTenancyCarpet}
              onChange={(checked) => set({ endOfTenancyCarpet: checked })}
              label="Would you like carpet and upholstery cleaning?"
              additionalText="(Additional charges apply)"
            />
            
            {/* Carpet & Upholstery Section */}
            {endOfTenancyCarpet && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <CarpetUpholsteryStep isEndOfTenancy={true} />
              </div>
            )}
          </div>

          {/* Express Studio */}
          <Toggle
            checked={expressStudio}
            onChange={(checked) => set({ expressStudio: checked })}
            label="Express Studio clean?"
            additionalText="(Additional £25)"
          />

          {/* Dirt Level UI */}
          <div className="mt-8">
            <div className={`flex items-center mb-4 border-l-4 pl-2 ${dirtLevel === 'light' ? 'border-green-500' : dirtLevel === 'medium' ? 'border-yellow-400' : 'border-red-500'}`}> 
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dirtLevel === 'light' ? '#22c55e' : dirtLevel === 'medium' ? '#eab308' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
              <h3 className={`text-lg font-semibold ${dirtLevel === 'light' ? 'text-green-600' : dirtLevel === 'medium' ? 'text-yellow-600' : 'text-red-500'}`}>Let us know the level of dirt at your property</h3>
            </div>
            <div className="flex border rounded-lg overflow-hidden w-full max-w-xl mb-4">
              {['light', 'medium', 'heavy'].map(level => (
                <button
                  key={level}
                  onClick={() => set({ dirtLevel: level as DirtLevel })}
                  className={`flex-1 py-4 text-lg font-semibold transition-all border-none outline-none focus:z-10
                    ${dirtLevel === level
                      ? `${level === 'light' ? 'text-green-600 border-green-500' : level === 'medium' ? 'text-yellow-600 border-yellow-400' : 'text-red-500 border-red-500'} bg-white border`
                      : 'text-gray-700 bg-white hover:bg-gray-50'}
                    ${level === 'light' ? 'rounded-l-lg' : ''} ${level === 'heavy' ? 'rounded-r-lg' : ''}`}
                  style={{ borderRight: level !== 'heavy' ? '1px solid #eee' : undefined }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {dirtLevel === 'light' && (
                <>
                  <li className="text-green-700">• You clean your home regularly</li>
                  <li className="text-green-700">• There is little dust and no visible stains</li>
                  <li className="text-green-700">• No rearrangement or extra effort needed</li>
                </>
              )}
              {dirtLevel === 'medium' && (
                <>
                  <li className="text-yellow-600">• You clean your home every few weeks</li>
                  <li className="text-yellow-600">• Some dust, limescale, or grease present</li>
                  <li className="text-yellow-600">• Some rearrangement or extra effort may be needed</li>
                </>
              )}
              {dirtLevel === 'heavy' && (
                <>
                  <li className="text-red-500">• You haven't done cleaning for over a month or even two</li>
                  <li className="text-red-500">• You have a lot of stuff that need to be moved /rearranged to clean your home</li>
                  <li className="text-red-500">• You had a party and there are a lot of things to be cleaned and arranged</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Booking Summary and Questions*/}
      <div className=''>
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-6 py-4 mb-4 shadow">
            <div>
              <div className="text-sm text-gray-500 font-medium">Estimated Time</div>
              <div className="text-xl font-bold text-brand-primary">{estimatedHours.toFixed(1)} hours</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Hourly Rate</div>
              <div className="text-xl font-bold text-brand-primary">{hourlyRate}</div>
            </div>
          </div>
          <BookingSummary />
          {/* Final action button */}
          <div className="flex items-center justify-center gap-[10px] mt-8">
            <button
              className="px-8 py-3 bg-red-400 text-white border border-gray-300 rounded-md  font-bold text-lg transition"
              onClick={() => set({ step: 1 })}
            >
              BACK
            </button>
            <button
              className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition"
              onClick={handleNextStep}
            >
              NEXT
            </button>
          </div>
        </div>
        <div>
          <FAQSection2/>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
