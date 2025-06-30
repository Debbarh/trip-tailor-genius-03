
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
import { useAuth } from "@/contexts/AuthContext";

const UserHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
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

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const menuItems = [
    { to: '/profile', icon: User, label: 'Mon profil' },
    { to: '/profile?tab=trips', icon: MapPin, label: 'Mes voyages' },
    { to: '/profile?tab=tours', icon: Heart, label: 'Mes tours favoris' },
    { to: '/profile?tab=settings', icon: Settings, label: 'Paramètres' }
  ];

  const UserAvatar = ({ className = "" }) => (
    <Avatar className={`w-8 h-8 ${className}`}>
      <AvatarImage src="" alt={user.name} />
      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/20 transition-colors">
            <UserAvatar />
            <div className="text-left hidden md:block">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center space-x-3 p-3">
            <UserAvatar className="w-10 h-10" />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <DropdownMenuItem className="cursor-pointer">
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </DropdownMenuItem>
            </Link>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserHeader;
