
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ErrorStats {
  totalErrors: number;
  userBotErrors: number;
  premiumBotErrors: number;
  propBotErrors: number;
  isLoading: boolean;
}

export const useErrorStats = (): ErrorStats => {
  const [stats, setStats] = useState({
    totalErrors: 0,
    userBotErrors: 0,
    premiumBotErrors: 0,
    propBotErrors: 0,
    isLoading: true
  });

  useEffect(() => {
    const fetchErrorStats = async () => {
      try {
        // Trong môi trường sản xuất, đây sẽ là API call
        // Nhưng trong môi trường phát triển, chúng ta sẽ sử dụng dữ liệu mẫu
        setTimeout(() => {
          // Mô phỏng dữ liệu từ API
          const mockStats = {
            totalErrors: Math.floor(Math.random() * 10),
            userBotErrors: Math.floor(Math.random() * 5),
            premiumBotErrors: Math.floor(Math.random() * 3),
            propBotErrors: Math.floor(Math.random() * 2),
          };
          
          setStats({
            ...mockStats,
            isLoading: false
          });
        }, 500);
      } catch (error) {
        console.error('Error fetching error stats:', error);
        toast.error('Không thể tải thông tin lỗi');
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchErrorStats();

    // Cập nhật định kỳ mỗi 5 phút
    const interval = setInterval(fetchErrorStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return stats;
};
