
import React from 'react';
import { BotCardProps } from '@/components/bots/BotCard';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Bot, Terminal, Server } from 'lucide-react';

interface BotInfoCardProps {
  bot: BotCardProps;
}

const BotInfoCard = ({ bot }: BotInfoCardProps) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    default: 'bg-slate-100 text-slate-600'
  };

  const getBotIcon = (iconName: string = 'bot') => {
    switch (iconName) {
      case 'bot': return <Bot className="h-7 w-7" />;
      case 'cpu': return <Terminal className="h-7 w-7" />;
      case 'server': return <Server className="h-7 w-7" />;
      default: return <Bot className="h-7 w-7" />;
    }
  };

  return (
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
  );
};

export default BotInfoCard;
