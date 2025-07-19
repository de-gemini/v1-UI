import React, { useLayoutEffect, useState, useRef } from 'react';
import BookingSummary from './BookingSummary';
import { useCheckoutStore, useEstimatedHours, useEstimatedMinutes, useEstimatedPrice, usePricingBreakdown } from '../../store/checkoutStore';
import { useAuthStore } from '../../store/authStore';
import { frequencyOptions, roomTypes, addOns, calculatePrice, PRICING_CONFIG, Frequency, frequencyBackendValues } from './ckeckoutData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchWithAuth } from '../../utils/helper';
import { isTokenValid } from '../../utils/isTokenValid';
import { API_BASE_URL } from '../../constants';
import AuthModal from '../../components/AuthModal';
import UnifiedStripePaymentForm from '../../components/UnifiedStripePaymentForm';
interface StepThreeProps {
  user: any;
  phone: string;
  setPhone: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  surname: string;
  setSurname: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  comments: string;
  setComments: (v: string) => void;
  dirtLevel: 'light' | 'medium' | 'heavy';
  setDirtLevel: (v: 'light' | 'medium' | 'heavy') => void;
  setStep: (v: number) => void;
  handleGetAQuote: () => void;
  summary: any;
  baseRate: number;
  selectedFrequency: number | null;
  frequencyOptions: any[];
  selectedDate: Date;
  pad: (n: number) => string;
  hour: number;
  minute: number;
  roomTotal: number;
  duration: number;
  ecoFriendly: boolean;
  hooverMop: boolean;
  disinfection: boolean;
  errandHours: number;
  havePets: boolean;
  keyPickup: boolean;
  estimatedPrice: number;
}

