
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, HeartIcon, CameraIcon } from "lucide-react";
import { DayItinerary } from "@/types/itinerary";
import { getActivityIcon } from "@/utils/itineraryGenerator";

interface DayCardProps {
  day: DayItinerary;
  dayIndex: number;
  isFavorite: boolean;
  onToggleFavorite: (dayIndex: number) => void;
}

const DayCard = ({ day, dayIndex, isFavorite, onToggleFavorite }: DayCardProps) => {
  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
      {/* En-tête du jour avec image */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${day.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="absolute inset-0 flex items-end p-6">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                {day.day}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{day.title}</h3>
                <div className="flex items-center gap-3 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    📍 {day.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <day.weather.icon className="w-4 h-4" />
                    {day.weather.temp}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(dayIndex)}
            className="ml-auto p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <HeartIcon 
              className={`w-6 h-6 transition-colors ${
                isFavorite ? 'text-red-500 fill-current' : 'text-white'
              }`} 
            />
          </button>
        </div>
      </div>

      <CardContent className="p-0">
        <div className="p-6 space-y-4">
          {day.activities.map((activity, idx) => (
            <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="text-sm font-mono bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg font-bold min-w-fit">
                  {activity.time}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{activity.activity}</h4>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(activity.rating) ? 'fill-current' : ''}`} />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{activity.rating}</span>
                      </div>
                      <div className="font-bold text-emerald-600">{activity.price}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {activity.type}
                    </Badge>
                    <Button size="sm" variant="outline" className="text-xs">
                      <CameraIcon className="w-3 h-3 mr-1" />
                      Photos
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DayCard;
