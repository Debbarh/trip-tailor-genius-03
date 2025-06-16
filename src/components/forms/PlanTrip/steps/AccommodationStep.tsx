
import React from 'react';
import { StepProps } from '../../../../types/planTrip';
import { accommodationOptions } from "@/constants/beInspiredSteps";

export default function AccommodationStep({ formData, setFormData }: StepProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {accommodationOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setFormData({ ...formData, accommodation: option.id })}
          className={`group p-8 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            formData.accommodation === option.id
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
              : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
          }`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {option.emoji}
          </div>
          <div className="font-bold text-xl mb-2">{option.label}</div>
          <div className="text-sm opacity-70">{option.desc}</div>
        </button>
      ))}
    </div>
  );
}
