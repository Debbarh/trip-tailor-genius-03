
import UnifiedActivitiesStep from './UnifiedActivitiesStep';

interface ActivitiesStepProps {
  activities: string[];
  setActivities: (activities: string[]) => void;
}

const ActivitiesStep = ({ activities, setActivities }: ActivitiesStepProps) => {
  return (
    <UnifiedActivitiesStep
      mode="simple"
      selectedActivities={activities}
      onActivitiesChange={setActivities}
    />
  );
};

export default ActivitiesStep;
