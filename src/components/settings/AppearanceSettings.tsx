
import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const AppearanceSettings = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  // Ensure the theme value is set correctly when component mounts
  useEffect(() => {
    if (!theme) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    
    // Get readable theme name for toast
    let themeName = value === 'system' 
      ? 'hệ thống'
      : value === 'light' 
        ? 'sáng' 
        : 'tối';
        
    toast({
      title: "Đã thay đổi giao diện",
      description: `Giao diện đã được chuyển sang chế độ ${themeName}.`,
      duration: 3000,
    });
  };

  const handleDensityChange = (checked: boolean) => {
    toast({
      title: "Đã thay đổi mật độ giao diện",
      description: `Giao diện đã được chuyển sang chế độ ${checked ? 'gọn' : 'tiêu chuẩn'}.`,
      duration: 3000,
    });
    // Here you would implement actual density change logic
  };

  const handleAnimationsToggle = (checked: boolean) => {
    toast({
      title: "Đã thay đổi cài đặt hiệu ứng",
      description: `Hiệu ứng đã được ${checked ? 'bật' : 'tắt'}.`,
      duration: 3000,
    });
    // Here you would implement actual animations toggle logic
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Chế độ hiển thị</h3>
          <RadioGroup 
            value={theme || 'system'} 
            onValueChange={handleThemeChange} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer transition-colors dark:border-zinc-700">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
                <Sun className="h-5 w-5 text-amber-500" />
                <span>Sáng</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer transition-colors dark:border-zinc-700">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
                <Moon className="h-5 w-5 text-blue-500" />
                <span>Tối</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer transition-colors dark:border-zinc-700">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex items-center space-x-2 cursor-pointer">
                <Monitor className="h-5 w-5 text-gray-500" />
                <span>Hệ thống</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </Card>

      {/* Layout Density */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Mật độ hiển thị</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Giao diện gọn</p>
              <p className="text-sm text-muted-foreground">Thu nhỏ khoảng cách và kích thước các phần tử.</p>
            </div>
            <Switch onCheckedChange={handleDensityChange} />
          </div>
        </div>
      </Card>

      {/* Animations */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Hiệu ứng</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p>Hiệu ứng chuyển động</p>
              <p className="text-sm text-muted-foreground">Bật/tắt hiệu ứng chuyển động trong ứng dụng.</p>
            </div>
            <Switch defaultChecked onCheckedChange={handleAnimationsToggle} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
