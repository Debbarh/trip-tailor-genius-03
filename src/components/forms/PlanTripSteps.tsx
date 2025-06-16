
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { PlanTripStepsProps, PlanTripFormData } from "@/types/planTrip";
import { stepConfigs } from "@/constants/planTripSteps";
import DestinationStep from "./PlanTrip/steps/DestinationStep";
import TravelWithStep from "./steps/TravelWithStep";
import BudgetAndFoodStep from "./PlanTrip/steps/BudgetAndFoodStep";
import AccommodationStep from "./PlanTrip/steps/AccommodationStep";
import ActivitiesStep from "./PlanTrip/steps/ActivitiesStep";
import DefaultStep from "./steps/DefaultStep";
import ProgressIndicator from "./components/ProgressIndicator";
import PlanTripHeader from "./components/PlanTripHeader";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SpecialSpecifications from "./PlanTrip/steps/components/SpecialSpecifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

const PlanTripSteps = ({ onComplete, onBack }: PlanTripStepsProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [formData, setFormData] = useState<PlanTripFormData>({
    destination: { countries: [] },
    travelWith: { segment: '', subSegment: '' },
    budgetAndFood: { budget: '', cuisine: [] },
    accommodation: { type: '', preferences: [] },
    activities: []
  });

  const [specifications, setSpecifications] = useState({
    dietary: [] as string[],
    accessibility: [] as string[],
    medical: '',
    specialRequests: '',
    customPreferences: [] as string[]
  });

  const handleNext = () => {
    if (currentStep < stepConfigs.length - 1) {
      if (isStepValid()) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Dernière étape - créer le voyage
      if (isStepValid()) {
        const finalData = { ...formData, specifications, mode: 'plan' };
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
      case 'destination':
        // La validation sera gérée par le composant DestinationStep lui-même
        return true;
      case 'travelWith':
        if (!formData.travelWith.segment) {
          toast({
            title: "Profil de voyage manquant",
            description: "Veuillez sélectionner votre profil de voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'budgetAndFood':
        if (!formData.budgetAndFood.budget) {
          toast({
            title: "Budget manquant",
            description: "Veuillez indiquer votre budget pour le voyage.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 'accommodation':
        if (!formData.accommodation.type) {
          toast({
            title: "Type d'hébergement manquant",
            description: "Veuillez sélectionner votre type d'hébergement préféré.",
            variant: "destructive"
          });
          return false;
        }
        return true;
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
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    const step = stepConfigs[currentStep];
    
    switch (step.id) {
      case 'destination':
        return <DestinationStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case 'travelWith':
        return <TravelWithStep formData={formData} setFormData={setFormData} />;
      case 'budgetAndFood':
        return <BudgetAndFoodStep formData={formData} setFormData={setFormData} />;
      case 'accommodation':
        return <AccommodationStep formData={formData} setFormData={setFormData} />;
      case 'activities':
        return <ActivitiesStep formData={formData} setFormData={setFormData} />;
      default:
        return <DefaultStep />;
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

            {/* Section des spécifications spéciales - visible seulement à la dernière étape */}
            {isLastStep && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <Collapsible open={showSpecifications} onOpenChange={setShowSpecifications}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-between p-4 text-base bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                    >
                      <span className="flex items-center gap-2">
                        ✨ Spécifications spéciales pour votre voyage (optionnel)
                      </span>
                      {showSpecifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-gray-600 mb-4 text-center text-sm">
                        Aidez-nous à personnaliser davantage votre expérience en nous indiquant vos besoins particuliers
                      </p>
                      <SpecialSpecifications 
                        specifications={specifications}
                        onSpecificationsChange={setSpecifications}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep !== 0 && (
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('planTrip.previous')}
              </Button>
              
              <div className="text-white/80 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 text-sm">
                {t('planTrip.step')} {currentStep + 1} {t('planTrip.of')} {stepConfigs.length}
              </div>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-2xl border-0"
              >
                {isLastStep ? t('planTrip.createTrip') : t('planTrip.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
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
