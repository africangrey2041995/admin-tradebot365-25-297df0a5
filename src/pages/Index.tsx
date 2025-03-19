
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, TrendingUp, BarChart3, Wallet, DollarSign, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  // Mock statistics for demonstration
  const dashboardStats = {
    totalBots: 5,
    activeBots: 3,
    totalAccounts: 12,
    connectedAccounts: 8,
    pendingAccounts: 1,
    disconnectedAccounts: 3,
    totalRevenue: '$18,426.96',
    todaySignals: 8,
    weeklyGrowth: '16.24%',
    monthlyOrders: 398,
    monthlyGrowth: '12.5%'
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
        <h4 className="text-xl font-medium text-slate-800 dark:text-white mb-4">Tổng Quan Bot Giao Dịch</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <DashboardCard 
              title="Tổng thu nhập" 
              description="Tháng này"
              onClick={() => navigate('/accounts')}
              icon={<DollarSign className="h-5 w-5" />}
              color="primary"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.totalRevenue}</div>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-500">+ {dashboardStats.weeklyGrowth}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">so với tuần trước</span>
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
              title="Bot Hoạt Động" 
              description="Tổng Bot Chạy"
              onClick={() => navigate('/bots')}
              icon={<CircuitBoard className="h-5 w-5" />}
              color="success"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.activeBots} / {dashboardStats.totalBots}</div>
                <div className="flex items-center mt-2">
                  <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2.5 mt-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(dashboardStats.activeBots / dashboardStats.totalBots) * 100}%` }}></div>
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
              title="Tổng Lệnh" 
              description="Tháng này"
              onClick={() => navigate('/bots')}
              icon={<BarChart3 className="h-5 w-5" />}
              color="warning"
            >
              <div className="mt-4">
                <div className="text-2xl font-semibold">{dashboardStats.monthlyOrders}</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">+ {dashboardStats.monthlyGrowth}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">so với tháng trước</span>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={3}
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
                <div className="w-full bg-slate-200 dark:bg-zinc-700 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(dashboardStats.todaySignals / 10) * 100}%` }}></div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-medium text-slate-800 dark:text-white mb-4">Trạng Thái Kết Nối</h4>
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/accounts')}
          >
            <DashboardCard
              title="Đã Kết Nối"
              icon={<div className="h-5 w-5 rounded-full bg-green-500"></div>}
              color="success"
              onClick={() => navigate('/accounts')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.connectedAccounts}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Kết nối thành công
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/accounts')}
          >
            <DashboardCard
              title="Đang Xử Lý"
              icon={<div className="h-5 w-5 rounded-full bg-yellow-500"></div>}
              color="warning"
              onClick={() => navigate('/accounts')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.pendingAccounts}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Chờ xác thực
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => navigate('/accounts')}
          >
            <DashboardCard
              title="Mất Kết Nối"
              icon={<div className="h-5 w-5 rounded-full bg-red-500"></div>}
              color="danger"
              onClick={() => navigate('/accounts')}
            >
              <div className="text-3xl font-semibold">{dashboardStats.disconnectedAccounts}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Cần kết nối lại
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
                <li>Theo dõi trạng thái kết nối trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/accounts')}>Trạng Thái Kết Nối</span></li>
                <li>Theo dõi hoạt động tín hiệu trong phần <span className="font-medium text-primary cursor-pointer" onClick={() => navigate('/bots')}>Nhật Ký Tín Hiệu</span></li>
              </ul>
            </div>
          </div>
        </DashboardCard>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
