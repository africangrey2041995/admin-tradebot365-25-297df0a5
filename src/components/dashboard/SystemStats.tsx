
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CircuitBoard, Users, BarChart3, Clock } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';

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
        Thống Kê Hệ Thống
      </h4>
      <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardCard
            title="Tổng Bot"
            icon={<CircuitBoard className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />}
            color="success"
            onClick={() => navigate('/bots')}
          >
            <div className={`${isMobile ? 'text-xl px-2.5 pb-2.5' : 'text-3xl'} font-semibold mt-${isMobile ? '2' : '4'}`}>{dashboardStats.totalBots}</div>
            <div className={`${isMobile ? 'text-2xs px-2.5 pb-2.5' : 'text-sm'} text-slate-500 dark:text-slate-400 mt-${isMobile ? '0.5' : '2'} truncate`}>
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
            icon={<Users className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />}
            color="primary"
            onClick={() => navigate('/accounts')}
          >
            <div className={`${isMobile ? 'text-xl px-2.5 pb-2.5' : 'text-3xl'} font-semibold mt-${isMobile ? '2' : '4'}`}>{dashboardStats.totalAccounts}</div>
            <div className={`${isMobile ? 'text-2xs px-2.5 pb-2.5' : 'text-sm'} text-slate-500 dark:text-slate-400 mt-${isMobile ? '0.5' : '2'} truncate`}>
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
            icon={<BarChart3 className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />}
            color="warning"
            onClick={() => navigate('/bots')}
          >
            <div className={`${isMobile ? 'text-xl px-2.5 pb-2.5' : 'text-3xl'} font-semibold mt-${isMobile ? '2' : '4'}`}>{dashboardStats.monthlyOrders}</div>
            <div className={`${isMobile ? 'text-2xs px-2.5 pb-2.5' : 'text-sm'} text-slate-500 dark:text-slate-400 mt-${isMobile ? '0.5' : '2'} truncate`}>
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
            icon={<Clock className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />}
            color="info"
            onClick={() => navigate('/bots')}
          >
            <div className={`${isMobile ? 'text-xl px-2.5 pb-2.5' : 'text-3xl'} font-semibold mt-${isMobile ? '2' : '4'}`}>{dashboardStats.todaySignals}</div>
            <div className={`${isMobile ? 'text-2xs px-2.5 pb-2.5' : 'text-sm'} text-slate-500 dark:text-slate-400 mt-${isMobile ? '0.5' : '2'} truncate`}>
              Tín hiệu hôm nay
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemStats;
