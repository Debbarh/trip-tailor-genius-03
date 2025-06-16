
import { activityOptions } from "@/constants/beInspiredSteps";

interface ActivitiesStepProps {
  activities: string[];
  setActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ activities, setActivities }: ActivitiesStepProps) => {
  const handleActivityToggle = (activityId: string) => {
    const isSelected = activities.includes(activityId);
    const newActivities = isSelected
      ? activities.filter(id => id !== activityId)
      : [...activities, activityId];
    setActivities(newActivities);
  };

  return (
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
    </div>
  );
};

export default ActivitiesStep;
