
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
      {/* Titre simple */}
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">{currentStep}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Étape {progressCount} sur {totalSteps}
        </p>
      </div>
      
      {/* Barre de progression minimaliste */}
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-black h-1 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
