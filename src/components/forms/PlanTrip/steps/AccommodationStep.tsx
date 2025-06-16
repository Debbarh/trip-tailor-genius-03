
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
  // Services de base
  { value: 'wifi', label: 'WiFi gratuit', icon: '📶', category: 'services' },
  { value: 'breakfast', label: 'Petit déjeuner inclus', icon: '🥐', category: 'services' },
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️', category: 'services' },
  { value: 'room-service', label: 'Service d\'étage', icon: '🛎️', category: 'services' },
  { value: 'concierge', label: 'Service de conciergerie', icon: '🎩', category: 'services' },
  { value: 'laundry', label: 'Service de blanchisserie', icon: '🧺', category: 'services' },
  
  // Bien-être & Loisirs
  { value: 'pool', label: 'Piscine', icon: '🏊', category: 'wellness' },
  { value: 'spa', label: 'Spa & Bien-être', icon: '🧘', category: 'wellness' },
  { value: 'fitness', label: 'Salle de sport', icon: '💪', category: 'wellness' },
  { value: 'hammam', label: 'Hammam', icon: '♨️', category: 'wellness' },
  { value: 'jacuzzi', label: 'Jacuzzi', icon: '🛁', category: 'wellness' },
  { value: 'massage', label: 'Service de massage', icon: '💆', category: 'wellness' },
  
  // Proximité & Localisation
  { value: 'city-center', label: 'Centre-ville', icon: '🏙️', category: 'location' },
  { value: 'attractions', label: 'Proche des attractions', icon: '🎭', category: 'location' },
  { value: 'beach', label: 'Proche de la plage', icon: '🏖️', category: 'location' },
  { value: 'airport', label: 'Proche de l\'aéroport', icon: '✈️', category: 'location' },
  { value: 'transport', label: 'Transports publics', icon: '🚇', category: 'location' },
  { value: 'shopping', label: 'Centres commerciaux', icon: '🛍️', category: 'location' },
  
  // Pratique & Confort
  { value: 'parking', label: 'Parking gratuit', icon: '🚗', category: 'practical' },
  { value: 'air-conditioning', label: 'Climatisation', icon: '❄️', category: 'practical' },
  { value: 'elevator', label: 'Ascenseur', icon: '🛗', category: 'practical' },
  { value: 'balcony', label: 'Balcon/Terrasse', icon: '🌅', category: 'practical' },
  { value: 'kitchen', label: 'Kitchenette', icon: '🍳', category: 'practical' },
  { value: 'minibar', label: 'Minibar', icon: '🥤', category: 'practical' },
  
  // Accessibilité & Sécurité
  { value: 'wheelchair', label: 'Accessible PMR', icon: '♿', category: 'accessibility' },
  { value: 'security', label: 'Sécurité 24h/24', icon: '🔒', category: 'accessibility' },
  { value: 'safe', label: 'Coffre-fort', icon: '🔐', category: 'accessibility' },
  { value: 'cctv', label: 'Vidéosurveillance', icon: '📹', category: 'accessibility' },
  
  // Atmosphère & Ambiance
  { value: 'quiet', label: 'Environnement calme', icon: '🤫', category: 'atmosphere' },
  { value: 'romantic', label: 'Ambiance romantique', icon: '💕', category: 'atmosphere' },
  { value: 'family', label: 'Adapté aux familles', icon: '👨‍👩‍👧‍👦', category: 'atmosphere' },
  { value: 'business', label: 'Business center', icon: '💼', category: 'atmosphere' },
  { value: 'nightlife', label: 'Proche de la vie nocturne', icon: '🌙', category: 'atmosphere' },
  { value: 'cultural', label: 'Quartier culturel', icon: '🎨', category: 'atmosphere' }
];

const preferenceCategories = {
  'services': { label: 'Services', color: 'blue', icon: '🛎️' },
  'wellness': { label: 'Bien-être', color: 'green', icon: '🧘' },
  'location': { label: 'Localisation', color: 'purple', icon: '📍' },
  'practical': { label: 'Confort', color: 'orange', icon: '🏠' },
  'accessibility': { label: 'Accessibilité & Sécurité', color: 'red', icon: '🛡️' },
  'atmosphere': { label: 'Atmosphère', color: 'pink', icon: '✨' }
};

