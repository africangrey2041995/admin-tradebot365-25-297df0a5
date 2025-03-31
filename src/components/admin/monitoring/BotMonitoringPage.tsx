
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/hooks/use-admin';
import { useToast } from '@/hooks/use-toast';
import { ActivitySquare, AlertTriangle, RefreshCw, Shield, UserCircle } from 'lucide-react';
import { BotType } from '@/types/index';
import AdminErrorDisplay from '@/components/bots/error-signals/AdminErrorDisplay';
import ErrorDetailsModal from './ErrorDetailsModal';

/**
 * Component hiển thị trang giám sát Bot trong admin dashboard
 * Trang này hiển thị tình trạng lỗi của tất cả các loại bot
 */
const AdminBotMonitoringPage: React.FC = () => {
  const { isSuperAdmin } = useAdmin();
  const { toast } = useToast();
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

  console.log("[AdminBotMonitoringPage] Component rendered, isSuperAdmin:", isSuperAdmin);

  // Fetch initial data
  useEffect(() => {
    console.log("[AdminBotMonitoringPage] useEffect triggered, fetching error stats");
    fetchErrorStats();
  }, []);

  // Function to fetch error statistics
  const fetchErrorStats = async () => {
    console.log("[AdminBotMonitoringPage] Fetching error stats...");
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      setTimeout(() => {
        console.log("[AdminBotMonitoringPage] Setting mock stats data");
        setStats({
          total: 42,
          premium: 15,
          prop: 18,
          user: 9
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("[AdminBotMonitoringPage] Error fetching bot error stats:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu thống kê lỗi bot",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Function to handle error details view
  const handleViewErrorDetails = (errorId: string) => {
    console.log("[AdminBotMonitoringPage] Viewing error details for:", errorId);
    setSelectedErrorId(errorId);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  const handleResolveError = (errorId: string) => {
    console.log("[AdminBotMonitoringPage] Resolving error:", errorId);
    toast({
      title: "Đã xử lý lỗi",
      description: `Lỗi ${errorId.substring(0, 8)}... đã được đánh dấu là đã xử lý`,
    });
    
    // In a real app, you would make an API call to update the error status
    
    // Reset modal state
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
    
    // Re-fetch stats to update counters
    fetchErrorStats();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Giám Sát Bot - Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Theo dõi và quản lý các lỗi của tất cả các loại bot trong hệ thống.
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
            <ActivitySquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Tất cả lỗi từ tất cả các bot
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bot Premium</CardTitle>
            <Shield className="h-4 w-4 text-amber-500" />
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
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bot Người Dùng</CardTitle>
            <UserCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.user}</div>
            <p className="text-xs text-muted-foreground">
              Lỗi từ các Bot Người Dùng
            </p>
          </CardContent>
        </Card>
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
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="prop">Prop Trading</TabsTrigger>
          <TabsTrigger value="user">Người dùng</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tất cả lỗi Bot</CardTitle>
              <CardDescription>
                Danh sách tất cả các lỗi từ mọi loại Bot trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminErrorDisplay 
                botType={BotType.ALL_BOTS} 
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
                Danh sách các lỗi từ Bot Premium trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminErrorDisplay 
                botType={BotType.PREMIUM_BOT} 
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
                Danh sách các lỗi từ Bot Prop Trading trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminErrorDisplay 
                botType={BotType.PROP_BOT} 
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
                Danh sách các lỗi từ Bot Người Dùng trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminErrorDisplay 
                botType={BotType.USER_BOT} 
                onViewDetails={handleViewErrorDetails} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Error details modal */}
      <ErrorDetailsModal
        errorId={selectedErrorId}
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        onResolve={handleResolveError}
      />
    </div>
  );
};

export default AdminBotMonitoringPage;
