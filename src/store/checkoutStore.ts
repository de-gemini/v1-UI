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
  selectedUpholstery: { [materialType: string]: { [itemKey: string]: number } }; // Changed to track per material type
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
  keyPickupLocation: string;
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
  selectedUpholstery: Object.fromEntries(
    UPHOLSTERY_MATERIAL_TYPES.map(type => [
      type.key, 
      Object.fromEntries(UPHOLSTERY_ITEMS.map(item => [item.key, 0]))
    ])
  ),
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
  keyPickupLocation: '',
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

// ===== REFACTORED UTILITY FUNCTIONS =====

// Create lookup maps for better performance (only created once)
const roomLookup = new Map(roomTypes.map(r => [r.type, r]));
const addOnLookup = new Map(addOnsList.map(a => [a.key, a]));
const carpetRoomLookup = new Map(CARPET_ROOMS.map(r => [r.key, r]));
const carpetRugLookup = new Map(CARPET_RUGS.map(r => [r.key, r]));
const upholsteryItemLookup = new Map(UPHOLSTERY_ITEMS.map(i => [i.key, i]));

// Utility function to calculate total minutes (eliminates duplication)
const calculateTotalMinutes = (state: CheckoutState): number => {
  return PricingCalculator.calculateTotalMinutes(
    state.roomCounts,
    state.selectedAddOns,
    roomTypes,
    addOnsList
  );
};

// Reusable function to build pricing options from state
const buildPricingOptions = (state: CheckoutState) => {
  const totalMinutes = calculateTotalMinutes(state);
  const totalHours = PricingCalculator.calculateTotalHours(totalMinutes);
  
  console.log('🔍 [DEBUG] buildPricingOptions - State values:', {
    selectedType: state.selectedType,
    endOfTenancyCarpet: state.endOfTenancyCarpet,
    carpetCleaningSelected: state.carpetCleaning.selectedRooms,
    carpetCleaningRugs: state.carpetCleaning.selectedRugs,
    carpetCleaningUpholstery: state.carpetCleaning.selectedUpholstery
  });
  
  const shouldIncludeCarpet = state.selectedType === ServiceType.CARPET_UPHOLSTERY || state.endOfTenancyCarpet;
  console.log('🔍 [DEBUG] buildPricingOptions - Should include carpet:', shouldIncludeCarpet);
  
  const options = {
    frequency: state.selectedFrequency ?? Frequency.ONE_OFF,
    hours: totalHours,
    selectedDate: state.selectedDate,
    hour: state.hour,
    minute: state.minute,
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
    dirtLevel: state.dirtLevel,
    serviceType: state.selectedType as ServiceType,
    carpetCleaning: shouldIncludeCarpet ? {
      selectedRooms: state.carpetCleaning.selectedRooms,
      selectedRugs: state.carpetCleaning.selectedRugs,
      selectedUpholstery: state.carpetCleaning.selectedUpholstery
    } : undefined
  };
  
  console.log('🔍 [DEBUG] buildPricingOptions - Final options:', {
    serviceType: options.serviceType,
    carpetCleaning: options.carpetCleaning,
    shouldIncludeCarpet
  });
  
  return options;
};

// Centralized pricing calculation function
const calculatePricing = (state: CheckoutState) => {
  console.log('🔍 [DEBUG] calculatePricing - Starting calculation');
  
  const options = buildPricingOptions(state);
  const totalPrice = PricingCalculator.calculateTotalPrice(options, state.selectedAddOns);
  const breakdown = PricingCalculator.getDetailedBreakdown(options, state.selectedAddOns);
  
  console.log('🔍 [DEBUG] calculatePricing - Results:', {
    totalPrice,
    breakdownFinalPrice: breakdown.finalPrice,
    breakdownCalculatedPrice: breakdown.calculatedPrice
  });
  
  return { totalPrice, breakdown, options };
};

// ===== REFACTORED SELECTOR HOOKS =====

// Reactive selector hooks for derived state
export const useEstimatedMinutes = () => {
  return useCheckoutStore(state => calculateTotalMinutes(state));
};

// Carpet cleaning specific hooks
export const useCarpetCleaningState = () => {
  return useCheckoutStore(state => state.carpetCleaning);
};

export const useCarpetCleaningPrice = () => {
  return useCheckoutStore(state => {
    // Use PricingCalculator for carpet-only calculation
    return PricingCalculator.calculateTotalPrice({
      frequency: Frequency.ONE_OFF,
      hours: 0,
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: {
        selectedRooms: state.carpetCleaning.selectedRooms,
        selectedRugs: state.carpetCleaning.selectedRugs,
        selectedUpholstery: state.carpetCleaning.selectedUpholstery
      }
    });
  });
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
    console.log('🔍 [DEBUG] useEstimatedPrice - Starting calculation');
    const { totalPrice } = calculatePricing(state);
    console.log('🔍 [DEBUG] useEstimatedPrice - Returning totalPrice:', totalPrice);
    return totalPrice;
  });
};

