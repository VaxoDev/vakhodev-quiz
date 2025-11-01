export const PRICING_CONFIG = {
  // Base prices adjusted for Georgian market
  BASE_PRICE: 300,
  PRICE_PER_PAGE: 60,
  
  // Page-based pricing tiers
  PAGE_TIERS: {
    SINGLE_PAGE: { min: 1, max: 1, basePrice: 300 },
    MULTI_PAGE: { min: 2, max: 5, basePrice: 500 },
    COMPLEX: { min: 6, max: 20, basePrice: 900 }
  },

  // Feature prices - EXACTLY matching FeaturesStep.tsx
  FEATURE_PRICES: {
    // Design & UI Features
    'Dark/Light Mode Toggle': 60,
    'Basic Animations': 100,
    'Moderate Animations': 180,
    'Gallery Scrolling': 120,
    'Image Upload Feature(სჭირდება supabase)': 150,
    
    // Search & Filter
    'Product/Content Search': 120,
    'Advanced Filtering': 150,
    
    // Authentication & User Management
    'User Authentication': 250,
    'User Dashboard(სჭირდება firebase)': 220,
    
    // Blog & Social Features
    'Full Blog System': 350,
    'Social Blog Platform': 500,
    'User Post System': 280,
    'Comment System': 150,
    
    // E-commerce Features
    'Basic E-commerce': 600,
    'Add to Cart System': 250,
    'Wishlist/Liked Items': 150,
    'Product Display System': 200,
    
    // Rating & Review System
    'Star Rating System (0-5)': 100,
    'Review System': 200,
    'Rating with Comments': 250,
    
    // Communication Features
    'Text Chat System': 350,
    'Basic Video Chat (1-on-1)': 500,
    'SMS Notifications': 180,
    
    // Calendar & Scheduling
    'Availability Calendar': 400,
    
    // Multilingual
    'Translation (1 Language)': 120,
    'Translation (2 Languages)': 220,
    
    // Database & Storage
    'Firebase Integration': 150,
    'Supabase Integration': 150,
    'Data Management': 180
  },

  // Delivery timeline multipliers
  DELIVERY_MULTIPLIERS: {
    standard: 1.0,    // 20-30 დღე
    priority: 1.35,   // 15-20 დღე (+35%)
    urgent: 2.0       // 7-10 დღე (+100%)
  },

  // Maintenance & Support packages (monthly)
  MAINTENANCE_PACKAGES: {
    basic: 50,      // ძირითადი განახლებები
    standard: 100,  // რეგულარული განახლებები
    premium: 200    // სრული მხარდაჭერა 24/7
  }
} as const;

// Helper function to calculate base price based on pages
export function calculateBasePriceByPages(numberOfPages: number): number {
  if (numberOfPages === 1) {
    return PRICING_CONFIG.PAGE_TIERS.SINGLE_PAGE.basePrice;
  } else if (numberOfPages <= 5) {
    return PRICING_CONFIG.PAGE_TIERS.MULTI_PAGE.basePrice + 
           (numberOfPages - 2) * PRICING_CONFIG.PRICE_PER_PAGE;
  } else {
    return PRICING_CONFIG.PAGE_TIERS.COMPLEX.basePrice + 
           (numberOfPages - 6) * PRICING_CONFIG.PRICE_PER_PAGE;
  }
}

// Feature categories for better organization
export const FEATURE_CATEGORIES = {
  design: ['Dark/Light Mode Toggle', 'Basic Animations', 'Moderate Animations', 'Gallery Scrolling', 'Image Upload Feature(სჭირდება supabase)'],
  search: ['Product/Content Search', 'Advanced Filtering'],
  authentication: ['User Authentication', 'User Dashboard(სჭირდება firebase)'],
  blog: ['Full Blog System', 'Social Blog Platform', 'User Post System', 'Comment System'],
  ecommerce: ['Basic E-commerce', 'Add to Cart System', 'Wishlist/Liked Items', 'Product Display System'],
  reviews: ['Star Rating System (0-5)', 'Review System', 'Rating with Comments'],
  communication: ['Text Chat System', 'Basic Video Chat (1-on-1)', 'SMS Notifications'],
  calendar: ['Availability Calendar'],
  multilingual: ['Translation (1 Language)', 'Translation (2 Languages)'],
  database: ['Firebase Integration', 'Supabase Integration', 'Data Management']
} as const;