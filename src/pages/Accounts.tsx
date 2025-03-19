
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, User, X } from 'lucide-react';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { toast } from 'sonner';
import { Account } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AccountCard from '@/components/accounts/AccountCard';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: '',
    designation: '',
  });

  const mockAccounts: Account[] = [
    {
      clientId: 'client123',
      secretId: 'secret123',
      accessToken: 'token123',
      ctidTraderAccountId: 'ct123456',
      name: 'Account 1',
      status: 'Connected',
      createdDate: '2023-05-15T10:30:00Z',
      lastUpdated: '2023-06-20T14:45:00Z',
      expireDate: '2024-06-20T14:45:00Z',
    },
    {
      clientId: 'client456',
      secretId: 'secret456',
      accessToken: 'token456',
      ctidTraderAccountId: 'ct789012',
      name: 'Account 2',
      status: 'Disconnected',
      createdDate: '2023-06-10T08:15:00Z',
      lastUpdated: '2023-06-22T11:20:00Z',
      expireDate: '2024-06-22T11:20:00Z',
    },
    {
      clientId: 'client789',
      secretId: 'secret789',
      accessToken: 'token789',
      ctidTraderAccountId: 'ct345678',
      name: 'Account 3',
      status: 'Pending',
      createdDate: '2023-04-22T16:40:00Z',
      lastUpdated: '2023-06-18T09:10:00Z',
      expireDate: '2024-06-18T09:10:00Z',
    }
  ];

  const filteredAccounts = mockAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.ctidTraderAccountId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAccount = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveAccount = () => {
    toast('Tài khoản đã được thêm thành công', {
      description: `Tên: ${newAccount.name}, Email: ${newAccount.designation}`,
    });
    setIsAddDialogOpen(false);
    setNewAccount({ name: '', designation: '' });
  };

  const handleEditAccount = (clientId: string) => {
    toast(`Chỉnh sửa tài khoản ${clientId}`, {
      description: 'Tính năng này sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };

  const handleDeleteAccount = (clientId: string) => {
    toast(`Xóa tài khoản ${clientId}`, {
      description: 'Tính năng này sẽ được triển khai trong phiên bản tiếp theo.',
    });
  };

  const handleReconnect = (clientId: string) => {
    toast(`Kết nối lại tài khoản ${clientId}`, {
      description: 'Đang thử kết nối lại với Coinstrat.pro...',
    });
  };

  return (
    <MainLayout title="Quản Lý Tài Khoản">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm tài khoản..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddAccount}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm Tài Khoản
        </Button>
      </div>

      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.clientId}
              account={account}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
              onReconnect={handleReconnect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Không tìm thấy tài khoản</h3>
          <p className="text-muted-foreground">
            Không tìm thấy tài khoản nào. Vui lòng thử tìm kiếm khác hoặc thêm tài khoản mới.
          </p>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <div className="relative mb-6">
            <div className="absolute right-0 top-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAddDialogOpen(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="w-full flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-medium">Thêm Tài Khoản Mới</DialogTitle>
            </DialogHeader>
          </div>
          
          <div className="space-y-4 px-1">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name Account</Label>
              <Input 
                id="name" 
                placeholder="Enter name account" 
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation" className="text-sm font-medium">Email Account</Label>
              <Input 
                id="designation" 
                placeholder="Enter email account" 
                value={newAccount.designation}
                onChange={(e) => setNewAccount({...newAccount, designation: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={handleSaveAccount} 
              disabled={!newAccount.name || !newAccount.designation}
              className="bg-green-500 hover:bg-green-600"
            >
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Accounts;
