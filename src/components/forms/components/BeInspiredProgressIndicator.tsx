
import { Check } from "lucide-react";
import { beInspiredStepConfigs } from "@/constants/beInspiredSteps";

interface BeInspiredProgressIndicatorProps {
  currentStep: number;
}

const BeInspiredProgressIndicator = ({ currentStep }: BeInspiredProgressIndicatorProps) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {beInspiredStepConfigs.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500 ${
            index < currentStep
              ? 'bg-green-500 text-white shadow-xl scale-110'
              : index === currentStep
              ? 'bg-purple-500 text-white shadow-2xl scale-125'
              : 'bg-white/30 text-white/70 backdrop-blur-sm'
          }`}
        >
          {index < currentStep ? (
            <Check className="w-7 h-7" />
          ) : (
            <step.icon className="w-7 h-7" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BeInspiredProgressIndicator;
