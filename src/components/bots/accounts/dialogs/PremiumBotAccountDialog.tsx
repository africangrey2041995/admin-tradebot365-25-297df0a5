
import React from 'react';
import BaseAccountDialog, { baseFormSchema, BaseAccountDialogProps } from './BaseAccountDialog';
import * as z from 'zod';

// Premium bot specific form schema
export const premiumBotFormSchema = baseFormSchema.extend({
  // Add any premium bot specific fields here
});

export interface PremiumBotAccountDialogProps extends Omit<BaseAccountDialogProps, 'onAddAccount'> {
  onAddAccount: (accountData: z.infer<typeof premiumBotFormSchema>) => void;
}

const PremiumBotAccountDialog: React.FC<PremiumBotAccountDialogProps> = ({ 
  open, 
  onOpenChange, 
  botId, 
  onAddAccount,
  ...rest 
}) => {
  return (
    <BaseAccountDialog
      open={open}
      onOpenChange={onOpenChange}
      botId={botId}
      onAddAccount={onAddAccount}
      title="Đăng Ký Sử Dụng Bot Premium"
      description="Đăng ký sử dụng bot premium này cho tài khoản giao dịch của bạn"
      submitButtonText="Đăng Ký Sử Dụng"
      showCostInformation={true}
      {...rest}
    />
  );
};

export default PremiumBotAccountDialog;
