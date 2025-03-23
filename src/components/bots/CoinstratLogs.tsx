
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import SignalDetailModal from './signal-logs/SignalDetailModal';
import SignalLogsTable from './signal-logs/SignalLogsTable';
import LoadingSignalLogs from './signal-logs/LoadingSignalLogs';
import EmptySignalLogs from './signal-logs/EmptySignalLogs';
import { normalizeUserId } from '@/utils/normalizeUserId';

interface CoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  signalSourceLabel?: string;
  refreshTrigger?: boolean;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ 
  botId, 
  userId, 
  initialData = [],
  signalSourceLabel = "TradingView ID",
  refreshTrigger = false
}) => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);

  const fetchLogs = () => {
    console.log(`CoinstratLogs - Fetching logs for userId: ${userId}, botId: ${botId}`);
    setLoading(true);
    
    try {
      // Normalize the input userId for consistent comparison
      const normalizedInputUserId = normalizeUserId(userId);
      console.log(`CoinstratLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
      
      // If initialData is provided, filter and use it
      if (initialData && initialData.length > 0) {
        const filteredLogs = initialData.filter(log => {
          // Check both processed and failed accounts with normalized comparison
          const hasProcessedAccountsForUser = log.processedAccounts.some(account => 
            normalizeUserId(account.userId) === normalizedInputUserId
          );
          
          const hasFailedAccountsForUser = log.failedAccounts.some(account => 
            normalizeUserId(account.userId) === normalizedInputUserId
          );
          
          return hasProcessedAccountsForUser || hasFailedAccountsForUser;
        });
        
        console.log(`CoinstratLogs - Filtered logs from initialData: ${filteredLogs.length} of ${initialData.length}`);
        setLogs(filteredLogs);
        setLoading(false);
        return;
      }
      
      // Otherwise use mock data
      setTimeout(() => {
        try {
          const mockLogs: CoinstratSignal[] = [
            {
              id: 'CSP-78952364',
              originalSignalId: 'SIG001',
              action: 'ENTER_LONG',
              instrument: 'BTCUSDT',
              timestamp: new Date().toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '1.5',
              status: 'Processed',
              processedAccounts: [
                {
                  accountId: 'ACC-001',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Binance Spot Account',
                  timestamp: new Date().toISOString(),
                  status: 'success'
                },
                {
                  accountId: 'ACC-002',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Coinstart Pro Account',
                  timestamp: new Date().toISOString(),
                  status: 'success'
                }
              ],
              failedAccounts: []
            },
            {
              id: 'CSP-78956789',
              originalSignalId: 'SIG002',
              action: 'EXIT_LONG',
              instrument: 'ETHUSDT',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '2.3',
              status: 'Processed',
              processedAccounts: [
                {
                  accountId: 'ACC-001',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Binance Spot Account',
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                  status: 'success'
                }
              ],
              failedAccounts: []
            },
            {
              id: 'CSP-78959012',
              originalSignalId: 'SIG003',
              action: 'ENTER_SHORT',
              instrument: 'SOLUSDT',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
              maxLag: '5s',
              investmentType: 'crypto',
              amount: '3.7',
              status: 'Failed',
              processedAccounts: [],
              failedAccounts: [
                {
                  accountId: 'ACC-003',
                  userId: 'USR-002', // Standardized to USR-002 format with dash
                  name: 'FTX Account',
                  timestamp: new Date(Date.now() - 7200000).toISOString(),
                  reason: 'Invalid account configuration',
                  errorCode: 'ACC_CONFIG_ERROR',
                  status: 'failed'
                },
                {
                  accountId: 'ACC-004',
                  userId: 'USR-001', // Standardized to USR-001 format with dash
                  name: 'Bybit Account',
                  timestamp: new Date(Date.now() - 7200000).toISOString(),
                  reason: 'API key expired',
                  errorCode: 'API_KEY_EXPIRED',
                  status: 'failed'
                }
              ],
              errorMessage: 'Invalid account configuration'
            },
          ];
          
          const filteredLogs = mockLogs.filter(log => {
            // Check processed accounts with normalized comparison
            const hasProcessedAccountsForUser = log.processedAccounts.some(account => {
              const normalizedAccountUserId = normalizeUserId(account.userId);
              const match = normalizedAccountUserId === normalizedInputUserId;
              console.log(`CoinstratLogs - Processed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
              return match;
            });
            
            // Check failed accounts with normalized comparison
            const hasFailedAccountsForUser = log.failedAccounts.some(account => {
              const normalizedAccountUserId = normalizeUserId(account.userId);
              const match = normalizedAccountUserId === normalizedInputUserId;
              console.log(`CoinstratLogs - Failed account - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
              return match;
            });
            
            return hasProcessedAccountsForUser || hasFailedAccountsForUser;
          });
          
          console.log(`CoinstratLogs - Filtered logs from mockData: ${filteredLogs.length} of ${mockLogs.length}`);
          setLogs(filteredLogs);
          setLoading(false);
        } catch (error) {
          console.error('Error processing logs:', error);
          setLogs([]);
          setLoading(false);
        }
      }, 800);
    } catch (error) {
      console.error('Error in fetchLogs:', error);
      setLogs([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [botId, userId]);

  // Handle refresh trigger from parent
  useEffect(() => {
    if (refreshTrigger) {
      fetchLogs();
    }
  }, [refreshTrigger]);

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  const handleViewSignalDetails = (signal: CoinstratSignal) => {
    setSelectedSignal(signal);
    setSignalDetailsOpen(true);
  };

  if (loading) {
    return <LoadingSignalLogs />;
  }

  if (logs.length === 0) {
    return <EmptySignalLogs onRefresh={handleRefresh} />;
  }

  return (
    <div>
      <SignalLogsTable
        logs={logs}
        userId={userId}
        onViewDetails={handleViewSignalDetails}
        signalSourceLabel={signalSourceLabel}
      />
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>

      <SignalDetailModal 
        open={signalDetailsOpen}
        onOpenChange={setSignalDetailsOpen}
        signal={selectedSignal}
        userId={userId}
      />
    </div>
  );
};

export default CoinstratLogs;
