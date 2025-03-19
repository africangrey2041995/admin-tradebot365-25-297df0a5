import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Bot, Terminal, Server, Cpu, CircuitBoard, Gem } from 'lucide-react';
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Bot name must be at least 2 characters.',
  }).max(50, {
    message: 'Bot name must not exceed 50 characters.',
  }),
  subtitle: z.string().max(150, {
    message: 'Description must not exceed 150 characters.',
  }).optional(),
  colorScheme: z.enum(['default', 'red', 'blue', 'green', 'purple']),
  icon: z.string(),
  exchange: z.string({
    required_error: "Please select an exchange",
  }),
  botForm: z.string({
    required_error: "Please select a bot form",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  title: '',
  subtitle: '',
  colorScheme: 'default',
  icon: 'bot',
  exchange: '',
  botForm: '',
};

interface AddBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBot: (values: FormValues) => void;
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
  { name: 'Binance', value: 'binance' },
  { name: 'Coinbase', value: 'coinbase' },
  { name: 'Kraken', value: 'kraken' },
  { name: 'Bybit', value: 'bybit' },
  { name: 'KuCoin', value: 'kucoin' },
  { name: 'OKX', value: 'okx' },
  { name: 'Coinstart Pro', value: 'coinstart_pro' },
];

const botForms = [
  { name: 'Technical Analysis', value: 'technical' },
  { name: 'Grid Trading', value: 'grid' },
  { name: 'DCA (Dollar-Cost Averaging)', value: 'dca' },
  { name: 'Market Making', value: 'market_making' },
  { name: 'Arbitrage', value: 'arbitrage' },
  { name: 'Sentiment Analysis', value: 'sentiment' },
  { name: 'Trading View', value: 'trading_view' },
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

export function AddBotDialog({ open, onOpenChange, onAddBot }: AddBotDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(data: FormValues) {
    onAddBot(data);
    form.reset(defaultValues);
    onOpenChange(false);
    toast.success('Bot added successfully', {
      description: `${data.title} has been added to your bots.`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Bot</DialogTitle>
          <DialogDescription>
            Create a new trading bot for your portfolio. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bot name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your bot will be identified in the system.
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
                    <FormLabel>Exchange</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exchange" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {exchanges.map((exchange) => (
                          <SelectItem key={exchange.value} value={exchange.value}>
                            {exchange.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="botForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bot Form</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bot form" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {botForms.map((form) => (
                          <SelectItem key={form.value} value={form.value}>
                            {form.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <FormLabel>Color Theme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
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
                    <FormLabel>Bot Icon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon">
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter bot description..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly describe what this bot does.
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
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Bot</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
