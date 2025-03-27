
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BotStatus } from '@/constants/botTypes';

interface BotStatusBadgeProps {
  status: string;
}

export const BotStatusBadge: React.FC<BotStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case BotStatus.ACTIVE:
      return (
        <Badge variant="outline" className="bg-green-950 border-green-700 text-green-500">
          Hoạt động
        </Badge>
      );
    case BotStatus.INACTIVE:
      return (
        <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400">
          Không hoạt động
        </Badge>
      );
    case BotStatus.MAINTENANCE:
      return (
        <Badge variant="outline" className="bg-amber-950 border-amber-700 text-amber-500">
          Bảo trì
        </Badge>
      );
    case BotStatus.PENDING:
      return (
        <Badge variant="outline" className="bg-blue-950 border-blue-700 text-blue-500">
          Đang chờ
        </Badge>
      );
    case BotStatus.ERROR:
      return (
        <Badge variant="outline" className="bg-red-950 border-red-700 text-red-500">
          Lỗi
        </Badge>
      );
    case BotStatus.SUSPENDED:
      return (
        <Badge variant="outline" className="bg-purple-950 border-purple-700 text-purple-500">
          Tạm ngưng
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400">
          {status}
        </Badge>
      );
  }
};
