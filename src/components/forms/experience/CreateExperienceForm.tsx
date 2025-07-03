import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceTypeStep from './steps/ExperienceTypeStep';
import BasicInfoStep from './steps/BasicInfoStep';
import CategoryStep from './steps/CategoryStep';
import MediaStep from './steps/MediaStep';
import ReviewStep from './steps/ReviewStep';
import { ExperienceType } from '@/types/recommendations';

interface ExperienceFormData {
  type?: ExperienceType;
  title?: string;
  description?: string;
  location?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  categories?: {
    activities: string[];
    travelerType: string[];
    budget: string;
  };
  media?: {
    photos: string[];
    videos: string[];
  };
  practicalTips?: string[];
}

interface CreateExperienceFormProps {
  onBack: () => void;
}

const CreateExperienceForm = ({ onBack }: CreateExperienceFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ExperienceFormData>({});

  const steps = [
    { id: 1, title: "Type d'expérience", component: ExperienceTypeStep },
    { id: 2, title: "Informations de base", component: BasicInfoStep },
    { id: 3, title: "Catégorisation", component: CategoryStep },
    { id: 4, title: "Médias", component: MediaStep },
    { id: 5, title: "Validation", component: ReviewStep },
  ];

  const handleNext = (stepData: Partial<ExperienceFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = (finalData: Partial<ExperienceFormData>) => {
    const completeData = { ...formData, ...finalData };
    console.log('Soumission de recommandation:', completeData);
    // TODO: Intégrer avec Supabase pour sauvegarder
    onBack();
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8 pt-4">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Recommander une Expérience</h1>
            <p className="text-muted-foreground">
              Étape {currentStep} sur {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 rounded ${
                    index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <CurrentStepComponent
          data={formData}
          onNext={handleNext}
          onSubmit={currentStep === steps.length ? handleSubmit : undefined}
        />
      </div>
    </div>
  );
};

export default CreateExperienceForm;