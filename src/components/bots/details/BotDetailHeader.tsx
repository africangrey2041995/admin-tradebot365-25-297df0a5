
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { BotRiskLevel } from '@/constants/botTypes';
import { useNavigate } from 'react-router-dom';

interface BotDetailHeaderProps {
  botName: string;
  botId: string;
  risk: BotRiskLevel;
  backPath: string;
}

const BotDetailHeader: React.FC<BotDetailHeaderProps> = ({
  botName,
  botId,
  risk,
  backPath,
}) => {
  const navigate = useNavigate();

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung bình';
      case 'high': return 'Cao';
      default: return risk;
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(backPath)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        <h2 className="text-xl font-bold">{botName}</h2>
        <Badge className={getRiskColor(risk)}>
          Rủi ro: {getRiskLabel(risk)}
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
          {botId}
        </Badge>
      </div>
    </div>
  );
};

export default BotDetailHeader;
