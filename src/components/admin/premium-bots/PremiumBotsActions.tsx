
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Filter, Play, Pause, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileSpreadsheet } from "lucide-react";

interface PremiumBotsActionsProps {
  searchTerm: string;
  filterStatus: string | null;
  selectedBots: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick: () => void;
  clearSelections: () => void;
  exportToCSV: () => void;
  exportToExcel: () => void;
  openBulkActionDialog: (action: 'activate' | 'deactivate') => void;
}

export const PremiumBotsActions: React.FC<PremiumBotsActionsProps> = ({
  searchTerm,
  filterStatus,
  selectedBots,
  onSearchChange,
  onFilterClick,
  clearSelections,
  exportToCSV,
  exportToExcel,
  openBulkActionDialog
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <Input 
            placeholder="Tìm kiếm Bot..." 
            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <Button 
          variant="outline" 
          className={`border-zinc-700 ${filterStatus ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4 mr-2" />
          {filterStatus ? `Lọc: ${filterStatus}` : 'Lọc'}
        </Button>
      </div>
      
      {/* Bulk action controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          {selectedBots.length > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-white bg-zinc-800 px-3 py-1 rounded-md">
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
          ) : null}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 text-zinc-400"
              >
                <Download className="h-4 w-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
              <DropdownMenuLabel>Xuất dữ liệu</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem 
                className="focus:bg-zinc-800 cursor-pointer"
                onClick={exportToExcel}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Xuất Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="focus:bg-zinc-800 cursor-pointer"
                onClick={exportToCSV}
              >
                <Download className="mr-2 h-4 w-4" />
                <span>Xuất CSV</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-green-500 hover:text-green-400"
            onClick={() => openBulkActionDialog('activate')}
          >
            <Play className="h-4 w-4 mr-2" />
            Kích hoạt
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-yellow-500 hover:text-yellow-400"
            onClick={() => openBulkActionDialog('deactivate')}
          >
            <Pause className="h-4 w-4 mr-2" />
            Tạm dừng
          </Button>
        </div>
      </div>
    </div>
  );
};
