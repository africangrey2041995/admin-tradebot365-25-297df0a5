
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Pencil, Star, Sparkles, Trophy } from 'lucide-react';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';
import EditableFeaturesCard from '@/components/admin/prop-bots/detail/EditableFeaturesCard';
import EditableStatisticsCard from '@/components/admin/premium-bots/detail/EditableStatisticsCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BotType, BotRiskLevel } from '@/constants/botTypes';
import EditableRiskLevel from '@/components/admin/shared/EditableRiskLevel';

interface PremiumBotOverviewTabProps {
  bot: {
    id: string;
    longDescription: string;
    pairs: string[];
    features: string[];
    type: string;
    exchange: string;
    minCapital: string;
    potentialProfit?: string;
    subscribers: number;
    createdAt: string;
    updatedAt: string;
    isFeatured?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
  };
  statisticsData: { name: string; value: string; icon: React.ReactNode }[];
  onUpdateDescription: (description: string) => void;
  onUpdateTradingPairs: (pairs: string[]) => void;
  onUpdateFeatures: (features: string[]) => void;
  onUpdateStatistics: (stats: { name: string; value: string; icon: React.ReactNode }[]) => void;
  onUpdateBotInfo: (info: { 
    type?: string; 
    exchange?: string; 
    minCapital?: string; 
    potentialProfit?: string;
    risk?: BotRiskLevel;
    isFeatured?: boolean;
    isNew?: boolean;
    isBestSeller?: boolean;
  }) => void;
}

// Định nghĩa schema cho form chỉnh sửa thông tin bot
const botInfoFormSchema = z.object({
  type: z.string(),
  exchange: z.string(),
  minCapital: z.string(),
  potentialProfit: z.string().optional(),
});

