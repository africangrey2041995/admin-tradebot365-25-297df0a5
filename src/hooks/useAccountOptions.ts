
import { useState, useEffect } from 'react';

// Mock data for account options
const mockUsers = [
  { id: 'user1', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com' },
  { id: 'user2', name: 'Trần Thị B', email: 'tranthib@example.com' },
];

const mockApis = [
  { id: 'api1', name: 'Binance API', userId: 'user1' },
  { id: 'api2', name: 'Bybit API', userId: 'user1' },
  { id: 'api3', name: 'OKX API', userId: 'user2' },
];

const mockTradingAccounts = [
  { 
    id: 'account1', 
    name: 'Binance Spot', 
    apiId: 'api1', 
    accountNumber: '12345678',
    accountType: 'SPOT',
    balance: '$500',
    isLive: true
  },
  { 
    id: 'account2', 
    name: 'Binance Futures', 
    apiId: 'api1',
    accountNumber: '87654321',
    accountType: 'FUTURES',
    balance: '$1000',
    isLive: true
  },
  { 
    id: 'account3', 
    name: 'Bybit Spot', 
    apiId: 'api2',
    accountNumber: '23456789',
    accountType: 'SPOT',
    balance: '$300',
    isLive: false
  },
  { 
    id: 'account4', 
    name: 'OKX Futures', 
    apiId: 'api3',
    accountNumber: '98765432',
    accountType: 'FUTURES',
    balance: '$2000',
    isLive: true
  },
];

const volumeOptions = [
  { value: '0.1', label: '0.1x - Rất thấp' },
  { value: '0.25', label: '0.25x - Thấp' },
  { value: '0.5', label: '0.5x - Trung bình thấp' },
  { value: '0.75', label: '0.75x - Trung bình' },
  { value: '1', label: '1x - Chuẩn' },
  { value: '1.5', label: '1.5x - Trung bình cao' },
  { value: '2', label: '2x - Cao' },
  { value: '3', label: '3x - Rất cao' },
  { value: '5', label: '5x - Cực cao' },
  { value: '10', label: '10x - Tối đa' },
];

export const useAccountOptions = () => {
  const [users, setUsers] = useState(mockUsers);
  const [apis, setApis] = useState(mockApis);
  const [tradingAccounts, setTradingAccounts] = useState(mockTradingAccounts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // In a real application, we would fetch the data from the API here
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulating API calls
        // const usersResponse = await fetch('/api/users');
        // const apisResponse = await fetch('/api/apis');
        // const accountsResponse = await fetch('/api/trading-accounts');
        
        // const usersData = await usersResponse.json();
        // const apisData = await apisResponse.json();
        // const accountsData = await accountsResponse.json();
        
        // setUsers(usersData);
        // setApis(apisData);
        // setTradingAccounts(accountsData);

        // For now, we use the mock data
        setUsers(mockUsers);
        setApis(mockApis);
        setTradingAccounts(mockTradingAccounts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    users,
    apis,
    tradingAccounts,
    volumeOptions,
    isLoading,
    error
  };
};