// Centralized pricing breakdown using PricingCalculator class
export const usePricingBreakdown = () => {
  return useCheckoutStore(state => {
    console.log('🔍 [DEBUG] usePricingBreakdown - Starting breakdown calculation');
    console.log('🔍 [DEBUG] usePricingBreakdown - State values:', {
      selectedType: state.selectedType,
      endOfTenancyCarpet: state.endOfTenancyCarpet,
      carpetCleaning: state.carpetCleaning
    });
    
    const { breakdown } = calculatePricing(state);
    
    // Build selected rooms object using lookup map
    const selectedRooms = Object.entries(state.roomCounts)
      .filter(([_, count]) => count > 0)
      .reduce((acc, [type, count]) => {
        const room = roomLookup.get(type);
        acc[room?.label || type] = `${count}x (${count * (room?.estimatedTime || 0)}min)`;
        return acc;
      }, {} as Record<string, string>);

    // Build selected add-ons object using lookup map
    const selectedAddOns = Object.entries(state.selectedAddOns)
      .filter(([key, count]) => key !== 'outdoor' && key !== 'laundry' && count > 0)
      .reduce((acc, [key, count]) => {
        const addOn = addOnLookup.get(key);
        acc[addOn?.label || key] = `${count}x (${count * (addOn?.estimatedTime || 0)}min)`;
        return acc;
      }, {} as Record<string, string>);

    // Calculate carpet cleaning items and total using lookup maps
    const shouldIncludeCarpet = state.selectedType === ServiceType.CARPET_UPHOLSTERY || state.endOfTenancyCarpet;
    console.log('🔍 [DEBUG] usePricingBreakdown - Should include carpet:', shouldIncludeCarpet);
    
    const carpetTotal = shouldIncludeCarpet ? 
      PricingCalculator.calculateTotalPrice({
        frequency: Frequency.ONE_OFF,
        hours: 0,
        serviceType: ServiceType.CARPET_UPHOLSTERY,
        carpetCleaning: {
          selectedRooms: state.carpetCleaning.selectedRooms,
          selectedRugs: state.carpetCleaning.selectedRugs,
          selectedUpholstery: state.carpetCleaning.selectedUpholstery
        }
      }) : 0;
    
    console.log('🔍 [DEBUG] usePricingBreakdown - Carpet total calculated:', carpetTotal);
    
    const carpetItems = {
      rooms: Object.entries(state.carpetCleaning.selectedRooms)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const room = carpetRoomLookup.get(key);
          return room ? `${room.label} (${count}x)` : `${key} (${count}x)`;
        }),
      rugs: Object.entries(state.carpetCleaning.selectedRugs)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const rug = carpetRugLookup.get(key);
          return rug ? `${rug.label} (${count}x)` : `${key} (${count}x)`;
        }),
      upholstery: Object.entries(state.carpetCleaning.selectedUpholstery)
        .flatMap(([materialType, items]) => 
          Object.entries(items)
        .filter(([_, count]) => count > 0)
            .map(([itemKey, count]) => {
              const item = upholsteryItemLookup.get(itemKey);
              const materialTypeLabel = UPHOLSTERY_MATERIAL_TYPES.find(t => t.key === materialType)?.label || materialType;
              return item ? `${item.label} (${materialTypeLabel}) (${count}x)` : `${itemKey} (${materialTypeLabel}) (${count}x)`;
            })
        ),
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

    console.log('🔍 [DEBUG] usePricingBreakdown - Carpet items:', carpetItems);
    console.log('🔍 [DEBUG] usePricingBreakdown - Final breakdown values:', {
      shouldIncludeCarpet,
      carpetTotal,
      breakdownFinalPrice: breakdown.finalPrice
    });

    return {
      basePrice: breakdown.basePrice,
      additionalServicesCost: breakdown.additionalServicesCost,
      dirtLevelMultiplier: breakdown.dirtLevelAdjustment,
      calculatedPrice: breakdown.calculatedPrice,
      minimumPrice: breakdown.minimumPrice,
      finalPrice: breakdown.finalPrice,
      breakdown: breakdown.breakdown,
      "Carpet & Upholstery": shouldIncludeCarpet ? {
        "Selected Rooms": carpetItems.rooms,
        "Selected Rugs": carpetItems.rugs,
        "Selected Upholstery": carpetItems.upholstery,
        "Material Types": carpetItems.materials,
        "Add-ons": carpetItems.addons,
        "Subtotal": calculatePrice.formatPrice(carpetTotal)
      } : null,
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
        "Carpet & Upholstery": shouldIncludeCarpet ? calculatePrice.formatPrice(carpetTotal) : '£0.00',
        "Final Total": breakdown.finalPrice
      }
    };
  });
}; 

// Single source of truth for final total price
export const useFinalTotalPrice = () => {
  return useCheckoutStore(state => {
    console.log('🔍 [DEBUG] useFinalTotalPrice - Starting calculation');
    const { totalPrice } = calculatePricing(state);
    console.log('🔍 [DEBUG] useFinalTotalPrice - Returning totalPrice:', totalPrice);
    return totalPrice;
  });
}; 