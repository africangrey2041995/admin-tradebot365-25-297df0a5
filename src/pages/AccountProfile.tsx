
import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';
import ApiKeyTable, { ApiKey } from '@/components/accounts/profile/ApiKeyTable';
import ApiKeyFilters from '@/components/accounts/profile/ApiKeyFilters';
import AddEditApiKeyDialog from '@/components/accounts/profile/AddEditApiKeyDialog';
import AccountHeader from '@/components/accounts/profile/AccountHeader';
import BulkActionBar from '@/components/floating/BulkActionBar';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import { ConnectionStatus } from '@/types/connection';

const mockTradingAccounts = [
  { id: '554466', type: 'Live', balance: '5000' },
  { id: '778899', type: 'Demo', balance: '10000' },
  { id: '112233', type: 'Live', balance: '2500' },
  { id: '445566', type: 'Live', balance: '7500' },
  { id: '990011', type: 'Demo', balance: '15000' },
];

const mockUsers = [
  { id: 'user1', name: 'John Doe', email: 'john@example.com' },
  { id: 'user2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'user3', name: 'Michael Johnson', email: 'michael@example.com' },
];

const generateMockApiKeys = (accountId: string): ApiKey[] => {
  const accountTradingValues = [
    '554466|Live|5000',
    '778899|Demo|10000',
    '112233|Live|2500',
    '445566|Live|7500',
    '990011|Demo|15000'
  ];
  
  return Array(5).fill(null).map((_, index) => ({
    id: `key-${index}`,
    name: `Streamlab`,
    clientId: `${accountId}-client-${index}`,
    secretKey: '*********************',
    accessToken: '*********************',
    accountTrading: accountTradingValues[index],
    createdAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    status: Math.random() > 0.3 ? 'ACTIVE' : 'BLOCK',
  }));
};

const AccountProfile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const keys = generateMockApiKeys(accountId || '');
    return keys.map(key => ({
      ...key,
      connectionStatus: Math.random() > 0.5 ? 'Connected' : 'Disconnected'
    }));
  });
  
  // State for managing secret visibility
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  
  // Selection state
  const [selectedKeyIds, setSelectedKeyIds] = useState<string[]>([]);
  
  // Dialog states
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [isEditKeyDialogOpen, setIsEditKeyDialogOpen] = useState(false);
  const [isUpdateTokenDialogOpen, setIsUpdateTokenDialogOpen] = useState(false);
  const [isConnectAllDialogOpen, setIsConnectAllDialogOpen] = useState(false);
  const [isDisconnectAllDialogOpen, setIsDisconnectAllDialogOpen] = useState(false);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Loading state
  const { loading: isProcessingConnection, startLoading, stopLoading } = useSafeLoading({
    minLoadingDurationMs: 800
  });
  
  // Form states
  const [selectedUser, setSelectedUser] = useState('');
  const [newApiName, setNewApiName] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [newAccessToken, setNewAccessToken] = useState('');
  const [selectedTradingAccount, setSelectedTradingAccount] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isTestSuccessful, setIsTestSuccessful] = useState(false);
  const [availableTradingAccounts, setAvailableTradingAccounts] = useState(mockTradingAccounts);
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [isEditingAccessTokenOnly, setIsEditingAccessTokenOnly] = useState(false);

  const accountName = `Account ${accountId?.slice(-3)}`;

  // Filter and sort API keys
  const filteredAndSortedApiKeys = useMemo(() => {
    let result = [...apiKeys];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(key => 
        key.name.toLowerCase().includes(query) || 
        key.clientId.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      if (filterStatus === 'connected') {
        result = result.filter(key => key.connectionStatus === 'Connected');
      } else if (filterStatus === 'disconnected') {
        result = result.filter(key => key.connectionStatus === 'Disconnected');
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortField) {
        case 'name':
          valueA = a.name;
          valueB = b.name;
          break;
        case 'clientId':
          valueA = a.clientId;
          valueB = b.clientId;
          break;
        case 'connectionStatus':
          valueA = a.connectionStatus || '';
          valueB = b.connectionStatus || '';
          break;
        case 'expiry':
          valueA = new Date(a.expiryDate).getTime();
          valueB = new Date(b.expiryDate).getTime();
          break;
        default:
          valueA = a.name;
          valueB = b.name;
      }
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === 'asc' 
          ? (valueA as number) - (valueB as number) 
          : (valueB as number) - (valueA as number);
      }
    });
    
    return result;
  }, [apiKeys, searchQuery, filterStatus, sortField, sortDirection]);
  
  // Handler functions
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const toggleSelectKey = (keyId: string) => {
    setSelectedKeyIds(prev => 
      prev.includes(keyId) 
        ? prev.filter(id => id !== keyId) 
        : [...prev, keyId]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedKeyIds.length === filteredAndSortedApiKeys.length) {
      setSelectedKeyIds([]);
    } else {
      setSelectedKeyIds(filteredAndSortedApiKeys.map(key => key.id));
    }
  };
  
  const clearSelection = () => {
    setSelectedKeyIds([]);
  };
  
  const handleConnectAll = () => {
    setIsConnectAllDialogOpen(true);
  };
  
  const handleDisconnectAll = () => {
    setIsDisconnectAllDialogOpen(true);
  };
  
  const processConnectAll = () => {
    if (selectedKeyIds.length === 0) return;
    
    startLoading();
    
    setTimeout(() => {
      setApiKeys(prev => prev.map(key => {
        if (selectedKeyIds.includes(key.id)) {
          return { ...key, connectionStatus: 'Connected' };
        }
        return key;
      }));
      
      stopLoading();
      setIsConnectAllDialogOpen(false);
      
      toast.success(`Đã kết nối ${selectedKeyIds.length} API key thành công`, {
        description: 'Tất cả API key đã được kết nối.'
      });
    }, 1500);
  };
  
  const processDisconnectAll = () => {
    if (selectedKeyIds.length === 0) return;
    
    startLoading();
    
    setTimeout(() => {
      setApiKeys(prev => prev.map(key => {
        if (selectedKeyIds.includes(key.id)) {
          return { ...key, connectionStatus: 'Disconnected' };
        }
        return key;
      }));
      
      stopLoading();
      setIsDisconnectAllDialogOpen(false);
      
      toast.success(`Đã ngắt kết nối ${selectedKeyIds.length} API key thành công`, {
        description: 'Tất cả API key đã được ngắt kết nối.'
      });
    }, 1500);
  };
  
  const handleToggleConnectionStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => {
      if (key.id === keyId) {
        const newStatus = key.connectionStatus === 'Connected' ? 'Disconnected' : 'Connected';
        
        if (newStatus === 'Connected') {
          toast.success(`Đã kết nối API key ${key.name} thành công`);
        } else {
          toast.success(`Đã ngắt kết nối API key ${key.name} thành công`);
        }
        
        return { ...key, connectionStatus: newStatus as ConnectionStatus };
      }
      return key;
    }));
  };

  const toggleShowSecret = (keyId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard!`);
      })
      .catch(() => {
        toast.error(`Failed to copy ${label}`);
      });
  };

  const handleAddKey = () => {
    resetFormFields();
    setIsAddKeyDialogOpen(true);
  };

  const handleEditKey = (key: ApiKey) => {
    setEditingKeyId(key.id);
    setSelectedUser('');
    setNewApiName(key.name);
    setNewClientId(key.clientId);
    setNewSecret('');
    setNewAccessToken('');
    setSelectedTradingAccount(parseAccountTrading(key.accountTrading).accountId);
    setIsTestSuccessful(false);
    setIsEditingAccessTokenOnly(false);
    setIsEditKeyDialogOpen(true);
  };

  const handleUpdateAccessToken = (key: ApiKey) => {
    setEditingKeyId(key.id);
    setNewAccessToken('');
    setIsTestSuccessful(false);
    setIsEditingAccessTokenOnly(true);
    setIsUpdateTokenDialogOpen(true);
  };

  const resetFormFields = () => {
    setSelectedUser('');
    setNewApiName('');
    setNewClientId('');
    setNewSecret('');
    setNewAccessToken('');
    setSelectedTradingAccount('');
    setIsTestSuccessful(false);
    setEditingKeyId(null);
    setIsEditingAccessTokenOnly(false);
  };

  const handleTestConnection = () => {
    if (!newAccessToken.trim()) {
      toast.error('Please enter an access token');
      return;
    }

    setIsTesting(true);

    setTimeout(() => {
      setIsTesting(false);
      setIsTestSuccessful(true);
      
      const randomAccounts = [...mockTradingAccounts].sort(() => Math.random() - 0.5).slice(0, 3);
      setAvailableTradingAccounts(randomAccounts);
      
      toast.success('Connection test successful!');
    }, 1500);
  };
  
  const parseAccountTrading = (accountTradingStr: string) => {
    const parts = accountTradingStr.split('|');
    return {
      accountId: parts[0] || '',
      type: parts[1] || '',
      balance: parts[2] || ''
    };
  };

  const handleSaveNewKey = () => {
    if (!selectedUser && !editingKeyId) {
      toast.error('Please select a user account');
      return;
    }
    
    if (!newApiName.trim()) {
      toast.error('Please enter an API name');
      return;
    }
    
    if (!newClientId.trim()) {
      toast.error('Please enter a client ID');
      return;
    }

    if (!editingKeyId && !newSecret.trim()) {
      toast.error('Please enter a secret key');
      return;
    }
    
    if (!isEditingAccessTokenOnly && !selectedTradingAccount) {
      toast.error('Please select a trading account');
      return;
    }
    
    const selectedAccount = availableTradingAccounts.find(acc => acc.id === selectedTradingAccount);
    
    if (!isEditingAccessTokenOnly && !selectedAccount) {
      toast.error('Invalid trading account selected');
      return;
    }
    
    if (editingKeyId) {
      setApiKeys(prev => prev.map(key => {
        if (key.id === editingKeyId) {
          const updatedKey = { ...key };
          
          if (!isEditingAccessTokenOnly) {
            updatedKey.name = newApiName;
            updatedKey.clientId = newClientId;
            if (newSecret.trim()) {
              updatedKey.secretKey = newSecret;
            }
            
            if (selectedAccount) {
              const accountTradingValue = `${selectedAccount.id}|${selectedAccount.type}|${selectedAccount.balance}`;
              updatedKey.accountTrading = accountTradingValue;
            }
          }
          
          if (isTestSuccessful && Boolean(newAccessToken.trim())) {
            updatedKey.accessToken = newAccessToken;
          }
          
          return updatedKey;
        }
        return key;
      }));
      
      toast.success(isEditingAccessTokenOnly ? 'Access token updated successfully' : 'API key updated successfully');
    } else {
      const user = mockUsers.find(u => u.id === selectedUser);
      
      const accountTradingValue = `${selectedAccount?.id}|${selectedAccount?.type}|${selectedAccount?.balance}`;
      
      const newKey: ApiKey = {
        id: `key-${Date.now()}`,
        name: newApiName,
        clientId: newClientId,
        secretKey: newSecret,
        accessToken: newAccessToken,
        accountTrading: accountTradingValue,
        createdAt: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        status: 'ACTIVE',
      };
      
      setApiKeys(prev => [...prev, newKey]);
      toast.success('New API key added successfully');
    }
    
    resetFormFields();
    setIsAddKeyDialogOpen(false);
    setIsEditKeyDialogOpen(false);
    setIsUpdateTokenDialogOpen(false);
  };

  const handleSaveUpdatedToken = () => {
    if (!newAccessToken.trim()) {
      toast.error('Please enter an access token');
      return;
    }
    
    if (!isTestSuccessful) {
      toast.error('Please test your connection first');
      return;
    }
    
    setApiKeys(prev => prev.map(key => {
      if (key.id === editingKeyId) {
        return {
          ...key,
          accessToken: newAccessToken
        };
      }
      return key;
    }));
    
    resetFormFields();
    setIsUpdateTokenDialogOpen(false);
    toast.success('Access token updated successfully');
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast.success('API Key deleted successfully');
  };

  const handleToggleStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE' } 
        : key
    ));
    
    const targetKey = apiKeys.find(key => key.id === keyId);
    const newStatus = targetKey?.status === 'ACTIVE' ? 'blocked' : 'activated';
    
    toast.success(`API Key ${newStatus} successfully`);
  };

  return (
    <MainLayout title={accountName}>
      {/* Account Header */}
      <AccountHeader accountName={accountName} />
      
      <div className="space-y-6">
        {/* API Keys section header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary" />
            API Keys
          </h3>
          <Button onClick={handleAddKey} className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add API Key
          </Button>
        </div>
        
        {/* API Key Filters */}
        <ApiKeyFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterStatus={filterStatus}
          onStatusFilterChange={setFilterStatus}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortDirection={sortDirection}
          onSortDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        />
        
        {/* API Keys Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <ApiKeyTable 
              apiKeys={filteredAndSortedApiKeys}
              selectedKeyIds={selectedKeyIds}
              showSecrets={showSecrets}
              sortField={sortField}
              sortDirection={sortDirection}
              onToggleSort={toggleSort}
              onToggleSelectAll={toggleSelectAll}
              onToggleSelectKey={toggleSelectKey}
              onToggleShowSecret={toggleShowSecret}
              onCopyToClipboard={copyToClipboard}
              onEditKey={handleEditKey}
              onUpdateAccessToken={handleUpdateAccessToken}
              onToggleStatus={handleToggleStatus}
              onDeleteKey={handleDeleteKey}
              onToggleConnectionStatus={handleToggleConnectionStatus}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Add Key Dialog */}
      <AddEditApiKeyDialog 
        isOpen={isAddKeyDialogOpen}
        onOpenChange={setIsAddKeyDialogOpen}
        onSave={handleSaveNewKey}
        editingKey={null}
        users={mockUsers}
        selectedUser={selectedUser}
        newApiName={newApiName}
        newClientId={newClientId}
        newSecret={newSecret}
        newAccessToken={newAccessToken}
        selectedTradingAccount={selectedTradingAccount}
        isTesting={isTesting}
        isTestSuccessful={isTestSuccessful}
        availableTradingAccounts={availableTradingAccounts}
        setSelectedUser={setSelectedUser}
        setNewApiName={setNewApiName}
        setNewClientId={setNewClientId}
        setNewSecret={setNewSecret}
        setNewAccessToken={setNewAccessToken}
        setSelectedTradingAccount={setSelectedTradingAccount}
        handleTestConnection={handleTestConnection}
        resetFormFields={resetFormFields}
      />
      
      {/* Edit Key Dialog */}
      <AddEditApiKeyDialog 
        isOpen={isEditKeyDialogOpen}
        onOpenChange={setIsEditKeyDialogOpen}
        onSave={handleSaveNewKey}
        editingKey={apiKeys.find(key => key.id === editingKeyId) || null}
        users={mockUsers}
        selectedUser={selectedUser}
        newApiName={newApiName}
        newClientId={newClientId}
        newSecret={newSecret}
        newAccessToken={newAccessToken}
        selectedTradingAccount={selectedTradingAccount}
        isTesting={isTesting}
        isTestSuccessful={isTestSuccessful}
        availableTradingAccounts={availableTradingAccounts}
        setSelectedUser={setSelectedUser}
        setNewApiName={setNewApiName}
        setNewClientId={setNewClientId}
        setNewSecret={setNewSecret}
        setNewAccessToken={setNewAccessToken}
        setSelectedTradingAccount={setSelectedTradingAccount}
        handleTestConnection={handleTestConnection}
        resetFormFields={resetFormFields}
      />
      
      {/* Update Token Dialog */}
      <AddEditApiKeyDialog 
        isOpen={isUpdateTokenDialogOpen}
        onOpenChange={setIsUpdateTokenDialogOpen}
        onSave={handleSaveUpdatedToken}
        editingKey={apiKeys.find(key => key.id === editingKeyId) || null}
        isEditingAccessTokenOnly={true}
        users={mockUsers}
        selectedUser={selectedUser}
        newApiName={newApiName}
        newClientId={newClientId}
        newSecret={newSecret}
        newAccessToken={newAccessToken}
        selectedTradingAccount={selectedTradingAccount}
        isTesting={isTesting}
        isTestSuccessful={isTestSuccessful}
        availableTradingAccounts={availableTradingAccounts}
        setSelectedUser={setSelectedUser}
        setNewApiName={setNewApiName}
        setNewClientId={setNewClientId}
        setNewSecret={setNewSecret}
        setNewAccessToken={setNewAccessToken}
        setSelectedTradingAccount={setSelectedTradingAccount}
        handleTestConnection={handleTestConnection}
        resetFormFields={resetFormFields}
      />
      
      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={isConnectAllDialogOpen}
        onOpenChange={setIsConnectAllDialogOpen}
        title="Connect All API Keys"
        description={`Are you sure you want to connect all ${selectedKeyIds.length} selected API keys?`}
        confirmText={isProcessingConnection ? "Processing..." : "Connect All"}
        isProcessing={isProcessingConnection}
        onConfirm={processConnectAll}
      />
      
      <ConfirmationDialog
        open={isDisconnectAllDialogOpen}
        onOpenChange={setIsDisconnectAllDialogOpen}
        title="Disconnect All API Keys"
        description={`Are you sure you want to disconnect all ${selectedKeyIds.length} selected API keys?`}
        confirmText={isProcessingConnection ? "Processing..." : "Disconnect All"}
        isProcessing={isProcessingConnection}
        onConfirm={processDisconnectAll}
        variant="danger"
      />
      
      {/* Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedKeyIds.length}
        onClose={clearSelection}
        onConnectAll={handleConnectAll}
        onDisconnectAll={handleDisconnectAll}
        isProcessing={isProcessingConnection}
      />
    </MainLayout>
  );
};

export default AccountProfile;
