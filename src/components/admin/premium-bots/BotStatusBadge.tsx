
import React from 'react';
import { Badge } from '@/components/ui/badge';

type BotStatus = 'active' | 'inactive' | 'maintenance';

interface BotStatusBadgeProps {
  status: BotStatus;
}

export const BotStatusBadge: React.FC<BotStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-600/20 text-green-500 border-green-600/20 hover:bg-green-600/30">
          Hoạt động
        </Badge>
      );
    case 'inactive':
      return (
        <Badge className="bg-yellow-600/20 text-yellow-500 border-yellow-600/20 hover:bg-yellow-600/30">
          Tạm dừng
        </Badge>
      );
    case 'maintenance':
      return (
        <Badge className="bg-blue-600/20 text-blue-500 border-blue-600/20 hover:bg-blue-600/30">
          Bảo trì
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-600/20 text-zinc-400 border-zinc-600/20">
          {status}
        </Badge>
      );
  }
};
