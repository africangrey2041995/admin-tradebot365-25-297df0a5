
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Account } from '@/types';

interface AccountManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account | null;
  onSubmit: (data: any) => void;
  mode: 'add' | 'edit';
}

const AccountManagementDialog: React.FC<AccountManagementDialogProps> = ({
  open,
  onOpenChange,
  account,
  onSubmit,
  mode
}) => {
  const [formData, setFormData] = useState({
    cspAccountName: account?.cspAccountName || '',
    cspUserEmail: account?.cspUserEmail || '',
    apiName: account?.apiName || '',
    tradingAccountType: account?.tradingAccountType || 'Standard',
    tradingAccountNumber: account?.tradingAccountNumber || '',
    tradingAccountBalance: account?.tradingAccountBalance || '$0.00',
    isLive: account?.isLive || false,
    status: account?.status || 'Connected'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cspAccountName.trim()) {
      toast.error("Vui lòng nhập tên tài khoản");
      return;
    }
    
    if (!formData.cspUserEmail.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    
    onSubmit({
      ...formData,
      cspAccountId: account?.cspAccountId || Math.random().toString(36).substring(2, 15)
    });
    
    onOpenChange(false);
    toast.success(mode === 'add' 
      ? "Đã thêm tài khoản mới thành công" 
      : "Đã cập nhật tài khoản thành công"
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Thêm tài khoản mới' : 'Chỉnh sửa tài khoản'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Nhập thông tin chi tiết để kết nối tài khoản mới với bot này.'
              : 'Chỉnh sửa thông tin tài khoản kết nối.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cspAccountName" className="col-span-4">
                Tên tài khoản
              </Label>
              <Input
                id="cspAccountName"
                name="cspAccountName"
                className="col-span-4"
                value={formData.cspAccountName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cspUserEmail" className="col-span-4">
                Email
              </Label>
              <Input
                id="cspUserEmail"
                name="cspUserEmail"
                className="col-span-4"
                value={formData.cspUserEmail}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="apiName" className="col-span-4">
                API
              </Label>
              <Input
                id="apiName"
                name="apiName"
                className="col-span-4"
                value={formData.apiName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="tradingAccountNumber" className="col-span-4">
                Số tài khoản giao dịch
              </Label>
              <Input
                id="tradingAccountNumber"
                name="tradingAccountNumber"
                className="col-span-4"
                value={formData.tradingAccountNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="tradingAccountType" className="col-span-4">
                Loại tài khoản
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.tradingAccountType}
                  onValueChange={(value) => handleSelectChange('tradingAccountType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="tradingAccountBalance" className="col-span-4">
                Số dư tài khoản
              </Label>
              <Input
                id="tradingAccountBalance"
                name="tradingAccountBalance"
                className="col-span-4"
                value={formData.tradingAccountBalance}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="status" className="col-span-4">
                Trạng thái
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Connected">Đã kết nối</SelectItem>
                    <SelectItem value="Disconnected">Ngắt kết nối</SelectItem>
                    <SelectItem value="Pending">Đang xử lý</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isLive" 
                checked={formData.isLive}
                onCheckedChange={(checked) => handleSwitchChange('isLive', checked)}
              />
              <Label htmlFor="isLive">Tài khoản thật (Live)</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Thêm tài khoản' : 'Lưu thay đổi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountManagementDialog;
