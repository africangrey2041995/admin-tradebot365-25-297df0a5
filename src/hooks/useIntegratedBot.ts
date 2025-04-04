
import { useState } from 'react';
import { Account } from '@/types';
import { CoinstratSignal, SignalAction } from '@/types/signal';
import { toast } from 'sonner';

/**
 * Mock data cho các tài khoản với định dạng userId chuẩn hóa (USR-XXX)
 * 
 * Mỗi tài khoản bao gồm thông tin chi tiết về kết nối với sàn giao dịch,
 * loại tài khoản, số dư và trạng thái kết nối.
 */
const mockAccounts: Account[] = [
  {
    cspAccountId: 'ACC001',
    cspAccountName: 'Trading Account 1',
    userAccount: 'Primary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056629',
    tradingAccountId: '40819726',
    tradingAccountType: 'HEDGED', // Loại tài khoản: HEDGED (đối lập) hoặc NETTED (ròng)
    tradingAccountBalance: '$500', // Số dư tài khoản
    status: 'Connected', // Trạng thái kết nối
    createdDate: new Date(2023, 5, 15).toISOString(),
    lastUpdated: new Date(2023, 11, 20).toISOString(),
    cspUserId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
    isLive: false // Tài khoản demo (false) hoặc thực (true)
  },
  {
    cspAccountId: 'ACC002',
    cspAccountName: 'Trading Account 2',
    userAccount: 'Secondary Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    apiId: 'API001',
    tradingAccountNumber: '4056789',
    tradingAccountId: '40819727',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$1000',
    status: 'Connected',
    createdDate: new Date(2023, 6, 22).toISOString(),
    lastUpdated: new Date(2023, 10, 5).toISOString(),
    cspUserId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
    isLive: true
  },
  {
    cspAccountId: 'ACC003',
    cspAccountName: 'Demo Account',
    userAccount: 'Test Account',
    cspUserEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccountNumber: '4044856',
    tradingAccountId: '40819728',
    tradingAccountType: 'NETTED',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    cspUserId: 'USR-002',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
    isLive: false
  },
];

/**
 * Mock data cho các tín hiệu với định dạng userId chuẩn hóa (USR-XXX)
 * 
 * Mỗi tín hiệu bao gồm thông tin về loại hành động, cặp giao dịch,
 * thời gian tạo, và danh sách các tài khoản đã xử lý hoặc bị lỗi.
 */
const mockLogs: CoinstratSignal[] = [
  {
    id: 'CSP-78952364',
    originalSignalId: 'SIG001',
    action: 'ENTER_LONG' as SignalAction,
    instrument: 'BTCUSDT',
    timestamp: new Date().toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '1.5',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
        name: 'Binance Spot Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      },
      {
        accountId: 'ACC-002',
        userId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
        name: 'Coinstart Pro Account',
        timestamp: new Date().toISOString(),
        status: 'success'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'CSP-78956789',
    originalSignalId: 'SIG002',
    action: 'EXIT_LONG' as SignalAction,
    instrument: 'ETHUSDT',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '2.3',
    status: 'Processed',
    processedAccounts: [
      {
        accountId: 'ACC-001',
        userId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
        name: 'Binance Spot Account',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success'
      }
    ],
    failedAccounts: []
  },
  {
    id: 'CSP-78959012',
    originalSignalId: 'SIG003',
    action: 'ENTER_SHORT' as SignalAction,
    instrument: 'SOLUSDT',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '3.7',
    status: 'Failed',
    processedAccounts: [],
    failedAccounts: [
      {
        accountId: 'ACC-003',
        userId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
        name: 'FTX Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'Invalid account configuration',
        errorCode: 'ACC_CONFIG_ERROR',
        status: 'failed'
      },
      {
        accountId: 'ACC-004',
        userId: 'USR-001',  // Định dạng chuẩn USR-XXX với dấu gạch ngang
        name: 'Bybit Account',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'API key expired',
        errorCode: 'API_KEY_EXPIRED',
        status: 'failed'
      }
    ],
    errorMessage: 'Invalid account configuration'
  },
];

export interface UseIntegratedBotResult {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  refreshLoading: boolean;
  mockAccounts: Account[];
  mockLogs: CoinstratSignal[];
  refreshTabData: () => void;
}

/**
 * Hook để quản lý dữ liệu cho các bot tích hợp
 * 
 * @param initialTab Tab ban đầu được chọn
 * @returns Trạng thái tab, dữ liệu tài khoản, dữ liệu logs và các hàm cập nhật
 */
export const useIntegratedBot = (
  initialTab: string = "overview"
): UseIntegratedBotResult => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [refreshLoading, setRefreshLoading] = useState(false);

  /**
   * Làm mới dữ liệu của tab hiện tại
   * Mô phỏng API call với bộ hẹn giờ
   */
  const refreshTabData = () => {
    setRefreshLoading(true);
    
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Coinstrat Logs"
      }`);
    }, 1000);
  };

  return {
    activeTab,
    setActiveTab,
    refreshLoading,
    mockAccounts,
    mockLogs,
    refreshTabData,
  };
};
