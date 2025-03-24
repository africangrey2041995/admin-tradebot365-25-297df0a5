
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

interface ApiOption {
  id: string;
  name: string;
  userId: string;
}

interface TradingAccountOption {
  id: string;
  number: string;
  type: string;
  balance: string;
  apiId: string;
}

interface VolumeOption {
  value: string;
  label: string;
}

// API Field Component
export const AccountFormApiField = ({ 
  form, 
  filteredApis 
}: { 
  form: UseFormReturn<any>, 
  filteredApis: ApiOption[] 
}) => {
  return (
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
  );
};

// Trading Account Field Component
export const AccountFormTradingField = ({ 
  form, 
  filteredTradingAccounts 
}: { 
  form: UseFormReturn<any>, 
  filteredTradingAccounts: TradingAccountOption[] 
}) => {
  return (
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
  );
};

// Volume Multiplier Field Component
export const AccountFormVolumeField = ({ 
  form, 
  volumeOptions 
}: { 
  form: UseFormReturn<any>, 
  volumeOptions: VolumeOption[] 
}) => {
  return (
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
  );
};
