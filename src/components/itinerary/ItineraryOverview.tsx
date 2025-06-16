
import { Badge } from "@/components/ui/badge";
import { TripData, GeneratedItinerary } from "@/types/itinerary";

interface ItineraryOverviewProps {
  itinerary: GeneratedItinerary;
  data: TripData;
}

const ItineraryOverview = ({ itinerary, data }: ItineraryOverviewProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold mb-4 text-purple-900">
            Points forts de votre voyage
          </h3>
          <div className="space-y-3">
            {itinerary.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-100">
                <span className="text-purple-800">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {'reasoning' in itinerary && itinerary.reasoning && (
          <div className="bg-gradient-to-br from-blue-50 to-pink-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-bold text-blue-900 mb-3">
              Pourquoi cette destination ?
            </h4>
            <p className="text-blue-800 leading-relaxed">{itinerary.reasoning}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
          <h3 className="text-lg font-bold mb-4 text-pink-900">
            Votre profil voyageur
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-pink-100">
              <div className="font-semibold text-pink-700">Segment</div>
              <div className="text-pink-600">{data.travelerProfile?.segment}</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-pink-100">
              <div className="font-semibold text-pink-700">Style</div>
              <div className="text-pink-600">{data.preferences?.ambiance}</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-pink-100">
              <div className="font-semibold text-pink-700">Hébergement</div>
              <div className="text-pink-600">{data.preferences?.accommodation}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold mb-4 text-blue-900">
            Vos expériences
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.preferences?.experiences?.map(exp => (
              <Badge 
                key={exp} 
                className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border-purple-200"
              >
                {exp}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryOverview;
