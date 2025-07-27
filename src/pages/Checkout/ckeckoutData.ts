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
  // Base hourly rates
  baseHourlyRate: 19,
  
  // Minimum hours for booking (easily configurable)
  minimumHours: 1,
  
  // Minimum prices for each service type
  minimumPrices: {
    regularCleaning: 87,     // Regular/One-off cleaning minimum
    endOfTenancy: 145,       // End of Tenancy minimum
    carpetUpholstery: 96,   // Carpet & Upholstery minimum
  } as MinimumPrices,

  // Frequency discounts (as percentages)
  frequencyDiscounts: {
    weekly: 0.15,      // 15% discount
    fortnightly: 0.20, // 20% discount  
    monthly: 0.25,     // 25% discount
  },
  
  // Additional service costs
  additionalServices: {
    endOfTenancy: 39,
    expressStudio: 25, // fixed
    ecoFriendly: 15,
    hooverMop: 10,
    disinfection: 20,
    outdoorCleaning: 30, // fixed
    laundry: 9, // fixed service
    errandHours: 25, // per hour
    checkJob: 0,
    havePets: 0,
    keyPickup: 0,
  },
  
  // Dirt level multipliers
  dirtLevelMultipliers: {
    light: 1.0,
    medium: 1.15,
    heavy: 1.30,
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

export interface PricingState {
  frequency: Frequency;
  hours: number;
  endOfTenancy?: boolean;
  expressStudio?: boolean;
  ecoFriendly?: boolean;
  hooverMop?: boolean;
  disinfection?: boolean;
  outdoorCleaning?: boolean;
  errandHours?: number;
  checkJob?: boolean;
  havePets?: boolean;
  keyPickup?: boolean;
  dirtLevel?: DirtLevel;
}

// Helper functions for calculations
export const calculatePrice = {
  // Calculate base price for frequency
  getBasePrice: (frequency: Frequency, hours: number = 2) => {
    const basePrice = PRICING_CONFIG.baseHourlyRate * hours;
    
    switch (frequency) {
      case Frequency.WEEKLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.weekly);
      case Frequency.FORTNIGHTLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.fortnightly);
      case Frequency.MONTHLY:
        return basePrice * (1 - PRICING_CONFIG.frequencyDiscounts.monthly);
      case Frequency.ONE_OFF:
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
};

// Comprehensive pricing service for total calculations
export const pricingService = {
  // Calculate total price for a booking
  calculateTotalPrice: (options: {
    frequency: Frequency;
    hours?: number;
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
    serviceType?: ServiceType; // Add service type to determine minimum price
    carpetCleaning?: {
      selectedRooms: { [key: string]: number };
      selectedRugs: { [key: string]: number };
      selectedUpholstery: { [key: string]: number };
    };
  }) => {
    // Get base price
    let totalPrice = calculatePrice.getBasePrice(options.frequency, options.hours || 2);
    
    // Add additional services
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
    
    totalPrice += additionalServicesCost;

    // Add carpet and upholstery prices if available
    if (options.carpetCleaning) {
      // Calculate room prices
      Object.entries(options.carpetCleaning.selectedRooms).forEach(([key, count]) => {
        const room = CARPET_ROOMS.find(r => r.key === key);
        if (room) {
          totalPrice += room.price * count;
        }
      });

      // Calculate rug prices
      Object.entries(options.carpetCleaning.selectedRugs).forEach(([key, count]) => {
        const rug = CARPET_RUGS.find(r => r.key === key);
        if (rug) {
          totalPrice += rug.price * count;
        }
      });

      // Calculate upholstery prices
      Object.entries(options.carpetCleaning.selectedUpholstery).forEach(([key, count]) => {
        const item = UPHOLSTERY_ITEMS.find(i => i.key === key);
        if (item) {
          totalPrice += item.price * count;
        }
      });
    }
    
    // Apply dirt level multiplier
    if (options.dirtLevel) {
      totalPrice = calculatePrice.applyDirtLevelMultiplier(totalPrice, options.dirtLevel);
    }

    // Apply minimum price based on service type
    if (options.serviceType !== undefined) {
      switch (options.serviceType) {
        case ServiceType.END_OF_TENANCY:
          // For End of Tenancy, always add minimum price to selections
          totalPrice += PRICING_CONFIG.minimumPrices.endOfTenancy;
          break;
        case ServiceType.REGULAR_ONE_OFF:
        case ServiceType.CARPET_UPHOLSTERY:
        default:
          // For other services, use the greater of calculated price or minimum price
          const minimumPrice = options.serviceType === ServiceType.CARPET_UPHOLSTERY
            ? PRICING_CONFIG.minimumPrices.carpetUpholstery
            : PRICING_CONFIG.minimumPrices.regularCleaning;
          totalPrice = Math.max(totalPrice, minimumPrice);
      }
    }
    
    return totalPrice;
  },
  
  // Get breakdown of all costs
  getPriceBreakdown: (options: {
    frequency: Frequency;
    hours?: number;
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
  }) => {
    const basePrice = calculatePrice.getBasePrice(options.frequency, options.hours || 2);
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
    
    if (options.dirtLevel) {
      calculatedPrice = calculatePrice.applyDirtLevelMultiplier(calculatedPrice, options.dirtLevel);
    }

    // Get minimum price based on service type
    let minimumPrice = PRICING_CONFIG.minimumPrices.regularCleaning;
    if (options.serviceType !== undefined) {
      switch (options.serviceType) {
        case ServiceType.END_OF_TENANCY:
          minimumPrice = PRICING_CONFIG.minimumPrices.endOfTenancy;
          break;
        case ServiceType.CARPET_UPHOLSTERY:
          minimumPrice = PRICING_CONFIG.minimumPrices.carpetUpholstery;
          break;
      }
    }

    // Final price is the higher of calculated price or minimum price
    const finalPrice = Math.max(calculatedPrice, minimumPrice);
    
    return {
      basePrice: calculatePrice.formatPrice(basePrice),
      additionalServices: calculatePrice.formatPrice(additionalServicesCost),
      dirtLevelMultiplier: options.dirtLevel ? `${((PRICING_CONFIG.dirtLevelMultipliers[options.dirtLevel] - 1) * 100).toFixed(0)}%` : '0%',
      minimumPrice: calculatePrice.formatPrice(minimumPrice),
      calculatedPrice: calculatePrice.formatPrice(calculatedPrice),
      totalPrice: calculatePrice.formatPrice(finalPrice),
      isMinimumPriceApplied: finalPrice === minimumPrice,
      breakdown: {
        basePrice,
        additionalServicesCost,
        dirtLevelMultiplier: options.dirtLevel ? PRICING_CONFIG.dirtLevelMultipliers[options.dirtLevel] : 1,
        finalPrice
      }
    };
  },
  
  
  // Validate pricing configuration
  validatePricing: () => {
    const errors: string[] = [];
    
    if (PRICING_CONFIG.baseHourlyRate <= 0) {
      errors.push('Base hourly rate must be greater than 0');
    }
    
    Object.entries(PRICING_CONFIG.frequencyDiscounts).forEach(([key, value]) => {
      if (value < 0 || value > 1) {
        errors.push(`${key} discount must be between 0 and 1`);
      }
    });
    
    Object.entries(PRICING_CONFIG.additionalServices).forEach(([key, value]) => {
      if (value < 0) {
        errors.push(`${key} service cost cannot be negative`);
      }
    });
    
    return errors;
  }
};

// Dedicated Pricing Calculator Class
interface DetailedBreakdown {
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
    const roomMinutes = Object.entries(roomCounts).reduce((sum, [type, count]) => {
      const room = roomTypes.find(r => r.type === type);
      return sum + count * (room?.estimatedTime || 0);
    }, 0);
    
    const addOnMinutes = Object.entries(selectedAddOns).reduce((sum, [key, count]) => {
      // Skip outdoor cleaning as it's now handled as a boolean
      if (key === 'outdoor') return sum;
      const addOn = addOnsList.find(a => a.key === key);
      return sum + count * (addOn?.estimatedTime || 0);
    }, 0);
    
    return roomMinutes + addOnMinutes;
  }

  /**
   * Calculate total hours from minutes
   */
  static calculateTotalHours(totalMinutes: number): number {
    return Math.round(totalMinutes / 60 * 10) / 10;
  }

  /**
   * Calculate base price for given frequency and hours
   */
  static calculateBasePrice(frequency: Frequency, hours: number): number {
    return calculatePrice.getBasePrice(frequency, hours);
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
  static calculateTotalPrice(
    options: {
      frequency: Frequency,
      hours: number,
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
        selectedUpholstery: { [key: string]: number };
      };
    }
  ): number {
    let totalPrice = this.calculateBasePrice(options.frequency, options.hours);
    totalPrice += this.calculateAdditionalServicesCost(options);
    
    if (options.dirtLevel) {
      totalPrice = calculatePrice.applyDirtLevelMultiplier(totalPrice, options.dirtLevel);
    }

    // Add carpet and upholstery prices if it's a carpet service
    if (options.serviceType === ServiceType.CARPET_UPHOLSTERY && options.carpetCleaning) {
      // Calculate room prices
      Object.entries(options.carpetCleaning.selectedRooms).forEach(([key, count]) => {
        const room = CARPET_ROOMS.find(r => r.key === key);
        if (room) {
          totalPrice += room.price * count;
        }
      });

      // Calculate rug prices
      Object.entries(options.carpetCleaning.selectedRugs).forEach(([key, count]) => {
        const rug = CARPET_RUGS.find(r => r.key === key);
        if (rug) {
          totalPrice += rug.price * count;
        }
      });

      // Calculate upholstery prices
      Object.entries(options.carpetCleaning.selectedUpholstery).forEach(([key, count]) => {
        const item = UPHOLSTERY_ITEMS.find(i => i.key === key);
        if (item) {
          totalPrice += item.price * count;
        }
      });
    }
    
    // Apply minimum price based on service type
    if (options.serviceType !== undefined) {
      switch (options.serviceType) {
        case ServiceType.END_OF_TENANCY:
          // For End of Tenancy, always add minimum price to selections
          totalPrice += PRICING_CONFIG.minimumPrices.endOfTenancy;
          break;
        case ServiceType.CARPET_UPHOLSTERY:
          // For Carpet & Upholstery, use the greater of calculated price or minimum price
          totalPrice = Math.max(totalPrice, PRICING_CONFIG.minimumPrices.carpetUpholstery);
          break;
        case ServiceType.REGULAR_ONE_OFF:
        default:
          // For other services, use the greater of calculated price or minimum price
          totalPrice = Math.max(totalPrice, PRICING_CONFIG.minimumPrices.regularCleaning);
      }
    }
    
    return totalPrice;
  }

  /**
   * Get detailed pricing breakdown
   */
  static getDetailedBreakdown(
    options: {
      frequency: Frequency;
      hours?: number;
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
        selectedUpholstery: { [key: string]: number };
      };
    }
  ): DetailedBreakdown {
    const basePrice = this.calculateBasePrice(options.frequency, options.hours || 0);
    const additionalServicesCost = this.calculateAdditionalServicesCost(options);
    
    let calculatedPrice = basePrice + additionalServicesCost;
    
    // Add carpet and upholstery prices if it's a carpet service
    let carpetUpholsteryCost = 0;
    if (options.serviceType === ServiceType.CARPET_UPHOLSTERY && options.carpetCleaning) {
      // Calculate room prices
      Object.entries(options.carpetCleaning.selectedRooms).forEach(([key, count]) => {
        const room = CARPET_ROOMS.find(r => r.key === key);
        if (room) {
          carpetUpholsteryCost += room.price * count;
        }
      });

      // Calculate rug prices
      Object.entries(options.carpetCleaning.selectedRugs).forEach(([key, count]) => {
        const rug = CARPET_RUGS.find(r => r.key === key);
        if (rug) {
          carpetUpholsteryCost += rug.price * count;
        }
      });

      // Calculate upholstery prices
      Object.entries(options.carpetCleaning.selectedUpholstery).forEach(([key, count]) => {
        const item = UPHOLSTERY_ITEMS.find(i => i.key === key);
        if (item) {
          carpetUpholsteryCost += item.price * count;
        }
      });
      
      calculatedPrice += carpetUpholsteryCost;
    }
    
    if (options.dirtLevel) {
      calculatedPrice = calculatePrice.applyDirtLevelMultiplier(calculatedPrice, options.dirtLevel);
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
          break;
        case ServiceType.CARPET_UPHOLSTERY:
          minimumPrice = PRICING_CONFIG.minimumPrices.carpetUpholstery;
          finalPrice = Math.max(calculatedPrice, minimumPrice);
          break;
        default:
          finalPrice = Math.max(calculatedPrice, minimumPrice);
      }
    }
    
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

  /**
   * Validate pricing state
   */
  static validatePricingState(state: PricingState): string[] {
    const errors: string[] = [];
    
    if (state.hours <= 0) {
      errors.push('Hours must be greater than 0');
    }
    
    if (state.errandHours && state.errandHours < 0) {
      errors.push('Errand hours cannot be negative');
    }
    
    return errors;
  }

  /**
   * Test function to verify calculations work correctly
   */
  static testCalculations() {
    const testRoomCounts = { bedroom: 2, bathroom: 1 };
    const testAddOns = { deep_cleaning: 1 };
    
    const totalMinutes = this.calculateTotalMinutes(
      testRoomCounts,
      testAddOns,
      roomTypes,
      addOns
    );
    
    const totalHours = this.calculateTotalHours(totalMinutes);
    const totalPrice = this.calculateTotalPrice({
      frequency: Frequency.ONE_OFF,
      hours: totalHours,
      ecoFriendly: true,
      disinfection: true,
      dirtLevel: DirtLevel.MEDIUM
    });
    
    console.log('🧪 PricingCalculator Test Results:', {
      totalMinutes,
      totalHours,
      totalPrice,
      breakdown: this.getDetailedBreakdown({
        frequency: Frequency.ONE_OFF,
        hours: totalHours,
        ecoFriendly: true,
        disinfection: true,
        dirtLevel: DirtLevel.MEDIUM
      })
    });
    
    return { totalMinutes, totalHours, totalPrice };
  }

  static testCarpetPricingLogic() {
    console.log('🧪 Testing Carpet & Upholstery Pricing Logic...');
    
    // Test Case 1: Carpet service with selections below minimum price
    const testCase1 = {
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: {
        selectedRooms: { 'bedroom': 1 }, // Assuming bedroom carpet costs £30
        selectedRugs: {},
        selectedUpholstery: {}
      }
    };
    
    const price1 = this.calculateTotalPrice({
      frequency: Frequency.ONE_OFF,
      hours: 0,
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: testCase1.carpetCleaning
    });
    
    const breakdown1 = this.getDetailedBreakdown({
      frequency: Frequency.ONE_OFF,
      hours: 0,
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: testCase1.carpetCleaning
    });
    
    console.log('Test Case 1 - Below minimum price:', {
      carpetSelections: testCase1.carpetCleaning,
      calculatedPrice: price1,
      minimumPrice: PRICING_CONFIG.minimumPrices.carpetUpholstery,
      finalPrice: breakdown1.finalPrice,
      isMinimumApplied: breakdown1.breakdown.isMinimumPriceApplied
    });
    
    // Test Case 2: Carpet service with selections above minimum price
    const testCase2 = {
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: {
        selectedRooms: { 'bedroom': 3, 'living_room': 2 }, // More selections
        selectedRugs: { 'large_rug': 2 },
        selectedUpholstery: { 'sofa': 1, 'armchair': 2 }
      }
    };
    
    const price2 = this.calculateTotalPrice({
      frequency: Frequency.ONE_OFF,
      hours: 0,
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: testCase2.carpetCleaning
    });
    
    const breakdown2 = this.getDetailedBreakdown({
      frequency: Frequency.ONE_OFF,
      hours: 0,
      serviceType: ServiceType.CARPET_UPHOLSTERY,
      carpetCleaning: testCase2.carpetCleaning
    });
    
    console.log('Test Case 2 - Above minimum price:', {
      carpetSelections: testCase2.carpetCleaning,
      calculatedPrice: price2,
      minimumPrice: PRICING_CONFIG.minimumPrices.carpetUpholstery,
      finalPrice: breakdown2.finalPrice,
      isMinimumApplied: breakdown2.breakdown.isMinimumPriceApplied
    });
    
    // Test Case 3: Regular cleaning with minimum price
    const testCase3 = {
      serviceType: ServiceType.REGULAR_ONE_OFF,
      roomCounts: { bedroom: 1 }, // Small selection
      addOns: {}
    };
    
    const price3 = this.calculateTotalPrice({
      frequency: Frequency.ONE_OFF,
      hours: 1, // 1 hour
      serviceType: ServiceType.REGULAR_ONE_OFF
    });
    
    const breakdown3 = this.getDetailedBreakdown({
      frequency: Frequency.ONE_OFF,
      hours: 1,
      serviceType: ServiceType.REGULAR_ONE_OFF
    });
    
    console.log('Test Case 3 - Regular cleaning minimum price:', {
      serviceType: 'Regular One-Off',
      calculatedPrice: price3,
      minimumPrice: PRICING_CONFIG.minimumPrices.regularCleaning,
      finalPrice: breakdown3.finalPrice,
      isMinimumApplied: breakdown3.breakdown.isMinimumPriceApplied
    });
    
    return {
      testCase1: { price: price1, breakdown: breakdown1 },
      testCase2: { price: price2, breakdown: breakdown2 },
      testCase3: { price: price3, breakdown: breakdown3 }
    };
  }
}

