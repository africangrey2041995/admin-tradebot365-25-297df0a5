
import { useState, useEffect, useCallback } from 'react';
import { PropBot } from '@/types/bot';
import { toast } from "sonner";
import { BotStatus, BotRiskLevel, BotType } from '@/constants/botTypes';
import { useBotAccounts } from './useBotAccounts';

const mockPropBot: PropBot = {
  botId: 'PROP-001',
  name: 'Cơ Bản Prop Bot',
  description: "Bot phân tích thị trường 24/7 tối ưu hóa cho thương mại Prop Trading.",
  performanceLastMonth: '+15.8%',
  performanceAllTime: '+42.3%',
  risk: BotRiskLevel.MEDIUM,
  exchange: 'Binance Futures',
  propFirm: 'FTMO & MyForexFunds',
  status: BotStatus.ACTIVE,
  users: 156,
  createdDate: '2023-06-15',
  lastUpdated: '2023-11-10',
  minCapital: '$5,000',
  maxDrawdown: '5%',
  challengeDuration: '30 ngày',
  // Add missing properties required by PropBot type
  type: BotType.PROP_BOT,
  profit: '+22.5%'
};

interface UseAdminPropBotReturn {
  propBot: PropBot | null;
  isLoading: boolean;
  error: Error | null;
  handleRefresh: () => void;
  handleUpdateBot: (updatedData: Partial<PropBot>) => void;
  handleUpdateStatus: (newStatus: BotStatus) => void;
  connectedAccounts: any[];
  processedSignals: any[];
  challengeRules: Record<string, string[]>;
  updateChallengeRules: (propFirm: string, rules: string[]) => void;
}

export const useAdminPropBot = (botId?: string): UseAdminPropBotReturn => {
  const [propBot, setPropBot] = useState<PropBot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [processedSignals, setProcessedSignals] = useState<any[]>([]);
  const [challengeRules, setChallengeRules] = useState<Record<string, string[]>>({
    'FTMO': [
      'Max Daily Loss: 5% of account balance',
      'Max Total Loss: 10% of account balance',
      'Profit Target: 10% of account within 30 days',
      'Trading Days Required: At least 10 trading days',
      'Time Period: Complete all trading within 30 days'
    ],
    'MyForexFunds': [
      'Max Daily Loss: 5% of account balance',
      'Max Total Loss: 12% of account balance',
      'Profit Target: 8% of account within 30 days',
      'No weekend trading allowed',
      'Time Period: Complete all trading within 30 days'
    ]
  });
  
  // Use our enhanced bot accounts hook to fetch account data
  const { 
    accounts: connectedAccounts, 
    fetchAccounts, 
    loading: accountsLoading 
  } = useBotAccounts(botId || '', 'admin', []);

  const fetchPropBot = useCallback(() => {
    // This would normally be an API call
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        // Using mock data for development purposes
        // In a real implementation, fetch from API based on botId
        setPropBot({
          ...mockPropBot,
          botId: botId || 'PROP-001'
        });
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch prop bot'));
        setIsLoading(false);
      }
    }, 1000);
  }, [botId]);

  // Initial fetch
  useEffect(() => {
    fetchPropBot();
  }, [fetchPropBot]);

  const handleRefresh = () => {
    toast.info("Đang làm mới dữ liệu...");
    fetchPropBot();
    fetchAccounts();
  };

  const handleUpdateBot = (updatedData: Partial<PropBot>) => {
    if (propBot) {
      const updatedBot = {
        ...propBot,
        ...updatedData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setPropBot(updatedBot);
      toast.success("Bot đã được cập nhật thành công");
    }
  };

  const handleUpdateStatus = (newStatus: BotStatus) => {
    if (propBot) {
      setPropBot({
        ...propBot,
        status: newStatus,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      
      const statusText = 
        newStatus === BotStatus.ACTIVE ? 'Hoạt động' :
        newStatus === BotStatus.INACTIVE ? 'Không hoạt động' :
        // Fix the PAUSED reference which doesn't exist in BotStatus
        // Using a proper value from BotStatus enum
        newStatus === BotStatus.MAINTENANCE ? 'Tạm dừng' : 'Đang bảo trì';
      
      toast.success(`Trạng thái của bot đã được cập nhật thành: ${statusText}`);
    }
  };

  const updateChallengeRules = (propFirm: string, rules: string[]) => {
    setChallengeRules(prev => ({
      ...prev,
      [propFirm]: rules
    }));
    toast.success(`Quy tắc thử thách cho ${propFirm} đã được cập nhật`);
  };

  return {
    propBot,
    isLoading: isLoading || accountsLoading,
    error,
    handleRefresh,
    handleUpdateBot,
    handleUpdateStatus,
    connectedAccounts,
    processedSignals,
    challengeRules,
    updateChallengeRules
  };
};
