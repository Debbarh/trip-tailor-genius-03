
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, DollarSign, Bed, Activity } from "lucide-react";

interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: '',
    travelWith: '',
    budget: '',
    accommodation: '',
    activities: []
  });

  const steps = [
    { id: 'destination', title: 'Destination', icon: MapPin },
    { id: 'travelWith', title: 'Avec qui', icon: Users },
    { id: 'budget', title: 'Budget', icon: DollarSign },
    { id: 'accommodation', title: 'Logement', icon: Bed },
    { id: 'activities', title: 'Activités', icon: Activity }
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
    return formData[step.id as keyof typeof formData] !== '' && 
           formData[step.id as keyof typeof formData] !== undefined &&
           (Array.isArray(formData[step.id as keyof typeof formData]) ? 
            (formData[step.id as keyof typeof formData] as any[]).length > 0 : true);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'destination':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                Où souhaitez-vous aller ?
              </h2>
              <p className="text-gray-500">Choisissez votre destination de rêve</p>
            </div>
            
            <div className="max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Ville, pays ou région..."
                className="w-full h-12 px-4 border border-gray-300 rounded-lg text-center focus:outline-none focus:border-black transition-colors"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>
          </div>
        );

      case 'travelWith':
        const travelOptions = [
          { id: 'solo', label: 'Seul(e)' },
          { id: 'couple', label: 'En couple' },
          { id: 'family', label: 'En famille' },
          { id: 'friends', label: 'Entre amis' }
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                Avec qui voyagez-vous ?
              </h2>
              <p className="text-gray-500">Sélectionnez votre type de voyage</p>
            </div>
            
            <div className="max-w-sm mx-auto space-y-3">
              {travelOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, travelWith: option.id})}
                  className={`w-full h-12 rounded-lg border-2 text-center transition-all ${
                    formData.travelWith === option.id
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'budget':
        const budgetOptions = [
          { id: 'low', label: 'Économique', desc: '< 500€' },
          { id: 'medium', label: 'Modéré', desc: '500€ - 1500€' },
          { id: 'high', label: 'Confortable', desc: '1500€ - 3000€' },
          { id: 'luxury', label: 'Luxe', desc: '> 3000€' }
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                Quel est votre budget ?
              </h2>
              <p className="text-gray-500">Pour une personne, transport inclus</p>
            </div>
            
            <div className="max-w-sm mx-auto space-y-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, budget: option.id})}
                  className={`w-full h-14 rounded-lg border-2 text-center transition-all ${
                    formData.budget === option.id
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm opacity-75">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'accommodation':
        const accommodationOptions = [
          { id: 'hotel', label: 'Hôtel' },
          { id: 'apartment', label: 'Appartement' },
          { id: 'hostel', label: 'Auberge de jeunesse' },
          { id: 'villa', label: 'Villa/Maison' }
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                Type de logement ?
              </h2>
              <p className="text-gray-500">Où souhaitez-vous séjourner</p>
            </div>
            
            <div className="max-w-sm mx-auto space-y-3">
              {accommodationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({...formData, accommodation: option.id})}
                  className={`w-full h-12 rounded-lg border-2 text-center transition-all ${
                    formData.accommodation === option.id
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 'activities':
        const activityOptions = [
          { id: 'culture', label: 'Culture & Histoire' },
          { id: 'nature', label: 'Nature & Paysages' },
          { id: 'food', label: 'Gastronomie' },
          { id: 'nightlife', label: 'Vie nocturne' },
          { id: 'sport', label: 'Sports & Aventure' },
          { id: 'relax', label: 'Détente & Spa' }
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-800 mb-2">
                Vos activités préférées ?
              </h2>
              <p className="text-gray-500">Sélectionnez plusieurs options</p>
            </div>
            
            <div className="max-w-sm mx-auto space-y-3">
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
                  className={`w-full h-12 rounded-lg border-2 text-center transition-all ${
                    formData.activities?.includes(option.id)
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Progress simple */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            {currentStep + 1} sur {steps.length}
          </p>
        </div>

        {/* Contenu de l'étape */}
        {renderStepContent()}

        {/* Boutons */}
        <div className="mt-12 space-y-4">
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Créer mon voyage' : 'Suivant'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            onClick={handleBack}
            variant="ghost"
            className="w-full h-12 text-gray-600 hover:text-black"
          >
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanTripSteps;
