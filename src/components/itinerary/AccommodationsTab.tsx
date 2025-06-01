
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AccommodationsTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Hébergements recommandés</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏨 Riad La Maison Arabe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Riad de luxe au cœur de la médina de Marrakech</p>
            <div className="space-y-2 text-sm">
              <div>📍 Médina, Marrakech</div>
              <div>⭐ 4.8/5 (240 avis)</div>
              <div>💰 180-250€/nuit</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏨 Four Seasons Casablanca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Hôtel moderne avec vue sur l'océan Atlantique</p>
            <div className="space-y-2 text-sm">
              <div>📍 Corniche, Casablanca</div>
              <div>⭐ 4.9/5 (310 avis)</div>
              <div>💰 280-350€/nuit</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccommodationsTab;