export const cleaningTypes = [
    "One-Off / Regular / Carpet&Upholstery",
    "End of Tenancy",
    "Carpet&Upholstery only",
  ];
  
  export interface DayAvailabilityResponse {
    statusCode: number;
    message: string;
    payload: string[] | null;
  }
  
  export const frequencyOptions = [
    {
      label: "Weekly",
      price: 17,
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
      price: 18,
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
      price: 19,
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
      price: 19,
      oneOffDetails: [
        { label: "Next day", price: 19, desc: "Any day from tomorrow (8 am - 9 pm)" },
        { label: "Same day", price: 29, desc: "Today, in 4h minimum (8 am - 9 pm)" },
        { label: "Peak", price: 20, desc: "High demand" },
        { label: "Night", price: 29, desc: "Any day (9 pm - 8 am)" },
      ],
    },
  ];
  
  export const frequencyBackendValues = ["weekly", "fortnight", "monthly", "onetime"];
  

  
  export const roomTypes = [
    { type: "bedroom", label: "Bedroom", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/bedroom.svg" },
    { type: "living_room", label: "Living/Dining room", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/living_dining.svg" },
    { type: "bathroom", label: "Bathroom", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/bathroom.svg" },
    { type: "hall", label: "Hall", estimatedTime: 10, icon: "https://www.emop.co.uk/static/images/steps_booking/hall.svg" },
    { type: "staircase", label: "Staircase", estimatedTime: 15, icon: "https://www.emop.co.uk/static/images/steps_booking/stairs.svg" },
    { type: "toilet", label: "Toilet", estimatedTime: 15, icon: "https://www.emop.co.uk/static/images/steps_booking/toilet.svg" },
    { type: "kitchen", label: "Kitchen", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/kitchen.svg" },
    { type: "office", label: "Office room", estimatedTime: 20, icon: "https://www.emop.co.uk/static/images/steps_booking/office.svg" },
    { type: "conservatory", label: "Conservatory", estimatedTime: 25, icon: "https://www.emop.co.uk/static/images/steps_booking/conservatory.svg" },
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
    { key: "oven", label: "Oven", estimatedTime: 30, icon: "https://www.emop.co.uk/static/images/steps_booking/Oven.svg", price: 25, yesNo: true },
    { key: "oven_grill", label: "Oven & Grill", estimatedTime: 45, icon: "https://www.emop.co.uk/static/images/steps_booking/Ovenandgrill.svg", price: 35, yesNo: true },
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
  const fallback = details?.[0] || { label: 'Standard', price: 19, desc: 'Standard one-off cleaning' };

  // Helper to safely find a detail
  const safeFind = (label: string) => details?.find((d: any) => d.label === label) || fallback;

  // Same day
  if (
    bookingDate.toDateString() === now.toDateString() &&
    diffHours > 0
  ) {
    if (isNight) {
      return safeFind("Night Cleaning");
    }
    return safeFind("Same Day");
  }

  // Next day
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (
    bookingDate.toDateString() === tomorrow.toDateString()
  ) {
    if (isNight) {
      return safeFind("Night Cleaning");
    }
    return safeFind("Next Day");
  }

  // Night cleaning (for any other day)
  if (isNight) {
    return safeFind("Night Cleaning");
  }

  // Peak (weekends)
  const isWeekend = bookingDate.getDay() === 0 || bookingDate.getDay() === 6;
  if (isWeekend) {
    return safeFind("Peak");
  }

  // Default: Standard
  return safeFind("Standard");
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
  { key: 'single_bedroom', label: 'Single Bedroom', price: 24, icon: 'https://www.emop.co.uk/static/images/steps_booking/bedroom.svg' },
  { key: 'double_bedroom', label: 'Double Bedroom', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/bedroom.svg' },
  { key: 'living_room', label: 'Living room', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/living_dining.svg' },
  { key: 'dining_room', label: 'Dining room', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/living_dining.svg' },
  { key: 'office', label: 'Office', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/office.svg' },
  { key: 'hall', label: 'Hall', price: 16, icon: 'https://www.emop.co.uk/static/images/steps_booking/hall.svg' },
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
  { key: 'two_seater_sofa', label: '2 seater sofa', price: 32, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'three_seater_sofa', label: '3 seater sofa', price: 40, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'four_seater_sofa', label: '4 seater sofa', price: 48, icon: 'https://www.emop.co.uk/static/images/steps_booking/sofa.svg' },
  { key: 'armchair', label: 'Armchair', price: 16, icon: 'https://www.emop.co.uk/static/images/steps_booking/armchair.svg' },
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
