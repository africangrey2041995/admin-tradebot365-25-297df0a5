
import { BotRiskLevel } from '@/constants/botTypes';

export const getRiskLabel = (risk: string) => {
  switch (risk) {
    case 'low': return 'Thấp';
    case 'medium': return 'Trung bình';
    case 'high': return 'Cao';
    default: return risk;
  }
};

export const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'momentum': return 'Momentum';
    case 'scalping': return 'Scalping';
    case 'swing': return 'Swing';
    case 'grid': return 'Grid';
    case 'trend': return 'Trend';
    default: return type;
  }
};
