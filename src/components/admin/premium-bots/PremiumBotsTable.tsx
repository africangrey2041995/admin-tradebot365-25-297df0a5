
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Pause, Settings, Trash2, Eye, Star, Sparkles, Trophy } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { BotStatusBadge } from './BotStatusBadge';
import { PremiumBot } from "@/types";
import { toast } from "sonner";
import { BotStatus } from '@/constants/botTypes';

interface PremiumBotsTableProps {
  bots: PremiumBot[];
  selectedBots: string[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectBot: (botId: string) => void;
  onViewBotDetail: (botId: string) => void;
  onToggleFeatured?: (botId: string) => void;
  onToggleNew?: (botId: string) => void;
  onToggleBestSeller?: (botId: string) => void;
  onToggleStatus: (botId: string, currentStatus: BotStatus) => void; // New prop for status toggling
}

export const PremiumBotsTable: React.FC<PremiumBotsTableProps> = ({
  bots,
  selectedBots,
  selectAll,
  onSelectAll,
  onSelectBot,
  onViewBotDetail,
  onToggleFeatured,
  onToggleNew,
  onToggleBestSeller,
  onToggleStatus // Add the new prop here
}) => {
  // Handle delete bot
  const handleDeleteBot = (botId: string, botName: string) => {
    // In a real application, this would show a confirmation dialog first
    // and then make an API call to delete the bot
    toast.success(`Đã xóa bot ${botName} thành công`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead className="w-10">
              <Checkbox 
                checked={selectAll}
                onCheckedChange={onSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="text-zinc-400 w-28">ID</TableHead>
            <TableHead className="text-zinc-400">Tên Bot</TableHead>
            <TableHead className="text-zinc-400">Tags</TableHead>
            <TableHead className="text-zinc-400">Trạng thái</TableHead>
            <TableHead className="text-zinc-400">Sàn giao dịch</TableHead>
            <TableHead className="text-zinc-400 text-right">Tài khoản</TableHead>
            <TableHead className="text-zinc-400 text-right">Lợi nhuận</TableHead>
            <TableHead className="text-zinc-400">Ngày tạo</TableHead>
            <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bots.length > 0 ? (
            bots.map((bot) => (
              <TableRow key={bot.botId} className="border-zinc-800">
                <TableCell>
                  <Checkbox 
                    checked={selectedBots.includes(bot.botId)}
                    onCheckedChange={() => onSelectBot(bot.botId)}
                    aria-label={`Select ${bot.name}`}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs text-zinc-400">{bot.botId}</TableCell>
                <TableCell className="font-medium">{bot.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {bot.isFeatured && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-amber-500 hover:text-amber-600 hover:bg-amber-100/20"
                        onClick={() => onToggleFeatured && onToggleFeatured(bot.botId)}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </Button>
                    )}
                    {bot.isNew && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-blue-500 hover:text-blue-600 hover:bg-blue-100/20"
                        onClick={() => onToggleNew && onToggleNew(bot.botId)}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    )}
                    {bot.isBestSeller && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-100/20"
                        onClick={() => onToggleBestSeller && onToggleBestSeller(bot.botId)}
                      >
                        <Trophy className="h-4 w-4 fill-current" />
                      </Button>
                    )}
                    {!bot.isFeatured && !bot.isNew && !bot.isBestSeller && (
                      <span className="text-zinc-500 text-xs">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <BotStatusBadge status={bot.status} />
                </TableCell>
                <TableCell className="text-zinc-400">{bot.exchange || "—"}</TableCell>
                <TableCell className="text-right">{bot.users}</TableCell>
                <TableCell className={`text-right ${bot.profit && bot.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {bot.profit}
                </TableCell>
                <TableCell>{bot.createdDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                      <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 cursor-pointer" 
                        onClick={() => onViewBotDetail(bot.botId)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 cursor-pointer"
                        onClick={() => onToggleStatus(bot.botId, bot.status)}
                      >
                        {bot.status === BotStatus.ACTIVE ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            <span>Tạm dừng</span>
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            <span>Kích hoạt</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      {!bot.isFeatured && (
                        <DropdownMenuItem 
                          className="focus:bg-zinc-800 cursor-pointer"
                          onClick={() => onToggleFeatured && onToggleFeatured(bot.botId)}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          <span>Đánh dấu nổi bật</span>
                        </DropdownMenuItem>
                      )}
                      {!bot.isNew && (
                        <DropdownMenuItem 
                          className="focus:bg-zinc-800 cursor-pointer"
                          onClick={() => onToggleNew && onToggleNew(bot.botId)}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          <span>Đánh dấu là mới</span>
                        </DropdownMenuItem>
                      )}
                      {!bot.isBestSeller && (
                        <DropdownMenuItem 
                          className="focus:bg-zinc-800 cursor-pointer"
                          onClick={() => onToggleBestSeller && onToggleBestSeller(bot.botId)}
                        >
                          <Trophy className="mr-2 h-4 w-4" />
                          <span>Đánh dấu best seller</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem 
                        className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer"
                        onClick={() => handleDeleteBot(bot.botId, bot.name)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Xóa Bot</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                Không tìm thấy kết quả phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
