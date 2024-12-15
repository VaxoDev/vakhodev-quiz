import { motion } from 'framer-motion';
import { Plus, Info } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useState } from 'react';

const colorOptions = [
  { name: 'თანამედროვე მეწამული', value: 'purple', class: 'bg-purple-500' },
  { name: 'ოკეანის ლურჯი', value: 'blue', class: 'bg-blue-500' },
  { name: 'ტყის მწვანე', value: 'green', class: 'bg-green-500' },
  { name: 'მზის ჩასვლის ნარინჯისფერი', value: 'orange', class: 'bg-orange-500' },
  { name: 'ლალის წითელი', value: 'red', class: 'bg-red-500' },
  { name: 'შუაღამის შავი', value: 'black', class: 'bg-gray-900' },
];

const defaultSections = [
  'მთავარი',
  'ჩვენს შესახებ',
  'სერვისები',
  'პორტფოლიო',
  'ბლოგი',
  'კონტაქტი',
  'გამოხმაურებები',
  'ფასები',
];

export function DesignPreferencesStep() {
  const { preferredColors, selectedSections, numberOfPages, updateField, setStep } = useQuizStore();
  const [newSection, setNewSection] = useState('');
  const [showPageInfo, setShowPageInfo] = useState(false);

  const toggleColor = (color: string) => {
    const newColors = preferredColors.includes(color)
      ? preferredColors.filter(c => c !== color)
      : [...preferredColors, color];
    updateField('preferredColors', newColors);
  };

  const toggleSection = (section: string) => {
    const newSections = selectedSections.includes(section)
      ? selectedSections.filter(s => s !== section)
      : [...selectedSections, section];
    updateField('selectedSections', newSections);
  };

  const addCustomSection = () => {
    if (newSection.trim() && !selectedSections.includes(newSection.trim())) {
      updateField('selectedSections', [...selectedSections, newSection.trim()]);
      setNewSection('');
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">დიზაინის პრეფერენციები</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">ფერთა პალიტრა</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorOptions.map((color) => (
              <motion.button
                key={color.value}
                onClick={() => toggleColor(color.value)}
                className={`${color.class} rounded-lg p-4 h-24 relative group
                           transition-transform hover:scale-105`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 ${
                  preferredColors.includes(color.value)
                    ? 'bg-white/20'
                    : 'bg-black/0 group-hover:bg-black/10'
                } rounded-lg transition-colors`}
                />
                <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
                  {color.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">ვებსაიტის სექციები</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {defaultSections.map((section) => (
              <motion.button
                key={section}
                onClick={() => toggleSection(section)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all
                           ${selectedSections.includes(section)
                             ? 'bg-purple-100 text-purple-700 border-purple-200'
                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                           }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {section}
              </motion.button>
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              placeholder="დაამატეთ სხვა სექცია"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addCustomSection}
              disabled={!newSection.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md font-medium
                       hover:bg-purple-700 transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              დამატება
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-700">გვერდების რაოდენობა</h3>
            <button
              onClick={() => setShowPageInfo(!showPageInfo)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {showPageInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-50 p-4 rounded-lg mb-4 text-sm text-gray-700"
            >
              <h4 className="font-semibold mb-2">ვებსაიტის დიზაინის ტიპები:</h4>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">ერთგვერდიანი (1 გვერდი):</span>
                  <ul className="ml-4 mt-1">
                    <li>• იდეალურია მარტივი პორტფოლიოსთვის ან სალენდინგო გვერდებისთვის</li>
                    <li>• ყველა კონტენტი ერთ გვერდზე</li>
                    <li>• სწრაფი ჩატვირთვა და მარტივი სამართავად</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">მრავალგვერდიანი (2-5 გვერდი):</span>
                  <ul className="ml-4 mt-1">
                    <li>• იდეალურია მცირე ბიზნესებისთვის ან პერსონალური ვებსაიტებისთვის</li>
                    <li>• კონტენტის უკეთესი ორგანიზება</li>
                    <li>• ყველა თემას თავისი გვერდი აქვს(ჩვენს შესახებ, მიღწევები,სერვისები და ასშ...)</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">კომპლექსური (6+ გვერდი):</span>
                  <ul className="ml-4 mt-1">
                    <li>• შესაფერისია ელ-კომერციისთვის ან კონტენტით მდიდარი საიტებისთვის</li>
                    <li>• გაუმჯობესებული ნავიგაცია და კატეგორიზაცია</li>
                    <li>• კონტენტის სრულყოფილი სტრუქტურა</li>
                  </ul>
                </li>
              </ul>
            </motion.div>
          )}

          <input
            type="range"
            min="1"
            max="20"
            value={numberOfPages}
            onChange={(e) => updateField('numberOfPages', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center mt-2 text-gray-600">
            {numberOfPages} {numberOfPages === 1 ? 'გვერდი' : 'გვერდი'}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium 
                     transition-colors"
        >
          უკან
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!preferredColors.length || !selectedSections.length}
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