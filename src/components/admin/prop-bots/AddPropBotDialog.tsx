import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Star, Sparkles, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ADMIN_API } from '@/constants/apiEndpoints';
import { BotStatus, BotRiskLevel, BotType } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên bot phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  exchange: z.string().min(1, {
    message: "Sàn giao dịch là bắt buộc",
  }),
  risk: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['active', 'inactive', 'maintenance', 'error', 'suspended']).default('inactive'),
  createdDate: z.date().optional(),
  performanceLastMonth: z.string().regex(/^[+-]?\d+(\.\d+)?%$/, {
    message: "Định dạng phải là +/-XX.XX%",
  }).optional(),
  performanceAllTime: z.string().regex(/^[+-]?\d+(\.\d+)?%$/, {
    message: "Định dạng phải là +/-XX.XX%",
  }).optional(),
  minCapital: z.string().optional(),
  maxDrawdown: z.string().optional(),
  propFirm: z.string().optional(),
  challengeDuration: z.string().optional(),
  accountSizes: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(true),
  isBestSeller: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPropBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (newBot: PropBot) => void;
}

const AddPropBotDialog: React.FC<AddPropBotDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const defaultValues: Partial<FormValues> = {
    name: '',
    description: '',
    exchange: '',
    risk: 'medium',
    status: 'inactive',
    createdDate: new Date(),
    performanceLastMonth: '+0.0%',
    performanceAllTime: '+0.0%',
    minCapital: '$500',
    maxDrawdown: '5%',
    propFirm: '',
    challengeDuration: '30 ngày',
    accountSizes: '$5,000, $10,000, $25,000',
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const riskLevel = data.risk === 'low' 
        ? BotRiskLevel.LOW 
        : data.risk === 'high' 
          ? BotRiskLevel.HIGH 
          : BotRiskLevel.MEDIUM;

      const randomId = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      const propBotData: PropBot = {
        botId: `PROP-${randomId}`,
        type: BotType.PROP_BOT,
        createdDate: format(data.createdDate || new Date(), 'yyyy-MM-dd'),
        lastUpdated: format(new Date(), 'yyyy-MM-dd'),
        users: 0,
        profit: data.performanceAllTime || '+0.0%',
        performanceLastMonth: data.performanceLastMonth || '+0.0%',
        performanceAllTime: data.performanceAllTime || '+0.0%',
        minCapital: data.minCapital || '$500',
        name: data.name,
        description: data.description || '',
        status: (data.status as BotStatus) || BotStatus.INACTIVE,
        risk: riskLevel,
        accountSizes: data.accountSizes ? data.accountSizes.split(',').map(size => size.trim()) : [],
        propFirm: data.propFirm,
        challengeDuration: data.challengeDuration,
        exchange: data.exchange,
        isFeatured: data.isFeatured,
        isNew: data.isNew,
        isBestSeller: data.isBestSeller,
      };

      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Tạo Prop Bot thành công",
        description: `Prop Trading Bot "${data.name}" đã được tạo thành công.`,
      });

      form.reset(defaultValues);
      onOpenChange(false);
      onSuccess(propBotData);
    } catch (error) {
      console.error('Error creating Prop Bot:', error);
      toast({
        title: "Lỗi khi tạo Prop Bot",
        description: "Đã xảy ra lỗi khi tạo Prop Trading Bot. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Thêm Prop Trading Bot mới</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Điền thông tin để tạo một Prop Trading Bot mới trong hệ thống.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt nâng cao</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên Bot</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nhập tên Prop Trading Bot" 
                          {...field}
                          className="bg-zinc-800 border-zinc-700" 
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-500">
                        Tên hiển thị của Prop Trading Bot
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả chi tiết về Prop Trading Bot" 
                          {...field}
                          className="bg-zinc-800 border-zinc-700 min-h-[100px]" 
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-500">
                        Mô tả chức năng và đặc điểm của bot
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="exchange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sàn giao dịch</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue placeholder="Chọn sàn giao dịch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="Coinstrat Pro">Coinstrat Pro</SelectItem>
                            <SelectItem value="FTMO">FTMO</SelectItem>
                            <SelectItem value="FundedNext">FundedNext</SelectItem>
                            <SelectItem value="PropheticTrader">Prophetic Trader</SelectItem>
                            <SelectItem value="CityTrader">City Trader</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trạng thái</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="active">Hoạt động</SelectItem>
                            <SelectItem value="inactive">Không hoạt động</SelectItem>
                            <SelectItem value="maintenance">Bảo trì</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="risk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mức độ rủi ro</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                              <SelectValue placeholder="Chọn mức độ rủi ro" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-800 border-zinc-700">
                            <SelectItem value="low">Thấp</SelectItem>
                            <SelectItem value="medium">Trung bình</SelectItem>
                            <SelectItem value="high">Cao</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="createdDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ngày tạo</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal bg-zinc-800 border-zinc-700",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="performanceLastMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hiệu suất tháng gần nhất</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+12.5%" 
                            {...field}
                            className="bg-zinc-800 border-zinc-700" 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Định dạng: +/-XX.XX% (ví dụ: +12.5%)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="performanceAllTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hiệu suất tổng thể</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+45.8%" 
                            {...field}
                            className="bg-zinc-800 border-zinc-700" 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Định dạng: +/-XX.XX% (ví dụ: +45.8%)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minCapital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vốn tối thiểu</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="$500" 
                            {...field}
                            className="bg-zinc-800 border-zinc-700" 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Vốn tối thiểu để tham gia (ví dụ: $500)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxDrawdown"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drawdown tối đa</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="5%" 
                            {...field}
                            className="bg-zinc-800 border-zinc-700" 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Mức drawdown tối đa cho phép (ví dụ: 5%)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <FormField
                  control={form.control}
                  name="propFirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prop Firm liên kết</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tên Prop Firm liên kết" 
                          {...field}
                          className="bg-zinc-800 border-zinc-700" 
                        />
                      </FormControl>
                      <FormDescription className="text-zinc-500">
                        Tên công ty Prop Trading liên kết với bot này
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="challengeDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời gian Challenge</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="30 ngày" 
                            {...field}
                            className="bg-zinc-800 border-zinc-700" 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-500">
                          Thời gian thử thách (ví dụ: 30 ngày)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="marketing" className="space-y-4">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start justify-between space-y-0 rounded-md border border-zinc-700 p-4">
                      <div className="space-y-0.5 flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                        <div>
                          <FormLabel>Đánh dấu là Bot nổi bật</FormLabel>
                          <FormDescription className="text-zinc-500">
                            Hiển thị nhãn "Nổi bật" và ưu tiên trong danh sách
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start justify-between space-y-0 rounded-md border border-zinc-700 p-4">
                      <div className="space-y-0.5 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                        <div>
                          <FormLabel>Đánh dấu là Bot mới</FormLabel>
                          <FormDescription className="text-zinc-500">
                            Hiển thị nhãn "Mới" để thu hút sự chú ý
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isBestSeller"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start justify-between space-y-0 rounded-md border border-zinc-700 p-4">
                      <div className="space-y-0.5 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-emerald-500 fill-emerald-500" />
                        <div>
                          <FormLabel>Đánh dấu là Best Seller</FormLabel>
                          <FormDescription className="text-zinc-500">
                            Hiển thị nhãn "Best Seller" để tăng độ tin cậy
                          </FormDescription>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => onOpenChange(false)}
                className="border-zinc-700 text-zinc-400"
              >
                Hủy
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang tạo...' : 'Tạo Bot'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropBotDialog;
