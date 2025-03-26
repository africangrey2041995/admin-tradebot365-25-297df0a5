
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAccountOptions } from '@/hooks/useAccountOptions';
import { 
  AccountFormApiField, 
  AccountFormTradingField, 
  AccountFormVolumeField 
} from './AccountFormFields';

const formSchema = z.object({
  userAccount: z.string({ required_error: "Vui lòng chọn tài khoản người dùng" }),
  apiKey: z.string({ required_error: "Vui lòng chọn API key" }),
  tradingAccountId: z.string({ required_error: "Vui lòng chọn tài khoản giao dịch" }),
  tradingAccountNumber: z.string().optional(),
  tradingAccountType: z.string().optional(),
  tradingAccountBalance: z.string().optional(),
  isLive: z.boolean().optional(),
  volumeMultiplier: z.string().default("1"),
});

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  onAddAccount: (accountData: z.infer<typeof formSchema>) => void;
  botName?: string;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId,
  onAddAccount,
  botName
}) => {
  const { users, apis, tradingAccounts, volumeOptions, isLoading } = useAccountOptions();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddAccount(values);
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

  // Dialog title with bot name if provided
  const dialogTitle = botName 
    ? `Thêm tài khoản cho ${botName}`
    : `Thêm tài khoản cho Bot ${botId}`;

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetFormState();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="userAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản người dùng</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        form.setValue("apiKey", "");
                        form.setValue("tradingAccountId", "");
                      }}
                      disabled={isLoading}
                    >
                      <option value="">Chọn tài khoản người dùng</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name} - {user.email}
                        </option>
                      ))}
                    </select>
                  </FormControl>
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

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Thêm tài khoản</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
