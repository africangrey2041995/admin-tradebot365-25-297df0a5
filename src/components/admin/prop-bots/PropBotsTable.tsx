import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PropBot } from '@/types/bot';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BotStatus } from '@/constants/botTypes';

interface PropBotsTableProps {
  currentBots: PropBot[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  onRowClick?: (botId: string) => void;
}

export const PropBotsTable: React.FC<PropBotsTableProps> = ({
  currentBots,
  currentPage,
  setCurrentPage,
  totalPages,
  onRowClick
}) => {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case BotStatus.ACTIVE: return "Đang hoạt động";
      case BotStatus.INACTIVE: return "Không hoạt động";
      case BotStatus.MAINTENANCE: return "Bảo trì";
      case BotStatus.ERROR: return "Lỗi";
      case BotStatus.SUSPENDED: return "Đã dừng";
      default: return status;
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case BotStatus.ACTIVE: return "bg-green-500/20 text-green-500";
      case BotStatus.INACTIVE: return "bg-zinc-500/20 text-zinc-400";
      case BotStatus.MAINTENANCE: return "bg-yellow-500/20 text-yellow-500";
      case BotStatus.ERROR: return "bg-red-500/20 text-red-500";
      case BotStatus.SUSPENDED: return "bg-red-800/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-800/50">
            <TableRow>
              <TableHead className="text-zinc-400 font-medium">Bot ID</TableHead>
              <TableHead className="text-zinc-400 font-medium">Tên</TableHead>
              <TableHead className="text-zinc-400 font-medium">Prop Firm</TableHead>
              <TableHead className="text-zinc-400 font-medium">Trạng thái</TableHead>
              <TableHead className="text-zinc-400 font-medium">Vốn tối thiểu</TableHead>
              <TableHead className="text-zinc-400 font-medium">Hiệu suất</TableHead>
              <TableHead className="text-zinc-400 font-medium">Người dùng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBots.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-zinc-500">
                  Không tìm thấy Prop Bot nào phù hợp với tiêu chí tìm kiếm.
                </TableCell>
              </TableRow>
            ) : (
              currentBots.map((bot) => (
                <TableRow 
                  key={bot.botId} 
                  className={cn(
                    "cursor-pointer hover:bg-zinc-800/50 transition-colors",
                    onRowClick ? "cursor-pointer" : ""
                  )}
                  onClick={() => onRowClick && onRowClick(bot.botId)}
                >
                  <TableCell className="font-medium text-white">{bot.botId}</TableCell>
                  <TableCell className="text-white">{bot.name}</TableCell>
                  <TableCell className="text-zinc-400">{bot.propFirm || "—"}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getStatusClasses(bot.status)
                    )}>
                      {getStatusDisplay(bot.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-400">{bot.minCapital}</TableCell>
                  <TableCell className={cn(
                    bot.profit.startsWith('+') ? "text-green-500" : "text-red-500"
                  )}>
                    {bot.profit}
                  </TableCell>
                  <TableCell className="text-zinc-400">{bot.users}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
          <div className="text-sm text-zinc-500">
            Trang {currentPage} / {totalPages}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
