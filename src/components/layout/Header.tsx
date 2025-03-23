
import React from 'react';
import { useUser } from '@/hooks/use-user';
import { Button } from '@/components/ui/button';
import { Settings, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user } = useUser();
  
  return (
    <header className="h-16 bg-[#0a0a0a] border-b border-zinc-800 px-6 flex items-center justify-between">
      <div>
        {/* Left side of header - can add search or other elements later */}
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800" asChild>
          <Link to="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800" asChild>
          <Link to="/profile">
            <User className="h-4 w-4" />
            <span>{user?.name || 'User'}</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
