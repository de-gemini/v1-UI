// Centralized pricing configuration
export enum DirtLevel {
    LIGHT = 'light',
    MEDIUM = 'medium',
    HEAVY = 'heavy'
}


// Define minimum price type
interface MinimumPrices {
  regularCleaning: number;
  endOfTenancy: number;
  carpetUpholstery: number;
}

export const PRICING_CONFIG = {
  // Base hourly rates - Updated to Gemini pricing
  baseHourlyRate: 17.99, // Changed from 19 to 17.99
  
  // Minimum hours for booking (easily configurable)
  minimumHours: 1,
  
  // Minimum prices for each service type - Updated to Gemini pricing
  minimumPrices: {
    regularCleaning: 50,      // Regular/One-off cleaning minimum - Changed from 87 to 50
    endOfTenancy: 189,        // End of Tenancy minimum - Changed from 130 to 150
    carpetUpholstery: 80,     // Carpet & Upholstery minimum - Changed from 96 to 80
  } as MinimumPrices,

  // Frequency discounts (as percentages) - Updated to reflect new base rate
  frequencyDiscounts: {
    weekly: 0.111,      // 11.1% discount (17.99 -> 15.99)
    fortnightly: 0.056, // 5.6% discount (17.99 -> 16.99)  
    monthly: 0.0,       // 0% discount (17.99 -> 17.99)
  },
  
  // Additional service costs
  additionalServices: {
    endOfTenancy: 0,
    expressStudio: 60, // fixed
    ecoFriendly: 6,
    hooverMop: 15,
    disinfection: 10,
    outdoorCleaning: 30, // fixed
    laundry: 9, // fixed service
    errandHours: 29, // per hour
    checkJob: 0,
    havePets: 0,
    keyPickup: 0,
  },
  
  // Dirt level multipliers
  dirtLevelMultipliers: {
    light: 1.0,
    medium: 1.25,
    heavy: 1.8,
  },
  
  
  
  
  // Plan durations and colors
  plans: [
    { months: '1', cashback: '£50', color: 'bg-green-100 text-green-800' },
    { months: '3', cashback: '£100', color: 'bg-blue-100 text-blue-800' },
    { months: '6', cashback: '£150', color: 'bg-purple-100 text-purple-800' },
  ],
} as const;

// Type-safe enums to replace magic numbers
export enum Frequency {
  WEEKLY = 0,
  FORTNIGHTLY = 1,
  MONTHLY = 2,
  ONE_OFF = 3
}

export enum ServiceType {
  REGULAR_ONE_OFF = 0,
  END_OF_TENANCY = 1,
  CARPET_UPHOLSTERY = 2
}



// Type definitions for better type safety
export interface RoomType {
  type: string;
  label: string;
  estimatedTime: number;
  icon: string;
}

export interface AddOn {
  key: string;
  label: string;
  estimatedTime: number;
  price?: number;
  yesNo?: boolean;
  icon: string;
}

// Interface for pricing options
export interface PricingOptions {
  frequency: Frequency;
  hours: number;
  selectedDate?: Date;
  hour?: number;
  minute?: number;
  endOfTenancy?: boolean;
  expressStudio?: boolean;
  ecoFriendly?: boolean;
  hooverMop?: boolean;
  disinfection?: boolean;
  outdoorCleaning?: boolean;
  laundry?: boolean;
  errandHours?: number;
  checkJob?: boolean;
  havePets?: boolean;
  keyPickup?: boolean;
  dirtLevel?: DirtLevel;
  serviceType?: ServiceType;
  carpetCleaning?: {
    selectedRooms: { [key: string]: number };
    selectedRugs: { [key: string]: number };
    selectedUpholstery: { [materialType: string]: { [itemKey: string]: number } };
  };
}

// Interface for detailed breakdown
export interface DetailedBreakdown {
  basePrice: string;
  additionalServicesCost: string;
  dirtLevelAdjustment: string;
  minimumPrice: string;
  calculatedPrice: string;
  finalPrice: string;
  breakdown: {
    basePrice: number;
    additionalServicesCost: number;
    dirtLevelMultiplier: number;
    minimumPrice: number;
    calculatedPrice: number;
    finalPrice: number;
    isMinimumPriceApplied: boolean;
  };
}

