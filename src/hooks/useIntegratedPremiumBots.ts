
import { useState, useCallback } from 'react';
import { PremiumBot, BotRiskLevel, BotType, BotStatus } from '@/types';

const integratedPremiumBots: PremiumBot[] = [
  {
    botId: 'PRE-001',
    name: 'Alpha Momentum',
    description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
    exchange: 'Coinstart Pro',
    type: BotType.PREMIUM_BOT,
    performanceLastMonth: '+18.5%',
    performanceAllTime: '+125.4%',
    risk: BotRiskLevel.MEDIUM,
    minCapital: '$500',
    status: BotStatus.ACTIVE,
    subscribers: 86,
    imageUrl: null,
    colorScheme: 'green',
    isIntegrated: true,
    createdDate: '2023-10-15',
    lastUpdated: '2023-11-10',
    users: 86,
    profit: '+18.5%',
    accounts: [
      {
        cspAccountId: 'acc-001',
        cspAccountName: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-10-15',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '2',
        cspUserId: 'user-123',
        apiName: 'Binance',
        apiId: 'binance-123',
        tradingAccountNumber: 'Spot',
        tradingAccountId: '40819726',
        tradingAccountType: 'Spot',
        tradingAccountBalance: '$1,200',
        isLive: true
      },
      {
        cspAccountId: 'acc-002',
        cspAccountName: 'Bybit Demo',
        status: 'Connected',
        createdDate: '2023-10-20',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1',
        cspUserId: 'user-123',
        apiName: 'Bybit',
        apiId: 'bybit-123',
        tradingAccountNumber: 'Spot',
        tradingAccountId: '40819727',
        tradingAccountType: 'Spot',
        tradingAccountBalance: '$800',
        isLive: false
      }
    ]
  },
  {
    botId: 'PRE-004',
    name: 'Gamma Grid',
    description: 'Bot grid trading với chiến lược phân bổ thanh khoản thông minh dựa trên biến động thị trường.',
    exchange: 'Coinstart Pro',
    type: BotType.PREMIUM_BOT,
    performanceLastMonth: '+7.6%',
    performanceAllTime: '+52.3%',
    risk: BotRiskLevel.LOW,
    minCapital: '$300',
    status: BotStatus.ACTIVE,
    subscribers: 98,
    imageUrl: null,
    colorScheme: 'purple',
    isIntegrated: true,
    createdDate: '2023-11-05',
    lastUpdated: '2023-11-10',
    users: 98,
    profit: '+7.6%',
    accounts: [
      {
        cspAccountId: 'acc-003',
        cspAccountName: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-11-05',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1',
        cspUserId: 'user-123',
        apiName: 'Binance',
        apiId: 'binance-123',
        tradingAccountNumber: 'Spot',
        tradingAccountId: '40819728',
        tradingAccountType: 'Spot',
        tradingAccountBalance: '$1,500',
        isLive: true
      }
    ]
  }
];

export const useIntegratedPremiumBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleRiskFilterChange = (value: string) => {
    setRiskFilter(value);
  };
  
  const refreshData = useCallback(() => {
    // In a real application, this would make an API call to refresh the data
    console.log('Refreshing integrated premium bots data...');
  }, []);
  
  const filteredBots = integratedPremiumBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (bot.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesRisk = riskFilter === 'all' || bot.risk === riskFilter;
    
    return matchesSearch && matchesRisk;
  });
  
  return {
    searchTerm,
    riskFilter,
    filteredBots,
    handleSearchChange,
    handleRiskFilterChange,
    refreshData
  };
};
