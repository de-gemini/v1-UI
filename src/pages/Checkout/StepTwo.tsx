import React, { useLayoutEffect, useEffect, useState } from 'react';
import BookingSummary from './BookingSummary';
import type { Dispatch, SetStateAction } from 'react';
import {FAQSection2} from '../../data/questions'
import Toggle from '../../components/ui/Toggle';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkAuthBeforeStep3 } from '../../utils/auth';
import AuthModal from '../../components/AuthModal';

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
const pad = (n: number) => n.toString().padStart(2, '0');

interface StepTwoProps {
  roomCounts: number[];
  setRoomCounts: Dispatch<SetStateAction<number[]>>;
  selectedAddOns: string[];
  setSelectedAddOns: Dispatch<SetStateAction<string[]>>;
  ecoFriendly: boolean;
  setEcoFriendly: (v: boolean) => void;
  hooverMop: boolean;
  setHooverMop: (v: boolean) => void;
  disinfection: boolean;
  setDisinfection: (v: boolean) => void;
  errandHours: number;
  setErrandHours: Dispatch<SetStateAction<number>>;
  checkJob: boolean;
  setCheckJob: (v: boolean) => void;
  havePets: boolean;
  setHavePets: (v: boolean) => void;
  keyPickup: boolean;
  setKeyPickup: (v: boolean) => void;
  dirtLevel: 'light' | 'medium' | 'heavy';
  setDirtLevel: (v: 'light' | 'medium' | 'heavy') => void;
  setStep: (v: number) => void;
  setStep1View: (v: number) => void;
  summary: any;
  selectedFrequency: number | null;
  frequencyOptions: any[];
  selectedDate: Date;
  pad: (num: number) => string;
  hour: number;
  minute: number;
  endOfTenancy: boolean;
}

