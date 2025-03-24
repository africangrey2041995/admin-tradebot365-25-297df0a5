
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoinstratSignal } from '@/types/signal';
import AccountSection from './AccountSection';
import { useToast } from '@/hooks/use-toast';
import SignalIdentifiers from './components/SignalIdentifiers';
import SignalInformation from './components/SignalInformation';
import ErrorInformation from './components/ErrorInformation';
import TimestampSection from './components/TimestampSection';

interface SignalDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  signal: CoinstratSignal | null;
  userId: string;
}

const SignalDetailModal: React.FC<SignalDetailModalProps> = ({ 
  open, 
  onOpenChange, 
  signal, 
  userId 
}) => {
  const { toast } = useToast();
  
  if (!signal) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} Copied`,
      description: `${label} has been copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Signal Details</DialogTitle>
          <DialogDescription>
            Detailed information about the signal and associated accounts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Signal Identifiers Section */}
          <SignalIdentifiers 
            originalSignalId={signal.originalSignalId}
            signalId={signal.id}
            onCopy={copyToClipboard}
          />
          
          {/* Signal Information Section */}
          <SignalInformation 
            signal={signal} 
            onCopy={copyToClipboard} 
          />
          
          {/* Processed Accounts Section */}
          <AccountSection 
            accounts={signal.processedAccounts}
            title="Processed Accounts"
            type="success"
            titleClassName="text-emerald-600"
            userId={userId}
          />
          
          {/* Failed Accounts Section */}
          <AccountSection 
            accounts={signal.failedAccounts}
            title="Failed Accounts"
            type="failed"
            titleClassName="text-red-600"
            userId={userId}
          />
          
          {/* Error Information Section (if any) */}
          <ErrorInformation 
            errorMessage={signal.errorMessage} 
            onCopy={copyToClipboard} 
          />
          
          {/* Timestamp Section */}
          <TimestampSection timestamp={signal.timestamp} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignalDetailModal;
