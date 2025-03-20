
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Bot,
  Cpu,
  Server,
  Terminal,
  CircuitBoard,
  Gem
} from 'lucide-react';
import { toast } from 'sonner';
import BotCard, { BotCardProps } from '@/components/bots/BotCard';
import { AddBotDialog } from '@/components/bots/AddBotDialog';
import BotListing from '@/components/bots/BotListing';
import BotsHeader from '@/components/bots/BotsHeader';
import BotsPagination from '@/components/bots/BotsPagination';
import { useIsMobile } from '@/hooks/use-mobile';

const Bots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    '1': true,
    '3': true
  });
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const [bots, setBots] = useState<BotCardProps[]>([
    {
      title: 'Ultra 2in1',
      subtitle: 'Bot cho giao dịch chiến lược kết hợp với phân tích thị trường kép',
      botId: 'BOT7459',
      accountCount: '18/42',
      lastUpdated: '10/07/2023',
      colorScheme: 'red',
      avatarIcon: <Bot className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    },
    {
      title: 'Long Master',
      subtitle: 'Chuyên về chiến lược giao dịch vị thế dài hạn',
      botId: 'BOT8932',
      accountCount: '22/56',
      lastUpdated: '18/05/2023',
      colorScheme: 'blue',
      avatarIcon: <Cpu className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    },
    {
      title: 'Gold Trading',
      subtitle: 'Hệ thống giao dịch thuật toán tập trung vào kim loại quý',
      botId: 'BOT2734',
      accountCount: '14/20',
      lastUpdated: '21/02/2023',
      colorScheme: 'green',
      avatarIcon: <Server className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    },
    {
      title: 'Bitcoin Trading',
      subtitle: 'Bot giao dịch tiền điện tử tập trung vào thị trường Bitcoin',
      botId: 'BOT5128',
      accountCount: '20/34',
      lastUpdated: '03/08/2023',
      colorScheme: 'purple',
      avatarIcon: <Terminal className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Inactive'
    },
    {
      title: 'Forex Master',
      subtitle: 'Hệ thống giao dịch đa tiền tệ cho thị trường ngoại hối',
      botId: 'BOT1267',
      accountCount: '15/25',
      lastUpdated: '15/05/2023',
      avatarIcon: <CircuitBoard className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    },
    {
      title: 'Scalping Pro',
      subtitle: 'Bot giao dịch tần suất cao ngắn hạn',
      botId: 'BOT9381',
      accountCount: '8/12',
      lastUpdated: '21/02/2023',
      avatarIcon: <Gem className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    },
    {
      title: 'Swing Trader',
      subtitle: 'Phân tích và giao dịch biến động thị trường trung hạn',
      botId: 'BOT6452',
      accountCount: '12/20',
      lastUpdated: '05/08/2023',
      avatarIcon: <Bot className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      status: 'Active'
    }
  ]);

  const handleAddBot = (newBot: Partial<BotCardProps>) => {
    const botId = `BOT${Math.floor(1000 + Math.random() * 9000)}`;
    
    const bot: BotCardProps = {
      title: newBot.title || 'Bot Không Tên',
      subtitle: newBot.subtitle || 'Chưa có mô tả',
      botId: botId,
      accountCount: '0/10',
      lastUpdated: new Date().toLocaleDateString('vi-VN'),
      colorScheme: newBot.colorScheme as any || 'default',
      avatarIcon: newBot.avatarIcon || <Bot className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />,
      exchange: newBot.exchange || 'coinstart_pro',
      botForm: newBot.botForm || 'trading_view',
      status: 'Inactive'
    };
    
    setBots([bot, ...bots]);
    toast.success('Bot mới đã được tạo thành công');
  };

  return (
    <MainLayout title="Quản Lý Bot">
      <BotsHeader 
        onAddBot={() => setIsAddBotDialogOpen(true)} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <BotListing 
        bots={bots.filter(bot => 
          bot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bot.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bot.botId.toLowerCase().includes(searchTerm.toLowerCase())
        )} 
        favorites={favorites} 
      />
      
      <BotsPagination />
      
      <AddBotDialog 
        open={isAddBotDialogOpen}
        onOpenChange={setIsAddBotDialogOpen}
        onAddBot={handleAddBot}
      />
    </MainLayout>
  );
};

export default Bots;
