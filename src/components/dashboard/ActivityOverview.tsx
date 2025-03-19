
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, Bell } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface ActivityOverviewProps {
  dashboardStats: {
    totalBots: number;
    activeBots: number;
    todayActiveBots: number;
    totalAccounts: number;
    connectedAccounts: number;
    todayConnectedAccounts: number;
    todaySignals: number;
    pendingSignals: number;
    processedSignals: number;
    failedSignals: number;
    monthlyOrders: number;
  };
}

const ActivityOverview = ({ dashboardStats }: ActivityOverviewProps) => {
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
  );
};

export default ActivityOverview;
