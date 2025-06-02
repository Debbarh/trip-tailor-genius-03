
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: string;
  steps: string[];
  progressCount?: number;
  totalSteps?: number;
}

const ProgressIndicator = ({ 
  currentStep, 
  steps, 
  progressCount = 0, 
  totalSteps = 5 
}: ProgressIndicatorProps) => {
  const progress = (progressCount / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Titre simple et élégant */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-light text-gray-800 mb-2">{currentStep}</h1>
        <p className="text-sm text-gray-500">
          Étape {progressCount} sur {totalSteps}
        </p>
      </div>
      
      {/* Indicateurs minimalistes comme la page d'accueil */}
      <div className="flex justify-center space-x-2 mb-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index < progressCount ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
