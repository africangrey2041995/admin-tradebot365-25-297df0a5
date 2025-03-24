
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Play, Pause, Settings, Trash2, Eye } from "lucide-react";
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

interface PremiumBotsTableProps {
  bots: PremiumBot[];
  selectedBots: string[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectBot: (botId: string) => void;
  onViewBotDetail: (botId: string) => void;
}

export const PremiumBotsTable: React.FC<PremiumBotsTableProps> = ({
  bots,
  selectedBots,
  selectAll,
  onSelectAll,
  onSelectBot,
  onViewBotDetail
}) => {
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
            <TableHead className="text-zinc-400">Trạng thái</TableHead>
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
                  <BotStatusBadge status={bot.status} />
                </TableCell>
                <TableCell className="text-right">{bot.users}</TableCell>
                <TableCell className={`text-right ${bot.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
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
                      <DropdownMenuItem className="focus:bg-zinc-800" onClick={() => onViewBotDetail(bot.botId)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Xem chi tiết</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Chỉnh sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800">
                        {bot.status === 'active' ? (
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
                      <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500">
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
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                Không tìm thấy kết quả phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
