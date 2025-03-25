
import React from 'react';
import { Search, RefreshCw, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropBotActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  isLoading: boolean;
  refreshData: () => void;
}

export const PropBotActions: React.FC<PropBotActionsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isLoading,
  refreshData,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Tìm kiếm bằng ID hoặc tên bot..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-zinc-900 border-zinc-800 text-white"
        />
      </div>
      
      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-zinc-900 border-zinc-800 text-white">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="active">Đang hoạt động</SelectItem>
          <SelectItem value="inactive">Không hoạt động</SelectItem>
          <SelectItem value="maintenance">Bảo trì</SelectItem>
          <SelectItem value="error">Lỗi</SelectItem>
          <SelectItem value="suspended">Đã dừng</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="default" 
        onClick={refreshData}
        disabled={isLoading}
        className="bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Làm mới
      </Button>
    </div>
  );
};
