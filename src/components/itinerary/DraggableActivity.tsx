import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "@/types/itinerary";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditActivityDialog from "@/components/itinerary/EditActivityDialog";
import DeleteActivityDialog from "@/components/itinerary/DeleteActivityDialog";
import BookingWidget from "@/components/booking/BookingWidget";
import BookingOptionsCard from "@/components/booking/BookingOptionsCard";

interface DraggableActivityProps {
  activity: Activity;
  onUpdate: (updatedActivity: Activity) => void;
  onDelete: () => void;
}

const DraggableActivity = ({ activity, onUpdate, onDelete }: DraggableActivityProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.activity });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (updatedActivity: Activity) => {
    onUpdate(updatedActivity);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 border-l-4 border-l-purple-500 hover:bg-white transition-all duration-300 ${
        isDragging ? 'opacity-50 shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-800">{activity.time} - {activity.activity}</h4>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-purple-700">{activity.type}</span>
            <span className="text-xs text-gray-500">Prix: {activity.price}</span>
            <span className="text-xs text-yellow-500">Note: {activity.rating}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditDialogOpen(true)}
            className="hover:bg-purple-100 text-purple-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="hover:bg-red-100 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <EditActivityDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdate}
        activity={activity}
      />

      <DeleteActivityDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        activityName={activity.activity}
      />
      
      {/* Nouveau: Widget de réservation */}
      {activity.affiliate && (
        <BookingWidget 
          activity={activity}
          onBooking={(activityId, affiliateId) => {
            console.log(`Booking activity ${activityId} with affiliate ${affiliateId}`);
          }}
        />
      )}
      
      {/* Nouveau: Options de réservation supplémentaires */}
      {activity.bookingOptions && (
        <div className="mt-4 space-y-4">
          {activity.bookingOptions.transport && (
            <BookingOptionsCard
              type="transport"
              options={activity.bookingOptions.transport}
              onBooking={(optionId, affiliateId) => {
                console.log(`Booking transport ${optionId} with affiliate ${affiliateId}`);
              }}
            />
          )}
          {activity.bookingOptions.accommodation && (
            <BookingOptionsCard
              type="accommodation"
              options={activity.bookingOptions.accommodation}
              onBooking={(optionId, affiliateId) => {
                console.log(`Booking accommodation ${optionId} with affiliate ${affiliateId}`);
              }}
            />
          )}
          {activity.bookingOptions.restaurant && (
            <BookingOptionsCard
              type="restaurant"
              options={activity.bookingOptions.restaurant}
              onBooking={(optionId, affiliateId) => {
                console.log(`Booking restaurant ${optionId} with affiliate ${affiliateId}`);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableActivity;
