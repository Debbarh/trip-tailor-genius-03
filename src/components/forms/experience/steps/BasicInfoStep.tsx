import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';

interface BasicInfoStepProps {
  data: {
    title?: string;
    description?: string;
    location?: {
      address: string;
      coordinates: { latitude: number; longitude: number };
    };
  };
  onNext: (data: any) => void;
}

const BasicInfoStep = ({ data, onNext }: BasicInfoStepProps) => {
  const [formData, setFormData] = useState({
    title: data.title || '',
    description: data.description || '',
    address: data.location?.address || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation géocodage - à remplacer par une API réelle
    const mockCoordinates = { latitude: 48.8566, longitude: 2.3522 };
    
    onNext({
      title: formData.title,
      description: formData.description,
      location: {
        address: formData.address,
        coordinates: mockCoordinates
      }
    });
  };

  const isValid = formData.title.trim() && formData.description.trim() && formData.address.trim();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Informations de base</h2>
        <p className="text-muted-foreground">
          Donnez-nous les détails essentiels de votre recommandation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="title">Titre de l'expérience *</Label>
          <Input
            id="title"
            placeholder="ex: Restaurant authentique avec vue sur la Seine"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description détaillée *</Label>
          <Textarea
            id="description"
            placeholder="Décrivez en détail votre expérience : ce qui rend cet endroit spécial, ce que vous avez aimé, les détails qui peuvent intéresser d'autres voyageurs..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Localisation *</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="address"
              placeholder="Adresse complète ou nom du lieu"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!isValid} size="lg">
            Continuer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoStep;