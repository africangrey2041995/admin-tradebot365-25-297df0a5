
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Search, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { useToast } from '@/hooks/use-toast';
import ErrorSignals from '@/components/bots/ErrorSignals';
import HierarchicalErrorView from '@/components/bots/error-signals/HierarchicalErrorView';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { BotType } from '@/constants/botTypes';
import { useNavigation } from '@/hooks/useNavigation';

const BotErrors = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const { navigateToBotDetail } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [botTypeFilter, setBotTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [userErrorSignals, setUserErrorSignals] = useState([]);

  // Filter user-specific signals
  useEffect(() => {
    if (user) {
      const userId = user.id;
      // Filter mock signals to only show user's signals
      // In a real implementation, this would be an API call
      const filteredSignals = mockErrorSignals.filter(signal => 
        signal.userId === userId || 
        signal.userId?.includes(userId)
      );
      setUserErrorSignals(filteredSignals);
    }
  }, [user]);

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

  // Filter signals based on search and bot type
  const filteredSignals = userErrorSignals.filter(signal => {
    const matchesSearch = 
      searchQuery === "" || 
      signal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.errorMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signal.botId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBotType = 
      botTypeFilter === "all" || 
      signal.botType?.toLowerCase().includes(botTypeFilter.toLowerCase());

    return matchesSearch && matchesBotType;
  });

  // Navigate to bot detail
  const handleViewBotDetail = (botId) => {
    if (botId) {
      navigateToBotDetail(botId);
    } else {
      toast({
        title: "Không thể điều hướng",
        description: "ID Bot không hợp lệ.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout title="Quản lý lỗi Bot">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Lỗi Bot
              </CardTitle>
              <CardDescription>
                Xem và quản lý các lỗi liên quan đến bot của bạn
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
                    placeholder="Tìm kiếm theo ID, Bot, Lỗi..."
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
                        <SelectItem value="user">Bot của tôi</SelectItem>
                        <SelectItem value="premium">Premium Bot</SelectItem>
                        <SelectItem value="prop">Prop Trading Bot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Error signals section */}
              {filteredSignals.length > 0 ? (
                <div className="space-y-6">
                  {/* Show the most recent errors in hierarchical view */}
                  {filteredSignals.slice(0, 3).map(signal => (
                    <HierarchicalErrorView 
                      key={signal.id} 
                      signal={signal} 
                      onViewDetails={() => handleViewBotDetail(signal.botId)}
                      relatedSignals={filteredSignals.filter(s => 
                        s.botId === signal.botId && s.id !== signal.id
                      ).slice(0, 2)}
                    />
                  ))}
                  
                  {/* Show full table */}
                  <ErrorSignals 
                    userId={user?.id}
                    limit={50}
                  />
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="mx-auto bg-muted rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Không tìm thấy lỗi nào</h3>
                  <p className="text-muted-foreground mt-2 mb-6">
                    {botTypeFilter !== "all" 
                      ? `Không có lỗi nào cho loại bot "${botTypeFilter}"` 
                      : "Hiện không có bot nào của bạn gặp lỗi"}
                  </p>
                  {botTypeFilter !== "all" && (
                    <Button variant="outline" onClick={() => setBotTypeFilter("all")}>
                      Xem tất cả loại bot
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bot-specific error sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Bots Errors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bot Người Dùng</CardTitle>
              <CardDescription>Lỗi trong các bot do bạn tạo</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorSignals 
                userId={user?.id}
                botType={BotType.USER_BOT}
                limit={5}
              />
            </CardContent>
          </Card>

          {/* Premium Bots Errors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Premium Bots</CardTitle>
              <CardDescription>Lỗi trong các premium bot bạn sử dụng</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorSignals 
                userId={user?.id}
                botType={BotType.PREMIUM_BOT}
                limit={5}
              />
            </CardContent>
          </Card>

          {/* Prop Trading Bots Errors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prop Trading Bots</CardTitle>
              <CardDescription>Lỗi trong các prop trading bot</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorSignals 
                userId={user?.id}
                botType={BotType.PROP_BOT}
                limit={5}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BotErrors;
