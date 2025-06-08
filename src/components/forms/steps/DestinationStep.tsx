
import { Globe, Camera } from "lucide-react";
import { StepProps } from "@/types/planTrip";
import { countries } from "@/constants/planTripSteps";

const DestinationStep = ({ formData, setFormData }: StepProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Choisissez votre destination</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Laissez-vous guider par votre cœur. Où rêvez-vous de créer vos prochains souvenirs ?
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => setFormData({
              ...formData, 
              destination: { ...formData.destination, country: country.name, city: '' }
            })}
            className={`group p-8 rounded-3xl border-3 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
              formData.destination.country === country.name
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xl'
                : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/50'
            }`}
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {country.emoji}
            </div>
            <div className="font-bold text-xl">{country.name}</div>
          </button>
        ))}
      </div>

      {formData.destination.country && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Quelle ville vous appelle ?
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries
              .find(c => c.name === formData.destination.country)
              ?.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setFormData({
                    ...formData,
                    destination: { ...formData.destination, city }
                  })}
                  className={`group p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                    formData.destination.city === city
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30'
                  }`}
                >
                  <Camera className="w-6 h-6 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-lg">{city}</span>
                </button>
              ))
            }
          </div>
        </div>
      )}

      {formData.destination.city && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Quand vivrez-vous cette aventure ?
            </h4>
          </div>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Ex: 15-22 Juillet 2024"
              className="w-full p-6 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-lg text-center font-medium bg-white shadow-sm"
              value={formData.destination.dates}
              onChange={(e) => setFormData({
                ...formData,
                destination: { ...formData.destination, dates: e.target.value }
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationStep;
