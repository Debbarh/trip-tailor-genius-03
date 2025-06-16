
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart, MapPin, Calendar } from "lucide-react";

interface FormData {
  activities: string[];
  travelWith: string;
  budget: string;
  accommodation: string;
  mode: string;
}

interface InspirationTestimonialsProps {
  formData: FormData;
}

const InspirationTestimonials = ({ formData }: InspirationTestimonialsProps) => {
  // Generate testimonials based on user preferences
  const getRelevantTestimonials = () => {
    const allTestimonials = [
      {
        id: 'culture-lover',
        name: 'Marie L.',
        location: 'Paris, France',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332f87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 2 semaines',
        trip: 'Kyoto, Japon',
        categories: ['culture', 'solo'],
        budget: 'medium',
        testimonial: "Une expérience transformatrice ! Les recommandations étaient parfaitement adaptées à ma passion pour la culture japonaise. Les temples suggérés étaient authentiques et moins touristiques.",
        highlight: "Les conseils culturels m'ont permis de vivre des moments magiques"
      },
      {
        id: 'adventure-couple',
        name: 'Thomas & Sarah',
        location: 'Lyon, France',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 1 mois',
        trip: 'Bali, Indonésie',
        categories: ['adventure', 'nature', 'couple'],
        budget: 'medium',
        testimonial: "Nous cherchions l'aventure et la détente à la fois. Le système d'inspiration nous a proposé exactement ce qu'il fallait : plongée le matin, spa volcaniques l'après-midi !",
        highlight: "Un équilibre parfait entre aventure et romantisme"
      },
      {
        id: 'family-explorer',
        name: 'Famille Rodriguez',
        location: 'Marseille, France',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 3 semaines',
        trip: 'Marrakech, Maroc',
        categories: ['culture', 'food', 'family'],
        budget: 'medium',
        testimonial: "Voyage en famille réussi ! Les enfants ont adoré l'atelier de cuisine, et nous avons découvert des lieux authentiques loin des pièges à touristes. Parfait pour tous les âges.",
        highlight: "Des activités parfaites pour petits et grands"
      },
      {
        id: 'luxury-couple',
        name: 'Elena K.',
        location: 'Monaco',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 1 semaine',
        trip: 'Santorin, Grèce',
        categories: ['relax', 'couple'],
        budget: 'luxury',
        testimonial: "Le niveau de personnalisation est exceptionnel. Chaque recommandation correspondait parfaitement à nos attentes de luxe et d'intimité. Le spa avec vue sur la caldeira était magique.",
        highlight: "Un service haut de gamme qui dépasse les attentes"
      },
      {
        id: 'budget-solo',
        name: 'Alex M.',
        location: 'Toulouse, France',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 2 mois',
        trip: 'Istanbul, Turquie',
        categories: ['culture', 'art', 'solo'],
        budget: 'low',
        testimonial: "Même avec un budget serré, j'ai vécu un voyage incroyable ! Les conseils pour économiser tout en découvrant la vraie culture locale ont été précieux. Istanbul m'a conquis !",
        highlight: "Un voyage riche en découvertes malgré un petit budget"
      },
      {
        id: 'friends-party',
        name: 'Groupe de Copains',
        location: 'Bordeaux, France',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
        rating: 5,
        date: 'Il y a 6 semaines',
        trip: 'Dubai, EAU',
        categories: ['nightlife', 'friends'],
        budget: 'high',
        testimonial: "Entre amis, on voulait du spectaculaire et de la fête. Dubai était parfait ! Les recommandations pour les rooftops et les expériences uniques ont rendu notre voyage légendaire.",
        highlight: "Des expériences spectaculaires parfaites entre amis"
      }
    ];

    // Parse budget data
    let budgetInfo = { budget: '', period: '' };
    try {
      if (formData.budget) {
        budgetInfo = JSON.parse(formData.budget);
      }
    } catch {
      budgetInfo = { budget: formData.budget, period: '' };
    }

    // Filter testimonials based on user profile
    return allTestimonials
      .filter(testimonial => {
        // Match by travel companion
        if (formData.travelWith && testimonial.categories.includes(formData.travelWith)) {
          return true;
        }
        
        // Match by activities
        const hasMatchingActivity = formData.activities.some(activity => 
          testimonial.categories.includes(activity)
        );
        
        // Match by budget
        const budgetMatch = budgetInfo.budget === testimonial.budget;
        
        return hasMatchingActivity || budgetMatch;
      })
      .slice(0, 6); // Limit to 6 testimonials
  };

  const relevantTestimonials = getRelevantTestimonials();

  const getMatchReason = (testimonial: any) => {
    const reasons = [];
    
    if (formData.travelWith && testimonial.categories.includes(formData.travelWith)) {
      reasons.push('Même type de voyage');
    }
    
    const matchingActivities = formData.activities.filter(activity => 
      testimonial.categories.includes(activity)
    );
    if (matchingActivities.length > 0) {
      reasons.push('Mêmes passions');
    }
    
    let budgetInfo = { budget: '', period: '' };
    try {
      if (formData.budget) {
        budgetInfo = JSON.parse(formData.budget);
      }
    } catch {
      budgetInfo = { budget: formData.budget, period: '' };
    }
    
    if (budgetInfo.budget === testimonial.budget) {
      reasons.push('Budget similaire');
    }
    
    return reasons.join(' • ') || 'Profil compatible';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ils Ont Vécu l'Expérience
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les témoignages de voyageurs qui partagent vos passions
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
          <div className="text-gray-600">Note moyenne</div>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">15k+</div>
          <div className="text-gray-600">Voyageurs inspirés</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
          <div className="text-gray-600">Recommandent</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
          <div className="text-gray-600">Destinations</div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relevantTestimonials.map((testimonial, index) => (
          <Card 
            key={testimonial.id} 
            className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border-0 overflow-hidden"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {testimonial.date}
                  </p>
                </div>
              </div>

              {/* Trip Info */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-purple-800">{testimonial.trip}</p>
                    <p className="text-sm text-purple-600">{getMatchReason(testimonial)}</p>
                  </div>
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-8 h-8 text-purple-300 mb-2" />
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
              </div>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                <p className="text-sm font-medium text-green-800">
                  ✨ {testimonial.highlight}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No testimonials found */}
      {relevantTestimonials.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Soyez parmi les premiers !
          </h3>
          <p className="text-gray-600">
            Votre profil est unique. Créez votre voyage et inspirez les futurs voyageurs !
          </p>
        </div>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-4">Prêt à Vivre Votre Propre Aventure ?</h3>
          <p className="text-lg opacity-90 mb-6">
            Rejoignez des milliers de voyageurs qui ont transformé leurs rêves en souvenirs inoubliables
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm">
              💫 <strong>Promesse :</strong> Votre voyage sera aussi unique que vous l'êtes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspirationTestimonials;
