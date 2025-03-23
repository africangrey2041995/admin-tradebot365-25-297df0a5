
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const EmptyAccountsState: React.FC = () => {
  return (
    <div className="py-10 text-center">
      <div className="max-w-sm mx-auto">
        <p className="text-muted-foreground mb-4">No accounts connected to this bot yet.</p>
        <p className="text-muted-foreground mb-6">Connect an account to start using automated trading with this bot.</p>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add an Account
        </Button>
      </div>
    </div>
  );
};

export default EmptyAccountsState;
