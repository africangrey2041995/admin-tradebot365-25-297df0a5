
import { useState } from 'react';
import { Account } from '@/types';
import { toast } from 'sonner';

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
    tradingAccount: 'trading123',
    tradingAccountType: 'type123',
    tradingAccountBalance: 'balance123',
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
    tradingAccount: 'trading456',
    tradingAccountType: 'type456',
    tradingAccountBalance: 'balance456',
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
    tradingAccount: 'trading789',
    tradingAccountType: 'type789',
    tradingAccountBalance: 'balance789',
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
      tradingAccount: `trading${Date.now()}`,
      tradingAccountType: `type${Date.now()}`,
      tradingAccountBalance: `balance${Date.now()}`,
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
    const updatedAccounts = accounts.map(account => 
      account.clientId === clientId 
        ? { ...account, status: 'Connected' as const, lastUpdated: new Date().toISOString() } 
        : account
    );
    
    setAccounts(updatedAccounts);
    
    toast.success('Kết nối lại thành công', {
      description: 'Tài khoản đã được kết nối lại với hệ thống',
    });
  };

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    reconnectAccount,
  };
};

export default useAccounts;
