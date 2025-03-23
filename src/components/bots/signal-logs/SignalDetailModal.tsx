
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoinstratSignal } from '@/types/signal';
import FormatDateTime from './FormatDateTime';
import AccountSection from './AccountSection';

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
  if (!signal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Signal Details</DialogTitle>
          <DialogDescription>
            Detailed information about the signal and associated accounts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Signal Identifiers Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">TradingView ID</h3>
              <p className="text-sm font-semibold">{signal.originalSignalId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Coinstrat Pro ID</h3>
              <p className="text-sm font-semibold">{signal.id}</p>
            </div>
          </div>
          
          {/* Signal Information Section */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Signal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs text-muted-foreground">Instrument</h4>
                <p className="text-sm font-medium">{signal.instrument}</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground">Action</h4>
                <p className="text-sm font-medium">{signal.action}</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground">Amount</h4>
                <p className="text-sm font-medium">{signal.amount}</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground">Status</h4>
                <p className="text-sm font-medium">{signal.status}</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground">Signal Token</h4>
                <p className="text-sm font-medium break-all">{signal.signalToken}</p>
              </div>
              <div>
                <h4 className="text-xs text-muted-foreground">Max Lag</h4>
                <p className="text-sm font-medium">{signal.maxLag}</p>
              </div>
            </div>
          </div>
          
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
          {signal.errorMessage && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-red-600 mb-2">Error Information</h3>
              <p className="text-sm text-red-600">{signal.errorMessage}</p>
            </div>
          )}
          
          {/* Timestamp Section */}
          <div className="border-t pt-4">
            <h4 className="text-xs text-muted-foreground">Timestamp</h4>
            <p className="text-sm font-medium">
              <FormatDateTime 
                timestamp={signal.timestamp} 
                options={{
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                }}
              />
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignalDetailModal;
