
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowUp, ArrowDown, RefreshCw, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BotType } from '@/constants/botTypes';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { ExtendedSignal } from '@/types/signal';
import AdminHierarchicalErrorView from '@/components/bots/error-signals/AdminHierarchicalErrorView';
import AdminErrorDisplay from '@/components/bots/error-signals/AdminErrorDisplay';

// Mock admin user ID for admin pages
const ADMIN_USER_ID = 'ADMIN-001';

const BotErrors = () => {
  const [activeTab, setActiveTab] = useState('user-bots');
  const [selectedErrorId, setSelectedErrorId] = useState<string | null>(null);
  const [selectedError, setSelectedError] = useState<ExtendedSignal | null>(null);
  const [relatedErrors, setRelatedErrors] = useState<ExtendedSignal[]>([]);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [errorCount, setErrorCount] = useState({
    user: 0,
    premium: 0,
    prop: 0
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorsByCategory, setErrorsByCategory] = useState<Record<string, number>>({});
  const [errorsBySeverity, setErrorsBySeverity] = useState<Record<string, number>>({});

  // Simulate loading error counts and categorization
  useEffect(() => {
    // Count errors by bot type
    const userErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('user')
    ).length;
    
    const premiumErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('premium')
    ).length;
    
    const propErrors = mockErrorSignals.filter(
      err => err.botType?.toLowerCase().includes('prop')
    ).length;
    
    setErrorCount({
      user: userErrors,
      premium: premiumErrors,
      prop: propErrors
    });

    // Calculate errors by category
    const categoryMap: Record<string, number> = {
      'authentication': 0,
      'trading': 0,
      'integration': 0,
      'system': 0
    };

    // Calculate errors by severity
    const severityMap: Record<string, number> = {
      'critical': 0,
      'high': 0,
      'medium': 0,
      'low': 0
    };

    // Process signals to categorize them (based on error messages and codes)
    mockErrorSignals.forEach(signal => {
      // Categorize by error type
      if (signal.errorMessage?.toLowerCase().includes('auth') || signal.errorCode?.startsWith('AUTH')) {
        categoryMap['authentication']++;
      } else if (signal.errorMessage?.toLowerCase().includes('trade') || signal.errorCode?.startsWith('TRADE')) {
        categoryMap['trading']++;
      } else if (signal.errorMessage?.toLowerCase().includes('connect') || signal.errorCode?.startsWith('CONN')) {
        categoryMap['integration']++;
      } else {
        categoryMap['system']++;
      }

      // Categorize by severity
      if (signal.errorSeverity === 'critical') {
        severityMap['critical']++;
      } else if (signal.errorSeverity === 'high') {
        severityMap['high']++;
      } else if (signal.errorSeverity === 'medium') {
        severityMap['medium']++;
      } else {
        severityMap['low']++;
      }
    });

    setErrorsByCategory(categoryMap);
    setErrorsBySeverity(severityMap);
  }, []);

  // Handle error selection for hierarchical view
  useEffect(() => {
    if (selectedErrorId) {
      const error = mockErrorSignals.find(err => err.id === selectedErrorId);
      if (error) {
        setSelectedError(error);
        
        // Find related errors (same instrument or botId or error pattern)
        const related = mockErrorSignals.filter(
          err => 
            err.id !== selectedErrorId && 
            (err.instrument === error.instrument || 
             err.botId === error.botId ||
             err.errorCode === error.errorCode)
        ).slice(0, 3); // Limit to 3 related errors
        
        setRelatedErrors(related);
      }
    }
  }, [selectedErrorId]);

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
  };

  const botTypeFromTab = (tab: string): BotType => {
    switch (tab) {
      case 'user-bots': return BotType.USER_BOT;
      case 'premium-bots': return BotType.PREMIUM_BOT;
      case 'prop-bots': return BotType.PROP_BOT;
      default: return BotType.USER_BOT;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Quản Lý Lỗi Bot</h1>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Đang làm mới...' : 'Làm mới'}
          </Button>
        </div>

        <Alert variant="destructive" className="bg-red-950/30 border-red-900">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Chú ý</AlertTitle>
          <AlertDescription>
            Những lỗi được hiển thị ở đây cần được xử lý ngay để đảm bảo hệ thống hoạt động ổn định.
          </AlertDescription>
        </Alert>

        {/* Error Statistics Cards */}
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
                <div className={`p-2 rounded-full ${
                  errorCount.user > 0 
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                }`}>
                  {errorCount.user > 0 
                    ? <AlertTriangle className="h-5 w-5" />
                    : <ArrowDown className="h-5 w-5" />
                  }
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
                <div className={`p-2 rounded-full ${
                  errorCount.premium > 0 
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                }`}>
                  {errorCount.premium > 0 
                    ? <AlertTriangle className="h-5 w-5" />
                    : <ArrowDown className="h-5 w-5" />
                  }
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
                <div className={`p-2 rounded-full ${
                  errorCount.prop > 0 
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                }`}>
                  {errorCount.prop > 0 
                    ? <AlertTriangle className="h-5 w-5" />
                    : <ArrowDown className="h-5 w-5" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Classification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-500" />
                Lỗi Theo Loại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Xác thực / Uỷ quyền</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(errorsByCategory['authentication'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsByCategory['authentication']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Giao dịch</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${(errorsByCategory['trading'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsByCategory['trading']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tích hợp</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-yellow-500" 
                        style={{ width: `${(errorsByCategory['integration'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsByCategory['integration']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hệ thống</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${(errorsByCategory['system'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsByCategory['system']}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                Lỗi Theo Mức Độ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">Nghiêm trọng</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-red-600" 
                        style={{ width: `${(errorsBySeverity['critical'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsBySeverity['critical']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Cao</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-orange-600" 
                        style={{ width: `${(errorsBySeverity['high'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsBySeverity['high']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">Trung bình</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-yellow-600" 
                        style={{ width: `${(errorsBySeverity['medium'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsBySeverity['medium']}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600 dark:text-green-400">Thấp</span>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-green-600" 
                        style={{ width: `${(errorsBySeverity['low'] / mockErrorSignals.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{errorsBySeverity['low']}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed error view for selected error */}
        {showDetailedView && selectedError && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  <span className="mr-2">Chi tiết lỗi</span>
                  {selectedError.errorSeverity === 'critical' && 
                    <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">Nghiêm trọng</span>
                  }
                  {selectedError.errorSeverity === 'high' && 
                    <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">Cao</span>
                  }
                </span>
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
              <AdminHierarchicalErrorView 
                signal={selectedError}
                relatedSignals={relatedErrors}
                onViewDetails={handleViewDetails}
              />
            </CardContent>
          </Card>
        )}

        {/* Error listing by bot type */}
        {!showDetailedView && (
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
                <TabsList className="w-full bg-zinc-800/50 mb-6">
                  <TabsTrigger 
                    value="user-bots"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Bot Người Dùng {errorCount.user > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 rounded-full">
                        {errorCount.user}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="premium-bots"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Premium Bots {errorCount.premium > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 rounded-full">
                        {errorCount.premium}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="prop-bots"
                    className="flex-1 data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
                  >
                    Prop Trading Bots {errorCount.prop > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-600 rounded-full">
                        {errorCount.prop}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user-bots" className="mt-0">
                  <AdminErrorDisplay 
                    botType={BotType.USER_BOT}
                    onViewDetails={handleViewDetails}
                  />
                </TabsContent>

                <TabsContent value="premium-bots" className="mt-0">
                  <AdminErrorDisplay 
                    botType={BotType.PREMIUM_BOT}
                    onViewDetails={handleViewDetails}
                  />
                </TabsContent>

                <TabsContent value="prop-bots" className="mt-0">
                  <AdminErrorDisplay 
                    botType={BotType.PROP_BOT}
                    onViewDetails={handleViewDetails}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default BotErrors;
