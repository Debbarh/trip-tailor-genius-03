
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles, Users, DollarSign, Bed, Check, Heart, Camera, Globe, Star } from "lucide-react";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
  });

  const steps = [
    { 
      id: 'activities', 
      title: 'Vos Passions', 
      subtitle: 'Qu\'est-ce qui fait battre votre cœur de voyageur ?', 
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'travelWith', 
      title: 'Votre Tribu', 
      subtitle: 'Avec qui partagerez-vous ces instants magiques ?', 
      icon: Users,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'budget', 
      title: 'Votre Investissement Bonheur', 
      subtitle: 'Combien voulez-vous investir dans vos rêves ?', 
      icon: DollarSign,
      image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'accommodation', 
      title: 'Votre Cocon', 
      subtitle: 'Où aimez-vous poser vos valises pour rêver ?', 
      icon: Bed,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...formData, mode: 'inspire' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const isStepValid = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 'activities':
        return formData.activities.length > 0;
      case 'travelWith':
        return formData.travelWith !== '';
      case 'budget':
        return formData.budget !== '';
      case 'accommodation':
        return formData.accommodation !== '';
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'activities':
        const activityOptions = [
          { id: 'culture', label: 'Culture & Histoire', emoji: '🏛️', desc: 'Musées, monuments, traditions' },
          { id: 'nature', label: 'Nature & Paysages', emoji: '🌿', desc: 'Montagnes, forêts, océans' },
          { id: 'food', label: 'Gastronomie', emoji: '🍽️', desc: 'Saveurs locales et restaurants' },
          { id: 'nightlife', label: 'Vie Nocturne', emoji: '🌃', desc: 'Bars, clubs, spectacles' },
          { id: 'sport', label: 'Sports & Aventure', emoji: '🏔️', desc: 'Randonnée, sports extrêmes' },
          { id: 'relax', label: 'Détente & Spa', emoji: '🧘‍♀️', desc: 'Bien-être et relaxation' },
          { id: 'adventure', label: 'Aventure Extrême', emoji: '🪂', desc: 'Sensations fortes garanties' },
          { id: 'art', label: 'Art & Design', emoji: '🎨', desc: 'Galeries, artisanat, créativité' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Vos activités préférées</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sélectionnez tout ce qui vous fait vibrer. Plus vous en choisissez, plus nous pourrons vous surprendre !
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {activityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    const currentActivities = formData.activities || [];
                    const isSelected = currentActivities.includes(option.id);
                    const newActivities = isSelected
                      ? currentActivities.filter(id => id !== option.id)
                      : [...currentActivities, option.id];
                    setFormData({...formData, activities: newActivities});
                  }}
                  className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    formData.activities?.includes(option.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                      : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
                  }`}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {option.emoji}
                  </div>
                  <div className="font-bold text-lg mb-2">{option.label}</div>
                  <div className="text-sm opacity-70">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'travelWith':
        const travelOptions = [
          { id: 'solo', label: 'Seul(e)', emoji: '🧳', desc: 'Liberté totale et découvertes personnelles' },
          { id: 'couple', label: 'En couple', emoji: '💕', desc: 'Moments romantiques et complicité' },
          { id: 'family', label: 'En famille', emoji: '👨‍👩‍👧‍👦', desc: 'Souvenirs partagés avec vos proches' },
          { id: 'friends', label: 'Entre amis', emoji: '👥', desc: 'Fous rires et aventures collectives' },
          { id: 'group', label: 'En groupe', emoji: '🎭', desc: 'Voyage organisé avec d\'autres voyageurs' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre style de voyage</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chaque type de voyage a sa propre magie. Quel est le vôtre ?
              </p>
            </div>
            
            <div className="space-y-6">
              {travelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, travelWith: option.id})}
                  className={`group w-full p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    formData.travelWith === option.id
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xl'
                      : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {option.emoji}
                    </div>
                    <div>
                      <div className="font-bold text-2xl mb-1">{option.label}</div>
                      <div className="text-lg opacity-80">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'budget':
        const budgetOptions = [
          { id: 'low', label: 'Économique', desc: 'Moins de 500€', emoji: '💰', color: 'from-green-500 to-emerald-600' },
          { id: 'medium', label: 'Modéré', desc: '500€ - 1500€', emoji: '💳', color: 'from-blue-500 to-cyan-600' },
          { id: 'high', label: 'Confortable', desc: '1500€ - 3000€', emoji: '💎', color: 'from-purple-500 to-violet-600' },
          { id: 'luxury', label: 'Luxe', desc: 'Plus de 3000€', emoji: '👑', color: 'from-yellow-500 to-orange-600' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre budget voyage</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chaque budget peut créer des souvenirs extraordinaires. Quel est le vôtre ?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgetOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, budget: option.id})}
                  className={`group p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
                    formData.budget === option.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xl'
                      : 'border-gray-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center space-x-6 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {option.emoji}
                    </div>
                    <div>
                      <div className="font-bold text-2xl mb-1">{option.label}</div>
                      <div className="text-lg opacity-80">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'accommodation':
        const accommodationOptions = [
          { id: 'hotel', label: 'Hôtel', emoji: '🏨', desc: 'Confort et services' },
          { id: 'apartment', label: 'Appartement', emoji: '🏠', desc: 'Comme à la maison' },
          { id: 'hostel', label: 'Auberge', emoji: '🏡', desc: 'Ambiance conviviale' },
          { id: 'villa', label: 'Villa', emoji: '🏘️', desc: 'Luxe et intimité' },
          { id: 'camping', label: 'Camping', emoji: '⛺', desc: 'Au cœur de la nature' },
          { id: 'unusual', label: 'Insolite', emoji: '🏕️', desc: 'Expérience unique' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Bed className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre hébergement idéal</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Où préférez-vous vous réveiller chaque matin de votre aventure ?
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {accommodationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, accommodation: option.id})}
                  className={`group p-8 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    formData.accommodation === option.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
                      : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
                  }`}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {option.emoji}
                  </div>
                  <div className="font-bold text-xl mb-2">{option.label}</div>
                  <div className="text-sm opacity-70">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentStepData.image}
          alt={currentStepData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/40"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TASARINI</span>
          </div>

          <div className="w-24" />
        </nav>
      </header>

      {/* Progress Indicator */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
                  index < currentStep
                    ? 'bg-green-500 text-white shadow-xl scale-110'
                    : index === currentStep
                    ? 'bg-purple-500 text-white shadow-2xl scale-125'
                    : 'bg-white/30 text-white/70 backdrop-blur-sm'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-7 h-7" />
                ) : (
                  <step.icon className="w-7 h-7" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentStepData.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              {currentStepData.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Précédent
            </Button>
            
            <div className="text-white/80 backdrop-blur-sm bg-white/20 px-6 py-3 rounded-full border border-white/30">
              Étape {currentStep + 1} sur {steps.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl border-0"
            >
              {currentStep === steps.length - 1 ? 'Trouvez mon inspiration' : 'Suivant'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
