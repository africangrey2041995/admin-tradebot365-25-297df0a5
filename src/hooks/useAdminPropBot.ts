
import { useState, useEffect } from 'react';
import { PropBot } from '@/types/bot';
import { BotStatus } from '@/constants/botTypes';
import { mockPropBots } from '@/mocks/propBotsMock';
import { toast } from "sonner";

interface UsePropBotReturn {
  propBot: PropBot | null;
  isLoading: boolean;
  handleRefresh: () => void;
  handleUpdateBot: (updatedData: Partial<PropBot>) => void;
  handleUpdateStatus: (newStatus: BotStatus) => void;
  connectedAccounts: number;
  processedSignals: number;
  updateChallengeRules: (propFirm: string, rules: string[]) => void;
  challengeRules: Record<string, string[]>;
}

export const useAdminPropBot = (botId?: string): UsePropBotReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [propBot, setPropBot] = useState<PropBot | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState(0);
  const [processedSignals, setProcessedSignals] = useState(0);
  const [challengeRules, setChallengeRules] = useState<Record<string, string[]>>({
    "Coinstrat Pro": [
      "Đạt mục tiêu lợi nhuận tối thiểu 10% trong vòng 30 ngày",
      "Không vượt quá 5% drawdown trong bất kỳ thời điểm nào",
      "Giao dịch ít nhất 15 ngày trong tháng",
      "Không sử dụng martingale hoặc grid trading",
      "Không có lệnh mở qua đêm vào cuối tuần",
      "Duy trì lợi nhuận ổn định, không có ngày lỗ quá 2%"
    ]
  });

  useEffect(() => {
    // In a real application, we would fetch the data from an API
    // For now, we'll use mock data and simulate a loading state
    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Looking for botId:", botId);
      console.log("Available bots:", mockPropBots.map(b => b.botId));
      
      const foundBot = mockPropBots.find(bot => bot.botId === botId);
      if (foundBot) {
        console.log("Found bot:", foundBot);
        setPropBot(foundBot);
        
        // Simulate fetching connected accounts and processed signals
        setConnectedAccounts(Math.floor(Math.random() * 20) + 5); // Random 5-25 accounts
        setProcessedSignals(Math.floor(Math.random() * 500) + 100); // Random 100-600 signals
      } else {
        console.log("Bot not found");
        toast.error("Không tìm thấy bot với ID đã cung cấp");
      }
      setIsLoading(false);
    }, 800);
  }, [botId]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      const foundBot = mockPropBots.find(bot => bot.botId === botId);
      if (foundBot) {
        setPropBot(foundBot);
        
        // Update the simulation counts on refresh
        setConnectedAccounts(Math.floor(Math.random() * 20) + 5);
        setProcessedSignals(Math.floor(Math.random() * 500) + 100);
        
        toast.success("Đã làm mới dữ liệu");
      } else {
        toast.error("Không tìm thấy bot với ID đã cung cấp");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleUpdateBot = (updatedData: Partial<PropBot>) => {
    if (!propBot) return;
    
    // Update the local state
    const updatedBot = { ...propBot, ...updatedData };
    setPropBot(updatedBot);
    
    // In a real application, you would make an API call here
    console.log("Bot updated:", updatedBot);
    
    // Show success toast
    toast.success("Thông tin bot đã được cập nhật");
  };

  const handleUpdateStatus = (newStatus: BotStatus) => {
    if (!propBot) return;
    
    // Update the local state with the new status
    const updatedBot = { ...propBot, status: newStatus };
    setPropBot(updatedBot);
    
    // In a real application, you would make an API call here
    console.log("Bot status updated:", updatedBot);
  };

  const updateChallengeRules = (propFirm: string, rules: string[]) => {
    // In a real application, you would make an API call here
    setChallengeRules(prev => ({
      ...prev,
      [propFirm]: rules
    }));
    
    console.log(`Updated challenge rules for ${propFirm}:`, rules);
    // No toast here as the component will show its own success message
  };

  return {
    propBot,
    isLoading,
    handleRefresh,
    handleUpdateBot,
    handleUpdateStatus,
    connectedAccounts,
    processedSignals,
    updateChallengeRules,
    challengeRules
  };
};
