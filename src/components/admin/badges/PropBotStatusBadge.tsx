
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BotStatus, BOT_STATUS_DISPLAY } from '@/constants/botTypes';

interface PropBotStatusBadgeProps {
  status: BotStatus;
}

const PropBotStatusBadge: React.FC<PropBotStatusBadgeProps> = ({ status }) => {
  const className = status === BotStatus.ACTIVE 
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
  
  return (
    <Badge variant="outline" className={className}>
      <span>{BOT_STATUS_DISPLAY[status]}</span>
    </Badge>
  );
};

export default PropBotStatusBadge;
