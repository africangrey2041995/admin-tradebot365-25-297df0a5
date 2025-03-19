import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartLine, Users, Gauge, Wallet, Bot, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';

interface PremiumBotCardProps {
  id: string;
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
}

export const PremiumBotCard = ({
  id,
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
}: PremiumBotCardProps) => {
  const navigate = useNavigate();

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung bình';
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
    navigate(`/premium-bots/${id}`);
  };

  const handleViewDetails = () => {
    toast('Xem chi tiết', {
      description: `Đang chuyển đến trang chi tiết của bot ${name}`,
    });
    navigate(`/premium-bots/${id}`);
  };

  return (
    <Card className={`overflow-hidden border shadow hover:shadow-md transition-all ${getCardColors(colorScheme)}`}>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-3 items-center">
            <div className={`p-2 rounded-lg ${
              colorScheme === 'default' ? 'bg-slate-100 dark:bg-zinc-800' : 
              colorScheme === 'red' ? 'bg-red-100/80 dark:bg-red-900/30' : 
              colorScheme === 'blue' ? 'bg-blue-100/80 dark:bg-blue-900/30' : 
              colorScheme === 'green' ? 'bg-green-100/80 dark:bg-green-900/30' : 
              'bg-purple-100/80 dark:bg-purple-900/30'
            }`}>
              <Bot className={`h-5 w-5 ${
                colorScheme === 'default' ? 'text-slate-600 dark:text-slate-300' : 
                colorScheme === 'red' ? 'text-red-600 dark:text-red-300' : 
                colorScheme === 'blue' ? 'text-blue-600 dark:text-blue-300' : 
                colorScheme === 'green' ? 'text-green-600 dark:text-green-300' : 
                'text-purple-600 dark:text-purple-300'
              }`} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-1">
                {name}
                <Sparkles className="h-4 w-4 text-yellow-500 ml-1" />
              </h3>
              <div className="flex gap-1 mt-1">
                <Badge variant="outline">{exchange}</Badge>
                <Badge className={getTypeColor(type)}>{getTypeLabel(type)}</Badge>
              </div>
            </div>
          </div>
          <Badge className={getRiskColor(risk)}>
            Rủi ro: {getRiskLabel(risk)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 h-[60px]">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <ChartLine className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Hiệu suất Tháng</span>
            </div>
            <div className={`text-lg font-semibold ${getPerformanceColor(performanceLastMonth)}`}>
              {performanceLastMonth}
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Hiệu suất Tổng</span>
            </div>
            <div className={`text-lg font-semibold ${getPerformanceColor(performanceAllTime)}`}>
              {performanceAllTime}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm">Vốn tối thiểu:</span>
            <span className="font-semibold">{minCapital}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-semibold">{subscribers}</span>
            <span className="text-sm">người dùng</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2 flex-col sm:flex-row">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={handleSubscribe}
        >
          Đăng Ký Sử Dụng
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleViewDetails}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Chi Tiết
        </Button>
      </CardFooter>
    </Card>
  );
};
