
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

  const statusLabel = bot.status === 'Active' ? 'Hoạt Động' : 'Không Hoạt Động';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">Thông Tin Bot</CardTitle>
        <CardDescription>Chi tiết và cấu hình cho bot này</CardDescription>
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
            {statusLabel}
          </Badge>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Bot ID</span>
            <span className="font-medium">{bot.botId}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Sàn Giao Dịch</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5">
                <img 
                  src="/lovable-uploads/8107dc0b-de72-421f-b369-5277cc2f8361.png" 
                  alt="Coinstart Pro" 
                  className="w-5 h-5 rounded-full"
                />
              </div>
              <span className="font-medium">Coinstart Pro</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Loại Bot</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white">
                <img 
                  src="/lovable-uploads/baec666a-ccac-4ef0-bb3e-8468d891488b.png" 
                  alt="Trading View" 
                  className="w-5 h-5 rounded-full"
                />
              </div>
              <span className="font-medium">Trading View</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Ngày Tạo</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{bot.lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Tài Khoản Kết Nối</span>
            <span className="font-medium">{bot.accountCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotInfoCard;
