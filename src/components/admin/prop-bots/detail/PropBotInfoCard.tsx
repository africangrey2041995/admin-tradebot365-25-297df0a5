
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BotDescription from './components/BotDescription';
import BotHeader from './components/BotHeader';
import BotMetadata from './components/BotMetadata';
import BotMetrics from './components/BotMetrics';
import BotRiskLevel from './components/BotRiskLevel';
import BotChallengeInfo from './components/BotChallengeInfo';
import { BotStatus, BotRiskLevel as RiskLevel } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';

interface PropBotInfoCardProps {
  botId: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  propFirm?: string;
  exchange?: string;
  status: BotStatus;
  risk?: RiskLevel;
  colorScheme?: 'default' | 'red' | 'blue' | 'green' | 'purple';
  minCapital?: string;
  maxDrawdown?: string;
  challengeDuration?: string;
  connectedAccounts: number;
  processedSignals: number;
  onUpdate?: (updatedData: Partial<PropBot>) => void;
}

const PropBotInfoCard: React.FC<PropBotInfoCardProps> = ({
  botId,
  description,
  createdDate,
  lastUpdated,
  performanceLastMonth,
  performanceAllTime,
  propFirm,
  exchange,
  status,
  risk,
  colorScheme = 'green',
  minCapital,
  maxDrawdown,
  challengeDuration,
  connectedAccounts,
  processedSignals,
  onUpdate = () => {}
}) => {
  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardContent className="pt-6">
        <BotHeader
          botId={botId}
          propFirm={propFirm}
          exchange={exchange}
          status={status}
        />
        
        <Separator className="my-4 bg-gray-700" />
        
        <BotDescription 
          description={description} 
          onUpdate={(newDescription) => onUpdate({ description: newDescription })}
        />
        
        <BotMetrics
          performanceLastMonth={performanceLastMonth}
          performanceAllTime={performanceAllTime}
          colorScheme={colorScheme}
          connectedAccounts={connectedAccounts}
          processedSignals={processedSignals}
        />
        
        <BotRiskLevel 
          risk={risk} 
          onUpdate={(newRisk) => onUpdate({ risk: newRisk })}
        />
        
        <BotMetadata
          createdDate={createdDate}
          lastUpdated={lastUpdated}
        />
        
        <BotChallengeInfo
          minCapital={minCapital}
          potentialProfit={performanceLastMonth}
          maxDrawdown={maxDrawdown}
          challengeDuration={challengeDuration}
          onUpdate={onUpdate}
          isAdmin={true}
        />
      </CardContent>
    </Card>
  );
};

export default PropBotInfoCard;
