
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();

  const handleToggleChange = (type: string, checked: boolean) => {
    toast({
      title: `Đã ${checked ? 'bật' : 'tắt'} thông báo ${type}`,
      description: `Bạn sẽ ${checked ? 'nhận được' : 'không nhận được'} thông báo ${type}.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* App Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Thông báo ứng dụng</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Thông báo giao dịch</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi có giao dịch mới.</p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => handleToggleChange('giao dịch', checked)} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Cảnh báo giá</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi giá đạt đến ngưỡng đã thiết lập.</p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => handleToggleChange('cảnh báo giá', checked)} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Báo cáo hiệu suất</p>
              <p className="text-sm text-muted-foreground">Nhận báo cáo hiệu suất giao dịch định kỳ.</p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => handleToggleChange('báo cáo hiệu suất', checked)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Cập nhật hệ thống</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi có cập nhật mới.</p>
            </div>
            <Switch defaultChecked onCheckedChange={(checked) => handleToggleChange('cập nhật hệ thống', checked)} />
          </div>
        </div>
      </div>

      {/* Email Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Thông báo email</h3>
        
        <RadioGroup defaultValue="important" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Tất cả thông báo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="important" id="important" />
            <Label htmlFor="important">Chỉ thông báo quan trọng</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">Không gửi email</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Thông báo đẩy</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p>Cho phép thông báo đẩy</p>
            <p className="text-sm text-muted-foreground">Bật thông báo đẩy qua trình duyệt.</p>
          </div>
          <Switch onCheckedChange={(checked) => handleToggleChange('đẩy', checked)} />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
