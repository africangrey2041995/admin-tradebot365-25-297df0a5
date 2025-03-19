
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, TrendingUp, BarChart3, Bell, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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
