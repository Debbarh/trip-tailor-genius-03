
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, ShareIcon, EditIcon, MapIcon, CalendarIcon, HotelIcon } from "lucide-react";
import { GeneratedItinerary } from "@/types/itinerary";

interface ItineraryHeaderProps {
  itinerary: GeneratedItinerary;
  onBack: () => void;
}

const ItineraryHeader = ({ itinerary, onBack }: ItineraryHeaderProps) => {
  return (
    <CardHeader className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Nouvelle recherche
        </Button>
        
        <div className="flex gap-3">
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <ShareIcon className="w-4 h-4 mr-2" />
            Partager
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            <EditIcon className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>

      <div className="relative z-10">
        <CardTitle className="text-4xl font-bold mb-4 flex items-center gap-3">
          ✨ {itinerary.title}
        </CardTitle>
        
        <div className="grid md:grid-cols-4 gap-6 text-sm mb-6">
          <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <MapIcon className="w-5 h-5 mr-2 text-yellow-300" />
            <div>
              <div className="font-semibold">Destinations</div>
              <div className="opacity-90">{itinerary.destinations.join(", ")}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <CalendarIcon className="w-5 h-5 mr-2 text-green-300" />
            <div>
              <div className="font-semibold">Durée</div>
              <div className="opacity-90">{itinerary.duration}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <HotelIcon className="w-5 h-5 mr-2 text-blue-300" />
            <div>
              <div className="font-semibold">Budget</div>
              <div className="opacity-90">{itinerary.budget}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
            <itinerary.weather.icon className="w-5 h-5 mr-2 text-orange-300" />
            <div>
              <div className="font-semibold">Météo</div>
              <div className="opacity-90">{itinerary.weather.temp} {itinerary.weather.condition}</div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-lg leading-relaxed">{itinerary.overview}</p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ItineraryHeader;
