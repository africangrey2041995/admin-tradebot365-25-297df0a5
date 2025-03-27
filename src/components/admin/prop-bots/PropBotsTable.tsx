
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Sparkles, Trophy } from 'lucide-react';
import { BotStatusBadge } from '../premium-bots/BotStatusBadge';
import { BotTag } from '@/components/bots/BotTag';
import { PropBot } from '@/types/bot';

interface PropBotsTableProps {
  currentBots: PropBot[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  onRowClick?: (botId: string) => void;
  onToggleFeatured?: (botId: string, event: React.MouseEvent) => void;
  onToggleNew?: (botId: string, event: React.MouseEvent) => void;
  onToggleBestSeller?: (botId: string, event: React.MouseEvent) => void;
}

export const PropBotsTable: React.FC<PropBotsTableProps> = ({
  currentBots,
  currentPage,
  setCurrentPage,
  totalPages,
  onRowClick,
  onToggleFeatured,
  onToggleNew,
  onToggleBestSeller
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-zinc-800/50">
            <TableRow>
              <TableHead className="text-zinc-400 font-medium">Bot ID</TableHead>
              <TableHead className="text-zinc-400 font-medium">Tên</TableHead>
              <TableHead className="text-zinc-400 font-medium">Tags</TableHead>
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
                <TableCell colSpan={8} className="h-24 text-center text-zinc-500">
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
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                          "h-6 w-6 hover:bg-amber-100/20",
                          bot.isFeatured ? "text-amber-500" : "text-zinc-500"
                        )}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onToggleFeatured && onToggleFeatured(bot.botId, e); 
                        }}
                        title={bot.isFeatured ? "Xóa tag Nổi Bật" : "Đánh dấu là Nổi Bật"}
                      >
                        <Star className={cn("h-4 w-4", bot.isFeatured && "fill-current")} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn(
                          "h-6 w-6 hover:bg-blue-100/20",
                          bot.isNew ? "text-blue-500" : "text-zinc-500"
                        )}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onToggleNew && onToggleNew(bot.botId, e); 
                        }}
                        title={bot.isNew ? "Xóa tag Mới" : "Đánh dấu là Mới"}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={cn(
                          "h-6 w-6 hover:bg-emerald-100/20",
                          bot.isBestSeller ? "text-emerald-500" : "text-zinc-500"
                        )}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onToggleBestSeller && onToggleBestSeller(bot.botId, e); 
                        }}
                        title={bot.isBestSeller ? "Xóa tag Bán Chạy" : "Đánh dấu là Bán Chạy"}
                      >
                        <Trophy className={cn("h-4 w-4", bot.isBestSeller && "fill-current")} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400">{bot.propFirm || "—"}</TableCell>
                  <TableCell>
                    <BotStatusBadge status={bot.status} />
                  </TableCell>
                  <TableCell className="text-zinc-400">{bot.minCapital}</TableCell>
                  <TableCell className={cn(
                    bot.profit && bot.profit.startsWith('+') ? "text-green-500" : "text-red-500"
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
