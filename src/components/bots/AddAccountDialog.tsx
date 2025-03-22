import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

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
    onAddAccount(values);
    toast.success("Account added successfully");
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

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API</FormLabel>
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
                        <SelectValue placeholder="Select API" />
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
                  <FormLabel>Account Trading</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!form.watch("apiKey")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trading account" />
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
                  <FormLabel>Volume Multiplier</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select volume multiplier" />
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
                    Multiplier for trade volume relative to original signal
                  </p>
                </FormItem>
              )}
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
