
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
    red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    default: 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
  };
  
  const avatarBgColors = {
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    default: 'bg-slate-100'
  };
  
  return (
    <div className={`relative rounded-lg border shadow-sm p-5 transition-all duration-200 hover:shadow-md ${colorClasses[colorScheme]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Avatar className={`mr-3 h-12 w-12 ${avatarBgColors[colorScheme]} border border-slate-200 shadow-sm`}>
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt={title} />
            ) : (
              <AvatarFallback className="text-slate-500">
                {avatarIcon || <Bot className="h-6 w-6" />}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onFavorite}
            className="text-yellow-400 hover:text-yellow-500 transition-colors"
          >
            <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Chỉnh Sửa Bot</DropdownMenuItem>
              <DropdownMenuItem>Xem Chi Tiết</DropdownMenuItem>
              <DropdownMenuItem>Thêm Tài Khoản</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Xoá Bot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4 border-t border-b py-2.5 border-slate-200/70">
        <div className="flex items-center">
          <p className="text-sm font-medium mr-2 text-muted-foreground">ID</p>
          <div className="text-sm font-medium">{botId}</div>
        </div>
        
        {lastUpdated && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {lastUpdated}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-muted-foreground mr-2">Accounts: </p>
          <div className="text-sm font-medium mr-3">{accountCount}</div>
          <button 
            onClick={onAddAccount}
            className="h-6 w-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-xs font-medium border border-slate-200 transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-200/70">
        <Button 
          variant="outline" 
          onClick={onViewBot} 
          className="w-full bg-white hover:bg-slate-50 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Bot
        </Button>
      </div>
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
    <Bot className="h-6 w-6" />,
    <Cpu className="h-6 w-6" />,
    <Server className="h-6 w-6" />,
    <Terminal className="h-6 w-6" />,
    <CircuitBoard className="h-6 w-6" />,
    <Gem className="h-6 w-6" />
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
            <Button variant="outline" className="mr-2 border-slate-300 shadow-sm">
              <Bookmark className="h-4 w-4 mr-2" />
              BOT LIST
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-10 border-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAddBot} className="shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New BOT
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
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

        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </MainLayout>
  );
};

export default Bots;
