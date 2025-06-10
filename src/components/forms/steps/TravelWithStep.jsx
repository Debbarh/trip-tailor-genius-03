
import { Heart } from "lucide-react";
import { StepProps } from "@/types/planTrip";
import { travelSegments } from "@/constants/planTripSteps";

const TravelWithStep = ({ formData, setFormData }: StepProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Avec qui voyagez-vous ?</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chaque type de voyage a sa magie. Avec qui partagerez-vous ces moments précieux ?
        </p>
      </div>
      
      <div className="space-y-6">
        {travelSegments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => setFormData({
              ...formData,
              travelWith: { segment: segment.id, subSegment: '' }
            })}
            className={`group w-full p-8 rounded-3xl border-3 text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              formData.travelWith.segment === segment.id
                ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-xl'
                : 'border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/50'
            }`}
          >
            <div className="flex items-center space-x-6">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {segment.emoji}
              </div>
              <div>
                <div className="font-bold text-2xl mb-1">{segment.name}</div>
                <div className="text-lg opacity-80">{segment.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TravelWithStep;
