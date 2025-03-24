
import React from 'react';
import { 
  PlusCircle, 
  Download, 
  Search, 
  RefreshCw, 
  Play, 
  Pause
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { BotStatus } from '@/constants/botTypes';

interface PropBotActionsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  isLoading: boolean;
  refreshData: () => void;
}

export const PropBotActions: React.FC<PropBotActionsProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isLoading,
  refreshData
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên Bot hoặc ID..."
              className="pl-8 bg-zinc-800 border-zinc-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value={BotStatus.ACTIVE}>Đang hoạt động</SelectItem>
              <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
              <SelectItem value={BotStatus.MAINTENANCE}>Đang bảo trì</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="border-zinc-700 text-green-500 hover:bg-zinc-800">
          <Play className="h-4 w-4 mr-2" />
          Kích hoạt
        </Button>
        <Button variant="outline" size="sm" className="border-zinc-700 text-yellow-500 hover:bg-zinc-800">
          <Pause className="h-4 w-4 mr-2" />
          Tạm dừng
        </Button>
      </div>
    </>
  );
};