// Helper functions for calculations
export const calculatePrice = {
  // Calculate base price for frequency
  getBasePrice: (frequency: Frequency, hours: number = 2, selectedDate?: Date, hour?: number, minute?: number) => {
    const basePrice = PRICING_CONFIG.baseHourlyRate * hours;
    
    switch (frequency) {
      case Frequency.WEEKLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.weekly);
      case Frequency.FORTNIGHTLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.fortnightly);
      case Frequency.MONTHLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.monthly);
      case Frequency.ONE_OFF:
        // For one-off, use the special pricing based on date and time
        if (selectedDate && hour !== undefined && minute !== undefined) {
          const oneOffDetail = getOneOffDetail(selectedDate, hour, minute);
          return oneOffDetail.price * hours;
        }
        return basePrice;
      default:
        return basePrice;
    }
  },
  
  // Calculate additional services cost
  getAdditionalServicesCost: (services: {
    endOfTenancy?: boolean;
    expressStudio?: boolean;
    ecoFriendly?: boolean;
    hooverMop?: boolean;
    disinfection?: boolean;
    outdoorCleaning?: boolean;
    laundry?: boolean;
    errandHours?: number;
    checkJob?: boolean;
    havePets?: boolean;
    keyPickup?: boolean;
  }) => {
    let total = 0;
    
    if (services.endOfTenancy) total += PRICING_CONFIG.additionalServices.endOfTenancy;
    if (services.expressStudio) total += PRICING_CONFIG.additionalServices.expressStudio;
    if (services.ecoFriendly) total += PRICING_CONFIG.additionalServices.ecoFriendly;
    if (services.hooverMop) total += PRICING_CONFIG.additionalServices.hooverMop;
    if (services.disinfection) total += PRICING_CONFIG.additionalServices.disinfection;
    if (services.outdoorCleaning) total += PRICING_CONFIG.additionalServices.outdoorCleaning;
    if (services.laundry) total += PRICING_CONFIG.additionalServices.laundry;
    if (services.errandHours) total += PRICING_CONFIG.additionalServices.errandHours * services.errandHours;
    if (services.checkJob) total += PRICING_CONFIG.additionalServices.checkJob;
    if (services.havePets) total += PRICING_CONFIG.additionalServices.havePets;
    if (services.keyPickup) total += PRICING_CONFIG.additionalServices.keyPickup;
    
    return total;
  },
  
  // Apply dirt level multiplier
  applyDirtLevelMultiplier: (basePrice: number, dirtLevel: DirtLevel) => {
    return basePrice * PRICING_CONFIG.dirtLevelMultipliers[dirtLevel];
  },
  
  // Get formatted price string
  formatPrice: (price: number) => {
    return `£${price.toFixed(2)}`;
  },
  
  // Get hourly rate display
  getHourlyRateDisplay: (frequency: Frequency) => {
    const baseRate = PRICING_CONFIG.baseHourlyRate;
    
    switch (frequency) {
      case Frequency.WEEKLY:
        return calculatePrice.formatPrice(baseRate * (1 - PRICING_CONFIG.frequencyDiscounts.weekly));
      case Frequency.FORTNIGHTLY:
        return calculatePrice.formatPrice(baseRate * (1 - PRICING_CONFIG.frequencyDiscounts.fortnightly));
      case Frequency.MONTHLY:
        return calculatePrice.formatPrice(baseRate * (1 - PRICING_CONFIG.frequencyDiscounts.monthly));
      case Frequency.ONE_OFF:
        return `from £${baseRate}/h`;
      default:
        return `from £${baseRate}/h`;
    }
  },
  
  // Calculate minimum price based on configuration
  getMinimumPrice: (frequency: Frequency = Frequency.ONE_OFF) => {
    const baseRate = PRICING_CONFIG.baseHourlyRate;
    const minimumHours = PRICING_CONFIG.minimumHours;
    
    switch (frequency) {
      case Frequency.WEEKLY:
        return Math.round(baseRate * minimumHours * (1 - PRICING_CONFIG.frequencyDiscounts.weekly));
      case Frequency.FORTNIGHTLY:
        return Math.round(baseRate * minimumHours * (1 - PRICING_CONFIG.frequencyDiscounts.fortnightly));
      case Frequency.MONTHLY:
        return Math.round(baseRate * minimumHours * (1 - PRICING_CONFIG.frequencyDiscounts.monthly));
      case Frequency.ONE_OFF:
        return Math.round(baseRate * minimumHours);
      default:
        return Math.round(baseRate * minimumHours);
    }
  },

  // Calculate total minutes from rooms and add-ons only
  calculateTotalMinutes: (
    roomCounts: { [key: string]: number },
    selectedAddOns: { [key: string]: number },
    roomTypes: RoomType[],
    addOnsList: AddOn[]
  ): number => {
    const roomMinutes = Object.entries(roomCounts).reduce((sum, [type, count]) => {
      const room = roomTypes.find(r => r.type === type);
      return sum + count * (room?.estimatedTime || 0);
    }, 0);
    
    const addOnMinutes = Object.entries(selectedAddOns).reduce((sum, [key, count]) => {
      // Skip outdoor cleaning as it's handled as a boolean service
      if (key === 'outdoor') return sum;
      const addOn = addOnsList.find(a => a.key === key);
      return sum + count * (addOn?.estimatedTime || 0);
    }, 0);
    
    return roomMinutes + addOnMinutes;
  },

  // Calculate total hours from minutes
  calculateTotalHours: (totalMinutes: number): number => {
    return Math.round(totalMinutes / 60 * 10) / 10;
  },

  // Calculate add-on prices
  calculateAddOnPrices: (selectedAddOns: { [key: string]: number }): number => {
    let total = 0;
    
    Object.entries(selectedAddOns).forEach(([key, count]) => {
      if (count > 0) {
        const addOn = addOns.find(a => a.key === key);
        if (addOn && addOn.price) {
          total += addOn.price * count;
          console.log('🔍 [DEBUG] calculateAddOnPrices - Add-on cost:', key, count, addOn.price * count);
        }
      }
    });
    
    return total;
  },

  // Calculate total price with all components
  calculateTotalPrice: (options: PricingOptions, selectedAddOns?: { [key: string]: number }): number => {
    console.log('🔍 [DEBUG] calculateTotalPrice - Starting calculation with options:', {
      serviceType: options.serviceType,
      carpetCleaning: options.carpetCleaning,
      frequency: options.frequency,
      hours: options.hours,
      selectedAddOns
    });
    
    let totalPrice = calculatePrice.getBasePrice(options.frequency, options.hours, options.selectedDate, options.hour, options.minute);
    totalPrice += calculatePrice.getAdditionalServicesCost({
      endOfTenancy: options.endOfTenancy,
      expressStudio: options.expressStudio,
      ecoFriendly: options.ecoFriendly,
      hooverMop: options.hooverMop,
      disinfection: options.disinfection,
      outdoorCleaning: options.outdoorCleaning,
      laundry: options.laundry,
      errandHours: options.errandHours,
      checkJob: options.checkJob,
      havePets: options.havePets,
      keyPickup: options.keyPickup,
    });
    
    // Add add-on prices if selectedAddOns is provided
    if (selectedAddOns) {
      const addOnPrices = calculatePrice.calculateAddOnPrices(selectedAddOns);
      totalPrice += addOnPrices;
      console.log('🔍 [DEBUG] calculateTotalPrice - Add-on prices added:', addOnPrices);
    }
    
    console.log('🔍 [DEBUG] calculateTotalPrice - Base price + additional services + add-ons:', totalPrice);
    
    if (options.dirtLevel) {
      totalPrice = calculatePrice.applyDirtLevelMultiplier(totalPrice, options.dirtLevel);
      console.log('🔍 [DEBUG] calculateTotalPrice - After dirt level multiplier:', totalPrice);
    }

    // Add carpet and upholstery prices if carpetCleaning is provided (regardless of service type)
    if (options.carpetCleaning) {
      console.log('🔍 [DEBUG] calculateTotalPrice - Adding carpet & upholstery costs');
      let carpetCost = 0;
      
      // Calculate room prices
      Object.entries(options.carpetCleaning.selectedRooms).forEach(([key, count]) => {
        const room = CARPET_ROOMS.find(r => r.key === key);
        if (room && count > 0) {
          const roomCost = room.price * count;
          carpetCost += roomCost;
          console.log('🔍 [DEBUG] calculateTotalPrice - Room cost:', key, count, roomCost);
        }
      });

      // Calculate rug prices
      Object.entries(options.carpetCleaning.selectedRugs).forEach(([key, count]) => {
        const rug = CARPET_RUGS.find(r => r.key === key);
        if (rug && count > 0) {
          const rugCost = rug.price * count;
          carpetCost += rugCost;
          console.log('🔍 [DEBUG] calculateTotalPrice - Rug cost:', key, count, rugCost);
        }
      });

      // Calculate upholstery prices
      Object.entries(options.carpetCleaning.selectedUpholstery).forEach(([materialType, items]) => {
        Object.entries(items).forEach(([itemKey, count]) => {
          const item = UPHOLSTERY_ITEMS.find(i => i.key === itemKey);
        if (item && count > 0) {
          const itemCost = item.price * count;
          carpetCost += itemCost;
            console.log('🔍 [DEBUG] calculateTotalPrice - Upholstery cost:', materialType, itemKey, count, itemCost);
        }
        });
      });
      
      totalPrice += carpetCost;
      console.log('🔍 [DEBUG] calculateTotalPrice - Total carpet cost added:', carpetCost);
      console.log('🔍 [DEBUG] calculateTotalPrice - Price after carpet:', totalPrice);
    }
    
    // Apply minimum price based on service type
    if (options.serviceType !== undefined) {
      switch (options.serviceType) {
        case ServiceType.END_OF_TENANCY:
          // For End of Tenancy, always add minimum price to selections
          totalPrice += PRICING_CONFIG.minimumPrices.endOfTenancy;
          console.log('🔍 [DEBUG] calculateTotalPrice - Added End of Tenancy minimum:', PRICING_CONFIG.minimumPrices.endOfTenancy);
          break;
        case ServiceType.CARPET_UPHOLSTERY:
          // For Carpet & Upholstery, use the greater of calculated price or minimum price
          totalPrice = Math.max(totalPrice, PRICING_CONFIG.minimumPrices.carpetUpholstery);
          console.log('🔍 [DEBUG] calculateTotalPrice - Applied Carpet minimum:', Math.max(totalPrice, PRICING_CONFIG.minimumPrices.carpetUpholstery));
          break;
        case ServiceType.REGULAR_ONE_OFF:
        default:
          // For other services, use the greater of calculated price or minimum price
          totalPrice = Math.max(totalPrice, PRICING_CONFIG.minimumPrices.regularCleaning);
          console.log('🔍 [DEBUG] calculateTotalPrice - Applied Regular minimum:', Math.max(totalPrice, PRICING_CONFIG.minimumPrices.regularCleaning));
      }
    }
    
    console.log('🔍 [DEBUG] calculateTotalPrice - Final total price:', totalPrice);
    return totalPrice;
  },

  // Get detailed pricing breakdown
  getDetailedBreakdown: (options: PricingOptions, selectedAddOns?: { [key: string]: number }): DetailedBreakdown => {
    console.log('🔍 [DEBUG] getDetailedBreakdown - Starting breakdown calculation');
    
    const basePrice = calculatePrice.getBasePrice(options.frequency, options.hours || 0, options.selectedDate, options.hour, options.minute);
    const additionalServicesCost = calculatePrice.getAdditionalServicesCost({
      endOfTenancy: options.endOfTenancy,
      expressStudio: options.expressStudio,
      ecoFriendly: options.ecoFriendly,
      hooverMop: options.hooverMop,
      disinfection: options.disinfection,
      outdoorCleaning: options.outdoorCleaning,
      laundry: options.laundry,
      errandHours: options.errandHours,
      checkJob: options.checkJob,
      havePets: options.havePets,
      keyPickup: options.keyPickup,
    });
    
    let calculatedPrice = basePrice + additionalServicesCost;
    
    // Add add-on prices if selectedAddOns is provided
    let addOnPrices = 0;
    if (selectedAddOns) {
      addOnPrices = calculatePrice.calculateAddOnPrices(selectedAddOns);
      calculatedPrice += addOnPrices;
      console.log('🔍 [DEBUG] getDetailedBreakdown - Add-on prices added:', addOnPrices);
    }
    
    // Add carpet and upholstery prices if carpetCleaning is provided (regardless of service type)
    let carpetUpholsteryCost = 0;
    if (options.carpetCleaning) {
      console.log('🔍 [DEBUG] getDetailedBreakdown - Adding carpet & upholstery costs');
      
      // Calculate room prices
      Object.entries(options.carpetCleaning.selectedRooms).forEach(([key, count]) => {
        const room = CARPET_ROOMS.find(r => r.key === key);
        if (room && count > 0) {
          carpetUpholsteryCost += room.price * count;
          console.log('🔍 [DEBUG] getDetailedBreakdown - Room cost:', key, count, room.price * count);
        }
      });

      // Calculate rug prices
      Object.entries(options.carpetCleaning.selectedRugs).forEach(([key, count]) => {
        const rug = CARPET_RUGS.find(r => r.key === key);
        if (rug && count > 0) {
          carpetUpholsteryCost += rug.price * count;
          console.log('🔍 [DEBUG] getDetailedBreakdown - Rug cost:', key, count, rug.price * count);
        }
      });

      // Calculate upholstery prices
      Object.entries(options.carpetCleaning.selectedUpholstery).forEach(([materialType, items]) => {
        Object.entries(items).forEach(([itemKey, count]) => {
          const item = UPHOLSTERY_ITEMS.find(i => i.key === itemKey);
        if (item && count > 0) {
          carpetUpholsteryCost += item.price * count;
            console.log('🔍 [DEBUG] getDetailedBreakdown - Upholstery cost:', materialType, itemKey, count, item.price * count);
        }
        });
      });
      
      calculatedPrice += carpetUpholsteryCost;
      console.log('🔍 [DEBUG] getDetailedBreakdown - Total carpet cost added:', carpetUpholsteryCost);
    }
    
    if (options.dirtLevel) {
      calculatedPrice = calculatePrice.applyDirtLevelMultiplier(calculatedPrice, options.dirtLevel);
      console.log('🔍 [DEBUG] getDetailedBreakdown - After dirt level multiplier:', calculatedPrice);
    }

    // Handle minimum price and final price based on service type
    let minimumPrice = PRICING_CONFIG.minimumPrices.regularCleaning;
    let finalPrice = calculatedPrice;

    if (options.serviceType !== undefined) {
      switch (options.serviceType) {
        case ServiceType.END_OF_TENANCY:
          // For End of Tenancy, always add minimum price to selections
          minimumPrice = PRICING_CONFIG.minimumPrices.endOfTenancy;
          finalPrice = calculatedPrice + minimumPrice;
          console.log('🔍 [DEBUG] getDetailedBreakdown - End of Tenancy pricing applied');
          break;
        case ServiceType.CARPET_UPHOLSTERY:
          minimumPrice = PRICING_CONFIG.minimumPrices.carpetUpholstery;
          finalPrice = Math.max(calculatedPrice, minimumPrice);
          console.log('🔍 [DEBUG] getDetailedBreakdown - Carpet pricing applied');
          break;
        default:
          finalPrice = Math.max(calculatedPrice, minimumPrice);
          console.log('🔍 [DEBUG] getDetailedBreakdown - Regular pricing applied');
      }
    }
    
    console.log('🔍 [DEBUG] getDetailedBreakdown - Final values:', {
      basePrice,
      additionalServicesCost,
      carpetUpholsteryCost,
      calculatedPrice,
      finalPrice
    });
    
    return {
      basePrice: calculatePrice.formatPrice(basePrice),
      additionalServicesCost: calculatePrice.formatPrice(additionalServicesCost),
      dirtLevelAdjustment: options.dirtLevel ? calculatePrice.formatPrice(finalPrice - basePrice - additionalServicesCost - carpetUpholsteryCost) : '£0.00',
      minimumPrice: calculatePrice.formatPrice(minimumPrice),
      calculatedPrice: calculatePrice.formatPrice(calculatedPrice),
      finalPrice: calculatePrice.formatPrice(finalPrice),
      breakdown: {
        basePrice,
        additionalServicesCost,
        dirtLevelMultiplier: options.dirtLevel ? PRICING_CONFIG.dirtLevelMultipliers[options.dirtLevel] : 1,
        minimumPrice,
        calculatedPrice,
        finalPrice,
        isMinimumPriceApplied: finalPrice === minimumPrice
      }
    };
  }
};

