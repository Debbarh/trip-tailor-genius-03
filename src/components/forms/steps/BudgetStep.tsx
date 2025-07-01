
import UnifiedBudgetStep from './UnifiedBudgetStep';

interface BudgetStepProps {
  budget: string;
  setBudget: (budget: string) => void;
}

const BudgetStep = ({ budget, setBudget }: BudgetStepProps) => {
  return (
    <UnifiedBudgetStep
      mode="withFood"
      budget={budget}
      setBudget={setBudget}
    />
  );
};

export default BudgetStep;
