
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BotCardProps } from '@/components/bots/BotCard';
import AddAccountDialog from '@/components/bots/AddAccountDialog';
import BotProfileHeader from '@/components/bots/BotProfileHeader';
import BotInfoCard from '@/components/bots/BotInfoCard';
import ConnectionSettingsCard from '@/components/bots/ConnectionSettingsCard';
import BotProfileTabs from '@/components/bots/BotProfileTabs';
import { toast } from 'sonner';

const BotProfile = () => {
  const { botId } = useParams<{ botId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<BotCardProps | null>(null);
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  
  const [webhookUrl] = useState(`https://api.coinstart.pro/webhook/${botId?.toLowerCase()}`);
  const [signalToken] = useState(`CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`);
  
  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockBot: BotCardProps = {
          title: botId === 'BOT7459' ? 'Ultra 2in1' : 
                 botId === 'BOT8932' ? 'Long Master' :
                 botId === 'BOT2734' ? 'Gold Trading' :
                 'Bot ' + botId,
          subtitle: botId === 'BOT7459' ? 'Bot for combined strategy trading with dual market analysis' :
                    botId === 'BOT8932' ? 'Specialized in long-term position trading strategies' :
                    botId === 'BOT2734' ? 'Precious metals focused algorithmic trading system' :
                    'Trading bot for automated strategies',
          botId: botId || 'Unknown',
          accountCount: '12/30',
          lastUpdated: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, ''),
          colorScheme: botId === 'BOT7459' ? 'red' :
                      botId === 'BOT8932' ? 'blue' :
                      botId === 'BOT2734' ? 'green' :
                      'default',
          avatarIcon: <Info className="h-5 w-5" />,
          exchange: 'coinstart_pro',
          botForm: 'trading_view',
          status: 'Active',
        };
        
        setBot(mockBot);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchBotDetails();
  }, [botId]);

  const handleAddAccount = (accountData: any) => {
    console.log('Adding account:', accountData, 'to bot:', botId);
    toast.success('Account added successfully!');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Loading bot details...</p>
        </div>
      </MainLayout>
    );
  }

  if (!bot) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Bot Not Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find the bot you're looking for.</p>
          <Button onClick={() => window.location.href = '/bots'}>Back to Bots</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Bot Profile">
      <div className="flex flex-col">
        <BotProfileHeader botId={bot.botId} status={bot.status} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-5">
            <BotInfoCard bot={bot} />
          </div>
          
          <div className="lg:col-span-7">
            <ConnectionSettingsCard 
              webhookUrl={webhookUrl} 
              signalToken={signalToken} 
            />
          </div>
        </div>
        
        <BotProfileTabs 
          botId={bot.botId} 
          onAddAccount={() => setIsAddAccountDialogOpen(true)} 
        />
      </div>
      
      <AddAccountDialog 
        open={isAddAccountDialogOpen}
        onOpenChange={setIsAddAccountDialogOpen}
        botId={bot.botId}
        onAddAccount={handleAddAccount}
      />
    </MainLayout>
  );
};

export default BotProfile;
