
import { accommodationOptions } from "@/constants/beInspiredSteps";

interface AccommodationStepProps {
  accommodation: string;
  setAccommodation: (accommodation: string) => void;
}

const AccommodationStep = ({ accommodation, setAccommodation }: AccommodationStepProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {accommodationOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => setAccommodation(option.id)}
          className={`group p-8 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
            accommodation === option.id
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-xl'
              : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50'
          }`}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {option.emoji}
          </div>
          <div className="font-bold text-xl mb-2">{option.label}</div>
          <div className="text-sm opacity-70">{option.desc}</div>
        </button>
      ))}
    </div>
  );
};

export default AccommodationStep;
