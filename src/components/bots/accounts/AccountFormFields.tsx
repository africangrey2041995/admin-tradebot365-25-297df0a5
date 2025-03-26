
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AccountFormApiField = ({ form, filteredApis }: any) => {
  return (
    <FormField
      control={form.control}
      name="apiKey"
      render={({ field }) => (
        <FormItem>
          <FormLabel>API Key</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              form.setValue("tradingAccountId", "");
            }}
            value={field.value}
            disabled={filteredApis.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn API key" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {filteredApis.map((api: any) => (
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

export const AccountFormTradingField = ({ form, filteredTradingAccounts }: any) => {
  return (
    <FormField
      control={form.control}
      name="tradingAccountId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tài khoản giao dịch</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              
              // Automatically populate additional fields if we have the data
              const selectedAccount = filteredTradingAccounts.find(
                (acc: any) => acc.id === value
              );
              
              if (selectedAccount) {
                form.setValue("tradingAccountNumber", selectedAccount.accountNumber || "");
                form.setValue("tradingAccountType", selectedAccount.accountType || "");
                form.setValue("tradingAccountBalance", selectedAccount.balance || "");
                form.setValue("isLive", selectedAccount.isLive || false);
              }
            }}
            value={field.value}
            disabled={filteredTradingAccounts.length === 0 || !form.watch("apiKey")}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn tài khoản giao dịch" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {filteredTradingAccounts.map((account: any) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name} - {account.accountNumber}
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

export const AccountFormVolumeField = ({ form, volumeOptions }: any) => {
  return (
    <FormField
      control={form.control}
      name="volumeMultiplier"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hệ số khối lượng giao dịch</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn hệ số" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {volumeOptions.map((option: any) => (
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
  );
};
