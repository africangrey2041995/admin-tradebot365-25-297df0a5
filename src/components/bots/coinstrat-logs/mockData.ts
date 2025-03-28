
import { CoinstratSignal } from '@/types/signal';

// Create fixed timestamp dates with optional minutes offset
const createFixedDate = (daysAgo: number, hoursAgo: number = 0, minutesOffset: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() + minutesOffset);
  return date.toISOString();
};

// Fixed mock data for Coinstrat logs organized by botId
const MOCK_COINSTRAT_LOGS: Record<string, CoinstratSignal[]> = {
  // Data for MY-001 bot
  'MY-001': [
    {
      id: 'CS-1000',
      originalSignalId: 'TV-1000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 1),
      signalToken: 'MY-001',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.15',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-2000',
          userId: 'USR-001',
          status: 'success',
          name: 'Binance Account',
          timestamp: createFixedDate(0, 1, 1) // 1 minute after signal
        }
      ],
      failedAccounts: []
    },
    {
      id: 'CS-1001',
      originalSignalId: 'TV-1001',
      action: 'EXIT_LONG',
      instrument: 'ETHUSDT',
      timestamp: createFixedDate(0, 3),
      signalToken: 'MY-001',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.5',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-2000',
          userId: 'USR-001',
          status: 'success',
          name: 'Binance Account',
          timestamp: createFixedDate(0, 3, 1)
        }
      ],
      failedAccounts: []
    }
  ],
  
  // Data for PRE-001 bot
  'PRE-001': [
    {
      id: 'CS-2000',
      originalSignalId: 'TV-2000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 2),
      signalToken: 'PRE-001',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.2',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-3000',
          userId: 'USR-001',
          status: 'success',
          name: 'Binance Pro Account',
          timestamp: createFixedDate(0, 2, 1)
        },
        {
          accountId: 'ACC-3001',
          userId: 'USR-003',
          status: 'success',
          name: 'Binance Standard',
          timestamp: createFixedDate(0, 2, 2)
        }
      ],
      failedAccounts: []
    },
    {
      id: 'CS-2001',
      originalSignalId: 'TV-2001',
      action: 'EXIT_SHORT',
      instrument: 'BNBUSDT',
      timestamp: createFixedDate(0, 5),
      signalToken: 'PRE-001',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.8',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-3000',
          userId: 'USR-001',
          status: 'success',
          name: 'Binance Pro Account',
          timestamp: createFixedDate(0, 5, 1)
        }
      ],
      failedAccounts: [
        {
          accountId: 'ACC-3001',
          userId: 'USR-003',
          status: 'failed',
          name: 'Binance Standard',
          timestamp: createFixedDate(0, 5, 2),
          reason: 'Insufficient balance'
        }
      ]
    },
    {
      id: 'CS-2002',
      originalSignalId: 'TV-2002',
      action: 'ENTER_SHORT',
      instrument: 'ETHUSDT',
      timestamp: createFixedDate(1, 2),
      signalToken: 'PRE-001',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.35',
      status: 'Failed',
      processedAccounts: [],
      failedAccounts: [
        {
          accountId: 'ACC-3000',
          userId: 'USR-001',
          status: 'failed',
          name: 'Binance Pro Account',
          timestamp: createFixedDate(1, 2, 1),
          reason: 'API key expired'
        },
        {
          accountId: 'ACC-3002',
          userId: 'USR-002',
          status: 'failed',
          name: 'KuCoin Account',
          timestamp: createFixedDate(1, 2, 2),
          reason: 'Connection error'
        }
      ],
      errorMessage: 'Connection timeout'
    }
  ],
  
  // Default data for any other bot
  'default': [
    {
      id: 'CS-3000',
      originalSignalId: 'TV-3000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 4),
      signalToken: 'default',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-4000',
          userId: 'USR-001',
          status: 'success',
          name: 'Default Account',
          timestamp: createFixedDate(0, 4, 1)
        }
      ],
      failedAccounts: []
    }
  ]
};

// Get mock data by botId, with fallback to default
export const getMockCoinstratLogs = (botId?: string): CoinstratSignal[] => {
  if (!botId) return MOCK_COINSTRAT_LOGS['default'];
  
  // Try to find exact match first
  if (MOCK_COINSTRAT_LOGS[botId]) {
    return MOCK_COINSTRAT_LOGS[botId];
  }
  
  // If no exact match, look for partial match (e.g., if botId contains PRE, MY, etc.)
  if (botId.startsWith('PRE-')) {
    return MOCK_COINSTRAT_LOGS['PRE-001'];
  } else if (botId.startsWith('MY-')) {
    return MOCK_COINSTRAT_LOGS['MY-001'];
  }
  
  // Fallback to default
  return MOCK_COINSTRAT_LOGS['default'];
};
