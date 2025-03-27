
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Server, Bot, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { ExtendedSignal } from '@/types/signal';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { BotType } from '@/constants/botTypes';
import ErrorSignals from '@/components/bots/error-signals/ErrorSignals';
import NoErrorsState from '@/components/bots/error-signals/NoErrorsState';
import { Helmet } from 'react-helmet-async';

const UserBotErrors: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<BotType>('user');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{
    user: ExtendedSignal[];
    premium: ExtendedSignal[];
    prop: ExtendedSignal[];
  }>({
    user: [],
    premium: [],
    prop: []
  });

  // Get current user ID
  const userId = user?.id || 'USR-001';
  
  useEffect(() => {
    // Simulate loading user-specific error signals
    setLoading(true);
    
    setTimeout(() => {
      // Filter errors by user ID and group by bot type
      const userErrors = mockErrorSignals.filter(signal => signal.userId === userId);
      
      setErrors({
        user: userErrors.filter(signal => signal.botType === 'user'),
        premium: userErrors.filter(signal => signal.botType === 'premium'),
        prop: userErrors.filter(signal => signal.botType === 'prop')
      });
      
      setLoading(false);
    }, 800);
  }, [userId]);

  return (
    <>
      <Helmet>
        <title>Lỗi Bot | Tradebot365</title>
      </Helmet>
    
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quản lý lỗi Bot</h1>
            <p className="text-muted-foreground">
              Theo dõi và quản lý các lỗi từ các Bot của bạn
            </p>
          </div>
        </div>
        
        {/* Error Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-zinc-100 dark:bg-zinc-800 pb-2">
              <CardTitle className="text-base flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Bot Người Dùng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="py-6 animate-pulse flex justify-center">
                  <div className="h-6 w-20 bg-muted rounded"></div>
                </div>
              ) : errors.user.length > 0 ? (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-red-600">{errors.user.length}</span>
                  <p className="text-sm text-muted-foreground">lỗi phát hiện</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <p className="text-sm text-muted-foreground">không có lỗi</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
              <CardTitle className="text-base flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Premium Bots
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="py-6 animate-pulse flex justify-center">
                  <div className="h-6 w-20 bg-muted rounded"></div>
                </div>
              ) : errors.premium.length > 0 ? (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-red-600">{errors.premium.length}</span>
                  <p className="text-sm text-muted-foreground">lỗi phát hiện</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <p className="text-sm text-muted-foreground">không có lỗi</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-2">
              <CardTitle className="text-base flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Prop Trading Bots
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {loading ? (
                <div className="py-6 animate-pulse flex justify-center">
                  <div className="h-6 w-20 bg-muted rounded"></div>
                </div>
              ) : errors.prop.length > 0 ? (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-red-600">{errors.prop.length}</span>
                  <p className="text-sm text-muted-foreground">lỗi phát hiện</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-2xl font-bold text-green-600">0</span>
                  <p className="text-sm text-muted-foreground">không có lỗi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Bot Errors Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết lỗi</CardTitle>
            <CardDescription>
              Xem và quản lý các lỗi theo từng loại bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" value={activeTab} onValueChange={(value) => setActiveTab(value as BotType)}>
              <TabsList className="mb-6">
                <TabsTrigger value="user" className="flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  Bot Người Dùng
                  {errors.user.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-0.5">
                      {errors.user.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  Premium Bots
                  {errors.premium.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-0.5">
                      {errors.premium.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="prop" className="flex items-center">
                  <Bot className="h-4 w-4 mr-2" />
                  Prop Trading Bots
                  {errors.prop.length > 0 && (
                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-0.5">
                      {errors.prop.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="mt-0">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-muted rounded"></div>
                    <div className="h-12 bg-muted rounded"></div>
                  </div>
                ) : errors.user.length > 0 ? (
                  <ErrorSignals userId={userId} botType="user" />
                ) : (
                  <NoErrorsState />
                )}
              </TabsContent>
              
              <TabsContent value="premium" className="mt-0">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-muted rounded"></div>
                    <div className="h-12 bg-muted rounded"></div>
                  </div>
                ) : errors.premium.length > 0 ? (
                  <ErrorSignals userId={userId} botType="premium" />
                ) : (
                  <NoErrorsState />
                )}
              </TabsContent>
              
              <TabsContent value="prop" className="mt-0">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 bg-muted rounded"></div>
                    <div className="h-12 bg-muted rounded"></div>
                  </div>
                ) : errors.prop.length > 0 ? (
                  <ErrorSignals userId={userId} botType="prop" />
                ) : (
                  <NoErrorsState />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserBotErrors;
