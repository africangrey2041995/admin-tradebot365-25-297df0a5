
import React from 'react';
import CopyableField from './CopyableField';

interface SignalIdentifiersProps {
  originalSignalId: string;
  signalId: string;
  onCopy: (text: string, label: string) => void;
}

const SignalIdentifiers: React.FC<SignalIdentifiersProps> = ({
  originalSignalId,
  signalId,
  onCopy
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <CopyableField
        label="TradingView ID"
        value={originalSignalId}
        tooltip="Unique identifier from TradingView signal source"
        onCopy={onCopy}
      />
      <CopyableField
        label="Coinstrat Pro ID"
        value={signalId}
        tooltip="Internal system identifier for this signal"
        onCopy={onCopy}
      />
    </div>
  );
};

export default SignalIdentifiers;
