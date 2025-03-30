
import React, { useState } from 'react';
import { Account } from '@/types';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { RefreshCw, MoreHorizontal, Trash, Link2Off } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import AccountsAccordionGroup from './accounts/AccountsAccordionGroup';

interface HierarchicalAccountsTableProps {
  accounts: Account[];
  onRefresh: () => void;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({
  accounts,
  onRefresh,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<'delete' | 'disconnect' | null>(null);

  // Nhóm tài khoản theo người dùng
  const groupedAccounts = accounts.reduce((groupedAcc, account) => {
    const userId = account.userId || 'unknown';
    if (!groupedAcc[userId]) {
      groupedAcc[userId] = [];
    }
    groupedAcc[userId].push(account);
    return groupedAcc;
  }, {} as Record<string, Account[]>);

  const handleRefresh = () => {
    setLoading(true);
    onRefresh();
    
    // Giả lập thời gian tải
    setTimeout(() => {
      setLoading(false);
      toast.success('Dữ liệu tài khoản đã được làm mới');
    }, 1000);
  };

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
      toast.success(`Đã xóa ${selectedAccounts.length} tài khoản`);
    } else if (dialogAction === 'disconnect') {
      selectedAccounts.forEach(accountId => {
        onToggleConnection(accountId);
      });
      toast.success(`Đã ngắt kết nối ${selectedAccounts.length} tài khoản`);
    }
    
    setConfirmDialogOpen(false);
    setDialogAction(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {onToggleSelect && selectedAccounts.length > 0 && (
            <>
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
            </>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Làm mới
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedAccounts).map(([userId, userAccounts]) => (
          <AccountsAccordionGroup
            key={userId}
            userId={userId}
            accounts={userAccounts}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleConnection={onToggleConnection}
            selectedAccounts={selectedAccounts}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </Accordion>

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
    </div>
  );
};

export default HierarchicalAccountsTable;
