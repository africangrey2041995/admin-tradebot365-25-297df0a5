
export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Pending';
export type SignalAction = 'ENTER_LONG' | 'EXIT_LONG' | 'ENTER_SHORT' | 'EXIT_SHORT';

export interface Account {
  id: string;
  userAccount?: string;
  userEmail?: string;
  apiName?: string;
  apiId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  status: ConnectionStatus;
  createdDate: string;
  lastUpdated: string;
  userId?: string;
  
  // Add missing properties used in the codebase
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string;
  name?: string;
  expireDate?: string;
  volumeMultiplier?: string;
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
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: string;
  errorMessage?: string;
}

// Add missing interface for CoinstratSignal
export interface AccountSignalStatus {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
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
  status: string;
  processedAccounts: AccountSignalStatus[];
  failedAccounts: AccountSignalStatus[];
  errorMessage?: string;
}

// Add missing interface for Connection
export interface Connection {
  accountId: string;
  connectionStatus: ConnectionStatus;
  lastConnectionTime: string;
  lastDisconnectionTime?: string;
  errorMessage?: string;
}

// Add missing interface for UserWithRole
export interface UserWithRole {
  id: string;
  name: string; // Keep this for backward compatibility
  fullName?: string; // Add fullName property to make it compatible with AdminUser
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
}

// Add ExtendedSignal type for error-signals components
export interface ExtendedSignal extends TradingViewSignal {
  botId?: string;
  botName?: string;
  exchange?: string;
  processingTime?: string;
}

// Add ActivityLog interface for the system logs
export interface ActivityLog {
  id: string;
  type: 'user_registration' | 'user_login' | 'admin_login' | 'admin_action';
  action: string;
  userId: string;
  userName: string;
  userEmail: string;
  ipAddress: string;
  timestamp: string;
  details: string;
}
