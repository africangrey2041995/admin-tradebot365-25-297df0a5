
import { Account } from '@/types';
import { normalizeUserId } from './normalizeUserId';

/**
 * Lọc danh sách tài khoản theo userId để đảm bảo người dùng chỉ thấy tài khoản của họ
 * 
 * @param accounts Danh sách tài khoản cần lọc
 * @param userId ID người dùng hiện tại
 * @param isAdmin Có phải là admin không (admin thấy tất cả tài khoản)
 * @returns Danh sách tài khoản đã lọc
 */
export const filterAccountsByUserId = (
  accounts: Account[],
  userId: string,
  isAdmin: boolean = false
): Account[] => {
  // Admin thấy tất cả tài khoản
  if (isAdmin) {
    console.log(`AccountSecurity - Admin user, showing all ${accounts.length} accounts`);
    return accounts;
  }
  
  // Chuẩn hóa userId để so sánh
  const normalizedUserId = normalizeUserId(userId);
  
  // Lọc tài khoản theo userId
  const filteredAccounts = accounts.filter(account => {
    // Sử dụng cspUserId cho trường userId mới
    const accountUserId = account.cspUserId || '';
    const normalizedAccountUserId = normalizeUserId(accountUserId);
    
    return normalizedAccountUserId === normalizedUserId;
  });
  
  console.log(`AccountSecurity - Filtered accounts for user ${userId} (normalized: ${normalizedUserId}): ${filteredAccounts.length} of ${accounts.length}`);
  
  return filteredAccounts;
};

/**
 * Kiểm tra xem người dùng có quyền truy cập bot không
 * 
 * @param botOwnerId ID chủ sở hữu của bot
 * @param currentUserId ID người dùng hiện tại
 * @param isAdmin Có phải là admin không
 * @returns true nếu có quyền, false nếu không
 */
export const checkBotAccess = (
  botOwnerId: string,
  currentUserId: string,
  isAdmin: boolean = false
): boolean => {
  // Admin có quyền truy cập tất cả bot
  if (isAdmin) {
    return true;
  }
  
  // Chuẩn hóa userIds để so sánh
  const normalizedBotOwnerId = normalizeUserId(botOwnerId);
  const normalizedCurrentUserId = normalizeUserId(currentUserId);
  
  // Người dùng chỉ có quyền truy cập bot của họ
  return normalizedBotOwnerId === normalizedCurrentUserId;
};
