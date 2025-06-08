
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";
import ActivitiesStep from "./steps/ActivitiesStep";
import TravelCompanionsStep from "./steps/TravelCompanionsStep";
import BudgetStep from "./steps/BudgetStep";
import AccommodationStep from "./steps/AccommodationStep";
import BeInspiredProgressIndicator from "./components/BeInspiredProgressIndicator";
import BeInspiredHeader from "./components/BeInspiredHeader";

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

  const handleNext = () => {
    if (currentStep < beInspiredStepConfigs.length - 1) {
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
    const step = beInspiredStepConfigs[currentStep];
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
    const step = beInspiredStepConfigs[currentStep];
    
    switch (step.id) {
      case 'activities':
        return (
          <ActivitiesStep
            activities={formData.activities}
            setActivities={(activities) => setFormData({...formData, activities})}
          />
        );
      case 'travelWith':
        return (
          <TravelCompanionsStep
            travelWith={formData.travelWith}
            setTravelWith={(travelWith) => setFormData({...formData, travelWith})}
          />
        );
      case 'budget':
        return (
          <BudgetStep
            budget={formData.budget}
            setBudget={(budget) => setFormData({...formData, budget})}
          />
        );
      case 'accommodation':
        return (
          <AccommodationStep
            accommodation={formData.accommodation}
            setAccommodation={(accommodation) => setFormData({...formData, accommodation})}
          />
        );
      default:
        return null;
    }
  };

  const currentStepData = beInspiredStepConfigs[currentStep];

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

      <BeInspiredHeader onBack={onBack} />

      {/* Progress Indicator */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <BeInspiredProgressIndicator currentStep={currentStep} />
          
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
              Étape {currentStep + 1} sur {beInspiredStepConfigs.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl border-0"
            >
              {currentStep === beInspiredStepConfigs.length - 1 ? 'Trouvez mon inspiration' : 'Suivant'}
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
