
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { toast } from 'sonner';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  botName?: string;
  onAddAccount: (accountData: any) => void;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onOpenChange,
  botId,
  botName = "Bot",
  onAddAccount
}) => {
  const [formData, setFormData] = useState({
    cspAccountName: '',
    apiName: 'CT Pro',
    tradingAccountNumber: '',
    isLive: 'demo',
    tradingAccountType: 'HEDGED'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.cspAccountName) {
      toast.error("Tên tài khoản không được để trống");
      setIsLoading(false);
      return;
    }
    
    if (!formData.tradingAccountNumber) {
      toast.error("Số tài khoản giao dịch không được để trống");
      setIsLoading(false);
      return;
    }
    
    // Simulating API call
    setTimeout(() => {
      const accountData = {
        ...formData,
        botId,
        isLive: formData.isLive === 'live',
        cspAccountId: `CSP-${Math.floor(Math.random() * 10000)}`,
        tradingAccountId: `TA-${Math.floor(Math.random() * 10000)}`,
        status: 'Connected',
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        tradingAccountBalance: '$10,000',
        cspUserId: 'USR-001'
      };
      
      onAddAccount(accountData);
      setIsLoading(false);
      onOpenChange(false);
      
      // Reset form
      setFormData({
        cspAccountName: '',
        apiName: 'CT Pro',
        tradingAccountNumber: '',
        isLive: 'demo',
        tradingAccountType: 'HEDGED'
      });
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm tài khoản cho {botName}</DialogTitle>
          <DialogDescription>
            Thêm tài khoản Coinstrat Pro để kết nối với bot trading
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cspAccountName">Tên tài khoản CSP</Label>
              <Input
                id="cspAccountName"
                name="cspAccountName"
                placeholder="Nhập tên tài khoản CSP"
                value={formData.cspAccountName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiName">API Provider</Label>
              <Select 
                defaultValue={formData.apiName} 
                onValueChange={(value) => handleSelectChange('apiName', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn API Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT Pro">CT Pro</SelectItem>
                  <SelectItem value="MetaTrader">MetaTrader</SelectItem>
                  <SelectItem value="Binance">Binance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tradingAccountNumber">Số tài khoản giao dịch</Label>
              <Input
                id="tradingAccountNumber"
                name="tradingAccountNumber"
                placeholder="Nhập số tài khoản giao dịch"
                value={formData.tradingAccountNumber}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isLive">Loại tài khoản</Label>
                <Select 
                  defaultValue={formData.isLive} 
                  onValueChange={(value) => handleSelectChange('isLive', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tradingAccountType">Kiểu tài khoản</Label>
                <Select 
                  defaultValue={formData.tradingAccountType} 
                  onValueChange={(value) => handleSelectChange('tradingAccountType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kiểu tài khoản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HEDGED">HEDGED</SelectItem>
                    <SelectItem value="NETTED">NETTED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang thêm...' : 'Thêm tài khoản'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
