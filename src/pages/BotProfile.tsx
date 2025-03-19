import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  Copy, 
  Webhook, 
  Key, 
  ExternalLink, 
  Terminal, 
  Server, 
  Bot, 
  Settings, 
  Trash,
  RefreshCw,
  Power,
  Info,
  Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { BotCardProps } from '@/components/bots/BotCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import AddAccountDialog from '@/components/bots/AddAccountDialog';

const BotProfile = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
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
          avatarIcon: <Bot className="h-5 w-5" />,
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
  
  const handleBack = () => {
    navigate('/bots');
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  const getBotIcon = (iconName: string = 'bot') => {
    switch (iconName) {
      case 'bot': return <Bot className="h-7 w-7" />;
      case 'cpu': return <Terminal className="h-7 w-7" />;
      case 'server': return <Server className="h-7 w-7" />;
      default: return <Bot className="h-7 w-7" />;
    }
  };
  
  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    default: 'bg-slate-100 text-slate-600'
  };

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
          <Button onClick={handleBack}>Back to Bots</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Bot Profile">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Bots
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash className="h-4 w-4" />
              <span>Delete Bot</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Power className="h-4 w-4" />
              <span>{bot.status === 'Active' ? 'Stop Bot' : 'Start Bot'}</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">Bot Information</CardTitle>
                <CardDescription>Details and configuration for this bot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className={`h-24 w-24 mb-4 ${colorClasses[bot.colorScheme as keyof typeof colorClasses]} border-2 border-white shadow-sm`}>
                    <AvatarFallback className="text-2xl">
                      {getBotIcon('bot')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-center">{bot.title}</h2>
                  <p className="text-muted-foreground text-center mt-1 mb-2">{bot.subtitle}</p>
                  <Badge variant={bot.status === 'Active' ? 'success' : 'secondary'} className="mt-2">
                    {bot.status}
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Bot ID</span>
                    <span className="font-medium">{bot.botId}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Exchange</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 16.5L16.5 12L12 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="font-medium">Coinstart Pro</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Bot Form</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.4 7L17.1 9H15.65L17.45 6H15.65L13.85 9H12.3L14.1 6H12.3L10.5 9H9L10.8 6H4V18H20V7H18.4Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="font-medium">Trading View</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Created Date</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{bot.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Connected Accounts</span>
                    <span className="font-medium">{bot.accountCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">Connection Settings</CardTitle>
                <CardDescription>
                  Use these settings to connect TradingView signals to this bot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Webhook className="h-5 w-5 text-primary" />
                      Webhook URL
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      This is the URL you should use in your TradingView alert message settings.
                    </p>
                    <div className="relative">
                      <div className="flex items-center border rounded-md bg-slate-50 dark:bg-zinc-900 pl-4 pr-2 py-2">
                        <code className="text-sm flex-grow break-all">{webhookUrl}</code>
                        <div className="flex gap-1 ml-2">
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(webhookUrl, 'Webhook URL')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => window.open(webhookUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      Signal Token
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use this token in your TradingView alert to authenticate your signals.
                    </p>
                    <div className="relative">
                      <div className="flex items-center border rounded-md bg-slate-50 dark:bg-zinc-900 pl-4 pr-2 py-2">
                        <code className="text-sm flex-grow">{signalToken}</code>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-8 w-8 ml-2"
                          onClick={() => copyToClipboard(signalToken, 'Signal Token')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                    <h4 className="font-medium text-amber-800 mb-2">Example TradingView Alert Message</h4>
                    <pre className="bg-white border border-amber-100 p-3 rounded text-xs overflow-auto text-slate-700">
{`{{strategy.order.alert_message}}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
            <TabsTrigger value="logs">Logs From Trading View</TabsTrigger>
            <TabsTrigger value="coinstrat">Log to Coinstrat Pro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>Manage accounts connected to this bot</CardDescription>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setIsAddAccountDialogOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <BotAccountsTable botId={bot.botId} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Logs From Trading View</CardTitle>
                    <CardDescription>Recent webhook messages received from TradingView</CardDescription>
                  </div>
                  <Button variant="outline">Refresh</Button>
                </div>
              </CardHeader>
              <CardContent>
                <TradingViewLogs botId={bot.botId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coinstrat">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Log to Coinstrat Pro</CardTitle>
                    <CardDescription>Signals pushed to connected accounts via Coinstrat Pro</CardDescription>
                  </div>
                  <Button variant="outline">Refresh</Button>
                </div>
              </CardHeader>
              <CardContent>
                <CoinstratLogs botId={bot.botId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
