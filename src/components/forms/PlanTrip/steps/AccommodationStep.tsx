
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { Building } from 'lucide-react';
import AccommodationTypeSelector from './components/AccommodationTypeSelector';
import AccommodationPreferences from './components/AccommodationPreferences';

export default function AccommodationStep({ formData, setFormData }: StepProps) {
  const [selectedType, setSelectedType] = useState(formData.accommodation.type);
  const [selectedPreferences, setSelectedPreferences] = useState(formData.accommodation.preferences);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setFormData({
      ...formData,
      accommodation: {
        ...formData.accommodation,
        type
      }
    });
  };

  const handlePreferenceToggle = (preference: string) => {
    const updatedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter(p => p !== preference)
      : [...selectedPreferences, preference];
    
    setSelectedPreferences(updatedPreferences);
    setFormData({
      ...formData,
      accommodation: {
        ...formData.accommodation,
        preferences: updatedPreferences
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Building className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          Votre hébergement idéal
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choisissez le type d'hébergement et les services qui vous correspondent
        </p>
      </div>

      {/* Type d'hébergement avec recherche et filtres */}
      <AccommodationTypeSelector
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />

      {/* Preferences */}
      <AccommodationPreferences
        selectedPreferences={selectedPreferences}
        onPreferenceToggle={handlePreferenceToggle}
      />
    </div>
  );
}
