
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChallengeProgressCard from './ChallengeProgressCard';
import BotStatsCard from './BotStatsCard';
import ChallengeRulesCard from './ChallengeRulesCard';
import WarningCard from './WarningCard';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Progress in Current Challenge */}
        <ChallengeProgressCard 
          phase={challengeData.phase}
          progress={challengeData.progress}
          accountBalance={challengeData.accountBalance}
          profitTarget={challengeData.profitTarget}
          maxDrawdown={challengeData.maxDrawdown}
          daysRemaining={challengeData.daysRemaining}
          description={challengeData.description}
        />

        {/* Bot Statistics */}
        <BotStatsCard 
          totalTrades={botStats.totalTrades}
          winRate={botStats.winRate}
          profitFactor={botStats.profitFactor}
          sharpeRatio={botStats.sharpeRatio}
          currentDrawdown={botStats.currentDrawdown}
          createdDate={botInfo.createdDate}
          lastUpdated={botInfo.lastUpdated}
          botId={botInfo.botId}
        />
      </div>

      <div className="space-y-6">
        {/* Challenge Rules */}
        <ChallengeRulesCard rules={challengeRules} />

        {/* Warning Card */}
        <WarningCard />
      </div>
    </div>
  );
};

export default PropBotOverviewTab;
