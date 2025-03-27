
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';
import EditableFeaturesCard from '@/components/admin/prop-bots/detail/EditableFeaturesCard';
import EditableStatisticsCard from '@/components/admin/premium-bots/detail/EditableStatisticsCard';

interface PremiumBotOverviewTabProps {
  bot: {
    id: string;
    longDescription: string;
    pairs: string[];
    features: string[];
    type: string;
    exchange: string;
    minCapital: string;
    subscribers: number;
    createdAt: string;
    updatedAt: string;
  };
  statisticsData: { name: string; value: string; icon: React.ReactNode }[];
  onUpdateDescription: (description: string) => void;
  onUpdateTradingPairs: (pairs: string[]) => void;
  onUpdateFeatures: (features: string[]) => void;
  onUpdateStatistics: (stats: { name: string; value: string; icon: React.ReactNode }[]) => void;
  onUpdateBotInfo: (info: { type: string; exchange: string; minCapital: string }) => void;
}

const PremiumBotOverviewTab: React.FC<PremiumBotOverviewTabProps> = ({
  bot,
  statisticsData,
  onUpdateDescription,
  onUpdateTradingPairs,
  onUpdateFeatures,
  onUpdateStatistics,
  onUpdateBotInfo
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <EditableDescriptionCard description={bot.longDescription} onUpdate={onUpdateDescription} />
        
        {/* Trade Statistics */}
        <EditableStatisticsCard 
          statistics={statisticsData} 
          onUpdate={onUpdateStatistics} 
        />
        
        <EditableTradingPairsCard tradingPairs={bot.pairs} onUpdate={onUpdateTradingPairs} />
        
        {/* Features List */}
        {bot.features && <EditableFeaturesCard features={bot.features} onUpdate={onUpdateFeatures} />}
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thông tin Bot</CardTitle>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Chỉnh sửa
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại Bot</h3>
              <p>{bot.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sàn giao dịch</h3>
              <p>{bot.exchange}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vốn tối thiểu</h3>
              <p>{bot.minCapital}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Số người đăng ký</h3>
              <p>{bot.subscribers}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</h3>
              <p>{new Date(bot.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</h3>
              <p>{new Date(bot.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Bot Integration Info removed */}
      </div>
    </div>
  );
};

export default PremiumBotOverviewTab;
