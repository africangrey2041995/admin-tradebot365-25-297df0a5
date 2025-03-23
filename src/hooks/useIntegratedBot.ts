
import { useState } from 'react';
import { Account } from '@/types';
import { CoinstratSignal, SignalAction } from '@/types/signal';
import { toast } from 'sonner';

// Mock data cho accounts
const mockAccounts: Account[] = [
  {
    id: 'ACC001',
    name: 'Trading Account 1',
    userAccount: 'Primary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    userId: 'USR-001'
  },
  {
    id: 'ACC002',
    name: 'Trading Account 2',
    userAccount: 'Secondary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccount: '4056789',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    userId: 'USR-001'
  },
  {
    id: 'ACC003',
    name: 'Demo Account',
    userAccount: 'Test Account',
    userEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccount: '4044856',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    userId: 'USR-002'
  },
];

// Mock data cho logs
const mockLogs: CoinstratSignal[] = [
  {
    id: 'CSP-78952364',
    originalSignalId: 'SIG001',
    action: 'ENTER_LONG' as SignalAction,
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '1.5',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',
        name: 'Binance Spot Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      },
      {
        accountId: 'ACC-002',
        userId: 'USR-001',
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
    action: 'EXIT_LONG' as SignalAction,
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '2.3',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',
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
    action: 'ENTER_SHORT' as SignalAction,
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '3.7',
    status: 'Failed',
    processedAccounts: [],
    failedAccounts: [
      {
        accountId: 'ACC-003',
        userId: 'USR-001',
        name: 'FTX Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'Invalid account configuration',
        errorCode: 'ACC_CONFIG_ERROR',
        status: 'failed'
      },
      {
        accountId: 'ACC-004',
        userId: 'USR-001',
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

export interface UseIntegratedBotResult {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  refreshLoading: boolean;
  mockAccounts: Account[];
  mockLogs: CoinstratSignal[];
  refreshTabData: () => void;
}

export const useIntegratedBot = (
  initialTab: string = "overview"
): UseIntegratedBotResult => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [refreshLoading, setRefreshLoading] = useState(false);

  const refreshTabData = () => {
    setRefreshLoading(true);
    // Mô phỏng API call bằng bộ hẹn giờ
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Coinstrat Logs"
      }`);
    }, 1000);
  };

  return {
    activeTab,
    setActiveTab,
    refreshLoading,
    mockAccounts,
    mockLogs,
    refreshTabData,
  };
};
