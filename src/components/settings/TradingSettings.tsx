
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const TradingSettings = () => {
  const { toast } = useToast();

  const handleSaveDefaults = () => {
    toast({
      title: "Đã lưu cài đặt giao dịch",
      description: "Các giá trị mặc định giao dịch đã được cập nhật.",
    });
  };

  const handleConfirmationToggle = (checked: boolean) => {
    toast({
      title: "Xác nhận giao dịch",
      description: `Xác nhận trước khi giao dịch đã được ${checked ? 'bật' : 'tắt'}.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Default Trade Values */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Giá trị mặc định</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="default-lot-size">Kích thước lô mặc định</Label>
            <Input 
              id="default-lot-size" 
              type="number" 
              defaultValue="0.01" 
              min="0.01" 
              step="0.01" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Mức chốt lời mặc định (% tài khoản)</Label>
              <span className="text-sm">1.5%</span>
            </div>
            <Slider 
              defaultValue={[1.5]} 
              max={10} 
              step={0.1} 
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Mức cắt lỗ mặc định (% tài khoản)</Label>
              <span className="text-sm">0.5%</span>
            </div>
            <Slider 
              defaultValue={[0.5]} 
              max={10} 
              step={0.1} 
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-open-positions">Số vị thế mở tối đa</Label>
            <Input 
              id="max-open-positions" 
              type="number" 
              defaultValue="5" 
              min="1" 
              max="50" 
            />
          </div>
          
          <Button onClick={handleSaveDefaults}>Lưu cài đặt</Button>
        </div>
      </div>

      {/* Trading Confirmation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Xác nhận giao dịch</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p>Xác nhận trước khi giao dịch</p>
            <p className="text-sm text-muted-foreground">Yêu cầu xác nhận trước khi thực hiện giao dịch.</p>
          </div>
          <Switch defaultChecked onCheckedChange={handleConfirmationToggle} />
        </div>
      </div>

      {/* Risk Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Quản lý rủi ro</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Mức rủi ro tối đa trên mỗi giao dịch (% tài khoản)</Label>
              <span className="text-sm">2%</span>
            </div>
            <Slider 
              defaultValue={[2]} 
              max={10} 
              step={0.5} 
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Mức rủi ro tối đa hằng ngày (% tài khoản)</Label>
              <span className="text-sm">10%</span>
            </div>
            <Slider 
              defaultValue={[10]} 
              max={50} 
              step={1} 
              className="py-4"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Tự động dừng giao dịch khi đạt ngưỡng rủi ro</p>
              <p className="text-sm text-muted-foreground">Tự động dừng bot khi đạt ngưỡng rủi ro đã cài đặt.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSettings;
