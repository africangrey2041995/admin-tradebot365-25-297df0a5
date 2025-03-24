
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

interface AccountsHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddAccount: () => void;
}

const AccountsHeader: React.FC<AccountsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAddAccount
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm kiếm tài khoản..." 
          className="pl-10"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button onClick={onAddAccount}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Thêm Tài Khoản
      </Button>
    </div>
  );
};

export default AccountsHeader;
