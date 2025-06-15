
import React, { useState } from 'react';
import { StepProps } from '../../../../types/planTrip';
import { DollarSign, Utensils } from 'lucide-react';

const budgetOptions = [
  { value: 'budget', label: 'Économique', description: '500-1000€', icon: '💰' },
  { value: 'standard', label: 'Standard', description: '1000-2000€', icon: '💵' },
  { value: 'premium', label: 'Premium', description: '2000-4000€', icon: '💎' },
  { value: 'luxury', label: 'Luxe', description: '4000€+', icon: '👑' }
];

const cuisineOptions = [
  { value: 'local', label: 'Cuisine locale', icon: '🍽️' },
  { value: 'international', label: 'Internationale', icon: '🌍' },
  { value: 'vegetarian', label: 'Végétarienne', icon: '🥗' },
  { value: 'halal', label: 'Halal', icon: '☪️' },
  { value: 'fine-dining', label: 'Gastronomique', icon: '🍷' },
  { value: 'street-food', label: 'Street Food', icon: '🌮' }
];

export default function BudgetAndFoodStep({ formData, setFormData }: StepProps) {
  const [selectedBudget, setSelectedBudget] = useState(formData.budgetAndFood.budget);
  const [selectedCuisines, setSelectedCuisines] = useState(formData.budgetAndFood.cuisine);

  const handleBudgetChange = (budget: string) => {
    setSelectedBudget(budget);
    setFormData({
      ...formData,
      budgetAndFood: {
        ...formData.budgetAndFood,
        budget
      }
    });
  };

  const handleCuisineToggle = (cuisine: string) => {
    const updatedCuisines = selectedCuisines.includes(cuisine)
      ? selectedCuisines.filter(c => c !== cuisine)
      : [...selectedCuisines, cuisine];
    
    setSelectedCuisines(updatedCuisines);
    setFormData({
      ...formData,
      budgetAndFood: {
        ...formData.budgetAndFood,
        cuisine: updatedCuisines
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <DollarSign className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-4xl font-bold text-gray-900 mb-4">
          Budget et préférences culinaires
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Définissez votre budget et vos goûts pour une expérience sur mesure
        </p>
      </div>

      {/* Budget Selection */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Votre budget par personne</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleBudgetChange(option.value)}
              className={`p-6 rounded-3xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                selectedBudget === option.value
                  ? 'border-green-500 bg-green-50 text-green-700 shadow-xl ring-4 ring-green-100'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h5 className="text-xl font-bold mb-2">{option.label}</h5>
              <p className="text-gray-600">{option.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900">Préférences culinaires</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cuisineOptions.map((option) => {
            const isSelected = selectedCuisines.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => handleCuisineToggle(option.value)}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                    : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-3">{option.icon}</div>
                <span className="font-semibold text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>

        {selectedCuisines.length > 0 && (
          <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-200">
            <h5 className="font-semibold text-orange-900 mb-2">🍽️ Cuisines sélectionnées :</h5>
            <div className="flex flex-wrap gap-2">
              {selectedCuisines.map(cuisine => {
                const cuisineData = cuisineOptions.find(c => c.value === cuisine);
                return (
                  <span key={cuisine} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {cuisineData?.icon} {cuisineData?.label}
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
