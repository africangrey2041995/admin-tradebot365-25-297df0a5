
import React, { useState } from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  ChevronDown, 
  ChevronRight, 
  AlertTriangle, 
  Server, 
  Database, 
  ExternalLink, 
  Key, 
  DollarSign, 
  Webhook, 
  ServerCrash,
  Clock 
} from 'lucide-react';

interface HierarchicalErrorViewProps {
  signal: ExtendedSignal;
  relatedSignals?: ExtendedSignal[];
  onViewDetails?: (signalId: string) => void;
}

interface Account {
  id: string;
  name: string;
  type: string;
  exchange?: string;
  balance?: string;
}

interface CSPAccount {
  id: string;
  name: string;
  userId: string;
  accounts: Account[];
}

// Error category types
export type ErrorCategory = 'AUTH' | 'TRADING' | 'INTEGRATION' | 'SYSTEM' | 'TIME' | 'CONN' | 'UNK';

const HierarchicalErrorView: React.FC<HierarchicalErrorViewProps> = ({
  signal,
  relatedSignals = [],
  onViewDetails
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    main: boolean;
    csp: boolean;
    accounts: Record<string, boolean>;
  }>({
    main: true,
    csp: false,
    accounts: {}
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const toggleAccount = (accountId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      accounts: {
        ...prev.accounts,
        [accountId]: !prev.accounts[accountId]
      }
    }));
  };

  // Generate structured error ID
  const getStructuredErrorId = () => {
    // Extract bot type prefix
    let botTypePrefix = 'ERR';
    if (signal.botType) {
      if (signal.botType.toLowerCase().includes('user')) {
        botTypePrefix = 'USR';
      } else if (signal.botType.toLowerCase().includes('premium')) {
        botTypePrefix = 'PRE';
      } else if (signal.botType.toLowerCase().includes('prop')) {
        botTypePrefix = 'PRP';
      }
    }
    
    // Generate error category based on error message
    const category = getErrorCategory(signal.errorMessage || '');
    
    // Extract numeric part from signal ID or generate sequential
    const numericPart = signal.id.match(/\d+$/) ? signal.id.match(/\d+$/)?.[0] || '001' : '001';
    
    return `ERR-${botTypePrefix}-${category}-${numericPart.padStart(3, '0')}`;
  };
  
  // Determine error category from error message
  const getErrorCategory = (errorMsg: string): ErrorCategory => {
    const lowerMsg = errorMsg.toLowerCase();
    
    if (lowerMsg.includes('auth') || lowerMsg.includes('token') || lowerMsg.includes('permission') || 
        lowerMsg.includes('key') || lowerMsg.includes('login') || lowerMsg.includes('credential')) {
      return 'AUTH';
    } else if (lowerMsg.includes('trade') || lowerMsg.includes('order') || lowerMsg.includes('position') || 
              lowerMsg.includes('balance') || lowerMsg.includes('fund') || lowerMsg.includes('margin') ||
              lowerMsg.includes('liquidation')) {
      return 'TRADING';
    } else if (lowerMsg.includes('api') || lowerMsg.includes('request') || lowerMsg.includes('response') || 
              lowerMsg.includes('webhook') || lowerMsg.includes('format') || lowerMsg.includes('payload')) {
      return 'INTEGRATION';
    } else if (lowerMsg.includes('time') || lowerMsg.includes('timeout') || lowerMsg.includes('delay') ||
              lowerMsg.includes('expired')) {
      return 'TIME';
    } else if (lowerMsg.includes('connect') || lowerMsg.includes('network') || lowerMsg.includes('server') ||
              lowerMsg.includes('unavailable') || lowerMsg.includes('unreachable')) {
      return 'CONN';
    } else if (lowerMsg.includes('system') || lowerMsg.includes('internal') || lowerMsg.includes('crash') ||
              lowerMsg.includes('error') || lowerMsg.includes('exception')) {
      return 'SYSTEM';
    }
    
    return 'UNK';
  };

  // Get category icon
  const getCategoryIcon = (category: ErrorCategory) => {
    switch (category) {
      case 'AUTH':
        return <Key className="h-4 w-4 mr-1" />;
      case 'TRADING':
        return <DollarSign className="h-4 w-4 mr-1" />;
      case 'INTEGRATION':
        return <Webhook className="h-4 w-4 mr-1" />;
      case 'SYSTEM':
        return <ServerCrash className="h-4 w-4 mr-1" />;
      case 'TIME':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'CONN':
        return <Server className="h-4 w-4 mr-1" />;
      default:
        return <AlertTriangle className="h-4 w-4 mr-1" />;
    }
  };

  // Generate severity badge
  const getSeverityBadge = () => {
    const severity = signal.errorSeverity || 'medium';
    const severityMap: Record<string, { color: string, label: string, description: string }> = {
      low: { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', 
        label: 'Low', 
        description: 'Minor issue, no immediate action required'
      },
      medium: { 
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', 
        label: 'Medium',
        description: 'Some features affected, should be addressed soon'
      },
      high: { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', 
        label: 'High',
        description: 'Functionality severely impacted, urgent attention needed'
      },
      critical: { 
        color: 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-200', 
        label: 'Critical',
        description: 'System is down, immediate action required'
      },
    };
    
    const config = severityMap[severity];
    
    return (
      <div className="flex items-center group relative">
        <Badge className={config.color}>
          <AlertTriangle className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
        <div className="absolute z-50 bottom-full mb-2 left-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
          <div className="bg-black text-white text-xs rounded p-2 shadow-lg max-w-xs">
            {config.description}
          </div>
        </div>
      </div>
    );
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'dd/MM/yyyy HH:mm:ss');
    } catch (e) {
      return timestamp;
    }
  };

  // Get category badge
  const getCategoryBadge = () => {
    const category = getErrorCategory(signal.errorMessage || '');
    const categoryMap: Record<ErrorCategory, { color: string, label: string }> = {
      AUTH: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', label: 'Authentication' },
      TRADING: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', label: 'Trading' },
      INTEGRATION: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Integration' },
      SYSTEM: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'System' },
      TIME: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', label: 'Timeout' },
      CONN: { color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300', label: 'Connection' },
      UNK: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', label: 'Unknown' }
    };
    
    const config = categoryMap[category];
    const icon = getCategoryIcon(category);
    
    return (
      <Badge className={config.color}>
        {icon}
        {config.label}
      </Badge>
    );
  };

  // Mock CSP accounts and trading accounts for demo
  // In a real implementation, this would come from the signal data
  const cspAccounts: CSPAccount[] = [
    {
      id: 'CSP-001',
      name: 'Main Coinstrat Account',
      userId: signal.userId || 'USR-001',
      accounts: [
        {
          id: signal.tradingAccountId || 'ACC-001',
          name: 'Binance Futures',
          type: signal.tradingAccountType || 'Futures',
          exchange: 'Binance',
          balance: signal.tradingAccountBalance || '1000.00'
        },
        {
          id: 'ACC-002',
          name: 'Bybit Spot',
          type: 'Spot',
          exchange: 'Bybit',
          balance: '500.00'
        }
      ]
    },
    {
      id: 'CSP-002',
      name: 'Secondary Coinstrat Account',
      userId: signal.userId || 'USR-001',
      accounts: [
        {
          id: 'ACC-003',
          name: 'Binance Demo',
          type: 'Demo',
          exchange: 'Binance',
          balance: '5000.00'
        }
      ]
    }
  ];

  return (
    <Card className="border-red-200 dark:border-red-800/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            Error Detail
            {getSeverityBadge()}
            {getCategoryBadge()}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {getStructuredErrorId()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails && onViewDetails(signal.id)}
            >
              View Full Details
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main signal information */}
          <Collapsible 
            open={expandedSections.main} 
            onOpenChange={() => toggleSection('main')}
            className="border rounded-md"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex justify-between items-center p-3 text-left h-auto"
              >
                <div className="flex items-center space-x-2">
                  {expandedSections.main ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                  <span className="font-medium">Signal Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {signal.instrument}
                  </Badge>
                  <Badge variant="destructive">
                    Error
                  </Badge>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Signal ID:</span>
                    <div className="font-mono text-xs">{signal.id}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Timestamp:</span>
                    <div>{formatTimestamp(signal.timestamp)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Action:</span>
                    <div>{signal.action}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <div>{signal.amount}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Bot:</span>
                    <div className="font-medium text-blue-600 dark:text-blue-400">
                      {signal.botName || signal.botId || 'Unknown'}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">User:</span>
                    <div>{signal.userId || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Coinstrat Log ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-xs">{signal.coinstratLogId || 'N/A'}</span>
                      {signal.coinstratLogId && <ExternalLink className="h-3 w-3 text-blue-500" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Error Message:</span>
                    <div className="text-red-600 dark:text-red-400 text-sm mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-800/30">
                      {signal.errorMessage || 'Unknown error'}
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* CSP Accounts */}
          <Collapsible 
            open={expandedSections.csp} 
            onOpenChange={() => toggleSection('csp')}
            className="border rounded-md"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex justify-between items-center p-3 text-left h-auto"
              >
                <div className="flex items-center space-x-2">
                  {expandedSections.csp ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                  <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Coinstrat Pro Accounts</span>
                </div>
                <Badge variant="outline">
                  {cspAccounts.length} Accounts
                </Badge>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="space-y-4">
                {cspAccounts.map((cspAccount) => (
                  <div key={cspAccount.id} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium">{cspAccount.name}</span>
                        <span className="text-xs text-muted-foreground">({cspAccount.id})</span>
                      </div>
                      <Badge variant="outline">
                        {cspAccount.accounts.length} Trading Accounts
                      </Badge>
                    </div>
                    
                    {/* Trading accounts for this CSP */}
                    <div className="ml-6 mt-2 space-y-2">
                      {cspAccount.accounts.map(account => (
                        <Collapsible 
                          key={account.id}
                          open={!!expandedSections.accounts[account.id]}
                          onOpenChange={() => toggleAccount(account.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full flex justify-between items-center text-left h-auto p-2 border rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                {expandedSections.accounts[account.id] ? 
                                  <ChevronDown className="h-3 w-3" /> : 
                                  <ChevronRight className="h-3 w-3" />
                                }
                                <Database className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                <span>{account.name}</span>
                                <span className="text-xs text-muted-foreground">({account.id})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                                >
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Error
                                </Badge>
                              </div>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-3 ml-4 mt-2 border-l-2 border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-xs text-muted-foreground">Type:</span>
                                <div>{account.type}</div>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Exchange:</span>
                                <div>{account.exchange}</div>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Balance:</span>
                                <div>${account.balance}</div>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Error Time:</span>
                                <div>{formatTimestamp(signal.timestamp)}</div>
                              </div>
                            </div>
                            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800/30">
                              <span className="font-medium">Error:</span> {signal.errorMessage}
                            </div>
                            <div className="mt-2 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => onViewDetails && onViewDetails(signal.id)}
                              >
                                View Details
                              </Button>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Related error signals */}
          {relatedSignals.length > 0 && (
            <div className="border rounded-md p-3">
              <div className="font-medium mb-2">Related Errors</div>
              <div className="space-y-2">
                {relatedSignals.map(relatedSignal => (
                  <div 
                    key={relatedSignal.id} 
                    className="flex justify-between items-center p-2 border rounded-md bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-mono text-xs">{relatedSignal.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {relatedSignal.instrument}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => onViewDetails && onViewDetails(relatedSignal.id)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HierarchicalErrorView;
