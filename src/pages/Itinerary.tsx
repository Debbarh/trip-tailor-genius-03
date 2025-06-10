
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Arrière-plan dégradé avec les couleurs du logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-blue-900/20 to-pink-900/30"></div>
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-300/15 to-blue-300/15 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <ItineraryDisplay data={sampleData} onBack={handleBack} />
      </div>

      {/* Overlay subtil pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/10 pointer-events-none"></div>
    </div>
  );
};

export default Itinerary;
