
/**
 * Định nghĩa các types liên quan đến Account
 */

// Trạng thái kết nối
export type ConnectionStatus = 'Connected' | 'Disconnected' | 'Pending' | 'Error';

// Loại tài khoản giao dịch
export enum TradingAccountType {
  SPOT = 'spot',
  FUTURES = 'futures',
  MARGIN = 'margin',
  OPTIONS = 'options',
  PROP = 'prop',
  DEMO = 'demo'
}

// Thông tin cơ bản của tài khoản
export interface Account {
  id: string;
  name: string;
  userId: string;
  userEmail?: string;
  userAccount?: string; // Added this property to match usage in components
  apiName: string;
  apiId?: string;
  tradingAccount: string;
  tradingAccountType: TradingAccountType | string;
  tradingAccountBalance: string;
  status: ConnectionStatus;
  createdDate: string;
  lastUpdated: string;
  expireDate?: string;
  botIds?: string[];
  
  // Thông tin API
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  refreshToken?: string;
  ctidTraderAccountId?: string;
  volumeMultiplier?: string;
  
  // Thông tin giao dịch
  leverage?: string;
  marginType?: string;
  maxPositions?: number;
  maxLoss?: string;
}

// Thông tin kết nối
export interface Connection {
  accountId: string;
  connectionStatus: ConnectionStatus;
  lastConnectionTime: string;
  lastDisconnectionTime?: string;
  errorMessage?: string;
  reconnectAttempts?: number;
  authMethod?: string;
}

// Thống kê tài khoản
export interface AccountStats {
  accountId: string;
  balance: string;
  equity: string;
  margin: string;
  freeMargin: string;
  marginLevel: string;
  openPositions: number;
  pendingOrders: number;
  profit: string;
  lastUpdated: string;
}

// Yêu cầu kết nối tài khoản
export interface AccountConnectRequest {
  accountId: string;
  botId?: string;
  connectionParams?: Record<string, any>;
}

// Yêu cầu ngắt kết nối tài khoản
export interface AccountDisconnectRequest {
  accountId: string;
  botId?: string;
  reason?: string;
}

// Kết quả kết nối tài khoản
export interface AccountConnectionResult {
  accountId: string;
  success: boolean;
  status: ConnectionStatus;
  message: string;
  errorCode?: string;
  timestamp: string;
}

// Thông tin sàn giao dịch
export interface Exchange {
  id: string;
  name: string;
  apiDocUrl?: string;
  supportedAccountTypes: TradingAccountType[];
  requiresApiKey: boolean;
  requiresSecret: boolean;
  requiresAdditionalParams: boolean;
  additionalParamFields?: string[];
  isSupported: boolean;
  logoUrl?: string;
}
