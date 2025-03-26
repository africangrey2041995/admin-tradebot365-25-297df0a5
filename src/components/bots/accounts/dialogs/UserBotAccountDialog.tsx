
import React from 'react';
import BaseAccountDialog, { baseFormSchema, BaseAccountDialogProps } from './BaseAccountDialog';
import * as z from 'zod';

// User bot specific form schema (extends base schema)
export const userBotFormSchema = baseFormSchema.extend({
  // Add any user bot specific fields here
});

export interface UserBotAccountDialogProps extends Omit<BaseAccountDialogProps, 'onAddAccount'> {
  onAddAccount: (accountData: z.infer<typeof userBotFormSchema>) => void;
}

const UserBotAccountDialog: React.FC<UserBotAccountDialogProps> = ({ 
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
      title="Thêm Tài Khoản Cho Bot"
      description="Kết nối tài khoản giao dịch của bạn với bot để bắt đầu giao dịch tự động"
      submitButtonText="Thêm Tài Khoản" 
      showCostInformation={false}
      {...rest}
    />
  );
};

export default UserBotAccountDialog;
