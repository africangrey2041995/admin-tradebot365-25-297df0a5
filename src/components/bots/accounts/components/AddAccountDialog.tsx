
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAccount: (data: any) => void;
  isSubmitting?: boolean;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onOpenChange,
  onAddAccount,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    cspAccountName: '',
    apiName: '',
    tradingAccountId: '',
    volumeMultiplier: '1.0'
  });

  // Mock data for selects
  const mockCspAccounts = [
    { id: 'csp1', name: 'CSP Account 1' },
    { id: 'csp2', name: 'CSP Account 2' },
  ];

  const mockApiKeys = [
    { id: 'api1', name: 'API Key 1', cspId: 'csp1' },
    { id: 'api2', name: 'API Key 2', cspId: 'csp1' },
    { id: 'api3', name: 'API Key 3', cspId: 'csp2' },
  ];

  const mockTradingAccounts = [
    { id: 'ta1', number: '40819726', apiId: 'api1' },
    { id: 'ta2', number: '40819727', apiId: 'api2' },
    { id: 'ta3', number: '40819728', apiId: 'api3' },
  ];

  const volumeOptions = [
    { value: '0.5', label: '0.5x' },
    { value: '1.0', label: '1.0x' },
    { value: '2.0', label: '2.0x' },
    { value: '3.0', label: '3.0x' },
    { value: '5.0', label: '5.0x' },
    { value: '10.0', label: '10.0x' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredApiKeys = formData.cspAccountName 
    ? mockApiKeys.filter(api => api.cspId === formData.cspAccountName) 
    : [];
    
  const filteredTradingAccounts = formData.apiName 
    ? mockTradingAccounts.filter(account => account.apiId === formData.apiName) 
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cspAccountName.trim()) {
      toast.error("Vui lòng chọn tài khoản người dùng");
      return;
    }
    
    if (!formData.apiName.trim()) {
      toast.error("Vui lòng chọn API Key");
      return;
    }
    
    if (!formData.tradingAccountId.trim()) {
      toast.error("Vui lòng chọn tài khoản giao dịch");
      return;
    }
    
    const cspAccount = mockCspAccounts.find(acc => acc.id === formData.cspAccountName);
    const apiKey = mockApiKeys.find(api => api.id === formData.apiName);
    const tradingAccount = mockTradingAccounts.find(acc => acc.id === formData.tradingAccountId);
    
    // Create a complete account object
    const newAccount = {
      cspAccountId: formData.cspAccountName,
      cspAccountName: cspAccount?.name || '',
      apiName: apiKey?.name || '',
      apiId: formData.apiName,
      tradingAccountId: formData.tradingAccountId,
      tradingAccountNumber: tradingAccount?.number || '',
      tradingAccountType: 'HEDGED',
      tradingAccountBalance: '$1000',
      status: 'Connected',
      isLive: false,
      volumeMultiplier: formData.volumeMultiplier,
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    onAddAccount(newAccount);
    
    // Reset form and close dialog
    setFormData({
      cspAccountName: '',
      apiName: '',
      tradingAccountId: '',
      volumeMultiplier: '1.0'
    });
    
    onOpenChange(false);
    toast.success("Tài khoản đã được thêm thành công");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm Tài Khoản Mới</DialogTitle>
          <DialogDescription>
            Kết nối tài khoản Coinstrat Pro với tài khoản giao dịch của bạn
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="cspAccountName" className="col-span-4">
                Tài khoản người dùng (CSP Account)
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.cspAccountName}
                  onValueChange={(value) => {
                    handleSelectChange('cspAccountName', value);
                    // Reset dependent fields
                    handleSelectChange('apiName', '');
                    handleSelectChange('tradingAccountId', '');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài khoản CSP" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCspAccounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="apiName" className="col-span-4">
                API Key
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.apiName}
                  onValueChange={(value) => {
                    handleSelectChange('apiName', value);
                    // Reset dependent trading account
                    handleSelectChange('tradingAccountId', '');
                  }}
                  disabled={!formData.cspAccountName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn API Key" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredApiKeys.map(api => (
                      <SelectItem key={api.id} value={api.id}>
                        {api.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="tradingAccountId" className="col-span-4">
                Tài khoản Giao Dịch
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.tradingAccountId}
                  onValueChange={(value) => handleSelectChange('tradingAccountId', value)}
                  disabled={!formData.apiName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài khoản giao dịch" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTradingAccounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="volumeMultiplier" className="col-span-4">
                Khối lượng Giao Dịch
              </Label>
              <div className="col-span-4">
                <Select 
                  value={formData.volumeMultiplier}
                  onValueChange={(value) => handleSelectChange('volumeMultiplier', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn hệ số khối lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    {volumeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="mr-2">
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                </span>
              ) : null}
              Thêm tài khoản
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
