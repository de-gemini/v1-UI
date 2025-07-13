import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';

import { fetchWithAuth } from "../utils/helper";
import { useAuthStore } from "../store/authStore";
import { createStripePaymentIntent } from "../api/stripePayment";
import { isTokenValid } from "../utils/isTokenValid";
import AuthModal from "../components/AuthModal";
import { API_BASE_URL } from "../constants";

import {
  frequencyBackendValues,
  roomTypes,
  calculatePrice,
  PRICING_CONFIG,
  Frequency,
  ServiceType
} from './Checkout/ckeckoutData';
import StepOne from "./Checkout/StepOne";
import StepTwo from "./Checkout/StepTwo";
import StepThree from "./Checkout/StepThree";
import ProgressBar from "./Checkout/ProgressBar";
import { useCheckoutStore } from '../store/checkoutStore';

const pad = (n: number) => n.toString().padStart(2, '0');

const Checkout = () => {
  // Local scroll to top implementation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the postcode from the query s
  const user = useAuthStore.getState().user
  const navigate = useNavigate()

  // Zustand store hooks
  const {
    step,
    set,
    selectedType,
    selectedFrequency,
    selectedDate,
    hour,
    minute,
    roomCounts,
    ecoFriendly,
    hooverMop,
    disinfection,
    errandHours,
    havePets,
    keyPickup,
    dirtLevel,
    name,
    surname,
    address,
    phone,
    comments,
  } = useCheckoutStore();

  // Remove all useState for these fields and use the store instead
  // Update all handlers to use set({ ... })
  // Do not pass state as props to StepOne, StepTwo, StepThree


  const [showAuthModal, setShowAuthModal] = useState(false);
const [pendingBookingBody, setPendingBookingBody] = useState<any>(null);


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

  const getServiceType = (): string => {
    switch (selectedType) {
      case 0: return 'regular_oneoff';
      case 1: return 'end_of_tenancy';
      case 2: return 'carpet_upholstery';
      default: return 'regular_oneoff';
    }
  };

  const handleGetAQuote = async () => {
    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);
    const scheduledDateTime = date.toISOString();
    const rooms = roomTypes
      .map((room, idx) => ({
        type: room.type,
        quantity: roomCounts[idx],
        estimatedTime: room.estimatedTime,
      }))
      .filter(r => r.quantity > 0);

    if (rooms.length === 0) {
      toast.error('Please select at least one room.');
      return;
    }
    if (selectedFrequency === null) {
      toast.error('Please select a frequency.');
      return;
    }

    const body = {
      serviceType: getServiceType(),
      rooms,
      address,
      postcode: '',
      scheduledDate: scheduledDateTime,
      dirtLevel,
      estimatedDuration: duration,
      estimatedPrice,
      notes: comments,
      promoCode: 0 || undefined,
      frequency: frequencyBackendValues[selectedFrequency],
      ecofriendlyProduct: ecoFriendly,
      errandHours,
      havePets,
      whereToPickKey: keyPickup ? 'With the neighbour' : '',
      scheduledDayOfWeek: date.getDay(),
      scheduledDayOfMonth: date.getDate(),
      scheduledTime: `${pad(hour)}:${pad(minute)}`,
      scheduledDateTime,
      subscriptionMonths: 1,
    };

    console.log(body)

    // Check authentication only before booking submission
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
    localStorage.setItem("pendingBooking", JSON.stringify(body)); // Save booking data
    setPendingBookingBody(body); // Save booking data to state as well
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const booking = await res.json()
      const bookingId = booking?.payload?._id

      if (!bookingId) {
        toast.error('Booking ID not found in response')
        throw new Error('Booking ID not found in response');
      }
      if (!res.ok) {
        toast.error('Something has gone wrong!, please try again.');
        return;
      }
    if(res.status === 401) {
        toast.error('Not authorized, please login.');
        setPendingBookingBody(body);
        setShowAuthModal(true);
        return;
      }
      if(res.status === 201) {
        toast.success('Booking created!');
      // Update user details in backend
      if (user && user.id) {
        await fetchWithAuth(`${API_BASE_URL}/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            surname,
            address,
            phone,
          }),
        });
      }
        const paymentIntent = await createStripePaymentIntent(bookingId);
      localStorage.removeItem("pendingBooking"); // Clear after use
      const clientSecret = paymentIntent?.payload?.clientSecret || paymentIntent?.data?.clientSecret || paymentIntent?.clientSecret;
      if (clientSecret) {
        navigate('/stripe-card-payment', { state: { clientSecret, bookingId } });
      }
        return { booking, paymentIntent };
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
  };


const getUserFromLS = ()=>{
  const details = localStorage.getItem("user");
      if (details) {
        const d = JSON.parse(details);
        if (!name && d.name) set({ name: d.name });
        if (!surname && d.surname) set({ surname: d.surname });
        if (!address && d.address) set({ address: d.address });
        if (!phone && d.phone) set({ phone: d.phone });
      }
}

// After AuthModal closes (login), update user document with available details and store to localStorage
useEffect(() => {
  if (showAuthModal === false) {
    // User just logged in, check for pending booking
    const pending = localStorage.getItem("pendingBooking");
    if (pending) {
      const bookingData = JSON.parse(pending);
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
      if (Array.isArray(bookingData.roomCounts) && bookingData.roomCounts.length === roomTypes.length) {
        set({ roomCounts: Object.fromEntries(roomTypes.map(rt => {
          const found = bookingData.roomCounts.find((r: any) => r.type === rt.type);
          return [rt.type, found ? found.quantity : 0];
        })) });
      } else if (Array.isArray(bookingData.rooms)) {
        set({
          roomCounts: Object.fromEntries(
            roomTypes.map(rt => {
              const found = bookingData.rooms.find((r: any) => r.type === rt.type);
              return [rt.type, found ? found.quantity : 0];
            })
          )
        });
      } else {
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
      set({ step: 3 }); // Go to step 3
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
      <ToastContainer
      position="top-right"
      rtl={true}
      autoClose={5000}
      hideProgressBar={false}
      />
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
