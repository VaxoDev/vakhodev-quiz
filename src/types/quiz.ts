export interface QuizState {
  step: number;
  fullName: string;
  businessType: string;
  businessName: string;
  email: string;
  phone: string;
  preferredColors: string[];
  selectedSections: string[];
  numberOfPages: number;
  additionalFeatures: string[];
  deliveryTimeline: string;
  totalPrice: number;
  isSubmitting: boolean;
  error: string | null;
}

export interface QuizStore extends QuizState {
  setStep: (step: number) => void;
  updateField: <K extends keyof QuizState>(field: K, value: QuizState[K]) => void;
  calculatePrice: () => void;
  submitQuiz: () => Promise<boolean>;
  reset: () => void;
}