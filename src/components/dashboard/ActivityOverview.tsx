
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, Bell } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
    <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
      <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-medium text-slate-800 dark:text-white mb-${isMobile ? '2' : '4'}`}>
        Tổng Quan Hoạt Động
      </h4>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
            icon={<CircuitBoard className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />}
            color="success"
          >
            <div className={`mt-${isMobile ? '2' : '4'}`}>
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-semibold flex justify-center items-center`}>
                <span>{dashboardStats.todayActiveBots}</span>
                <span className={`mx-2 ${isMobile ? 'text-xl' : 'text-2xl'} text-slate-500 dark:text-slate-400`}>/</span>
                <span>{dashboardStats.totalBots}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className={`w-full bg-slate-200 dark:bg-zinc-700 rounded-full ${isMobile ? 'h-2' : 'h-2.5'} mt-${isMobile ? '1' : '2'}`}>
                  <div className="bg-green-500 h-full rounded-full" style={{ width: `${(dashboardStats.todayActiveBots / dashboardStats.totalBots) * 100}%` }}></div>
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
            icon={<Users className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />}
            color="primary"
          >
            <div className={`mt-${isMobile ? '2' : '4'}`}>
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-semibold flex justify-center items-center`}>
                <span>{dashboardStats.todayConnectedAccounts}</span>
                <span className={`mx-2 ${isMobile ? 'text-xl' : 'text-2xl'} text-slate-500 dark:text-slate-400`}>/</span>
                <span>{dashboardStats.totalAccounts}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className={`w-full bg-slate-200 dark:bg-zinc-700 rounded-full ${isMobile ? 'h-2' : 'h-2.5'} mt-${isMobile ? '1' : '2'}`}>
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(dashboardStats.todayConnectedAccounts / dashboardStats.totalAccounts) * 100}%` }}></div>
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
            icon={<Bell className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />}
            color="info"
          >
            <div className={`mt-${isMobile ? '2' : '4'}`}>
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-semibold flex justify-center`}>
                {dashboardStats.todaySignals}
              </div>
              <div className={`flex justify-between mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                <span className="text-green-500 truncate">Đã xử lý: {dashboardStats.processedSignals}</span>
                <span className="text-yellow-500 truncate">Đang chờ: {dashboardStats.pendingSignals}</span>
                <span className="text-red-500 truncate">Lỗi: {dashboardStats.failedSignals}</span>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityOverview;
