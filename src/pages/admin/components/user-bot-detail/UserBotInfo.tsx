
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import BotInfoCard from '@/components/bots/BotInfoCard';
import { BotCardProps } from '@/components/bots/BotCard';

interface UserBotInfoProps {
  bot: BotCardProps;
}

const UserBotInfo: React.FC<UserBotInfoProps> = ({ bot }) => {
  return (
    <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <CardContent className="pt-6">
        <BotInfoCard bot={bot} />
      </CardContent>
    </Card>
  );
};

export default UserBotInfo;
