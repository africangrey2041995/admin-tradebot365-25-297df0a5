
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, TrendingUp, BarChart3, Bell, Clock, Sparkles, ArrowRight, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      {/* Prop Trading Promotion - New attractive section */}
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
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 shadow-xl">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.5))]"></div>
          <div className="relative px-6 py-8 sm:px-8 md:py-10 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center md:text-left">
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 transition-colors">Mới Ra Mắt</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prop Trading Bots</h2>
                <p className="text-white/80 mb-6 md:max-w-md">
                  Vượt qua các vòng thử thách Prop Trading với bộ Bot đặc biệt được thiết kế để tối ưu 
                  hiệu suất và giảm thiểu rủi ro. Khởi đầu sự nghiệp Prop Trader của bạn với Trade Bot 365.
                </p>
                <ul className="text-white/90 text-sm md:text-base mb-6 text-left">
                  <li className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 p-1 rounded-full">
                      <Zap className="h-4 w-4" />
                    </span>
                    <span>Tỷ lệ thành công 80% trong các bài kiểm tra</span>
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <span className="bg-white/20 p-1 rounded-full">
                      <Trophy className="h-4 w-4" />
                    </span>
                    <span>Được 130+ trader tin dùng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-white/20 p-1 rounded-full">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span>Hỗ trợ kỹ thuật trực tiếp từ đội ngũ chuyên gia</span>
                  </li>
                </ul>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button 
                    size="lg"
                    variant="blue"
                    className="font-medium"
                    onClick={() => navigate('/premium-bots')}
                  >
                    Khám phá ngay
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/50 text-white hover:bg-white/10"
                    onClick={() => navigate('/accounts')}
                  >
                    Kết nối tài khoản
                  </Button>
                </div>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute -inset-0.5 rounded-xl bg-white/20 blur-sm"></div>
                <div className="relative bg-zinc-900/80 p-5 rounded-xl border border-white/20">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Hiệu suất Prop Master</span>
                      <Badge className="bg-green-500">+11.2%</Badge>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Drawdown: 4.8%</span>
                      <span className="text-white/70">Mục tiêu: 10%</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Tỷ lệ thành công</span>
                      <Badge className="bg-blue-500">80%+</Badge>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Trader sử dụng: 130+</span>
                      <span className="text-white/70">Đang online: 42</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-24 -top-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
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
