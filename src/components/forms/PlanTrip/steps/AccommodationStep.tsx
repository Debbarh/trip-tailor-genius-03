import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { Building, Home, Star } from 'lucide-react';
import { ScrollArea, ScrollBar } from '../../../ui/scroll-area';

const accommodationTypes = [
  { value: 'palais', label: 'Palais', description: 'Luxe royal et raffinement', icon: '🏰' },
  { value: 'hotel-5', label: 'Hôtel 5*', description: 'Excellence et prestige', icon: '⭐' },
  { value: 'hotel-4', label: 'Hôtel 4*', description: 'Confort et qualité', icon: '🌟' },
  { value: 'hotel-3', label: 'Hôtel 3*', description: 'Bon rapport qualité-prix', icon: '✨' },
  { value: 'hotel-2', label: 'Hôtel 2*', description: 'Simple et économique', icon: '🏨' },
  { value: 'motel', label: 'Motel', description: 'Pratique et accessible', icon: '🛣️' },
  { value: 'riad', label: 'Riad', description: 'Charme traditionnel marocain', icon: '🕌' },
  { value: 'gite', label: 'Gîte', description: 'Séjour à la campagne', icon: '🏡' },
  { value: 'chambres-hotes', label: 'Chambres d\'hôtes', description: 'Accueil familial personnalisé', icon: '🏠' },
  { value: 'maisons-hotes', label: 'Maisons d\'hôtes', description: 'Intimité et authenticité', icon: '🏘️' },
  { value: 'locations-vacances', label: 'Locations de vacances', description: 'Liberté et indépendance', icon: '🗝️' },
  { value: 'centres-villegiature', label: 'Centres de villégiature', description: 'Détente et loisirs', icon: '🌴' },
  { value: 'terrains-camping', label: 'Terrains de camping', description: 'Nature et aventure', icon: '⛺' },
  { value: 'auberges', label: 'Auberges', description: 'Convivialité et économie', icon: '🎒' },
  { value: 'appartements-services', label: 'Appartements avec services', description: 'Confort résidentiel avec services', icon: '🏢' },
  { value: 'peniches', label: 'Péniches', description: 'Séjour flottant unique', icon: '🛥️' },
  { value: 'sejours-ferme', label: 'Séjours à la ferme', description: 'Expérience rurale authentique', icon: '🚜' },
  { value: 'glamping', label: 'Glamping', description: 'Camping de luxe', icon: '✨' },
  { value: 'retraites', label: 'Retraites', description: 'Ressourcement et bien-être', icon: '🧘' }
];

const preferences = [
  { value: 'wifi', label: 'WiFi gratuit', icon: '📶' },
  { value: 'pool', label: 'Piscine', icon: '🏊' },
  { value: 'spa', label: 'Spa & Bien-être', icon: '🧘' },
  { value: 'breakfast', label: 'Petit déjeuner inclus', icon: '🥐' },
  { value: 'parking', label: 'Parking', icon: '🚗' },
  { value: 'fitness', label: 'Salle de sport', icon: '💪' },
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'concierge', label: 'Service de conciergerie', icon: '🛎️' }
];

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
    <div className="space-y-12">
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

      {/* Accommodation Type avec défilement horizontal */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Type d'hébergement</h4>
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {accommodationTypes.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTypeChange(option.value)}
                className={`flex-none w-48 p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                  selectedType === option.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl ring-4 ring-purple-100'
                    : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <h5 className="text-lg font-bold mb-1 truncate">{option.label}</h5>
                <p className="text-gray-600 text-xs line-clamp-2">{option.description}</p>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Preferences */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Services souhaités</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {preferences.map((option) => {
            const isSelected = selectedPreferences.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => handlePreferenceToggle(option.value)}
                className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg'
                    : 'border-gray-200 hover:border-yellow-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <span className="font-semibold text-xs">{option.label}</span>
              </button>
            );
          })}
        </div>

        {selectedPreferences.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <h5 className="font-semibold text-yellow-900 mb-2">⭐ Services sélectionnés :</h5>
            <div className="flex flex-wrap gap-2">
              {selectedPreferences.map(pref => {
                const prefData = preferences.find(p => p.value === pref);
                return (
                  <span key={pref} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {prefData?.icon} {prefData?.label}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
