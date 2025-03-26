
import React from 'react';
import { AccountSignalStatus } from '@/types/signal';
import AccountListItem from './AccountListItem';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';

interface AccountSectionProps {
  accounts: AccountSignalStatus[];
  title: string;
  type: 'success' | 'failed';
  titleClassName?: string;
  userId: string;
}

/**
 * Hiển thị danh sách các tài khoản đã xử lý hoặc bị lỗi cho một tín hiệu cụ thể
 * Lọc theo userId để đảm bảo người dùng chỉ thấy tài khoản của họ
 * 
 * @param accounts Danh sách tài khoản cần hiển thị
 * @param title Tiêu đề của phần
 * @param type Loại của danh sách (thành công / thất bại)
 * @param titleClassName Class CSS bổ sung cho tiêu đề
 * @param userId ID của người dùng hiện tại, cần tuân theo định dạng USR-XXX
 */
const AccountSection: React.FC<AccountSectionProps> = ({ 
  accounts, 
  title, 
  type, 
  titleClassName = '',
  userId
}) => {
  if (!accounts) {
    console.warn('AccountSection - accounts array is undefined');
    return null;
  }
  
  // Validate userId trước khi xử lý
  if (!validateUserId(userId)) {
    console.warn(`AccountSection - Invalid userId format: ${userId}, should be in format USR-XXX`);
    // We still proceed but with a warning
  }
  
  // Sử dụng hàm normalizeUserId để chuẩn hóa userId
  const normalizedInputUserId = normalizeUserId(userId);
  
  // Lọc tài khoản theo userId đã chuẩn hóa
  const userAccounts = accounts.filter(account => {
    if (!account.userId) {
      console.warn(`AccountSection - Account ${account.accountId} is missing userId`);
      return false;
    }
    
    const normalizedAccountUserId = normalizeUserId(account.userId);
    const match = normalizedAccountUserId === normalizedInputUserId;
    console.log(`AccountSection - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
    return match;
  });
  
  console.log(`AccountSection - Filtering accounts for userId: ${userId} (normalized: ${normalizedInputUserId})`);
  console.log(`AccountSection - Found ${userAccounts.length} matching accounts out of ${accounts.length} total`);
  
  return (
    <div className="border-t pt-4">
      <h3 className={`text-sm font-medium mb-2 ${titleClassName}`}>{title}</h3>
      {userAccounts.length > 0 ? (
        <div className="space-y-3">
          {userAccounts.map((account, index) => (
            <AccountListItem 
              key={`${type}-${account.accountId}-${index}`} 
              account={account} 
              type={type} 
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No {type === 'success' ? 'processed' : 'failed'} accounts found</p>
      )}
    </div>
  );
};

export default AccountSection;
