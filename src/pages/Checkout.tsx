import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axiosInstance from '../api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import { Check } from 'lucide-react';

const cleaningTypes = [
  "One-Off / Regular / Carpet&Upholstery",
  "End of Tenancy",
  "Carpet&Upholstery only",
];

const frequencyOptions = [
  {
    label: "Weekly",
    price: "£17/h",
    cashback: true,
    features: [
      "Background-checked professionals",
      "Replacement of the cleaner if you are not happy",
      "Helpful customer service",
      "Free rescheduling up to 24 hours prior the service",
    ],
  },
  {
    label: "Fortnightly",
    price: "£18/h",
    cashback: true,
    best: true,
    features: [
      "Background-checked professionals",
      "Replacement of the cleaner if you are not happy",
      "Helpful customer service",
      "Free rescheduling up to 24 hours prior the service",
    ],
  },
  {
    label: "Monthly",
    price: "£19/h",
    cashback: true,
    features: [
      "Background-checked professionals",
      "Replacement of the cleaner if you are not happy",
      "Helpful customer service",
      "Free rescheduling up to 24 hours prior the service",
    ],
  },
  {
    label: "One – Off",
    price: "from £19/h",
    oneOffDetails: [
      { label: "Next day", price: "£19/h", desc: "Any day from tomorrow (8 am - 9 pm)" },
      { label: "Same day", price: "£29/h", desc: "Today, in 4h minimum (8 am - 9 pm)" },
      { label: "Peak", price: "£20/h", desc: "High demand" },
      { label: "Night", price: "£29/h", desc: "Any day (9 pm - 8 am)" },
    ],
  },
];

