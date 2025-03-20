
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

const PremiumBotsPromo = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashboardCard 
        title="Premium Bots" 
        icon={<Sparkles className="h-5 w-5 text-yellow-400" />}
        color="warning"
        className="dark:border-zinc-700"
      >
        <div className="p-4">
          <div className="prose max-w-none mb-4 dark:prose-invert">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Bot Giao Dịch Cao Cấp</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Trade Bot 365 cung cấp các Premium Bot giao dịch do đội ngũ chuyên gia phát triển với hiệu suất cao và độ ổn định vượt trội.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button 
              className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white" 
              onClick={() => navigate('/premium-bots')}
            >
              <Sparkles className="h-4 w-4" />
              <span>Khám Phá Premium Bots</span>
            </Button>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};

export default PremiumBotsPromo;
