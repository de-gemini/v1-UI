import { create } from 'zustand';
import { 
  roomTypes, 
  addOns as addOnsList, 
  calculatePrice, 
  PRICING_CONFIG,
  Frequency,
  DirtLevel,
  ServiceType,
  PricingCalculator,
  CARPET_MATERIAL_TYPES,
  CARPET_ROOMS,
  CARPET_RUGS,
  UPHOLSTERY_MATERIAL_TYPES,
  UPHOLSTERY_ITEMS,
  CARPET_ADDONS
} from '../pages/Checkout/ckeckoutData';

// Carpet & Upholstery specific state
export interface CarpetCleaningState {
  selectedMaterial: string;
  selectedRooms: { [key: string]: number };
  selectedRugs: { [key: string]: number };
  selectedUpholsteryMaterials: { [key: string]: boolean }; // Changed to support multiple selections
  selectedUpholstery: { [key: string]: number };
  addons: { [key: string]: boolean };
}

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
  endOfTenancyCarpet: boolean;
  expressStudio: boolean;
  step: number;
  step1View: number;
  // Carpet & Upholstery state
  carpetCleaning: CarpetCleaningState;
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

// Initialize carpet cleaning state
const initialCarpetCleaning: CarpetCleaningState = {
  selectedMaterial: CARPET_MATERIAL_TYPES[0].key,
  selectedRooms: Object.fromEntries(CARPET_ROOMS.map(room => [room.key, 0])),
  selectedRugs: Object.fromEntries(CARPET_RUGS.map(rug => [rug.key, 0])),
  selectedUpholsteryMaterials: Object.fromEntries(UPHOLSTERY_MATERIAL_TYPES.map(type => [type.key, false])),
  selectedUpholstery: Object.fromEntries(UPHOLSTERY_ITEMS.map(item => [item.key, 0])),
  addons: Object.fromEntries(CARPET_ADDONS.map(addon => [addon.key, false])),
};

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
  endOfTenancyCarpet: false,
  expressStudio: false,
  step: 1,
  step1View: 0,
  carpetCleaning: initialCarpetCleaning,
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

// Utility function to calculate total carpet cleaning price
const calculateCarpetPrice = (state: CarpetCleaningState): number => {
  let total = 0;

  // Calculate room prices
  Object.entries(state.selectedRooms).forEach(([key, count]) => {
    const room = CARPET_ROOMS.find(r => r.key === key);
    if (room) {
      total += room.price * count;
    }
  });

  // Calculate rug prices
  Object.entries(state.selectedRugs).forEach(([key, count]) => {
    const rug = CARPET_RUGS.find(r => r.key === key);
    if (rug) {
      total += rug.price * count;
    }
  });

  // Calculate upholstery prices
  Object.entries(state.selectedUpholstery).forEach(([key, count]) => {
    const item = UPHOLSTERY_ITEMS.find(i => i.key === key);
    if (item) {
      total += item.price * count;
    }
  });

  // Apply material type multiplier if needed
  // if (state.selectedMaterial === 'delicate' || state.selectedUpholsteryMaterial === 'delicate') {
  //   total *= 1.2; // 20% increase for delicate materials
  // } else if (state.selectedUpholsteryMaterial === 'leather') {
  //   total *= 1.3; // 30% increase for leather
  // }

  return total;
};

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

// Carpet cleaning specific hooks
export const useCarpetCleaningState = () => {
  return useCheckoutStore(state => state.carpetCleaning);
};

export const useCarpetCleaningPrice = () => {
  return useCheckoutStore(state => calculateCarpetPrice(state.carpetCleaning));
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
      state.dirtLevel,
      state.selectedType as ServiceType
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

    // Calculate carpet cleaning items and total
    const carpetTotal = calculateCarpetPrice(state.carpetCleaning);
    const carpetItems = {
      rooms: Object.entries(state.carpetCleaning.selectedRooms)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const room = CARPET_ROOMS.find(r => r.key === key);
          return room ? `${room.label} (${count}x)` : `${key} (${count}x)`;
        }),
      rugs: Object.entries(state.carpetCleaning.selectedRugs)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const rug = CARPET_RUGS.find(r => r.key === key);
          return rug ? `${rug.label} (${count}x)` : `${key} (${count}x)`;
        }),
      upholstery: Object.entries(state.carpetCleaning.selectedUpholstery)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const item = UPHOLSTERY_ITEMS.find(i => i.key === key);
          return item ? `${item.label} (${count}x)` : `${key} (${count}x)`;
        }),
      materials: {
        carpet: CARPET_MATERIAL_TYPES.find(m => m.key === state.carpetCleaning.selectedMaterial)?.label || '',
        upholstery: UPHOLSTERY_MATERIAL_TYPES
          .filter(m => state.carpetCleaning.selectedUpholsteryMaterials[m.key])
          .map(m => m.label)
          .join(", ")
      },
      addons: Object.entries(state.carpetCleaning.addons)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => {
          const addon = CARPET_ADDONS.find(a => a.key === key);
          return addon ? addon.label : key;
        })
    };

    // Get minimum price based on service type
    const getMinimumPrice = () => {
      switch(state.selectedType) {
        case ServiceType.REGULAR_ONE_OFF:
          return calculatePrice.formatPrice(PRICING_CONFIG.minimumPrices.regularCleaning);
        case ServiceType.END_OF_TENANCY:
          return calculatePrice.formatPrice(PRICING_CONFIG.minimumPrices.endOfTenancy);
        case ServiceType.CARPET_UPHOLSTERY:
          return calculatePrice.formatPrice(PRICING_CONFIG.minimumPrices.carpetUpholstery);
        default:
          return calculatePrice.formatPrice(PRICING_CONFIG.minimumPrices.regularCleaning);
      }
    };

    return {
      basePrice: breakdown.basePrice,
      additionalServicesCost: breakdown.additionalServicesCost,
      dirtLevelMultiplier: breakdown.dirtLevelAdjustment,
      calculatedPrice: breakdown.calculatedPrice,
      minimumPrice: breakdown.minimumPrice,
      finalPrice: breakdown.finalPrice,
      breakdown: breakdown.breakdown,
      "Carpet & Upholstery": {
        "Selected Rooms": carpetItems.rooms,
        "Selected Rugs": carpetItems.rugs,
        "Selected Upholstery": carpetItems.upholstery,
        "Material Types": carpetItems.materials,
        "Add-ons": carpetItems.addons,
        "Total": carpetTotal
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
        "Carpet & Upholstery": carpetTotal,
        "Final Total": breakdown.finalPrice + carpetTotal
      }
    };
  });
}; 