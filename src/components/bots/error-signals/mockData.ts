
import { ExtendedSignal } from './types';

// Mock error signals
export const getMockErrorSignals = (botType: string): ExtendedSignal[] => {
  // Base signals
  const baseSignals: ExtendedSignal[] = [
    {
      id: 'ERR-1001',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: '2023-11-15T14:32:00Z',
      signalToken: 'CST9HA871BN',
      maxLag: '500ms',
      investmentType: 'crypto',
      amount: '0.05 BTC',
      status: 'Failed',
      errorMessage: 'API Connection Timeout',
      userId: 'USER123',
      tradingAccount: 'Binance-Main',
      tradingAccountType: 'Spot',
      tradingAccountBalance: '$15,420',
      botId: botType === 'USER-BOTS' ? 'BOT7459' : 
             botType === 'PREMIUM-BOTS' ? 'PREMIUM7459' : 
             botType === 'PROP-BOTS' ? 'PROP001' :
             botType === 'MY-USER-BOTS' ? 'MY-BOT7459' :
             botType === 'MY-PREMIUM-BOTS' ? 'MY-PREMIUM7459' :
             botType === 'MY-PROP-BOTS' ? 'MY-PROP001' : 'UNKNOWN001',
      botName: botType === 'USER-BOTS' ? 'Ultra 2in1' : 
               botType === 'PREMIUM-BOTS' ? 'Alpha Momentum' : 
               botType === 'PROP-BOTS' ? 'PropFX Master' :
               botType === 'MY-USER-BOTS' ? 'Ultra 2in1' :
               botType === 'MY-PREMIUM-BOTS' ? 'Alpha Momentum' :
               botType === 'MY-PROP-BOTS' ? 'PropFX Master' : 'Unknown Bot',
      exchange: 'Binance',
      processingTime: '1.2s'
    },
    {
      id: 'ERR-1002',
      action: 'EXIT_LONG',
      instrument: 'ETHUSDT',
      timestamp: '2023-11-15T16:45:30Z',
      signalToken: 'CST7XC321KL',
      maxLag: '300ms',
      investmentType: 'crypto',
      amount: '1.2 ETH',
      status: 'Failed',
      errorMessage: 'Insufficient Balance',
      userId: 'USER456',
      tradingAccount: 'Coinbase-Pro',
      tradingAccountType: 'Spot',
      tradingAccountBalance: '$8,750',
      botId: botType === 'USER-BOTS' ? 'BOT8932' : 
             botType === 'PREMIUM-BOTS' ? 'PREMIUM8932' : 
             botType === 'PROP-BOTS' ? 'PROP002' :
             botType === 'MY-USER-BOTS' ? 'MY-BOT8932' :
             botType === 'MY-PREMIUM-BOTS' ? 'MY-PREMIUM8932' :
             botType === 'MY-PROP-BOTS' ? 'MY-PROP002' : 'UNKNOWN002',
      botName: botType === 'USER-BOTS' ? 'Long Master' : 
               botType === 'PREMIUM-BOTS' ? 'Gamma Grid' : 
               botType === 'PROP-BOTS' ? 'PropFX Pro' :
               botType === 'MY-USER-BOTS' ? 'Long Master' :
               botType === 'MY-PREMIUM-BOTS' ? 'Gamma Grid' :
               botType === 'MY-PROP-BOTS' ? 'PropFX Pro' : 'Unknown Bot',
      exchange: 'Coinbase',
      processingTime: '0.8s'
    },
    {
      id: 'ERR-1003',
      action: 'ENTER_SHORT',
      instrument: 'XAUUSD',
      timestamp: '2023-11-14T09:22:15Z',
      signalToken: 'CST5QW123RF',
      maxLag: '450ms',
      investmentType: 'forex',
      amount: '1 lot',
      status: 'Failed',
      errorMessage: 'Order Execution Rejected',
      userId: 'USER789',
      tradingAccount: 'MT5-Main',
      tradingAccountType: 'Margin',
      tradingAccountBalance: '$25,600',
      botId: botType === 'USER-BOTS' ? 'BOT2734' : 
             botType === 'PREMIUM-BOTS' ? 'PREMIUM2734' : 
             botType === 'PROP-BOTS' ? 'PROP003' :
             botType === 'MY-USER-BOTS' ? 'BOT2734' :
             botType === 'MY-PREMIUM-BOTS' ? 'PREMIUM2734' :
             botType === 'MY-PROP-BOTS' ? 'PROP003' : 'UNKNOWN003',
      botName: botType === 'USER-BOTS' ? 'Gold Trading' : 
               botType === 'PREMIUM-BOTS' ? 'Gamma Grid' : 
               botType === 'PROP-BOTS' ? 'PropFX Gold' :
               botType === 'MY-USER-BOTS' ? 'Gold Trading' :
               botType === 'MY-PREMIUM-BOTS' ? 'Gamma Grid' :
               botType === 'MY-PROP-BOTS' ? 'PropFX Gold' : 'Unknown Bot',
      exchange: 'FXCM',
      processingTime: '1.5s'
    },
    {
      id: 'ERR-1004',
      action: 'EXIT_SHORT',
      instrument: 'EURUSD',
      timestamp: '2023-11-13T11:10:45Z',
      signalToken: 'CST3ED567TY',
      maxLag: '250ms',
      investmentType: 'forex',
      amount: '0.5 lot',
      status: 'Failed',
      errorMessage: 'Invalid Order Parameters',
      userId: 'USER101',
      tradingAccount: 'MT4-Prop',
      tradingAccountType: 'Prop',
      tradingAccountBalance: '$50,000',
      botId: botType === 'USER-BOTS' ? 'BOT1267' : 
             botType === 'PREMIUM-BOTS' ? 'PREMIUM7459' : 
             botType === 'PROP-BOTS' ? 'PROP004' :
             botType === 'MY-USER-BOTS' ? 'BOT1267' :
             botType === 'MY-PREMIUM-BOTS' ? 'PREMIUM7459' :
             botType === 'MY-PROP-BOTS' ? 'PROP004' : 'UNKNOWN004',
      botName: botType === 'USER-BOTS' ? 'Forex Master' : 
               botType === 'PREMIUM-BOTS' ? 'Alpha Momentum' : 
               botType === 'PROP-BOTS' ? 'PropFX EUR' :
               botType === 'MY-USER-BOTS' ? 'Forex Master' :
               botType === 'MY-PREMIUM-BOTS' ? 'Alpha Momentum' :
               botType === 'MY-PROP-BOTS' ? 'PropFX EUR' : 'Unknown Bot',
      exchange: 'Oanda',
      processingTime: '0.7s'
    }
  ];

  return baseSignals;
};
