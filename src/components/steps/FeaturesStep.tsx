import { motion } from 'framer-motion';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useState } from 'react';

const featureCategories = [
  {
    name: 'დიზაინი და ვიზუალი',
    icon: '🎨',
    features: [
      {
        id: 'Dark/Light Mode Toggle',
        name: 'მუქი/ნათელი რეჟიმის გადართვა',
        description: 'მომხმარებლებს შეუძლიათ აირჩიონ მუქი ან ნათელი თემა მათი პრეფერენციის მიხედვით',
        price: 60,
        difficulty: 'მარტივი'
      },
      {
        id: 'Basic Animations',
        name: 'ძირითადი ანიმაციები',
        description: 'გლუვი გადასვლები, fade-in ეფექტები და მარტივი ანიმაციები',
        price: 100,
        difficulty: 'მარტივი'
      },
      {
        id: 'Moderate Animations',
        name: 'საშუალო დონის ანიმაციები',
        description: 'კომპლექსური ანიმაციები, სქროლ ეფექტები და ინტერაქტიული ელემენტები',
        price: 180,
        difficulty: 'საშუალო'
      },
      {
        id: 'Gallery Scrolling',
        name: 'გალერეის სქროლინგი',
        description: 'ავტომატური ან მანუალური სურათების გალერეა ანიმაციებით',
        price: 120,
        difficulty: 'საშუალო'
      },
      {
        id: 'Image Upload Feature',
        name: 'სურათის ატვირთვა (სჭირდება supabase)',
        description: 'მომხმარებლებს შეუძლიათ სურათების ატვირთვა და შენახვა',
        price: 150,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'ძიება და ფილტრაცია',
    icon: '🔍',
    features: [
      {
        id: 'Product/Content Search',
        name: 'პროდუქტის/კონტენტის ძიება',
        description: 'სწრაფი და ეფექტური ძიების სისტემა თქვენი პროდუქტებისთვის',
        price: 120,
        difficulty: 'საშუალო'
      },
      {
        id: 'Advanced Filtering',
        name: 'გაფილტვრა',
        description: 'მოწინავე ფილტრაცია კატეგორიის, ფასის, ფერის და სხვა პარამეტრების მიხედვით',
        price: 150,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'მომხმარებლის მართვა',
    icon: '👤',
    features: [
      {
        id: 'User Authentication',
        name: 'მომხმარებლის ავთენტიფიკაცია',
        description: 'უსაფრთხო შესვლა, რეგისტრაცია და პაროლის აღდგენა',
        price: 250,
        difficulty: 'რთული'
      },
      {
        id: 'User Dashboard',
        name: 'მომხმარებლის პანელი(სჭირდება firebase)',
        description: 'პერსონალური დაშბორდი სადაც მომხმარებელს შეუძლია მართოს თავისი ინფორმაცია',
        price: 220,
        difficulty: 'რთული'
      }
    ]
  },
  {
    name: 'ბლოგი და სოციალური(სჭირდება firebase)',
    icon: '📝',
    features: [
      {
        id: 'Full Blog System',
        name: 'სრული ბლოგის სისტემა',
        description: 'სტატიების დამატება, რედაქტირება, კატეგორიები და თეგები',
        price: 350,
        difficulty: 'რთული'
      },
      {
        id: 'Social Blog Platform',
        name: 'სოციალური ბლოგ პლატფორმა',
        description: 'სრული სოციალური პლატფორმა სადაც მომხმარებლებს შეუძლიათ ბლოგების გამოქვეყნება',
        price: 500,
        difficulty: 'ძალიან რთული'
      },
      {
        id: 'User Post System',
        name: 'მომხმარებლის პოსტის სისტემა',
        description: 'მომხმარებლებს შეუძლიათ შექმნან და გაზიარონ საკუთარი პოსტები',
        price: 280,
        difficulty: 'რთული'
      },
      {
        id: 'Comment System',
        name: 'კომენტარების სისტემა',
        description: 'კომენტარების დამატება, პასუხის გაცემა და მოდერაცია',
        price: 150,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'ელ-კომერცია',
    icon: '🛒',
    features: [
      {
        id: 'Basic E-commerce (სჭირდება firebase+supabase)',
        name: 'ძირითადი ელ-კომერცია',
        description: 'პროდუქტების ჩვენება ,თითოეული პროდუქტის დეტალური გვერდი, კატეგორიები (გადახდის ფუნქციონალის გარეშე)',
        price: 600,
        difficulty: 'ძალიან რთული'
      },
      {
        id: 'Add to Cart System',
        name: 'კალათაში დამატება',
        description: 'სრულად მოქმედი საყიდლების კალათა (გადახდის გარეშე)',
        price: 250,
        difficulty: 'რთული'
      },
      {
        id: 'Wishlist/Liked Items',
        name: 'სურვილების სია',
        description: 'მომხმარებლებს შეუძლიათ შეინახონ მოწონებული პროდუქტები',
        price: 150,
        difficulty: 'საშუალო'
      },
      {
        id: 'Product Display System',
        name: 'პროდუქტის ჩვენების სისტემა',
        description: 'პროფესიონალური პროდუქტების ჩვენება ფოტოებით და დეტალებით',
        price: 200,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'შეფასება და მიმოხილვა (სჭირდება firebase)',
    icon: '⭐',
    features: [
      {
        id: 'Star Rating System (0-5)',
        name: 'ვარსკვლავებით შეფასება (0-5)',
        description: 'მომხმარებლებს შეუძლიათ შეაფასონ 0-დან 5 ვარსკვლავამდე',
        price: 100,
        difficulty: 'საშუალო'
      },
      {
        id: 'Review System',
        name: 'მიმოხილვის სისტემა',
        description: 'სრული მიმოხილვის სისტემა ტექსტის, თარიღისა და ავტორის მითითებით',
        price: 200,
        difficulty: 'საშუალო'
      },
      {
        id: 'Rating with Comments',
        name: 'შეფასება კომენტარებით',
        description: 'ვარსკვლავები + დეტალური კომენტარები და საპასუხო ფუნქცია',
        price: 250,
        difficulty: 'რთული'
      }
    ]
  },
  {
    name: 'კომუნიკაცია',
    icon: '💬',
    features: [
      {
        id: 'Text Chat System',
        name: 'ტექსტური ჩატი',
        description: 'რეალურ დროში ტექსტური ჩატი Firebase-ით',
        price: 350,
        difficulty: 'რთული'
      },
      {
        id: 'Basic Video Chat (1-on-1)',
        name: 'ვიდეო ჩატი (1-ზე-1)',
        description: 'ძირითადი ვიდეო ჩატი ორ მომხმარებელს შორის',
        price: 500,
        difficulty: 'ძალიან რთული'
      },
      {
        id: 'SMS Notifications',
        name: 'SMS შეტყობინებები',
        description: 'ავტომატური SMS შეტყობინებები ახალი შეკვეთის, ან სხვა აქტივობების შესახებ',
        price: 180,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'კალენდარი და განრიგი',
    icon: '📅',
    features: [
      {
        id: 'Availability Calendar',
        name: 'ხელმისაწვდომობის კალენდარი დაჯავშნის ფუნქციით',
        description: 'კალენდარი რომელიც აჩვენებს თავისუფალ/დაკავებულ დროს და გვაძლევს შესაძლებლობას დავჯავშნოთ, ასევე ადმინისტრატორს შეუძლია მართოს თავისი ხელმისაწვდომობა პირადი კალენდარიდან.',
        price: 400,
        difficulty: 'რთული'
      }
    ]
  },
  {
    name: 'მრავალენოვანი',
    icon: '🌍',
    features: [
      {
        id: 'Translation (1 Language)',
        name: 'თარგმანი - 1 ენა',
        description: 'მთელი ვებსაიტის თარგმანი ერთ დამატებით ენაზე (ინგლისური, რუსული და ა.შ.)',
        price: 120,
        difficulty: 'საშუალო'
      },
      {
        id: 'Translation (2 Languages)',
        name: 'თარგმანი - 2 ენა',
        description: 'მთელი ვებსაიტის თარგმანი ორ დამატებით ენაზე',
        price: 220,
        difficulty: 'საშუალო'
      }
    ]
  },
  {
    name: 'მონაცემთა ბაზა',
    icon: '💾',
    features: [
      {
        id: 'Firebase Integration',
        name: 'Firebase ინტეგრაცია',
        description: 'Firebase-ის სრული ინტეგრაცია ტექსტური მონაცემებისთვის',
        price: 150,
        difficulty: 'საშუალო'
      },
      {
        id: 'Supabase Integration',
        name: 'Supabase ინტეგრაცია',
        description: 'Supabase-ის ინტეგრაცია სურათებისა და ფაილებისთვის',
        price: 150,
        difficulty: 'საშუალო'
      },
      {
        id: 'Data Management',
        name: 'მონაცემების მართვა',
        description: 'ადმინისტრატორის პანელი გლობალური მონაცემთა მართვისთვის',
        price: 180,
        difficulty: 'რთული'
      }
    ]
  }
];

const deliveryOptions = [
  {
    id: 'standard',
    name: 'სტანდარტული მიწოდება',
    description: '20-30 დღე',
    multiplier: 1
  },
  {
    id: 'priority',
    name: 'პრიორიტეტული მიწოდება',
    description: '15-20 დღე (+35%)',
    multiplier: 1.35
  },
  {
    id: 'urgent',
    name: 'სასწრაფო მიწოდება',
    description: '7-10 დღე (+100%)',
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

  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'დიზაინი და ვიზუალი'
  ]);
  const [showDifficulty, setShowDifficulty] = useState(false);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const toggleFeature = (featureId: string) => {
    let newFeatures = [...additionalFeatures];

    // If selecting a translation option, remove other translation options
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'მარტივი': return 'text-green-600 bg-green-50';
      case 'საშუალო': return 'text-yellow-600 bg-yellow-50';
      case 'რთული': return 'text-orange-600 bg-orange-50';
      case 'ძალიან რთული': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">დამატებითი ფუნქციები</h2>
        <button
          onClick={() => setShowDifficulty(!showDifficulty)}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
        >
          <Info className="w-4 h-4" />
          {showDifficulty ? 'დამალე სირთულე' : 'აჩვენე სირთულე'}
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {featureCategories.map((category) => (
          <div key={category.name} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                <span className="text-sm text-gray-500">
                  ({category.features.length} ფუნქცია)
                </span>
              </div>
              {expandedCategories.includes(category.name) ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {expandedCategories.includes(category.name) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-gray-50 space-y-3"
              >
                {category.features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    className={`border rounded-lg p-4 cursor-pointer bg-white relative
                               transition-all duration-200 ${additionalFeatures.includes(feature.id)
                        ? 'border-purple-500 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                    onClick={() => toggleFeature(feature.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-base font-semibold text-gray-800">
                            {feature.name}
                          </h4>
                          {showDifficulty && (
                            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(feature.difficulty)}`}>
                              {feature.difficulty}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-bold text-purple-600">
                          ₾{feature.price}
                        </span>
                      </div>
                    </div>
                    {additionalFeatures.includes(feature.id) && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Delivery Timeline */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">მიწოდების ვადა</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deliveryOptions.map((option) => (
            <motion.div
              key={option.id}
              className={`border rounded-lg p-6 cursor-pointer relative
                         transition-all duration-200 ${deliveryTimeline === option.id
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'
                }`}
              onClick={() => updateField('deliveryTimeline', option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {option.name}
              </h4>
              <p className="text-gray-600 text-sm">{option.description}</p>
              {deliveryTimeline === option.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Features Summary */}
      {additionalFeatures.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-purple-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            არჩეული ფუნქციები ({additionalFeatures.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {additionalFeatures.map((featureId) => {
              const feature = featureCategories
                .flatMap(cat => cat.features)
                .find(f => f.id === featureId);
              return feature ? (
                <span
                  key={featureId}
                  className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-purple-200"
                >
                  {feature.name}
                  <span className="text-purple-600 font-semibold">₾{feature.price}</span>
                </span>
              ) : null;
            })}
          </div>
        </motion.div>
      )}

      {/* Price Display */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span className="font-medium text-lg">სავარაუდო ფასი</span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold">₾{totalPrice}</span>
            {additionalFeatures.length > 0 && (
              <p className="text-sm text-purple-100 mt-1">
                {additionalFeatures.length} დამატებითი ფუნქცია
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 text-purple-600 hover:text-purple-700 font-medium 
                     transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          უკან
        </button>
        <button
          onClick={() => setStep(4)}
          disabled={!deliveryTimeline}
          className="px-6 py-3 bg-purple-600 text-white rounded-md font-medium
                     hover:bg-purple-700 transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
        >
          შეჯამების ნახვა
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}