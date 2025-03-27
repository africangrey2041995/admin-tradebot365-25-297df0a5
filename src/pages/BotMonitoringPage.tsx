
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserErrorDisplay } from '@/components/bots/error-signals/UserErrorDisplay';
import { BotType } from '@/constants/botTypes';
import { RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import ErrorDetailsModal from '@/components/admin/monitoring/ErrorDetailsModal';

/**
 * Trang Giám sát Bot cho người dùng
 * Hiển thị lỗi của tất cả các bot mà người dùng sở hữu
 */
const BotMonitoringPage: React.FC = () => {
  const { user } = useUser();
  const userId = user?.id || '';
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [stats, setStats] = useState({
    total: 0,
    premium: 0,
    prop: 0,
    user: 0
  });

  // Fetch initial data
  useEffect(() => {
    fetchErrorStats();
  }, []);

  // Function to fetch error statistics
  const fetchErrorStats = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        setStats({
          total: 9,
          premium: 3,
          prop: 2,
          user: 4
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching bot error stats:", error);
      setLoading(false);
    }
  };

  // Function to handle error details view
  const handleViewErrorDetails = (errorId: string) => {
    console.log("Viewing error details for:", errorId);
    setSelectedErrorId(errorId);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  const handleResolveError = (errorId: string) => {
    console.log("Resolving error:", errorId);
    // In a real app, you would make an API call to update the error status
    
    // Reset modal state
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
    
    // Re-fetch stats to update counters
    fetchErrorStats();
  };

  return (
    <MainLayout title="Giám Sát Bot">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Thông Báo Lỗi</h2>
            <p className="text-muted-foreground">
              Theo dõi và quản lý các lỗi của các bot của bạn.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="w-full lg:w-auto" 
            onClick={fetchErrorStats}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới dữ liệu
          </Button>
        </div>

        {/* Error Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng số lỗi</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Tất cả lỗi từ các bot của bạn
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bot Người Dùng</CardTitle>
              <AlertTriangle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.user}</div>
              <p className="text-xs text-muted-foreground">
                Lỗi từ các Bot Người Dùng
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bot Premium</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premium}</div>
              <p className="text-xs text-muted-foreground">
                Lỗi từ các Bot Premium
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bot Prop Trading</CardTitle>
              <AlertTriangle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.prop}</div>
              <p className="text-xs text-muted-foreground">
                Lỗi từ các Bot Prop Trading
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Last updated indicator */}
        <div className="text-sm text-muted-foreground flex items-center justify-end">
          <Clock className="h-3 w-3 mr-1" />
          Cập nhật lần cuối: {new Date().toLocaleTimeString()}
        </div>

        {/* Tabs for different bot types */}
        <Tabs 
          defaultValue="all" 
          className="space-y-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-xl">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="user">Người dùng</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="prop">Prop Trading</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tất cả lỗi Bot</CardTitle>
                <CardDescription>
                  Danh sách tất cả các lỗi từ các bot của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserErrorDisplay 
                  botType={BotType.ALL_BOTS} 
                  userId={userId}
                  onViewDetails={handleViewErrorDetails} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="user" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lỗi Bot Người Dùng</CardTitle>
                <CardDescription>
                  Danh sách các lỗi từ Bot Người Dùng của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserErrorDisplay 
                  botType={BotType.USER_BOT} 
                  userId={userId}
                  onViewDetails={handleViewErrorDetails} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lỗi Bot Premium</CardTitle>
                <CardDescription>
                  Danh sách các lỗi từ Bot Premium của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserErrorDisplay 
                  botType={BotType.PREMIUM_BOT} 
                  userId={userId}
                  onViewDetails={handleViewErrorDetails} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prop" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lỗi Bot Prop Trading</CardTitle>
                <CardDescription>
                  Danh sách các lỗi từ Bot Prop Trading của bạn.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserErrorDisplay 
                  botType={BotType.PROP_BOT} 
                  userId={userId}
                  onViewDetails={handleViewErrorDetails} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Error details modal */}
      <ErrorDetailsModal
        errorId={selectedErrorId}
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        onResolve={handleResolveError}
      />
    </MainLayout>
  );
};

export default BotMonitoringPage;
