
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartIcon, PlusIcon, ClockIcon } from "lucide-react";
import { DayItinerary } from "@/types/itinerary";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableActivity from './DraggableActivity';

interface DayCardProps {
  day: DayItinerary;
  dayIndex: number;
  isFavorite: boolean;
  onToggleFavorite: (dayIndex: number) => void;
}

const DayCard = ({ day, dayIndex, isFavorite, onToggleFavorite }: DayCardProps) => {
  const [activities, setActivities] = useState(day.activities);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item, index) => `${dayIndex}-${index}` === active.id);
        const newIndex = items.findIndex((item, index) => `${dayIndex}-${index}` === over?.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Calculer le temps total et le budget total
  const totalDuration = activities.length * 2.5; // Estimation
  const totalBudget = activities.reduce((sum, activity) => {
    const price = parseFloat(activity.price.replace(/[€/\D]/g, '')) || 0;
    return sum + price;
  }, 0);

  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
      {/* En-tête du jour avec image */}
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

      <CardContent className="p-0">
        <div className="p-6">
          {/* Instructions drag & drop */}
          <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-700 flex items-center gap-2">
              <span className="text-purple-500">✨</span>
              <strong>Glissez-déposez</strong> les activités pour réorganiser votre journée selon vos préférences
            </p>
          </div>

          {/* Liste des activités avec drag & drop */}
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={activities.map((_, index) => `${dayIndex}-${index}`)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <DraggableActivity
                    key={`${dayIndex}-${idx}`}
                    id={`${dayIndex}-${idx}`}
                    activity={activity}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Résumé de la journée */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
              📊 Résumé de la journée
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-purple-600">{activities.length}</div>
                <div className="text-purple-500">Activités</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">~{totalDuration}h</div>
                <div className="text-blue-500">Durée totale</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-pink-600">{totalBudget}€</div>
                <div className="text-pink-500">Budget estimé</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayCard;
