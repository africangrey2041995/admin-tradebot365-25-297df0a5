
import React, { useState } from 'react';
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
import { 
  Key, MoreHorizontal, Copy, Pencil, Eye, EyeOff, 
  ChevronLeft, Plus, Trash, Link2, Power, Clock, Shield, ShieldAlert, CircleDot,
  User, Link, ArrowRight
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(generateMockApiKeys(accountId || ''));
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [isEditKeyDialogOpen, setIsEditKeyDialogOpen] = useState(false);
  const [isUpdateTokenDialogOpen, setIsUpdateTokenDialogOpen] = useState(false);
  
  // State for add/edit API key
  const [selectedUser, setSelectedUser] = useState('');
  const [newApiName, setNewApiName] = useState('');
  const [newClientId, setNewClientId] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [newAccessToken, setNewAccessToken] = useState('');
  const [selectedTradingAccount, setSelectedTradingAccount] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isTestSuccessful, setIsTestSuccessful] = useState(false);
  const [availableTradingAccounts, setAvailableTradingAccounts] = useState(mockTradingAccounts);

  // State for editing
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [isEditingAccessTokenOnly, setIsEditingAccessTokenOnly] = useState(false);
  
  const accountName = `Account ${accountId?.slice(-3)}`;

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
      // Update existing key
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
          
          if (isTestSuccessful && newAccessToken.trim()) {
            updatedKey.accessToken = newAccessToken;
          }
          
          return updatedKey;
        }
        return key;
      }));
      
      toast.success(isEditingAccessTokenOnly ? 'Access token updated successfully' : 'API key updated successfully');
    } else {
      // Add new key
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
        
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[120px] rounded-tl-lg">Name</TableHead>
                  <TableHead className="w-[150px]">Client ID</TableHead>
                  <TableHead className="w-[150px]">Secret</TableHead>
                  <TableHead className="w-[150px]">Access Token</TableHead>
                  <TableHead className="w-[150px]">Account Trading</TableHead>
                  <TableHead className="w-[150px]">Expiry</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[80px] text-right rounded-tr-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => {
                  const account = parseAccountTrading(key.accountTrading);
                  return (
                    <TableRow key={key.id}>
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
                        <div className="flex items-center">
                          {key.status === 'ACTIVE' ? (
                            <Shield className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                          ) : (
                            <ShieldAlert className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                          )}
                          <Badge className={cn(
                            "text-xs font-medium px-2 py-0.5",
                            key.status === 'ACTIVE' 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          )}>
                            {key.status}
                          </Badge>
                        </div>
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
                            <DropdownMenuItem onClick={() => handleToggleStatus(key.id)}>
                              <Power className="h-4 w-4 mr-2" />
                              {key.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateAccessToken(key)}>
                              <Link2 className="h-4 w-4 mr-2" />
                              Update Access Token
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteKey(key.id)}
                              className="text-destructive focus:text-destructive"
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

      {/* Add New API Key Dialog */}
      <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add API Key</DialogTitle>
            <DialogDescription>
              Add a new API key to connect your account to external services.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="userAccount" className="text-sm font-medium flex items-center">
                User Account <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Select User Account
                </Label>
                <Select 
                  value={selectedUser} 
                  onValueChange={setSelectedUser}
                >
                  <SelectTrigger className="w-full border-primary/30 focus-visible:ring-primary">
                    <SelectValue placeholder="Select user for this account" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span>
                            {user.name} - {user.email}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiName" className="text-sm font-medium flex items-center">
                API Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  API Name
                </Label>
                <Input 
                  id="apiName" 
                  placeholder="Enter API name"
                  value={newApiName}
                  onChange={(e) => setNewApiName(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId" className="text-sm font-medium flex items-center">
                Client ID <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Client ID
                </Label>
                <Input 
                  id="clientId" 
                  placeholder="Enter client ID"
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secret" className="text-sm font-medium flex items-center">
                Secret <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Secret
                </Label>
                <Input 
                  id="secret" 
                  placeholder="Enter secret key"
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                  type="password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken" className="text-sm font-medium flex items-center">
                Access Token <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Access Token
                </Label>
                <div className="flex gap-2">
                  <Input 
                    id="accessToken" 
                    placeholder="Enter access token"
                    value={newAccessToken}
                    onChange={(e) => setNewAccessToken(e.target.value)}
                    className="border-primary/30 focus-visible:ring-primary flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleTestConnection}
                    disabled={isTesting || !newAccessToken.trim()}
                    className="whitespace-nowrap"
                  >
                    {isTesting ? (
                      <span className="flex items-center">
                        <Pencil className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Test
                      </span>
                    )}
                  </Button>
                </div>
                {isTestSuccessful && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    Connection successful!
                  </p>
                )}
              </div>
            </div>

            {isTestSuccessful && (
              <div className="space-y-2">
                <Label htmlFor="tradingAccount" className="text-sm font-medium flex items-center">
                  Account Trading <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                    Select Account Trading
                  </Label>
                  <Select 
                    value={selectedTradingAccount} 
                    onValueChange={setSelectedTradingAccount}
                  >
                    <SelectTrigger className="w-full border-primary/30 focus-visible:ring-primary">
                      <SelectValue placeholder="Select a trading account" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTradingAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex items-center space-x-2">
                            <CircleDot 
                              className={cn(
                                "h-3 w-3",
                                account.type === 'Live' ? "text-success" : "text-warning"
                              )} 
                              fill={account.type === 'Live' ? "#04ce91" : "#f59e0b"}
                              strokeWidth={0}
                            />
                            <span>
                              {account.id} - 
                              <span className={account.type === 'Live' ? "text-success" : "text-warning"}>
                                {account.type}
                              </span> 
                              - ${account.balance}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between items-center gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsAddKeyDialogOpen(false)}
              className="flex-1 sm:flex-initial"
            >
              Close
            </Button>
            <Button 
              onClick={handleSaveNewKey} 
              className="flex-1 sm:flex-initial bg-primary hover:bg-primary/90"
              disabled={!selectedUser || !newApiName.trim() || !newClientId.trim() || !newSecret.trim() || 
                !isTestSuccessful || !selectedTradingAccount}
            >
              Create API
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit API Key Dialog */}
      <Dialog open={isEditKeyDialogOpen} onOpenChange={setIsEditKeyDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit API Key</DialogTitle>
            <DialogDescription>
              Modify the settings for this API key.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiName" className="text-sm font-medium flex items-center">
                API Name <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  API Name
                </Label>
                <Input 
                  id="apiName" 
                  placeholder="Enter API name"
                  value={newApiName}
                  onChange={(e) => setNewApiName(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId" className="text-sm font-medium flex items-center">
                Client ID <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Client ID
                </Label>
                <Input 
                  id="clientId" 
                  placeholder="Enter client ID"
                  value={newClientId}
                  onChange={(e) => setNewClientId(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secret" className="text-sm font-medium flex items-center">
                Secret <span className="text-muted-foreground ml-1">(leave blank to keep current)</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Secret
                </Label>
                <Input 
                  id="secret" 
                  placeholder="Enter new secret key (optional)"
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  className="border-primary/30 focus-visible:ring-primary"
                  type="password"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken" className="text-sm font-medium flex items-center">
                Access Token <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Access Token
                </Label>
                <div className="flex gap-2">
                  <Input 
                    id="accessToken" 
                    placeholder="Enter access token"
                    value={newAccessToken}
                    onChange={(e) => setNewAccessToken(e.target.value)}
                    className="border-primary/30 focus-visible:ring-primary flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleTestConnection}
                    disabled={isTesting || !newAccessToken.trim()}
                    className="whitespace-nowrap"
                  >
                    {isTesting ? (
                      <span className="flex items-center">
                        <Pencil className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Test
                      </span>
                    )}
                  </Button>
                </div>
                {isTestSuccessful && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    Connection successful!
                  </p>
                )}
              </div>
            </div>

            {isTestSuccessful && (
              <div className="space-y-2">
                <Label htmlFor="tradingAccount" className="text-sm font-medium flex items-center">
                  Account Trading <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                    Select Account Trading
                  </Label>
                  <Select 
                    value={selectedTradingAccount} 
                    onValueChange={setSelectedTradingAccount}
                  >
                    <SelectTrigger className="w-full border-primary/30 focus-visible:ring-primary">
                      <SelectValue placeholder="Select a trading account" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTradingAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex items-center space-x-2">
                            <CircleDot 
                              className={cn(
                                "h-3 w-3",
                                account.type === 'Live' ? "text-success" : "text-warning"
                              )} 
                              fill={account.type === 'Live' ? "#04ce91" : "#f59e0b"}
                              strokeWidth={0}
                            />
                            <span>
                              {account.id} - 
                              <span className={account.type === 'Live' ? "text-success" : "text-warning"}>
                                {account.type}
                              </span> 
                              - ${account.balance}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between items-center gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsEditKeyDialogOpen(false)}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNewKey} 
              className="flex-1 sm:flex-initial bg-primary hover:bg-primary/90"
              disabled={!newApiName.trim() || !newClientId.trim() || !selectedTradingAccount}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Access Token Dialog */}
      <Dialog open={isUpdateTokenDialogOpen} onOpenChange={setIsUpdateTokenDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Update Access Token</DialogTitle>
            <DialogDescription>
              Update the access token for this API key.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="newAccessToken" className="text-sm font-medium flex items-center">
                New Access Token <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Label className="text-xs text-primary absolute -top-2.5 left-3 px-1 bg-background">
                  Access Token
                </Label>
                <div className="flex gap-2">
                  <Input 
                    id="newAccessToken" 
                    placeholder="Enter new access token"
                    value={newAccessToken}
                    onChange={(e) => setNewAccessToken(e.target.value)}
                    className="border-primary/30 focus-visible:ring-primary flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={handleTestConnection}
                    disabled={isTesting || !newAccessToken.trim()}
                    className="whitespace-nowrap"
                  >
                    {isTesting ? (
                      <span className="flex items-center">
                        <Pencil className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Test
                      </span>
                    )}
                  </Button>
                </div>
                {isTestSuccessful && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    Connection successful!
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateTokenDialogOpen(false)}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveUpdatedToken}
              className="flex-1 sm:flex-initial bg-primary hover:bg-primary/90"
              disabled={!isTestSuccessful || !newAccessToken.trim()}
            >
              Update Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AccountProfile;
