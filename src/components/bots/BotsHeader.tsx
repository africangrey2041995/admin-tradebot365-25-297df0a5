
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Plus } from 'lucide-react';

interface BotsHeaderProps {
  onAddBot: () => void;
}

const BotsHeader = ({ onAddBot }: BotsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Button variant="outline" className="border-slate-200 shadow-sm font-medium px-4 py-2 h-10">
          <Bookmark className="h-4 w-4 mr-2" />
          BOT LIST
        </Button>
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
