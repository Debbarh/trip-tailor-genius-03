
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { Activity, Camera, Mountain, Waves } from 'lucide-react';

const activityCategories = [
  {
    category: 'Culture & Histoire',
    icon: '🏛️',
    activities: [
      { value: 'museums', label: 'Musées', icon: '🖼️' },
      { value: 'monuments', label: 'Monuments historiques', icon: '🏰' },
      { value: 'medina', label: 'Visite de médina', icon: '🕌' },
      { value: 'artisanat', label: 'Artisanat', icon: '🎨' },
      { value: 'culture', label: 'Culture', icon: '🏛️' }
    ]
  },
  {
    category: 'Aventure & Sport',
    icon: '🏔️',
    activities: [
      { value: 'trekking', label: 'Randonnée/Trekking', icon: '🥾' },
      { value: 'desert', label: 'Excursion désert', icon: '🐪' },
      { value: 'surf', label: 'Surf', icon: '🏄' },
      { value: 'climbing', label: 'Escalade', icon: '🧗' },
      { value: 'golf', label: 'Golf', icon: '⛳' },
      { value: 'safari', label: 'Safari', icon: '🦁' }
    ]
  },
  {
    category: 'Détente & Bien-être',
    icon: '🧘',
    activities: [
      { value: 'spa', label: 'Spa & Hammam', icon: '🛁' },
      { value: 'yoga', label: 'Yoga & Méditation', icon: '🧘' },
      { value: 'beach', label: 'Plage & Farniente', icon: '🏖️' },
      { value: 'meditation', label: 'Méditation', icon: '🧘‍♀️' },
      { value: 'healthcare', label: 'Soins & Santé', icon: '🏥' }
    ]
  },
  {
    category: 'Gastronomie & Saveurs',
    icon: '🍽️',
    activities: [
      { value: 'cooking', label: 'Cours de cuisine', icon: '👨‍🍳' },
      { value: 'food-tour', label: 'Tour gastronomique', icon: '🍴' },
      { value: 'wine-tasting', label: 'Dégustation de vins', icon: '🍷' },
      { value: 'market', label: 'Marchés locaux', icon: '🛒' },
      { value: 'culinary', label: 'Expériences culinaires', icon: '🍽️' }
    ]
  },
  {
    category: 'Voyage & Transport',
    icon: '🚢',
    activities: [
      { value: 'cruise', label: 'Croisière', icon: '🚢' },
      { value: 'business-trip', label: 'Voyage d\'affaires', icon: '💼' },
      { value: 'eco-tourism', label: 'Écotourisme', icon: '🌿' },
      { value: 'sustainable-travel', label: 'Voyage durable', icon: '♻️' }
    ]
  },
  {
    category: 'Famille & Divertissement',
    icon: '👨‍👩‍👧‍👦',
    activities: [
      { value: 'family', label: 'Activités familiales', icon: '👨‍👩‍👧‍👦' },
      { value: 'nightlife', label: 'Vie nocturne', icon: '🌃' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️' }
    ]
  },
  {
    category: 'Spirituel & Religieux',
    icon: '🕌',
    activities: [
      { value: 'religieux', label: 'Sites religieux', icon: '🕌' },
      { value: 'pilgrimage', label: 'Pèlerinage', icon: '🙏' },
      { value: 'spiritual', label: 'Retraite spirituelle', icon: '✨' }
    ]
  }
];

export default function ActivitiesStep({ formData, setFormData }: StepProps) {
  const [selectedActivities, setSelectedActivities] = useState(formData.activities);

  const handleActivityToggle = (activity: string) => {
    const updatedActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter(a => a !== activity)
      : [...selectedActivities, activity];
    
    setSelectedActivities(updatedActivities);
    setFormData({
      ...formData,
      activities: updatedActivities
    });
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Activity className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          Vos activités de rêve
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Sélectionnez les expériences qui vous font vibrer pour créer un voyage inoubliable
        </p>
      </div>

      {/* Activity Categories */}
      <div className="space-y-10">
        {activityCategories.map((category) => (
          <div key={category.category} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{category.icon}</div>
              <h4 className="text-2xl font-bold text-gray-900">{category.category}</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.activities.map((activity) => {
                const isSelected = selectedActivities.includes(activity.value);
                return (
                  <button
                    key={activity.value}
                    onClick={() => handleActivityToggle(activity.value)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl ring-2 ring-indigo-200'
                        : 'border-gray-200 hover:border-indigo-300 bg-white hover:shadow-lg'
                    }`}
                  >
                    <div className="text-3xl mb-3">{activity.icon}</div>
                    <span className="font-semibold text-sm leading-tight">{activity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Activities Summary */}
      {selectedActivities.length > 0 && (
        <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-200">
          <h5 className="font-bold text-indigo-900 mb-4 text-xl">🎯 Activités sélectionnées ({selectedActivities.length}) :</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedActivities.map(activityValue => {
              const activity = activityCategories
                .flatMap(cat => cat.activities)
                .find(act => act.value === activityValue);
              
              return activity ? (
                <div key={activityValue} className="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-800 rounded-xl text-sm font-medium">
                  <span>{activity.icon}</span>
                  <span>{activity.label}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