const PremiumBotOverviewTab: React.FC<PremiumBotOverviewTabProps> = ({
  bot,
  statisticsData,
  onUpdateDescription,
  onUpdateTradingPairs,
  onUpdateFeatures,
  onUpdateStatistics,
  onUpdateBotInfo
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMarketingDialogOpen, setIsMarketingDialogOpen] = useState(false);

  // Form cho thông tin bot
  const botInfoForm = useForm({
    resolver: zodResolver(botInfoFormSchema),
    defaultValues: {
      type: bot.type || '',
      exchange: bot.exchange || '',
      minCapital: bot.minCapital || '',
      potentialProfit: bot.potentialProfit || '',
    },
  });

  const handleEditButtonClick = () => {
    botInfoForm.reset({
      type: bot.type || '',
      exchange: bot.exchange || '',
      minCapital: bot.minCapital || '',
      potentialProfit: bot.potentialProfit || '',
    });
    setIsEditDialogOpen(true);
  };

  const onBotInfoSubmit = (data: z.infer<typeof botInfoFormSchema>) => {
    onUpdateBotInfo({
      type: data.type,
      exchange: data.exchange,
      minCapital: data.minCapital,
      potentialProfit: data.potentialProfit
    });
    
    setIsEditDialogOpen(false);
    toast.success('Thông tin Bot đã được cập nhật');
  };

  // Handle risk update specific to this component
  const handleRiskUpdate = (newRisk: BotRiskLevel) => {
    onUpdateBotInfo({
      risk: newRisk
    });
  };

  // Handle marketing flags update
  const handleMarketingUpdate = () => {
    setIsMarketingDialogOpen(true);
  };

  const toggleFeatured = () => {
    onUpdateBotInfo({
      isFeatured: !bot.isFeatured
    });
  };

  const toggleNew = () => {
    onUpdateBotInfo({
      isNew: !bot.isNew
    });
  };

  const toggleBestSeller = () => {
    onUpdateBotInfo({
      isBestSeller: !bot.isBestSeller
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <EditableDescriptionCard description={bot.longDescription} onUpdate={onUpdateDescription} />
        
        {/* Trade Statistics */}
        <EditableStatisticsCard 
          statistics={statisticsData} 
          onUpdate={onUpdateStatistics} 
        />
        
        <EditableTradingPairsCard tradingPairs={bot.pairs} onUpdate={onUpdateTradingPairs} />
        
        {/* Features List */}
        {bot.features && <EditableFeaturesCard features={bot.features} onUpdate={onUpdateFeatures} />}
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thông tin Bot</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleEditButtonClick}>
              <Pencil className="h-4 w-4 mr-1" />
              Chỉnh sửa
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại Bot</h3>
              <p>{bot.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sàn giao dịch</h3>
              <p>{bot.exchange}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vốn tối thiểu</h3>
              <p>{bot.minCapital}</p>
            </div>
            {bot.potentialProfit && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lợi nhuận dự kiến</h3>
                <p>{bot.potentialProfit}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mức độ rủi ro</h3>
              <div className="mt-1">
                <EditableRiskLevel 
                  risk={bot.type === BotType.PREMIUM_BOT ? BotRiskLevel.MEDIUM : BotRiskLevel.LOW} 
                  onUpdate={handleRiskUpdate}
                  size="sm"
                  showIcon={false}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Số người đăng ký</h3>
              <p>{bot.subscribers}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</h3>
              <p>{new Date(bot.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</h3>
              <p>{new Date(bot.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Marketing Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Marketing</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleMarketingUpdate}>
              <Pencil className="h-4 w-4 mr-1" />
              Chỉnh sửa
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className={`h-5 w-5 ${bot.isFeatured ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                <span>Bot nổi bật</span>
              </div>
              <Switch checked={bot.isFeatured} onCheckedChange={toggleFeatured} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className={`h-5 w-5 ${bot.isNew ? 'text-blue-500' : 'text-gray-400'}`} />
                <span>Bot mới</span>
              </div>
              <Switch checked={bot.isNew} onCheckedChange={toggleNew} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className={`h-5 w-5 ${bot.isBestSeller ? 'text-emerald-500 fill-emerald-500' : 'text-gray-400'}`} />
                <span>Best Seller</span>
              </div>
              <Switch checked={bot.isBestSeller} onCheckedChange={toggleBestSeller} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Bot Info Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin Bot</DialogTitle>
          </DialogHeader>
          <Form {...botInfoForm}>
            <form onSubmit={botInfoForm.handleSubmit(onBotInfoSubmit)} className="space-y-4">
              <FormField
                control={botInfoForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại Bot</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={botInfoForm.control}
                name="exchange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sàn giao dịch</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={botInfoForm.control}
                name="minCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vốn tối thiểu</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Ví dụ: $500
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={botInfoForm.control}
                name="potentialProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lợi nhuận dự kiến</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Ví dụ: 5-10%/tháng
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">
                  Lưu thay đổi
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Marketing Dialog */}
      <Dialog open={isMarketingDialogOpen} onOpenChange={setIsMarketingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cài đặt marketing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Đánh dấu là Bot nổi bật</Label>
                <p className="text-sm text-gray-500">
                  Hiển thị nhãn "Nổi bật" và ưu tiên trong danh sách
                </p>
              </div>
              <Switch
                id="featured"
                checked={bot.isFeatured}
                onCheckedChange={toggleFeatured}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new">Đánh dấu là Bot mới</Label>
                <p className="text-sm text-gray-500">
                  Hiển thị nhãn "Mới" để thu hút sự chú ý
                </p>
              </div>
              <Switch
                id="new"
                checked={bot.isNew}
                onCheckedChange={toggleNew}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bestSeller">Đánh dấu là Best Seller</Label>
                <p className="text-sm text-gray-500">
                  Hiển thị nhãn "Best Seller" để tăng độ tin cậy
                </p>
              </div>
              <Switch
                id="bestSeller"
                checked={bot.isBestSeller}
                onCheckedChange={toggleBestSeller}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarketingDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumBotOverviewTab;
