import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, TrendingUp, BarChart3, Bell, Clock, Sparkles, ArrowRight, Zap, Trophy, ChevronRight, Star, User, ChartBarIcon, LineChart, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  // Mock statistics for demonstration
  const dashboardStats = {
    totalBots: 5,
    activeBots: 3,
    todayActiveBots: 2,
    totalAccounts: 12,
    connectedAccounts: 8,
    todayConnectedAccounts: 5,
    todaySignals: 8,
    pendingSignals: 3,
    processedSignals: 5,
    failedSignals: 0,
    monthlyOrders: 398
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
    <MainLayout title="Bảng Điều Khiển">
      {/* Prop Trading Promotion - New compact design */}
      <motion.div
        className="mb-8"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-violet-600 to-indigo-700">
          <div className="relative p-6">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5"></div>
            <div className="absolute bottom-0 left-20 w-32 h-32 bg-white rounded-full opacity-5"></div>
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '30px 30px'
              }}
            ></div>

            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              <div className="md:col-span-3 space-y-4">
                <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
                  <Star className="h-4 w-4 mr-2 text-yellow-300" />
                  Dịch vụ mới
                </div>
                
                <h2 className="text-2xl font-bold text-white">Prop Trading Bot</h2>
                
                <p className="text-white/80 text-sm">
                  Vượt qua các vòng thử thách Prop Trading với bộ Bot tối ưu hiệu suất & giảm thiểu rủi ro.
                  Bắt đầu sự nghiệp Prop Trader với các công cụ chuyên nghiệp ngay hôm nay.
                </p>
                
                <div className="grid grid-cols-2 gap-3 py-2">
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="flex-shrink-0 mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                      <TrendingUp className="h-3.5 w-3.5 text-teal-300" />
                    </div>
                    Tỷ lệ thành công 80%+
                  </div>
                  <div className="flex items-center text-white/90 text-sm">
                    <div className="flex-shrink-0 mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                      <Users className="h-3.5 w-3.5 text-teal-300" />
                    </div>
                    130+ trader sử dụng
                  </div>
                </div>
                
                <div className="space-x-3 pt-2">
                  <Button 
                    variant="tradebot" 
                    size="sm"
                    className="group"
                    onClick={() => navigate('/premium-bots')}
                  >
                    Khám phá
                    <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost" 
                    className="bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    onClick={() => navigate('/accounts')}
                  >
                    Kết nối tài khoản
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 w-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                          <LineChart className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">Hiệu suất</div>
                          <div className="text-emerald-400 text-lg font-bold">+11.2%</div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-0">
                        +0.8% hôm nay
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{width: "78%"}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                          <DollarSign className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">Drawdown</div>
                          <div className="text-white text-lg font-bold">4.2%</div>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-300 border-0">
                        Mục tiêu <10%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="mb-8">
        <h4 className="text-xl font-medium text-slate-800 dark:text-white mb-4">Tổng Quan Hoạt Động</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <DashboardCard 
              title="Bot Hoạt Động" 
              description="Hôm nay"
              onClick={() => navigate('/bots')}
              icon={<CircuitBoard className="h-5 w-5" />}
              color="success"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.todayActiveBots} / {dashboardStats.totalBots}</div>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(dashboardStats.todayActiveBots / dashboardStats.totalBots) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <DashboardCard 
              title="Tài Khoản Kết Nối" 
              description="Hôm nay"
              onClick={() => navigate('/accounts')}
              icon={<Users className="h-5 w-5" />}
              color="primary"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.todayConnectedAccounts} / {dashboardStats.totalAccounts}</div>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(dashboardStats.todayConnectedAccounts / dashboardStats.totalAccounts) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <DashboardCard 
              title="Tín Hiệu Mới" 
              description="Hôm nay"
              onClick={() => navigate('/bots')}
              icon={<Bell className="h-5 w-5" />}
              color="info"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.todaySignals}</div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-green-500">Đã xử lý: {dashboardStats.processedSignals}</span>
                  <span className="text-yellow-500">Đang chờ: {dashboardStats.pendingSignals}</span>
                  <span className="text-red-500">Lỗi: {dashboardStats.failedSignals}</span>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-medium text-slate-800 dark:text-white mb-4">Thống Kê Hệ Thống</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/bots')}
          >
            <DashboardCard
              title="Tổng Bot"
              icon={<CircuitBoard className="h-5 w-5" />}
              color="success"
              onClick={() => navigate('/bots')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.totalBots}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {dashboardStats.activeBots} đang hoạt động
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/accounts')}
          >
            <DashboardCard
              title="Tổng Tài Khoản"
              icon={<Users className="h-5 w-5" />}
              color="primary"
              onClick={() => navigate('/accounts')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.totalAccounts}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {dashboardStats.connectedAccounts} đã kết nối
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/bots')}
          >
            <DashboardCard
              title="Tổng Lệnh"
              icon={<BarChart3 className="h-5 w-5" />}
              color="warning"
              onClick={() => navigate('/bots')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.monthlyOrders}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Tháng này
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/bots')}
          >
            <DashboardCard
              title="Hoạt Động Gần Đây"
              icon={<Clock className="h-5 w-5" />}
              color="info"
              onClick={() => navigate('/bots')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.todaySignals}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Tín hiệu hôm nay
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mb-8"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <DashboardCard 
          title="Premium Bots" 
          icon={<Sparkles className="h-5 w-5" />}
          color="warning"
        >
          <div className="p-4">
            <div className="prose max-w-none mb-4">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white">Bot Giao Dịch Cao Cấp</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Trade Bot 365 cung cấp các Premium Bot giao dịch do đội ngũ chuyên gia phát triển với hiệu suất cao và độ ổn định vượt trội.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                className="gap-2" 
                onClick={() => navigate('/premium-bots')}
              >
                <Sparkles className="h-4 w-4" />
                <span>Khám Phá Premium Bots</span>
              </Button>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      <motion.div
        className="mt-8"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <DashboardCard title="Tổng Quan Hệ Thống">
          <div className="prose max-w-none">
            <p className="text-slate-600 dark:text-slate-300">
              Chào mừng bạn đến với Trade Bot 365. Nền tảng này giúp bạn quản lý kết nối CTrader thông qua Open API, 
              theo dõi xử lý tín hiệu và đảm bảo giao tiếp liền mạch với Coinstrat.pro.
            </p>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white">Bắt Đầu Nhanh</h3>
              <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 space-y-2">
                <li>Thêm bot của bạn trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/bots')}>Quản Lý Bot</span></li>
                <li>Khám phá và sử dụng <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/premium-bots')}>Premium Bots</span> do Trade Bot 365 phát triển</li>
                <li>Cấu hình tài khoản của bạn trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/accounts')}>Quản Lý Tài Khoản</span></li>
                <li>Theo dõi trạng thái kết nối trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/accounts')}>Quản Lý Tài Khoản</span></li>
                <li>Theo dõi hoạt động tín hiệu trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/bots')}>Quản Lý Bot</span></li>
              </ul>
            </div>
          </div>
        </DashboardCard>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
