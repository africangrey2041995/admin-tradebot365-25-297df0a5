
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAccountOptions } from '@/hooks/useAccountOptions';
import { 
  AccountFormApiField, 
  AccountFormTradingField, 
  AccountFormVolumeField 
} from '../AccountFormFields';
import { CircleDollarSign } from 'lucide-react';

// Base form schema that all bot types will use
export const baseFormSchema = z.object({
  userAccount: z.string({ required_error: "Please select a user account" }),
  apiKey: z.string({ required_error: "Please select an API key" }),
  tradingAccountId: z.string({ required_error: "Please select a trading account" }),
  tradingAccountNumber: z.string().optional(),
  tradingAccountType: z.string().optional(),
  tradingAccountBalance: z.string().optional(),
  isLive: z.boolean().optional(),
  volumeMultiplier: z.string().default("1"),
});

export interface BaseAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  onAddAccount: (accountData: z.infer<typeof baseFormSchema>) => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
  showCostInformation?: boolean;
}

const BaseAccountDialog: React.FC<BaseAccountDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId,
  onAddAccount,
  title = "Thêm Tài Khoản",
  description,
  submitButtonText = "Thêm Tài Khoản",
  showCostInformation = false
}) => {
  const { users, apis, tradingAccounts, volumeOptions } = useAccountOptions();
  
  const form = useForm<z.infer<typeof baseFormSchema>>({
    resolver: zodResolver(baseFormSchema),
    defaultValues: {
      userAccount: "",
      apiKey: "",
      tradingAccountId: "",
      tradingAccountNumber: "",
      tradingAccountType: "",
      tradingAccountBalance: "",
      isLive: false,
      volumeMultiplier: "1",
    },
  });

  const resetFormState = () => {
    form.reset({
      userAccount: "",
      apiKey: "",
      tradingAccountId: "",
      tradingAccountNumber: "",
      tradingAccountType: "",
      tradingAccountBalance: "",
      isLive: false,
      volumeMultiplier: "1",
    });
  };

  const onSubmit = (values: z.infer<typeof baseFormSchema>) => {
    onAddAccount(values);
    toast.success("Tài khoản đã được thêm thành công");
    onOpenChange(false);
    resetFormState();
  };

  // Filter APIs based on selected user
  const filteredApis = apis.filter(api => 
    form.watch("userAccount") ? api.userId === form.watch("userAccount") : true
  );

  // Filter trading accounts based on selected API
  const filteredTradingAccounts = tradingAccounts.filter(account => 
    form.watch("apiKey") ? account.apiId === form.watch("apiKey") : true
  );

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetFormState();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {description}
            </p>
          )}
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

            <AccountFormApiField 
              form={form} 
              filteredApis={filteredApis} 
            />

            <AccountFormTradingField 
              form={form} 
              filteredTradingAccounts={filteredTradingAccounts} 
            />

            <AccountFormVolumeField 
              form={form} 
              volumeOptions={volumeOptions} 
            />

            {showCostInformation && (
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
            )}

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
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={!form.watch("tradingAccountId")}
              >
                {submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BaseAccountDialog;
