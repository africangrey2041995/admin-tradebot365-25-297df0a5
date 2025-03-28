
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ApiKey } from './ApiKeyTable';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TradingAccount {
  id: string;
  type: string;
  balance: string;
}

interface AddEditApiKeyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  editingKey: ApiKey | null;
  isEditingAccessTokenOnly?: boolean;
  users: User[];
  selectedUser: string;
  newApiName: string;
  newClientId: string;
  newSecret: string;
  newAccessToken: string;
  selectedTradingAccount: string;
  isTesting: boolean;
  isTestSuccessful: boolean;
  availableTradingAccounts: TradingAccount[];
  setSelectedUser: (value: string) => void;
  setNewApiName: (value: string) => void;
  setNewClientId: (value: string) => void;
  setNewSecret: (value: string) => void;
  setNewAccessToken: (value: string) => void;
  setSelectedTradingAccount: (value: string) => void;
  handleTestConnection: () => void;
  resetFormFields: () => void;
}

const AddEditApiKeyDialog: React.FC<AddEditApiKeyDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  editingKey,
  isEditingAccessTokenOnly = false,
  users,
  selectedUser,
  newApiName,
  newClientId,
  newSecret,
  newAccessToken,
  selectedTradingAccount,
  isTesting,
  isTestSuccessful,
  availableTradingAccounts,
  setSelectedUser,
  setNewApiName,
  setNewClientId,
  setNewSecret,
  setNewAccessToken,
  setSelectedTradingAccount,
  handleTestConnection,
  resetFormFields
}) => {
  const getDialogTitle = () => {
    if (isEditingAccessTokenOnly) return "Update Access Token";
    return editingKey ? "Edit API Key" : "Add New API Key";
  };

  const getDialogDescription = () => {
    if (isEditingAccessTokenOnly) return "Update the access token for this API key";
    return editingKey 
      ? "Update API key information" 
      : "Connect a new API key to this account";
  };

  const handleCancel = () => {
    resetFormFields();
    onOpenChange(false);
  };

  const isSaveDisabled = () => {
    if (isEditingAccessTokenOnly) {
      return !isTestSuccessful || !newAccessToken.trim();
    }
    
    if (editingKey) {
      return !newApiName.trim() || 
        !newClientId.trim() || 
        (!isTestSuccessful && Boolean(newAccessToken.trim()));
    }

    return !selectedUser || 
      !newApiName.trim() || 
      !newClientId.trim() || 
      !newSecret.trim() || 
      !isTestSuccessful || 
      !selectedTradingAccount;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={isEditingAccessTokenOnly ? "max-w-lg" : "max-w-2xl"}>
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-2">
          {!isEditingAccessTokenOnly && !editingKey && (
            <div>
              <Label htmlFor="user-account">User Account</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger id="user-account">
                  <SelectValue placeholder="Select user account" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} - {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {!isEditingAccessTokenOnly && (
            <div className={editingKey ? "grid grid-cols-2 gap-4" : ""}>
              <div>
                <Label htmlFor="api-name">API Name</Label>
                <Input 
                  id="api-name" 
                  placeholder="Enter API name" 
                  value={newApiName}
                  onChange={(e) => setNewApiName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="client-id">Client ID</Label>
                <Input 
                  id="client-id" 
                  placeholder="Enter client ID" 
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {!isEditingAccessTokenOnly && (
            <div>
              <Label htmlFor="secret-key">
                {editingKey ? "Secret Key (leave blank to keep current)" : "Secret Key"}
              </Label>
              <Input 
                id="secret-key" 
                type="password" 
                placeholder={editingKey ? "Enter new secret key" : "Enter secret key"}
                value={newSecret}
                onChange={(e) => setNewSecret(e.target.value)}
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="access-token">
              {isEditingAccessTokenOnly ? "New Access Token" : "Access Token"}
            </Label>
            <Input 
              id="access-token" 
              placeholder={isEditingAccessTokenOnly ? "Enter new access token" : "Enter access token"}
              value={newAccessToken}
              onChange={(e) => setNewAccessToken(e.target.value)}
            />
          </div>
          
          <div className="flex items-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleTestConnection}
              disabled={isTesting || !newAccessToken.trim()}
              className="w-[140px]"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>
            
            {isTestSuccessful && (
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Connection Successful
              </Badge>
            )}
          </div>
          
          {isTestSuccessful && !isEditingAccessTokenOnly && (
            <div>
              <Label htmlFor="trading-account">Trading Account</Label>
              <Select value={selectedTradingAccount} onValueChange={setSelectedTradingAccount}>
                <SelectTrigger id="trading-account">
                  <SelectValue placeholder="Select trading account" />
                </SelectTrigger>
                <SelectContent>
                  {availableTradingAccounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.id} - {account.type} - ${account.balance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            onClick={onSave}
            disabled={isSaveDisabled()}
          >
            {isEditingAccessTokenOnly ? "Update Token" : editingKey ? "Update API Key" : "Save API Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditApiKeyDialog;
