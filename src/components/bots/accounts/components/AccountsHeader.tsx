
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';

interface AccountsHeaderProps {
  onAddAccount: () => void;
  onRefresh: () => void;
}

const AccountsHeader: React.FC<AccountsHeaderProps> = ({
  onAddAccount,
  onRefresh
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-medium">Tài khoản CSP</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý tài khoản Coinstrat Pro và tài khoản giao dịch của bạn
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={onAddAccount}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm tài khoản
        </Button>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </Button>
      </div>
    </div>
  );
};

export default AccountsHeader;
