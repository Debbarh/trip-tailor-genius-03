import { useState } from 'react';
import ModeSelector from './components/ModeSelector';
import LocalExplorer from './LocalExplorer';
import WorldDiscovery from './WorldDiscovery';
import { BeInspiredMode } from '@/types/beInspiredModes';

interface BeInspiredMainProps {
  onBack?: () => void;
}

const BeInspiredMain = ({ onBack }: BeInspiredMainProps) => {
  const [mode, setMode] = useState<BeInspiredMode | null>(null);

  const handleModeSelect = (selectedMode: BeInspiredMode) => {
    setMode(selectedMode);
  };

  const handleBackToModeSelector = () => {
    setMode(null);
  };

  if (!mode) {
    return <ModeSelector onModeSelect={handleModeSelect} />;
  }

  if (mode === 'local') {
    return <LocalExplorer onBack={onBack || handleBackToModeSelector} />;
  }

  if (mode === 'world') {
    return <WorldDiscovery onBack={onBack || handleBackToModeSelector} />;
  }

  return null;
};

export default BeInspiredMain;