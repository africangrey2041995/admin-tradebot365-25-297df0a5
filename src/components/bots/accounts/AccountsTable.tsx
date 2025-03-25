
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3, MoreVertical, Link2, Link2Off } from 'lucide-react';
import { Account } from '@/types';
import { ConnectionStatus } from '@/types/connection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState } from 'react';

interface AccountsTableProps {
  accounts: Account[];
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
  onToggleStatus?: (account: Account) => void;
  isTogglingStatus?: boolean; // Added this property
  isDeletingAccount?: boolean; // Added this property
}

const AccountsTable: React.FC<AccountsTableProps> = ({ 
  accounts,
  onEdit = () => {},
  onDelete = () => {},
  onToggleStatus = () => {},
  isTogglingStatus = false, // Add default value
  isDeletingAccount = false // Add default value
}) => {
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const getStatusBadge = (status: ConnectionStatus) => {
    switch (status) {
      case 'Connected':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Connected</Badge>;
      case 'Disconnected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Disconnected</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatAccountType = (account: Account) => {
    const accountTypeLabel = account.tradingAccountType || 'Unknown';
    const liveStatus = account.isLive ? 'Live' : 'Demo';
    return `${accountTypeLabel} - ${liveStatus}`;
  };

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (accountToDelete) {
      onDelete(accountToDelete);
      setAccountToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Profile</TableHead>
            <TableHead>Api</TableHead>
            <TableHead>Account Trading</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.cspAccountId}>
              <TableCell>
                <div>
                  <div className="font-medium">{account.userAccount || account.cspAccountName}</div>
                  <div className="text-xs text-muted-foreground">{account.cspUserEmail}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{account.apiName}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {account.tradingAccountNumber} | {formatAccountType(account)} | {account.tradingAccountBalance}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(account.status as ConnectionStatus)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        disabled={isTogglingStatus || isDeletingAccount}
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Tùy chọn tài khoản</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(account)} disabled={isTogglingStatus || isDeletingAccount}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      
                      {account.status === 'Connected' ? (
                        <DropdownMenuItem onClick={() => onToggleStatus(account)} disabled={isTogglingStatus}>
                          <Link2Off className="h-4 w-4 mr-2" />
                          {isTogglingStatus ? 'Đang xử lý...' : 'Ngắt kết nối'}
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onToggleStatus(account)} disabled={isTogglingStatus}>
                          <Link2 className="h-4 w-4 mr-2" />
                          {isTogglingStatus ? 'Đang xử lý...' : 'Kết nối lại'}
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600" 
                        onClick={() => handleDeleteClick(account)}
                        disabled={isDeletingAccount}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isDeletingAccount ? 'Đang xóa...' : 'Xóa tài khoản'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản này? Thao tác này không thể hoàn tác và sẽ ngắt kết nối tài khoản khỏi bot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingAccount}>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <>
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Đang xóa...
                </>
              ) : (
                'Xác nhận xóa'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AccountsTable;
