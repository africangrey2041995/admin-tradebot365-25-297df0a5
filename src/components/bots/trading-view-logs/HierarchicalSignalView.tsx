
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users, Server, Database, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { TradingViewSignal, CoinstratSignal, AccountSignalStatus } from '@/types/signal';
import StatusBadge from './StatusBadge';
import { cn } from '@/lib/utils';

interface HierarchicalSignalViewProps {
  tradingViewSignal?: TradingViewSignal;
  coinstratSignals: CoinstratSignal[];
  onViewAccountDetails?: (accountId: string) => void;
}

interface ProcessedUserData {
  userId: string;
  userName: string;
  accounts: {
    accountId: string;
    accountName: string;
    statuses: AccountSignalStatus[];
  }[];
  successCount: number;
  failedCount: number;
  pendingCount: number;
}

const HierarchicalSignalView: React.FC<HierarchicalSignalViewProps> = ({
  tradingViewSignal,
  coinstratSignals,
  onViewAccountDetails
}) => {
  const [expandedSignals, setExpandedSignals] = useState<Record<string, boolean>>({});

  // Process signals to organize by user -> account hierarchy
  const processSignalHierarchy = (signals: CoinstratSignal[]): ProcessedUserData[] => {
    const userMap = new Map<string, ProcessedUserData>();
    
    signals.forEach(signal => {
      // Process successful accounts
      signal.processedAccounts.forEach(account => {
        if (!account.userId) return;
        
        if (!userMap.has(account.userId)) {
          userMap.set(account.userId, {
            userId: account.userId,
            userName: account.userId.startsWith('USR-') ? account.userId.replace('USR-', 'User ') : account.userId,
            accounts: [],
            successCount: 0,
            failedCount: 0,
            pendingCount: 0
          });
        }
        
        const userData = userMap.get(account.userId)!;
        userData.successCount++;
        
        let accountData = userData.accounts.find(a => a.accountId === account.accountId);
        if (!accountData) {
          accountData = {
            accountId: account.accountId,
            accountName: account.name,
            statuses: []
          };
          userData.accounts.push(accountData);
        }
        
        accountData.statuses.push(account);
      });
      
      // Process failed accounts
      signal.failedAccounts.forEach(account => {
        if (!account.userId) return;
        
        if (!userMap.has(account.userId)) {
          userMap.set(account.userId, {
            userId: account.userId,
            userName: account.userId.startsWith('USR-') ? account.userId.replace('USR-', 'User ') : account.userId,
            accounts: [],
            successCount: 0,
            failedCount: 0,
            pendingCount: 0
          });
        }
        
        const userData = userMap.get(account.userId)!;
        userData.failedCount++;
        
        let accountData = userData.accounts.find(a => a.accountId === account.accountId);
        if (!accountData) {
          accountData = {
            accountId: account.accountId,
            accountName: account.name,
            statuses: []
          };
          userData.accounts.push(accountData);
        }
        
        accountData.statuses.push(account);
      });
    });
    
    return Array.from(userMap.values());
  };

  const userHierarchy = processSignalHierarchy(coinstratSignals);
  
  const toggleExpandSignal = (signalId: string) => {
    setExpandedSignals(prev => ({
      ...prev,
      [signalId]: !prev[signalId]
    }));
  };

  const signalCount = coinstratSignals.length;
  const accountCount = userHierarchy.reduce((sum, user) => sum + user.accounts.length, 0);
  const userCount = userHierarchy.length;

  return (
    <div className="space-y-4 bg-white dark:bg-gray-950 rounded-md shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Signal summary header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Signal Distribution Details
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Original ID: {tradingViewSignal?.id || coinstratSignals[0]?.originalSignalId || 'Unknown'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {signalCount} Signal{signalCount !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="outline" className="bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              {userCount} User{userCount !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {accountCount} Account{accountCount !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </div>

      {/* Hierarchical view */}
      <div className="p-4 space-y-3">
        {userHierarchy.map(user => (
          <Collapsible 
            key={user.userId} 
            open={expandedSignals[user.userId]} 
            onOpenChange={() => toggleExpandSignal(user.userId)}
            className="border rounded-md"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex justify-between items-center p-3 text-left h-auto"
              >
                <div className="flex items-center space-x-2">
                  {expandedSignals[user.userId] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{user.userName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    user.successCount > 0 ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
                  )}>
                    {user.successCount} Success
                  </Badge>
                  {user.failedCount > 0 && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs">
                      {user.failedCount} Failed
                    </Badge>
                  )}
                  {user.pendingCount > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs">
                      {user.pendingCount} Pending
                    </Badge>
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0">
              <div className="ml-7 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-3">
                {user.accounts.map(account => (
                  <div key={account.accountId} className="py-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Server className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      <span className="font-medium text-sm">{account.accountName}</span>
                      <span className="text-xs text-gray-500">({account.accountId})</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs ml-auto"
                        onClick={() => onViewAccountDetails && onViewAccountDetails(account.accountId)}
                      >
                        View Details
                      </Button>
                    </div>
                    
                    <div className="ml-6 space-y-2">
                      {account.statuses.map((status, idx) => (
                        <div key={`${account.accountId}-${idx}`} className="flex items-center space-x-2 text-sm">
                          <Database className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {new Date(status.timestamp).toLocaleString()}
                          </span>
                          <StatusBadge status={status.status === 'success' ? 'Processed' : status.status === 'failed' ? 'Failed' : 'Pending'} />
                          {status.reason && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs italic">
                              {status.reason}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {userHierarchy.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No account execution data available for this signal.
          </div>
        )}
      </div>
    </div>
  );
};

export default HierarchicalSignalView;
