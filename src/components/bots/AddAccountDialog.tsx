
import React, { useState } from 'react';
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
} from './accounts/AccountFormFields';

const formSchema = z.object({
  userAccount: z.string({ required_error: "Please select a user account" }),
  apiKey: z.string({ required_error: "Please select an API key" }),
  tradingAccount: z.string({ required_error: "Please select a trading account" }),
  volumeMultiplier: z.string().default("1"),
});

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  onAddAccount: (accountData: z.infer<typeof formSchema>) => void;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId,
  onAddAccount 
}) => {
  const { users, apis, tradingAccounts, volumeOptions } = useAccountOptions();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userAccount: "",
      apiKey: "",
      tradingAccount: "",
      volumeMultiplier: "1",
    },
  });

  const resetFormState = () => {
    form.reset({
      userAccount: "",
      apiKey: "",
      tradingAccount: "",
      volumeMultiplier: "1",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddAccount(values);
    toast.success("Account added successfully");
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
          <DialogTitle>Add Account to Bot {botId}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="userAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Profile</FormLabel>
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
                        <SelectValue placeholder="Select account profile" />
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

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Account</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
