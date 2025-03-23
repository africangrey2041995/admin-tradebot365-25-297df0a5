
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import TabHeader from './TabHeader';
import { getCardClassName, getCardHeaderClassName } from './TabStyles';

interface LogsTabContentProps {
  botId: string;
  userId: string;
  botType: 'premium' | 'prop' | 'user';
  logsData?: CoinstratSignal[];
  signalSourceLabel: string;
  title: string;
  description: string;
}

const LogsTabContent: React.FC<LogsTabContentProps> = ({
  botId,
  userId,
  botType,
  logsData,
  signalSourceLabel,
  title,
  description
}) => {
  return (
    <Card className={getCardClassName(botType)}>
      <CardHeader className={getCardHeaderClassName(botType)}>
        <TabHeader title={title} description={description} botType={botType} />
      </CardHeader>
      <CardContent>
        <CoinstratLogs 
          botId={botId} 
          userId={userId}
          initialData={logsData}
          signalSourceLabel={signalSourceLabel}
          botType={botType}
        />
      </CardContent>
    </Card>
  );
};

export default LogsTabContent;
