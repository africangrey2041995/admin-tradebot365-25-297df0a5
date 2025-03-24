
import { BotCardProps } from '@/components/bots/BotCard';
import { Info } from 'lucide-react';

export const useMockBotData = (botId: string | undefined): BotCardProps | null => {
  if (!botId) return null;
  
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
  
  return mockBot;
};
