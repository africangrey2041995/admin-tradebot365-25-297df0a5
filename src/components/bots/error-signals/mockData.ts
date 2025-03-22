
import { ExtendedSignal } from './types';

export const getMockErrorSignals = (botId: string): ExtendedSignal[] => {
  // Common mock data structure
  const baseErrorSignals: ExtendedSignal[] = [
    {
      id: "ERR1001",
      action: "ENTER_LONG",
      instrument: "BTC/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      signalToken: "s-123456",
      maxLag: "30s",
      investmentType: "CRYPTO",
      amount: "0.05",
      status: "ERROR",
      errorMessage: "API Connection timeout after 30s",
      botId: "BOT-7824",
      botName: "Alpha Momentum",
      exchange: "Binance",
      userId: "user_1234abcd",
      tradingAccount: "78459213",
      tradingAccountType: "Live",
      tradingAccountBalance: "$1,245.50",
      processingTime: "31.2s"
    },
    {
      id: "ERR1002",
      action: "EXIT_SHORT",
      instrument: "ETH/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      signalToken: "s-789012",
      maxLag: "20s",
      investmentType: "CRYPTO",
      amount: "1.2",
      status: "ERROR",
      errorMessage: "Insufficient balance for this operation",
      botId: "BOT-9156",
      botName: "Beta Grid",
      exchange: "Bybit",
      userId: "user_5678efgh",
      tradingAccount: "65784123",
      tradingAccountType: "Demo",
      tradingAccountBalance: "$10,000.00",
      processingTime: "18.5s"
    },
    {
      id: "ERR1003",
      action: "ENTER_SHORT",
      instrument: "SOL/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      signalToken: "s-345678",
      maxLag: "15s",
      investmentType: "CRYPTO",
      amount: "10",
      status: "ERROR",
      errorMessage: "Order rejected by exchange",
      botId: "BOT-4237",
      botName: "Scalping Pro",
      exchange: "Binance",
      userId: "user_9012ijkl",
      tradingAccount: "34521789",
      tradingAccountType: "Live",
      tradingAccountBalance: "$3,720.80",
      processingTime: "12.8s"
    }
  ];

  // User-specific data for MY-USER-BOTS
  const userBotErrors: ExtendedSignal[] = [
    {
      id: "ERR2001",
      action: "ENTER_LONG",
      instrument: "BTC/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      signalToken: "s-user123",
      maxLag: "30s",
      investmentType: "CRYPTO",
      amount: "0.01",
      status: "ERROR",
      errorMessage: "API key expired",
      botId: "MYBOT-001",
      botName: "My Trading Bot",
      exchange: "Binance",
      userId: "user_current",
      tradingAccount: "35791246",
      tradingAccountType: "Live",
      tradingAccountBalance: "$950.25",
      processingTime: "29.7s"
    },
    {
      id: "ERR2002",
      action: "EXIT_LONG",
      instrument: "ETH/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      signalToken: "s-user456",
      maxLag: "20s",
      investmentType: "CRYPTO",
      amount: "0.5",
      status: "ERROR",
      errorMessage: "Network connection error",
      botId: "MYBOT-002",
      botName: "My ETH Bot",
      exchange: "Bybit",
      userId: "user_current",
      tradingAccount: "46802135",
      tradingAccountType: "Demo",
      tradingAccountBalance: "$5,000.00",
      processingTime: "22.1s"
    }
  ];

  // Premium bot errors
  const premiumBotErrors: ExtendedSignal[] = [
    {
      id: "ERR3001",
      action: "ENTER_SHORT",
      instrument: "BTC/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      signalToken: "s-premium123",
      maxLag: "25s",
      investmentType: "CRYPTO",
      amount: "0.02",
      status: "ERROR",
      errorMessage: "Rate limit exceeded",
      botId: "PRE7459",
      botName: "Alpha Momentum",
      exchange: "Binance",
      userId: "user_current",
      tradingAccount: "57913468",
      tradingAccountType: "Live",
      tradingAccountBalance: "$1,840.75",
      processingTime: "27.3s"
    },
    {
      id: "ERR3002",
      action: "EXIT_SHORT",
      instrument: "SOL/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      signalToken: "s-premium456",
      maxLag: "15s",
      investmentType: "CRYPTO",
      amount: "15",
      status: "ERROR",
      errorMessage: "Order size too small",
      botId: "PRE8932",
      botName: "Gamma Grid",
      exchange: "Bybit",
      userId: "user_current",
      tradingAccount: "68024579",
      tradingAccountType: "Live",
      tradingAccountBalance: "$2,150.30",
      processingTime: "14.8s"
    }
  ];

  // Prop trading bot errors
  const propBotErrors: ExtendedSignal[] = [
    {
      id: "ERR4001",
      action: "ENTER_LONG",
      instrument: "BTC/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      signalToken: "s-prop123",
      maxLag: "20s",
      investmentType: "CRYPTO",
      amount: "0.03",
      status: "ERROR",
      errorMessage: "Challenge rules violation: position size too large",
      botId: "PROP001",
      botName: "Prop Master",
      exchange: "Coinstrat Pro",
      userId: "user_current",
      tradingAccount: "79024681",
      tradingAccountType: "Challenge",
      tradingAccountBalance: "$10,000.00",
      processingTime: "18.9s"
    },
    {
      id: "ERR4002",
      action: "EXIT_LONG",
      instrument: "ETH/USDT",
      timestamp: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
      signalToken: "s-prop456",
      maxLag: "25s",
      investmentType: "CRYPTO",
      amount: "0.8",
      status: "ERROR",
      errorMessage: "Unauthorized trading hour (weekend trading)",
      botId: "PROP002",
      botName: "Prop Challenger",
      exchange: "Coinstrat Pro",
      userId: "user_current",
      tradingAccount: "80135792",
      tradingAccountType: "Challenge",
      tradingAccountBalance: "$25,000.00",
      processingTime: "23.5s"
    }
  ];

  // Return different mock data based on the botId parameter
  if (botId === "USER-BOTS" || botId === "PREMIUM-BOTS" || botId === "PROP-BOTS") {
    // Admin view - all errors
    return baseErrorSignals;
  } else if (botId === "MY-USER-BOTS") {
    // User's own bots errors
    return userBotErrors;
  } else if (botId === "MY-PREMIUM-BOTS") {
    // User's premium bots errors
    return premiumBotErrors;
  } else if (botId === "MY-PROP-BOTS") {
    // User's prop trading bots errors
    return propBotErrors;
  } else {
    // For specific bot IDs, return filtered errors
    return baseErrorSignals.filter(signal => signal.botId === botId);
  }
};
