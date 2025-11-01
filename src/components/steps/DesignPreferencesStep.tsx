import { motion } from 'framer-motion';
import { Plus, Info, Palette, Layout } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useState } from 'react';

const colorSchemes = [
  { 
    name: 'მინიმალისტური', 
    value: 'minimal',
    primary: 'bg-slate-900',
    secondary: 'bg-slate-600',
    accent: 'bg-white',
    description: 'თეთრი და შავი, მარტივი და ელეგანტური'
  },
  { 
    name: 'ბიზნესი', 
    value: 'business',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-700',
    accent: 'bg-blue-100',
    description: 'პროფესიონალური ლურჯი და ნაცრისფერი'
  },
  { 
    name: 'თანამედროვე', 
    value: 'modern',
    primary: 'bg-purple-600',
    secondary: 'bg-pink-500',
    accent: 'bg-purple-100',
    description: 'მეწამული და ვარდისფერი, ახალგაზრდული'
  },
  { 
    name: 'ბუნება', 
    value: 'nature',
    primary: 'bg-green-600',
    secondary: 'bg-emerald-700',
    accent: 'bg-green-100',
    description: 'მწვანე ტონები, ეკოლოგიური'
  },
  { 
    name: 'ენერგიული', 
    value: 'energetic',
    primary: 'bg-orange-500',
    secondary: 'bg-red-500',
    accent: 'bg-orange-100',
    description: 'ნარინჯისფერი და წითელი, დინამიური'
  },
  { 
    name: 'ელეგანტური', 
    value: 'elegant',
    primary: 'bg-indigo-900',
    secondary: 'bg-gold-500',
    accent: 'bg-amber-200',
    description: 'მუქი ლურჯი და ოქროსფერი, პრემიუმ'
  },
];

const websiteTypes = [
  {
    type: 'ბიზნესი',
    icon: '💼',
    sections: ['მთავარი', 'ჩვენს შესახებ', 'სერვისები', 'პორტფოლიო', 'კონტაქტი'],
    description: 'კორპორატიული ვებსაიტი'
  },
  {
    type: 'მაღაზია',
    icon: '🛍️',
    sections: ['მთავარი', 'პროდუქტები', 'კატეგორიები', 'კალათა', 'კონტაქტი'],
    description: 'ელ-კომერციული საიტი'
  },
  {
    type: 'პორტფოლიო',
    icon: '🎨',
    sections: ['მთავარი', 'ჩემს შესახებ', 'პორტფოლიო', 'სერვისები', 'კონტაქტი'],
    description: 'პირადი ვებსაიტი'
  },
  {
    type: 'რესტორანი',
    icon: '🍽️',
    sections: ['მთავარი', 'მენიუ', 'ჩვენს შესახებ', 'დაჯავშნა', 'კონტაქტი'],
    description: 'საკვების ბიზნესი'
  },
  {
    type: 'ბლოგი',
    icon: '📝',
    sections: ['მთავარი', 'სტატიები', 'კატეგორიები', 'ჩემს შესახებ', 'კონტაქტი'],
    description: 'კონტენტ პლატფორმა'
  },
  {
    type: 'სხვა',
    icon: '✨',
    sections: ['მთავარი', 'ჩვენს შესახებ', 'კონტაქტი'],
    description: 'ინდივიდუალური'
  }
];

const commonSections = [
  { name: 'მთავარი', recommended: true, price: 0 },
  { name: 'ჩვენს შესახებ', recommended: true, price: 0 },
  { name: 'კონტაქტი', recommended: true, price: 0 },
  { name: 'სერვისები', recommended: false, price: 30 },
  { name: 'პროდუქტები', recommended: false, price: 40 },
  { name: 'პორტფოლიო', recommended: false, price: 35 },
  { name: 'ბლოგი', recommended: false, price: 50 },
  { name: 'გამოხმაურებები', recommended: false, price: 25 },
  { name: 'ფასები', recommended: false, price: 20 },
  { name: 'FAQ', recommended: false, price: 20 },
  { name: 'გალერეა', recommended: false, price: 35 },
  { name: 'გუნდი', recommended: false, price: 30 },
  { name: 'მენიუ', recommended: false, price: 40 },
  { name: 'დაჯავშნა', recommended: false, price: 45 },
  { name: 'კატეგორიები', recommended: false, price: 30 },
];

