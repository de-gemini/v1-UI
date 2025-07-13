import { create } from 'zustand';
import { 
  roomTypes, 
  addOns as addOnsList, 
  calculatePrice, 
  PRICING_CONFIG,
  Frequency,
  DirtLevel,
  PricingCalculator
} from '../pages/Checkout/ckeckoutData';

export interface CheckoutState {
  // StepOne
  selectedType: number | null;
  selectedFrequency: Frequency | null;
  selectedDate: Date;
  hour: number;
  minute: number;
  selectedDuration: string;
  // StepTwo
  roomCounts: { [key: string]: number };
  selectedAddOns: { [key: string]: number };
  ecoFriendly: boolean;
  hooverMop: boolean;
  disinfection: boolean;
  outdoorCleaning: boolean;
  laundry: boolean;
  errandHours: number;
  checkJob: boolean;
  havePets: boolean;
  keyPickup: boolean;
  dirtLevel: DirtLevel;
  endOfTenancy: boolean;
  expressStudio: boolean;
  step: number;
  step1View: number;
  // StepThree (user info)
  name: string;
  surname: string;
  address: string;
  phone: string;
  comments: string;
  // Setters
  set: (partial: Partial<CheckoutState>) => void;
  reset: () => void;
}

// Build initial roomCounts and selectedAddOns objects from roomTypes and addOnsList
const initialRoomCounts = Object.fromEntries(roomTypes.map(r => [r.type, 0]));
const initialAddOns = Object.fromEntries(addOnsList.map(a => [a.key, 0]));

const initialState: Omit<CheckoutState, 'set' | 'reset'> = {
  selectedType: null,
  selectedFrequency: Frequency.ONE_OFF,
  selectedDate: new Date(),
  hour: 9,
  minute: 0,
  selectedDuration: '1',
  roomCounts: initialRoomCounts,
  selectedAddOns: initialAddOns,
  ecoFriendly: false,
  hooverMop: false,
  disinfection: false,
  outdoorCleaning: false,
  laundry: false,
  errandHours: 0,
  checkJob: false,
  havePets: false,
  keyPickup: false,
  dirtLevel: DirtLevel.LIGHT,
  endOfTenancy: false,
  expressStudio: false,
  step: 1,
  step1View: 0,
  name: '',
  surname: '',
  address: '',
  phone: '',
  comments: '',
};

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  ...initialState,
  set: (partial) => set(partial),
  reset: () => set(initialState),
}));

// Utility function to calculate total minutes (eliminates duplication)
const calculateTotalMinutes = (state: CheckoutState): number => {
  return PricingCalculator.calculateTotalMinutes(
    state.roomCounts,
    state.selectedAddOns,
    roomTypes,
    addOnsList
  );
};

// Reactive selector hooks for derived state
export const useEstimatedMinutes = () => {
  return useCheckoutStore(state => calculateTotalMinutes(state));
};

export const useEstimatedHours = () => {
  return useCheckoutStore(state => {
    const totalMinutes = calculateTotalMinutes(state);
    return PricingCalculator.calculateTotalHours(totalMinutes);
  });
};

// Centralized pricing calculation using PricingCalculator class
export const useEstimatedPrice = () => {
  return useCheckoutStore(state => {
    const totalMinutes = calculateTotalMinutes(state);
    const totalHours = PricingCalculator.calculateTotalHours(totalMinutes);
    
    return PricingCalculator.calculateTotalPrice(
      state.selectedFrequency ?? Frequency.ONE_OFF,
      totalHours,
      {
        endOfTenancy: state.endOfTenancy,
        expressStudio: state.expressStudio,
        ecoFriendly: state.ecoFriendly,
        hooverMop: state.hooverMop,
        disinfection: state.disinfection,
        outdoorCleaning: state.outdoorCleaning,
        laundry: state.laundry,
        errandHours: state.errandHours,
        checkJob: state.checkJob,
        havePets: state.havePets,
        keyPickup: state.keyPickup,
      },
      state.dirtLevel
    );
  });
};

