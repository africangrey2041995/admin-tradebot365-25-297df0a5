import React, { useState } from 'react';
import ChallengeProgressCard from '@/components/bots/details/prop/ChallengeProgressCard';
import BotStatsCard from '@/components/bots/details/prop/BotStatsCard';
import WarningCard from '@/components/bots/details/prop/WarningCard';
import BotInfoCard from '@/components/bots/details/prop/BotInfoCard';
import ChallengeRulesCard from '@/components/bots/details/prop/ChallengeRulesCard';
import { BarChart } from 'lucide-react';
import EditableFeaturesCard from './EditableFeaturesCard';
import EditableRequirementsCard from './EditableRequirementsCard';
import BotPerformanceCard from './BotPerformanceCard';
import { PropBot } from '@/types/bot';
import { toast } from 'sonner';

interface PropBotOverviewTabProps {
  propBot: PropBot;
  challengeData: {
    phase: string;
    progress: number;
    accountBalance: string;
    profitTarget: string;
    maxDrawdown: string;
    daysRemaining: string;
    description: string;
  };
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
  challengeRules: string[];
  onUpdateBot?: (updatedData: Partial<PropBot>) => void;
}

const PropBotOverviewTab: React.FC<PropBotOverviewTabProps> = ({
  propBot,
  challengeData,
  botStats,
  botInfo,
  challengeRules,
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
  };

  const handleUpdateRequirements = (updatedRequirements: string[]) => {
    setRequirements(updatedRequirements);
    // Here you would typically update the backend
    console.log('Requirements updated:', updatedRequirements);
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
      <ChallengeProgressCard challengeData={challengeData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/20 rounded border border-dashed border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <BarChart className="h-8 w-8 mb-2 opacity-50" />
              <p>Biểu đồ hiệu suất</p>
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
          <BotStatsCard stats={botStats} />
          <WarningCard />
          <BotInfoCard botInfo={botInfo} />
        </div>
      </div>
      
      <ChallengeRulesCard rules={challengeRules} />
    </div>
  );
};

export default PropBotOverviewTab;
