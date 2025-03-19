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
import BotSearch from '@/components/bots/BotSearch';
import BotListing from '@/components/bots/BotListing';
import BotsHeader from '@/components/bots/BotsHeader';
import BotsPagination from '@/components/bots/BotsPagination';

const Bots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    '1': true,
    '3': true
  });
  const [isAddBotDialogOpen, setIsAddBotDialogOpen] = useState(false);
  const [bots, setBots] = useState<BotCardProps[]>([
    {
      title: 'Ultra 2in1',
      subtitle: 'Bot for combined strategy trading with dual market analysis',
      botId: 'BOT7459',
      accountCount: '18/42',
      lastUpdated: '10 Jul, 2023',
      colorScheme: 'red',
      avatarIcon: <Bot className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'Long Master',
      subtitle: 'Specialized in long-term position trading strategies',
      botId: 'BOT8932',
      accountCount: '22/56',
      lastUpdated: '18 May, 2023',
      colorScheme: 'blue',
      avatarIcon: <Cpu className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'Gold Trading',
      subtitle: 'Precious metals focused algorithmic trading system',
      botId: 'BOT2734',
      accountCount: '14/20',
      lastUpdated: '21 Feb, 2023',
      colorScheme: 'green',
      avatarIcon: <Server className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'Bitcoin Trading',
      subtitle: 'Cryptocurrency trading bot with focus on Bitcoin markets',
      botId: 'BOT5128',
      accountCount: '20/34',
      lastUpdated: '03 Aug, 2023',
      colorScheme: 'purple',
      avatarIcon: <Terminal className="h-5 w-5" />,
      status: 'Inactive'
    },
    {
      title: 'Forex Master',
      subtitle: 'Multi-currency trading system for forex markets',
      botId: 'BOT1267',
      accountCount: '15/25',
      lastUpdated: '15 May, 2023',
      avatarIcon: <CircuitBoard className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'Scalping Pro',
      subtitle: 'High-frequency short term trading bot',
      botId: 'BOT9381',
      accountCount: '8/12',
      lastUpdated: '21 Feb, 2023',
      avatarIcon: <Gem className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'Swing Trader',
      subtitle: 'Medium-term market swing analyzer and trader',
      botId: 'BOT6452',
      accountCount: '12/20',
      lastUpdated: '05 Aug, 2023',
      avatarIcon: <Bot className="h-5 w-5" />,
      status: 'Active'
    },
    {
      title: 'ETF Strategy',
      subtitle: 'Diversified ETF portfolio management system',
      botId: 'BOT3815',
      accountCount: '10/15',
      lastUpdated: '10 Jul, 2023',
      avatarIcon: <Cpu className="h-5 w-5" />,
      status: 'Active'
    },
  ]);

  const botIcons = [
    <Bot className="h-5 w-5" />,
    <Cpu className="h-5 w-5" />,
    <Server className="h-5 w-5" />,
    <Terminal className="h-5 w-5" />,
    <CircuitBoard className="h-5 w-5" />,
    <Gem className="h-5 w-5" />
  ];

  const getBotIcon = (iconName: string) => {
    switch (iconName) {
      case 'bot': return botIcons[0];
      case 'cpu': return botIcons[1];
      case 'server': return botIcons[2];
      case 'terminal': return botIcons[3];
      case 'circuit': return botIcons[4];
      case 'gem': return botIcons[5];
      default: return botIcons[0];
    }
  };

  const filteredBots = bots.filter(bot => 
    bot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bot.subtitle && bot.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddBot = () => {
    setIsAddBotDialogOpen(true);
  };

  const handleAddNewBot = (values: any) => {
    const newBotId = 'BOT' + Math.floor(1000 + Math.random() * 9000);
    
    const newBot: BotCardProps = {
      title: values.title,
      subtitle: values.subtitle || '',
      botId: newBotId,
      accountCount: '0/0',
      lastUpdated: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, ''),
      colorScheme: values.colorScheme,
      avatarIcon: getBotIcon(values.icon),
      status: 'Active',
      exchange: values.exchange,
      botForm: values.botForm
    };
    
    setBots(prevBots => [newBot, ...prevBots]);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <MainLayout title="Quản Lý Bot">
      <div className="flex flex-col">
        <BotsHeader onAddBot={handleAddBot} />

        <div className="flex items-center justify-end mb-8">
          <BotSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <BotListing bots={filteredBots} favorites={favorites} />

        <BotsPagination />
      </div>
      
      <AddBotDialog 
        open={isAddBotDialogOpen}
        onOpenChange={setIsAddBotDialogOpen}
        onAddBot={handleAddNewBot}
      />
    </MainLayout>
  );
};

export default Bots;