// Centralized pricing breakdown using PricingCalculator class
export const usePricingBreakdown = () => {
  return useCheckoutStore(state => {
    const totalMinutes = calculateTotalMinutes(state);
    const totalHours = PricingCalculator.calculateTotalHours(totalMinutes);
    
    const breakdown = PricingCalculator.getDetailedBreakdown(
      state.selectedFrequency ?? Frequency.ONE_OFF,
      totalHours,
      {
        endOfTenancy: state.endOfTenancy,
        expressStudio: state.expressStudio,
        ecoFriendly: state.ecoFriendly,
        hooverMop: state.hooverMop,
        disinfection: state.disinfection,
        outdoorCleaning: state.outdoorCleaning,
        laundry: state.laundry,
        errandHours: state.errandHours,
        checkJob: state.checkJob,
        havePets: state.havePets,
        keyPickup: state.keyPickup,
      },
      state.dirtLevel
    );
    
    // Build selected rooms object
    const selectedRooms = Object.entries(state.roomCounts)
      .filter(([_, count]) => count > 0)
      .reduce((acc, [type, count]) => {
        const room = roomTypes.find(r => r.type === type);
        acc[room?.label || type] = `${count}x (${count * (room?.estimatedTime || 0)}min)`;
        return acc;
      }, {} as Record<string, string>);

    // Build selected add-ons object
    const selectedAddOns = Object.entries(state.selectedAddOns)
      .filter(([key, count]) => key !== 'outdoor' && key !== 'laundry' && count > 0)
      .reduce((acc, [key, count]) => {
        const addOn = addOnsList.find(a => a.key === key);
        acc[addOn?.label || key] = `${count}x (${count * (addOn?.estimatedTime || 0)}min)`;
        return acc;
      }, {} as Record<string, string>);

    return {
      "Base Calculation": {
        "Total Minutes": totalMinutes,
        "Total Hours": totalHours.toFixed(2),
        "Base Price": breakdown.basePrice,
        "Minimum Applied": breakdown.breakdown.basePrice === calculatePrice.getMinimumPrice(state.selectedFrequency ?? Frequency.ONE_OFF) ? `Yes (${PRICING_CONFIG.minimumHours}h minimum)` : "No"
      },
      "Additional Services": {
        "End of Tenancy": state.endOfTenancy ? `£${PRICING_CONFIG.additionalServices.endOfTenancy}` : "Not selected",
        "Express Studio": state.expressStudio ? `£${PRICING_CONFIG.additionalServices.expressStudio}` : "Not selected",
        "Eco-friendly": state.ecoFriendly ? `£${PRICING_CONFIG.additionalServices.ecoFriendly}` : "Not selected",
        "Hoover & Mop": state.hooverMop ? `£${PRICING_CONFIG.additionalServices.hooverMop}` : "Not selected",
        "Disinfection": state.disinfection ? `£${PRICING_CONFIG.additionalServices.disinfection}` : "Not selected",
        "Outdoor Cleaning": state.outdoorCleaning ? `£${PRICING_CONFIG.additionalServices.outdoorCleaning}` : "Not selected",
        "Laundry": state.laundry ? `£${PRICING_CONFIG.additionalServices.laundry}` : "Not selected",
        "Check Job": state.checkJob ? `£${PRICING_CONFIG.additionalServices.checkJob}` : "Not selected",
        "Have Pets": state.havePets ? `£${PRICING_CONFIG.additionalServices.havePets}` : "Not selected",
        "Key Pickup": state.keyPickup ? `£${PRICING_CONFIG.additionalServices.keyPickup}` : "Not selected",
        "Total Additional": breakdown.additionalServicesCost
      },
      "Dirt Level": {
        "Level": state.dirtLevel,
        "Multiplier": state.dirtLevel ? `${((PRICING_CONFIG.dirtLevelMultipliers[state.dirtLevel] - 1) * 100).toFixed(0)}%` : "0%"
      },
      "Selected Rooms": selectedRooms,
      "Selected Add-ons": selectedAddOns,
      "TOTAL": {
        "Base Price": breakdown.basePrice,
        "Additional Services": breakdown.additionalServicesCost,
        "Dirt Level Adjustment": breakdown.dirtLevelAdjustment,
        "Final Total": breakdown.finalPrice
      }
    };
  });
}; 