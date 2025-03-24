
import { useState, useEffect } from 'react';
import { PremiumBot } from '@/types';
import { BotType, BotStatus, BotRiskLevel } from '@/constants/botTypes';
import { toast } from 'sonner';

interface UseBotAuthorizationProps {
  botId: string | undefined;
  userId: string;
}

interface UseBotAuthorizationReturn {
  isLoading: boolean;
  isAuthorized: boolean;
  bot: PremiumBot | null;
}

export const useBotAuthorization = ({ 
  botId, 
  userId 
}: UseBotAuthorizationProps): UseBotAuthorizationReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [bot, setBot] = useState<PremiumBot | null>(null);

  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        const mockBot: PremiumBot = {
          id: botId || 'pb-001',
          name: 'Alpha Momentum',
          description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
          exchange: 'Coinstart Pro',
          type: BotType.PREMIUM_BOT,
          performanceLastMonth: '+18.5%',
          performanceAllTime: '+125.4%',
          risk: BotRiskLevel.MEDIUM,
          minCapital: '$500',
          status: BotStatus.ACTIVE,
          subscribers: 86,
          imageUrl: null,
          colorScheme: 'green',
          isIntegrated: true,
          botId: 'PRE7459', // External ID used for display
          createdDate: '2023-10-15',
          lastUpdated: '2023-11-10',
          ownerId: userId,
          users: 86, // Added for admin context
          profit: '+18.5%' // Added for admin context
        };
        
        // Check if the current user is the owner of this bot
        const userIsOwner = mockBot.ownerId === userId;
        
        if (userIsOwner) {
          setBot(mockBot);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          toast.error('Bạn không có quyền truy cập bot này');
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotDetails();
  }, [botId, userId]);

  return {
    isLoading,
    isAuthorized,
    bot
  };
};
