
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { Building, Home, Star, Search, Filter } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';

const accommodationCategories = {
  'luxe': {
    label: 'Luxe & Prestige',
    color: 'purple',
    items: [
      { value: 'palais', label: 'Palais', description: 'Luxe royal et raffinement', icon: '🏰' },
      { value: 'hotel-5', label: 'Hôtel 5*', description: 'Excellence et prestige', icon: '⭐' },
      { value: 'hotel-4', label: 'Hôtel 4*', description: 'Confort et qualité premium', icon: '🌟' },
      { value: 'centres-villegiature', label: 'Centres de villégiature', description: 'Détente et loisirs haut de gamme', icon: '🌴' }
    ]
  },
  'confort': {
    label: 'Confort & Praticité',
    color: 'blue',
    items: [
      { value: 'hotel-3', label: 'Hôtel 3*', description: 'Bon rapport qualité-prix', icon: '✨' },
      { value: 'hotel-2', label: 'Hôtel 2*', description: 'Simple et économique', icon: '🏨' },
      { value: 'motel', label: 'Motel', description: 'Pratique et accessible', icon: '🛣️' },
      { value: 'appartements-services', label: 'Appartements avec services', description: 'Confort résidentiel avec services', icon: '🏢' }
    ]
  },
  'authentique': {
    label: 'Authentique & Local',
    color: 'orange',
    items: [
      { value: 'riad', label: 'Riad', description: 'Charme traditionnel marocain', icon: '🕌' },
      { value: 'gite', label: 'Gîte', description: 'Séjour à la campagne', icon: '🏡' },
      { value: 'chambres-hotes', label: 'Chambres d\'hôtes', description: 'Accueil familial personnalisé', icon: '🏠' },
      { value: 'maisons-hotes', label: 'Maisons d\'hôtes', description: 'Intimité et authenticité', icon: '🏘️' },
      { value: 'auberges', label: 'Auberges', description: 'Convivialité et économie', icon: '🎒' }
    ]
  },
  'nature': {
    label: 'Nature & Aventure',
    color: 'green',
    items: [
      { value: 'terrains-camping', label: 'Terrains de camping', description: 'Nature et aventure', icon: '⛺' },
      { value: 'glamping', label: 'Glamping', description: 'Camping de luxe avec confort', icon: '✨' },
      { value: 'sejours-ferme', label: 'Séjours à la ferme', description: 'Expérience rurale authentique', icon: '🚜' },
      { value: 'locations-vacances', label: 'Locations de vacances', description: 'Liberté et indépendance', icon: '🗝️' }
    ]
  },
  'specialise': {
    label: 'Spécialisé & Unique',
    color: 'pink',
    items: [
      { value: 'peniches', label: 'Péniches', description: 'Séjour flottant unique', icon: '🛥️' },
      { value: 'retraites', label: 'Retraites', description: 'Ressourcement et bien-être', icon: '🧘' }
    ]
  }
};

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
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(Object.keys(accommodationCategories));

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

  const handleCategoryToggle = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleShowAll = () => {
    setActiveCategories(Object.keys(accommodationCategories));
    setSearchTerm('');
  };

  const getFilteredAccommodations = () => {
    const allAccommodations = Object.entries(accommodationCategories)
      .filter(([category]) => activeCategories.includes(category))
      .flatMap(([category, data]) => 
        data.items.map(item => ({ ...item, category, categoryData: data }))
      );

    if (!searchTerm) return allAccommodations;

    return allAccommodations.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredAccommodations = getFilteredAccommodations();

  const getCategoryColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100';
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
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Type d'hébergement</h4>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un type d'hébergement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-lg py-3 border-2 border-gray-200 focus:border-purple-500"
          />
        </div>

        {/* Filtres par catégorie */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Filtrer par catégorie</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShowAll}
                className="text-xs"
              >
                Tout afficher
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(accommodationCategories).map(([category, data]) => {
              const isActive = activeCategories.includes(category);
              const count = data.items.length;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                    isActive 
                      ? getCategoryColorClasses(data.color, true) + ' border-transparent' 
                      : getCategoryColorClasses(data.color, false) + ' border-gray-200'
                  }`}
                >
                  {data.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Compteur de résultats */}
        <div className="text-sm text-gray-600">
          {filteredAccommodations.length} hébergement{filteredAccommodations.length > 1 ? 's' : ''} trouvé{filteredAccommodations.length > 1 ? 's' : ''}
        </div>

        {/* Grille des hébergements */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAccommodations.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTypeChange(option.value)}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                selectedType === option.value
                  ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl ring-4 ring-purple-100'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
              }`}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <h5 className="text-sm font-bold mb-1 leading-tight">{option.label}</h5>
              <p className="text-gray-600 text-xs line-clamp-2">{option.description}</p>
            </button>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h5 className="text-xl font-semibold text-gray-600 mb-2">Aucun hébergement trouvé</h5>
            <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
          </div>
        )}
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
