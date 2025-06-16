
import React from 'react';
import { StepProps } from '../../../../types/planTrip';
import { travelOptions } from "@/constants/beInspiredSteps";

export default function TravelCompanionsStep({ formData, setFormData }: StepProps) {
  return (
    <div className="space-y-6">
      {travelOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setFormData({ ...formData, travelWith: option.id })}
          className={`group w-full p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            formData.travelWith === option.id
              ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xl'
              : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/50'
          }`}
        >
          <div className="flex items-center space-x-6">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
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
