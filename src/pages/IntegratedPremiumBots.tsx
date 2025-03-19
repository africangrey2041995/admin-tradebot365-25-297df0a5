import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumBotCard } from '@/components/bots/PremiumBotCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { PremiumBot } from '@/types';

const integratedPremiumBots: PremiumBot[] = [
  {
    id: 'pb-001',
    name: 'Alpha Momentum',
    description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
    exchange: 'Coinstart Pro',
    type: 'momentum',
    performanceLastMonth: '+18.5%',
    performanceAllTime: '+125.4%',
    risk: 'medium',
    minCapital: '$500',
    status: 'active',
    subscribers: 86,
    imageUrl: null,
    colorScheme: 'green',
    isIntegrated: true,
    botId: 'BOT7459',
    accounts: [
      {
        id: 'acc-001',
        name: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-10-15',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '2'
      },
      {
        id: 'acc-002',
        name: 'Bybit Demo',
        status: 'Connected',
        createdDate: '2023-10-20',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1'
      }
    ]
  },
  {
    id: 'pb-004',
    name: 'Gamma Grid',
    description: 'Bot grid trading với chiến lược phân bổ thanh khoản thông minh dựa trên biến động thị trường.',
    exchange: 'Coinstart Pro',
    type: 'grid',
    performanceLastMonth: '+7.6%',
    performanceAllTime: '+52.3%',
    risk: 'low',
    minCapital: '$300',
    status: 'active',
    subscribers: 98,
    imageUrl: null,
    colorScheme: 'purple',
    isIntegrated: true,
    botId: 'BOT8932',
    accounts: [
      {
        id: 'acc-003',
        name: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-11-05',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1'
      }
    ]
  }
];

const IntegratedPremiumBots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredBots = integratedPremiumBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

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

  return (
    <MainLayout title="Integrated Premium Bots">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/premium-bots')}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Integrated Premium Bots</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Premium bots that you have integrated with your accounts
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/premium-bots')}
              className="inline-flex items-center whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Premium Bot</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {}} 
              className="inline-flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm bot đã tích hợp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
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

        {filteredBots.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBots.map((bot, index) => (
              <motion.div
                key={bot.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <PremiumBotCard 
                  id={bot.id}
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
                  colorScheme={bot.colorScheme}
                  accountCount={bot.accounts?.length.toString() || "0"}
                  botId={bot.botId}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Bạn chưa tích hợp bot premium nào
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/premium-bots')}
              className="mt-4"
            >
              Khám phá Premium Bots
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBots;
