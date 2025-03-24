
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { BotRiskLevel } from '@/constants/botTypes';

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
      className = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      break;
    case BotRiskLevel.HIGH:
      className = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      break;
    default:
      className = 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
  }
  
  const riskDisplay = {
    [BotRiskLevel.LOW]: 'Thấp',
    [BotRiskLevel.MEDIUM]: 'Trung bình',
    [BotRiskLevel.HIGH]: 'Cao'
  };
  
  return (
    <Badge variant="outline" className={className}>
      {riskDisplay[risk]}
    </Badge>
  );
};

export default PropBotRiskBadge;
