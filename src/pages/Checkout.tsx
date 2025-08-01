import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import 'react-calendar/dist/Calendar.css';

import AuthModal from "../components/AuthModal";

import {
  roomTypes,
  calculatePrice,
  PRICING_CONFIG,
} from './Checkout/ckeckoutData';
import StepOne from "./Checkout/StepOne";
import StepTwo from "./Checkout/StepTwo";
import StepThree from "./Checkout/StepThree";
import ProgressBar from "./Checkout/ProgressBar";
import { useCheckoutStore } from '../store/checkoutStore';


const Checkout = () => {
  // Local scroll to top implementation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the postcode from the query s

  const navigate = useNavigate()

  // Zustand store hooks
  const {
    step,
    set,
    
    selectedFrequency,
    
    roomCounts,
    ecoFriendly,
    hooverMop,
    disinfection,
    errandHours,
    
    name,
    surname,
    address,
    phone,
    
  } = useCheckoutStore();

  // Remove all useState for these fields and use the store instead
  // Update all handlers to use set({ ... })
  // Do not pass state as props to StepOne, StepTwo, StepThree


  const [showAuthModal, setShowAuthModal] = useState(false);


  const baseRate = selectedFrequency !== null ? 
    calculatePrice.getBasePrice(selectedFrequency, 1) : // Get hourly rate by calculating for 1 hour
    PRICING_CONFIG.baseHourlyRate;
  const duration = roomTypes.reduce((sum, room, idx) => sum + roomCounts[idx] * room.estimatedTime, 0) + errandHours * 60;
  const minimumPrice = selectedFrequency !== null ? 
    calculatePrice.getMinimumPrice(selectedFrequency) : 
    calculatePrice.getMinimumPrice(3); // Default to one-off minimum
  let estimatedPrice = Math.max(minimumPrice, Math.round((duration / 60) * baseRate));
  if (ecoFriendly) estimatedPrice += PRICING_CONFIG.additionalServices.ecoFriendly;
  if (hooverMop) estimatedPrice += PRICING_CONFIG.additionalServices.hooverMop;
  if (disinfection) estimatedPrice += PRICING_CONFIG.additionalServices.disinfection;


const getUserFromLS = ()=>{
  const details = localStorage.getItem("user");
      if (details) {
        const d = JSON.parse(details);
        if (!name && d.name) set({ name: d.name });
        if (!surname && d.surname) set({ surname: d.surname });
        if (!address && d.address) set({ address: d.address });
        // Check for both phone and phoneNumber fields from backend
        if (!phone && (d.phone || d.phoneNumber)) {
          set({ phone: d.phone || d.phoneNumber });
        }
      }
}

// After AuthModal closes (login), update user document with available details and store to localStorage
useEffect(() => {
  if (showAuthModal === false) {
    // User just logged in, check for pending booking
    const pending = localStorage.getItem("pendingBooking");
    if (pending) {
      const bookingData = JSON.parse(pending);
      console.log('🔄 Restoring pending booking data:', bookingData);
      console.log('🔄 Room counts being restored:', bookingData.roomCounts);
      console.log('🔄 User before restoration:', localStorage.getItem("user"));
      
      // Preserve current user data
      const currentUser = localStorage.getItem("user");
      const currentToken = localStorage.getItem("token");
      const currentRole = localStorage.getItem("role");
      

      // Restore form state and go to step 3
      set({ selectedType: bookingData.selectedType ?? 0 });
      // Robust selectedFrequency restore
      let restoredFrequency = null;
      if (typeof bookingData.selectedFrequency === 'number' && bookingData.selectedFrequency >= 0 && bookingData.selectedFrequency <= 3) {
        restoredFrequency = bookingData.selectedFrequency;
      } else if (typeof bookingData.selectedFrequency === 'string') {
        const idx = ["weekly", "fortnight", "monthly", "onetime"].indexOf(bookingData.selectedFrequency);
        restoredFrequency = idx !== -1 ? idx : null;
      } else if (typeof bookingData.frequency === 'string') {
        const idx = ["weekly", "fortnight", "monthly", "onetime"].indexOf(bookingData.frequency);
        restoredFrequency = idx !== -1 ? idx : null;
      }
      set({ selectedFrequency: restoredFrequency });
      // Robust roomCounts restore
      if (typeof bookingData.roomCounts === 'object' && bookingData.roomCounts !== null) {
        // roomCounts is already an object, restore directly
        set({ roomCounts: bookingData.roomCounts });
      } else if (Array.isArray(bookingData.roomCounts) && bookingData.roomCounts.length === roomTypes.length) {
        // Legacy format: array of objects with type and quantity
        set({ roomCounts: Object.fromEntries(roomTypes.map(rt => {
          const found = bookingData.roomCounts.find((r: any) => r.type === rt.type);
          return [rt.type, found ? found.quantity : 0];
        })) });
      } else if (Array.isArray(bookingData.rooms)) {
        // Legacy format: rooms array
        set({
          roomCounts: Object.fromEntries(
            roomTypes.map(rt => {
              const found = bookingData.rooms.find((r: any) => r.type === rt.type);
              return [rt.type, found ? found.quantity : 0];
            })
          )
        });
      } else {
        // Default: initialize with zeros
        set({ roomCounts: Object.fromEntries(roomTypes.map(rt => [rt.type, 0])) });
      }
      
      // Robust selectedAddOns restore
      if (Array.isArray(bookingData.selectedAddOns) && bookingData.selectedAddOns.length > 0) {
        set({ selectedAddOns: Object.fromEntries(bookingData.selectedAddOns.map((addon: any) => [addon.key, addon.quantity])) });
      } else if (typeof bookingData.selectedAddOns === 'object' && bookingData.selectedAddOns !== null) {
        set({ selectedAddOns: bookingData.selectedAddOns });
      } else {
        set({ selectedAddOns: {} });
      }
      
      // Restore additional fields that might be saved
      set({ address: bookingData.address || "" });
      set({ name: bookingData.name || "" });
      set({ surname: bookingData.surname || "" });
      set({ phone: bookingData.phone || "" });
      set({ comments: bookingData.comments || "" });
      set({ dirtLevel: bookingData.dirtLevel || 'medium' });
      set({ ecoFriendly: !!bookingData.ecoFriendly });
      set({ hooverMop: !!bookingData.hooverMop });
      set({ disinfection: !!bookingData.disinfection });
      set({ errandHours: bookingData.errandHours || 0 });
      set({ havePets: !!bookingData.havePets });
      set({ keyPickup: !!bookingData.keyPickup });
      set({ outdoorCleaning: !!bookingData.outdoorCleaning });
      set({ laundry: !!bookingData.laundry });
      set({ checkJob: !!bookingData.checkJob });
      set({ endOfTenancy: !!bookingData.endOfTenancy });
      set({ expressStudio: !!bookingData.expressStudio });
      
      // Restore selectedType if available
      if (typeof bookingData.selectedType === 'number') {
        set({ selectedType: bookingData.selectedType });
      }
      
      // Restore date and time if available
      if (bookingData.selectedDate) {
        set({ selectedDate: new Date(bookingData.selectedDate) });
      }
      if (typeof bookingData.hour === 'number') {
        set({ hour: bookingData.hour });
      }
      if (typeof bookingData.minute === 'number') {
        set({ minute: bookingData.minute });
      }
      if (typeof bookingData.selectedDuration === 'number') {
        set({ selectedDuration: bookingData.selectedDuration });
      }
      
      // Restore carpet cleaning data if available (for carpet/upholstery service)
      if (bookingData.carpetCleaning) {
        set({ carpetCleaning: bookingData.carpetCleaning });
      }
      
      set({ step: 3 }); // Go to step 3
      
      // Restore user data if it was cleared
      if (currentUser && !localStorage.getItem("user")) {
        localStorage.setItem("user", currentUser);
        localStorage.setItem("token", currentToken || "");
        localStorage.setItem("role", currentRole || "");
        console.log('🔄 Restored user data after it was cleared');
      }
      
      console.log('🔄 User after restoration:', localStorage.getItem("user"));
    } else {
      // If no pending booking, prefill from userDetails if fields are empty
      getUserFromLS()
    }
  }
}, [showAuthModal]);

// On mount, prefill from userDetails if fields are empty
useEffect(() => {
  getUserFromLS()
}, []);

  const isStepDone = (idx: number): boolean => {
    if (idx === 0) return step > 1;
    if (idx === 1) return step > 2;
    return false;
  };

  const handleStepClick = (stepNumber: number) => {
    // Only allow navigation to steps that have been completed or are the current step
    if (stepNumber <= step) {
      set({ step: stepNumber });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-2 bg-[#fafaff]">
      {/* Progress Bar */}
      <ProgressBar step={step} isStepDone={isStepDone} onStepClick={handleStepClick} />
      {/* Step 1: Choose cleaning type and frequency/date/time */}
      {step === 1 && (
      <StepOne/>
      )}

      {/* Step 2: All sections on one scrollable page */}
      {step === 2 && (
      <StepTwo/>
      )}

      {/* Step 3: Additional info (contact, address, comments) and summary */}
      {step === 3 && (
      <StepThree/>
      )}

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

export default Checkout;