const StepThree: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingBookingBody, setPendingBookingBody] = useState<any>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string>('');
  const debounceTimeout = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Zustand store hooks
  const {
  name,
  surname,
  address,
    phone,
  comments,
  dirtLevel,
    ecoFriendly,
    hooverMop,
    disinfection,
    outdoorCleaning,
    laundry,
    errandHours,
    havePets,
    keyPickup,
    endOfTenancy,
    expressStudio,
    checkJob,
    set,
    selectedFrequency,
    selectedDate,
    hour,
    minute,
    selectedType,
    selectedDuration,
    roomCounts,
    selectedAddOns,
  } = useCheckoutStore();

  // Use reactive selector hooks for derived state
  const estimatedHours = useEstimatedHours();
  const estimatedMinutes = useEstimatedMinutes();
  const estimatedPrice = useEstimatedPrice();
  const pricingBreakdown = usePricingBreakdown();

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Helper functions
  const getServiceType = (): string => {
    switch (selectedType) {
      case 0: return 'regular_oneoff';
      case 1: return 'end_of_tenancy';
      case 2: return 'carpet_upholstery';
      default: return 'regular_oneoff';
    }
  };

  // Debug: log reactive updates in StepThree
  React.useEffect(() => {
    console.log('StepThree - estimatedHours:', estimatedHours, 'duration:', estimatedMinutes, 'roomTotal:', Object.values(roomCounts).reduce((sum, count) => sum + count, 0));
  }, [estimatedHours, estimatedMinutes, roomCounts]);

  React.useEffect(() => {
    console.log('StepThree - selectedAddOns:', selectedAddOns, 'estimatedHours:', estimatedHours);
  }, [selectedAddOns, estimatedHours]);

  // Debug: log pricing breakdown
  React.useEffect(() => {
    console.log('💰 StepThree Pricing Breakdown:', pricingBreakdown);
    console.log('🔍 StepThree Store State Values:', {
      endOfTenancy,
      expressStudio,
      ecoFriendly,
      hooverMop,
      disinfection,
      outdoorCleaning,
      laundry,
      checkJob,
      havePets,
      keyPickup,
      errandHours
    });
  }, [pricingBreakdown, endOfTenancy, expressStudio, ecoFriendly, hooverMop, disinfection, outdoorCleaning, laundry, checkJob, havePets, keyPickup, errandHours]);

  // Fetch address suggestions from Nominatim
  const fetchAddressSuggestions = (query: string) => {
    if (!query || query.length < 3) {
      setAddressSuggestions([]);
      return;
    }
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=gb`, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'GeminiCleaning/1.0 (info@geminicleaning.com)'
      }
    })
      .then(res => res.json())
      .then(data => setAddressSuggestions(data))
      .catch(() => setAddressSuggestions([]));
  };

  // Handle address input change with debounce
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    set({ address: value });
    setShowSuggestions(true);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchAddressSuggestions(value);
    }, 400);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any) => {
    set({ address: suggestion.display_name });
    setShowSuggestions(false);
    setAddressSuggestions([]);
  };

  // Full quote handler with backend submission
  const handleGetAQuote = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);
    const scheduledDateTime = date.toISOString();
    const rooms = roomTypes
      .map((room, idx) => ({
        type: room.type,
        quantity: roomCounts[room.type] || 0,
        estimatedTime: room.estimatedTime,
      }))
      .filter(r => r.quantity > 0);

    // Format add-ons for backend
    const formattedAddOns = addOns
      .map((addon: any) => ({
        key: addon.key,
        quantity: selectedAddOns[addon.key] || 0,
        estimatedTime: addon.estimatedTime,
        price: addon.price,
      }))
      .filter((addon: any) => addon.quantity > 0);

    if (rooms.length === 0) {
      toast.error('Please select at least one room.');
      setIsSubmitting(false);
      return;
    }
    if (selectedFrequency === null) {
      toast.error('Please select a frequency.');
      setIsSubmitting(false);
      return;
    }

    const body = {
      serviceType: getServiceType(),
      rooms,
      addOns: formattedAddOns,
      address,
      postcode: '',
      scheduledDate: scheduledDateTime,
      dirtLevel,
      estimatedDuration: estimatedMinutes,
      estimatedPrice,
      notes: comments,
      promoCode: 0 || undefined,
      frequency: frequencyBackendValues[selectedFrequency],
      ecofriendlyProduct: ecoFriendly,
      hooverMop,
      disinfection,
      outdoorCleaning,
      laundry,
      errandHours,
      checkJob,
      havePets,
      whereToPickKey: keyPickup ? 'With the neighbour' : '',
      scheduledDayOfWeek: date.getDay(),
      scheduledDayOfMonth: date.getDate(),
      scheduledTime: `${pad(hour)}:${pad(minute)}`,
      scheduledDateTime,
      subscriptionMonths: Number(selectedDuration) || 1,
      endOfTenancy,
      expressStudio,
    };

    console.log('🔍 StepThree - Submitting booking with body:', JSON.stringify(body, null, 2));
    console.log('🔍 StepThree - Current store state:', {
      roomCounts,
      selectedAddOns,
      estimatedPrice,
      estimatedHours,
      pricingBreakdown
    });
    console.log('🔍 StepThree - Additional services being sent:', {
      endOfTenancy,
      expressStudio,
      ecoFriendly,
      hooverMop,
      disinfection,
      outdoorCleaning,
      laundry,
      checkJob,
      havePets,
      keyPickup,
      errandHours
    });

    // Check authentication only before booking submission
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
      localStorage.setItem("pendingBooking", JSON.stringify(body)); // Save booking data
      setPendingBookingBody(body); // Save booking data to state as well
      setShowAuthModal(true);
      setIsSubmitting(false);
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
        setIsSubmitting(false);
        return;
      }
      if(res.status === 401) {
        toast.error('Not authorized, please login.');
        setPendingBookingBody(body);
        setShowAuthModal(true);
        setIsSubmitting(false);
        return;
      }
      if(res.status === 201) {
        toast.success('Booking created successfully');
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
        
        // Store booking ID and show smart payment flow
        setCurrentBookingId(bookingId);
        setShowPaymentFlow(true);
        localStorage.removeItem("pendingBooking"); // Clear after use
        localStorage.removeItem("pendingBookingHandled"); // Reset pending booking handled flag
        
        return { booking };
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
    setIsSubmitting(false);
  };

  // Local scroll to top implementation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
      {/* Main form */}
      <div className="flex-1 bg-white rounded-xl  p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
        {/* Contact details */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">1</div>
            <h2 className="text-xl font-semibold text-gray-800">Contact details</h2>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
            This is necessary for you to be able to manage your booking after it is placed.
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg bg-gray-100" value={user?.email} readOnly placeholder="Email" />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Phone number</label>
              <input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg bg-gray-100" value={phone} onChange={e => set({ phone: e.target.value })} placeholder="Phone number" />
            </div>
          </div>
        </div>
        {/* Additional info */}
        <div>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">2</div>
            <h2 className="text-xl font-semibold text-gray-800">Additional info</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={name} onChange={e => set({ name: e.target.value })} placeholder="Name" />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Surname</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={surname} onChange={e => set({ surname: e.target.value })} placeholder="Surname" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">Address</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg"
                value={address}
                onChange={handleAddressChange}
                onFocus={() => address && setShowSuggestions(true)}
                placeholder="Address"
                autoComplete="off"
              />
              {showSuggestions && addressSuggestions.length > 0 && (
                <ul className="absolute z-20 left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-56 overflow-y-auto shadow-lg">
                  {addressSuggestions.map((suggestion, idx) => (
                    <React.Fragment key={suggestion.place_id}>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.display_name}
                      </li>
                      {addressSuggestions.length > 2 && idx < addressSuggestions.length - 1 && (
                        <hr className="border-t border-gray-200 mx-2" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
            If you didn't find your address in the list, please provide it in comments below
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">Comments</label>
            <textarea className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={comments} onChange={e => set({ comments: e.target.value })} placeholder="Text" maxLength={500} rows={4} />
            <div className="text-right text-xs text-gray-500">{comments.length} / 500</div>
          </div>
          {/* Priority package promo */}
          <div className="bg-yellow-100  border-l-4 border-yellow-400 p-6 rounded hidden flex flex-col gap-2 mt-6">
            <div className="font-bold text-lg">Happiness upgraded with our <span className="text-brand-primary">Priority package</span></div>
            <ul className="list-disc pl-6 text-gray-700 text-base">
              <li>Highly Acclaimed Cleaner Guaranteed</li>
              <li>Free Emergency Cancellation/Rescheduling</li>
              <li>Booking Confirmation Guarantee - "No lost order"</li>
              <li>Peace of mind insurance</li>
              <li>Personal customer support</li>
            </ul>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-2xl text-brand-primary">ONLY FOR £3.49</span>
            </div>
          </div>
        </div>
        
      </div>
      {/* Booking Summary */}
      <div className="w-full lg:w-[350px] lg:sticky lg:top-8 h-fit">
        <BookingSummary />
      </div>
      {/* Final action button */}
      <div className="flex items-center justify-center gap-[10px] mt-8">
          <button
            className="px-8 py-3 bg-red-400 text-white border border-gray-300 rounded-md  font-bold text-lg transition"
            onClick={() => set({ step: 2 })}
          >
            BACK
          </button>
          <button
            className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition flex items-center justify-center"
            onClick={handleGetAQuote}
            disabled={isSubmitting || Object.values(roomCounts).reduce((sum, count) => sum + count, 0) === 0}
            style={isSubmitting || Object.values(roomCounts).reduce((sum, count) => sum + count, 0) === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Submitting...
              </span>
            ) : (
              'SUBMIT BOOKING'
            )}
          </button>
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

      {/* Smart Payment Flow Modal */}
      {showPaymentFlow && currentBookingId && (
        <UnifiedStripePaymentForm
          mode={selectedFrequency !== null && selectedFrequency !== Frequency.ONE_OFF ? 'subscription' : 'one-time'}
          amount={estimatedPrice}
          currency="gbp"
          frequency={selectedFrequency === Frequency.WEEKLY ? 'week' : selectedFrequency === Frequency.FORTNIGHTLY ? 'week' : selectedFrequency === Frequency.MONTHLY ? 'month' : undefined}
          intervalCount={selectedFrequency === Frequency.FORTNIGHTLY ? 2 : 1}
          productName={selectedFrequency !== null && selectedFrequency !== Frequency.ONE_OFF ? 'Cleaning Service Subscription' : undefined}
          bookingId={currentBookingId}
          customerEmail={user?.email || ''}
          customerName={`${name} ${surname}`.trim()}
          subscriptionMonths={Number(selectedDuration) || 1}
          metadata={{
            serviceType: getServiceType(),
            rooms: JSON.stringify(roomTypes.map((room) => ({
              type: room.type,
              quantity: roomCounts[room.type] || 0,
              estimatedTime: room.estimatedTime,
            })).filter((r) => r.quantity > 0)),
            addOns: JSON.stringify(addOns.map((addon) => ({
              key: addon.key,
              quantity: selectedAddOns[addon.key] || 0,
              estimatedTime: addon.estimatedTime,
              price: addon.price,
            })).filter((addon) => addon.quantity > 0)),
            address,
            scheduledDate: (() => { const d = new Date(selectedDate); d.setHours(hour, minute, 0, 0); return d.toISOString(); })(),
            frequency: frequencyBackendValues[selectedFrequency || 3],
          }}
          onSuccess={(result) => {
            setShowPaymentFlow(false);
            toast.success(result?.subscriptionId ? 'Subscription created successfully!' : 'Payment successful!');
          }}
          onError={(error) => {
            setShowPaymentFlow(false);
            toast.error(error);
          }}
          onClose={() => setShowPaymentFlow(false)}
        />
      )}
    </div>
  );
};

export default StepThree; 