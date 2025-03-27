
import React from 'react';
import { Search, RefreshCw, Filter, Play, Pause, X } from 'lucide-react';
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
  // New props for bulk actions
  selectedBots: string[];
  clearSelections: () => void;
  openBulkActionDialog: (action: 'activate' | 'deactivate') => void;
}

export const PropBotActions: React.FC<PropBotActionsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isLoading,
  refreshData,
  // New props for bulk actions
  selectedBots,
  clearSelections,
  openBulkActionDialog
}) => {
  return (
    <div className="flex flex-col gap-4">
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
      
      {/* Bulk action controls */}
      {selectedBots.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-800/50 p-2 rounded-md">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white bg-zinc-700 px-3 py-1 rounded-md">
              Đã chọn {selectedBots.length} bot
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 border-zinc-700 text-zinc-400"
              onClick={clearSelections}
            >
              <X className="h-4 w-4 mr-1" />
              Bỏ chọn
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-green-500 hover:text-green-400"
              onClick={() => openBulkActionDialog('activate')}
            >
              <Play className="h-4 w-4 mr-2" />
              Kích hoạt tất cả
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-yellow-500 hover:text-yellow-400"
              onClick={() => openBulkActionDialog('deactivate')}
            >
              <Pause className="h-4 w-4 mr-2" />
              Tạm dừng tất cả
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
