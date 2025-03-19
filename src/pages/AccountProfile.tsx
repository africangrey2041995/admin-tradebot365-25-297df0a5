
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
  Key, MoreHorizontal, Copy, RefreshCw, Eye, EyeOff, 
  ChevronLeft, Plus, Pencil, Trash, Link2, Power
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
import { Label } from '@/components/ui/label';

// Mock data for API keys
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
  return Array(5).fill(null).map((_, index) => ({
    id: `key-${index}`,
    name: `Streamlab`,
    clientId: `${accountId}-client-${index}`,
    secretKey: '*********************',
    accessToken: '*********************',
    accountTrading: Math.random() > 0.5 ? '554466|Live|5000' : '10',
    createdAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days
    status: Math.random() > 0.3 ? 'ACTIVE' : 'BLOCK',
  }));
};

const AccountProfile = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(generateMockApiKeys(accountId || ''));
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [isAddKeyDialogOpen, setIsAddKeyDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Mock account data based on accountId
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
    setIsAddKeyDialogOpen(true);
  };

  const handleSaveNewKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a key name');
      return;
    }
    
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      clientId: `${accountId}-client-new`,
      secretKey: '*********************',
      accessToken: '*********************',
      accountTrading: Math.random() > 0.5 ? '554466|Live|5000' : '10',
      createdAt: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      status: 'ACTIVE',
    };
    
    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setIsAddKeyDialogOpen(false);
    
    toast.success('New API key added successfully');
  };

  const handleRegenerateKey = (keyId: string) => {
    toast.success(`API Key regenerated successfully`);
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

  const handleUpdateToken = (keyId: string) => {
    toast.success('Access token updated successfully');
  };

  return (
    <MainLayout title={accountName}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/accounts')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Accounts
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 bg-blue-100 text-blue-600">
            <AvatarFallback>
              {accountName.split(' ').map(w => w[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{accountName}</h2>
            <p className="text-muted-foreground flex items-center">
              <Key className="h-4 w-4 mr-1" />
              API Keys and Connections
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">API Keys</h3>
          <Button onClick={handleAddKey}>
            <Plus className="h-4 w-4 mr-2" />
            Add API Key
          </Button>
        </div>
        
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Name</TableHead>
                <TableHead className="w-[150px]">Client ID</TableHead>
                <TableHead className="w-[150px]">Secret</TableHead>
                <TableHead className="w-[150px]">Access Token</TableHead>
                <TableHead className="w-[150px]">Account Trading</TableHead>
                <TableHead className="w-[150px]">Expiry Date</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[80px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 w-full">
                      <span className="truncate max-w-[100px]">{key.clientId}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => copyToClipboard(key.clientId, 'Client ID')}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 w-full">
                      <span className="truncate max-w-[80px]">{showSecrets[key.id] ? '1234-5678-9012-3456' : key.secretKey}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
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
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => copyToClipboard(showSecrets[key.id] ? '1234-5678-9012-3456' : 'Your secret key is hidden', 'Secret Key')}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 w-full">
                      <span className="truncate max-w-[80px]">{showSecrets[key.id] ? 'eyJhbGciOiJIUzI1NiIsIn...' : key.accessToken}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 flex-shrink-0"
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
                        className="h-6 w-6 p-0 flex-shrink-0"
                        onClick={() => copyToClipboard(showSecrets[key.id] ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' : 'Your access token is hidden', 'Access Token')}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="whitespace-nowrap">{key.accountTrading}</span>
                  </TableCell>
                  <TableCell>
                    <span className="whitespace-nowrap text-sm text-orange-500">
                      {new Date(key.expiryDate).toLocaleDateString()} ({Math.floor((new Date(key.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days)
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "text-xs font-medium",
                      key.status === 'ACTIVE' 
                        ? "bg-green-100 text-green-800 hover:bg-green-100" 
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    )}>
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRegenerateKey(key.id)}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate Key
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(key.id)}>
                          <Power className="h-4 w-4 mr-2" />
                          {key.status === 'ACTIVE' ? 'Disable' : 'Enable'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateToken(key.id)}>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add API Key Dialog */}
      <Dialog open={isAddKeyDialogOpen} onOpenChange={setIsAddKeyDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key for this account to enable connections.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="keyName">Key Name</Label>
              <Input 
                id="keyName" 
                placeholder="Enter a name for this API key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewKey} disabled={!newKeyName.trim()}>
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AccountProfile;
