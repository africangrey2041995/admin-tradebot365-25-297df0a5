
import { PropBot } from '@/types/bot';

interface PropBotStats {
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
}

export const usePropBotStats = (propBot: PropBot | null): PropBotStats => {
  // Bot stats for the overview tab - maintaining these for backward compatibility
  // but in future can be replaced with real data when available
  const botStats = {
    totalTrades: 42,
    winRate: "68%",
    profitFactor: 2.4,
    sharpeRatio: 1.8,
    currentDrawdown: propBot?.maxDrawdown || "2.3%",
  };

  // Bot info for the info card
  const botInfo = {
    createdDate: propBot?.createdDate || '',
    lastUpdated: propBot?.lastUpdated || '',
    botId: propBot?.botId || '',
  };

  return {
    botStats,
    botInfo
  };
};
