import { motion } from 'framer-motion';
import { useQuizStore } from '../../store/quizStore';

export function BusinessInfoStep() {
  const { 
    fullName, 
    businessType, 
    businessName, 
    email, 
    phone,
    updateField, 
    setStep 
  } = useQuizStore();

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">მოგვიყევით თქვენი ბიზნესის შესახებ</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            სრული სახელი <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="გიორგი მაისურაძე"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ელ-ფოსტა <span className="text-gray-400">(არასავალდებულო)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="giorgi@magaliti.ge"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ტელეფონის ნომერი <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="+995 555 12 34 56"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ბიზნესის ტიპი <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={businessType}
            onChange={(e) => updateField('businessType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="მაგ: ელ-კომერცია, პორტფოლიო, ბლოგი..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ბიზნესის სახელი <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => updateField('businessName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                       focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="თქვენი ბიზნესის სახელი"
            required
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(0)}
          className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium 
                     transition-colors"
        >
          უკან
        </button>
        <button
          onClick={() => setStep(2)}
          disabled={!fullName || !businessType || !businessName || !phone}
          className="px-6 py-2 bg-purple-600 text-white rounded-md font-medium
                     hover:bg-purple-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          შემდეგი ნაბიჯი
        </button>
      </div>
    </motion.div>
  );
}