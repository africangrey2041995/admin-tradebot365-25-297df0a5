
import { TradingViewSignal } from '@/types/signal';

// Create fixed timestamp dates
const createFixedDate = (daysAgo: number, hoursAgo: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

// Fixed mock data for TradingView logs organized by botId
const MOCK_TRADINGVIEW_LOGS: Record<string, TradingViewSignal[]> = {
  // Data for MY-001 bot
  'MY-001': [
    {
      id: 'TV-1000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 1),
      signalToken: 'MY-001',
      maxLag: '180',
      investmentType: 'crypto',
      amount: '0.15',
      status: 'Processed',
      botId: 'MY-001',
      userId: 'USR-001'
    },
    {
      id: 'TV-1001',
      action: 'EXIT_LONG',
      instrument: 'ETHUSDT',
      timestamp: createFixedDate(0, 3),
      signalToken: 'MY-001',
      maxLag: '120',
      investmentType: 'crypto',
      amount: '0.5',
      status: 'Processed',
      botId: 'MY-001',
      userId: 'USR-001'
    },
    {
      id: 'TV-1002',
      action: 'ENTER_SHORT',
      instrument: 'SOLUSDT',
      timestamp: createFixedDate(1),
      signalToken: 'MY-001',
      maxLag: '300',
      investmentType: 'crypto',
      amount: '1.2',
      status: 'Pending',
      botId: 'MY-001',
      userId: 'USR-002'
    }
  ],
  
  // Data for PRE-001 bot
  'PRE-001': [
    {
      id: 'TV-2000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 2),
      signalToken: 'PRE-001',
      maxLag: '180',
      investmentType: 'crypto',
      amount: '0.2',
      status: 'Processed',
      botId: 'PRE-001',
      userId: 'USR-001'
    },
    {
      id: 'TV-2001',
      action: 'EXIT_SHORT',
      instrument: 'BNBUSDT',
      timestamp: createFixedDate(0, 5),
      signalToken: 'PRE-001',
      maxLag: '240',
      investmentType: 'crypto',
      amount: '0.8',
      status: 'Processed',
      botId: 'PRE-001',
      userId: 'USR-001'
    },
    {
      id: 'TV-2002',
      action: 'ENTER_SHORT',
      instrument: 'ETHUSDT',
      timestamp: createFixedDate(1, 2),
      signalToken: 'PRE-001',
      maxLag: '300',
      investmentType: 'crypto',
      amount: '0.35',
      status: 'Failed',
      errorMessage: 'Connection timeout',
      botId: 'PRE-001',
      userId: 'USR-003'
    },
    {
      id: 'TV-2003',
      action: 'ENTER_LONG',
      instrument: 'DOGEUSDT',
      timestamp: createFixedDate(2),
      signalToken: 'PRE-001',
      maxLag: '180',
      investmentType: 'crypto',
      amount: '100',
      status: 'Processed',
      botId: 'PRE-001', 
      userId: 'USR-002'
    }
  ],
  
  // Default data for any other bot
  'default': [
    {
      id: 'TV-3000',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: createFixedDate(0, 4),
      signalToken: 'default',
      maxLag: '180',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Processed',
      botId: 'default',
      userId: 'USR-001'
    },
    {
      id: 'TV-3001',
      action: 'EXIT_LONG',
      instrument: 'ETHUSDT',
      timestamp: createFixedDate(1, 1),
      signalToken: 'default',
      maxLag: '240',
      investmentType: 'crypto',
      amount: '0.4',
      status: 'Failed',
      errorMessage: 'API key expired',
      botId: 'default',
      userId: 'USR-001'
    }
  ]
};

// Get mock data by botId, with fallback to default
export const getMockTradingViewLogs = (botId?: string): TradingViewSignal[] => {
  if (!botId) return MOCK_TRADINGVIEW_LOGS['default'];
  
  // Try to find exact match first
  if (MOCK_TRADINGVIEW_LOGS[botId]) {
    return MOCK_TRADINGVIEW_LOGS[botId];
  }
  
  // If no exact match, look for partial match (e.g., if botId contains PRE, MY, etc.)
  if (botId.startsWith('PRE-')) {
    return MOCK_TRADINGVIEW_LOGS['PRE-001'];
  } else if (botId.startsWith('MY-')) {
    return MOCK_TRADINGVIEW_LOGS['MY-001'];
  }
  
  // Fallback to default
  return MOCK_TRADINGVIEW_LOGS['default'];
};
