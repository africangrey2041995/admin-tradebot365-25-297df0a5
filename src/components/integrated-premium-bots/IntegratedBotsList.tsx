
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PremiumBotCard } from '@/components/bots/PremiumBotCard';
import { PremiumBot, Account } from '@/types';

interface IntegratedBotsListProps {
  bots: PremiumBot[];
}

const IntegratedBotsList: React.FC<IntegratedBotsListProps> = ({ bots }) => {
  const navigate = useNavigate();

  const getAccountCount = (accounts: Account[] | number | undefined): string => {
    if (!accounts) return "0";
    if (typeof accounts === 'number') return accounts.toString();
    return accounts.length.toString();
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

  if (bots.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Bạn chưa tích hợp bot premium nào
        </p>
        <Button
          variant="outline"
          onClick={() => navigate('/premium-bots')}
          className="mt-4"
        >
          Khám phá Premium Bots
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {bots.map((bot, index) => (
        <motion.div
          key={bot.botId}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          onClick={() => navigate(`/integrated-premium-bots/${bot.botId}`)}
          className="cursor-pointer"
        >
          <PremiumBotCard 
            botId={bot.botId}
            name={bot.name}
            description={bot.description || ''}
            exchange={bot.exchange}
            type={bot.type}
            performanceLastMonth={bot.performanceLastMonth}
            performanceAllTime={bot.performanceAllTime}
            risk={bot.risk}
            minCapital={bot.minCapital}
            subscribers={bot.subscribers}
            imageUrl={bot.imageUrl}
            colorScheme={bot.colorScheme}
            isIntegrated={true}
            accountCount={getAccountCount(bot.accounts)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default IntegratedBotsList;
