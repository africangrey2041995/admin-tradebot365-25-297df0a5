
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface BotOverviewCardProps {
  botId: string;
}

const BotOverviewCard: React.FC<BotOverviewCardProps> = ({ botId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tổng quan Bot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">ID Bot</h3>
            <p className="font-medium">{botId}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Trạng thái</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <p className="font-medium">Hoạt động</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Thống kê</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tổng Giao Dịch</p>
                <p className="font-medium">143</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tỷ lệ thắng</p>
                <p className="font-medium">68%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">P&L Trung bình</p>
                <p className="font-medium text-green-500">+2.4%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drawdown</p>
                <p className="font-medium text-red-500">-3.8%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotOverviewCard;
