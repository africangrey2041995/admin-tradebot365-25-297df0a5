
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, BarChart3, Clock } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface SystemStatsProps {
  dashboardStats: {
    totalBots: number;
    activeBots: number;
    totalAccounts: number;
    connectedAccounts: number;
    monthlyOrders: number;
    todaySignals: number;
  };
}

const SystemStats = ({ dashboardStats }: SystemStatsProps) => {
  const navigate = useNavigate();
  
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
    <div className="mb-8">
      <h4 className="text-xl font-medium text-slate-800 dark:text-white mb-4">Thống Kê Hệ Thống</h4>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardCard
            title="Tổng Bot"
            icon={<CircuitBoard className="h-5 w-5" />}
            color="success"
            onClick={() => navigate('/bots')}
          >
            <div className="text-3xl font-semibold mt-4">{dashboardStats.totalBots}</div>
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
        >
          <DashboardCard
            title="Tổng Tài Khoản"
            icon={<Users className="h-5 w-5" />}
            color="primary"
            onClick={() => navigate('/accounts')}
          >
            <div className="text-3xl font-semibold mt-4">{dashboardStats.totalAccounts}</div>
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
        >
          <DashboardCard
            title="Tổng Lệnh"
            icon={<BarChart3 className="h-5 w-5" />}
            color="warning"
            onClick={() => navigate('/bots')}
          >
            <div className="text-3xl font-semibold mt-4">{dashboardStats.monthlyOrders}</div>
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
        >
          <DashboardCard
            title="Hoạt Động Gần Đây"
            icon={<Clock className="h-5 w-5" />}
            color="info"
            onClick={() => navigate('/bots')}
          >
            <div className="text-3xl font-semibold mt-4">{dashboardStats.todaySignals}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Tín hiệu hôm nay
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemStats;
