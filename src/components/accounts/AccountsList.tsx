
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Account } from '@/types';
import AccountCard from './AccountCard';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AccountsListProps {
  accounts: Account[];
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string) => void;
  onReconnect: (clientId: string) => void;
  onDisconnect?: (clientId: string) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({
  accounts,
  onEdit,
  onDelete,
  onReconnect,
  onDisconnect
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [accountNameToDelete, setAccountNameToDelete] = useState<string>('');
  
  const handleDeleteClick = (clientId: string, accountName: string) => {
    setAccountToDelete(clientId);
    setAccountNameToDelete(accountName);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (accountToDelete) {
      onDelete(accountToDelete);
    }
    setIsDeleteDialogOpen(false);
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center p-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Không tìm thấy tài khoản</h3>
        <p className="text-muted-foreground">
          Không tìm thấy tài khoản nào. Vui lòng thử tìm kiếm khác hoặc thêm tài khoản mới.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((account) => (
          <AccountCard
            key={account.clientId || account.cspAccountId}
            account={account}
            onEdit={onEdit}
            onDelete={(clientId) => handleDeleteClick(clientId, account.cspAccountName || 'Tài khoản')}
            onReconnect={onReconnect}
          />
        ))}
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản "{accountNameToDelete}"? 
              Thao tác này không thể hoàn tác và sẽ xóa vĩnh viễn tài khoản này khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa tài khoản
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AccountsList;
