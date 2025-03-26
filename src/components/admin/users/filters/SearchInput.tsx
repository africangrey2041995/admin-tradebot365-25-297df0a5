
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Tìm kiếm...",
  className = "relative w-full sm:max-w-[400px]"
}) => {
  return (
    <div className={className}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
      <Input 
        placeholder={placeholder} 
        className="pl-10 bg-zinc-800 border-zinc-700 text-white focus-visible:ring-tradebot focus-visible:border-tradebot transition-all duration-200"
        value={searchTerm}
        onChange={onSearchChange}
        aria-label={placeholder}
      />
    </div>
  );
};
