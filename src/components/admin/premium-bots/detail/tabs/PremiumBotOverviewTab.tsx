import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';
import EditableFeaturesCard from '@/components/admin/prop-bots/detail/EditableFeaturesCard';
import EditableStatisticsCard from '@/components/admin/premium-bots/detail/EditableStatisticsCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    subscribers: number;
    createdAt: string;
    updatedAt: string;
  };
  statisticsData: { name: string; value: string; icon: React.ReactNode }[];
  onUpdateDescription: (description: string) => void;
  onUpdateTradingPairs: (pairs: string[]) => void;
  onUpdateFeatures: (features: string[]) => void;
  onUpdateStatistics: (stats: { name: string; value: string; icon: React.ReactNode }[]) => void;
  onUpdateBotInfo: (info: { type?: string; exchange?: string; minCapital?: string; risk?: BotRiskLevel }) => void;
}

// Định nghĩa schema cho form chỉnh sửa thông tin bot
const botInfoFormSchema = z.object({
  type: z.string(),
  exchange: z.string(),
  minCapital: z.string(),
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

  // Form cho thông tin bot
  const botInfoForm = useForm({
    resolver: zodResolver(botInfoFormSchema),
    defaultValues: {
      type: bot.type || '',
      exchange: bot.exchange || '',
      minCapital: bot.minCapital || '',
    },
  });

  const handleEditButtonClick = () => {
    botInfoForm.reset({
      type: bot.type || '',
      exchange: bot.exchange || '',
      minCapital: bot.minCapital || '',
    });
    setIsEditDialogOpen(true);
  };

  const onBotInfoSubmit = (data: z.infer<typeof botInfoFormSchema>) => {
    onUpdateBotInfo({
      type: data.type,
      exchange: data.exchange,
      minCapital: data.minCapital
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
        
        {/* Bot Integration Info removed */}
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
    </div>
  );
};

export default PremiumBotOverviewTab;
