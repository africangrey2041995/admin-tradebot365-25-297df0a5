import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot, CheckCircle2, CircleAlert, Users, DollarSign, BarChart2, TrendingUp, AlertTriangle, BriefcaseIcon } from 'lucide-react';
import AddAccountDialog from '@/components/bots/AddAccountDialog';
import { mockPropBots } from '@/mocks/propBotsMock';
import { BotStatus, BotRiskLevel } from '@/constants/botTypes';
import { toast } from 'sonner';

const propTradingBots = mockPropBots.map(bot => ({
  ...bot,
  id: bot.botId,
  features: [
    'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
    'Quản lý rủi ro tự động theo yêu cầu của Prop Firm',
    'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
    'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
  ],
  requirements: [
    `Vốn tối thiểu ${bot.minCapital}`,
    'Tài khoản Coinstrat Pro đã xác minh',
    'Phù hợp với giai đoạn Challenger hoặc Verification'
  ],
  subscribers: bot.users,
  colorScheme: bot.botId === 'PROP-001' ? 'blue' : 
               bot.botId === 'PROP-002' ? 'green' : 
               bot.botId === 'PROP-003' ? 'purple' : 
               bot.botId === 'PROP-004' ? 'red' : 'default'
}));

const PropTradingBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  
  const bot = propTradingBots.find(b => b.botId === botId || b.id === botId);
  
  if (!bot) {
    return (
      <MainLayout title="Bot Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Bot không tồn tại
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Bot trading bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => navigate('/premium-bots')}>
            Quay lại danh sách Bot
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const getColorByRisk = (risk: BotRiskLevel) => {
    switch (risk) {
      case BotRiskLevel.LOW: return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case BotRiskLevel.MEDIUM: return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400';
      case BotRiskLevel.HIGH: return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };
  
  const riskLabel = {
    [BotRiskLevel.LOW]: 'Thấp',
    [BotRiskLevel.MEDIUM]: 'Trung bình',
    [BotRiskLevel.HIGH]: 'Cao'
  }[bot.risk as BotRiskLevel];
  
  const riskColor = getColorByRisk(bot.risk as BotRiskLevel);
  
  const colorSchemeClasses = {
    blue: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/30'
    },
    green: {
      badge: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/10',
      icon: 'text-green-500 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800/30'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      icon: 'text-purple-500 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/30'
    },
    red: {
      badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/10',
      icon: 'text-red-500 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800/30'
    },
    default: {
      badge: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-900/10',
      icon: 'text-slate-500 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-800/30'
    }
  };
  
  const colors = colorSchemeClasses[bot.colorScheme as keyof typeof colorSchemeClasses] || colorSchemeClasses.default;
  
  const handleAddAccount = () => {
    setIsAddAccountDialogOpen(true);
  };

  const handleAddAccountSubmit = (formData: any) => {
    console.log('Adding account:', formData);
    toast.success(`Tích hợp thành công!`, {
      description: `Bạn đã tích hợp ${bot.name} với tài khoản đã chọn.`,
    });
    navigate('/premium-bots');
  };
  
  return (
    <MainLayout title={bot.name}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/premium-bots')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {bot.name}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-14 w-14 ${colors.bg} ${colors.border} border-2`}>
                      <AvatarFallback className={colors.icon}>
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{bot.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {bot.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className={riskColor}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Rủi ro: {riskLabel}
                  </Badge>
                  <Badge variant="outline" className={colors.badge}>
                    <DollarSign className="h-3 w-3 mr-1" />
                    Vốn tối thiểu: {bot.minCapital}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400">
                    <Users className="h-3 w-3 mr-1" />
                    {bot.subscribers} người đăng ký
                  </Badge>
                </div>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="w-full">Tổng quan</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Tính năng
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            {bot.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <CircleAlert className="h-4 w-4 mr-2 text-amber-500" />
                            Yêu cầu
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            {bot.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
                          Thống kê
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Người dùng đăng ký</div>
                            <div className="text-2xl font-bold mt-1 flex items-center">
                              {bot.subscribers}
                              <Users className="ml-2 h-5 w-5 text-blue-500" />
                            </div>
                          </div>
                          
                          <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Tài khoản kết nối</div>
                            <div className="text-2xl font-bold mt-1 flex items-center">
                              {Math.round(bot.subscribers * 1.5)}
                              <BriefcaseIcon className="ml-2 h-5 w-5 text-purple-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Đăng ký Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleAddAccount}
                >
                  Tích hợp với tài khoản
                </Button>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
                  <p>Khi tích hợp bot này, bạn sẽ nhận được:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Tín hiệu giao dịch tự động 24/7</li>
                    <li>Quản lý rủi ro theo tiêu chuẩn Prop Trading</li>
                    <li>Báo cáo hiệu suất chi tiết</li>
                    <li>Hỗ trợ kỹ thuật ưu tiên</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Thông tin Bot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Sàn giao dịch
                  </div>
                  <div className="mt-1">{bot.exchange}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Loại bot
                  </div>
                  <div className="mt-1">Prop Trading</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Trạng thái
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {bot.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    ID Bot
                  </div>
                  <code className="mt-1 block bg-slate-50 dark:bg-slate-800 p-1.5 rounded text-xs">
                    {bot.id}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
      
      <AddAccountDialog 
        botId={botId || ''}
        open={isAddAccountDialogOpen}
        onOpenChange={setIsAddAccountDialogOpen}
        onAddAccount={handleAddAccountSubmit}
      />
    </MainLayout>
  );
};

export default PropTradingBotDetail;
