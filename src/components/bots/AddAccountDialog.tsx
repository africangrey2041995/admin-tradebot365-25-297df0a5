
import React from 'react';
import { 
  UserBotAccountDialog, 
  PremiumBotAccountDialog, 
  PropBotAccountDialog,
  BaseAccountDialogProps
} from './accounts/dialogs';

// Extended interface with botType
interface AddAccountDialogProps extends BaseAccountDialogProps {
  botType?: 'user' | 'premium' | 'prop';
}

/**
 * This is a wrapper component that selects the appropriate specialized dialog
 * based on the botType prop. This maintains backward compatibility with existing code.
 */
const AddAccountDialog: React.FC<AddAccountDialogProps> = ({ 
  botType = 'user',
  ...props
}) => {
  // Choose the appropriate dialog based on botType
  switch (botType) {
    case 'premium':
      return <PremiumBotAccountDialog {...props} />;
    case 'prop':
      return <PropBotAccountDialog {...props} />;
    case 'user':
    default:
      return <UserBotAccountDialog {...props} />;
  }
};

export default AddAccountDialog;
