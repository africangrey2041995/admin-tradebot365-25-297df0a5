
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartLine, Users, Wallet, Bot, TrendingUp, ExternalLink, Sparkles, ShieldAlert, ShieldCheck, ShieldHalf, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { BotTag, BotTagType } from './BotTag';

interface PremiumBotCardProps {
  botId: string;
  name: string;
  description: string;
  exchange: string;
  type: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  risk: 'low' | 'medium' | 'high';
  minCapital: string;
  subscribers: number;
  imageUrl: string | null;
  colorScheme: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  accountCount?: string;
  externalId?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const PremiumBotCard = ({
  botId,
  name,
  description,
  exchange,
  type,
  performanceLastMonth,
  performanceAllTime,
  risk,
  minCapital,
  subscribers,
  imageUrl,
  colorScheme = 'default',
  isIntegrated = false,
  accountCount,
  externalId,
  isFeatured = false,
  isNew = false,
  isBestSeller = false,
}: PremiumBotCardProps) => {
  const navigate = useNavigate();

  const getTagToShow = (): BotTagType | null => {
    if (isFeatured) return 'featured';
    if (isNew) return 'new';
    if (isBestSeller) return 'bestSeller';
    return null;
  };

  const tagToShow = getTagToShow();

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung';
      case 'high': return 'Cao';
      default: return risk;
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <ShieldCheck className="h-3 w-3 mr-1" />;
      case 'medium': return <ShieldHalf className="h-3 w-3 mr-1" />;
      case 'high': return <ShieldAlert className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'momentum': return 'Momentum';
      case 'scalping': return 'Scalping';
      case 'swing': return 'Swing';
      case 'grid': return 'Grid';
      case 'trend': return 'Trend';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'momentum': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'scalping': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'swing': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'grid': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'trend': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getCardColors = (colorScheme: string) => {
    switch (colorScheme) {
      case 'red': return 'bg-gradient-to-br from-red-50/80 to-red-100/80 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800/30';
      case 'blue': return 'bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/30';
      case 'green': return 'bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800/30';
      case 'purple': return 'bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800/30';
      default: return 'bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-800 border-slate-200 dark:border-zinc-700';
    }
  };

  const getPerformanceColor = (performance: string) => {
    const value = parseFloat(performance);
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const handleSubscribe = () => {
    navigate(`/premium-bots/${botId}`);
  };

  const handleViewDetails = () => {
    toast('Xem chi tiết', {
      description: `Đang chuyển đến trang chi tiết của bot ${name}`,
    });
    navigate(`/premium-bots/${botId}`);
  };

  const getExchangeLogo = (exchange: string) => {
    switch (exchange.toLowerCase()) {
      case 'coinstart pro':
        return (
          <div className="flex items-center justify-center w-5 h-5">
            <img 
              src="/lovable-uploads/8107dc0b-de72-421f-b369-5277cc2f8361.png" 
              alt="Coinstart Pro" 
              className="w-5 h-5 rounded-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const connectedAccounts = accountCount || Math.round(subscribers * 1.5).toString();

  return (
    <div className="pt-6 px-3">
      <Card className={`border hover:shadow-md transition-all ${getCardColors(colorScheme)}`}>
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <div className="flex gap-2 items-center">
              <div className={`p-1.5 rounded-lg ${
                colorScheme === 'default' ? 'bg-slate-100 dark:bg-zinc-800' : 
                colorScheme === 'red' ? 'bg-red-100/80 dark:bg-red-900/30' : 
                colorScheme === 'blue' ? 'bg-blue-100/80 dark:bg-blue-900/30' : 
                colorScheme === 'green' ? 'bg-green-100/80 dark:bg-green-900/30' : 
                'bg-purple-100/80 dark:bg-purple-900/30'
              }`}>
                <Bot className={`h-4 w-4 ${
                  colorScheme === 'default' ? 'text-slate-600 dark:text-slate-300' : 
                  colorScheme === 'red' ? 'text-red-600 dark:text-red-300' : 
                  colorScheme === 'blue' ? 'text-blue-600 dark:text-blue-300' : 
                  colorScheme === 'green' ? 'text-green-600 dark:text-green-300' : 
                  'text-purple-600 dark:text-purple-300'
                }`} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-1">
                  {name}
                </h3>
                <div className="flex gap-1 mt-1 items-center text-xs">
                  {getExchangeLogo(exchange)}
                  <Badge className={`text-[10px] py-0 px-1.5 ${getTypeColor(type)}`}>{getTypeLabel(type)}</Badge>
                  {externalId && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mx-1"></div>
                      <span className="text-xs text-slate-500">{externalId}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              {tagToShow && (
                <div className="mb-1">
                  <BotTag type={tagToShow} size="sm" />
                </div>
              )}
              <Badge className={`text-[10px] py-0.5 px-2 flex items-center ${getRiskColor(risk)}`}>
                {getRiskIcon(risk)}
                <span>{getRiskLabel(risk)}</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 h-[32px] mb-2">
            {description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg">
              <div className="flex items-center gap-1 mb-0.5">
                <Users className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Người dùng đăng ký</span>
              </div>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {subscribers}
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg">
              <div className="flex items-center gap-1 mb-0.5">
                <Briefcase className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Tài khoản kết nối</span>
              </div>
              <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {connectedAccounts}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-1 bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg">
            <div className="flex items-center gap-1">
              <Wallet className="h-3 w-3 text-slate-500 dark:text-slate-400" />
              <span className="text-[10px]">Vốn tối thiểu:</span>
              <span className="text-xs font-semibold">{minCapital}</span>
            </div>
            {isIntegrated && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">Đã tích hợp</Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 gap-1 flex-col">
          {isIntegrated ? (
            <Button 
              variant="default" 
              size="sm"
              className="w-full text-xs h-8" 
              onClick={() => navigate(`/premium-bots/${botId}`)}
            >
              Quản Lý Bot
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="w-full text-xs h-8" 
              onClick={handleSubscribe}
            >
              Đăng Ký Sử Dụng
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs h-7" 
            onClick={handleViewDetails}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Chi Tiết
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
