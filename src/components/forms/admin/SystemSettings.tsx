import { Cog, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-2">
          Paramètres Système
        </h2>
        <p className="text-gray-600">Configuration technique de la plateforme</p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5" />
            Configuration Système
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Paramètres système avancés</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;