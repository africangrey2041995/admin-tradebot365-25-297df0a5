
import React from 'react';
import CopyableField from './CopyableField';
import { CoinstratSignal } from '@/types/signal';

interface SignalInformationProps {
  signal: CoinstratSignal;
  onCopy: (text: string, label: string) => void;
  showToken?: boolean;
}

const SignalInformation: React.FC<SignalInformationProps> = ({
  signal,
  onCopy,
  showToken = false
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className="text-sm font-medium mb-2">Signal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <CopyableField
          label="Instrument"
          value={signal.instrument}
          tooltip="Trading pair or financial instrument"
          onCopy={onCopy}
        />
        <CopyableField
          label="Action"
          value={signal.action}
          tooltip="Trading action to perform (buy/sell/enter/exit)"
          onCopy={onCopy}
        />
        <CopyableField
          label="Amount"
          value={signal.amount}
          tooltip="Trading amount or percentage of account balance"
          onCopy={onCopy}
        />
        <CopyableField
          label="Status"
          value={signal.status}
          tooltip="Current status of this signal"
          onCopy={onCopy}
        />
        {showToken && (
          <CopyableField
            label="Signal Token"
            value={signal.signalToken || 'N/A'}
            tooltip="Security token to validate signal authenticity"
            className="col-span-2"
            onCopy={onCopy}
          />
        )}
        <CopyableField
          label="Max Lag"
          value={signal.maxLag || 'N/A'}
          tooltip="Maximum allowed delay for signal processing in milliseconds"
          onCopy={onCopy}
        />
      </div>
    </div>
  );
};

export default SignalInformation;
