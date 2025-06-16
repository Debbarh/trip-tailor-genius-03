
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
    <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
          >
            <ShareIcon className="w-4 h-4 mr-2" />
            Partager
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
          >
            <EditIcon className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>

      <CardTitle className="text-2xl font-bold mb-4">
        {itinerary.title}
      </CardTitle>
      
      <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
        <div className="flex items-center bg-white/10 rounded-lg p-3">
          <MapIcon className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">Destinations</div>
            <div className="opacity-90">{itinerary.destinations.join(", ")}</div>
          </div>
        </div>
        
        <div className="flex items-center bg-white/10 rounded-lg p-3">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">Durée</div>
            <div className="opacity-90">{itinerary.duration}</div>
          </div>
        </div>
        
        <div className="flex items-center bg-white/10 rounded-lg p-3">
          <HotelIcon className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">Budget</div>
            <div className="opacity-90">{itinerary.budget}</div>
          </div>
        </div>
        
        <div className="flex items-center bg-white/10 rounded-lg p-3">
          <itinerary.weather.icon className="w-5 h-5 mr-2" />
          <div>
            <div className="font-semibold">Météo</div>
            <div className="opacity-90">{itinerary.weather.temp} {itinerary.weather.condition}</div>
          </div>
        </div>
      </div>

      <div className="text-center bg-white/10 rounded-lg p-4">
        <p className="text-lg leading-relaxed">{itinerary.overview}</p>
      </div>
    </CardHeader>
  );
};

export default ItineraryHeader;
