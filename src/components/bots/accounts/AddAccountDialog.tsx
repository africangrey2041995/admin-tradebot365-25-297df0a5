
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

interface CSPAccountOption {
  id: string;
  name: string;
  email?: string;
}

interface APIOption {
  id: string;
  name: string;
  cspAccountId: string;
}

interface TradingAccountOption {
  id: string;
  number: string;
  type: string;
  apiId: string;
  isLive: boolean;
}

interface VolumeMultiplierOption {
  value: string;
  label: string;
}

// Mock data for demo purposes - in real implementation this would come from API
const mockCSPAccounts: CSPAccountOption[] = [
  { id: 'csp1', name: 'CS Pro Account 1', email: 'user1@example.com' },
  { id: 'csp2', name: 'CS Pro Account 2', email: 'user2@example.com' },
];

const mockAPIOptions: APIOption[] = [
  { id: 'api1', name: 'Binance API', cspAccountId: 'csp1' },
  { id: 'api2', name: 'Bybit API', cspAccountId: 'csp1' },
  { id: 'api3', name: 'MXC API', cspAccountId: 'csp2' },
];

const mockTradingAccounts: TradingAccountOption[] = [
  { id: 'ta1', number: '4056629', type: 'SPOT', apiId: 'api1', isLive: true },
  { id: 'ta2', number: '4056789', type: 'FUTURES', apiId: 'api1', isLive: false },
  { id: 'ta3', number: '7892345', type: 'SPOT', apiId: 'api2', isLive: true },
  { id: 'ta4', number: '9823456', type: 'SPOT', apiId: 'api3', isLive: true },
];

const volumeMultipliers: VolumeMultiplierOption[] = [
  { value: '0.5', label: '0.5x' },
  { value: '1', label: '1x (Mặc định)' },
  { value: '2', label: '2x' },
  { value: '3', label: '3x' },
  { value: '5', label: '5x' },
  { value: '10', label: '10x' },
];

const formSchema = z.object({
  cspAccount: z.string({
    required_error: 'Vui lòng chọn tài khoản người dùng',
  }),
  apiKey: z.string({
    required_error: 'Vui lòng chọn API Key',
  }),
  tradingAccount: z.string({
    required_error: 'Vui lòng chọn tài khoản giao dịch',
  }),
  volumeMultiplier: z.string().default('1'),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  botId: string;
  onAddAccount: (accountData: FormValues) => void;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onOpenChange,
  botId,
  onAddAccount,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cspAccount: '',
      apiKey: '',
      tradingAccount: '',
      volumeMultiplier: '1',
    },
  });

  const [filteredAPIs, setFilteredAPIs] = useState<APIOption[]>([]);
  const [filteredTradingAccounts, setFilteredTradingAccounts] = useState<TradingAccountOption[]>([]);
  
  // Watch form values for dependent fields
  const selectedCSPAccount = form.watch('cspAccount');
  const selectedAPI = form.watch('apiKey');

  // Update filtered APIs when CSP account changes
  useEffect(() => {
    if (selectedCSPAccount) {
      const apis = mockAPIOptions.filter(api => api.cspAccountId === selectedCSPAccount);
      setFilteredAPIs(apis);
      
      // Reset API and trading account when CSP account changes
      if (form.getValues('apiKey')) {
        form.setValue('apiKey', '');
        form.setValue('tradingAccount', '');
      }
    } else {
      setFilteredAPIs([]);
    }
  }, [selectedCSPAccount, form]);

  // Update filtered trading accounts when API changes
  useEffect(() => {
    if (selectedAPI) {
      const accounts = mockTradingAccounts.filter(account => account.apiId === selectedAPI);
      setFilteredTradingAccounts(accounts);
      
      // Reset trading account when API changes
      if (form.getValues('tradingAccount')) {
        form.setValue('tradingAccount', '');
      }
    } else {
      setFilteredTradingAccounts([]);
    }
  }, [selectedAPI, form]);

  const onSubmit = (values: FormValues) => {
    onAddAccount(values);
    onOpenChange(false);
    form.reset();
  };

  const getTradingAccountLabel = (account: TradingAccountOption) => {
    return `${account.number} - ${account.type} ${account.isLive ? '(Live)' : '(Demo)'}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Tài Khoản vào Bot {botId}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="cspAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản người dùng (CSP)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tài khoản CSP" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockCSPAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} {account.email ? `(${account.email})` : ''}
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
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedCSPAccount}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn API Key" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredAPIs.map((api) => (
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
                  <FormLabel>Tài khoản Giao Dịch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedAPI}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tài khoản giao dịch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredTradingAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {getTradingAccountLabel(account)}
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
                  <FormLabel>Khối lượng Giao Dịch</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hệ số khối lượng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {volumeMultipliers.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-4">
                <p className="font-medium mb-1">Chi phí sử dụng:</p>
                <p>Tín hiệu giao dịch: <span className="font-medium">Miễn phí</span></p>
                <p>Kết nối tài khoản: <span className="font-medium">Miễn phí</span></p>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                Hủy
              </Button>
              <Button type="submit">Thêm Tài Khoản</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;
