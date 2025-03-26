
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { CircleDollarSign } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Account } from '@/types';

const formSchema = z.object({
  userAccount: z.string({ required_error: "Vui lòng chọn tài khoản người dùng" }),
  apiKey: z.string({ required_error: "Vui lòng chọn API" }).optional().or(z.literal("")),
  tradingAccountId: z.string().optional().or(z.literal("")),
  volumeMultiplier: z.string().default("1"),
  isLive: z.boolean().default(false),
});

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  botName?: string;
  onAddAccount: (account: Partial<Account>) => void;
}

const NewAccountDialog: React.FC<NewAccountDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId,
  botName = 'Bot',
  onAddAccount 
}) => {
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [apis, setApis] = useState<{ id: string; name: string; userId: string }[]>([]);
  const [tradingAccounts, setTradingAccounts] = useState<{ 
    id: string; 
    number: string; 
    type: string; 
    balance: string; 
    isLive: boolean;
    apiId: string;
  }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userAccount: "",
      apiKey: "",
      tradingAccountId: "",
      volumeMultiplier: "1",
      isLive: false
    },
  });

  // Mock data loading
  useEffect(() => {
    // Mock users
    setUsers([
      { id: "user1", name: "Tài Khoản 1", email: "dbtcompany17@gmail.com" },
      { id: "user2", name: "Tài Khoản 2", email: "user2@example.com" },
      { id: "user3", name: "Tài Khoản 3", email: "user3@example.com" },
    ]);

    // Mock APIs
    setApis([
      { id: "api1", name: "Binance API", userId: "user1" },
      { id: "api2", name: "Coinbase API", userId: "user1" },
      { id: "api3", name: "Binance API", userId: "user2" },
      { id: "api4", name: "KuCoin API", userId: "user3" },
    ]);

    // Mock trading accounts
    setTradingAccounts([
      { id: "acc1", number: "4056629", type: "HEDGED", balance: "$500", isLive: false, apiId: "api1" },
      { id: "acc2", number: "4056789", type: "HEDGED", balance: "$1000", isLive: true, apiId: "api1" },
      { id: "acc3", number: "4044856", type: "NETTED", balance: "$10000", isLive: false, apiId: "api2" },
      { id: "acc4", number: "4044857", type: "NETTED", balance: "$5000", isLive: false, apiId: "api2" },
      { id: "acc5", number: "4056630", type: "HEDGED", balance: "$2000", isLive: true, apiId: "api3" },
      { id: "acc6", number: "4056631", type: "HEDGED", balance: "$3000", isLive: true, apiId: "api4" },
    ]);
  }, []);

  const resetFormState = () => {
    form.reset({
      userAccount: "",
      apiKey: "",
      tradingAccountId: "",
      volumeMultiplier: "1",
      isLive: false
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Find the selected trading account data
      const selectedAccount = tradingAccounts.find(acc => acc.id === values.tradingAccountId);
      const selectedUser = users.find(user => user.id === values.userAccount);
      const selectedApi = apis.find(api => api.id === values.apiKey);
      
      // Create a new account object
      const newAccount: Partial<Account> = {
        cspAccountId: `ACC${Date.now()}`,
        cspAccountName: selectedUser?.name || "Unknown Account",
        cspUserEmail: selectedUser?.email,
        apiName: selectedApi?.name || "",
        apiId: values.apiKey || "",
        tradingAccountId: values.tradingAccountId || "",
        tradingAccountNumber: selectedAccount?.number || "",
        tradingAccountType: selectedAccount?.type || "",
        tradingAccountBalance: selectedAccount?.balance || "",
        isLive: values.isLive,
        status: "Connected",
        volumeMultiplier: values.volumeMultiplier,
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the onAddAccount callback
      onAddAccount(newAccount);
      
      // Close the dialog and reset form
      onOpenChange(false);
      resetFormState();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Có lỗi xảy ra khi thêm tài khoản");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter APIs by selected user
  const filteredApis = apis.filter(api => 
    form.watch("userAccount") ? api.userId === form.watch("userAccount") : true
  );

  // Filter trading accounts by selected API
  const filteredTradingAccounts = tradingAccounts.filter(account => 
    form.watch("apiKey") ? account.apiId === form.watch("apiKey") : true
  );

  // Volume multiplier options
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
          <DialogTitle>Thêm tài khoản vào {botName}</DialogTitle>
          <DialogDescription>
            Chọn tài khoản để kết nối với bot này
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
                      // Reset dependent fields
                      form.setValue("apiKey", "");
                      form.setValue("tradingAccountId", "");
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
                  <FormLabel>API</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Reset dependent field
                      form.setValue("tradingAccountId", "");
                    }}
                    value={field.value}
                    disabled={!form.watch("userAccount")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn API" />
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
              name="tradingAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản giao dịch</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      
                      // Set the isLive value based on the selected account
                      const selectedAccount = filteredTradingAccounts.find(acc => acc.id === value);
                      if (selectedAccount) {
                        form.setValue("isLive", selectedAccount.isLive);
                      }
                    }}
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
                          {account.number} | {account.type} | {account.balance} | {account.isLive ? 'Live' : 'Demo'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="isLive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Tài khoản thật (Live)</FormLabel>
                      <FormDescription className="text-xs text-muted-foreground">
                        Bật nếu đây là tài khoản thật, tắt nếu đây là tài khoản demo
                      </FormDescription>
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
            </div>

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
                <span className="text-slate-600 dark:text-slate-300">Phí kết nối:</span>
                <span className="font-medium text-slate-800 dark:text-white">Free</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bot này được cung cấp miễn phí trong giai đoạn thử nghiệm hiện tại.
              </p>
            </div>
            
            {!form.watch("tradingAccountId") && (
              <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Bạn cần chọn đầy đủ thông tin tài khoản để tiếp tục</span>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={!form.watch("tradingAccountId") || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Đang thêm...
                  </>
                ) : (
                  "Thêm tài khoản"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountDialog;
