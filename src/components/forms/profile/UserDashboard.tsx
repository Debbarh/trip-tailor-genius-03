import { useState } from 'react';
import { ArrowLeft, User, Settings, Heart, Bookmark, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/recommendations';

interface UserDashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onBack?: () => void;
}

const UserDashboard = ({ user, onLogout, onBack }: UserDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8 pt-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            )}
            <h1 className="text-2xl font-bold">Mon Profil Voyageur</h1>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Déconnexion
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <p className="text-muted-foreground mb-4">{user.email}</p>
                
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>{user.stats.recommendationsSubmitted} recommandations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{user.stats.totalLikes} likes reçus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-blue-500" />
                    <span>{user.stats.totalSaves} sauvegardes</span>
                  </div>
                </div>
              </div>

              <Button className="gap-2">
                <Settings className="h-4 w-4" />
                Modifier le profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">Mes Recommandations</TabsTrigger>
            <TabsTrigger value="saved">Sauvegardées</TabsTrigger>
            <TabsTrigger value="preferences">Préférences</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Recommandations Publiées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Vous n'avez pas encore publié de recommandations.</p>
                  <Button className="mt-4">
                    Créer ma première recommandation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Expériences Sauvegardées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune expérience sauvegardée pour le moment.</p>
                  <Button className="mt-4">
                    Découvrir des expériences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes Préférences de Voyage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Activités préférées</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.activities.length > 0 ? (
                      user.preferences.activities.map((activity) => (
                        <Badge key={activity} variant="secondary">
                          {activity}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Aucune préférence définie</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Budget préféré</h3>
                  <Badge variant="outline">{user.preferences.budget}</Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Type de voyageur</h3>
                  <Badge variant="outline">{user.preferences.travelerType}</Badge>
                </div>

                <Button>Modifier mes préférences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-primary">
                    {user.stats.recommendationsSubmitted}
                  </CardTitle>
                  <p className="text-muted-foreground">Recommandations publiées</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-red-500">
                    {user.stats.totalLikes}
                  </CardTitle>
                  <p className="text-muted-foreground">Likes reçus</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-blue-500">
                    {user.stats.totalSaves}
                  </CardTitle>
                  <p className="text-muted-foreground">Fois sauvegardé</p>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;