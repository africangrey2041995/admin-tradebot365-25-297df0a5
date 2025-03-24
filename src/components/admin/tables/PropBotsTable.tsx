
import React from 'react';
import { PropBot } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash, MoreHorizontal, FileQuestion, Loader2 } from 'lucide-react';
import PropBotRiskBadge from '../badges/PropBotRiskBadge';
import PropBotStatusBadge from '../badges/PropBotStatusBadge';
import PropBotIdBadge from '../badges/PropBotIdBadge';

interface PropBotsTableProps {
  bots: PropBot[];
  isLoading: boolean;
  onViewBot: (botId: string) => void;
  onEditBot: (botId: string) => void;
  onDeleteBot: (botId: string) => void;
}

const PropBotsTable: React.FC<PropBotsTableProps> = ({
  bots,
  isLoading,
  onViewBot,
  onEditBot,
  onDeleteBot,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (bots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <FileQuestion className="h-12 w-12 text-muted-foreground opacity-30 mb-2" />
        <h3 className="text-lg font-medium">Không tìm thấy bot nào</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Thử thay đổi bộ lọc tìm kiếm hoặc tạo một bot mới.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Tên Bot</th>
          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Bot ID</th>
          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Prop Firm</th>
          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Trạng thái</th>
          <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rủi ro</th>
          <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Người dùng</th>
          <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Hiệu suất</th>
          <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {bots.map((bot) => (
          <tr key={bot.botId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td className="px-4 py-3">
              <span className="font-medium">{bot.name}</span>
            </td>
            <td className="px-4 py-3 text-sm">
              <PropBotIdBadge botId={bot.botId} />
            </td>
            <td className="px-4 py-3 text-sm">
              {bot.propFirm}
            </td>
            <td className="px-4 py-3 text-sm">
              <PropBotStatusBadge status={bot.status} />
            </td>
            <td className="px-4 py-3 text-sm">
              <PropBotRiskBadge risk={bot.risk} />
            </td>
            <td className="px-4 py-3 text-sm text-right">
              {bot.users}
            </td>
            <td className="px-4 py-3 text-sm text-right">
              <div className={`font-medium ${parseFloat(bot.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {bot.profit}
              </div>
            </td>
            <td className="px-4 py-3 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewBot(bot.botId)}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>Xem chi tiết</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEditBot(bot.botId)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Chỉnh sửa</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDeleteBot(bot.botId)} className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Xóa</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropBotsTable;
