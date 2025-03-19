
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UserProfileSection = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Mock user data
  const mockUser = {
    fullName: 'John Doe',
    email: 'john@example.com',
    avatarUrl: ''
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    navigate('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-green-500">
            <AvatarImage 
              src={mockUser.avatarUrl || ''} 
              alt={mockUser.fullName} 
            />
            <AvatarFallback className="bg-accent text-accent-foreground">
              {mockUser.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{mockUser.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>{t('My Profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('Settings')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('Log out')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileSection;
