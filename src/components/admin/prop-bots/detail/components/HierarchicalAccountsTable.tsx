
import React, { useState } from 'react';
import { Account } from '@/types';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { RefreshCw, MoreHorizontal, Trash2, Power } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AccountsAccordionGroup from './accounts/AccountsAccordionGroup';
import { organizeAccountsHierarchically } from '../utils/account-utils';

interface HierarchicalAccountsTableProps {
  accounts: Account[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onEdit?: (account: Account) => void;
  onDelete?: (accountId: string) => void;
  onToggleConnection?: (accountId: string) => void;
  enableSelection?: boolean;
  onBulkAction?: (actionType: 'connect' | 'disconnect' | 'delete', accountIds: string[]) => void;
  emptyStateMessage?: string;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({
  accounts,
  isLoading = false,
  onRefresh,
  onEdit,
  onDelete,
  onToggleConnection,
  enableSelection = true,
  onBulkAction,
  emptyStateMessage = "Không có tài khoản nào được tìm thấy"
}) => {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isActionConfirmOpen, setIsActionConfirmOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'connect' | 'disconnect' | 'delete' | null>(null);

  // Chuyển đổi danh sách tài khoản phẳng sang cấu trúc phân cấp
  const hierarchicalData = organizeAccountsHierarchically(accounts);

  // Nhóm các tài khoản theo userId
  const userGroups: Record<string, Account[]> = {};
  accounts.forEach(account => {
    if (account.cspUserId) {
      if (!userGroups[account.cspUserId]) {
        userGroups[account.cspUserId] = [];
      }
      userGroups[account.cspUserId].push(account);
    }
  });

  const handleToggleSelect = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const openBulkActionConfirm = (action: 'connect' | 'disconnect' | 'delete') => {
    setBulkAction(action);
    if (action === 'delete') {
      setIsDeleteConfirmOpen(true);
    } else {
      setIsActionConfirmOpen(true);
    }
  };

  const handleConfirmBulkAction = () => {
    if (bulkAction && onBulkAction) {
      onBulkAction(bulkAction, selectedAccounts);
      setSelectedAccounts([]);
    }
    setIsActionConfirmOpen(false);
    setIsDeleteConfirmOpen(false);
  };

  const getBulkActionTitle = () => {
    switch (bulkAction) {
      case 'connect': return 'Kết nối tất cả tài khoản đã chọn';
      case 'disconnect': return 'Ngắt kết nối tất cả tài khoản đã chọn';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Đang tải dữ liệu tài khoản...</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed rounded-md">
        <p className="text-muted-foreground mb-4">{emptyStateMessage}</p>
        {onRefresh && (
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk actions */}
      {enableSelection && selectedAccounts.length > 0 && (
        <div className="bg-muted/80 p-3 rounded flex items-center justify-between sticky top-0 z-10 border">
          <span className="font-medium">{selectedAccounts.length} tài khoản được chọn</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openBulkActionConfirm('connect')}
              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <Power className="h-4 w-4 mr-1" /> Kết nối
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openBulkActionConfirm('disconnect')}
              className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              <Power className="h-4 w-4 mr-1" /> Ngắt kết nối
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openBulkActionConfirm('delete')}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Xóa
            </Button>
          </div>
        </div>
      )}

      {/* Action toolbar */}
      <div className="flex justify-between items-center">
        {/* Left side - can be empty or contain filters */}
        <div></div>
        
        {/* Right side - refresh button */}
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" /> Làm mới
          </Button>
        )}
      </div>

      {/* Hierarchical accounts display */}
      <Accordion type="multiple" className="space-y-2">
        {Object.entries(userGroups).map(([userId, userAccounts]) => (
          <AccountsAccordionGroup
            key={userId}
            userId={userId}
            accounts={userAccounts}
            onEdit={onEdit || (() => {})}
            onDelete={onDelete || (() => {})}
            onToggleConnection={onToggleConnection || (() => {})}
            selectedAccounts={enableSelection ? selectedAccounts : undefined}
            onToggleSelect={enableSelection ? handleToggleSelect : undefined}
          />
        ))}
      </Accordion>

      {/* Confirm action dialog */}
      <Dialog open={isActionConfirmOpen} onOpenChange={setIsActionConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getBulkActionTitle()}</DialogTitle>
            <DialogDescription>
              Hành động này sẽ được áp dụng cho {selectedAccounts.length} tài khoản đã chọn.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionConfirmOpen(false)}>Hủy</Button>
            <Button onClick={handleConfirmBulkAction}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm delete dialog */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa tài khoản đã chọn?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xóa {selectedAccounts.length} tài khoản đã chọn và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmBulkAction} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HierarchicalAccountsTable;
