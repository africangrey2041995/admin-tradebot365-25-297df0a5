
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UsersFilterProps = {
  searchTerm: string;
  filterStatus: string | null;
  planFilter: string | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick: (status: string | null) => void;
  onPlanFilterChange: (value: string | null) => void;
};

export const UsersFilter = ({
  searchTerm,
  filterStatus,
  planFilter,
  onSearchChange,
  onFilterClick,
  onPlanFilterChange
}: UsersFilterProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <Input 
            placeholder="Tìm kiếm người dùng..." 
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={`border-zinc-700 ${filterStatus === 'active' ? 'bg-green-500/20 text-green-500' : 'text-zinc-400'}`}
            onClick={() => onFilterClick('active')}
          >
            <Check className="h-4 w-4 mr-2" />
            Hoạt động
          </Button>
          <Button 
            variant="outline" 
            className={`border-zinc-700 ${filterStatus === 'inactive' ? 'bg-yellow-500/20 text-yellow-500' : 'text-zinc-400'}`}
            onClick={() => onFilterClick('inactive')}
          >
            <X className="h-4 w-4 mr-2" />
            Không hoạt động
          </Button>
          <Button 
            variant="outline" 
            className={`border-zinc-700 ${filterStatus === 'suspended' ? 'bg-red-500/20 text-red-500' : 'text-zinc-400'}`}
            onClick={() => onFilterClick('suspended')}
          >
            <X className="h-4 w-4 mr-2" />
            Đã khóa
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:max-w-[300px]">
          <Select 
            value={planFilter || ""} 
            onValueChange={(value) => onPlanFilterChange(value || null)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Gói dịch vụ" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              <SelectItem value="all">Tất cả gói</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
