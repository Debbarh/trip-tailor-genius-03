
import { useBeInspiredForm } from "@/hooks/useBeInspiredForm";
import BeInspiredStepContent from "./components/BeInspiredStepContent";
import BeInspiredNavigation from "./components/BeInspiredNavigation";
import BeInspiredLayout from "./components/BeInspiredLayout";

interface BeInspiredStepsProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const BeInspiredSteps = ({ onComplete, onBack }: BeInspiredStepsProps) => {
  const {
    currentStep,
    formData,
    setFormData,
    handleNext,
    handleBack,
    isLastStep
  } = useBeInspiredForm(onComplete);

  return (
    <BeInspiredLayout
      currentStep={currentStep}
      onBack={onBack}
      children={
        <BeInspiredStepContent
          currentStep={currentStep}
          formData={formData}
          setFormData={setFormData}
        />
      }
      navigation={
        <BeInspiredNavigation
          currentStep={currentStep}
          isLastStep={isLastStep}
          onNext={handleNext}
          onBack={() => handleBack(onBack)}
        />
      }
    />
  );
};

export default BeInspiredSteps;
