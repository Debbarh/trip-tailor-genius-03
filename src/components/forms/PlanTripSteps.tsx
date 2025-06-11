
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PlanTripStepsProps, PlanTripFormData } from "@/types/planTrip";
import { stepConfigs } from "@/constants/planTripSteps";
import DestinationStep from "./steps/DestinationStep";
import TravelWithStep from "./steps/TravelWithStep";
import DefaultStep from "./steps/DefaultStep";
import ProgressIndicator from "./components/ProgressIndicator";
import PlanTripHeader from "./components/PlanTripHeader";

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PlanTripFormData>({
    destination: { countries: [] },
    travelWith: { segment: '', subSegment: '' },
    budgetAndFood: { budget: '', cuisine: [] },
    accommodation: { type: '', preferences: [] },
    activities: []
  });

  const handleNext = () => {
    if (currentStep < stepConfigs.length - 1) {
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
    const step = stepConfigs[currentStep];
    switch (step.id) {
      case 'destination':
        return formData.destination.countries.length > 0 && 
               formData.destination.countries.every(country => 
                 country.cities.length > 0 && 
                 country.cities.every(city => city.startDate && city.endDate)
               );
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
    const step = stepConfigs[currentStep];
    
    switch (step.id) {
      case 'destination':
        return <DestinationStep formData={formData} setFormData={setFormData} />;
      case 'travelWith':
        return <TravelWithStep formData={formData} setFormData={setFormData} />;
      default:
        return <DefaultStep />;
    }
  };

  const currentStepData = stepConfigs[currentStep];

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

      <PlanTripHeader onBack={onBack} />

      {/* Progress Indicator */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator currentStep={currentStep} />
          
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
              Étape {currentStep + 1} sur {stepConfigs.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl border-0"
            >
              {currentStep === stepConfigs.length - 1 ? 'Créer mon voyage' : 'Suivant'}
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
