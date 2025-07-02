
import React from 'react';
import { accommodationOptions } from '@/constants/formData';

interface UnifiedAccommodationStepProps {
  mode: 'simple' | 'advanced';
  selectedAccommodation: string;
  onAccommodationChange: (accommodation: string) => void;
  selectedPreferences?: string[];
  onPreferenceToggle?: (preference: string) => void;
}

export default function UnifiedAccommodationStep({ 
  mode,
  selectedAccommodation, 
  onAccommodationChange,
  selectedPreferences = [],
  onPreferenceToggle
}: UnifiedAccommodationStepProps) {
  
  if (mode === 'simple') {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Quel type d'hébergement préférez-vous ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onAccommodationChange(option.id)}
              className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                selectedAccommodation === option.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
                  : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-bold text-lg mb-2">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Advanced mode - for now just return the simple version
  // In a real implementation, this would include preferences and detailed options
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Quel type d'hébergement préférez-vous ?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onAccommodationChange(option.id)}
              className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                selectedAccommodation === option.id
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div className="font-bold text-lg mb-2">{option.label}</div>
              <div className="text-sm opacity-70">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Placeholder for preferences - would be implemented with full preference system */}
      {mode === 'advanced' && selectedPreferences && onPreferenceToggle && (
        <div className="mt-8 p-6 bg-purple-50 rounded-3xl border-2 border-purple-200">
          <h5 className="font-bold text-lg text-purple-900 mb-4">
            Préférences sélectionnées :
          </h5>
          <div className="text-sm text-purple-700">
            Mode avancé - Préférences détaillées à implémenter
          </div>
        </div>
      )}
    </div>
  );
}
