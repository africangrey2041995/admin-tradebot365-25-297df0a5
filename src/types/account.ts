
import { ConnectionStatus, TradingAccountType } from './connection';

export interface Account {
  id: string;
  name: string;
  status: ConnectionStatus | string;
  createdDate: string;
  lastUpdated: string;
  userId: string;
  apiName: string;
  apiId: string;
  tradingAccount: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  volumeMultiplier?: string;
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string;
  expireDate?: string;
  userAccount?: string;
  userEmail?: string;
}
