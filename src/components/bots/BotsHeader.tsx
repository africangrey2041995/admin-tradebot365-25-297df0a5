
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface BotsHeaderProps {
  onAddBot: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const BotsHeader = ({ onAddBot, searchTerm, setSearchTerm }: BotsHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-col ${isMobile ? 'gap-3 mb-5' : 'mb-8'} sm:flex-row sm:items-center sm:justify-between`}>
      <div className={`flex items-center ${isMobile ? 'w-full mb-1' : ''} gap-3 sm:gap-4`}>
        <Button 
          variant="outline" 
          className={`border-slate-200 shadow-sm font-medium ${isMobile ? 'px-3 py-1.5 text-xs h-8' : 'px-4 py-2 h-10'}`}
        >
          <Bookmark className={`${isMobile ? 'h-3 w-3 mr-1.5' : 'h-4 w-4 mr-2'}`} />
          BOT LIST
        </Button>
        
        <div className={`relative ${isMobile ? 'flex-1' : 'w-64'}`}>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />
          <Input 
            placeholder="Tìm kiếm..." 
            className={`pl-9 border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-slate-300 ${isMobile ? 'h-8 text-sm' : ''}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          onClick={onAddBot} 
          className={`bg-primary hover:bg-primary/90 shadow-sm font-medium ${isMobile ? 'text-xs h-8 px-3 py-1.5 w-full sm:w-auto' : 'h-10 px-4'}`}
        >
          <Plus className={`${isMobile ? 'h-3.5 w-3.5 mr-1.5' : 'h-4 w-4 mr-2'}`} />
          Add New BOT
        </Button>
      </div>
    </div>
  );
};

export default BotsHeader;
