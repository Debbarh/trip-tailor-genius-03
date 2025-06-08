
import { Heart } from "lucide-react";
import { travelOptions } from "@/constants/beInspiredSteps";

interface TravelCompanionsStepProps {
  travelWith: string;
  setTravelWith: (travelWith: string) => void;
}

const TravelCompanionsStep = ({ travelWith, setTravelWith }: TravelCompanionsStepProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Votre style de voyage</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chaque type de voyage a sa propre magie. Quel est le vôtre ?
        </p>
      </div>
      
      <div className="space-y-6">
        {travelOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setTravelWith(option.id)}
            className={`group w-full p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              travelWith === option.id
                ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-xl'
                : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/50'
            }`}
          >
            <div className="flex items-center space-x-6">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {option.emoji}
              </div>
              <div>
                <div className="font-bold text-2xl mb-1">{option.label}</div>
                <div className="text-lg opacity-80">{option.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelCompanionsStep;
