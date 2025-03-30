
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Account } from '@/types';
import { TradingAccount } from '../../types/account-types';
import { findOriginalAccount } from '../../utils/account-utils';
import TradingAccountRow from './TradingAccountRow';
import { MoreHorizontal, Link2Off, Trash, RefreshCw } from 'lucide-react';
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

interface TradingAccountsTableProps {
  tradingAccounts: TradingAccount[];
  userId: string;
  cspAccountId: string;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const TradingAccountsTable: React.FC<TradingAccountsTableProps> = ({
  tradingAccounts,
  userId,
  cspAccountId,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<'delete' | 'disconnect' | null>(null);

  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = () => {
    if (!onToggleSelect) return;
    
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    // Nếu đang chọn tất cả và có ít nhất một tài khoản chưa được chọn
    if (newSelectAll) {
      tradingAccounts.forEach((account) => {
        if (!selectedAccounts.includes(account.tradingAccountId)) {
          onToggleSelect(account.tradingAccountId);
        }
      });
    } 
    // Nếu đang bỏ chọn tất cả và có ít nhất một tài khoản đã được chọn
    else {
      tradingAccounts.forEach((account) => {
        if (selectedAccounts.includes(account.tradingAccountId)) {
          onToggleSelect(account.tradingAccountId);
        }
      });
    }
  };

  // Kiểm tra xem đã chọn tất cả chưa
  const areAllSelected = tradingAccounts.length > 0 && tradingAccounts.every(
    account => selectedAccounts.includes(account.tradingAccountId)
  );

  // Kiểm tra xem có chọn một phần không
  const areSomeSelected = selectedAccounts.length > 0 && !areAllSelected;

  // Cập nhật selectAll khi selectedAccounts thay đổi
  React.useEffect(() => {
    setSelectAll(areAllSelected);
  }, [selectedAccounts, areAllSelected]);

  // Xử lý hành động hàng loạt
  const handleBulkAction = (action: 'delete' | 'disconnect') => {
    if (selectedAccounts.length === 0) return;
    
    setDialogAction(action);
    setConfirmDialogOpen(true);
  };

  // Xử lý xác nhận hành động
  const handleConfirmAction = () => {
    if (!dialogAction || selectedAccounts.length === 0) return;
    
    if (dialogAction === 'delete') {
      selectedAccounts.forEach(accountId => {
        onDelete(accountId);
      });
    } else if (dialogAction === 'disconnect') {
      selectedAccounts.forEach(accountId => {
        onToggleConnection(accountId);
      });
    }
    
    setConfirmDialogOpen(false);
    setDialogAction(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {onToggleSelect && selectedAccounts.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">Đã chọn {selectedAccounts.length} tài khoản</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Thao tác
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Thao tác hàng loạt</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBulkAction('disconnect')}>
                  <Link2Off className="h-4 w-4 mr-2" /> Ngắt kết nối
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction('delete')}>
                  <Trash className="h-4 w-4 mr-2" /> Xóa tài khoản
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {(onToggleSelect === undefined || selectedAccounts.length === 0) && (
          <div></div> // Để giữ layout khi không có tài khoản nào được chọn
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {onToggleSelect && (
              <TableHead className="w-10">
                <Checkbox 
                  checked={areAllSelected}
                  className={areSomeSelected ? "bg-primary/50" : ""}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            <TableHead>Account Number</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradingAccounts.map((tradingAccount, tradingIndex) => {
            const originalAccount = findOriginalAccount(
              accounts,
              userId, 
              cspAccountId, 
              tradingAccount.tradingAccountId
            );
            
            return (
              <TradingAccountRow
                key={`trading-${tradingAccount.tradingAccountId}-${tradingIndex}`}
                tradingAccount={tradingAccount}
                userId={userId}
                cspAccountId={cspAccountId}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleConnection={onToggleConnection}
                originalAccount={originalAccount}
                isSelected={selectedAccounts.includes(tradingAccount.tradingAccountId)}
                onToggleSelect={onToggleSelect ? () => onToggleSelect(tradingAccount.tradingAccountId) : undefined}
              />
            );
          })}
        </TableBody>
      </Table>

      {/* Hộp thoại xác nhận hành động */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === 'delete' 
                ? 'Xác nhận xóa tài khoản' 
                : 'Xác nhận ngắt kết nối'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === 'delete'
                ? `Bạn có chắc chắn muốn xóa ${selectedAccounts.length} tài khoản đã chọn không?`
                : `Bạn có chắc chắn muốn ngắt kết nối ${selectedAccounts.length} tài khoản đã chọn không?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {dialogAction === 'delete' ? 'Xóa' : 'Ngắt kết nối'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TradingAccountsTable;
