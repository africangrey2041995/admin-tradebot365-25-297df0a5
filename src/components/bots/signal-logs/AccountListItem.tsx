
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AccountSignalStatus } from '@/types/signal';
import FormatDateTime from './FormatDateTime';
import { Button } from '@/components/ui/button';
import { Eye, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { truncateString } from '@/utils/commonUtils';

interface AccountListItemProps {
  account: AccountSignalStatus;
  type: 'success' | 'failed';
}

const AccountListItem: React.FC<AccountListItemProps> = ({ account, type }) => {
  const isSuccess = type === 'success';
  const bgColorClass = isSuccess ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100';
  const { toast } = useToast();
  
  const handleCopyId = () => {
    navigator.clipboard.writeText(account.accountId);
    toast({
      title: "ID Copied",
      description: "Account ID has been copied to clipboard",
      duration: 2000,
    });
  };
  
  const handleViewDetails = () => {
    // In a real implementation, this would open a detailed view
    // For now we'll just show a toast with some account info
    toast({
      title: "Account Details",
      description: `Viewing details for ${account.name} (${truncateString(account.accountId, 8)})`,
      duration: 3000,
    });
  };
  
  return (
    <div className={`${bgColorClass} border p-3 rounded-md`}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <h4 className="text-xs text-muted-foreground">Account Name</h4>
          <p className="text-sm font-medium">{account.name}</p>
        </div>
        <div>
          <h4 className="text-xs text-muted-foreground">Account ID</h4>
          <p className="text-sm font-medium">{account.accountId}</p>
        </div>
        <div>
          <h4 className="text-xs text-muted-foreground">Processing Time</h4>
          <p className="text-sm font-medium">
            <FormatDateTime 
              timestamp={account.timestamp} 
              options={{
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }}
            />
          </p>
        </div>
        <div>
          <h4 className="text-xs text-muted-foreground">Status</h4>
          <Badge 
            variant="outline" 
            className={isSuccess 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 mt-1"
              : "bg-red-50 text-red-700 border-red-200 mt-1"
            }
          >
            {isSuccess ? 'Success' : 'Failed'}
          </Badge>
        </div>
      </div>
      
      {!isSuccess && account.reason && (
        <div className="mt-2">
          <h4 className="text-xs text-muted-foreground">Error Reason</h4>
          <p className="text-sm text-red-600 mt-1">{account.reason}</p>
        </div>
      )}
      
      {!isSuccess && account.errorCode && (
        <div className="mt-2">
          <h4 className="text-xs text-muted-foreground">Error Code</h4>
          <p className="text-sm text-red-600 mt-1">{account.errorCode}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-3 flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8"
          onClick={handleViewDetails}
        >
          <Eye className="h-3 w-3 mr-1" /> View Details
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-8"
          onClick={handleCopyId}
        >
          <Copy className="h-3 w-3 mr-1" /> Copy ID
        </Button>
      </div>
    </div>
  );
};

export default AccountListItem;
