
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { BotType } from '@/constants/botTypes';
import { Star, Target, User, Crown, BarChart, Settings } from 'lucide-react';

interface TabHeaderProps {
  title: string;
  description: string;
  botType: 'premium' | 'prop' | 'user';
}

const TabHeader: React.FC<TabHeaderProps> = ({ title, description, botType }) => {
  const getBotIcon = () => {
    switch (botType) {
      case 'premium':
        return <Crown className="h-4 w-4 mr-2 text-yellow-500" />;
      case 'prop':
        return <BarChart className="h-4 w-4 mr-2 text-blue-500" />;
      case 'user':
      default:
        return <User className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  return (
    <>
      <CardTitle className="flex items-center">
        {getBotIcon()}
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </>
  );
};

export default TabHeader;
