
import React, { useMemo } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { AlertTriangle, Server, Shield, LifeBuoy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ErrorCategoryListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

// Helper function to format time
const formatTime = (timestamp?: string) => {
  if (!timestamp) return '';
  
  try {
    return formatDistanceToNow(new Date(timestamp), { 
      addSuffix: true,
      locale: vi
    });
  } catch (err) {
    return timestamp;
  }
};

// Helper function to get severity badge
const getSeverityBadge = (severity?: string) => {
  switch (severity) {
    case 'critical':
      return <Badge className="bg-red-500">Nghiêm trọng</Badge>;
    case 'high':
      return <Badge className="bg-orange-500">Cao</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500">Trung bình</Badge>;
    case 'low':
      return <Badge className="bg-green-500">Thấp</Badge>;
    default:
      return <Badge variant="outline">Không xác định</Badge>;
  }
};

const ErrorCategoryList: React.FC<ErrorCategoryListProps> = ({
  signals,
  onViewDetails
}) => {
  const categories = useMemo(() => {
    // Initialize categories
    const result: {
      [key: string]: {
        icon: React.ReactNode;
        title: string;
        description: string;
        color: string;
        signals: ExtendedSignal[];
      }
    } = {
      authentication: {
        icon: <Shield className="h-6 w-6 text-blue-500" />,
        title: 'Xác thực / Uỷ quyền',
        description: 'Lỗi liên quan đến xác thực API, uỷ quyền và truy cập',
        color: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
        signals: []
      },
      trading: {
        icon: <LifeBuoy className="h-6 w-6 text-green-500" />,
        title: 'Giao dịch',
        description: 'Lỗi liên quan đến quá trình giao dịch, lệnh và thị trường',
        color: 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800',
        signals: []
      },
      integration: {
        icon: <Server className="h-6 w-6 text-purple-500" />,
        title: 'Tích hợp',
        description: 'Lỗi liên quan đến kết nối, webhook và tích hợp với hệ thống bên thứ ba',
        color: 'border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800',
        signals: []
      },
      system: {
        icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
        title: 'Hệ thống',
        description: 'Lỗi hệ thống nội bộ và lỗi khác không thuộc các danh mục khác',
        color: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
        signals: []
      }
    };

    // Categorize signals
    signals.forEach(signal => {
      if (signal.errorMessage?.toLowerCase().includes('auth') || 
          signal.errorCode?.startsWith('AUTH')) {
        result.authentication.signals.push(signal);
      } else if (signal.errorMessage?.toLowerCase().includes('trade') || 
                signal.errorCode?.startsWith('TRADE')) {
        result.trading.signals.push(signal);
      } else if (signal.errorMessage?.toLowerCase().includes('connect') || 
                signal.errorCode?.startsWith('CONN')) {
        result.integration.signals.push(signal);
      } else {
        result.system.signals.push(signal);
      }
    });

    return result;
  }, [signals]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(categories).map(([key, category]) => (
        <Card key={key} className={`${category.color} overflow-hidden`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {category.icon}
                <CardTitle className="ml-2 text-lg">{category.title}</CardTitle>
              </div>
              <Badge variant="outline">{category.signals.length}</Badge>
            </div>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {category.signals.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {category.signals.map(signal => (
                  <div 
                    key={signal.id} 
                    className="p-3 border rounded-md bg-background hover:border-primary transition-colors cursor-pointer"
                    onClick={() => onViewDetails(signal.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium line-clamp-1">
                        {signal.errorMessage || 'Lỗi không xác định'}
                      </h4>
                      {getSeverityBadge(signal.errorSeverity)}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2 flex items-center space-x-2">
                      <span>ID: {signal.id.substring(0, 8)}...</span>
                      <span>•</span>
                      <span>{formatTime(signal.timestamp)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Bot: </span>
                        <span>{signal.botName || signal.botId || 'N/A'}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(signal.id);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Không có lỗi nào trong danh mục này
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ErrorCategoryList;
