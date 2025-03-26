import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner';
import { Account } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface BotAccountsTableProps {
  botId: string;
  userId: string;
  initialData?: Account[];
  showAddButton?: boolean;
}

const BotAccountsTable: React.FC<BotAccountsTableProps> = ({
  botId,
  userId,
  initialData,
  showAddButton = true
}) => {
  const [data, setData] = useState<Account[]>(initialData || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate fetching data from an API
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real implementation, you would fetch the latest data here
      toast.success("Accounts refreshed successfully!");
    } catch (e: any) {
      setError(e.message || "Failed to refresh accounts");
      toast.error(e.message || "Failed to refresh accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsAddDialogOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(true);
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccountToDelete(accountId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeleteDialogOpen(false);
    setLoading(true);
    try {
      // Simulate deleting an account
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(prevData => prevData.filter(account => account.cspAccountId !== accountToDelete));
      toast.success("Account deleted successfully!");
    } catch (e: any) {
      setError(e.message || "Failed to delete account");
      toast.error(e.message || "Failed to delete account");
    } finally {
      setLoading(false);
      setAccountToDelete(null);
    }
  };

  const handleToggleConnection = async (accountId: string) => {
    setLoading(true);
    try {
      // Simulate toggling the connection status
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(prevData =>
        prevData.map(account =>
          account.cspAccountId === accountId ? { ...account, status: account.status === 'Connected' ? 'Disconnected' : 'Connected' } : account
        )
      );
      toast.success("Account connection toggled successfully!");
    } catch (e: any) {
      setError(e.message || "Failed to toggle connection");
      toast.error(e.message || "Failed to toggle connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Danh sách tài khoản kết nối với bot này.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tên tài khoản</TableHead>
            <TableHead>Sàn giao dịch</TableHead>
            <TableHead>Số tài khoản</TableHead>
            <TableHead>Loại tài khoản</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((account) => (
            <TableRow key={account.cspAccountId}>
              <TableCell className="font-medium">{account.cspAccountName}</TableCell>
              <TableCell>{account.apiName}</TableCell>
              <TableCell>{account.tradingAccountNumber}</TableCell>
              <TableCell>{account.tradingAccountType}</TableCell>
              <TableCell>
                {account.status === 'Connected' ? (
                  <Badge variant="outline">Đã kết nối</Badge>
                ) : (
                  <Badge className="bg-red-500 text-white">Ngắt kết nối</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEditAccount(account)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.cspAccountId)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Switch
                  id={`account-connection-${account.cspAccountId}`}
                  checked={account.status === 'Connected'}
                  onCheckedChange={() => handleToggleConnection(account.cspAccountId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {showAddButton && (
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAddAccount} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Thêm tài khoản
          </Button>
        </div>
      )}
      
      {/* Add Account Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-lg font-bold mb-4">Thêm tài khoản</h2>
              {/* Form fields go here */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="account-name">Tên tài khoản</Label>
                <Input id="account-name" placeholder="Ví dụ: Binance #1" />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button>Thêm</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Account Dialog */}
      {isEditDialogOpen && selectedAccount && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-lg font-bold mb-4">Sửa tài khoản</h2>
              {/* Form fields go here, pre-filled with selectedAccount data */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="account-name">Tên tài khoản</Label>
                <Input id="account-name" defaultValue={selectedAccount.cspAccountName} />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button>Lưu</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa tài khoản này?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAccount}>
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BotAccountsTable;
