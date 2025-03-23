
import { cn } from '@/lib/utils';

export const getTabsListClassName = (botType: 'premium' | 'prop' | 'user') => {
  switch (botType) {
    case 'premium':
      return "bg-yellow-100/50 dark:bg-yellow-900/20";
    case 'prop':
      return "bg-blue-100/50 dark:bg-blue-900/20";
    case 'user':
    default:
      return "";
  }
};

export const getTabTriggerClassName = (botType: 'premium' | 'prop' | 'user') => {
  switch (botType) {
    case 'premium':
      return "data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-900 dark:data-[state=active]:bg-yellow-900/30 dark:data-[state=active]:text-yellow-100";
    case 'prop':
      return "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-100";
    case 'user':
    default:
      return "";
  }
};

export const getCardClassName = (botType: 'premium' | 'prop' | 'user') => {
  switch (botType) {
    case 'premium':
      return "border-yellow-200 dark:border-yellow-800/30";
    case 'prop':
      return "border-blue-200 dark:border-blue-800/30";
    case 'user':
    default:
      return "";
  }
};

export const getCardHeaderClassName = (botType: 'premium' | 'prop' | 'user') => {
  switch (botType) {
    case 'premium':
      return "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800/30";
    case 'prop':
      return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-b border-blue-200 dark:border-blue-800/30";
    case 'user':
    default:
      return "";
  }
};

export const getContainerClassName = (botType: 'premium' | 'prop' | 'user') => {
  return cn(
    "space-y-4",
    botType === 'premium' && "premium-bot-container",
    botType === 'prop' && "prop-bot-container"
  );
};

export const getTabIcon = (tab: string, botType: 'premium' | 'prop' | 'user') => {
  if (tab === 'overview') {
    switch (botType) {
      case 'premium':
        return <Star className="h-4 w-4 mr-1 text-yellow-500" />;
      case 'prop':
        return <Target className="h-4 w-4 mr-1 text-blue-500" />;
      case 'user':
      default:
        return <Settings className="h-4 w-4 mr-1 text-gray-500" />;
    }
  }
  return null;
};
