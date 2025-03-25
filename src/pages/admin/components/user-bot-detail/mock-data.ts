
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';

export const mockAccounts: Account[] = [
  {
    cspAccountId: 'ACC001',
    cspAccountName: 'Trading Account 1',
    userAccount: 'Primary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056629',
    tradingAccountId: '40819726',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$500',
    status: 'Connected',
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    cspUserId: 'USR-001',
    isLive: false
  },
  {
    cspAccountId: 'ACC002',
    cspAccountName: 'Trading Account 2',
    userAccount: 'Secondary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056789',
    tradingAccountId: '40819727',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    cspUserId: 'USR-001',
    isLive: true
  }
];

export const mockLogs: CoinstratSignal[] = [
  {
    id: 'CSP-78952364',
    originalSignalId: 'SIG001', // Matches ID in TradingView signals
    action: 'ENTER_LONG',
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '1.5', // Include amount for consistency
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',
        name: 'Binance Spot Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'CSP-78956789',
    originalSignalId: 'SIG002', // Matches ID in TradingView signals
    action: 'EXIT_LONG',
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '2.3', // Include amount for consistency
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
    originalSignalId: 'SIG003', // Matches ID in TradingView signals
    action: 'ENTER_SHORT',
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '3.7', // Include amount for consistency
    status: 'Failed',
    processedAccounts: [],
    failedAccounts: [
      {
        accountId: 'ACC-003',
        userId: 'USR-002',
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
  }
];
