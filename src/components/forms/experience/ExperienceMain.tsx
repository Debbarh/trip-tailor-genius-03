import { useState } from 'react';
import ExperienceActionSelector from './components/ExperienceActionSelector';
import CreateExperienceForm from './CreateExperienceForm';
import DiscoverExperiences from './DiscoverExperiences';

type ExperienceAction = 'create' | 'discover' | null;

interface ExperienceMainProps {
  onBack?: () => void;
}

const ExperienceMain = ({ onBack }: ExperienceMainProps) => {
  const [action, setAction] = useState<ExperienceAction>(null);

  const handleActionSelect = (selectedAction: ExperienceAction) => {
    setAction(selectedAction);
  };

  const handleBackToActionSelector = () => {
    setAction(null);
  };

  if (!action) {
    return <ExperienceActionSelector onActionSelect={handleActionSelect} />;
  }

  if (action === 'create') {
    return <CreateExperienceForm onBack={onBack || handleBackToActionSelector} />;
  }

  if (action === 'discover') {
    return <DiscoverExperiences onBack={onBack || handleBackToActionSelector} />;
  }

  return null;
};

export default ExperienceMain;