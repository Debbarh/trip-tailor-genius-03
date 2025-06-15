
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Settings, 
  LogOut, 
  Heart, 
  MapPin
} from "lucide-react";

// Utilisateur simulé
const mockUser = {
  name: "Marie Dubois",
  email: "marie.dubois@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b900?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
};

interface UserHeaderProps {
  isAuthenticated?: boolean;
}

const UserHeader = ({ isAuthenticated = true }: UserHeaderProps) => {
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
            Se connecter
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
            S'inscrire
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/20 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
              <div className="font-medium text-gray-900">{mockUser.name}</div>
              <div className="text-sm text-gray-600">{mockUser.email}</div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center space-x-3 p-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{mockUser.name}</div>
              <div className="text-sm text-gray-600">{mockUser.email}</div>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <Link to="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Mon profil
            </DropdownMenuItem>
          </Link>
          
          <Link to="/profile?tab=trips">
            <DropdownMenuItem className="cursor-pointer">
              <MapPin className="w-4 h-4 mr-2" />
              Mes voyages
            </DropdownMenuItem>
          </Link>
          
          <Link to="/profile?tab=tours">
            <DropdownMenuItem className="cursor-pointer">
              <Heart className="w-4 h-4 mr-2" />
              Mes tours favoris
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuSeparator />
          
          <Link to="/profile?tab=settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserHeader;
