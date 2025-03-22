
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ListFilter, Filter, ArrowUpDown, PlusCircle } from 'lucide-react';
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
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

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
  
  const filteredBots = premiumBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    
    return matchesSearch && matchesRisk;
  });

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
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };

  const totalBots = premiumBots.length;
  const activeBots = premiumBots.filter(bot => bot.status === 'active').length;
  const inactiveBots = totalBots - activeBots;
  
  const totalAccounts = 85;
  const averageProfit = "+12.4%";
  const profitableBots = Math.round(totalBots * 0.75);
  
  return (
    <MainLayout title="Premium Bots">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Premium Bots</h1>
          <Button onClick={() => navigate('/admin/premium-bots/create')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm Premium Bot
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-zinc-800 bg-zinc-900/80 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <p className="text-zinc-400 text-sm">Tổng Bot</p>
                  <h3 className="text-3xl font-bold mt-1">{totalBots}</h3>
                  <div className="flex justify-between space-x-6 mt-4">
                    <div>
                      <p className="text-green-400 text-xs">Hoạt động</p>
                      <p className="text-xl font-medium">{activeBots}</p>
                    </div>
                    <div>
                      <p className="text-red-400 text-xs">Không hoạt động</p>
                      <p className="text-xl font-medium">{inactiveBots}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-zinc-800 bg-zinc-900/80 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <p className="text-zinc-400 text-sm">Tài khoản</p>
                  <h3 className="text-3xl font-bold mt-1">{totalAccounts}</h3>
                  <div className="mt-4">
                    <p className="text-zinc-400 text-xs">Tổng số tài khoản giao dịch được kết nối</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-zinc-800 bg-zinc-900/80 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="w-full">
                  <p className="text-zinc-400 text-sm">Hiệu suất</p>
                  <h3 className={`text-3xl font-bold mt-1 ${parseFloat(averageProfit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {averageProfit}
                  </h3>
                  <div className="mt-4">
                    <p className="text-zinc-400 text-xs">{profitableBots} bot có lợi nhuận</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm bot..."
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
                  <SelectItem value="medium">Trung</SelectItem>
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

        {sortedBots.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {sortedBots.map((bot, index) => (
              <motion.div
                key={bot.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onClick={() => navigate(`/premium-bots/${bot.id}`)}
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
      </div>
    </MainLayout>
  );
};

export default PremiumBots;
