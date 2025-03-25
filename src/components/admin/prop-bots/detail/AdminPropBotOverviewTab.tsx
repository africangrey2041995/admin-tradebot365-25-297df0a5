
import React, { useState } from 'react';
import BotInfoCard from '@/components/bots/details/prop/BotInfoCard';
import { BarChart2, Users, Settings, FileText } from 'lucide-react';
import EditableFeaturesCard from './EditableFeaturesCard';
import EditableRequirementsCard from './EditableRequirementsCard';
import BotPerformanceCard from './BotPerformanceCard';
import { PropBot } from '@/types/bot';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';

interface AdminPropBotOverviewTabProps {
  propBot: PropBot;
  botStats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
  botInfo: {
    createdDate: string;
    lastUpdated: string;
    botId: string;
  };
  onUpdateBot?: (updatedData: Partial<PropBot>) => void;
}

const AdminPropBotOverviewTab: React.FC<AdminPropBotOverviewTabProps> = ({
  propBot,
  botStats,
  botInfo,
  onUpdateBot = () => {}
}) => {
  // Initial features and requirements
  const [features, setFeatures] = useState([
    'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
    'Quản lý rủi ro tự động theo yêu cầu của Prop Firm',
    'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
    'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
  ]);
  
  const [requirements, setRequirements] = useState([
    `Vốn tối thiểu ${propBot.minCapital}`,
    'Tài khoản Coinstrat Pro đã xác minh',
    'Phù hợp với giai đoạn Challenger hoặc Verification'
  ]);

  const handleUpdateFeatures = (updatedFeatures: string[]) => {
    setFeatures(updatedFeatures);
    // Here you would typically update the backend
    console.log('Features updated:', updatedFeatures);
    toast.success('Đã cập nhật tính năng bot');
  };

  const handleUpdateRequirements = (updatedRequirements: string[]) => {
    setRequirements(updatedRequirements);
    // Here you would typically update the backend
    console.log('Requirements updated:', updatedRequirements);
    toast.success('Đã cập nhật yêu cầu bot');
  };

  const handleUpdatePerformance = (performance: { lastMonth: string; allTime: string }) => {
    // Update the bot with new performance data
    onUpdateBot({
      performanceLastMonth: performance.lastMonth,
      performanceAllTime: performance.allTime
    });
    
    console.log('Performance updated:', performance);
  };

  return (
    <div className="space-y-6">
      {/* Admin Dashboard Summary */}
      <Card className="border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-primary" />
            Thông tin Tổng quan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                Người dùng tích hợp
              </div>
              <div className="text-2xl font-bold">{propBot.users || 0}</div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <Settings className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
                Sàn Giao Dịch
              </div>
              <div className="text-2xl font-bold">{propBot.propFirm || "Coinstrat Pro"}</div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1 flex items-center">
                <FileText className="h-4 w-4 mr-1 text-green-600 dark:text-green-400" />
                Lợi nhuận tiêu chuẩn
              </div>
              <div className="text-2xl font-bold">{propBot.profit || "N/A"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bot Performance Chart Placeholder - for future implementation */}
          <div className="flex items-center justify-center h-64 bg-neutral-50 dark:bg-neutral-900/50 rounded border border-neutral-200 dark:border-neutral-800">
            <div className="text-center text-neutral-500 dark:text-neutral-400 flex flex-col items-center">
              <BarChart2 className="h-8 w-8 mb-2 opacity-50" />
              <p>Biểu đồ hiệu suất tổng hợp</p>
            </div>
          </div>
          
          {/* Admin-only editable cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableFeaturesCard 
              features={features} 
              onUpdate={handleUpdateFeatures}
            />
            
            <EditableRequirementsCard 
              requirements={requirements} 
              onUpdate={handleUpdateRequirements}
            />
          </div>
          
          <BotPerformanceCard 
            performance={{
              lastMonth: propBot.performanceLastMonth,
              allTime: propBot.performanceAllTime
            }}
            onUpdate={handleUpdatePerformance}
            colorScheme="green"
          />
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3 text-lg">Thông số Bot</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tổng giao dịch</span>
                  <span className="font-medium">{botStats.totalTrades}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tỷ lệ thắng</span>
                  <span className="font-medium">{botStats.winRate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Hệ số lợi nhuận</span>
                  <span className="font-medium">{botStats.profitFactor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Tỷ lệ Sharpe</span>
                  <span className="font-medium">{botStats.sharpeRatio}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Drawdown hiện tại</span>
                  <span className="font-medium">{botStats.currentDrawdown}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardContent className="p-6">
              <h3 className="font-medium mb-3 text-lg">Thông tin Bot</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">ID Bot</span>
                  <span className="font-medium">{botInfo.botId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-neutral-600 dark:text-neutral-400">Ngày tạo</span>
                  <span className="font-medium">{botInfo.createdDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Cập nhật lần cuối</span>
                  <span className="font-medium">{botInfo.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Admin Notes Card */}
          <Card className="border border-neutral-200 dark:border-neutral-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full min-h-[150px] p-2 text-sm rounded border border-neutral-200 dark:border-neutral-800 bg-transparent" 
                placeholder="Add admin notes here... (Only visible to admins)"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPropBotOverviewTab;
