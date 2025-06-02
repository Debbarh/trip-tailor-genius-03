
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
      {/* Step Pills */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              "flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
              index < progressCount
                ? "bg-cyan-600 text-white"
                : index === progressCount
                ? "bg-cyan-600 text-white"
                : "bg-gray-200 text-gray-500"
            )}
          >
            <span className="mr-2">✓</span>
            {step}
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-cyan-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