const roomTypes = [
  { type: "bedroom", label: "Bedroom", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/bedroom.svg" },
  { type: "living", label: "Living/Dining room", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/living_dining.svg" },
  { type: "bathroom", label: "Bathroom", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/bathroom.svg" },
  { type: "hall", label: "Hall", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/hall.svg" },
  { type: "staircase", label: "Staircase", estimatedTime: 15, icon: "https://www.emop.co.uk/static/images/steps_booking/stairs.svg" },
  { type: "toilet", label: "Toilet", estimatedTime: 15, icon: "https://www.emop.co.uk/static/images/steps_booking/toilet.svg" },
  { type: "kitchen", label: "Kitchen", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen.svg" },
  { type: "office", label: "Office room", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/office.svg" },
  { type: "conservatory", label: "Conservatory", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/conservatory.svg" },
  { type: "garage", label: "Garage", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/bookAgain/Garage.svg" },
];

const addOns = [
  { key: "fridge", label: "Fridge (inside)", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/fridge_inside.svg" },
  { key: "windows", label: "Windows (inside)", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/windows.svg" },
  { key: "ironing", label: "Ironing", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/Ironing.svg" },
  { key: "laundry", label: "Laundry", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/steps_booking/Laundry.svg", price: 9, yesNo: true },
  { key: "microwave", label: "Microwave (inside)", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/microwave.svg" },
  { key: "kitchen_inside", label: "Kitchen (inside)", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen_inside.svg" },
  { key: "bed_making", label: "Bed making", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/bed_making.svg" },
  { key: "bookcase", label: "Bookcase", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/bookcase.svg" },
  { key: "oven", label: "Oven", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/Oven.svg", price: 25, yesNo: true },
  { key: "oven_grill", label: "Oven & Grill", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/Ovenandgrill.svg", price: 35, yesNo: true },
  { key: "outdoor", label: "Outdoor cleaning", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/bookAgain/Outdoor_cleaning.svg" },
];

const pad = (n: number) => n.toString().padStart(2, '0');

const Checkout = () => {
  // Get the postcode from the query string
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const postcode = params.get("postcode") || "E1 6AN";

  const [step, setStep] = useState(1); // 1: cleaning type, 2: what to clean, 3: additional info
  const [step1View, setStep1View] = useState(0); // 0: cleaning type, 1: frequency/date/time
  const [selectedType, setSelectedType] = useState(0); // First option selected by default
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hour, setHour] = useState(8);
  const [minute, setMinute] = useState(0);
  // Step 2 state
  const [roomCounts, setRoomCounts] = useState(roomTypes.map(() => 0));
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [ecoFriendly, setEcoFriendly] = useState(false);
  const [hooverMop, setHooverMop] = useState(false);
  const [disinfection, setDisinfection] = useState(false);
  const [errandHours, setErrandHours] = useState(0);
  const [checkJob, setCheckJob] = useState(false);
  const [havePets, setHavePets] = useState(false);
  const [keyPickup, setKeyPickup] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  // Step 3 state (contact & address)
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");
  const [dirtLevel, setDirtLevel] = useState<'light' | 'medium' | 'heavy'>('medium');

  // Time picker handlers
  const incrementHour = () => setHour(h => (h + 1) % 24);
  const decrementHour = () => setHour(h => (h - 1 + 24) % 24);
  const incrementMinute = () => setMinute(m => (m + 1) % 60);
  const decrementMinute = () => setMinute(m => (m - 1 + 60) % 60);

  // Add-on toggle
  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Calculate estimated price and duration (simple logic for demo)
  const baseRate = selectedFrequency !== null ? [17, 18, 19, 19][selectedFrequency] : 17;
  const roomTotal = roomTypes.reduce((sum, room, idx) => sum + roomCounts[idx], 0);
  const duration = roomTypes.reduce((sum, room, idx) => sum + roomCounts[idx] * room.estimatedTime, 0) + errandHours * 60;
  let estimatedPrice = Math.max(54, Math.round((duration / 60) * baseRate)); // min price £54
  if (ecoFriendly) estimatedPrice += 6;
  if (hooverMop) estimatedPrice += 15;
  if (disinfection) estimatedPrice += 10;

  // Map selectedType to serviceType
  const getServiceType = () => {
    switch (selectedType) {
      case 0:
        return "regular_oneoff";
      case 1:
        return "end_of_tenancy";
      case 2:
        return "carpet_upholstery";
      default:
        return "regular_oneoff";
    }
  };

  // API integration for booking (now uses all fields)
  const handleGetAQuote = async () => {
    // Compose scheduledDateTime in ISO format
    const date = new Date(selectedDate);
    date.setHours(hour, minute, 0, 0);
    const scheduledDateTime = date.toISOString();
    // Compose rooms array
    const rooms = roomTypes
      .map((room, idx) => ({
        type: room.type,
        quantity: roomCounts[idx],
        estimatedTime: room.estimatedTime,
      }))
      .filter((r) => r.quantity > 0);
    if (rooms.length === 0) {
      toast.error('Please select at least one room.');
      return;
    }
    if (!address || !email || !phone || !name || !surname) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (selectedFrequency === null) {
      toast.error('Please select a frequency.');
      return;
    }
    // Compose request body to match API sample
    const body = {
      serviceType: getServiceType(),
      rooms,
      address,
      postcode,
      scheduledDate: scheduledDateTime,
      dirtLevel: dirtLevel,
      estimatedDuration: duration, // in minutes
      estimatedPrice,
      notes: comments,
      promoCode: promoCode || undefined,
      frequency: selectedFrequency !== null ? frequencyOptions[selectedFrequency].label.toLowerCase().replace(/[^a-z]/g, '') : '',
      ecofriendlyProduct: ecoFriendly,
      errandHours,
      havePets,
      whereToPickKey: keyPickup ? "With the neighbour" : "",
      scheduledDayOfWeek: date.getDay(),
      scheduledDayOfMonth: date.getDate(),
      scheduledTime: `${pad(hour)}:${pad(minute)}`,
      scheduledDateTime,
      subscriptionMonths: 1,
      // The following fields are not in the sample, so omit:
      // hooverMop, disinfection, email, phone, name, surname, addOns
    };
    try {
      const res = await axiosInstance.post('https://v1-api-6rdd.onrender.com/bookings', body);
      toast.success('Booking created!');
      if(res.status === 400) {
        toast.error('Something has gone wrong!')
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || 'An error occurred';
      toast.error(msg);
    }
  };

  // Progress bar step status
  const isStepDone = (idx: number) => {
    if (idx === 0) return step > 1;
    if (idx === 1) return step > 2;
    if (idx === 2) return false;
    return false;
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
      <div className="w-full max-w-5xl flex justify-center mb-8 px-2">
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-0 bg-transparent">
          <h2 className="text-2xl font-bold text-brand-primary text-xl mb-2 sm:mb-0 sm:mr-6">Degemini</h2>
          <div className="flex flex-col sm:flex-row w-full">
            {['When to clean', 'What to clean', 'Additional info'].map((label, idx) => (
              <div key={label} className="flex-1 flex flex-row sm:flex-col items-center sm:items-center relative mb-2 sm:mb-0">
                <span className={`text-sm sm:text-base font-semibold mb-0 sm:mb-2 ${step - 1 === idx ? "text-brand-primary" : isStepDone(idx) ? 'text-green-600' : "text-gray-700"}`}>{label}</span>
                <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${step - 1 === idx ? 'border-brand-primary' : isStepDone(idx) ? 'border-green-600 bg-green-100' : 'border-[#d6d6f7]'} bg-white text-base sm:text-lg font-bold ${isStepDone(idx) ? 'text-green-600' : 'text-brand-primary'} ml-2 sm:ml-0`} style={{ zIndex: 2 }}>{isStepDone(idx) ? <Check className="w-5 h-5" /> : idx + 1}</div>
                {idx < 2 && <div className="hidden sm:block absolute top-4 right-0 w-full h-0.5 bg-gray-200 z-0" style={{ left: '50%', width: '100%' }}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: Choose cleaning type and frequency/date/time */}
      {step === 1 && (
        <div className="w-full flex flex-col items-center md:items-center lg:items-start">
          {step1View === 0 && (
            <div className="w-full max-w-6xl bg-white border border-gray-300 p-8 mt-4">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">1</div>
                <h2 className="text-xl font-semibold text-gray-800">Choose a type of cleaning</h2>
              </div>
              <div className="flex flex-col gap-4 mb-8">
                {cleaningTypes.map((type, idx) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(idx)}
                    className={`w-full text-left px-6 py-4 rounded-md border transition-all font-medium text-lg flex items-center gap-2
                      ${selectedType === idx
                        ? "border-[#a78bfa] bg-[#fafaff] text-brand-primary shadow-sm ring-2 ring-[#a78bfa]"
                        : "border-gray-200 bg-gray-50 text-gray-500 hover:border-[#a78bfa] hover:bg-[#f3f0ff]"}
                    `}
                  >
                    <span className={`inline-block w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${selectedType === idx ? "border-[#a78bfa] bg-[#a78bfa]" : "border-gray-300 bg-white"}`}>
                      {selectedType === idx && <span className="w-3 h-3 bg-white rounded-full block" />}
                    </span>
                    {type}
                  </button>
                ))}
              </div>
              <button
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 rounded-md text-lg transition mt-2"
                onClick={() => setStep1View(1)}
              >
                NEXT
              </button>
            </div>
          )}
          {step1View === 1 && (
            <div className="w-full max-w-6xl bg-white border border-gray-300 p-8 mt-4">
              {/* Frequency and One-Off/Regular UI, date/time picker, and extra options go here (see eMop screenshot) */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Frequency/One-Off selection */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-200 absolute text-yellow-800 font-bold px-3 py-1 rounded-full text-xs">Cashback up to £150</span>
                  </div>
                  {/* Frequency options */}
                  {frequencyOptions.slice(0, 3).map((freq, idx) => (
                    <div key={freq.label} className={`border relative rounded-lg p-4 mb-2 ${selectedFrequency === idx ? 'border-[#a78bfa] bg-[#fafaff]' : 'border-gray-200 bg-white'} flex flex-col gap-2`}> 
                      <div className="flex items-center gap-2">
                        <input type="radio" name="frequency" checked={selectedFrequency === idx} onChange={() => setSelectedFrequency(idx)} className="accent-[#a78bfa] w-5 h-5" />
                        <span className="font-bold text-lg">{freq.label}</span>
                        <span className="ml-auto font-bold text-brand-primary">{freq.price}</span>
                      </div>
                      <ul className="list-disc pl-6 text-gray-700 text-sm">
                        {(freq.features ?? []).map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  ))}
                  {/* One-Off special card */}
                  <div className={`border-2 rounded-lg p-4 mt-2 ${selectedFrequency === 3 ? 'border-[#a78bfa] bg-[#fafaff]' : 'border-[#a78bfa] bg-white'} flex flex-col gap-2`}> 
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" name="frequency" checked={selectedFrequency === 3} onChange={() => setSelectedFrequency(3)} className="accent-[#a78bfa] w-5 h-5" />
                      <span className="font-bold text-lg">One – Off</span>
                      <span className="ml-auto font-bold text-brand-primary">from £19/h</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {frequencyOptions[3].oneOffDetails?.map(opt => (
                        <div key={opt.label} className="flex flex-col border border-[#a78bfa] rounded-md p-2 text-xs">
                          <span className="font-bold text-brand-primary">{opt.label}</span>
                          <span>{opt.desc}</span>
                          <span className="font-bold">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Date/Time picker */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Choose date</h3>
                      <div className="bg-white rounded-lg shadow p-4">
                        <Calendar
                          onChange={date => setSelectedDate(date as Date)}
                          value={selectedDate}
                          minDate={new Date()}
                          calendarType="iso8601"
                          prev2Label={null}
                          next2Label={null}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Choose start time</h3>
                      <div className="flex flex-col items-center bg-white rounded-lg shadow p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <button onClick={incrementHour} className="px-2 py-1 text-xl font-bold text-brand-primary hover:bg-gray-100 rounded">▲</button>
                          <span className="w-8 text-center text-2xl font-mono">{pad(hour)}</span>
                          <span className="text-2xl font-mono">:</span>
                          <span className="w-8 text-center text-2xl font-mono">{pad(minute)}</span>
                          <button onClick={incrementMinute} className="px-2 py-1 text-xl font-bold text-brand-primary hover:bg-gray-100 rounded">▲</button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={decrementHour} className="px-2 py-1 text-xl font-bold text-brand-primary hover:bg-gray-100 rounded">▼</button>
                          <span className="w-8" />
                          <span className="w-8" />
                          <button onClick={decrementMinute} className="px-2 py-1 text-xl font-bold text-brand-primary hover:bg-gray-100 rounded">▼</button>
                        </div>
                        <div className="mt-2 text-gray-500 text-sm">Time is in 24 h format</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Extra options (End of Tenancy, Express/Studio) */}
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Do you need End of Tenancy cleaning?</span>
                  <button className="px-4 py-1 rounded-md border font-bold border-[#a78bfa] text-[#a78bfa] bg-white">No</button>
                  <button className="px-4 py-1 rounded-md border font-bold border-[#a78bfa] text-white bg-[#a78bfa]">Yes</button>
                  <span className="ml-2 text-xs text-[#a78bfa]">Please check our Check-list <a href="#" className="underline">here</a> ( Additional £39 )</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">Need Express or Studio cleaning?</span>
                  <button className="px-4 py-1 rounded-md border font-bold border-[#a78bfa] text-[#a78bfa] bg-white">No</button>
                  <button className="px-4 py-1 rounded-md border font-bold border-[#a78bfa] text-white bg-[#a78bfa]">Yes</button>
                  <span className="ml-2 text-xs text-[#a78bfa]">2h clean with Cleaning products included</span>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center justify-center gap-[10px] mt-8">
                <button
                  className="px-8 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-bold text-lg hover:bg-gray-100 transition"
                  onClick={() => setStep1View(0)}
                >
                  BACK
                </button>
                <button
                  className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition"
                  onClick={() => setStep(2)}
                >
                  NEXT
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: All sections on one scrollable page */}
      {step === 2 && (
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
            {/* Room selection */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#a78bfa] text-[#a78bfa] font-bold mr-3">2</div>
                <h2 className="text-xl font-semibold text-gray-800">Please choose the rooms to clean to get an estimated price</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8">
                {roomTypes.map((room, idx) => (
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
                        onClick={() => setRoomCounts(rc => rc.map((v, i) => i === idx ? Math.max(0, v - 1) : v))}
                      >-</button>
                      <span className="w-8 text-center text-lg">{roomCounts[idx]}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                        onClick={() => setRoomCounts(rc => rc.map((v, i) => i === idx ? v + 1 : v))}
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
                {addOns.map((addon, idx) => (
                  <div key={addon.key} className="flex items-center bg-gray-50 rounded-lg p-4 shadow-sm justify-between">
                    <div className="flex items-center gap-3">
                      <img src={addon.icon} alt="icons" className="w-10 h-10" />
                      <div>
                        <span className="font-bold text-brand-primary block">{addon.label}</span>
                        {addon.estimatedTime > 0 && <span className="text-xs text-gray-500">≈{addon.estimatedTime}min</span>}
                        {addon.price && <span className="text-xs text-[#a78bfa] ml-2">(Additional £{addon.price})</span>}
                      </div>
                    </div>
                    {addon.yesNo ? (
                      <div className="flex gap-2">
                        <button
                          className={`px-4 py-1 rounded-md border font-bold ${selectedAddOns.includes(addon.key) ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`}
                          onClick={() => toggleAddOn(addon.key)}
                        >{selectedAddOns.includes(addon.key) ? 'Yes' : 'No'}</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                          onClick={() => setSelectedAddOns(prev => {
                            const count = prev.filter(k => k === addon.key).length;
                            if (count > 0) return prev.filter(k => k !== addon.key);
                            return [...prev, addon.key];
                          })}
                        >-</button>
                        <span className="w-8 text-center text-lg">{selectedAddOns.filter(k => k === addon.key).length}</span>
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white"
                          onClick={() => setSelectedAddOns(prev => [...prev, addon.key])}
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
                <span className="font-semibold">Do you need Eco-friendly cleaning products? <span className="text-[#a78bfa]">( Additional £6 )</span></span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!ecoFriendly ? 'bg-white border-[#a78bfa] text-[#a78bfa]' : 'bg-[#a78bfa] text-white border-[#a78bfa]'}`} onClick={() => setEcoFriendly(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${ecoFriendly ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`} onClick={() => setEcoFriendly(true)}>Yes</button>
                <span className="ml-2"><img src="https://www.emop.co.uk/static/images/ecover_svg_mob.svg" alt="ecover" className="inline w-8 h-8" /></span>
              </div>
              {/* Hoover & Mop */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Do you need a Hoover and a Mop? <span className="text-[#a78bfa]">(Additional £15)</span></span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!hooverMop ? 'bg-white border-[#a78bfa] text-[#a78bfa]' : 'bg-[#a78bfa] text-white border-[#a78bfa]'}`} onClick={() => setHooverMop(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${hooverMop ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`} onClick={() => setHooverMop(true)}>Yes</button>
              </div>
              {/* Disinfection recommendation */}
              <div className="bg-green-50 border-l-4 border-green-400 p-4 flex items-center gap-3 rounded-md">
                <span className="text-green-700 text-xl font-bold">&#9888;</span>
                <span className="text-green-700">We strongly recommend that all cleanings include a disinfection service which will give you extra protection for you and your loved ones.</span>
              </div>
              {/* Disinfection */}
              <div className="flex items-center gap-4 bg-green-100 rounded-lg p-4">
                <span className="font-semibold">Do you need us to disinfect your home? <span className="text-green-700">( Additional £10 )</span></span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!disinfection ? 'bg-white border-green-400 text-green-700' : 'bg-green-400 text-white border-green-400'}`} onClick={() => setDisinfection(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${disinfection ? 'bg-green-400 text-white border-green-400' : 'bg-white border-green-400 text-green-700'}`} onClick={() => setDisinfection(true)}>Yes</button>
              </div>
              {/* Errands/Chores */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Do you need help with any Errands/Chores?</span>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white" onClick={() => setErrandHours(eh => Math.max(0, eh - 1))}>-</button>
                <span className="w-12 text-center text-lg">{errandHours}h</span>
                <button className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold flex items-center justify-center hover:bg-brand-primary hover:text-white" onClick={() => setErrandHours(eh => eh + 1)}>+</button>
              </div>
              {/* Check job at end */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Can you check the job at the end?</span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!checkJob ? 'bg-white border-[#a78bfa] text-[#a78bfa]' : 'bg-[#a78bfa] text-white border-[#a78bfa]'}`} onClick={() => setCheckJob(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${checkJob ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`} onClick={() => setCheckJob(true)}>Yes</button>
              </div>
              
              {/* Pets */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Do you have pets?</span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!havePets ? 'bg-white border-[#a78bfa] text-[#a78bfa]' : 'bg-[#a78bfa] text-white border-[#a78bfa]'}`} onClick={() => setHavePets(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${havePets ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`} onClick={() => setHavePets(true)}>Yes</button>
              </div>
              {/* Key pickup */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Does a cleaner need to pick up a key?</span>
                <button className={`px-4 py-1 rounded-md border font-bold ${!keyPickup ? 'bg-white border-[#a78bfa] text-[#a78bfa]' : 'bg-[#a78bfa] text-white border-[#a78bfa]'}`} onClick={() => setKeyPickup(false)}>No</button>
                <button className={`px-4 py-1 rounded-md border font-bold ${keyPickup ? 'bg-[#a78bfa] text-white border-[#a78bfa]' : 'bg-white border-[#a78bfa] text-[#a78bfa]'}`} onClick={() => setKeyPickup(true)}>Yes</button>
              </div>

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
                      onClick={() => setDirtLevel(level as 'light' | 'medium' | 'heavy')}
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
            {/* Final action button */}
            <div className="flex items-center justify-center gap-[10px] mt-8">
              <button
                className="px-8 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-bold text-lg hover:bg-gray-100 transition"
                onClick={() => setStep(1)}
              >
                BACK
              </button>
              <button
                className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition"
                onClick={() => setStep(3)}
              >
                NEXT
              </button>
            </div>
          </div>
          {/* Booking Summary */}
          <div className="w-full lg:w-[350px] bg-yellow-50 rounded-xl shadow-lg p-4 sm:p-6 mt-4 flex flex-col gap-4 lg:sticky lg:top-8 h-fit">
            <div className="flex items-center justify-between cursor-pointer">
              <span className="font-bold text-lg">Booking Summary</span>
              <span className="text-xl">&#8964;</span>
            </div>
            <div className="text-sm">
              <div className="flex justify-between"><span>Tariff</span><span className="font-bold">{selectedFrequency !== null ? frequencyOptions[selectedFrequency].label : '-'}</span></div>
              <div className="flex justify-between"><span>Rate</span><span className="font-bold">£{baseRate}/h</span></div>
              <div className="flex justify-between"><span>Date</span><span>{selectedDate.toLocaleDateString()} {pad(hour)}:{pad(minute)}</span></div>
              <div className="flex justify-between"><span>Rooms</span><span>{roomTotal}</span></div>
              <div className="flex justify-between"><span>Duration</span><span>{Math.floor(duration / 60)}h {duration % 60}m</span></div>
              <div className="flex justify-between"><span>Eco-friendly</span><span>{ecoFriendly ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Hoover & Mop</span><span>{hooverMop ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Disinfection</span><span>{disinfection ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Errands</span><span>{errandHours}h</span></div>
              <div className="flex justify-between"><span>Pets</span><span>{havePets ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Key pickup</span><span>{keyPickup ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between font-bold text-lg mt-2"><span>Estimated Amount</span><span>£{estimatedPrice}</span></div>
              <div className="flex justify-between text-xs text-gray-500"><span>Min time price</span><span>£54</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Additional info (contact, address, comments) and summary */}
      {step === 3 && (
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Main form */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 flex flex-col gap-10">
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
                  <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg bg-gray-100" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Phone number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg bg-gray-100" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
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
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Surname</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={surname} onChange={e => setSurname(e.target.value)} placeholder="Surname" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1">Address</label>
                <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
                If you didn't find your address in the list, please provide it in comments below
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1">Comments</label>
                <textarea className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg" value={comments} onChange={e => setComments(e.target.value)} placeholder="Text" maxLength={500} rows={4} />
                <div className="text-right text-xs text-gray-500">{comments.length} / 500</div>
              </div>
              {/* Priority package promo */}
              <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded flex flex-col gap-2 mt-6">
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
            {/* Final action button */}
            <div className="flex items-center justify-center gap-[10px] mt-8">
              <button
                className="px-8 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-bold text-lg hover:bg-gray-100 transition"
                onClick={() => setStep(2)}
              >
                BACK
              </button>
              <button
                className="px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition"
                onClick={handleGetAQuote}
              >
                GET A QUOTE
              </button>
            </div>
          </div>
          {/* Booking Summary */}
          <div className="w-full lg:w-[350px] bg-yellow-50 rounded-xl shadow-lg p-4 sm:p-6 mt-4 flex flex-col gap-4 lg:sticky lg:top-8 h-fit">
            <div className="flex items-center justify-between cursor-pointer">
              <span className="font-bold text-lg">Booking Summary</span>
              <span className="text-xl">&#8964;</span>
            </div>
            <div className="text-sm">
              <div className="flex justify-between"><span>Tariff</span><span className="font-bold">{selectedFrequency !== null ? frequencyOptions[selectedFrequency].label : '-'}</span></div>
              <div className="flex justify-between"><span>Rate</span><span className="font-bold">£{baseRate}/h</span></div>
              <div className="flex justify-between"><span>Date</span><span>{selectedDate.toLocaleDateString()} {pad(hour)}:{pad(minute)}</span></div>
              <div className="flex justify-between"><span>Rooms</span><span>{roomTotal}</span></div>
              <div className="flex justify-between"><span>Duration</span><span>{Math.floor(duration / 60)}h {duration % 60}m</span></div>
              <div className="flex justify-between"><span>Eco-friendly</span><span>{ecoFriendly ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Hoover & Mop</span><span>{hooverMop ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Disinfection</span><span>{disinfection ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Errands</span><span>{errandHours}h</span></div>
              <div className="flex justify-between"><span>Pets</span><span>{havePets ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Key pickup</span><span>{keyPickup ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between font-bold text-lg mt-2"><span>Estimated Amount</span><span>£{estimatedPrice}</span></div>
              <div className="flex justify-between text-xs text-gray-500"><span>Min time price</span><span>£54</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
