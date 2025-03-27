
import React, { useState } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, ChevronDown, ChevronRight, Code, Database, ExternalLink, RefreshCw, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';

interface PremiumBotErrorViewProps {
  signal: ExtendedSignal;
  relatedSignals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const PremiumBotErrorView: React.FC<PremiumBotErrorViewProps> = ({
  signal,
  relatedSignals,
  onViewDetails
}) => {
  const { navigateToUserDetail } = useNavigation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'error-details': true,
    'affected-users': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  const handleUserClick = (userId: string) => {
    if (!userId) {
      toast.error("Không có ID người dùng để xem chi tiết");
      return;
    }
    navigateToUserDetail(userId);
  };

  const mockAffectedUsers = [
    {
      id: 'USR-001',
      name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      accountId: 'ACC-001',
      cspAccountId: 'CSP-ACC-001',
      accountName: 'Binance Futures',
      accountType: 'Futures',
      exchange: 'Binance'
    },
    {
      id: 'USR-002',
      name: 'Tran Thi B',
      email: 'tranthib@example.com',
      accountId: 'ACC-002',
      cspAccountId: 'CSP-ACC-002',
      accountName: 'Bybit Spot',
      accountType: 'Spot',
      exchange: 'Bybit'
    }
  ];

  return (
    <div className="space-y-4">
      <div className={`p-4 border-2 rounded-lg ${getSeverityColor(signal.errorSeverity)} bg-amber-50 dark:bg-amber-950/20`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {getSeverityIcon(signal.errorSeverity)}
            <div>
              <h3 className="text-lg font-semibold mb-1">{signal.errorMessage || 'Lỗi không xác định'}</h3>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <span>ID: {signal.id}</span>
                <span>•</span>
                <span>{formatTime(signal.timestamp)}</span>
                <span>•</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
                  Premium Bot
                </Badge>
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

      <Collapsible
        open={expandedSections['error-details']}
        onOpenChange={() => toggleSection('error-details')}
        className="border-2 border-amber-200 dark:border-amber-800/30 rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto bg-amber-50/50 dark:bg-amber-950/10"
          >
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
              <span className="font-medium">Chi tiết lỗi Premium Bot</span>
            </div>
            {expandedSections['error-details'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 bg-amber-50/30 dark:bg-amber-950/5">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-4 bg-amber-100 dark:bg-amber-900/20">
              <TabsTrigger value="general" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Thông tin chung</TabsTrigger>
              <TabsTrigger value="technical" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">Thông tin kỹ thuật</TabsTrigger>
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
                          <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300">
                            {signal.instrument}
                          </Badge>
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
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Thông tin Premium Bot</h4>
                  <dl className="space-y-3">
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Bot ID:</dt>
                      <dd className="col-span-7 text-sm font-medium text-amber-600 dark:text-amber-400 truncate hover:underline cursor-pointer" title={signal.botId || 'N/A'}>
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
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
                          Premium Bot
                        </Badge>
                      </dd>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <dt className="col-span-5 text-sm text-muted-foreground">Số người dùng:</dt>
                      <dd className="col-span-7 text-sm font-medium">{mockAffectedUsers.length}</dd>
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
                    {signal.errorCode || 'ERR_PREMIUM_UNKNOWN'}
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
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={expandedSections['affected-users']}
        onOpenChange={() => toggleSection('affected-users')}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Người dùng bị ảnh hưởng</span>
              <Badge variant="secondary" className="ml-2">{mockAffectedUsers.length}</Badge>
            </div>
            {expandedSections['affected-users'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="space-y-4">
            {mockAffectedUsers.map((user) => (
              <div key={user.id} className="border-l-2 border-l-amber-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-amber-500 mr-2" />
                      <Button 
                        variant="link" 
                        className="p-0 h-auto font-medium text-amber-600 dark:text-amber-400 flex items-center"
                        onClick={() => handleUserClick(user.id)}
                      >
                        {user.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{user.email}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <span className="mr-1">{user.id}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mt-2">
                  <div className="flex items-center mb-2">
                    <Database className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium">{user.accountName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Trading Account ID:</span>
                      <span className="ml-2 font-medium">{user.accountId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">CSP Account ID:</span>
                      <span className="ml-2 font-medium">{user.cspAccountId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="ml-2 font-medium">{user.accountType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sàn:</span>
                      <span className="ml-2 font-medium">{user.exchange}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" size="sm" className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-1" />
          Thử lại
        </Button>
        <Button size="sm" className="bg-amber-500 hover:bg-amber-600">Khắc phục</Button>
      </div>
    </div>
  );
};

export default PremiumBotErrorView;
