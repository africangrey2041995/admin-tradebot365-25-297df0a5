
import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId } from '@/utils/normalizeUserId';

interface AccountStatusSummaryProps {
  signal: CoinstratSignal;
  userId: string;
}

const AccountStatusSummary: React.FC<AccountStatusSummaryProps> = ({ signal, userId }) => {
  const [succeeded, setSucceeded] = useState(0);
  const [failed, setFailed] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Use the centralized normalizeUserId utility for consistent userId handling
      const normalizedInputUserId = normalizeUserId(userId);
      
      // Filter accounts with normalized comparison
      const userProcessedAccounts = signal.processedAccounts.filter(account => 
        normalizeUserId(account.userId) === normalizedInputUserId
      );
      
      const userFailedAccounts = signal.failedAccounts.filter(account => 
        normalizeUserId(account.userId) === normalizedInputUserId
      );
      
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
