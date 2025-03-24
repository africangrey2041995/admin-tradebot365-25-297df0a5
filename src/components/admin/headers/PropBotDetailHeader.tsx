
import React from 'react';
import { ArrowLeft, RefreshCw, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PropBotRiskBadge from '../badges/PropBotRiskBadge';
import PropBotStatusBadge from '../badges/PropBotStatusBadge';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';

interface PropBotDetailHeaderProps {
  botName: string;
  botDescription: string;
  botStatus: BotStatus;
  botRisk: BotRiskLevel;
  isRefreshing: boolean;
  onBackClick: () => void;
  onRefreshClick: () => void;
  onEditClick: () => void;
}

const PropBotDetailHeader: React.FC<PropBotDetailHeaderProps> = ({
  botName,
  botDescription,
  botStatus,
  botRisk,
  isRefreshing,
  onBackClick,
  onRefreshClick,
  onEditClick
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onBackClick}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{botName}</h1>
            <div className="flex items-center gap-2">
              <PropBotStatusBadge status={botStatus} />
              <PropBotRiskBadge risk={botRisk} />
            </div>
          </div>
          <p className="text-muted-foreground mt-1">{botDescription}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEditClick}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </Button>
        <Button onClick={onRefreshClick} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default PropBotDetailHeader;
