
import { DollarSign } from "lucide-react";
import { budgetOptions } from "@/constants/beInspiredSteps";

interface BudgetStepProps {
  budget: string;
  setBudget: (budget: string) => void;
}

const BudgetStep = ({ budget, setBudget }: BudgetStepProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre budget voyage</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chaque budget peut créer des souvenirs extraordinaires. Quel est le vôtre ?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setBudget(option.id)}
            className={`group p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
              budget === option.id
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xl'
                : 'border-gray-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30'
            }`}
          >
            <div className="flex items-center space-x-6 relative z-10">
              <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {option.emoji}
              </div>
              <div>
                <div className="font-bold text-2xl mb-1">{option.label}</div>
                <div className="text-lg opacity-80">{option.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BudgetStep;