export function DesignPreferencesStep() {
  const { preferredColors, selectedSections, numberOfPages, updateField, setStep } = useQuizStore();
  const [newSection, setNewSection] = useState('');
  const [showPageInfo, setShowPageInfo] = useState(false);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string | null>(null);

  const toggleColor = (color: string) => {
    updateField('preferredColors', [color]);
  };

  const toggleSection = (section: string) => {
    const newSections = selectedSections.includes(section)
      ? selectedSections.filter(s => s !== section)
      : [...selectedSections, section];
    updateField('selectedSections', newSections);
  };

  const selectWebsiteType = (type: typeof websiteTypes[0]) => {
    setSelectedWebsiteType(type.type);
    updateField('selectedSections', type.sections);
  };

  const addCustomSection = () => {
    if (newSection.trim() && !selectedSections.includes(newSection.trim())) {
      updateField('selectedSections', [...selectedSections, newSection.trim()]);
      setNewSection('');
    }
  };

  // Calculate total price for selected sections
  const calculateSectionsPrice = () => {
    let total = 0;
    selectedSections.forEach(section => {
      const sectionData = commonSections.find(s => s.name === section);
      if (sectionData) {
        total += sectionData.price;
      }
    });
    return total;
  };

  const sectionsPrice = calculateSectionsPrice();
  const hasMinimumSections = selectedSections.length >= 3;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-2">დიზაინის პრეფერენციები</h2>
      <p className="text-gray-600 mb-8">აირჩიეთ ფერები და სექციები თქვენი ვებსაიტისთვის</p>

      <div className="space-y-10">
        {/* Color Schemes */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-700">ფერთა სქემა</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.value}
                onClick={() => toggleColor(scheme.value)}
                className={`border-2 rounded-lg p-4 text-left transition-all
                           ${preferredColors.includes(scheme.value)
                             ? 'border-purple-500 ring-2 ring-purple-200 bg-purple-50'
                             : 'border-gray-200 hover:border-purple-300'
                           }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-2 mb-3">
                  <div className={`w-12 h-12 rounded-md ${scheme.primary}`} />
                  <div className={`w-12 h-12 rounded-md ${scheme.secondary}`} />
                  <div className={`w-12 h-12 rounded-md border ${scheme.accent}`} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{scheme.name}</h4>
                <p className="text-sm text-gray-600">{scheme.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Website Type Quick Select */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-700">ვებსაიტის ტიპი</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">აირჩიეთ ტიპი ავტომატური სექციების დასამატებლად</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {websiteTypes.map((type) => (
              <motion.button
                key={type.type}
                onClick={() => selectWebsiteType(type)}
                className={`border-2 rounded-lg p-4 text-center transition-all
                           ${selectedWebsiteType === type.type
                             ? 'border-purple-500 bg-purple-50'
                             : 'border-gray-200 hover:border-purple-300'
                           }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="font-semibold text-sm text-gray-800">{type.type}</div>
                <div className="text-xs text-gray-500 mt-1">{type.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-700">ვებსაიტის სექციები(ფუნქციონალის გარეშე)</h3>
            <div className="text-sm text-purple-600 font-medium">
              სექციების ფასი: +₾{sectionsPrice}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            🔴 წითელი წერტილით მონიშნული სექციები რეკომენდირებულია • უნდა აირჩიოთ მინიმუმ 3 სექცია
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
            {commonSections.map((section) => {
              const isSelected = selectedSections.includes(section.name);
              
              return (
                <motion.button
                  key={section.name}
                  onClick={() => toggleSection(section.name)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all relative
                           ${isSelected
                             ? 'bg-purple-500 text-white shadow-md'
                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                           }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{section.name}</span>
                    {section.price > 0 && (
                      <span className={`text-xs ${isSelected ? 'text-purple-100' : 'text-purple-600'}`}>
                        +₾{section.price}
                      </span>
                    )}
                  </div>
                  {section.recommended && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" 
                          title="რეკომენდირებული" />
                  )}
                  {isSelected && (
                    <div className="absolute top-1 right-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Custom Section Input */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomSection()}
              placeholder="დაამატეთ თქვენი სექცია (უფასო)"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              onClick={addCustomSection}
              disabled={!newSection.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium
                       hover:bg-purple-700 transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              დამატება
            </button>
          </div>

          {/* Selected Sections Display */}
          {selectedSections.length > 0 && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">
                  არჩეული სექციები ({selectedSections.length})
                  {selectedSections.length < 3 && (
                    <span className="text-red-600 ml-2">
                      - დაამატეთ კიდევ {3 - selectedSections.length}
                    </span>
                  )}
                </p>
                <p className="text-sm font-bold text-purple-600">
                  სულ: +₾{sectionsPrice}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSections.map((section) => {
                  const sectionData = commonSections.find(s => s.name === section);
                  const price = sectionData?.price || 0;
                  return (
                    <span
                      key={section}
                      className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-purple-300"
                    >
                      {section}
                      {price > 0 && (
                        <span className="text-purple-600 font-semibold">+₾{price}</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Warning if less than 3 sections */}
          {selectedSections.length < 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2"
            >
              <span className="text-yellow-600">⚠️</span>
              <p className="text-sm text-yellow-700">
                გთხოვთ აირჩიოთ მინიმუმ 3 სექცია გასაგრძელებლად
              </p>
            </motion.div>
          )}
        </div>

        {/* Number of Pages */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-700">გვერდების რაოდენობა</h3>
            <button
              onClick={() => setShowPageInfo(!showPageInfo)}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          {showPageInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg mb-4 text-sm border border-purple-100"
            >
              <h4 className="font-semibold mb-3 text-gray-800">ვებსაიტის ტიპები:</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-md">
                  <span className="font-medium text-purple-700">ერთგვერდიანი (1 გვერდი) - ₾300</span>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• სალენდინგო გვერდი, პორტფოლიო</li>
                    <li>• ყველა ინფორმაცია ერთ გვერდზე</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <span className="font-medium text-purple-700">მრავალგვერდიანი (2-5 გვერდი) - ₾500+</span>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• მცირე ბიზნესი, სერვისები</li>
                    <li>• თითოეული თემა ცალკე გვერდზე</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-md">
                  <span className="font-medium text-purple-700">კომპლექსური (6+ გვერდი) - ₾900+</span>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• ელ-კომერცია, დიდი კონტენტი</li>
                    <li>• მრავალი კატეგორია და გვერდი</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-50 p-6 rounded-lg">
            <input
              type="range"
              min="1"
              max="20"
              value={numberOfPages}
              onChange={(e) => updateField('numberOfPages', parseInt(e.target.value))}
              className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-6
                         [&::-webkit-slider-thumb]:h-6
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-purple-600
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:shadow-lg
                         hover:[&::-webkit-slider-thumb]:bg-purple-700"
            />
            <div className="text-center mt-4">
              <span className="text-4xl font-bold text-purple-600">{numberOfPages}</span>
              <span className="text-gray-600 ml-2">გვერდი</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t">
        <button
          onClick={() => setStep(1)}
          className="px-6 py-3 text-purple-600 hover:text-purple-700 font-medium 
                     transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          უკან
        </button>
        <div className="text-sm text-gray-500">
          ნაბიჯი 2 / 4
        </div>
        <button
          onClick={() => setStep(3)}
          disabled={!preferredColors.length || !hasMinimumSections}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium
                     hover:bg-purple-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
          title={!hasMinimumSections ? 'აირჩიეთ მინიმუმ 3 სექცია' : ''}
        >
          შემდეგი ნაბიჯი
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}