export default function AccommodationStep({ formData, setFormData }: StepProps) {
  const [selectedType, setSelectedType] = useState(formData.accommodation.type);
  const [selectedPreferences, setSelectedPreferences] = useState(formData.accommodation.preferences);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>(Object.keys(accommodationCategories));
  const [activePreferenceCategories, setActivePreferenceCategories] = useState<string[]>(Object.keys(preferenceCategories));
  const [preferenceSearchTerm, setPreferenceSearchTerm] = useState('');

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

  const handlePreferenceCategoryToggle = (category: string) => {
    setActivePreferenceCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleShowAll = () => {
    setActiveCategories(Object.keys(accommodationCategories));
    setSearchTerm('');
  };

  const handleShowAllPreferences = () => {
    setActivePreferenceCategories(Object.keys(preferenceCategories));
    setPreferenceSearchTerm('');
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

  const getFilteredPreferences = () => {
    const allPreferences = preferences.filter(pref => 
      activePreferenceCategories.includes(pref.category)
    );

    if (!preferenceSearchTerm) return allPreferences;

    return allPreferences.filter(pref => 
      pref.label.toLowerCase().includes(preferenceSearchTerm.toLowerCase())
    );
  };

  const filteredAccommodations = getFilteredAccommodations();
  const filteredPreferences = getFilteredPreferences();

  const getCategoryColorClasses = (color: string, isActive: boolean) => {
    const colorMap = {
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100',
      red: isActive ? 'bg-red-500 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100';
  };

  const groupPreferencesByCategory = () => {
    const grouped: { [key: string]: typeof preferences } = {};
    filteredPreferences.forEach(pref => {
      if (!grouped[pref.category]) {
        grouped[pref.category] = [];
      }
      grouped[pref.category].push(pref);
    });
    return grouped;
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
          <h4 className="text-2xl font-bold text-gray-900">Critères & Services souhaités</h4>
        </div>

        {/* Barre de recherche pour les préférences */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un service ou critère..."
            value={preferenceSearchTerm}
            onChange={(e) => setPreferenceSearchTerm(e.target.value)}
            className="pl-10 text-lg py-3 border-2 border-gray-200 focus:border-yellow-500"
          />
        </div>

        {/* Filtres par catégorie de préférences */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-yellow-600" />
              <span className="font-semibold text-gray-900">Filtrer par type</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShowAllPreferences}
              className="text-xs"
            >
              Tout afficher
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(preferenceCategories).map(([category, data]) => {
              const isActive = activePreferenceCategories.includes(category);
              const count = preferences.filter(p => p.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => handlePreferenceCategoryToggle(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 flex items-center gap-1 ${
                    isActive 
                      ? getCategoryColorClasses(data.color, true) + ' border-transparent' 
                      : getCategoryColorClasses(data.color, false) + ' border-gray-200'
                  }`}
                >
                  <span>{data.icon}</span>
                  {data.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Compteur de critères */}
        <div className="text-sm text-gray-600">
          {filteredPreferences.length} critère{filteredPreferences.length > 1 ? 's' : ''} disponible{filteredPreferences.length > 1 ? 's' : ''}
        </div>

        {/* Grille des préférences par catégorie */}
        <div className="space-y-6">
          {Object.entries(groupPreferencesByCategory()).map(([category, categoryPrefs]) => {
            const categoryData = preferenceCategories[category as keyof typeof preferenceCategories];
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{categoryData.icon}</span>
                  <h5 className="font-semibold text-gray-800">{categoryData.label}</h5>
                  <span className="text-sm text-gray-500">({categoryPrefs.length})</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categoryPrefs.map((option) => {
                    const isSelected = selectedPreferences.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handlePreferenceToggle(option.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? `border-${categoryData.color}-500 bg-${categoryData.color}-50 text-${categoryData.color}-700 shadow-lg`
                            : `border-gray-200 hover:border-${categoryData.color}-300 bg-white hover:shadow-md`
                        }`}
                      >
                        <div className="text-xl mb-1">{option.icon}</div>
                        <span className="font-medium text-xs leading-tight">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {selectedPreferences.length > 0 && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
            <h5 className="font-semibold text-yellow-900 mb-2">⭐ Critères sélectionnés ({selectedPreferences.length}) :</h5>
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
