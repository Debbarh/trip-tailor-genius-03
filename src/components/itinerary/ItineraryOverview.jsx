
import { Badge } from "@/components/ui/badge";
import { TripData, GeneratedItinerary } from "@/types/itinerary";

interface ItineraryOverviewProps {
  itinerary: GeneratedItinerary;
  data: TripData;
}

const ItineraryOverview = ({ itinerary, data }: ItineraryOverviewProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-emerald-800">🌟 Points forts de votre voyage</h3>
          <div className="space-y-3">
            {itinerary.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-lg">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {'reasoning' in itinerary && itinerary.reasoning && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-blue-900 mb-3">🎯 Pourquoi cette destination ?</h4>
            <p className="text-blue-800 leading-relaxed">{itinerary.reasoning}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-orange-800">👤 Votre profil voyageur</h3>
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700">Segment</div>
              <div className="text-lg text-orange-600">{data.travelerProfile?.segment}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700">Style</div>
              <div className="text-lg text-orange-600">{data.preferences?.ambiance}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-gray-700">Hébergement</div>
              <div className="text-lg text-orange-600">{data.preferences?.accommodation}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-purple-800">🎭 Vos expériences</h3>
          <div className="flex flex-wrap gap-2">
            {data.preferences?.experiences?.map(exp => (
              <Badge key={exp} className="bg-purple-100 text-purple-800 px-3 py-1 text-sm">
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
