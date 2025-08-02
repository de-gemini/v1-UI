
export const formatPrice = (price: number) => `£${price}/h`;
import { PRICING_CONFIG } from "../ckeckoutData";
// Reusable components
export const FrequencyOption: React.FC<{
    freq: any;
    idx: number;
    selectedFrequency: number | null;
    setSelectedFrequency: (v: number) => void;
  }> = ({ freq, idx, selectedFrequency, setSelectedFrequency }) => (
    <div 
      className={`border relative rounded-lg p-4 mb-2 transition-all duration-200 cursor-pointer ${
        selectedFrequency === idx 
          ? 'border-brand-primary bg-[#fafaff] shadow-lg scale-[1.02] ring-2 ring-brand-primary/20' 
          : 'border-gray-200 bg-white hover:border-brand-primary/50 hover:bg-gray-50'
      }`} 
      onClick={() => setSelectedFrequency(idx)}
    > 
      <div className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selectedFrequency === idx
            ? 'border-brand-primary bg-brand-primary'
            : 'border-gray-300 bg-white'
        }`}>
          {selectedFrequency === idx && (
            <div className="w-2 h-2 bg-white rounded-full"></div>
          )}
        </div>
        <span className={`font-bold text-lg transition-colors ${
          selectedFrequency === idx ? 'text-brand-primary' : 'text-gray-800'
        }`}>
          {freq.label}
        </span>
        <span className="ml-auto font-bold text-brand-primary">
          {formatPrice(freq.price)}
        </span>
      </div>
      <ul className="list-disc pl-6 text-gray-700 text-sm mt-2">
        {(freq.features ?? []).map((f: string) => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
  
  export const PlanButton: React.FC<{
    plan: any;
    selectedDuration: string;
    setSelectedDuration: (v: string) => void;
  }> = ({ plan, selectedDuration, setSelectedDuration }) => (
    <button
      key={plan.months}
      onClick={() => setSelectedDuration(plan.months)}
      className={`relative flex flex-col items-center justify-center px-4 py-4 border rounded-md w-full
        ${
          selectedDuration === plan.months
            ? 'border-brand-primary bg-neutral-100 border-[2px]'
            : 'border-gray-300 hover:border-purple-300'
        } transition-all`}
    >
      <span
        className={`text-sm font-medium mb-2 ${
          selectedDuration === plan.months ? 'text-brand-primary' : 'text-gray-500'
        }`}
      >
        {plan.months} months
      </span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${plan.color}`}
      >
        Cashback {plan.cashback}
      </span>
    </button>
  );
  
  export const ExpressStudioOption: React.FC<{
    expressStudio: boolean;
    setExpressStudio: (v: boolean) => void;
  }> = ({ expressStudio, setExpressStudio }) => (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Need Express or Studio cleaning?</span>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="expressStudio"
            value="no"
            checked={!expressStudio}
            onChange={() => setExpressStudio(false)}
            className="accent-brand-primary"
          />
          No
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="expressStudio"
            value="yes"
            checked={expressStudio}
            onChange={() => setExpressStudio(true)}
            className="accent-brand-primary"
          />
          Yes
        </label>
      </div>
      <span className="ml-2 text-xs text-brand-primary">
        2h clean with Cleaning products included
      </span>
    </div>
  );
  
  export const EndOfTenancyOption: React.FC<{
    endOfTenancy: boolean;
    setEndOfTenancy: (v: boolean) => void;
  }> = ({ endOfTenancy, setEndOfTenancy }) => (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Do you need End of Tenancy cleaning?</span>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="endOfTenancy"
            value="no"
            checked={!endOfTenancy}
            onChange={() => setEndOfTenancy(false)}
            disabled={true}
            className="accent-brand-primary"
          />
          No
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="endOfTenancy"
            value="yes"
            checked={endOfTenancy}
            onChange={() => setEndOfTenancy(true)}
            className="accent-brand-primary"
          />
          Yes
        </label>
      </div>
      <span className="ml-2 text-xs text-brand-primary">
        {/* Please check our Check-list <a href="/help/end-of-tenancy" target="_blank" className="underline">here</a> ( Additional £{PRICING_CONFIG.additionalServices.endOfTenancy} ) */}
        Please check our Check-list <a href="/help/end-of-tenancy" target="_blank" className="underline">here</a> ( Additional £39 )
      </span>
    </div>
  );
  
  export const TimePicker: React.FC<{
    hour: number;
    minute: number;
    incrementHour: () => void;
    decrementHour: () => void;
    incrementMinute: () => void;
    decrementMinute: () => void;
    pad: (n: number) => string;
    isIncrementHourDisabled?: boolean;
    isDecrementHourDisabled?: boolean;
    isIncrementMinuteDisabled?: boolean;
    isDecrementMinuteDisabled?: boolean;
  }> = ({ 
    hour, 
    minute, 
    incrementHour, 
    decrementHour, 
    incrementMinute, 
    decrementMinute, 
    pad,
    isIncrementHourDisabled = false,
    isDecrementHourDisabled = false,
    isIncrementMinuteDisabled = false,
    isDecrementMinuteDisabled = false
  }) => (
    <div className="flex flex-col items-center bg-white rounded-md border border-gray-200 p-4 w-fit">
      <h3 className="text-lg font-semibold mb-4">Choose start time</h3>
      <div className="flex items-center gap-2 mb-2">
        {/* Hour */}
        <div className="flex flex-col items-center">
          <button
            onClick={incrementHour}
            disabled={isIncrementHourDisabled}
            className={`focus:outline-none ${
              isIncrementHourDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-brand-primary'
            }`}
            aria-label="Increase hour"
          >
            ▲
          </button>
          <div className="text-2xl font-bold w-10 text-center border-b border-gray-200">
            {pad(hour)}
          </div>
          <button
            onClick={decrementHour}
            disabled={isDecrementHourDisabled}
            className={`focus:outline-none ${
              isDecrementHourDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-brand-primary'
            }`}
            aria-label="Decrease hour"
          >
            ▼
          </button>
        </div>
        <span className="text-2xl px-1">:</span>
        {/* Minute */}
        <div className="flex flex-col items-center">
          <button
            onClick={incrementMinute}
            disabled={isIncrementMinuteDisabled}
            className={`focus:outline-none ${
              isIncrementMinuteDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-brand-primary'
            }`}
            aria-label="Increase minute"
          >
            ▲
          </button>
          <div className="text-2xl font-bold w-10 text-center border-b border-gray-200">
            {pad(minute)}
          </div>
          <button
            onClick={decrementMinute}
            disabled={isDecrementMinuteDisabled}
            className={`focus:outline-none ${
              isDecrementMinuteDisabled 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:text-brand-primary'
            }`}
            aria-label="Decrease minute"
          >
            ▼
          </button>
        </div>
      </div>
      <div className="mt-2 text-gray-500 text-sm">24-hour format</div>
    </div>
  );
  
  
  // Add isTimeTooSoon helper
  export function isTimeTooSoon(selectedDate: Date, hour: number, minute: number) {
    const now = new Date();
    const booking = new Date(selectedDate);
    booking.setHours(hour, minute, 0, 0);
    const diffMs = booking.getTime() - now.getTime();
    return (
      selectedDate.toDateString() === now.toDateString() &&
      diffMs < 4 * 60 * 60 * 1000 // 4 hours in ms
    );
  }
  
  export const SelectedDateTimeDisplay: React.FC<{
    selectedDate: Date;
    hour: number;
    minute: number;
    pad: (n: number) => string;
    isInvalidTime?: boolean;
  }> = ({ selectedDate, hour, minute, pad, isInvalidTime }) => (
    <div className="mt-6 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg">
      <h4 className="text-sm font-semibold text-brand-primary mb-2">Selected Date & Time</h4>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">📅</span>
          <span className="font-medium">
            {selectedDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">🕐</span>
          <span className={`font-medium ${isInvalidTime ? 'text-red-500 font-bold' : ''}`}>
            {pad(hour)}:{pad(minute)}
          </span>
        </div>
      </div>
      {isInvalidTime && (
        <div className="mt-2 text-red-500 text-xs font-semibold">
          Please select a time at least 4 hours from now.
        </div>
      )}
    </div>
  );
  
  export const NavigationButtons: React.FC<{
    setStep1View: (v: number) => void;
    onNext: () => void;
    isNextDisabled?: boolean;
  }> = ({ setStep1View, onNext, isNextDisabled }) => (
    <div className="flex flex-col items-center justify-center gap-[10px] mt-8">
      <div className="flex gap-[10px]">
        <button
          className="px-8 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-bold text-lg hover:bg-gray-100 transition"
          onClick={() => setStep1View(0)}
        >
          BACK
        </button>
        <button
          className={`px-8 py-3 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-md text-lg transition`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          NEXT
        </button>
      </div>
      {isNextDisabled && (
        <div className="mt-2 text-neutral-500 text-xs font-semibold">Time unavailable. Please select a time at least 4 hours from now.</div>
      )}
    </div>
  );
  