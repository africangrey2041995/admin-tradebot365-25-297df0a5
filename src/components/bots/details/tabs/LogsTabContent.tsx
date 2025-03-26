
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';
import { CoinstratSignal } from '@/types/signal';
import CoinstratLogs from '@/components/bots/CoinstratLogs';

interface LogsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  title: string;
  logsData?: CoinstratSignal[];
  isLoading?: boolean;
  signalSourceLabel?: string;
}

const LogsTabContent: React.FC<LogsTabContentProps> = ({
  botId,
  userId,
  botType,
  title,
  logsData,
  isLoading,
  signalSourceLabel = 'TB365 ID'
}) => {
  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} botType={botType} />
      </CardHeader>
      <CardContent>
        <CoinstratLogs 
          botId={botId} 
          userId={userId}
          initialData={logsData}
          signalSourceLabel={signalSourceLabel}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default LogsTabContent;
