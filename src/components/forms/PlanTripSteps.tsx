
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, MapPin, Users, DollarSign, Bed, Activity, Check, Plane, Heart, Camera, Globe } from "lucide-react";

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
    { 
      id: 'destination', 
      title: 'Votre Destination de Rêve', 
      subtitle: 'Où votre aventure commence-t-elle ?', 
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'travelWith', 
      title: 'Vos Compagnons d\'Aventure', 
      subtitle: 'Avec qui partagerez-vous ces moments magiques ?', 
      icon: Users,
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'budgetAndFood', 
      title: 'Budget & Saveurs', 
      subtitle: 'Définissons votre budget et vos envies culinaires', 
      icon: DollarSign,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'accommodation', 
      title: 'Votre Refuge', 
      subtitle: 'Où rêvez-vous de poser vos valises ?', 
      icon: Bed,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    },
    { 
      id: 'activities', 
      title: 'Expériences Inoubliables', 
      subtitle: 'Quelles aventures vous font vibrer ?', 
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete({ ...formData, mode: 'plan' });
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
          { code: 'MA', name: 'Maroc', cities: ['Marrakech', 'Casablanca', 'Fès', 'Rabat'], emoji: '🇲🇦' },
          { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Nice'], emoji: '🇫🇷' },
          { code: 'ES', name: 'Espagne', cities: ['Madrid', 'Barcelone', 'Séville', 'Valence'], emoji: '🇪🇸' },
          { code: 'IT', name: 'Italie', cities: ['Rome', 'Milan', 'Florence', 'Venise'], emoji: '🇮🇹' },
          { code: 'GR', name: 'Grèce', cities: ['Athènes', 'Thessalonique', 'Santorin', 'Mykonos'], emoji: '🇬🇷' },
          { code: 'TR', name: 'Turquie', cities: ['Istanbul', 'Ankara', 'Antalya', 'Cappadoce'], emoji: '🇹🇷' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Choisissez votre destination</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Laissez-vous guider par votre cœur. Où rêvez-vous de créer vos prochains souvenirs ?
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => setFormData({
                    ...formData, 
                    destination: { ...formData.destination, country: country.name, city: '' }
                  })}
                  className={`group p-8 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    formData.destination.country === country.name
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xl'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
                  }`}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {country.emoji}
                  </div>
                  <div className="font-bold text-xl">{country.name}</div>
                </button>
              ))}
            </div>

            {formData.destination.country && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">
                    Quelle ville vous appelle ?
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {countries
                    .find(c => c.name === formData.destination.country)
                    ?.cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => setFormData({
                          ...formData,
                          destination: { ...formData.destination, city }
                        })}
                        className={`group p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                          formData.destination.city === city
                            ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30'
                        }`}
                      >
                        <Camera className="w-6 h-6 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-lg">{city}</span>
                      </button>
                    ))
                  }
                </div>
              </div>
            )}

            {formData.destination.city && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">
                    Quand vivrez-vous cette aventure ?
                  </h4>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Ex: 15-22 Juillet 2024"
                    className="w-full p-6 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-lg text-center font-medium bg-white shadow-sm"
                    value={formData.destination.dates}
                    onChange={(e) => setFormData({
                      ...formData,
                      destination: { ...formData.destination, dates: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'travelWith':
        const segments = [
          { id: 'solo', name: 'Solo', desc: 'Liberté totale et découvertes personnelles', emoji: '🎒' },
          { id: 'couple', name: 'En Couple', desc: 'Moments romantiques et complicité', emoji: '💕' },
          { id: 'family', name: 'En Famille', desc: 'Souvenirs partagés et joie des enfants', emoji: '👨‍👩‍👧‍👦' },
          { id: 'friends', name: 'Entre Amis', desc: 'Fous rires et aventures collectives', emoji: '👥' }
        ];

        return (
          <div className="space-y-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Avec qui voyagez-vous ?</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Chaque type de voyage a sa magie. Avec qui partagerez-vous ces moments précieux ?
              </p>
            </div>
            
            <div className="space-y-6">
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setFormData({
                    ...formData,
                    travelWith: { segment: segment.id, subSegment: '' }
                  })}
                  className={`group w-full p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    formData.travelWith.segment === segment.id
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-xl'
                      : 'border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/50'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {segment.emoji}
                    </div>
                    <div>
                      <div className="font-bold text-2xl mb-1">{segment.name}</div>
                      <div className="text-lg opacity-80">{segment.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Étape en préparation
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Cette étape sera bientôt disponible pour rendre votre voyage encore plus parfait.
            </p>
          </div>
        );
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
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
                    ? 'bg-blue-500 text-white shadow-2xl scale-125'
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl border-0"
            >
              {currentStep === steps.length - 1 ? 'Créer mon voyage' : 'Suivant'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default PlanTripSteps;
