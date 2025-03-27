
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ErrorSignals from '@/components/bots/ErrorSignals';
import { useUser } from '@clerk/clerk-react';
import { BotType } from '@/constants/botTypes';
import { Button } from '@/components/ui/button';
import HierarchicalErrorView from '@/components/bots/error-signals/HierarchicalErrorView';
import ErrorPatternAnalytics from '@/components/bots/error-signals/ErrorPatternAnalytics';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { ExtendedSignal } from '@/types/signal';
import ErrorFilterBar from '@/components/bots/error-signals/ErrorFilterBar';

const BotErrors = () => {
  const [activeTab, setActiveTab] = useState('user-bots');
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);
  const [selectedError, setSelectedError] = useState<ExtendedSignal | null>(null);
  const [relatedErrors, setRelatedErrors] = useState<ExtendedSignal[]>([]);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { user } = useUser();
  const userId = user?.id || '';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorCount, setErrorCount] = useState({
    user: 0,
    premium: 0,
    prop: 0
  });
  
  const [filters, setFilters] = useState({
    severity: 'all',
    category: 'all',
    timeRange: 'week'
  });
  
  const [filteredErrors, setFilteredErrors] = useState<ExtendedSignal[]>([]);

  // Simulate loading error counts
  useEffect(() => {
    const userErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('user') && err.userId === userId
    ).length;
    
    const premiumErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('premium') && err.userId === userId
    ).length;
    
    const propErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('prop') && err.userId === userId
    ).length;
    
    setErrorCount({
      user: userErrors,
      premium: premiumErrors,
      prop: propErrors
    });
    
    // Set initial filtered errors
    setFilteredErrors(mockErrorSignals.filter(err => err.userId === userId));
  }, [userId]);

  // Handle error selection for hierarchical view
  useEffect(() => {
    if (selectedErrorId) {
      const error = mockErrorSignals.find(err => err.id === selectedErrorId);
      if (error) {
        setSelectedError(error);
        
        // Find related errors (same instrument or botId)
        const related = mockErrorSignals.filter(
          err => 
            err.id !== selectedErrorId && 
            (err.instrument === error.instrument || err.botId === error.botId) &&
            err.userId === userId
        ).slice(0, 3); // Limit to 3 related errors
        
        setRelatedErrors(related);
      }
    }
  }, [selectedErrorId, userId]);
  
  // Handle filters change
  useEffect(() => {
    let filtered = mockErrorSignals.filter(err => err.userId === userId);
    
    // Filter by severity
    if (filters.severity !== 'all') {
      filtered = filtered.filter(err => err.errorSeverity === filters.severity);
    }
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(err => {
        const errorMsg = err.errorMessage?.toLowerCase() || '';
        
        switch (filters.category) {
          case 'AUTH':
            return errorMsg.includes('auth') || errorMsg.includes('token') || errorMsg.includes('permission');
          case 'TRADING':
            return errorMsg.includes('trade') || errorMsg.includes('order') || errorMsg.includes('position');
          case 'INTEGRATION':
            return errorMsg.includes('api') || errorMsg.includes('webhook') || errorMsg.includes('format');
          case 'SYSTEM':
            return errorMsg.includes('system') || errorMsg.includes('internal') || errorMsg.includes('crash');
          case 'TIME':
            return errorMsg.includes('time') || errorMsg.includes('timeout');
          case 'CONN':
            return errorMsg.includes('connect') || errorMsg.includes('network');
          default:
            return true;
        }
      });
    }
    
    setFilteredErrors(filtered);
  }, [filters, userId]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleViewDetails = (errorId: string) => {
    setSelectedErrorId(errorId);
    setShowDetailedView(true);
    setShowAnalytics(false);
  };
  
  const handleToggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    if (showDetailedView) {
      setShowDetailedView(false);
    }
  };

  return (
    <MainLayout title="Quản Lý Lỗi Bot">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Quản Lý Lỗi Bot</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant={showAnalytics ? "default" : "outline"} 
                onClick={handleToggleAnalytics}
              >
                {showAnalytics ? "Ẩn phân tích" : "Phân tích lỗi"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>

          <Alert variant="destructive" className="bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Chú ý</AlertTitle>
            <AlertDescription>
              Những lỗi được hiển thị ở đây cần được xử lý ngay để đảm bảo hệ thống của bạn hoạt động ổn định.
            </AlertDescription>
          </Alert>

          {/* Error filtering */}
          <ErrorFilterBar 
            onFilterChange={setFilters} 
            currentFilters={filters}
            errorCount={filteredErrors.length}
          />

          {/* Error Analytics Dashboard */}
          {showAnalytics && (
            <ErrorPatternAnalytics 
              errors={filteredErrors} 
              timeRange={filters.timeRange as 'day' | 'week' | 'month'} 
              loading={isRefreshing}
            />
          )}

          {/* Error Statistics Cards */}
          {!showAnalytics && !showDetailedView && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={errorCount.user > 0 ? "border-red-400 dark:border-red-700" : ""}>
                <CardContent className="pt-6 px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Bot Người Dùng
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {errorCount.user} Lỗi
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={errorCount.premium > 0 ? "border-red-400 dark:border-red-700" : ""}>
                <CardContent className="pt-6 px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Premium Bots
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {errorCount.premium} Lỗi
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={errorCount.prop > 0 ? "border-red-400 dark:border-red-700" : ""}>
                <CardContent className="pt-6 px-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Prop Trading Bots
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {errorCount.prop} Lỗi
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Detailed error view for selected error */}
          {showDetailedView && selectedError && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span>Chi tiết lỗi</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowDetailedView(false)}
                  >
                    Quay lại danh sách
                  </Button>
                </CardTitle>
                <CardDescription>
                  Thông tin chi tiết về lỗi và tác động đến tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HierarchicalErrorView 
                  signal={selectedError}
                  relatedSignals={relatedErrors}
                  onViewDetails={handleViewDetails}
                />
              </CardContent>
            </Card>
          )}

          {/* Error listing by bot type */}
          {!showDetailedView && !showAnalytics && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Lỗi Kết Nối Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="user-bots"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="user-bots" className="flex-1">
                      Bot Người Dùng {errorCount.user > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">
                          {errorCount.user}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="premium-bots" className="flex-1">
                      Premium Bots {errorCount.premium > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">
                          {errorCount.premium}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="prop-bots" className="flex-1">
                      Prop Trading Bots {errorCount.prop > 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 text-white rounded-full">
                          {errorCount.prop}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="user-bots" className="mt-0">
                    <ErrorSignals botType={BotType.USER_BOT} userId={userId} />
                  </TabsContent>

                  <TabsContent value="premium-bots" className="mt-0">
                    <ErrorSignals botType={BotType.PREMIUM_BOT} userId={userId} />
                  </TabsContent>

                  <TabsContent value="prop-bots" className="mt-0">
                    <ErrorSignals botType={BotType.PROP_BOT} userId={userId} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default BotErrors;
