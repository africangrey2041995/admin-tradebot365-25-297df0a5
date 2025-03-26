
import React from 'react';
import ChallengeProgressCard from './ChallengeProgressCard';
import BotStatsCard from './BotStatsCard';
import WarningCard from './WarningCard';
import BotInfoCard from './BotInfoCard';
import ChallengeRulesCard from './ChallengeRulesCard';
import { BarChart } from 'lucide-react';

interface PropBotOverviewTabProps {
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
}

const PropBotOverviewTab: React.FC<PropBotOverviewTabProps> = ({
  challengeData,
  botStats,
  botInfo,
  challengeRules
}) => {
  // Default values to prevent "undefined" errors
  const defaultChallengeData = {
    phase: "Challenge Phase",
    progress: 0,
    accountBalance: "$0",
    profitTarget: "0%",
    maxDrawdown: "0%",
    daysRemaining: "0 days",
    description: "No description available"
  };

  const defaultBotStats = {
    totalTrades: 0,
    winRate: "0%",
    profitFactor: 0,
    sharpeRatio: 0,
    currentDrawdown: "0%"
  };

  const defaultBotInfo = {
    createdDate: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    botId: "PROP-000"
  };

  // Use provided data or defaults
  const safeChallenge = challengeData || defaultChallengeData;
  const safeStats = botStats || defaultBotStats;
  const safeInfo = botInfo || defaultBotInfo;
  const safeRules = challengeRules || [];

  return (
    <div className="space-y-6">
      <ChallengeProgressCard challengeData={safeChallenge} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/20 rounded border border-dashed border-gray-200 dark:border-gray-700">
            <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <BarChart className="h-8 w-8 mb-2 opacity-50" />
              <p>Biểu đồ hiệu suất</p>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <BotStatsCard stats={safeStats} />
          <WarningCard />
          <BotInfoCard botInfo={safeInfo} />
        </div>
      </div>
      
      <ChallengeRulesCard rules={safeRules} />
    </div>
  );
};

export default PropBotOverviewTab;
