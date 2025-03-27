import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { CircleDollarSign } from 'lucide-react';

const formSchema = z.object({
  userAccount: z.string({ required_error: "Vui lòng chọn tài khoản người dùng" }),
  apiKey: z.string({ required_error: "Vui lòng chọn API key" }),
  tradingAccount: z.string({ required_error: "Vui lòng chọn tài khoản giao dịch" }),
  volumeMultiplier: z.string().default("1"),
});

interface SubscribePremiumBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  botName: string;
  onSubscribe: (subscriptionData: z.infer<typeof formSchema>) => void;
}

const SubscribePremiumBotDialog: React.FC<SubscribePremiumBotDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId,
  botName,
  onSubscribe 
}) => {
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [apis, setApis] = useState<{ id: string; name: string; userId: string }[]>([]);
  const [tradingAccounts, setTradingAccounts] = useState<{ id: string; number: string; type: string; balance: string; apiId: string }[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userAccount: "",
      apiKey: "",
      tradingAccount: "",
      volumeMultiplier: "1",
    },
  });

  useEffect(() => {
    setUsers([
      { id: "user1", name: "Tài Khoản 1", email: "dbtcompany17@gmail.com" },
      { id: "user2", name: "Tài Khoản 2", email: "user2@example.com" },
    ]);

    setApis([
      { id: "api1", name: "API 1", userId: "user1" },
      { id: "api2", name: "API 2", userId: "user1" },
      { id: "api3", name: "API 1", userId: "user2" },
    ]);

    setTradingAccounts([
      { id: "acc1", number: "4056629", type: "Live", balance: "$500", apiId: "api1" },
      { id: "acc2", number: "4056789", type: "Live", balance: "$1000", apiId: "api1" },
      { id: "acc3", number: "4044856", type: "Demo", balance: "$10000", apiId: "api1" },
      { id: "acc4", number: "4044857", type: "Demo", balance: "$5000", apiId: "api2" },
      { id: "acc5", number: "4056630", type: "Live", balance: "$2000", apiId: "api3" },
    ]);
  }, []);

  const resetFormState = () => {
    form.reset({
      userAccount: "",
      apiKey: "",
      tradingAccount: "",
      volumeMultiplier: "1",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.userAccount || !values.apiKey || !values.tradingAccount || !values.volumeMultiplier) {
      return;
    }
    
    onSubscribe(values);
    onOpenChange(false);
    resetFormState();
  };

  const filteredApis = apis.filter(api => 
    form.watch("userAccount") ? api.userId === form.watch("userAccount") : true
  );

  const filteredTradingAccounts = tradingAccounts.filter(account => 
    form.watch("apiKey") ? account.apiId === form.watch("apiKey") : true
  );

  const volumeOptions = [
    { value: "0.5", label: "x0.5" },
    { value: "1", label: "x1" },
    { value: "2", label: "x2" },
    { value: "3", label: "x3" },
    { value: "5", label: "x5" },
    { value: "10", label: "x10" },
  ];

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetFormState();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Đăng ký sử dụng {botName}</DialogTitle>
          <DialogDescription>
            Chọn tài khoản mà bạn muốn kết nối với premium bot này
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="userAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản người dùng</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("apiKey", "");
                      form.setValue("tradingAccount", "");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tài khoản người dùng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} - {user.email}
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
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("tradingAccount", "");
                    }}
                    value={field.value}
                    disabled={!form.watch("userAccount")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn API Key" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredApis.map(api => (
                        <SelectItem key={api.id} value={api.id}>
                          {api.name}
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
              name="tradingAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản giao dịch</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!form.watch("apiKey")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tài khoản giao dịch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredTradingAccounts.map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.number} | {account.type} | {account.balance}
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
              name="volumeMultiplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khối lượng giao dịch</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn bội số khối lượng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {volumeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hệ số nhân khối lượng giao dịch so với tín hiệu gốc
                  </p>
                </FormItem>
              )}
            />

            <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-lg border border-slate-200 dark:border-zinc-700">
              <h4 className="font-medium text-slate-800 dark:text-white flex items-center mb-2">
                <CircleDollarSign className="h-4 w-4 mr-1" /> Chi phí sử dụng
              </h4>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-slate-600 dark:text-slate-300">Phí đăng ký:</span>
                <span className="font-medium text-slate-800 dark:text-white">Free</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hiện tại bot này được cung cấp miễn phí trong giai đoạn thử nghiệm.
              </p>
            </div>
            
            {!form.watch("tradingAccount") && (
              <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Bạn cần chọn đầy đủ thông tin tài khoản để tiếp tục</span>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={!form.watch("tradingAccount")}
              >
                Xác nhận đăng ký
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribePremiumBotDialog;
