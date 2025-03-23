
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
import { Button } from '@/components/ui/button';
import { Copy, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  const InfoTooltip = ({ content, children }: { content: string, children: React.ReactNode }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center">
            {children}
            <Info className="h-3 w-3 ml-1 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const CopyableField = ({ 
    label, 
    value, 
    tooltip, 
    className = "" 
  }: { 
    label: string; 
    value: string; 
    tooltip: string; 
    className?: string;
  }) => (
    <div className={className}>
      <h4 className="text-xs text-muted-foreground">
        <InfoTooltip content={tooltip}>{label}</InfoTooltip>
      </h4>
      <div className="flex items-center mt-1">
        <p className="text-sm font-medium break-all mr-1">{value}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0" 
          onClick={() => copyToClipboard(value, label)}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

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
          <div className="grid grid-cols-2 gap-4">
            <CopyableField 
              label="TradingView ID" 
              value={signal.originalSignalId} 
              tooltip="Unique identifier from TradingView signal source"
            />
            <CopyableField 
              label="Coinstrat Pro ID" 
              value={signal.id} 
              tooltip="Internal system identifier for this signal"
            />
          </div>
          
          {/* Signal Information Section */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Signal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <CopyableField 
                label="Instrument" 
                value={signal.instrument} 
                tooltip="Trading pair or financial instrument"
              />
              <CopyableField 
                label="Action" 
                value={signal.action} 
                tooltip="Trading action to perform (buy/sell/enter/exit)"
              />
              <CopyableField 
                label="Amount" 
                value={signal.amount} 
                tooltip="Trading amount or percentage of account balance"
              />
              <CopyableField 
                label="Status" 
                value={signal.status} 
                tooltip="Current status of this signal"
              />
              <CopyableField 
                label="Signal Token" 
                value={signal.signalToken} 
                tooltip="Security token to validate signal authenticity"
                className="col-span-2"
              />
              <CopyableField 
                label="Max Lag" 
                value={signal.maxLag} 
                tooltip="Maximum allowed delay for signal processing in milliseconds"
              />
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
              <div className="flex items-center">
                <p className="text-sm text-red-600">{signal.errorMessage}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 ml-1 p-0" 
                  onClick={() => copyToClipboard(signal.errorMessage, "Error Message")}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Timestamp Section */}
          <div className="border-t pt-4">
            <h4 className="text-xs text-muted-foreground">
              <InfoTooltip content="Date and time when this signal was received by the system">
                Timestamp
              </InfoTooltip>
            </h4>
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
