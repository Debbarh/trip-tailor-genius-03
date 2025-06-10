
import { Bed } from "lucide-react";
import { accommodationOptions } from "@/constants/beInspiredSteps";

interface AccommodationStepProps {
  accommodation: string;
  setAccommodation: (accommodation: string) => void;
}

const AccommodationStep = ({ accommodation, setAccommodation }: AccommodationStepProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Bed className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre hébergement idéal</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Où préférez-vous vous réveiller chaque matin de votre aventure ?
        </p>
      </div>
      
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
    </div>
  );
};

export default AccommodationStep;
