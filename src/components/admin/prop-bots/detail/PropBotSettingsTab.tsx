
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { toast } from 'sonner';
import { Loader2, Star, Sparkles, Trophy } from 'lucide-react';

interface PropBotSettingsTabProps {
  botId: string;
  initialData: {
    name: string;
    description: string;
    exchange?: string;
    propFirm?: string;
    risk: BotRiskLevel;
    status: BotStatus;
    isPromoted: boolean;
    isArchived: boolean;
    adminNotes?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
  };
}

const PropBotSettingsTab: React.FC<PropBotSettingsTabProps> = ({ 
  botId,
  initialData 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    if (!value || value.trim() === '') return; // Prevent empty string values
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Đã lưu cài đặt Bot thành công');
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Cập nhật thông tin cơ bản của Prop Trading Bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên Bot</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="exchange">Sàn giao dịch</Label>
                <Input
                  id="exchange"
                  name="exchange"
                  value={formData.exchange || ''}
                  onChange={handleInputChange}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propFirm">Prop Firm</Label>
                <Input
                  id="propFirm"
                  name="propFirm"
                  value={formData.propFirm || ''}
                  onChange={handleInputChange}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle>Trạng thái & Cấu hình</CardTitle>
            <CardDescription>Quản lý trạng thái và cấu hình của Bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BotStatus.ACTIVE}>Hoạt động</SelectItem>
                  <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
                  <SelectItem value={BotStatus.MAINTENANCE}>Bảo trì</SelectItem>
                  <SelectItem value={BotStatus.ERROR}>Lỗi</SelectItem>
                  <SelectItem value={BotStatus.SUSPENDED}>Đã khóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="risk">Mức độ rủi ro</Label>
              <Select 
                value={formData.risk} 
                onValueChange={(value) => handleSelectChange('risk', value)}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Chọn mức độ rủi ro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BotRiskLevel.LOW}>Thấp</SelectItem>
                  <SelectItem value={BotRiskLevel.MEDIUM}>Trung bình</SelectItem>
                  <SelectItem value={BotRiskLevel.HIGH}>Cao</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPromoted">Đề xuất</Label>
                  <p className="text-sm text-gray-400">Hiển thị bot này trong phần đề xuất</p>
                </div>
                <Switch
                  id="isPromoted"
                  checked={formData.isPromoted}
                  onCheckedChange={(checked) => handleSwitchChange('isPromoted', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isArchived">Lưu trữ</Label>
                  <p className="text-sm text-gray-400">Ẩn bot này khỏi danh sách chính</p>
                </div>
                <Switch
                  id="isArchived"
                  checked={formData.isArchived}
                  onCheckedChange={(checked) => handleSwitchChange('isArchived', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle>Cài đặt Tags</CardTitle>
            <CardDescription>Quản lý các tag của Bot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-amber-500" fill={formData.isFeatured ? "currentColor" : "none"} />
                <div>
                  <Label>Nổi Bật</Label>
                  <p className="text-sm text-gray-400">Đánh dấu bot như một lựa chọn nổi bật</p>
                </div>
              </div>
              <Switch
                checked={formData.isFeatured || false}
                onCheckedChange={(checked) => handleSwitchChange('isFeatured', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                <div>
                  <Label>Mới</Label>
                  <p className="text-sm text-gray-400">Đánh dấu bot là mới ra mắt</p>
                </div>
              </div>
              <Switch
                checked={formData.isNew || false}
                onCheckedChange={(checked) => handleSwitchChange('isNew', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-emerald-500" fill={formData.isBestSeller ? "currentColor" : "none"} />
                <div>
                  <Label>Bán Chạy</Label>
                  <p className="text-sm text-gray-400">Đánh dấu bot là sản phẩm bán chạy</p>
                </div>
              </div>
              <Switch
                checked={formData.isBestSeller || false}
                onCheckedChange={(checked) => handleSwitchChange('isBestSeller', checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle>Ghi chú của Admin</CardTitle>
            <CardDescription>Thêm ghi chú nội bộ dành cho admin</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="adminNotes"
              name="adminNotes"
              value={formData.adminNotes || ''}
              onChange={handleInputChange}
              rows={4}
              placeholder="Nhập ghi chú nội bộ cho admin khác..."
              className="bg-gray-900 border-gray-700"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Lưu cài đặt
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default PropBotSettingsTab;
