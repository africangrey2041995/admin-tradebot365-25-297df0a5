
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle2, BarChart, Filter, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminErrorDisplay from '@/components/bots/error-signals/AdminErrorDisplay';
import { BotType } from '@/constants/botTypes';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';

const AdminBotErrors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BotType>('user');
  const navigate = useNavigate();
  
  // Calculate error stats by bot type
  const stats = {
    user: mockErrorSignals.filter(signal => signal.botType === 'user').length,
    premium: mockErrorSignals.filter(signal => signal.botType === 'premium').length,
    prop: mockErrorSignals.filter(signal => signal.botType === 'prop').length
  };
  
  const handleViewErrorDetails = (errorId: string) => {
    navigate(ADMIN_ROUTES.BOT_ERROR_DETAIL(errorId));
  };

  return (
    <>
      <Helmet>
        <title>Quản lý lỗi Bot | Admin</title>
      </Helmet>
      
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Quản lý lỗi Bot</h1>
            <p className="text-muted-foreground">
              Quản lý và theo dõi các lỗi từ các loại bot trong hệ thống
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
        </div>
        
        {/* Error Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-red-800 dark:text-red-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Bot Người Dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.user}</div>
              <p className="text-sm text-red-600 dark:text-red-400">Lỗi được phát hiện</p>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-amber-800 dark:text-amber-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                Premium Bots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.premium}</div>
              <p className="text-sm text-amber-600 dark:text-amber-400">Lỗi được phát hiện</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-blue-800 dark:text-blue-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                Prop Trading Bots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.prop}</div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Lỗi được phát hiện</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Bot Errors Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết lỗi Bot</CardTitle>
            <CardDescription>
              Xem và quản lý các lỗi theo từng loại bot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" value={activeTab} onValueChange={(value) => setActiveTab(value as BotType)}>
              <TabsList className="mb-6">
                <TabsTrigger value="user" className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Bot Người Dùng
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium rounded-full px-2 py-0.5">
                    {stats.user}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="premium" className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Premium Bots
                  <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium rounded-full px-2 py-0.5">
                    {stats.premium}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="prop" className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Prop Trading Bots
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-2 py-0.5">
                    {stats.prop}
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="mt-0">
                <AdminErrorDisplay 
                  botType="user" 
                  onViewDetails={handleViewErrorDetails}
                />
              </TabsContent>
              
              <TabsContent value="premium" className="mt-0">
                <AdminErrorDisplay 
                  botType="premium" 
                  onViewDetails={handleViewErrorDetails}
                />
              </TabsContent>
              
              <TabsContent value="prop" className="mt-0">
                <AdminErrorDisplay 
                  botType="prop"
                  onViewDetails={handleViewErrorDetails}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminBotErrors;
