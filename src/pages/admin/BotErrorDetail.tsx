
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, AlertTriangle, CheckCircle2, Server, User, Calendar, Clock, Braces, Bookmark, RefreshCw } from 'lucide-react';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { ExtendedSignal } from '@/types/signal';
import { ADMIN_ROUTES } from '@/constants/routes';
import { Badge } from '@/components/ui/badge';

const AdminBotErrorDetail: React.FC = () => {
  const { errorId } = useParams<{ errorId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<ExtendedSignal | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Simulate API call to get error details
    setTimeout(() => {
      const errorSignal = mockErrorSignals.find(e => e.id === errorId);
      setError(errorSignal || null);
      setLoading(false);
    }, 500);
  }, [errorId]);
  
  const handleBack = () => {
    navigate(ADMIN_ROUTES.BOT_ERRORS);
  };
  
  const getSeverityClass = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-52 bg-muted rounded"></div>
          <div className="h-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!error) {
    return (
      <div className="container mx-auto py-8">
        <Button variant="outline" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách lỗi
        </Button>
        
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Không tìm thấy thông tin lỗi</h2>
          <p className="text-muted-foreground">
            Không thể tìm thấy chi tiết cho ID lỗi <code>{errorId}</code>. 
            Lỗi này có thể đã được xử lý hoặc không tồn tại.
          </p>
        </Card>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Chi tiết lỗi {error.id} | Admin</title>
      </Helmet>
      
      <div className="container mx-auto py-8">
        <Button variant="outline" onClick={handleBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách lỗi
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      Chi tiết lỗi #{error.id}
                    </CardTitle>
                    <CardDescription>
                      Thông tin chi tiết về lỗi phát hiện được
                    </CardDescription>
                  </div>
                  <Badge className={getSeverityClass(error.errorSeverity)}>
                    {error.errorSeverity === 'critical' ? 'Nghiêm trọng' : 
                      error.errorSeverity === 'high' ? 'Cao' :
                      error.errorSeverity === 'medium' ? 'Trung bình' : 
                      error.errorSeverity === 'low' ? 'Thấp' : 'Không xác định'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Mô tả lỗi
                  </h3>
                  <p className="p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-red-800 dark:text-red-300">
                    {error.errorMessage || "Không có mô tả chi tiết"}
                  </p>
                </div>
                
                {error.errorCode && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Mã lỗi
                    </h3>
                    <code className="block p-3 rounded bg-zinc-100 dark:bg-zinc-800 text-sm">
                      {error.errorCode}
                    </code>
                  </div>
                )}
                
                {error.instrument && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Instrument / Symbol
                    </h3>
                    <p className="font-mono">
                      {error.instrument}
                    </p>
                  </div>
                )}
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Ngày phát hiện
                    </h3>
                    <p>{new Date(error.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Thời gian
                    </h3>
                    <p>{new Date(error.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                
                {(error.botId || error.botName) && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <Server className="h-3 w-3 mr-1" />
                      Bot liên quan
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ID: {error.botId}</Badge>
                      {error.botName && (
                        <Badge variant="outline">{error.botName}</Badge>
                      )}
                      {error.botType && (
                        <Badge variant="outline" className="capitalize">
                          {error.botType === 'user' ? 'Bot Người Dùng' : 
                           error.botType === 'premium' ? 'Premium Bot' : 
                           error.botType === 'prop' ? 'Prop Trading Bot' : 
                           error.botType}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {error.userId && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Người dùng liên quan
                    </h3>
                    <Badge variant="outline">{error.userId}</Badge>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Kiểm tra lại
                  </Button>
                  <Button variant="default">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Đánh dấu đã xử lý
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Chi tiết kỹ thuật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                    <Braces className="h-3 w-3 mr-1" />
                    Dữ liệu liên quan
                  </h3>
                  <pre className="text-xs p-3 rounded bg-zinc-100 dark:bg-zinc-800 overflow-auto max-h-48">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center">
                    <Bookmark className="h-3 w-3 mr-1" />
                    Hành động được đề xuất
                  </h3>
                  <div className="text-sm p-3 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Kiểm tra kết nối API</li>
                      <li>Xác minh thông tin xác thực</li>
                      <li>Kiểm tra quyền truy cập</li>
                      <li>Kiểm tra giới hạn API rate limit</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBotErrorDetail;
