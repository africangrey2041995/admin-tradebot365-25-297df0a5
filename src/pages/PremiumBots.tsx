
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { PlusCircle, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumBotCard } from '@/components/bots/PremiumBotCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// Mocking premium bot data
const premiumBots = [
  {
    id: 'pb-001',
    name: 'Alpha Momentum',
    description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
    exchange: 'Coinstart Pro',
    type: 'momentum',
    performanceLastMonth: '+18.5%',
    performanceAllTime: '+125.4%',
    risk: 'medium' as 'medium' | 'low' | 'high',
    minCapital: '$500',
    status: 'active',
    subscribers: 86,
    imageUrl: null,
    colorScheme: 'green'
  },
  {
    id: 'pb-002',
    name: 'Beta Scalper',
    description: 'Bot scalping tự động với thời gian giao dịch ngắn, tối ưu cho thị trường sideway.',
    exchange: 'Coinstart Pro',
    type: 'scalping',
    performanceLastMonth: '+9.2%',
    performanceAllTime: '+67.8%',
    risk: 'high' as 'medium' | 'low' | 'high',
    minCapital: '$1000',
    status: 'active',
    subscribers: 42,
    imageUrl: null,
    colorScheme: 'red'
  },
  {
    id: 'pb-003',
    name: 'Delta Swing',
    description: 'Bot giao dịch swing dựa trên các chu kỳ thị trường và phân tích kỹ thuật nâng cao.',
    exchange: 'Coinstart Pro',
    type: 'swing',
    performanceLastMonth: '+12.1%',
    performanceAllTime: '+89.5%',
    risk: 'medium' as 'medium' | 'low' | 'high',
    status: 'active',
    minCapital: '$800',
    subscribers: 64,
    imageUrl: null,
    colorScheme: 'blue'
  },
  {
    id: 'pb-004',
    name: 'Gamma Grid',
    description: 'Bot grid trading với chiến lược phân bổ thanh khoản thông minh dựa trên biến động thị trường.',
    exchange: 'Coinstart Pro',
    type: 'grid',
    performanceLastMonth: '+7.6%',
    performanceAllTime: '+52.3%',
    risk: 'low' as 'medium' | 'low' | 'high',
    minCapital: '$300',
    status: 'active',
    subscribers: 98,
    imageUrl: null,
    colorScheme: 'purple'
  },
  {
    id: 'pb-005',
    name: 'Omega Trend',
    description: 'Bot đi theo xu hướng với bộ lọc tín hiệu thông minh và quản lý vốn tự động.',
    exchange: 'Coinstart Pro',
    type: 'trend',
    performanceLastMonth: '+14.3%',
    performanceAllTime: '+95.7%',
    risk: 'medium' as 'medium' | 'low' | 'high',
    minCapital: '$700',
    status: 'active',
    subscribers: 73,
    imageUrl: null,
    colorScheme: 'default'
  },
];

const PremiumBots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortOption, setSortOption] = useState('performance');
  const [activeTab, setActiveTab] = useState('all');

  // Filter bots based on search term, risk level, and active tab
  const filteredBots = premiumBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    const matchesTab = activeTab === 'all' || bot.type === activeTab;
    
    return matchesSearch && matchesRisk && matchesTab;
  });

  // Sort bots based on selected sort option
  const sortedBots = [...filteredBots].sort((a, b) => {
    if (sortOption === 'performance') {
      return parseFloat(b.performanceLastMonth.replace('%', '')) - 
             parseFloat(a.performanceLastMonth.replace('%', ''));
    } else if (sortOption === 'popularity') {
      return b.subscribers - a.subscribers;
    } else {
      return a.name.localeCompare(b.name);
    }
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
    <MainLayout title="Premium Bots">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Premium Bots</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Sử dụng các bot giao dịch chuyên nghiệp được tạo bởi Trade Bot 365
            </p>
          </div>
          <Button onClick={() => navigate('/accounts')} className="inline-flex items-center whitespace-nowrap">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Kết Nối Tài Khoản</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm bot giao dịch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
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
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Hiệu suất</SelectItem>
                <SelectItem value="popularity">Phổ biến</SelectItem>
                <SelectItem value="name">Tên</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="all" className="flex-grow md:flex-grow-0">Tất cả</TabsTrigger>
            <TabsTrigger value="momentum" className="flex-grow md:flex-grow-0">Momentum</TabsTrigger>
            <TabsTrigger value="scalping" className="flex-grow md:flex-grow-0">Scalping</TabsTrigger>
            <TabsTrigger value="swing" className="flex-grow md:flex-grow-0">Swing</TabsTrigger>
            <TabsTrigger value="grid" className="flex-grow md:flex-grow-0">Grid</TabsTrigger>
            <TabsTrigger value="trend" className="flex-grow md:flex-grow-0">Trend</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {sortedBots.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {sortedBots.map((bot, index) => (
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
                      colorScheme={bot.colorScheme as 'default' | 'red' | 'blue' | 'green' | 'purple'}
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PremiumBots;
