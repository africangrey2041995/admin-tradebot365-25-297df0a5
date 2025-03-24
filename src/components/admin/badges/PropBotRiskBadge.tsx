
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BotRiskLevel, BOT_RISK_DISPLAY } from '@/constants/botTypes';
import { AlertTriangle } from 'lucide-react';

interface PropBotRiskBadgeProps {
  risk: BotRiskLevel;
}

const PropBotRiskBadge: React.FC<PropBotRiskBadgeProps> = ({ risk }) => {
  let className = '';
  
  switch (risk) {
    case BotRiskLevel.LOW:
      className = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      break;
    case BotRiskLevel.MEDIUM:
      className = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      break;
    case BotRiskLevel.HIGH:
      className = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      break;
  }
  
  return (
    <Badge variant="outline" className={className}>
      <span className="flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        <span>{BOT_RISK_DISPLAY[risk]}</span>
      </span>
    </Badge>
  );
};

export default PropBotRiskBadge;
