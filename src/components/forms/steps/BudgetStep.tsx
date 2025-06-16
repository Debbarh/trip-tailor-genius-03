
import { budgetOptions } from "@/constants/beInspiredSteps";
import { useState } from "react";

interface BudgetStepProps {
  budget: string;
  setBudget: (budget: string) => void;
}

const periodOptions = [
  { id: 'weekend', label: 'Week-end (2-3 jours)', emoji: '🏃‍♂️' },
  { id: 'week', label: 'Une semaine', emoji: '📅' },
  { id: 'two-weeks', label: 'Deux semaines', emoji: '🗓️' },
  { id: 'month', label: 'Un mois', emoji: '📆' },
  { id: 'longer', label: 'Plus d\'un mois', emoji: '🌍' }
];

const BudgetStep = ({ budget, setBudget }: BudgetStepProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const handleBudgetSelect = (budgetId: string) => {
    const budgetData = { budget: budgetId, period: selectedPeriod };
    setBudget(JSON.stringify(budgetData));
  };

  const handlePeriodSelect = (periodId: string) => {
    setSelectedPeriod(periodId);
    if (budget) {
      try {
        const currentData = JSON.parse(budget);
        const budgetData = { ...currentData, period: periodId };
        setBudget(JSON.stringify(budgetData));
      } catch {
        const budgetData = { budget: '', period: periodId };
        setBudget(JSON.stringify(budgetData));
      }
    }
  };

  // Extraire les données actuelles
  let currentBudget = '';
  let currentPeriod = selectedPeriod;
  try {
    if (budget) {
      const data = JSON.parse(budget);
      currentBudget = data.budget || '';
      currentPeriod = data.period || selectedPeriod;
    }
  } catch {
    currentBudget = budget;
  }

  return (
    <div className="space-y-8">
      {/* Sélection de la période */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quelle est la durée de votre voyage ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {periodOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handlePeriodSelect(option.id)}
              className={`group p-4 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                currentPeriod === option.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30'
              }`}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-semibold text-sm">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sélection du budget */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quel est votre budget par personne ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleBudgetSelect(option.id)}
              className={`group p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
                currentBudget === option.id
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
    </div>
  );
};

export default BudgetStep;
