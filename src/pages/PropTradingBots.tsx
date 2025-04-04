
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { PlusCircle, Filter, ArrowUpDown, ListFilter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { PremiumBotCard } from '@/components/bots/PremiumBotCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { BotType, BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { mockPropBots } from '@/mocks/propBotsMock';

// Create standardized prop trading bot data for the user route, based on mockPropBots
const propTradingBots = mockPropBots.slice(0, 3).map(bot => ({
  botId: bot.botId,
  name: bot.name,
  description: bot.description,
  exchange: bot.exchange || 'Coinstrat Pro',
  type: BotType.PROP_BOT,
  performanceLastMonth: bot.performanceLastMonth,
  performanceAllTime: bot.performanceAllTime,
  risk: bot.risk,
  minCapital: bot.minCapital,
  status: bot.status,
  subscribers: bot.users,
  imageUrl: null,
  colorScheme: bot.botId === 'PROP-001' ? 'blue' : 
               bot.botId === 'PROP-002' ? 'green' : 'purple',
  isFeatured: bot.isFeatured || false,
  isNew: bot.isNew || false,
  isBestSeller: bot.isBestSeller || false
}));

// Create standardized integrated prop bots data based on mockPropBots
const integratedPropBots = [
  {
    ...mockPropBots[0],
    isIntegrated: true,
    accounts: [
      {
        id: 'acc-001',
        name: 'Coinstrat Prop Demo',
        status: 'Connected',
        createdDate: '2023-10-15',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1.5'
      }
    ]
  }
];

const PropTradingBots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortOption, setSortOption] = useState('performance');
  const [viewMode, setViewMode] = useState('available');

  const getFilteredBots = (botsArray: any[]) => {
    return botsArray.filter(bot => {
      const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bot.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
      
      return matchesSearch && matchesRisk;
    });
  };

  const filteredAvailableBots = getFilteredBots(propTradingBots);
  const filteredIntegratedBots = getFilteredBots(integratedPropBots);

  const sortBots = (botsArray: any[]) => {
    return [...botsArray].sort((a, b) => {
      if (sortOption === 'performance') {
        return parseFloat(b.performanceLastMonth.replace('%', '')) - 
               parseFloat(a.performanceLastMonth.replace('%', ''));
      } else if (sortOption === 'popularity') {
        return b.subscribers - a.subscribers;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  };

  const sortedAvailableBots = sortBots(filteredAvailableBots);
  const sortedIntegratedBots = sortBots(filteredIntegratedBots);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };

  const handleBotClick = (botId: string) => {
    if (viewMode === 'integrated') {
      navigate(`/integrated-prop-bots/${botId}`);
    } else {
      navigate(`/prop-trading-bots/${botId}`);
    }
  };

  return (
    <MainLayout title="Prop Trading Bots">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Prop Trading Bots</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Sử dụng các bot tối ưu cho Prop Trading với hiệu suất cao và quản lý rủi ro chặt chẽ
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={viewMode === 'integrated' ? 'default' : 'outline'}
              onClick={() => setViewMode('available')}
              className="inline-flex items-center whitespace-nowrap"
            >
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Danh Sách Bot</span>
            </Button>
            <Button 
              variant={viewMode === 'integrated' ? 'outline' : 'default'}
              onClick={() => setViewMode('integrated')} 
              className="inline-flex items-center whitespace-nowrap"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Đã Tích Hợp</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm prop trading bot..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Mức độ rủi ro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Hiệu suất</SelectItem>
                  <SelectItem value="popularity">Phổ biến</SelectItem>
                  <SelectItem value="name">Tên</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {viewMode === 'available' ? (
          <>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-6">
              Prop Trading Bots
            </h2>
            
            {sortedAvailableBots.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {sortedAvailableBots.map((bot, index) => (
                  <motion.div
                    key={bot.botId}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleBotClick(bot.botId)}
                    className="cursor-pointer"
                  >
                    <PremiumBotCard 
                      botId={bot.botId}
                      name={bot.name}
                      description={bot.description}
                      exchange={bot.exchange}
                      type={bot.type}
                      performanceLastMonth={bot.performanceLastMonth}
                      performanceAllTime={bot.performanceAllTime}
                      risk={bot.risk}
                      minCapital={bot.minCapital}
                      subscribers={bot.subscribers}
                      imageUrl={bot.imageUrl}
                      colorScheme={bot.colorScheme as 'default' | 'red' | 'blue' | 'green' | 'purple'}
                      isFeatured={bot.isFeatured}
                      isNew={bot.isNew}
                      isBestSeller={bot.isBestSeller}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Không tìm thấy bot nào phù hợp với tìm kiếm của bạn
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mt-6">
              Bots Đã Tích Hợp
            </h2>

            {sortedIntegratedBots.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {sortedIntegratedBots.map((bot, index) => (
                  <motion.div
                    key={bot.botId}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleBotClick(bot.botId)}
                    className="cursor-pointer"
                  >
                    <PremiumBotCard 
                      botId={bot.botId}
                      name={bot.name}
                      description={bot.description}
                      exchange={bot.exchange}
                      type={bot.type}
                      performanceLastMonth={bot.performanceLastMonth}
                      performanceAllTime={bot.performanceAllTime}
                      risk={bot.risk}
                      minCapital={bot.minCapital}
                      subscribers={bot.subscribers}
                      imageUrl={bot.imageUrl}
                      colorScheme={bot.colorScheme as 'default' | 'red' | 'blue' | 'green' | 'purple'}
                      isIntegrated={true}
                      accountCount={bot.accounts?.length.toString() || "0"}
                      isFeatured={bot.isFeatured}
                      isNew={bot.isNew}
                      isBestSeller={bot.isBestSeller}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Bạn chưa tích hợp Prop Trading Bot nào
                </p>
                <Button
                  variant="outline"
                  onClick={() => setViewMode('available')}
                  className="mt-4"
                >
                  Khám phá Prop Trading Bots
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default PropTradingBots;
