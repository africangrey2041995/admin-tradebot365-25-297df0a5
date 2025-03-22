
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface UsersSearchAndFiltersProps {
  searchTerm: string;
  filterStatus: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (value: string) => void;
}

export const UsersSearchAndFilters: React.FC<UsersSearchAndFiltersProps> = ({
  searchTerm,
  filterStatus,
  onSearchChange,
  onFilterChange
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <div className="flex items-center">
        <Search className="w-4 h-4 mr-2 text-zinc-500" />
        <Input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-amber-500 focus:border-amber-500"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex items-center">
        <Label htmlFor="status" className="text-sm text-zinc-400 mr-2">
          Lọc theo trạng thái:
        </Label>
        <Select value={filterStatus} onValueChange={onFilterChange}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-amber-500 focus:border-amber-500">
            <SelectValue placeholder="Tất cả" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
            <SelectItem value="suspended">Tạm khóa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
