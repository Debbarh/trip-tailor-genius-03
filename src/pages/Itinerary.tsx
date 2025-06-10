
import ItineraryDisplay from "@/components/ItineraryDisplay";

const Itinerary = () => {
  // Données d'exemple pour afficher l'itinéraire
  const sampleData = {
    mode: 'inspire' as const,
    inspiration: {
      budget: 'medium',
      duration: '7-days',
      season: 'spring',
      interests: 'culture-history'
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return <ItineraryDisplay data={sampleData} onBack={handleBack} />;
};

export default Itinerary;
