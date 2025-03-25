
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
}

export const useAdminPropBot = (botId?: string): UsePropBotReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [propBot, setPropBot] = useState<PropBot | null>(null);

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

  return {
    propBot,
    isLoading,
    handleRefresh,
    handleUpdateBot,
    handleUpdateStatus
  };
};
