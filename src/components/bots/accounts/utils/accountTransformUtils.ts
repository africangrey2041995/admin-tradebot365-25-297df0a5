
import { Account } from '@/types';
import { CSPAccount, TradingAccount, UserAccount } from '@/hooks/accounts/useAccountsTransform';

/**
 * Tổ chức lại danh sách account từ dạng phẳng sang dạng phân cấp
 */
export const organizeAccounts = (accounts: Account[]): CSPAccount[] => {
  const cspAccountMap: Record<string, CSPAccount> = {};
  
  // Tạo cấu trúc dữ liệu phân cấp
  accounts.forEach(account => {
    const { cspAccountId, cspAccountName, cspUserId, apiName, apiId, tradingAccountId, tradingAccountNumber, 
      tradingAccountType, tradingAccountBalance, status, isLive } = account;
    
    // Tạo CSP Account nếu chưa tồn tại
    if (!cspAccountMap[cspAccountId]) {
      cspAccountMap[cspAccountId] = {
        cspAccountId,
        cspAccountName,
        apiName: apiName || 'Unknown API',
        apiId: apiId || '',
        status: status || '',
        email: account.cspUserEmail || '',
        tradingAccounts: []
      };
    }
    
    // Thêm Trading Account
    cspAccountMap[cspAccountId].tradingAccounts.push({
      tradingAccountId: tradingAccountId || `unknown-${Math.random().toString(36).substr(2, 9)}`,
      tradingAccountNumber: tradingAccountNumber || 'Unknown Number',
      tradingAccountType: tradingAccountType || 'Unknown Type',
      tradingAccountBalance: tradingAccountBalance || '$0.00',
      isLive: isLive || false,
      status: status || 'Unknown'
    });
  });
  
  // Chuyển đổi map thành mảng và sắp xếp
  return Object.values(cspAccountMap).sort((a, b) => 
    a.cspAccountName.localeCompare(b.cspAccountName)
  );
};

/**
 * Lấy màu sắc CSS class dựa trên trạng thái kết nối
 */
export const getStatusColorClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'connected':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    case 'disconnected':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'connecting':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
    case 'inactive':
      return 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400';
    default:
      return 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400';
  }
};
