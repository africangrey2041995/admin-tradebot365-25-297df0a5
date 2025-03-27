
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';
import { CheckCircle, AlertTriangle } from 'lucide-react';

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
      const userProcessedAccounts = signal.processedAccounts?.filter(account => {
        if (!account.userId) {
          console.warn(`AccountStatusSummary - Processed account ${account.accountId} is missing userId`);
          return false;
        }
        
        return normalizeUserId(account.userId) === normalizedInputUserId;
      }) || [];
      
      const userFailedAccounts = signal.failedAccounts?.filter(account => {
        if (!account.userId) {
          console.warn(`AccountStatusSummary - Failed account ${account.accountId} is missing userId`);
          return false;
        }
        
        return normalizeUserId(account.userId) === normalizedInputUserId;
      }) || [];
      
      setSucceeded(userProcessedAccounts.length);
      setFailed(userFailedAccounts.length);
      setTotal(userProcessedAccounts.length + userFailedAccounts.length);
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing account status:', error);
      setIsLoading(false);
    }
  }, [signal, userId]);
  
  if (isLoading) {
    return <span className="text-sm text-muted-foreground">Loading...</span>;
  }
  
  if (total === 0) {
    return <span className="text-sm text-muted-foreground">Không có tài khoản</span>;
  }
  
  return (
    <div className="flex space-x-2">
      {succeeded > 0 && (
        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {succeeded}
        </Badge>
      )}
      
      {failed > 0 && (
        <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {failed}
        </Badge>
      )}
      
      {succeeded > 0 && failed > 0 && (
        <span className="text-xs text-muted-foreground">
          ({Math.round((succeeded / total) * 100)}% thành công)
        </span>
      )}
    </div>
  );
};

export default AccountStatusSummary;
