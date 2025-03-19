
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, Link2, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const navigate = useNavigate();

  // Mock statistics for demonstration
  const dashboardStats = {
    totalBots: 5,
    activeBots: 3,
    totalAccounts: 12,
    connectedAccounts: 8,
    disconnectedAccounts: 3,
    pendingAccounts: 1,
    tradingViewSignals: 24,
    processedSignals: 22
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardCard 
            title="Quản Lý Bot" 
            description={`${dashboardStats.activeBots} bot đang hoạt động trong tổng số ${dashboardStats.totalBots}`}
            onClick={() => navigate('/bots')}
            className="h-full"
          >
            <div className="flex items-center justify-between">
              <CircuitBoard className="h-10 w-10 text-primary" />
              <div className="text-3xl font-bold">{dashboardStats.totalBots}</div>
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
            title="Quản Lý Tài Khoản" 
            description="Theo dõi tài khoản CTrader của bạn"
            onClick={() => navigate('/accounts')}
            className="h-full"
          >
            <div className="flex items-center justify-between">
              <Users className="h-10 w-10 text-primary" />
              <div className="text-3xl font-bold">{dashboardStats.totalAccounts}</div>
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
            title="Trạng Thái Kết Nối" 
            description="Theo dõi trạng thái kết nối"
            onClick={() => navigate('/connections')}
            className="h-full"
          >
            <div className="flex items-center justify-between">
              <Link2 className="h-10 w-10 text-primary" />
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <StatusIndicator status="Connected" size="sm" />
                  <span className="text-sm">{dashboardStats.connectedAccounts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status="Disconnected" size="sm" />
                  <span className="text-sm">{dashboardStats.disconnectedAccounts}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status="Pending" size="sm" />
                  <span className="text-sm">{dashboardStats.pendingAccounts}</span>
                </div>
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
            title="Hoạt Động Tín Hiệu" 
            description="Theo dõi tín hiệu giao dịch"
            onClick={() => navigate('/signals')}
            className="h-full"
          >
            <div className="flex items-center justify-between">
              <Radio className="h-10 w-10 text-primary" />
              <div className="text-3xl font-bold">{dashboardStats.tradingViewSignals}</div>
            </div>
            <div className="mt-2 text-right text-sm text-muted-foreground">
              {dashboardStats.processedSignals} đã xử lý
            </div>
          </DashboardCard>
        </motion.div>
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
            <p className="text-muted-foreground">
              Chào mừng bạn đến với Trade Bot 365. Nền tảng này giúp bạn quản lý kết nối CTrader thông qua Open API, 
              theo dõi xử lý tín hiệu và đảm bảo giao tiếp liền mạch với Coinstrat.pro.
            </p>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium">Bắt Đầu Nhanh</h3>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Thêm bot của bạn trong phần <span className="font-medium">Quản Lý Bot</span></li>
                <li>Cấu hình tài khoản của bạn trong phần <span className="font-medium">Quản Lý Tài Khoản</span></li>
                <li>Theo dõi trạng thái kết nối trong phần <span className="font-medium">Trạng Thái Kết Nối</span></li>
                <li>Theo dõi hoạt động tín hiệu trong phần <span className="font-medium">Nhật Ký Tín Hiệu</span></li>
              </ul>
            </div>
          </div>
        </DashboardCard>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
