
import { ExtendedSignal } from './types';

export const getMockErrorSignals = (botId: string): ExtendedSignal[] => {
  // Determine which type of mock data to show based on the botId parameter
  if (botId === "USER-BOTS") {
    return [
      {
        id: 'CS-20354',
        action: 'ENTER_LONG',
        instrument: 'BTCUSDT',
        timestamp: new Date().toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '1.5',
        status: 'Failed',
        errorMessage: 'API Authentication Error: Invalid credentials',
        userId: 'user_01HJKLMNOP',
        botId: 'BOT7459',
        tradingAccount: '4056629',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$500'
      },
      {
        id: 'CS-20318',
        action: 'EXIT_LONG',
        instrument: 'ADAUSDT',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '150',
        status: 'Failed',
        errorMessage: 'Position not found or already closed',
        userId: 'user_01HDEFGHIJ',
        botId: 'BOT1234',
        tradingAccount: '32541698',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$1,750'
      },
    ];
  } else if (botId === "PREMIUM-BOTS") {
    return [
      {
        id: 'CS-20347',
        action: 'EXIT_SHORT',
        instrument: 'ETHUSDT',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '0.8',
        status: 'Failed',
        errorMessage: 'Insufficient balance for operation',
        userId: 'user_01HQRSTUV',
        botId: 'PREMIUM2938',
        tradingAccount: '65784123',
        tradingAccountType: 'Demo',
        tradingAccountBalance: '$10,000'
      },
      {
        id: 'CS-20356',
        action: 'ENTER_LONG',
        instrument: 'DOGEUSDT',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '500',
        status: 'Failed',
        errorMessage: 'API rate limit exceeded',
        userId: 'user_01HABCDEF',
        botId: 'PREMIUM5678',
        tradingAccount: '87654321',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$3,200'
      },
    ];
  } else if (botId === "PROP-BOTS") {
    return [
      {
        id: 'CS-20321',
        action: 'ENTER_SHORT',
        instrument: 'SOLUSDT',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '10.2',
        status: 'Failed',
        errorMessage: 'Exchange rejected order: Market closed',
        userId: 'user_01HWXYZABC',
        botId: 'PROP2734',
        tradingAccount: '98452367',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$2,450'
      },
      {
        id: 'CS-20359',
        action: 'EXIT_SHORT',
        instrument: 'XRPUSDT',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        maxLag: '5s',
        investmentType: 'crypto',
        amount: '200',
        status: 'Failed',
        errorMessage: 'Network connection error during order execution',
        userId: 'user_01HGHIJKLM',
        botId: 'PROP9012',
        tradingAccount: '12345678',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$5,800'
      },
    ];
  }
  
  return [];
};
