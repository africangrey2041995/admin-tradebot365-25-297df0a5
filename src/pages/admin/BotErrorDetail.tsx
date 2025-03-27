
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, AlertTriangle, Clock, CheckCircle, Clipboard, ExternalLink, CornerDownRight, Bot, User, Server } from 'lucide-react';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { ADMIN_ROUTES } from '@/constants/routes';
import { Badge } from '@/components/ui/badge';
import SignalStatusBadge from '@/components/bots/signal-logs/SignalStatusBadge';
import NoErrorsState from '@/components/bots/error-signals/NoErrorsState';
import { toast } from 'sonner';
import { ExtendedSignal } from '@/types/signal';
import { Helmet } from 'react-helmet-async';

const BotErrorDetail: React.FC = () => {
  const { errorId } = useParams<{ errorId: string }>();
  const navigate = useNavigate();
  const [errorSignal, setErrorSignal] = useState<ExtendedSignal | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch error details
    setLoading(true);
    setTimeout(() => {
      const signal = mockErrorSignals.find(s => s.id === errorId);
      setErrorSignal(signal || null);
      setLoading(false);
    }, 500);
  }, [errorId]);
  
  const handleGoBack = () => {
    navigate(ADMIN_ROUTES.BOT_ERRORS);
  };
  
  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} đã được sao chép`);
  };
  
  const handleResolveError = () => {
    // In a real app, this would call an API to resolve the error
    toast.success("Lỗi đã được đánh dấu là đã xử lý");
    // Navigate back to the error list after a delay
    setTimeout(() => {
      navigate(ADMIN_ROUTES.BOT_ERRORS);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/4 bg-muted rounded"></div>
          <div className="h-80 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!errorSignal) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="outline" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách lỗi
        </Button>
        <Card>
          <CardContent className="py-10">
            <NoErrorsState />
            <div className="text-center mt-4">
              <p className="text-muted-foreground">Không tìm thấy lỗi với ID: {errorId}</p>
              <Button onClick={handleGoBack} className="mt-4">
                Quay lại danh sách lỗi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Get severity class
  const getSeverityClass = () => {
    switch (errorSignal.errorSeverity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      <Helmet>
        <title>Chi tiết lỗi Bot | Admin</title>
      </Helmet>
    
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách lỗi
          </Button>
          
          <Badge className={`${getSeverityClass()} px-3 py-1`}>
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Mức độ: {errorSignal.errorSeverity || 'Unknown'}
          </Badge>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Lỗi: {errorSignal.id}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2" 
                    onClick={() => handleCopyToClipboard(errorSignal.id, 'ID lỗi')}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="mt-1">
                  Phát hiện lúc: {new Date(errorSignal.timestamp).toLocaleString('vi-VN')}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleResolveError}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Đánh dấu đã xử lý
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="details">Chi tiết lỗi</TabsTrigger>
                <TabsTrigger value="related">Thông tin liên quan</TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                {/* Error Summary */}
                <Card className="border-red-200 bg-red-50/30 dark:border-red-800/30 dark:bg-red-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Mô tả lỗi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-800 dark:text-red-400 font-medium">
                      {errorSignal.errorMessage || 'Không có thông tin mô tả lỗi'}
                    </p>
                    {errorSignal.errorCode && (
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <span className="font-semibold text-muted-foreground">Mã lỗi:</span>
                          <code className="ml-1 px-1 py-0.5 rounded bg-muted">{errorSignal.errorCode}</code>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 ml-1" 
                          onClick={() => handleCopyToClipboard(errorSignal.errorCode || '', 'Mã lỗi')}
                        >
                          <Clipboard className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Error Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Signal Info */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Server className="h-4 w-4 mr-2" />
                        Thông tin tín hiệu
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">ID Tín hiệu</p>
                          <p className="font-medium flex items-center">
                            {errorSignal.id}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 ml-1" 
                              onClick={() => handleCopyToClipboard(errorSignal.id, 'ID tín hiệu')}
                            >
                              <Clipboard className="h-3 w-3" />
                            </Button>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Trạng thái</p>
                          <SignalStatusBadge status={errorSignal.status} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Cặp giao dịch</p>
                          <p className="font-medium">{errorSignal.instrument}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hành động</p>
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            {errorSignal.action}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Số lượng</p>
                          <p className="font-medium">{errorSignal.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loại tài sản</p>
                          <p className="font-medium">{errorSignal.investmentType}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Thời gian xử lý</p>
                        <p className="font-medium">
                          {errorSignal.timestamp ? new Date(errorSignal.timestamp).toLocaleString('vi-VN') : 'N/A'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Bot & User Info */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Bot className="h-4 w-4 mr-2" />
                        Thông tin Bot & User
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loại Bot</p>
                          <Badge 
                            variant="outline" 
                            className={
                              errorSignal.botType === 'premium' 
                                ? 'bg-amber-50 text-amber-800 border-amber-200' 
                                : errorSignal.botType === 'prop'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-green-50 text-green-800 border-green-200'
                            }
                          >
                            {errorSignal.botType === 'premium' 
                              ? 'Premium Bot' 
                              : errorSignal.botType === 'prop'
                                ? 'Prop Trading Bot'
                                : 'Bot Người Dùng'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bot ID</p>
                          <p className="font-medium flex items-center">
                            {errorSignal.botId || 'N/A'}
                            {errorSignal.botId && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 ml-1" 
                                onClick={() => handleCopyToClipboard(errorSignal.botId || '', 'Bot ID')}
                              >
                                <Clipboard className="h-3 w-3" />
                              </Button>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Tên Bot</p>
                        <p className="font-medium">{errorSignal.botName || 'N/A'}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">User ID</p>
                          <p className="font-medium flex items-center">
                            {errorSignal.userId || 'N/A'}
                            {errorSignal.userId && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 ml-1" 
                                onClick={() => handleCopyToClipboard(errorSignal.userId || '', 'User ID')}
                              >
                                <Clipboard className="h-3 w-3" />
                              </Button>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tài khoản giao dịch</p>
                          <p className="font-medium">{errorSignal.tradingAccount || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Sàn giao dịch</p>
                          <p className="font-medium">{errorSignal.exchange || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Trading Account ID</p>
                          <p className="font-medium">{errorSignal.tradingAccountId || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {errorSignal.botId && (
                    <Button variant="outline" size="sm" className="h-9">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Xem chi tiết Bot
                    </Button>
                  )}
                  {errorSignal.userId && (
                    <Button variant="outline" size="sm" className="h-9">
                      <User className="h-4 w-4 mr-2" />
                      Xem chi tiết User
                    </Button>
                  )}
                  {errorSignal.tradingAccountId && (
                    <Button variant="outline" size="sm" className="h-9">
                      <CornerDownRight className="h-4 w-4 mr-2" />
                      Xem tài khoản giao dịch
                    </Button>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="related" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">Các lỗi liên quan</CardTitle>
                    <CardDescription>
                      Các lỗi cùng loại hoặc từ cùng một Bot/User
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground py-10 text-center">
                      Không có lỗi liên quan
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md">Lịch sử xử lý</CardTitle>
                    <CardDescription>
                      Lịch sử các hành động được thực hiện với lỗi này
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l border-muted pl-6 pb-6 space-y-6">
                      <div className="relative">
                        <span className="absolute -left-[25px] rounded-full w-5 h-5 bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="h-3 w-3 text-red-600" />
                        </span>
                        <h3 className="text-sm font-medium">Lỗi được phát hiện</h3>
                        <time className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(errorSignal.timestamp).toLocaleString('vi-VN')}
                        </time>
                      </div>
                      
                      {/* Empty state when no history */}
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">Chưa có hành động nào được thực hiện</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
              </span>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button variant="destructive" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Báo cáo sự cố
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default BotErrorDetail;
