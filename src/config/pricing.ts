export const PRICING_CONFIG = {
  BASE_PRICE: 150,
  PRICE_PER_PAGE: 50,
  FEATURE_PRICES: {
    'Dark Mode': 30,
    'Product Search': 40,
    'Multi-page E-commerce': 300,
    'Basic Animative Design': 30,
    'Translation (1 Language)': 50,
    'Translation (2 Languages)': 100,
    'Translation (3+ Languages)': 225, // 75 each for 3 languages
  }
} as const;