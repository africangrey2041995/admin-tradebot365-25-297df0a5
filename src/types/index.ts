
export interface Bot {
  botId: string;
  botName: string;
  signalToken: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
  lastUpdated: string;
  accounts: Account[];
}

export interface Account {
  id: string;
  userId?: string; // Added userId property
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string;
  userAccount?: string;
  userEmail?: string;
  apiName?: string;
  apiId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  name?: string;
  status: ConnectionStatus;
  createdDate: string;
  lastUpdated: string;
  expireDate?: string;
  volumeMultiplier?: string;
}

export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Pending';

export interface Connection {
  accountId: string;
  connectionStatus: ConnectionStatus;
  lastConnectionTime: string;
  lastDisconnectionTime?: string;
  errorMessage?: string;
}

export type SignalAction = 'ENTER_LONG' | 'EXIT_LONG' | 'ENTER_SHORT' | 'EXIT_SHORT';

export interface TradingViewSignal {
  id: string;
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: 'Pending' | 'Processed' | 'Failed';
  errorMessage?: string;
}

export interface CoinstratSignal {
  id: string;
  originalSignalId: string;
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: 'Pending' | 'Sent' | 'Processed' | 'Failed';
  processedAccounts: ProcessedAccount[];
  failedAccounts: FailedAccount[];
  errorMessage?: string;
}

export interface ProcessedAccount {
  accountId: string;
  userId?: string; // Added userId property
  name: string;
  timestamp: string;
}

export interface FailedAccount {
  accountId: string;
  userId?: string; // Added userId property
  name: string;
  timestamp: string;
  reason: string;
}

export interface PremiumBot {
  id: string;
  name: string;
  description: string;
  exchange: string;
  type: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  risk: 'low' | 'medium' | 'high';
  minCapital: string;
  status: 'active' | 'inactive';
  subscribers: number;
  imageUrl: string | null;
  colorScheme: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  botId?: string;
  accounts?: Account[];
}

// User role types
export type UserRole = 'user' | 'admin' | 'superadmin';

// Extended user interface with role
export interface UserWithRole {
  id: string;
  role: UserRole;
  fullName?: string;
  email?: string;
  imageUrl?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'suspended' | 'inactive';
}

// Stats for admin dashboard
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalBots: number;
  activeBots: number;
  totalAccounts: number;
  connectedAccounts: number;
  premiumSubscriptions: number;
  revenueThisMonth: string;
}
