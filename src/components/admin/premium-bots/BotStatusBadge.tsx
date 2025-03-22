
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BotStatus } from '@/constants/botTypes';

interface BotStatusBadgeProps {
  status: BotStatus;
}

export const BotStatusBadge: React.FC<BotStatusBadgeProps> = ({ status }) => {
  const getBadgeVariant = () => {
    switch (status) {
      case BotStatus.ACTIVE:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case BotStatus.INACTIVE:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
      case BotStatus.MAINTENANCE:
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case BotStatus.ERROR:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case BotStatus.SUSPENDED:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
  };

  const getDisplayText = () => {
    switch (status) {
      case BotStatus.ACTIVE:
        return "Hoạt động";
      case BotStatus.INACTIVE:
        return "Không hoạt động";
      case BotStatus.MAINTENANCE:
        return "Bảo trì";
      case BotStatus.ERROR:
        return "Lỗi";
      case BotStatus.SUSPENDED:
        return "Đã khóa";
      default:
        return "Không xác định";
    }
  };

  return (
    <Badge variant="outline" className={getBadgeVariant()}>
      {getDisplayText()}
    </Badge>
  );
};
