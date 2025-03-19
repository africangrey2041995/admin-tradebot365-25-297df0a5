
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Search, 
  Plus, 
  Calendar, 
  Star, 
  MoreHorizontal, 
  Bookmark,
  Eye,
  Bot,
  Cpu,
  Server,
  Terminal,
  CircuitBoard,
  Gem
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Bot as BotType } from '@/types';

interface BotCardProps {
  title: string;
  subtitle?: string;
  botId: string;
  accountCount?: string;
  lastUpdated?: string;
  onFavorite?: () => void;
  isFavorite?: boolean;
  colorScheme?: 'red' | 'blue' | 'green' | 'purple' | 'default';
  onAddAccount?: () => void;
  onViewBot?: () => void;
  avatarSrc?: string;
  avatarIcon?: React.ReactNode;
}

const BotCard = ({
  title,
  subtitle,
  botId,
  accountCount,
  lastUpdated,
  onFavorite,
  isFavorite = false,
  colorScheme = 'default',
  onAddAccount,
  onViewBot,
  avatarSrc,
  avatarIcon
}: BotCardProps) => {
  
  const colorClasses = {
    red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-red-100/30',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-blue-100/30',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-green-100/30',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-purple-100/30',
    default: 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:shadow-slate-100/30'
  };
  
  const avatarBgColors = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    default: 'bg-slate-100 text-slate-600'
  };

  const buttonColors = {
    red: 'bg-white hover:bg-white/90 text-red-600 border-red-200',
    blue: 'bg-white hover:bg-white/90 text-blue-600 border-blue-200',
    green: 'bg-white hover:bg-white/90 text-green-600 border-green-200',
    purple: 'bg-white hover:bg-white/90 text-purple-600 border-purple-200',
    default: 'bg-white hover:bg-white/90 text-slate-600 border-slate-200'
  };

  const viewButtonColors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    default: 'text-slate-600'
  };
  
  return (
    <div className={`relative rounded-xl border shadow-sm p-5 transition-all duration-300 hover:shadow-md ${colorClasses[colorScheme]} group hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-grow">
          {/* Moved Avatar to the top */}
          <div className="flex justify-center mb-3">
            <Avatar className={`h-16 w-16 ${avatarBgColors[colorScheme]} border-2 border-white shadow-sm`}>
              {avatarSrc ? (
                <AvatarImage src={avatarSrc} alt={title} />
              ) : (
                <AvatarFallback className="text-xl">
                  {avatarIcon || <Bot className="h-7 w-7" />}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-black/5">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={onViewBot}>
              <Eye className="h-4 w-4 mr-2" />
              Xem Chi Tiết
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onAddAccount}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm Tài Khoản
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer">
              Xoá Bot
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="font-bold text-xl tracking-tight text-slate-800">{title}</h3>
          <button 
            onClick={onFavorite}
            className="text-yellow-400 hover:text-yellow-500 transition-colors"
            aria-label="Toggle favorite"
          >
            <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        {subtitle && <p className="text-sm text-muted-foreground mt-1 leading-snug mx-auto">{subtitle}</p>}
      </div>
      
      <div className="flex items-center justify-between py-2.5 px-3 mt-4 mb-3 rounded-lg bg-white/70 backdrop-blur-sm border border-slate-100">
        <div className="flex items-center">
          <p className="text-xs font-medium mr-1.5 text-slate-500">ID:</p>
          <div className="text-sm font-medium tracking-wide text-slate-700">{botId}</div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center text-xs font-medium text-slate-500">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-white/70 backdrop-blur-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-1.5">
          <p className="text-xs text-slate-500">Accounts:</p>
          <div className="text-sm font-medium text-slate-700">{accountCount}</div>
        </div>
        
        <button 
          onClick={onAddAccount}
          className="h-6 w-6 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-xs font-medium border border-slate-200 transition-colors text-slate-600"
          aria-label="Add account"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onViewBot} 
        className={`w-full py-2 h-auto ${buttonColors[colorScheme]} shadow-sm font-medium mt-auto flex gap-2 justify-center items-center`}
      >
        <Eye className={`h-4 w-4 ${viewButtonColors[colorScheme]}`} />
        <span>View Bot</span>
      </Button>
    </div>
  );
};

const Bots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    '1': true,
    '3': true
  });

  // Icon set for bots
  const botIcons = [
    <Bot className="h-5 w-5" />,
    <Cpu className="h-5 w-5" />,
    <Server className="h-5 w-5" />,
    <Terminal className="h-5 w-5" />,
    <CircuitBoard className="h-5 w-5" />,
    <Gem className="h-5 w-5" />
  ];

  // Mock data for demonstration
  const mockBots: BotCardProps[] = [
    {
      title: 'Ultra 2in1',
      subtitle: 'Bot for combined strategy trading with dual market analysis',
      botId: 'BOT7459',
      accountCount: '18/42',
      lastUpdated: '10 Jul, 2023',
      colorScheme: 'red',
      avatarIcon: botIcons[0]
    },
    {
      title: 'Long Master',
      subtitle: 'Specialized in long-term position trading strategies',
      botId: 'BOT8932',
      accountCount: '22/56',
      lastUpdated: '18 May, 2023',
      colorScheme: 'blue',
      avatarIcon: botIcons[1]
    },
    {
      title: 'Gold Trading',
      subtitle: 'Precious metals focused algorithmic trading system',
      botId: 'BOT2734',
      accountCount: '14/20',
      lastUpdated: '21 Feb, 2023',
      colorScheme: 'green',
      avatarIcon: botIcons[2]
    },
    {
      title: 'Bitcoin Trading',
      subtitle: 'Cryptocurrency trading bot with focus on Bitcoin markets',
      botId: 'BOT5128',
      accountCount: '20/34',
      lastUpdated: '03 Aug, 2023',
      colorScheme: 'purple',
      avatarIcon: botIcons[3]
    },
    {
      title: 'Forex Master',
      subtitle: 'Multi-currency trading system for forex markets',
      botId: 'BOT1267',
      accountCount: '15/25',
      lastUpdated: '15 May, 2023',
      avatarIcon: botIcons[4]
    },
    {
      title: 'Scalping Pro',
      subtitle: 'High-frequency short term trading bot',
      botId: 'BOT9381',
      accountCount: '8/12',
      lastUpdated: '21 Feb, 2023',
      avatarIcon: botIcons[5]
    },
    {
      title: 'Swing Trader',
      subtitle: 'Medium-term market swing analyzer and trader',
      botId: 'BOT6452',
      accountCount: '12/20',
      lastUpdated: '05 Aug, 2023',
      avatarIcon: botIcons[0]
    },
    {
      title: 'ETF Strategy',
      subtitle: 'Diversified ETF portfolio management system',
      botId: 'BOT3815',
      accountCount: '10/15',
      lastUpdated: '10 Jul, 2023',
      avatarIcon: botIcons[1]
    },
  ];

  const filteredBots = mockBots.filter(bot => 
    bot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bot.subtitle && bot.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddBot = () => {
    toast('Thêm Bot mới', {
      description: 'Tính năng này sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAddAccount = () => {
    toast('Thêm Tài Khoản', {
      description: 'Tính năng thêm tài khoản sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };
  
  const handleViewBot = (botId: string) => {
    toast('Xem Bot', {
      description: `Xem chi tiết bot ${botId}. Tính năng này sẽ được triển khai trong phiên bản tiếp theo.`,
    });
  };

  return (
    <MainLayout title="Quản Lý Bot">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="outline" className="border-slate-200 shadow-sm font-medium px-4 py-2 h-10">
              <Bookmark className="h-4 w-4 mr-2" />
              BOT LIST
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-9 border-slate-200 shadow-sm focus-visible:ring-1 focus-visible:ring-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddBot} className="bg-primary hover:bg-primary/90 shadow-sm font-medium h-10 px-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New BOT
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {filteredBots.map((bot, index) => (
            <BotCard 
              key={index} 
              {...bot} 
              isFavorite={favorites[index] || false}
              onFavorite={() => toggleFavorite(index)}
              onAddAccount={handleAddAccount}
              onViewBot={() => handleViewBot(bot.botId)}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive className="bg-primary text-white font-medium">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="font-medium">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="font-medium">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </MainLayout>
  );
};

export default Bots;
