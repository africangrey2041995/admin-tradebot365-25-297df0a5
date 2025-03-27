
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';

interface AccountStatusSummaryProps {
  signal: CoinstratSignal;
  userId: string;
}

/**
 * Hiển thị tóm tắt trạng thái tài khoản cho một tín hiệu
 * Gồm số lượng tài khoản thành công/thất bại được lọc theo userId
 * 
 * @param signal Tín hiệu cần hiển thị trạng thái
 * @param userId ID của người dùng, cần tuân theo định dạng USR-XXX
 */
const AccountStatusSummary: React.FC<AccountStatusSummaryProps> = ({ signal, userId }) => {
  const [succeeded, setSucceeded] = useState(0);
  const [failed, setFailed] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Validate userId trước khi xử lý
      if (!validateUserId(userId)) {
        console.warn(`AccountStatusSummary - Invalid userId format: ${userId}, should be in format USR-XXX`);
        // We still proceed but with a warning
      }
      
      // Sử dụng hàm normalizeUserId để chuẩn hóa userId
      const normalizedInputUserId = normalizeUserId(userId);
      
      // Lọc tài khoản với so sánh chuẩn hóa
      const userProcessedAccounts = signal.processedAccounts.filter(account => {
        if (!account.userId) {
          console.warn(`AccountStatusSummary - Processed account ${account.accountId} is missing userId`);
          return false;
        }
        
        return normalizeUserId(account.userId) === normalizedInputUserId;
      });
      
      const userFailedAccounts = signal.failedAccounts.filter(account => {
        if (!account.userId) {
          console.warn(`AccountStatusSummary - Failed account ${account.accountId} is missing userId`);
          return false;
        }
        
        return normalizeUserId(account.userId) === normalizedInputUserId;
      });
      
      console.log(`AccountStatusSummary - For signal ${signal.id}, user ${userId} (normalized: ${normalizedInputUserId})`);
      console.log(`AccountStatusSummary - Found ${userProcessedAccounts.length} processed and ${userFailedAccounts.length} failed accounts`);
      
      const processedCount = userProcessedAccounts.length;
      const failedCount = userFailedAccounts.length;
      const totalCount = processedCount + failedCount;
      
      setSucceeded(processedCount);
      setFailed(failedCount);
      setTotal(totalCount);
    } catch (error) {
      console.error('Error calculating account status:', error);
      // Set safe defaults on error
      setSucceeded(0);
      setFailed(0);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [signal, userId]);
  
  if (isLoading) {
    return <span className="text-muted-foreground text-sm">Đang tải...</span>;
  }
  
  return (
    <div className="flex flex-col gap-2">
      {succeeded > 0 && (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
          {succeeded} tài khoản thành công
        </Badge>
      )}
      {failed > 0 && (
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
          {failed} tài khoản thất bại
        </Badge>
      )}
      {total === 0 && (
        <span className="text-muted-foreground text-sm">Không có tài khoản</span>
      )}
    </div>
  );
};

export default AccountStatusSummary;
