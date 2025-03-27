
import React, { useState } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, ChevronDown, ChevronRight, Code, Database, ExternalLink, RefreshCw, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';

interface PropTradingBotErrorViewProps {
  signal: ExtendedSignal;
  relatedSignals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const PropTradingBotErrorView: React.FC<PropTradingBotErrorViewProps> = ({
  signal,
  relatedSignals,
  onViewDetails
}) => {
  const { navigateToUserDetail } = useNavigation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'error-details': true,
    'affected-accounts': false
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

  // Mock affected accounts
  const mockAffectedAccounts = [
    {
      userId: 'USR-001',
      userName: 'Nguyen Van A',
      accountId: 'ACC-001',
      cspAccountId: 'CSP-ACC-001',
      accountName: 'FTMO Challenge $100K',
      accountType: 'Prop Trading',
      phase: 'Challenge Phase 2',
      balance: '$98,500',
      tradingAccountNumber: 'TA-12345'
    },
    {
      userId: 'USR-002',
      userName: 'Tran Thi B',
      accountId: 'ACC-002',
      cspAccountId: 'CSP-ACC-002',
      accountName: 'FTMO Verified $50K',
      accountType: 'Prop Trading',
      phase: 'Verified',
      balance: '$51,200',
      tradingAccountNumber: 'TA-67890'
    },
    {
      userId: 'USR-003',
      userName: 'Le Van C',
      accountId: 'ACC-003',
      cspAccountId: 'CSP-ACC-003',
      accountName: 'MyForexFunds Evaluation $200K',
      accountType: 'Prop Trading',
      phase: 'Evaluation',
      balance: '$195,000',
      tradingAccountNumber: 'TA-54321'
    }
  ];

  return (
    <div className="space-y-4">
      <div className={`p-4 border-2 rounded-lg ${getSeverityColor(signal.errorSeverity)} bg-blue-50 dark:bg-blue-950/20`}>
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
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
                  Prop Trading Bot
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
        className="border-2 border-blue-200 dark:border-blue-800/30 rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto bg-blue-50/50 dark:bg-blue-950/10"
          >
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">Chi tiết lỗi Prop Trading Bot</span>
            </div>
            {expandedSections['error-details'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 bg-blue-50/30 dark:bg-blue-950/5">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-4 bg-blue-100 dark:bg-blue-900/20">
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
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-blue-300">
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
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Thông tin Prop Trading Bot</h4>
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
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200">
                          Prop Trading Bot
                        </Badge>
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
                    {signal.errorCode || 'ERR_PROP_UNKNOWN'}
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
        open={expandedSections['affected-accounts']}
        onOpenChange={() => toggleSection('affected-accounts')}
        className="border rounded-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              <span className="font-medium">Tài khoản bị ảnh hưởng</span>
              <Badge variant="secondary" className="ml-2">{mockAffectedAccounts.length}</Badge>
            </div>
            {expandedSections['affected-accounts'] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="space-y-4">
            {mockAffectedAccounts.map((account) => (
              <div key={account.accountId} className="border-l-2 border-l-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <Database className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">{account.accountName}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs text-blue-600 dark:text-blue-400 flex items-center"
                        onClick={() => handleUserClick(account.userId)}
                      >
                        {account.userName}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => handleUserClick(account.userId)}
                  >
                    <span className="mr-1">{account.userId}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md mt-2">
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div>
                      <span className="text-muted-foreground">Trading Account ID:</span>
                      <span className="ml-2 font-medium">{account.accountId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">CSP Account ID:</span>
                      <span className="ml-2 font-medium">{account.cspAccountId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Trading Acc Number:</span>
                      <span className="ml-2 font-medium">{account.tradingAccountNumber}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <span className="ml-2 font-medium">{account.accountType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Balance:</span>
                      <span className="ml-2 font-medium">{account.balance}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phase:</span>
                      <span className="ml-2 font-medium">{account.phase}</span>
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
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Khắc phục</Button>
      </div>
    </div>
  );
};

export default PropTradingBotErrorView;