// Legacy PricingCalculator class for backward compatibility
// This maintains the existing API while delegating to the new calculatePrice object
export class PricingCalculator {
  /**
   * Calculate total minutes from rooms and add-ons only
   */
  static calculateTotalMinutes(
    roomCounts: { [key: string]: number },
    selectedAddOns: { [key: string]: number },
    roomTypes: RoomType[],
    addOnsList: AddOn[]
  ): number {
    return calculatePrice.calculateTotalMinutes(roomCounts, selectedAddOns, roomTypes, addOnsList);
  }

  /**
   * Calculate total hours from minutes
   */
  static calculateTotalHours(totalMinutes: number): number {
    return calculatePrice.calculateTotalHours(totalMinutes);
  }

  /**
   * Calculate base price for given frequency and hours
   */
  static calculateBasePrice(frequency: Frequency, hours: number, selectedDate?: Date, hour?: number, minute?: number): number {
    return calculatePrice.getBasePrice(frequency, hours, selectedDate, hour, minute);
  }

  /**
   * Calculate additional services cost
   */
  static calculateAdditionalServicesCost(services: {
    endOfTenancy?: boolean;
    expressStudio?: boolean;
    ecoFriendly?: boolean;
    hooverMop?: boolean;
    disinfection?: boolean;
    outdoorCleaning?: boolean;
    oven?: boolean;
    ovenGrill?: boolean;
    laundry?: boolean;
    errandHours?: number;
    checkJob?: boolean;
    havePets?: boolean;
    keyPickup?: boolean;
  }): number {
    return calculatePrice.getAdditionalServicesCost(services);
  }

