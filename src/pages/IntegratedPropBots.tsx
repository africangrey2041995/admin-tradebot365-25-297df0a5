
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

// Mocking integrated prop trading bots data
const integratedPropBots = [
  {
    id: 'ptb-001',
    name: 'Prop Master',
    description: 'Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+11.2%',
    performanceAllTime: '+45.8%',
    risk: 'low' as 'medium' | 'low' | 'high',
    minCapital: '$500',
    status: 'active',
    subscribers: 120,
    imageUrl: null,
    colorScheme: 'blue',
    isIntegrated: true,
    botId: 'PROP001',
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

const IntegratedPropBots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredBots = integratedPropBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

  const handleBotClick = (botId: string) => {
    navigate(`/integrated-prop-bots/${botId}`);
  };

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
    <MainLayout title="Integrated Prop Trading Bots">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/prop-trading-bots')}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Prop Trading Bots Đã Tích Hợp</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Các Prop Trading Bot bạn đã tích hợp với tài khoản của mình
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/prop-trading-bots')}
              className="inline-flex items-center whitespace-nowrap"
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Thêm Prop Bot Mới</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {}} 
              className="inline-flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Làm mới</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm prop trading bot đã tích hợp..."
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
              <SelectItem value="medium">Trung</SelectItem>
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
                onClick={() => handleBotClick(bot.id)}
                className="cursor-pointer"
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
                  colorScheme={bot.colorScheme as 'default' | 'red' | 'blue' | 'green' | 'purple'}
                  isIntegrated={true}
                  accountCount={bot.accounts?.length.toString() || "0"}
                  botId={bot.botId}
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
              onClick={() => navigate('/prop-trading-bots')}
              className="mt-4"
            >
              Khám phá Prop Trading Bots
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBots;
