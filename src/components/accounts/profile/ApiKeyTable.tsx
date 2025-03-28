
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Copy, Eye, EyeOff, MoreHorizontal, Pencil, Link2, Trash2, Power, 
  CircleDot, SortAsc, SortDesc
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { ConnectionStatus } from '@/types/connection';

export interface ApiKey {
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

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  selectedKeyIds: string[];
  showSecrets: Record<string, boolean>;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onToggleSort: (field: string) => void;
  onToggleSelectAll: () => void;
  onToggleSelectKey: (keyId: string) => void;
  onToggleShowSecret: (keyId: string) => void;
  onCopyToClipboard: (text: string, label: string) => void;
  onEditKey: (key: ApiKey) => void;
  onUpdateAccessToken: (key: ApiKey) => void;
  onToggleStatus: (keyId: string) => void;
  onDeleteKey: (keyId: string) => void;
  onToggleConnectionStatus: (keyId: string) => void;
}

const ApiKeyTable: React.FC<ApiKeyTableProps> = ({
  apiKeys,
  selectedKeyIds,
  showSecrets,
  sortField,
  sortDirection,
  onToggleSort,
  onToggleSelectAll,
  onToggleSelectKey,
  onToggleShowSecret,
  onCopyToClipboard,
  onEditKey,
  onUpdateAccessToken,
  onToggleStatus,
  onDeleteKey,
  onToggleConnectionStatus
}) => {
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
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableHead className="w-[50px]">
            <Checkbox 
              checked={apiKeys.length > 0 && selectedKeyIds.length === apiKeys.length}
              onCheckedChange={onToggleSelectAll}
            />
          </TableHead>
          <TableHead className="w-[120px] rounded-tl-lg">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-0 font-medium"
              onClick={() => onToggleSort('name')}
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
              onClick={() => onToggleSort('clientId')}
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
              onClick={() => onToggleSort('expiry')}
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
              onClick={() => onToggleSort('connectionStatus')}
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
        {apiKeys.map((key) => {
          const account = parseAccountTrading(key.accountTrading);
          return (
            <TableRow key={key.id}>
              <TableCell>
                <Checkbox 
                  checked={selectedKeyIds.includes(key.id)}
                  onCheckedChange={() => onToggleSelectKey(key.id)}
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
                    onClick={() => onCopyToClipboard(key.clientId, 'Client ID')}
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
                    onClick={() => onToggleShowSecret(key.id)}
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
                    onClick={() => onCopyToClipboard(showSecrets[key.id] ? '1234-5678-9012-3456' : 'Your secret key is hidden', 'Secret Key')}
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
                    onClick={() => onToggleShowSecret(key.id)}
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
                    onClick={() => onCopyToClipboard(showSecrets[key.id] ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' : 'Your access token is hidden', 'Access Token')}
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
                  onReconnect={key.connectionStatus === 'Disconnected' ? () => onToggleConnectionStatus(key.id) : undefined}
                  onDisconnect={key.connectionStatus === 'Connected' ? () => onToggleConnectionStatus(key.id) : undefined}
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
                    <DropdownMenuLabel>Tùy chọn tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEditKey(key)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateAccessToken(key)}>
                      <Link2 className="h-4 w-4 mr-2" />
                      Update Access Token
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleStatus(key.id)}>
                      <Power className="h-4 w-4 mr-2" />
                      {key.status === 'ACTIVE' ? 'Block' : 'Activate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDeleteKey(key.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
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
  );
};

export default ApiKeyTable;
