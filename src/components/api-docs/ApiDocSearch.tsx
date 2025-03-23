
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ApiDocSearchProps {
  onSearch: (query: string) => void;
}

const ApiDocSearch = ({ onSearch }: ApiDocSearchProps) => {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchRef.current) {
          const input = searchRef.current.querySelector('input');
          if (input) input.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={searchRef} className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
      <Input
        type="text"
        placeholder="Tìm kiếm trong tài liệu... (Ctrl+K)"
        value={query}
        onChange={handleSearch}
        className="pl-10 bg-zinc-900 border-zinc-700 text-zinc-200"
      />
    </div>
  );
};

export default ApiDocSearch;
