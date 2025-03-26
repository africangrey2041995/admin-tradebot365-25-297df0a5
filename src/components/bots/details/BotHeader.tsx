
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { getRiskColor, getRiskLabel } from '@/utils/botDetailUtils';

interface BotHeaderProps {
  name: string;
  risk: string;
  botId: string;
  onBack: () => void;
}

const BotHeader: React.FC<BotHeaderProps> = ({ 
  name, 
  risk, 
  botId, 
  onBack 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
          {name}
          <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
        </h1>
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

export default React.memo(BotHeader);