const StepTwo: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Zustand store hooks
  const selectedFrequency = useCheckoutStore(state => state.selectedFrequency);
  const selectedDate = useCheckoutStore(state => state.selectedDate);
  const hour = useCheckoutStore(state => state.hour);
  const minute = useCheckoutStore(state => state.minute);
  const selectedDuration = useCheckoutStore(state => state.selectedDuration);
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
  const keyPickupLocation = useCheckoutStore(state => state.keyPickupLocation);
  const dirtLevel = useCheckoutStore(state => state.dirtLevel);
  const endOfTenancy = useCheckoutStore(state => state.endOfTenancy);
  const expressStudio = useCheckoutStore(state => state.expressStudio);
  const checkJob = useCheckoutStore(state => state.checkJob);
  const endOfTenancyCarpet = useCheckoutStore(state => state.endOfTenancyCarpet);
  const name = useCheckoutStore(state => state.name);
  const surname = useCheckoutStore(state => state.surname);
  const address = useCheckoutStore(state => state.address);
  const phone = useCheckoutStore(state => state.phone);
  const comments = useCheckoutStore(state => state.comments);
  const set = useCheckoutStore(state => state.set);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('eot') === 'true') {
      set({ endOfTenancy: true });
    }
  }, [location.search, set]);

  // Use reactive selector hooks for derived state
  const estimatedHours = useEstimatedHours();
  const estimatedMinutes = useEstimatedMinutes();
  const estimatedPrice = useEstimatedPrice();
  const pricingBreakdown = usePricingBreakdown();

  // Debug: log estimatedPrice whenever it changes
  React.useEffect(() => {
    console.log('💰 StepTwo Pricing Breakdown:', pricingBreakdown);
  }, [pricingBreakdown]);

  // Set endOfTenancy and related settings
  React.useEffect(() => {
    if (endOfTenancy) {
      // Set maximum dirt level and prevent unselection
      set({ 
        endOfTenancy: true,
        dirtLevel: DirtLevel.HEAVY
      });
    }
  }, [endOfTenancy, set]);

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
    // if (totalRooms === 0) {
    //   toast.error('Please select at least one room');
    //   return;
    // }
    
    // Check authentication before proceeding to step 3
    const currentState = {
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
      selectedFrequency,
      selectedDate,
      hour,
      minute,
      selectedDuration,
      selectedType,
      name,
      surname,
      address,
      phone,
      comments,
    };
    
    if (!checkAuthBeforeStep3(setShowAuthModal, currentState)) {
      return; // Don't proceed if not authenticated
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
                    {addon.price && <span className="text-xs text-brand-primary ml-2">(Additional £{addon.price})</span>}
                    {addon.key === 'laundry' && <span className="text-xs text-brand-primary ml-2">(Additional £{PRICING_CONFIG.additionalServices.laundry})</span>}
                    {addon.key === 'outdoor' && <span className="text-xs text-brand-primary ml-2">(Additional £{PRICING_CONFIG.additionalServices.outdoorCleaning})</span>}
                  </div>
                </div>
                {addon.yesNo ? (
                  <div className="flex gap-2">
                    <button
                      className={`px-4 py-1 rounded-md border font-bold ${(addon.key === 'outdoor' ? outdoorCleaning : addon.key === 'laundry' ? laundry : selectedAddOns[addon.key]) === (addon.key === 'outdoor' || addon.key === 'laundry' ? true : 1) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`}
                      onClick={() => {
                        if (addon.key === 'outdoor') {
                          set({ outdoorCleaning: true });
                        } else if (addon.key === 'laundry') {
                          set({ laundry: true });
                        } else {
                          set({ selectedAddOns: { ...selectedAddOns, [addon.key]: 1 } });
                        }
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className={`px-4 py-1 rounded-md border font-bold ${(addon.key === 'outdoor' ? outdoorCleaning : addon.key === 'laundry' ? laundry : selectedAddOns[addon.key]) === (addon.key === 'outdoor' || addon.key === 'laundry' ? false : 0) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`}
                      onClick={() => {
                        if (addon.key === 'outdoor') {
                          set({ outdoorCleaning: false });
                        } else if (addon.key === 'laundry') {
                          set({ laundry: false });
                        } else {
                          set({ selectedAddOns: { ...selectedAddOns, [addon.key]: 0 } });
                        }
                      }}
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                      onClick={() => {
                        const updated = { ...selectedAddOns, [addon.key]: Math.max(0, (selectedAddOns[addon.key] || 0) - 1) };
                        set({ selectedAddOns: updated });
                        console.log('after addon decrement:', updated);
                      }}
                    >-</button>
                    <span className="w-8 text-center text-lg">{selectedAddOns[addon.key] || 0}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                      onClick={() => {
                        const updated = { ...selectedAddOns, [addon.key]: (selectedAddOns[addon.key] || 0) + 1 };
                        set({ selectedAddOns: updated });
                        console.log('after addon increment:', updated);
                      }}
                    >+</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Additional info */}
        <div className="flex flex-col gap-6">
          {/* Eco-friendly */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you need Eco-friendly cleaning products? <span className="text-brand-primary">( Additional £{PRICING_CONFIG.additionalServices.ecoFriendly} )</span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!ecoFriendly ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ ecoFriendly: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${ecoFriendly ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ ecoFriendly: true })}>Yes</button>
            <span className="ml-2"><img src="https://www.emop.co.uk/static/images/ecover_svg_mob.svg" alt="ecover" className="inline w-8 h-8" /></span>
          </div>
          {/* Hoover & Mop */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you need a Hoover and a Mop? <span className="text-brand-primary">(Additional £{PRICING_CONFIG.additionalServices.hooverMop})</span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!hooverMop ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ hooverMop: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${hooverMop ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ hooverMop: true })}>Yes</button>
          </div>
          {/* Disinfection recommendation */}
          <div className="bg-green-50 border-l-4 border-green-400 p-4 flex items-center gap-3 rounded-md">
            <span className="text-green-700 text-xl font-bold">&#9888;</span>
            <span className="text-green-700">We strongly recommend that all cleanings include a disinfection service which will give you extra protection for you and your loved ones.</span>
          </div>
          {/* Disinfection */}
          <div className="flex items-center gap-4 bg-green-100 rounded-lg p-4">
            <span className="font-semibold">Do you need us to disinfect your home? <span className="text-green-700">( Additional £{PRICING_CONFIG.additionalServices.disinfection} )</span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!disinfection ? 'bg-green-400 text-white border-green-400' : 'bg-white border-green-400 text-green-700'}`} onClick={() => set({ disinfection: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${disinfection ? 'bg-green-400 text-white border-green-400' : 'bg-white border-green-400 text-green-700'}`} onClick={() => set({ disinfection: true })}>Yes</button>
          </div>
          {/* Errands/Chores */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you need help with any Errands/Chores?</span>
            <button className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white" onClick={() => set({ errandHours: Math.max(0, errandHours - 1) })}>-</button>
            <span className="w-12 text-center text-lg">{errandHours}h</span>
            <button className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white" onClick={() => set({ errandHours: errandHours + 1 })}>+</button>
          </div>
          {/* Check Job */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you want a check job? <span className="text-brand-primary"></span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!checkJob ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ checkJob: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${checkJob ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ checkJob: true })}>Yes</button>
          </div>
          {/* Have Pets */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you have pets? <span className="text-brand-primary"></span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!havePets ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ havePets: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${havePets ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ havePets: true })}>Yes</button>
          </div>
          {/* Key Pickup */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Do you need key pickup? <span className="text-brand-primary"></span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!keyPickup ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ keyPickup: false, keyPickupLocation: '' })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${keyPickup ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ keyPickup: true })}>Yes</button>
          </div>
            {keyPickup && (
              <input
                type="text"
                className="border-neutral-400 px-3 py-2 border block rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Where do you want the key to be picked up?"
                value={keyPickupLocation}
                onChange={e => set({ keyPickupLocation: e.target.value })}
                style={{ minWidth: 260 }}
              />
            )}
          {/* Carpet cleaning option for End of Tenancy */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Would you like carpet and upholstery cleaning? <span className="text-brand-primary">(Additional charges apply)</span></span>
              <button className={`px-4 py-1 rounded-md border font-bold ${!endOfTenancyCarpet ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ endOfTenancyCarpet: false })}>No</button>
              <button className={`px-4 py-1 rounded-md border font-bold ${endOfTenancyCarpet ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ endOfTenancyCarpet: true })}>Yes</button>
            </div>
            
            {/* Carpet & Upholstery Section */}
            {endOfTenancyCarpet && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <CarpetUpholsteryStep isEndOfTenancy={true} />
              </div>
            )}
          </div>
          {/* Express Studio */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Express Studio clean? <span className="text-brand-primary">(Additional £25)</span></span>
            <button className={`px-4 py-1 rounded-md border font-bold ${!expressStudio ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ expressStudio: false })}>No</button>
            <button className={`px-4 py-1 rounded-md border font-bold ${expressStudio ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-brand-primary text-brand-primary'}`} onClick={() => set({ expressStudio: true })}>Yes</button>
          </div>
          {/* Dirt Level UI */}
          <div className="mt-8">
            <div className={`flex items-center mb-4 border-l-4 pl-2 ${dirtLevel === 'light' ? 'border-green-500' : dirtLevel === 'medium' ? 'border-yellow-400' : 'border-red-500'}`}> 
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dirtLevel === 'light' ? '#22c55e' : dirtLevel === 'medium' ? '#eab308' : '#ef4444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
              <h3 className={`text-lg font-semibold ${dirtLevel === 'light' ? 'text-green-600' : dirtLevel === 'medium' ? 'text-yellow-600' : 'text-red-500'}`}>
                {endOfTenancy ? (
                  <div className="flex items-center gap-2">
                    Level of dirt at your property
                    <span className="inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <span className="text-sm text-gray-500">(Locked for End of Tenancy)</span>
                  </div>
                ) : (
                  "Let us know the level of dirt at your property"
                )}
              </h3>
            </div>
            <div className="flex border rounded-lg overflow-hidden w-full max-w-xl mb-4">
              {['light', 'medium', 'heavy'].map(level => (
                <button
                  key={level}
                  onClick={() => !endOfTenancy && set({ dirtLevel: level as DirtLevel })}
                  disabled={endOfTenancy && level !== 'heavy'}
                  className={`flex-1 py-4 text-lg font-semibold transition-all border-none outline-none focus:z-10 relative
                    ${dirtLevel === level
                      ? `${level === 'light' ? 'text-green-600 border-green-500' : level === 'medium' ? 'text-yellow-600 border-yellow-400' : 'text-red-500 border-red-500'} bg-white border`
                      : 'text-gray-700 bg-white hover:bg-gray-50'}
                    ${level === 'light' ? 'rounded-l-lg' : ''} ${level === 'heavy' ? 'rounded-r-lg' : ''}
                    ${endOfTenancy && level !== 'heavy' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ borderRight: level !== 'heavy' ? '1px solid #eee' : undefined }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                  {endOfTenancy && level === 'heavy' && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                  )}
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
            <div className="text-xl font-bold text-brand-primary">{estimatedHours}</div>
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
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          title="Session Expired"
          message="Your session has expired or you are not logged in. Please login or signup to continue."
          onClose={() => {
            setShowAuthModal(false);
            navigate("/login");
          }}
          actions={[
            { label: "Login", onClick: () => navigate("/login") },
            { label: "Signup", onClick: () => navigate("/register") },
          ]}
        />
      )}
    </div>
  );
};

export default StepTwo; 