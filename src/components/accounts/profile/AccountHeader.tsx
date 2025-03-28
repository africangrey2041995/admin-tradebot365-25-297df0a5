
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccountHeaderProps {
  accountName: string;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({ accountName }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default AccountHeader;
