
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Filter, Search, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useToast } from '@/hooks/use-toast';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import HierarchicalErrorView from '@/components/bots/error-signals/HierarchicalErrorView';
import ErrorSignalsTable from '@/components/bots/error-signals/ErrorSignalsTable';

const BotErrors = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [botTypeFilter, setBotTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [errorSignals, setErrorSignals] = useState(mockErrorSignals);
  const [unreadErrors] = useState(new Set(mockErrorSignals.map(signal => signal.id)));

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    toast({
      title: "Đang làm mới dữ liệu",
      description: "Dữ liệu đang được cập nhật từ hệ thống",
    });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đã làm mới dữ liệu",
        description: "Dữ liệu lỗi đã được cập nhật",
      });
    }, 1000);
  };

  // Filter signals based on search query and bot type
  const filteredSignals = errorSignals.filter(signal => {
    const matchesSearch = 
      searchQuery === "" || 
      signal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.errorMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.botId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.userId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBotType = 
      botTypeFilter === "all" || 
      signal.botType?.toLowerCase().includes(botTypeFilter.toLowerCase());

    return matchesSearch && matchesBotType;
  });

  // Filter signals based on active tab
  const getTabFilteredSignals = () => {
    switch (activeTab) {
      case "critical":
        return filteredSignals.filter(signal => signal.errorSeverity === 'critical');
      case "high":
        return filteredSignals.filter(signal => signal.errorSeverity === 'high');
      case "medium":
        return filteredSignals.filter(signal => signal.errorSeverity === 'medium');
      case "low":
        return filteredSignals.filter(signal => signal.errorSeverity === 'low');
      case "all":
      default:
        return filteredSignals;
    }
  };

  const tabFilteredSignals = getTabFilteredSignals();

  // Mark signal as read
  const handleMarkAsRead = (signalId: string) => {
    toast({
      title: "Đã đánh dấu đã đọc",
      description: `Lỗi ${signalId} đã được đánh dấu là đã đọc`,
    });
  };

  // View error details
  const handleViewDetails = (signalId: string) => {
    toast({
      title: "Xem chi tiết lỗi",
      description: `Đang mở chi tiết lỗi ${signalId}`,
    });
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Quản lý lỗi Bot
              </CardTitle>
              <CardDescription>
                Theo dõi và quản lý tất cả lỗi từ các bot trong hệ thống
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Làm mới
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Search and filter section */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-auto flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo ID, Bot, User, Lỗi..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={botTypeFilter} onValueChange={setBotTypeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Loại Bot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả Bot</SelectItem>
                        <SelectItem value="user">Bot Người Dùng</SelectItem>
                        <SelectItem value="premium">Premium Bot</SelectItem>
                        <SelectItem value="prop">Prop Bot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Tabs for different error severity levels */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="all">
                    Tất cả ({filteredSignals.length})
                  </TabsTrigger>
                  <TabsTrigger value="critical" className="text-red-500">
                    Nghiêm trọng ({filteredSignals.filter(s => s.errorSeverity === 'critical').length})
                  </TabsTrigger>
                  <TabsTrigger value="high" className="text-orange-500">
                    Cao ({filteredSignals.filter(s => s.errorSeverity === 'high').length})
                  </TabsTrigger>
                  <TabsTrigger value="medium" className="text-yellow-500">
                    Trung bình ({filteredSignals.filter(s => s.errorSeverity === 'medium').length})
                  </TabsTrigger>
                  <TabsTrigger value="low" className="text-green-500">
                    Thấp ({filteredSignals.filter(s => s.errorSeverity === 'low').length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {tabFilteredSignals.length > 0 ? (
                    <>
                      <div className="space-y-6">
                        {tabFilteredSignals.slice(0, 5).map(signal => (
                          <HierarchicalErrorView 
                            key={signal.id} 
                            signal={signal} 
                            onViewDetails={handleViewDetails}
                            relatedSignals={tabFilteredSignals.filter(s => 
                              s.botId === signal.botId && s.id !== signal.id
                            ).slice(0, 2)}
                          />
                        ))}
                      </div>
                      <ErrorSignalsTable 
                        errorSignals={tabFilteredSignals} 
                        unreadErrors={unreadErrors}
                        onMarkAsRead={handleMarkAsRead}
                        loading={isLoading}
                        onRefresh={handleRefresh}
                      />
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="mx-auto bg-muted rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Không tìm thấy lỗi nào</h3>
                      <p className="text-muted-foreground mt-2 mb-6">
                        Không có lỗi nào khớp với bộ lọc hiện tại
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSearchQuery("");
                        setBotTypeFilter("all");
                        setActiveTab("all");
                      }}>
                        Xóa bộ lọc
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Duplicate the content for other tabs */}
                <TabsContent value="critical" className="space-y-4">
                  {/* Same UI structure as "all" tab but with filtered data */}
                  {tabFilteredSignals.length > 0 ? (
                    <>
                      <div className="space-y-6">
                        {tabFilteredSignals.slice(0, 5).map(signal => (
                          <HierarchicalErrorView 
                            key={signal.id} 
                            signal={signal} 
                            onViewDetails={handleViewDetails}
                            relatedSignals={tabFilteredSignals.filter(s => 
                              s.botId === signal.botId && s.id !== signal.id
                            ).slice(0, 2)}
                          />
                        ))}
                      </div>
                      <ErrorSignalsTable 
                        errorSignals={tabFilteredSignals} 
                        unreadErrors={unreadErrors}
                        onMarkAsRead={handleMarkAsRead}
                        loading={isLoading}
                        onRefresh={handleRefresh}
                      />
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="mx-auto bg-muted rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">Không tìm thấy lỗi nghiêm trọng nào</h3>
                      <p className="text-muted-foreground mt-2">
                        Không có lỗi nghiêm trọng nào khớp với bộ lọc hiện tại
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Create similar content for other tabs (high, medium, low) */}
                <TabsContent value="high" className="space-y-4">
                  {/* Same UI structure */}
                  {tabFilteredSignals.length > 0 ? (
                    <ErrorSignalsTable 
                      errorSignals={tabFilteredSignals} 
                      unreadErrors={unreadErrors}
                      onMarkAsRead={handleMarkAsRead}
                      loading={isLoading}
                      onRefresh={handleRefresh}
                    />
                  ) : (
                    <div className="text-center py-20">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Không tìm thấy lỗi mức cao nào</h3>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="medium" className="space-y-4">
                  {/* Same UI structure */}
                  {tabFilteredSignals.length > 0 ? (
                    <ErrorSignalsTable 
                      errorSignals={tabFilteredSignals} 
                      unreadErrors={unreadErrors}
                      onMarkAsRead={handleMarkAsRead}
                      loading={isLoading}
                      onRefresh={handleRefresh}
                    />
                  ) : (
                    <div className="text-center py-20">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Không tìm thấy lỗi mức trung bình nào</h3>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="low" className="space-y-4">
                  {/* Same UI structure */}
                  {tabFilteredSignals.length > 0 ? (
                    <ErrorSignalsTable 
                      errorSignals={tabFilteredSignals} 
                      unreadErrors={unreadErrors}
                      onMarkAsRead={handleMarkAsRead}
                      loading={isLoading}
                      onRefresh={handleRefresh}
                    />
                  ) : (
                    <div className="text-center py-20">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Không tìm thấy lỗi mức thấp nào</h3>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default BotErrors;
