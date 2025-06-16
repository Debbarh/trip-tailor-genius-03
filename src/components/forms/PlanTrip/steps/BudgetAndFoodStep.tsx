
import React from 'react';
import { StepProps } from '../../../../types/planTrip';
import { budgetOptions } from "@/constants/beInspiredSteps";

export default function BudgetAndFoodStep({ formData, setFormData }: StepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {budgetOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setFormData({ ...formData, budget: option.id })}
          className={`group p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
            formData.budget === option.id
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
  );
}
