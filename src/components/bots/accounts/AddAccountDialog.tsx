
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
  botName?: string; // Added botName as optional prop
  onAddAccount: (accountData: any) => void;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onOpenChange,
  botId,
  botName, // Added botName in destructuring
  onAddAccount
}) => {
  const [formData, setFormData] = useState({
    cspAccountName: '',
    apiName: '',
    tradingAccountNumber: '',
    volumeMultiplier: '1.0'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.cspAccountName || !formData.apiName || !formData.tradingAccountNumber) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      setIsSubmitting(false);
      return;
    }
    
    // Generate unique IDs for the new account
    const newAccount = {
      ...formData,
      cspAccountId: `csp-${Date.now()}`,
      tradingAccountId: `trading-${Date.now()}`,
      status: 'Connected',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      isLive: true,
      tradingAccountBalance: '$0.00',
      tradingAccountType: 'HEDGED'
    };
    
    // Call the onAddAccount callback
    onAddAccount(newAccount);
    
    // Reset form and close dialog
    setFormData({
      cspAccountName: '',
      apiName: '',
      tradingAccountNumber: '',
      volumeMultiplier: '1.0'
    });
    setIsSubmitting(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Tài Khoản Mới{botName ? ` vào ${botName}` : ''}</DialogTitle>
          <DialogDescription>
            Thêm tài khoản mới để kết nối với Bot
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cspAccountName" className="text-right">
                Tài khoản CSP
              </Label>
              <Input
                id="cspAccountName"
                name="cspAccountName"
                value={formData.cspAccountName}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Tên tài khoản CSP"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiName" className="text-right">
                API Key
              </Label>
              <Input
                id="apiName"
                name="apiName"
                value={formData.apiName}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Tên API (Binance, Bybit...)"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tradingAccountNumber" className="text-right">
                Tài khoản giao dịch
              </Label>
              <Input
                id="tradingAccountNumber"
                name="tradingAccountNumber"
                value={formData.tradingAccountNumber}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Số tài khoản giao dịch"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="volumeMultiplier" className="text-right">
                Khối lượng giao dịch
              </Label>
              <Input
                id="volumeMultiplier"
                name="volumeMultiplier"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.volumeMultiplier}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Hệ số nhân khối lượng (mặc định: 1.0)"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : 'Thêm tài khoản'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
