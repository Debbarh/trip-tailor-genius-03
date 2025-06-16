
import { Heart } from "lucide-react";
import { StepProps } from "@/types/planTrip";
import { travelSegments } from "@/constants/planTripSteps";
import TravelDetailsForm from "./components/TravelDetailsForm";

const TravelWithStep = ({ formData, setFormData }: StepProps) => {
  const selectedSegment = formData.travelWith.segment;
  const selectedSubSegment = formData.travelWith.subSegment;
  const currentSegment = travelSegments.find(segment => segment.id === selectedSegment);

  const handleSegmentSelect = (segmentId: string) => {
    setFormData({
      ...formData,
      travelWith: { 
        segment: segmentId, 
        subSegment: '',
        details: {} 
      }
    });
  };

  const handleSubSegmentSelect = (subSegmentId: string) => {
    setFormData({
      ...formData,
      travelWith: { 
        ...formData.travelWith,
        subSegment: subSegmentId,
        details: formData.travelWith.details || {}
      }
    });
  };

  const handleDetailsChange = (details: any) => {
    setFormData({
      ...formData,
      travelWith: { 
        ...formData.travelWith,
        details 
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Avec qui voyagez-vous ?</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chaque type de voyage a sa magie. Avec qui partagerez-vous ces moments précieux ?
        </p>
      </div>
      
      {/* Sélection du segment principal */}
      <div className="space-y-6">
        {travelSegments.map((segment) => (
          <button
            key={segment.id}
            onClick={() => handleSegmentSelect(segment.id)}
            className={`group w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              selectedSegment === segment.id
                ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md'
                : 'border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/30'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {segment.emoji}
              </div>
              <div>
                <div className="font-bold text-xl mb-1">{segment.name}</div>
                <div className="text-base opacity-80">{segment.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Sélection du sous-segment si un segment est sélectionné */}
      {selectedSegment && currentSegment?.subSegments && (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Précisez votre profil
            </h4>
            <p className="text-gray-600">
              Choisissez l'option qui vous correspond le mieux
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {currentSegment.subSegments.map((subSegment) => (
              <button
                key={subSegment.id}
                onClick={() => handleSubSegmentSelect(subSegment.id)}
                className={`group p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                  selectedSubSegment === subSegment.id
                    ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm'
                    : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {subSegment.emoji}
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">{subSegment.name}</div>
                    <div className="text-xs opacity-80">{subSegment.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Formulaire de détails selon le sous-segment */}
      {selectedSubSegment && (
        <TravelDetailsForm 
          subSegment={selectedSubSegment}
          details={formData.travelWith.details || {}}
          onDetailsChange={handleDetailsChange}
        />
      )}
    </div>
  );
};

export default TravelWithStep;
