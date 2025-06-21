
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, HelpCircle, Lightbulb, MapPin, Coffee } from "lucide-react";
import { CommunityPost, ForumCategory } from "@/types/social";

const CommunityForum = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories: ForumCategory[] = [
    {
      id: "questions",
      name: "Questions",
      description: "Posez vos questions sur les voyages",
      icon: "❓",
      postCount: 142,
      lastActivity: "Il y a 2h"
    },
    {
      id: "conseils",
      name: "Conseils",
      description: "Partagez vos bons plans et astuces",
      icon: "💡",
      postCount: 89,
      lastActivity: "Il y a 1h"
    },
    {
      id: "experiences",
      name: "Expériences",
      description: "Racontez vos voyages",
      icon: "📸",
      postCount: 67,
      lastActivity: "Il y a 3h"
    },
    {
      id: "rencontres",
      name: "Rencontres",
      description: "Trouvez des compagnons de voyage",
      icon: "👥",
      postCount: 34,
      lastActivity: "Il y a 5h"
    }
  ];

  const samplePosts: CommunityPost[] = [
    {
      id: "1",
      userId: "user1",
      userName: "Sophie Martin",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      title: "Conseils pour un premier voyage au Japon ?",
      content: "Je prévois mon premier voyage au Japon pour le printemps prochain. Quelqu'un aurait-il des conseils sur les incontournables à ne pas manquer ?",
      category: "question",
      destination: "Japon",
      createdAt: "Il y a 2h",
      likes: 12,
      replies: 8,
      tags: ["japon", "premier-voyage", "conseils"]
    },
    {
      id: "2",
      userId: "user2",
      userName: "Marc Dubois",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      title: "Mon itinéraire de 2 semaines en Thaïlande",
      content: "Je reviens d'un voyage incroyable en Thaïlande ! Voici mon retour d'expérience et mes recommandations...",
      category: "experience",
      destination: "Thaïlande",
      createdAt: "Il y a 4h",
      likes: 28,
      replies: 15,
      tags: ["thaïlande", "itinéraire", "retour-experience"]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question": return <HelpCircle className="w-4 h-4" />;
      case "conseil": return <Lightbulb className="w-4 h-4" />;
      case "experience": return <MapPin className="w-4 h-4" />;
      case "rencontre": return <Coffee className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Communauté Voyageurs</h1>
        <p className="text-gray-600">Échangez avec d'autres passionnés de voyage</p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tout</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="conseils">Conseils</TabsTrigger>
          <TabsTrigger value="experiences">Expériences</TabsTrigger>
          <TabsTrigger value="rencontres">Rencontres</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {/* Sidebar avec catégories */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Catégories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{category.icon}</span>
                      <div>
                        <h4 className="font-semibold">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.postCount} posts</span>
                      <span>{category.lastActivity}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Membres actifs</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts aujourd'hui</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nouveaux membres</span>
                    <span className="font-semibold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des posts */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Discussions récentes</h2>
              <Button>Nouveau post</Button>
            </div>

            <TabsContent value="all" className="space-y-4 mt-0">
              {samplePosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={post.userAvatar} alt={post.userName} />
                        <AvatarFallback>
                          {post.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(post.category)}
                          <h3 className="font-semibold hover:text-blue-600 cursor-pointer">
                            {post.title}
                          </h3>
                          {post.destination && (
                            <Badge variant="secondary">{post.destination}</Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Par {post.userName}</span>
                          <span>{post.createdAt}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {post.replies} réponses
                          </span>
                          <span>{post.likes} likes</span>
                        </div>
                        
                        <div className="flex gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Contenu spécifique aux autres onglets */}
            <TabsContent value="questions" className="mt-0">
              <div className="text-center py-12 text-gray-500">
                <HelpCircle className="w-12 h-12 mx-auto mb-4" />
                <p>Section Questions en cours de développement</p>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CommunityForum;
