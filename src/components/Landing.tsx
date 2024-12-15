import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export default function Landing() {
  const setStep = useQuizStore((state) => state.setStep);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
    >
      <div className="absolute inset-0 bg-black/20" />
      
      <motion.div 
        className="text-center z-10 px-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          მოდი ერთად შევქმნათ თქვენი საოცნებო ვებსაიტი
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          უპასუხეთ რამდენიმე კითხვას და მიიღეთ მორგებული ვებ გადაწყვეტილება
        </motion.p>

        <motion.button
          onClick={() => setStep(1)}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all
                     duration-300 ease-in-out relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          დაიწყეთ კითხვარი
          <motion.div
            className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-20
                       transition-opacity duration-300"
          />
        </motion.button>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/80" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}