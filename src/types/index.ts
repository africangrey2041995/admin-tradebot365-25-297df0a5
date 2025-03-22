export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Pending';

export interface Account {
  id: string;
  userAccount: string;
  userEmail: string;
  apiName: string;
  apiId: string;
  tradingAccount: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  status: ConnectionStatus;
  createdDate: string;
  lastUpdated: string;
  userId: string; // Added userId property
}

export interface PremiumBot {
  id: string;
  name: string;
  description: string;
  exchange: string;
  type: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  risk: 'medium' | 'low' | 'high';
  minCapital: string;
  status: string;
  subscribers: number;
  imageUrl: string | null;
  colorScheme: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  botId?: string;
  accounts?: Account[];
}

export interface TradingViewSignal {
  id: string;
  action: string;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: string;
  errorMessage?: string;
}
