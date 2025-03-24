
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from 'lucide-react';

interface BotInfoCardProps {
  botInfo: {
    createdDate: string;
    lastUpdated: string;
    botId: string;
  };
}

const BotInfoCard: React.FC<BotInfoCardProps> = ({ botInfo }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Info className="h-4 w-4 mr-2 text-blue-500" />
          Thông tin Bot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Ngày tạo:</span>
          <span className="text-sm">{botInfo.createdDate}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-1">
          <span className="text-sm text-muted-foreground">Cập nhật cuối:</span>
          <span className="text-sm">{botInfo.lastUpdated}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Bot ID:</span>
          <code className="text-xs bg-gray-50 dark:bg-gray-800 px-1 py-0.5 rounded">{botInfo.botId}</code>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotInfoCard;
