
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, CameraIcon, GripVerticalIcon, Edit, Trash2 } from "lucide-react";
import { Activity } from "@/types/itinerary";
import { getActivityIcon } from "@/utils/itineraryGenerator";
import EditActivityDialog from './EditActivityDialog';
import DeleteActivityDialog from './DeleteActivityDialog';

interface DraggableActivityProps {
  activity: Activity;
  id: string;
  onEdit: (updatedActivity: Activity) => void;
  onDelete: () => void;
}

const DraggableActivity = ({ activity, id, onEdit, onDelete }: DraggableActivityProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEditSave = (updatedActivity: Activity) => {
    onEdit(updatedActivity);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes}>
        <Card className={`bg-gradient-to-r from-gray-50 to-blue-50 hover:shadow-md transition-all duration-200 ${isDragging ? 'shadow-2xl' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Handle de drag */}
              <div 
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-2 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <GripVerticalIcon className="w-4 h-4 text-purple-500" />
              </div>

              {/* Heure */}
              <div className="text-sm font-mono bg-emerald-100 text-emerald-800 px-3 py-2 rounded-lg font-bold min-w-fit">
                {activity.time}
              </div>
              
              {/* Contenu principal */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{activity.activity}</h4>
                      <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                      
                      {/* Détails supplémentaires */}
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-2">
                        <div>
                          <span className="font-semibold">📍 Lieu:</span> Centre-ville
                        </div>
                        <div>
                          <span className="font-semibold">⏱️ Durée:</span> 2h30
                        </div>
                        <div>
                          <span className="font-semibold">👥 Groupe:</span> Max 12 pers.
                        </div>
                        <div>
                          <span className="font-semibold">🌡️ Recommandé:</span> Temps sec
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Prix et rating */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-3 h-3 ${i < Math.floor(activity.rating) ? 'fill-current' : ''}`} />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{activity.rating}</span>
                    </div>
                    <div className="font-bold text-emerald-600 text-lg">{activity.price}</div>
                  </div>
                </div>
                
                {/* Tags et actions */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {activity.type}
                    </Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      Réservation requise
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50">
                      <CameraIcon className="w-3 h-3 mr-1" />
                      Photos
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50">
                      📍 Localiser
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() => setIsEditDialogOpen(true)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Éditer
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <EditActivityDialog
        activity={activity}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditSave}
      />

      <DeleteActivityDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        activityName={activity.activity}
      />
    </>
  );
};

export default DraggableActivity;
