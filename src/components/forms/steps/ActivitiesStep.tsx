
import { activityOptions } from "@/constants/beInspiredSteps";
import { useState } from "react";

interface ActivitiesStepProps {
  activities: string[];
  setActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ activities, setActivities }: ActivitiesStepProps) => {
  const [customActivity, setCustomActivity] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleActivityToggle = (activityId: string) => {
    if (activityId === 'other') {
      setShowCustomInput(!showCustomInput);
      if (showCustomInput) {
        // Si on ferme le champ, on retire l'activité personnalisée
        const newActivities = activities.filter(id => !id.startsWith('custom:'));
        setActivities(newActivities);
        setCustomActivity("");
      }
      return;
    }

    const isSelected = activities.includes(activityId);
    const newActivities = isSelected
      ? activities.filter(id => id !== activityId)
      : [...activities, activityId];
    setActivities(newActivities);
  };

  const handleCustomActivitySubmit = () => {
    if (customActivity.trim()) {
      const customId = `custom:${customActivity.trim()}`;
      const newActivities = activities.filter(id => !id.startsWith('custom:'));
      newActivities.push(customId);
      setActivities(newActivities);
    }
  };

  const handleCustomActivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomActivity(e.target.value);
    if (e.target.value.trim()) {
      handleCustomActivitySubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {activityOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleActivityToggle(option.id)}
            className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              activities.includes(option.id)
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
        
        {/* Option Autre */}
        <button
          onClick={() => handleActivityToggle('other')}
          className={`group p-6 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            showCustomInput
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-xl'
              : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
          }`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            ✨
          </div>
          <div className="font-bold text-lg mb-2">Autre</div>
          <div className="text-sm opacity-70">Précisez votre passion</div>
        </button>
      </div>

      {/* Champ de saisie personnalisé */}
      {showCustomInput && (
        <div className="mt-6 p-6 bg-purple-50 rounded-3xl border-2 border-purple-200">
          <label htmlFor="custom-activity" className="block text-lg font-semibold text-purple-800 mb-3">
            Précisez votre activité :
          </label>
          <input
            id="custom-activity"
            type="text"
            value={customActivity}
            onChange={handleCustomActivityChange}
            placeholder="Ex: Photographie, Astronomie, Plongée sous-marine..."
            className="w-full px-4 py-3 border-2 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg"
          />
          {customActivity && (
            <div className="mt-3 text-sm text-purple-600">
              ✓ Activité ajoutée : {customActivity}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivitiesStep;
