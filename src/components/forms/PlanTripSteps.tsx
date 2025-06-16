import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { PlanTripStepsProps, PlanTripFormData } from "@/types/planTrip";
import { stepConfigs } from "@/constants/planTripSteps";
import ActivitiesStep from "./steps/ActivitiesStep";
import TravelCompanionsStep from "./PlanTrip/steps/TravelCompanionsStep";
import BudgetStep from "./steps/BudgetStep";
import AccommodationStep from "./steps/AccommodationStep";
import ProgressIndicator from "./components/ProgressIndicator";
import PlanTripHeader from "./components/PlanTripHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PlanTripFormData>({
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
  });

  const handleNext = () => {
    if (currentStep < stepConfigs.length - 1) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Dernière étape - créer le voyage
      if (isStepValid()) {
        const finalData = { ...formData, mode: 'plan' };
        onComplete(finalData);
      }
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
      case 'activities':
        if (formData.activities.length === 0) {
          toast({
            title: "Activités manquantes",
            description: "Veuillez sélectionner au moins une activité qui vous intéresse.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'travelWith':
        if (!formData.travelWith) {
          toast({
            title: "Compagnon de voyage manquant",
            description: "Veuillez indiquer avec qui vous voyagez.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'budget':
        if (!formData.budget) {
          toast({
            title: "Budget manquant",
            description: "Veuillez indiquer votre budget pour le voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'accommodation':
        if (!formData.accommodation) {
          toast({
            title: "Type d'hébergement manquant",
            description: "Veuillez sélectionner votre type d'hébergement préféré.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = stepConfigs[currentStep];
    
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
            formData={formData}
            setFormData={setFormData}
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

  const currentStepData = stepConfigs[currentStep];
  const isLastStep = currentStep === stepConfigs.length - 1;

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

      {/* Progress Indicator - Compact */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator currentStep={currentStep} />
          
          <div className="text-center text-white mt-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {currentStepData.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            <div className="text-white/80 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 text-sm">
              Étape {currentStep + 1} sur {stepConfigs.length}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-2xl border-0"
            >
              {isLastStep ? 'Planifiez mon voyage' : 'Suivant'}
              <ArrowRight className="w-4 h-4 ml-2" />
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
