
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="relative w-full sm:max-w-[400px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
      <Input 
        placeholder="Tìm kiếm người dùng..." 
        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};
