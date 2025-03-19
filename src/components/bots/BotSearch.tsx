
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BotSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const BotSearch = ({ searchTerm, setSearchTerm }: BotSearchProps) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search..." 
        className="pl-9 border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-slate-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default BotSearch;
