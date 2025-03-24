
import { useState, useEffect } from 'react';

export const useAccountOptions = () => {
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [apis, setApis] = useState<{ id: string; name: string; userId: string }[]>([]);
  const [tradingAccounts, setTradingAccounts] = useState<{ id: string; number: string; type: string; balance: string; apiId: string }[]>([]);
  
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

    setTradingAccounts([
      { id: "acc1", number: "4056629", type: "Live", balance: "$500", apiId: "api1" },
      { id: "acc2", number: "4056789", type: "Live", balance: "$1000", apiId: "api1" },
      { id: "acc3", number: "4044856", type: "Demo", balance: "$10000", apiId: "api1" },
      { id: "acc4", number: "4044857", type: "Demo", balance: "$5000", apiId: "api2" },
      { id: "acc5", number: "4056630", type: "Live", balance: "$2000", apiId: "api3" },
    ]);
  }, []);

  return {
    users,
    apis,
    tradingAccounts,
    volumeOptions
  };
};
