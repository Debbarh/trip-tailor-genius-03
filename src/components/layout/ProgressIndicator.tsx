
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: string;
  steps: string[];
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
  const currentIndex = steps.indexOf(currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
              index <= currentIndex
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-500"
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-600">
          Étape {currentIndex + 1} sur {steps.length}
        </span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
