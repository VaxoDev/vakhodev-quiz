import { motion } from 'framer-motion';
import { useQuizStore } from '../store/quizStore';
import { BusinessInfoStep } from './steps/BusinessInfoStep';
import { DesignPreferencesStep } from './steps/DesignPreferencesStep';
import { FeaturesStep } from './steps/FeaturesStep';
import { SummaryStep } from './steps/SummaryStep';

export default function QuizStep() {
  const step = useQuizStore((state) => state.step);

  const steps = [
    <BusinessInfoStep key="business" />,
    <DesignPreferencesStep key="design" />,
    <FeaturesStep key="features" />,
    <SummaryStep key="summary" />
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          key={step}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {steps[step - 1]}
        </motion.div>
      </div>
    </motion.div>
  );
}