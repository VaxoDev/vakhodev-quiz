import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export function SummaryStep() {
  const {
    fullName,
    businessType,
    businessName,
    email,
    phone,
    preferredColors,
    selectedSections,
    numberOfPages,
    additionalFeatures,
    deliveryTimeline,
    totalPrice,
    isSubmitting,
    error,
    submitQuiz,
    reset,
  } = useQuizStore();

  const getDeliveryText = () => {
    switch (deliveryTimeline) {
      case 'urgent':
        return 'სასწრაფო მიწოდება (5-7 დღე)';
      case 'priority':
        return 'პრიორიტეტული მიწოდება (10 დღე)';
      default:
        return 'სტანდარტული მიწოდება (15 დღე)';
    }
  };

  const handleSubmit = async () => {
    const success = await submitQuiz();
    if (success) {
      reset();
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800">შეჯამება</h2>
        <p className="text-gray-600 mt-2">აქ არის თქვენი ვებსაიტის მოთხოვნების შეჯამება</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">საკონტაქტო ინფორმაცია</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">სახელი:</dt>
              <dd className="font-medium text-gray-800">{fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">ელ-ფოსტა:</dt>
              <dd className="font-medium text-gray-800">{email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">ტელეფონი:</dt>
              <dd className="font-medium text-gray-800">{phone}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ბიზნესის ინფორმაცია</h3>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">ბიზნესის ტიპი:</dt>
              <dd className="font-medium text-gray-800">{businessType}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">ბიზნესის სახელი:</dt>
              <dd className="font-medium text-gray-800">{businessName}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">დიზაინის არჩევანი</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-600 mb-2">ფერთა პალიტრა:</dt>
              <dd className="flex flex-wrap gap-2">
                {preferredColors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                  >
                    {color}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-gray-600 mb-2">არჩეული სექციები:</dt>
              <dd className="flex flex-wrap gap-2">
                {selectedSections.map((section) => (
                  <span
                    key={section}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                  >
                    {section}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">გვერდების რაოდენობა:</dt>
              <dd className="font-medium text-gray-800">{numberOfPages}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ფუნქციები და ვადები</h3>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-600 mb-2">დამატებითი ფუნქციები:</dt>
              <dd className="space-y-2">
                {additionalFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">მიწოდების ვადა:</dt>
              <dd className="font-medium text-gray-800">{getDeliveryText()}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">სავარაუდო ჯამური ფასი</span>
            <span className="text-3xl font-bold">₾{totalPrice}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 border border-purple-600 text-purple-600 rounded-md font-medium
                     hover:bg-purple-50 transition-colors"
          disabled={isSubmitting}
        >
          ახლის დაწყება
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-purple-600 text-white rounded-md font-medium
                     hover:bg-purple-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              იგზავნება...
            </>
          ) : (
            'შეფასების გაგზავნა'
          )}
        </button>
      </div>
    </motion.div>
  );
}