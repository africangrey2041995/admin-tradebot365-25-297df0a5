
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BotsHeaderProps {
  onAddBot: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const BotsHeader = ({ onAddBot, searchTerm, setSearchTerm }: BotsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="border-slate-200 shadow-sm font-medium px-4 py-2 h-10">
          <Bookmark className="h-4 w-4 mr-2" />
          BOT LIST
        </Button>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm..." 
            className="pl-9 border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button onClick={onAddBot} className="bg-primary hover:bg-primary/90 shadow-sm font-medium h-10 px-4">
          <Plus className="h-4 w-4 mr-2" />
          Add New BOT
        </Button>
      </div>
    </div>
  );
};

export default BotsHeader;
