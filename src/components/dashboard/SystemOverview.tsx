
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';

const SystemOverview = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default SystemOverview;
