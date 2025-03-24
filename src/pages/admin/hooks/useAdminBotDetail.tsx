
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useMockBotData } from './useMockBotData';
import { useMockUserData } from './useMockUserData';

interface UseAdminBotDetailResult {
  isLoading: boolean;
  refreshLoading: boolean;
  bot: ReturnType<typeof useMockBotData>;
  userInfo: ReturnType<typeof useMockUserData> | null;
  handleRefresh: () => void;
  setRefreshLoading: (loading: boolean) => void;
}

export const useAdminBotDetail = (botId: string | undefined): UseAdminBotDetailResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<ReturnType<typeof useMockUserData> | null>(null);
  
  // Get mock bot data using our custom hook
  const bot = useMockBotData(botId);
  
  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      try {
        setTimeout(() => {
          try {
            // Get mock user data
            const mockUserInfo = useMockUserData();
            
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
