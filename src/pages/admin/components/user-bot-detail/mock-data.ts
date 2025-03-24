
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
    originalSignalId: 'SIG001',
    action: 'ENTER_LONG',
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
  }
];
