
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Star, Users, Wallet, Bed } from "lucide-react";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interests: [],
    travelWith: '',
    budget: '',
    accommodation: { type: '', preferences: [] }
  });

  const steps = [
    { id: 1, title: 'Intérêts', icon: Star, description: 'Qu\'est-ce qui vous passionne ?' },
    { id: 2, title: 'Voyageurs', icon: Users, description: 'Avec qui voyagez-vous ?' },
    { id: 3, title: 'Budget', icon: Wallet, description: 'Quel est votre budget ?' },
    { id: 4, title: 'Hébergement', icon: Bed, description: 'Où préférez-vous loger ?' }
  ];

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.interests.length > 0;
      case 2: return formData.travelWith;
      case 3: return formData.budget;
      case 4: return formData.accommodation.type;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ mode: 'inspire', ...formData });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = isStepValid(currentStep);

  const renderProgressIndicator = () => (
    <div className="w-full mb-12">
      {/* Progress bar */}
      <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const IconComponent = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                ${isCompleted ? 'bg-green-500 text-white shadow-lg' : 
                  isCurrent ? 'bg-purple-500 text-white shadow-lg scale-110' : 
                  'bg-gray-200 text-gray-400'}
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <IconComponent className="w-6 h-6" />
                )}
              </div>
              <span className={`text-sm font-medium text-center px-2 ${
                isCurrent ? 'text-purple-600' : 
                isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep = () => {
    const currentStepData = steps[currentStep - 1];
    
    return (
      <div className="max-w-4xl mx-auto">
        {/* Step header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentStepData.title}
          </h2>
          <p className="text-lg text-gray-600">
            {currentStepData.description}
          </p>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {renderStepContent()}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-lg font-medium mb-6 block">Sélectionnez vos centres d'intérêt</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Culture', icon: '🏛️', description: 'Musées, monuments' },
                  { name: 'Gastronomie', icon: '🍽️', description: 'Cuisine locale' },
                  { name: 'Nature', icon: '🌿', description: 'Parcs, randonnées' },
                  { name: 'Shopping', icon: '🛍️', description: 'Boutiques, marchés' },
                  { name: 'Vie nocturne', icon: '🌙', description: 'Bars, clubs' },
                  { name: 'Sport', icon: '⚽', description: 'Activités sportives' },
                  { name: 'Détente', icon: '🧘', description: 'Spa, plages' },
                  { name: 'Aventure', icon: '🏔️', description: 'Sports extrêmes' },
                  { name: 'Art', icon: '🎨', description: 'Galeries, ateliers' },
                  { name: 'Histoire', icon: '📚', description: 'Sites historiques' },
                  { name: 'Famille', icon: '👨‍👩‍👧‍👦', description: 'Activités enfants' },
                  { name: 'Photographie', icon: '📸', description: 'Lieux instagrammables' }
                ].map((interest) => {
                  const isSelected = formData.interests.includes(interest.name);
                  return (
                    <div
                      key={interest.name}
                      onClick={() => {
                        const newInterests = isSelected 
                          ? formData.interests.filter(i => i !== interest.name)
                          : [...formData.interests, interest.name];
                        updateFormData('interests', newInterests);
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-1 block">{interest.icon}</span>
                        <span className="font-medium text-sm block">{interest.name}</span>
                        <span className="text-xs text-gray-500">{interest.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                {formData.interests.length} intérêt(s) sélectionné(s)
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Composition du groupe</Label>
              <RadioGroup 
                onValueChange={(value) => updateFormData('travelWith', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { value: 'solo', label: 'Voyageur solo', description: 'Je voyage seul(e)', icon: '🧳' },
                  { value: 'couple', label: 'En couple', description: 'Voyage romantique', icon: '💕' },
                  { value: 'family', label: 'En famille', description: 'Avec enfants', icon: '👨‍👩‍👧‍👦' },
                  { value: 'friends', label: 'Entre amis', description: 'Groupe d\'amis', icon: '👥' },
                  { value: 'business', label: 'Voyage d\'affaires', description: 'Professionnel', icon: '💼' },
                  { value: 'senior', label: 'Seniors', description: 'Groupe de seniors', icon: '👴' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <span className="text-xl">{option.icon}</span>
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">{option.label}</Label>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-4 block">Budget estimé par personne</Label>
                <RadioGroup onValueChange={(value) => updateFormData('budget', value)} className="space-y-3">
                  {[
                    { value: 'low', label: 'Budget serré', description: 'Moins de 500€', color: 'border-green-200 bg-green-50', icon: '💚' },
                    { value: 'medium', label: 'Budget modéré', description: '500€ - 1500€', color: 'border-blue-200 bg-blue-50', icon: '💙' },
                    { value: 'high', label: 'Budget confortable', description: '1500€ - 3000€', color: 'border-purple-200 bg-purple-50', icon: '💜' },
                    { value: 'luxury', label: 'Budget luxe', description: 'Plus de 3000€', color: 'border-yellow-200 bg-yellow-50', icon: '💛' }
                  ].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${option.color}`}>
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span className="text-xl">{option.icon}</span>
                      <div className="flex-1">
                        <Label htmlFor={option.value} className="font-medium cursor-pointer">{option.label}</Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-4 block">Type d'hébergement préféré</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'hotel', label: 'Hôtel', icon: '🏨', description: 'Service complet' },
                    { value: 'boutique', label: 'Hôtel boutique', icon: '🏩', description: 'Charme et caractère' },
                    { value: 'airbnb', label: 'Location privée', icon: '🏠', description: 'Comme à la maison' },
                    { value: 'resort', label: 'Resort', icon: '🏖️', description: 'Tout inclus' },
                    { value: 'hostel', label: 'Auberge', icon: '🛏️', description: 'Économique et social' },
                    { value: 'unique', label: 'Hébergement atypique', icon: '🏰', description: 'Expérience unique' }
                  ].map((option) => (
                    <div
                      key={option.value}
                      onClick={() => updateFormData('accommodation', { ...formData.accommodation, type: option.value })}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                        formData.accommodation.type === option.value 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">{option.icon}</span>
                        <span className="font-medium text-sm block">{option.label}</span>
                        <span className="text-xs text-gray-500">{option.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">Critères importants</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'location', label: 'Emplacement central' },
                    { id: 'view', label: 'Belle vue' },
                    { id: 'pool', label: 'Piscine' },
                    { id: 'spa', label: 'Spa/Wellness' },
                    { id: 'wifi', label: 'Wifi gratuit' },
                    { id: 'breakfast', label: 'Petit-déjeuner' },
                    { id: 'parking', label: 'Parking' },
                    { id: 'gym', label: 'Salle de sport' }
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={pref.id}
                        onCheckedChange={(checked) => {
                          const currentPrefs = formData.accommodation.preferences || [];
                          const newPrefs = checked 
                            ? [...currentPrefs, pref.id]
                            : currentPrefs.filter(p => p !== pref.id);
                          updateFormData('accommodation', { ...formData.accommodation, preferences: newPrefs });
                        }}
                      />
                      <Label htmlFor={pref.id} className="cursor-pointer">{pref.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {renderProgressIndicator()}
        
        <div className="mb-16">
          {renderStep()}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            className="px-8 py-3 text-base font-medium"
          >
            Précédent
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Étape {currentStep} sur {steps.length}
            </p>
            {!canProceed && currentStep < 4 && (
              <p className="text-sm text-amber-600">
                Veuillez compléter cette étape pour continuer
              </p>
            )}
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-8 py-3 text-base font-medium transition-all ${
              currentStep === 4 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-purple-600 hover:bg-purple-700'
            } ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {currentStep === 4 ? 'Trouvez mon voyage' : 'Suivant'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeInspiredSteps;
