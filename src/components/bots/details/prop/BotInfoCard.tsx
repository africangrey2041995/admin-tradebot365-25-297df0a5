
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BotInfoCardProps {
  botInfo: {
    createdDate: string;
    lastUpdated: string;
    botId: string;
  };
}

const BotInfoCard: React.FC<BotInfoCardProps> = ({ botInfo }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-800">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
        <CardTitle className="text-lg font-medium">Thông Tin Bot</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Ngày Tạo</span>
            <span className="font-semibold text-gray-900 dark:text-white">{botInfo.createdDate}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Cập Nhật Lần Cuối</span>
            <span className="font-semibold text-gray-900 dark:text-white">{botInfo.lastUpdated}</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-600 dark:text-gray-300">Mã Bot</span>
            <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded">{botInfo.botId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotInfoCard;
