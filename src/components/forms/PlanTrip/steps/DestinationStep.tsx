
import React from 'react';
import { StepProps } from '../../../../types/planTrip';

export default function DestinationStep({ formData, setFormData }: StepProps) {
  return (
    <div className="text-center p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Étape Destination
      </h3>
      <p className="text-gray-600">
        Cette étape sera implémentée prochainement dans le flux "Plan Trip"
      </p>
    </div>
  );
}
