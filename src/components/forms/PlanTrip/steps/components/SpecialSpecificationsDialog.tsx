
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { Textarea } from '../../../../ui/textarea';
import { Label } from '../../../../ui/label';
import { PlusCircle, X, AlertCircle, Utensils, Accessibility, Heart, MessageSquare } from 'lucide-react';

interface SpecialSpecificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (specifications: any) => void;
  onSkip: () => void;
}

export default function SpecialSpecificationsDialog({ 
  open, 
  onOpenChange, 
  onComplete, 
  onSkip 
}: SpecialSpecificationsDialogProps) {
  const [specifications, setSpecifications] = useState({
    dietary: [] as string[],
    accessibility: [] as string[],
    medical: '',
    specialRequests: '',
    customPreferences: [] as string[]
  });

  const [newCustomPreference, setNewCustomPreference] = useState('');

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Végétarien', icon: '🥗' },
    { value: 'vegan', label: 'Végétalien', icon: '🌱' },
    { value: 'halal', label: 'Halal', icon: '☪️' },
    { value: 'kosher', label: 'Casher', icon: '✡️' },
    { value: 'gluten-free', label: 'Sans gluten', icon: '🌾' },
    { value: 'lactose-free', label: 'Sans lactose', icon: '🥛' },
    { value: 'allergies', label: 'Allergies alimentaires', icon: '⚠️' }
  ];

  const accessibilityOptions = [
    { value: 'wheelchair', label: 'Accès fauteuil roulant', icon: '♿' },
    { value: 'mobility', label: 'Mobilité réduite', icon: '🦽' },
    { value: 'visual', label: 'Déficience visuelle', icon: '👁️' },
    { value: 'hearing', label: 'Déficience auditive', icon: '👂' },
    { value: 'elevator', label: 'Ascenseur nécessaire', icon: '🛗' }
  ];

  const toggleOption = (category: 'dietary' | 'accessibility', value: string) => {
    setSpecifications(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const addCustomPreference = () => {
    if (newCustomPreference.trim()) {
      setSpecifications(prev => ({
        ...prev,
        customPreferences: [...prev.customPreferences, newCustomPreference.trim()]
      }));
      setNewCustomPreference('');
    }
  };

  const removeCustomPreference = (index: number) => {
    setSpecifications(prev => ({
      ...prev,
      customPreferences: prev.customPreferences.filter((_, i) => i !== index)
    }));
  };

  const handleComplete = () => {
    onComplete(specifications);
    onOpenChange(false);
  };

  const handleSkip = () => {
    onSkip();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            Spécifications spéciales pour votre voyage
          </DialogTitle>
          <DialogDescription>
            Aidez-nous à personnaliser votre expérience en nous indiquant vos besoins particuliers (optionnel)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restrictions alimentaires */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Utensils className="w-5 h-5 text-orange-600" />
              Restrictions alimentaires
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleOption('dietary', option.value)}
                  className={`p-3 rounded-lg border-2 text-sm transition-all ${
                    specifications.dietary.includes(option.value)
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibilité */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <Accessibility className="w-5 h-5 text-blue-600" />
              Besoins d'accessibilité
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {accessibilityOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleOption('accessibility', option.value)}
                  className={`p-3 rounded-lg border-2 text-sm transition-all ${
                    specifications.accessibility.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditions médicales */}
          <div className="space-y-3">
            <Label htmlFor="medical" className="flex items-center gap-2 text-lg font-semibold">
              <Heart className="w-5 h-5 text-red-600" />
              Conditions médicales particulières
            </Label>
            <Textarea
              id="medical"
              placeholder="Décrivez brièvement toute condition médicale dont nous devrions tenir compte..."
              value={specifications.medical}
              onChange={(e) => setSpecifications(prev => ({ ...prev, medical: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          {/* Demandes spéciales */}
          <div className="space-y-3">
            <Label htmlFor="special" className="flex items-center gap-2 text-lg font-semibold">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              Demandes spéciales
            </Label>
            <Textarea
              id="special"
              placeholder="Occasion spéciale, préférences particulières, demandes spécifiques..."
              value={specifications.specialRequests}
              onChange={(e) => setSpecifications(prev => ({ ...prev, specialRequests: e.target.value }))}
              className="min-h-[80px]"
            />
          </div>

          {/* Préférences personnalisées */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-lg font-semibold">
              <PlusCircle className="w-5 h-5 text-green-600" />
              Autres préférences
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une préférence personnalisée..."
                value={newCustomPreference}
                onChange={(e) => setNewCustomPreference(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomPreference()}
              />
              <Button onClick={addCustomPreference} size="sm" variant="outline">
                Ajouter
              </Button>
            </div>
            {specifications.customPreferences.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specifications.customPreferences.map((pref, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {pref}
                    <button
                      onClick={() => removeCustomPreference(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleSkip}>
            Passer cette étape
          </Button>
          <Button onClick={handleComplete} className="bg-blue-600 hover:bg-blue-700">
            Enregistrer et continuer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
