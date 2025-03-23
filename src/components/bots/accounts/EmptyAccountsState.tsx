
import React from 'react';
import { Button } from '@/components/ui/button';

const EmptyAccountsState: React.FC = () => {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground mb-4">No accounts connected to this bot yet.</p>
      <Button>Add an Account</Button>
    </div>
  );
};

export default EmptyAccountsState;