  /**
   * Calculate total price with all components
   */
  static calculateTotalPrice(options: PricingOptions, selectedAddOns?: { [key: string]: number }): number {
    return calculatePrice.calculateTotalPrice(options, selectedAddOns);
  }

  /**
   * Get detailed pricing breakdown
   */
  static getDetailedBreakdown(options: PricingOptions, selectedAddOns?: { [key: string]: number }): DetailedBreakdown {
    return calculatePrice.getDetailedBreakdown(options, selectedAddOns);
  }
}

export const cleaningTypes = [
    "One-Off / Regular / Carpet&Upholstery",
    "End of Tenancy",
    "Carpet&Upholstery only",
  ];
  
  
  export const frequencyOptions = [
    {
      label: "Weekly",
      price: 15.99, // Changed from 17 to 15.99
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
      price: 16.99, // Changed from 18 to 16.99
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
      price: 17.99, // Changed from 19 to 17.99
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
      price: 17.99, // Changed from 19 to 17.99
      oneOffDetails: [
        { label: "Next day", price: 17.99, desc: "Any day from tomorrow (8 am - 9 pm)" }, // Changed from 19 to 17.99
        { label: "Same day", price: 25.99, desc: "Today, in 4h minimum (8 am - 9 pm)" }, // Changed from 29 to 25.99
        { label: "Peak", price: 18.99, desc: "High demand" }, // Changed from 20 to 18.99
        { label: "Night", price: 25.99, desc: "Any day (9 pm - 8 am)" }, // Changed from 29 to 25.99
      ],
    },
  ];
  
  export const frequencyBackendValues = ["weekly", "fortnight", "monthly", "onetime"];
  

  
  export const roomTypes = [
    { type: "bedroom", label: "Bedroom", estimatedTime:35, icon: "https://www.emop.co.uk/static/images/steps_booking/bedroom.svg" },
    { type: "living_room", label: "Living/Dining room", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/living_dining.svg" },
    { type: "bathroom", label: "Bathroom", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/bathroom.svg" },
    { type: "hall", label: "Hall", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/hall.svg" },
    { type: "staircase", label: "Staircase", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/stairs.svg" },
    { type: "toilet", label: "Toilet", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/toilet.svg" },
    { type: "kitchen", label: "Kitchen", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen.svg" },
    { type: "office", label: "Office room", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/office.svg" },
    { type: "conservatory", label: "Conservatory", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/conservatory.svg" },
    { type: "garage", label: "Garage", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/bookAgain/Garage.svg" },
  ];
  
  export const addOns = [
    { key: "fridge", label: "Fridge (inside)", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/fridge_inside.svg" },
    { key: "windows", label: "Windows (inside)", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/windows.svg" },
    { key: "ironing", label: "Ironing", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/Ironing.svg" },
    { key: "laundry", label: "Laundry", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/steps_booking/Laundry.svg", yesNo: true },
    { key: "microwave", label: "Microwave (inside)", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/microwave.svg" },
    { key: "kitchen_inside", label: "Kitchen (inside)", estimatedTime: 60, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen_inside.svg" },
    { key: "bed_making", label: "Bed making", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/bed_making.svg" },
    { key: "bookcase", label: "Bookcase", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/bookcase.svg" },
    { key: "oven", label: "Oven", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/steps_booking/Oven.svg", price: 20 },
    { key: "oven_grill", label: "Oven & Grill", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/steps_booking/Ovenandgrill.svg", price: 30 },
    { key: "outdoor", label: "Outdoor cleaning", estimatedTime: 0, icon: "https://www.emop.co.uk/static/images/bookAgain/Outdoor_cleaning.svg", yesNo: true },
  ];

/**
 * Determines the correct one-off detail based on selected date/time.
 * @param selectedDate Date object for the booking
 * @param hour Hour (0-23)
 * @param minute Minute (0-59)
 * @returns The matching oneOffDetail object
 */
export function getOneOffDetail(selectedDate: Date, hour: number, minute: number) {
  const now = new Date();
  const bookingDate = new Date(selectedDate);
  bookingDate.setHours(hour, minute, 0, 0);

  // Calculate time difference in ms
  const diffMs = bookingDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  // Night cleaning: 20:00 - 06:00
  const isNight = hour >= 20 || hour < 6;

  const details = frequencyOptions[3].oneOffDetails;
  const fallback = details?.[0] || { label: 'Standard', price: 17.99, desc: 'Standard one-off cleaning' }; // Updated from 19 to 17.99

  // Helper to safely find a detail
  const safeFind = (label: string) => details?.find((d: any) => d.label === label) || fallback;

  // Same day
  if (
    bookingDate.toDateString() === now.toDateString() &&
    diffHours > 0
  ) {
    if (isNight) {
      return safeFind("Night");
    }
    return safeFind("Same day");
  }

  // Next day
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (
    bookingDate.toDateString() === tomorrow.toDateString()
  ) {
    if (isNight) {
      return safeFind("Night");
    }
    return safeFind("Next day");
  }

  // Night cleaning (for any other day)
  if (isNight) {
    return safeFind("Night");
  }

  // Peak (weekends)
  const isWeekend = bookingDate.getDay() === 0 || bookingDate.getDay() === 6;
  if (isWeekend) {
    return safeFind("Peak");
  }

  // Default: Standard
  return safeFind("Next day");
}
 

// ... existing code ...

// Centralized data for Carpet & Upholstery flow
export const CARPET_MATERIAL_TYPES = [
  {
    key: 'standard',
    label: 'Only Standard',
    info: 'Standard: Synthetic, Mixed, Polyester Wool, Man made, Microfibre',
  },
  {
    key: 'delicate',
    label: 'Standard & Delicate',
    info: 'Delicate: Cotton, Seagrass, or any other Organic Material',
  },
];

export const CARPET_ROOMS = [
  { key: 'single_bedroom', label: 'Single Bedroom', price: 30, icon: 'https://www.emop.co.uk/static/images/steps_booking/bedroom.svg' },
  { key: 'double_bedroom', label: 'Double Bedroom', price: 35, icon: 'https://www.emop.co.uk/static/images/steps_booking/bedroom.svg' },
  { key: 'living_room', label: 'Living room', price: 35, icon: 'https://www.emop.co.uk/static/images/steps_booking/living_dining.svg' },
  { key: 'dining_room', label: 'Dining room', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/living_dining.svg' },
  { key: 'office', label: 'Office', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/office.svg' },
  { key: 'hall', label: 'Hall', price: 20, icon: 'https://www.emop.co.uk/static/images/steps_booking/hall.svg' },
  { key: 'toilet', label: 'Toilet', price: 16, icon: 'https://www.emop.co.uk/static/images/steps_booking/toilet.svg' },
  { key: 'bathroom', label: 'Bathroom', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/bathroom.svg' },
  { key: 'through_lounge', label: 'Through lounge', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/living_dining.svg' },
  { key: 'staircase', label: 'Staircase', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/stairs.svg' },
];

export const CARPET_RUGS = [
  { key: 'small_rug', label: 'Small Rug', price: 16, icon: 'https://www.emop.co.uk/static/images/steps_booking/rug.svg' },
  { key: 'medium_rug', label: 'Medium Rug', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/rug.svg' },
  { key: 'large_rug', label: 'Large Rug', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/rug.svg' },
];

export const UPHOLSTERY_MATERIAL_TYPES = [
  { key: 'standard', label: 'Standard', info: 'Synthetic, Mixed, Polyester Wool, Man made, Microfibre' },
  { key: 'delicate', label: 'Delicate', info: 'Cotton, Seagrass, or any other Organic Material' },
  { key: 'leather', label: 'Leather', info: 'Leather material' },
];

export const UPHOLSTERY_ITEMS = [
  { key: 'two_seater_sofa', label: '2 seater sofa', price: 40, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'three_seater_sofa', label: '3 seater sofa', price: 50, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'four_seater_sofa', label: '4 seater sofa', price: 60, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'armchair', label: 'Armchair', price: 20, icon: 'https://www.emop.co.uk/static/images/steps_booking/armchair.svg' },
  { key: 'single_mattress', label: 'Single Mattress', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/mattress.svg' },
  { key: 'double_mattress', label: 'Double Mattress', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/mattress.svg' },
  { key: 'king_mattress', label: 'King Mattress', price: 40, icon: 'https://www.emop.co.uk/static/images/steps_booking/mattress.svg' },
  { key: 'half_length_curtain', label: 'Half Length Curtain', price: 16, icon: 'https://www.emop.co.uk/static/images/steps_booking/curtain.svg' },
  { key: 'full_length_curtain', label: 'Full Length Curtain', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/curtain.svg' },
];

export const CARPET_ADDONS = [
  { key: 'cleaning_products', label: 'Cleaning products include sprays and cloths.', type: 'boolean' },
  { key: 'job_check', label: 'Can you check the job at the end?', type: 'boolean' },
  { key: 'have_pets', label: 'Do you have pets?', type: 'boolean' },
  { key: 'key_pickup', label: 'Does a cleaner need to pick up a key?', type: 'boolean' },
];
// ... existing code ...
