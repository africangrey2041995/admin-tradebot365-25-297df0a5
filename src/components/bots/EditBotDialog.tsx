
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Bot, Terminal, Server, Cpu, CircuitBoard, Gem, X } from 'lucide-react';
import { toast } from 'sonner';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BotCardProps } from '@/components/bots/BotCard';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Tên bot phải có ít nhất 2 ký tự.',
  }).max(50, {
    message: 'Tên bot không được vượt quá 50 ký tự.',
  }),
  subtitle: z.string().max(150, {
    message: 'Mô tả không được vượt quá 150 ký tự.',
  }).optional(),
  colorScheme: z.enum(['default', 'red', 'blue', 'green', 'purple']),
  icon: z.string(),
  exchange: z.string({
    required_error: "Vui lòng chọn sàn giao dịch",
  }),
  botForm: z.string({
    required_error: "Vui lòng chọn loại bot",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditBotDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bot: BotCardProps | null;
  onSave: (updatedBot: Partial<BotCardProps>) => void;
}

const botIcons = [
  { icon: <Bot className="h-5 w-5" />, value: 'bot' },
  { icon: <Cpu className="h-5 w-5" />, value: 'cpu' },
  { icon: <Server className="h-5 w-5" />, value: 'server' },
  { icon: <Terminal className="h-5 w-5" />, value: 'terminal' },
  { icon: <CircuitBoard className="h-5 w-5" />, value: 'circuit' },
  { icon: <Gem className="h-5 w-5" />, value: 'gem' },
];

const exchanges = [
  { 
    name: 'Binance', 
    value: 'binance', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'Coinbase', 
    value: 'coinbase', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'Kraken', 
    value: 'kraken', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'Bybit', 
    value: 'bybit', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'KuCoin', 
    value: 'kucoin', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'OKX', 
    value: 'okx', 
    disabled: true, 
    logo: null 
  },
  { 
    name: 'Coinstart Pro', 
    value: 'coinstart_pro', 
    disabled: false, 
    logo: (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
        <img 
          src="/lovable-uploads/8107dc0b-de72-421f-b369-5277cc2f8361.png" 
          alt="Coinstart Pro" 
          className="w-6 h-6 rounded-full"
        />
      </div>
    )
  },
];

const botForms = [
  { name: 'Phân Tích Kỹ Thuật', value: 'technical', disabled: true },
  { name: 'Giao Dịch Lưới', value: 'grid', disabled: true },
  { name: 'DCA (Trung Bình Giá)', value: 'dca', disabled: true },
  { name: 'Tạo Lập Thị Trường', value: 'market_making', disabled: true },
  { name: 'Chênh Lệch Giá', value: 'arbitrage', disabled: true },
  { name: 'Phân Tích Tâm Lý', value: 'sentiment', disabled: true },
  { 
    name: 'Trading View', 
    value: 'trading_view', 
    disabled: false, 
    logo: (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.4 7L17.1 9H15.65L17.45 6H15.65L13.85 9H12.3L14.1 6H12.3L10.5 9H9L10.8 6H4V18H20V7H18.4Z" fill="currentColor"/>
        </svg>
      </div>
    )
  },
];

const getBotIcon = (iconName: string) => {
  switch (iconName) {
    case 'bot': return <Bot className="h-5 w-5" />;
    case 'cpu': return <Cpu className="h-5 w-5" />;
    case 'server': return <Server className="h-5 w-5" />;
    case 'terminal': return <Terminal className="h-5 w-5" />;
    case 'circuit': return <CircuitBoard className="h-5 w-5" />;
    case 'gem': return <Gem className="h-5 w-5" />;
    default: return <Bot className="h-5 w-5" />;
  }
};

const colorClasses = {
  red: 'bg-red-100 text-red-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  default: 'bg-slate-100 text-slate-600'
};

const EditBotDialog: React.FC<EditBotDialogProps> = ({ 
  isOpen, 
  onClose, 
  bot, 
  onSave 
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      colorScheme: 'default',
      icon: 'bot',
      exchange: 'coinstart_pro',
      botForm: 'trading_view',
    },
  });

  useEffect(() => {
    if (bot) {
      form.reset({
        title: bot.title || '',
        subtitle: bot.subtitle || '',
        colorScheme: bot.colorScheme as 'default' | 'red' | 'blue' | 'green' | 'purple' || 'default',
        icon: 'bot', // Defaulting to 'bot' as the icon may not be available in the bot data
        exchange: bot.exchange || 'coinstart_pro',
        botForm: bot.botForm || 'trading_view',
      });
    }
  }, [bot, form]);

  const onSubmit = (data: FormValues) => {
    onSave({
      title: data.title,
      subtitle: data.subtitle,
      colorScheme: data.colorScheme,
      exchange: data.exchange,
      botForm: data.botForm,
      // Convert the icon to a React element for consistency
      avatarIcon: getBotIcon(data.icon)
    });
    
    toast.success('Cập nhật cài đặt bot thành công');
    onClose();
  };

  const renderExchangeContent = (exchange: typeof exchanges[0]) => (
    <div className="flex items-center gap-2">
      {exchange.logo || (
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
          <Server className="h-3 w-3 text-slate-500" />
        </div>
      )}
      <span>{exchange.name}</span>
    </div>
  );

  const renderBotFormContent = (botForm: typeof botForms[0]) => (
    <div className="flex items-center gap-2">
      {botForm.logo || (
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
          <Terminal className="h-3 w-3 text-slate-500" />
        </div>
      )}
      <span>{botForm.name}</span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Chỉnh Sửa Bot</DialogTitle>
          <DialogDescription>
            Cập nhật cài đặt bot giao dịch của bạn. Thực hiện các thay đổi bên dưới.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Bot</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên bot..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Đây là cách bot của bạn sẽ được nhận dạng trong hệ thống.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="exchange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sàn Giao Dịch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn sàn giao dịch">
                            {field.value && renderExchangeContent(
                              exchanges.find(e => e.value === field.value) || exchanges[6]
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {exchanges.map((exchange) => (
                          <SelectItem 
                            key={exchange.value} 
                            value={exchange.value} 
                            disabled={exchange.disabled}
                            className={exchange.disabled ? "text-muted-foreground cursor-not-allowed" : ""}
                          >
                            <div className="flex items-center gap-2">
                              {exchange.logo || (
                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                                  <Server className="h-3 w-3 text-slate-500" />
                                </div>
                              )}
                              <span>{exchange.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Chỉ Coinstart Pro khả dụng trong phiên bản này.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="botForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại Bot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại bot">
                            {field.value && renderBotFormContent(
                              botForms.find(b => b.value === field.value) || botForms[6]
                            )}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {botForms.map((form) => (
                          <SelectItem 
                            key={form.value} 
                            value={form.value}
                            disabled={form.disabled}
                            className={form.disabled ? "text-muted-foreground cursor-not-allowed" : ""}
                          >
                            {renderBotFormContent(form)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Chỉ Trading View khả dụng trong phiên bản này.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giao Diện Màu</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn màu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Mặc Định</SelectItem>
                        <SelectItem value="red">Đỏ</SelectItem>
                        <SelectItem value="blue">Xanh Dương</SelectItem>
                        <SelectItem value="green">Xanh Lá</SelectItem>
                        <SelectItem value="purple">Tím</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biểu Tượng Bot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn biểu tượng">
                            {getBotIcon(field.value)}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {botIcons.map((icon, index) => (
                          <SelectItem key={index} value={icon.value}>
                            <div className="flex items-center">
                              <div className="mr-2">{icon.icon}</div>
                              <span className="capitalize">{icon.value}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô Tả</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Nhập mô tả bot..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả ngắn gọn về chức năng của bot này.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center mb-4">
              <Avatar 
                className={`h-20 w-20 ${colorClasses[form.watch('colorScheme') as keyof typeof colorClasses]} border-2 border-white shadow-sm`}
              >
                <AvatarFallback className="text-xl">
                  {getBotIcon(form.watch('icon'))}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button type="submit">Lưu Thay Đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBotDialog;
