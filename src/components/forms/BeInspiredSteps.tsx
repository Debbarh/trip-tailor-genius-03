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
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    activities: [],
    travelWith: '',
    budget: '',
    accommodation: ''
  });

  const handleNext = () => {
    if (currentStep < beInspiredStepConfigs.length - 1) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Dernière étape - créer l'inspiration
      if (isStepValid()) {
        const finalData = { ...formData, mode: 'inspire' };
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
    const step = beInspiredStepConfigs[currentStep];
    switch (step.id) {
      case 'activities':
        if (formData.activities.length === 0) {
          toast({
            title: "Activités manquantes",
            description: "Veuillez sélectionner au moins une activité qui vous passionne.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'travelWith':
        if (!formData.travelWith) {
          toast({
            title: "Compagnons de voyage manquants",
            description: "Veuillez indiquer avec qui vous voulez voyager.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'budget':
        if (!formData.budget) {
          toast({
            title: "Budget et période manquants",
            description: "Veuillez sélectionner votre budget et la durée de votre voyage.",
            variant: "destructive"
          });
          return false;
        }
        // Vérifier que budget et période sont sélectionnés
        try {
          const budgetData = JSON.parse(formData.budget);
          if (!budgetData.budget || !budgetData.period) {
            toast({
              title: "Informations incomplètes",
              description: "Veuillez sélectionner à la fois votre budget et la durée de voyage.",
              variant: "destructive"
            });
            return false;
          }
        } catch {
          toast({
            title: "Budget et période manquants",
            description: "Veuillez sélectionner votre budget et la durée de votre voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'accommodation':
        if (!formData.accommodation) {
          toast({
            title: "Hébergement manquant",
            description: "Veuillez choisir votre type d'hébergement préféré.",
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
  const isLastStep = currentStep === beInspiredStepConfigs.length - 1;

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

      {/* Progress Indicator - Compact */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <BeInspiredProgressIndicator currentStep={currentStep} />
          
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

          {/* Navigation - Always visible */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 0 ? 'Retour' : 'Précédent'}
            </Button>
            
            <div className="text-white/80 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 text-sm">
              Étape {currentStep + 1} sur {beInspiredStepConfigs.length}
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl shadow-2xl border-0"
            >
              {isLastStep ? 'Trouvez mon inspiration' : 'Suivant'}
              <ArrowRight className="w-4 h-4 ml-2" />
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
