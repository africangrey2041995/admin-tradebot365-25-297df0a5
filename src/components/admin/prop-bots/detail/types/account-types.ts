
/**
 * Types liên quan đến tài khoản trong chi tiết Prop Trading Bot
 */

export interface TradingAccount {
  tradingAccountId: string;
  tradingAccountNumber: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  isLive: boolean;
  status: string;
  [key: string]: any;
}

export interface CSPAccount {
  cspAccountId: string;
  cspAccountName: string;
  cspUserName: string;
  cspUserEmail: string;
  apiName: string;
  apiId?: string;
  status: string; // Thay đổi từ optional thành required
  tradingAccounts: TradingAccount[];
  [key: string]: any;
}

export interface UserAccount {
  userId: string;
  userName: string;
  userEmail: string;
  cspAccounts: CSPAccount[];
  [key: string]: any;
}

export interface AccountsFilterParams {
  searchQuery: string;
  filterStatus: 'all' | 'connected' | 'disconnected' | 'error' | 'pending';
  filterLiveDemo: 'all' | 'live' | 'demo';
}

export interface AccountsCount {
  users: number;
  cspAccounts: number;
  tradingAccounts: number;
  // Thêm các trường tương đương với các tên khác đang được sử dụng
  totalUsers: number;
  totalCSP: number;
  totalTrading: number;
}
