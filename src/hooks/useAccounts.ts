
import { useState } from 'react';
import { Account } from '@/types';
import { toast } from 'sonner';
import { ConnectionStatus } from '@/types/connection';

const initialAccounts: Account[] = [
  {
    cspAccountId: 'acc001',
    clientId: 'client123',
    secretId: 'secret123',
    accessToken: 'token123',
    ctidTraderAccountId: 'ct123456',
    cspAccountName: 'Account 1',
    status: 'Connected',
    createdDate: '2023-05-15T10:30:00Z',
    lastUpdated: '2023-06-20T14:45:00Z',
    expireDate: '2024-06-20T14:45:00Z',
    cspUserId: 'user123',
    apiName: 'api123',
    apiId: 'API001',
    tradingAccountId: '40819726',
    tradingAccountNumber: '5065708',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$500',
    isLive: false,
    brokerName: 'coinstrat',
    brokerTitle: 'Coinstrat Pro',
    depositCurrency: 'USD',
    leverage: 200,
    lastConnectionTime: '2023-06-20T14:45:00Z',
    healthStatus: 'healthy',
    successfulConnections: 23,
  },
  {
    cspAccountId: 'acc002',
    clientId: 'client456',
    secretId: 'secret456',
    accessToken: 'token456',
    ctidTraderAccountId: 'ct789012',
    cspAccountName: 'Account 2',
    status: 'Disconnected',
    createdDate: '2023-06-10T08:15:00Z',
    lastUpdated: '2023-06-22T11:20:00Z',
    expireDate: '2024-06-22T11:20:00Z',
    cspUserId: 'user456',
    apiName: 'api456',
    apiId: 'API002',
    tradingAccountId: '40819727',
    tradingAccountNumber: '5065709',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$1000',
    isLive: true,
    brokerName: 'coinstrat',
    brokerTitle: 'Coinstrat Pro',
    depositCurrency: 'USD',
    leverage: 100,
    lastDisconnectionTime: '2023-06-22T11:20:00Z',
    errorMessage: 'API authentication failed',
    reconnectAttempts: 3,
    failedConnections: 5,
  },
  {
    cspAccountId: 'acc003',
    clientId: 'client789',
    secretId: 'secret789',
    accessToken: 'token789',
    ctidTraderAccountId: 'ct345678',
    cspAccountName: 'Account 3',
    status: 'Pending',
    createdDate: '2023-04-22T16:40:00Z',
    lastUpdated: '2023-06-18T09:10:00Z',
    expireDate: '2024-06-18T09:10:00Z',
    cspUserId: 'user789',
    apiName: 'api789',
    apiId: 'API003',
    tradingAccountId: '40819728',
    tradingAccountNumber: '5065710',
    tradingAccountType: 'NETTED',
    tradingAccountBalance: '$10000',
    isLive: false,
    brokerName: 'coinstrat',
    brokerTitle: 'Coinstrat Pro',
    depositCurrency: 'USD',
    leverage: 200,
  }
];

export interface NewAccount {
  name: string;
  email: string;
}

const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  const addAccount = (newAccount: NewAccount) => {
    const newAccountData: Account = {
      cspAccountId: `acc${Date.now()}`,
      clientId: `client${Date.now()}`,
      cspAccountName: newAccount.name,
      cspUserEmail: newAccount.email,
      status: 'Pending',
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      cspUserId: `user${Date.now()}`,
      apiName: `api${Date.now()}`,
      apiId: `api-${Date.now()}`,
      tradingAccountId: `${40000000 + Math.floor(Math.random() * 1000000)}`,
      tradingAccountNumber: `${5000000 + Math.floor(Math.random() * 100000)}`,
      tradingAccountType: Math.random() > 0.5 ? 'HEDGED' : 'NETTED',
      tradingAccountBalance: `$${Math.floor(Math.random() * 10000)}`,
      isLive: Math.random() > 0.5,
      brokerName: 'coinstrat',
      brokerTitle: 'Coinstrat Pro',
      depositCurrency: 'USD',
      leverage: Math.random() > 0.5 ? 100 : 200,
    };
    
    setAccounts([...accounts, newAccountData]);
    
    toast('Tài khoản đã được thêm thành công', {
      description: `Tên: ${newAccount.name}, Email: ${newAccount.email}`,
    });
    
    return newAccountData;
  };

  const updateAccount = (clientId: string, updatedAccount: Partial<Account>) => {
    const updatedAccounts = accounts.map(account => 
      account.clientId === clientId 
        ? { 
            ...account, 
            ...updatedAccount,
            lastUpdated: new Date().toISOString() 
          } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Tài khoản đã được cập nhật thành công', {
      description: `Đã cập nhật thông tin cho ${updatedAccount.cspAccountName || accounts.find(a => a.clientId === clientId)?.cspAccountName}`,
    });
  };

  const deleteAccount = (clientId: string) => {
    const updatedAccounts = accounts.filter(account => account.clientId !== clientId);
    setAccounts(updatedAccounts);
    
    toast.success('Đã xóa tài khoản thành công', {
      description: 'Tài khoản đã được xóa khỏi hệ thống',
    });
  };

  const reconnectAccount = (clientId: string) => {
    const now = new Date().toISOString();
    const updatedAccounts = accounts.map(account => 
      account.clientId === clientId 
        ? { 
            ...account, 
            status: 'Connected' as ConnectionStatus, 
            lastUpdated: now,
            lastConnectionTime: now,
            lastDisconnectionTime: undefined,
            errorMessage: undefined,
            reconnectAttempts: 0,
            successfulConnections: (account.successfulConnections || 0) + 1
          } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Kết nối lại thành công', {
      description: 'Tài khoản đã được kết nối lại với hệ thống',
    });
  };

  const disconnectAccount = (clientId: string) => {
    const now = new Date().toISOString();
    const updatedAccounts = accounts.map(account => 
      account.clientId === clientId 
        ? { 
            ...account, 
            status: 'Disconnected' as ConnectionStatus, 
            lastUpdated: now,
            lastDisconnectionTime: now,
            reconnectAttempts: 0,
            failedConnections: (account.failedConnections || 0) + 1
          } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Ngắt kết nối thành công', {
      description: 'Tài khoản đã được ngắt kết nối khỏi hệ thống',
    });
  };

  const bulkReconnect = (clientIds: string[]) => {
    const now = new Date().toISOString();
    const updatedAccounts = accounts.map(account => 
      clientIds.includes(account.clientId || '')
        ? { 
            ...account, 
            status: 'Connected' as ConnectionStatus, 
            lastUpdated: now,
            lastConnectionTime: now,
            lastDisconnectionTime: undefined,
            errorMessage: undefined,
            reconnectAttempts: 0,
            successfulConnections: (account.successfulConnections || 0) + 1
          } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Kết nối hàng loạt thành công', {
      description: `Đã kết nối lại ${clientIds.length} tài khoản`,
    });
  };

  const bulkDisconnect = (clientIds: string[]) => {
    const now = new Date().toISOString();
    const updatedAccounts = accounts.map(account => 
      clientIds.includes(account.clientId || '')
        ? { 
            ...account, 
            status: 'Disconnected' as ConnectionStatus, 
            lastUpdated: now,
            lastDisconnectionTime: now,
            reconnectAttempts: 0,
            failedConnections: (account.failedConnections || 0) + 1
          } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Ngắt kết nối hàng loạt thành công', {
      description: `Đã ngắt kết nối ${clientIds.length} tài khoản`,
    });
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    reconnectAccount,
    disconnectAccount,
    bulkReconnect,
    bulkDisconnect
  };
};

export default useAccounts;
