
import React, { useState } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, ChevronDown, ChevronRight, Code, Database, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface UserBotErrorViewProps {
  signal: ExtendedSignal;
  relatedSignals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const UserBotErrorView: React.FC<UserBotErrorViewProps> = ({
  signal,
  relatedSignals,
  onViewDetails
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'error-details': true,
    'account-info': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get severity color
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500 border-red-500';
      case 'high':
        return 'text-orange-500 border-orange-500';
      case 'medium':
        return 'text-yellow-500 border-yellow-500';
      case 'low':
        return 'text-green-500 border-green-500';
      default:
        return 'text-gray-500 border-gray-500';
    }
  };

  // Get severity icon
  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Format timestamp
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'Không có thời gian';
    
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true,
        locale: vi
      });
    } catch (err) {
      return timestamp;
    }
  };

  return (
    <div className="space-y-4">
      {/* Main error information */}
      <div className={`p-4 border rounded-lg ${getSeverityColor(signal.errorSeverity)}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {getSeverityIcon(signal.errorSeverity)}
            <div>
              <h3 className="text-lg font-semibold mb-1">{signal.errorMessage || 'Lỗi không xác định'}</h3>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span>ID: {signal.id}</span>
                <span>•</span>
                <span>{formatTime(signal.timestamp)}</span>
                {signal.botName && (
                  <>
                    <span>•</span>
                    <span>Bot: {signal.botName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={getSeverityColor(signal.errorSeverity)}>
            {signal.errorSeverity === 'critical' && 'Nghiêm trọng'}
            {signal.errorSeverity === 'high' && 'Cao'}
            {signal.errorSeverity === 'medium' && 'Trung bình'}
            {signal.errorSeverity === 'low' && 'Thấp'}
            {!signal.errorSeverity && 'Không xác định'}
          </Badge>
        </div>
      </div>

      {/* Error details section */}
      <Collapsible
        open={expandedSections['error-details']}
        onOpenChange={() => toggleSection('error-details')}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              <span className="font-medium">Chi tiết lỗi</span>
            </div>
            {expandedSections['error-details'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="general" className="flex-1">Thông tin chung</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1">Thông tin kỹ thuật</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Thông tin giao dịch</h4>
                  <dl className="space-y-3">
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Cặp giao dịch:</dt>
                      <dd className="col-span-7 text-sm font-medium">
                        {signal.instrument ? (
                          <Badge variant="outline">{signal.instrument}</Badge>
                        ) : (
                          <span className="text-muted-foreground italic">N/A</span>
                        )}
                      </dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Hành động:</dt>
                      <dd className="col-span-7 text-sm font-medium">
                        {signal.action ? (
                          <Badge variant={signal.action.toLowerCase().includes('long') ? 'success' : 'destructive'} className="capitalize">
                            {signal.action}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground italic">N/A</span>
                        )}
                      </dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Số lượng:</dt>
                      <dd className="col-span-7 text-sm font-medium">{signal.amount || 'N/A'}</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Thời gian:</dt>
                      <dd className="col-span-7 text-sm font-medium">{formatTime(signal.timestamp)}</dd>
                    </div>
                  </dl>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Thông tin bot người dùng</h4>
                  <dl className="space-y-3">
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Bot ID:</dt>
                      <dd className="col-span-7 text-sm font-medium text-blue-600 dark:text-blue-400 truncate hover:underline cursor-pointer" title={signal.botId || 'N/A'}>
                        {signal.botId || 'N/A'}
                      </dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Tên Bot:</dt>
                      <dd className="col-span-7 text-sm font-medium">{signal.botName || 'N/A'}</dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Loại Bot:</dt>
                      <dd className="col-span-7 text-sm font-medium">
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                          User Bot
                        </Badge>
                      </dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">User ID:</dt>
                      <dd className="col-span-7 text-sm font-medium text-blue-600 dark:text-blue-400 truncate hover:underline cursor-pointer" title={signal.userId || 'N/A'}>
                        {signal.userId || 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="technical">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Chi tiết lỗi</h4>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border text-sm font-mono overflow-x-auto">
                    {signal.errorMessage || 'Không có thông tin lỗi chi tiết.'}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Mã lỗi</h4>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border text-sm font-mono">
                    {signal.errorCode || 'ERR_UNKNOWN'}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">ID Liên kết</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Signal ID:</span>
                      <span className="text-sm font-medium">{signal.id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coinstrat Log ID:</span>
                      <span className="text-sm font-medium">{signal.coinstratLogId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trading Account ID:</span>
                      <span className="text-sm font-medium">{signal.tradingAccountId || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>

      {/* Account information section */}
      <Collapsible
        open={expandedSections['account-info']}
        onOpenChange={() => toggleSection('account-info')}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              <span className="font-medium">Thông tin tài khoản</span>
            </div>
            {expandedSections['account-info'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border">
              <div className="flex items-center mb-3">
                <Database className="h-5 w-5 text-blue-500 mr-2" />
                <h4 className="font-medium">Tài khoản giao dịch</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ID Tài khoản:</span>
                  <span className="font-medium">{signal.tradingAccountId || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tên tài khoản:</span>
                  <span className="font-medium">{signal.tradingAccount || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loại tài khoản:</span>
                  <span className="font-medium">{signal.tradingAccountType || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Số dư:</span>
                  <span className="font-medium">{signal.tradingAccountBalance || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sàn giao dịch:</span>
                  <span className="font-medium">{signal.exchange || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" size="sm" className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-1" />
          Thử lại
        </Button>
        <Button size="sm">Khắc phục</Button>
      </div>
    </div>
  );
};

export default UserBotErrorView;
