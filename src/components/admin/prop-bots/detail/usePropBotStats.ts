
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
  challengeRules: Record<string, string[]>;
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

  // Challenge rules grouped by Prop Firm types
  const challengeRules: Record<string, string[]> = {
    "FTMO": [
      "Đạt mục tiêu lợi nhuận tối thiểu 10% trong vòng 30 ngày",
      "Không vượt quá 5% drawdown trong bất kỳ thời điểm nào",
      "Giao dịch ít nhất 15 ngày trong tháng",
      "Không sử dụng martingale hoặc grid trading"
    ],
    "MyForexFunds": [
      "Đạt mục tiêu lợi nhuận 8% trong vòng 30 ngày",
      "Không vượt quá 4% drawdown trong bất kỳ thời điểm nào",
      "Không có lệnh mở qua đêm vào cuối tuần",
      "Duy trì lợi nhuận ổn định, không có ngày lỗ quá 2%"
    ],
    "Default": [
      "Đạt mục tiêu lợi nhuận tối thiểu 10% trong vòng 30 ngày",
      "Không vượt quá 5% drawdown trong bất kỳ thời điểm nào",
      "Giao dịch ít nhất 15 ngày trong tháng",
      "Không sử dụng martingale hoặc grid trading",
      "Không có lệnh mở qua đêm vào cuối tuần",
      "Duy trì lợi nhuận ổn định, không có ngày lỗ quá 2%"
    ]
  };

  return {
    botStats,
    botInfo,
    challengeRules
  };
};
