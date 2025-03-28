
import React, { useState } from 'react';
import { MoreHorizontal, Star, Mail, Link, Users, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { Account } from '@/types';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ConnectionStatus } from '@/types/connection';
import { useSafeLoading } from '@/hooks/signals/useSafeLoading';
import { toast } from 'sonner';

interface AccountCardProps {
  account: Account;
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string) => void;
  onReconnect: (clientId: string) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onEdit,
  onDelete,
  onReconnect,
}) => {
  const navigate = useNavigate();
  const { loading: isReconnecting, startLoading, stopLoading } = useSafeLoading({
    minLoadTime: 800
  });

  // Generate mock connection details for demo purposes
  // In a real implementation, these would come from the API
  const connectionDetails = {
    lastConnectionTime: account.status === 'Connected' ? 
      new Date(Date.now() - Math.random() * 86400000 * 5).toISOString() : undefined,
    lastDisconnectionTime: account.status === 'Disconnected' ? 
      new Date(Date.now() - Math.random() * 86400000 * 2).toISOString() : undefined,
    errorMessage: account.status === 'Disconnected' ? 
      ['API timeout', 'Authentication failed', 'Network error'][Math.floor(Math.random() * 3)] : undefined,
    reconnectAttempts: account.status === 'Disconnected' ? 
      Math.floor(Math.random() * 5) : 0,
    healthStatus: account.status === 'Connected' ? 
      ['healthy', 'warning', 'critical'][Math.floor(Math.random() * 3)] as 'healthy' | 'warning' | 'critical' : undefined,
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return 'AC';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get random pastel color for avatar background
  const getAvatarColor = (name: string) => {
    if (!name) return 'bg-blue-100 text-blue-600';
    
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600', 
      'bg-yellow-100 text-yellow-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-red-100 text-red-600',
      'bg-orange-100 text-orange-600',
      'bg-indigo-100 text-indigo-600',
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Truncate text with ellipsis in the middle if too long
  const truncateMiddle = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    const half = Math.floor(maxLength / 2);
    return `${text.substring(0, half)}...${text.substring(text.length - half)}`;
  };

  // Mock API and Account counts for demo purposes
  const getApiCount = () => {
    // This would come from actual data in production
    return Math.floor(Math.random() * 5) + 1;
  };
  
  const getAccountCount = () => {
    // This would come from actual data in production
    return Math.floor(Math.random() * 3) + 1;
  };

  const handleViewProfile = () => {
    navigate(`/accounts/${account.clientId}`);
  };

  const handleReconnect = () => {
    startLoading();
    
    // Simulate API call
    setTimeout(() => {
      onReconnect(account.clientId || '');
      stopLoading();
      toast.success('Kết nối lại thành công', {
        description: `Tài khoản ${account.cspAccountName} đã được kết nối lại.`
      });
    }, 1500);
  };

  return (
    <Card className="p-5 rounded-lg border shadow-sm hover:shadow transition-all duration-300">
      <div className="flex items-center gap-4">
        <Avatar className={cn("h-12 w-12", getAvatarColor(account.cspAccountName || ''))}>
          <AvatarFallback>{getInitials(account.cspAccountName || '')}</AvatarFallback>
        </Avatar>
        
        <div className="flex-grow">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="font-medium text-base">{account.cspAccountName}</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                  <Star className="h-4 w-4 text-muted-foreground" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(account.clientId || '')}>
                      Chỉnh Sửa Tài Khoản
                    </DropdownMenuItem>
                    {account.status === 'Disconnected' && (
                      <DropdownMenuItem 
                        onClick={handleReconnect}
                        disabled={isReconnecting}
                      >
                        {isReconnecting ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Đang kết nối lại...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Kết Nối Lại
                          </>
                        )}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => onDelete(account.clientId || '')}
                      className="text-destructive focus:text-destructive"
                    >
                      Xóa Tài Khoản
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-1 flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1" />
              <span>{truncateMiddle(account.cspUserEmail || 'user@coinstratpro.com', 24)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Link className="h-4 w-4 text-blue-500" />
            <span className="text-lg font-semibold">{getApiCount()}</span>
          </div>
          <div className="text-xs text-muted-foreground">APIs</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Users className="h-4 w-4 text-green-500" />
            <span className="text-lg font-semibold">{getAccountCount()}</span>
          </div>
          <div className="text-xs text-muted-foreground">Accounts</div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <StatusIndicator 
          status={account.status as ConnectionStatus} 
          showLabel
          lastUpdated={account.lastUpdated}
          lastConnectionTime={connectionDetails.lastConnectionTime}
          lastDisconnectionTime={connectionDetails.lastDisconnectionTime}
          errorMessage={connectionDetails.errorMessage}
          reconnectAttempts={connectionDetails.reconnectAttempts}
          healthStatus={connectionDetails.healthStatus}
          onReconnect={account.status === 'Disconnected' ? handleReconnect : undefined}
          isReconnecting={isReconnecting}
          showControls
        />
        <Button variant="outline" size="sm" className="text-sm" onClick={handleViewProfile}>
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default AccountCard;
