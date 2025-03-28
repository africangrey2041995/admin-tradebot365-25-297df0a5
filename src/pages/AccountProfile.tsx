import React, { useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell, TableCaption 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Key, MoreHorizontal, Copy, Pencil, Eye, EyeOff, 
  ChevronLeft, Plus, Trash, Link2, Power, Clock, Shield, ShieldAlert, CircleDot,
  User, Link, ArrowRight, Filter, SortAsc, SortDesc, Search, AlignJustify, 
  CheckCircle, XCircle, RefreshCw, Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BulkActionBar from '@/components/floating/BulkActionBar';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { ConnectionStatus } from '@/types/connection';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';

interface ApiKey {
  id: string;
  name: string;
  clientId: string;
  secretKey: string;
  accessToken: string;
  accountTrading: string;
  createdAt: string;
  expiryDate: string;
  status: 'ACTIVE' | 'BLOCK';
  connectionStatus?: ConnectionStatus;
}

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

const AccountProfile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const keys = generateMockApiKeys(accountId || '');
    return keys.map(key => ({
      ...key,
      connectionStatus: Math.random() > 0.5 ? 'Connected' : 'Disconnected'
    }));
  });
  
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [isEditKeyDialogOpen, setIsEditKeyDialogOpen] = useState(false);
  const [isUpdateTokenDialogOpen, setIsUpdateTokenDialogOpen] = useState(false);
  const [selectedKeyIds, setSelectedKeyIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isConnectAllDialogOpen, setIsConnectAllDialogOpen] = useState(false);
  const [isDisconnectAllDialogOpen, setIsDisconnectAllDialogOpen] = useState(false);
  
  const { loading: isProcessingConnection, startLoading, stopLoading } = useSafeLoading({
    minLoadingDurationMs: 800
  });
  
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

  const filteredAndSortedApiKeys = useMemo(() => {
    let result = [...apiKeys];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(key => 
        key.name.toLowerCase().includes(query) || 
        key.clientId.toLowerCase().includes(query)
      );
    }
    
    if (filterStatus !== 'all') {
      if (filterStatus === 'connected') {
        result = result.filter(key => key.connectionStatus === 'Connected');
      } else if (filterStatus === 'disconnected') {
        result = result.filter(key => key.connectionStatus === 'Disconnected');
      }
    }
    
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
        
        return { ...key, connectionStatus: newStatus };
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

  const parseAccountTrading = (accountTradingStr: string) => {
    const parts = accountTradingStr.split('|');
    return {
      accountId: parts[0] || '',
      type: parts[1] || '',
      balance: parts[2] || ''
    };
  };

  const daysRemaining = (expiryDate: string) => {
    return Math.floor((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <MainLayout title={accountName}>
      <div className="mb-6 space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/accounts')}
          className="mb-2"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Accounts
        </Button>
        
        <Card className="border border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center space-y-0 gap-4 pb-2">
            <Avatar className="h-16 w-16 bg-primary/10 text-primary">
              <AvatarFallback>
                {accountName.split(' ').map(w => w[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">{accountName}</CardTitle>
              <CardDescription className="flex items-center text-muted-foreground">
                <Key className="h-4 w-4 mr-1" />
                API Keys and Connections
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            <Key className="h-5 w-5 mr-2 text-primary" />
            API Keys
          </h3>
          <Button onClick={handleAddKey} className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Add API Key
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Tìm kiếm API key..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>
                    {filterStatus === 'all' && 'Tất cả trạng thái'}
                    {filterStatus === 'connected' && 'Đã kết nối'}
                    {filterStatus === 'disconnected' && 'Chưa kết nối'}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="connected">Đã kết nối</SelectItem>
                <SelectItem value="disconnected">Chưa kết nối</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortField} onValueChange={setSortField}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <AlignJustify className="h-4 w-4" />
                  <span>
                    {sortField === 'name' && 'Tên API'}
                    {sortField === 'clientId' && 'Client ID'}
                    {sortField === 'connectionStatus' && 'Kết nối'}
                    {sortField === 'expiry' && 'Hết hạn'}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Tên API</SelectItem>
                <SelectItem value="clientId">Client ID</SelectItem>
                <SelectItem value="connectionStatus">Kết nối</SelectItem>
                <SelectItem value="expiry">Hết hạn</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="h-10 w-10"
            >
              {sortDirection === 'asc' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={filteredAndSortedApiKeys.length > 0 && selectedKeyIds.length === filteredAndSortedApiKeys.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[120px] rounded-tl-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="px-0 font-medium"
                      onClick={() => toggleSort('name')}
                    >
                      Name
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? 
                          <SortAsc className="ml-1 h-3.5 w-3.5" /> : 
                          <SortDesc className="ml-1 h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="px-0 font-medium"
                      onClick={() => toggleSort('clientId')}
                    >
                      Client ID
                      {sortField === 'clientId' && (
                        sortDirection === 'asc' ? 
                          <SortAsc className="ml-1 h-3.5 w-3.5" /> : 
                          <SortDesc className="ml-1 h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[150px]">Secret</TableHead>
                  <TableHead className="w-[150px]">Access Token</TableHead>
                  <TableHead className="w-[150px]">Account Trading</TableHead>
                  <TableHead className="w-[150px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="px-0 font-medium"
                      onClick={() => toggleSort('expiry')}
                    >
                      Expiry
                      {sortField === 'expiry' && (
                        sortDirection === 'asc' ? 
                          <SortAsc className="ml-1 h-3.5 w-3.5" /> : 
                          <SortDesc className="ml-1 h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[120px]">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="px-0 font-medium"
                      onClick={() => toggleSort('connectionStatus')}
                    >
                      Kết nối
                      {sortField === 'connectionStatus' && (
                        sortDirection === 'asc' ? 
                          <SortAsc className="ml-1 h-3.5 w-3.5" /> : 
                          <SortDesc className="ml-1 h-3.5 w-3.5" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px] text-right rounded-tr-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedApiKeys.map((key) => {
                  const account = parseAccountTrading(key.accountTrading);
                  return (
                    <TableRow key={key.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedKeyIds.includes(key.id)}
                          onCheckedChange={() => toggleSelectKey(key.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2 bg-primary"></div>
                          {key.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 w-full">
                          <span className="truncate max-w-[100px]">{key.clientId}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => copyToClipboard(key.clientId, 'Client ID')}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 w-full">
                          <span className="truncate max-w-[80px] font-mono text-xs">{showSecrets[key.id] ? '1234-5678-9012-3456' : key.secretKey}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => toggleShowSecret(key.id)}
                          >
                            {showSecrets[key.id] ? 
                              <EyeOff className="h-3.5 w-3.5" /> : 
                              <Eye className="h-3.5 w-3.5" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => copyToClipboard(showSecrets[key.id] ? '1234-5678-9012-3456' : 'Your secret key is hidden', 'Secret Key')}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 w-full">
                          <span className="truncate max-w-[80px] font-mono text-xs">{showSecrets[key.id] ? 'eyJhbGciOiJIUzI1NiIsIn...' : key.accessToken}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => toggleShowSecret(key.id)}
                          >
                            {showSecrets[key.id] ? 
                              <EyeOff className="h-3.5 w-3.5" /> : 
                              <Eye className="h-3.5 w-3.5" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 flex-shrink-0 hover:bg-primary/10 hover:text-primary"
                            onClick={() => copyToClipboard(showSecrets[key.id] ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' : 'Your access token is hidden', 'Access Token')}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center">
                            <CircleDot 
                              className={cn(
                                "h-4 w-4 flex-shrink-0",
                                account.type.toLowerCase() === 'live' ? "text-success" : "text-warning"
                              )} 
                              fill={account.type.toLowerCase() === 'live' ? "#04ce91" : "#f59e0b"}
                              strokeWidth={0}
                            />
                          </div>
                          <span className="whitespace-nowrap font-mono text-xs">
                            {account.accountId}
                            <span className={cn(
                              "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                              account.type.toLowerCase() === 'live' 
                                ? "bg-success" : "bg-warning"
                            )}>
                              {account.type}
                            </span>
                            <span className="ml-1">${account.balance}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-orange-500" />
                          <span className="whitespace-nowrap text-xs">
                            {new Date(key.expiryDate).toLocaleDateString()} 
                            <span className={cn(
                              "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                              daysRemaining(key.expiryDate) < 7 ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
                            )}>
                              {daysRemaining(key.expiryDate)} days
                            </span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={key.connectionStatus as ConnectionStatus || 'Disconnected'} 
                          showLabel
                          showControls
                          onReconnect={key.connectionStatus === 'Disconnected' ? () => handleToggleConnectionStatus(key.id) : undefined}
                          onDisconnect={key.connectionStatus === 'Connected' ? () => handleToggleConnectionStatus(key.id) : undefined}
                          size="sm"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleEditKey(key)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateAccessToken(key)}>
                              <Link2 className="h-4 w-4 mr-2" />
                              Update Access Token
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(key.id)}>
                              <Power className="h-4 w-4 mr-2" />
                              {key.status === 'ACTIVE' ? 'Block' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteKey(key.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialogs for API Key Management */}
      <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New API Key</DialogTitle>
            <DialogDescription>
              Connect a new API key to this account
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user-account">User Account</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger id="user-account">
                    <SelectValue placeholder="Select user account" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} - {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="api-name">API Name</Label>
                <Input 
                  id="api-name" 
                  placeholder="Enter API name" 
                  value={newApiName}
                  onChange={(e) => setNewApiName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-id">Client ID</Label>
                <Input 
                  id="client-id" 
                  placeholder="Enter client ID" 
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="secret-key">Secret Key</Label>
                <Input 
                  id="secret-key" 
                  type="password" 
                  placeholder="Enter secret key" 
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="access-token">Access Token</Label>
              <Input 
                id="access-token" 
                placeholder="Enter access token" 
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
            
            {isTestSuccessful && (
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
              onClick={() => {
                resetFormFields();
                setIsAddKeyDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewKey} 
              disabled={!isTestSuccessful || !selectedTradingAccount}
            >
              Save API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditKeyDialogOpen} onOpenChange={setIsEditKeyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
            <DialogDescription>
              Update API key information
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-api-name">API Name</Label>
                <Input 
                  id="edit-api-name" 
                  placeholder="Enter API name" 
                  value={newApiName}
                  onChange={(e) => setNewApiName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-client-id">Client ID</Label>
                <Input 
                  id="edit-client-id" 
                  placeholder="Enter client ID" 
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-secret-key">Secret Key (leave blank to keep current)</Label>
              <Input 
                id="edit-secret-key" 
                type="password" 
                placeholder="Enter new secret key" 
                value={newSecret}
                onChange={(e) => setNewSecret(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-access-token">Access Token</Label>
              <Input 
                id="edit-access-token" 
                placeholder="Enter access token" 
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
            
            {isTestSuccessful && (
              <div>
                <Label htmlFor="edit-trading-account">Trading Account</Label>
                <Select value={selectedTradingAccount} onValueChange={setSelectedTradingAccount}>
                  <SelectTrigger id="edit-trading-account">
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
              onClick={() => {
                resetFormFields();
                setIsEditKeyDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewKey}
              disabled={!newApiName.trim() || !newClientId.trim() || (!isTestSuccessful && Boolean(newAccessToken.trim()))}
            >
              Update API Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isUpdateTokenDialogOpen} onOpenChange={setIsUpdateTokenDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Access Token</DialogTitle>
            <DialogDescription>
              Update the access token for this API key
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div>
              <Label htmlFor="update-access-token">New Access Token</Label>
              <Input 
                id="update-access-token" 
                placeholder="Enter new access token" 
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
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                resetFormFields();
                setIsUpdateTokenDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUpdatedToken}
              disabled={!isTestSuccessful || !newAccessToken.trim()}
            >
              Update Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
