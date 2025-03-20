
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useIsMobile } from '@/hooks/use-mobile';

const PremiumBotsPromo = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={isMobile ? "mb-3" : "mb-6"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashboardCard 
        title="Premium Bots" 
        icon={<Sparkles className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'} text-yellow-400`} />}
        color="warning"
        className="dark:border-zinc-700"
      >
        <div className={`${isMobile ? 'p-2 pb-3' : 'p-4'}`}>
          <div className="prose max-w-none mb-3 dark:prose-invert">
            <h3 className={`${isMobile ? 'text-sm font-medium' : 'text-lg font-medium'} text-slate-800 dark:text-slate-100`}>Bot Giao Dịch Cao Cấp</h3>
            <p className={`${isMobile ? 'text-2xs mt-1' : 'text-sm mt-2'} text-slate-600 dark:text-slate-300`}>
              Trade Bot 365 cung cấp các Premium Bot giao dịch do đội ngũ chuyên gia phát triển với hiệu suất cao và độ ổn định vượt trội.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <Button 
              className={`gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white ${isMobile ? 'text-2xs py-0.5 h-7 px-2.5' : ''}`}
              onClick={() => navigate('/premium-bots')}
            >
              <Sparkles className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
              <span>Khám Phá Premium Bots</span>
            </Button>
          </div>
        </div>
      </DashboardCard>
    </motion.div>
  );
};

export default PremiumBotsPromo;
