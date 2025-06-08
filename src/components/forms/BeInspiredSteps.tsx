
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Sparkles, Users, DollarSign, Bed, Check } from "lucide-react";

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
    { id: 'activities', title: 'Activités', subtitle: 'Qu\'est-ce qui vous inspire ?', icon: Sparkles },
    { id: 'travelWith', title: 'Avec qui', subtitle: 'Votre style de voyage', icon: Users },
    { id: 'budget', title: 'Budget', subtitle: 'Votre gamme de prix', icon: DollarSign },
    { id: 'accommodation', title: 'Logement', subtitle: 'Votre hébergement préféré', icon: Bed }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
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
          { id: 'culture', label: 'Culture & Histoire', emoji: '🏛️' },
          { id: 'nature', label: 'Nature & Paysages', emoji: '🌿' },
          { id: 'food', label: 'Gastronomie', emoji: '🍽️' },
          { id: 'nightlife', label: 'Vie nocturne', emoji: '🌃' },
          { id: 'sport', label: 'Sports & Aventure', emoji: '🏔️' },
          { id: 'relax', label: 'Détente & Spa', emoji: '🧘‍♀️' },
          { id: 'adventure', label: 'Aventure extrême', emoji: '🪂' },
          { id: 'art', label: 'Art & Design', emoji: '🎨' }
        ];

        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600">
                Sélectionnez vos activités préférées (plusieurs choix possibles)
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
                  className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                    formData.activities?.includes(option.id)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-3xl mb-3">{option.emoji}</div>
                  <div className="font-semibold">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'travelWith':
        const travelOptions = [
          { id: 'solo', label: 'Seul(e)', emoji: '🧳' },
          { id: 'couple', label: 'En couple', emoji: '💕' },
          { id: 'family', label: 'En famille', emoji: '👨‍👩‍👧‍👦' },
          { id: 'friends', label: 'Entre amis', emoji: '👥' },
          { id: 'group', label: 'En groupe', emoji: '👨‍👩‍👧‍👦' }
        ];

        return (
          <div className="space-y-8">
            <div className="space-y-4">
              {travelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, travelWith: option.id})}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                    formData.travelWith === option.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-semibold text-lg">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'budget':
        const budgetOptions = [
          { id: 'low', label: 'Économique', desc: '< 500€', emoji: '💰' },
          { id: 'medium', label: 'Modéré', desc: '500€ - 1500€', emoji: '💳' },
          { id: 'high', label: 'Confortable', desc: '1500€ - 3000€', emoji: '💎' },
          { id: 'luxury', label: 'Luxe', desc: '> 3000€', emoji: '👑' }
        ];

        return (
          <div className="space-y-6">
            {budgetOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFormData({...formData, budget: option.id})}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                  formData.budget === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{option.emoji}</span>
                  <div>
                    <div className="font-semibold text-lg">{option.label}</div>
                    <div className="text-sm opacity-75">{option.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'accommodation':
        const accommodationOptions = [
          { id: 'hotel', label: 'Hôtel', emoji: '🏨' },
          { id: 'apartment', label: 'Appartement', emoji: '🏠' },
          { id: 'hostel', label: 'Auberge de jeunesse', emoji: '🏡' },
          { id: 'villa', label: 'Villa/Maison', emoji: '🏘️' },
          { id: 'camping', label: 'Camping', emoji: '⛺' },
          { id: 'unusual', label: 'Logement insolite', emoji: '🏕️' }
        ];

        return (
          <div className="grid grid-cols-2 gap-4">
            {accommodationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFormData({...formData, accommodation: option.id})}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                  formData.accommodation === option.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-3">{option.emoji}</div>
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TASARINI</span>
            </div>

            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex justify-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-lg text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-8 md:p-12">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Précédent
          </Button>
          
          <div className="text-sm text-gray-500">
            Étape {currentStep + 1} sur {steps.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Trouvez mon inspiration' : 'Suivant'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default BeInspiredSteps;
