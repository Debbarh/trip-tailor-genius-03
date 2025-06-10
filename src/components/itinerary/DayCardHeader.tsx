
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon, ClockIcon } from "lucide-react";
import { DayItinerary } from "@/types/itinerary";

interface DayCardHeaderProps {
  day: DayItinerary;
  dayIndex: number;
  isFavorite: boolean;
  totalDuration: number;
  totalBudget: number;
  onToggleFavorite: (dayIndex: number) => void;
}

const DayCardHeader = ({ 
  day, 
  dayIndex, 
  isFavorite, 
  totalDuration, 
  totalBudget, 
  onToggleFavorite 
}: DayCardHeaderProps) => {
  return (
    <div 
      className="h-48 bg-cover bg-center relative"
      style={{ backgroundImage: `url('${day.image}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      <div className="absolute inset-0 flex items-end p-6">
        <div className="text-white flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
              {day.day}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{day.title}</h3>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  📍 {day.city}
                </span>
                <span className="flex items-center gap-1">
                  <day.weather.icon className="w-4 h-4" />
                  {day.weather.temp}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  ~{totalDuration}h
                </span>
                <span className="flex items-center gap-1">
                  💰 {totalBudget}€
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
          <button
            onClick={() => onToggleFavorite(dayIndex)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <HeartIcon 
              className={`w-6 h-6 transition-colors ${
                isFavorite ? 'text-red-500 fill-current' : 'text-white'
              }`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayCardHeader;
