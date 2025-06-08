
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, MapPin, Users, DollarSign, Bed, Activity, Check } from "lucide-react";

interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: { country: '', city: '', dates: '' },
    travelWith: { segment: '', subSegment: '' },
    budgetAndFood: { budget: '', cuisine: [] },
    accommodation: { type: '', preferences: [] },
    activities: []
  });

  const steps = [
    { id: 'destination', title: 'Destinations', subtitle: 'Où souhaitez-vous aller ?', icon: MapPin },
    { id: 'travelWith', title: 'Avec qui', subtitle: 'Définissez votre style de voyage', icon: Users },
    { id: 'budgetAndFood', title: 'Budget & Cuisine', subtitle: 'Vos préférences financières et culinaires', icon: DollarSign },
    { id: 'accommodation', title: 'Logement', subtitle: 'Votre hébergement idéal', icon: Bed },
    { id: 'activities', title: 'Activités', subtitle: 'Vos expériences de rêve', icon: Activity }
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
      case 'destination':
        return formData.destination.country && formData.destination.city;
      case 'travelWith':
        return formData.travelWith.segment;
      case 'budgetAndFood':
        return formData.budgetAndFood.budget;
      case 'accommodation':
        return formData.accommodation.type;
      case 'activities':
        return formData.activities.length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'destination':
        const countries = [
          { code: 'MA', name: 'Maroc', cities: ['Marrakech', 'Casablanca', 'Fès', 'Rabat'] },
          { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice'] },
          { code: 'ES', name: 'Espagne', cities: ['Madrid', 'Barcelone', 'Séville', 'Valence'] },
          { code: 'IT', name: 'Italie', cities: ['Rome', 'Milan', 'Florence', 'Venise'] },
          { code: 'GR', name: 'Grèce', cities: ['Athènes', 'Thessalonique', 'Santorin', 'Mykonos'] },
          { code: 'TR', name: 'Turquie', cities: ['Istanbul', 'Ankara', 'Antalya', 'Cappadoce'] }
        ];

        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <label className="block text-lg font-medium text-gray-800">Choisissez votre destination</label>
              <div className="grid grid-cols-2 gap-4">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setFormData({
                      ...formData, 
                      destination: { ...formData.destination, country: country.name, city: '' }
                    })}
                    className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                      formData.destination.country === country.name
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-lg">{country.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {formData.destination.country && (
              <div className="space-y-6">
                <label className="block text-lg font-medium text-gray-800">Sélectionnez une ville</label>
                <div className="grid grid-cols-2 gap-4">
                  {countries
                    .find(c => c.name === formData.destination.country)
                    ?.cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setFormData({
                          ...formData,
                          destination: { ...formData.destination, city }
                        })}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                          formData.destination.city === city
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <span className="font-medium">{city}</span>
                      </button>
                    ))
                  }
                </div>
              </div>
            )}

            {formData.destination.city && (
              <div className="space-y-6">
                <label className="block text-lg font-medium text-gray-800">Période de voyage</label>
                <input
                  type="text"
                  placeholder="Ex: 15-22 Juillet 2024"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-lg"
                  value={formData.destination.dates}
                  onChange={(e) => setFormData({
                    ...formData,
                    destination: { ...formData.destination, dates: e.target.value }
                  })}
                />
              </div>
            )}
          </div>
        );

      case 'travelWith':
        const segments = [
          { id: 'solo', name: 'Solo', desc: 'Voyage en solitaire', emoji: '🧳' },
          { id: 'couple', name: 'Couple', desc: 'Voyage romantique', emoji: '💕' },
          { id: 'family', name: 'Famille', desc: 'Avec enfants', emoji: '👨‍👩‍👧‍👦' },
          { id: 'friends', name: 'Amis', desc: 'Entre amis', emoji: '👥' }
        ];

        const subSegments = {
          solo: ['Aventure', 'Détente', 'Culture', 'Rencontres'],
          couple: ['Romantique', 'Aventure', 'Luxe', 'Économique'],
          family: ['Enfants friendly', 'Éducatif', 'Aventure douce', 'Plage'],
          friends: ['Fête', 'Aventure', 'Culture', 'Gastronomie']
        };

        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <label className="block text-lg font-medium text-gray-800">Avec qui voyagez-vous ?</label>
              <div className="space-y-4">
                {segments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setFormData({
                      ...formData,
                      travelWith: { segment: segment.id, subSegment: '' }
                    })}
                    className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 ${
                      formData.travelWith.segment === segment.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{segment.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{segment.name}</div>
                        <div className="text-sm opacity-75">{segment.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {formData.travelWith.segment && (
              <div className="space-y-6">
                <label className="block text-lg font-medium text-gray-800">Style spécifique</label>
                <div className="grid grid-cols-2 gap-4">
                  {subSegments[formData.travelWith.segment as keyof typeof subSegments]?.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setFormData({
                        ...formData,
                        travelWith: { ...formData.travelWith, subSegment: sub }
                      })}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                        formData.travelWith.subSegment === sub
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <span className="font-medium">{sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      // ... autres cases pour budgetAndFood, accommodation, activities
      default:
        return (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Étape en cours de développement
            </h3>
            <p className="text-gray-600">
              Cette étape sera bientôt disponible.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
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
                    ? 'bg-blue-500 text-white'
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Créer mon voyage' : 'Suivant'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PlanTripSteps;
