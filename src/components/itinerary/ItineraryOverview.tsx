
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
        <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-6 rounded-2xl border border-purple-200/50 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            🌟 Points forts de votre voyage
          </h3>
          <div className="space-y-3">
            {itinerary.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-100 hover:bg-white/90 transition-all duration-300">
                <span className="text-lg text-purple-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {'reasoning' in itinerary && itinerary.reasoning && (
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl border border-blue-200/50 shadow-lg">
            <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              🎯 Pourquoi cette destination ?
            </h4>
            <p className="text-blue-800 leading-relaxed font-medium">{itinerary.reasoning}</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 rounded-2xl border border-pink-200/50 shadow-lg">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            👤 Votre profil voyageur
          </h3>
          <div className="grid gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-pink-100 hover:bg-white/90 transition-all duration-300">
              <div className="font-semibold text-purple-700">Segment</div>
              <div className="text-lg text-pink-600 font-medium">{data.travelerProfile?.segment}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-purple-100 hover:bg-white/90 transition-all duration-300">
              <div className="font-semibold text-purple-700">Style</div>
              <div className="text-lg text-blue-600 font-medium">{data.preferences?.ambiance}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-blue-100 hover:bg-white/90 transition-all duration-300">
              <div className="font-semibold text-purple-700">Hébergement</div>
              <div className="text-lg text-purple-600 font-medium">{data.preferences?.accommodation}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6 rounded-2xl border border-purple-200/50 shadow-lg">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            🎭 Vos expériences
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.preferences?.experiences?.map(exp => (
              <Badge 
                key={exp} 
                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 text-sm font-medium border border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-300"
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
