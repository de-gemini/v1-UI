//one
import React, { useLayoutEffect, useEffect, useState } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  cleaningTypes,
  frequencyOptions,
  PRICING_CONFIG,
  calculatePrice,
  getOneOffDetail
} from './ckeckoutData';
import { useCalendarStore } from '../../store/calendarStore';
import { useCheckoutStore } from '../../store/checkoutStore';
import FAQSection from '../../data/questions';
import {
  FrequencyOption,
  PlanButton,
  ExpressStudioOption,
  EndOfTenancyOption,
  TimePicker,
  isTimeTooSoon,
  SelectedDateTimeDisplay,
  NavigationButtons,
  formatPrice
} from './components/StepOne';
import { section } from 'framer-motion/client';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const StepOne: React.FC = () => {
  // Zustand store hooks
  const {
  selectedType,
  selectedFrequency,
  selectedDate,
  hour,
  minute,
    selectedDuration,
    expressStudio,
  endOfTenancy,
    step1View,
    set,
  } = useCheckoutStore();

  const navigate = useNavigate();
  const location = useLocation();

  // Check for eot=true in URL and auto-select End of Tenancy
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('eot') === 'true' && !endOfTenancy) {
      set({ endOfTenancy: true });
    }
  }, [location.search, endOfTenancy, set]);

  // Local scroll to top implementation
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calendar availability store
  const { monthAvailability, loading: availabilityLoading, fetchAvailability } = useCalendarStore();

  // Fetch availability when selectedDate changes
  useEffect(() => {
    fetchAvailability(selectedDate.getFullYear(), selectedDate.getMonth() + 1);
  }, [selectedDate, fetchAvailability]);

  // Initialize time to be rounded to the nearest hour on component mount
  useEffect(() => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hour, minute, 0, 0);
    
    const diffMs = selectedDateTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // If it's today and less than 4 hours from now, round to nearest hour after 4 hours
    if (selectedDate.toDateString() === now.toDateString() && diffHours < 4) {
      const minTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);
      const minHour = minTime.getHours();
      const roundedHour = minTime.getMinutes() >= 30 ? (minHour + 1) % 24 : minHour;
      set({ hour: roundedHour, minute: 0 });
    } else if (minute !== 0) {
      // For any other case, just round to the nearest hour
      const roundedHour = minute >= 30 ? (hour + 1) % 24 : hour;
      set({ hour: roundedHour, minute: 0 });
    }
  }, []); // Only run on mount

  // Auto-adjust time to be at least 4 hours from now when date changes
  useEffect(() => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hour, minute, 0, 0);
    
    const diffMs = selectedDateTime.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // If the selected time is less than 4 hours from now and it's today
    if (selectedDate.toDateString() === now.toDateString() && diffHours < 4) {
      // Calculate the minimum time (4 hours from now) and round to the nearest hour
      const minTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
      const minHour = minTime.getHours();
      
      // Round to the nearest hour (always set minutes to 00)
      const roundedHour = minTime.getMinutes() >= 30 ? (minHour + 1) % 24 : minHour;
      
      // Update the time to the rounded minimum allowed time
      set({ hour: roundedHour, minute: 0 });
    }
  }, [selectedDate, hour, minute, set]);

  // Update URL with ?eot=true when End of Tenancy is selected
  useEffect(() => {
    // ServiceType.END_OF_TENANCY is usually the last index in cleaningTypes
    const eotIdx = cleaningTypes.findIndex(
      t => t.toLowerCase().includes('tenancy')
    );
    if (selectedType === eotIdx) {
      const params = new URLSearchParams(location.search);
      if (params.get('eot') !== 'true') {
        params.set('eot', 'true');
        navigate({ search: params.toString() }, { replace: true });
      }
    } else {
      const params = new URLSearchParams(location.search);
      if (params.get('eot')) {
        params.delete('eot');
        navigate({ search: params.toString() }, { replace: true });
      }
    }
  }, [selectedType, location.search, navigate]);

  // State to track current calendar view month
  const [currentViewMonth, setCurrentViewMonth] = useState(() => ({
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1
  }));

  // State for fade animation
  const [isCalendarTransitioning, setIsCalendarTransitioning] = useState(false);

  // Handle calendar navigation (month changes)
  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      const newYear = activeStartDate.getFullYear();
      const newMonth = activeStartDate.getMonth() + 1;
      
      // Only fetch if we're viewing a different month
      if (newYear !== currentViewMonth.year || newMonth !== currentViewMonth.month) {
        // Start fade out animation
        setIsCalendarTransitioning(true);
        
        // Update the current view month first to prevent reset
        setCurrentViewMonth({ year: newYear, month: newMonth });
        
        // Fetch availability with error handling
        fetchAvailability(newYear, newMonth).catch(error => {
          console.error('Failed to fetch availability for new month', {
            year: newYear,
            month: newMonth,
            error: error.message
          });
          // Don't reset the calendar view on error, just log it
        }).finally(() => {
          // End fade in animation after a short delay
          setTimeout(() => {
            setIsCalendarTransitioning(false);
          }, 150);
        });
      }
    }
  };

  // Check if a date is available for booking
  const isDateAvailable = (date: Date) => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Disable past dates
    if (date < todayStart) {
      return false;
    }

    // Check admin availability
    const day = date.getDate();
    const found = monthAvailability.find((d) => d.day === day);
    const isAvailable = found ? found.available : true;
    
    return isAvailable; // Default to available if not set
  };

  // Enhanced tile disabled function that combines existing logic with availability
  const isTileDisabledEnhanced = ({ date }: { date: Date }) => {
    // Disable past dates
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return true;
  
    // Check admin availability
    const adminAvailable = isDateAvailable(date);
    return !adminAvailable;
  };

  // Render frequency options
  const renderFrequencyOptions = () => (
    <>
      {frequencyOptions.slice(0, 3).map((freq, idx) => (
        <FrequencyOption
          key={freq.label}
          freq={freq}
          idx={idx}
          selectedFrequency={selectedFrequency}
          setSelectedFrequency={(v: number) => {
            set({ selectedFrequency: v });
            set({ endOfTenancy: false });
          }}
        />
      ))}
    </>
  );

  // Render plan buttons
  const renderPlanButtons = () => (
    <section>
      <h3 className='font-bold'>How long do you want to subscribe with us?</h3>
      <div className="flex  gap-3 mt-6">

      {PRICING_CONFIG.plans.map((plan) => (
        <PlanButton
          key={plan.months}
          plan={plan}
          selectedDuration={selectedDuration}
          setSelectedDuration={(v: string) => set({ selectedDuration: v })}
        />
      ))}
    </div>
    <p className='text-sm text-neutral-600 mt-2'>*Cashback terms and conditions available <Link className='underline' to={'/payment-policy'}>here</Link>.</p>
    </section>
  );

  // Render extra options based on frequency
  const renderExtraOptions = () => {
    switch (selectedFrequency) {
      case 0: // Weekly
        return (
          <div className="flex flex-col gap-4">
            {renderPlanButtons()}
            <ExpressStudioOption expressStudio={expressStudio} setExpressStudio={v => set({ expressStudio: v })} />
          </div>
        );
      
      case 1: // Fortnightly
        return (
          <div className="flex flex-col gap-5">
            {renderPlanButtons()}
            <ExpressStudioOption expressStudio={expressStudio} setExpressStudio={v => set({ expressStudio: v })} />
          </div>
        );
      
      case 2: // Monthly
        return (
          <div className="flex flex-col gap-5">
            {renderPlanButtons()}
            <ExpressStudioOption expressStudio={expressStudio} setExpressStudio={v => set({ expressStudio: v })} />
          </div>
        );
      
      case 3: // One-Off
        return (
          <div className="flex flex-col gap-4">
            <EndOfTenancyOption endOfTenancy={endOfTenancy} setEndOfTenancy={v => set({ endOfTenancy: v })} />
            <ExpressStudioOption expressStudio={expressStudio} setExpressStudio={v => set({ expressStudio: v })} />
          </div>
        );
      
      default:
        return null;
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');
  // Helper to get schedule summary
  const getScheduleSummary = () => {
    if (selectedFrequency === null) return null;
    const dayOfWeek = selectedDate.toLocaleDateString('en-GB', { weekday: 'long' });
    const dayOfMonth = selectedDate.getDate();
    const time = `${pad(hour)}:${pad(minute)}`;
    let duration = selectedDuration;
    if (!duration) duration = '1';

    switch (selectedFrequency) {
      case 0: // Weekly
        return `You’d be scheduled for every ${dayOfWeek} for the next ${duration} month${Number(duration) === 1 ? '' : 's'} at ${time}`;
      case 1: // Fortnightly
        return `You’d be scheduled for every other ${dayOfWeek} for the next ${Number(duration)} month${Number(duration) === 1 ? '' : 's'} at ${time}`;
      case 2: // Monthly
        return `You’d be scheduled for every ${dayOfMonth}${getOrdinal(dayOfMonth)} of the month for the next ${duration} month${Number(duration) === 1 ? '' : 's'} at ${time}`;
      default:
        return null;
    }
  };

  function getOrdinal(n: number) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Get detected one-off detail if One-Off is selected
  const detectedOneOffDetail = selectedFrequency === 3
    ? getOneOffDetail(selectedDate, hour, minute)
    : null;

  const timeIsInvalid = isTimeTooSoon(selectedDate, hour, minute);
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const isNight = hour >= 21 || hour < 8;
  let oneOffDetailToShow = detectedOneOffDetail;
  if (selectedFrequency === 3) {
    if (!isToday && isNight) {
      oneOffDetailToShow = frequencyOptions[3]?.oneOffDetails?.find((d: any) => d.label === "Night") || null;
    } else if (isToday) {
      oneOffDetailToShow = frequencyOptions[3]?.oneOffDetails?.find((d: any) => d.label === "Same day") || null;
    }
  }

  const handleNextStep = () => {
    console.log({
      selectedType,
      selectedFrequency,
      selectedDate,
      hour,
      minute,
      endOfTenancy,
      expressStudio,
      planMonths: Number(selectedDuration),
      oneOffDetailToShow,
      // Add more state as needed
    });
    set({ step: 2 })
  };


  return (
    <div className="w-full flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start">
          {step1View === 0 && (
            <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg p-6 sm:p-8 mt-4">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary font-bold mr-3">
                1
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Choose a type of cleaning
              </h2>
            </div>
    
            <div className="flex flex-col gap-4 mb-8">
              {cleaningTypes.map((type, idx) => (
                <button
                  key={type}
                onClick={() => set({ selectedType: idx })}
                  className={`w-full text-left px-5 py-4 rounded-md border transition-all text-base sm:text-lg flex items-center gap-3
                    ${
                      selectedType === idx
                        ? 'border-brand-primary bg-[#fafaff] text-brand-primary shadow-sm ring-2 ring-brand-primary'
                        : 'border-gray-200 bg-gray-50 text-gray-500 hover:border-brand-primary hover:bg-[#f3f0ff]'
                    }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedType === idx
                        ? 'border-brand-primary bg-brand-primary'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {selectedType === idx && (
                      <span className="w-2.5 h-2.5 bg-white rounded-full block" />
                    )}
                  </span>
                  {type}
                </button>
              ))}
            </div>
    
            <button
              className="w-full bg-brand-primary hover:bg-blue-900 text-white font-semibold py-3 rounded-md text-base sm:text-lg transition"
            onClick={() => {
              // For End of Tenancy and Carpet & Upholstery, skip frequency selection
              if (selectedType === 1 || selectedType === 2) {
                // Set default frequency to ONE_OFF (3) for these services
                set({ selectedFrequency: 3, step1View: 1 });
              } else {
                set({ step1View: 1 });
              }
            }}
            >
              NEXT
            </button>
          </div>
          )}
      
          {step1View === 1 && (
            <div className="w-full max-w-6xl bg-white border border-gray-300 p-8 mt-4">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Frequency/One-Off selection - Hidden for End of Tenancy and Carpet & Upholstery */}
                {selectedType !== 1 && selectedType !== 2 && (
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full text-xs">
                        Cashback up to £150
                      </span>
                    </div>
                    
                    {renderFrequencyOptions()}
                    
                    {/* One-Off special card */}
                    <div 
                      className={`border-2 rounded-lg p-4 mt-2 transition-all duration-200 cursor-pointer ${
                        selectedFrequency === 3 
                          ? 'border-brand-primary bg-[#fafaff] shadow-lg scale-[1.02] ring-2 ring-brand-primary/20' 
                          : ' bg-white hover:bg-gray-50'
                      }`} 
                      onClick={() => set({ selectedFrequency: 3 })}
                    > 
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedFrequency === 3
                            ? 'border-brand-primary bg-brand-primary'
                            : 'border-brand-primary bg-white'
                        }`}>
                          {selectedFrequency === 3 && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className={`font-bold text-lg transition-colors ${
                          selectedFrequency === 3 ? 'text-brand-primary' : 'text-gray-800'
                        }`}>
                          One – Off
                        </span>
                        <span className="ml-auto font-bold text-brand-primary">
                          {selectedFrequency === 3 && oneOffDetailToShow
                            ? formatPrice(oneOffDetailToShow.price)
                            : calculatePrice.getHourlyRateDisplay(3)}
                        </span>
                      </div>
                      {selectedFrequency === 3 && frequencyOptions[3]?.oneOffDetails && (
                        <div>
                          {frequencyOptions[3].oneOffDetails.map((detail) => {
                            const isSelected = oneOffDetailToShow && oneOffDetailToShow.label === detail.label;
                            const isDisabled = isToday && timeIsInvalid && isSelected;
                            return (  
                              <div
                                key={detail.label}
                                className={`flex flex-col border rounded-md p-2 text-xs bg-white ${isDisabled ? 'opacity-50' : isSelected ? 'border-brand-primary' : ''}`}
                              >
                                <span className={`font-bold ${isDisabled ? 'text-gray-400' : ""}`}>
                                  {detail.label}
                                </span>
                                <span>{detail.desc}</span>
                                <span className={`font-bold ${isDisabled ? 'text-gray-400' : ''}`}>{formatPrice(detail.price)}</span>
                                {isDisabled && (
                                  <span className="text-red-500 font-semibold mt-1">
                                    Time unavailable. Please select a time at least 4 hours from now.
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            
                {/* Date/Time picker */}
                <div className={`${selectedType !== 1 && selectedType !== 2 ? 'flex-1' : 'w-full'} flex flex-col gap-6`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Choose date</h3>
                      <div className="bg-white rounded-lg shadow p-4">
                    {availabilityLoading ? (
                      <div className="flex items-center justify-center h-[350px]">
                        <div className="text-sm text-gray-500">Loading availability...</div>
                      </div>
                    ) : (
                      <div 
                        className={`h-[350px] transition duration-1000 ease-out ${
                          isCalendarTransitioning ? 'opacity-70 -translate-y-5' : 'translate-y-0 opacity-100'
                        }`}
                      >
                      <Calendar
                          key={`${currentViewMonth.year}-${currentViewMonth.month}`}
                          onChange={(date) => set({ selectedDate: date as Date })}
        value={selectedDate}
        minDate={new Date()}
                          tileDisabled={isTileDisabledEnhanced}
                          onActiveStartDateChange={handleActiveStartDateChange}
                          defaultActiveStartDate={new Date(currentViewMonth.year, currentViewMonth.month - 1, 1)}
        calendarType="iso8601"
        prev2Label={null}
        next2Label={null}
                          tileClassName={({ date, view }) => {
                            if (view !== 'month') return '';
                            const today = new Date();
                            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            // Past dates
                            if (date < todayStart) {
                              return 'text-gray-300';
                            }
                            // Check admin availability
                            const day = date.getDate();
                            const found = monthAvailability.find((d) => d.day === day);
                            const isAvailable = found ? found.available : true;
                            if (!isAvailable) {
                              return 'bg-red-50 text-red-400 cursor-not-allowed';
                            }
                            // Highlight selected date
                            if (
                              date.getFullYear() === selectedDate.getFullYear() &&
                              date.getMonth() === selectedDate.getMonth() &&
                              date.getDate() === selectedDate.getDate()
                            ) {
                              return 'bg-brand-primary selected-date !text-white !font-bold';
                            }
                            return '';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Helpful message about availability */}
                    <div className="mt-4 text-sm text-gray-600">
                      <p>📅 Dates with gray background are unavailable for new bookins.</p>
                      <p>Please select an available date to continue with your booking.</p>
                    </div>

                    <SelectedDateTimeDisplay 
                      selectedDate={selectedDate}
                      hour={hour}
                      minute={minute}
                      pad={pad}
                      isInvalidTime={timeIsInvalid}
                    />
                  </div>
                </div>
                
                <div className="flex-1 flex justify-center items-center md:block">
                  {(() => {
                    const now = new Date();
                    const isToday = selectedDate.toDateString() === now.toDateString();
                    
                    // Calculate which buttons should be disabled
                    const testIncrementHour = (hour + 1) % 24;
                    const testDecrementHour = hour === 0 ? 23 : hour - 1;
                    const testIncrementMinute = (minute + 1) % 60;
                    const testDecrementMinute = minute === 0 ? 59 : minute - 1;
                    
                    const isIncrementHourDisabled = isToday && (() => {
                      const testDate = new Date(selectedDate);
                      testDate.setHours(testIncrementHour, minute, 0, 0);
                      const diffMs = testDate.getTime() - now.getTime();
                      const diffHours = diffMs / (1000 * 60 * 60);
                      return diffHours < 4;
                    })();
                    
                    const isDecrementHourDisabled = isToday && (() => {
                      const testDate = new Date(selectedDate);
                      testDate.setHours(testDecrementHour, minute, 0, 0);
                      const diffMs = testDate.getTime() - now.getTime();
                      const diffHours = diffMs / (1000 * 60 * 60);
                      return diffHours < 4;
                    })();
                    
                    const isIncrementMinuteDisabled = isToday && (() => {
                      const testDate = new Date(selectedDate);
                      testDate.setHours(hour, testIncrementMinute, 0, 0);
                      const diffMs = testDate.getTime() - now.getTime();
                      const diffHours = diffMs / (1000 * 60 * 60);
                      return diffHours < 4;
                    })();
                    
                    const isDecrementMinuteDisabled = isToday && (() => {
                      const testDate = new Date(selectedDate);
                      testDate.setHours(hour, testDecrementMinute, 0, 0);
                      const diffMs = testDate.getTime() - now.getTime();
                      const diffHours = diffMs / (1000 * 60 * 60);
                      return diffHours < 4;
                    })();
                    
                    return (
                  <TimePicker
                    hour={hour}
                    minute={minute}
                        incrementHour={() => {
                          const newHour = (hour + 1) % 24;
                          const testDate = new Date(selectedDate);
                          testDate.setHours(newHour, minute, 0, 0);
                          const now = new Date();
                          const diffMs = testDate.getTime() - now.getTime();
                          const diffHours = diffMs / (1000 * 60 * 60);
                          
                          // Only allow increment if it's at least 4 hours from now
                          if (diffHours >= 4 || testDate.toDateString() !== now.toDateString()) {
                            set({ hour: newHour });
                          }
                        }}
                        decrementHour={() => {
                          const newHour = hour === 0 ? 23 : hour - 1;
                          const testDate = new Date(selectedDate);
                          testDate.setHours(newHour, minute, 0, 0);
                          const now = new Date();
                          const diffMs = testDate.getTime() - now.getTime();
                          const diffHours = diffMs / (1000 * 60 * 60);
                          
                          // Only allow decrement if it's at least 4 hours from now
                          if (diffHours >= 4 || testDate.toDateString() !== now.toDateString()) {
                            set({ hour: newHour });
                          }
                        }}
                        incrementMinute={() => {
                          const newMinute = (minute + 1) % 60;
                          const testDate = new Date(selectedDate);
                          testDate.setHours(hour, newMinute, 0, 0);
                          const now = new Date();
                          const diffMs = testDate.getTime() - now.getTime();
                          const diffHours = diffMs / (1000 * 60 * 60);
                          
                          // Only allow increment if it's at least 4 hours from now
                          if (diffHours >= 4 || testDate.toDateString() !== now.toDateString()) {
                            set({ minute: newMinute });
                          }
                        }}
                        decrementMinute={() => {
                          const newMinute = minute === 0 ? 59 : minute - 1;
                          const testDate = new Date(selectedDate);
                          testDate.setHours(hour, newMinute, 0, 0);
                          const now = new Date();
                          const diffMs = testDate.getTime() - now.getTime();
                          const diffHours = diffMs / (1000 * 60 * 60);
                          
                          // Only allow decrement if it's at least 4 hours from now
                          if (diffHours >= 4 || testDate.toDateString() !== now.toDateString()) {
                            set({ minute: newMinute });
                          }
                        }}
                        isIncrementHourDisabled={isIncrementHourDisabled}
                        isDecrementHourDisabled={isDecrementHourDisabled}
                        isIncrementMinuteDisabled={isIncrementMinuteDisabled}
                        isDecrementMinuteDisabled={isDecrementMinuteDisabled}
                    pad={pad}
                  />
                    );
                  })()}
                </div>
              </div>
      </div>
    </div>
          
          {/* Extra options based on frequency */}
          <div className="flex flex-col gap-4 mt-8">
            {renderExtraOptions()}
      </div>

          {selectedFrequency !== 3 && getScheduleSummary() && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 text-sm font-medium">
              {getScheduleSummary()}
    </div>
  )}

          <NavigationButtons setStep1View={v => set({ step1View: v })} onNext={handleNextStep} isNextDisabled={timeIsInvalid} />
            </div>
          )}

          {step1View === 1 && (
         <div>
            <FAQSection />
          </div>
          )}

        </div>
  )
}

export default StepOne
