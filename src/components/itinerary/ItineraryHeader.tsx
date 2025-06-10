
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
    <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white relative overflow-hidden">
      {/* Éléments décoratifs avec les couleurs du logo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/20 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full -ml-12 -mb-12"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-400/20 rounded-full"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Nouvelle recherche
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Partager
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-300 hover:scale-105"
          >
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
          <div className="flex items-center bg-purple-500/30 rounded-xl p-4 backdrop-blur-sm border border-white/20 hover:bg-purple-500/40 transition-all duration-300">
            <MapIcon className="w-5 h-5 mr-3 text-pink-200" />
            <div>
              <div className="font-semibold text-white">Destinations</div>
              <div className="opacity-90 text-purple-100">{itinerary.destinations.join(", ")}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-blue-500/30 rounded-xl p-4 backdrop-blur-sm border border-white/20 hover:bg-blue-500/40 transition-all duration-300">
            <CalendarIcon className="w-5 h-5 mr-3 text-blue-200" />
            <div>
              <div className="font-semibold text-white">Durée</div>
              <div className="opacity-90 text-blue-100">{itinerary.duration}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-pink-500/30 rounded-xl p-4 backdrop-blur-sm border border-white/20 hover:bg-pink-500/40 transition-all duration-300">
            <HotelIcon className="w-5 h-5 mr-3 text-pink-200" />
            <div>
              <div className="font-semibold text-white">Budget</div>
              <div className="opacity-90 text-pink-100">{itinerary.budget}</div>
            </div>
          </div>
          
          <div className="flex items-center bg-purple-500/30 rounded-xl p-4 backdrop-blur-sm border border-white/20 hover:bg-purple-500/40 transition-all duration-300">
            <itinerary.weather.icon className="w-5 h-5 mr-3 text-purple-200" />
            <div>
              <div className="font-semibold text-white">Météo</div>
              <div className="opacity-90 text-purple-100">{itinerary.weather.temp} {itinerary.weather.condition}</div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/15 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
          <p className="text-lg leading-relaxed text-white font-medium">{itinerary.overview}</p>
        </div>
      </div>
    </CardHeader>
  );
};

export default ItineraryHeader;
