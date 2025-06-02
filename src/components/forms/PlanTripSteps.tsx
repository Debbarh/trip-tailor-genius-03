
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, MapPin, Calendar, Users, Wallet, Bed, Star } from "lucide-react";

interface PlanTripStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: { country: '', city: '', dates: '' },
    travelWith: '',
    budget: '',
    accommodation: { type: '', preferences: [] },
    activities: []
  });

  const steps = [
    { id: 1, title: 'Destination', icon: MapPin, description: 'Où voulez-vous aller ?' },
    { id: 2, title: 'Voyageurs', icon: Users, description: 'Avec qui voyagez-vous ?' },
    { id: 3, title: 'Budget', icon: Wallet, description: 'Quel est votre budget ?' },
    { id: 4, title: 'Hébergement', icon: Bed, description: 'Où voulez-vous loger ?' },
    { id: 5, title: 'Activités', icon: Star, description: 'Que voulez-vous faire ?' }
  ];

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.destination.country && formData.destination.city;
      case 2: return formData.travelWith;
      case 3: return formData.budget;
      case 4: return formData.accommodation.type;
      case 5: return formData.activities.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ mode: 'plan', ...formData });
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
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 5) * 100}%` }}
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
                  isCurrent ? 'bg-blue-500 text-white shadow-lg scale-110' : 
                  'bg-gray-200 text-gray-400'}
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <IconComponent className="w-6 h-6" />
                )}
              </div>
              <span className={`text-sm font-medium text-center px-2 ${
                isCurrent ? 'text-blue-600' : 
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Pays de destination</Label>
                <Select onValueChange={(value) => updateFormData('destination', { ...formData.destination, country: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Choisir un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="france">🇫🇷 France</SelectItem>
                    <SelectItem value="spain">🇪🇸 Espagne</SelectItem>
                    <SelectItem value="italy">🇮🇹 Italie</SelectItem>
                    <SelectItem value="morocco">🇲🇦 Maroc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">Ville</Label>
                <Select 
                  onValueChange={(value) => updateFormData('destination', { ...formData.destination, city: value })}
                  disabled={!formData.destination.country}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Choisir une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="rome">Rome</SelectItem>
                    <SelectItem value="marrakech">Marrakech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base font-medium">Dates de voyage</Label>
                <Input 
                  placeholder="Du 06/02/2025 au 13/02/2025"
                  className="h-12 text-base"
                  onChange={(e) => updateFormData('destination', { ...formData.destination, dates: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ajouter une destination
                </Button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Type de voyageur</Label>
              <RadioGroup 
                onValueChange={(value) => updateFormData('travelWith', value)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {[
                  { value: 'solo', label: 'Voyageur solo', description: 'Je voyage seul(e)' },
                  { value: 'couple', label: 'En couple', description: 'Voyage romantique à deux' },
                  { value: 'family', label: 'En famille', description: 'Avec enfants' },
                  { value: 'friends', label: 'Entre amis', description: 'Groupe d\'amis' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} />
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
                <Label className="text-lg font-medium mb-4 block">Budget par personne</Label>
                <RadioGroup onValueChange={(value) => updateFormData('budget', value)} className="space-y-3">
                  {[
                    { value: 'low', label: 'Économique', description: 'Moins de 500€', color: 'border-green-200 bg-green-50' },
                    { value: 'medium', label: 'Modéré', description: '500€ - 1500€', color: 'border-blue-200 bg-blue-50' },
                    { value: 'high', label: 'Confortable', description: '1500€ - 3000€', color: 'border-purple-200 bg-purple-50' },
                    { value: 'luxury', label: 'Luxe', description: 'Plus de 3000€', color: 'border-yellow-200 bg-yellow-50' }
                  ].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${option.color}`}>
                      <RadioGroupItem value={option.value} id={option.value} />
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
                <Label className="text-lg font-medium mb-4 block">Type d'hébergement</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'hotel', label: 'Hôtel', icon: '🏨' },
                    { value: 'airbnb', label: 'Airbnb', icon: '🏠' },
                    { value: 'resort', label: 'Resort', icon: '🏖️' },
                    { value: 'hostel', label: 'Auberge', icon: '🛏️' }
                  ].map((option) => (
                    <div
                      key={option.value}
                      onClick={() => updateFormData('accommodation', { ...formData.accommodation, type: option.value })}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                        formData.accommodation.type === option.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-3xl mb-2 block">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium mb-4 block">Préférences importantes</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Proximité centre-ville',
                    'Piscine',
                    'Wifi gratuit',
                    'Parking',
                    'Petit-déjeuner inclus',
                    'Climatisation'
                  ].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox id={pref} />
                      <Label htmlFor={pref} className="cursor-pointer">{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <Label className="text-lg font-medium mb-6 block">Centres d'intérêt</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Culture', icon: '🏛️' },
                  { name: 'Gastronomie', icon: '🍽️' },
                  { name: 'Nature', icon: '🌿' },
                  { name: 'Shopping', icon: '🛍️' },
                  { name: 'Vie nocturne', icon: '🌙' },
                  { name: 'Sport', icon: '⚽' },
                  { name: 'Détente', icon: '🧘' },
                  { name: 'Aventure', icon: '🏔️' }
                ].map((interest) => {
                  const isSelected = formData.activities.includes(interest.name);
                  return (
                    <div
                      key={interest.name}
                      onClick={() => {
                        const newActivities = isSelected 
                          ? formData.activities.filter(a => a !== interest.name)
                          : [...formData.activities, interest.name];
                        updateFormData('activities', newActivities);
                      }}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg text-center ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-3xl mb-2 block">{interest.icon}</span>
                      <span className="font-medium text-sm">{interest.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
            {!canProceed && currentStep < 5 && (
              <p className="text-sm text-amber-600">
                Veuillez compléter cette étape pour continuer
              </p>
            )}
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed}
            className={`px-8 py-3 text-base font-medium transition-all ${
              currentStep === 5 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {currentStep === 5 ? 'Créer mon voyage' : 'Suivant'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanTripSteps;
