
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
    default:
      return (
        <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400">
          {status}
        </Badge>
      );
  }
};
