import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

const features = [
  {
    id: 'Dark Mode',
    name: 'მუქი რეჟიმის გადართვა',
    description: 'მომხმარებლებს შეუძლიათ გადართონ ნათელ და მუქ თემებს შორის',
    price: 30
  },
  {
    id: 'Product Search',
    name: 'პროდუქტის ძიება',
    description: 'გაუმჯობესებული ძიების ფუნქცია თქვენი პროდუქტებისთვის',
    price: 40
  },
  {
    id: 'Multi-page E-commerce',
    name: 'მრავალგვერდიანი ელ-კომერცია',
    description: 'სრული ელ-კომერციული ვებსაიტის ფუნქცია',
    price: 400
  },
  {
    id: 'Basic Animative Design',
    name: 'საშუალო დონის ანიმაციური დიზაინი',
    description: 'გლუვი ანიმაციები და გადასვლები მთელ ვებსაიტზე',
    price: 30
  },
  {
    id: 'Translation (1 Language)',
    name: 'თარგმანი - 1 დამატებითი ენა',
    description: 'თარგმნეთ თქვენი ვებსაიტი ერთ დამატებით ენაზე',
    price: 50
  },
  {
    id: 'Translation (2 Languages)',
    name: 'თარგმანი - 2 დამატებითი ენა',
    description: 'თარგმნეთ თქვენი ვებსაიტი ორ დამატებით ენაზე',
    price: 100
  },
  {
    id: 'Translation (3+ Languages)',
    name: 'თარგმანი - 3 ან მეტი ენა',
    description: 'თარგმნეთ თქვენი ვებსაიტი სამ ან მეტ ენაზე (75 თითოეული)',
    price: 225
  }
];

const deliveryOptions = [
  {
    id: 'standard',
    name: 'სტანდარტული მიწოდება',
    description: '15 დღე',
    multiplier: 1
  },
  {
    id: 'priority',
    name: 'პრიორიტეტული მიწოდება',
    description: '10 დღე (+25%)',
    multiplier: 1.25
  },
  {
    id: 'urgent',
    name: 'სასწრაფო მიწოდება',
    description: '5-7 დღე (+100%)',
    multiplier: 2
  }
];

export function FeaturesStep() {
  const { 
    additionalFeatures, 
    deliveryTimeline,
    totalPrice, 
    updateField, 
    setStep 
  } = useQuizStore();

  const toggleFeature = (featureId: string) => {
    let newFeatures = [...additionalFeatures];
    
    if (featureId.startsWith('Translation')) {
      newFeatures = newFeatures.filter(f => !f.startsWith('Translation'));
    }
    
    if (additionalFeatures.includes(featureId)) {
      newFeatures = newFeatures.filter(f => f !== featureId);
    } else {
      newFeatures.push(featureId);
    }
    
    updateField('additionalFeatures', newFeatures);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">დამატებითი ფუნქციები</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className={`border rounded-lg p-6 cursor-pointer relative
                         transition-all duration-200 ${
                           additionalFeatures.includes(feature.id)
                             ? 'border-purple-500 bg-purple-50'
                             : 'border-gray-200 hover:border-purple-200'
                         }`}
              onClick={() => toggleFeature(feature.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-purple-600">
                    ₾{feature.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">მიწოდების ვადა</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deliveryOptions.map((option) => (
              <motion.div
                key={option.id}
                className={`border rounded-lg p-6 cursor-pointer relative
                           transition-all duration-200 ${
                             deliveryTimeline === option.id
                               ? 'border-purple-500 bg-purple-50'
                               : 'border-gray-200 hover:border-purple-200'
                           }`}
                onClick={() => updateField('deliveryTimeline', option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {option.name}
                </h4>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span className="font-medium">სავარაუდო ფასი</span>
          </div>
          <span className="text-2xl font-bold">₾{totalPrice}</span>
        </div>
      </motion.div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium 
                     transition-colors"
        >
          უკან
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!deliveryTimeline}
          className="px-6 py-2 bg-purple-600 text-white rounded-md font-medium
                     hover:bg-purple-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          შეჯამების ნახვა
        </button>
      </div>
    </motion.div>
  );
}

