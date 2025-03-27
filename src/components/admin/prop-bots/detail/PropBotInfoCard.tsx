
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart4 } from 'lucide-react';
import { PropBot } from '@/types/bot';
import BotHeader from './components/BotHeader';
import BotDescription from './components/BotDescription';
import BotMetadata from './components/BotMetadata';
import BotMetrics from './components/BotMetrics';
import BotRiskLevel from './components/BotRiskLevel';
import BotChallengeInfo from './components/BotChallengeInfo';

export interface PropBotInfoCardProps {
  botId: string;
  description: string;
  createdDate: string;
  lastUpdated: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  propFirm?: string;
  exchange?: string;
  status: string;
  risk: string;
  colorScheme?: string;
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
  challengeDuration,
  connectedAccounts,
  processedSignals,
  onUpdate = () => {}
}) => {
  const getColorSchemeClasses = () => {
    switch (colorScheme) {
      case 'blue': return 'bg-blue-500/10 border-blue-500/30';
      case 'green': return 'bg-green-500/10 border-green-500/30';
      case 'red': return 'bg-red-500/10 border-red-500/30';
      case 'purple': return 'bg-purple-500/10 border-purple-500/30';
      default: return 'bg-slate-500/10 border-slate-500/30';
    }
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${getColorSchemeClasses()}`}>
            <BarChart4 className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <BotHeader 
              botId={botId}
              status={status}
              onUpdate={onUpdate}
            />
            
            <BotDescription 
              description={description}
              onUpdate={onUpdate}
            />
            
            <BotMetadata 
              createdDate={createdDate}
              lastUpdated={lastUpdated}
              exchange={exchange}
              propFirm={propFirm}
              onUpdate={onUpdate}
            />
            
            <BotMetrics 
              connectedAccounts={connectedAccounts}
              processedSignals={processedSignals}
            />
            
            <BotRiskLevel 
              risk={risk}
              onUpdate={onUpdate}
            />
            
            {(minCapital || challengeDuration) && (
              <BotChallengeInfo 
                minCapital={minCapital}
                challengeDuration={challengeDuration}
                onUpdate={onUpdate}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropBotInfoCard;
