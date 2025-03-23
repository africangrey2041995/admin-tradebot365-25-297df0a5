
import { useState, useEffect } from 'react';
import { BotCardProps } from '@/components/bots/BotCard';
import { toast } from 'sonner';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface UseAdminBotDetailResult {
  isLoading: boolean;
  refreshLoading: boolean;
  bot: BotCardProps | null;
  userInfo: UserInfo | null;
  handleRefresh: () => void;
  setRefreshLoading: (loading: boolean) => void;
}

export const useAdminBotDetail = (botId: string | undefined): UseAdminBotDetailResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [bot, setBot] = useState<BotCardProps | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      try {
        setTimeout(() => {
          try {
            const mockBot: BotCardProps = {
              title: botId === 'BOT-3201' ? 'BTC Long' : 
                    botId === 'BOT-8932' ? 'Long Master' :
                    botId === 'BOT-2734' ? 'Gold Trading' :
                    'Bot ' + botId,
              subtitle: botId === 'BOT-3201' ? 'Bot cho chiến lược giao dịch kết hợp với phân tích thị trường kép' :
                        botId === 'BOT-8932' ? 'Chuyên về chiến lược giao dịch vị thế dài hạn' :
                        botId === 'BOT-2734' ? 'Hệ thống giao dịch thuật toán tập trung vào kim loại quý' :
                        'Bot giao dịch cho chiến lược tự động',
              botId: botId || 'Unknown',
              accountCount: '12/30',
              lastUpdated: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'numeric', year: 'numeric' }),
              colorScheme: botId === 'BOT-3201' ? 'red' :
                          botId === 'BOT-8932' ? 'blue' :
                          botId === 'BOT-2734' ? 'green' :
                          'default',
              avatarIcon: <Info className="h-5 w-5" />,
              exchange: 'coinstart_pro',
              botForm: 'trading_view',
              status: 'Active',
            };
            
            const mockUserInfo = {
              id: 'USR-001', // Chuẩn hóa thành USR-001
              name: 'Nguyễn Văn A',
              email: 'dbtcompany17@gmail.com',
              phone: '+84 912 345 678',
              status: 'active' as const,
            };
            
            setBot(mockBot);
            setUserInfo(mockUserInfo);
            setIsLoading(false);
          } catch (innerError) {
            console.error('Error processing bot details:', innerError);
            setIsLoading(false);
            toast.error('Đã xảy ra lỗi khi xử lý thông tin bot');
          }
        }, 500);
      } catch (error) {
        console.error('Error fetching bot details:', error);
        setIsLoading(false);
        toast.error('Đã xảy ra lỗi khi tải thông tin bot');
      }
    };
    
    fetchBotDetails();
  }, [botId]);

  const handleRefresh = () => {
    setRefreshLoading(true);
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Đã làm mới dữ liệu');
    }, 1000);
  };

  return {
    isLoading,
    refreshLoading,
    bot,
    userInfo,
    handleRefresh,
    setRefreshLoading,
  };
};

// Đảm bảo import Info từ Lucide
import { Info } from 'lucide-react';
