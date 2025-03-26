
import { useState, useEffect } from 'react';

export const useAccountOptions = () => {
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [apis, setApis] = useState<{ id: string; name: string; userId: string }[]>([]);
  const [tradingAccounts, setTradingAccounts] = useState<{ 
    id: string;           // tradingAccountId (accountId from Ctrader)
    number: string;       // accountNumber from Ctrader
    type: string;         // traderAccountType from Ctrader
    balance: string;      // balance from Ctrader
    isLive: boolean;      // live status from Ctrader
    apiId: string;        // related API ID
  }[]>([]);
  
  const volumeOptions = [
    { value: "0.5", label: "x0.5" },
    { value: "1", label: "x1" },
    { value: "2", label: "x2" },
    { value: "3", label: "x3" },
    { value: "5", label: "x5" },
    { value: "10", label: "x10" },
  ];

  useEffect(() => {
    // Load mock data
    setUsers([
      { id: "user1", name: "Tài Khoản 1", email: "dbtcompany17@gmail.com" },
      { id: "user2", name: "Tài Khoản 2", email: "user2@example.com" },
    ]);

    setApis([
      { id: "api1", name: "API 1", userId: "user1" },
      { id: "api2", name: "API 2", userId: "user1" },
      { id: "api3", name: "API 1", userId: "user2" },
    ]);

    // Updated mock data with Ctrader structure
    setTradingAccounts([
      { 
        id: "40819726", 
        number: "5065708", 
        type: "HEDGED", 
        balance: "$500", 
        isLive: false, 
        apiId: "api1" 
      },
      { 
        id: "40819727", 
        number: "5065709", 
        type: "HEDGED", 
        balance: "$1000", 
        isLive: true, 
        apiId: "api1" 
      },
      { 
        id: "40819728", 
        number: "5065710", 
        type: "NETTED", 
        balance: "$10000", 
        isLive: false, 
        apiId: "api1" 
      },
      { 
        id: "40819729", 
        number: "5065711", 
        type: "HEDGED", 
        balance: "$5000", 
        isLive: false, 
        apiId: "api2" 
      },
      { 
        id: "40819730", 
        number: "5065712", 
        type: "NETTED", 
        balance: "$2000", 
        isLive: true, 
        apiId: "api3" 
      },
    ]);
  }, []);

  return {
    users,
    apis,
    tradingAccounts,
    volumeOptions
  };
};
