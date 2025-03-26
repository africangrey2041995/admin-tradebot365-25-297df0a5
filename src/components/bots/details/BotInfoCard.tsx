
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, CircuitBoard, Wallet, Calendar, Users } from 'lucide-react';
import { getTypeLabel } from '@/utils/botDetailUtils';

interface BotInfoCardProps {
  type: string;
  exchange: string;
  minCapital: string;
  createdDate: string;
  subscribers: number;
}

const BotInfoCard: React.FC<BotInfoCardProps> = ({
  type,
  exchange,
  minCapital,
  createdDate,
  subscribers
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin chung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Loại Bot</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-white">{getTypeLabel(type)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Sàn giao dịch</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-white">{exchange}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Vốn tối thiểu</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-white">{minCapital}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Ngày tạo</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-white">{createdDate}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Người dùng</span>
          </div>
          <span className="font-medium text-slate-800 dark:text-white">{subscribers}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(BotInfoCard);
