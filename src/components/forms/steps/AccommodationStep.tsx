
import UnifiedAccommodationStep from './UnifiedAccommodationStep';

interface AccommodationStepProps {
  accommodation: string;
  setAccommodation: (accommodation: string) => void;
}

const AccommodationStep = ({ accommodation, setAccommodation }: AccommodationStepProps) => {
  return (
    <UnifiedAccommodationStep
      mode="simple"
      selectedAccommodation={accommodation}
      onAccommodationChange={setAccommodation}
    />
  );
};

export default AccommodationStep;
