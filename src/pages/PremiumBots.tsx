
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { PlusCircle, Filter, ArrowUpDown, ListFilter } from 'lucide-react';
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

// Mocking prop trading bot data
const propTradingBots = [
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
    colorScheme: 'blue'
  },
  {
    id: 'ptb-002',
    name: 'Risk Manager Pro',
    description: 'Bot tối ưu quản lý rủi ro để đáp ứng các yêu cầu nghiêm ngặt của Prop Trading, giúp giữ tỷ lệ drawdown thấp.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+8.5%',
    performanceAllTime: '+38.9%',
    risk: 'low' as 'medium' | 'low' | 'high',
    minCapital: '$700',
    status: 'active',
    subscribers: 95,
    imageUrl: null,
    colorScheme: 'green'
  },
  {
    id: 'ptb-003',
    name: 'Consistent Trader',
    description: 'Bot tập trung vào tính nhất quán trong giao dịch, điều kiện cần thiết để vượt qua các vòng thử thách Prop Trading.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+9.7%',
    performanceAllTime: '+42.3%',
    risk: 'medium' as 'medium' | 'low' | 'high',
    status: 'active',
    minCapital: '$600',
    subscribers: 83,
    imageUrl: null,
    colorScheme: 'purple'
  },
];

const PremiumBots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [sortOption, setSortOption] = useState('performance');
  const [activeTab, setActiveTab] = useState('all');
  const [botCategory, setBotCategory] = useState('prop'); // Changed default to 'prop' instead of 'premium'

  // Filter bots based on search term, risk level, active tab, and category
  const getFilteredBots = (botsArray: any[]) => {
    return botsArray.filter(bot => {
      const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bot.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
      const matchesTab = activeTab === 'all' || bot.type === activeTab;
      
      return matchesSearch && matchesRisk && matchesTab;
    });
  };

  const filteredPremiumBots = getFilteredBots(premiumBots);
  const filteredPropTradingBots = getFilteredBots(propTradingBots);
  
  // Sort bots based on selected sort option
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

  const sortedPremiumBots = sortBots(filteredPremiumBots);
  const sortedPropTradingBots = sortBots(filteredPropTradingBots);

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
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/integrated-premium-bots')}
              className="inline-flex items-center whitespace-nowrap"
            >
              <ListFilter className="mr-2 h-4 w-4" />
              <span>Integrated Bots</span>
            </Button>
            <Button 
              onClick={() => navigate('/accounts')} 
              className="inline-flex items-center whitespace-nowrap"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Kết Nối Tài Khoản</span>
            </Button>
          </div>
        </div>

        {/* Category Selector - Reordered to show Prop Trading first */}
        <Tabs defaultValue="prop" value={botCategory} onValueChange={setBotCategory} className="w-full">
          <TabsList className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg mb-4">
            <TabsTrigger value="prop" className="flex-grow md:flex-grow-0">Prop Trading Bots</TabsTrigger>
            <TabsTrigger value="premium" className="flex-grow md:flex-grow-0">Premium Bots</TabsTrigger>
          </TabsList>

          {/* Prop Trading Bots Tab - Now first */}
          <TabsContent value="prop" className="mt-0 space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
                <TabsTrigger value="all" className="flex-grow md:flex-grow-0">Tất cả</TabsTrigger>
                <TabsTrigger value="prop" className="flex-grow md:flex-grow-0">Prop Trading</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {sortedPropTradingBots.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPropTradingBots.map((bot, index) => (
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

              <TabsContent value="prop" className="mt-6">
                {sortedPropTradingBots.filter(bot => bot.type === 'prop').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPropTradingBots.filter(bot => bot.type === 'prop').map((bot, index) => (
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
          </TabsContent>

          {/* Premium Bots Tab - Now second */}
          <TabsContent value="premium" className="mt-0 space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
                <TabsTrigger value="all" className="flex-grow md:flex-grow-0">Tất cả</TabsTrigger>
                <TabsTrigger value="momentum" className="flex-grow md:flex-grow-0">Momentum</TabsTrigger>
                <TabsTrigger value="scalping" className="flex-grow md:flex-grow-0">Scalping</TabsTrigger>
                <TabsTrigger value="swing" className="flex-grow md:flex-grow-0">Swing</TabsTrigger>
                <TabsTrigger value="grid" className="flex-grow md:flex-grow-0">Grid</TabsTrigger>
                <TabsTrigger value="trend" className="flex-grow md:flex-grow-0">Trend</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {sortedPremiumBots.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.map((bot, index) => (
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
              
              <TabsContent value="momentum" className="mt-6">
                {sortedPremiumBots.filter(bot => bot.type === 'momentum').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.filter(bot => bot.type === 'momentum').map((bot, index) => (
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
              
              <TabsContent value="scalping" className="mt-6">
                {sortedPremiumBots.filter(bot => bot.type === 'scalping').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.filter(bot => bot.type === 'scalping').map((bot, index) => (
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
              
              <TabsContent value="swing" className="mt-6">
                {sortedPremiumBots.filter(bot => bot.type === 'swing').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.filter(bot => bot.type === 'swing').map((bot, index) => (
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
              
              <TabsContent value="grid" className="mt-6">
                {sortedPremiumBots.filter(bot => bot.type === 'grid').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.filter(bot => bot.type === 'grid').map((bot, index) => (
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
              
              <TabsContent value="trend" className="mt-6">
                {sortedPremiumBots.filter(bot => bot.type === 'trend').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPremiumBots.filter(bot => bot.type === 'trend').map((bot, index) => (
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
          </TabsContent>

          <TabsContent value="prop" className="mt-0 space-y-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full md:w-auto bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
                <TabsTrigger value="all" className="flex-grow md:flex-grow-0">Tất cả</TabsTrigger>
                <TabsTrigger value="prop" className="flex-grow md:flex-grow-0">Prop Trading</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {sortedPropTradingBots.length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPropTradingBots.map((bot, index) => (
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

              <TabsContent value="prop" className="mt-6">
                {sortedPropTradingBots.filter(bot => bot.type === 'prop').length > 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sortedPropTradingBots.filter(bot => bot.type === 'prop').map((bot, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PremiumBots;
