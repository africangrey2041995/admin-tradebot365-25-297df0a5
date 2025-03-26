
import React from 'react';
import BaseAccountDialog, { baseFormSchema, BaseAccountDialogProps } from './BaseAccountDialog';
import * as z from 'zod';

// Prop trading bot specific form schema
export const propBotFormSchema = baseFormSchema.extend({
  // Additional fields for prop trading (if needed)
  challengeSize: z.string().optional(),
});

export interface PropBotAccountDialogProps extends Omit<BaseAccountDialogProps, 'onAddAccount'> {
  onAddAccount: (accountData: z.infer<typeof propBotFormSchema>) => void;
}

const PropBotAccountDialog: React.FC<PropBotAccountDialogProps> = ({ 
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
      title="Tích Hợp Với Tài Khoản"
      description="Tích hợp bot Prop Trading này với tài khoản giao dịch của bạn"
      submitButtonText="Tích Hợp Ngay"
      showCostInformation={true}
      {...rest}
    />
  );
};

export default PropBotAccountDialog;
