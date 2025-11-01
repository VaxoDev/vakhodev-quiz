import { create } from 'zustand';
import { QuizStore } from '../types/quiz';
import { PRICING_CONFIG } from '../config/pricing';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useQuizStore = create<QuizStore>((set, get) => ({
  step: 0,
  fullName: '',
  businessType: '',
  businessName: '',
  email: '',
  phone: '',
  preferredColors: [],
  selectedSections: [],
  numberOfPages: 1,
  additionalFeatures: [],
  deliveryTimeline: '',
  totalPrice: PRICING_CONFIG.BASE_PRICE,
  isSubmitting: false,
  error: null,

  setStep: (step) => set({ step }),
  
  updateField: (field, value) => {
    set({ [field]: value });
    get().calculatePrice();
  },

  calculatePrice: () => {
    const state = get();
    let total = PRICING_CONFIG.BASE_PRICE;
    
    // Base calculations
    total += state.numberOfPages * PRICING_CONFIG.PRICE_PER_PAGE;
    
    // Feature calculations
    state.additionalFeatures.forEach(feature => {
      total += PRICING_CONFIG.FEATURE_PRICES[feature as keyof typeof PRICING_CONFIG.FEATURE_PRICES] || 0;
    });

    // Rush delivery fee
    if (state.deliveryTimeline === 'urgent') {
      total *= 1.5; // 50% rush fee
    } else if (state.deliveryTimeline === 'priority') {
      total *= 1.25; // 25% priority fee
    }

    set({ totalPrice: Math.round(total) });
  },

  submitQuiz: async () => {
    const state = get();
    set({ isSubmitting: true, error: null });

    try {
      const quizData = {
        fullName: state.fullName,
        businessType: state.businessType,
        businessName: state.businessName,
        email: state.email,
        phone: state.phone,
        preferredColors: state.preferredColors,
        selectedSections: state.selectedSections,
        numberOfPages: state.numberOfPages,
        additionalFeatures: state.additionalFeatures,
        deliveryTimeline: state.deliveryTimeline,
        totalPrice: state.totalPrice,
        submittedAt: new Date().toISOString(),
      };

      // Save to Firebase
      await addDoc(collection(db, 'quizSubmissions'), quizData);
      
      console.log('Quiz submitted successfully to Firebase');
      
      set({ isSubmitting: false });
      return true;
    } catch (error) {
      set({ 
        isSubmitting: false, 
        error: error instanceof Error ? error.message : 'Failed to submit quiz'
      });
      return false;
    }
  },

  reset: () => set({
    step: 0,
    fullName: '',
    businessType: '',
    businessName: '',
    email: '',
    phone: '',
    preferredColors: [],
    selectedSections: [],
    numberOfPages: 1,
    additionalFeatures: [],
    deliveryTimeline: '',
    totalPrice: PRICING_CONFIG.BASE_PRICE,
    isSubmitting: false,
    error: null,
  }),
}));